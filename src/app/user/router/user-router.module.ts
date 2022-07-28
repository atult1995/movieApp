import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { MovieFullComponent } from '../components/movie-full/movie-full.component';


const routes:Routes=[{path:"user",children:[{path:"dashboard",component:DashboardComponent},{path:"movieFull",component:MovieFullComponent}
,{path:"**",component:DashboardComponent}]}]
@NgModule({
  declarations: [],
  imports: [
   RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class UserRouterModule { }
