# Frontend Refactoring Plan - Interactive Quiz Application

## REFACTOR_OBJECTIVES

- SEPARATE_BUSINESS_LOGIC_FROM_UI: Extract business logic to services
- REDUCE_COMPONENT_SIZE: Maximum 150 lines per component
- IMPROVE_TYPESCRIPT: Eliminate any types, add specific types
- OPTIMIZE_HOOKS: Create reusable hooks, eliminate duplication
- APPLY_SOLID_PRINCIPLES: Single responsibility, dependency inversion
- ELIMINATE_CODE_DUPLICATION: DRY principle implementation

## EXECUTION_METHODOLOGY

RULE: Execute one phase completely before starting next phase
RULE: Always run Build Frontend and Build Backend tasks after changes
RULE: Test functionality after each phase
RULE: Do not modify user-facing behavior

## CURRENT_CODE_ANALYSIS

### CRITICAL_ISSUES

COMPONENT_TOO_LARGE: /src/features/components/course/Course.tsx (415 lines)

- Manages quiz state
- Handles navigation logic
- Manages transition effects
- Handles drag and drop
- Complex conditional rendering

HOOK_DUPLICATION:

- /src/features/hooks/useGetCourses.ts
- /src/features/hooks/useGetQuestions.ts
- Both contain similar API call logic with any[] types

WEAK_TYPESCRIPT:

- answer: string (should be union type)
- any[] in API hooks
- Missing specific interfaces

## REFACTORING_PHASES

### PHASE_0_PREPARATION

TASKS:

- TASK_0_1: Execute VSCode task "Run E2E tests"
- TASK_0_2: Execute VSCode task "Build Frontend" (must succeed)
- TASK_0_3: Execute VSCode task "Build Backend" (must succeed)
- TASK_0_4: Verify application functionality:
  - Load courses page
  - Open quiz from course
  - Answer question correctly (auto-advance)
  - Answer question incorrectly (show explanation)
  - Test drag/swipe for skip and explanations
  - Test new course creation
- TASK_0_5: Create git branch "refactor/phase-by-phase"
- TASK_0_6: Take screenshots for reference

VALIDATION: All tasks complete, application works identically

### PHASE_1_IMPROVE_TYPES

OBJECTIVE: Enhance TypeScript without changing logic

TASK_1_1: Modify /src/types/index.ts

- ADD_CONSTANT_QuizState:

```typescript
export const QuizState = {
  LOADING: 'loading',
  QUESTION: 'question',
  EXPLANATION: 'explanation',
  COMPLETED: 'completed',
} as const;
export type QuizStateType = (typeof QuizState)[keyof typeof QuizState];
```

- ADD_CONSTANT_AnswerOption:

```typescript
export const AnswerOption = {
  A: 'a',
  B: 'b',
  C: 'c',
  D: 'd',
} as const;
export type AnswerOptionType = (typeof AnswerOption)[keyof typeof AnswerOption];
```

- ADD_CONSTANT_DifficultyLevel:

```typescript
export const DifficultyLevel = {
  PRINCIPIANTE: 'principiante',
  INTERMEDIO: 'intermedio',
  AVANZADO: 'avanzado',
} as const;
export type DifficultyLevelType =
  (typeof DifficultyLevel)[keyof typeof DifficultyLevel];
```

TASK_1_2: Add interfaces to /src/types/index.ts

- ADD_INTERFACE_ApiState:

```typescript
export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
```

- ADD_INTERFACE_QuizSession:

```typescript
export interface QuizSession {
  questions: QuestionMetadata[];
  currentQuestionIndex: number;
  correctCount: number;
  incorrectCount: number;
  skippedCount: number;
  questionQueue: QuestionMetadata[];
  state: QuizStateType;
}
```

- ADD_INTERFACE_QuestionState:

```typescript
export interface QuestionState {
  selectedOption: number | undefined;
  answeredCorrectly: boolean;
  isReady: boolean;
}
```

TASK_1_3: Update QuestionMetadata interface

- CHANGE: answer: string TO answer: AnswerOptionType
- CHANGE: invalidOptions: Partial<Record<'a'|'b'|'c'|'d', string>>
  TO invalidOptions: Partial<Record<AnswerOptionType, string>>

TASK_1_4: Verify compilation

- EXECUTE: Build Frontend task (expect failures - do not fix yet)
- VERIFY: Type errors are detected correctly

VALIDATION: Types created, compilation shows expected errors

### PHASE_2_GENERIC_API_HOOK

OBJECTIVE: Eliminate API hook duplication

TASK_2_1: Create /src/hooks/useApiCall.ts

```typescript
import { useState, useEffect, useCallback } from 'react';
import type { ApiState } from '../types';

export function useApiCall<T>(
  apiCall: () => Promise<T>,
  dependencies: React.DependencyList = []
): ApiState<T> & { refetch: () => void } {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const data = await apiCall();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }, [apiCall]);

  const refetch = useCallback(() => fetchData(), [fetchData]);

  useEffect(() => {
    fetchData();
  }, dependencies);

  return { ...state, refetch };
}
```

TASK_2_2: Refactor /src/features/hooks/useGetCourses.ts

- IMPORT: useApiCall, ApiState from correct paths
- CHANGE_RETURN_TYPE: UseApiState<any[]> TO ApiState<CourseMetadata[]>
- REPLACE_IMPLEMENTATION:

```typescript
export const useGetCourses = () => {
  return useApiCall(() => backendService.getCourses());
};
```

- REMOVE: UseApiState interface definition

TASK_2_3: Refactor /src/features/hooks/useGetQuestions.ts

- IMPORT: useApiCall, ApiState from correct paths
- CHANGE_RETURN_TYPE: UseApiState<any[]> TO ApiState<QuestionMetadata[]>
- REPLACE_IMPLEMENTATION:

```typescript
export const useGetQuestions = (courseName: string) => {
  return useApiCall(
    () => backendService.getQuestions(courseName),
    [courseName]
  );
};
```

- REMOVE: UseApiState interface definition

TASK_2_4: Update component imports

- UPDATE: /src/features/components/courses/Courses.tsx imports
- UPDATE: /src/features/components/course/Course.tsx imports
- VERIFY: No TypeScript errors

VALIDATION: Hooks use generic implementation, no duplication, same functionality

### PHASE_3_BUSINESS_SERVICES

OBJECTIVE: Extract business logic to pure functions

TASK_3_1: Create /src/services/QuizService.ts

```typescript
import type { QuestionMetadata } from '../types';

export function validateAnswer(
  question: QuestionMetadata,
  selectedIndex: number
): boolean {
  const selectedLetter = ['a', 'b', 'c', 'd'][selectedIndex];
  return selectedLetter === question.answer;
}

export function getCorrectAnswerIndex(question: QuestionMetadata): number {
  return ['a', 'b', 'c', 'd'].indexOf(question.answer);
}

export function calculateAccuracy(correct: number, total: number): number {
  return total > 0 ? Math.round((correct / total) * 100) : 0;
}

export function reorderQuestions(
  questions: QuestionMetadata[],
  currentIndex: number
): QuestionMetadata[] {
  const currentQuestion = questions[currentIndex];
  return [
    ...questions.slice(0, currentIndex),
    ...questions.slice(currentIndex + 1),
    currentQuestion,
  ];
}
```

