# Counter Demo

This is a simple demo of a counter that is stored in a Google Spreadsheet. 

It can be used to count the number of times a document is opened, or how many times a trigger is run, or how many times a function is called.

In this demo, the counter is stored in the cell A1 of the first sheet of the spreadsheet and it is incremented by 1 each time the document is opened.

Demo sheet: [Counter Demo](https://docs.google.com/spreadsheets/d/11ykLgcyvIQ-F0_8std7vubjcfRDTHoHx0UYMq-DoqlI)

## How to use

1. Open the sheet in Google Sheets
2. Make a copy (File > Make a copy)
3. Open the copied spreadsheet
4. Note the value in cell A1 and wait a few seconds for it to be incremented by 1.
5. Repeat steps 4 and 5 a few times.

## Code

See the code in this repository, or go to Extensions > Apps Script in the document.

## Notes

If the user does not have permission to edit the sheet, the counter will not be incremented.