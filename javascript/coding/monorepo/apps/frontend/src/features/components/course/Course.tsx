import { Link, useParams } from 'react-router-dom';
import type { CourseMetadata } from '../../../App';
import examenModulo1 from './examen_modulo1.json';
import { Question } from '../question/Question';
import { useState } from 'react';

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

  const preguntas: QuestionMetadata[] = examenModulo1.map((pregunta) => {
    return {
      question: pregunta.question,
      options: pregunta.options,
      answer: pregunta.answer,
      explanation: pregunta.explanation,
      invalidOptions: pregunta.invalidOptions,
    };
  });

  const currentQuestion = preguntas[currentQuestionIndex];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        flexDirection: 'column',
      }}
    >
      <h1>{seletedCourse?.title}</h1>
      {currentQuestion && (
        <Question
          question={currentQuestion}
          handleNext={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
        ></Question>
      )}
      <Link to="/">Back to courses</Link>
    </div>
  );
};
export default Course;
