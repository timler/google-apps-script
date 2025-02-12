# Photo Drive Doc Demo

This is a demo of how to insert images from a Google Drive folder into a Google Docs document.

The script finds the folder called "Photos" in the same folder as the document, and inserts all the images from that folder into the document.

Demo document: [Photo Drive Doc Demo](https://docs.google.com/document/d/1dtxWXgR2qgT9Kdq0sUFUMHKyJk8ZTRhl8rnqphKeEJo)

## How to use

1. Open the document in Google Docs.
2. Make a copy (File > Make a copy)
3. Select the "Insert Photos" menu item in the Extensions menu.
4. Accept the authorization request (Click on "Advanced" and then "Allow")
5. Select the "Insert Photos" menu item again (if necessary)

## Code

See the code in this repository, or go to Extensions > Apps Script in the document.

## PositionedImage

This script uses the `PositionedImage` class to insert images into the document.

See the [PositionedImage documentation](https://developers.google.com/apps-script/reference/document/positioned-image) for more information.

## DriveApp

This script uses the `DriveApp` class to find the photos folder and to get the images from the Google Drive folder.

See the [DriveApp documentation](https://developers.google.com/apps-script/reference/drive/drive-app) for more information.

## Scopes

This script uses the restricted scope `https://www.googleapis.com/auth/drive.readonly` - "See and download all your Google Drive files".

This is a restricted scope, so you will need to justify why you need it when you are releasing the script to the Google Workspace Marketplace. To avoid that, this script could be rewritten to use the Picker API to select the images from a selected Google Drive folder. See the [File Picker Demo](../file-picker-demo/README.md) for more information.

See [this page](https://developers.google.com/drive/api/guides/api-specific-auth) for more information about authorization scopes for the Drive API.

See [this page](https://developers.google.com/apps-script/concepts/scopes) for more information about authorization scopes.