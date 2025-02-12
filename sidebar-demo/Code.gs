/**
 * @OnlyCurrentDoc
 *
 * The above comment directs Apps Script to limit the scope of file
 * access for this add-on. It specifies that this add-on will only
 * attempt to read or modify the files in which the add-on is used,
 * and not all of the user's files. The authorization request message
 * presented to users will reflect this limited scope.
 */

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
    .addItem('Show Sidebar', 'showSidebar')
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
function onInstall(e){
  onOpen(e);
}

/**
 * Show the sidebar
 * This function is called from the onOpen function when the 
 * user clicks the "Show Sidebar" menu item.
 */
function showSidebar() {
  const html = HtmlService.createHtmlOutputFromFile('Sidebar')
    .setTitle('My Sidebar');
  DocumentApp.getUi().showSidebar(html);
}

/**
 * Insert text into the document
 * This function is called from sidebar.html file when the user clicks the 
 * "Insert Text" button.
 */
function insertText() {
  const doc = DocumentApp.getActiveDocument();
  const cursor = doc.getCursor();
  if (cursor) {
    const element = cursor.insertText('Hello from the sidebar!');
    doc.setCursor(doc.newPosition(element, element.getText().length));
  } else {
    const body = doc.getBody();
    body.appendParagraph('Hello from the sidebar!');
  }
}