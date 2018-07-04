import { TestBed, inject } from '@angular/core/testing';

import { VideoSearchDriverService } from './video-search-driver.service';

describe('VideoSearchDriverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VideoSearchDriverService]
    });
  });

  it('should be created', inject([VideoSearchDriverService], (service: VideoSearchDriverService) => {
    expect(service).toBeTruthy();
  }));
});
