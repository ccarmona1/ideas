import { useApiResource } from '../../hooks/useApiResource';
import { backendService } from '../../services/backend';
import type { QuestionMetadata } from '../../types';

export function useGetQuestions(courseName: string) {
  return useApiResource<QuestionMetadata[]>(
    () => backendService.getQuestions(courseName),
    [courseName]
  );
}
