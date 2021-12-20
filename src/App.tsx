import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {CoursesPageComponent} from './components/CoursesPage/CoursesPage.component';
import {LoginPageComponent} from './components/LoginPage/LoginPage.component';
import {EditCoursePageComponent} from './components/EditCoursePage/EditCoursePage.component';
import {HeaderComponent} from './components/HeaderComponent/header.component';
import {UserModel} from './models';
import {useDispatch, useSelector} from 'react-redux';
import {actions, selectCurrentUser} from './store';
import {UserService} from './services';

const App = (): JSX.Element => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    UserService.getLoggedUser().then((user) => user && dispatch(actions.setCurrentUser(user)));
  }, [dispatch]);

  function logInUser(user: UserModel) {
    dispatch(actions.setCurrentUser(user));
    UserService.saveUserIdToLocalStorage(user);
  }

  function logOutUser() {
    UserService.eraseUserIdFromLocalStorage();
    dispatch(actions.setCurrentUser(undefined));
  }

  return (
    <Router>
      <div className="App container">
        <HeaderComponent user={currentUser} logOutUser={logOutUser}></HeaderComponent>

        <Switch>
          <Route exact path="/">
            <CoursesPageComponent />
          </Route>
          <Route path="/login">
            <LoginPageComponent updateUser={logInUser} />
          </Route>
          <Route path="/edit">
            <EditCoursePageComponent user={currentUser} />
          </Route>
        </Switch>

        <div className="one-third column">© 2021 Courses App</div>
      </div>
    </Router>
  );
};

export default App;
