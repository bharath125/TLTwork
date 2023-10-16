import { Component, EventEmitter } from '@angular/core';

import { NzModalService } from 'ng-zorro-antd/modal';
import { WalkThroughService } from 'src/services/walk-through.service';

import { OnboardingOpType } from 'src/onboarding.types';

@Component({
  selector: 'app-walkthrough',
  templateUrl: './walkthrough.component.html',
  styleUrls: ['./walkthrough.component.less'],
})
export class WalkthroughComponent {
  currentStep!: string;
  isLastStep!: boolean;
  isTrue: boolean = true;
  // isFinishStep!: boolean;

  readonly op = new EventEmitter<OnboardingOpType>();

  constructor(
    private walkthroughService: WalkThroughService,
    private nzModalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.currentStep = this.walkthroughService.getCurrentStep();
    this.isLastStep = this.walkthroughService.isLastStep();
    console.log('this.isLastStep', this.isLastStep);
  }

  nextStep(): void {
    this.walkthroughService.nextStep();
    this.currentStep = this.walkthroughService.getCurrentStep();
    this.isLastStep = this.walkthroughService.isLastStep();
    console.log('this.isLastStep', this.isLastStep);
    console.log('this.currentStep', this.currentStep);
  }

  previousStep(): void {
    this.walkthroughService.previousStep();
    this.currentStep = this.walkthroughService.getCurrentStep();
    this.isLastStep = this.walkthroughService.isLastStep();
  }

  closeWalkthrough(): void {
    // this.dialogRef.close();
    this.nzModalService.closeAll();
  }
}
