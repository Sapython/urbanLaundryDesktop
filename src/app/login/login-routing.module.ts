import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { NotAdminComponent } from './not-admin/not-admin.component';

const routes: Routes = [{
  path: '',
  component: LoginComponent
  
},
{
  path:"notAdmin",
  component:NotAdminComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
