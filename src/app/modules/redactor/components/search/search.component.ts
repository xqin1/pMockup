import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatCheckboxChange} from '@angular/material';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  @Input() searching = false;
  @Input() error = '';
  @Input() appNumber = [];
  @Input() projectAccumulateMode: boolean;
  @Output() search = new EventEmitter<string>();
  @Output() searchProjects = new EventEmitter<string>();
  @Output() setAccumulateMode = new EventEmitter<boolean>();
  appNumInput: FormControl = new FormControl();
  appTypeDropdown: FormControl = new FormControl();
  appTypes = ["ANDA"];
  constructor() { }

  searchAppNumber(){
    const appNum = this.appNumInput.value;
    this.search.emit(appNum);
  }

  selectAppNumber(){
    const appNum = this.appNumInput.value;
    this.searchProjects.emit(appNum);
    this.appNumInput.setValue('');
  }

  startSearchProjects(){
    const appNum = this.appNumInput.value;
    this.searchProjects.emit(appNum);
    this.appNumInput.setValue('');
  }

  disableSearchButton() {
    let disableButton = true;
    if (this.appNumInput && this.appNumInput.value) {
      if (this.appNumInput.value.length > 2 && !this.searching && this.appNumInput.value.length < 7){
        disableButton = false;
      }
    }
    return disableButton;
  }

  onChange(event: MatCheckboxChange) {
    this.setAccumulateMode.emit(event.checked);
  }

  ngOnInit() {
    this.appTypeDropdown.setValue("ANDA");
  }

}
