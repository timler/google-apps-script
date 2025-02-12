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
        .addItem('Show Modal', 'showPopup')
        .addToUi();
}

/**
 * Runs when the add-on is installed.
 * This method is only used by the regular add-on, and is never called by the 
 * mobile add-on version.
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
 * Show the popup
 * This function is called from the onOpen function when the user clicks the 
 * "Show Modal" menu item.
 */
function showPopup() {
    // Create the HTML output from the Popup.html file
    const html = HtmlService.createHtmlOutputFromFile('Popup')
        .setTitle('My Popup')
        .setWidth(300);
    
    // Show the popup with the html content
    DocumentApp.getUi().showModalDialog(html, "Hello World!");
}

/**
 * This function is called from the Popup.html file when the user clicks the 
 * "Click Me!" button.
 */
function sayHello() {
    const ui = DocumentApp.getUi();
    const result = ui.alert("Hello from the modal!", "Did you like this demo?", ui.ButtonSet.YES_NO);
    if (result == ui.Button.YES) {
        ui.alert("It's a pleasure to hear that!");
    } else {
        throw new Error("User didn't like the demo!");
    }
}