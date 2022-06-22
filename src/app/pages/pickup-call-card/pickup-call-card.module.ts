import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PickupCallCardPageRoutingModule } from './pickup-call-card-routing.module';

import { PickupCallCardPage } from './pickup-call-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PickupCallCardPageRoutingModule
  ],
  declarations: [PickupCallCardPage]
})
export class PickupCallCardPageModule {}
