export class Eligibility {
  documentId: string;
  archivalEligible: boolean;
  reason: any[];

}
export class DocumentList {
  objectCode: string;
  documents: any[];
  eligibility: Eligibility[];
}
