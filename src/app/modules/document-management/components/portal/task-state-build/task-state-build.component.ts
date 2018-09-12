import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TaskData} from '@app/modules/document-management/model/task-data.model';
import { environment } from '@env/environment';
import {Document} from '@app/core/model/workfront/Document.model';
import {MatDialog} from '@angular/material';
import { DocumentBuildDialogComponent} from '@app/modules/document-management/components/portal/document-build-dialog/document-build-dialog.component';

@Component({
  selector: 'app-task-state-build',
  templateUrl: './task-state-build.component.html',
  styleUrls: ['./task-state-build.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskStateBuildComponent implements OnInit {
  @Input() selectedTask: TaskData;
  @Input() selectedDocument: Document;
  @Input() selectedDocumentId: string;
  @Output() documentBuildFinish = new EventEmitter<string>();
  @Output() selectDocument = new EventEmitter<string>();
  constructor(
    public dialog: MatDialog
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
    console.log("upload document");
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
