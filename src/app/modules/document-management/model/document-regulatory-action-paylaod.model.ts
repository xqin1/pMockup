import {ValuePair} from '@app/modules/document-management/model/value-pair.model';

export class DocumentRegulatoryActionPayload {
  documentID: string;
  regulatoryActions: ValuePair[];
}
