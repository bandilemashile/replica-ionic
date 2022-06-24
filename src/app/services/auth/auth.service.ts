import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from 'src/app/model/user/User';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { UserRegister } from 'src/app/model/user/UserRegister';
//add firebase/compat/app firebase does not work 


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:AngularFireAuth) { }


  register (userRegister : UserRegister) : Observable<void> {
    return new Observable<void>(observer => {
      setTimeout(() => {
       if(userRegister.email == "error@email.com"){
        observer.error({message : "email is registered"});
       }
       else{
        observer.next();
       }
       observer.complete();
      },3000)
    })
  }


  //use sendpasswordreset email function to recover paasword
  recoverEmailPassword(email:string) : Observable<void> {
    return new Observable<void>(observer => {
     this.auth.sendPasswordResetEmail(email).then(() =>{
      observer.next();
      observer.complete();
     }).catch(error => {
       //show error
        observer.error(error);
        observer.complete();
     })
    })
  }


  //use signInWithEmailAndPassword method to login
  //firebase.default is depracated so use firebase.auth
  login(email:string,password:string) : Observable<User>{
    return new Observable<User>(observer =>{
     this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
      this.auth.signInWithEmailAndPassword(email,password).then((firbaseUser : firebase.auth.UserCredential) => {
            observer.next({email,id : firbaseUser.user.uid});
            observer.complete();
      }).catch(error => {
         observer.error(error);
         observer.complete();
      })
     })
     
    })
  }
}
