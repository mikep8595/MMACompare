import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';


import { AppComponent } from './app.component';
import { FightcompareComponent } from './fightcompare/fightcompare.component';

const appRoutes: Routes = [
  { path: 'fighercompare', component: FightcompareComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    FightcompareComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
