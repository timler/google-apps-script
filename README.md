# Google Apps Script Demos

This repository contains a collection of Google Apps Script demos with Google Docs and Google Sheets.

## Table of Contents
- [How to use this repository](#how-to-use-this-repository)
- [What is Google Apps Script?](#what-is-google-apps-script)
- [How to publish a Google Docs Add-on](#how-to-publish-a-google-docs-add-on)

## How to use this repository

This repository is a collection of Google Apps Script projects. Each project is a separate folder.

To run a project, open the project folder and open the demo document. You should make a copy of the document first and then you can run the script and view the app script code from within the document. You can also view the code in Github.

## What is Google Apps Script?

Google Apps Script is a JavaScript-based language that allows you to automate tasks across Google products and third-party services. [Read more](https://developers.google.com/apps-script).

Google Apps Scripts are a powerful way to extend the functionality of Google Docs, Sheets, Slides, and Forms with add-ons (extensions). [Read more](https://developers.google.com/apps-script/add-ons).

### How to publish a Google Docs Add-on

This can be a laborious process, but it is the only way to make your script available to others or to use the script in multiple documents.

> **Note**  
> If you have a private Google Domain, you can publish your add-on privately to your domain and avoid the need to publish to the Google Workspace Marketplace, but if you don't unfortunately you will need to publish to the Google Workspace Marketplace.

Google has a lot of documentation on how to publish an add-on, but I find most of it confusing and not very helpful. The only exception is the video on this page: [Publish apps to the Google Workspace Marketplace](https://developers.google.com/workspace/marketplace/how-to-publish)

There are two major parts to publishing an add-on:

1. OAuth configuration (and verification)
2. Publishing to the Google Workspace Marketplace (and verification)

*OAuth* is the process of verifying that you are the owner of the add-on and specifying the permissions that your add-on will need. This is linked to the authorization flow of your add-on. When OAuth is verified then you no longer have to go to "Advanced" when you are authorizing the add-on.

*Publishing to the Google Workspace Marketplace* is the process of creating a listing for your add-on in the Google Workspace Marketplace. This is where users can find and install your add-on.

Here are the basic steps, once you have created your code and tested:

1. [Do a review of your OAuth scopes](#step-1-do-a-review-of-your-oauth-scopes)
2. [Get all your resources ready](#step-2-get-all-your-resources-ready)
3. [Create a project in the Google Cloud Console](#step-3-create-a-project-in-the-google-cloud-console)
4. [Create a deployed version of your add-on](#step-4-create-a-deployed-version-of-your-add-on)
5. [Create your OAuth consent screen](#step-5-create-your-oauth-consent-screen)
6. [Create your add-on listing](#step-6-create-your-add-on-listing)

#### Step 1: Do a review of your OAuth scopes

This is a painful step, but it is necessary and it's helpful to do it before you start the process of publishing your add-on because it may require you to change your code.

OAuth scopes are the permissions that your add-on will need. For example, if you want to display a sidebar in Google Docs, you will need the `https://www.googleapis.com/auth/script.container.ui` scope, which is described as "Display and run third-party web content in prompts and sidebars inside Google applications".

These are the permissions that users will be asked to grant when they authorize your add-on.

Scopes can be divided into three categories:

1. Recommended
2. Sensitive
3. Restricted

If your add-on uses and sensitive or restricted scopes you will need to do extra work to get verified, and it may not be possible if the review team feels that you haven't justified your usage of the scopes.

##### Workarounds for some common sensitive and restricted scopes

In some cases it is easy to swap out a sensitive or restricted scope for a recommended scope. 

For example, often the default scope `https://www.googleapis.com/auth/documents` can be swapped out for the `https://www.googleapis.com/auth/documents.currentonly` scope. The former is a sensitive scope, which gives your add-on access to all your Google Docs, but the latter is a recommended scope, which gives your add-on access to the current Google Doc. To do this, you will need to add a comment annotation to your code, like this:

```javascript
/** @OnlyCurrentDoc */
```

The scope `https://www.googleapis.com/auth/script.container.ui` is a sensitive scope (Display and run third-party web content in prompts and sidebars inside Google applications). However, if you are displaying any HTML content in a sidebar or popup you will need this scope.

Drive scopes are particularly tricky. Using `DriveApp` generally requires you to use restricted scopes. You should replace `DriveApp` with the the Advanced Drive Service or Picker API.

See [this page](https://developers.google.com/apps-script/concepts/scopes) for more information about authorization scopes.

> **How to find the scopes your project uses**  
> Open the App Script editor and click on the overview tab. Project OAuth Scopes are displayed at the bottom of the page. If you edit the code, the scopes will be updated automatically, but you can edit them manually with the appscript.json file, which can be enabled on the Project Settings page by checking "Show appscript.json manifest in editor".

#### Step 2. Get all your resources ready

These are the things you will need to have ready before you can publish your add-on:

1. A name and description (long/short) for your add-on
2. A verified website with a home page, privacy policy, terms of service, and contact-us info
3. Graphic assets
4. Demo video for verification purposes
5. Video for the add-on listing (optional)

Importantly, if you use any Google Trademarks (e.g. Docs, Sheets, Slides, Forms) in any text please add ™ after every reference.

##### 2.1 Names and descriptions

Come up with a name for your add-on and make sure that it is not already taken, and that it is used consistantly across all your resources. It should also be less than 50 characters and is recommended that you use a name that is relevant to the functionality of the add-on and use title case.

The descriptions are used in the Google Marketplace listing. The short description is max 200 characters and the long description is max 16,000 characters.

##### 2.2 A verified home page, privacy policy, and terms of service

You will need to create a home page, privacy policy, and terms of service pages on a domain that is verified as your own (by the account that is the owner of the script project).

* The home page should be a simple HTML page with a link to the privacy policy and terms of service.
* The privacy policy should be a simple HTML page that explains what data is collected and how it is used.
* The terms of service should be a simple HTML page that explains what the user can expect from the add-on and what they can't do with it.

Here are some helpful links:

* [App Home Page](https://support.google.com/cloud/answer/13807376)
* [App Privacy Policy](https://support.google.com/cloud/answer/13806988)
* [App Identify and Branding](https://support.google.com/cloud/answer/13804963)
* [Verify your site ownership](https://support.google.com/webmasters/answer/9008080)

##### 2.3 Graphic Assets

To publish an add-on to the Google Workspace Marketplace you will need to create some images and icons. 

Specifically you will need:

* A 32x32 icon (png)
* A 48x48 icon (png)
* A 64x64 icon (png)
* A 120x120 icon (png)
* A 220x140 Application card banner
* Screenshot(s) 1,280x800 (png)

Note: the icons need to match the logo on the linked webpages (home, privacy, etc).

##### 2.4 Demo video

If you are using sensitive or restricted scopes in your add-on, you will need to provide a demo video for the reviewers. The video is only used for verification purposes and is not shown to users.

The demo video must show the entire authorization flow of your add-on and must show the functionality of the add-on. It is recommended that you do a screen recording and provide voice over to explain the video.

Once you are finished the video, it should be uploaded to Youtube (unlisted if you like) - you will need to provide the URL to the video during the process of publishing your add-on.

##### 2.5 Optional assets

You can also add a video to your add-on listing, that will be shown to users when they are viewing your add-on listing. This is optional, but it can be a good way to show off your add-on.

##### Handy Checklist

See [this page](https://developers.google.com/workspace/marketplace/about-app-review#reqs_all) for an exhaustive checklist of the requirements for publishing an add-on.

#### Step 3. Create a project in the Google Cloud Console

You will need to create a project in your Google Cloud Console. This is free, but you are limited to the number of projects you can have.

* Go to the [Google Cloud Console](https://console.cloud.google.com/cloud-resource-manager?inv=1&invt=AbpZqg) and click on the "Create Project" button.
* Copy the Project ID and Project Number.
* Go to your App Script editor and click on the "Project Settings" tab. Under "Google Cloud Platform (GCP) Project" click the "Change Project" button. Enter the Project Number and click "Set project".

#### Step 4. Create a deployed version of your add-on

You will need to have a deployed version of your add-on to release it. And every time you make a change to your add-on you will need to deploy it again, and then update the version number in the Google Workspace Marketplace settings.

To create a released version of your add-on, you will need to click on the "Deploy" button in the App Script editor, then select "New deployment". Enter a description (e.g. v1 initial release) and click "Deploy".

Take note of the Script ID (in the URL or under "Project Settings") and version number you just created.

#### Step 5. Create your OAuth consent screen

Go to the Google Cloud Console and click on the "OAuth consent screen" tab under "API & Services". Or click [here](https://console.cloud.google.com/auth/overview) to go straight to the OAuth consent screen.

There are a couple of steps to complete the OAuth consent screen:

1. Branding information
2. Data Access

Under Branding information, you need to enter:
- the name of your add-on
- the user support email address
- a logo (120x120) that matches the logo on the webpages below
- the application homepage URL
- the application privacy policy URL
- the application terms of service URL
- the authorization domain
- the developer email address

Under Data Access, you need to manage your scopes. 

You will need to add the scopes that your add-on uses. You should take the scopes that are listed in the appscript.json file, or under the Overview tab in the App Script editor, and add them to the OAuth consent screen.

If you have any sensitive or restricted scopes, you will need to justify why you need them and provide a link to a demo video that shows the add-on in action.

Here are some helpful links to help with OAuth verification:

* [Configure OAuth](https://developers.google.com/workspace/marketplace/configure-oauth-consent-screen)
* [OAuth App Verification Help Center](https://support.google.com/cloud/answer/13463073)
* [Verify your site ownership](https://support.google.com/webmasters/answer/9008080)

> **Note:**  
> You will need to get the OAuth consent screen verified before you can publish your add-on. This step can take a while, so be patient.

#### Step 6. Create your add-on listing

There are two parts - App Configuration and Store Listing.

App Configuration is the technical stuff, defining 

- the kind of add-on (Sheets, Docs, Slides, etc)
- the script ID
- the script version (which must be deployed)
- the OAuth scopes (which must match the scopes you selected for your OAuth verification)
- the developer information

Store Listing is what users will see when they are browsing the Google Workspace Marketplace. It defines:

- App language, name, and description
- Pricing
- Category
- Graphic assets
- Screenshots
- Promo video (hosted on Youtube; optional)
- Support links
- Distribution

This should be the easy part, but you still need to get your listing, and any future updates to your listing, to be reviewed before it's made public.

For more help on creating a listing, [go here](https://developers.google.com/workspace/marketplace/create-listing).