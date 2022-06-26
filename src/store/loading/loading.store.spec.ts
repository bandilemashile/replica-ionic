import { createAction } from '@ngrx/store';
import { LoadingState } from './LoadingState';
import { hide, show } from "./loading.actions";
import { loadingReducer } from "./loading.reducers";


describe('Loading store', () => {
    
    //test whether the loader is showing
    it('show', () =>{
        const initialState : LoadingState = {show: false};
        const newState = loadingReducer(initialState, show());

        expect(newState).toEqual({show:true});
    })

     //test whether the loader is hiding
    it('hide', () =>{
        const initialState : LoadingState = {show: true};
        const newState = loadingReducer(initialState, hide());

        expect(newState).toEqual({show:false});
    })

     //test whether the loader is unknown
    it('should keep state if action is unknown', () =>{
        const initialState : LoadingState = {show: true};
        const action = createAction("UNKNOWN");
        const newState = loadingReducer(initialState, action);

        expect(newState).toEqual({show:true});
    })
})