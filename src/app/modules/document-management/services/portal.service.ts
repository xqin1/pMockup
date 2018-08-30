import { Injectable } from '@angular/core';
import {LoggerService} from '@app/core/services/logger.service';
import { User } from '@app/core/model/workfront/User.model';
import {Task} from '@app/core/model/workfront/Task.model';
import {TaskState} from '@app/modules/document-management/model/task-state.enum';
import {ApproverStatus} from '@app/core/model/workfront/ApproverStatus.model';
import { Document} from '@app/core/model/workfront/Document.model';
import { DocumentApproval} from '@app/core/model/workfront/DocumentApproval.model';

@Injectable({
  providedIn: 'root'
})
export class PortalService {
  user: User = new User();
  constructor(
    private logger: LoggerService
  ) {
    this.user.name = "Xiaoming Qin";
  }

  setCurrentUser(user: User) {
    this.user = user;
  }

  getDocumentApprovedStatus(documentApproval: DocumentApproval[]): boolean {
    let result = true;
    for (const approval of documentApproval) {
      if (approval.status !== "APPROVED") {
        result = false;
      }
    }
    return result;
  }

  getTaskApprovedStatus(approverStatuses: ApproverStatus[]): boolean {
    let result = true;
    for (const approver of approverStatuses) {
      if (approver.status !== "AD") {
        result = false;
      }
    }
    return result;
  }

  getTaskState(task: Task): TaskState {
    let taskState: TaskState = TaskState.Select;
    // we only deal with task with at most one document
    if ( task.documents === null || task.documents.length === 0) {
      if ( task.parameterValues !== null && task.parameterValues["DE:Enable Document Generation"] === "Yes") {
        taskState = TaskState.Build;
      }else {
        taskState = TaskState.Upload;
      }
    }else if (task.documents.length === 1) {
      if (task.approverStatuses !== null) {
        taskState = this.getTaskApprovedStatus(task.approverStatuses) ? TaskState.Sign : TaskState.Concur;
      }else {
        taskState = TaskState.Concur;
      }

      if (taskState === TaskState.Sign) {
       const document: Document = task.documents[0];
       if (document.approvals !== null && document.approvals.length > 0) {
          if (this.getDocumentApprovedStatus(document.approvals)) {
            taskState = TaskState.Archive;
          }
       }
      }


    }
    return taskState;
  }


}
