// ─── CONFIGURATION ───────────────────────────────────────────────────────────
const SPREADSHEET_ID = '1WqKUyIF_DXoFtwtc1vU1hi_2ryXJ-mAt9DsHMPbP4Ug';

const STUDENTS = {
  'XI-Adv A': [
    "Aarya Sachin Kulkarni","Adhrit Das","Aditya Pandey","Aksh Raturi",
    "Akshaj Chakrapani","Angira Roy","Anushree Srenivasan","Athul Mathew",
    "Ayaan Anugrah Lall","Dhruv Naga Aditya Tiruveedula","Diya Aju","Gagan M.N",
    "Georgy Oommen George","Ishaan Sibin","Kanav Gupta","Kanisshka B",
    "Krisha Riteshkumar Panchal","Lakshya Kankar","Lipika Panda","Manmay Panda",
    "Neelakantan Kaplingat","Preya Mankad","Priyasha Rath","Rajveer Saxena",
    "Rishabh Mallya H","Ronak Rasindh","Saksham Ranjan","Samvit Gupta",
    "Saniddhya Das","Shrey Dusad","Sreehari Ravi Prasad","T.R.Easwar",
    "Tanushkaa M","Veda Srishti Dinnepu"
  ],
  'XI-Adv B': [
    "Aadhya Ganesh","Aakriti","Aditya Anand","Adityaram Arunaachalam",
    "Ahana Ghosh Roy","Akshay Sathish","Angel Mary Asish","Angela Bino",
    "Ankith Nambiar","Ashish Kumar Barik","Avi Mishra","Chetan Devireddy",
    "Dhruv Sai Paapisetty","Jitesh Karthik","Kabir Yadav","Lakshya Malik",
    "Lalitha Samanvita Matte","Mohammad Aahil Khan","Naissha Saini","Neel Joshi",
    "Parameswaran Kaplingat","Piraisoodan","Rakshitha","Rishita Baruah",
    "Rishitha Reddy Duddukunta","Rithika Reddy Enaganti","Sharada Koona Srinivasan",
    "Shashwat Chandra","Shourya Ghosh","Shubh Choudhary"
  ],
  'XI-Mains': [
    "Aarav Dasgupta","Advitha Rohit","Ahan Agarwal","Ajay Madesh",
    "Anirjit Chandra","Anwesha Pai","Arshiya Karmakar","Ayanna Samal","Chirantani Ash",
    "Gauransh Kar","Ishita Sharma","Jason Chacko George","Jishnusri Spoorthy Manjuluri",
    "Keshav Syamkumar","Krishna Dash","Louie Mathew","Mayank Praful Lahorkar",
    "Narendran Jayakumar","Praneeth Venkat","Ritwik Guha","S V Niharikha",
    "Shalini T A","Shragvi Parauha","Yash Gupta","Zoya Taj"
  ],
  'XI-NEET': [
    "Aaryan Darsi","Adit Raj","Advika Jha","Akaisha Lilani",
    "Anahita Mathur","Anirwin Asokane","Anushka Parasher",
    "Arjun Nambiar","Arnav Chaudhary","Arshi Khongal","Bani Samir Mewada",
    "Geena Krish","Harvi Prashant Kumar Kasodariya","Joshua George Mathew","K S Vishnupriya",
    "Krinal Krish K","Medhashree Mohan","Nikhila Shreyasi Adkasthala","P Prarthna",
    "Prarthana N","Siya Sachin Kulkarni","Tadapaneni Khyathi Vaishnavi","Vaibhav Singh",
    "Veda Goberu","Venisha Manjunath"
  ],
  'Grade X':  ["D Manya","Dheer P","Harvy Patel","Mainak Pal","Pranay Kumar","Tattv Kaul"],
  'Grade IX': [
    "Abhilasha Patranabis","Advik","Akshay Bomman","Anna Maria Stephen","Ayaan Chaturvedi","Ayan Majumdar","Bathuri Saadhvi",
    "Chandana Naga Durga Tiruveedula","Harshit Dey","Javvadi Gopi Saranya",
    "Korlapati Sri Samarth","Niveditha M","Rahul","Ryan Das","Shubhangi Hazarika",
    "Tharunika V G","Thrinesh Bharadwaj","Vippagunta Arnav"
  ]
};

