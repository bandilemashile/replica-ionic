import { AuthService } from 'src/app/services/auth/auth.service';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { register, registerFail, registerSuccess } from './register.actions';
import { UserRegister } from 'src/app/model/user/UserRegister';


@Injectable()
export class RegisterEffects{

    constructor(private actions$ : Actions,private authService:AuthService){

    }

    //this effect uses the user information that is entered in the Registerform
    //uses the auth Service to check where the registerSuccess or registerFail actions should be in effect
    register$ = createEffect(() => this.actions$.pipe(

        ofType(register),
        switchMap((payload : {userRegister : UserRegister}) =>  
        this.authService.register(payload.userRegister).pipe(
            map(( )=> registerSuccess()),
            catchError(error => of(registerFail({error})))
        ))
    ))

}