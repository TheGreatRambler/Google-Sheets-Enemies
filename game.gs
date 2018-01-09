var w = 30;
var h = 10;
var cellw = 30;
var cellh = 30;
var core = SpreadsheetApp;
var ss = core.getActiveSpreadsheet();
var ui = core.getUi();
var sheet = ss.getSheets()[0];
var enemies = [];
var enemycolor = "	#00FFFF";
var amountofenemies = 5;

function showAlert(message) {
  var result = ui.alert('Heres a message', message, ui.ButtonSet.YES_NO);
  /*
  // Process the user's response.
  if (result == ui.Button.YES) {
    // User clicked "Yes".
    ui.alert('Confirmation received.');
  } else {
    // User clicked "No" or X in the title bar.
    ui.alert('Permission denied.');
  }
  */
}

function setValue(column, row, value) {
    var x = numToColumnName(column + 1);
    var y = row + 1
    var cell = sheet.getRange(x + y);
    cell.setValue(value);
}

function setColor(column, row, color) {
    var x = numToColumnName(column + 1);
    var y = row + 1
    var cell = sheet.getRange(x + y);
    cell.setBackground(color);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function numToColumnName(num) {
    for (var ret = '', a = 1, b = 26;
        (num -= a) >= 0; a = b, b *= 26) {
        ret = String.fromCharCode(parseInt((num % b) / a) + 65) + ret;
    }
    return ret;
}

function initRowAndColumnWidth() {
  for (var f = 1; f < w + 1; f++) {
    sheet.setColumnWidth(f, cellw);
  }
  for (var r = 1; r < h + 1; r++) {
    sheet.setRowHeight(r, cellh);
  }
}

function createenemy(x, y) {
  enemies.push({
    x: x,
    y: y
  });
}

function clearboard() {
  var x2 = numToColumnName(w);
  var y2 = h;
  var cells = sheet.getRange("A1:" + x2 + y2);
  cells.setBackground("#FFFFFF");
}

function moveEveryEnemyRandomly() {
  for (var t = 0; t < enemies.length; t++) {
    moveenemy(t, getRandomInt(1, 4));
  }
}

function moveenemy(enemyid, direction) {
  setColor(enemies[enemyid].x, enemies[enemyid].y, "#FFFFFF");
  if (direction === 1) {
    if (enemies[enemyid].y - 1 >= 0) {
      enemies[enemyid].y -= 1;
    }
  } else if (direction === 2) {
    if (enemies[enemyid].x + 1 <= w) {
      enemies[enemyid].x += 1;
    }
  } else if (direction === 3) {
    if (enemies[enemyid].y + 1 <= h) {
      enemies[enemyid].y += 1;
    }
  } else if (direction === 4) {
    if (enemies[enemyid].x - 1 >= 0) {
      enemies[enemyid].x -= 1;
    }
  }
  drawenemy(enemyid);
}

function startAiTimer() {
  moveEveryEnemyRandomly();
  Utilities.sleep(100);
  startAiTimer();
}

function drawenemy(enemyid) {
  setColor(enemies[enemyid].x, enemies[enemyid].y, enemycolor);
}

function createrandomenemies() {
  for (var r = 0; r < amountofenemies; r++) {
    createenemy(getRandomInt(0, w), getRandomInt(0, h));
    drawenemy(enemies.length - 1);
  }
}

function start() {
  clearboard();
  initRowAndColumnWidth();
  createrandomenemies();
  startAiTimer();
}
