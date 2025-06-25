import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Question } from '../question/Question';
import BlockingSpinner from '../../../components/common/BlockingSpinner';
import './Course.css';
import { useCourseNavigation } from './hooks/useCourseNavigation';
import { useCourseDrag } from './hooks/useCourseDrag';
import { useCourseStats } from './hooks/useCourseStats';
import CourseScoreboard from './CourseScoreboard';
import CourseCompletion from './CourseCompletion';
import CourseLoading from './CourseLoading';
import CourseError from './CourseError';
import CourseEmpty from './CourseEmpty';
import Explanation from '../question/Explanation';

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
