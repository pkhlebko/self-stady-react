import React, {useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {CoursesPageComponent} from './components/CoursesPage/CoursesPage.component';
import {LoginPageComponent} from './components/LoginPage/LoginPage.component';
import {EditCoursePageComponent} from './components/EditCoursePage/EditCoursePage.component';
import {getLoggedUser, saveUserIdToLocalStorage, eraseUserIdFromLocalStorage} from './services/users.service';
import {HeaderComponent} from './components/HeaderComponent/header.component';
import {UserModel} from './models';

const App = (): JSX.Element => {
  let [currentUser, setCurrentUser] = useState<UserModel | undefined>();

  useEffect(() => {
    getLoggedUser().then((user) => user && setCurrentUser(user));
  }, []);

  function logInUser(user: UserModel) {
    setCurrentUser(user);
    saveUserIdToLocalStorage(user);
  }

  function logOutUser() {
    eraseUserIdFromLocalStorage();
    setCurrentUser(undefined);
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
