import { AngularFireModule } from '@angular/fire/compat';
import { LoadingState } from './../../../store/loading/LoadingState';
import { LoginState } from './../../../store/login/LoginState';
import { AppState } from 'src/store/AppState';
import { loadingReducer } from 'src/store/loading/loading.reducers';
import { Store, StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './../../app-routing.module';
import { Router } from '@angular/router';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, ToastController } from '@ionic/angular';

import { LoginPage } from './login.page';
import { ReactiveFormsModule } from '@angular/forms';
import { loginReducer } from 'src/store/login/login.reducers';
import { login, LoginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/store/login/login.actions';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable, of, throwError } from 'rxjs';
import { User } from 'src/app/model/user/User';
import { environment } from 'src/environments/environment';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router:Router;
  let page;
  let store:Store<AppState>;
  let toastController:ToastController;


  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [IonicModule.forRoot(),
                AppRoutingModule,
              ReactiveFormsModule,
              StoreModule.forRoot([]),
              StoreModule.forFeature("loading", loadingReducer),
              StoreModule.forFeature("login", loginReducer),
              AngularFireModule.initializeApp(environment.firebaseConfig)
            ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    router = TestBed.get(Router);
    store = TestBed.get(Store);
    toastController = TestBed.get(ToastController);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;
    // fixture.detectChanges();
  }));

//test login form
//test whether it creates login form
it('should create form on init ',()=>{
component.ngOnInit();

expect(component.form).not.toBeUndefined();

})



//test register button navigation
//register() method 
  it('should go to register page', ()=> {

    spyOn(router, 'navigate');

    component.register();

    expect(router.navigate).toHaveBeenCalledWith(['register']);
  });


//
  it('should recover email/password on forgot password click', () =>{
    fixture.detectChanges();

    component.form.get('email').setValue("valid@email.com");

    page.querySelector("#recoverPasswordButton").click();

    store.select('login').subscribe(LoginState => {
      expect(LoginState.isRecoveringPassword).toBeTruthy();
    })
    store.select('loading').subscribe(LoadingState => {
      expect(LoadingState.show).toBeTruthy();
    })

  })



  it('given user is recovering password,when success, then hide loading and show message', () =>{

    spyOn(toastController,'create');

    fixture.detectChanges();
    store.dispatch(recoverPassword());
    store.dispatch(recoverPasswordSuccess());
    store.select('loading').subscribe(LoadingState => {
      expect(LoadingState.show).toBeFalsy();
    })

    expect(toastController.create).toHaveBeenCalledTimes(1);
  })

  it('given user is recovering password,when fail, then hide loading and show error', () =>{

    spyOn(toastController,'create').and.returnValue(<any> Promise.resolve({present : ()=>{}}));

    fixture.detectChanges();
    store.dispatch(recoverPassword());
    store.dispatch(recoverPasswordFail({error:"message"}));
    
    store.select('loading').subscribe(LoadingState => {
      expect(LoadingState.show).toBeFalsy();
    })

    expect(toastController.create).toHaveBeenCalledTimes(1);

  })




  it('should show loading component and start login when logging in', () =>{
  
    
     fixture.detectChanges();
    component.form.get('email').setValue('valid@email.com');
    component.form.get('password').setValue('anyPassword');
    page.querySelector('#loginButton').click();
    store.select('loading').subscribe(LoadingState => {
      expect(LoadingState.show).toBeTruthy();
    })

    store.select('login').subscribe(LoginState =>{
      expect(LoginState.isLoggingIn).toBeTruthy();
    })

  })




  it('given user is logging in,when succcess, then hide loading and send user to home page', () =>{
    spyOn(router,'navigate');
 

    fixture.detectChanges();
    store.dispatch(login());
    store.dispatch(loginSuccess({user : new User()}));
    store.select('loading').subscribe(LoadingState => {
      expect(LoadingState.show).toBeFalsy();
    })
    store.select('login').subscribe(LoginState =>{
      expect(LoginState.isLoggedIn).toBeTruthy();
    })
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  })




  it('given user is logging in,when fail, then hide loading and show error message', () =>{
 
   spyOn(toastController,'create').and.returnValue(<any> Promise.resolve({present : ()=>{}}));
   
    fixture.detectChanges();
    store.dispatch(login());
    store.dispatch(LoginFail({error : {message : 'error'}}));

    store.select('loading').subscribe(LoadingState => {
      expect(LoadingState.show).toBeFalsy();
    })

    expect(toastController.create).toHaveBeenCalledTimes(1);
  })

});
