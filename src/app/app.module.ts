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
import { AuthGuardService } from './guards/auth-guard.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from 'angularfire2/auth';


const appRoutes: Routes = [
   { 
      path: 'authentication', 
      component: AuthenticationComponent 
   },
   { 
      path: 'home', 
      component: GameScreenComponent, 
      canActivate: [AuthGuardService],
      children: [
      { 
         path: 'collection', component: CollectionComponent, 
         canActivate: [AuthGuardService] 
      }]
   },
   { 
      path: '', 
      redirectTo: 'authentication', 
      pathMatch: 'full' 
   },
   { 
      path: '**', 
      component: PageNotFoundComponent 
   }
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
      LoadingComponent,
      PageNotFoundComponent
   ],
   imports: [
      BrowserModule,
      RouterModule.forRoot(appRoutes),     //registering the routes (declared in appRoutes) in RouterModule
      HttpClientModule,
      FormsModule,
      AngularFireModule.initializeApp(environment.firebase)
   ],
   providers: [
      DbService,
      AuthenticationService,
      AngularFireAuth
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
