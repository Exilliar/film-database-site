import { TestBed } from '@angular/core/testing';

import { FilmDataService } from './film-data.service';

describe('DataServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilmDataService = TestBed.get(FilmDataService);
    expect(service).toBeTruthy();
  });
});
