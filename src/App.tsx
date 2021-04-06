import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Courses app</h1>
        <div>Login</div>
        <Welcome name="Hell"></Welcome>
      </header>
      <section><CoursesList courses={mockCourses}></CoursesList></section>
      <footer>(c) 2021 Courses App</footer>
    </div>
  );
}

export default App;

function Welcome(props: any): JSX.Element {
  return <h1>Hello, {props.name}</h1>;
}

function CoursesList(props: any): JSX.Element {
  const courses: CourseModel[] = props.courses;
  const cL = courses.map((course: any) =>
    <li key={course.id.toString()}>
      <CourseComponent course={course}></CourseComponent>
    </li>);

  return (
    <ul>{cL}</ul>
  );
}

function CourseComponent(props: any) {
  const course: CourseModel = props.course;
  const {date, title, description} = course;

  return (<div>Test {title} {date.toDateString()} {description}</div>);
}

export interface CourseModel {
  id: number;
  title: string;
  description: string;
  authorID: string;
  date: Date;
  rating: number;
}

export const mockCourses: CourseModel[] = [
  {
    id: 1,
    title: 'Angular 4',
    description: 'Angular 4 course',
    authorID: 'pablo',
    date: new Date(),
    rating: 3
  },
  {
    id: 2,
    title: 'Angular.js',
    description: 'Angular.js course',
    authorID: 'mike',
    date: new Date(),
    rating: 5
  }
];