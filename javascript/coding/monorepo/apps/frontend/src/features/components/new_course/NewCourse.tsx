import { Link } from 'react-router-dom';
import { useNewCourseForm } from './hooks/useNewCourseForm';
import BlockingSpinner from '../common/BlockingSpinner';
import './NewCourse.css';

export const NewCourse: React.FC = () => {
  const {
    formData,
    isSubmitting,
    errors,
    serverError,
    handleInputChange,
    handleSubmit,
    setServerError,
  } = useNewCourseForm();

  return (
    <div className="new-course-container">
      {isSubmitting && (
        <BlockingSpinner
          message="La IA está pensando y creando tu curso..."
          overlay={true}
        />
      )}
      {serverError && (
        <div className="error-notification">
          <div className="error-content">
            <span className="error-icon">⚠️</span>
            <p>{serverError}</p>
            <button
              className="error-close-button"
              onClick={() => setServerError(null)}
              aria-label="Cerrar mensaje de error"
            >
              ✕
            </button>
          </div>
        </div>
      )}
      <Link to="/" className="course-back-button">
        <span className="back-button-text">Volver a cursos</span>
      </Link>
      <h1 className="new-course-title">Crear Nuevo Curso</h1>
      <form className="new-course-form" onSubmit={handleSubmit}>
        <div className={`form-group ${errors.courseName ? 'has-error' : ''}`}>
          <label htmlFor="courseName">Nombre del curso</label>
          <input
            type="text"
            id="courseName"
            name="courseName"
            value={formData.courseName}
            onChange={handleInputChange}
            placeholder="Introduce el nombre del curso"
            required
            disabled={isSubmitting}
          />
          {errors.courseName && (
            <span className="error-message">{errors.courseName}</span>
          )}
        </div>
        <div
          className={`form-group ${errors.courseKeywords ? 'has-error' : ''}`}
        >
          <label htmlFor="courseKeywords">Palabras Clave</label>
          <input
            type="text"
            id="courseKeywords"
            name="courseKeywords"
            value={formData.courseKeywords}
            onChange={handleInputChange}
            placeholder="Introduce palabras clave separadas por comas"
            required
            disabled={isSubmitting}
          />
          {errors.courseKeywords && (
            <span className="error-message">{errors.courseKeywords}</span>
          )}
        </div>
        <div
          className={`form-group ${errors.courseDifficulty ? 'has-error' : ''}`}
        >
          <label htmlFor="courseDifficulty">Dificultad</label>
          <input
            type="text"
            id="courseDifficulty"
            name="courseDifficulty"
            value={formData.courseDifficulty}
            onChange={handleInputChange}
            placeholder="Introduce la dificultad del curso (fácil, medio, difícil)"
            required
            disabled={isSubmitting}
          />
          {errors.courseDifficulty && (
            <span className="error-message">{errors.courseDifficulty}</span>
          )}
        </div>
        <div
          className={`form-group ${
            errors.courseNumOfQuestions ? 'has-error' : ''
          }`}
        >
          <label htmlFor="courseNumOfQuestions">Número de Preguntas</label>
          <input
            type="number"
            id="courseNumOfQuestions"
            name="courseNumOfQuestions"
            value={formData.courseNumOfQuestions}
            onChange={handleInputChange}
            min={1}
            max={100}
            required
            disabled={isSubmitting}
          />
          {errors.courseNumOfQuestions && (
            <span className="error-message">{errors.courseNumOfQuestions}</span>
          )}
        </div>
        <button
          type="submit"
          className={`submit-button ${isSubmitting ? 'loading' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creando...' : 'Crear Curso'}
        </button>
      </form>
    </div>
  );
};
