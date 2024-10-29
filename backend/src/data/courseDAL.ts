import type {course} from '../models/courseModel';
import {createCourse} from '../models/courseModel';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

const dbPath = path.resolve(__dirname, '../database.db');

const dbPromise = open({
    filename: dbPath,
    driver: sqlite3.Database
});


// get All courses from DB into an hashset of courses
export const getAllCourses = async (): Promise<course[]> => {
    const db = await dbPromise;
    const courses = await db.all('SELECT * FROM courses');
    return courses.map((course) => createCourse(course.courseName, course.points, course.devicePort));
};

// get course by name
export const getCourseByName = async (courseName: string): Promise<course> => {
    const db = await dbPromise;
    const course = await db.get('SELECT * FROM courses WHERE courseName = ?', courseName);
    return createCourse(course.courseName, course.points, course.devicePort);
};

export const courseExists = async (courseName: string): Promise<boolean> => {
    const db = await dbPromise;
    const course = await db.get('SELECT * FROM courses WHERE courseName = ?', courseName);
    return course !== undefined;
};

export const addCourse = async (course: course): Promise<void> => {
    const db = await dbPromise;
    await db.run('INSERT INTO courses (courseName, points, devicePort) VALUES (?, ?, ?)', course.courseName, Array.from(course.pointsToTime.keys()), course.devicePort);
};

export const removeCourse = async (courseName: string): Promise<void> => {
    const db = await dbPromise;
    await db.run('DELETE FROM courses WHERE courseName = ?', courseName);
};

