import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { TaskData} from '@app/modules/document-management/model/task-data.model';
import {environment} from '@env/environment';
import { MatExpansionPanel} from '@angular/material';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  @Input() selectedTask: TaskData;
  @ViewChild('detailPanel') detailPanel: MatExpansionPanel;
  panelOpenState = true;
  constructor() { }

  getShowTaskLink(taskId: string) {
    return `${environment.workfrontHost}/task/view?ID=${taskId}`;
  }

  refreshTask(event: Event) {
    event.stopPropagation();
    console.log("refresh task");
  }

  taskLinkClick(event: Event) {
    event.stopPropagation();
  }

  togglePanel() {
    this.detailPanel.toggle();
  }
  ngOnInit() {
  }

}
