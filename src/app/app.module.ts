import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WalkthroughModule } from 'src/walkthrough/walkthrough.module';
import { CommonModule } from '@angular/common';

import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { OnboardingModule } from 'src/onboarding/onboarding.module';
import { OnboardingService } from 'src/onboardingservice/onboarding.service';
import { SlimLoadingBarService } from 'src/slim-loading-bar.service';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    WalkthroughModule,
    NzModalModule,
    NzGridModule,
    NzButtonModule,
    NzToolTipModule,
    NzCardModule,
    NzPopoverModule,
    OnboardingModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    OnboardingService,
    SlimLoadingBarService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
