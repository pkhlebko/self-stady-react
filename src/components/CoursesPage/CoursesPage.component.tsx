import {actions, getCoursesPageContent, thunks} from '../../store';
import {useDispatch, useSelector} from 'react-redux';
import {CoursesList} from './../CourceList/Course-ListComponent';
import {SearchField} from './../SearchField/Search-Field.component';
import React from 'react';
import useEffectAsync from '../../helpers/useEffectAsync';

export function CoursesPageComponent(props: any): JSX.Element {
  const {courses, coursesFound, searchString, currentPage, lastPage} = useSelector(getCoursesPageContent);
  const dispatch = useDispatch();

  const updateSearchString = (str: string) => {
    dispatch(actions.setSearchString(str));
    dispatch(thunks.fetchSearchResults(str));
  };

  const loadPage = () => dispatch(thunks.fetchCoursesPage(currentPage));
  const renderDataSection = () => {
    const coursesData = searchString ? coursesFound : courses;

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
          <button onClick={() => loadPage()} disabled={lastPage}>
            Load more
          </button>
        </div>
      </div>
    </>
  );
}
