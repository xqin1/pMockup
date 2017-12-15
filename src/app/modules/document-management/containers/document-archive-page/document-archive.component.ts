import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as doucmentAction from 'app/modules/document-management/actions/document.action';
import * as fromDocument from 'app/modules/document-management/reducers/index.reducer';
import {Observable} from 'rxjs/Observable';
import { DocumentManagementService} from '@app/modules/document-management/services/document-management.service';
import { DocumentList} from '@app/modules/document-management/model/document-list.model';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSlideToggleChange} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-document-archive',
  templateUrl: './document-archive.component.html',
  styleUrls: ['./document-archive.component.css']
})
export class DocumentArchiveComponent implements OnInit {
  documentName: string;
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  constructor(
    private documentManagementService: DocumentManagementService,
    private store: Store<fromDocument.State>,
    private route: ActivatedRoute,
    private router: Router,
    private _formBuilder: FormBuilder
  ) { }


  getDocumentName(id: string) {
    const document = this.documentManagementService.documentList.documents.filter(e => {
      return e.id === id;
    });
    this.documentName = document[0]['name'] + '.' + document[0]['currentVersion']['ext'];
  }

  documentArchiveDone() {
    console.log('done');
    this.router.navigate(['../../'], {relativeTo: this.route});
  }
  ngOnInit() {
    this.route.params.subscribe(param => {
      this.getDocumentName(param['id']);
    });

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['']
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['']
    });
  }

}
