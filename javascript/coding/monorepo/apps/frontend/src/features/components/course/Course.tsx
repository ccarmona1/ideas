import React, { useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { CourseMetadata } from '../../../App';
import { Question } from '../question/Question';
import Explanation from '../question/Explanation';
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

  // Estados para el arrastre en el course-question-box
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const dragStartY = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canDrag, setCanDrag] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detectar dispositivos táctiles
  React.useEffect(() => {
    const checkTouchSupport = () => {
      setIsTouchDevice(
        'ontouchstart' in window || navigator.maxTouchPoints > 0
      );
    };
    checkTouchSupport();
  }, []);

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
    setQuestionTransition('exiting');

    setTimeout(() => {
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
        // Si era la última pregunta, no avanzar el índice
        setCurrentQuestionIndex(
          Math.min(currentQuestionIndex, newQueue.length - 1)
        );
      }

      setQuestionTransition('entering');
      setTimeout(() => setQuestionTransition('idle'), 100);
    }, 400);
  };

  const handleShowExplanation = (
    question: QuestionMetadata,
    selectedOption: number
  ) => {
    // Establecer primero los datos de explicación mientras la pregunta está saliendo
    setExplanationData({ question, selectedOption });
    setQuestionTransition('exiting');

    setTimeout(() => {
      // Cambiar a modo explicación de forma sincronizada
      setCurrentViewMode('explanation');
      setShowingExplanation(true);
      setQuestionTransition('entering');
      setTimeout(() => setQuestionTransition('idle'), 100);
    }, 300); // Tiempo sincronizado con la animación CSS
  };

  const handleNextFromExplanation = () => {
    setQuestionTransition('exiting');

    setTimeout(() => {
      // Primero limpiar los datos de explicación y cambiar modo
      setCurrentViewMode('question');
      setShowingExplanation(false);
      setExplanationData(null);

      // Luego avanzar a la siguiente pregunta si existe
      if (currentQuestionIndex < questionQueue.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }

      setQuestionTransition('entering');
      setTimeout(() => setQuestionTransition('idle'), 100);
    }, 300); // Tiempo consistente con handleShowExplanation
  };

  // Handlers de arrastre para el course-question-box
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

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Para preguntas, usar la lógica existente de canDrag
    // Para explicaciones, siempre permitir arrastre
    const shouldAllowDrag = currentViewMode === 'explanation' || canDrag;

    if (
      shouldAllowDrag &&
      !isAnimating &&
      !isTouchDevice &&
      e.pointerType !== 'touch'
    ) {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
      dragStartY.current = e.clientY;

      if (containerRef.current) {
        containerRef.current.style.willChange = 'transform';
        containerRef.current.style.touchAction = 'none';
      }
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (
      isDragging &&
      dragStartY.current !== null &&
      !isTouchDevice &&
      e.pointerType !== 'touch'
    ) {
      e.preventDefault();
      e.stopPropagation();
      const deltaY = e.clientY - dragStartY.current;
      const resistanceFactor = deltaY > 0 ? 0.3 : 1;
      setDragY(deltaY * resistanceFactor < 0 ? deltaY * resistanceFactor : 0);
    }
  };

  const handlePointerUp = (e?: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging && (!e || (!isTouchDevice && e.pointerType !== 'touch'))) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      setIsDragging(false);
      setIsAnimating(true);

      if (containerRef.current) {
        containerRef.current.style.willChange = 'auto';
        containerRef.current.style.touchAction = 'auto';
      }

      const threshold = -120;

      if (dragY < threshold) {
        // Animación de salida
        setDragY(-window.innerHeight);
        setTimeout(() => {
          setDragY(0);
          setIsAnimating(false);
          setCanDrag(false);

          // Determinar la acción basándose en el modo de vista
          if (currentViewMode === 'explanation') {
            // En modo explicación, ir a la siguiente pregunta
            handleNextFromExplanation();
          } else {
            // En modo pregunta, lógica existente
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
                // Hay respuesta incorrecta -> mostrar explicación
                const selectedOptionIndex = Array.from(
                  questionRef.querySelectorAll('.option-btn')
                ).findIndex((btn) => btn.classList.contains('selected'));
                handleShowExplanation(currentQuestion, selectedOptionIndex);
              } else if (!hasSelectedOption) {
                // No hay respuesta -> saltar pregunta
                handleSkipQuestion();
              }
            }
          }
        }, 350);
      } else {
        // Animación de vuelta
        setDragY(0);
        setTimeout(() => setIsAnimating(false), 300);
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    // Para preguntas, usar la lógica existente de canDrag
    // Para explicaciones, siempre permitir arrastre
    const shouldAllowDrag = currentViewMode === 'explanation' || canDrag;

    if (shouldAllowDrag && !isAnimating) {
      e.preventDefault();
      e.stopPropagation();
      const touch = e.touches[0];
      setIsDragging(true);
      dragStartY.current = touch.clientY;

      if (containerRef.current) {
        containerRef.current.style.willChange = 'transform';
        containerRef.current.style.touchAction = 'none';
      }

      // Asegurar que el evento no sea cancelado por scroll
      document.body.style.overflow = 'hidden';
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging && dragStartY.current !== null) {
      e.preventDefault();
      e.stopPropagation();
      const touch = e.touches[0];
      const deltaY = touch.clientY - dragStartY.current;
      const resistanceFactor = deltaY > 0 ? 0.3 : 1;
      setDragY(deltaY * resistanceFactor < 0 ? deltaY * resistanceFactor : 0);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();

      setIsDragging(false);
      setIsAnimating(true);

      // Restaurar el scroll del body
      document.body.style.overflow = '';

      if (containerRef.current) {
        containerRef.current.style.willChange = 'auto';
        containerRef.current.style.touchAction = 'auto';
      }

      const threshold = -80; // Threshold más sensible para móviles

      if (dragY < threshold) {
        setDragY(-window.innerHeight);
        setTimeout(() => {
          setDragY(0);
          setIsAnimating(false);
          setCanDrag(false);

          // Determinar la acción basándose en el modo de vista
          if (currentViewMode === 'explanation') {
            // En modo explicación, ir a la siguiente pregunta
            handleNextFromExplanation();
          } else {
            // En modo pregunta, lógica existente
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
                // Hay respuesta incorrecta -> mostrar explicación
                const selectedOptionIndex = Array.from(
                  questionRef.querySelectorAll('.option-btn')
                ).findIndex((btn) => btn.classList.contains('selected'));
                handleShowExplanation(currentQuestion, selectedOptionIndex);
              } else if (!hasSelectedOption) {
                // No hay respuesta -> saltar pregunta
                handleSkipQuestion();
              }
            }
          }
        }, 350);
      } else {
        setDragY(0);
        setTimeout(() => setIsAnimating(false), 300);
      }
    }
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
          key={`${currentViewMode}-${currentQuestionIndex}`}
          className={`course-question-box ${
            questionTransition === 'entering'
              ? 'animate-fade-in'
              : questionTransition === 'exiting'
              ? 'animate-fade-out'
              : ''
          }${isDragging ? ' dragging' : ''}${isAnimating ? ' animating' : ''}`}
          style={{
            transform: `translateY(${dragY}px)`,
            transition: isDragging
              ? 'none'
              : 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
          onPointerDown={
            currentViewMode !== 'completed' ? handlePointerDown : undefined
          }
          onPointerMove={
            currentViewMode !== 'completed' ? handlePointerMove : undefined
          }
          onPointerUp={
            currentViewMode !== 'completed' ? handlePointerUp : undefined
          }
          onPointerLeave={
            currentViewMode !== 'completed' ? handlePointerUp : undefined
          }
          onTouchStart={
            currentViewMode !== 'completed' ? handleTouchStart : undefined
          }
          onTouchMove={
            currentViewMode !== 'completed' ? handleTouchMove : undefined
          }
          onTouchEnd={
            currentViewMode !== 'completed' ? handleTouchEnd : undefined
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
