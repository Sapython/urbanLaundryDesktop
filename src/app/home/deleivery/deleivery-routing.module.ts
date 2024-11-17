import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeleiveryComponent } from './deleivery.component';

const routes: Routes = [{
  path: '',
  component: DeleiveryComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeleiveryRoutingModule { }
