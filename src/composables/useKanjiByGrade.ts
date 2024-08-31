import { QueryClient, useQueries, type UseQueryOptions } from "@tanstack/vue-query";
import { getKanjiByGrade } from "../services/kanjiApi";
import { experimental_createPersister } from '@tanstack/query-persist-client-core'

export const useKanjiByGrade = () => {
  const GRADES: number[] = [1, 2, 3, 4, 5, 6, 8];

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        gcTime: 1000 * 60,
        // @ts-ignore
        persister: experimental_createPersister({
          storage: localStorage,
          maxAge: 1000 * 60 * 60 * 24 * 30,
        }),
      },
    },
  });

  const queries: UseQueryOptions[] = GRADES.map((grade) => ({
    queryKey: ["kanjiByGrade", grade],
    queryFn: async () => {
      const kanjis = await getKanjiByGrade(grade);
      if (!kanjis?.length) return {};

      return { [grade]: kanjis };
    },
  }));

  return useQueries({
    queries,
    combine: (results) => {
      return {
        data: results.reduce((acc, res) => {
          if (!(res.data instanceof Object)) {
            return acc;
          }
          return { ...acc, ...res.data };
        }, {}),
        isPending: results.some(res => res.isPending),
        errors: results.find(res => res.error),
      };
    },
  },
    queryClient,
  );
};
