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
import {LoggerService} from '@app/core/services/logger.service';
import {DocumentLinkData} from '@app/modules/document-management/model/document-link-data.model';
import { Document} from '@app/core/model/workfront/Document.model';

@Injectable()
export class DocumentManagementService {
  documentListLoaded = false;
  documentDataList: DocumentData[] = [];
  documentMetadata: DocumentMetadata = new DocumentMetadata();
  constructor(
    private logger: LoggerService
  ) { }

  processDocumentList(documentList: DocumentList, userId: string, objectId: string): DocumentData[] {
    console.log("documentList");
    console.log(documentList);
    if (documentList.documents.length > 0) {
      this.documentMetadata.userId = userId;
      this.documentMetadata.objectId = objectId;
      this.documentMetadata.objectCode = documentList.objectCode;
      this.documentMetadata.projectClosed = false;
      this.documentMetadata.pendingTaskApprovals = false;
      if (documentList.eligibility.length > 0) {
        if (documentList.eligibility[0]) {
          for (const e of documentList.eligibility ) {
            if (e.reason.length > 0) {
              for (const r of e.reason) {
                if ( r[0].toString().toUpperCase().includes("REVIEW IS COMPLETE")) {
                  this.documentMetadata.projectClosed = true;
                } else if ( r[0].toString().toUpperCase().includes("ROUTING FOR CONCURRENCE")) {
                  this.documentMetadata.pendingTaskApprovals = true;
                }
              }
            }
          }
        }
      }
      for (const doc of documentList.documents){
        const documentData: DocumentData = new DocumentData();
        documentData.eligibilityData = documentList.eligibility.filter(e => {
          return e.documentId === doc.id;
        })[0];
        this.processDocument(documentData, doc);
        this.documentDataList.push(documentData);
      }
    }
    return this.documentDataList;
  }
  processDocument(documentData: DocumentData, doc: any): DocumentData{
    documentData.documentID = doc.id;
    documentData.documentName = `${doc.name}.${doc.currentVersion.ext}`;
    documentData.documentSize = doc.currentVersion.docSize;
    documentData.documentVersion = doc.currentVersion.version;
    documentData.lastUpdatedDate = new Date(doc.lastModDate);
    documentData.customFormData = this.setCustmFormData(doc.parameterValues);
    documentData.regulatoryData = new RegulatoryData();
    documentData.regulatoryData.regulatoryActionExist = false;
    documentData.regulatoryData.regulatoryActions = [];
    this.setDocumentArchivalStatus(documentData);
    this.setDocumentApprovers(documentData, doc);
    this.setDocumentLinkData(documentData, doc);
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
        if (document.eligibilityData.reason.length > 0) {
          archivalStatus = document.eligibilityData.reason[0][0];
          if (document.eligibilityData.reason.length > 1) {
            const numberOfOtherReasons = document.eligibilityData.reason.length - 1;
            archivalStatus += ` and ${numberOfOtherReasons} other(s)`;
          }
        }else{
          this.logger.error("error when setting archival status");
        }
      }
    }

    document.archivalStatus = archivalStatus;
  }

  setDocumentApprovers(document: DocumentData, doc: Document) {
    const data = doc.approvals;
    const approvers: DocumentApprover[] = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i]['status'].toString() !== "CANCELLED") {
        const approver: DocumentApprover = new DocumentApprover();
        approver.status = data[i].status.toString();
        approver.approverID = data[i].approverID;
        approver.approvalDate = data[i].approvalDate;
        approver.approverName = data[i].approver.name;
        approver.requesterID = data[i].requestorID;
        approver.reqeustDate = data[i].requestDate
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
      console.log(regulatoryActions);
      const regulatoryActionMap: any[] = Object.keys(regulatoryActions).map((key) => {
        const obj = {};
        obj[key] = regulatoryActions[key];
        return obj;
      });
      console.log(regulatoryActionMap);
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
                 && !DocumentConfig.regulatoryActionExcludeFields.includes(action)
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
  // setDocumentLinkURL(document: DocumentData, doc: object): string {
  //   let documentLink: string = null;
  //   if (typeof doc["parameterValues"] !== 'undefined' ) {
  //     if (typeof doc["parameterValues"]["DE:Access to Document Linking"] !== "undefined") {
  //       documentLink = doc["parameterValues"]["DE:Access to Document Linking"];
  //     }
  //   }
  //
  //   return documentLink;
  // }
  setDocumentLinkData(document: DocumentData, doc: object): void {
    const documentLinkData: DocumentLinkData = new DocumentLinkData();
    documentLinkData.documentLinkExist = false;
    if (typeof doc["parameterValues"] !== 'undefined' ) {
      if (typeof doc["parameterValues"]["DE:Linked Project/Program GUIDs"] !== "undefined") {
        documentLinkData.linkedGUIDS = doc["parameterValues"]["DE:Linked Project/Program GUIDs"];
        documentLinkData.documentLinkExist = true;
      }
    }
    document.documentLinkData = documentLinkData;
  }
  getEligibilityCheckIDs(documentList: DocumentList): string[] {
    const list: string[] = [];
    for (const doc of documentList.documents) {
      let archivalStatus: string = null;
      if (doc["parameterValues"]) {
        archivalStatus = doc["parameterValues"]["DE:Document Archival Status"];
      }
      if (archivalStatus === "Archiving start" || archivalStatus === "Archiving in progress"){
        const eligibility = new Eligibility();
        eligibility.documentId = doc.id;
        eligibility.archivalEligible = false;
        eligibility.reason = [];
        documentList.eligibility.push(eligibility);
      }else {
        list.push(doc["id"]);
      }
    }
    return list;
  }
  getCustomFieldDisplay(customFields: ValuePair[]): ValuePair[] {
    const displayFields: ValuePair[] = [];
    for (const c of customFields) {
      if (!DocumentConfig.customFormExcludeFields.includes(c.name)){
        displayFields.push(c);
      }
    }
    return displayFields;
  }
  getRegulatoryDataDisplay(regulatoryData: ValuePair[]): ValuePair[] {
    const displayFields: ValuePair[] = [];
    for (const c of regulatoryData) {
      if (!DocumentConfig.regulatoryActionExcludeFields.includes(c.name)){
        displayFields.push(c);
      }
    }
    return displayFields;
  }
}
