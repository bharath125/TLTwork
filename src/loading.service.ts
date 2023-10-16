import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  public loadingState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  public loadingState$ = this.loadingState.asObservable();

  constructor() {}

  showLoader(): void {
    this.loadingState.next(true);
  }

  hideLoader(): void {
    this.loadingState.next(false);
  }
}
