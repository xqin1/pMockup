import {Component, EventEmitter, Input, OnInit, Output, SimpleChange, OnChanges} from '@angular/core';
import { DocumentData} from '@app/modules/document-management/model/documant-data.model';
import { MatDialog } from '@angular/material';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';
import { FilePreviewDialogComponent} from '@app/modules/document-management/components/file-preview-dialog/file-preview-dialog.component';
import { NotificationComponent} from '@app/shared/components/notification/notification.component';
import { PEFService} from '@app/core/services/pef.service';
import { DMService} from '@app/core/services/dm.service';
import {DocumentRegulatoryActionPayload} from '@app/modules/document-management/model/document-regulatory-action-paylaod.model';
import {DocumentManagementService} from '@app/modules/document-management/services/document-management.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Input() documentListLoading: boolean;
  @Input() documentDataList: DocumentData[];
  @Input() documentRegulatoryActionList: DocumentRegulatoryActionPayload[];
  @Input() selectedDocumentID: string;
  @Output() documentSelected= new EventEmitter<String>();
  @Output() documentValidate = new EventEmitter<String>();
  @Output() regulatoryData = new EventEmitter<String>();

  constructor(
    public dialog: MatDialog,
    public snackkBar: MatSnackBar,
    private pefService: PEFService,
    private dmService: DMService,
    private documentManagementService: DocumentManagementService
  ) {
  }

  onRegulatoryData(documentId: string){
    this.regulatoryData.emit(documentId);
  }

  validate() {
    console.log("validate");
    console.log(this.selectedDocumentID);
    if (this.isDocumentRegulatoryDataExist(this.selectedDocumentID)) {
      this.documentValidate.emit(this.selectedDocumentID);
    } else {
      this.pefService.getRegulatoryActionByDocumentID(this.selectedDocumentID)
        .subscribe( result => {
          const ra = new DocumentRegulatoryActionPayload();
          ra.documentID = this.selectedDocumentID;
          ra.regulatoryActions = this.documentManagementService.setRegulatoryActionData(result.regulatoryActions);
          // this.documentRegulatoryActionUpdated.emit(ra);
          this.documentValidate.emit(this.selectedDocumentID);
        });
    }
  }
  isDocumentRegulatoryDataExist(documentID: string): boolean {
    return this.documentRegulatoryActionList.filter((r) => {
      return r.documentID === documentID;
    }).length === 1;
  }
  isProjectClosed(): boolean {
    return this.documentManagementService.projectClosed;
  }
  ngOnInit() {
  }

}
