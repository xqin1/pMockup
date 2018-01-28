import { Injectable } from '@angular/core';
import { map, catchError, finalize} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ExceptionService } from '@app/core/services/exception.service';
import { environment } from '../../../environments/environment';
import {RegulatoryData} from '@app/modules/document-management/model/regulatory-data.model';
import {LoggerService} from '@app/core/services/logger.service';
import {ArchiveResponse} from '@app/modules/document-management/model/archive-response.model';


@Injectable()
export class DMService {

  constructor(
    private http: HttpClient,
    private exceptionService: ExceptionService,
    private logger: LoggerService
  ) {}
  getPDFPreviewByDocumentID(documentID) {
    return this.http
      .get(`${environment.documentManagementURL}/documentManagement/pdfPreview?documentId=${documentID}`, {
        responseType: 'blob'
      })
      .pipe(
        map(res => res),
        catchError(this.exceptionService.catchBadResponse),
        finalize(() => {
          this.logger.log("done with retrieving PEF preview data");
        })
      );
  }
}
