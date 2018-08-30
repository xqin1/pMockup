import {Component, EventEmitter, Input, Output, OnInit, ChangeDetectionStrategy} from '@angular/core';
import { TaskData} from '@app/modules/document-management/model/task-data.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent implements OnInit {
  @Input() taskList: TaskData[];
  @Input() selectedTaskId: TaskData;
  @Output() selectTask = new EventEmitter<TaskData>();
  constructor() { }

  onTaskSelected(task: TaskData) {
    this.selectTask.emit(task);
  }
  ngOnInit() {
  }

}
