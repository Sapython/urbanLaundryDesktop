import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InProgressComponent } from './in-progress.component';

const routes: Routes = [{
  path: '',
  component: InProgressComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InProgressRoutingModule { }
