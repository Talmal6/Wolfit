import { Game } from '../models/gameModel';
import { course } from '../models/courseModel';
import {getAllCourses} from '../data/courseDAL';

export const startGame = (players: string[]) => {
  const game = new Game(players);
  game.start();
  return { message: 'Game started', players: game.players };
};


export const fetchAllCourses = async (): Promise<{ courses?: course[]; error?: string }> => {
  try {
    const courses = await getAllCourses();
    return { courses };
  } catch (e) {
    return { error: 'An unexpected error occurred while fetching courses' };
  }
}
