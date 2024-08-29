import { useQueries } from "@tanstack/vue-query";
import { getKanjiByGrade } from "../services/kanjiApi";

export const useKanjiByGrade = () => {
  const GRADES: number[] = [1, 2, 3, 4, 5, 6, 8];

  const queries = GRADES.map((grade) => ({
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
          return { ...acc, ...res.data };
        }, {}),
        isPending: results.some(res => res.isPending),
        errors: results.find(res => res.error),
      };
    },
  });
};
