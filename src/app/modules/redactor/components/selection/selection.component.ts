import {Component, EventEmitter, Input, OnInit, Output, SimpleChange} from '@angular/core';
import {RedactorProject} from '@app/modules/redactor/models/redactor-project.model';
import {RedactorService} from '@app/modules/redactor/services/redactor.service';
import {RedactorUpdateNote} from '@app/modules/redactor/models/redactor-update-note.model';

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
  constructor(
    private redactorService: RedactorService
  ) { }


  onRemoveSelection(row: RedactorProject){
    console.log(row.id);
    this.removeSelection.emit(row.id);
  }

  onConfirmSelection() {
    this.attachTemplate.emit(this.selectionIds[0]);
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
