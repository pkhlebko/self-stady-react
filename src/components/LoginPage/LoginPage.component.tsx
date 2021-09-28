import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {logUserIn, UserModel} from '../../services/users.service';

export const LoginPageComponent = (props: {updateUser: (user: UserModel) => void}): JSX.Element => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  function validateForm() {
    return userId.length > 2 && password.length > 2;
  }

  async function handleSubmit(event: any) {
    event.preventDefault();

    const user = await logUserIn(userId, password);

    if (user) {
      props.updateUser(user);
      history.push('/');
    }
  }

  return (
    <>
      <p>Login page</p>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input
              className="input"
              type="text"
              placeholder="Login"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
            <span className="icon is-small is-right">
              <i className="fas fa-check"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <input
              className="input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <button className="button is-primary" type="submit" disabled={!validateForm()}>
            Login
          </button>
        </div>
      </form>
    </>
  );
};
