import { LoginState } from './login/LoginState';
import { LoadingState } from './loading/LoadingState';
import { RegisterState } from './register/RegisterState';

//the three main states of the app
//loading for the loading process
//login for the login process
//register for the registration process
export interface AppState{
    
    loading:LoadingState;
    login:LoginState;
    register:RegisterState;
}