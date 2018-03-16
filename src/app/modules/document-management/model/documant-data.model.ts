import {ValuePair} from '@app/modules/document-management/model/value-pair.model';
import {Eligibility} from '@app/modules/document-management/model/eligibility.model';
import {DocumentApprover} from '@app/modules/document-management/model/document-approver.model';
import {RegulatoryData} from '@app/modules/document-management/model/regulatory-data.model';

export class DocumentData {
  documentID: string;
  documentName: string;
  lastUpdatedDate: Date;
  documentSize: number;
  documentVersion: string;
  approvers: DocumentApprover[];
  documentLinkURL: string;
  archivalStatus: string;
  archivalEligible: boolean;
  customFormData: ValuePair[];
  regulatoryData: RegulatoryData;
  eligibilityData: Eligibility;
}
