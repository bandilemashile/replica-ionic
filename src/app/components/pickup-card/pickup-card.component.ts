import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pickup-card',
  templateUrl: './pickup-card.component.html',
  styleUrls: ['./pickup-card.component.scss'],
})
export class PickupCardComponent implements OnInit {


  @Input() hasHeader:boolean;
  @Input() hasFooter:boolean;

  @Input() status:string;
  @Input() updatedAt:string;
  @Input() createdAt:string;
  @Input() notes:string;
  @Input() value:string;

  constructor() { }

  ngOnInit() {}

}
