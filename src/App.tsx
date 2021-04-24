import React from 'react';
import './App.css';
import { CoursesList } from './components/CourceList/Course-ListComponent';
import { mockCourses } from './mocks';

function App() {
  return (
    <div className="App container">
      <div className="row">
        <div className="one-third column"><h1>Courses app</h1></div>
        <div className="two-thirds column"><a href="#login">Login</a></div>
      </div>

      <div className="row">
        <div className="column">
          <CoursesList courses={mockCourses}></CoursesList>
        </div>
      </div>

      <div className="row">
        <div className="two-thirds column"><button>Load more</button></div>
        <div className="one-third column">© 2021 Courses App</div>
      </div>
    </div>
  );
}

export default App;
