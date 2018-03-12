import {Component, Input, OnInit} from '@angular/core';
import {DocumentData} from '@app/modules/document-management/model/documant-data.model';
import {environment} from '@env/environment';
import {DocumentApprover} from '@app/modules/document-management/model/document-approver.model';
import { DocumentManagementService} from '@app/modules/document-management/services/document-management.service';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  @Input() documentData: DocumentData;
  @Input() userId: string;
  constructor(
    private documentManagementService: DocumentManagementService
  ) { }

  getShowDocumentLink(documentData: DocumentData): string {
    return `${environment.workfrontHost}/document/view?ID=${documentData.documentID}`;
  }

  getApprovalStatus(approver: DocumentApprover): string {
    return `${approver.approverName} - ${approver.status}`;
  }

  getApprovalDate(approver: DocumentApprover): Date {
    if(approver.status !== "NEW") {
      return approver.approvalDate;
    }else{
      return null;
    }
  }
  isReadyToApprove(approver: DocumentApprover): boolean {
    if (approver.status !== "APPROVED" && approver.approverID === this.documentManagementService.documentMetadata.userId) {
      return true;
    } else {
      return false;
    }
  }
  isReadyToRequestApproval(approver: DocumentApprover): boolean {
    if (approver.status !== "APPROVED" && approver.approverID !== this.documentManagementService.documentMetadata.userId) {
      return true;
    } else {
      return false;
    }
  }
  ngOnInit() {
  }

}
