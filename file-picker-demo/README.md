# File Picker Demo

This is a demo of the Google Drive File Picker API. It allows users to select files and folders from their Google Drive. 

This demo is customised to allow the users to select folders only.

Demo document: [File Picker Demo](https://docs.google.com/document/d/14QoCiZg3ffwiAiSCA0vw2i_szjLHrHRRyYoU6uxGvfA)

## How to use

1. Open the document in Google Docs.
2. Make a copy
3. Select the "Show File Picker" menu item in the Extensions menu.
4. Accept the authorization request (Click on "Advanced" and then "Allow")
5. Select the "Show File Picker" menu item again (if necessary)

Note that loading an HTML modal in Google Docs is very slow, so you may need to wait a few seconds before the picker appears.

## Code

See the code in this repository, or go to Extensions > Apps Script in the document.

## Picker API

Google Drive Picker API is a way to allow users to select files and folders from their Google Drive.

To use the Picker API, you need to create a Google Apps Script project and add the Picker API to the project in Google Cloud Console. This is done automatically when you are testing the script in Google Docs, but you will need to do it manually if you are releasing the script to the Google Workspace Marketplace.

See the [Picker API documentation](https://developers.google.com/drive/picker/reference/picker.docsview) for more information.

## Scopes

To use the picker you need to add the scope `https://www.googleapis.com/auth/drive.file` - "See, edit, create, and delete only the specific Google Drive files you use with this app".

This is a recommended scope, so it makes it easier to release the script to the Google Workspace Marketplace.

If you wish to use the [DriveApp](https://developers.google.com/apps-script/reference/drive/drive-app) or the [Advanced Drive Service](https://developers.google.com/apps-script/advanced/drive), you will probably need to add other scopes that are sensitive and even restricted. This means that you will need to justify why you need these scopes when you are releasing the script to the Google Workspace Marketplace.

See [this page](https://developers.google.com/drive/api/guides/api-specific-auth) for more information about authorization scopes for the Drive API.

See [this page](https://developers.google.com/apps-script/concepts/scopes) for more information about authorization scopes.