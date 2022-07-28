import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { MovieFullComponent } from '../components/movie-full/movie-full.component';
import { UserRouterModule } from '../router/user-router.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from '../pipes/filter.pipe';
import { PaginationPipe } from '../pipes/pagination.pipe';


@NgModule({
  declarations: [DashboardComponent,HeaderComponent,FooterComponent,MovieFullComponent,FilterPipe,PaginationPipe],
  imports: [
    CommonModule,UserRouterModule,ReactiveFormsModule,FormsModule,HttpClientModule
  ]
})
export class UserModule { }
