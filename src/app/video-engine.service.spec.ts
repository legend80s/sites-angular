import { TestBed, inject } from '@angular/core/testing';

import { VideoEngineService } from './video-engine.service';

describe('VideoEngineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VideoEngineService]
    });
  });

  it('should be created', inject([VideoEngineService], (service: VideoEngineService) => {
    expect(service).toBeTruthy();
  }));
});
