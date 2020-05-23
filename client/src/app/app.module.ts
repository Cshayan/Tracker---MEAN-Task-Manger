import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { OfferComponent } from './components/offer/offer.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { TrackerViewComponent } from './components/tracker-view/tracker-view.component';
import { NewListComponent } from './components/new-list/new-list.component';
import { NewTaskComponent } from './components/new-task/new-task.component';
import { LoginComponent } from './components/login/login.component';
import { EditListComponent } from './components/edit-list/edit-list.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { EmailTaskComponent } from './components/email-task/email-task.component';
import { AuthGuard } from './services/auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { VerifyAccountComponent } from './components/verify-account/verify-account.component';
import { AddDescriptionComponent } from './components/add-description/add-description.component';
import { AddDateComponent } from './components/add-date/add-date.component';
import { SetLabelComponent } from './components/set-label/set-label.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeroComponent,
    OfferComponent,
    FooterComponent,
    HomeComponent,
    RegisterComponent,
    TrackerViewComponent,
    NewListComponent,
    NewTaskComponent,
    LoginComponent,
    EditListComponent,
    EditTaskComponent,
    EmailTaskComponent,
    NotFoundComponent,
    VerifyAccountComponent,
    AddDescriptionComponent,
    AddDateComponent,
    SetLabelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SimpleNotificationsModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
