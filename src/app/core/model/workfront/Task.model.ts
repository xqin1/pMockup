import { Project} from '@app/core/model/workfront/Project.model';
import { ApproverStatus} from '@app/core/model/workfront/ApproverStatus.model';

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
  parameterValues: object;
  documents: Document[];
  project: Project;
  approverStatuses: ApproverStatus[];
}
