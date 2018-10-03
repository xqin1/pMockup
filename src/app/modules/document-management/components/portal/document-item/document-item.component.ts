import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Document} from '@app/core/model/workfront/Document.model';
import {environment} from '@env/environment';
import {MatDialog} from '@angular/material';
import { DocumentBuildDialogComponent} from '@app/modules/document-management/components/portal/document-build-dialog/document-build-dialog.component';
import { DocumentUploadDialogComponent} from '@app/modules/document-management/components/portal/document-upload-dialog/document-upload-dialog.component';
import {VersionUpload, UploadFormData, UploadPurpose} from '@app/modules/document-management/model/upload-form-data.model';
import {PortalService} from '@app/modules/document-management/services/portal.service';
@Component({
  selector: 'app-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentItemComponent implements OnInit {
  @Input() document: Document;
  @Input() selectedDocumentId: string;
  @Input() selectedTaskId: string;
  @Output() selectDocument = new EventEmitter<string>();
  constructor(
    public dialog: MatDialog,
    public portalService: PortalService
  ) { }

  getDocumentName() {
    return `${this.document.name}.${this.document.currentVersion.ext}`;
  }

  getShowDocumentLink(documentId: string) {
    return `${environment.workfrontHost}/document/view?ID=${documentId}`;
  }
  openPDFPreview(documentId: string){
    const url = `${environment.workfrontHost}/PanoramaDocMgmt/documentManagement/pdfPreview?documentId=${documentId}`;
    window.open(url, "_blank");
  }
  getDocumentDownloadUrl(documentId: string) {
    return `${environment.documentManagementURL}/portal/document/download?documentId=${documentId}`;
  }
  showPDFPreview() {
    let result = false;
    if (this.document.currentVersion.ext === "doc" || this.document.currentVersion.ext === "docx") {
      result = true;
    }
    return result;
  }
  uploadNewVersion(documentId: string){
    const  uploadFormData = new UploadFormData();
    const versionUpload: VersionUpload = new VersionUpload();
    uploadFormData.uploadPurpose = UploadPurpose.Version;
    versionUpload.docObjCode = "TASK";
    versionUpload.objID = this.selectedTaskId;
    versionUpload.fileName = null;
    versionUpload.userName = this.portalService.user.username;
    versionUpload.documentID = documentId;
    uploadFormData.versionUpload = versionUpload;

    const dialogRef = this.dialog.open(DocumentUploadDialogComponent, {
      height: "400px",
      width: "800px",
      disableClose: true,
      data: uploadFormData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === "finish") {
        // this.documentBuildFinish.emit(taskId);
      }
    });
  }
  onDocumentSelected() {
    this.selectDocument.emit(this.document.ID);
  }
  ngOnInit() {
  }

}
