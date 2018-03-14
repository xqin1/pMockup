import { Injectable } from '@angular/core';
import { DocumentList} from '@app/modules/document-management/model/document-list.model';
import * as moment from 'moment';
import {Eligibility} from '@app/modules/document-management/model/eligibility.model';
import { DocumentData} from '@app/modules/document-management/model/documant-data.model';
import { DocumentConfig } from '@app/modules/document-management/config.ts';
import {ValuePair} from '@app/modules/document-management/model/value-pair.model';
import {DocumentApprover} from '@app/modules/document-management/model/document-approver.model';
import {DocumentMetadata} from '@app/modules/document-management/model/document-metadata.model';
import { RegulatoryData} from '@app/modules/document-management/model/regulatory-data.model';

@Injectable()
export class DocumentManagementService {
  documentListLoaded = false;
  documentDataList: DocumentData[] = [];
  projectStatus: string = null;
  projectClosed = false;
  objectCode: string = null;
  documentMetadata: DocumentMetadata = new DocumentMetadata();
  constructor() { }

  processDocumentList(documentList: DocumentList, userId: string, objectId: string): DocumentData[] {
    if (documentList.documents.length > 0) {
      this.documentMetadata.userId = userId;
      this.documentMetadata.objectId = objectId;
      this.documentMetadata.objectCode = documentList.objectCode;
     // this.projectStatus = documentList.documents[0]["project"]["status"];
     //  if (DocumentConfig.projectClosedCode.includes(this.projectStatus)) {
     //    this.projectClosed = true;
     //  }
      documentList.documents.forEach(doc => {
        const documentData: DocumentData = new DocumentData();
        documentData.eligibilityData = documentList.eligibility.filter(e => {
          return e.documentId === doc["id"];
        })[0];
        this.processDocument(documentData, doc);
        this.documentDataList.push(documentData);
      });
    }
    return this.documentDataList;
  }
  processDocument(documentData: DocumentData, doc: any): DocumentData{
    documentData.documentID = doc["id"];
    documentData.documentName = `${doc["name"]}.${doc["currentVersion"]['ext']}`;
    documentData.lastUpdatedDate = new Date(doc['lastModDate']);
    documentData.customFormData = this.setCustmFormData(doc["parameterValues"]);
    documentData.regulatoryData = new RegulatoryData();
    documentData.regulatoryData.regulatoryActionExist = false;
    documentData.regulatoryData.regulatoryActions = [];
    this.setDocumentArchivalStatus(documentData);
    this.setDocumentApprovers(documentData, doc);
    documentData.documentLinkURL = this.setDocumentLinkURL(documentData, doc);
    // documentData.previewEligible = this.setDocumentPreview(documentData, doc);
    // documentData.actionEligible = this.setDocumentAction(documentData);
    return documentData;
  }
  setDocumentArchivalStatus(document: DocumentData): void {
    document.archivalEligible = document.eligibilityData.archivalEligible;
    let archivalStatus: string = null;
    // get existing archival status
    for (const as of document.customFormData) {
      if (as.name === "Document Archival Status") {
        archivalStatus = as.value;
      }
    }
    if (archivalStatus !== null) {
      if (!DocumentConfig.archivingStatusCode.includes(archivalStatus) && document.archivalEligible){
        archivalStatus = `Ready to archive.\n${archivalStatus}`;
      }
    } else {
      if (document.archivalEligible) {
        archivalStatus = "Ready to archive";
      }else{
        archivalStatus = document.eligibilityData.reason[0][0];
        if (document.eligibilityData.reason.length > 1) {
          const numberOfOtherReasons = document.eligibilityData.reason.length - 1;
          archivalStatus += ` and ${numberOfOtherReasons} other(s)`;
        }
      }
    }

    document.archivalStatus = archivalStatus;
  }
  // setDocumentAction(document: DocumentData): boolean {
  //   let result = true;
  //   if (document.archivalStatus === "Archived") {
  //     result = false;
  //   }
  //   return result;
  // }
  // setDocumentPreview(document: DocumentData, doc: object): boolean {
  //   let result = false;
  //   const ext = doc["currentVersion"]['ext'];
  //   if (DocumentConfig.previewEligibleType.includes(ext)) {
  //       if (!DocumentConfig.noPreviewCode.includes(document.archivalStatus)) {
  //         result = true;
  //       }
  //   }
  //   return result;
  // }

