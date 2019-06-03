import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  SimpleChanges,
  OnChanges,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateDialogComponent implements OnInit, OnChanges {
  @Input() selectionIds: string[] = [];
  @Input() projectTemplateAttached: string[] = [];

  @Input() templateAttachError: string;
  @Input() attachTemplateAllComplete: boolean;

  @Input() projectUpdating: boolean;
  @Input() projectUpdateError: string;
  @Input() projectUpdateComplete: boolean;
  @Output() appStartOver = new EventEmitter<string>();
  errorMsg = '';
  progressValue = 0;
  currentTemplateNumber = 0;
  constructor() { }

  showTemplate() {
    if (this.showError()){
      return false;
    }
    if (this.projectUpdateComplete) {
      return false;
    }
    return !this.attachTemplateAllComplete;
  }
  showUpdate() {
    if (this.showError()){
      return false;
    } else if (!this.attachTemplateAllComplete){
      return false;
    } else if (this.projectUpdateComplete) {
      return false;
    }
    return true;
  }
  showFinish() {
    if (this.showError()){
      return false;
    }
    return this.projectUpdateComplete;
  }
  showButton() {
    if (this.showError() || this.projectUpdateComplete){
      return true;
    }
    return false;
  }
  showProgressBar() {
    if (this.showError()){
      return false;
    }
    return !this.projectUpdateComplete;
  }
  showError(){
    if (this.templateAttachError !== '') {
      this.errorMsg = "attaching template";
      return true;
    }
    if (this.projectUpdateError !== '') {
      this.errorMsg = "updating note";
      return true;
    }
    return false;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["projectTemplateAttached"]) {
      if ( this.selectionIds && this.projectTemplateAttached) {
        this.progressValue =  (this.projectTemplateAttached.length / this.selectionIds.length) * 100;
        this.currentTemplateNumber = this.projectTemplateAttached.length + 1;
      }
    }
  }

  closeApplication() {
    window.open('', '_parent', '');
    window.close();
  }
  startOver() {
    this.appStartOver.emit("App Start Over");
  }
  ngOnInit() {
  }

}
