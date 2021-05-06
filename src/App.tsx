import React from 'react';
import './App.css';
import {CoursesList} from './components/CourceList/Course-ListComponent';
import {SearchField} from './components/SearchField/Search-Field.component';
import {CourseModel} from './models';
import {getPageData, getSearchData} from './services/courses.service';

export interface AppState {
  courses: CourseModel[];
  coursesFound?: CourseModel[];
  lastPage: number;
  loading: boolean;
  searchString: string;
}

class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      courses: [],
      coursesFound: [],
      lastPage: 0,
      searchString: '',
    };

    this.updateSearchString = this.updateSearchString.bind(this);
  }

  async componentDidMount() {
    await this.loadPage();
  }

  render() {
    const coursesData = this.state.searchString === '' ? this.state.courses : this.state.coursesFound;

    return (
      <div className="App container">
        <div className="row">
          <div className="one-third column">
            <h1>Courses app</h1>
          </div>
          <div className="two-thirds column">
            <a href="#login">Login</a>
          </div>
        </div>

        <SearchField updateSearchString={this.updateSearchString}></SearchField>

        <div className="row">
          <div className="column">
            <CoursesList courses={coursesData}></CoursesList>
          </div>
        </div>

        <div className="row">
          <div className="two-thirds column">
            <button>Load more</button>
          </div>
          <div className="one-third column">© 2021 Courses App</div>
        </div>
      </div>
    );
  }

  updateSearchString(searchString: string) {
    this.setState({searchString});

    this.loadSearchResults(searchString);
  }

  private setLoading(state: boolean) {
    this.setState({loading: state});
  }

  private loadPage(): Promise<boolean> {
    const nextPage = this.state.lastPage + 1;

    this.setLoading(true);

    return getPageData(nextPage)
      .then((data) => {
        const courses = [...this.state.courses, ...data.map(this.dataToCourse)];

        this.setState({courses, lastPage: nextPage});

        return true;
      })
      .catch(() => false)
      .finally(() => this.setLoading(false));
  }

  private loadSearchResults(searchString: string): Promise<boolean> {
    this.setLoading(true);

    return getSearchData(searchString)
      .then((data) => {
        const coursesFound = data.map(this.dataToCourse);

        this.setState({coursesFound});

        return true;
      })
      .catch(() => false)
      .finally(() => this.setLoading(false));
  }

  private dataToCourse(course: any) {
    const date = new Date(course.date);

    return {...course, date} as CourseModel;
  }
}

export default App;
