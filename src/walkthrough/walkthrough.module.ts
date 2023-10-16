import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalkthroughComponent } from './walkthrough.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
// import { WalkthroughDirective } from '../onboarding/onboarding.directive';

@NgModule({
  declarations: [WalkthroughComponent],
  imports: [
    CommonModule,
    NzModalModule,
    NzButtonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class WalkthroughModule {}
