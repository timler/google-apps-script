# Properties Demo

https://developers.google.com/apps-script/reference/properties/properties-service

This is a demo of properties in Google Docs, which allows scripts to save simple key-value data saved to various scopes.

Demo document: [Properties Demo](https://docs.google.com/document/d/1-CKCvBOafJZ6PaAY_az8vMAKTOcrn-UQj3RfuslP1Oo/edit?usp=sharing)

To test the scopes, try the following scenarios:

* Save a user property with one logged in user and then try to view user properties with another user who has access to the same file
* Repeat the same test with a document and script property

The difference between document and script property is hard to test without an add-on. Script properties are shared between all users of an add-on. Document properties are shared between all users of the same document.

## How to use

1. Open the document in Google Docs.
2. Make a copy
3. Select one of menu item under "Properties Demo" in the Extensions menu.
4. Accept the authorization request (Click on "Advanced" and then "Allow")
5. Select the menu item again (if necessary)

## Code

See the code in this repository, or go to Extensions > Apps Script in the document.

## Scopes

To use a modal you need to add the scope `https://www.googleapis.com/auth/documents.currentonly` - "View and manage documents that this application has been installed in	". 

This is a regular scope, so requires no special permissions, so OAuth verification is not required if this add-on is published.

See [this page](https://developers.google.com/apps-script/concepts/scopes) for more information about authorization scopes.