import React, { useState, useEffect, useCallback, useRef } from 'react';
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

  // Ref para usar con executeAction antes de definirlo
  const executeActionRef = useRef<(() => void) | undefined>(undefined);

  const scrollToTop = useCallback(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 10);
  }, []);

  // Hook de arrastre
  const {
    containerRef,
    dragY,
    isDragging,
    isAnimating,
    resetPosition,
    handlers: dragHandlers,
  } = useDragGesture({
    canDrag: true,
    onSwipeUp: () => executeActionRef.current?.(),
  });

  const handleSkipQuestion = useCallback(() => {
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
  }, [questionQueue, currentQuestionIndex, scrollToTop, resetPosition]);

  const handleShowExplanation = useCallback(
    (question: QuestionMetadata, selectedOption: number) => {
      setExplanationData({ question, selectedOption });
      setCurrentViewMode('explanation');
      setShowingExplanation(true);
      setQuestionTransition('entering');
      resetPosition();
      scrollToTop();
      setTimeout(() => setQuestionTransition('idle'), 100);
    },
    [scrollToTop, resetPosition]
  );

  const handleNextFromExplanation = useCallback(() => {
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
  }, [currentQuestionIndex, questionQueue.length, scrollToTop, resetPosition]);

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
    handleNextFromExplanation,
    handleShowExplanation,
    handleSkipQuestion,
  ]);

  // Actualizar el ref cuando executeAction cambie
  useEffect(() => {
    executeActionRef.current = executeAction;
  }, [executeAction]);

  const handleDragAction = executeAction;

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleCorrect = useCallback(
    (index: number) => {
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
    },
    [questionQueue.length, scrollToTop, resetPosition]
  );

  const handleIncorrect = useCallback(() => {
    setIncorrectCount((c) => c + 1);
  }, []);

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

  if (!selectedCourse) {
    return (
      <div className="course-container">
        <div className="course-not-found">
          <h1>Curso no encontrado</h1>
          <Link to="/" className="course-back-button">
            Volver a cursos
          </Link>
        </div>
      </div>
    );
  }

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
            questionTransition === 'entering' ? 'entering' : ''
          } ${isDragging ? 'dragging' : ''}`}
          style={{
            transform: `translateY(${dragY}px)`,
            opacity: calculateDragOpacity(dragY),
            willChange: isDragging || isAnimating ? 'transform' : 'auto',
          }}
        >
          {currentViewMode === 'completed' ? (
            <div className="course-completion">
              <h2>🎉 ¡Cuestionario completado!</h2>
              <p>
                Has terminado todas las preguntas de{' '}
                <strong>{selectedCourse.title}</strong>
              </p>
              <div className="completion-stats">
                <div className="stat-item">
                  <span className="stat-value">{correctCount}</span>
                  <span className="stat-label">Correctas</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{incorrectCount}</span>
                  <span className="stat-label">Incorrectas</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{skippedCount}</span>
                  <span className="stat-label">Saltadas</span>
                </div>
                <div className="stat-item accuracy">
                  <span className="stat-value">{accuracy}%</span>
                  <span className="stat-label">Precisión</span>
                </div>
              </div>
              <Link to="/" className="course-back-button">
                Volver a cursos
              </Link>
            </div>
          ) : showingExplanation && explanationData ? (
            <Explanation
              question={explanationData.question}
              selectedOption={explanationData.selectedOption}
              dragHandlers={dragHandlers}
              onDragAction={handleDragAction}
              canDrag={canDrag}
            />
          ) : (
            questionQueue[currentQuestionIndex] && (
              <Question
                question={questionQueue[currentQuestionIndex]}
                onCorrect={() => handleCorrect(currentQuestionIndex)}
                onIncorrect={handleIncorrect}
                onSkip={handleSkipQuestion}
                onDragStart={handleDragStart}
                onDragAction={handleDragAction}
                dragHandlers={dragHandlers}
                canDrag={canDrag}
                disabled={false}
              />
            )
          )}
        </div>
      ) : (
        <div className="course-question-box">
          <div className="course-loading">
            <h2>Cargando preguntas...</h2>
            <Link to="/" className="course-back-button">
              Volver a cursos
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Course;
