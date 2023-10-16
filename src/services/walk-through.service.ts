import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WalkThroughService {
  constructor() {}

  private currentStep = 0;
  private steps: string[] = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'];

  getCurrentStep(): string {
    return this.steps[this.currentStep];
  }

  nextStep(): void {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  isLastStep(): boolean {
    console.log('this.currentStep', this.currentStep);
    return this.currentStep === this.steps.length - 1;
  }
}
