import { Directive, ElementRef, HostListener } from '@angular/core';
import { OnboardingConfig } from 'src/onboarding.types';
import { OnboardingService } from 'src/onboardingservice/onboarding.service';

@Directive({
  selector: '[appWalkthrough]',
})
export class OnboardingDirective {
  constructor(
    private elementRef: ElementRef,
    private onboardingService: OnboardingService
  ) {}

  onBoardingConfig: OnboardingConfig = {
    items: [
      {
        selectors: '.test1-1',
        content:
          'The user guidance is to help users better understand and use the product',

        prev: 'prev',
        width: 300,
        skip: 'skip',
        next: 'next',
        done: 'done',
      },
      {
        selectors: '.test1-2',
        title: 'Test2',
        content:
          'The user guidance is to help users better understand and use the product',

        prev: 'prev',
        skip: `skip`,
        next: 'next',
        done: 'done',
      },
      {
        selectors: '.test1-3',
        title: 'Test3',
        content:
          'The user guidance is to help users better understand and use the product',

        prev: 'prev',
        skip: 'skip',
        next: 'next',
        done: 'done',
      },
    ],
    mask: true,
    maskClosable: true,
    showTotal: false,
  };

  @HostListener('click')
  onClick(): void {
    // Call the appropriate method from the onboarding service to start the onboarding process
    this.onboardingService.start(this.onBoardingConfig);
  }

  next() {
    this.onboardingService.next();
  }
}
