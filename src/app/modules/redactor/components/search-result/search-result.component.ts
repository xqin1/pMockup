import {ChangeDetectionStrategy, Component, Input, OnInit, SimpleChanges, OnChanges, Output, EventEmitter} from '@angular/core';
import { RedactorService} from '@app/modules/redactor/services/redactor.service';
import {RedactorProject} from '@app/modules/redactor/models/redactor-project.model';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultComponent implements OnInit, OnChanges {
  @Input() projectIds: string[] = [];
  @Input() selectionIds: string[] = [];
  @Output() selectProject = new EventEmitter<string[]>();
  projects: RedactorProject[] = [];
  selected = [];
  constructor(
    private redactorService: RedactorService
  ) { }

  onSelect({ selected }) {
    // console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onSelectProject(){
    const selectIds = [];
    for (const s of this.selected){
      selectIds.push(s["id"]);
    }
    this.selectProject.emit(selectIds);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["projectIds"]) {
      if (this.projectIds.length > 0){
       this.projects = this.redactorService.getShowingProjects(this.projectIds);
      }else{
        this.projects = [];
      }
      this.selected = [];
    }
  }

  onActivate(event) {
   // console.log('Activate Event', event);
  }

  // add() {
  //   this.selected.push(this.rows[1], this.rows[3]);
  // }
  //
  // update() {
  //   this.selected = [ this.rows[1], this.rows[3] ];
  // }

  remove() {
    this.selected = [];
  }

  displayCheck(row) {
    return row.name !== 'Ethel Price';
  }
  ngOnInit() {
  }

}
