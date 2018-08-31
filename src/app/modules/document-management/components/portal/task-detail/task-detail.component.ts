import {Component, Input, ViewChild, OnInit, Output, EventEmitter} from '@angular/core';
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
  @Input() taskLoadIds: string[];
  @Output() updateTask = new EventEmitter<string>();
  @ViewChild('detailPanel') detailPanel: MatExpansionPanel;
  panelOpenState = false;
  constructor() { }

  getShowTaskLink(taskId: string) {
    return `${environment.workfrontHost}/task/view?ID=${taskId}`;
  }
  taskLinkClick(event: Event) {
    event.stopPropagation();
  }
  getShowProjectLink(projectId: string) {
    return `${environment.workfrontHost}/project/view?ID=${projectId}`;
  }
  togglePanel() {
    console.log("toggle");
    this.detailPanel.disabled = false;
    this.detailPanel.toggle();
    this.panelOpenState = !this.panelOpenState;
    this.detailPanel.disabled = true;
  }
  ngOnInit() {
  }

}
