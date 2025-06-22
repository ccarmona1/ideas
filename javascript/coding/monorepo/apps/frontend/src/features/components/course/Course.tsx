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

  // Estados para el arrastre en el course-question-box
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const dragStartY = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canDrag, setCanDrag] = useState(false);

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
    setQuestionTransition('exiting');
    setTimeout(() => {
      setExplanationData({ question, selectedOption });
      setShowingExplanation(true);
      setQuestionTransition('entering');
      setTimeout(() => setQuestionTransition('idle'), 100);
    }, 200);
  };

  const handleNextFromExplanation = () => {
    setQuestionTransition('exiting');
    setTimeout(() => {
      setShowingExplanation(false);
      setExplanationData(null);
      if (currentQuestionIndex < questionQueue.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setQuestionTransition('entering');
        setTimeout(() => setQuestionTransition('idle'), 100);
      } else {
        setQuestionTransition('idle');
      }
    }, 200);
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
    if (canDrag && !isAnimating) {
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
    if (isDragging && dragStartY.current !== null) {
      e.preventDefault();
      e.stopPropagation();
      const deltaY = e.clientY - dragStartY.current;
      const resistanceFactor = deltaY > 0 ? 0.3 : 1;
      setDragY(deltaY * resistanceFactor < 0 ? deltaY * resistanceFactor : 0);
    }
  };

  const handlePointerUp = (e?: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
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

          // Obtener el estado actual de la pregunta
          const currentQuestion = questionQueue[currentQuestionIndex];
          const questionRef = containerRef.current?.querySelector(
            '.question-container'
          );

          // Determinar la acción basándose en el estado
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
        }, 350);
      } else {
        // Animación de vuelta
        setDragY(0);
        setTimeout(() => setIsAnimating(false), 300);
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (canDrag && !isAnimating) {
      e.preventDefault();
      e.stopPropagation();
      const touch = e.touches[0];
      setIsDragging(true);
      dragStartY.current = touch.clientY;

      if (containerRef.current) {
        containerRef.current.style.willChange = 'transform';
        containerRef.current.style.touchAction = 'none';
      }
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

      if (containerRef.current) {
        containerRef.current.style.willChange = 'auto';
        containerRef.current.style.touchAction = 'auto';
      }

      const threshold = -100;

      if (dragY < threshold) {
        setDragY(-window.innerHeight);
        setTimeout(() => {
          setDragY(0);
          setIsAnimating(false);
          setCanDrag(false);

          // Obtener el estado actual de la pregunta
          const currentQuestion = questionQueue[currentQuestionIndex];
          const questionRef = containerRef.current?.querySelector(
            '.question-container'
          );

          // Determinar la acción basándose en el estado
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
        isCompleted ? (
          <div className="course-question-box">
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
          </div>
        ) : showingExplanation && explanationData ? (
          <div
            key={`explanation-${currentQuestionIndex}`}
            className={`course-question-box ${
              questionTransition === 'entering'
                ? 'animate-fade-in'
                : questionTransition === 'exiting'
                ? 'animate-fade-out'
                : ''
            }`}
          >
            <Explanation
              question={explanationData.question}
              selectedOption={explanationData.selectedOption}
              onNext={handleNextFromExplanation}
            />
          </div>
        ) : (
          <div
            ref={containerRef}
            key={currentQuestionIndex}
            id={`question-${currentQuestionIndex}`}
            className={`course-question-box ${
              questionTransition === 'entering'
                ? 'animate-fade-in'
                : questionTransition === 'exiting'
                ? 'animate-fade-out'
                : ''
            }${isDragging ? ' dragging' : ''}${
              isAnimating ? ' animating' : ''
            }`}
            style={{
              transform: `translateY(${dragY}px)`,
              transition: isDragging
                ? 'none'
                : 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <Question
              question={questionQueue[currentQuestionIndex]}
              onCorrect={() => handleCorrect(currentQuestionIndex)}
              onIncorrect={handleIncorrect}
              onSkip={handleSkipQuestion}
              onDragStart={handleDragStart}
            />
          </div>
        )
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
