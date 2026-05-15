var AART_COURT_SPREADSHEET_ID_PROPERTY = 'AART_COURT_SURVEY_SPREADSHEET_ID';
var AART_COURT_RESPONSE_SHEET_NAME = 'Responses';
var AART_COURT_RESPONSE_FIELDS = [
  { key: 'unitApartmentNo', label: 'Unit / Apartment No.' },
  { key: 'blockTower', label: 'Block / Tower' },
  { key: 'surveyMonthYear', label: 'Survey Month / Year' },
  { key: 'lengthOfResidence', label: 'Length of Residence' },
  { key: 'q1', label: 'Q1. Overall living experience this month' },
  { key: 'q2', label: 'Q2. Likelihood to recommend' },
  { key: 'q3', label: 'Q3. Lease expiry intention' },
  { key: 'q4', label: 'Q4. Sense of community and neighbourliness' },
  { key: 'q5', label: 'Q5. Quality of finishes and fixtures' },
  { key: 'q6', label: 'Q6. Kitchen appliances condition and performance' },
  { key: 'q7', label: 'Q7. Storage space adequacy' },
  { key: 'q8', label: 'Q8. Natural light and window quality' },
  { key: 'q9', label: 'Q9. Unresolved defects or snags in unit' },
  { key: 'q10', label: 'Q10. Comments on unit quality' },
  { key: 'q11', label: 'Q11. Electricity supply reliability' },
  { key: 'q12', label: 'Q12. Backup generator performance' },
  { key: 'q13', label: 'Q13. Water supply, pressure, reliability, hot water' },
  { key: 'q14', label: 'Q14. Power interruptions this month' },
  { key: 'q15', label: 'Q15. Comments on utilities' },
  { key: 'q16', label: 'Q16. Temperature control and cooling/heating' },
  { key: 'q17', label: 'Q17. Ventilation and air freshness' },
  { key: 'q18', label: 'Q18. Acoustic comfort' },
  { key: 'q19', label: 'Q19. Air quality / comfort issues noticed' },
  { key: 'q20', label: 'Q20. Overall safety feeling' },
  { key: 'q21', label: 'Q21. Security personnel professionalism and responsiveness' },
  { key: 'q22', label: 'Q22. Access control' },
  { key: 'q23', label: 'Q23. CCTV coverage adequacy' },
  { key: 'q24', label: 'Q24. Experienced or witnessed security incident' },
  { key: 'q25', label: 'Q25. Comments on security' },
  { key: 'q26', label: 'Q26. Common area cleanliness' },
  { key: 'q27', label: 'Q27. Outdoor and landscaped area upkeep' },
  { key: 'q28', label: 'Q28. Waste collection and bin management' },
  { key: 'q29', label: 'Q29. Cleaning and grounds staff courteous and unobtrusive' },
  { key: 'q30', label: 'Q30. Fire safety systems and evacuation confidence' },
  { key: 'q31', label: 'Q31. Fire exits, extinguishers, emergency signage visible' },
  { key: 'q32', label: 'Q32. Child-safety provisions' },
  { key: 'q33', label: 'Q33. Observed unresolved safety hazard' },
  { key: 'q34', label: 'Q34. Sustainability practices' },
  { key: 'q35', label: 'Q35. Swimming pool and surrounding area' },
  { key: 'q36', label: 'Q36. Gym / fitness facility' },
  { key: 'q37', label: "Q37. Residents' lounge and communal social spaces" },
  { key: 'q38', label: 'Q38. Parking facilities' },
  { key: 'q39', label: 'Q39. Concierge and front-desk services' },
  { key: 'q40', label: 'Q40. Lift and vertical transport reliable and maintained' },
  { key: 'q41', label: 'Q41. Comments on amenities' },
  { key: 'q42', label: 'Q42. Submitted maintenance or service request' },
  { key: 'q43', label: 'Q43. Maintenance request acknowledgement speed' },
  { key: 'q44', label: 'Q44. Repair or service quality and completeness' },
  { key: 'q45', label: 'Q45. Technicians professional, punctual, respectful' },
  { key: 'q46', label: 'Q46. Property management communication' },
  { key: 'q47', label: 'Q47. Lease administration' },
  { key: 'q48', label: 'Q48. Internet connectivity speed and reliability' },
  { key: 'q49', label: 'Q49. Resident app or digital portal' },
  { key: 'q50', label: 'Q50. Smart home features' },
  { key: 'q51', label: 'Q51. Value for money' },
  { key: 'q52', label: 'Q52. Service area needing most improvement' },
  { key: 'q53', label: 'Q53. Single improvement to enhance quality of life' },
  { key: 'q54', label: 'Q54. Commendations or other comments' }
];

