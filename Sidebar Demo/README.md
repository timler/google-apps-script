# Sidebar Demo

This is a demo of a sidebar in Google Docs.

Demo document: [Sidebar Demo](https://docs.google.com/document/d/18_srsVLaR7Vt2Phk7QIqx1DFTzcOMdICzLr5gigLZWU)

## How to use

1. Open the document in Google Docs.
2. Make a copy
3. Select the "Show Sidebar" menu item in the Extensions menu.
4. Accept the authorization request (Click on "Advanced" and then "Allow")
5. Select the "Show Sidebar" menu item again (if necessary)

## Sidebar

A sidebar is a small HTML window that appears on the left side of the document which can be used as a user interface for the add-on.

As HTML can be very slow to load in Google Apps Script, it is useful to use a sidebar to avoid having to load HTML in modals every time the user wants to use the add-on.

## Scope

To use the sidebar you need to add the scope `https://www.googleapis.com/auth/script.container.ui` - "Display and run third-party web content in prompts and sidebars inside Google applications". 

This is a sensitive scope, so you will need to justify why you need it when you are releasing the script to the Google Workspace Marketplace.

