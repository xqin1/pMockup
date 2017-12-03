import { Injectable } from '@angular/core';
import { DocumentList} from '@app/modules/document-management/model/document-list.model';

@Injectable()
export class DocumentManagementService {
  documentListLoaded = false;
  documentList: DocumentList;
  constructor() { }

  getEligibilityByDocumentId(id): string{
    const eligibility = this.documentList.eligibility.filter( e => {
      return e['documentID'] === id;
    });
    console.log(id);
    console.log(eligibility);
    return eligibility[0];
  }

}
