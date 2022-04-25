/*
 * @description: 
 * @author: 周金顺（云天河）
 */

export interface Course {
    courseName: string;
    fileUUID: string;
    courseType: string;
}

export interface CourseListResult {
    list: Course[];
    total: number;
    page: number;
    pageSize: number;
}

export interface CreateCourseDTO {
    courseName: string;
    fileUUID: string;
}
