import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { NestedDashboardComponent } from './nested-dashboard/nested-dashboard.component';

const routes:Routes=[
  {path:'',redirectTo:'dashboard',pathMatch:'full'},
  {path:'dashboard',loadChildren:()=>import('./dashboard/dashboard.module').then(m=>m.DashboardModule)},
  { path: 'nested', component: NestedDashboardComponent }

]
@NgModule({
  imports: [RouterModule.forRoot(routes),HttpClientModule],

  exports: [RouterModule]
})
export class AppRoutingModule { 

  
}
