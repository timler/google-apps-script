# Modal Demo

This is a demo of a modal in Google Docs, which can display HTML content in a popup.

HTML can be very slow to load in Google Apps Script, so it is better to use `ui.alert()` to show a simple message to the user, or to load a sidebar that only loads once.

Demo document: [Modal Demo](https://docs.google.com/document/d/1yklcTKiUGFXTxOrdJIa4hiS44x70uU5pmjTzVw2kOR0)

## How to use

1. Open the document in Google Docs.
2. Make a copy
3. Select the "Show Modal" menu item in the Extensions menu.
4. Accept the authorization request (Click on "Advanced" and then "Allow")
5. Select the "Show Modal" menu item again (if necessary)

## Code

See the code in this repository, or go to Extensions > Apps Script in the document.

## Scopes

To use a modal you need to add the scope `https://www.googleapis.com/auth/script.container.ui` - "Display and run third-party web content in prompts and sidebars inside Google applications". 

This is a sensitive scope, so you will need to justify why you need it when you are releasing the script to the Google Workspace Marketplace.

See [this page](https://developers.google.com/apps-script/concepts/scopes) for more information about authorization scopes.
