export class Eligibility {
  documentId: string;
  archivalEligible: boolean;
  reason: string[][];

}
export class DocumentList {
  objectCode: string;
  documents: any[];
  eligibility: Eligibility[];
}
