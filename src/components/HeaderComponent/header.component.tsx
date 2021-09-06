import React from 'react';
import {Link} from 'react-router-dom';
import {UserModel} from '../../services/users.service';

export interface HeaderComponentPropsModel {
  user?: UserModel;
  logOutUser: () => void;
}

export function HeaderComponent(props: HeaderComponentPropsModel): JSX.Element {
  const {user, logOutUser} = props;
  const getNavList = (user?: UserModel): JSX.Element => {
    let addCourseLink: JSX.Element = <></>;
    let loginLink = <Link to="/login">Login</Link>;

    if (props.user) {
      addCourseLink = (
        <li>
          <Link to="/edit">Add course</Link>
        </li>
      );
      loginLink = <button onClick={logOutUser}>{user?.name}</button>;
    }

    return (
      <ul>
        {addCourseLink}
        <li>{loginLink}</li>
      </ul>
    );
  };

  return (
    <div className="row">
      <div className="one-third column">
        <Link to="/">
          <h1>Courses app</h1>
        </Link>
      </div>
      <div className="two-thirds column">
        <nav>{getNavList(user)}</nav>
      </div>
    </div>
  );
}
