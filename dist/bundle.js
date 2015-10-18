/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	__webpack_require__(17);

	var domready = __webpack_require__(1);
	var append = __webpack_require__(2);
	var newElement = __webpack_require__(5);
	var please = __webpack_require__(8);
	var md5 = __webpack_require__(9);

	var styles = __webpack_require__(13);

	function hexToRgb(hex) {
	  var r = parseInt(hex.substring(1, 3), 16);
	  var g = parseInt(hex.substring(3, 5), 16);
	  var b = parseInt(hex.substring(5, 7), 16);

	  return { r: r, g: g, b: b };
	}

	function hexToRgba(hex, alpha) {
	  var _hexToRgb = hexToRgb(hex);

	  var r = _hexToRgb.r;
	  var g = _hexToRgb.g;
	  var b = _hexToRgb.b;

	  return { r: r, g: g, b: b, a: alpha };
	}

	function hexToRgbaString(hex, alpha) {
	  var _hexToRgba = hexToRgba(hex, alpha);

	  var r = _hexToRgba.r;
	  var g = _hexToRgba.g;
	  var b = _hexToRgba.b;
	  var a = _hexToRgba.a;

	  return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
	}

	function generateColor() {
	  var seed = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

	  var color = please.make_color({ seed: seed })[0];
	  return color;
	}

	var Config = function Config() {
	  _classCallCheck(this, Config);

	  this.cellWidth = 70;
	  this.cellHeight = this.cellWidth;
	  this.rows = 5;
	  this.cols = this.rows;
	  this.padding = this.cellWidth / 2;
	  this.width = this.cols * this.cellWidth + 2 * this.padding;
	  this.height = this.rows * this.cellHeight + 2 * this.padding;
	  this.backgroundColor = '#f0f0f0';
	  this.defaultColor = '#1e90ff';
	  this.color = this.defaultColor;
	  this.highlightAlpha = 0.2;
	  this.highlightColor = hexToRgbaString(this.color, this.highlightAlpha);
	  this.mirror = true;
	};

	var Cell = function Cell(x, y, isActive) {
	  _classCallCheck(this, Cell);

	  this.x = x;
	  this.y = y;
	  this.isActive = isActive;
	};

	var App = (function () {
	  function App(config, parentSelector) {
	    _classCallCheck(this, App);

	    this.config = config;
	    this.parentSelector = parentSelector;
	    this.canvas = null;
	    this.ctx = null;
	    this.previousCell = null;
	    this.cells = new Map();
	    for (var i = 0; i < this.config.rows * this.config.cols; i++) {
	      var x = i % this.config.cols * this.config.cellWidth + this.config.padding;
	      var y = Math.floor(i / this.config.rows) * this.config.cellWidth + this.config.padding;
	      this.cells.set(i, new Cell(x, y, false));
	    }
	  }

	  _createClass(App, [{
	    key: 'drawRect',
	    value: function drawRect(x, y, width, height, color) {
	      this.ctx.fillStyle = color;
	      this.ctx.fillRect(x, y, width, height);
	    }
	  }, {
	    key: 'isPadding',
	    value: function isPadding(x, y) {
	      if (x < this.config.padding || y < this.config.padding) {
	        return true;
	      }
	      if (x > this.config.width - this.config.padding - 1 || y > this.config.height - this.config.padding - 1) {
	        return true;
	      }
	      return false;
	    }
	  }, {
	    key: 'getCellByCoords',
	    value: function getCellByCoords(x, y) {
	      if (this.isPadding(x, y)) {
	        return null;
	      }
	      var row = Math.floor((y - this.config.padding) / this.config.cellHeight);
	      var col = Math.floor((x - this.config.padding) / this.config.cellWidth);
	      var id = row * this.config.cols + col;
	      return this.cells.get(id);
	    }
	  }, {
	    key: 'getMirrorCell',
	    value: function getMirrorCell(cell) {
	      var row = Math.floor((cell.y - this.config.padding) / this.config.cellHeight);
	      var col = Math.floor((cell.x - this.config.padding) / this.config.cellWidth);
	      var mirrorAxis = Math.floor(this.config.cols / 2);
	      var mirrorCol = undefined;
	      // mirror axis:
	      if (this.config.cols % 2 === 1 && col === mirrorAxis) {
	        return null;
	      }
	      if (this.config.cols % 2 === 1) {
	        var distance = col - mirrorAxis;
	        mirrorCol = mirrorAxis - distance;
	      } else {
	        // TODO
	      }
	      return this.cells.get(row * this.config.cols + mirrorCol);
	    }
	  }, {
	    key: 'removeHighlight',
	    value: function removeHighlight(cell) {
	      this.drawRect(cell.x, cell.y, this.config.cellWidth, this.config.cellHeight, cell.isActive ? this.config.color : this.config.backgroundColor);
	    }
	  }, {
	    key: 'exportToPng',
	    value: function exportToPng() {
	      var dataUri = this.canvas.toDataURL();
	      var win = window.open(dataUri, '_blank');
	      win.focus();
	    }
	  }, {
	    key: 'resetCanvas',
	    value: function resetCanvas() {
	      this.drawRect(0, 0, this.config.width, this.config.height, this.config.backgroundColor);
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = this.cells.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var cell = _step.value;

	          cell.isActive = false;
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator['return']) {
	            _iterator['return']();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'randomBits',
	    value: function randomBits(n) {
	      var bits = [];
	      for (var i = 0; i < n; i++) {
	        bits.push(Math.random() < 0.5);
	      }
	      return bits;
	    }
	  }, {
	    key: 'drawByBits',
	    value: function drawByBits(bits) {
	      for (var i = 0; i <= this.cells.size; i++) {
	        var cell = this.cells.get(i);
	        var col = i % this.config.cols;
	        var mirrorAxis = Math.floor(this.config.cols / 2);
	        if (col <= mirrorAxis) {
	          var bit = bits.shift();
	          if (bit) {
	            cell.isActive = true;
	            this.drawRect(cell.x, cell.y, this.config.cellWidth, this.config.cellHeight, this.config.color);
	            var mirrorCell = this.getMirrorCell(cell);
	            if (mirrorCell) {
	              mirrorCell.isActive = true;
	              this.drawRect(mirrorCell.x, mirrorCell.y, this.config.cellWidth, this.config.cellHeight, this.config.color);
	            }
	          }
	        }
	      }
	    }
	  }, {
	    key: 'randomPattern',
	    value: function randomPattern() {
	      this.resetCanvas();
	      // TODO don't hard code number of bits
	      var bits = this.randomBits(15);
	      this.drawByBits(bits);
	    }

	    // TODO more generic method for grids other than mirrored 5 x 5
	  }, {
	    key: 'digest',
	    value: function digest(string) {
	      this.resetCanvas();
	      var hash = md5(string);
	      // use first two chars of hash as offset into cells
	      var offset = parseInt(hash.substring(0, 2), 16) % 15;
	      // use entire hash as seed for color
	      this.config.color = generateColor(hash);
	      this.config.highlightColor = hexToRgbaString(this.config.color, this.config.highlightAlpha);
	      var inputContainer = document.querySelector('.js-input-container');
	      var input = document.querySelector('.js-color-input');
	      inputContainer.style.backgroundColor = this.config.color;
	      input.value = this.config.color;
	      var bits = [];
	      // use char pairs 3-32 to set cells on/off
	      for (var i = 2; i < 32; i += 2) {
	        var substring = hash.substring(i, i + 2);
	        bits.push(parseInt(substring, 16) % 2 === 0);
	      }
	      // reorder bits based on offset
	      bits = [].concat(_toConsumableArray(bits.slice(bits.length - offset, bits.length)), _toConsumableArray(bits.slice(0, bits.length - offset)));
	      this.drawByBits(bits);
	    }
	  }, {
	    key: 'getRelativeCoords',
	    value: function getRelativeCoords(x, y) {
	      // recompute position of canvas everytime as it might have shifted
	      // due to viewport resizing
	      var canvasClientRect = this.canvas.getBoundingClientRect();
	      var relX = x - canvasClientRect.left;
	      var relY = y - canvasClientRect.top;
	      return [relX, relY];
	    }
	  }, {
	    key: 'run',
	    value: function run() {
	      var _this = this;

	      var inputContainer = document.querySelector('.js-input-container');
	      var input = document.querySelector('.js-color-input');

	      inputContainer.style.backgroundColor = this.config.color;
	      input.value = this.config.color;

	      this.canvas = newElement('<canvas width="{w}" height={h}></canvas>', {
	        w: this.config.width,
	        h: this.config.height
	      });

	      append(document.querySelector(this.parentSelector), this.canvas);
	      this.ctx = this.canvas.getContext('2d');
	      this.resetCanvas();

	      this.canvas.addEventListener('mouseup', function (e) {
	        var _getRelativeCoords = _this.getRelativeCoords(e.clientX, e.clientY);

	        var _getRelativeCoords2 = _slicedToArray(_getRelativeCoords, 2);

	        var x = _getRelativeCoords2[0];
	        var y = _getRelativeCoords2[1];

	        var cell = _this.getCellByCoords(x, y);
	        if (cell === null) {
	          return;
	        }
	        _this.drawRect(cell.x, cell.y, _this.config.cellWidth, _this.config.cellHeight, cell.isActive ? _this.config.backgroundColor : _this.config.color);
	        cell.isActive = !cell.isActive;
	        var mirrorCell = _this.getMirrorCell(cell);
	        if (mirrorCell !== null) {
	          _this.drawRect(mirrorCell.x, mirrorCell.y, _this.config.cellWidth, _this.config.cellHeight, mirrorCell.isActive ? _this.config.backgroundColor : _this.config.color);
	          mirrorCell.isActive = !mirrorCell.isActive;
	        }
	      });

	      this.canvas.addEventListener('mousemove', function (e) {
	        var _getRelativeCoords3 = _this.getRelativeCoords(e.clientX, e.clientY);

	        var _getRelativeCoords32 = _slicedToArray(_getRelativeCoords3, 2);

	        var x = _getRelativeCoords32[0];
	        var y = _getRelativeCoords32[1];

	        var cell = _this.getCellByCoords(x, y);
	        if (cell === null || cell === _this.previousCell) {
	          return;
	        }
	        // remove highlight from cell we just exited
	        if (_this.previousCell !== null) {
	          _this.removeHighlight(_this.previousCell);
	          if (_this.config.mirror) {
	            var previousMirrorCell = _this.getMirrorCell(_this.previousCell);
	            if (previousMirrorCell !== null) {
	              _this.removeHighlight(previousMirrorCell);
	            }
	          }
	        }

	        _this.previousCell = cell;
	        _this.drawRect(cell.x, cell.y, _this.config.cellWidth, _this.config.cellHeight, _this.config.backgroundColor);
	        _this.drawRect(cell.x, cell.y, _this.config.cellWidth, _this.config.cellHeight, _this.config.highlightColor);
	        if (_this.config.mirror) {
	          var mirrorCell = _this.getMirrorCell(cell);
	          if (mirrorCell !== null) {
	            _this.drawRect(mirrorCell.x, mirrorCell.y, _this.config.cellWidth, _this.config.cellHeight, _this.config.backgroundColor);
	            _this.drawRect(mirrorCell.x, mirrorCell.y, _this.config.cellWidth, _this.config.cellHeight, _this.config.highlightColor);
	          }
	        }
	      });

	      this.canvas.addEventListener('mouseleave', function (e) {
	        if (_this.previousCell !== null) {
	          _this.removeHighlight(_this.previousCell);
	          var mirrorPreviousCell = _this.getMirrorCell(_this.previousCell);
	          if (mirrorPreviousCell !== null) {
	            _this.removeHighlight(mirrorPreviousCell);
	          }
	        }
	        _this.previousCell = null;
	      });

	      document.querySelector('.js-export').addEventListener('click', function (e) {
	        _this.exportToPng();
	      });

	      document.querySelector('.js-random-pattern').addEventListener('click', function (e) {
	        document.querySelector('.js-digest-input').value = '';
	        _this.randomPattern();
	      });

	      document.querySelector('.js-random').addEventListener('click', function (e) {
	        var inputContainer = document.querySelector('.js-input-container');
	        var input = document.querySelector('.js-color-input');

	        _this.config.color = generateColor();
	        _this.config.highlightColor = hexToRgbaString(_this.config.color, _this.config.highlightAlpha);
	        inputContainer.style.backgroundColor = _this.config.color;
	        input.value = _this.config.color;
	        _this.randomPattern();
	      });

	      document.querySelector('.js-random-color').addEventListener('click', function (e) {
	        var color = generateColor();
	        _this.config.color = color;
	        _this.config.highlightColor = hexToRgbaString(_this.config.color, _this.config.highlightAlpha);
	        var inputContainer = document.querySelector('.js-input-container');
	        var input = document.querySelector('.js-color-input');
	        inputContainer.style.backgroundColor = _this.config.color;
	        input.value = _this.config.color;
	        var _iteratorNormalCompletion2 = true;
	        var _didIteratorError2 = false;
	        var _iteratorError2 = undefined;

	        try {
	          for (var _iterator2 = _this.cells.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	            var cell = _step2.value;

	            if (cell.isActive) {
	              _this.drawRect(cell.x, cell.y, _this.config.cellWidth, _this.config.cellHeight, _this.config.color);
	            }
	          }
	        } catch (err) {
	          _didIteratorError2 = true;
	          _iteratorError2 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion2 && _iterator2['return']) {
	              _iterator2['return']();
	            }
	          } finally {
	            if (_didIteratorError2) {
	              throw _iteratorError2;
	            }
	          }
	        }
	      });

	      document.querySelector('.js-reset').addEventListener('click', function (e) {
	        document.querySelector('.js-digest-input').value = '';
	        _this.config.color = _this.config.defaultColor;
	        _this.config.highlightColor = hexToRgbaString(_this.config.color, _this.config.highlightAlpha);
	        var inputContainer = document.querySelector('.js-input-container');
	        var input = document.querySelector('.js-color-input');
	        inputContainer.style.backgroundColor = _this.config.color;
	        input.value = _this.config.color;
	        _this.resetCanvas();
	      });

	      document.querySelector('.js-digest').addEventListener('click', function (e) {
	        var input = document.querySelector('.js-digest-input').value.trim();
	        if (input) {
	          _this.digest(input);
	        }
	      });

	      document.querySelector('.js-digest-input').addEventListener('keypress', function (e) {
	        if (e.keyCode === 13) {
	          var _input = document.querySelector('.js-digest-input').value.trim();
	          if (_input) {
	            _this.digest(_input);
	          }
	        }
	      });

	      document.querySelector('.js-color-input').addEventListener('change', function (e) {
	        var newColor = e.target.value;
	        var inputContainer = document.querySelector('.js-input-container');

	        inputContainer.style.backgroundColor = newColor;
	        _this.config.color = newColor;
	        _this.config.highlightColor = hexToRgbaString(_this.config.color, _this.config.highlightAlpha);

	        var _iteratorNormalCompletion3 = true;
	        var _didIteratorError3 = false;
	        var _iteratorError3 = undefined;

	        try {
	          for (var _iterator3 = _this.cells.values()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	            var cell = _step3.value;

	            if (cell.isActive) {
	              _this.drawRect(cell.x, cell.y, _this.config.cellWidth, _this.config.cellHeight, _this.config.color);
	            }
	          }
	        } catch (err) {
	          _didIteratorError3 = true;
	          _iteratorError3 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion3 && _iterator3['return']) {
	              _iterator3['return']();
	            }
	          } finally {
	            if (_didIteratorError3) {
	              throw _iteratorError3;
	            }
	          }
	        }
	      });
	      //console.log(this);
	    }
	  }]);

	  return App;
	})();

	var config = new Config();
	var app = new App(config, '.canvas-container');

	domready(function () {
	  app.run();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	  * domready (c) Dustin Diaz 2014 - License MIT
	  */
	!function (name, definition) {

	  if (true) module.exports = definition()
	  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
	  else this[name] = definition()

	}('domready', function () {

	  var fns = [], listener
	    , doc = document
	    , hack = doc.documentElement.doScroll
	    , domContentLoaded = 'DOMContentLoaded'
	    , loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState)


	  if (!loaded)
	  doc.addEventListener(domContentLoaded, listener = function () {
	    doc.removeEventListener(domContentLoaded, listener)
	    loaded = 1
	    while (listener = fns.shift()) listener()
	  })

	  return function (fn) {
	    loaded ? setTimeout(fn, 0) : fns.push(fn)
	  }

	});


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var toArray = __webpack_require__(3)

	    , mutation = __webpack_require__(4)

	module.exports = append

	function append(parent, first) {
	    var node = mutation(toArray(arguments, 1))
	    parent.appendChild(node)
	    return first
	}


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = toArray

	function toArray(list, index) {
	    var array = []

	    index = index || 0

	    for (var i = index || 0; i < list.length; i++) {
	        array[i - index] = list[i]
	    }

	    return array
	}


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = mutation

	function mutation(list) {
	    list = list.map(replaceStringWithTextNode)

	    if (list.length === 1) {
	        return list[0]
	    }

	    var frag = document.createDocumentFragment()
	    list.forEach(appendToFragment, frag)
	    return frag
	}

	function replaceStringWithTextNode(string) {
	    if (typeof string === "string") {
	        return document.createTextNode(string)
	    } else if (string && string.view && string.view.nodeType) {
	        return string.view
	    }

	    return string
	}

	function appendToFragment(elem) {
	    this.appendChild(elem)
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var domify = __webpack_require__(6);
	var format = __webpack_require__(7);

	module.exports = newElement;

	function newElement (html, vars) {
	  if (arguments.length == 1) return domify(html);
	  return domify(format(html, vars));
	}


/***/ },
/* 6 */
/***/ function(module, exports) {

	
	/**
	 * Expose `parse`.
	 */

	module.exports = parse;

	/**
	 * Wrap map from jquery.
	 */

	var map = {
	  option: [1, '<select multiple="multiple">', '</select>'],
	  optgroup: [1, '<select multiple="multiple">', '</select>'],
	  legend: [1, '<fieldset>', '</fieldset>'],
	  thead: [1, '<table>', '</table>'],
	  tbody: [1, '<table>', '</table>'],
	  tfoot: [1, '<table>', '</table>'],
	  colgroup: [1, '<table>', '</table>'],
	  caption: [1, '<table>', '</table>'],
	  tr: [2, '<table><tbody>', '</tbody></table>'],
	  td: [3, '<table><tbody><tr>', '</tr></tbody></table>'],
	  th: [3, '<table><tbody><tr>', '</tr></tbody></table>'],
	  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
	  _default: [0, '', '']
	};

	/**
	 * Parse `html` and return the children.
	 *
	 * @param {String} html
	 * @return {Array}
	 * @api private
	 */

	function parse(html) {
	  if ('string' != typeof html) throw new TypeError('String expected');

	  // tag name
	  var m = /<([\w:]+)/.exec(html);
	  if (!m) throw new Error('No elements were generated.');
	  var tag = m[1];

	  // body support
	  if (tag == 'body') {
	    var el = document.createElement('html');
	    el.innerHTML = html;
	    return el.removeChild(el.lastChild);
	  }

	  // wrap map
	  var wrap = map[tag] || map._default;
	  var depth = wrap[0];
	  var prefix = wrap[1];
	  var suffix = wrap[2];
	  var el = document.createElement('div');
	  el.innerHTML = prefix + html + suffix;
	  while (depth--) el = el.lastChild;

	  var els = el.children;
	  if (1 == els.length) {
	    return el.removeChild(els[0]);
	  }

	  var fragment = document.createDocumentFragment();
	  while (els.length) {
	    fragment.appendChild(el.removeChild(els[0]));
	  }

	  return fragment;
	}


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = format;

	function format(text) {
	  var context;

	  if (typeof arguments[1] == 'object' && arguments[1]) {
	    context = arguments[1];
	  } else {
	    context = Array.prototype.slice.call(arguments, 1);
	  }

	  return String(text).replace(/\{?\{([^{}]+)}}?/g, replace(context));
	};

	function replace (context, nil){
	  return function (tag, name) {
	    if (tag.substring(0, 2) == '{{' && tag.substring(tag.length - 2) == '}}') {
	      return '{' + name + '}';
	    }

	    if (!context.hasOwnProperty(name)) {
	      return tag;
	    }

	    if (typeof context[name] == 'function') {
	      return context[name]();
	    }

	    return context[name];
	  }
	}


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!Please JS v0.4.2, Jordan Checkman 2014, Checkman.io, MIT License, Have fun.*/
	!function(e,r,a){ true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (a), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"object"==typeof exports?module.exports=a():r[e]=a()}("Please",this,function(){"use strict";function e(){function e(e,r,a){var o=Math.random;return a instanceof l&&(o=a.random),Math.floor(o()*(r-e+1))+e}function r(e,r,a){var o=Math.random;return a instanceof l&&(o=a.random),o()*(r-e)+e}function a(e,r,a){return Math.max(r,Math.min(e,a))}function o(e,r){var a;switch(e){case"hex":for(a=0;a<r.length;a++)r[a]=F.HSV_to_HEX(r[a]);break;case"rgb":for(a=0;a<r.length;a++)r[a]=F.HSV_to_RGB(r[a]);break;case"rgb-string":for(a=0;a<r.length;a++){var o=F.HSV_to_RGB(r[a]);r[a]="rgb("+o.r+","+o.g+","+o.b+")"}break;case"hsv":break;default:console.error("Format not recognized.")}return r}function n(e){var r=F.HSV_to_RGB(e),a=(299*r.r+587*r.g+114*r.b)/1e3;return a>=128?"dark":"light"}function t(e){var r={};for(var a in e)e.hasOwnProperty(a)&&(r[a]=e[a]);return r}function l(e){function r(){o=(o+1)%256,n=(n+a[o])%256;var e=a[o];return a[o]=a[n],a[n]=e,a[(a[o]+a[n])%256]}for(var a=[],o=0,n=0,t=0;256>t;t++)a[t]=t;for(var l=0,F=0;256>l;l++){F=(F+a[l]+e.charCodeAt(l%e.length))%256;var s=a[l];a[l]=a[F],a[F]=s}this.random=function(){for(var e=0,a=0,o=1;8>e;e++)a+=r()*o,o*=256;return a/0x10000000000000000}}var F={},s={aliceblue:"F0F8FF",antiquewhite:"FAEBD7",aqua:"00FFFF",aquamarine:"7FFFD4",azure:"F0FFFF",beige:"F5F5DC",bisque:"FFE4C4",black:"000000",blanchedalmond:"FFEBCD",blue:"0000FF",blueviolet:"8A2BE2",brown:"A52A2A",burlywood:"DEB887",cadetblue:"5F9EA0",chartreuse:"7FFF00",chocolate:"D2691E",coral:"FF7F50",cornflowerblue:"6495ED",cornsilk:"FFF8DC",crimson:"DC143C",cyan:"00FFFF",darkblue:"00008B",darkcyan:"008B8B",darkgoldenrod:"B8860B",darkgray:"A9A9A9",darkgrey:"A9A9A9",darkgreen:"006400",darkkhaki:"BDB76B",darkmagenta:"8B008B",darkolivegreen:"556B2F",darkorange:"FF8C00",darkorchid:"9932CC",darkred:"8B0000",darksalmon:"E9967A",darkseagreen:"8FBC8F",darkslateblue:"483D8B",darkslategray:"2F4F4F",darkslategrey:"2F4F4F",darkturquoise:"00CED1",darkviolet:"9400D3",deeppink:"FF1493",deepskyblue:"00BFFF",dimgray:"696969",dimgrey:"696969",dodgerblue:"1E90FF",firebrick:"B22222",floralwhite:"FFFAF0",forestgreen:"228B22",fuchsia:"FF00FF",gainsboro:"DCDCDC",ghostwhite:"F8F8FF",gold:"FFD700",goldenrod:"DAA520",gray:"808080",grey:"808080",green:"008000",greenyellow:"ADFF2F",honeydew:"F0FFF0",hotpink:"FF69B4",indianred:"CD5C5C",indigo:"4B0082",ivory:"FFFFF0",khaki:"F0E68C",lavender:"E6E6FA",lavenderblush:"FFF0F5",lawngreen:"7CFC00",lemonchiffon:"FFFACD",lightblue:"ADD8E6",lightcoral:"F08080",lightcyan:"E0FFFF",lightgoldenrodyellow:"FAFAD2",lightgray:"D3D3D3",lightgrey:"D3D3D3",lightgreen:"90EE90",lightpink:"FFB6C1",lightsalmon:"FFA07A",lightseagreen:"20B2AA",lightskyblue:"87CEFA",lightslategray:"778899",lightslategrey:"778899",lightsteelblue:"B0C4DE",lightyellow:"FFFFE0",lime:"00FF00",limegreen:"32CD32",linen:"FAF0E6",magenta:"FF00FF",maroon:"800000",mediumaquamarine:"66CDAA",mediumblue:"0000CD",mediumorchid:"BA55D3",mediumpurple:"9370D8",mediumseagreen:"3CB371",mediumslateblue:"7B68EE",mediumspringgreen:"00FA9A",mediumturquoise:"48D1CC",mediumvioletred:"C71585",midnightblue:"191970",mintcream:"F5FFFA",mistyrose:"FFE4E1",moccasin:"FFE4B5",navajowhite:"FFDEAD",navy:"000080",oldlace:"FDF5E6",olive:"808000",olivedrab:"6B8E23",orange:"FFA500",orangered:"FF4500",orchid:"DA70D6",palegoldenrod:"EEE8AA",palegreen:"98FB98",paleturquoise:"AFEEEE",palevioletred:"D87093",papayawhip:"FFEFD5",peachpuff:"FFDAB9",peru:"CD853F",pink:"FFC0CB",plum:"DDA0DD",powderblue:"B0E0E6",purple:"800080",rebeccapurple:"663399",red:"FF0000",rosybrown:"BC8F8F",royalblue:"4169E1",saddlebrown:"8B4513",salmon:"FA8072",sandybrown:"F4A460",seagreen:"2E8B57",seashell:"FFF5EE",sienna:"A0522D",silver:"C0C0C0",skyblue:"87CEEB",slateblue:"6A5ACD",slategray:"708090",slategrey:"708090",snow:"FFFAFA",springgreen:"00FF7F",steelblue:"4682B4",tan:"D2B48C",teal:"008080",thistle:"D8BFD8",tomato:"FF6347",turquoise:"40E0D0",violet:"EE82EE",wheat:"F5DEB3",white:"FFFFFF",whitesmoke:"F5F5F5",yellow:"FFFF00",yellowgreen:"9ACD32"},i=.618033988749895,u={hue:null,saturation:null,value:null,base_color:"",greyscale:!1,grayscale:!1,golden:!0,full_random:!1,colors_returned:1,format:"hex",seed:null},c={scheme_type:"analogous",format:"hex"},h={golden:!1,format:"hex"};return F.NAME_to_HEX=function(e){return e=e.toLowerCase(),e in s?s[e]:(console.error("Color name not recognized."),void 0)},F.NAME_to_RGB=function(e){return F.HEX_to_RGB(F.NAME_to_HEX(e))},F.NAME_to_HSV=function(e){return F.HEX_to_HSV(F.NAME_to_HEX(e))},F.HEX_to_RGB=function(e){var r=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;e=e.replace(r,function(e,r,a,o){return r+r+a+a+o+o});var a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return a?{r:parseInt(a[1],16),g:parseInt(a[2],16),b:parseInt(a[3],16)}:null},F.RGB_to_HEX=function(e){return"#"+((1<<24)+(e.r<<16)+(e.g<<8)+e.b).toString(16).slice(1)},F.HSV_to_RGB=function(e){var r,a,o,n,t,l,F,s,i=e.h,u=e.s,c=e.v;if(0===u)return{r:c,g:c,b:c};switch(i/=60,n=Math.floor(i),t=i-n,l=c*(1-u),F=c*(1-u*t),s=c*(1-u*(1-t)),n){case 0:r=c,a=s,o=l;break;case 1:r=F,a=c,o=l;break;case 2:r=l,a=c,o=s;break;case 3:r=l,a=F,o=c;break;case 4:r=s,a=l,o=c;break;case 5:r=c,a=l,o=F}return{r:Math.floor(255*r),g:Math.floor(255*a),b:Math.floor(255*o)}},F.RGB_to_HSV=function(e){var r=e.r/255,a=e.g/255,o=e.b/255,n=0,t=0,l=0,F=Math.min(r,Math.min(a,o)),s=Math.max(r,Math.max(a,o));if(F===s)return l=F,{h:0,s:0,v:l};var i=r===F?a-o:o===F?r-a:o-r,u=r===F?3:o===F?1:5;return n=60*(u-i/(s-F)),t=(s-F)/s,l=s,{h:n,s:t,v:l}},F.HSV_to_HEX=function(e){return F.RGB_to_HEX(F.HSV_to_RGB(e))},F.HEX_to_HSV=function(e){return F.RGB_to_HSV(F.HEX_to_RGB(e))},F.make_scheme=function(e,r){function n(e){return{h:e.h,s:e.s,v:e.v}}var l,F,s,i,u,h=t(c);if(null!==r)for(var d in r)r.hasOwnProperty(d)&&(h[d]=r[d]);var g=[e];switch(h.scheme_type.toLowerCase()){case"monochromatic":case"mono":for(u=1;2>=u;u++)l=n(e),s=l.s+.1*u,s=a(s,0,1),i=l.v+.1*u,i=a(i,0,1),l.s=s,l.v=i,g.push(l);for(u=1;2>=u;u++)l=n(e),s=l.s-.1*u,s=a(s,0,1),i=l.v-.1*u,i=a(i,0,1),l.s=s,l.v=i,g.push(l);break;case"complementary":case"complement":case"comp":l=n(e),l.h=(l.h+180)%360,g.push(l);break;case"split-complementary":case"split-complement":case"split":l=n(e),l.h=(l.h+165)%360,g.push(l),l=n(e),l.h=Math.abs((l.h-165)%360),g.push(l);break;case"double-complementary":case"double-complement":case"double":l=n(e),l.h=(l.h+180)%360,g.push(l),l.h=(l.h+30)%360,F=n(l),g.push(l),l.h=(l.h+180)%360,g.push(F);break;case"analogous":case"ana":for(u=1;5>=u;u++)l=n(e),l.h=(l.h+20*u)%360,g.push(l);break;case"triadic":case"triad":case"tri":for(u=1;3>u;u++)l=n(e),l.h=(l.h+120*u)%360,g.push(l);break;default:console.error("Color scheme not recognized.")}return o(h.format.toLowerCase(),g),g},F.make_color=function(n){var s=[],c=t(u),h=null;if(null!==n)for(var d in n)n.hasOwnProperty(d)&&(c[d]=n[d]);var g=null;"string"==typeof c.seed&&(g=new l(c.seed)),c.base_color.length>0&&(h=c.base_color.match(/^#?([0-9a-f]{3})([0-9a-f]{3})?$/i)?F.HEX_to_HSV(c.base_color):F.NAME_to_HSV(c.base_color));for(var m=0;m<c.colors_returned;m++){var f,E,b,p=e(0,360,g);null!==h?(f=a(e(h.h-5,h.h+5,g),0,360),E=0===h.s?0:r(.4,.85,g),b=r(.4,.85,g),s.push({h:f,s:E,v:b})):(f=c.greyscale===!0||c.grayscale===!0?0:c.golden===!0?(p+p/i)%360:null===c.hue||c.full_random===!0?p:a(c.hue,0,360),E=c.greyscale===!0||c.grayscale===!0?0:c.full_random===!0?r(0,1,g):null===c.saturation?.4:a(c.saturation,0,1),b=c.full_random===!0?r(0,1,g):c.greyscale===!0||c.grayscale===!0?r(.15,.75,g):null===c.value?.75:a(c.value,0,1),s.push({h:f,s:E,v:b}))}return o(c.format.toLowerCase(),s),s},F.make_contrast=function(e,r){var l=t(h);if(null!==r)for(var s in r)r.hasOwnProperty(s)&&(l[s]=r[s]);var u,c,d=n(e);if(l.golden===!0)c=e.h*(1+i)%360;else{var g=F.make_scheme(e,{scheme_type:"complementary",format:"hsv"})[1];c=a(g.h-30,0,360)}var m;return"dark"===d?m=a(e.v-.25,0,1):"light"===d&&(m=a(e.v+.25,0,1)),u=[{h:c,s:e.s,v:m}],o(l.format.toLowerCase(),u),u[0]},F}return e()});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	(function(){
	  var crypt = __webpack_require__(10),
	      utf8 = __webpack_require__(11).utf8,
	      isBuffer = __webpack_require__(12),
	      bin = __webpack_require__(11).bin,

	  // The core
	  md5 = function (message, options) {
	    // Convert to byte array
	    if (message.constructor == String)
	      if (options && options.encoding === 'binary')
	        message = bin.stringToBytes(message);
	      else
	        message = utf8.stringToBytes(message);
	    else if (isBuffer(message))
	      message = Array.prototype.slice.call(message, 0);
	    else if (!Array.isArray(message))
	      message = message.toString();
	    // else, assume byte array already

	    var m = crypt.bytesToWords(message),
	        l = message.length * 8,
	        a =  1732584193,
	        b = -271733879,
	        c = -1732584194,
	        d =  271733878;

	    // Swap endian
	    for (var i = 0; i < m.length; i++) {
	      m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
	             ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
	    }

	    // Padding
	    m[l >>> 5] |= 0x80 << (l % 32);
	    m[(((l + 64) >>> 9) << 4) + 14] = l;

	    // Method shortcuts
	    var FF = md5._ff,
	        GG = md5._gg,
	        HH = md5._hh,
	        II = md5._ii;

	    for (var i = 0; i < m.length; i += 16) {

	      var aa = a,
	          bb = b,
	          cc = c,
	          dd = d;

	      a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
	      d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
	      c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
	      b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
	      a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
	      d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
	      c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
	      b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
	      a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
	      d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
	      c = FF(c, d, a, b, m[i+10], 17, -42063);
	      b = FF(b, c, d, a, m[i+11], 22, -1990404162);
	      a = FF(a, b, c, d, m[i+12],  7,  1804603682);
	      d = FF(d, a, b, c, m[i+13], 12, -40341101);
	      c = FF(c, d, a, b, m[i+14], 17, -1502002290);
	      b = FF(b, c, d, a, m[i+15], 22,  1236535329);

	      a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
	      d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
	      c = GG(c, d, a, b, m[i+11], 14,  643717713);
	      b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
	      a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
	      d = GG(d, a, b, c, m[i+10],  9,  38016083);
	      c = GG(c, d, a, b, m[i+15], 14, -660478335);
	      b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
	      a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
	      d = GG(d, a, b, c, m[i+14],  9, -1019803690);
	      c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
	      b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
	      a = GG(a, b, c, d, m[i+13],  5, -1444681467);
	      d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
	      c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
	      b = GG(b, c, d, a, m[i+12], 20, -1926607734);

	      a = HH(a, b, c, d, m[i+ 5],  4, -378558);
	      d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
	      c = HH(c, d, a, b, m[i+11], 16,  1839030562);
	      b = HH(b, c, d, a, m[i+14], 23, -35309556);
	      a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
	      d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
	      c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
	      b = HH(b, c, d, a, m[i+10], 23, -1094730640);
	      a = HH(a, b, c, d, m[i+13],  4,  681279174);
	      d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
	      c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
	      b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
	      a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
	      d = HH(d, a, b, c, m[i+12], 11, -421815835);
	      c = HH(c, d, a, b, m[i+15], 16,  530742520);
	      b = HH(b, c, d, a, m[i+ 2], 23, -995338651);

	      a = II(a, b, c, d, m[i+ 0],  6, -198630844);
	      d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
	      c = II(c, d, a, b, m[i+14], 15, -1416354905);
	      b = II(b, c, d, a, m[i+ 5], 21, -57434055);
	      a = II(a, b, c, d, m[i+12],  6,  1700485571);
	      d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
	      c = II(c, d, a, b, m[i+10], 15, -1051523);
	      b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
	      a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
	      d = II(d, a, b, c, m[i+15], 10, -30611744);
	      c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
	      b = II(b, c, d, a, m[i+13], 21,  1309151649);
	      a = II(a, b, c, d, m[i+ 4],  6, -145523070);
	      d = II(d, a, b, c, m[i+11], 10, -1120210379);
	      c = II(c, d, a, b, m[i+ 2], 15,  718787259);
	      b = II(b, c, d, a, m[i+ 9], 21, -343485551);

	      a = (a + aa) >>> 0;
	      b = (b + bb) >>> 0;
	      c = (c + cc) >>> 0;
	      d = (d + dd) >>> 0;
	    }

	    return crypt.endian([a, b, c, d]);
	  };

	  // Auxiliary functions
	  md5._ff  = function (a, b, c, d, x, s, t) {
	    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
	    return ((n << s) | (n >>> (32 - s))) + b;
	  };
	  md5._gg  = function (a, b, c, d, x, s, t) {
	    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
	    return ((n << s) | (n >>> (32 - s))) + b;
	  };
	  md5._hh  = function (a, b, c, d, x, s, t) {
	    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
	    return ((n << s) | (n >>> (32 - s))) + b;
	  };
	  md5._ii  = function (a, b, c, d, x, s, t) {
	    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
	    return ((n << s) | (n >>> (32 - s))) + b;
	  };

	  // Package private blocksize
	  md5._blocksize = 16;
	  md5._digestsize = 16;

	  module.exports = function (message, options) {
	    if(typeof message == 'undefined')
	      return;

	    var digestbytes = crypt.wordsToBytes(md5(message, options));
	    return options && options.asBytes ? digestbytes :
	        options && options.asString ? bin.bytesToString(digestbytes) :
	        crypt.bytesToHex(digestbytes);
	  };

	})();


/***/ },
/* 10 */
/***/ function(module, exports) {

	(function() {
	  var base64map
	      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

	  crypt = {
	    // Bit-wise rotation left
	    rotl: function(n, b) {
	      return (n << b) | (n >>> (32 - b));
	    },

	    // Bit-wise rotation right
	    rotr: function(n, b) {
	      return (n << (32 - b)) | (n >>> b);
	    },

	    // Swap big-endian to little-endian and vice versa
	    endian: function(n) {
	      // If number given, swap endian
	      if (n.constructor == Number) {
	        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
	      }

	      // Else, assume array and swap all items
	      for (var i = 0; i < n.length; i++)
	        n[i] = crypt.endian(n[i]);
	      return n;
	    },

	    // Generate an array of any length of random bytes
	    randomBytes: function(n) {
	      for (var bytes = []; n > 0; n--)
	        bytes.push(Math.floor(Math.random() * 256));
	      return bytes;
	    },

	    // Convert a byte array to big-endian 32-bit words
	    bytesToWords: function(bytes) {
	      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
	        words[b >>> 5] |= bytes[i] << (24 - b % 32);
	      return words;
	    },

	    // Convert big-endian 32-bit words to a byte array
	    wordsToBytes: function(words) {
	      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
	        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
	      return bytes;
	    },

	    // Convert a byte array to a hex string
	    bytesToHex: function(bytes) {
	      for (var hex = [], i = 0; i < bytes.length; i++) {
	        hex.push((bytes[i] >>> 4).toString(16));
	        hex.push((bytes[i] & 0xF).toString(16));
	      }
	      return hex.join('');
	    },

	    // Convert a hex string to a byte array
	    hexToBytes: function(hex) {
	      for (var bytes = [], c = 0; c < hex.length; c += 2)
	        bytes.push(parseInt(hex.substr(c, 2), 16));
	      return bytes;
	    },

	    // Convert a byte array to a base-64 string
	    bytesToBase64: function(bytes) {
	      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
	        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
	        for (var j = 0; j < 4; j++)
	          if (i * 8 + j * 6 <= bytes.length * 8)
	            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
	          else
	            base64.push('=');
	      }
	      return base64.join('');
	    },

	    // Convert a base-64 string to a byte array
	    base64ToBytes: function(base64) {
	      // Remove non-base-64 characters
	      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

	      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
	          imod4 = ++i % 4) {
	        if (imod4 == 0) continue;
	        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
	            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
	            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
	      }
	      return bytes;
	    }
	  };

	  module.exports = crypt;
	})();


/***/ },
/* 11 */
/***/ function(module, exports) {

	var charenc = {
	  // UTF-8 encoding
	  utf8: {
	    // Convert a string to a byte array
	    stringToBytes: function(str) {
	      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
	    },

	    // Convert a byte array to a string
	    bytesToString: function(bytes) {
	      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
	    }
	  },

	  // Binary encoding
	  bin: {
	    // Convert a string to a byte array
	    stringToBytes: function(str) {
	      for (var bytes = [], i = 0; i < str.length; i++)
	        bytes.push(str.charCodeAt(i) & 0xFF);
	      return bytes;
	    },

	    // Convert a byte array to a string
	    bytesToString: function(bytes) {
	      for (var str = [], i = 0; i < bytes.length; i++)
	        str.push(String.fromCharCode(bytes[i]));
	      return str.join('');
	    }
	  }
	};

	module.exports = charenc;


/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * Determine if an object is Buffer
	 *
	 * Author:   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * License:  MIT
	 *
	 * `npm install is-buffer`
	 */

	module.exports = function (obj) {
	  return !!(
	    obj != null &&
	    obj.constructor &&
	    typeof obj.constructor.isBuffer === 'function' &&
	    obj.constructor.isBuffer(obj)
	  )
	}


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(14);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(16)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/postcss-loader/index.js!./style.scss", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/postcss-loader/index.js!./style.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(15)();
	// imports
	exports.push([module.id, "@import url(https://fonts.googleapis.com/css?family=Roboto:300);", ""]);

	// module
	exports.push([module.id, "body {\n  margin: 0;\n  padding: 0;\n  background-color: rgb(30, 30, 35);\n  height: 100vh;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n\n.app-container {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex-wrap: wrap;\n      -ms-flex-wrap: wrap;\n          flex-wrap: wrap;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.btn, input.digest, .input-container {\n  border-radius: 3px;\n}\n\n.btn, .input-container {\n  box-sizing: border-box;\n  border: 1px solid #fff;\n  cursor: pointer;\n}\n\n.input-container {\n  height: 32px;\n  width: 100%;\n  display: inline-block;\n  padding: 2px;\n  background-clip: content-box;\n}\n\ninput[type=\"color\"] {\n  height: 0;\n  width: 0;\n  visibility: hidden;\n}\n\n.btn {\n  padding: 8px 10px;\n  text-align: center;\n  font-size: 12px;\n  line-height: 14px;\n  -webkit-transition: all 100ms;\n          transition: all 100ms;\n  color: #fff;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  font-family: \"Roboto\", \"Helvetica Neue\", \"Helvetica\", sans-serif;\n  font-weight: 300;\n}\n\n.btn:hover {\n  color: rgb(30, 30, 35);\n  background-color: #fff;\n}\n\n.btn.digest {\n  width: 25%;\n  display: inline-block;\n}\n\n.canvas-container {\n  margin: 5px 5px 0;\n  padding: 5px;\n  border: 1px solid #fff;\n  border-radius: 5px;\n}\n\ncanvas {\n  display: block;\n}\n\n.controls {\n  width: 432px;\n  margin: 5px;\n}\n\ninput.digest {\n  height: 32px;\n  width: calc(75% - 2px);\n  margin: 0 2px 0 0;\n  padding: 0 10px;\n  box-sizing: border-box;\n  border: 1px solid #fff;\n  background-color: rgb(30, 30, 35);\n  color: #fff;\n  font-family: \"Roboto\", \"HelveticaNeue-Light\", \"Helvetica Neue Light\", \"Helvetica Neue\", Helvetica, Arial, \"Lucida Grande\", sans-serif;\n  font-weight: 300;\n}\n\ninput.digest:focus {\n  outline: 1px solid Yellow;\n}\n", ""]);

	// exports


/***/ },
/* 15 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(18);


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";

	__webpack_require__(19);

	__webpack_require__(203);

	if (global._babelPolyfill) {
	  throw new Error("only one instance of babel/polyfill is allowed");
	}
	global._babelPolyfill = true;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(20);
	__webpack_require__(52);
	__webpack_require__(58);
	__webpack_require__(60);
	__webpack_require__(62);
	__webpack_require__(64);
	__webpack_require__(66);
	__webpack_require__(68);
	__webpack_require__(69);
	__webpack_require__(70);
	__webpack_require__(71);
	__webpack_require__(72);
	__webpack_require__(73);
	__webpack_require__(74);
	__webpack_require__(75);
	__webpack_require__(76);
	__webpack_require__(77);
	__webpack_require__(78);
	__webpack_require__(79);
	__webpack_require__(80);
	__webpack_require__(81);
	__webpack_require__(82);
	__webpack_require__(84);
	__webpack_require__(85);
	__webpack_require__(86);
	__webpack_require__(87);
	__webpack_require__(88);
	__webpack_require__(89);
	__webpack_require__(90);
	__webpack_require__(92);
	__webpack_require__(93);
	__webpack_require__(94);
	__webpack_require__(96);
	__webpack_require__(97);
	__webpack_require__(98);
	__webpack_require__(100);
	__webpack_require__(101);
	__webpack_require__(102);
	__webpack_require__(103);
	__webpack_require__(104);
	__webpack_require__(105);
	__webpack_require__(106);
	__webpack_require__(107);
	__webpack_require__(108);
	__webpack_require__(109);
	__webpack_require__(110);
	__webpack_require__(111);
	__webpack_require__(112);
	__webpack_require__(114);
	__webpack_require__(119);
	__webpack_require__(120);
	__webpack_require__(124);
	__webpack_require__(125);
	__webpack_require__(127);
	__webpack_require__(128);
	__webpack_require__(133);
	__webpack_require__(134);
	__webpack_require__(137);
	__webpack_require__(139);
	__webpack_require__(141);
	__webpack_require__(143);
	__webpack_require__(144);
	__webpack_require__(145);
	__webpack_require__(147);
	__webpack_require__(148);
	__webpack_require__(150);
	__webpack_require__(151);
	__webpack_require__(152);
	__webpack_require__(153);
	__webpack_require__(159);
	__webpack_require__(162);
	__webpack_require__(163);
	__webpack_require__(165);
	__webpack_require__(166);
	__webpack_require__(167);
	__webpack_require__(168);
	__webpack_require__(169);
	__webpack_require__(170);
	__webpack_require__(171);
	__webpack_require__(172);
	__webpack_require__(173);
	__webpack_require__(174);
	__webpack_require__(175);
	__webpack_require__(176);
	__webpack_require__(178);
	__webpack_require__(179);
	__webpack_require__(180);
	__webpack_require__(181);
	__webpack_require__(182);
	__webpack_require__(183);
	__webpack_require__(185);
	__webpack_require__(186);
	__webpack_require__(187);
	__webpack_require__(188);
	__webpack_require__(190);
	__webpack_require__(191);
	__webpack_require__(193);
	__webpack_require__(194);
	__webpack_require__(196);
	__webpack_require__(197);
	__webpack_require__(198);
	__webpack_require__(201);
	__webpack_require__(202);
	module.exports = __webpack_require__(32);

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $                = __webpack_require__(21)
	  , SUPPORT_DESC     = __webpack_require__(22)
	  , createDesc       = __webpack_require__(24)
	  , html             = __webpack_require__(25)
	  , cel              = __webpack_require__(27)
	  , has              = __webpack_require__(29)
	  , cof              = __webpack_require__(30)
	  , $def             = __webpack_require__(31)
	  , invoke           = __webpack_require__(36)
	  , arrayMethod      = __webpack_require__(37)
	  , IE_PROTO         = __webpack_require__(35)('__proto__')
	  , isObject         = __webpack_require__(28)
	  , anObject         = __webpack_require__(48)
	  , aFunction        = __webpack_require__(39)
	  , toObject         = __webpack_require__(41)
	  , toIObject        = __webpack_require__(49)
	  , toInteger        = __webpack_require__(44)
	  , toIndex          = __webpack_require__(50)
	  , toLength         = __webpack_require__(43)
	  , IObject          = __webpack_require__(40)
	  , fails            = __webpack_require__(23)
	  , ObjectProto      = Object.prototype
	  , A                = []
	  , _slice           = A.slice
	  , _join            = A.join
	  , defineProperty   = $.setDesc
	  , getOwnDescriptor = $.getDesc
	  , defineProperties = $.setDescs
	  , $indexOf         = __webpack_require__(51)(false)
	  , factories        = {}
	  , IE8_DOM_DEFINE;

	if(!SUPPORT_DESC){
	  IE8_DOM_DEFINE = !fails(function(){
	    return defineProperty(cel('div'), 'a', {get: function(){ return 7; }}).a != 7;
	  });
	  $.setDesc = function(O, P, Attributes){
	    if(IE8_DOM_DEFINE)try {
	      return defineProperty(O, P, Attributes);
	    } catch(e){ /* empty */ }
	    if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	    if('value' in Attributes)anObject(O)[P] = Attributes.value;
	    return O;
	  };
	  $.getDesc = function(O, P){
	    if(IE8_DOM_DEFINE)try {
	      return getOwnDescriptor(O, P);
	    } catch(e){ /* empty */ }
	    if(has(O, P))return createDesc(!ObjectProto.propertyIsEnumerable.call(O, P), O[P]);
	  };
	  $.setDescs = defineProperties = function(O, Properties){
	    anObject(O);
	    var keys   = $.getKeys(Properties)
	      , length = keys.length
	      , i = 0
	      , P;
	    while(length > i)$.setDesc(O, P = keys[i++], Properties[P]);
	    return O;
	  };
	}
	$def($def.S + $def.F * !SUPPORT_DESC, 'Object', {
	  // 19.1.2.6 / 15.2.3.3 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $.getDesc,
	  // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	  defineProperty: $.setDesc,
	  // 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
	  defineProperties: defineProperties
	});

	  // IE 8- don't enum bug keys
	var keys1 = ('constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,' +
	            'toLocaleString,toString,valueOf').split(',')
	  // Additional keys for getOwnPropertyNames
	  , keys2 = keys1.concat('length', 'prototype')
	  , keysLen1 = keys1.length;

	// Create object with `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = cel('iframe')
	    , i      = keysLen1
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write('<script>document.F=Object</script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict.prototype[keys1[i]];
	  return createDict();
	};
	var createGetKeys = function(names, length){
	  return function(object){
	    var O      = toIObject(object)
	      , i      = 0
	      , result = []
	      , key;
	    for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	    // Don't enum bug & hidden keys
	    while(length > i)if(has(O, key = names[i++])){
	      ~$indexOf(result, key) || result.push(key);
	    }
	    return result;
	  };
	};
	var Empty = function(){};
	$def($def.S, 'Object', {
	  // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	  getPrototypeOf: $.getProto = $.getProto || function(O){
	    O = toObject(O);
	    if(has(O, IE_PROTO))return O[IE_PROTO];
	    if(typeof O.constructor == 'function' && O instanceof O.constructor){
	      return O.constructor.prototype;
	    } return O instanceof Object ? ObjectProto : null;
	  },
	  // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $.getNames = $.getNames || createGetKeys(keys2, keys2.length, true),
	  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	  create: $.create = $.create || function(O, /*?*/Properties){
	    var result;
	    if(O !== null){
	      Empty.prototype = anObject(O);
	      result = new Empty();
	      Empty.prototype = null;
	      // add "__proto__" for Object.getPrototypeOf shim
	      result[IE_PROTO] = O;
	    } else result = createDict();
	    return Properties === undefined ? result : defineProperties(result, Properties);
	  },
	  // 19.1.2.14 / 15.2.3.14 Object.keys(O)
	  keys: $.getKeys = $.getKeys || createGetKeys(keys1, keysLen1, false)
	});

	var construct = function(F, len, args){
	  if(!(len in factories)){
	    for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
	    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
	  }
	  return factories[len](F, args);
	};

	// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
	$def($def.P, 'Function', {
	  bind: function bind(that /*, args... */){
	    var fn       = aFunction(this)
	      , partArgs = _slice.call(arguments, 1);
	    var bound = function(/* args... */){
	      var args = partArgs.concat(_slice.call(arguments));
	      return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
	    };
	    if(isObject(fn.prototype))bound.prototype = fn.prototype;
	    return bound;
	  }
	});

	// fallback for not array-like ES3 strings and DOM objects
	var buggySlice = fails(function(){
	  if(html)_slice.call(html);
	});

	$def($def.P + $def.F * buggySlice, 'Array', {
	  slice: function(begin, end){
	    var len   = toLength(this.length)
	      , klass = cof(this);
	    end = end === undefined ? len : end;
	    if(klass == 'Array')return _slice.call(this, begin, end);
	    var start  = toIndex(begin, len)
	      , upTo   = toIndex(end, len)
	      , size   = toLength(upTo - start)
	      , cloned = Array(size)
	      , i      = 0;
	    for(; i < size; i++)cloned[i] = klass == 'String'
	      ? this.charAt(start + i)
	      : this[start + i];
	    return cloned;
	  }
	});
	$def($def.P + $def.F * (IObject != Object), 'Array', {
	  join: function(){
	    return _join.apply(IObject(this), arguments);
	  }
	});

	// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
	$def($def.S, 'Array', {isArray: __webpack_require__(45)});

	var createArrayReduce = function(isRight){
	  return function(callbackfn, memo){
	    aFunction(callbackfn);
	    var O      = IObject(this)
	      , length = toLength(O.length)
	      , index  = isRight ? length - 1 : 0
	      , i      = isRight ? -1 : 1;
	    if(arguments.length < 2)for(;;){
	      if(index in O){
	        memo = O[index];
	        index += i;
	        break;
	      }
	      index += i;
	      if(isRight ? index < 0 : length <= index){
	        throw TypeError('Reduce of empty array with no initial value');
	      }
	    }
	    for(;isRight ? index >= 0 : length > index; index += i)if(index in O){
	      memo = callbackfn(memo, O[index], index, this);
	    }
	    return memo;
	  };
	};
	var methodize = function($fn){
	  return function(arg1/*, arg2 = undefined */){
	    return $fn(this, arg1, arguments[1]);
	  };
	};
	$def($def.P, 'Array', {
	  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
	  forEach: $.each = $.each || methodize(arrayMethod(0)),
	  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
	  map: methodize(arrayMethod(1)),
	  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
	  filter: methodize(arrayMethod(2)),
	  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
	  some: methodize(arrayMethod(3)),
	  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
	  every: methodize(arrayMethod(4)),
	  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
	  reduce: createArrayReduce(false),
	  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
	  reduceRight: createArrayReduce(true),
	  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
	  indexOf: methodize($indexOf),
	  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
	  lastIndexOf: function(el, fromIndex /* = @[*-1] */){
	    var O      = toIObject(this)
	      , length = toLength(O.length)
	      , index  = length - 1;
	    if(arguments.length > 1)index = Math.min(index, toInteger(fromIndex));
	    if(index < 0)index = toLength(length + index);
	    for(;index >= 0; index--)if(index in O)if(O[index] === el)return index;
	    return -1;
	  }
	});

	// 20.3.3.1 / 15.9.4.4 Date.now()
	$def($def.S, 'Date', {now: function(){ return +new Date; }});

	var lz = function(num){
	  return num > 9 ? num : '0' + num;
	};

	// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
	// PhantomJS and old webkit had a broken Date implementation.
	var date       = new Date(-5e13 - 1)
	  , brokenDate = !(date.toISOString && date.toISOString() == '0385-07-25T07:06:39.999Z'
	      && fails(function(){ new Date(NaN).toISOString(); }));
	$def($def.P + $def.F * brokenDate, 'Date', {
	  toISOString: function toISOString(){
	    if(!isFinite(this))throw RangeError('Invalid time value');
	    var d = this
	      , y = d.getUTCFullYear()
	      , m = d.getUTCMilliseconds()
	      , s = y < 0 ? '-' : y > 9999 ? '+' : '';
	    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
	      '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
	      'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
	      ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
	  }
	});

