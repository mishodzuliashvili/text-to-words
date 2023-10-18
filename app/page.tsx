"use client";
import {
    Difficulty,
    ResponseWordType,
    getAllWordsFromText,
    getDifficultyName,
} from "@/utils/getAllWordsFromText";
import { useState } from "react";

export default function Home() {
    const [text, setText] = useState("Hey World");
    const [separator, setSeparator] = useState("[.,!;?/'\"” —“]|’s|s’| - ");
    let a: ResponseWordType[] = [];
    try {
        a = getAllWordsFromText(text, separator);
    } catch (error) {
        console.log(error);
    }

    // use local storage for inputs and maybe i will save words on backend database
    return (
        <div>
            <input
                value={separator}
                onChange={(e) => setSeparator(e.target.value)}
                className="text-black"
                type="text"
            />
            <textarea
                value={text}
                className="text-black"
                onChange={(e) => setText(e.target.value)}
            ></textarea>
            <div>
                {a
                    .filter((m) => m.difficulty === Difficulty.C1)
                    .map((c) => (
                        <div key={c.word}>
                            {c.word} - {getDifficultyName(c.difficulty)}
                        </div>
                    ))}
            </div>
        </div>
    );
}
