import {CourseModel} from '../../models';
import {SearchField} from './../SearchField/Search-Field.component';
import {CoursesList} from './../CourceList/Course-ListComponent';
import React, {useState} from 'react';
import {getPageData, getSearchData} from '../../services/courses.service';
import useEffectAsync from '../../helpers/useEffectAsync';
import { useDispatch, useSelector } from 'react-redux';
import { selectCourses, selectSearchString } from '../../store';
import { actions } from '../../store/actions';


export function CoursesPageComponent(props: any): JSX.Element {
  const courses = useSelector(selectCourses);
  const searchString = useSelector(selectSearchString);
  const dispatch = useDispatch();

  const [coursesFound, setCoursesFound] = useState([]);

  const [lastPage, setLastPage] = useState(0);

  const updateSearchString = (str: string) => {
    dispatch(actions.setSearchString(str))
    //loadSearchResults(searchString);
  };

  const loadPage = (): Promise<boolean> => {
    const nextPage = lastPage + 1;

    return getPageData(nextPage)
      .then((data) => {
        dispatch(actions.setCourses(nextPage, data.map(dataToCourse)))
        setLastPage(nextPage);

        return true;
      })
      .catch(() => false);
  };
  const loadSearchResults = (searchString: string): Promise<boolean> => {
    if (searchString === '') {
      return Promise.resolve(false);
    }

    return getSearchData(searchString)
      .then((data) => {
        dispatch(actions.setCoursesFound(data.map(dataToCourse)))
        setCoursesFound(data.map(dataToCourse));

        return true;
      })
      .catch(() => false);
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
