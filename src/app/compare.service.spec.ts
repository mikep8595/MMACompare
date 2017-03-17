import { TestBed, inject } from '@angular/core/testing';
import { CompareService } from './compare.service';

describe('CompareService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompareService]
    });
  });

  it('should ...', inject([CompareService], (service: CompareService) => {
    expect(service).toBeTruthy();
  }));
});
