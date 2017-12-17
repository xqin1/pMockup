import {DocumentData} from '@app/modules/document-management/model/documant-data.model';

export class DocumentListLoadPayload {
  objId: string;
  objCode: string;
  userId: string;
  documentListData: DocumentData[];
};
