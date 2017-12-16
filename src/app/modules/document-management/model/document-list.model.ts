export interface Eligibility {
  documentID: string;
  archivalEligible: boolean;
  reason: string;

}
export class DocumentList{
  objectCode: string;
  documents: any[];
  eligibility: Eligibility[];
}
