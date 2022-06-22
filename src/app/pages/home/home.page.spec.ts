import { AppRoutingModule } from './../../app-routing.module';
import { Router } from '@angular/router';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let router:Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [IonicModule.forRoot(),
                AppRoutingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  //view all pick up calls test
  it('should go to  pickup calls to see all',()=>{
     spyOn(router,'navigate');

     component.goToPickUpCalls();

    expect(router.navigate).toHaveBeenCalledOnceWith(['pickup-calls']);

  });

  // create new pickup call test
  it('should go to all the new pickup calls to create new',()=>{
    spyOn(router,'navigate');

    component.newPickUpCall();

   expect(router.navigate).toHaveBeenCalledOnceWith(['pickup-call']);

 });
 
});
