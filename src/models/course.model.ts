export interface CourseModel {
  id?: number;
  title: string;
  description: string;
  authorID: string;
  date: Date;
  rating: {[key: string]: number};
}