  setDocumentApprovers(document: DocumentData, doc: object) {
    const data = doc["approvals"];
    const approvers: DocumentApprover[] = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i]['status'] !== "CANCELLED") {
        const approver: DocumentApprover = new DocumentApprover();
        approver.status = data[i]['status'];
        approver.approverID = data[i]['approverID'];
        approver.approvalDate = data[i]['approvalDate'];
        approver.approverName = data[i]['approver']['name'];
        approver.requesterID = data[i]['requestDate'];
        approver.reqeustDate = data[i]['requestID'];
        approvers.push(approver);
      }
    }
    document.approvers =  approvers;
  }

  setCustmFormData(customForms: object): ValuePair[] {
    const customFormData: ValuePair[] = [];
    const actionsWithoutPrefix: string[] = [];
    const customForms2 = [];
    if (customForms !== null) {
      for (let action of Object.keys(customForms)) {
        const value = customForms[action];
        if (action.substring(0, 3) === "DE:") {
          action = action.substring(3);
        }
        actionsWithoutPrefix.push(action);
        const obj = {};
        obj[action] = value;
        customForms2.push(obj);
      }
      actionsWithoutPrefix.sort().forEach(sortAction => {
        customForms2.forEach(item => {
          for (const action in item) {
            if (action === sortAction) {
              if (item[action] !== "" && item[action] !== null
                // && !DocumentConfig.customFormExcludeFields.includes(action)
              ) {
                const customFormObj: ValuePair = new ValuePair();
                customFormObj.name = action;
                customFormObj.value = this.parseDateField(action, item[action]);
                customFormData.push(customFormObj);
              }
            }
          }
        });
      });
    }
    return customFormData;
  }
  setRegulatoryActionData(regulatoryActions: ValuePair[]): ValuePair[] {
    const regulatoryActionData: ValuePair[] = [];
    if (regulatoryActions !== null) {
      const regulatoryActionMap: ValuePair[] = regulatoryActions.sort();
      const actionsWithoutPrefix: string[] = [];
      const regulatoryActionMap2: Object[] = [];
      regulatoryActionMap.forEach(function (item) {
        for (let action of Object.keys(item)) {
          const value = item[action];
          if (action.substring(0, 3) === "DE:") {
            action = action.substring(3);
          }
          actionsWithoutPrefix.push(action);
          const obj = {};
          obj[action] = value;
          regulatoryActionMap2.push(obj);
        }
      });
      actionsWithoutPrefix.sort().forEach(sortAction => {
        regulatoryActionMap2.forEach(item => {
          for (const action in item) {
            if (action === sortAction) {
              if (item[action] !== "" && item[action] !== null
                // && !DocumentConfig.regulatoryActionExcludeFields.includes(action)
              ) {
                const regulatoryActionObj: ValuePair = new ValuePair();
                regulatoryActionObj.name = action;
                regulatoryActionObj.value = this.parseDateField(action, item[action]);
                regulatoryActionData.push(regulatoryActionObj);
              }
            }
          }
        });
      });
    }
    return regulatoryActionData;
  }
  parseDateField(fieldName: string, fieldValue: string): string {
    let result = null;
    if (fieldName.includes("Date")) {
      // for date format YYYY-MM-DD
      if (fieldValue.split("-").length === 3) {
        result = moment(fieldValue, "YYYY-MM-DD").format("MM/DD/YYYY");
      }
      // for date format YYYY-MM-DDThh:mm:ss:000-0400"
      if (fieldValue.split("T").length === 2) {
        const newFieldValue = fieldValue.split("T")[0];
        result = moment(newFieldValue, "YYYY-MM-DD").format("MM/DD/YYYY");
      }

      // for list of date format YYYY-MM-DD
      if (fieldValue.split(",").length > 1) {
        const newArray = [];
        for (const item of fieldValue.split(",")){
          if (item.split("-").length === 3) {
            newArray.push(moment(item, "YYYY-MM-DD").format("MM/DD/YYYY"));
          }
        }
        if (newArray.length === fieldValue.split(",").length) {
          result = newArray.toString();
        }
      }
    }
    if (result !== null && result !== "Invalid date") {
      return result;
    }else {
      return fieldValue;
    }
  }
  setDocumentLinkURL(document: DocumentData, doc: object): string {
    let documentLink: string = null;
    if (!DocumentConfig.noDocumentLinkingCode.includes(document.archivalStatus)) {
      if (typeof doc["parameterValues"] !== 'undefined' ) {
        if (typeof doc["parameterValues"]["DE:Access to Document Linking"] !== "undefined") {
          documentLink = doc["parameterValues"]["DE:Access to Document Linking"];
        }
      }
    }
    return documentLink;
  }
  getEligibilityCheckIDs(documentList: DocumentList): string[] {
    const list: string[] = [];
    for (const doc of documentList.documents) {
      let archivalStatus: string = null;
      if (doc["parameterValues"]) {
        archivalStatus = doc["parameterValues"]["DE:Document Archival Status"];
      }
      if (archivalStatus === "Archving start" || archivalStatus === "Archiving in progress"){
        const eligibility = new Eligibility();
        eligibility.documentId = doc["id"];
        eligibility.archivalEligible = false;
        eligibility.reason = [];
        documentList.eligibility.push(eligibility);
      }else {
        list.push(doc["id"]);
      }
    }
    return list;
  }
}
