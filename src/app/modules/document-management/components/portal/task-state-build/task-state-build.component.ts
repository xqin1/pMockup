import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TaskData} from '@app/modules/document-management/model/task-data.model';
import { environment } from '@env/environment';

@Component({
  selector: 'app-task-state-build',
  templateUrl: './task-state-build.component.html',
  styleUrls: ['./task-state-build.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskStateBuildComponent implements OnInit {
  @Input() selectedTask: TaskData;
  @Input() documentBuildIds: string[];
  @Output() documentBuild = new EventEmitter<string>();
  constructor() { }

  buildDocument(){
    const taskId = this.selectedTask.task.ID;
    const exariURL = `${environment.workfrontHost}/services/exariWS/task?taskID=${taskId}`;
    this.documentBuild.emit(taskId);
   window.open(exariURL, "_blank");
  }
  uploadDocument() {
    console.log("upload document");
  }
  showBuildButton() {
    let result = true;
    if (this.documentBuildIds !== null && this.selectedTask !== null && this.documentBuildIds.includes(this.selectedTask.task.ID)) {
      result = false;
    }
    return result;
  }
  ngOnInit() {
  }

}
