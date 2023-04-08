const FACTS_URL = "https://catfact.ninja/fact/"
const CATS_URL = "https://cataas.com/cat/says/"

import axios from "axios";
import { from, map, Observable, switchMap } from "rxjs";
import { catchError } from "rxjs/internal/operators/catchError";

const getRandomCatFact = (): Observable<string> => {
    return from(axios.get(FACTS_URL)).pipe(
        map(response => response.data.fact),
        catchError(error => {throw "Esto es un error: " + error})
    )
};

const justSomeWords = (fact: string, words: number) => fact.split(" ").slice(0, words).join(" ");

const getCatImage = (word: string) => {
    return from(
        axios.get(`${CATS_URL}${word}`, {responseType: 'blob'})
    ).pipe(
        map(response => URL.createObjectURL(response.data))
    )
}

export const getRandomCatImage = (words: number) => {
    return getRandomCatFact().pipe(
        map(fact => justSomeWords(fact, words)),
        switchMap(
            randomWord => getCatImage(randomWord)
        )
    )
}