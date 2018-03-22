import {Eligibility} from '@app/modules/document-management/model/eligibility.model';
import {Document} from '@app/core/model/workfront/Document.model';

export class DocumentList {
  objectCode: string;
  documents: Document[];
  eligibility: Eligibility[];
}