TASK_3_2: Create /src/services/FormValidationService.ts

```typescript
import type { CreateCourseRequest } from '../types';

export function validateCourseName(name: string): string | null {
  if (!name.trim()) return 'El nombre del curso es obligatorio';
  return null;
}

export function validateCourseKeywords(keywords: string): string | null {
  if (!keywords.trim()) return 'Las palabras clave son obligatorias';
  return null;
}

export function validateFormData(
  data: CreateCourseRequest
): Record<string, string> {
  const errors: Record<string, string> = {};

  const nameError = validateCourseName(data.courseName);
  if (nameError) errors.courseName = nameError;

  const keywordsError = validateCourseKeywords(data.courseKeywords);
  if (keywordsError) errors.courseKeywords = keywordsError;

  if (!data.courseDifficulty)
    errors.courseDifficulty = 'Debes seleccionar una dificultad';
  if (data.courseNumOfQuestions <= 0)
    errors.courseNumOfQuestions = 'Debe ser mayor a 0';

  return errors;
}
```

TASK_3_3: Test services compilation

- EXECUTE: Build Frontend task
- VERIFY: No compilation errors
- VERIFY: Services are pure functions without dependencies

VALIDATION: Services created with pure functions, compilation successful

### PHASE_4_SPECIALIZED_HOOKS

OBJECTIVE: Extract state logic from large components

TASK_4_1: Create /src/hooks/useQuizSession.ts

```typescript
import { useState, useEffect, useCallback } from 'react';
import type { QuestionMetadata } from '../types';
import { reorderQuestions, calculateAccuracy } from '../services/QuizService';

export function useQuizSession(questions: QuestionMetadata[]) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [skippedCount, setSkippedCount] = useState(0);
  const [questionQueue, setQuestionQueue] = useState<QuestionMetadata[]>([]);

  useEffect(() => {
    if (questions && questions.length > 0) {
      setQuestionQueue(questions);
    }
  }, [questions]);

  const handleCorrectAnswer = useCallback(
    (index: number) => {
      setCorrectCount((c) => c + 1);
      if (index < questionQueue.length - 1) {
        setCurrentQuestionIndex(index + 1);
      }
    },
    [questionQueue.length]
  );

  const handleIncorrectAnswer = useCallback(() => {
    setIncorrectCount((c) => c + 1);
  }, []);

  const handleSkipQuestion = useCallback(() => {
    setSkippedCount((c) => c + 1);
    const newQueue = reorderQuestions(questionQueue, currentQuestionIndex);
    setQuestionQueue(newQueue);

    if (currentQuestionIndex >= newQueue.length - 1) {
      setCurrentQuestionIndex(
        Math.min(currentQuestionIndex, newQueue.length - 1)
      );
    }
  }, [questionQueue, currentQuestionIndex]);

  const isCompleted = currentQuestionIndex >= questionQueue.length;
  const accuracy = calculateAccuracy(
    correctCount,
    correctCount + incorrectCount
  );

  return {
    currentQuestionIndex,
    correctCount,
    incorrectCount,
    skippedCount,
    questionQueue,
    handleCorrectAnswer,
    handleIncorrectAnswer,
    handleSkipQuestion,
    isCompleted,
    accuracy,
  };
}
```

TASK_4_2: Create /src/hooks/useFormValidation.ts

```typescript
import { useState, useCallback } from 'react';

export function useFormValidation<T extends Record<string, any>>(
  initialValues: T,
  validationRules: Record<keyof T, (value: any) => string | null>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const validateField = useCallback(
    (name: keyof T, value: any) => {
      const rule = validationRules[name];
      return rule ? rule(value) : null;
    },
    [validationRules]
  );

  const validateAll = useCallback(() => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    Object.keys(values).forEach((key) => {
      const error = validateField(key as keyof T, values[key]);
      if (error) {
        newErrors[key as keyof T] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validateField]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      const processedValue =
        name === 'courseName' ? value.replace(/\s/g, '') : value;

      setValues((prev) => ({ ...prev, [name]: processedValue }));

      if (errors[name as keyof T]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  return {
    values,
    errors,
    handleChange,
    validateAll,
    resetForm,
  };
}
```

TASK_4_3: Create /src/hooks/useQuestionState.ts

```typescript
import { useState, useEffect, useCallback } from 'react';
import type { QuestionMetadata } from '../types';
import { validateAnswer, getCorrectAnswerIndex } from '../services/QuizService';

export function useQuestionState(question: QuestionMetadata) {
  const [selectedOption, setSelectedOption] = useState<number | undefined>();
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setSelectedOption(undefined);
    setAnsweredCorrectly(false);
    setIsReady(false);

    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, [question.question]);

  const handleSelectOption = useCallback(
    (index: number) => {
      if (!answeredCorrectly && isReady) {
        setSelectedOption(index);
        const isCorrect = validateAnswer(question, index);

        if (isCorrect) {
          setAnsweredCorrectly(true);
        }

        return isCorrect;
      }
      return false;
    },
    [question, answeredCorrectly, isReady]
  );

  const reset = useCallback(() => {
    setSelectedOption(undefined);
    setAnsweredCorrectly(false);
    setIsReady(false);
  }, []);

  const correctIndex = getCorrectAnswerIndex(question);

  return {
    selectedOption,
    answeredCorrectly,
    isReady,
    handleSelectOption,
    reset,
    correctIndex,
  };
}
```

TASK_4_4: Verify hooks compilation

- EXECUTE: Build Frontend task
- VERIFY: No compilation errors
- VERIFY: All hooks properly typed

VALIDATION: Specialized hooks created, compilation successful

### PHASE_5_REFACTOR_COURSE_COMPONENT

OBJECTIVE: Reduce Course.tsx from 415 to <150 lines

TASK_5_1: Create /src/features/components/course/QuizHeader.tsx

```typescript
import React from 'react';
import { Link } from 'react-router-dom';

interface QuizHeaderProps {
  courseName: string;
  correctCount: number;
  incorrectCount: number;
  remaining: number;
  skippedCount: number;
}

export const QuizHeader: React.FC<QuizHeaderProps> = ({
  courseName,
  correctCount,
  incorrectCount,
  remaining,
  skippedCount,
}) => (
  <div className="course-header">
    <Link to="/" className="course-back-button">
      <span className="back-button-text">Volver a cursos</span>
    </Link>
    <div className="course-scoreboard">
      <span className="score-correct">✔ {correctCount}</span>
      <span className="score-incorrect">✖ {incorrectCount}</span>
      <span className="score-total">Restantes: {remaining}</span>
      {skippedCount > 0 && (
        <span className="score-skipped">⏭ {skippedCount}</span>
      )}
    </div>
  </div>
);
```

