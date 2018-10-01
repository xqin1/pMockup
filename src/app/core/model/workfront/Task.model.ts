import { Project} from '@app/core/model/workfront/Project.model';
import { ApproverStatus} from '@app/core/model/workfront/ApproverStatus.model';
import { Document} from '@app/core/model/workfront/Document.model';
import {ApprovalStage} from '@app/core/model/workfront/ApprovalStage.model';
import {ApprovalProcess} from '@app/core/model/workfront/ApprovalProcess.model';

export interface taskCustomField {
  "DE:Enable Document Generation": string;
}
export class Task {
  ID: string;
  name: string;
  objCode: string;
  percentComplete: number;
   plannedCompletionDate: Date;
  plannedStartDate: Date;
  progressStatus: string;
  projectedCompletionDate: Date;
  projectedStartDate: Date;
  status: string;
  parameterValues: taskCustomField;
  documents: Document[];
  project: Project;
  approverStatuses: ApproverStatus[];
  approvalStage: ApprovalStage;
  approvalProcess: ApprovalProcess;
}
