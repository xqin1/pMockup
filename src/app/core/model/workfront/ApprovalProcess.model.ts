import { ApprovalPath} from '@app/core/model/workfront/ApprovalPath.model';

export class ApprovalProcess {
  ID: string;
  accessorIDs: string;
  approvalObjCode: string;
  approvalStatuses: string[];
  customerID: string;
  description: string;
  durationMinutes: number;
  enteredByID: string;
  entryDate: string;
  extRefID: string;
  isPrivate: boolean;
  lastUpdateDate: Date;
  lastUpdatedByID: string;
  name: string;
  securityRootID: string;
  securityRootObjCode: string;
  approvalPaths: ApprovalPath[];
}
