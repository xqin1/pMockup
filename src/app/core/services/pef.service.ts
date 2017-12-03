import { Injectable } from '@angular/core';
import { map, catchError, finalize} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ExceptionService } from '@app/core/services/exception.service';
import { CONFIG} from '@app/core/config';


const pefUrl = CONFIG.baseUrls.pef;

@Injectable()
export class PEFService {

  constructor(
    private http: HttpClient,
    private exceptionService: ExceptionService,
  ) {}

  getDocumentListByObjectID(objectID) {
    return this.http
      .get<any>(`${pefUrl}/getDocumentsByObjectId?objectId=${objectID}`)
      .pipe(
        map(res => res),
        catchError(this.exceptionService.catchBadResponse),
        finalize(() => {
          // do something
        })
      );
  }
}
