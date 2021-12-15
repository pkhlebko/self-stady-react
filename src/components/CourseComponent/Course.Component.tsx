import { useDispatch } from 'react-redux';
import {CourseModel} from '../../models';
import { getRating } from '../../services/rating.service';
import { actions } from '../../store';

export function CourseComponent(props: any) {
  const dispatch = useDispatch();
  const course: CourseModel = props.course;
  const {date, title, description, rating} = course;
  const updateRating = (mark: number) => {
    const newRating = {...rating, pablo: mark};
    dispatch(actions.updateCourse({...course, rating: newRating}));
  };

  const getRateButtons = () => {
    const marks = [1, 2, 3, 4, 5];
    return marks.map((mark) => <button key={mark} onClick={() => updateRating(mark)}>{mark}</button>);
  }

  return (
    <div>
      <h3>
        <span className="date">{date.toDateString()}</span> - {title}
      </h3>
      <p>{description}</p>
      <p>{getRating(rating)} - {getRateButtons()}</p>
    </div>
  );
}
