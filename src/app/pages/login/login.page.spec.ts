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
import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/store/login/login.actions';
import { AuthService } from 'src/app/services/auth/auth.service';
import { of } from 'rxjs';
import { User } from 'src/app/model/user/User';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router:Router;
  let page;
  let store:Store<AppState>;
  let toastController:ToastController;
  let authService:AuthService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [IonicModule.forRoot(),
                AppRoutingModule,
              ReactiveFormsModule,
              StoreModule.forRoot([]),
              StoreModule.forFeature("loading", loadingReducer),
              StoreModule.forFeature("login", loginReducer)
            ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    router = TestBed.get(Router);
    store = TestBed.get(Store);
    authService = TestBed.get(AuthService);
    toastController = TestBed.get(ToastController);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;
    // fixture.detectChanges();
  }));

//test login form
it('should create form on init ',()=>{
component.ngOnInit();

expect(component.form).not.toBeUndefined();

})


  // test to see whether the login button navigates to 
  // home page

  


//test register button
  it('should go to register page', ()=> {

    spyOn(router, 'navigate');

    component.register();

    expect(router.navigate).toHaveBeenCalledWith(['register']);
  });



  it('should recover email/password on forgot password', () =>{
    fixture.detectChanges();

    component.form.get('email').setValue("valid@email.com");

    page.querySelector("#recoverPasswordButton").click();

    store.select('login').subscribe(LoginState => {
      expect(LoginState.isRecoveringPassword).toBeTruthy();
    })
  })

  it('should show loading when recovering password', () =>{

    fixture.detectChanges();
    store.dispatch(recoverPassword());
    store.select('loading').subscribe(LoadingState => {
      expect(LoadingState.show).toBeTruthy();
    })

  })

  it('should hide loading and show sucess message when done recovering password', () =>{

    spyOn(toastController,'create');

    fixture.detectChanges();
    store.dispatch(recoverPassword());
    store.dispatch(recoverPasswordSuccess());
    store.select('loading').subscribe(LoadingState => {
      expect(LoadingState.show).toBeFalsy();
    })

    expect(toastController.create).toHaveBeenCalledTimes(1);
  })

  it('should hide loading and show error message on recover password', () =>{

    spyOn(toastController,'create');

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

  it('should hide loading component and send user to home page', () =>{
    spyOn(router,'navigate');
    spyOn(authService,'login').and.returnValue(of(new User()));

    fixture.detectChanges();
    component.form.get('email').setValue('valid@email.com');
    component.form.get('password').setValue('anyPassword');
    page.querySelector('#loginButton').click();
    store.select('loading').subscribe(LoadingState => {
      expect(LoadingState.show).toBeFalsy();
    })
    store.select('login').subscribe(LoginState =>{
      expect(LoginState.isLoggedIn).toBeTruthy();
    })
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  })

});