TASK_5_2: Create /src/features/components/course/CompletionScreen.tsx

```typescript
import React from 'react';

interface CompletionScreenProps {
  courseName: string;
  correctCount: number;
  incorrectCount: number;
  skippedCount: number;
  accuracy: number;
}

export const CompletionScreen: React.FC<CompletionScreenProps> = ({
  courseName,
  correctCount,
  incorrectCount,
  skippedCount,
  accuracy,
}) => (
  <div className="course-completion">
    <h2>🎉 ¡Cuestionario completado!</h2>
    <p>
      Has terminado todas las preguntas de <strong>{courseName}</strong>
    </p>
    <div className="completion-stats">
      <div className="stat-item">
        <span className="stat-value">{correctCount}</span>
        <span className="stat-label">Correctas</span>
      </div>
      <div className="stat-item">
        <span className="stat-value">{incorrectCount}</span>
        <span className="stat-label">Incorrectas</span>
      </div>
      <div className="stat-item">
        <span className="stat-value">{skippedCount}</span>
        <span className="stat-label">Saltadas</span>
      </div>
      <div className="stat-item accuracy">
        <span className="stat-value">{accuracy}%</span>
        <span className="stat-label">Precisión</span>
      </div>
    </div>
  </div>
);
```

TASK_5_3: Refactor /src/features/components/course/Course.tsx

- IMPORT: useQuizSession hook
- IMPORT: QuizHeader, CompletionScreen components
- REPLACE: All individual useState with useQuizSession hook
- REMOVE: handleCorrect, handleIncorrect, handleSkipQuestion functions (now in hook)
- REPLACE: Header JSX with <QuizHeader /> component
- REPLACE: Completion JSX with <CompletionScreen /> component
- KEEP: Drag/drop logic and transition logic (complex UI behavior)
- VERIFY: Component is < 200 lines

TASK_5_4: Test integration

- EXECUTE: Build Frontend task
- EXECUTE: Build Backend task
- TEST: Quiz functionality identical to before refactor
- TEST: All transitions and animations work
- TEST: Drag and drop functionality works

VALIDATION: Course.tsx significantly reduced, functionality identical

### PHASE_6_REFACTOR_QUESTION_COMPONENT

OBJECTIVE: Improve Question.tsx structure

TASK_6_1: Create /src/features/components/question/OptionsList.tsx

```typescript
import React from 'react';

interface OptionsListProps {
  options: string[];
  selectedOption: number | undefined;
  correctIndex: number;
  isCorrect: boolean;
  onSelectOption: (index: number) => void;
  disabled: boolean;
  isReady: boolean;
}

export const OptionsList: React.FC<OptionsListProps> = ({
  options,
  selectedOption,
  correctIndex,
  isCorrect,
  onSelectOption,
  disabled,
  isReady,
}) => (
  <ul className="question-list">
    {options.map((option, index) => {
      let btnClass = 'option-btn';

      if (selectedOption === index) {
        btnClass += ' selected';
        if (selectedOption !== undefined) {
          btnClass += isCorrect ? ' answer-correct' : ' answer-incorrect';
        }
      }

      if (
        selectedOption !== undefined &&
        !isCorrect &&
        index === correctIndex
      ) {
        btnClass += ' answer-correct';
      }

      return (
        <li key={index}>
          <button
            type="button"
            className={btnClass}
            onClick={() => onSelectOption(index)}
            disabled={disabled || !isReady}
            aria-pressed={selectedOption === index}
            aria-label={`Opción ${String.fromCharCode(65 + index)}: ${option}`}
          >
            {option}
          </button>
        </li>
      );
    })}
  </ul>
);
```

TASK_6_2: Create /src/features/components/question/QuestionFooter.tsx

```typescript
import React from 'react';
import { SimpleDragHint } from '../common/SimpleDragHint';

interface QuestionFooterProps {
  selectedOption: number | undefined;
  isCorrect: boolean;
  canDrag?: boolean;
  onDragAction?: () => void;
  onContainerDragStart?: () => void;
  onDragMove?: (deltaY: number, opacity: number) => void;
  onDragEnd?: () => void;
  onSkip?: () => void;
}

export const QuestionFooter: React.FC<QuestionFooterProps> = ({
  selectedOption,
  isCorrect,
  canDrag,
  onDragAction,
  onContainerDragStart,
  onDragMove,
  onDragEnd,
  onSkip,
}) => (
  <>
    {selectedOption !== undefined && !isCorrect && (
      <div className="explanation-footer">
        <SimpleDragHint
          text="Arrastra o haz click aquí para ver la explicación"
          onAction={() => onDragAction?.()}
          canDrag={canDrag}
          onDragStart={onContainerDragStart}
          onDragMove={onDragMove}
          onDragEnd={onDragEnd}
        />
      </div>
    )}

    {selectedOption === undefined && onSkip && (
      <div className="explanation-footer">
        <SimpleDragHint
          text="Arrastra o haz click aquí para responder después"
          onAction={() => onDragAction?.()}
          canDrag={canDrag}
          onDragStart={onContainerDragStart}
          onDragMove={onDragMove}
          onDragEnd={onDragEnd}
        />
      </div>
    )}
  </>
);
```

TASK_6_3: Refactor /src/features/components/question/Question.tsx

- IMPORT: useQuestionState hook
- IMPORT: OptionsList, QuestionFooter components
- REPLACE: Local state with useQuestionState hook
- REPLACE: Options JSX with <OptionsList /> component
- REPLACE: Footer JSX with <QuestionFooter /> component
- REMOVE: handleSelectOption function (now in hook)
- VERIFY: Component is < 80 lines

TASK_6_4: Test functionality

- EXECUTE: Build Frontend task
- TEST: Question selection works identically
- TEST: Drag hints appear correctly
- TEST: Answer validation works

VALIDATION: Question.tsx improved structure, functionality identical

### PHASE_7_REFACTOR_NEWCOURSE_COMPONENT

OBJECTIVE: Improve form structure and validation

TASK_7_1: Create /src/components/forms/FormField.tsx

```typescript
import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  error?: string;
  type?: 'text' | 'number' | 'select';
  options?: { value: string; label: string }[];
  placeholder?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  value,
  onChange,
  error,
  type = 'text',
  options,
  placeholder,
}) => (
  <div className="form-field">
    <label htmlFor={name}>{label}</label>
    {type === 'select' && options ? (
      <select id={name} name={name} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    )}
    {error && <span className="field-error">{error}</span>}
  </div>
);
```

TASK_7_2: Create /src/features/components/new_course/CourseForm.tsx

