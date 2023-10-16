import { TestBed } from '@angular/core/testing';

import { WalkThroughService } from './walk-through.service';

describe('WalkThroughService', () => {
  let service: WalkThroughService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WalkThroughService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
