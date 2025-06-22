import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Question } from '../question/Question';
import Explanation from '../question/Explanation';
import { useDragGesture } from './useDragGesture';
import { DRAG_CONFIG, calculateDragOpacity } from './dragConfig';
import preguntasModulo1 from './examen_modulo1.json';
import preguntasModule2 from './examen_modulo2.json';
import type { QuestionMetadata, CourseMetadata } from '../../../types';
import './Course.css';

export interface CourseProps {
  courses: CourseMetadata[];
}

export const Course: React.FC<CourseProps> = ({ courses }) => {
  const params = useParams();
  const courseId = params.courseId;
  const selectedCourse = courses.find((course) => course.id === courseId);

  const initialQuestions: QuestionMetadata[] =
    selectedCourse?.id === '1' ? preguntasModulo1 : preguntasModule2;

  const [questionQueue, setQuestionQueue] =
    useState<QuestionMetadata[]>(initialQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [skippedCount, setSkippedCount] = useState(0);
  const [showingExplanation, setShowingExplanation] = useState(false);
  const [explanationData, setExplanationData] = useState<{
    question: QuestionMetadata;
    selectedOption: number;
  } | null>(null);
  const [questionTransition, setQuestionTransition] = useState<
    'entering' | 'exiting' | 'idle'
  >('idle');
  const [currentViewMode, setCurrentViewMode] = useState<
    'question' | 'explanation' | 'completed'
  >('question');

  const [canDrag, setCanDrag] = useState(false);
  const [isProcessingAction, setIsProcessingAction] = useState(false);
  const [lastQuestionState, setLastQuestionState] = useState<{
    hasSelectedOption: boolean;
    isCorrect: boolean;
    selectedOptionIndex: number;
  } | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const executeAction = useCallback(() => {
    if (isProcessingAction) return;

    setIsProcessingAction(true);

    if (currentViewMode === 'explanation') {
      handleNextFromExplanation();
    } else if (currentViewMode === 'question') {
      const currentQuestion = questionQueue[currentQuestionIndex];

      if (lastQuestionState) {
        if (
          lastQuestionState.hasSelectedOption &&
          !lastQuestionState.isCorrect
        ) {
          handleShowExplanation(
            currentQuestion,
            lastQuestionState.selectedOptionIndex
          );
        } else if (!lastQuestionState.hasSelectedOption) {
          handleSkipQuestion();
        }
      } else {
        handleSkipQuestion();
      }
    }

    setTimeout(() => setIsProcessingAction(false), 500);
  }, [
    currentViewMode,
    lastQuestionState,
    questionQueue,
    currentQuestionIndex,
    isProcessingAction,
  ]);

  // Hook personalizado para manejar el arrastre
  const {
    containerRef,
    dragY,
    isDragging,
    isAnimating,
    resetPosition,
    handlers: dragHandlers,
  } = useDragGesture({
    canDrag: true, // Simplificar: siempre permitir intentar arrastrar, la lógica se decide en onSwipeUp
    onSwipeUp: executeAction,
  });

  const handleDragAction = executeAction;

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleCorrect = (index: number) => {
    setCorrectCount((c) => c + 1);

    setTimeout(() => {
      if (index < questionQueue.length - 1) {
        setCurrentQuestionIndex(index + 1);
      }
      setQuestionTransition('entering');
      resetPosition();
      scrollToTop();
      setTimeout(
        () => setQuestionTransition('idle'),
        DRAG_CONFIG.ANIMATION.CLEANUP_DELAY
      );
    }, DRAG_CONFIG.ANIMATION.SUCCESS_FEEDBACK_DELAY);
  };

  const handleIncorrect = () => {
    setIncorrectCount((c) => c + 1);
  };

  const handleSkipQuestion = () => {
    setSkippedCount((c) => c + 1);

    const currentQuestion = questionQueue[currentQuestionIndex];
    const newQueue = [
      ...questionQueue.slice(0, currentQuestionIndex),
      ...questionQueue.slice(currentQuestionIndex + 1),
      currentQuestion,
    ];

    setQuestionQueue(newQueue);

    if (currentQuestionIndex >= newQueue.length - 1) {
      setCurrentQuestionIndex(
        Math.min(currentQuestionIndex, newQueue.length - 1)
      );
    }

    setQuestionTransition('entering');
    resetPosition();
    scrollToTop();
    setTimeout(() => setQuestionTransition('idle'), 100);
  };

  const handleShowExplanation = (
    question: QuestionMetadata,
    selectedOption: number
  ) => {
    setExplanationData({ question, selectedOption });
    setCurrentViewMode('explanation');
    setShowingExplanation(true);
    setQuestionTransition('entering');
    resetPosition();
    scrollToTop();
    setTimeout(() => setQuestionTransition('idle'), 100);
  };

  const handleNextFromExplanation = () => {
    setCurrentViewMode('question');
    setShowingExplanation(false);
    setExplanationData(null);

    if (currentQuestionIndex < questionQueue.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }

    setQuestionTransition('entering');
    resetPosition();
    scrollToTop();
    setTimeout(() => setQuestionTransition('idle'), 100);
  };

  const handleDragStart = useCallback(
    (selectedOption: number | undefined, isCorrect: boolean) => {
      const shouldAllowDrag =
        (selectedOption !== undefined && !isCorrect) ||
        selectedOption === undefined;

      setCanDrag(shouldAllowDrag);

      setLastQuestionState({
        hasSelectedOption: selectedOption !== undefined,
        isCorrect: isCorrect,
        selectedOptionIndex: selectedOption ?? -1,
      });

      return shouldAllowDrag;
    },
    []
  );

  const isCompleted = currentQuestionIndex >= questionQueue.length;
  const totalAnswered = correctCount + incorrectCount;
  const accuracy =
    totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

  useEffect(() => {
    if (isCompleted) {
      setCurrentViewMode('completed');
    } else if (showingExplanation) {
      setCurrentViewMode('explanation');
    } else {
      setCurrentViewMode('question');
    }
  }, [isCompleted, showingExplanation]);

  useEffect(() => {
    setLastQuestionState(null);
    setCanDrag(false);
    setIsProcessingAction(false);
  }, [currentQuestionIndex, currentViewMode]);

  return (
    <div className="course-container">
      <div className="course-scoreboard">
        <span className="score-correct">✔ {correctCount}</span>
        <span className="score-incorrect">✖ {incorrectCount}</span>
        <span className="score-total">
          Restantes: {questionQueue.length - currentQuestionIndex}
        </span>
        {skippedCount > 0 && (
          <span className="score-skipped">⏭ {skippedCount}</span>
        )}
      </div>
      {questionQueue.length > 0 ? (
        <div
          ref={containerRef}
          key={`${currentViewMode}-${currentQuestionIndex}-${correctCount}-${
            showingExplanation ? explanationData?.selectedOption : ''
          }`}
          className={`course-question-box ${
            questionTransition === 'entering'
              ? 'animate-fade-in'
              : questionTransition === 'exiting'
              ? 'animate-fade-out'
              : ''
          }${isDragging ? ' dragging' : ''}${isAnimating ? ' animating' : ''}`}
          style={{
            transform: isDragging
              ? `translateY(${dragY}px)`
              : 'translateY(0px)',
            transition:
              isDragging || isAnimating
                ? 'none'
                : `transform ${DRAG_CONFIG.CSS.TRANSFORM_DURATION} ${DRAG_CONFIG.CSS.EASING}, opacity ${DRAG_CONFIG.CSS.TRANSFORM_DURATION} ${DRAG_CONFIG.CSS.EASING}`,
            opacity: isDragging ? calculateDragOpacity(dragY) : 1,
          }}
        >
          {currentViewMode === 'completed' ? (
            <div className="course-completion">
              <h2>¡Cuestionario Completado!</h2>
              <p>
                Has respondido correctamente {correctCount} de {totalAnswered}{' '}
                preguntas.
                <br />
                Tu precisión es del {accuracy}%.
              </p>
              {accuracy >= 80 ? (
                <p
                  style={{
                    color: 'var(--color-success)',
                    fontWeight: 'var(--font-weight-semibold)',
                  }}
                >
                  ¡Excelente trabajo! 🎉
                </p>
              ) : accuracy >= 60 ? (
                <p
                  style={{
                    color: 'var(--color-warning)',
                    fontWeight: 'var(--font-weight-semibold)',
                  }}
                >
                  Buen trabajo, pero puedes mejorar 💪
                </p>
              ) : (
                <p
                  style={{
                    color: 'var(--color-error)',
                    fontWeight: 'var(--font-weight-semibold)',
                  }}
                >
                  Sigue practicando para mejorar 📚
                </p>
              )}
            </div>
          ) : currentViewMode === 'explanation' && explanationData ? (
            <Explanation
              question={explanationData.question}
              selectedOption={explanationData.selectedOption}
              onDragAction={handleDragAction}
              dragHandlers={dragHandlers}
              canDrag={true}
            />
          ) : (
            <Question
              question={questionQueue[currentQuestionIndex]}
              onCorrect={() => handleCorrect(currentQuestionIndex)}
              onIncorrect={handleIncorrect}
              onSkip={handleSkipQuestion}
              onDragStart={handleDragStart}
              onDragAction={handleDragAction}
              dragHandlers={dragHandlers}
              canDrag={canDrag || !lastQuestionState?.hasSelectedOption}
            />
          )}
        </div>
      ) : (
        <div
          className="course-question-box"
          style={{ textAlign: 'center', padding: '2rem' }}
        >
          No hay preguntas disponibles.
        </div>
      )}
      <Link to="/" className="course-back-button">
        Atrás
      </Link>
    </div>
  );
};

export default Course;
