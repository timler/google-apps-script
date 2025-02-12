/**
 * Creates a menu entry in the Google Docs UI when the document is opened.
 * This method is only used by the regular add-on, and is never called by
 * the mobile add-on version.
 *
 * @param {object} e The event parameter for a simple onOpen trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode.
 */
function onOpen(e) {
  DocumentApp.getUi()
    .createAddonMenu()
    .addItem('Show File Picker', 'showPicker')
    .addToUi();
}

/**
 * Runs when the add-on is installed.
 * This method is only used by the regular add-on, and is never called by
 * the mobile add-on version.
 *
 * @param {object} e The event parameter for a simple onInstall trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode. (In practice, onInstall triggers always
 *     run in AuthMode.FULL, but onOpen may be AuthMode.LIMITED or
 *     AuthMode.NONE.)
 */
function onInstall(e) {
  onOpen(e);
} 

/**
 * Show the file picker
 * This function is called from the onOpen function when the 
 * user clicks the "Show File Picker" menu item.
 */
function showPicker() {
  var html = HtmlService.createHtmlOutputFromFile('Picker')
      .setWidth(600)
      .setHeight(425)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);   
  DocumentApp.getUi().showModalDialog(html, 'Select a Folder');
}

/**
 * Callback function for the file picker
 * This function is called when the user selects a folder from the file picker.
 * @param {string} id The ID of the selected folder.
 */
function pickerCallback(id){
  DocumentApp.getUi().alert(`folder id: ${id}`);
}

/**
 * Gets the OAuth token. This is used to authenticate the user with the Google Drive API.
 * This function is called when the API is loaded successfully and is passed to the picker.
 * @returns {string} The OAuth token.
 */
function getOAuthToken() {
  return ScriptApp.getOAuthToken();
}