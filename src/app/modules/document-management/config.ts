export const DocumentConfig = {
  navigation: [
    {name: "Select Document", value: "select", index: 0, icon: "find_in_page"},
    {name: "Validate", value: "validate", index: 1, icon: "check_circle"},
    {name: "Confirm Archive", value: "confirm", index: 2, icon: "unarchive"}
  ],
  customFormExcludeFields: [
    "Access to Document Linking",
    // "Application Status",
    // "Submission Status",
    "Document Archival Status",
    "Document Signatory Authority",
    "Linked Project/Program GUIDs",
    "Linked Projects/Programs",
    "Requested Delivery Method",
    "Smart Template",
    "Select the appropriate letter template",
    "Template Automation ID"
  ],
  regulatoryActionExcludeFields: [
  "74 Day Filing Issues Goal Closed By",
  "Breakthrough Therapy Designation Goal Closed By",
  "Document Signatory Authority",
  "Fast Track Designation Goal Closed By",
  "Filing Goal Closed By",
  "Labeling and PMR/PMC Discussion Goal Closed By",
  "Meeting Date Goal Closed By",
  "Meeting Minutes Goal Closed By",
  "Meeting Preliminary Responses Goal Closed By",
  "Meeting Response Goal Closed By",
  "OND PDUFA Goal Date Closed By",
  "Proprietary Name Review Goal Closed By"
  ],
  sectionTitle: {
    "customFormTitle": "Validate Smart Template Interview Information",
    "regulatoryTitle": "Review Regulatory Information",
    "projectClosed": "The review is complete and no documents can be archived"
  },
  projectClosedCode: [
    "CPL",
    "NAP",
    "CLD"
  ],
  noDocumentLinkingCode: [
    "Archived",
    "Archiving in Progress"
  ],
  noPreviewCode: [
    "Archived",
    "Archiving in Progress"
  ],
  previewEligibleType: [
    "pdf",
    "doc",
    "docx"
  ]
};