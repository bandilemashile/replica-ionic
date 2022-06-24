import { LoginState } from './login/LoginState';
import { LoadingState } from './loading/LoadingState';
import { RegisterState } from './register/RegisterState';


export interface AppState{
    
    loading:LoadingState;
    login:LoginState;
    register:RegisterState;
}