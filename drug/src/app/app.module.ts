import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MyDatePickerModule } from 'mydatepicker';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './register/register.component';
import { ApiService } from './api.service';
import { AuthGuard } from './auth-guard.service';
import { ProfileComponent, MyDialogRef } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import 'hammerjs';
import { UploadComponent } from './upload/upload.component';
import { FindComponent } from './find/find.component';
import { SavedComponent } from './saved/saved.component';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    ProfileComponent,
    MyDialogRef,
    LoginComponent,
    UploadComponent,
    FindComponent,
    SavedComponent,
    SidenavComponent
  ],
  entryComponents: [MyDialogRef],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    AppRoutingModule,
    MyDatePickerModule,
    FlexLayoutModule,
    ToastModule.forRoot()
  ],
  providers: [
    ApiService,
    AuthGuard
  ],
  bootstrap: [AppComponent],
  exports: [SidenavComponent]
})
export class AppModule { }
