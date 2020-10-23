import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes} from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TetrisComponent } from './tetris/tetris.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';



const appRoutes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    TetrisComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
   ),
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent, WelcomeComponent, LoginComponent, RegisterComponent]
})
export class AppModule { }
