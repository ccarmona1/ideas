import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Explanation from '../question/Explanation';
import { Question } from '../question/Question';
import BlockingSpinner from '../common/BlockingSpinner';
import './Course.css';
import { useCourseNavigation } from './hooks/useCourseNavigation';
import { useCourseDrag } from './hooks/useCourseDrag';
import { useCourseStats } from './hooks/useCourseStats';

export const Course: React.FC = () => {
  const params = useParams();
  const courseName = params.courseName ?? '';

  // Hook de navegación y estado de preguntas
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

  // Hook de drag visual
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

  // Show loading spinner while fetching questions
  // El loading y error se deben manejar en el hook, pero por ahora se mantienen aquí
  // para no romper la UI. Mejorar en siguiente iteración.
  if (questionQueue.length === 0 && currentQuestionIndex === 0) {
    return (
      <BlockingSpinner message="Loading course questions..." overlay={false} />
    );
  }

  // Show error state if questions failed to load
  if (questionQueue.length === 0 && currentQuestionIndex > 0) {
    return (
      <div className="course-error">
        <h2>Error loading course</h2>
        <p>Ha ocurrido un error al cargar las preguntas del curso.</p>
        <Link to="/" className="course-error__back-button">
          ← Back to courses
        </Link>
      </div>
    );
  }

  // Show empty state if no questions available
  if (questionQueue.length === 0) {
    return (
      <div className="course-empty">
        <h2>No questions available</h2>
        <p>This course doesn't have any questions yet.</p>
        <Link to="/" className="course-empty__back-button">
          ← Back to courses
        </Link>
      </div>
    );
  }
  return (
    <div className="course-container">
      <div className="course-header">
        <Link to="/" className="course-back-button">
          <span className="back-button-text">Volver a cursos</span>
        </Link>
        <div className="course-scoreboard">
          <span className="score-correct">✔ {stats.correct}</span>
          <span className="score-incorrect">✖ {stats.incorrect}</span>
          <span className="score-total">Restantes: {stats.remaining}</span>
          {stats.skipped > 0 && (
            <span className="score-skipped">⏭ {stats.skipped}</span>
          )}
        </div>
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
            <div className="course-completion">
              <h2>🎉 ¡Cuestionario completado!</h2>
              <p>
                Has terminado todas las preguntas de{' '}
                <strong>{courseName}</strong>
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
        <div className="course-question-box">
          <div className="course-loading">
            <h2>Cargando preguntas...</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Course;
