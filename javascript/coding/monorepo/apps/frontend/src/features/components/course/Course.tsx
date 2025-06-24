import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Explanation from '../question/Explanation';
import { Question } from '../question/Question';
import BlockingSpinner from '../common/BlockingSpinner';
import './Course.css';
import { useCourseNavigation } from './hooks/useCourseNavigation';
import { useCourseDrag } from './hooks/useCourseDrag';
import { useCourseStats } from './hooks/useCourseStats';

interface CourseStatsProps {
  stats: ReturnType<typeof useCourseStats>;
}

const CourseScoreboard: React.FC<CourseStatsProps> = ({ stats }) => (
  <div className="course-scoreboard">
    <span className="score-correct">✔ {stats.correct}</span>
    <span className="score-incorrect">✖ {stats.incorrect}</span>
    <span className="score-total">Restantes: {stats.remaining}</span>
    {stats.skipped > 0 && (
      <span className="score-skipped">⏭ {stats.skipped}</span>
    )}
  </div>
);

const CourseCompletion: React.FC<{
  stats: ReturnType<typeof useCourseStats>;
  courseName: string;
}> = ({ stats, courseName }) => (
  <div className="course-completion">
    <h2>🎉 ¡Cuestionario completado!</h2>
    <p>
      Has terminado todas las preguntas de <strong>{courseName}</strong>
    </p>
    <div className="completion-stats">
      <div className="stat-item">
        <span className="stat-value">{stats.correct}</span>
        <span className="stat-label">Correctas</span>
      </div>
      <div className="stat-item">
        <span className="stat-value">{stats.incorrect}</span>
        <span className="stat-label">Incorrectas</span>
      </div>
      <div className="stat-item">
        <span className="stat-value">{stats.skipped}</span>
        <span className="stat-label">Saltadas</span>
      </div>
      <div className="stat-item accuracy">
        <span className="stat-value">{stats.accuracy}%</span>
        <span className="stat-label">Precisión</span>
      </div>
    </div>
  </div>
);

const CourseLoading: React.FC = () => (
  <div className="course-question-box">
    <div className="course-loading">
      <h2>Cargando preguntas...</h2>
    </div>
  </div>
);

const CourseError: React.FC = () => (
  <div className="course-error">
    <h2>Error loading course</h2>
    <p>Ha ocurrido un error al cargar las preguntas del curso.</p>
    <Link to="/" className="course-error__back-button">
      ← Back to courses
    </Link>
  </div>
);

const CourseEmpty: React.FC = () => (
  <div className="course-empty">
    <h2>No questions available</h2>
    <p>This course doesn't have any questions yet.</p>
    <Link to="/" className="course-empty__back-button">
      ← Back to courses
    </Link>
  </div>
);

export const Course: React.FC = () => {
  const params = useParams();
  const courseName = params.courseName ?? '';
  const {
    questionQueue,
    currentQuestionIndex,
    correctCount,
    incorrectCount,
    skippedCount,
    showingExplanation,
    explanationData,
    questionTransition,
    currentViewMode,
    canDrag,
    handleSkipQuestion,
    handleCorrect,
    handleIncorrect,
    handleDragStart,
    executeAction,
  } = useCourseNavigation(courseName);
  const {
    containerDragY,
    containerOpacity,
    isContainerDragging,
    handleContainerDragStart,
    handleContainerDragMove,
    handleContainerDragEnd,
  } = useCourseDrag();
  const handleDragAction = executeAction;
  const stats = useCourseStats({
    questionQueue,
    currentQuestionIndex,
    correctCount,
    incorrectCount,
    skippedCount,
  });
  if (!questionQueue) {
    return (
      <div className="course-container">
        <div className="course-header">
          <Link to="/" className="course-back-button">
            <span className="back-button-text">Volver a cursos</span>
          </Link>
        </div>
        <div className="course-not-found">
          <h1>Cargando...</h1>
        </div>
      </div>
    );
  }
  if (questionQueue.length === 0 && currentQuestionIndex === 0) {
    return (
      <BlockingSpinner message="Loading course questions..." overlay={false} />
    );
  }
  if (questionQueue.length === 0 && currentQuestionIndex > 0) {
    return <CourseError />;
  }
  if (questionQueue.length === 0) {
    return <CourseEmpty />;
  }
  return (
    <div className="course-container">
      <div className="course-header">
        <Link to="/" className="course-back-button">
          <span className="back-button-text">Volver a cursos</span>
        </Link>
        <CourseScoreboard stats={stats} />
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
              : 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          {currentViewMode === 'completed' ? (
            <CourseCompletion stats={stats} courseName={courseName} />
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
        <CourseLoading />
      )}
    </div>
  );
};

export default Course;
