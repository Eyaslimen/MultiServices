import { TestBed } from '@angular/core/testing';

import { ParcoursProfilesService } from './parcours-profiles.service';

describe('ParcoursProfilesService', () => {
  let service: ParcoursProfilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParcoursProfilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
