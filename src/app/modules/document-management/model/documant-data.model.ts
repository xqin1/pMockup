import {ValuePair} from '@app/modules/document-management/model/value-pair.model';

export class DocumentData {
  documentID: string;
  documentName: string;
  lastUpdatedDate: string;
  approvers: string[];
  documentLinkURL: string;
  archivalStatus: string;
  archivalEligible: boolean;
  reArchivalEligible: boolean;
  customFormData: ValuePair[];
  regulatoryData: ValuePair[];
}