```typescript
import React from 'react';
import { FormField } from '../../../components/forms/FormField';
import type { CreateCourseRequest } from '../../../types';

interface CourseFormProps {
  formData: CreateCourseRequest;
  errors: Partial<CreateCourseRequest>;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
}

export const CourseForm: React.FC<CourseFormProps> = ({
  formData,
  errors,
  onChange,
  onSubmit,
  isSubmitting,
}) => (
  <form onSubmit={onSubmit} className="new-course-form">
    <FormField
      label="Nombre del curso"
      name="courseName"
      value={formData.courseName}
      onChange={onChange}
      error={errors.courseName}
      placeholder="Nombre del curso (sin espacios)"
    />

    <FormField
      label="Palabras clave"
      name="courseKeywords"
      value={formData.courseKeywords}
      onChange={onChange}
      error={errors.courseKeywords}
      placeholder="Describe el tema del curso"
    />

    <FormField
      label="Dificultad"
      name="courseDifficulty"
      value={formData.courseDifficulty}
      onChange={onChange}
      error={errors.courseDifficulty}
      type="select"
      options={[
        { value: 'principiante', label: 'Principiante' },
        { value: 'intermedio', label: 'Intermedio' },
        { value: 'avanzado', label: 'Avanzado' },
      ]}
    />

    <FormField
      label="Número de preguntas"
      name="courseNumOfQuestions"
      value={formData.courseNumOfQuestions}
      onChange={onChange}
      error={errors.courseNumOfQuestions}
      type="number"
    />

    <button type="submit" disabled={isSubmitting}>
      {isSubmitting ? 'Creando...' : 'Crear Curso'}
    </button>
  </form>
);
```

TASK_7_3: Refactor /src/features/components/new_course/NewCourse.tsx

- IMPORT: useFormValidation hook
- IMPORT: FormValidationService functions
- IMPORT: CourseForm component
- DEFINE: validation rules using service functions
- REPLACE: Local form state with useFormValidation hook
- REPLACE: Form JSX with <CourseForm /> component
- REMOVE: handleInputChange, validateForm functions
- VERIFY: Component is < 100 lines

TASK_7_4: Test form functionality

- EXECUTE: Build Frontend task
- TEST: Form validation works identically
- TEST: Course creation works
- TEST: Error handling works

VALIDATION: Form improved with reusable components, functionality identical

### PHASE_8_FINAL_OPTIMIZATIONS

OBJECTIVE: Performance optimizations and cleanup

TASK_8_1: Add React.memo to presentation components

- MODIFY: QuizHeader.tsx - wrap with React.memo
- MODIFY: CompletionScreen.tsx - wrap with React.memo
- MODIFY: OptionsList.tsx - wrap with React.memo
- MODIFY: QuestionFooter.tsx - wrap with React.memo
- MODIFY: FormField.tsx - wrap with React.memo

TASK_8_2: Optimize hooks with useCallback

- MODIFY: useQuizSession.ts - wrap functions with useCallback
- MODIFY: useFormValidation.ts - wrap functions with useCallback
- MODIFY: useQuestionState.ts - wrap functions with useCallback

TASK_8_3: Add JSDoc documentation

- ADD: Documentation to all hook functions
- ADD: Documentation to all service functions
- ADD: Type descriptions for complex interfaces

TASK_8_4: Final cleanup

- REMOVE: Unused console.log statements
- REMOVE: Unused imports
- VERIFY: All exports are used
- REMOVE: Commented code

TASK_8_5: Performance verification

- EXECUTE: Build Frontend in production mode
- VERIFY: No performance warnings
- TEST: Transitions remain smooth

VALIDATION: Performance optimized, documentation added, cleanup complete

## TESTING_PROTOCOL

### PER_PHASE_VALIDATION

FOR_EACH_PHASE:

- EXECUTE: Build Frontend task (must succeed)
- EXECUTE: Build Backend task (must succeed)
- VERIFY: 0 TypeScript errors
- TEST: Specific functionality for phase
- COMMIT: Changes with descriptive message

### FINAL_VALIDATION

REQUIREMENTS:

- BUILD_SUCCESS: Both frontend and backend build without errors
- FUNCTIONALITY_IDENTICAL: All user-facing behavior unchanged
- PERFORMANCE_MAINTAINED: No degradation in responsiveness
- TYPESCRIPT_CLEAN: No any types, all properly typed
- COMPONENT_SIZE: All components < 150 lines
- CODE_DUPLICATION: No duplicate logic found

### ROLLBACK_PROTOCOL

IF_FAILURE:

- CONDITION: Cannot fix issue within 15 minutes
- ACTION: git checkout -- [file] to revert specific changes
- ACTION: Analyze failure cause before retry
- ACTION: Update plan if necessary

## SUCCESS_METRICS

### BEFORE_REFACTOR_STATE

- Course.tsx: 415 lines
- Question.tsx: 158 lines
- NewCourse.tsx: 210 lines
- API_HOOKS: Duplicated logic
- TYPES: any[] and string generics
- BUSINESS_LOGIC: Mixed with UI components

### AFTER_REFACTOR_TARGET

- Course.tsx: < 150 lines
- Question.tsx: < 80 lines
- NewCourse.tsx: < 100 lines
- API_HOOKS: Single generic useApiCall
- TYPES: Specific union types, 0 any
- BUSINESS_LOGIC: Separated into services

### CREATED_FILES_CHECKLIST

- /src/hooks/useApiCall.ts
- /src/hooks/useQuizSession.ts
- /src/hooks/useFormValidation.ts
- /src/hooks/useQuestionState.ts
- /src/services/QuizService.ts
- /src/services/FormValidationService.ts
- /src/features/components/course/QuizHeader.tsx
- /src/features/components/course/CompletionScreen.tsx
- /src/features/components/question/OptionsList.tsx
- /src/features/components/question/QuestionFooter.tsx
- /src/components/forms/FormField.tsx
- /src/features/components/new_course/CourseForm.tsx

## EXECUTION_RULES

RULE_SEQUENTIAL_EXECUTION: Complete each phase entirely before proceeding
RULE_ALWAYS_BUILD: Execute build tasks after every file modification
RULE_PRESERVE_BEHAVIOR: Never change user-facing functionality
RULE_IMMEDIATE_ROLLBACK: Revert if cannot resolve issues quickly
RULE_FREQUENT_COMMITS: Commit after each completed phase
RULE_TEST_CONSTANTLY: Verify functionality after each change

## NEXT_ACTIONS

IMMEDIATE_NEXT_STEP: Execute PHASE_0_PREPARATION
EXECUTION_ORDER: Sequential phases 0 through 8
COMPLETION_CRITERIA: All success metrics achieved
FINAL_DELIVERABLE: Refactored codebase with improved architecture

### ✅ FASE 0: PREPARACIÓN

- [ ] **Ejecutar task `Run E2E tests` desde VSCode Tasks**
- [ ] **Ejecutar task `Build Frontend` - debe completar sin errores**
- [ ] **Ejecutar task `Build Backend` - debe completar sin errores**
- [ ] **Verificar funcionalidad básica:**
  - [ ] Página principal carga lista de cursos
  - [ ] Click en curso abre quiz correctamente
  - [ ] Respuesta correcta avanza automáticamente
  - [ ] Respuesta incorrecta muestra explicación
  - [ ] Drag/swipe funciona para skip y explicaciones
  - [ ] Creación de nuevo curso funciona
