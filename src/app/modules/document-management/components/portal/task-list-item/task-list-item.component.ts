import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {Task} from '@app/core/model/workfront/Task.model';

@Component({
  selector: 'app-task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.css']
})
export class TaskListItemComponent implements OnInit {
  @Input() taskData: Task;
  @Input() selectedTaskId: string;
  @Output() selectTask = new EventEmitter<Task>();
  constructor() { }

  onTaskSelected(task: Task) {
    this.selectTask.emit(task);
  }

  getShowTaskLink(taskId: string) {
    console.log("task id: " + taskId);
  }

  getShowProjectLink(task: Task) {
    console.log("project id: " + task.project.ID);
  }

  getTaskState(task: Task) {
    console.log('show task state');
  }
  ngOnInit() {
  }

}
