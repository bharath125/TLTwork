import {
  AfterViewInit,
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  Inject,
  Injector,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { WalkThroughService } from 'src/services/walk-through.service';
import { WalkthroughComponent } from 'src/walkthrough/walkthrough.component';

import {
  Router,
  NavigationStart,
  NavigationEnd,
  Event,
  NavigationError,
  NavigationCancel,
} from '@angular/router';

import { LoadingService } from 'src/loading.service';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit, AfterViewInit {
  private compRef!: ComponentRef<WalkthroughComponent>;

  title = 'walkThrough';

  currentStep!: string;
  isLastStep!: boolean;

  // showLoadingBar = this.loadingService.loadingState$;

  @ViewChild('step1', { static: false }) step1!: ElementRef;
  @ViewChild('step2', { static: false }) step2!: ElementRef;
  @ViewChild('step3', { static: false }) step3!: ElementRef;
  @ViewChild('step4', { static: false }) step4!: ElementRef;
  @ViewChild('step5', { static: false }) step5!: ElementRef;

  @ViewChild('tooltip', { static: false }) tooltip!: ElementRef;

  constructor(
    private nzModalService: NzModalService,
    private walkthroughService: WalkThroughService,
    private router: Router,
    public loadingService: LoadingService,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private appRef: ApplicationRef,
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    @Inject(DOCUMENT) private doc: NzSafeAny,
    private platform: Platform
  ) {
    // this.router.events.subscribe((routerEvent: Event) => {
    //   if (routerEvent instanceof NavigationStart) {
    //     this.showLoadingBar = true;
    //   }
    //   if (
    //     routerEvent instanceof NavigationEnd ||
    //     routerEvent instanceof NavigationError
    //   ) {
    //     this.showLoadingBar = false;
    //   }
    //   console.log('this.showLoadingBar', this.showLoadingBar);
    // });

    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.loadingService.showLoader();
      }
      if (
        routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationError ||
        routerEvent instanceof NavigationCancel
      ) {
        setTimeout(() => {
          this.loadingService.hideLoader();
        }, 0);
      }

      // console.log('this.showLoadingBar', this.showLoadingBar);
    });
  }

  ngAfterViewInit(): void {
    this.updateTooltopPosition();
    // this.closeCard();
  }

  private getDoc(): Document {
    return this.doc;
  }

  ngOnInit(): void {
    console.log('platform', this.platform);

    this.currentStep = this.walkthroughService.getCurrentStep();
    this.isLastStep = this.walkthroughService.isLastStep();
    // console.log('this.isLastStep', this.isLastStep);

    this.loadingService.loadingState$.subscribe((data) => {
      // console.log(data);
    });
    const compRef = (this.compRef = this.resolver
      .resolveComponentFactory(WalkthroughComponent)
      .create(this.injector));
    console.log('compRef', compRef.instance);

    this.appRef.attachView(compRef.hostView);

    const compNode = (compRef.hostView as EmbeddedViewRef<NzSafeAny>)
      .rootNodes[0];

    console.log('compNode', compNode);

    const doc = this.getDoc();
    console.log('doc', doc.querySelector('cdk-overlay-container'));

    // const modalRef = this.nzModalService.create({
    //   nzTitle: 'Walkthrough',
    //   nzContent: WalkthroughComponent,
    //   nzFooter: null,
    //   nzClosable: false,
    //   nzMaskClosable: false,
    // });
  }

  private updateTooltopPosition(): void {
    const stepElement = this.getStepElement(this.currentStep);
    if (stepElement && this.tooltip) {
      this.renderer.appendChild(
        stepElement.nativeElement,
        this.tooltip.nativeElement
      );
    }
  }

  private getStepElement(step: string): ElementRef<any> | null {
    switch (step) {
      case 'Step 1':
        return this.step1;
      case 'Step 2':
        return this.step2;
      case 'Step 3':
        return this.step3;
      case 'Step 4':
        return this.step4;
      case 'Step 5':
        return this.step5;
      default:
        return null;
    }
  }

  closeCard() {
    this.renderer.setStyle(this.tooltip.nativeElement, 'visibility', 'hidden');
  }

  nextStep(): void {
    this.walkthroughService.nextStep();
    this.currentStep = this.walkthroughService.getCurrentStep();
    this.isLastStep = this.walkthroughService.isLastStep();
    this.updateTooltopPosition();

    // console.log('this.isLastStep', this.isLastStep);
    console.log('this.currentStep', this.currentStep);
  }

  previousStep(): void {
    this.walkthroughService.previousStep();
    this.currentStep = this.walkthroughService.getCurrentStep();
    this.isLastStep = this.walkthroughService.isLastStep();

    this.updateTooltopPosition();
  }

  closeWalkthrough(): void {
    // this.dialogRef.close();
    this.nzModalService.closeAll();
    this.closeCard();
  }

  visible: boolean = false;

  clickMe(): void {
    this.visible = false;
  }

  change(value: boolean): void {
    console.log(value);
  }
}
