import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatGridListModule} from '@angular/material/grid-list'
import {MatIconModule} from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserDataComponent } from './user-data/user-data.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    AppComponent,
    UserDataComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatCardModule,
    MatTableModule,
    MatGridListModule,
    MatIconModule,
    ChartsModule
  ],
  exports: [
    MatCardModule,
    MatTableModule,
    MatGridListModule,
    MatIconModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
