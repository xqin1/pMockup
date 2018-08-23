import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {TaskData} from '@app/modules/document-management/model/task-data.model';

@Component({
  selector: 'app-task-state-archive',
  templateUrl: './task-state-archive.component.html',
  styleUrls: ['./task-state-archive.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskStateArchiveComponent implements OnInit {
  @Input() selectedTask: TaskData
  constructor() { }

  ngOnInit() {
  }

}
