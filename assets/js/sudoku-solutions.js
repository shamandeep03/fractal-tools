let speed = 50;
let ratings = "";
function get_speed(e){
  speed = e
}
(function (global) {
  "use strict";
  var util = {
    extend: function (src, props) {
      props = props || {};
      var p;
      for (p in src) {
        if (!props.hasOwnProperty(p)) {
          props[p] = src[p];
        }
      }
      return props;
    },
    each: function (a, b, c) {
      if ("[object Object]" === Object.prototype.toString.call(a)) {
        for (var d in a) {
          if (Object.prototype.hasOwnProperty.call(a, d)) {
            b.call(c, d, a[d], a);
          }
        }
      } else {
        for (var e = 0, f = a.length; e < f; e++) {
          b.call(c, e, a[e], a);
        }
      }
    },
    isNumber: function (n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    },
    includes: function (a, b) {
      return a.indexOf(b) > -1;
    },
  };

  /**
   * Default configuration options. These can be overriden
   * when loading a game instance.
   * @property {Object}
   */
  var defaultConfig = {
    validate_on_insert: true,

    difficulty: "normal",
  };

  /**
   * Sudoku singleton engine
   * @param {Object} config Configuration options
   */
  function Game(config) {
    this.config = config;

    this.cellMatrix = {};
    this.matrix = {};
    this.validation = {};

    this.values = [];

    this.resetValidationMatrices();

    return this;
  }
  /**
   * Game engine prototype methods
   * @property {Object}
   */
  Game.prototype = {
    /**
     * Build the game GUI
     * @returns {HTMLTableElement} Table containing 9x9 input matrix
     */
    buildGUI: function () {
      var td, tr;

      this.table = document.createElement("table");
      this.table.classList.add("sudoku-container");

      for (var i = 0; i < 9; i++) {
        tr = document.createElement("tr");
        this.cellMatrix[i] = {};

        for (var j = 0; j < 9; j++) {
          this.cellMatrix[i][j] = document.createElement("input");
          this.cellMatrix[i][j].maxLength = 1;

          this.cellMatrix[i][j].row = i;
          this.cellMatrix[i][j].col = j;

          this.cellMatrix[i][j].addEventListener(
            "keyup",
            this.onKeyUp.bind(this)
          );

          td = document.createElement("td");

          td.appendChild(this.cellMatrix[i][j]);

          var sectIDi = Math.floor(i / 3);
          var sectIDj = Math.floor(j / 3);

          if ((sectIDi + sectIDj) % 2 === 0) {
            td.classList.add("sudoku-section-one");
          } else {
            td.classList.add("sudoku-section-two");
          }

          tr.appendChild(td);
        }

        this.table.appendChild(tr);
      }

      this.table.addEventListener("mousedown", this.onMouseDown.bind(this));

      return this.table;
    },

    /**
     * Handle keyup events.
     *
     * @param {Event} e Keyup event
     */
    onKeyUp: function (e) {
      var sectRow,
        sectCol,
        secIndex,
        val,
        row,
        col,
        isValid = true,
        input = e.currentTarget;

      val = input.value.trim();
      row = input.row;
      col = input.col;

      this.table.classList.remove("valid-matrix");
      input.classList.remove("invalid");

      if (!util.isNumber(val)) {
        input.value = "";
        return false;
      }

      if (this.config.validate_on_insert) {
        isValid = this.validateNumber(val, row, col, this.matrix.row[row][col]);

        input.classList.toggle("invalid", !isValid);
      }

      sectRow = Math.floor(row / 3);
      sectCol = Math.floor(col / 3);
      secIndex = (row % 3) * 3 + (col % 3);

      this.matrix.row[row][col] = val;
      this.matrix.col[col][row] = val;
      this.matrix.sect[sectRow][sectCol][secIndex] = val;
    },

    onMouseDown: function (e) {
      var t = e.target;

      if (t.nodeName === "INPUT" && t.classList.contains("disabled")) {
        e.preventDefault();
      }
    },

    /**
     * Reset the board and the game parameters
     */
    resetGame: function () {
      this.resetValidationMatrices();
      for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
          this.cellMatrix[row][col].value = "";
        }
      }

      var inputs = this.table.getElementsByTagName("input");

      util.each(inputs, function (i, input) {
        input.classList.remove("disabled");
        input.tabIndex = 1;
      });

      this.table.classList.remove("valid-matrix");
    },

    /**
     * Reset and rebuild the validation matrices
     */
    resetValidationMatrices: function () {
      this.matrix = {
        row: {},
        col: {},
        sect: {},
      };
      this.validation = {
        row: {},
        col: {},
        sect: {},
      };

      for (var i = 0; i < 9; i++) {
        this.matrix.row[i] = ["", "", "", "", "", "", "", "", ""];
        this.matrix.col[i] = ["", "", "", "", "", "", "", "", ""];
        this.validation.row[i] = [];
        this.validation.col[i] = [];
      }

      for (var row = 0; row < 3; row++) {
        this.matrix.sect[row] = [];
        this.validation.sect[row] = {};
        for (var col = 0; col < 3; col++) {
          this.matrix.sect[row][col] = ["", "", "", "", "", "", "", "", ""];
          this.validation.sect[row][col] = [];
        }
      }
    },

    /**
     * Validate the current number that was inserted.
     *
     * @param {String} num The value that is inserted
     * @param {Number} rowID The row the number belongs to
     * @param {Number} colID The column the number belongs to
     * @param {String} oldNum The previous value
     * @returns {Boolean} Valid or invalid input
     */
    validateNumber: function (num, rowID, colID, oldNum) {
      var isValid = true,
        sectRow = Math.floor(rowID / 3),
        sectCol = Math.floor(colID / 3),
        row = this.validation.row[rowID],
        col = this.validation.col[colID],
        sect = this.validation.sect[sectRow][sectCol];

      oldNum = oldNum || "";

      if (util.includes(row, oldNum)) {
        row.splice(row.indexOf(oldNum), 1);
      }
      if (util.includes(col, oldNum)) {
        col.splice(col.indexOf(oldNum), 1);
      }
      if (util.includes(sect, oldNum)) {
        sect.splice(sect.indexOf(oldNum), 1);
      }

      if (num !== "") {
        if (Number(num) > 0 && Number(num) <= 9) {
          if (
            util.includes(row, num) ||
            util.includes(col, num) ||
            util.includes(sect, num)
          ) {
            isValid = false;
          } else {
            isValid = true;
          }
        }

        row.push(num);
        col.push(num);
        sect.push(num);
      }

      return isValid;
    },

    /**
     * Validate the entire matrix
     * @returns {Boolean} Valid or invalid matrix
     */
    validateMatrix: function () {
      var isValid,
        val,
        $element,
        hasError = false;

      for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
          val = this.matrix.row[row][col];

          isValid = this.validateNumber(val, row, col, val);
          this.cellMatrix[row][col].classList.toggle("invalid", !isValid);
          if (!isValid) {
            hasError = true;
          }
        }
      }
      return !hasError;
    },

    /**
     * A recursive 'backtrack' solver for the
     * game. Algorithm is based on the StackOverflow answer
     * http:
     */
    solveGame: function (row, col, string) {
      var cval,
        sqRow,
        sqCol,
        nextSquare,
        legalValues,
        sectRow,
        sectCol,
        secIndex,
        gameResult;

      nextSquare = this.findClosestEmptySquare(row, col);
      if (!nextSquare) {
        return true;
      } else {
        sqRow = nextSquare.row;
        sqCol = nextSquare.col;
        legalValues = this.findLegalValuesForSquare(sqRow, sqCol);

        sectRow = Math.floor(sqRow / 3);
        sectCol = Math.floor(sqCol / 3);
        secIndex = (sqRow % 3) * 3 + (sqCol % 3);

        for (var i = 0; i < legalValues.length; i++) {
          cval = legalValues[i];

          nextSquare.value = string ? "" : cval;

          this.matrix.row[sqRow][sqCol] = cval;
          this.matrix.col[sqCol][sqRow] = cval;
          this.matrix.sect[sectRow][sectCol][secIndex] = cval;

          if (this.solveGame(sqRow, sqCol, string)) {
            return true;
          } else {
            this.cellMatrix[sqRow][sqCol].value = "";

            this.matrix.row[sqRow][sqCol] = "";
            this.matrix.col[sqCol][sqRow] = "";
            this.matrix.sect[sectRow][sectCol][secIndex] = "";
          }
        }

        return false;
      }
    },

    /**
     * Find closest empty square relative to the given cell.
     *
     * @param {Number} row Row id
     * @param {Number} col Column id
     * @returns {jQuery} Input element of the closest empty
     *  square
     */
    findClosestEmptySquare: function (row, col) {
      var walkingRow,
        walkingCol,
        found = false;
      for (var i = col + 9 * row; i < 81; i++) {
        walkingRow = Math.floor(i / 9);
        walkingCol = i % 9;
        if (this.matrix.row[walkingRow][walkingCol] === "") {
          found = true;
          return this.cellMatrix[walkingRow][walkingCol];
        }
      }
    },

    /**
     * Find the available legal numbers for the square in the
     * given row and column.
     *
     * @param {Number} row Row id
     * @param {Number} col Column id
     * @returns {Array} An array of available numbers
     */
    findLegalValuesForSquare: function (row, col) {
      var temp,
        legalVals,
        legalNums,
        val,
        i,
        sectRow = Math.floor(row / 3),
        sectCol = Math.floor(col / 3);

      legalNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

      for (i = 0; i < 9; i++) {
        val = Number(this.matrix.col[col][i]);
        if (val > 0) {
          if (util.includes(legalNums, val)) {
            legalNums.splice(legalNums.indexOf(val), 1);
          }
        }
      }

      for (i = 0; i < 9; i++) {
        val = Number(this.matrix.row[row][i]);
        if (val > 0) {
          if (util.includes(legalNums, val)) {
            legalNums.splice(legalNums.indexOf(val), 1);
          }
        }
      }

      sectRow = Math.floor(row / 3);
      sectCol = Math.floor(col / 3);
      for (i = 0; i < 9; i++) {
        val = Number(this.matrix.sect[sectRow][sectCol][i]);
        if (val > 0) {
          if (util.includes(legalNums, val)) {
            legalNums.splice(legalNums.indexOf(val), 1);
          }
        }
      }

      for (i = legalNums.length - 1; i > 0; i--) {
        var rand = getRandomInt(0, i);
        temp = legalNums[i];
        legalNums[i] = legalNums[rand];
        legalNums[rand] = temp;
      }

      return legalNums;
    },
  };

  /**
   * Get a random integer within a range
   *
   * @param {Number} min Minimum number
   * @param {Number} max Maximum range
   * @returns {Number} Random number within the range (Inclusive)
   */
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max + 1)) + min;
  }

  /**
   * Get a number of random array items
   *
   * @param {Array} array The array to pick from
   * @param {Number} count Number of items
   * @returns {Array} Array of items
   */
  function getUnique(array, count) {
    var tmp = array.slice(array);
    var ret = [];

    for (var i = 0; i < count; i++) {
      var index = Math.floor(Math.random() * tmp.length);
      var removed = tmp.splice(index, 1);

      ret.push(removed[0]);
    }
    return ret;
  }

  function triggerEvent(el, type) {
    if ("createEvent" in document) {
      var e = document.createEvent("HTMLEvents");
      e.initEvent(type, false, true);
      el.dispatchEvent(e);
    } else {
      var e = document.createEventObject();
      e.eventType = type;
      el.fireEvent("on" + e.eventType, e);
    }
  }

  var Sudoku = function (container, settings) {
    this.container = container;

    if (typeof container === "string") {
      this.container = document.querySelector(container);
    }

    this.game = new Game(util.extend(defaultConfig, settings));

    this.container.appendChild(this.getGameBoard());
  };

  Sudoku.prototype = {
    /**
     * Return a visual representation of the board
     * @returns {jQuery} Game table
     */
    getGameBoard: function () {
      return this.game.buildGUI();
    },

    newGame: function () {
      var that = this;
      this.reset();
      setTimeout(function () {
        that.start();
      }, 20);
    },
    close: function () {
      document.getElementById('controls1').style.display = 'block'
      document.getElementById('controls3').style.display = 'block'
      document.getElementById('controls2').style.display = 'none'
    },

    /**
     * Start a game.
     */
    start: function () {
      var arr = [],
        x = 0,
        values,
        rows = this.game.matrix.row,
        inputs = this.game.table.getElementsByTagName("input"),
        difficulties = speed;
        if(speed ==60){
          ratings = "Simple"
        }else if(speed == 50){
          ratings = "Easy"
        }
        else if(speed == 40){
          ratings = "Medium"
        }
        else if(speed == 30){
          ratings = "Hard"
        }
        document.getElementById('ratings').innerHTML = `( Rating : ${ratings} )`
      this.game.solveGame(0, 0);
       
      util.each(rows, function (i, row) {
        util.each(row, function (r, val) {
          arr.push({
            index: x,
            value: val,
          });
          x++;
        });
      });
      values = getUnique(arr, difficulties);

      this.reset();

      util.each(values, function (i, data) {
        var input = inputs[data.index];
        input.value = data.value;
        input.classList.add("disabled");
        input.tabIndex = -1;
        triggerEvent(input, "keyup");
      });
    },

    /**
     * Reset the game board.
     */
    reset: function () {
      this.game.resetGame();
    },
    difficulty: function () {
      document.getElementById('difficultymessagebox').style.display= "block"
      document.getElementById('difficultymessagebox').innerHTML ="<p class='valid'>Rating for remaining unfilled cells: " + ratings +'</p>'
    },

    /**
     * Call for a validation of the game board.
     * @returns {Boolean} Whether the board is valid
     */
    validate: function () {
      var isValid;

      isValid = this.game.validateMatrix();
      this.game.table.classList.toggle("valid-matrix", isValid);
    },
    new_game: function () {
      document.getElementById('controls1').style.display = 'none'
      document.getElementById('controls3').style.display = 'none'
      document.getElementById('controls2').style.display = 'flex'
    },

    /**
     * Call for the solver routine to solve the current
     * board.
     */
    check: function(){
      document.getElementById('messagebox').style.display = 'block'
      if (this.game.validateMatrix()) {
        document.getElementById('messagebox').innerHTML= "<p class='valid'>This puzzle is valid and unique solution.</p>"
      }else{
        document.getElementById('messagebox').innerHTML= "<p class='invalid1'>This puzzle is invalid.</p>"
      }
    },
    solve: function () {
      var isValid;

      // if (!this.game.validateMatrix()) {
      //   return false;
      // }

      isValid = this.game.solveGame(0, 0);

      this.game.table.classList.toggle("valid-matrix", isValid);

      if (isValid) {
        var inputs = this.game.table.getElementsByTagName("input");

        util.each(inputs, function (i, input) {
          input.classList.add("disabled");
          input.tabIndex = -1;
        });
      }
    },
    printDiv: function(){
      let tab = document.querySelector('.sudoku-container');
      let win = window.open('', '', 'height=700,width=700');
      win.document.write(tab.outerHTML);
      win.document.close();
      win.print();
    }
    // solve_selected: function () {
    //   var isValid;
    //   if (document.getElementsByClassName('mystyle').length === 0) {
    //     document.querySelector('.tooltiptext').style.opacity = '1'
    //     document.querySelector('.tooltiptext').style.visibility = 'visible'
    //   }else{
    //     let cell = document.getElementsByClassName('mystyle')[0];
    //     console.log(cell)
    //     isValid = this.game.solveGame(cell.row, cell.col,"");
    //     this.game.table.classList.toggle("valid-matrix", isValid);
    //     cell.classList.add("disabled");
    //     cell.tabIndex = -1;
    //   }
    // },
  };

  global.Sudoku = Sudoku;
})(this);

var game = new Sudoku(".box-container");

game.start();

const container = document.querySelector(".sudoku-container");
const inputs = Array.from(document.querySelectorAll("input"));
container.addEventListener(
  "click",
  (e) => {
    const el = e.target.closest("input");

    if (el) {
      inputs.forEach((input) => {
        input.classList.toggle(
          "highlight",
          input.value && input.value === el.value
        );
      });
    }
  },
  false
);

document.getElementById("controls").addEventListener("click", function (e) {
  var t = e.target;
  if (t.nodeName.toLowerCase() === "button") {
    game[t.dataset.action]();
  }
});
 for (let i = 0; i < inputs.length; i++) {
 inputs[i].addEventListener('click',(e)=>{
  for (let e = 0; e < inputs.length; e++) {
    inputs[e].classList.remove("mystyle")
  }
  e.target.classList.add("mystyle");
 })
 }