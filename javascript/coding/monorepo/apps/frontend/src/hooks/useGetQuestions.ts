import { useApiResource } from './useApiResource';
import { backendService } from '../services/backend';
import type { QuestionDTO } from '@tester/types';

export function useGetQuestions(courseName: string) {
  return useApiResource<QuestionDTO[]>(
    () => backendService.getQuestions(courseName),
    [courseName]
  );
}
