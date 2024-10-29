import type { user } from '../models/userModel';
import { createUser } from '../models/userModel';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

const dbPath = path.resolve(__dirname, '../database.db');

const dbPromise = open({
    filename: dbPath,
    driver: sqlite3.Database
});

export const getUserTable = async (): Promise<user[]> => {
    const db = await dbPromise;
    const users = await db.all('SELECT name,score from users');
    return users.map((user) => createUser(user.name, user.score, ''));
};


// get All users from DB into an hashset of users
export const getAllUsers = async (): Promise<user[]> => {  // Change return type to user[]
    const db = await dbPromise;
    const users = await db.all('SELECT * FROM users');
    return users.map((user) => createUser(user.name, user.score, user.password));
  };
  

// get user by name
export const getUserByName = async (name: string): Promise<user> => {
    const db = await dbPromise;
    const user = await db.get('SELECT * FROM users WHERE name = ?', name);

    return createUser(user.name, user.score, user.password);
};

export const userExists = async (name: string): Promise<boolean> => {
    const db = await dbPromise;
    const user = await db.get('SELECT * FROM users WHERE name = ?', name);
    return user !== undefined;
};

export const addUser = async (user: user): Promise<void> => {
    const db = await dbPromise;
    await db.run('INSERT INTO users (name, score, password) VALUES (?, ?, ?)', user.name, user.score, user.password);
};
