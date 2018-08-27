import {ChangeDetectionStrategy, Component, ViewChild, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import {TaskData} from '@app/modules/document-management/model/task-data.model';
import {MatHorizontalStepper, MatStep} from '@angular/material';
import { DocumentConfig} from '@app/modules/document-management/config';
import {Document} from '@app/core/model/workfront/Document.model';

@Component({
  selector: 'app-task-state',
  templateUrl: './task-state.component.html',
  styleUrls: ['./task-state.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskStateComponent implements OnInit, OnChanges {
  @Input() selectedTaskId: string;
  @Input() selectedTask: TaskData;
  @Input() documentBuildIds: string[];
  @Input() selectedDocument: Document;
  @Output() documentBuild = new EventEmitter<string>();
  @ViewChild('stepper') stepper: MatHorizontalStepper;
  @ViewChild('stepBuild') stepBuild: MatStep;
  @ViewChild('stepConcur') stepConcur: MatStep;
  @ViewChild('stepSign') stepSign: MatStep;
  @ViewChild('stepArchive') stepArchive: MatStep;
  constructor() { }

  onDocumentBuild(taskId: string) {
    this.documentBuild.emit(taskId);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes["selectedTask"] && typeof this.stepper !== "undefined") {
      const stateName = changes["selectedTask"].currentValue.state;
      const index = DocumentConfig.taskState.filter(s => s["name"] === stateName)[0]["index"];
      if (index === 0) {
        this.stepBuild.completed = false;
        this.stepConcur.completed = false;
        this.stepSign.completed = false;
        this.stepArchive.completed = false;
      }else if (index === 1) {
        this.stepBuild.completed = true;
        this.stepBuild.optional = true;
        this.stepConcur.completed = true;
        this.stepSign.completed = false;
        this.stepArchive.completed = false;
      }else if (index === 2) {
        this.stepBuild.completed = true;
        this.stepConcur.completed = true;
        this.stepSign.completed = false;
        this.stepArchive.completed = false;
      }else if (index === 3) {
        this.stepBuild.completed = true;
        this.stepConcur.completed = true;
        this.stepSign.completed = true;
        this.stepArchive.completed = false;
      }
      this.stepper.selectedIndex = index;
    }
  }

  ngOnInit() {
    // this.stepper.selectedIndex = 2;

  }

}
