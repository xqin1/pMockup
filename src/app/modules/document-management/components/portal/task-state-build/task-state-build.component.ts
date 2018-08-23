import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {TaskData} from '@app/modules/document-management/model/task-data.model';

@Component({
  selector: 'app-task-state-build',
  templateUrl: './task-state-build.component.html',
  styleUrls: ['./task-state-build.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskStateBuildComponent implements OnInit {
  @Input() selectedTask: TaskData;
  constructor() { }

  ngOnInit() {
  }

}
