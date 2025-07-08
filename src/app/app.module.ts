import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment.development';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ChatDashboardComponent } from './pages/chat-dashboard/chat-dashboard.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ChatDashboardComponent,
    VerifyEmailComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    // Initialize Firebase with the configuration from environment
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule, // For Realtime Database
    AngularFirestoreModule, // For Firestore
    AngularFireAuthModule, // For Authentication
    AngularFireStorageModule, // For Storage
    AngularFireMessagingModule, // For Cloud Messaging
    ToastrModule.forRoot({
      timeOut: 3000, // Duration for which the toast will be visible}
      positionClass: 'toast-bottom-center', // Position of the toast notifications
      preventDuplicates: true, // Prevent duplicate notifications
    }), // Toastr for notifications
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
