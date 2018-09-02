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
  @Output() documentBuildFinish = new EventEmitter<string>();
  constructor(
    public dialog: MatDialog
  ) { }

  buildDocument(){
    const taskId = this.selectedTask.task.ID;
    const exariURL = `${environment.workfrontHost}/services/exariWS/task?taskID=${taskId}`;
    const dialogRef = this.dialog.open(DocumentBuildDialogComponent, {
      height: "700px",
      width: "1600px",
      disableClose: true,
      data: exariURL
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === "finish") {
        this.documentBuildFinish.emit(taskId);
      }
    });
  }

  // buildDocument(){
  //   const taskId = this.selectedTask.task.ID;
  //   const exariURL = `${environment.workfrontHost}/services/exariWS/task?taskID=${taskId}`;
  //   this.documentBuild.emit(taskId);
  //   window.open(exariURL, "_blank");
  // }
  uploadDocument() {
    console.log("upload document");
  }
  // showBuildButton() {
  //   let result = true;
  //   if (this.documentBuildIds !== null && this.selectedTask !== null && this.documentBuildIds.includes(this.selectedTask.task.ID)) {
  //     result = false;
  //   }
  //   return result;
  // }
  ngOnInit() {
  }

}
