import { TestBed, inject } from '@angular/core/testing';
import { HelperService } from './helper.service';

describe('WeightclassesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HelperService]
    });
  });

  it('should ...', inject([HelperService], (service: HelperService) => {
    expect(service).toBeTruthy();
  }));
});