/**
 * Creates the Google Sheet used by the Aart Court HTML survey page.
 *
 * Run this once in a separate Apps Script project for Aart Court. Then deploy
 * the project as a Web App and paste the deployed URL into Aart Court/index.html.
 */
function setupAartCourtSurveyWebResponses() {
  var spreadsheet = SpreadsheetApp.create('Aart Court Resident Satisfaction Survey Responses');
  PropertiesService.getScriptProperties().setProperty(
    AART_COURT_SPREADSHEET_ID_PROPERTY,
    spreadsheet.getId()
  );

  var sheet = spreadsheet.getSheets()[0].setName(AART_COURT_RESPONSE_SHEET_NAME);
  ensureAartCourtResponseHeader_(sheet);

  Logger.log('Aart Court response spreadsheet URL: ' + spreadsheet.getUrl());
  Logger.log('Deploy this script as a Web App and paste the Web App URL into Aart Court/index.html.');

  return spreadsheet.getUrl();
}

function doPost(e) {
  var sheet = getAartCourtResponseSheet_();
  ensureAartCourtResponseHeader_(sheet);

  var row = [new Date()];
  for (var i = 0; i < AART_COURT_RESPONSE_FIELDS.length; i++) {
    row.push(getPostedAartCourtValue_(e, AART_COURT_RESPONSE_FIELDS[i].key));
  }

  sheet.appendRow(row);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return ContentService
    .createTextOutput('Aart Court Resident Satisfaction Survey response endpoint is running.')
    .setMimeType(ContentService.MimeType.TEXT);
}

function getAartCourtResponseSheet_() {
  var properties = PropertiesService.getScriptProperties();
  var spreadsheetId = properties.getProperty(AART_COURT_SPREADSHEET_ID_PROPERTY);
  var spreadsheet;

  if (spreadsheetId) {
    try {
      spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    } catch (error) {
      spreadsheet = null;
    }
  }

  if (!spreadsheet) {
    spreadsheet = SpreadsheetApp.create('Aart Court Resident Satisfaction Survey Responses');
    properties.setProperty(AART_COURT_SPREADSHEET_ID_PROPERTY, spreadsheet.getId());
  }

  var sheet = spreadsheet.getSheetByName(AART_COURT_RESPONSE_SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.getSheets()[0];
    sheet.setName(AART_COURT_RESPONSE_SHEET_NAME);
  }

  return sheet;
}

function ensureAartCourtResponseHeader_(sheet) {
  var headers = ['Timestamp'];
  for (var i = 0; i < AART_COURT_RESPONSE_FIELDS.length; i++) {
    headers.push(AART_COURT_RESPONSE_FIELDS[i].label);
  }

  var existingHeaders = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  var needsHeader = false;
  for (var j = 0; j < headers.length; j++) {
    if (existingHeaders[j] !== headers[j]) {
      needsHeader = true;
      break;
    }
  }

  if (needsHeader) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
  }
}

function getPostedAartCourtValue_(e, key) {
  if (e && e.parameters && e.parameters[key] && e.parameters[key].length > 0) {
    return e.parameters[key].join(', ');
  }

  if (e && e.parameter && e.parameter[key]) {
    return e.parameter[key];
  }

  return '';
}
