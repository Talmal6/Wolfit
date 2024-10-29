export type course = {
    courseName: string,
    pointsToTime : Map<number,number>,
    devicePort : number,

}

export const createCourse = (courseName: string, points: number[], devicePort : number): course=> {
    const pointsToTime = new Map<number, number>();
    points.forEach((point, index) => {
        pointsToTime.set(point, index);
    });

    return {courseName, pointsToTime , devicePort};
}
