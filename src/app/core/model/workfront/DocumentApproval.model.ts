import {User} from '@app/core/model/workfront/User.model';

export class DocumentApproval {
  readonly OBJCODE: string = "DOCAPL";
  ID: string;
  approvalDate: Date;
  approverID: string;
  autoDocumentShareID: string;
  customerID: string;
  documentID: string;
  noteID: string;
  requestDate: Date;
  requestorID: string;
  approver: User;
  autoDocumentShare: object;
  customer: object;
  document: Document;
  note: object;
  requestor: User;
  status: object;
}
