import React, { useState } from 'react';
import './Login.scss';
import { InitParams } from '../../../providers/QuickBloxUIKitProvider/QuickBloxUIKitProvider';
import useQbInitializedDataContext from '../../../providers/QuickBloxUIKitProvider/useQbInitializedDataContext';
import { LoginData } from '../../../../Data/source/remote/RemoteDataSource';

export type FunctionTypeLoginDataToVoid = (data: LoginData) => void;

type LoginProps = {
  loginHandler?: FunctionTypeLoginDataToVoid;
};
// eslint-disable-next-line react/function-component-definition
const Login: React.FC<LoginProps> = ({ loginHandler }: LoginProps) => {
  const currentContext = useQbInitializedDataContext();
  const [UserName, setUsername] = useState(
    currentContext.InitParams.loginData?.login || 'tester',
  );
  const [Password, setPassword] = useState('quickblox');

  // const [term, setTerm] = useState('');

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    event.preventDefault();

    // Do something
    // alert(username);
    console.log('submit actions perform');

    const data: LoginData = {
      login: UserName,
      password: Password,
    };

    console.log('data: ', data);

    if (loginHandler) {
      //
      const oldData: InitParams = currentContext.InitParams;
      const newData: InitParams = { ...oldData, loginData: data };

      currentContext.updateQBInitParams(newData);
      //
      loginHandler(data);
    }
  };

  return (
    <div id="login">
      <h1>Please login.</h1>

      <form onSubmit={submitForm}>
        <fieldset>
          <p>
            <input
              type="text"
              required
              placeholder="Username"
              value={UserName}
              onChange={(event) => setUsername(event.target.value)}
            />
          </p>

          <p>
            <input
              type="password"
              required
              placeholder="Password"
              value={Password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </p>

          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </div>
    // <div className="container">
    //   <form onSubmit={submitForm}>
    //     <input
    //       value={term}
    //       onChange={(e) => setTerm(e.target.value)}
    //       type="text"
    //       placeholder="Enter a term"
    //       className="input"
    //     />
    //     <button type="submit" className="btn">
    //       Submit
    //     </button>
    //   </form>
    // </div>
  );
};

export default Login;
