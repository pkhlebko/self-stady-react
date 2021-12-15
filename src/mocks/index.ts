import {CourseModel} from '../models';

export const mockCourses: CourseModel[] = [
  {
    id: 1,
    title: 'Angular 4',
    description: 'Angular 4 course',
    authorID: 'pablo',
    date: new Date(),
    rating: {},
  },
  {
    id: 2,
    title: 'Angular.js',
    description: 'Angular.js course',
    authorID: 'mike',
    date: new Date(),
    rating: {},
  },
];
