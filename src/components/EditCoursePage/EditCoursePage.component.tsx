import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router';
import {UserModel} from '../../models';
import {CoursesService} from '../../services';
import {selectCurrentUser} from '../../store';

export function EditCoursePageComponent(props: {user?: UserModel}): JSX.Element {
  const currentUser = useSelector(selectCurrentUser);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const history = useHistory();
  const redirectToMain = () => history.push('/');
  const onSubmitClick = async () => {
    await CoursesService.addCourse({
      authorID: currentUser?.id,
      title,
      description,
      date: new Date(),
      rating: {},
    });
    redirectToMain();
  };
  const onCancelClick = () => redirectToMain();

  useEffect(() => {
    if (!props.user) {
      history.push('/');
    }
  }, [props.user, history]);

  return (
    <>
      <div className="field">
        <label className="label">Title</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Course title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Description</label>
        <div className="control">
          <textarea
            className="textarea"
            placeholder="Textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button className="button is-link" onClick={onSubmitClick}>
            Submit
          </button>
        </div>
        <div className="control">
          <button className="button is-link is-light" onClick={onCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
