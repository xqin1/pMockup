import {ValuePair} from '@app/modules/document-management/model/value-pair.model';

export class DocumentData {
  documentID: string;
  documentName: string;
  lastUpdatedDate: Date;
  approvers: string[];
  documentLinkURL: string;
  archivalStatus: string;
  archivalEligible: boolean;
  // reArchivalEligible: boolean;
   previewEligible: boolean;
   actionEligible: boolean;
  customFormData: ValuePair[];
  regulatoryData: any;
  eligibilityData: any;
  eligibilityAction: boolean;
}
