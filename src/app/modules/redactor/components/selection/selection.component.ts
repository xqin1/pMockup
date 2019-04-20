import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange} from '@angular/core';
import {RedactorProject} from '@app/modules/redactor/models/redactor-project.model';
import {RedactorService} from '@app/modules/redactor/services/redactor.service';
import {RedactorUpdateNote} from '@app/modules/redactor/models/redactor-update-note.model';
import {UpdateDialogParentComponent} from '@app/modules/redactor/containers/update-dialog-parent/update-dialog-parent.component';
import {MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css']
})
export class SelectionComponent implements OnInit {
  @Input() taskId: string;
  @Input() selectionIds: string[] = [];
  @Input() projectAttachedTemplate: string[] = [];
  @Input() attachTemplateComplete: boolean;
  @Input() attachTemplateAllComplete: boolean;
  @Output() removeSelection = new EventEmitter<string>();
  @Output() attachTemplate = new EventEmitter<string>();
  @Output() finishAttachTemplate = new EventEmitter<string>();
  @Output() updateRedactorProject = new EventEmitter<string>();
  selectedProjects: RedactorProject[] = [];
  updateDialogRef: MatDialogRef<UpdateDialogParentComponent>;
  constructor(
    private redactorService: RedactorService,
    public dialog: MatDialog
  ) { }


  onRemoveSelection(row: RedactorProject){
    this.removeSelection.emit(row.id);
  }

  onConfirmSelection() {
    this.attachTemplate.emit(this.selectionIds[0]);
  }

  openUpdateDialog() {
    this.updateDialogRef = this.dialog.open(UpdateDialogParentComponent, {
      width: '650px',
      height: '300px'
    });
  }

  ngOnChanges(changes: SimpleChange) {
    if (changes["selectionIds"]) {
      if (this.selectionIds.length > 0){
        this.selectedProjects = this.redactorService.getShowingProjects(this.selectionIds);
      }else{
        this.selectedProjects = [];
      }
    }
    if (changes["projectAttachedTemplate"]) {
      if (this.projectAttachedTemplate.length > 0) {
        if (this.selectionIds.length === this.projectAttachedTemplate.length) {
          this.finishAttachTemplate.emit();
          const note = new RedactorUpdateNote();
          note.taskId = this.taskId;
          const pIds = [], pNames = [];
          for (const p of  this.selectedProjects){
            pIds.push(p.id);
            pNames.push(p.name);
          }
          note.projectIds = pIds;
          note.projectNames = pNames;
          this.updateRedactorProject.emit(JSON.stringify(note));
        } else {
          this.attachTemplate.emit(this.selectionIds[this.projectAttachedTemplate.length]);
        }
      }

    }
  }

  ngOnInit() {
  }

}
