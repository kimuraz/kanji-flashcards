import type { Kanji } from "../types/kanji.ts";
import supabase from "./supabase.ts";

export class ResponseError extends Error {
  constructor(public message: string, public status: number) {
    super(message);
  }
}

export const getKanjiDetails = async (kanji: string): Promise<Kanji> => {
  const { data, error } = await supabase
    .from("kanji")
    .select("*")
    .eq("kanji", kanji);
  if (error) {
    throw new ResponseError(error.message, 500);
  }
  return data[0];
}

export const getKanjiByGrade = async (grade: number): Promise<string[]> => {
  const { data, error } = await supabase
    .from("kanji")
    .select("kanji")
    .eq("grade", grade);
  if (error) {
    throw new ResponseError(error.message, 500);
  }

  return data.map((kanji) => kanji.kanji as string);
}

export const searchKanji = async (query: string): Promise<Kanji[]> => {
  const { data, error } = await supabase
    .from("kanji_full_text_search")
    .select("kanji_id")
    .textSearch("search_text", query)
    .limit(20);
  if (error) {
    throw new ResponseError(error.message, 500);
  }
  const { data: kanjiData, error: kanjiError } = await supabase
    .from("kanji")
    .select("*")
    .in("id", data.map((d) => d.kanji_id));
  if (kanjiError) {
    throw new ResponseError(kanjiError.message, 500);
  }
  return kanjiData;
}
