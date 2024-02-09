import {TestBed} from '@angular/core/testing';
import {ArtistService} from './artist.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ArtistService', () => {
  let service: ArtistService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ArtistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
