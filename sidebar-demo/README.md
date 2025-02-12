# Sidebar Demo

This is a demo of a sidebar in Google Docs. A sidebar is an HTML window that appears on the left side of the document.

It is useful to use a sidebar as a user-interface for an add-on. HTML loads very slowly in app scripts and so it may be better to use a sidebar to avoid loading HTML modals with every user interaction.

Demo document: [Sidebar Demo](https://docs.google.com/document/d/18_srsVLaR7Vt2Phk7QIqx1DFTzcOMdICzLr5gigLZWU)

## How to use

1. Open the document in Google Docs.
2. Make a copy
3. Select the "Show Sidebar" menu item in the Extensions menu.
4. Accept the authorization request (Click on "Advanced" and then "Allow")
5. Select the "Show Sidebar" menu item again (if necessary)

## Code

See the code in this repository, or go to Extensions > Apps Script in the document.

## Scopes

To use the sidebar you need to add the scope `https://www.googleapis.com/auth/script.container.ui` - "Display and run third-party web content in prompts and sidebars inside Google applications". 

This is a sensitive scope, so you will need to justify why you need it when you are releasing the script to the Google Workspace Marketplace.

See [this page](https://developers.google.com/apps-script/concepts/scopes) for more information about authorization scopes.