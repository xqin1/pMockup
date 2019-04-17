import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() query = '';
  @Input() searching = false;
  @Input() error = '';
  @Input() appNumber = [];
  @Output() search = new EventEmitter<string>();
  @Output() searchProjects = new EventEmitter<string>();

  appNumInput: FormControl = new FormControl();
  constructor() { }

  searchAppNumber(searchText: string){
      this.search.emit(searchText);
  }
  // searchProject(){
  //   console.log("search project: " + this.appNumInput.value);
  // }

  selectAppNumber($event){
    const appNum = this.appNumInput.value;
    this.searchProjects.emit(appNum);
  }

  startSearchProjects(){
    const appNum = this.appNumInput.value;
    this.searchProjects.emit(appNum);
  }

  showSearchButton() {
    let hideButton = true;
    if(this.appNumInput && this.appNumInput.value) {
      if(this.appNumInput.value.length > 2 && !this.searching){
        hideButton = false;
      }
    }
    return hideButton;
  }
  ngOnInit() {
  }

}
