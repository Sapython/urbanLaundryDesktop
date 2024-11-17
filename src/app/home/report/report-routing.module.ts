import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportTableComponent } from './report-table/report-table.component';
import { ReportComponent } from './report.component';

const routes: Routes = [{
  path: '',
  component: ReportComponent,
},{
  path: ':id',
  component:ReportTableComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