/***/ },
/* 21 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(23)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(26).document && document.documentElement;

/***/ },
/* 26 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var UNDEFINED = 'undefined';
	var global = module.exports = typeof window != UNDEFINED && window.Math == Math
	  ? window : typeof self != UNDEFINED && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(28)
	  , document = __webpack_require__(26).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var global     = __webpack_require__(26)
	  , core       = __webpack_require__(32)
	  , hide       = __webpack_require__(33)
	  , $redef     = __webpack_require__(34)
	  , PROTOTYPE  = 'prototype';
	var ctx = function(fn, that){
	  return function(){
	    return fn.apply(that, arguments);
	  };
	};
	var $def = function(type, name, source){
	  var key, own, out, exp
	    , isGlobal = type & $def.G
	    , isProto  = type & $def.P
	    , target   = isGlobal ? global : type & $def.S
	        ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
	    , exports  = isGlobal ? core : core[name] || (core[name] = {});
	  if(isGlobal)source = name;
	  for(key in source){
	    // contains in native
	    own = !(type & $def.F) && target && key in target;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    if(type & $def.B && own)exp = ctx(out, global);
	    else exp = isProto && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // extend global
	    if(target && !own)$redef(target, key, out);
	    // export
	    if(exports[key] != out)hide(exports, key, exp);
	    if(isProto)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	global.core = core;
	// type bitmap
	$def.F = 1;  // forced
	$def.G = 2;  // global
	$def.S = 4;  // static
	$def.P = 8;  // proto
	$def.B = 16; // bind
	$def.W = 32; // wrap
	module.exports = $def;

/***/ },
/* 32 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.1'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(21)
	  , createDesc = __webpack_require__(24);
	module.exports = __webpack_require__(22) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// add fake Function#toString
	// for correct work wrapped methods / constructors with methods like LoDash isNative
	var global    = __webpack_require__(26)
	  , hide      = __webpack_require__(33)
	  , SRC       = __webpack_require__(35)('src')
	  , TO_STRING = 'toString'
	  , $toString = Function[TO_STRING]
	  , TPL       = ('' + $toString).split(TO_STRING);

	__webpack_require__(32).inspectSource = function(it){
	  return $toString.call(it);
	};

	(module.exports = function(O, key, val, safe){
	  if(typeof val == 'function'){
	    hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	    if(!('name' in val))val.name = key;
	  }
	  if(O === global){
	    O[key] = val;
	  } else {
	    if(!safe)delete O[key];
	    hide(O, key, val);
	  }
	})(Function.prototype, TO_STRING, function toString(){
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});

/***/ },
/* 35 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 36 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var ctx      = __webpack_require__(38)
	  , isObject = __webpack_require__(28)
	  , IObject  = __webpack_require__(40)
	  , toObject = __webpack_require__(41)
	  , toLength = __webpack_require__(43)
	  , isArray  = __webpack_require__(45)
	  , SPECIES  = __webpack_require__(46)('species');
	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var ASC = function(original, length){
	  var C;
	  if(isArray(original) && isObject(C = original.constructor)){
	    C = C[SPECIES];
	    if(C === null)C = undefined;
	  } return new(C === undefined ? Array : C)(length);
	};
	module.exports = function(TYPE){
	  var IS_MAP        = TYPE == 1
	    , IS_FILTER     = TYPE == 2
	    , IS_SOME       = TYPE == 3
	    , IS_EVERY      = TYPE == 4
	    , IS_FIND_INDEX = TYPE == 6
	    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX;
	  return function($this, callbackfn, that){
	    var O      = toObject($this)
	      , self   = IObject(O)
	      , f      = ctx(callbackfn, that, 3)
	      , length = toLength(self.length)
	      , index  = 0
	      , result = IS_MAP ? ASC($this, length) : IS_FILTER ? ASC($this, 0) : undefined
	      , val, res;
	    for(;length > index; index++)if(NO_HOLES || index in self){
	      val = self[index];
	      res = f(val, index, O);
	      if(TYPE){
	        if(IS_MAP)result[index] = res;            // map
	        else if(res)switch(TYPE){
	          case 3: return true;                    // some
	          case 5: return val;                     // find
	          case 6: return index;                   // findIndex
	          case 2: result.push(val);               // filter
	        } else if(IS_EVERY)return false;          // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(39);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// indexed object, fallback for non-array-like ES3 strings
	var cof = __webpack_require__(30);
	module.exports = 0 in Object('z') ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(42);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 42 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(44)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 44 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(30);
	module.exports = Array.isArray || function(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(47)('wks')
	  , Symbol = __webpack_require__(26).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || __webpack_require__(35))('Symbol.' + name));
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(26)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(28);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(40)
	  , defined = __webpack_require__(42);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(44)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(49)
	  , toLength  = __webpack_require__(43)
	  , toIndex   = __webpack_require__(50);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var $              = __webpack_require__(21)
	  , global         = __webpack_require__(26)
	  , has            = __webpack_require__(29)
	  , SUPPORT_DESC   = __webpack_require__(22)
	  , $def           = __webpack_require__(31)
	  , $redef         = __webpack_require__(34)
	  , $fails         = __webpack_require__(23)
	  , shared         = __webpack_require__(47)
	  , setTag         = __webpack_require__(53)
	  , uid            = __webpack_require__(35)
	  , wks            = __webpack_require__(46)
	  , keyOf          = __webpack_require__(54)
	  , $names         = __webpack_require__(55)
	  , enumKeys       = __webpack_require__(56)
	  , isArray        = __webpack_require__(45)
	  , isObject       = __webpack_require__(28)
	  , anObject       = __webpack_require__(48)
	  , toIObject      = __webpack_require__(49)
	  , createDesc     = __webpack_require__(24)
	  , getDesc        = $.getDesc
	  , setDesc        = $.setDesc
	  , _create        = $.create
	  , getNames       = $names.get
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , setter         = false
	  , HIDDEN         = wks('_hidden')
	  , isEnum         = $.isEnum
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , useNative      = typeof $Symbol == 'function'
	  , ObjectProto    = Object.prototype;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = SUPPORT_DESC && $fails(function(){
	  return _create(setDesc({}, 'a', {
	    get: function(){ return setDesc(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = getDesc(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  setDesc(it, key, D);
	  if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
	} : setDesc;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol.prototype);
	  sym._k = tag;
	  SUPPORT_DESC && setter && setSymbolDesc(ObjectProto, tag, {
	    configurable: true,
	    set: function(value){
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    }
	  });
	  return sym;
	};

	var isSymbol = function(it){
	  return typeof it == 'symbol';
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(D && has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))setDesc(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return setDesc(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key);
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
	    ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  var D = getDesc(it = toIObject(it), key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
	  return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
	  return result;
	};
	var $stringify = function stringify(it){
	  var args = [it]
	    , i    = 1
	    , replacer, $replacer;
	  while(arguments.length > i)args.push(arguments[i++]);
	  replacer = args[1];
	  if(typeof replacer == 'function')$replacer = replacer;
	  if($replacer || !isArray(replacer))replacer = function(key, value){
	    if($replacer)value = $replacer.call(this, key, value);
	    if(!isSymbol(value))return value;
	  };
	  args[1] = replacer;
	  return _stringify.apply($JSON, args);
	};
	var buggyJSON = $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	});

	// 19.4.1.1 Symbol([description])
	if(!useNative){
	  $Symbol = function Symbol(){
	    if(isSymbol(this))throw TypeError('Symbol is not a constructor');
	    return wrap(uid(arguments[0]));
	  };
	  $redef($Symbol.prototype, 'toString', function toString(){
	    return this._k;
	  });

	  isSymbol = function(it){
	    return it instanceof $Symbol;
	  };

	  $.create     = $create;
	  $.isEnum     = $propertyIsEnumerable;
	  $.getDesc    = $getOwnPropertyDescriptor;
	  $.setDesc    = $defineProperty;
	  $.setDescs   = $defineProperties;
	  $.getNames   = $names.get = $getOwnPropertyNames;
	  $.getSymbols = $getOwnPropertySymbols;

	  if(SUPPORT_DESC && !__webpack_require__(57)){
	    $redef(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	}

	var symbolStatics = {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    return keyOf(SymbolRegistry, key);
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	};
	// 19.4.2.2 Symbol.hasInstance
	// 19.4.2.3 Symbol.isConcatSpreadable
	// 19.4.2.4 Symbol.iterator
	// 19.4.2.6 Symbol.match
	// 19.4.2.8 Symbol.replace
	// 19.4.2.9 Symbol.search
	// 19.4.2.10 Symbol.species
	// 19.4.2.11 Symbol.split
	// 19.4.2.12 Symbol.toPrimitive
	// 19.4.2.13 Symbol.toStringTag
	// 19.4.2.14 Symbol.unscopables
	$.each.call((
	    'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
	    'species,split,toPrimitive,toStringTag,unscopables'
	  ).split(','), function(it){
	    var sym = wks(it);
	    symbolStatics[it] = useNative ? sym : wrap(sym);
	  }
	);

	setter = true;

	$def($def.G + $def.W, {Symbol: $Symbol});

	$def($def.S, 'Symbol', symbolStatics);

	$def($def.S + $def.F * !useNative, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $def($def.S + $def.F * (!useNative || buggyJSON), 'JSON', {stringify: $stringify});

	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setTag(global.JSON, 'JSON', true);

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var has  = __webpack_require__(29)
	  , hide = __webpack_require__(33)
	  , TAG  = __webpack_require__(46)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))hide(it, TAG, tag);
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var $         = __webpack_require__(21)
	  , toIObject = __webpack_require__(49);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = $.getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toString  = {}.toString
	  , toIObject = __webpack_require__(49)
	  , getNames  = __webpack_require__(21).getNames;

	var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return getNames(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.get = function getOwnPropertyNames(it){
	  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
	  return getNames(toIObject(it));
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var $ = __webpack_require__(21);
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , getSymbols = $.getSymbols;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = $.isEnum
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
	  }
	  return keys;
	};

/***/ },
/* 57 */
/***/ function(module, exports) {

	module.exports = false;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $def = __webpack_require__(31);

	$def($def.S + $def.F, 'Object', {assign: __webpack_require__(59)});

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.1 Object.assign(target, source, ...)
	var toObject = __webpack_require__(41)
	  , IObject  = __webpack_require__(40)
	  , enumKeys = __webpack_require__(56)
	  , has      = __webpack_require__(29);

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = __webpack_require__(23)(function(){
	  var a = Object.assign
	    , A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
	}) ? function assign(target, source){   // eslint-disable-line no-unused-vars
	  var T = toObject(target)
	    , l = arguments.length
	    , i = 1;
	  while(l > i){
	    var S      = IObject(arguments[i++])
	      , keys   = enumKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(has(S, key = keys[j++]))T[key] = S[key];
	  }
	  return T;
	} : Object.assign;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.10 Object.is(value1, value2)
	var $def = __webpack_require__(31);
	$def($def.S, 'Object', {
	  is: __webpack_require__(61)
	});

/***/ },
/* 61 */
/***/ function(module, exports) {

	module.exports = Object.is || function is(x, y){
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $def = __webpack_require__(31);
	$def($def.S, 'Object', {setPrototypeOf: __webpack_require__(63).set});

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var getDesc  = __webpack_require__(21).getDesc
	  , isObject = __webpack_require__(28)
	  , anObject = __webpack_require__(48);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line no-proto
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(38)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.3.6 Object.prototype.toString()
	var classof = __webpack_require__(65)
	  , test    = {};
	test[__webpack_require__(46)('toStringTag')] = 'z';
	if(test + '' != '[object z]'){
	  __webpack_require__(34)(Object.prototype, 'toString', function toString(){
	    return '[object ' + classof(this) + ']';
	  }, true);
	}

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(30)
	  , TAG = __webpack_require__(46)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.5 Object.freeze(O)
	var isObject = __webpack_require__(28);

	__webpack_require__(67)('freeze', function($freeze){
	  return function freeze(it){
	    return $freeze && isObject(it) ? $freeze(it) : it;
	  };
	});

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	module.exports = function(KEY, exec){
	  var $def = __webpack_require__(31)
	    , fn   = (__webpack_require__(32).Object || {})[KEY] || Object[KEY]
	    , exp  = {};
	  exp[KEY] = exec(fn);
	  $def($def.S + $def.F * __webpack_require__(23)(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.17 Object.seal(O)
	var isObject = __webpack_require__(28);

	__webpack_require__(67)('seal', function($seal){
	  return function seal(it){
	    return $seal && isObject(it) ? $seal(it) : it;
	  };
	});

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.15 Object.preventExtensions(O)
	var isObject = __webpack_require__(28);

	__webpack_require__(67)('preventExtensions', function($preventExtensions){
	  return function preventExtensions(it){
	    return $preventExtensions && isObject(it) ? $preventExtensions(it) : it;
	  };
	});

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.12 Object.isFrozen(O)
	var isObject = __webpack_require__(28);

	__webpack_require__(67)('isFrozen', function($isFrozen){
	  return function isFrozen(it){
	    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
	  };
	});

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.13 Object.isSealed(O)
	var isObject = __webpack_require__(28);

	__webpack_require__(67)('isSealed', function($isSealed){
	  return function isSealed(it){
	    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
	  };
	});

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.11 Object.isExtensible(O)
	var isObject = __webpack_require__(28);

	__webpack_require__(67)('isExtensible', function($isExtensible){
	  return function isExtensible(it){
	    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
	  };
	});

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject = __webpack_require__(49);

	__webpack_require__(67)('getOwnPropertyDescriptor', function($getOwnPropertyDescriptor){
	  return function getOwnPropertyDescriptor(it, key){
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject = __webpack_require__(41);

	__webpack_require__(67)('getPrototypeOf', function($getPrototypeOf){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(41);

	__webpack_require__(67)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 Object.getOwnPropertyNames(O)
	__webpack_require__(67)('getOwnPropertyNames', function(){
	  return __webpack_require__(55).get;
	});

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var setDesc    = __webpack_require__(21).setDesc
	  , createDesc = __webpack_require__(24)
	  , has        = __webpack_require__(29)
	  , FProto     = Function.prototype
	  , nameRE     = /^\s*function ([^ (]*)/
	  , NAME       = 'name';
	// 19.2.4.2 name
	NAME in FProto || __webpack_require__(22) && setDesc(FProto, NAME, {
	  configurable: true,
	  get: function(){
	    var match = ('' + this).match(nameRE)
	      , name  = match ? match[1] : '';
	    has(this, NAME) || setDesc(this, NAME, createDesc(5, name));
	    return name;
	  }
	});

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $             = __webpack_require__(21)
	  , isObject      = __webpack_require__(28)
	  , HAS_INSTANCE  = __webpack_require__(46)('hasInstance')
	  , FunctionProto = Function.prototype;
	// 19.2.3.6 Function.prototype[@@hasInstance](V)
	if(!(HAS_INSTANCE in FunctionProto))$.setDesc(FunctionProto, HAS_INSTANCE, {value: function(O){
	  if(typeof this != 'function' || !isObject(O))return false;
	  if(!isObject(this.prototype))return O instanceof this;
	  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
	  while(O = $.getProto(O))if(this.prototype === O)return true;
	  return false;
	}});

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $          = __webpack_require__(21)
	  , global     = __webpack_require__(26)
	  , has        = __webpack_require__(29)
	  , cof        = __webpack_require__(30)
	  , isObject   = __webpack_require__(28)
	  , fails      = __webpack_require__(23)
	  , NUMBER     = 'Number'
	  , $Number    = global[NUMBER]
	  , Base       = $Number
	  , proto      = $Number.prototype
	  // Opera ~12 has broken Object#toString
	  , BROKEN_COF = cof($.create(proto)) == NUMBER;
	var toPrimitive = function(it){
	  var fn, val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to number");
	};
	var toNumber = function(it){
	  if(isObject(it))it = toPrimitive(it);
	  if(typeof it == 'string' && it.length > 2 && it.charCodeAt(0) == 48){
	    var binary = false;
	    switch(it.charCodeAt(1)){
	      case 66 : case 98  : binary = true;
	      case 79 : case 111 : return parseInt(it.slice(2), binary ? 2 : 8);
	    }
	  } return +it;
	};
	if(!($Number('0o1') && $Number('0b1'))){
	  $Number = function Number(it){
	    var that = this;
	    return that instanceof $Number
	      // check on 1..constructor(foo) case
	      && (BROKEN_COF ? fails(function(){ proto.valueOf.call(that); }) : cof(that) != NUMBER)
	        ? new Base(toNumber(it)) : toNumber(it);
	  };
	  $.each.call(__webpack_require__(22) ? $.getNames(Base) : (
	      // ES3:
	      'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	      // ES6 (in case, if modules with ES6 Number statics required before):
	      'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
	      'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
	    ).split(','), function(key){
	      if(has(Base, key) && !has($Number, key)){
	        $.setDesc($Number, key, $.getDesc(Base, key));
	      }
	    }
	  );
	  $Number.prototype = proto;
	  proto.constructor = $Number;
	  __webpack_require__(34)(global, NUMBER, $Number);
	}

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.1 Number.EPSILON
	var $def = __webpack_require__(31);

	$def($def.S, 'Number', {EPSILON: Math.pow(2, -52)});

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.2 Number.isFinite(number)
	var $def      = __webpack_require__(31)
	  , _isFinite = __webpack_require__(26).isFinite;

	$def($def.S, 'Number', {
	  isFinite: function isFinite(it){
	    return typeof it == 'number' && _isFinite(it);
	  }
	});

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var $def = __webpack_require__(31);

	$def($def.S, 'Number', {isInteger: __webpack_require__(83)});

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var isObject = __webpack_require__(28)
	  , floor    = Math.floor;
	module.exports = function isInteger(it){
	  return !isObject(it) && isFinite(it) && floor(it) === it;
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.4 Number.isNaN(number)
	var $def = __webpack_require__(31);

	$def($def.S, 'Number', {
	  isNaN: function isNaN(number){
	    return number != number;
	  }
	});

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.5 Number.isSafeInteger(number)
	var $def      = __webpack_require__(31)
	  , isInteger = __webpack_require__(83)
	  , abs       = Math.abs;

	$def($def.S, 'Number', {
	  isSafeInteger: function isSafeInteger(number){
	    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
	  }
	});

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.6 Number.MAX_SAFE_INTEGER
	var $def = __webpack_require__(31);

	$def($def.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.10 Number.MIN_SAFE_INTEGER
	var $def = __webpack_require__(31);

	$def($def.S, 'Number', {MIN_SAFE_INTEGER: -0x1fffffffffffff});

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.12 Number.parseFloat(string)
	var $def = __webpack_require__(31);

	$def($def.S, 'Number', {parseFloat: parseFloat});

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.13 Number.parseInt(string, radix)
	var $def = __webpack_require__(31);

	$def($def.S, 'Number', {parseInt: parseInt});

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.3 Math.acosh(x)
	var $def   = __webpack_require__(31)
	  , log1p  = __webpack_require__(91)
	  , sqrt   = Math.sqrt
	  , $acosh = Math.acosh;

	// V8 bug https://code.google.com/p/v8/issues/detail?id=3509 
	$def($def.S + $def.F * !($acosh && Math.floor($acosh(Number.MAX_VALUE)) == 710), 'Math', {
	  acosh: function acosh(x){
	    return (x = +x) < 1 ? NaN : x > 94906265.62425156
	      ? Math.log(x) + Math.LN2
	      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
	  }
	});

/***/ },
/* 91 */
/***/ function(module, exports) {

	// 20.2.2.20 Math.log1p(x)
	module.exports = Math.log1p || function log1p(x){
	  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
	};

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.5 Math.asinh(x)
	var $def = __webpack_require__(31);

	function asinh(x){
	  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
	}

	$def($def.S, 'Math', {asinh: asinh});

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.7 Math.atanh(x)
	var $def = __webpack_require__(31);

	$def($def.S, 'Math', {
	  atanh: function atanh(x){
	    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
	  }
	});

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.9 Math.cbrt(x)
	var $def = __webpack_require__(31)
	  , sign = __webpack_require__(95);

	$def($def.S, 'Math', {
	  cbrt: function cbrt(x){
	    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
	  }
	});

/***/ },
/* 95 */
/***/ function(module, exports) {

	// 20.2.2.28 Math.sign(x)
	module.exports = Math.sign || function sign(x){
	  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
	};

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.11 Math.clz32(x)
	var $def = __webpack_require__(31);

	$def($def.S, 'Math', {
	  clz32: function clz32(x){
	    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
	  }
	});

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.12 Math.cosh(x)
	var $def = __webpack_require__(31)
	  , exp  = Math.exp;

	$def($def.S, 'Math', {
	  cosh: function cosh(x){
	    return (exp(x = +x) + exp(-x)) / 2;
	  }
	});

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.14 Math.expm1(x)
	var $def = __webpack_require__(31);

	$def($def.S, 'Math', {expm1: __webpack_require__(99)});

/***/ },
/* 99 */
/***/ function(module, exports) {

	// 20.2.2.14 Math.expm1(x)
	module.exports = Math.expm1 || function expm1(x){
	  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
	};

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.16 Math.fround(x)
	var $def  = __webpack_require__(31)
	  , sign  = __webpack_require__(95)
	  , pow   = Math.pow
	  , EPSILON   = pow(2, -52)
	  , EPSILON32 = pow(2, -23)
	  , MAX32     = pow(2, 127) * (2 - EPSILON32)
	  , MIN32     = pow(2, -126);

	var roundTiesToEven = function(n){
	  return n + 1 / EPSILON - 1 / EPSILON;
	};


	$def($def.S, 'Math', {
	  fround: function fround(x){
	    var $abs  = Math.abs(x)
	      , $sign = sign(x)
	      , a, result;
	    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
	    a = (1 + EPSILON32 / EPSILON) * $abs;
	    result = a - (a - $abs);
	    if(result > MAX32 || result != result)return $sign * Infinity;
	    return $sign * result;
	  }
	});

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
	var $def = __webpack_require__(31)
	  , abs  = Math.abs;

	$def($def.S, 'Math', {
	  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
	    var sum  = 0
	      , i    = 0
	      , len  = arguments.length
	      , larg = 0
	      , arg, div;
	    while(i < len){
	      arg = abs(arguments[i++]);
	      if(larg < arg){
	        div  = larg / arg;
	        sum  = sum * div * div + 1;
	        larg = arg;
	      } else if(arg > 0){
	        div  = arg / larg;
	        sum += div * div;
	      } else sum += arg;
	    }
	    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
	  }
	});

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.18 Math.imul(x, y)
	var $def = __webpack_require__(31);

	// WebKit fails with big numbers
	$def($def.S + $def.F * __webpack_require__(23)(function(){
	  return Math.imul(0xffffffff, 5) != -5;
	}), 'Math', {
	  imul: function imul(x, y){
	    var UINT16 = 0xffff
	      , xn = +x
	      , yn = +y
	      , xl = UINT16 & xn
	      , yl = UINT16 & yn;
	    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
	  }
	});

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.21 Math.log10(x)
	var $def = __webpack_require__(31);

	$def($def.S, 'Math', {
	  log10: function log10(x){
	    return Math.log(x) / Math.LN10;
	  }
	});

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.20 Math.log1p(x)
	var $def = __webpack_require__(31);

	$def($def.S, 'Math', {log1p: __webpack_require__(91)});

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.22 Math.log2(x)
	var $def = __webpack_require__(31);

	$def($def.S, 'Math', {
	  log2: function log2(x){
	    return Math.log(x) / Math.LN2;
	  }
	});

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.28 Math.sign(x)
	var $def = __webpack_require__(31);

	$def($def.S, 'Math', {sign: __webpack_require__(95)});

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.30 Math.sinh(x)
	var $def  = __webpack_require__(31)
	  , expm1 = __webpack_require__(99)
	  , exp   = Math.exp;

	// V8 near Chromium 38 has a problem with very small numbers
	$def($def.S + $def.F * __webpack_require__(23)(function(){
	  return !Math.sinh(-2e-17) != -2e-17;
	}), 'Math', {
	  sinh: function sinh(x){
	    return Math.abs(x = +x) < 1
	      ? (expm1(x) - expm1(-x)) / 2
	      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
	  }
	});

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.33 Math.tanh(x)
	var $def  = __webpack_require__(31)
	  , expm1 = __webpack_require__(99)
	  , exp   = Math.exp;

	$def($def.S, 'Math', {
	  tanh: function tanh(x){
	    var a = expm1(x = +x)
	      , b = expm1(-x);
	    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
	  }
	});

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.34 Math.trunc(x)
	var $def = __webpack_require__(31);

	$def($def.S, 'Math', {
	  trunc: function trunc(it){
	    return (it > 0 ? Math.floor : Math.ceil)(it);
	  }
	});

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var $def    = __webpack_require__(31)
	  , toIndex = __webpack_require__(50)
	  , fromCharCode = String.fromCharCode
	  , $fromCodePoint = String.fromCodePoint;

	// length should be 1, old FF problem
	$def($def.S + $def.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
	  // 21.1.2.2 String.fromCodePoint(...codePoints)
	  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
	    var res = []
	      , len = arguments.length
	      , i   = 0
	      , code;
	    while(len > i){
	      code = +arguments[i++];
	      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
	      res.push(code < 0x10000
	        ? fromCharCode(code)
	        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
	      );
	    } return res.join('');
	  }
	});

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var $def      = __webpack_require__(31)
	  , toIObject = __webpack_require__(49)
	  , toLength  = __webpack_require__(43);

	$def($def.S, 'String', {
	  // 21.1.2.4 String.raw(callSite, ...substitutions)
	  raw: function raw(callSite){
	    var tpl = toIObject(callSite.raw)
	      , len = toLength(tpl.length)
	      , sln = arguments.length
	      , res = []
	      , i   = 0;
	    while(len > i){
	      res.push(String(tpl[i++]));
	      if(i < sln)res.push(String(arguments[i]));
	    } return res.join('');
	  }
	});

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 21.1.3.25 String.prototype.trim()
	__webpack_require__(113)('trim', function($trim){
	  return function trim(){
	    return $trim(this, 3);
	  };
	});

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	// 1 -> String#trimLeft
	// 2 -> String#trimRight
	// 3 -> String#trim
	var trim = function(string, TYPE){
	  string = String(defined(string));
	  if(TYPE & 1)string = string.replace(ltrim, '');
	  if(TYPE & 2)string = string.replace(rtrim, '');
	  return string;
	};

	var $def    = __webpack_require__(31)
	  , defined = __webpack_require__(42)
	  , spaces  = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
	      '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF'
	  , space   = '[' + spaces + ']'
	  , non     = '\u200b\u0085'
	  , ltrim   = RegExp('^' + space + space + '*')
	  , rtrim   = RegExp(space + space + '*$');

	module.exports = function(KEY, exec){
	  var exp  = {};
	  exp[KEY] = exec(trim);
	  $def($def.P + $def.F * __webpack_require__(23)(function(){
	    return !!spaces[KEY]() || non[KEY]() != non;
	  }), 'String', exp);
	};

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(115)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(116)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	// true  -> String#at
	// false -> String#codePointAt
	var toInteger = __webpack_require__(44)
	  , defined   = __webpack_require__(42);
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l
	      || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	        ? TO_STRING ? s.charAt(i) : a
	        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY         = __webpack_require__(57)
	  , $def            = __webpack_require__(31)
	  , $redef          = __webpack_require__(34)
	  , hide            = __webpack_require__(33)
	  , has             = __webpack_require__(29)
	  , SYMBOL_ITERATOR = __webpack_require__(46)('iterator')
	  , Iterators       = __webpack_require__(117)
	  , BUGGY           = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR     = '@@iterator'
	  , KEYS            = 'keys'
	  , VALUES          = 'values';
	var returnThis = function(){ return this; };
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE){
	  __webpack_require__(118)(Constructor, NAME, next);
	  var createMethod = function(kind){
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG      = NAME + ' Iterator'
	    , proto    = Base.prototype
	    , _native  = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , _default = _native || createMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if(_native){
	    var IteratorPrototype = __webpack_require__(21).getProto(_default.call(new Base));
	    // Set @@toStringTag to native iterators
	    __webpack_require__(53)(IteratorPrototype, TAG, true);
	    // FF fix
	    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, SYMBOL_ITERATOR, returnThis);
	  }
	  // Define iterator
	  if(!LIBRARY || FORCE)hide(proto, SYMBOL_ITERATOR, _default);
	  // Plug for library
	  Iterators[NAME] = _default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      keys:    IS_SET            ? _default : createMethod(KEYS),
	      values:  DEFAULT == VALUES ? _default : createMethod(VALUES),
	      entries: DEFAULT != VALUES ? _default : createMethod('entries')
	    };
	    if(FORCE)for(key in methods){
	      if(!(key in proto))$redef(proto, key, methods[key]);
	    } else $def($def.P + $def.F * BUGGY, NAME, methods);
	  }
	};

/***/ },
/* 117 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $ = __webpack_require__(21)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(33)(IteratorPrototype, __webpack_require__(46)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: __webpack_require__(24)(1,next)});
	  __webpack_require__(53)(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $def = __webpack_require__(31)
	  , $at  = __webpack_require__(115)(false);
	$def($def.P, 'String', {
	  // 21.1.3.3 String.prototype.codePointAt(pos)
	  codePointAt: function codePointAt(pos){
	    return $at(this, pos);
	  }
	});

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
	'use strict';
	var $def      = __webpack_require__(31)
	  , toLength  = __webpack_require__(43)
	  , context   = __webpack_require__(121)
	  , ENDS_WITH = 'endsWith'
	  , $endsWith = ''[ENDS_WITH];

	$def($def.P + $def.F * __webpack_require__(123)(ENDS_WITH), 'String', {
	  endsWith: function endsWith(searchString /*, endPosition = @length */){
	    var that = context(this, searchString, ENDS_WITH)
	      , endPosition = arguments[1]
	      , len    = toLength(that.length)
	      , end    = endPosition === undefined ? len : Math.min(toLength(endPosition), len)
	      , search = String(searchString);
	    return $endsWith
	      ? $endsWith.call(that, search, end)
	      : that.slice(end - search.length, end) === search;
	  }
	});

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	// helper for String#{startsWith, endsWith, includes}
	var isRegExp = __webpack_require__(122)
	  , defined  = __webpack_require__(42);

	module.exports = function(that, searchString, NAME){
	  if(isRegExp(searchString))throw TypeError('String#' + NAME + " doesn't accept regex!");
	  return String(defined(that));
	};

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.8 IsRegExp(argument)
	var isObject = __webpack_require__(28)
	  , cof      = __webpack_require__(30)
	  , MATCH    = __webpack_require__(46)('match');
	module.exports = function(it){
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
	};

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(KEY){
	  var re = /./;
	  try {
	    '/./'[KEY](re);
	  } catch(e){
	    try {
	      re[__webpack_require__(46)('match')] = false;
	      return !'/./'[KEY](re);
	    } catch(e){ /* empty */ }
	  } return true;
	};

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.7 String.prototype.includes(searchString, position = 0)
	'use strict';
	var $def     = __webpack_require__(31)
	  , context  = __webpack_require__(121)
	  , INCLUDES = 'includes';

	$def($def.P + $def.F * __webpack_require__(123)(INCLUDES), 'String', {
	  includes: function includes(searchString /*, position = 0 */){
	    return !!~context(this, searchString, INCLUDES).indexOf(searchString, arguments[1]);
	  }
	});

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	var $def = __webpack_require__(31);

	$def($def.P, 'String', {
	  // 21.1.3.13 String.prototype.repeat(count)
	  repeat: __webpack_require__(126)
	});

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var toInteger = __webpack_require__(44)
	  , defined   = __webpack_require__(42);

	module.exports = function repeat(count){
	  var str = String(defined(this))
	    , res = ''
	    , n   = toInteger(count);
	  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
	  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
	  return res;
	};

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
	'use strict';
	var $def        = __webpack_require__(31)
	  , toLength    = __webpack_require__(43)
	  , context     = __webpack_require__(121)
	  , STARTS_WITH = 'startsWith'
	  , $startsWith = ''[STARTS_WITH];

	$def($def.P + $def.F * __webpack_require__(123)(STARTS_WITH), 'String', {
	  startsWith: function startsWith(searchString /*, position = 0 */){
	    var that   = context(this, searchString, STARTS_WITH)
	      , index  = toLength(Math.min(arguments[1], that.length))
	      , search = String(searchString);
	    return $startsWith
	      ? $startsWith.call(that, search, index)
	      : that.slice(index, index + search.length) === search;
	  }
	});

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx         = __webpack_require__(38)
	  , $def        = __webpack_require__(31)
	  , toObject    = __webpack_require__(41)
	  , call        = __webpack_require__(129)
	  , isArrayIter = __webpack_require__(130)
	  , toLength    = __webpack_require__(43)
	  , getIterFn   = __webpack_require__(131);
	$def($def.S + $def.F * !__webpack_require__(132)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , mapfn   = arguments[1]
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, arguments[2], 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        result[index] = mapping ? mapfn(O[index], index) : O[index];
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(48);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators = __webpack_require__(117)
	  , ITERATOR  = __webpack_require__(46)('iterator');
	module.exports = function(it){
	  return (Iterators.Array || Array.prototype[ITERATOR]) === it;
	};

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(65)
	  , ITERATOR  = __webpack_require__(46)('iterator')
	  , Iterators = __webpack_require__(117);
	module.exports = __webpack_require__(32).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
	};

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	var SYMBOL_ITERATOR = __webpack_require__(46)('iterator')
	  , SAFE_CLOSING    = false;
	try {
	  var riter = [7][SYMBOL_ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	module.exports = function(exec){
	  if(!SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[SYMBOL_ITERATOR]();
	    iter.next = function(){ safe = true; };
	    arr[SYMBOL_ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $def = __webpack_require__(31);

	// WebKit Array.of isn't generic
	$def($def.S + $def.F * __webpack_require__(23)(function(){
	  function F(){}
	  return !(Array.of.call(F) instanceof F);
	}), 'Array', {
	  // 22.1.2.3 Array.of( ...items)
	  of: function of(/* ...args */){
	    var index  = 0
	      , length = arguments.length
	      , result = new (typeof this == 'function' ? this : Array)(length);
	    while(length > index)result[index] = arguments[index++];
	    result.length = length;
	    return result;
	  }
	});

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var setUnscope = __webpack_require__(135)
	  , step       = __webpack_require__(136)
	  , Iterators  = __webpack_require__(117)
	  , toIObject  = __webpack_require__(49);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	__webpack_require__(116)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	setUnscope('keys');
	setUnscope('values');
	setUnscope('entries');

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = __webpack_require__(46)('unscopables');
	if([][UNSCOPABLES] == undefined)__webpack_require__(33)(Array.prototype, UNSCOPABLES, {});
	module.exports = function(key){
	  [][UNSCOPABLES][key] = true;
	};

/***/ },
/* 136 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(138)(Array);

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $       = __webpack_require__(21)
	  , SPECIES = __webpack_require__(46)('species');
	module.exports = function(C){
	  if(__webpack_require__(22) && !(SPECIES in C))$.setDesc(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	'use strict';
	var $def = __webpack_require__(31);

	$def($def.P, 'Array', {copyWithin: __webpack_require__(140)});

	__webpack_require__(135)('copyWithin');

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	'use strict';
	var toObject = __webpack_require__(41)
	  , toIndex  = __webpack_require__(50)
	  , toLength = __webpack_require__(43);

	module.exports = [].copyWithin || function copyWithin(target/*= 0*/, start/*= 0, end = @length*/){
	  var O     = toObject(this)
	    , len   = toLength(O.length)
	    , to    = toIndex(target, len)
	    , from  = toIndex(start, len)
	    , end   = arguments[2]
	    , count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to)
	    , inc   = 1;
	  if(from < to && to < from + count){
	    inc  = -1;
	    from += count - 1;
	    to   += count - 1;
	  }
	  while(count-- > 0){
	    if(from in O)O[to] = O[from];
	    else delete O[to];
	    to   += inc;
	    from += inc;
	  } return O;
	};

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	var $def = __webpack_require__(31);

	$def($def.P, 'Array', {fill: __webpack_require__(142)});

	__webpack_require__(135)('fill');

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	'use strict';
	var toObject = __webpack_require__(41)
	  , toIndex  = __webpack_require__(50)
	  , toLength = __webpack_require__(43);
	module.exports = [].fill || function fill(value /*, start = 0, end = @length */){
	  var O      = toObject(this, true)
	    , length = toLength(O.length)
	    , index  = toIndex(arguments[1], length)
	    , end    = arguments[2]
	    , endPos = end === undefined ? length : toIndex(end, length);
	  while(endPos > index)O[index++] = value;
	  return O;
	};

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
	var KEY    = 'find'
	  , $def   = __webpack_require__(31)
	  , forced = true
	  , $find  = __webpack_require__(37)(5);
	// Shouldn't skip holes
	if(KEY in [])Array(1)[KEY](function(){ forced = false; });
	$def($def.P + $def.F * forced, 'Array', {
	  find: function find(callbackfn/*, that = undefined */){
	    return $find(this, callbackfn, arguments[1]);
	  }
	});
	__webpack_require__(135)(KEY);

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
	var KEY    = 'findIndex'
	  , $def   = __webpack_require__(31)
	  , forced = true
	  , $find  = __webpack_require__(37)(6);
	// Shouldn't skip holes
	if(KEY in [])Array(1)[KEY](function(){ forced = false; });
	$def($def.P + $def.F * forced, 'Array', {
	  findIndex: function findIndex(callbackfn/*, that = undefined */){
	    return $find(this, callbackfn, arguments[1]);
	  }
	});
	__webpack_require__(135)(KEY);

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(21)
	  , global   = __webpack_require__(26)
	  , isRegExp = __webpack_require__(122)
	  , $flags   = __webpack_require__(146)
	  , $RegExp  = global.RegExp
	  , Base     = $RegExp
	  , proto    = $RegExp.prototype
	  , re1      = /a/g
	  , re2      = /a/g
	  // "new" creates a new object, old webkit buggy here
	  , CORRECT_NEW = new $RegExp(re1) !== re1;

	if(__webpack_require__(22) && (!CORRECT_NEW || __webpack_require__(23)(function(){
	  re2[__webpack_require__(46)('match')] = false;
	  // RegExp constructor can alter flags and IsRegExp works correct with @@match
	  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
	}))){
	  $RegExp = function RegExp(p, f){
	    var piRE = isRegExp(p)
	      , fiU  = f === undefined;
	    return !(this instanceof $RegExp) && piRE && p.constructor === $RegExp && fiU ? p
	      : CORRECT_NEW
	        ? new Base(piRE && !fiU ? p.source : p, f)
	        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f);
	  };
	  $.each.call($.getNames(Base), function(key){
	    key in $RegExp || $.setDesc($RegExp, key, {
	      configurable: true,
	      get: function(){ return Base[key]; },
	      set: function(it){ Base[key] = it; }
	    });
	  });
	  proto.constructor = $RegExp;
	  $RegExp.prototype = proto;
	  __webpack_require__(34)(global, 'RegExp', $RegExp);
	}

	__webpack_require__(138)($RegExp);

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 21.2.5.3 get RegExp.prototype.flags
	var anObject = __webpack_require__(48);
	module.exports = function(){
	  var that   = anObject(this)
	    , result = '';
	  if(that.global)result += 'g';
	  if(that.ignoreCase)result += 'i';
	  if(that.multiline)result += 'm';
	  if(that.unicode)result += 'u';
	  if(that.sticky)result += 'y';
	  return result;
	};

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	// 21.2.5.3 get RegExp.prototype.flags()
	var $ = __webpack_require__(21);
	if(__webpack_require__(22) && /./g.flags != 'g')$.setDesc(RegExp.prototype, 'flags', {
	  configurable: true,
	  get: __webpack_require__(146)
	});

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	// @@match logic
	__webpack_require__(149)('match', 1, function(defined, MATCH){
	  // 21.1.3.11 String.prototype.match(regexp)
	  return function match(regexp){
	    'use strict';
	    var O  = defined(this)
	      , fn = regexp == undefined ? undefined : regexp[MATCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	  };
	});

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = function(KEY, length, exec){
	  var defined  = __webpack_require__(42)
	    , SYMBOL   = __webpack_require__(46)(KEY)
	    , original = ''[KEY];
	  if(__webpack_require__(23)(function(){
	    var O = {};
	    O[SYMBOL] = function(){ return 7; };
	    return ''[KEY](O) != 7;
	  })){
	    __webpack_require__(34)(String.prototype, KEY, exec(defined, SYMBOL, original));
	    __webpack_require__(33)(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function(string, arg){ return original.call(string, this, arg); }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function(string){ return original.call(string, this); }
	    );
	  }
	};

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	// @@replace logic
	__webpack_require__(149)('replace', 2, function(defined, REPLACE, $replace){
	  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
	  return function replace(searchValue, replaceValue){
	    'use strict';
	    var O  = defined(this)
	      , fn = searchValue == undefined ? undefined : searchValue[REPLACE];
	    return fn !== undefined
	      ? fn.call(searchValue, O, replaceValue)
	      : $replace.call(String(O), searchValue, replaceValue);
	  };
	});

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	// @@search logic
	__webpack_require__(149)('search', 1, function(defined, SEARCH){
	  // 21.1.3.15 String.prototype.search(regexp)
	  return function search(regexp){
	    'use strict';
	    var O  = defined(this)
	      , fn = regexp == undefined ? undefined : regexp[SEARCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
	  };
	});

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	// @@split logic
	__webpack_require__(149)('split', 2, function(defined, SPLIT, $split){
	  // 21.1.3.17 String.prototype.split(separator, limit)
	  return function split(separator, limit){
	    'use strict';
	    var O  = defined(this)
	      , fn = separator == undefined ? undefined : separator[SPLIT];
	    return fn !== undefined
	      ? fn.call(separator, O, limit)
	      : $split.call(String(O), separator, limit);
	  };
	});

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $          = __webpack_require__(21)
	  , LIBRARY    = __webpack_require__(57)
	  , global     = __webpack_require__(26)
	  , ctx        = __webpack_require__(38)
	  , classof    = __webpack_require__(65)
	  , $def       = __webpack_require__(31)
	  , isObject   = __webpack_require__(28)
	  , anObject   = __webpack_require__(48)
	  , aFunction  = __webpack_require__(39)
	  , strictNew  = __webpack_require__(154)
	  , forOf      = __webpack_require__(155)
	  , setProto   = __webpack_require__(63).set
	  , same       = __webpack_require__(61)
	  , species    = __webpack_require__(138)
	  , SPECIES    = __webpack_require__(46)('species')
	  , RECORD     = __webpack_require__(35)('record')
	  , asap       = __webpack_require__(156)
	  , PROMISE    = 'Promise'
	  , process    = global.process
	  , isNode     = classof(process) == 'process'
	  , P          = global[PROMISE]
	  , Wrapper;

	var testResolve = function(sub){
	  var test = new P(function(){});
	  if(sub)test.constructor = Object;
	  return P.resolve(test) === test;
	};

	var useNative = function(){
	  var works = false;
	  function P2(x){
	    var self = new P(x);
	    setProto(self, P2.prototype);
	    return self;
	  }
	  try {
	    works = P && P.resolve && testResolve();
	    setProto(P2, P);
	    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
	    // actual Firefox has broken subclass support, test that
	    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
	      works = false;
	    }
	    // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
	    if(works && __webpack_require__(22)){
	      var thenableThenGotten = false;
	      P.resolve($.setDesc({}, 'then', {
	        get: function(){ thenableThenGotten = true; }
	      }));
	      works = thenableThenGotten;
	    }
	  } catch(e){ works = false; }
	  return works;
	}();

	// helpers
	var isPromise = function(it){
	  return isObject(it) && (useNative ? classof(it) == 'Promise' : RECORD in it);
	};
	var sameConstructor = function(a, b){
	  // library wrapper special case
	  if(LIBRARY && a === P && b === Wrapper)return true;
	  return same(a, b);
	};
	var getConstructor = function(C){
	  var S = anObject(C)[SPECIES];
	  return S != undefined ? S : C;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var notify = function(record, isReject){
	  if(record.n)return;
	  record.n = true;
	  var chain = record.c;
	  asap(function(){
	    var value = record.v
	      , ok    = record.s == 1
	      , i     = 0;
	    var run = function(react){
	      var cb = ok ? react.ok : react.fail
	        , ret, then;
	      try {
	        if(cb){
	          if(!ok)record.h = true;
	          ret = cb === true ? value : cb(value);
	          if(ret === react.P){
	            react.rej(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(ret)){
	            then.call(ret, react.res, react.rej);
	          } else react.res(ret);
	        } else react.rej(value);
	      } catch(err){
	        react.rej(err);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    chain.length = 0;
	    record.n = false;
	    if(isReject)setTimeout(function(){
	      var promise = record.p
	        , handler, console;
	      if(isUnhandled(promise)){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      } record.a = undefined;
	    }, 1);
	  });
	};
	var isUnhandled = function(promise){
	  var record = promise[RECORD]
	    , chain  = record.a || record.c
	    , i      = 0
	    , react;
	  if(record.h)return false;
	  while(chain.length > i){
	    react = chain[i++];
	    if(react.fail || !isUnhandled(react.P))return false;
	  } return true;
	};
	var $reject = function(value){
	  var record = this;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  record.v = value;
	  record.s = 2;
	  record.a = record.c.slice();
	  notify(record, true);
	};
	var $resolve = function(value){
	  var record = this
	    , then;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  try {
	    if(then = isThenable(value)){
	      asap(function(){
	        var wrapper = {r: record, d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      record.v = value;
	      record.s = 1;
	      notify(record, false);
	    }
	  } catch(e){
	    $reject.call({r: record, d: false}, e); // wrap
	  }
	};

	// constructor polyfill
	if(!useNative){
	  // 25.4.3.1 Promise(executor)
	  P = function Promise(executor){
	    aFunction(executor);
	    var record = {
	      p: strictNew(this, P, PROMISE),         // <- promise
	      c: [],                                  // <- awaiting reactions
	      a: undefined,                           // <- checked in isUnhandled reactions
	      s: 0,                                   // <- state
	      d: false,                               // <- done
	      v: undefined,                           // <- value
	      h: false,                               // <- handled rejection
	      n: false                                // <- notify
	    };
	    this[RECORD] = record;
	    try {
	      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
	    } catch(err){
	      $reject.call(record, err);
	    }
	  };
	  __webpack_require__(158)(P.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var S = anObject(anObject(this).constructor)[SPECIES];
	      var react = {
	        ok:   typeof onFulfilled == 'function' ? onFulfilled : true,
	        fail: typeof onRejected == 'function'  ? onRejected  : false
	      };
	      var promise = react.P = new (S != undefined ? S : P)(function(res, rej){
	        react.res = res;
	        react.rej = rej;
	      });
	      aFunction(react.res);
	      aFunction(react.rej);
	      var record = this[RECORD];
	      record.c.push(react);
	      if(record.a)record.a.push(react);
	      if(record.s)notify(record, false);
	      return promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	}

	// export
	$def($def.G + $def.W + $def.F * !useNative, {Promise: P});
	__webpack_require__(53)(P, PROMISE);
	species(P);
	species(Wrapper = __webpack_require__(32)[PROMISE]);

	// statics
	$def($def.S + $def.F * !useNative, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    return new this(function(res, rej){ rej(r); });
	  }
	});
	$def($def.S + $def.F * (!useNative || testResolve(true)), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    return isPromise(x) && sameConstructor(x.constructor, this)
	      ? x : new this(function(res){ res(x); });
	  }
	});
	$def($def.S + $def.F * !(useNative && __webpack_require__(132)(function(iter){
	  P.all(iter)['catch'](function(){});
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C      = getConstructor(this)
	      , values = [];
	    return new C(function(res, rej){
	      forOf(iterable, false, values.push, values);
	      var remaining = values.length
	        , results   = Array(remaining);
	      if(remaining)$.each.call(values, function(promise, index){
	        C.resolve(promise).then(function(value){
	          results[index] = value;
	          --remaining || res(results);
	        }, rej);
	      });
	      else res(results);
	    });
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C = getConstructor(this);
	    return new C(function(res, rej){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(res, rej);
	      });
	    });
	  }
	});

/***/ },
/* 154 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name){
	  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
	  return it;
	};

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(38)
	  , call        = __webpack_require__(129)
	  , isArrayIter = __webpack_require__(130)
	  , anObject    = __webpack_require__(48)
	  , toLength    = __webpack_require__(43)
	  , getIterFn   = __webpack_require__(131);
	module.exports = function(iterable, entries, fn, that){
	  var iterFn = getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    call(iterator, f, step.value, entries);
	  }
	};

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(26)
	  , macrotask = __webpack_require__(157).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , isNode    = __webpack_require__(30)(process) == 'process'
	  , head, last, notify;

	var flush = function(){
	  var parent, domain;
	  if(isNode && (parent = process.domain)){
	    process.domain = null;
	    parent.exit();
	  }
	  while(head){
	    domain = head.domain;
	    if(domain)domain.enter();
	    head.fn.call(); // <- currently we use it only for Promise - try / catch not required
	    if(domain)domain.exit();
	    head = head.next;
	  } last = undefined;
	  if(parent)parent.enter();
	}

	// Node.js
	if(isNode){
	  notify = function(){
	    process.nextTick(flush);
	  };
	// browsers with MutationObserver
	} else if(Observer){
	  var toggle = 1
	    , node   = document.createTextNode('');
	  new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	  notify = function(){
	    node.data = toggle = -toggle;
	  };
	// for other environments - macrotask based on:
	// - setImmediate
	// - MessageChannel
	// - window.postMessag
	// - onreadystatechange
	// - setTimeout
	} else {
	  notify = function(){
	    // strange IE + webpack dev server bug - use .call(global)
	    macrotask.call(global, flush);
	  };
	}

	module.exports = function asap(fn){
	  var task = {fn: fn, next: undefined, domain: isNode && process.domain};
	  if(last)last.next = task;
	  if(!head){
	    head = task;
	    notify();
	  } last = task;
	};

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx                = __webpack_require__(38)
	  , invoke             = __webpack_require__(36)
	  , html               = __webpack_require__(25)
	  , cel                = __webpack_require__(27)
	  , global             = __webpack_require__(26)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listner = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(30)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listner;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listner, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	var $redef = __webpack_require__(34);
	module.exports = function(target, src){
	  for(var key in src)$redef(target, key, src[key]);
	  return target;
	};

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(160);

	// 23.1 Map Objects
	__webpack_require__(161)('Map', function(get){
	  return function Map(){ return get(this, arguments[0]); };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key){
	    var entry = strong.getEntry(this, key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value){
	    return strong.def(this, key === 0 ? 0 : key, value);
	  }
	}, strong, true);

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $            = __webpack_require__(21)
	  , hide         = __webpack_require__(33)
	  , ctx          = __webpack_require__(38)
	  , species      = __webpack_require__(138)
	  , strictNew    = __webpack_require__(154)
	  , defined      = __webpack_require__(42)
	  , forOf        = __webpack_require__(155)
	  , step         = __webpack_require__(136)
	  , ID           = __webpack_require__(35)('id')
	  , $has         = __webpack_require__(29)
	  , isObject     = __webpack_require__(28)
	  , isExtensible = Object.isExtensible || isObject
	  , SUPPORT_DESC = __webpack_require__(22)
	  , SIZE         = SUPPORT_DESC ? '_s' : 'size'
	  , id           = 0;

	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!$has(it, ID)){
	    // can't set id to frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add id
	    if(!create)return 'E';
	    // add missing object id
	    hide(it, ID, ++id);
	  // return object id with prefix
	  } return 'O' + it[ID];
	};

	var getEntry = function(that, key){
	  // fast case
	  var index = fastKey(key), entry;
	  if(index !== 'F')return that._i[index];
	  // frozen object case
	  for(entry = that._f; entry; entry = entry.n){
	    if(entry.k == key)return entry;
	  }
	};

	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      strictNew(that, C, NAME);
	      that._i = $.create(null); // index
	      that._f = undefined;      // first entry
	      that._l = undefined;      // last entry
	      that[SIZE] = 0;           // size
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    __webpack_require__(158)(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear(){
	        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
	          entry.r = true;
	          if(entry.p)entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function(key){
	        var that  = this
	          , entry = getEntry(that, key);
	        if(entry){
	          var next = entry.n
	            , prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if(prev)prev.n = next;
	          if(next)next.p = prev;
	          if(that._f == entry)that._f = next;
	          if(that._l == entry)that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */){
	        var f = ctx(callbackfn, arguments[1], 3)
	          , entry;
	        while(entry = entry ? entry.n : this._f){
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while(entry && entry.r)entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key){
	        return !!getEntry(this, key);
	      }
	    });
	    if(SUPPORT_DESC)$.setDesc(C.prototype, 'size', {
	      get: function(){
	        return defined(this[SIZE]);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var entry = getEntry(that, key)
	      , prev, index;
	    // change existing entry
	    if(entry){
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if(!that._f)that._f = entry;
	      if(prev)prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if(index !== 'F')that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function(C, NAME, IS_MAP){
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    __webpack_require__(116)(C, NAME, function(iterated, kind){
	      this._t = iterated;  // target
	      this._k = kind;      // kind
	      this._l = undefined; // previous
	    }, function(){
	      var that  = this
	        , kind  = that._k
	        , entry = that._l;
	      // revert to the last existing entry
	      while(entry && entry.r)entry = entry.p;
	      // get next entry
	      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if(kind == 'keys'  )return step(0, entry.k);
	      if(kind == 'values')return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    species(C);
	    species(__webpack_require__(32)[NAME]); // for wrapper
	  }
	};

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global     = __webpack_require__(26)
	  , $def       = __webpack_require__(31)
	  , forOf      = __webpack_require__(155)
	  , strictNew  = __webpack_require__(154);

	module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
	  var Base  = global[NAME]
	    , C     = Base
	    , ADDER = IS_MAP ? 'set' : 'add'
	    , proto = C && C.prototype
	    , O     = {};
	  var fixMethod = function(KEY){
	    var fn = proto[KEY];
	    __webpack_require__(34)(proto, KEY,
	      KEY == 'delete' ? function(a){ return fn.call(this, a === 0 ? 0 : a); }
	      : KEY == 'has' ? function has(a){ return fn.call(this, a === 0 ? 0 : a); }
	      : KEY == 'get' ? function get(a){ return fn.call(this, a === 0 ? 0 : a); }
	      : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
	      : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
	    );
	  };
	  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !__webpack_require__(23)(function(){
	    new C().entries().next();
	  }))){
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    __webpack_require__(158)(C.prototype, methods);
	  } else {
	    var inst  = new C
	      , chain = inst[ADDER](IS_WEAK ? {} : -0, 1)
	      , buggyZero;
	    // wrap for init collections from iterable
	    if(!__webpack_require__(132)(function(iter){ new C(iter); })){ // eslint-disable-line no-new
	      C = wrapper(function(target, iterable){
	        strictNew(target, C, NAME);
	        var that = new Base;
	        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	        return that;
	      });
	      C.prototype = proto;
	      proto.constructor = C;
	    }
	    IS_WEAK || inst.forEach(function(val, key){
	      buggyZero = 1 / key === -Infinity;
	    });
	    // fix converting -0 key to +0
	    if(buggyZero){
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }
	    // + fix .add & .set for chaining
	    if(buggyZero || chain !== inst)fixMethod(ADDER);
	    // weak collections should not contains .clear method
	    if(IS_WEAK && proto.clear)delete proto.clear;
	  }

	  __webpack_require__(53)(C, NAME);

	  O[NAME] = C;
	  $def($def.G + $def.W + $def.F * (C != Base), O);

	  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

	  return C;
	};

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(160);

	// 23.2 Set Objects
	__webpack_require__(161)('Set', function(get){
	  return function Set(){ return get(this, arguments[0]); };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value){
	    return strong.def(this, value = value === 0 ? 0 : value, value);
	  }
	}, strong);

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $            = __webpack_require__(21)
	  , weak         = __webpack_require__(164)
	  , isObject     = __webpack_require__(28)
	  , has          = __webpack_require__(29)
	  , frozenStore  = weak.frozenStore
	  , WEAK         = weak.WEAK
	  , isExtensible = Object.isExtensible || isObject
	  , tmp          = {};

	// 23.3 WeakMap Objects
	var $WeakMap = __webpack_require__(161)('WeakMap', function(get){
	  return function WeakMap(){ return get(this, arguments[0]); };
	}, {
	  // 23.3.3.3 WeakMap.prototype.get(key)
	  get: function get(key){
	    if(isObject(key)){
	      if(!isExtensible(key))return frozenStore(this).get(key);
	      if(has(key, WEAK))return key[WEAK][this._i];
	    }
	  },
	  // 23.3.3.5 WeakMap.prototype.set(key, value)
	  set: function set(key, value){
	    return weak.def(this, key, value);
	  }
	}, weak, true, true);

	// IE11 WeakMap frozen keys fix
	if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
	  $.each.call(['delete', 'has', 'get', 'set'], function(key){
	    var proto  = $WeakMap.prototype
	      , method = proto[key];
	    __webpack_require__(34)(proto, key, function(a, b){
	      // store frozen objects on leaky map
	      if(isObject(a) && !isExtensible(a)){
	        var result = frozenStore(this)[key](a, b);
	        return key == 'set' ? this : result;
	      // store all the rest on native weakmap
	      } return method.call(this, a, b);
	    });
	  });
	}

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var hide         = __webpack_require__(33)
	  , anObject     = __webpack_require__(48)
	  , strictNew    = __webpack_require__(154)
	  , forOf        = __webpack_require__(155)
	  , method       = __webpack_require__(37)
	  , WEAK         = __webpack_require__(35)('weak')
	  , isObject     = __webpack_require__(28)
	  , $has         = __webpack_require__(29)
	  , isExtensible = Object.isExtensible || isObject
	  , find         = method(5)
	  , findIndex    = method(6)
	  , id           = 0;

	// fallback for frozen keys
	var frozenStore = function(that){
	  return that._l || (that._l = new FrozenStore);
	};
	var FrozenStore = function(){
	  this.a = [];
	};
	var findFrozen = function(store, key){
	  return find(store.a, function(it){
	    return it[0] === key;
	  });
	};
	FrozenStore.prototype = {
	  get: function(key){
	    var entry = findFrozen(this, key);
	    if(entry)return entry[1];
	  },
	  has: function(key){
	    return !!findFrozen(this, key);
	  },
	  set: function(key, value){
	    var entry = findFrozen(this, key);
	    if(entry)entry[1] = value;
	    else this.a.push([key, value]);
	  },
	  'delete': function(key){
	    var index = findIndex(this.a, function(it){
	      return it[0] === key;
	    });
	    if(~index)this.a.splice(index, 1);
	    return !!~index;
	  }
	};

	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      strictNew(that, C, NAME);
	      that._i = id++;      // collection id
	      that._l = undefined; // leak store for frozen objects
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    __webpack_require__(158)(C.prototype, {
	      // 23.3.3.2 WeakMap.prototype.delete(key)
	      // 23.4.3.3 WeakSet.prototype.delete(value)
	      'delete': function(key){
	        if(!isObject(key))return false;
	        if(!isExtensible(key))return frozenStore(this)['delete'](key);
	        return $has(key, WEAK) && $has(key[WEAK], this._i) && delete key[WEAK][this._i];
	      },
	      // 23.3.3.4 WeakMap.prototype.has(key)
	      // 23.4.3.4 WeakSet.prototype.has(value)
	      has: function has(key){
	        if(!isObject(key))return false;
	        if(!isExtensible(key))return frozenStore(this).has(key);
	        return $has(key, WEAK) && $has(key[WEAK], this._i);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    if(!isExtensible(anObject(key))){
	      frozenStore(that).set(key, value);
	    } else {
	      $has(key, WEAK) || hide(key, WEAK, {});
	      key[WEAK][that._i] = value;
	    } return that;
	  },
	  frozenStore: frozenStore,
	  WEAK: WEAK
	};

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var weak = __webpack_require__(164);

	// 23.4 WeakSet Objects
	__webpack_require__(161)('WeakSet', function(get){
	  return function WeakSet(){ return get(this, arguments[0]); };
	}, {
	  // 23.4.3.1 WeakSet.prototype.add(value)
	  add: function add(value){
	    return weak.def(this, value, true);
	  }
	}, weak, false, true);

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
	var $def   = __webpack_require__(31)
	  , _apply = Function.apply;

	$def($def.S, 'Reflect', {
	  apply: function apply(target, thisArgument, argumentsList){
	    return _apply.call(target, thisArgument, argumentsList);
	  }
	});

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
	var $         = __webpack_require__(21)
	  , $def      = __webpack_require__(31)
	  , aFunction = __webpack_require__(39)
	  , anObject  = __webpack_require__(48)
	  , isObject  = __webpack_require__(28)
	  , bind      = Function.bind || __webpack_require__(32).Function.prototype.bind;

	// MS Edge supports only 2 arguments
	// FF Nightly sets third argument as `new.target`, but does not create `this` from it
	$def($def.S + $def.F * __webpack_require__(23)(function(){
	  function F(){}
	  return !(Reflect.construct(function(){}, [], F) instanceof F);
	}), 'Reflect', {
	  construct: function construct(Target, args /*, newTarget*/){
	    aFunction(Target);
	    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
	    if(Target == newTarget){
	      // w/o altered newTarget, optimization for 0-4 arguments
	      if(args != undefined)switch(anObject(args).length){
	        case 0: return new Target;
	        case 1: return new Target(args[0]);
	        case 2: return new Target(args[0], args[1]);
	        case 3: return new Target(args[0], args[1], args[2]);
	        case 4: return new Target(args[0], args[1], args[2], args[3]);
	      }
	      // w/o altered newTarget, lot of arguments case
	      var $args = [null];
	      $args.push.apply($args, args);
	      return new (bind.apply(Target, $args));
	    }
	    // with altered newTarget, not support built-in constructors
	    var proto    = newTarget.prototype
	      , instance = $.create(isObject(proto) ? proto : Object.prototype)
	      , result   = Function.apply.call(Target, instance, args);
	    return isObject(result) ? result : instance;
	  }
	});

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
	var $        = __webpack_require__(21)
	  , $def     = __webpack_require__(31)
	  , anObject = __webpack_require__(48);

	// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
	$def($def.S + $def.F * __webpack_require__(23)(function(){
	  Reflect.defineProperty($.setDesc({}, 1, {value: 1}), 1, {value: 2});
	}), 'Reflect', {
	  defineProperty: function defineProperty(target, propertyKey, attributes){
	    anObject(target);
	    try {
	      $.setDesc(target, propertyKey, attributes);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.4 Reflect.deleteProperty(target, propertyKey)
	var $def     = __webpack_require__(31)
	  , getDesc  = __webpack_require__(21).getDesc
	  , anObject = __webpack_require__(48);

	$def($def.S, 'Reflect', {
	  deleteProperty: function deleteProperty(target, propertyKey){
	    var desc = getDesc(anObject(target), propertyKey);
	    return desc && !desc.configurable ? false : delete target[propertyKey];
	  }
	});

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 26.1.5 Reflect.enumerate(target)
	var $def     = __webpack_require__(31)
	  , anObject = __webpack_require__(48);
	var Enumerate = function(iterated){
	  this._t = anObject(iterated); // target
	  this._i = 0;                  // next index
	  var keys = this._k = []       // keys
	    , key;
	  for(key in iterated)keys.push(key);
	};
	__webpack_require__(118)(Enumerate, 'Object', function(){
	  var that = this
	    , keys = that._k
	    , key;
	  do {
	    if(that._i >= keys.length)return {value: undefined, done: true};
	  } while(!((key = keys[that._i++]) in that._t));
	  return {value: key, done: false};
	});

	$def($def.S, 'Reflect', {
	  enumerate: function enumerate(target){
	    return new Enumerate(target);
	  }
	});

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.6 Reflect.get(target, propertyKey [, receiver])
	var $        = __webpack_require__(21)
	  , has      = __webpack_require__(29)
	  , $def     = __webpack_require__(31)
	  , isObject = __webpack_require__(28)
	  , anObject = __webpack_require__(48);

	function get(target, propertyKey/*, receiver*/){
	  var receiver = arguments.length < 3 ? target : arguments[2]
	    , desc, proto;
	  if(anObject(target) === receiver)return target[propertyKey];
	  if(desc = $.getDesc(target, propertyKey))return has(desc, 'value')
	    ? desc.value
	    : desc.get !== undefined
	      ? desc.get.call(receiver)
	      : undefined;
	  if(isObject(proto = $.getProto(target)))return get(proto, propertyKey, receiver);
	}

	$def($def.S, 'Reflect', {get: get});

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
	var $        = __webpack_require__(21)
	  , $def     = __webpack_require__(31)
	  , anObject = __webpack_require__(48);

	$def($def.S, 'Reflect', {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
	    return $.getDesc(anObject(target), propertyKey);
	  }
	});

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.8 Reflect.getPrototypeOf(target)
	var $def     = __webpack_require__(31)
	  , getProto = __webpack_require__(21).getProto
	  , anObject = __webpack_require__(48);

	$def($def.S, 'Reflect', {
	  getPrototypeOf: function getPrototypeOf(target){
	    return getProto(anObject(target));
	  }
	});

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.9 Reflect.has(target, propertyKey)
	var $def = __webpack_require__(31);

	$def($def.S, 'Reflect', {
	  has: function has(target, propertyKey){
	    return propertyKey in target;
	  }
	});

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.10 Reflect.isExtensible(target)
	var $def          = __webpack_require__(31)
	  , anObject      = __webpack_require__(48)
	  , $isExtensible = Object.isExtensible;

	$def($def.S, 'Reflect', {
	  isExtensible: function isExtensible(target){
	    anObject(target);
	    return $isExtensible ? $isExtensible(target) : true;
	  }
	});

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.11 Reflect.ownKeys(target)
	var $def = __webpack_require__(31);

	$def($def.S, 'Reflect', {ownKeys: __webpack_require__(177)});

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	// all object keys, includes non-enumerable and symbols
	var $        = __webpack_require__(21)
	  , anObject = __webpack_require__(48)
	  , Reflect  = __webpack_require__(26).Reflect;
	module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
	  var keys       = $.getNames(anObject(it))
	    , getSymbols = $.getSymbols;
	  return getSymbols ? keys.concat(getSymbols(it)) : keys;
	};

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.12 Reflect.preventExtensions(target)
	var $def               = __webpack_require__(31)
	  , anObject           = __webpack_require__(48)
	  , $preventExtensions = Object.preventExtensions;

	$def($def.S, 'Reflect', {
	  preventExtensions: function preventExtensions(target){
	    anObject(target);
	    try {
	      if($preventExtensions)$preventExtensions(target);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
	var $          = __webpack_require__(21)
	  , has        = __webpack_require__(29)
	  , $def       = __webpack_require__(31)
	  , createDesc = __webpack_require__(24)
	  , anObject   = __webpack_require__(48)
	  , isObject   = __webpack_require__(28);

	function set(target, propertyKey, V/*, receiver*/){
	  var receiver = arguments.length < 4 ? target : arguments[3]
	    , ownDesc  = $.getDesc(anObject(target), propertyKey)
	    , existingDescriptor, proto;
	  if(!ownDesc){
	    if(isObject(proto = $.getProto(target))){
	      return set(proto, propertyKey, V, receiver);
	    }
	    ownDesc = createDesc(0);
	  }
	  if(has(ownDesc, 'value')){
	    if(ownDesc.writable === false || !isObject(receiver))return false;
	    existingDescriptor = $.getDesc(receiver, propertyKey) || createDesc(0);
	    existingDescriptor.value = V;
	    $.setDesc(receiver, propertyKey, existingDescriptor);
	    return true;
	  }
	  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
	}

	$def($def.S, 'Reflect', {set: set});

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.14 Reflect.setPrototypeOf(target, proto)
	var $def     = __webpack_require__(31)
	  , setProto = __webpack_require__(63);

	if(setProto)$def($def.S, 'Reflect', {
	  setPrototypeOf: function setPrototypeOf(target, proto){
	    setProto.check(target, proto);
	    try {
	      setProto.set(target, proto);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $def      = __webpack_require__(31)
	  , $includes = __webpack_require__(51)(true);
	$def($def.P, 'Array', {
	  // https://github.com/domenic/Array.prototype.includes
	  includes: function includes(el /*, fromIndex = 0 */){
	    return $includes(this, el, arguments[1]);
	  }
	});
	__webpack_require__(135)('includes');

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/mathiasbynens/String.prototype.at
	'use strict';
	var $def = __webpack_require__(31)
	  , $at  = __webpack_require__(115)(true);
	$def($def.P, 'String', {
	  at: function at(pos){
	    return $at(this, pos);
	  }
	});

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $def = __webpack_require__(31)
	  , $pad = __webpack_require__(184);
	$def($def.P, 'String', {
	  padLeft: function padLeft(maxLength /*, fillString = ' ' */){
	    return $pad(this, maxLength, arguments[1], true);
	  }
	});

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/ljharb/proposal-string-pad-left-right
	var toLength = __webpack_require__(43)
	  , repeat   = __webpack_require__(126)
	  , defined  = __webpack_require__(42);

	module.exports = function(that, maxLength, fillString, left){
	  var S            = String(defined(that))
	    , stringLength = S.length
	    , fillStr      = fillString === undefined ? ' ' : String(fillString)
	    , intMaxLength = toLength(maxLength);
	  if(intMaxLength <= stringLength)return S;
	  if(fillStr == '')fillStr = ' ';
	  var fillLen = intMaxLength - stringLength
	    , stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
	  if(stringFiller.length > fillLen)stringFiller = stringFiller.slice(0, fillLen);
	  return left ? stringFiller + S : S + stringFiller;
	};

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $def = __webpack_require__(31)
	  , $pad = __webpack_require__(184);
	$def($def.P, 'String', {
	  padRight: function padRight(maxLength /*, fillString = ' ' */){
	    return $pad(this, maxLength, arguments[1], false);
	  }
	});

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
	__webpack_require__(113)('trimLeft', function($trim){
	  return function trimLeft(){
	    return $trim(this, 1);
	  };
	});

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
	__webpack_require__(113)('trimRight', function($trim){
	  return function trimRight(){
	    return $trim(this, 2);
	  };
	});

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/benjamingr/RexExp.escape
	var $def = __webpack_require__(31)
	  , $re  = __webpack_require__(189)(/[\\^$*+?.()|[\]{}]/g, '\\$&');
	$def($def.S, 'RegExp', {escape: function escape(it){ return $re(it); }});


/***/ },
/* 189 */
/***/ function(module, exports) {

	module.exports = function(regExp, replace){
	  var replacer = replace === Object(replace) ? function(part){
	    return replace[part];
	  } : replace;
	  return function(it){
	    return String(it).replace(regExp, replacer);
	  };
	};

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	// https://gist.github.com/WebReflection/9353781
	var $          = __webpack_require__(21)
	  , $def       = __webpack_require__(31)
	  , ownKeys    = __webpack_require__(177)
	  , toIObject  = __webpack_require__(49)
	  , createDesc = __webpack_require__(24);

	$def($def.S, 'Object', {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
	    var O       = toIObject(object)
	      , setDesc = $.setDesc
	      , getDesc = $.getDesc
	      , keys    = ownKeys(O)
	      , result  = {}
	      , i       = 0
	      , key, D;
	    while(keys.length > i){
	      D = getDesc(O, key = keys[i++]);
	      if(key in result)setDesc(result, key, createDesc(0, D));
	      else result[key] = D;
	    } return result;
	  }
	});

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	// http://goo.gl/XkBrjD
	var $def    = __webpack_require__(31)
	  , $values = __webpack_require__(192)(false);

	$def($def.S, 'Object', {
	  values: function values(it){
	    return $values(it);
	  }
	});

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	var $         = __webpack_require__(21)
	  , has       = __webpack_require__(29)
	  , toIObject = __webpack_require__(49);
	module.exports = function(isEntries){
	  return function(it){
	    var O      = toIObject(it)
	      , keys   = $.getKeys(O)
	      , length = keys.length
	      , i      = 0
	      , result = []
	      , key;
	    while(length > i)has(O, key = keys[i++]) && result.push(isEntries ? [key, O[key]] : O[key]);
	    return result;
	  };
	};

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	// http://goo.gl/XkBrjD
	var $def     = __webpack_require__(31)
	  , $entries = __webpack_require__(192)(true);

	$def($def.S, 'Object', {
	  entries: function entries(it){
	    return $entries(it);
	  }
	});

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $def  = __webpack_require__(31);

	$def($def.P, 'Map', {toJSON: __webpack_require__(195)('Map')});

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var forOf   = __webpack_require__(155)
	  , classof = __webpack_require__(65);
	module.exports = function(NAME){
	  return function toJSON(){
	    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
	    var arr = [];
	    forOf(this, false, arr.push, arr);
	    return arr;
	  };
	};

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $def  = __webpack_require__(31);

	$def($def.P, 'Set', {toJSON: __webpack_require__(195)('Set')});

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	// JavaScript 1.6 / Strawman array statics shim
	var $       = __webpack_require__(21)
	  , $def    = __webpack_require__(31)
	  , $Array  = __webpack_require__(32).Array || Array
	  , statics = {};
	var setStatics = function(keys, length){
	  $.each.call(keys.split(','), function(key){
	    if(length == undefined && key in $Array)statics[key] = $Array[key];
	    else if(key in [])statics[key] = __webpack_require__(38)(Function.call, [][key], length);
	  });
	};
	setStatics('pop,reverse,shift,keys,values,entries', 1);
	setStatics('indexOf,every,some,forEach,map,filter,find,findIndex,includes', 3);
	setStatics('join,slice,concat,push,splice,unshift,sort,lastIndexOf,' +
	           'reduce,reduceRight,copyWithin,fill');
	$def($def.S, 'Array', statics);

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	// ie9- setTimeout & setInterval additional parameters fix
	var global     = __webpack_require__(26)
	  , $def       = __webpack_require__(31)
	  , invoke     = __webpack_require__(36)
	  , partial    = __webpack_require__(199)
	  , navigator  = global.navigator
	  , MSIE       = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
	var wrap = function(set){
	  return MSIE ? function(fn, time /*, ...args */){
	    return set(invoke(
	      partial,
	      [].slice.call(arguments, 2),
	      typeof fn == 'function' ? fn : Function(fn)
	    ), time);
	  } : set;
	};
	$def($def.G + $def.B + $def.F * MSIE, {
	  setTimeout:  wrap(global.setTimeout),
	  setInterval: wrap(global.setInterval)
	});

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var path      = __webpack_require__(200)
	  , invoke    = __webpack_require__(36)
	  , aFunction = __webpack_require__(39);
	module.exports = function(/* ...pargs */){
	  var fn     = aFunction(this)
	    , length = arguments.length
	    , pargs  = Array(length)
	    , i      = 0
	    , _      = path._
	    , holder = false;
	  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
	  return function(/* ...args */){
	    var that    = this
	      , _length = arguments.length
	      , j = 0, k = 0, args;
	    if(!holder && !_length)return invoke(fn, pargs, that);
	    args = pargs.slice();
	    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = arguments[k++];
	    while(_length > k)args.push(arguments[k++]);
	    return invoke(fn, args, that);
	  };
	};

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(26);

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	var $def  = __webpack_require__(31)
	  , $task = __webpack_require__(157);
	$def($def.G + $def.B, {
	  setImmediate:   $task.set,
	  clearImmediate: $task.clear
	});

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(134);
	var global      = __webpack_require__(26)
	  , hide        = __webpack_require__(33)
	  , Iterators   = __webpack_require__(117)
	  , ITERATOR    = __webpack_require__(46)('iterator')
	  , NL          = global.NodeList
	  , HTC         = global.HTMLCollection
	  , NLProto     = NL && NL.prototype
	  , HTCProto    = HTC && HTC.prototype
	  , ArrayValues = Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;
	if(NL && !(ITERATOR in NLProto))hide(NLProto, ITERATOR, ArrayValues);
	if(HTC && !(ITERATOR in HTCProto))hide(HTCProto, ITERATOR, ArrayValues);

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */

	!(function(global) {
	  "use strict";

	  var hasOwn = Object.prototype.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var iteratorSymbol =
	    typeof Symbol === "function" && Symbol.iterator || "@@iterator";

	  var inModule = typeof module === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }

	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided, then outerFn.prototype instanceof Generator.
	    var generator = Object.create((outerFn || Generator).prototype);

	    generator._invoke = makeInvokeMethod(
	      innerFn, self || null,
	      new Context(tryLocsList || [])
	    );

	    return generator;
	  }
	  runtime.wrap = wrap;

	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }

	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";

	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};

	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}

	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunction.displayName = "GeneratorFunction";

	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }

	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };

	  runtime.mark = function(genFun) {
	    genFun.__proto__ = GeneratorFunctionPrototype;
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };

	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `value instanceof AwaitArgument` to determine if the yielded value is
	  // meant to be awaited. Some may consider the name of this method too
	  // cutesy, but they are curmudgeons.
	  runtime.awrap = function(arg) {
	    return new AwaitArgument(arg);
	  };

	  function AwaitArgument(arg) {
	    this.arg = arg;
	  }

	  function AsyncIterator(generator) {
	    // This invoke function is written in a style that assumes some
	    // calling function (or Promise) will handle exceptions.
	    function invoke(method, arg) {
	      var result = generator[method](arg);
	      var value = result.value;
	      return value instanceof AwaitArgument
	        ? Promise.resolve(value.arg).then(invokeNext, invokeThrow)
	        : Promise.resolve(value).then(function(unwrapped) {
	            // When a yielded Promise is resolved, its final value becomes
	            // the .value of the Promise<{value,done}> result for the
	            // current iteration. If the Promise is rejected, however, the
	            // result for this iteration will be rejected with the same
	            // reason. Note that rejections of yielded Promises are not
	            // thrown back into the generator function, as is the case
	            // when an awaited Promise is rejected. This difference in
	            // behavior between yield and await is important, because it
	            // allows the consumer to decide what to do with the yielded
	            // rejection (swallow it and continue, manually .throw it back
	            // into the generator, abandon iteration, whatever). With
	            // await, by contrast, there is no opportunity to examine the
	            // rejection reason outside the generator function, so the
	            // only option is to throw it from the await expression, and
	            // let the generator function handle the exception.
	            result.value = unwrapped;
	            return result;
	          });
	    }

	    if (typeof process === "object" && process.domain) {
	      invoke = process.domain.bind(invoke);
	    }

	    var invokeNext = invoke.bind(generator, "next");
	    var invokeThrow = invoke.bind(generator, "throw");
	    var invokeReturn = invoke.bind(generator, "return");
	    var previousPromise;

	    function enqueue(method, arg) {
	      var enqueueResult =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(function() {
	          return invoke(method, arg);
	        }) : new Promise(function(resolve) {
	          resolve(invoke(method, arg));
	        });

	      // Avoid propagating enqueueResult failures to Promises returned by
	      // later invocations of the iterator.
	      previousPromise = enqueueResult["catch"](function(ignored){});

	      return enqueueResult;
	    }

	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }

	  defineIteratorMethods(AsyncIterator.prototype);

	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );

	    return runtime.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };

	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;

	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }

	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }

	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          if (method === "return" ||
	              (method === "throw" && delegate.iterator[method] === undefined)) {
	            // A return or throw (when the delegate iterator has no throw
	            // method) always terminates the yield* loop.
	            context.delegate = null;

	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            var returnMethod = delegate.iterator["return"];
	            if (returnMethod) {
	              var record = tryCatch(returnMethod, delegate.iterator, arg);
	              if (record.type === "throw") {
	                // If the return method threw an exception, let that
	                // exception prevail over the original return or throw.
	                method = "throw";
	                arg = record.arg;
	                continue;
	              }
	            }

	            if (method === "return") {
	              // Continue with the outer return, now that the delegate
	              // iterator has been terminated.
	              continue;
	            }
	          }

	          var record = tryCatch(
	            delegate.iterator[method],
	            delegate.iterator,
	            arg
	          );

	          if (record.type === "throw") {
	            context.delegate = null;

	            // Like returning generator.throw(uncaught), but without the
	            // overhead of an extra function call.
	            method = "throw";
	            arg = record.arg;
	            continue;
	          }

	          // Delegate generator ran and handled its own exceptions so
	          // regardless of what the method was, we continue as if it is
	          // "next" with an undefined arg.
	          method = "next";
	          arg = undefined;

	          var info = record.arg;
	          if (info.done) {
	            context[delegate.resultName] = info.value;
	            context.next = delegate.nextLoc;
	          } else {
	            state = GenStateSuspendedYield;
	            return info;
	          }

	          context.delegate = null;
	        }

	        if (method === "next") {
	          if (state === GenStateSuspendedYield) {
	            context.sent = arg;
	          } else {
	            context.sent = undefined;
	          }

	        } else if (method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw arg;
	          }

	          if (context.dispatchException(arg)) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            method = "next";
	            arg = undefined;
	          }

	        } else if (method === "return") {
	          context.abrupt("return", arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;

	          var info = {
	            value: record.arg,
	            done: context.done
	          };

	          if (record.arg === ContinueSentinel) {
	            if (context.delegate && method === "next") {
	              // Deliberately forget the last sent value so that we don't
	              // accidentally pass it on to the delegate.
	              arg = undefined;
	            }
	          } else {
	            return info;
	          }

	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(arg) call above.
	          method = "throw";
	          arg = record.arg;
	        }
	      }
	    };
	  }

	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);

	  Gp[iteratorSymbol] = function() {
	    return this;
	  };

	  Gp.toString = function() {
	    return "[object Generator]";
	  };

	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };

	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }

	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }

	    this.tryEntries.push(entry);
	  }

	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }

	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }

	  runtime.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();

	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }

	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };

	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }

	      if (typeof iterable.next === "function") {
	        return iterable;
	      }

	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }

	          next.value = undefined;
	          next.done = true;

	          return next;
	        };

	        return next.next = next;
	      }
	    }

	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;

	  function doneResult() {
	    return { value: undefined, done: true };
	  }

	  Context.prototype = {
	    constructor: Context,

	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      this.sent = undefined;
	      this.done = false;
	      this.delegate = null;

	      this.tryEntries.forEach(resetTryEntry);

	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },

	    stop: function() {
	      this.done = true;

	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },

	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }

	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;
	        return !!caught;
	      }

	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;

	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }

	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");

	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }

	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },

	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }

	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;

	      if (finallyEntry) {
	        this.next = finallyEntry.finallyLoc;
	      } else {
	        this.complete(record);
	      }

	      return ContinueSentinel;
	    },

	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = record.arg;
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }
	    },

	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },

	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }

	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },

	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };

	      return ContinueSentinel;
	    }
	  };
	})(
	  // Among the various tricks for obtaining a reference to the global
	  // object, this seems to be the most reliable technique that does not
	  // use indirect eval (which violates Content Security Policy).
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this
	);

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(204)))

/***/ },
/* 204 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }
/******/ ]);