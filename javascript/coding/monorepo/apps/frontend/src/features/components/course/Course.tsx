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

  // Estado para manejar la cola de preguntas
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

  // Estados para el arrastre simplificado
  const [canDrag, setCanDrag] = useState(false);
  const [isProcessingAction, setIsProcessingAction] = useState(false);
  const [lastQuestionState, setLastQuestionState] = useState<{
    hasSelectedOption: boolean;
    isCorrect: boolean;
    selectedOptionIndex: number;
  } | null>(null);

  // Función centralizada para ejecutar acciones de arrastre (evita ejecuciones múltiples)
  const executeAction = useCallback(() => {
    if (isProcessingAction) {
      console.log('Action already processing, skipping...');
      return;
    }

    setIsProcessingAction(true);
    console.log('Action triggered', { currentViewMode, lastQuestionState });

    if (currentViewMode === 'explanation') {
      handleNextFromExplanation();
    } else if (currentViewMode === 'question') {
      const currentQuestion = questionQueue[currentQuestionIndex];

      if (lastQuestionState) {
        if (
          lastQuestionState.hasSelectedOption &&
          !lastQuestionState.isCorrect
        ) {
          // Respuesta incorrecta -> mostrar explicación
          handleShowExplanation(
            currentQuestion,
            lastQuestionState.selectedOptionIndex
          );
        } else if (!lastQuestionState.hasSelectedOption) {
          // Sin respuesta -> saltar pregunta
          handleSkipQuestion();
        }
      } else {
        // Fallback: si no hay estado, saltar pregunta
        handleSkipQuestion();
      }
    }

    // Limpiar el estado después de un delay
    setTimeout(() => {
      setIsProcessingAction(false);
    }, 500);
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

  // Función para manejar acciones desde los elementos de arrastre (usa la función centralizada)
  const handleDragAction = executeAction;

  // Limpieza del estado de arrastre al desmontar el componente
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Función para scroll automático hacia arriba
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const handleCorrect = (index: number) => {
    setCorrectCount((c) => c + 1);

    // Delay corto para mostrar la animación de éxito, luego cambio inmediato
    setTimeout(() => {
      // Cambio inmediato sin timeouts anidados
      if (index < questionQueue.length - 1) {
        setCurrentQuestionIndex(index + 1);
      }

      setQuestionTransition('entering');

      // Resetear posición de arrastre
      resetPosition();

      // Scroll automático hacia arriba
      scrollToTop();

      setTimeout(
        () => setQuestionTransition('idle'),
        DRAG_CONFIG.ANIMATION.CLEANUP_DELAY
      );
    }, DRAG_CONFIG.ANIMATION.SUCCESS_FEEDBACK_DELAY); // Usar configuración centralizada
  };

  const handleIncorrect = () => {
    setIncorrectCount((c) => c + 1);
  };

  // Nueva función para manejar saltar pregunta
  const handleSkipQuestion = () => {
    setSkippedCount((c) => c + 1);

    // Mover la pregunta actual al final de la cola
    const currentQuestion = questionQueue[currentQuestionIndex];
    const newQueue = [
      ...questionQueue.slice(0, currentQuestionIndex),
      ...questionQueue.slice(currentQuestionIndex + 1),
      currentQuestion,
    ];

    setQuestionQueue(newQueue);

    // Si no hay más preguntas en la posición actual, reiniciar
    if (currentQuestionIndex >= newQueue.length - 1) {
      setCurrentQuestionIndex(
        Math.min(currentQuestionIndex, newQueue.length - 1)
      );
    }

    setQuestionTransition('entering');

    // Resetear posición de arrastre
    resetPosition();

    // Scroll automático hacia arriba
    scrollToTop();

    setTimeout(() => setQuestionTransition('idle'), 100);
  };

  const handleShowExplanation = (
    question: QuestionMetadata,
    selectedOption: number
  ) => {
    // Establecer datos de explicación inmediatamente
    setExplanationData({ question, selectedOption });
    setCurrentViewMode('explanation');
    setShowingExplanation(true);
    setQuestionTransition('entering');

    // Resetear posición de arrastre
    resetPosition();

    // Scroll automático hacia arriba
    scrollToTop();

    setTimeout(() => setQuestionTransition('idle'), 100);
  };

  const handleNextFromExplanation = () => {
    // Cambiar estado inmediatamente
    setCurrentViewMode('question');
    setShowingExplanation(false);
    setExplanationData(null);

    // Avanzar a la siguiente pregunta si existe
    if (currentQuestionIndex < questionQueue.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }

    setQuestionTransition('entering');

    // Resetear posición de arrastre
    resetPosition();

    // Scroll automático hacia arriba
    scrollToTop();

    setTimeout(() => setQuestionTransition('idle'), 100);
  };

  // Handlers de arrastre simplificados
  const handleDragStart = useCallback(
    (selectedOption: number | undefined, isCorrect: boolean) => {
      const shouldAllowDrag =
        (selectedOption !== undefined && !isCorrect) || // Respuesta incorrecta
        selectedOption === undefined; // Sin respuesta (para saltar)

      setCanDrag(shouldAllowDrag);

      // Actualizar el estado de la última pregunta
      setLastQuestionState({
        hasSelectedOption: selectedOption !== undefined,
        isCorrect: isCorrect,
        selectedOptionIndex: selectedOption ?? -1,
      });

      return shouldAllowDrag;
    },
    []
  ); // Sin dependencias para evitar re-creación

  // Verificar si el cuestionario está completado
  const isCompleted = currentQuestionIndex >= questionQueue.length;
  const totalAnswered = correctCount + incorrectCount;
  const accuracy =
    totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

  // Actualizar el modo de vista basándose en el estado
  useEffect(() => {
    if (isCompleted) {
      setCurrentViewMode('completed');
    } else if (showingExplanation) {
      setCurrentViewMode('explanation');
    } else {
      setCurrentViewMode('question');
    }
  }, [isCompleted, showingExplanation]);

  // Limpiar el estado de la última pregunta cuando cambiamos de pregunta o vista
  useEffect(() => {
    setLastQuestionState(null);
    setCanDrag(false);
    setIsProcessingAction(false); // También limpiar el estado de procesamiento
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
