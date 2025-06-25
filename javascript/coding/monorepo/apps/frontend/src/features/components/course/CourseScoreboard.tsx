import React from 'react';
import { useCourseStats } from '../../hooks/course/useCourseStats';

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

export default CourseScoreboard;
