import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { CourseMetadata } from '../../../App';
import { Question } from '../question/Question';
import preguntasModulo1 from './examen_modulo1.json';
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
  const preguntas: QuestionMetadata[] =
    selectedCourse?.id === '1' ? preguntasModulo1 : [];

  const handleCorrect = (index: number) => {
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

  return (
    <div className="course-container">
      {preguntas.length > 0 ? (
        <div
          key={currentQuestionIndex}
          id={`question-${currentQuestionIndex}`}
          className="course-question-box"
        >
          <Question
            question={preguntas[currentQuestionIndex]}
            onCorrect={() => handleCorrect(currentQuestionIndex)}
            onNext={() => setCurrentQuestionIndex((idx) => idx + 1)}
          />
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
