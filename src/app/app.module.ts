import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes} from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TetrisComponent } from './tetris/tetris.component';




@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    TetrisComponent
  ],
  imports: [
  //   RouterModule.forRoot(
<<<<<<< HEAD
  //      appRoutes,
=======
  //     appRoutes,
>>>>>>> 7fddf67fbedd8ebefc980098bec4f817b720bcc2
  //  ),
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent, WelcomeComponent]
})
export class AppModule { }
