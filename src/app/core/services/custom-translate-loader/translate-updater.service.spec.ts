import { TestBed } from '@angular/core/testing';

import { TranslationUpdaterService } from './translate-updater.service';

describe('TranslationUpdaterService', () => {
  let service: TranslationUpdaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomTranslateLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