- [ ] **Crear rama**: `git checkout -b refactor/phase-by-phase`
- [ ] **Tomar screenshot de cada pantalla principal para referencia**

---

### ✅ FASE 1: TIPOS Y INTERFACES MEJORADAS

> **Objetivo:** Mejorar tipado sin cambiar lógica

#### 1.1 Crear constants tipados en `/src/types/index.ts`

- [ ] **Agregar constant `QuizState`:**
  ```typescript
  export const QuizState = {
    LOADING: 'loading',
    QUESTION: 'question',
    EXPLANATION: 'explanation',
    COMPLETED: 'completed',
  } as const;
  export type QuizStateType = (typeof QuizState)[keyof typeof QuizState];
  ```
- [ ] **Agregar constant `AnswerOption`:**
  ```typescript
  export const AnswerOption = {
    A: 'a',
    B: 'b',
    C: 'c',
    D: 'd',
  } as const;
  export type AnswerOptionType =
    (typeof AnswerOption)[keyof typeof AnswerOption];
  ```
- [ ] **Agregar constant `DifficultyLevel`:**
  ```typescript
  export const DifficultyLevel = {
    PRINCIPIANTE: 'principiante',
    INTERMEDIO: 'intermedio',
    AVANZADO: 'avanzado',
  } as const;
  export type DifficultyLevelType =
    (typeof DifficultyLevel)[keyof typeof DifficultyLevel];
  ```

#### 1.2 Crear interfaces específicas en `/src/types/index.ts`

- [ ] **Interface `ApiState<T>`:**
  ```typescript
  export interface ApiState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
  }
  ```
- [ ] **Interface `QuizSession`:**
  ```typescript
  export interface QuizSession {
    questions: QuestionMetadata[];
    currentQuestionIndex: number;
    correctCount: number;
    incorrectCount: number;
    skippedCount: number;
    questionQueue: QuestionMetadata[];
    state: QuizStateType;
  }
  ```
- [ ] **Interface `QuestionState`:**
  ```typescript
  export interface QuestionState {
    selectedOption: number | undefined;
    answeredCorrectly: boolean;
    isReady: boolean;
  }
  ```

#### 1.3 Actualizar `QuestionMetadata` interface

- [ ] **Cambiar `answer: string` por `answer: AnswerOptionType`**
- [ ] **Cambiar `invalidOptions: Partial<Record<'a'|'b'|'c'|'d', string>>` por `invalidOptions: Partial<Record<AnswerOptionType, string>>`**

#### 1.4 Verificar compilación

- [ ] **Ejecutar `Build Frontend` - debe fallar en varios lugares (esperado)**
- [ ] **NO arreglar errores aún - solo verificar que los tipos se detectan**

**✅ Checkpoint:** Todo compila sin errores

---

### ✅ FASE 2: HOOK GENÉRICO PARA API CALLS

> **Objetivo:** Eliminar duplicación en hooks de API

#### 2.1 Crear archivo `/src/hooks/useApiCall.ts`

- [ ] **Implementar hook genérico `useApiCall<T>`:**
  ```typescript
  export function useApiCall<T>(
    apiCall: () => Promise<T>,
    dependencies: React.DependencyList = []
  ): ApiState<T> & { refetch: () => void };
  ```
- [ ] **Implementar lógica de estado `loading/error/data`**
- [ ] **Implementar función `refetch`**
- [ ] **Implementar manejo de errores con try/catch**

#### 2.2 Refactorizar `useGetCourses.ts`

- [ ] **Importar `useApiCall` y `ApiState`**
- [ ] **Cambiar tipo de retorno de `UseApiState<any[]>` a `ApiState<CourseMetadata[]>`**
- [ ] **Reemplazar lógica interna por:**
  ```typescript
  export const useGetCourses = () => {
    return useApiCall(() => backendService.getCourses());
  };
  ```
- [ ] **Eliminar interface `UseApiState` (ahora innecesaria)**
- [ ] **Verificar que funciona igual con `Build Frontend`**

#### 2.3 Refactorizar `useGetQuestions.ts`

- [ ] **Importar `useApiCall` y `ApiState`**
- [ ] **Cambiar tipo de retorno de `UseApiState<any[]>` a `ApiState<QuestionMetadata[]>`**
- [ ] **Reemplazar lógica interna por:**
  ```typescript
  export const useGetQuestions = (courseName: string) => {
    return useApiCall(
      () => backendService.getQuestions(courseName),
      [courseName]
    );
  };
  ```
- [ ] **Eliminar interface `UseApiState` duplicada**
- [ ] **Verificar que funciona igual con `Build Frontend`**

#### 2.4 Actualizar imports en componentes

- [ ] **En `Courses.tsx`: cambiar `useGetCourses` import para usar nuevo tipo**
- [ ] **En `Course.tsx`: cambiar `useGetQuestions` import para usar nuevo tipo**
- [ ] **Verificar que no hay errores de TypeScript**

**✅ Checkpoint:** Hooks funcionan igual pero sin duplicación

---

### ✅ FASE 3: SERVICIOS DE NEGOCIO

> **Objetivo:** Extraer lógica de negocio de componentes

#### 3.1 Crear archivo `/src/services/QuizService.ts`

- [ ] **Implementar función `validateAnswer`:**
  ```typescript
  export function validateAnswer(
    question: QuestionMetadata,
    selectedIndex: number
  ): boolean {
    const selectedLetter = ['a', 'b', 'c', 'd'][selectedIndex];
    return selectedLetter === question.answer;
  }
  ```
- [ ] **Implementar función `getCorrectAnswerIndex`:**
  ```typescript
  export function getCorrectAnswerIndex(question: QuestionMetadata): number {
    return ['a', 'b', 'c', 'd'].indexOf(question.answer);
  }
  ```
- [ ] **Implementar función `calculateAccuracy`:**
  ```typescript
  export function calculateAccuracy(correct: number, total: number): number {
    return total > 0 ? Math.round((correct / total) * 100) : 0;
  }
  ```
- [ ] **Implementar función `reorderQuestions` (para skip):**
  ```typescript
  export function reorderQuestions(
    questions: QuestionMetadata[],
    currentIndex: number
  ): QuestionMetadata[] {
    const currentQuestion = questions[currentIndex];
    return [
      ...questions.slice(0, currentIndex),
      ...questions.slice(currentIndex + 1),
      currentQuestion,
    ];
  }
  ```

#### 3.2 Crear archivo `/src/services/FormValidationService.ts`

- [ ] **Implementar función `validateCourseName`:**
  ```typescript
  export function validateCourseName(name: string): string | null {
    if (!name.trim()) return 'El nombre del curso es obligatorio';
    return null;
  }
  ```
