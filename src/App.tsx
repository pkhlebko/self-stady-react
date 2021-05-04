import React, { Component } from 'react';
import './App.css';
import { CoursesList } from './components/CourceList/Course-ListComponent';
import { CourseModel } from './models';
import { getPageData } from './services/courses.service';

export interface AppState {
  loading: boolean;
  courses: CourseModel[];
  lastPage: number;
}

class App extends Component {

  state: AppState = {loading: false, courses: [], lastPage: 0};

  async componentDidMount() {
    await this.loadPage();
  }

  render() {
    return (
      <div className="App container">
        <div className="row">
          <div className="one-third column"><h1>Courses app</h1></div>
          <div className="two-thirds column"><a href="#login">Login</a></div>
        </div>

        <div className="row">
          <div className="column">
            <CoursesList courses={this.state.courses}></CoursesList>
          </div>
        </div>

        <div className="row">
          <div className="two-thirds column"><button>Load more</button></div>
          <div className="one-third column">© 2021 Courses App</div>
        </div>
      </div>
    );
  }

  private loadPage() {
    const nextPage = this.state.lastPage + 1;
    const setLoading = (state: boolean) => this.setState({loading: state});

    setLoading(true);

    return getPageData(nextPage)
      .then((data) => {
        const courses = [...this.state.courses, data];
        this.setState({courses, lastPage: nextPage});

        return true;
      })
      .catch(() => false)
      .finally(() => setLoading(false));
  }

}

export default App;
