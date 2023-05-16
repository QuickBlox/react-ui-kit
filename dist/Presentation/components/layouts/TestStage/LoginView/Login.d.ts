import React from 'react';
import './Login.scss';
import { LoginData } from '../../../../../Data/source/remote/RemoteDataSource';
export type FunctionTypeLoginDataToVoid = (data: LoginData) => void;
type LoginProps = {
    loginHandler?: FunctionTypeLoginDataToVoid;
};
declare const Login: React.FC<LoginProps>;
export default Login;