- [ ] **Implementar función `validateCourseKeywords`:**
  ```typescript
  export function validateCourseKeywords(keywords: string): string | null {
    if (!keywords.trim()) return 'Las palabras clave son obligatorias';
    return null;
  }
  ```
- [ ] **Implementar función `validateFormData`:**
  ```typescript
  export function validateFormData(
    data: CreateCourseRequest
  ): Record<string, string> {
    const errors: Record<string, string> = {};
    // Validaciones específicas
    return errors;
  }
  ```

#### 3.3 Verificar servicios funcionan

- [ ] **Crear archivo de prueba temporal `/src/services/__test__.ts`**
- [ ] **Probar cada función con datos reales**
- [ ] **Eliminar archivo de prueba**
- [ ] **Verificar `Build Frontend` compila correctamente**

**✅ Checkpoint:** Servicios creados, aún no utilizados en componentes

---

### ✅ FASE 4: CUSTOM HOOKS ESPECIALIZADOS

> **Objetivo:** Extraer lógica de estado de componentes grandes

#### 4.1 Crear archivo `/src/hooks/useQuizSession.ts`

- [ ] **Implementar hook `useQuizSession`:**
  ```typescript
  export function useQuizSession(questions: QuestionMetadata[]) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [skippedCount, setSkippedCount] = useState(0);
    const [questionQueue, setQuestionQueue] = useState<QuestionMetadata[]>([]);
    // ... resto de la lógica
  }
  ```
- [ ] **Implementar función `handleCorrectAnswer`**
- [ ] **Implementar función `handleIncorrectAnswer`**
- [ ] **Implementar función `handleSkipQuestion` usando `reorderQuestions` service**
- [ ] **Implementar función `isCompleted`**
- [ ] **Implementar función `getAccuracy` usando `calculateAccuracy` service**
- [ ] **Retornar objeto con estado y funciones**

#### 4.2 Crear archivo `/src/hooks/useFormValidation.ts`

- [ ] **Implementar hook genérico:**
  ```typescript
  export function useFormValidation<T extends Record<string, any>>(
    initialValues: T,
    validationRules: Record<keyof T, (value: any) => string | null>
  ) {
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
    // ... lógica de validación
  }
  ```
- [ ] **Implementar función `validateField`**
- [ ] **Implementar función `validateAll`**
- [ ] **Implementar función `handleChange`**
- [ ] **Implementar función `resetForm`**
- [ ] **Retornar objeto con estado y funciones**

#### 4.3 Crear archivo `/src/hooks/useQuestionState.ts`

- [ ] **Implementar hook específico para estado de pregunta:**
  ```typescript
  export function useQuestionState(question: QuestionMetadata) {
    const [selectedOption, setSelectedOption] = useState<number | undefined>();
    const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
    const [isReady, setIsReady] = useState(false);
    // ... lógica específica
  }
  ```
- [ ] **Implementar función `handleSelectOption` usando `validateAnswer` service**
- [ ] **Implementar función `reset` para cambio de pregunta**
- [ ] **Implementar función `getCorrectIndex` usando service**
- [ ] **Retornar estado y funciones**

#### 4.4 Verificar hooks

- [ ] **Crear archivo temporal para probar cada hook**
- [ ] **Verificar que `Build Frontend` compila sin errores**
- [ ] **Eliminar archivos de prueba**

**✅ Checkpoint:** Hooks creados pero aún no integrados

---

### ✅ FASE 5: DIVIDIR COMPONENTE COURSE.TSX

> **Objetivo:** Dividir el componente más grande (415 líneas) en partes manejables

#### 5.1 Crear componente `/src/features/components/course/QuizHeader.tsx`

- [ ] **Extraer JSX del header (líneas ~300-315 aprox):**
  ```tsx
  interface QuizHeaderProps {
    courseName: string;
    correctCount: number;
    incorrectCount: number;
    remaining: number;
    skippedCount: number;
  }
  export const QuizHeader: React.FC<QuizHeaderProps> = ({ ... }) => (
    <div className="course-header">
      <Link to="/" className="course-back-button">
        <span className="back-button-text">Volver a cursos</span>
      </Link>
      <div className="course-scoreboard">
        {/* ... stats JSX */}
      </div>
    </div>
  );
  ```
- [ ] **Mover estilos relacionados si es necesario**
- [ ] **Exportar componente**

#### 5.2 Crear componente `/src/features/components/course/CompletionScreen.tsx`

- [ ] **Extraer JSX del completion (líneas ~340-370 aprox):**
  ```tsx
  interface CompletionScreenProps {
    courseName: string;
    correctCount: number;
    incorrectCount: number;
    skippedCount: number;
    accuracy: number;
  }
  export const CompletionScreen: React.FC<CompletionScreenProps> = ({ ... }) => (
    <div className="course-completion">
      {/* ... completion JSX */}
    </div>
  );
  ```
- [ ] **Mover lógica de cálculo de accuracy a prop**
- [ ] **Exportar componente**

#### 5.3 Refactorizar `Course.tsx` para usar hooks

- [ ] **Importar `useQuizSession` hook**
- [ ] **Reemplazar estado local con hook:**
  ```tsx
  const {
    currentQuestionIndex,
    correctCount,
    incorrectCount,
    skippedCount,
    questionQueue,
    handleCorrectAnswer,
    handleIncorrectAnswer,
    handleSkipQuestion,
    isCompleted,
    accuracy,
  } = useQuizSession(questionsData || []);
  ```
- [ ] **Eliminar useState individuales (líneas ~20-40 aprox)**
- [ ] **Eliminar funciones que ahora están en el hook (líneas ~80-200 aprox)**

#### 5.4 Integrar nuevos componentes en Course.tsx

- [ ] **Reemplazar JSX del header con `<QuizHeader />`**
- [ ] **Reemplazar JSX del completion con `<CompletionScreen />`**
- [ ] **Ajustar props necesarias**

#### 5.5 Limpiar código sobrante

- [ ] **Eliminar imports no utilizados**
- [ ] **Eliminar funciones movidas a hooks**
- [ ] **Eliminar estado movido a hooks**
- [ ] **Verificar que Course.tsx tiene < 200 líneas**

#### 5.6 Verificar funcionalidad

- [ ] **Ejecutar `Build Frontend` - debe compilar sin errores**
- [ ] **Probar manualmente que el quiz funciona igual**
- [ ] **Verificar transiciones y animaciones**

**✅ Checkpoint:** Course.tsx reducido de 415 a ~150 líneas

---

### ✅ FASE 6: REFACTORIZAR QUESTION.TSX

> **Objetivo:** Separar lógica de presentación en Question component

#### 6.1 Integrar `useQuestionState` hook en Question.tsx

- [ ] **Importar hook `useQuestionState`**
- [ ] **Reemplazar estado local:**

  ```tsx
  // Eliminar estas líneas:
  const [selectedOption, setSelectedOption] = useState<number | undefined>(
    undefined
  );
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Reemplazar con:
  const {
    selectedOption,
    answeredCorrectly,
    isReady,
    handleSelectOption,
    reset,
  } = useQuestionState(question);
  ```

