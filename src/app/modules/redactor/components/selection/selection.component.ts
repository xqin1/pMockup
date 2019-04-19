import {Component, EventEmitter, Input, OnInit, Output, SimpleChange} from '@angular/core';
import {RedactorProject} from '@app/modules/redactor/models/redactor-project.model';
import {RedactorService} from '@app/modules/redactor/services/redactor.service';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css']
})
export class SelectionComponent implements OnInit {
  @Input() selectionIds: string[] = [];
  @Output() removeSelection = new EventEmitter<string>();
  @Output() confirmSelection = new EventEmitter<string>();
  selectedProjects: RedactorProject[] = [];
  constructor(
    private redactorService: RedactorService
  ) { }


  onRemoveSelection(row: RedactorProject){
    console.log(row.id);
    this.removeSelection.emit(row.id);
  }

  onConfirmSelection() {
    console.log("coonfirm");
  }

  ngOnChanges(changes: SimpleChange) {
    if (changes["selectionIds"]) {
      if (this.selectionIds.length > 0){
        this.selectedProjects = this.redactorService.getShowingProjects(this.selectionIds);
      }else{
        this.selectedProjects = [];
      }
    }
  }

  ngOnInit() {
  }

}
