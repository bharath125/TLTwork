import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';
import {
  SlimLoadingBarEvent,
  SlimLoadingBarEventType,
  SlimLoadingBarService,
} from 'src/slim-loading-bar.service';
import { isPresent } from 'src/slim-loading-bar.utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  isTransition: string = 'none';

  private _progress: string = '0';
  @Input() set progress(progress: string) {
    this.isTransition =
      progress >= this._progress ? 'all 0.5s ease-in-out' : 'none';
    this._progress = progress;
  }

  get progress() {
    return this._progress;
  }

  @Input() color: string = 'firebrick';
  @Input() height: string = '2px';
  @Input() show: boolean = true;

  constructor(
    public service: SlimLoadingBarService,
    private _elmRef: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('progress()', this.progress);
    this.service.events.subscribe((event: SlimLoadingBarEvent) => {
      if (
        event.type === SlimLoadingBarEventType.PROGRESS &&
        isPresent(event.value)
      ) {
        this.progress = event.value;
      } else if (event.type === SlimLoadingBarEventType.COLOR) {
        this.color = event.value;
      } else if (event.type === SlimLoadingBarEventType.HEIGHT) {
        this.height = event.value;
      } else if (event.type === SlimLoadingBarEventType.VISIBLE) {
        this.show = event.value;
      }
    });
  }

  ngAfterViewInit(): void {
    this.service.events.subscribe((event: SlimLoadingBarEvent) => {
      this._elmRef.nativeElement.visible =
        event.type === SlimLoadingBarEventType.VISIBLE ? event.value : true;
      this._changeDetectorRef.detectChanges();
    });
  }
}
