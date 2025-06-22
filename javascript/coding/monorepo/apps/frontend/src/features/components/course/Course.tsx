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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [showingExplanation, setShowingExplanation] = useState(false);
  const [explanationData, setExplanationData] = useState<{
    question: QuestionMetadata;
    selectedOption: number;
  } | null>(null);
  const preguntas: QuestionMetadata[] =
    selectedCourse?.id === '1' ? preguntasModulo1 : preguntasModule2;

  const handleCorrect = (index: number) => {
    setCorrectCount((c) => c + 1);
    const questionDiv = document.getElementById(`question-${index}`);
    if (questionDiv) {
      questionDiv.style.transition = 'opacity 1.5s';
      questionDiv.style.opacity = '0';
    }
    setTimeout(() => {
      if (index < preguntas.length - 1) {
        setCurrentQuestionIndex(index + 1);
        setTimeout(() => {
          const next = document.getElementById(`question-${index + 1}`);
          if (next) {
            next.style.opacity = '0';
            next.style.transition = 'opacity 0.5s';
            next.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => {
              next.style.opacity = '1';
            }, 50);
          }
        }, 100);
      }
    }, 1500);
  };

  const handleIncorrect = () => {
    setIncorrectCount((c) => c + 1);
  };

  const handleShowExplanation = (
    question: QuestionMetadata,
    selectedOption: number
  ) => {
    setExplanationData({ question, selectedOption });
    setShowingExplanation(true);
  };

  const handleNextFromExplanation = () => {
    setShowingExplanation(false);
    setExplanationData(null);
    if (currentQuestionIndex < preguntas.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Verificar si el cuestionario está completado
  const isCompleted = currentQuestionIndex >= preguntas.length;
  const totalAnswered = correctCount + incorrectCount;
  const accuracy =
    totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

  return (
    <div className="course-container">
      <div className="course-scoreboard">
        <span className="score-correct">✔ {correctCount}</span>
        <span className="score-incorrect">✖ {incorrectCount}</span>
        <span className="score-total">
          Restantes: {preguntas.length - currentQuestionIndex}
        </span>
      </div>
      {preguntas.length > 0 ? (
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
            className="course-question-box"
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
            className="course-question-box"
          >
            <Question
              question={preguntas[currentQuestionIndex]}
              onCorrect={() => handleCorrect(currentQuestionIndex)}
              onNext={() => setCurrentQuestionIndex((idx) => idx + 1)}
              onIncorrect={handleIncorrect}
              onShowExplanation={handleShowExplanation}
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
