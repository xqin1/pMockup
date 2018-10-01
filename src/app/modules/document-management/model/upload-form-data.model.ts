export enum UploadPurpose {
  File = "File",
  Version= "Version"
}
export class CurrentVersion {
  version: string;
  fileName: string;
}
export class FileUpload {
  name: string;
  docObjCode: string;
  objID: string;
  userName: string;
  currentVersion: CurrentVersion;

}

export class VersionUpload {
  fileName: string;
  docObjCode: string;
  objID: string;
  documentID: string;
  userName: string;
}

export class UploadFormData {
  uploadPurpose: UploadPurpose;
  fileUpload?: FileUpload;
  versionUpload?: VersionUpload;
}
