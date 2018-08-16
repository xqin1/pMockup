import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DocumentData} from 'app/modules/document-management/model/documant-data.model';
import {environment} from 'environments/environment';
import {DocumentApprover} from 'app/modules/document-management/model/document-approver.model';
import { DocumentManagementService} from 'app/modules/document-management/services/document-management.service';
import {ActivatedRoute, Router} from '@angular/router';
import { MatDialog } from '@angular/material';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';
import { FilePreviewDialogComponent} from 'app/modules/document-management/components/document/file-preview-dialog/file-preview-dialog.component';
import { NotificationComponent} from 'app/shared/components/notification/notification.component';
import { ArchiveConfirmationDialogComponent} from 'app/modules/document-management/components/document/archive-confirmation-dialog/archive-confirmation-dialog.component';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  customFieldCount: number;
  documentLinkCount: number;
  @Input() documentData: DocumentData;
  @Input() selectedDocumentId: string;
  @Output() documentSelected = new EventEmitter<string>();
  @Output() regulatoryData = new EventEmitter<string>();
  @Output() documentLinkData = new EventEmitter<string>();
  @Output() pdfData = new EventEmitter<string>();
  constructor(
    private documentManagementService: DocumentManagementService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) { }

  getShowDocumentLink(documentData: DocumentData): string {
    return `${environment.workfrontHost}/document/view?ID=${documentData.documentID}`;
  }
  getDocumentDownloadLink(documentData: DocumentData): string {
    return `${environment.workfrontHost}/document/download?ID=${documentData.documentID}`;
  }

  getApprovalStatus(approver: DocumentApprover): string {
    return `${approver.approverName} - ${approver.status}`;
  }

  getApprovalDate(approver: DocumentApprover): Date {
    if (approver.status !== "NEW") {
      return approver.approvalDate;
    }else{
      return null;
    }
  }
  isDocumentOnTask(){
    return this.documentManagementService.documentMetadata.objectCode === "TASK";
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
  getArchivalStatus(document: DocumentData): string {
    if (document.archivalStatus.includes("Ready to archive")) {
      return "Ready to archive";
    } else if (document.archivalStatus.includes("Ineligible for Archiving")) {
      return "Ineligible for Archiving";
    } else {
      return document.archivalStatus;
    }
  }

  showMetaData(document: DocumentData): void {
    if (!document.regulatoryData.regulatoryActionExist){
      this.regulatoryData.emit(document.documentID);
    }
    this.documentSelected.emit(document.documentID);
    this.router.navigate(['/document-management', 'document-metadata', document.documentID]);
  }
  showDocumentLink(document: DocumentData): void {
    if (!document.documentLinkData.documentLinkExist){
      this.documentLinkData.emit(document.documentID);
    }
    this.documentSelected.emit(document.documentID);
    this.router.navigate(['/document-management', 'document-link', document.documentID]);
  }
  showPDFPreview(document: DocumentData) {
    this.documentSelected.emit(document.documentID);
    // this.pdfData.emit(document.documentID);
    this.dialog.open(FilePreviewDialogComponent, {
      height: "600px",
      width: '800px',
      data: document
    });
  }
  showArchiveConfirmationDialog(document: DocumentData) {
    this.documentSelected.emit(document.documentID);
    // this.pdfData.emit(document.documentID);
    const dialogRef = this.dialog.open(ArchiveConfirmationDialogComponent, {
      height: "400px",
      width: '800px',
      data: document
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === "archive") {
        this.archiveDocument(this.documentData);
      } else if (result === "link") {
        this.showDocumentLink(this.documentData);
      } else if (result === "metadata") {
        this.showMetaData(this.documentData);
      }
      console.log("dialog close: " + result);
    });
  }
  getCustomFieldCount() {
    return this.documentManagementService.getCustomFieldDisplay(this.documentData.customFormData).length;
  }
  getDocumentLinkCount() {
    let count = 0;
    if (this.documentData.documentLinkData.documentLinkExist) {
      count = this.documentData.documentLinkData.linkedGUIDS.split(",").length;
    }
    return count;
  }
  archiveDocument(document: DocumentData) {
    console.log(`archive document: doucmentId=${document.documentID},
    userId=${this.documentManagementService.documentMetadata.userId}` );
  }
  showEligibilityList(document: DocumentData) {
    this.documentSelected.emit(document.documentID);
    this.router.navigate(['/document-management', 'document-eligibility', document.documentID]);
  }
  ngOnInit() {
    this.customFieldCount = this.getCustomFieldCount();
    this.documentLinkCount = this.getDocumentLinkCount();
  }

}
