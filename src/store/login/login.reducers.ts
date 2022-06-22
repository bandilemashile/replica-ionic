import { AppInitialState } from './../AppInitialState';
import { login,LoginFail,loginSuccess,recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from './login.actions';
import { createReducer, on } from '@ngrx/store';
import { LoginState } from './LoginState';

const initialState: LoginState = AppInitialState.login;

const reducer = createReducer(initialState,
    
    on(recoverPassword, currentState =>{
        return {
            ...currentState,
            error:null,
            isRecoveredPassword:false,
            isRecoveringPassword:true
            
        };
    }),
    on(recoverPasswordSuccess, currentState =>{
        return {
            ...currentState,
            error:null,
            isRecoveredPassword:true,
            isRecoveringPassword:false
            
        };
    }),
    on(recoverPasswordFail, (currentState,action) =>{
        return {
            ...currentState,
            error:action.error,
            isRecoveredPassword:false,
            isRecoveringPassword:false
            
        };
    }),
    on(login, currentState =>{
       return{
        ...currentState,
        error:null,
        isLoggedIn:false,
        isLoggingIn:true

       }
    }),
    on(loginSuccess, currentState =>{
        return{
            ...currentState,
            isLoggedIn:true,
            isLoggingIn:false
        }
    }),
    on(LoginFail, (currentState,action) =>{
        return {
            ...currentState,
            error:action.error,
            isLoggedIn:false,
            isLoggingIn:false
        }
    })
    
)

export function loginReducer(state:LoginState,action)
{
    return reducer(state, action);

}