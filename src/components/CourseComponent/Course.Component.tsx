import { CourseModel } from "../../models";

export function CourseComponent(props: any) {
  const course: CourseModel = props.course;
  const {date, title, description} = course;

  return (
    <div>
      <h3><span className="date">{date.toDateString()}</span> - {title}</h3>
      <p>{description}</p>
    </div>);
}
