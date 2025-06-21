import { Link, useParams } from 'react-router-dom';
import type { CourseMetadata } from '../../../App';
import { Question } from '../question/Question';
import { useState } from 'react';
import preguntasModulo1 from './examen_modulo1.json';
import './Course.css';

export interface QuestionMetadata {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  invalidOptions: Partial<Record<'a' | 'b' | 'c' | 'd', string>>;
}

export const Course: React.FunctionComponent<{ courses: CourseMetadata[] }> = ({
  courses,
}) => {
  const params = useParams();
  const courseId = params.courseId;
  const seletedCourse = courses.find((course) => course.id === courseId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showCheck, setShowCheck] = useState(false);
  const preguntas: QuestionMetadata[] =
    seletedCourse?.id === '1' ? preguntasModulo1 : [];

  // Scroll automático a la siguiente pregunta si fue contestada correctamente
  const handleCorrect = (index: number) => {
    setShowCheck(true);
    // Fade out animación
    const questionDiv = document.getElementById(`question-${index}`);
    if (questionDiv) {
      questionDiv.style.transition = 'opacity 3s';
      questionDiv.style.opacity = '0';
    }
    setTimeout(() => {
      setShowCheck(false);
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
    }, 3000);
  };

  return (
    <div className="course-container">
      {preguntas.length > 0 && (
        <div
          key={currentQuestionIndex}
          id={`question-${currentQuestionIndex}`}
          className="course-question-box"
        >
          <Question
            question={preguntas[currentQuestionIndex]}
            onCorrect={() => handleCorrect(currentQuestionIndex)}
            onNext={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
          />
          {showCheck && <div className="course-check">✓</div>}
        </div>
      )}
      <Link to="/">Back to courses</Link>
    </div>
  );
};
export default Course;
