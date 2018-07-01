import { AmusementParkModule } from './amusement-park.module';

describe('AmusementParkModule', () => {
  let amusementParkModule: AmusementParkModule;

  beforeEach(() => {
    amusementParkModule = new AmusementParkModule();
  });

  it('should create an instance', () => {
    expect(amusementParkModule).toBeTruthy();
  });
});
