import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { QuestionMetadata } from '../../../types';
import { useGetQuestions } from '../courses/getCourseHook';
import Explanation from '../question/Explanation';
import { Question } from '../question/Question';
import './Course.css';

export const Course: React.FC = () => {
  const params = useParams();
  const courseName = params.courseName ?? '';

  const [questionQueue, setQuestionQueue] = useState<QuestionMetadata[]>([]);

  useGetQuestions(setQuestionQueue, courseName);

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

  // Estados para el drag visual del contenedor
  const [containerDragY, setContainerDragY] = useState(0);
  const [containerOpacity, setContainerOpacity] = useState(1);
  const [isContainerDragging, setIsContainerDragging] = useState(false);

  const scrollToTop = useCallback(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 10);
  }, []);

  // Handlers para el drag visual del contenedor
  const handleContainerDragStart = useCallback(() => {
    setIsContainerDragging(true);
  }, []);

  const handleContainerDragMove = useCallback(
    (deltaY: number, opacity: number) => {
      setContainerDragY(deltaY);
      setContainerOpacity(opacity);
    },
    []
  );

  const handleContainerDragEnd = useCallback(() => {
    setIsContainerDragging(false);
    setContainerDragY(0);
    setContainerOpacity(1);
  }, []);

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

    // Limpiar el estado de la pregunta anterior
    setLastQuestionState(null);
    setCanDrag(false);

    setQuestionTransition('entering');
    scrollToTop();
    setTimeout(() => setQuestionTransition('idle'), 100);
  }, [questionQueue, currentQuestionIndex, scrollToTop]);

  const handleShowExplanation = useCallback(
    (question: QuestionMetadata, selectedOption: number) => {
      setExplanationData({ question, selectedOption });
      setCurrentViewMode('explanation');
      setShowingExplanation(true);
      
      // No limpiar lastQuestionState aquí porque lo necesitamos para la explicación
      
      setQuestionTransition('entering');
      scrollToTop();
      setTimeout(() => setQuestionTransition('idle'), 100);
    },
    [scrollToTop]
  );

  const handleNextFromExplanation = useCallback(() => {
    setCurrentViewMode('question');
    setShowingExplanation(false);
    setExplanationData(null);

    // Limpiar el estado de la pregunta anterior al avanzar
    setLastQuestionState(null);
    setCanDrag(false);

    if (currentQuestionIndex < questionQueue.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }

    setQuestionTransition('entering');
    scrollToTop();
    setTimeout(() => setQuestionTransition('idle'), 100);
  }, [currentQuestionIndex, questionQueue.length, scrollToTop]);

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

  const handleDragAction = executeAction;

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleCorrect = useCallback(
    (index: number) => {
      setCorrectCount((c) => c + 1);

      // Limpiar el estado de la pregunta anterior
      setLastQuestionState(null);
      setCanDrag(false);

      setTimeout(() => {
        if (index < questionQueue.length - 1) {
          setCurrentQuestionIndex(index + 1);
        }
        setQuestionTransition('entering');
        scrollToTop();
        setTimeout(() => setQuestionTransition('idle'), 100);
      }, 200);
    },
    [questionQueue.length, scrollToTop]
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
    // Limpiar completamente el estado de la pregunta anterior
    setLastQuestionState(null);
    setCanDrag(false);
    setIsProcessingAction(false);
    
    // Configurar canDrag basado en el modo actual
    if (currentViewMode === 'explanation') {
      setCanDrag(true);
    } else if (currentViewMode === 'completed') {
      setCanDrag(false);
    }
    // Para 'question' mode, canDrag se maneja por handleDragStart cuando el usuario selecciona
  }, [currentQuestionIndex, currentViewMode]);

  if (!questionQueue) {
    return (
      <div className="course-container">
        <div className="course-not-found">
          <h1>Cargando...</h1>
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
          key={`${currentViewMode}-${currentQuestionIndex}-${correctCount}-${
            showingExplanation ? explanationData?.selectedOption : ''
          }`}
          className={`course-question-box ${
            questionTransition === 'entering' ? 'entering' : ''
          } ${isContainerDragging ? 'dragging' : ''}`}
          style={{
            transform: isContainerDragging
              ? `translateY(${containerDragY}px)`
              : 'none',
            opacity: isContainerDragging ? containerOpacity : 1,
            transition: isContainerDragging
              ? 'none'
              : 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)', // Spring easing
          }}
        >
          {currentViewMode === 'completed' ? (
            <div className="course-completion">
              <h2>🎉 ¡Cuestionario completado!</h2>
              <p>
                Has terminado todas las preguntas de{' '}
                <strong>{courseName}</strong>
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
              onDragAction={handleDragAction}
              canDrag={canDrag}
              onContainerDragStart={handleContainerDragStart}
              onDragMove={handleContainerDragMove}
              onDragEnd={handleContainerDragEnd}
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
                canDrag={canDrag}
                disabled={false}
                onContainerDragStart={handleContainerDragStart}
                onDragMove={handleContainerDragMove}
                onDragEnd={handleContainerDragEnd}
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
