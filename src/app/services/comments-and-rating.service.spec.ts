import { TestBed } from '@angular/core/testing';

import { CommentsAndRatingService } from './comments-and-rating.service';

describe('CommentsAndRatingService', () => {
  let service: CommentsAndRatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentsAndRatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
