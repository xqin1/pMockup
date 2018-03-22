import {User} from '@app/core/model/workfront/User.model';

export class DocumentVersion {
  readonly OBJCODE: string = "DOCV";
  ID: string;
  accessorIDs: string[];
  customerID: string;
  docSize: number;
  documentID: string;
  documentProviderID: string;
  documentTypeLabel: string;
  enteredByID: string;
  entryDate: Date;
  ext: string;
  externalDownloadURL: string;
  externalIntegrationType: object;
  externalPreviewURL: string;
  externalSaveLocation: string;
  externalStorageID: string;
  fileName: string;
  formatDocSize: string;
  formatEntryDate: string;
  handle: string;
  icon: string;
  isProofable: boolean;
  proofID: string;
  proofStatus: object;
  proofStatusDate: Date;
  version: string;
  customer: object;
  document: Document;
  documentProvider: object;
  enteredBy: User;
}
