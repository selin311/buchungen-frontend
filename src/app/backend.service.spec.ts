import { TestBed } from '@angular/core/testing';

import { Backend } from './backend';

describe('BackendService', () => {
  let service: Backend;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Backend);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
