import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TaskData} from '@app/modules/document-management/model/task-data.model';
import { environment} from '@env/environment';
import { DocumentConfig} from '@app/modules/document-management/config';

@Component({
  selector: 'app-task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListItemComponent implements OnInit {
  @Input() taskData: TaskData;
  @Input() selectedTaskId: string;
  @Output() selectTask = new EventEmitter<TaskData>();
  constructor() { }

  onTaskSelected(task: TaskData) {
    this.selectTask.emit(task);
  }

  getShowTaskLink(taskId: string) {
    return `${environment.workfrontHost}/task/view?ID=${taskId}`;
  }

  getShowProjectLink(projectId: string) {
    return `${environment.workfrontHost}/project/view?ID=${projectId}`;

  }

  getTaskState(taskData: TaskData) {
    console.log('show task state');
  }

  getStateBackgroundColor(stateName: String): string{
    console.log(stateName);
    return DocumentConfig.taskState.filter(s => s["name"] === stateName)[0]["color"];
  }
  ngOnInit() {
  }

}
