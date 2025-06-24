import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCourse } from '../useCreateCourse';
import type { CreateCourseDTO } from '@tester/types';

export interface UseNewCourseForm {
  formData: CreateCourseDTO;
  isSubmitting: boolean;
  errors: Partial<CreateCourseDTO>;
  serverError: string | null;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  setServerError: React.Dispatch<React.SetStateAction<string | null>>;
}

export function useNewCourseForm(): UseNewCourseForm {
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
      setServerError(
        error instanceof Error
          ? error.message
          : 'Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    errors,
    serverError,
    handleInputChange,
    handleSubmit,
    setServerError,
  };
}
