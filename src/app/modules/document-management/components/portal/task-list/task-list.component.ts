import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {Task} from '@app/core/model/workfront/Task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  @Input() taskList: Task[];
  @Input() selectedTaskId: Task;
  @Output() selectTask = new EventEmitter<Task>();
  constructor() { }

  onSelectTask(task: Task) {
    this.selectTask.emit(task);
  }
  ngOnInit() {
  }

}
