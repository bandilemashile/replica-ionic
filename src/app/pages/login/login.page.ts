import { recoverPasswordFail } from './../../../store/login/login.actions';
import { ToastController } from '@ionic/angular';
import { LoginState } from './../../../store/login/LoginState';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { LoginPageForm } from './login.page.form';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { hide, show } from 'src/store/loading/loading.actions';
import { recoverPassword, recoverPasswordSuccess } from 'src/store/login/login.actions';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit,OnDestroy {

  form:FormGroup;
  loginStateSubscription:Subscription;

  constructor(private router: Router,private formbuilder:FormBuilder,private store: Store<AppState>,
    private toastController:ToastController,private authService:AuthService) { }

  ngOnInit() {

    this.form = new LoginPageForm(this.formbuilder).createForm();

    this.loginStateSubscription = this.store.select('login').subscribe(LoginState => {
      this.onIsRecoveredPassword(LoginState);
      this.onIsRecoveringPassword(LoginState);
      this.isOnRecoverPasswordFail(LoginState);
     
    })
  }

  //state unsubscribe method
  ngOnDestroy(){
    if(this.loginStateSubscription){
      this.loginStateSubscription.unsubscribe();
    }
    
  }

  //hide loading component 
  //show error message on email password fail
  private async isOnRecoverPasswordFail(loginState:LoginState){
     if(loginState.error){
      this.store.dispatch(hide());
     }

     const toaster = await this.toastController.create({
      position:"bottom",
      message:loginState.error.message,
      color:"danger"

  });
  toaster.present();

  }


//show loading component
//recover password true
  private onIsRecoveringPassword(loginState:LoginState)
  {
    if(loginState.isRecoveringPassword){
      this.store.dispatch(show());

      this.authService.recoverEmailPassword(this.form.get('email').value).subscribe(() => {
          this.store.dispatch(recoverPasswordSuccess());
      },error => 
      {
        this.store.dispatch(recoverPasswordFail({error}))
      });
    }
  }


//hide loading component
//show success message on email password recovery
  private async onIsRecoveredPassword(loginState:LoginState)
  {
    if(loginState.isRecoveredPassword){
      this.store.dispatch(hide());

      const toaster = await this.toastController.create({
          position:"bottom",
          message:"Recovery email sent",
          color:"primary"

      });
      toaster.present();
    }
  }

//initiate forgot password on button click
  forgotPassword(){

    this.store.dispatch(recoverPassword());
    // this.store.dispatch(show())

    // setTimeout(() =>{
    //   this.store.dispatch(hide())
    // },3000 )
  }


  login(){
     this.router.navigate(['home']);
  }

  register(){
    this.router.navigate(['register']);
 }

}
