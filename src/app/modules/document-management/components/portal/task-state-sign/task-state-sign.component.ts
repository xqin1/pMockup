import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {TaskData} from '@app/modules/document-management/model/task-data.model';
import {Document} from '@app/core/model/workfront/Document.model';

@Component({
  selector: 'app-task-state-sign',
  templateUrl: './task-state-sign.component.html',
  styleUrls: ['./task-state-sign.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskStateSignComponent implements OnInit {
  @Input() selectedTask: TaskData;
  @Input() selectedTaskId: string;
  @Input() selectedDocument: Document;
  @Input() selectedDocumentId: string;
  constructor() { }

  ngOnInit() {
  }

}
