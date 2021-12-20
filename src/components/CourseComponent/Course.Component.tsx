import {thunks, selectCurrentUser} from '../../store';
import {CourseModel, UserModel} from '../../models';
import {getRating} from '../../services/rating.service';
import {useDispatch, useSelector} from 'react-redux';

export function CourseComponent(props: any) {
  const dispatch = useDispatch();
  const course: CourseModel = props.course;
  const {date, title, description, rating} = course;
  const currentUser = useSelector(selectCurrentUser);

  const updateRating = (mark: number): void => {
    if (currentUser?.id) {
      const newRating = {...rating, [currentUser?.id]: mark};
      dispatch(thunks.updateCourse({...course, rating: newRating}));
    }
  };

  const getRateButtons = (currentUser: UserModel | undefined): JSX.Element[] => {
    const marks = [1, 2, 3, 4, 5];
    const generateButton = (mark: number) => (
      <button key={mark} onClick={() => updateRating(mark)}>
        {mark}
      </button>
    );
    return currentUser ? marks.map(generateButton) : [<></>];
  };

  return (
    <div>
      <h3>
        <span className="date">{date.toDateString()}</span> - {title}
      </h3>
      <p>{description}</p>
      <p>
        {getRating(rating)} {getRateButtons(currentUser)}
      </p>
    </div>
  );
}
