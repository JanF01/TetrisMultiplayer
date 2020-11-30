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

import { CookieService } from 'ngx-cookie-service';


import { ReactiveFormsModule } from '@angular/forms';
import { GameService } from './game.service';
import { VerificationService } from './verification.service';
import { GuardService } from './guard.service';
import { PanelComponent } from './panel/panel.component';
import { PanelUpperComponent } from './panel/panel-upper/panel-upper.component';
import { AbilitiesComponent } from './panel/abilities/abilities.component';
import { ShopComponent } from './panel/shop/shop.component';
import { LevelBarComponent } from './panel/level-bar/level-bar.component';
import { AbilityComponent } from './panel/shop/ability/ability.component';
import { HallComponent } from './hall/hall.component';
import { MentionsComponent } from './mentions/mentions.component';
import { TermsComponent } from './terms/terms.component';


enableRipple(true);


const appRoutes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'panel', component: PanelComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'tetris', component: TetrisComponent},
  {path: 'hall', component: HallComponent},
  {path: 'mentions', component: MentionsComponent},
  {path: 'terms', component: TermsComponent}
]


@NgModule({
  declarations: [
    WelcomeComponent,
    AppComponent,
    TetrisComponent,
    LoginComponent,
    RegisterComponent,
    PanelComponent,
    PanelUpperComponent,
    AbilitiesComponent,
    ShopComponent,
    LevelBarComponent,
    AbilityComponent,
    HallComponent,
    MentionsComponent,
    TermsComponent
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
    ReactiveFormsModule
  ],
  providers: [GameService, VerificationService, GuardService, CookieService],
  bootstrap: [AppComponent, LoginComponent, RegisterComponent, TetrisComponent]
})
export class AppModule { }
