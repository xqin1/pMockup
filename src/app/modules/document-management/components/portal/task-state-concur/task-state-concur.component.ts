import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import {TaskData} from '@app/modules/document-management/model/task-data.model';

@Component({
  selector: 'app-task-state-concur',
  templateUrl: './task-state-concur.component.html',
  styleUrls: ['./task-state-concur.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskStateConcurComponent implements OnInit {
  @Input() selectedTask: TaskData;
  constructor() { }

  ngOnInit() {
  }

}
