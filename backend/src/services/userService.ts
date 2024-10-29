/**
 * Imports the following functions from the userModel module:
 * - `createUser`: Function to create a new user.
 * - `getScore`: Function to get the score of a user.
 * - `getId`: Function to get the ID of a user.
 * - `getName`: Function to get the name of a user.
 * 
 * Also imports the `User` type from the userModel module.
 */
import {getUserByName,getAllUsers} from '../data/userDAL';
import { getUserTable } from '../data/userDAL';

import type { user } from '../models/userModel';



export const LoginAsManager = async (username: string, password: string): Promise<{ user?: user; error?: string }> => {
    try {
      const user = await getUserByName(username);
      console.log(user);
      if (user && user.password === password) {
        return { user };
      } else {
        return { error: 'Invalid username or password' };
      }
    } catch (e) {
      return { error: 'An unexpected error occurred during login' };
    }
  };
  


export const fetchUserTable = async (): Promise<{ users?: user[]; error?: string }> => {
  try {
    // Assuming you have a function to get all users
    const users = await getUserTable(); // Call the correct function to get all users
    return { users };
  } catch (e) {
    return { error: 'An unexpected error occurred while fetching users' };
  }
};
    




