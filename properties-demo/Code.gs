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
 * @param {object} e The event parameter for a simple onOpen trigger.
 */
function onOpen(e) {
    DocumentApp.getUi()
        .createAddonMenu()
        .addItem('Set Property', 'setProperty')
        .addItem('View All Properties', 'readProperties')
        .addItem('Delete All Propertyies', 'deleteAllProperties')
        .addToUi();
}

/**
 * Runs when the add-on is installed.
 * 
 * @param {object} e The event parameter for the installation trigger.
 */
function onInstall(e) {
    onOpen(e);
}

/**
 * Prompts the user to set a property in the selected property store.
 * Shows a series of dialogs to:
 * 1. Select the property store type (document, script, or user)
 * 2. Enter the property key
 * 3. Enter the property value
 */
function setProperty() {
  const ui = DocumentApp.getUi();
  const propertyStore = getPropertyStore("Set Property");
  if (propertyStore) {   
    // Ask for the property key
    const keyResponse = ui.prompt(
        'Set Property',
        'Enter the property key:',
        ui.ButtonSet.OK_CANCEL
    );
    if (keyResponse.getSelectedButton() !== ui.Button.OK) {
        return;
    }
    const key = keyResponse.getResponseText();
    if (!key) {
        ui.alert('Property key cannot be empty.');
        return;
    }
    // Ask for the property value
    const valueResponse = ui.prompt(
        'Set Property',
        'Enter the property value:',
        ui.ButtonSet.OK_CANCEL
    );
    if (valueResponse.getSelectedButton() !== ui.Button.OK) {
        return;
    }
    const value = valueResponse.getResponseText();  
    // Set the property
    propertyStore.setProperty(key, value);
    ui.alert('Property set successfully!');
  }
}

/**
 * Displays all properties from the selected property store.
 * Shows a dialog to:
 * 1. Select the property store type (document, script, or user)
 * 2. Displays all properties in that store in JSON format
 */
function readProperties() {
    const propertyStore = getPropertyStore("Read Properties");
    if (propertyStore) {
      const props = propertyStore.getProperties();
      let message = "Current properties:\n";
      message += JSON.stringify(props, null, 2);
      DocumentApp.getUi().alert(message);
    }
}

/**
 * Deletes all properties from the selected property store.
 * Shows a dialog to:
 * 1. Select the property store type (document, script, or user)
 * 2. Deletes all properties in that store
 */
function deleteAllProperties() {
    const propertyStore = getPropertyStore("Delete Property");
    if (propertyStore) {
      propertyStore.deleteAllProperties();
      ui.alert("All "+ type + "properties deleted successfully!");
    }
}

/**
 * Helper function to get the appropriate property store based on user input.
 * 
 * @param {string} title - The title to display in the property type selection dialog
 * @returns {Properties|null} The selected property store or null if selection was cancelled
 *                          or an invalid type was entered
 */
function getPropertyStore(title) {
    const ui = DocumentApp.getUi();

    // First, ask for the property type
    const typeResponse = ui.prompt(
        title,
        'Enter property type (document, script, or user):',
        ui.ButtonSet.OK_CANCEL
    );
    
    if (typeResponse.getSelectedButton() !== ui.Button.OK) {
        return null;
    }
    
    const type = typeResponse.getResponseText().toLowerCase();
    if (!['document', 'script', 'user'].includes(type)) {
        ui.alert('Invalid property type. Please enter document, script, or user.');
        return null;
    }

    let propertyStore;
    switch(type) {
        case 'document':
            propertyStore = PropertiesService.getDocumentProperties();
            break;
        case 'script':
            propertyStore = PropertiesService.getScriptProperties();
            break;
        case 'user':
            propertyStore = PropertiesService.getUserProperties();
            break;
    }
    return propertyStore;
} 