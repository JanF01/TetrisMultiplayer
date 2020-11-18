import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { RouterModule, Routes} from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TetrisComponent } from './tetris/tetris.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

import { GameService } from './game.service';
import { VerificationService } from './verification.service';
import { GuardService } from './guard.service';
import { PanelComponent } from './panel/panel.component';


enableRipple(true);


const appRoutes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'panel', component: PanelComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'tetris', component: TetrisComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    TetrisComponent,
    LoginComponent,
    RegisterComponent,
    PanelComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
   ),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ButtonModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [GameService, VerificationService, GuardService],
  bootstrap: [AppComponent, WelcomeComponent, LoginComponent, RegisterComponent, TetrisComponent]
})
export class AppModule { }
