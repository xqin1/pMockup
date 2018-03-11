import {ValuePair} from '@app/modules/document-management/model/value-pair.model';
import {Eligibility} from '@app/modules/document-management/model/document-list.model';

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
  regulatoryData: ValuePair[];
  eligibilityData: Eligibility[];
  eligibilityAction: boolean;
}
