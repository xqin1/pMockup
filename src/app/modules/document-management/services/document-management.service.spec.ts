import { TestBed, inject } from '@angular/core/testing';

import { DocumentManagementService } from './document-management.service';

describe('DocumentManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DocumentManagementService]
    });
  });

  it('should be created', inject([DocumentManagementService], (service: DocumentManagementService) => {
    expect(service).toBeTruthy();
  }));
});
