// ─── CONFIGURATION ───────────────────────────────────────────────────────────
const SPREADSHEET_ID = '1WqKUyIF_DXoFtwtc1vU1hi_2ryXJ-mAt9DsHMPbP4Ug';

const STUDENTS = {
  'XI-Adv A': [
    "Aarya Sachin Kulkarni","Adhrit Das","Aditya Pandey","Adityaram Arunaachalam",
    "Aksh Raturi","Akshaj Chakrapani","Angel Mary Asish","Angira Roy",
    "Anushree Srenivasan","Avi Mishra","Ayaan Anugrah Lall","Chetan Devireddy",
    "Dhruv Naga Aditya Tiruveedula","Diya Aju","Georgy Oommen George","Ishaan Sibin",
    "Kanav Gupta","Kanisshka B","Krisha Riteshkumar Panchal","Lakshya Kankar",
    "Lakshya Malik","Lipika Panda","Mohammad Aahil Khan","Neel Joshi",
    "Neelakantan Kaplingat","Rajveer Saxena","Rakshitha","Rishabh Mallya H",
    "Ronak Rasindh","Saksham Ranjan","Saniddhya Das","Shashwat Chandra",
    "Shrey Dusad","Sreehari Ravi Prasad","T.R.Easwar","Veda Srishti Dinnepu"
  ],
  'XI-Adv B': [
    "Aadhya Ganesh","Aakriti","Aditya Anand","Ahana Ghosh Roy",
    "Akshay Sathish","Angela Bino","Ankith Nambiar","Ashish Kumar Barik",
    "Athul Mathew","Dhruv Sai Paapisetty","Gagan M.N","Jitesh Karthik",
    "Kabir Yadav","Lalitha Samanvita Matte","Manmay Panda","Naissha Saini",
    "Parameswaran Kaplingat","Piraisoodan","Preya Mankad","Priyasha Rath",
    "Rishita Baruah","Rishitha Reddy Duddukunta","Rithika Reddy Enaganti",
    "Sharada Koona Srinivasan","Shourya Ghosh","Shubh Choudhary","Tanushkaa M"
  ],
  'XI-Mains': [
    "Aarav Dasgupta","Advitha Rohit","Ahan Agarwal","Ajay Madesh",
    "Anwesha Pai","Arshiya Karmakar","Ayanna Samal","Chirantani Ash",
    "Gauransh Kar","Ishita Sharma","Jason Chacko George","Jishnusri Spoorthy Manjuluri",
    "Keshav Syamkumar","Krishna Dash","Louie Mathew","Mayank Praful Lahorkar",
    "Narendran Jayakumar","Praneeth Venkat","Ritwik Guha","S V Niharikha",
    "Samvit Gupta","Shalini T A","Shragvi Parauha","Yash Gupta","Zoya Taj"
  ],
  'XI-NEET': [
    "Aaryan Darsi","Adit Raj","Advika Jha","Akaisha Lilani",
    "Anahita Mathur","Anirjit Chandra","Anirwin Asokane","Anushka Parasher",
    "Arjun Nambiar","Arnav Chaudhary","Arshi Khongal","Bani Samir Mewada",
    "Geena Krish","Harvi Prashant Kumar Kasodariya","Joshua George Mathew","K S Vishnupriya",
    "Krinal Krish K","Medhashree Mohan","Nikhila Shreyasi Adkasthala","P Prarthna",
    "Prarthana N","Siya Sachin Kulkarni","Tadapaneni Khyathi Vaishnavi","Vaibhav Singh",
    "Veda Goberu","Venisha Manjunath"
  ],
  'Grade X':  ["D Manya","Dheer P","Harvy Patel","Mainak Pal","Pranay Kumar"],
  'Grade IX': [
    "Abhilasha Patranabis","Anna Maria Stephen","Ayaan Chaturvedi","Bathuri Saadhvi",
    "Chandana Naga Durga Tiruveedula","Harshit Dey","Javvadi Gopi Saranya",
    "Korlapati Sri Samarth","Niveditha M","Shrish Reddy","Shubhangi Hazarika",
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

// ─── SETUP: Run once to build all sheets ─────────────────────────────────────
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

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'DPS Attendance API running' }))
    .setMimeType(ContentService.MimeType.JSON);
}
