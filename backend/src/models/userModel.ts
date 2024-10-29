export type user = {
    name: string,
    score: number,
    password: string
}

export const createUser = (name: string, score: number, password: string): user => ({ name, score, password });
export const setScore = (user: user, score: number): user => ({ ...user, score });
export const getName = (user: user): string => user.name;
export const getScore = (user: user): number => user.score;
