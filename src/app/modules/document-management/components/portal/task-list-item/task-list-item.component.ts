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

  onSelectTask(task: Task) {
    this.selectTask.emit(task);
  }

  getShowTaskLink(task: Task) {
    console.log('show task link');
  }

  getShowProjectLink(task: Task) {
    console.log('show project link');
  }

  getTaskState(task: Task) {
    console.log('show task state');
  }
  ngOnInit() {
  }

}
