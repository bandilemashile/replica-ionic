import { AppRoutingModule } from './../../app-routing.module';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { RegisterPage } from './register.page';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let router:Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPage ],
      imports: [IonicModule.forRoot(),
                 AppRoutingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  
it('should go from regsiter to home page',()=>
{
  spyOn(router,'navigate');

  component.register();

  expect(router.navigate).toHaveBeenCalledOnceWith(['home']);
})

});
