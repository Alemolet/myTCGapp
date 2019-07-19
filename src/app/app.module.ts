import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MenuComponent } from './menu/menu.component';
import { GameScreenComponent } from './game-screen/game-screen.component';
import { CardComponent } from './card/card.component';
import { CollectionComponent } from './game-screen/collection/collection.component';
import { DeckPreviewComponent } from './game-screen/collection/deck-preview/deck-preview.component';
import { DbService } from './services/db.service';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthenticationService } from './services/authentication.service';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { LoadingComponent } from './shared/loading/loading.component';

const appRoutes: Routes = [
   { path: 'authentication', component: AuthenticationComponent },
   { path: 'home', component: GameScreenComponent },
   { path: '', redirectTo: 'authentication', pathMatch: 'full'},
   { path: 'collection', component: CollectionComponent}
];

@NgModule({
   declarations: [
      AppComponent,
      NavbarComponent,
      MenuComponent,
      GameScreenComponent,
      CardComponent,
      CollectionComponent,
      DeckPreviewComponent,
      AuthenticationComponent,
      AccountSettingsComponent,
      LoadingComponent
   ],
   imports: [
      BrowserModule,
      RouterModule.forRoot(appRoutes),     //registering the routes (declared in appRoutes) intheRouterModule
      HttpClientModule,
      FormsModule
   ],
   providers: [
      DbService,
      AuthenticationService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
