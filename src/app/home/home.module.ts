import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms'; // Importer FormsModule ici
import { HomePage } from './home.page';
import { HttpClientModule } from '@angular/common/http';
import { HomePageRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, // Ajouter FormsModule aux imports
    IonicModule,
    HomePageRoutingModule,
    HttpClientModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}