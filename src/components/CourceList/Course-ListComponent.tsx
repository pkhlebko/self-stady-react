import { CourseModel } from '../../models';
import { CourseComponent } from '../CourseComponent/Course.Component';

export function CoursesList(props: any): JSX.Element {
  const courses: CourseModel[] = props.courses;
  const cL = courses.map((course: any) =>
    <li className="courses-list" key={course.id.toString()}>
      <CourseComponent course={course}></CourseComponent>
    </li>);

  return (
    <ul>{cL}</ul>
  );
}
