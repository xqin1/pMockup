import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TaskData} from '@app/modules/document-management/model/task-data.model';
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

  getStateBackgroundColor(stateName: String): string{
    return DocumentConfig.taskState.filter(s => s["name"] === stateName)[0]["color"];
  }
  ngOnInit() {
  }

}
