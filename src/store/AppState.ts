import { LoginState } from './login/LoginState';
import { LoadingState } from './loading/LoadingState';


export interface AppState{
    
    loading:LoadingState;
    login:LoginState;
}