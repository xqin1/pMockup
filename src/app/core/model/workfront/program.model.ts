export interface ProgramCustomField {
  "DE:Established Name": string;
  "DE:Dosage Form": string;
  "DE:Approved Strength": string;
}

export class Program {
  ID: string;
  name: string
  objCode: string;
  parameterValues: ProgramCustomField;
}