// Each batch gets its own accent colour (tab + title banner)
const BATCH_COLORS = {
  'XI-Adv A': '#1A237E',  // deep indigo
  'XI-Adv B': '#1B5E20',  // deep green
  'XI-Mains': '#E65100',  // deep orange
  'XI-NEET':  '#880E4F',  // deep pink
  'Grade X':  '#006064',  // deep teal
  'Grade IX': '#4A148C',  // deep purple
};

// ─── ONE-TIME MIGRATION: XI-Adv A ↔ XI-Adv B reshuffle (Jul 2026 merit list) ──
// Moves each student's full P/A history to their new batch tab, creating any
// date column the destination is missing so no data is lost, then deletes
// their row from the old tab. Run ONCE from the Apps Script editor
// (select migrateStudents from the function dropdown → Run). Safe to inspect
// the Sheet afterwards; a full backup copy was taken before this was written.
const MOVES = [
  { name: 'Angel Mary Asish',            from: 'XI-Adv A', to: 'XI-Adv B' },
  { name: 'Adityaram Arunaachalam',      from: 'XI-Adv A', to: 'XI-Adv B' },
  { name: 'Avi Mishra',                  from: 'XI-Adv A', to: 'XI-Adv B' },
  { name: 'Lakshya Malik',               from: 'XI-Adv A', to: 'XI-Adv B' },
  { name: 'Neel Joshi',                  from: 'XI-Adv A', to: 'XI-Adv B' },
  { name: 'Shashwat Chandra',            from: 'XI-Adv A', to: 'XI-Adv B' },
  { name: 'Chetan Devireddy',            from: 'XI-Adv A', to: 'XI-Adv B' },
  { name: 'Mohammad Aahil Khan',         from: 'XI-Adv A', to: 'XI-Adv B' },
  { name: 'Lakshya Kankar',              from: 'XI-Adv B', to: 'XI-Adv A' },
  { name: 'Athul Mathew',                from: 'XI-Adv B', to: 'XI-Adv A' },
  { name: 'Gagan M.N',                   from: 'XI-Adv B', to: 'XI-Adv A' },
  { name: 'Manmay Panda',                from: 'XI-Adv B', to: 'XI-Adv A' },
  { name: 'Priyasha Rath',               from: 'XI-Adv B', to: 'XI-Adv A' },
  { name: 'Preya Mankad',                from: 'XI-Adv B', to: 'XI-Adv A' },
  { name: 'Tanushkaa M',                 from: 'XI-Adv B', to: 'XI-Adv A' },
  { name: 'Samvit Gupta',                from: 'XI-Mains', to: 'XI-Adv A' }
];

