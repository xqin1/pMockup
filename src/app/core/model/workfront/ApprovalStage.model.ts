import { StageApprover } from './StageApprover.model'
export class ApprovalStage {
  ID: string;
  approvalPathID: string;
  approvalType: string;
  customerID: string;
  name: string;
  sequenceNumber: string;
  stepApprovers: StageApprover[];
}
