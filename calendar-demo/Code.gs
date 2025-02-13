/**
 * @OnlyCurrentDoc
 *
 * The above comment directs Apps Script to limit the scope of file
 * access for this add-on. It specifies that this add-on will only
 * attempt to read or modify the files in which the add-on is used,
 * and not all of the user's files. The authorization request message
 * presented to users will reflect this limited scope.
 */

var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
var weekDays = [  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];

/**
 * Test function to insert a calendar.
 * This can be run from the Apps Script editor to test the insertCalendar
 * function without loading the sidebar.
 */
function test() {
  insertCalendar(2017, 8, 0);
}

/**
 * Inserts a calendar into the active document.
 * This function is called from the sidebar, or from the test() function (above)
 * @param {number} year The year of the calendar
 * @param {number} month The month of the calendar (0-11)
 * @param {number} startDay The day of the week to start the calendar (0-6, where 0 is Sunday)
 */
function insertCalendar(year, month, startDay) {
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();

  month = parseInt(month, 10); // ensure month is a number
  startDay = parseInt(startDay, 10) || 0; // ensure startDay is a number, default to 0 if undefined
  
  // Adjust weekDays array based on start day
  var adjustedWeekDays = weekDays.slice();
  if (startDay === 1) { // If starting on Monday
    adjustedWeekDays = weekDays.slice(1).concat(weekDays[0]);
  }
  
  // Calculate number of rows needed
  var firstDay = new Date(year, month, 1);
  var lastDay = new Date(year, (month + 1), 0);
  var totalDays = lastDay.getDate();
  var startingDay = (firstDay.getDay() - startDay + 7) % 7; // Adjust starting day based on selected start day
  var rowsNeeded = Math.ceil((startingDay + totalDays) / 7);
  
  // Create cells array with dynamic rows
  var cells = [adjustedWeekDays]; // First row for weekday names
  for (var i = 0; i < rowsNeeded; i++) {
    cells.push(['','','','','','','']);
  }

  // fill the cells with the dates
  var date = new Date(year, month, 1);
  var cur_month = month;
  var row = 1;
  var col = startingDay;
  while (cur_month == date.getMonth()) {
    cells[row][col] = date.getDate() + '\n\n\n\n';
    col += 1;
    if (col > 6) {
      col = 0;
      row += 1;
    }
    date = new Date(date.getTime() + 1000*60*60*24);
  }

  // Handle cursor position or default to beginning
  var insertPosition = 0;
  var cursor = doc.getCursor();
  if (cursor) {
    var element = cursor.getElement();
    var parent = element.getParent();
    insertPosition = parent.getChildIndex(element);
  }

  // Create a new paragraph for the heading and table to keep them together
  var paragraph = body.insertParagraph(insertPosition, '');
  
  // Add the heading to the new paragraph
  var heading = paragraph.appendText(monthNames[month] + ' ' + year);
  heading.setFontSize(24);
  
  // Add the table right after the heading
  var table = body.insertTable(insertPosition + 1, cells);
  table.setFontSize(12);

  // Set font size for header row
  var headerRow = table.getRow(0);
  headerRow.setFontSize(10);
}

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
  DocumentApp.getUi().createAddonMenu()
      .addItem('Start', 'showSidebar')
      .addToUi();
}


/**
 * Runs when the add-on is installed.
 * This method is only used by the regular add-on, and is never called by
 * the mobile add-on version.
 *
 * @param {object} e The event parameter for a simple onInstall trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode. (In practice, onInstall triggers always
 *     run in AuthMode.FULL, but onOpen triggers may be AuthMode.LIMITED or
 *     AuthMode.NONE.)
 */
function onInstall(e) {
  onOpen(e);
}

/**
 * Opens a sidebar in the document containing the add-on's user interface.
 * This method is only used by the regular add-on, and is never called by
 * the mobile add-on version.
 */
function showSidebar() {
  var ui = HtmlService
      .createHtmlOutputFromFile('Sidebar')
      .setTitle('Calendar Demo');
  DocumentApp.getUi().showSidebar(ui);
}