function migrateStudents() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  MOVES.forEach(function(move) {
    const name = move.name, from = move.from, to = move.to;
    const fromSheet = ss.getSheetByName(from);
    const toSheet   = ss.getSheetByName(to);
    if (!fromSheet || !toSheet) { Logger.log('SKIP ' + name + ': sheet missing (' + from + ' -> ' + to + ')'); return; }

    const fromLastRow = fromSheet.getLastRow();
    if (fromLastRow < DATA_START_ROW) { Logger.log('SKIP ' + name + ': ' + from + ' has no data rows'); return; }

    const fromNames = fromSheet.getRange(DATA_START_ROW, 1, fromLastRow - DATA_START_ROW + 1, 1)
      .getValues().flat().map(function(v) { return String(v).trim(); });
    const fromIdx = fromNames.indexOf(name);
    if (fromIdx === -1) { Logger.log('SKIP ' + name + ': not found in ' + from); return; }
    const fromRow = fromIdx + DATA_START_ROW;

    const fromLastCol = fromSheet.getLastColumn();
    const fromDates  = fromLastCol >= 2 ? fromSheet.getRange(HEADER_ROW, 2, 1, fromLastCol - 1).getValues()[0].map(String) : [];
    const fromValues = fromLastCol >= 2 ? fromSheet.getRange(fromRow, 2, 1, fromLastCol - 1).getValues()[0] : [];

    // Find (or create) the student's row in the destination sheet
    const toLastRowStart = toSheet.getLastRow();
    const toNamesStart = toLastRowStart >= DATA_START_ROW
      ? toSheet.getRange(DATA_START_ROW, 1, toLastRowStart - DATA_START_ROW + 1, 1).getValues().flat().map(function(v) { return String(v).trim(); })
      : [];
    let toRow = toNamesStart.indexOf(name);
    if (toRow === -1) {
      toRow = Math.max(toLastRowStart + 1, DATA_START_ROW);
      const nameCell = toSheet.getRange(toRow, 1);
      nameCell.setValue(name).setFontSize(10).setFontFamily('Google Sans')
        .setVerticalAlignment('middle').setFontColor('#1A1A2E');
    } else {
      toRow = toRow + DATA_START_ROW;
    }

    // Copy every non-blank date value across, creating missing date columns
    fromDates.forEach(function(date, i) {
      const val = fromValues[i];
      if (!val) return;

      const toLastCol = toSheet.getLastColumn();
      const toDates = toLastCol >= 2 ? toSheet.getRange(HEADER_ROW, 2, 1, toLastCol - 1).getValues()[0].map(String) : [];
      let dateCol = toDates.indexOf(date);

      if (dateCol === -1) {
        dateCol = toLastCol + 1;
        const hCell = toSheet.getRange(HEADER_ROW, dateCol);
        hCell.setValue(date).setBackground('#1F4E79').setFontColor('#FFFFFF').setFontSize(9)
          .setFontWeight('bold').setFontFamily('Google Sans')
          .setHorizontalAlignment('center').setVerticalAlignment('middle');
        toSheet.setColumnWidth(dateCol, 100);
        toSheet.getRange(1, dateCol).setBackground(BATCH_COLORS[to] || '#1F4E79');
        toSheet.getRange(2, dateCol).setBackground('#D6E4F0');
      } else {
        dateCol = dateCol + 2;
      }

      toSheet.getRange(toRow, dateCol).setValue(val)
        .setHorizontalAlignment('center').setFontWeight('bold').setFontSize(10).setFontFamily('Google Sans');
    });

    // Remove the student's row from the old sheet now that history is copied
    fromSheet.deleteRow(fromRow);

    Logger.log('MOVED ' + name + ': ' + from + ' -> ' + to + ' (' + fromDates.length + ' date columns checked)');
  });

  Logger.log('Migration complete. Verify the Sheet, then re-run fixConditionalFormatting() if any P/A cells look unstyled.');
}

// ─── SETUP: Run once to build all sheets ─────────────────────────────────────
// ─── RUN THIS ONCE to fix conditional formatting for all sheets ──────────────
// Safe to run anytime — does NOT clear any attendance data
function fixConditionalFormatting() {
  const ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
  const GREEN = '#1E8449';
  const RED   = '#C0392B';
  const WHITE = '#FFFFFF';

  Object.keys(STUDENTS).forEach(batchName => {
    const sheet = ss.getSheetByName(batchName);
    if (!sheet) return;

    sheet.clearConditionalFormatRules();

    // Cover a large range so new students are always included
    const cfRange = sheet.getRange('B4:ZZ500');

    const presentRule = SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('P')
      .setBackground(GREEN).setFontColor(WHITE)
      .setRanges([cfRange]).build();

    const absentRule = SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('A')
      .setBackground(RED).setFontColor(WHITE)
      .setRanges([cfRange]).build();

    sheet.setConditionalFormatRules([presentRule, absentRule]);
    Logger.log(`✅ Fixed: ${batchName}`);
  });

  Logger.log('All sheets fixed!');
}

function setupAttendanceSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  const NAVY      = '#1F4E79';
  const SILVER_BG = '#D6E4F0';
  const WHITE     = '#FFFFFF';
  const ROW_ODD   = '#EAF4FB';
  const ROW_EVEN  = '#FFFFFF';
  const GREEN     = '#1E8449';
  const RED       = '#C0392B';
  const BORDER    = '#B0BEC5';

  // Delete default blank sheet last (only if other sheets exist)
  const defaultSheet = ss.getSheetByName('Sheet1');

  Object.entries(STUDENTS).forEach(([batchName, students]) => {
    let sheet = ss.getSheetByName(batchName);
    if (!sheet) sheet = ss.insertSheet(batchName);

    sheet.clearContents();
    sheet.clearFormats();
    sheet.clearConditionalFormatRules();

    const accent = BATCH_COLORS[batchName] || NAVY;

    // ── Row 1: Batch title banner ──────────────────────────────────────────
    sheet.setRowHeight(1, 40);
    const titleRange = sheet.getRange(1, 1);
    titleRange.setValue(`  DPS WHITEFIELD  ·  ${batchName.toUpperCase()}  ·  ATTENDANCE REGISTER`);
    titleRange.setBackground(accent);
    titleRange.setFontColor(WHITE);
    titleRange.setFontSize(12);
    titleRange.setFontWeight('bold');
    titleRange.setFontFamily('Google Sans');
    titleRange.setVerticalAlignment('middle');

    // ── Row 2: Info strip ─────────────────────────────────────────────────
    sheet.setRowHeight(2, 24);
    const infoRange = sheet.getRange(2, 1);
    infoRange.setValue(`  ${students.length} Students   ·   Academic Year 2025–26   ·   🟢 P = Present    🔴 A = Absent`);
    infoRange.setBackground(SILVER_BG);
    infoRange.setFontColor(NAVY);
    infoRange.setFontSize(9);
    infoRange.setFontWeight('bold');
    infoRange.setFontFamily('Google Sans');
    infoRange.setVerticalAlignment('middle');

    // ── Row 3: Column headers ─────────────────────────────────────────────
    sheet.setRowHeight(3, 32);
    const colHeader = sheet.getRange(3, 1);
    colHeader.setValue('STUDENT NAME');
    colHeader.setBackground(NAVY);
    colHeader.setFontColor(WHITE);
    colHeader.setFontSize(10);
    colHeader.setFontWeight('bold');
    colHeader.setFontFamily('Google Sans');
    colHeader.setVerticalAlignment('middle');
    colHeader.setHorizontalAlignment('left');

    // ── Rows 4+: Student names ────────────────────────────────────────────
    students.forEach((name, i) => {
      const rowNum = i + 4;
      sheet.setRowHeight(rowNum, 26);
      const cell = sheet.getRange(rowNum, 1);
      cell.setValue(name);
      cell.setBackground(i % 2 === 0 ? ROW_ODD : ROW_EVEN);
      cell.setFontSize(10);
      cell.setFontFamily('Google Sans');
      cell.setVerticalAlignment('middle');
      cell.setFontColor('#1A1A2E');
    });

    // ── Column widths ─────────────────────────────────────────────────────
    sheet.setColumnWidth(1, 240);

    // ── Freeze title + info + header rows, and name column ────────────────
    sheet.setFrozenRows(3);
    sheet.setFrozenColumns(1);

    // ── Border on the student name column ─────────────────────────────────
    sheet.getRange(3, 1, students.length + 1, 1)
      .setBorder(true, true, true, true, false, true,
                 BORDER, SpreadsheetApp.BorderStyle.SOLID);

    // ── Conditional formatting ─────────────────────────────────────────────
    const lastDataRow = students.length + 3;
    const cfRange = sheet.getRange(`B4:ZZ${lastDataRow}`);

    const presentRule = SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('P')
      .setBackground(GREEN)
      .setFontColor(WHITE)
      .setRanges([cfRange])
      .build();

    const absentRule = SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('A')
      .setBackground(RED)
      .setFontColor(WHITE)
      .setRanges([cfRange])
      .build();

    sheet.setConditionalFormatRules([presentRule, absentRule]);

    // ── Tab colour ────────────────────────────────────────────────────────
    sheet.setTabColor(accent);
  });

  // Remove default blank sheet
  if (defaultSheet && ss.getSheets().length > 1) {
    ss.deleteSheet(defaultSheet);
  }

  Logger.log('✅  Setup complete! All 6 batch sheets created.');
}

// ─── WEB APP: POST handler ────────────────────────────────────────────────────
// Sheet layout: Row 1 = title, Row 2 = info, Row 3 = headers, Row 4+ = students
const DATA_START_ROW = 4;
const HEADER_ROW     = 3;

