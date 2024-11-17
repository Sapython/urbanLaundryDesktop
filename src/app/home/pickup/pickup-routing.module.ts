import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PickupComponent } from './pickup.component';

const routes: Routes = [{
  path: '',
  component: PickupComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PickupRoutingModule { }
