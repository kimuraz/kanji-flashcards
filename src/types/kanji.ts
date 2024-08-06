export interface Kanji {
    freq_mainichi_shinbun: number;
    grade: number;
    heisig_en: string;
    jlpt: number | null;
    kanji: string;
    kun_readings: string[];
    meanings: string[];
    name_readings: string[];
    notes: string[];
    on_readings: string[];
    stroke_count: number;
    unicode: string;
}

export interface KanjiWords {
    meanings: {
        glosses: string[];
    }[];
    variants: {
        priorities: string[];
        pronounced: string;
        written: string;
    }[];
}

export interface KanjiReadingSearch {
    reading: string;
    main_kanji: string[];
    name_kanji: string[];
}