- [ ] **Eliminar función `handleSelectOption` (líneas ~70-85 aprox)**
- [ ] **Eliminar useEffect de reset (líneas ~40-55 aprox)**

#### 6.2 Crear componente `/src/features/components/question/OptionsList.tsx`

- [ ] **Extraer JSX de la lista de opciones (líneas ~95-125 aprox):**
  ```tsx
  interface OptionsListProps {
    options: string[];
    selectedOption: number | undefined;
    correctIndex: number;
    isCorrect: boolean;
    onSelectOption: (index: number) => void;
    disabled: boolean;
    isReady: boolean;
  }
  export const OptionsList: React.FC<OptionsListProps> = ({ ... }) => (
    <ul className="question-list">
      {/* ... opciones JSX */}
    </ul>
  );
  ```
- [ ] **Mover lógica de clases CSS al componente**
- [ ] **Exportar componente**

#### 6.3 Crear componente `/src/features/components/question/QuestionFooter.tsx`

- [ ] **Extraer JSX del footer (líneas ~130-158 aprox):**
  ```tsx
  interface QuestionFooterProps {
    selectedOption: number | undefined;
    isCorrect: boolean;
    canDrag?: boolean;
    onDragAction?: () => void;
    onContainerDragStart?: () => void;
    onDragMove?: (deltaY: number, opacity: number) => void;
    onDragEnd?: () => void;
    onSkip?: () => void;
  }
  export const QuestionFooter: React.FC<QuestionFooterProps> = ({ ... }) => (
    <>
      {/* ... conditional JSX para drag hints */}
    </>
  );
  ```
- [ ] **Mover lógica condicional al componente**
- [ ] **Exportar componente**

#### 6.4 Integrar subcomponentes en Question.tsx

- [ ] **Reemplazar JSX de opciones con `<OptionsList />`**
- [ ] **Reemplazar JSX de footer con `<QuestionFooter />`**
- [ ] **Ajustar props necesarias**
- [ ] **Verificar que Question.tsx tiene < 80 líneas**

#### 6.5 Verificar funcionalidad

- [ ] **Ejecutar `Build Frontend` - debe compilar sin errores**
- [ ] **Probar selección de opciones**
- [ ] **Probar drag hints y funcionalidad**

**✅ Checkpoint:** Question.tsx más limpio y mantenible

---

### ✅ FASE 7: REFACTORIZAR NEWCOURSE.TSX

> **Objetivo:** Mejorar formulario de creación de cursos

#### 7.1 Integrar `useFormValidation` hook en NewCourse.tsx

- [ ] **Importar hook y servicio de validación**
- [ ] **Definir reglas de validación:**
  ```tsx
  const validationRules = {
    courseName: (value: string) => validateCourseName(value),
    courseKeywords: (value: string) => validateCourseKeywords(value),
    courseDifficulty: (value: string) =>
      value ? null : 'Debes seleccionar una dificultad',
    courseNumOfQuestions: (value: number) =>
      value > 0 ? null : 'Debe ser mayor a 0',
  };
  ```
- [ ] **Reemplazar estado local:**

  ```tsx
  // Eliminar:
  const [formData, setFormData] = useState<CreateCourseDTO>({...});
  const [errors, setErrors] = useState<Partial<CreateCourseDTO>>({});

  // Reemplazar con:
  const {
    values: formData,
    errors,
    handleChange,
    validateAll,
    resetForm
  } = useFormValidation(initialFormData, validationRules);
  ```

- [ ] **Eliminar función `handleInputChange` (líneas ~20-40 aprox)**
- [ ] **Eliminar función `validateForm` (líneas ~45-60 aprox)**

#### 7.2 Crear componente `/src/components/forms/FormField.tsx`

- [ ] **Crear componente reutilizable:**
  ```tsx
  interface FormFieldProps {
    label: string;
    name: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    error?: string;
    type?: 'text' | 'number' | 'select';
    options?: { value: string; label: string }[];
    placeholder?: string;
  }
  export const FormField: React.FC<FormFieldProps> = ({ ... }) => (
    <div className="form-field">
      {/* ... JSX genérico para campo */}
    </div>
  );
  ```
- [ ] **Implementar lógica para diferentes tipos de campo**
- [ ] **Mover estilos comunes de formulario**

#### 7.3 Crear componente `/src/features/components/new_course/CourseForm.tsx`

- [ ] **Extraer JSX del formulario (líneas ~80-180 aprox):**
  ```tsx
  interface CourseFormProps {
    formData: CreateCourseDTO;
    errors: Partial<CreateCourseDTO>;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isSubmitting: boolean;
  }
  export const CourseForm: React.FC<CourseFormProps> = ({ ... }) => (
    <form onSubmit={onSubmit} className="new-course-form">
      {/* ... usar FormField components */}
    </form>
  );
  ```
- [ ] **Usar componentes `FormField` para cada campo**
- [ ] **Exportar componente**

#### 7.4 Integrar componentes en NewCourse.tsx

- [ ] **Reemplazar JSX del formulario con `<CourseForm />`**
- [ ] **Ajustar props necesarias**
- [ ] **Verificar que NewCourse.tsx tiene < 100 líneas**

#### 7.5 Verificar funcionalidad

- [ ] **Ejecutar `Build Frontend` - debe compilar sin errores**
- [ ] **Probar validación de campos**
- [ ] **Probar creación de curso**

**✅ Checkpoint:** Formulario más mantenible y reutilizable

---

### ✅ FASE 8: OPTIMIZACIONES FINALES

> **Objetivo:** Pulir detalles y optimizar rendimiento

#### 8.1 Agregar React.memo a componentes de presentación

- [ ] **En `QuizHeader.tsx`:**
  ```tsx
  export const QuizHeader = React.memo<QuizHeaderProps>(({ ... }) => (
    // ... component JSX
  ));
  ```
- [ ] **En `CompletionScreen.tsx`:** Agregar `React.memo`
- [ ] **En `OptionsList.tsx`:** Agregar `React.memo`
- [ ] **En `QuestionFooter.tsx`:** Agregar `React.memo`
- [ ] **En `FormField.tsx`:** Agregar `React.memo`

#### 8.2 Optimizar callbacks con useCallback

- [ ] **En `useQuizSession.ts`:**

  ```tsx
  const handleCorrectAnswer = useCallback(
    (index: number) => {
      // ... lógica
    },
    [questionQueue.length]
  );

  const handleSkipQuestion = useCallback(() => {
    // ... lógica
  }, [questionQueue, currentQuestionIndex]);
  ```

- [ ] **En `useFormValidation.ts`:** Optimizar `handleChange` y `validateAll`
- [ ] **En `useQuestionState.ts`:** Optimizar `handleSelectOption` y `reset`

#### 8.3 Optimizar useEffect dependencies

