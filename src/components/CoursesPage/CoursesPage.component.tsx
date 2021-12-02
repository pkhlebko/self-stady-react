import {CourseModel} from '../../models';
import {SearchField} from './../SearchField/Search-Field.component';
import {CoursesList} from './../CourceList/Course-ListComponent';
import React, {useState} from 'react';
import {getPageData} from '../../services/courses.service';
import useEffectAsync from '../../helpers/useEffectAsync';
import { useDispatch, useSelector } from 'react-redux';
import { selectCourses, selectSearchString } from '../../store';
import { actions, thunks } from '../../store/actions';


export function CoursesPageComponent(props: any): JSX.Element {
  const courses = useSelector(selectCourses);
  const searchString = useSelector(selectSearchString);
  const dispatch = useDispatch();

  const [lastPage, setLastPage] = useState(0);

  const updateSearchString = (str: string) => {
    dispatch(actions.setSearchString(str));
    dispatch(thunks.fetchSearchResults(str));
  };

  const loadPage = (): Promise<boolean> => {
    const nextPage = lastPage + 1;

    return getPageData(nextPage)
      .then((data) => {
        dispatch(actions.setCourses(nextPage, data))
        setLastPage(nextPage);

        return true;
      })
      .catch(() => false);
  };

  const renderDataSection = () => {
    const coursesData = courses;

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
