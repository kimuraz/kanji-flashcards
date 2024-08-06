import type {Kanji, KanjiReadingSearch, KanjiWords} from "../types/kanji.ts";

export class ResponseError extends Error{
    constructor(public message: string, public status: number) {
        super(message);
    }
}

const baseURL = "https://kanjiapi.dev/v1/";
const headers = {
    "Accept": "application/json",
}

const get = async (endpoint: string) => {
    const response = await fetch(baseURL + endpoint, { headers });
    if (!response.ok) {
        throw new ResponseError(response.statusText, response.status);
    }
    return await response.json();
}

export const getKanjiDetails = async (kanji: string): Promise<Kanji> => {
    return await get(`kanji/${kanji}`);
}

export const getKanjiByGrade = async (grade: number): Promise<string[]> => {
    return await get(`kanji/grade-${grade}`);
}

export const getKanjiByReading = async (reading: string): Promise<KanjiReadingSearch> => {
    return await get(`reading/${reading}`);
}

export const getKanjiWords = async (kanji: string): Promise<KanjiWords[]> => {
    return await get(`words/${kanji}`);
}