- [ ] **Revisar todos los useEffect en hooks creados**
- [ ] **Asegurar dependencias mínimas y correctas**
- [ ] **Eliminar dependencias innecesarias**

#### 8.4 Agregar PropTypes o mejorar interfaces

- [ ] **Verificar que todas las interfaces tienen propiedades requeridas marcadas**
- [ ] **Agregar JSDoc comments a hooks y servicios:**
  ```tsx
  /**
   * Hook para manejar estado del quiz
   * @param questions - Array de preguntas del curso
   * @returns Estado y funciones del quiz
   */
  export function useQuizSession(questions: QuestionMetadata[]) {
    // ...
  }
  ```

#### 8.5 Verificar bundle size y performance

- [ ] **Ejecutar `Build Frontend` en modo producción**
- [ ] **Verificar que no hay warnings de performance**
- [ ] **Probar que las transiciones siguen siendo suaves**

#### 8.6 Cleanup final

- [ ] **Eliminar console.log innecesarios**
- [ ] **Verificar que no hay imports no utilizados**
- [ ] **Revisar que todos los archivos tienen exports correctos**
- [ ] **Verificar que no hay código comentado innecesario**

---

## 🧪 TESTING Y VALIDACIÓN

### ✅ Checklist por cada fase completada:

- [ ] **Ejecutar task `Build Frontend` desde VSCode**
- [ ] **Ejecutar task `Build Backend` desde VSCode**
- [ ] **Verificar 0 errores de TypeScript**
- [ ] **Probar funcionalidad específica afectada:**
  - [ ] **Fase 1-2:** Verificar que cursos cargan igual
  - [ ] **Fase 3-4:** Verificar que servicios y hooks funcionan
  - [ ] **Fase 5:** Verificar quiz completo funciona igual
  - [ ] **Fase 6:** Verificar selección de respuestas y drag
  - [ ] **Fase 7:** Verificar creación de cursos
  - [ ] **Fase 8:** Verificar performance general
- [ ] **Si existe task `Run E2E tests`, ejecutarla**
- [ ] **Commit cambios con mensaje descriptivo**

### ✅ Validación final (después de todas las fases):

- [ ] **Ejecutar task `Build Frontend` - 0 errores**
- [ ] **Ejecutar task `Build Backend` - 0 errores**
- [ ] **Probar flujo completo manualmente:**
  - [ ] Página principal carga correctamente
  - [ ] Seleccionar curso abre quiz
  - [ ] Responder correctamente avanza pregunta
  - [ ] Responder incorrectamente muestra explicación
  - [ ] Drag/swipe funciona para skip y avanzar
  - [ ] Completar quiz muestra estadísticas
  - [ ] Crear nuevo curso funciona
- [ ] **Verificar métricas de éxito (ver sección siguiente)**
- [ ] **Si existe task `Run E2E tests`, debe pasar al 100%**

---

## 📈 MÉTRICAS DE ÉXITO

### ✅ Antes del Refactor (Estado Actual):

- [ ] **`Course.tsx`:** 415 lines ❌
- [ ] **`Question.tsx`:** ~158 lines ❌
- [ ] **`NewCourse.tsx`:** ~210 lines ❌
- [ ] **Hooks duplicados:** `useGetCourses` y `useGetQuestions` con lógica similar ❌
- [ ] **Tipos débiles:** `any[]` en hooks, `string` genérico en answer ❌
- [ ] **Separación de responsabilidades:** Lógica de negocio mezclada con UI ❌
- [ ] **Servicios de negocio:** 0 servicios, toda lógica en componentes ❌

### ✅ Después del Refactor (Estado Objetivo):

- [ ] **`Course.tsx`:** < 150 lines ✅
- [ ] **`Question.tsx`:** < 80 lines ✅
- [ ] **`NewCourse.tsx`:** < 100 lines ✅
- [ ] **Hooks:** 0 duplicación, `useApiCall` genérico reutilizable ✅
- [ ] **Tipos:** 100% tipado fuerte, 0 `any`, union types específicos ✅
- [ ] **Separación:** Lógica de negocio en servicios, UI en componentes ✅
- [ ] **Servicios:** `QuizService`, `FormValidationService` con funciones puras ✅

### ✅ Archivos Creados (Verificar que existen):

- [ ] **`/src/types/index.ts`** - Tipos mejorados
- [ ] **`/src/hooks/useApiCall.ts`** - Hook genérico API
- [ ] **`/src/hooks/useQuizSession.ts`** - Hook estado quiz
- [ ] **`/src/hooks/useFormValidation.ts`** - Hook validación
- [ ] **`/src/hooks/useQuestionState.ts`** - Hook estado pregunta
- [ ] **`/src/services/QuizService.ts`** - Lógica de negocio quiz
- [ ] **`/src/services/FormValidationService.ts`** - Validaciones
- [ ] **`/src/features/components/course/QuizHeader.tsx`** - Componente header
- [ ] **`/src/features/components/course/CompletionScreen.tsx`** - Componente completion
- [ ] **`/src/features/components/question/OptionsList.tsx`** - Componente opciones
- [ ] **`/src/features/components/question/QuestionFooter.tsx`** - Componente footer
- [ ] **`/src/components/forms/FormField.tsx`** - Componente campo
- [ ] **`/src/features/components/new_course/CourseForm.tsx`** - Componente formulario

### ✅ Archivos Modificados (Verificar cambios):

- [ ] **`/src/types/index.ts`** - Tipos expandidos y mejorados
- [ ] **`/src/features/hooks/useGetCourses.ts`** - Usa `useApiCall`
- [ ] **`/src/features/hooks/useGetQuestions.ts`** - Usa `useApiCall`
- [ ] **`/src/features/components/course/Course.tsx`** - Reducido y refactorizado
- [ ] **`/src/features/components/question/Question.tsx`** - Dividido en subcomponentes
- [ ] **`/src/features/components/new_course/NewCourse.tsx`** - Usa hooks y componentes

---

## ⚠️ REGLAS IMPORTANTES

### 🚨 REGLA #1: UN REFACTOR A LA VEZ

- [ ] **Completar TODA una fase antes de continuar a la siguiente**
- [ ] **NO hacer cambios de múltiples fases simultáneamente**
- [ ] **Marcar cada checkbox ✅ cuando se complete**

### 🚨 REGLA #2: SIEMPRE EJECUTAR BUILD

- [ ] **Después de CADA cambio de archivo, ejecutar:**
  - `Build Frontend` task
  - `Build Backend` task
- [ ] **Si hay errores, arreglarlos ANTES de continuar**
- [ ] **No avanzar si hay warnings de TypeScript**

### 🚨 REGLA #3: TESTING CONSTANTE

- [ ] **Probar funcionalidad después de cada fase**
  - `Run E2E tests` task
- [ ] **Si algo no funciona igual, investigar INMEDIATAMENTE**
- [ ] **No continuar hasta que funcionalidad esté igual**
