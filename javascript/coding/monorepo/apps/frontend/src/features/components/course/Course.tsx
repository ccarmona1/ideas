import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { CourseMetadata } from '../../../App';
import { Question } from '../question/Question';
import Explanation from '../question/Explanation';
import { useDragGesture } from './useDragGesture';
import preguntasModulo1 from './examen_modulo1.json';
import preguntasModule2 from './examen_modulo2.json';
import './Course.css';

export interface QuestionMetadata {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  invalidOptions: Partial<Record<'a' | 'b' | 'c' | 'd', string>>;
}

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

  // Hook personalizado para manejar el arrastre
  const {
    containerRef,
    dragY,
    isDragging,
    isAnimating,
    handlers: dragHandlers,
  } = useDragGesture({
    canDrag: currentViewMode === 'explanation' || canDrag,
    onSwipeUp: () => {
      setCanDrag(false);

      if (currentViewMode === 'explanation') {
        handleNextFromExplanation();
      } else {
        // Lógica para modo pregunta
        const currentQuestion = questionQueue[currentQuestionIndex];
        const questionRef = containerRef.current?.querySelector(
          '.question-container'
        );

        if (questionRef) {
          const hasIncorrectAnswer =
            questionRef.querySelector('.answer-incorrect');
          const hasSelectedOption = questionRef.querySelector(
            '.option-btn.selected'
          );

          if (hasIncorrectAnswer && hasSelectedOption) {
            // Respuesta incorrecta -> mostrar explicación
            const selectedOptionIndex = Array.from(
              questionRef.querySelectorAll('.option-btn')
            ).findIndex((btn) => btn.classList.contains('selected'));
            handleShowExplanation(currentQuestion, selectedOptionIndex);
          } else if (!hasSelectedOption) {
            // Sin respuesta -> saltar pregunta
            handleSkipQuestion();
          }
        }
      }
    },
  });

  // Limpieza del estado de arrastre al desmontar el componente
  React.useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleCorrect = (index: number) => {
    setCorrectCount((c) => c + 1);
    // Delay más largo para que se vea la animación de éxito
    setTimeout(() => {
      setQuestionTransition('exiting');

      setTimeout(() => {
        if (index < questionQueue.length - 1) {
          setCurrentQuestionIndex(index + 1);
          setQuestionTransition('entering');

          setTimeout(() => {
            setQuestionTransition('idle');
          }, 150); // Tiempo ligeramente mayor para entrada más suave
        } else {
          setQuestionTransition('idle');
        }
      }, 350); // Tiempo de salida más rápido
    }, 200); // Delay inicial para mostrar feedback
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
    setTimeout(() => setQuestionTransition('idle'), 100);
  };

  // Handlers de arrastre simplificados
  const handleDragStart = (
    selectedOption: number | undefined,
    isCorrect: boolean
  ) => {
    const shouldAllowDrag =
      (selectedOption !== undefined && !isCorrect) || // Respuesta incorrecta
      selectedOption === undefined; // Sin respuesta (para saltar)

    setCanDrag(shouldAllowDrag);
    return shouldAllowDrag;
  };

  // Verificar si el cuestionario está completado
  const isCompleted = currentQuestionIndex >= questionQueue.length;
  const totalAnswered = correctCount + incorrectCount;
  const accuracy =
    totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

  // Actualizar el modo de vista basándose en el estado
  React.useEffect(() => {
    if (isCompleted) {
      setCurrentViewMode('completed');
    } else if (showingExplanation) {
      setCurrentViewMode('explanation');
    } else {
      setCurrentViewMode('question');
    }
  }, [isCompleted, showingExplanation]);

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
          key={`${currentViewMode}-${currentQuestionIndex}-${
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
            transform: `translateY(${dragY}px)`,
            transition:
              isDragging || isAnimating
                ? 'none'
                : 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
          onPointerDown={
            currentViewMode !== 'completed'
              ? dragHandlers.onPointerDown
              : undefined
          }
          onPointerMove={
            currentViewMode !== 'completed'
              ? dragHandlers.onPointerMove
              : undefined
          }
          onPointerUp={
            currentViewMode !== 'completed'
              ? dragHandlers.onPointerUp
              : undefined
          }
          onPointerLeave={
            currentViewMode !== 'completed'
              ? dragHandlers.onPointerLeave
              : undefined
          }
          onTouchStart={
            currentViewMode !== 'completed'
              ? dragHandlers.onTouchStart
              : undefined
          }
          onTouchMove={
            currentViewMode !== 'completed'
              ? dragHandlers.onTouchMove
              : undefined
          }
          onTouchEnd={
            currentViewMode !== 'completed'
              ? dragHandlers.onTouchEnd
              : undefined
          }
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
            />
          ) : (
            <Question
              question={questionQueue[currentQuestionIndex]}
              onCorrect={() => handleCorrect(currentQuestionIndex)}
              onIncorrect={handleIncorrect}
              onSkip={handleSkipQuestion}
              onDragStart={handleDragStart}
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
