import { Component, Input, OnInit } from '@angular/core';
import { TaskData} from '@app/modules/document-management/model/task-data.model';
import {environment} from '@env/environment';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  @Input() selectedTask: TaskData;
  constructor() { }

  getShowTaskLink(taskId: string) {
    return `${environment.workfrontHost}/task/view?ID=${taskId}`;
  }

  ngOnInit() {
  }

}