function doPost(e) {
  try {
    const data       = JSON.parse(e.postData.contents);
    const batch      = data.batch;
    const dateStr    = data.date;        // e.g. "02-Jun-2026"
    const attendance = data.attendance;  // [{name, status}, ...]

    const ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(batch);
    if (!sheet) throw new Error('Sheet not found: ' + batch);

    // Find or create column for today's date (in row 3)
    const lastCol   = Math.max(sheet.getLastColumn(), 1);
    const headerRow = sheet.getRange(HEADER_ROW, 1, 1, lastCol).getValues()[0];
    let dateCol     = headerRow.indexOf(dateStr) + 1;

    if (dateCol === 0) {
      dateCol = lastCol + 1;
      const hCell = sheet.getRange(HEADER_ROW, dateCol);
      hCell.setValue(dateStr);
      hCell.setBackground('#1F4E79');
      hCell.setFontColor('#FFFFFF');
      hCell.setFontSize(9);
      hCell.setFontWeight('bold');
      hCell.setFontFamily('Google Sans');
      hCell.setHorizontalAlignment('center');
      hCell.setVerticalAlignment('middle');
      sheet.setColumnWidth(dateCol, 100);

      // Extend title + info banners to cover new column
      sheet.getRange(1, dateCol).setBackground(BATCH_COLORS[batch] || '#1F4E79');
      sheet.getRange(2, dateCol).setBackground('#D6E4F0');
    }

    // Read names directly from column A of the sheet — order-independent
    const lastRow = sheet.getLastRow();
    const nameCol = sheet.getRange(DATA_START_ROW, 1, lastRow - DATA_START_ROW + 1, 1).getValues().flat();
    const nameMap = {};
    nameCol.forEach((name, i) => {
      if (name && name.trim()) nameMap[name.trim()] = i + DATA_START_ROW;
    });

    attendance.forEach(({ name, status }) => {
      const rowNum = nameMap[name.trim()];
      if (rowNum) {
        const cell = sheet.getRange(rowNum, dateCol);
        cell.setValue(status);
        cell.setHorizontalAlignment('center');
        cell.setFontWeight('bold');
        cell.setFontSize(10);
        cell.setFontFamily('Google Sans');
      }
    });

    // Record submission in Properties so all phones can sync instantly
    const props   = PropertiesService.getScriptProperties();
    const key     = `submitted_${dateStr}`;
    const already = JSON.parse(props.getProperty(key) || '[]');
    if (!already.includes(batch)) {
      already.push(batch);
      props.setProperty(key, JSON.stringify(already));
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  const params = (e && e.parameter) || {};

  if (params.action === 'history' && params.batch) {
    return getBatchHistory(params.batch);
  }

  const date = params.date;

  if (!date) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'DPS Attendance API running' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const props     = PropertiesService.getScriptProperties();
  const submitted = JSON.parse(props.getProperty(`submitted_${date}`) || '[]');

  return ContentService
    .createTextOutput(JSON.stringify({ submitted }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Returns the full P/A grid for a batch: every date column ever submitted,
// per student, read straight from the Sheet (so it's always in sync with
// whatever's visible to management there).
function getBatchHistory(batch) {
  const ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(batch);

  if (!sheet) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: 'Sheet not found: ' + batch }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();

  if (lastRow < DATA_START_ROW || lastCol < 2) {
    return ContentService
      .createTextOutput(JSON.stringify({ batch: batch, dates: [], students: [] }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const dates     = sheet.getRange(HEADER_ROW, 2, 1, lastCol - 1).getValues()[0].map(String);
  const dataRange = sheet.getRange(DATA_START_ROW, 1, lastRow - DATA_START_ROW + 1, lastCol).getValues();

  const students = dataRange
    .filter(function(row) { return row[0] && String(row[0]).trim(); })
    .map(function(row) {
      return {
        name:    String(row[0]).trim(),
        records: row.slice(1).map(function(v) { return v ? String(v) : ''; })
      };
    });

  return ContentService
    .createTextOutput(JSON.stringify({ batch: batch, dates: dates, students: students }))
    .setMimeType(ContentService.MimeType.JSON);
}
