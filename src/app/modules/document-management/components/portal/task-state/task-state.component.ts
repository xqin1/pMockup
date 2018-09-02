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
  index: number;
  constructor() { }

  onDocumentBuild(taskId: string) {
    this.documentBuild.emit(taskId);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes["selectedTask"] && typeof this.stepper !== "undefined") {
      const stateName = changes["selectedTask"].currentValue.state;
      this.index = DocumentConfig.taskState.filter(s => s["name"] === stateName)[0]["index"];
      if (this.index === 0) {
        this.stepBuild.completed = false;
        this.stepConcur.completed = false;
        this.stepSign.completed = false;
        this.stepArchive.completed = false;
      }else if (this.index === 1) {
        this.stepBuild.completed = true;
        this.stepConcur.completed = false;
        this.stepSign.completed = false;
        this.stepArchive.completed = false;
      }else if (this.index === 2) {
        this.stepBuild.completed = true;
        this.stepConcur.completed = true;
        this.stepSign.completed = false;
        this.stepArchive.completed = false;
      }else if (this.index === 3) {
        this.stepBuild.completed = true;
        this.stepConcur.completed = true;
        this.stepSign.completed = true;
        this.stepArchive.completed = false;
      }
      this.stepper.selectedIndex = this.index;
    }
  }
  goNext() {
    if (this.stepper.selectedIndex === 1) {
      this.stepConcur.completed = true;
    }
    this.stepper.next();
  }
  goPrevious() {
    this.stepper.previous();
  }
  disableNext() {
    let result = false;
    if (this.stepper.selectedIndex === 0) {
      if (!this.selectedDocument) {
        result = true;
      }
    }else if (this.stepper.selectedIndex === 2) {

    }
    return result;
  }
  ngOnInit() {
    // this.stepper.selectedIndex = 2;

  }

}
