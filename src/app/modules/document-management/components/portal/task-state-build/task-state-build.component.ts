import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TaskData} from '@app/modules/document-management/model/task-data.model';
import { environment } from '@env/environment';
import {Document} from '@app/core/model/workfront/Document.model';
import {MatDialog} from '@angular/material';
import { DocumentBuildDialogComponent} from '@app/modules/document-management/components/portal/document-build-dialog/document-build-dialog.component';
import { DocumentUploadDialogComponent} from '@app/modules/document-management/components/portal/document-upload-dialog/document-upload-dialog.component';
import {CurrentVersion, FileUpload, UploadFormData, UploadPurpose} from '@app/modules/document-management/model/upload-form-data.model';
import {PortalService} from '@app/modules/document-management/services/portal.service';

@Component({
  selector: 'app-task-state-build',
  templateUrl: './task-state-build.component.html',
  styleUrls: ['./task-state-build.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskStateBuildComponent implements OnInit {
  @Input() selectedTask: TaskData;
  @Input() selectedTaskId: string;
  @Input() selectedDocument: Document;
  @Input() selectedDocumentId: string;
  @Output() documentBuildFinish = new EventEmitter<string>();
  @Output() selectDocument = new EventEmitter<string>();
  constructor(
    public dialog: MatDialog,
    public portalService: PortalService
  ) { }

  buildDocument(){
    const taskId = this.selectedTask.task.ID;
    const exariURL = `${environment.workfrontHost}/services/exariWS/task?taskID=${taskId}`;
    const dialogRef = this.dialog.open(DocumentBuildDialogComponent, {
      height: "100vh",
      width: "100vw",
      maxHeight: "100vh",
      maxWidth: "100vw",
      disableClose: true,
      data: exariURL
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === "finish") {
        this.documentBuildFinish.emit(taskId);
      }
    });
  }

  onDocumentSelected(documentId: string) {
    this.selectDocument.emit(documentId);
  }

  uploadDocument() {
    const  uploadFormData = new UploadFormData();
    const fileUpload: FileUpload = new FileUpload();
    const currentVersion: CurrentVersion = new CurrentVersion();
    uploadFormData.uploadPurpose = UploadPurpose.File;
    fileUpload.docObjCode = "TASK";
    fileUpload.objID = this.selectedTaskId;
    fileUpload.name = null;
    fileUpload.userName = this.portalService.user.username;
    currentVersion.fileName = null;
    currentVersion.version = "v1.0";
    fileUpload.currentVersion = currentVersion;
    uploadFormData.fileUpload = fileUpload;

    const dialogRef = this.dialog.open(DocumentUploadDialogComponent, {
      height: "400px",
      width: "600px",
      disableClose: true,
      data: uploadFormData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === "finish") {
        // this.documentBuildFinish.emit(taskId);
      }
    });
  }
  showBuildButton() {
    let result = false;
    if (this.selectedTask !== null && this.selectedTask.task.parameterValues !== null &&
      this.selectedTask.task.parameterValues["DE:Enable Document Generation"] === "Yes") {
      result = true;
    }
    return result;
  }
  ngOnInit() {
  }

}
