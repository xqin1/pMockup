import { ApprovalStage} from '@app/core/model/workfront/ApprovalStage.model';

export class ApprovalPath {
  ID: string;
  approvalProcessID: string;
  approvedStatus: string;
  approvedStatusLabel;
  comment: string;
  customerID: string;
  durationMinutes: number;
  enteredByID: string;
  entryDate: string;
  globalPathID;
  isPrivate: boolean;
  lastUpdateDate: Date;
  lastUpdatedByID: string;
  name: string;
  rejectedStatus: string;
  rejectedStatusLabel: string;
  shouldCreateIssue: boolean;
  targetStatus: string;
  targetStatusLabel: string;

  approvalSteps: ApprovalStage[];
}
