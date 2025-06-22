import React, { useState } from 'react';
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
            key={currentQuestionIndex}
            id={`question-${currentQuestionIndex}`}
            className={`course-question-box ${
              questionTransition === 'entering'
                ? 'animate-fade-in'
                : questionTransition === 'exiting'
                ? 'animate-fade-out'
                : ''
            }`}
          >
            <Question
              question={questionQueue[currentQuestionIndex]}
              onCorrect={() => handleCorrect(currentQuestionIndex)}
              onNext={() => setCurrentQuestionIndex((idx) => idx + 1)}
              onIncorrect={handleIncorrect}
              onShowExplanation={handleShowExplanation}
              onSkip={handleSkipQuestion}
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
