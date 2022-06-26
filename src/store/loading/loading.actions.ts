import { createAction } from "@ngrx/store";


//loading ACTIONS to control the state of the loading component
export const show = createAction("[Loading] show");
export const hide = createAction("[Loading] hide");