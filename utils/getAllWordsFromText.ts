import { Names, Words } from "@/assets/datum";
import _ from "lodash";

export type ResponseWordType = {
    word: string;
    difficulty: Difficulty;
};

export enum Difficulty {
    A1 = 500,
    A2 = 1000,
    B1 = 2000,
    B2 = 4000,
    C1 = 8000,
    C2 = 9999999,
    Unknown = -1,
}

const difficulties = [
    Difficulty.A1,
    Difficulty.A2,
    Difficulty.B1,
    Difficulty.B2,
    Difficulty.C1,
    Difficulty.C2,
];

export function getDifficultyName(difficulty: Difficulty) {
    switch (difficulty) {
        case Difficulty.A1:
            return "A1";
        case Difficulty.A2:
            return "A2";
        case Difficulty.B1:
            return "B1";
        case Difficulty.B2:
            return "B2";
        case Difficulty.C1:
            return "C1";
        case Difficulty.C2:
            return "C2";
        default:
            return "Unknown";
    }
}

function getWordDifficulty(word: string) {
    const difficultyNumber = Words.findIndex(
        (t) => t[0] === word.toLowerCase()
    );
    if (difficultyNumber === -1) return Difficulty.Unknown;

    for (const difficulty of difficulties) {
        if (difficultyNumber < difficulty) {
            return difficulty;
        }
    }
    return Difficulty.Unknown;
}

function extractWordsFromText(text: string, separator: string) {
    const regex = new RegExp(separator, "g");

    return _.uniq(
        text
            .split(regex)
            .map((word) => word.replace(/\n/g, "").trim().toLowerCase())
            .filter(
                (word) =>
                    word &&
                    word !== "​" &&
                    word.length > 0 &&
                    word !== "" &&
                    !Names.includes(word)
            )
    );
}

export function getAllWordsFromText(
    text: string,
    separator: string
): ResponseWordType[] {
    const allWords = extractWordsFromText(text, separator);

    return allWords.map((word) => {
        const difficulty = getWordDifficulty(word);
        return {
            word,
            difficulty,
        };
    });
}
