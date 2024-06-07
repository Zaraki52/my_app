import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { FirstComponentComponent } from './first-component/first-component.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    

  },
  {
    path: "first-component",  component: FirstComponentComponent
  }
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
