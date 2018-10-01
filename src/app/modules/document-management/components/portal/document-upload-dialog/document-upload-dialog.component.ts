import {Component, Inject, OnInit, EventEmitter} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UploadFormData, FileUpload, VersionUpload} from '@app/modules/document-management/model/upload-form-data.model';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions, UploadStatus } from 'ngx-uploader';
import { environment} from '@env/environment';
import {BytesPipe} from 'ngx-pipes';
@Component({
  selector: 'app-document-upload-dialog',
  templateUrl: './document-upload-dialog.component.html',
  styleUrls: ['./document-upload-dialog.component.css'],
  providers: [BytesPipe]
})
export class DocumentUploadDialogComponent implements OnInit {
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  options: UploaderOptions;
  uploadUrl: string;
  formData: FileUpload | VersionUpload = null;
  dataObj: any;
  constructor(
    public dialogRef: MatDialogRef<DocumentUploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UploadFormData,
    private bytesPipe: BytesPipe
  ) {
    this.options = { concurrency: 1, maxUploads: 2 };
    this.files = [];
    this.uploadInput = new EventEmitter<UploadInput>();
    this.humanizeBytes = humanizeBytes;
    this.uploadUrl = environment.documentManagementURL + "/portal/upload";
    this.dataObj = {};
  }

  onUploadOutput(output: UploadOutput): void {
    console.log(output);
    if (output.type === 'allAddedToQueue') {
      // const event: UploadInput = {
      //   type: 'uploadAll',
      //   url: 'https://ngx-uploader.com/upload',
      //   method: 'POST',
      //   data: { foo: 'bar' }
      // };
      //
      // this.uploadInput.emit(event);
    } else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') {
      this.formData["name"] = output.file.name;
      this.formData["currentVersion"]["fileName"] = output.file.name;
      this.dataObj["formData"] = JSON.stringify(this.formData);
      this.files.push(output.file);
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
    } else if (output.type === 'removed') {
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    } else if (output.type === 'rejected' && typeof output.file !== 'undefined') {
      console.log(output.file.name + ' rejected');
    } else if (output.type === 'done' && typeof output.file !== 'undefined') {
      console.log(output);
    }
    this.files = this.files.filter(file => file.progress.status !== UploadStatus.Done);
    if (this.files.length === 2) {
      this.removeFile(this.files[0].id);
    }
  }

  startUpload(): void {
    const event: UploadInput = {
      type: 'uploadAll',
      url: this.uploadUrl,
      method: 'POST',
      data: this.dataObj
    };

    this.uploadInput.emit(event);
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

  removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }

  removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
  }

  ngOnInit() {
    console.log(this.data);
    if (this.data.uploadPurpose === "File") {
      this.uploadUrl += "/upload";
      this.formData = new FileUpload();
      this.formData = this.data.fileUpload;
    }else {
      this.uploadUrl += "/uploadVersion";
      this.formData = new VersionUpload();
      this.formData = this.data.versionUpload;
    }
    console.log(this.formData);
  }

}
