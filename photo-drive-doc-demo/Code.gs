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
        .addItem('Insert Photos', 'insertImageFromDrive')
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

/** Set the maximum image size */
var maxImageSize = 250; // in pixels

/**
 * Insert images from the "photos" folder in the same directory as the document.
 * This function is called when the user selects the "Insert Photos" menu item
 * in the Extensions menu.
 */
function insertImageFromDrive(){
  var doc = DocumentApp.getActiveDocument();
  var docFile = DriveApp.getFileById(doc.getId());
  var parentFolder = docFile.getParents().next();
  
  // Look for a "photos" folder in the parent directory
  var photosFolder = null;
  var folders = parentFolder.getFolders();
  while (folders.hasNext()) {
    var folder = folders.next();
    if (folder.getName().toLowerCase() === 'photos') {
      photosFolder = folder;
      break;
    }
  }
  
  // If photos folder wasn't found, show an error message
  if (!photosFolder) {
    const ui = DocumentApp.getUi();
    ui.alert('Error', 'Could not find a "photos" folder in the same directory as this document.', ui.ButtonSet.OK);
    return;
  }

  var body = doc.getBody();

  // Create a heading
  var heading = body.appendParagraph('Images from the photos folder:');
  heading.setHeading(DocumentApp.ParagraphHeading.HEADING1);

  // Create a paragraph to attach the ƒirst image to
  var paragraph = body.appendParagraph("");

  // Go through all the images in the photos folder
  var fileIterator = photosFolder.getFiles();
  while (fileIterator.hasNext()) {
    // open the next file and check it is an image
    var file = fileIterator.next();
    if (file.getMimeType().indexOf('image/') != 0) {
      continue;
    }
    // Insert the image file name into the paragraph
    Logger.info("appending " + file.getName());
    paragraph.appendText(file.getName()+"\n");

    // Add a buffer paragraph to fix a bug where duplicate images are inserted if the paragraph is the last one in the document
    var bufferParagraph = body.appendParagraph(""); 

    // add the positioned image to the paragraph above the buffer
    var fileBlob = file.getBlob();
    var positionedImage = paragraph.addPositionedImage(fileBlob);

    // set the buffer to be the next paragraph for the next photo
    paragraph = bufferParagraph;

    // resize the image
    var currentWidth = positionedImage.getWidth() + 0;
    var currentHeight = positionedImage.getHeight() + 0;
    if (currentHeight > currentWidth) {
      // portrait image
      positionedImage.setWidth(maxImageSize);
      positionedImage.setHeight(currentHeight * (maxImageSize / currentWidth));
    } else {
      // landscape image 
      positionedImage.setWidth(currentWidth * (maxImageSize / currentHeight));
      positionedImage.setHeight(maxImageSize);
    }
    
    // set the image layout
    positionedImage.setLayout(DocumentApp.PositionedLayout.BREAK_RIGHT);
  }
}