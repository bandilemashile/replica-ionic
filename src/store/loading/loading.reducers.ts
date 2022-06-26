import { LoadingState } from './LoadingState';
import { createReducer, on } from "@ngrx/store";
import { hide, show } from "./loading.actions";

const initialState : LoadingState ={
    show:false
}


//use the reducer to toggle the state from initial to show ==true and hide == false
const reducer = createReducer(
    initialState,
    on(show, () =>{
      return {show:true};
    }),
    on(hide, () =>{
        return {show:false};
    })
);

//takes an argument of action and state coming from the loadingstate
export function loadingReducer(state:LoadingState, action)
{
    return reducer(state,action);
}