import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './Core/Module/core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialExampleModule } from './Core/Module/core/material.module';
import { AuthInterceptorInterceptor } from './Core/Services/Auth/auth-interceptor.interceptor';
import { AppComponent } from './app.component';
import { AdminModule } from './Modules/admin/admin.module';
import { LoaderInterceptor } from './Core/Interceptors/loader.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { NumberArrayPipe } from './Core/Pipes/number-array.pipe';
import { ImgErrDirective } from './Core/Directives/img-err.directive';
import { LoaderComponent } from './Shared/component/loader/loader.component';
import { NgForNumberDirective } from './Core/Directives/ng-for-number.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    NgForNumberDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      progressBar: true,
      preventDuplicates: true,
    }),
    AdminModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
