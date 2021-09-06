import {CourseModel} from '../../models';
import {SearchField} from './../SearchField/Search-Field.component';
import {CoursesList} from './../CourceList/Course-ListComponent';
import React, {useState} from 'react';
import {getPageData, getSearchData} from '../../services/courses.service';
import useEffectAsync from '../../helpers/useEffectAsync';

export function CoursesPageComponent(props: any): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<CourseModel[]>([]);
  const [coursesFound, setCoursesFound] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [lastPage, setLastPage] = useState(0);
  const updateSearchString = (str: string) => {
    setSearchString(str);
    loadSearchResults(searchString);
  };
  const updateLoadingStatus = (isLoading: boolean) => setLoading(isLoading);
  const loadPage = (): Promise<boolean> => {
    const nextPage = lastPage + 1;

    updateLoadingStatus(true);

    return getPageData(nextPage)
      .then((data) => {
        setCourses([...courses, ...data.map(dataToCourse)]);
        setLastPage(nextPage);
        return true;
      })
      .catch(() => false)
      .finally(() => updateLoadingStatus(false));
  };
  const loadSearchResults = (searchString: string): Promise<boolean> => {
    if (searchString === '') {
      return Promise.resolve(false);
    }

    updateLoadingStatus(true);

    return getSearchData(searchString)
      .then((data) => {
        setCoursesFound(data.map(dataToCourse));

        return true;
      })
      .catch(() => false)
      .finally(() => updateLoadingStatus(false));
  };
  const dataToCourse = (course: any) => ({...course, date: new Date(course.date)} as CourseModel);
  const renderDataSection = () => {
    const coursesData = searchString === '' ? courses : coursesFound;

    if (coursesData && coursesData.length > 0) {
      return <CoursesList courses={coursesData}></CoursesList>;
    }

    return <p>Courses not found.</p>;
  };

  useEffectAsync(() => {
    loadPage();
  }, []);

  return (
    <>
      <SearchField updateSearchString={updateSearchString}></SearchField>

      <div className="row">
        <div className="column">{renderDataSection()}</div>
      </div>

      <div className="row">
        <div className="column">
          <button onClick={() => loadPage()}>Load more</button>
        </div>
      </div>
    </>
  );
}
