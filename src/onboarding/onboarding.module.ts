import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingDirective } from './onboarding.directive';
import { OnboardingComponent } from './onboarding.component';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [OnboardingDirective, OnboardingComponent],
  imports: [
    CommonModule,
    NzPopoverModule,
    NzNoAnimationModule,
    NzOutletModule,
    NzButtonModule,
  ],
  exports: [OnboardingDirective],
})
export class OnboardingModule {}
