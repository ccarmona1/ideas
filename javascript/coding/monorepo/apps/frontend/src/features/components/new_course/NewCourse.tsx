import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './NewCourse.css';
import type { CreateCourseDTO } from '../../../types/createCourseDTO';
import { createCourse } from './useCreateCourse';
import BlockingSpinner from '../common/BlockingSpinner';

export const NewCourse: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CreateCourseDTO>({
    courseName: '',
    courseKeywords: '',
    courseDifficulty: 'principiante',
    courseNumOfQuestions: 5,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<CreateCourseDTO>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const processedValue =
      name === 'courseName' ? value.replace(/\s/g, '') : value;
    setFormData((prev: CreateCourseDTO) => ({
      ...prev,
      [name]: processedValue,
    }));
    if (errors[name as keyof CreateCourseDTO]) {
      setErrors((prev: Partial<CreateCourseDTO>) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CreateCourseDTO> = {};
    if (!formData.courseName.trim()) {
      newErrors.courseName = 'El nombre del curso es obligatorio';
    }
    if (!formData.courseKeywords.trim()) {
      newErrors.courseKeywords = 'Las palabras clave son obligatorias';
    }
    if (!formData.courseDifficulty) {
      newErrors.courseDifficulty = 'Debes seleccionar una dificultad' as any;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    setServerError(null);
    try {
      await createCourse(formData);
      navigate('/');
    } catch (error) {
      console.error('Error creating course:', error);
      setServerError(
        error instanceof Error
          ? error.message
          : 'Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
