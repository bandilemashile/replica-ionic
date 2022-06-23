import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
//see all pick up calls
  goToPickUpCalls(){
     this.router.navigate(['pickup-calls']);
  }

//create a new pick up call
  newPickUpCall(){
    this.router.navigate(['pickup-call']);
  }

}
