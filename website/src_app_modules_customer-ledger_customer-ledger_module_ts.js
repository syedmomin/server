"use strict";
(self["webpackChunkvuexy"] = self["webpackChunkvuexy"] || []).push([["src_app_modules_customer-ledger_customer-ledger_module_ts"],{

/***/ 224:
/*!**************************************************!*\
  !*** ./node_modules/flatpickr/dist/esm/index.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var F_project_development_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/toConsumableArray */ 8035);
/* harmony import */ var _types_options__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types/options */ 9794);
/* harmony import */ var _l10n_default__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./l10n/default */ 2027);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ 476);
/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/dom */ 6);
/* harmony import */ var _utils_dates__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/dates */ 8621);
/* harmony import */ var _utils_formatting__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/formatting */ 9352);
/* harmony import */ var _utils_polyfills__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/polyfills */ 9406);
/* harmony import */ var _utils_polyfills__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_utils_polyfills__WEBPACK_IMPORTED_MODULE_7__);








var DEBOUNCED_CHANGE_MS = 300;
function FlatpickrInstance(element, instanceConfig) {
  var self = {
    config: Object.assign(Object.assign({}, _types_options__WEBPACK_IMPORTED_MODULE_1__.defaults), flatpickr.defaultConfig),
    l10n: _l10n_default__WEBPACK_IMPORTED_MODULE_2__["default"]
  };
  self.parseDate = (0,_utils_dates__WEBPACK_IMPORTED_MODULE_5__.createDateParser)({
    config: self.config,
    l10n: self.l10n
  });
  self._handlers = [];
  self.pluginElements = [];
  self.loadedPlugins = [];
  self._bind = bind;
  self._setHoursFromDate = setHoursFromDate;
  self._positionCalendar = positionCalendar;
  self.changeMonth = changeMonth;
  self.changeYear = changeYear;
  self.clear = clear;
  self.close = close;
  self._createElement = _utils_dom__WEBPACK_IMPORTED_MODULE_4__.createElement;
  self.destroy = destroy;
  self.isEnabled = isEnabled;
  self.jumpToDate = jumpToDate;
  self.open = open;
  self.redraw = redraw;
  self.set = set;
  self.setDate = setDate;
  self.toggle = toggle;
  function setupHelperFunctions() {
    self.utils = {
      getDaysInMonth: function getDaysInMonth() {
        var month = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : self.currentMonth;
        var yr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : self.currentYear;
        if (month === 1 && (yr % 4 === 0 && yr % 100 !== 0 || yr % 400 === 0)) return 29;
        return self.l10n.daysInMonth[month];
      }
    };
  }
  function init() {
    self.element = self.input = element;
    self.isOpen = false;
    parseConfig();
    setupLocale();
    setupInputs();
    setupDates();
    setupHelperFunctions();
    if (!self.isMobile) build();
    bindEvents();
    if (self.selectedDates.length || self.config.noCalendar) {
      if (self.config.enableTime) {
        setHoursFromDate(self.config.noCalendar ? self.latestSelectedDateObj : undefined);
      }
      updateValue(false);
    }
    setCalendarWidth();
    var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (!self.isMobile && isSafari) {
      positionCalendar();
    }
    triggerEvent("onReady");
  }
  function bindToInstance(fn) {
    return fn.bind(self);
  }
  function setCalendarWidth() {
    var config = self.config;
    if (config.weekNumbers === false && config.showMonths === 1) {
      return;
    } else if (config.noCalendar !== true) {
      window.requestAnimationFrame(function () {
        if (self.calendarContainer !== undefined) {
          self.calendarContainer.style.visibility = "hidden";
          self.calendarContainer.style.display = "block";
        }
        if (self.daysContainer !== undefined) {
          var daysWidth = (self.days.offsetWidth + 1) * config.showMonths;
          self.daysContainer.style.width = daysWidth + "px";
          self.calendarContainer.style.width = daysWidth + (self.weekWrapper !== undefined ? self.weekWrapper.offsetWidth : 0) + "px";
          self.calendarContainer.style.removeProperty("visibility");
          self.calendarContainer.style.removeProperty("display");
        }
      });
    }
  }
  function updateTime(e) {
    if (self.selectedDates.length === 0) {
      var defaultDate = self.config.minDate === undefined || (0,_utils_dates__WEBPACK_IMPORTED_MODULE_5__.compareDates)(new Date(), self.config.minDate) >= 0 ? new Date() : new Date(self.config.minDate.getTime());
      var defaults = (0,_utils_dates__WEBPACK_IMPORTED_MODULE_5__.getDefaultHours)(self.config);
      defaultDate.setHours(defaults.hours, defaults.minutes, defaults.seconds, defaultDate.getMilliseconds());
      self.selectedDates = [defaultDate];
      self.latestSelectedDateObj = defaultDate;
    }
    if (e !== undefined && e.type !== "blur") {
      timeWrapper(e);
    }
    var prevValue = self._input.value;
    setHoursFromInputs();
    updateValue();
    if (self._input.value !== prevValue) {
      self._debouncedChange();
    }
  }
  function ampm2military(hour, amPM) {
    return hour % 12 + 12 * (0,_utils__WEBPACK_IMPORTED_MODULE_3__.int)(amPM === self.l10n.amPM[1]);
  }
  function military2ampm(hour) {
    switch (hour % 24) {
      case 0:
      case 12:
        return 12;
      default:
        return hour % 12;
    }
  }
  function setHoursFromInputs() {
    if (self.hourElement === undefined || self.minuteElement === undefined) return;
    var hours = (parseInt(self.hourElement.value.slice(-2), 10) || 0) % 24,
      minutes = (parseInt(self.minuteElement.value, 10) || 0) % 60,
      seconds = self.secondElement !== undefined ? (parseInt(self.secondElement.value, 10) || 0) % 60 : 0;
    if (self.amPM !== undefined) {
      hours = ampm2military(hours, self.amPM.textContent);
    }
    var limitMinHours = self.config.minTime !== undefined || self.config.minDate && self.minDateHasTime && self.latestSelectedDateObj && (0,_utils_dates__WEBPACK_IMPORTED_MODULE_5__.compareDates)(self.latestSelectedDateObj, self.config.minDate, true) === 0;
    var limitMaxHours = self.config.maxTime !== undefined || self.config.maxDate && self.maxDateHasTime && self.latestSelectedDateObj && (0,_utils_dates__WEBPACK_IMPORTED_MODULE_5__.compareDates)(self.latestSelectedDateObj, self.config.maxDate, true) === 0;
    if (limitMaxHours) {
      var maxTime = self.config.maxTime !== undefined ? self.config.maxTime : self.config.maxDate;
      hours = Math.min(hours, maxTime.getHours());
      if (hours === maxTime.getHours()) minutes = Math.min(minutes, maxTime.getMinutes());
      if (minutes === maxTime.getMinutes()) seconds = Math.min(seconds, maxTime.getSeconds());
    }
    if (limitMinHours) {
      var minTime = self.config.minTime !== undefined ? self.config.minTime : self.config.minDate;
      hours = Math.max(hours, minTime.getHours());
      if (hours === minTime.getHours() && minutes < minTime.getMinutes()) minutes = minTime.getMinutes();
      if (minutes === minTime.getMinutes()) seconds = Math.max(seconds, minTime.getSeconds());
    }
    setHours(hours, minutes, seconds);
  }
  function setHoursFromDate(dateObj) {
    var date = dateObj || self.latestSelectedDateObj;
    if (date) {
      setHours(date.getHours(), date.getMinutes(), date.getSeconds());
    }
  }
  function setHours(hours, minutes, seconds) {
    if (self.latestSelectedDateObj !== undefined) {
      self.latestSelectedDateObj.setHours(hours % 24, minutes, seconds || 0, 0);
    }
    if (!self.hourElement || !self.minuteElement || self.isMobile) return;
    self.hourElement.value = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.pad)(!self.config.time_24hr ? (12 + hours) % 12 + 12 * (0,_utils__WEBPACK_IMPORTED_MODULE_3__.int)(hours % 12 === 0) : hours);
    self.minuteElement.value = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.pad)(minutes);
    if (self.amPM !== undefined) self.amPM.textContent = self.l10n.amPM[(0,_utils__WEBPACK_IMPORTED_MODULE_3__.int)(hours >= 12)];
    if (self.secondElement !== undefined) self.secondElement.value = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.pad)(seconds);
  }
  function onYearInput(event) {
    var eventTarget = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.getEventTarget)(event);
    var year = parseInt(eventTarget.value) + (event.delta || 0);
    if (year / 1000 > 1 || event.key === "Enter" && !/[^\d]/.test(year.toString())) {
      changeYear(year);
    }
  }
  function bind(element, event, handler, options) {
    if (event instanceof Array) return event.forEach(function (ev) {
      return bind(element, ev, handler, options);
    });
    if (element instanceof Array) return element.forEach(function (el) {
      return bind(el, event, handler, options);
    });
    element.addEventListener(event, handler, options);
    self._handlers.push({
      remove: function remove() {
        return element.removeEventListener(event, handler);
      }
    });
  }
  function triggerChange() {
    triggerEvent("onChange");
  }
  function bindEvents() {
    if (self.config.wrap) {
      ["open", "close", "toggle", "clear"].forEach(function (evt) {
        Array.prototype.forEach.call(self.element.querySelectorAll("[data-".concat(evt, "]")), function (el) {
          return bind(el, "click", self[evt]);
        });
      });
    }
    if (self.isMobile) {
      setupMobile();
      return;
    }
    var debouncedResize = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.debounce)(onResize, 50);
    self._debouncedChange = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.debounce)(triggerChange, DEBOUNCED_CHANGE_MS);
    if (self.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent)) bind(self.daysContainer, "mouseover", function (e) {
      if (self.config.mode === "range") onMouseOver((0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.getEventTarget)(e));
    });
    bind(window.document.body, "keydown", onKeyDown);
    if (!self.config.inline && !self.config.static) bind(window, "resize", debouncedResize);
    if (window.ontouchstart !== undefined) bind(window.document, "touchstart", documentClick);else bind(window.document, "mousedown", documentClick);
    bind(window.document, "focus", documentClick, {
      capture: true
    });
    if (self.config.clickOpens === true) {
      bind(self._input, "focus", self.open);
      bind(self._input, "click", self.open);
    }
    if (self.daysContainer !== undefined) {
      bind(self.monthNav, "click", onMonthNavClick);
      bind(self.monthNav, ["keyup", "increment"], onYearInput);
      bind(self.daysContainer, "click", selectDate);
    }
    if (self.timeContainer !== undefined && self.minuteElement !== undefined && self.hourElement !== undefined) {
      var selText = function selText(e) {
        return (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.getEventTarget)(e).select();
      };
      bind(self.timeContainer, ["increment"], updateTime);
      bind(self.timeContainer, "blur", updateTime, {
        capture: true
      });
      bind(self.timeContainer, "click", timeIncrement);
      bind([self.hourElement, self.minuteElement], ["focus", "click"], selText);
      if (self.secondElement !== undefined) bind(self.secondElement, "focus", function () {
        return self.secondElement && self.secondElement.select();
      });
      if (self.amPM !== undefined) {
        bind(self.amPM, "click", function (e) {
          updateTime(e);
          triggerChange();
        });
      }
    }
    if (self.config.allowInput) {
      bind(self._input, "blur", onBlur);
    }
  }
  function jumpToDate(jumpDate, triggerChange) {
    var jumpTo = jumpDate !== undefined ? self.parseDate(jumpDate) : self.latestSelectedDateObj || (self.config.minDate && self.config.minDate > self.now ? self.config.minDate : self.config.maxDate && self.config.maxDate < self.now ? self.config.maxDate : self.now);
    var oldYear = self.currentYear;
    var oldMonth = self.currentMonth;
    try {
      if (jumpTo !== undefined) {
        self.currentYear = jumpTo.getFullYear();
        self.currentMonth = jumpTo.getMonth();
      }
    } catch (e) {
      e.message = "Invalid date supplied: " + jumpTo;
      self.config.errorHandler(e);
    }
    if (triggerChange && self.currentYear !== oldYear) {
      triggerEvent("onYearChange");
      buildMonthSwitch();
    }
    if (triggerChange && (self.currentYear !== oldYear || self.currentMonth !== oldMonth)) {
      triggerEvent("onMonthChange");
    }
    self.redraw();
  }
  function timeIncrement(e) {
    var eventTarget = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.getEventTarget)(e);
    if (~eventTarget.className.indexOf("arrow")) incrementNumInput(e, eventTarget.classList.contains("arrowUp") ? 1 : -1);
  }
  function incrementNumInput(e, delta, inputElem) {
    var target = e && (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.getEventTarget)(e);
    var input = inputElem || target && target.parentNode && target.parentNode.firstChild;
    var event = createEvent("increment");
    event.delta = delta;
    input && input.dispatchEvent(event);
  }
  function build() {
    var fragment = window.document.createDocumentFragment();
    self.calendarContainer = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", "flatpickr-calendar");
    self.calendarContainer.tabIndex = -1;
    if (!self.config.noCalendar) {
      fragment.appendChild(buildMonthNav());
      self.innerContainer = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", "flatpickr-innerContainer");
      if (self.config.weekNumbers) {
        var _buildWeeks = buildWeeks(),
          weekWrapper = _buildWeeks.weekWrapper,
          weekNumbers = _buildWeeks.weekNumbers;
        self.innerContainer.appendChild(weekWrapper);
        self.weekNumbers = weekNumbers;
        self.weekWrapper = weekWrapper;
      }
      self.rContainer = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", "flatpickr-rContainer");
      self.rContainer.appendChild(buildWeekdays());
      if (!self.daysContainer) {
        self.daysContainer = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", "flatpickr-days");
        self.daysContainer.tabIndex = -1;
      }
      buildDays();
      self.rContainer.appendChild(self.daysContainer);
      self.innerContainer.appendChild(self.rContainer);
      fragment.appendChild(self.innerContainer);
    }
    if (self.config.enableTime) {
      fragment.appendChild(buildTime());
    }
    (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.toggleClass)(self.calendarContainer, "rangeMode", self.config.mode === "range");
    (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.toggleClass)(self.calendarContainer, "animate", self.config.animate === true);
    (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.toggleClass)(self.calendarContainer, "multiMonth", self.config.showMonths > 1);
    self.calendarContainer.appendChild(fragment);
    var customAppend = self.config.appendTo !== undefined && self.config.appendTo.nodeType !== undefined;
    if (self.config.inline || self.config.static) {
      self.calendarContainer.classList.add(self.config.inline ? "inline" : "static");
      if (self.config.inline) {
        if (!customAppend && self.element.parentNode) self.element.parentNode.insertBefore(self.calendarContainer, self._input.nextSibling);else if (self.config.appendTo !== undefined) self.config.appendTo.appendChild(self.calendarContainer);
      }
      if (self.config.static) {
        var wrapper = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", "flatpickr-wrapper");
        if (self.element.parentNode) self.element.parentNode.insertBefore(wrapper, self.element);
        wrapper.appendChild(self.element);
        if (self.altInput) wrapper.appendChild(self.altInput);
        wrapper.appendChild(self.calendarContainer);
      }
    }
    if (!self.config.static && !self.config.inline) (self.config.appendTo !== undefined ? self.config.appendTo : window.document.body).appendChild(self.calendarContainer);
  }
  function createDay(className, date, dayNumber, i) {
    var dateIsEnabled = isEnabled(date, true),
      dayElement = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.createElement)("span", "flatpickr-day " + className, date.getDate().toString());
    dayElement.dateObj = date;
    dayElement.$i = i;
    dayElement.setAttribute("aria-label", self.formatDate(date, self.config.ariaDateFormat));
    if (className.indexOf("hidden") === -1 && (0,_utils_dates__WEBPACK_IMPORTED_MODULE_5__.compareDates)(date, self.now) === 0) {
      self.todayDateElem = dayElement;
      dayElement.classList.add("today");
      dayElement.setAttribute("aria-current", "date");
    }
    if (dateIsEnabled) {
      dayElement.tabIndex = -1;
      if (isDateSelected(date)) {
        dayElement.classList.add("selected");
        self.selectedDateElem = dayElement;
        if (self.config.mode === "range") {
          (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.toggleClass)(dayElement, "startRange", self.selectedDates[0] && (0,_utils_dates__WEBPACK_IMPORTED_MODULE_5__.compareDates)(date, self.selectedDates[0], true) === 0);
          (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.toggleClass)(dayElement, "endRange", self.selectedDates[1] && (0,_utils_dates__WEBPACK_IMPORTED_MODULE_5__.compareDates)(date, self.selectedDates[1], true) === 0);
          if (className === "nextMonthDay") dayElement.classList.add("inRange");
        }
      }
    } else {
      dayElement.classList.add("flatpickr-disabled");
    }
    if (self.config.mode === "range") {
      if (isDateInRange(date) && !isDateSelected(date)) dayElement.classList.add("inRange");
    }
    if (self.weekNumbers && self.config.showMonths === 1 && className !== "prevMonthDay" && dayNumber % 7 === 1) {
      self.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + self.config.getWeek(date) + "</span>");
    }
    triggerEvent("onDayCreate", dayElement);
    return dayElement;
  }
  function focusOnDayElem(targetNode) {
    targetNode.focus();
    if (self.config.mode === "range") onMouseOver(targetNode);
  }
  function getFirstAvailableDay(delta) {
    var startMonth = delta > 0 ? 0 : self.config.showMonths - 1;
    var endMonth = delta > 0 ? self.config.showMonths : -1;
    for (var m = startMonth; m != endMonth; m += delta) {
      var month = self.daysContainer.children[m];
      var startIndex = delta > 0 ? 0 : month.children.length - 1;
      var endIndex = delta > 0 ? month.children.length : -1;
      for (var i = startIndex; i != endIndex; i += delta) {
        var c = month.children[i];
        if (c.className.indexOf("hidden") === -1 && isEnabled(c.dateObj)) return c;
      }
    }
    return undefined;
  }
  function getNextAvailableDay(current, delta) {
    var givenMonth = current.className.indexOf("Month") === -1 ? current.dateObj.getMonth() : self.currentMonth;
    var endMonth = delta > 0 ? self.config.showMonths : -1;
    var loopDelta = delta > 0 ? 1 : -1;
    for (var m = givenMonth - self.currentMonth; m != endMonth; m += loopDelta) {
      var month = self.daysContainer.children[m];
      var startIndex = givenMonth - self.currentMonth === m ? current.$i + delta : delta < 0 ? month.children.length - 1 : 0;
      var numMonthDays = month.children.length;
      for (var i = startIndex; i >= 0 && i < numMonthDays && i != (delta > 0 ? numMonthDays : -1); i += loopDelta) {
        var c = month.children[i];
        if (c.className.indexOf("hidden") === -1 && isEnabled(c.dateObj) && Math.abs(current.$i - i) >= Math.abs(delta)) return focusOnDayElem(c);
      }
    }
    self.changeMonth(loopDelta);
    focusOnDay(getFirstAvailableDay(loopDelta), 0);
    return undefined;
  }
  function focusOnDay(current, offset) {
    var dayFocused = isInView(document.activeElement || document.body);
    var startElem = current !== undefined ? current : dayFocused ? document.activeElement : self.selectedDateElem !== undefined && isInView(self.selectedDateElem) ? self.selectedDateElem : self.todayDateElem !== undefined && isInView(self.todayDateElem) ? self.todayDateElem : getFirstAvailableDay(offset > 0 ? 1 : -1);
    if (startElem === undefined) {
      self._input.focus();
    } else if (!dayFocused) {
      focusOnDayElem(startElem);
    } else {
      getNextAvailableDay(startElem, offset);
    }
  }
  function buildMonthDays(year, month) {
    var firstOfMonth = (new Date(year, month, 1).getDay() - self.l10n.firstDayOfWeek + 7) % 7;
    var prevMonthDays = self.utils.getDaysInMonth((month - 1 + 12) % 12, year);
    var daysInMonth = self.utils.getDaysInMonth(month, year),
      days = window.document.createDocumentFragment(),
      isMultiMonth = self.config.showMonths > 1,
      prevMonthDayClass = isMultiMonth ? "prevMonthDay hidden" : "prevMonthDay",
      nextMonthDayClass = isMultiMonth ? "nextMonthDay hidden" : "nextMonthDay";
    var dayNumber = prevMonthDays + 1 - firstOfMonth,
      dayIndex = 0;
    for (; dayNumber <= prevMonthDays; dayNumber++, dayIndex++) {
      days.appendChild(createDay(prevMonthDayClass, new Date(year, month - 1, dayNumber), dayNumber, dayIndex));
    }
    for (dayNumber = 1; dayNumber <= daysInMonth; dayNumber++, dayIndex++) {
      days.appendChild(createDay("", new Date(year, month, dayNumber), dayNumber, dayIndex));
    }
    for (var dayNum = daysInMonth + 1; dayNum <= 42 - firstOfMonth && (self.config.showMonths === 1 || dayIndex % 7 !== 0); dayNum++, dayIndex++) {
      days.appendChild(createDay(nextMonthDayClass, new Date(year, month + 1, dayNum % daysInMonth), dayNum, dayIndex));
    }
    var dayContainer = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", "dayContainer");
    dayContainer.appendChild(days);
    return dayContainer;
  }
  function buildDays() {
    if (self.daysContainer === undefined) {
      return;
    }
    (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.clearNode)(self.daysContainer);
    if (self.weekNumbers) (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.clearNode)(self.weekNumbers);
    var frag = document.createDocumentFragment();
    for (var i = 0; i < self.config.showMonths; i++) {
      var d = new Date(self.currentYear, self.currentMonth, 1);
      d.setMonth(self.currentMonth + i);
      frag.appendChild(buildMonthDays(d.getFullYear(), d.getMonth()));
    }
    self.daysContainer.appendChild(frag);
    self.days = self.daysContainer.firstChild;
    if (self.config.mode === "range" && self.selectedDates.length === 1) {
      onMouseOver();
    }
  }
  function buildMonthSwitch() {
    if (self.config.showMonths > 1 || self.config.monthSelectorType !== "dropdown") return;
    var shouldBuildMonth = function shouldBuildMonth(month) {
      if (self.config.minDate !== undefined && self.currentYear === self.config.minDate.getFullYear() && month < self.config.minDate.getMonth()) {
        return false;
      }
      return !(self.config.maxDate !== undefined && self.currentYear === self.config.maxDate.getFullYear() && month > self.config.maxDate.getMonth());
    };
    self.monthsDropdownContainer.tabIndex = -1;
    self.monthsDropdownContainer.innerHTML = "";
    for (var i = 0; i < 12; i++) {
      if (!shouldBuildMonth(i)) continue;
      var month = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.createElement)("option", "flatpickr-monthDropdown-month");
      month.value = new Date(self.currentYear, i).getMonth().toString();
      month.textContent = (0,_utils_formatting__WEBPACK_IMPORTED_MODULE_6__.monthToStr)(i, self.config.shorthandCurrentMonth, self.l10n);
      month.tabIndex = -1;
      if (self.currentMonth === i) {
        month.selected = true;
      }
      self.monthsDropdownContainer.appendChild(month);
    }
  }
  function buildMonth() {
    var container = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", "flatpickr-month");
    var monthNavFragment = window.document.createDocumentFragment();
    var monthElement;
    if (self.config.showMonths > 1 || self.config.monthSelectorType === "static") {
      monthElement = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.createElement)("span", "cur-month");
    } else {
      self.monthsDropdownContainer = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.createElement)("select", "flatpickr-monthDropdown-months");
      self.monthsDropdownContainer.setAttribute("aria-label", self.l10n.monthAriaLabel);
      bind(self.monthsDropdownContainer, "change", function (e) {
        var target = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.getEventTarget)(e);
        var selectedMonth = parseInt(target.value, 10);
        self.changeMonth(selectedMonth - self.currentMonth);
        triggerEvent("onMonthChange");
      });
      buildMonthSwitch();
      monthElement = self.monthsDropdownContainer;
    }
    var yearInput = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.createNumberInput)("cur-year", {
      tabindex: "-1"
    });
    var yearElement = yearInput.getElementsByTagName("input")[0];
    yearElement.setAttribute("aria-label", self.l10n.yearAriaLabel);
    if (self.config.minDate) {
      yearElement.setAttribute("min", self.config.minDate.getFullYear().toString());
    }
    if (self.config.maxDate) {
      yearElement.setAttribute("max", self.config.maxDate.getFullYear().toString());
      yearElement.disabled = !!self.config.minDate && self.config.minDate.getFullYear() === self.config.maxDate.getFullYear();
    }
    var currentMonth = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", "flatpickr-current-month");
    currentMonth.appendChild(monthElement);
    currentMonth.appendChild(yearInput);
    monthNavFragment.appendChild(currentMonth);
    container.appendChild(monthNavFragment);
    return {
      container: container,
      yearElement: yearElement,
      monthElement: monthElement
    };
  }
  function buildMonths() {
    (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.clearNode)(self.monthNav);
    self.monthNav.appendChild(self.prevMonthNav);
    if (self.config.showMonths) {
      self.yearElements = [];
      self.monthElements = [];
    }
    for (var m = self.config.showMonths; m--;) {
      var month = buildMonth();
      self.yearElements.push(month.yearElement);
      self.monthElements.push(month.monthElement);
      self.monthNav.appendChild(month.container);
    }
    self.monthNav.appendChild(self.nextMonthNav);
  }
  function buildMonthNav() {
    self.monthNav = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", "flatpickr-months");
    self.yearElements = [];
    self.monthElements = [];
    self.prevMonthNav = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.createElement)("span", "flatpickr-prev-month");
    self.prevMonthNav.innerHTML = self.config.prevArrow;
    self.nextMonthNav = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.createElement)("span", "flatpickr-next-month");
    self.nextMonthNav.innerHTML = self.config.nextArrow;
    buildMonths();
    Object.defineProperty(self, "_hidePrevMonthArrow", {
      get: function get() {
        return self.__hidePrevMonthArrow;
      },
      set: function set(bool) {
        if (self.__hidePrevMonthArrow !== bool) {
          (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.toggleClass)(self.prevMonthNav, "flatpickr-disabled", bool);
          self.__hidePrevMonthArrow = bool;
        }
      }
    });
    Object.defineProperty(self, "_hideNextMonthArrow", {
      get: function get() {
        return self.__hideNextMonthArrow;
      },
      set: function set(bool) {
        if (self.__hideNextMonthArrow !== bool) {
          (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.toggleClass)(self.nextMonthNav, "flatpickr-disabled", bool);
          self.__hideNextMonthArrow = bool;
        }
      }
    });
    self.currentYearElement = self.yearElements[0];
    updateNavigationCurrentMonth();
    return self.monthNav;
  }
  function buildTime() {
    self.calendarContainer.classList.add("hasTime");
    if (self.config.noCalendar) self.calendarContainer.classList.add("noCalendar");
    var defaults = (0,_utils_dates__WEBPACK_IMPORTED_MODULE_5__.getDefaultHours)(self.config);
    self.timeContainer = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", "flatpickr-time");
    self.timeContainer.tabIndex = -1;
    var separator = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.createElement)("span", "flatpickr-time-separator", ":");
    var hourInput = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.createNumberInput)("flatpickr-hour", {
      "aria-label": self.l10n.hourAriaLabel
    });
    self.hourElement = hourInput.getElementsByTagName("input")[0];
    var minuteInput = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.createNumberInput)("flatpickr-minute", {
      "aria-label": self.l10n.minuteAriaLabel
    });
    self.minuteElement = minuteInput.getElementsByTagName("input")[0];
    self.hourElement.tabIndex = self.minuteElement.tabIndex = -1;
    self.hourElement.value = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.pad)(self.latestSelectedDateObj ? self.latestSelectedDateObj.getHours() : self.config.time_24hr ? defaults.hours : military2ampm(defaults.hours));
    self.minuteElement.value = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.pad)(self.latestSelectedDateObj ? self.latestSelectedDateObj.getMinutes() : defaults.minutes);
    self.hourElement.setAttribute("step", self.config.hourIncrement.toString());
    self.minuteElement.setAttribute("step", self.config.minuteIncrement.toString());
    self.hourElement.setAttribute("min", self.config.time_24hr ? "0" : "1");
    self.hourElement.setAttribute("max", self.config.time_24hr ? "23" : "12");
    self.hourElement.setAttribute("maxlength", "2");
    self.minuteElement.setAttribute("min", "0");
    self.minuteElement.setAttribute("max", "59");
    self.minuteElement.setAttribute("maxlength", "2");
    self.timeContainer.appendChild(hourInput);
    self.timeContainer.appendChild(separator);
    self.timeContainer.appendChild(minuteInput);
    if (self.config.time_24hr) self.timeContainer.classList.add("time24hr");
    if (self.config.enableSeconds) {
      self.timeContainer.classList.add("hasSeconds");
      var secondInput = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.createNumberInput)("flatpickr-second");
      self.secondElement = secondInput.getElementsByTagName("input")[0];
      self.secondElement.value = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.pad)(self.latestSelectedDateObj ? self.latestSelectedDateObj.getSeconds() : defaults.seconds);
      self.secondElement.setAttribute("step", self.minuteElement.getAttribute("step"));
      self.secondElement.setAttribute("min", "0");
      self.secondElement.setAttribute("max", "59");
      self.secondElement.setAttribute("maxlength", "2");
      self.timeContainer.appendChild((0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.createElement)("span", "flatpickr-time-separator", ":"));
      self.timeContainer.appendChild(secondInput);
    }
    if (!self.config.time_24hr) {
      self.amPM = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.createElement)("span", "flatpickr-am-pm", self.l10n.amPM[(0,_utils__WEBPACK_IMPORTED_MODULE_3__.int)((self.latestSelectedDateObj ? self.hourElement.value : self.config.defaultHour) > 11)]);
      self.amPM.title = self.l10n.toggleTitle;
      self.amPM.tabIndex = -1;
      self.timeContainer.appendChild(self.amPM);
    }
    return self.timeContainer;
  }
  function buildWeekdays() {
    if (!self.weekdayContainer) self.weekdayContainer = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", "flatpickr-weekdays");else (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.clearNode)(self.weekdayContainer);
    for (var i = self.config.showMonths; i--;) {
      var container = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", "flatpickr-weekdaycontainer");
      self.weekdayContainer.appendChild(container);
    }
    updateWeekdays();
    return self.weekdayContainer;
  }
  function updateWeekdays() {
    if (!self.weekdayContainer) {
      return;
    }
    var firstDayOfWeek = self.l10n.firstDayOfWeek;
    var weekdays = (0,F_project_development_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(self.l10n.weekdays.shorthand);
    if (firstDayOfWeek > 0 && firstDayOfWeek < weekdays.length) {
      weekdays = [].concat((0,F_project_development_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(weekdays.splice(firstDayOfWeek, weekdays.length)), (0,F_project_development_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(weekdays.splice(0, firstDayOfWeek)));
    }
    for (var i = self.config.showMonths; i--;) {
      self.weekdayContainer.children[i].innerHTML = "\n      <span class='flatpickr-weekday'>\n        ".concat(weekdays.join("</span><span class='flatpickr-weekday'>"), "\n      </span>\n      ");
    }
  }
  function buildWeeks() {
    self.calendarContainer.classList.add("hasWeeks");
    var weekWrapper = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", "flatpickr-weekwrapper");
    weekWrapper.appendChild((0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.createElement)("span", "flatpickr-weekday", self.l10n.weekAbbreviation));
    var weekNumbers = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", "flatpickr-weeks");
    weekWrapper.appendChild(weekNumbers);
    return {
      weekWrapper: weekWrapper,
      weekNumbers: weekNumbers
    };
  }
  function changeMonth(value) {
    var isOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var delta = isOffset ? value : value - self.currentMonth;
    if (delta < 0 && self._hidePrevMonthArrow === true || delta > 0 && self._hideNextMonthArrow === true) return;
    self.currentMonth += delta;
    if (self.currentMonth < 0 || self.currentMonth > 11) {
      self.currentYear += self.currentMonth > 11 ? 1 : -1;
      self.currentMonth = (self.currentMonth + 12) % 12;
      triggerEvent("onYearChange");
      buildMonthSwitch();
    }
    buildDays();
    triggerEvent("onMonthChange");
    updateNavigationCurrentMonth();
  }
  function clear() {
    var triggerChangeEvent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var toInitial = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    self.input.value = "";
    if (self.altInput !== undefined) self.altInput.value = "";
    if (self.mobileInput !== undefined) self.mobileInput.value = "";
    self.selectedDates = [];
    self.latestSelectedDateObj = undefined;
    if (toInitial === true) {
      self.currentYear = self._initialDate.getFullYear();
      self.currentMonth = self._initialDate.getMonth();
    }
    if (self.config.enableTime === true) {
      var _getDefaultHours = (0,_utils_dates__WEBPACK_IMPORTED_MODULE_5__.getDefaultHours)(self.config),
        hours = _getDefaultHours.hours,
        minutes = _getDefaultHours.minutes,
        seconds = _getDefaultHours.seconds;
      setHours(hours, minutes, seconds);
    }
    self.redraw();
    if (triggerChangeEvent) triggerEvent("onChange");
  }
  function close() {
    self.isOpen = false;
    if (!self.isMobile) {
      if (self.calendarContainer !== undefined) {
        self.calendarContainer.classList.remove("open");
      }
      if (self._input !== undefined) {
        self._input.classList.remove("active");
      }
    }
    triggerEvent("onClose");
  }
  function destroy() {
    if (self.config !== undefined) triggerEvent("onDestroy");
    for (var i = self._handlers.length; i--;) {
      self._handlers[i].remove();
    }
    self._handlers = [];
    if (self.mobileInput) {
      if (self.mobileInput.parentNode) self.mobileInput.parentNode.removeChild(self.mobileInput);
      self.mobileInput = undefined;
    } else if (self.calendarContainer && self.calendarContainer.parentNode) {
      if (self.config.static && self.calendarContainer.parentNode) {
        var wrapper = self.calendarContainer.parentNode;
        wrapper.lastChild && wrapper.removeChild(wrapper.lastChild);
        if (wrapper.parentNode) {
          while (wrapper.firstChild) wrapper.parentNode.insertBefore(wrapper.firstChild, wrapper);
          wrapper.parentNode.removeChild(wrapper);
        }
      } else self.calendarContainer.parentNode.removeChild(self.calendarContainer);
    }
    if (self.altInput) {
      self.input.type = "text";
      if (self.altInput.parentNode) self.altInput.parentNode.removeChild(self.altInput);
      delete self.altInput;
    }
    if (self.input) {
      self.input.type = self.input._type;
      self.input.classList.remove("flatpickr-input");
      self.input.removeAttribute("readonly");
    }
    ["_showTimeInput", "latestSelectedDateObj", "_hideNextMonthArrow", "_hidePrevMonthArrow", "__hideNextMonthArrow", "__hidePrevMonthArrow", "isMobile", "isOpen", "selectedDateElem", "minDateHasTime", "maxDateHasTime", "days", "daysContainer", "_input", "_positionElement", "innerContainer", "rContainer", "monthNav", "todayDateElem", "calendarContainer", "weekdayContainer", "prevMonthNav", "nextMonthNav", "monthsDropdownContainer", "currentMonthElement", "currentYearElement", "navigationCurrentMonth", "selectedDateElem", "config"].forEach(function (k) {
      try {
        delete self[k];
      } catch (_) {}
    });
  }
  function isCalendarElem(elem) {
    if (self.config.appendTo && self.config.appendTo.contains(elem)) return true;
    return self.calendarContainer.contains(elem);
  }
  function documentClick(e) {
    if (self.isOpen && !self.config.inline) {
      var eventTarget = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.getEventTarget)(e);
      var isCalendarElement = isCalendarElem(eventTarget);
      var isInput = eventTarget === self.input || eventTarget === self.altInput || self.element.contains(eventTarget) || e.path && e.path.indexOf && (~e.path.indexOf(self.input) || ~e.path.indexOf(self.altInput));
      var lostFocus = e.type === "blur" ? isInput && e.relatedTarget && !isCalendarElem(e.relatedTarget) : !isInput && !isCalendarElement && !isCalendarElem(e.relatedTarget);
      var isIgnored = !self.config.ignoredFocusElements.some(function (elem) {
        return elem.contains(eventTarget);
      });
      if (lostFocus && isIgnored) {
        if (self.timeContainer !== undefined && self.minuteElement !== undefined && self.hourElement !== undefined && self.input.value !== "" && self.input.value !== undefined) {
          updateTime();
        }
        self.close();
        if (self.config && self.config.mode === "range" && self.selectedDates.length === 1) {
          self.clear(false);
          self.redraw();
        }
      }
    }
  }
  function changeYear(newYear) {
    if (!newYear || self.config.minDate && newYear < self.config.minDate.getFullYear() || self.config.maxDate && newYear > self.config.maxDate.getFullYear()) return;
    var newYearNum = newYear,
      isNewYear = self.currentYear !== newYearNum;
    self.currentYear = newYearNum || self.currentYear;
    if (self.config.maxDate && self.currentYear === self.config.maxDate.getFullYear()) {
      self.currentMonth = Math.min(self.config.maxDate.getMonth(), self.currentMonth);
    } else if (self.config.minDate && self.currentYear === self.config.minDate.getFullYear()) {
      self.currentMonth = Math.max(self.config.minDate.getMonth(), self.currentMonth);
    }
    if (isNewYear) {
      self.redraw();
      triggerEvent("onYearChange");
      buildMonthSwitch();
    }
  }
  function isEnabled(date) {
    var timeless = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var _a;
    var dateToCheck = self.parseDate(date, undefined, timeless);
    if (self.config.minDate && dateToCheck && (0,_utils_dates__WEBPACK_IMPORTED_MODULE_5__.compareDates)(dateToCheck, self.config.minDate, timeless !== undefined ? timeless : !self.minDateHasTime) < 0 || self.config.maxDate && dateToCheck && (0,_utils_dates__WEBPACK_IMPORTED_MODULE_5__.compareDates)(dateToCheck, self.config.maxDate, timeless !== undefined ? timeless : !self.maxDateHasTime) > 0) return false;
    if (!self.config.enable && self.config.disable.length === 0) return true;
    if (dateToCheck === undefined) return false;
    var bool = !!self.config.enable,
      array = (_a = self.config.enable) !== null && _a !== void 0 ? _a : self.config.disable;
    for (var i = 0, d; i < array.length; i++) {
      d = array[i];
      if (typeof d === "function" && d(dateToCheck)) return bool;else if (d instanceof Date && dateToCheck !== undefined && d.getTime() === dateToCheck.getTime()) return bool;else if (typeof d === "string") {
        var parsed = self.parseDate(d, undefined, true);
        return parsed && parsed.getTime() === dateToCheck.getTime() ? bool : !bool;
      } else if (typeof d === "object" && dateToCheck !== undefined && d.from && d.to && dateToCheck.getTime() >= d.from.getTime() && dateToCheck.getTime() <= d.to.getTime()) return bool;
    }
    return !bool;
  }
  function isInView(elem) {
    if (self.daysContainer !== undefined) return elem.className.indexOf("hidden") === -1 && elem.className.indexOf("flatpickr-disabled") === -1 && self.daysContainer.contains(elem);
    return false;
  }
  function onBlur(e) {
    var isInput = e.target === self._input;
    if (isInput && (self.selectedDates.length > 0 || self._input.value.length > 0) && !(e.relatedTarget && isCalendarElem(e.relatedTarget))) {
      self.setDate(self._input.value, true, e.target === self.altInput ? self.config.altFormat : self.config.dateFormat);
    }
  }
  function onKeyDown(e) {
    var eventTarget = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.getEventTarget)(e);
    var isInput = self.config.wrap ? element.contains(eventTarget) : eventTarget === self._input;
    var allowInput = self.config.allowInput;
    var allowKeydown = self.isOpen && (!allowInput || !isInput);
    var allowInlineKeydown = self.config.inline && isInput && !allowInput;
    if (e.keyCode === 13 && isInput) {
      if (allowInput) {
        self.setDate(self._input.value, true, eventTarget === self.altInput ? self.config.altFormat : self.config.dateFormat);
        return eventTarget.blur();
      } else {
        self.open();
      }
    } else if (isCalendarElem(eventTarget) || allowKeydown || allowInlineKeydown) {
      var isTimeObj = !!self.timeContainer && self.timeContainer.contains(eventTarget);
      switch (e.keyCode) {
        case 13:
          if (isTimeObj) {
            e.preventDefault();
            updateTime();
            focusAndClose();
          } else selectDate(e);
          break;
        case 27:
          e.preventDefault();
          focusAndClose();
          break;
        case 8:
        case 46:
          if (isInput && !self.config.allowInput) {
            e.preventDefault();
            self.clear();
          }
          break;
        case 37:
        case 39:
          if (!isTimeObj && !isInput) {
            e.preventDefault();
            if (self.daysContainer !== undefined && (allowInput === false || document.activeElement && isInView(document.activeElement))) {
              var _delta = e.keyCode === 39 ? 1 : -1;
              if (!e.ctrlKey) focusOnDay(undefined, _delta);else {
                e.stopPropagation();
                changeMonth(_delta);
                focusOnDay(getFirstAvailableDay(1), 0);
              }
            }
          } else if (self.hourElement) self.hourElement.focus();
          break;
        case 38:
        case 40:
          e.preventDefault();
          var delta = e.keyCode === 40 ? 1 : -1;
          if (self.daysContainer && eventTarget.$i !== undefined || eventTarget === self.input || eventTarget === self.altInput) {
            if (e.ctrlKey) {
              e.stopPropagation();
              changeYear(self.currentYear - delta);
              focusOnDay(getFirstAvailableDay(1), 0);
            } else if (!isTimeObj) focusOnDay(undefined, delta * 7);
          } else if (eventTarget === self.currentYearElement) {
            changeYear(self.currentYear - delta);
          } else if (self.config.enableTime) {
            if (!isTimeObj && self.hourElement) self.hourElement.focus();
            updateTime(e);
            self._debouncedChange();
          }
          break;
        case 9:
          if (isTimeObj) {
            var elems = [self.hourElement, self.minuteElement, self.secondElement, self.amPM].concat(self.pluginElements).filter(function (x) {
              return x;
            });
            var i = elems.indexOf(eventTarget);
            if (i !== -1) {
              var target = elems[i + (e.shiftKey ? -1 : 1)];
              e.preventDefault();
              (target || self._input).focus();
            }
          } else if (!self.config.noCalendar && self.daysContainer && self.daysContainer.contains(eventTarget) && e.shiftKey) {
            e.preventDefault();
            self._input.focus();
          }
          break;
        default:
          break;
      }
    }
    if (self.amPM !== undefined && eventTarget === self.amPM) {
      switch (e.key) {
        case self.l10n.amPM[0].charAt(0):
        case self.l10n.amPM[0].charAt(0).toLowerCase():
          self.amPM.textContent = self.l10n.amPM[0];
          setHoursFromInputs();
          updateValue();
          break;
        case self.l10n.amPM[1].charAt(0):
        case self.l10n.amPM[1].charAt(0).toLowerCase():
          self.amPM.textContent = self.l10n.amPM[1];
          setHoursFromInputs();
          updateValue();
          break;
      }
    }
    if (isInput || isCalendarElem(eventTarget)) {
      triggerEvent("onKeyDown", e);
    }
  }
  function onMouseOver(elem) {
    if (self.selectedDates.length !== 1 || elem && (!elem.classList.contains("flatpickr-day") || elem.classList.contains("flatpickr-disabled"))) return;
    var hoverDate = elem ? elem.dateObj.getTime() : self.days.firstElementChild.dateObj.getTime(),
      initialDate = self.parseDate(self.selectedDates[0], undefined, true).getTime(),
      rangeStartDate = Math.min(hoverDate, self.selectedDates[0].getTime()),
      rangeEndDate = Math.max(hoverDate, self.selectedDates[0].getTime());
    var containsDisabled = false;
    var minRange = 0,
      maxRange = 0;
    for (var t = rangeStartDate; t < rangeEndDate; t += _utils_dates__WEBPACK_IMPORTED_MODULE_5__.duration.DAY) {
      if (!isEnabled(new Date(t), true)) {
        containsDisabled = containsDisabled || t > rangeStartDate && t < rangeEndDate;
        if (t < initialDate && (!minRange || t > minRange)) minRange = t;else if (t > initialDate && (!maxRange || t < maxRange)) maxRange = t;
      }
    }
    for (var m = 0; m < self.config.showMonths; m++) {
      var month = self.daysContainer.children[m];
      var _loop = function _loop() {
        var dayElem = month.children[i],
          date = dayElem.dateObj;
        var timestamp = date.getTime();
        var outOfRange = minRange > 0 && timestamp < minRange || maxRange > 0 && timestamp > maxRange;
        if (outOfRange) {
          dayElem.classList.add("notAllowed");
          ["inRange", "startRange", "endRange"].forEach(function (c) {
            dayElem.classList.remove(c);
          });
          return "continue";
        } else if (containsDisabled && !outOfRange) return "continue";
        ["startRange", "inRange", "endRange", "notAllowed"].forEach(function (c) {
          dayElem.classList.remove(c);
        });
        if (elem !== undefined) {
          elem.classList.add(hoverDate <= self.selectedDates[0].getTime() ? "startRange" : "endRange");
          if (initialDate < hoverDate && timestamp === initialDate) dayElem.classList.add("startRange");else if (initialDate > hoverDate && timestamp === initialDate) dayElem.classList.add("endRange");
          if (timestamp >= minRange && (maxRange === 0 || timestamp <= maxRange) && (0,_utils_dates__WEBPACK_IMPORTED_MODULE_5__.isBetween)(timestamp, initialDate, hoverDate)) dayElem.classList.add("inRange");
        }
      };
      for (var i = 0, l = month.children.length; i < l; i++) {
        var _ret = _loop();
        if (_ret === "continue") continue;
      }
    }
  }
  function onResize() {
    if (self.isOpen && !self.config.static && !self.config.inline) positionCalendar();
  }
  function open(e) {
    var positionElement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : self._positionElement;
    if (self.isMobile === true) {
      if (e) {
        e.preventDefault();
        var eventTarget = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.getEventTarget)(e);
        if (eventTarget) {
          eventTarget.blur();
        }
      }
      if (self.mobileInput !== undefined) {
        self.mobileInput.focus();
        self.mobileInput.click();
      }
      triggerEvent("onOpen");
      return;
    } else if (self._input.disabled || self.config.inline) {
      return;
    }
    var wasOpen = self.isOpen;
    self.isOpen = true;
    if (!wasOpen) {
      self.calendarContainer.classList.add("open");
      self._input.classList.add("active");
      triggerEvent("onOpen");
      positionCalendar(positionElement);
    }
    if (self.config.enableTime === true && self.config.noCalendar === true) {
      if (self.config.allowInput === false && (e === undefined || !self.timeContainer.contains(e.relatedTarget))) {
        setTimeout(function () {
          return self.hourElement.select();
        }, 50);
      }
    }
  }
  function minMaxDateSetter(type) {
    return function (date) {
      var dateObj = self.config["_".concat(type, "Date")] = self.parseDate(date, self.config.dateFormat);
      var inverseDateObj = self.config["_".concat(type === "min" ? "max" : "min", "Date")];
      if (dateObj !== undefined) {
        self[type === "min" ? "minDateHasTime" : "maxDateHasTime"] = dateObj.getHours() > 0 || dateObj.getMinutes() > 0 || dateObj.getSeconds() > 0;
      }
      if (self.selectedDates) {
        self.selectedDates = self.selectedDates.filter(function (d) {
          return isEnabled(d);
        });
        if (!self.selectedDates.length && type === "min") setHoursFromDate(dateObj);
        updateValue();
      }
      if (self.daysContainer) {
        redraw();
        if (dateObj !== undefined) self.currentYearElement[type] = dateObj.getFullYear().toString();else self.currentYearElement.removeAttribute(type);
        self.currentYearElement.disabled = !!inverseDateObj && dateObj !== undefined && inverseDateObj.getFullYear() === dateObj.getFullYear();
      }
    };
  }
  function parseConfig() {
    var boolOpts = ["wrap", "weekNumbers", "allowInput", "allowInvalidPreload", "clickOpens", "time_24hr", "enableTime", "noCalendar", "altInput", "shorthandCurrentMonth", "inline", "static", "enableSeconds", "disableMobile"];
    var userConfig = Object.assign(Object.assign({}, JSON.parse(JSON.stringify(element.dataset || {}))), instanceConfig);
    var formats = {};
    self.config.parseDate = userConfig.parseDate;
    self.config.formatDate = userConfig.formatDate;
    Object.defineProperty(self.config, "enable", {
      get: function get() {
        return self.config._enable;
      },
      set: function set(dates) {
        self.config._enable = parseDateRules(dates);
      }
    });
    Object.defineProperty(self.config, "disable", {
      get: function get() {
        return self.config._disable;
      },
      set: function set(dates) {
        self.config._disable = parseDateRules(dates);
      }
    });
    var timeMode = userConfig.mode === "time";
    if (!userConfig.dateFormat && (userConfig.enableTime || timeMode)) {
      var defaultDateFormat = flatpickr.defaultConfig.dateFormat || _types_options__WEBPACK_IMPORTED_MODULE_1__.defaults.dateFormat;
      formats.dateFormat = userConfig.noCalendar || timeMode ? "H:i" + (userConfig.enableSeconds ? ":S" : "") : defaultDateFormat + " H:i" + (userConfig.enableSeconds ? ":S" : "");
    }
    if (userConfig.altInput && (userConfig.enableTime || timeMode) && !userConfig.altFormat) {
      var defaultAltFormat = flatpickr.defaultConfig.altFormat || _types_options__WEBPACK_IMPORTED_MODULE_1__.defaults.altFormat;
      formats.altFormat = userConfig.noCalendar || timeMode ? "h:i" + (userConfig.enableSeconds ? ":S K" : " K") : defaultAltFormat + " h:i".concat(userConfig.enableSeconds ? ":S" : "", " K");
    }
    Object.defineProperty(self.config, "minDate", {
      get: function get() {
        return self.config._minDate;
      },
      set: minMaxDateSetter("min")
    });
    Object.defineProperty(self.config, "maxDate", {
      get: function get() {
        return self.config._maxDate;
      },
      set: minMaxDateSetter("max")
    });
    var minMaxTimeSetter = function minMaxTimeSetter(type) {
      return function (val) {
        self.config[type === "min" ? "_minTime" : "_maxTime"] = self.parseDate(val, "H:i:S");
      };
    };
    Object.defineProperty(self.config, "minTime", {
      get: function get() {
        return self.config._minTime;
      },
      set: minMaxTimeSetter("min")
    });
    Object.defineProperty(self.config, "maxTime", {
      get: function get() {
        return self.config._maxTime;
      },
      set: minMaxTimeSetter("max")
    });
    if (userConfig.mode === "time") {
      self.config.noCalendar = true;
      self.config.enableTime = true;
    }
    Object.assign(self.config, formats, userConfig);
    for (var i = 0; i < boolOpts.length; i++) self.config[boolOpts[i]] = self.config[boolOpts[i]] === true || self.config[boolOpts[i]] === "true";
    _types_options__WEBPACK_IMPORTED_MODULE_1__.HOOKS.filter(function (hook) {
      return self.config[hook] !== undefined;
    }).forEach(function (hook) {
      self.config[hook] = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.arrayify)(self.config[hook] || []).map(bindToInstance);
    });
    self.isMobile = !self.config.disableMobile && !self.config.inline && self.config.mode === "single" && !self.config.disable.length && !self.config.enable && !self.config.weekNumbers && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    for (var _i = 0; _i < self.config.plugins.length; _i++) {
      var pluginConf = self.config.plugins[_i](self) || {};
      for (var key in pluginConf) {
        if (_types_options__WEBPACK_IMPORTED_MODULE_1__.HOOKS.indexOf(key) > -1) {
          self.config[key] = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.arrayify)(pluginConf[key]).map(bindToInstance).concat(self.config[key]);
        } else if (typeof userConfig[key] === "undefined") self.config[key] = pluginConf[key];
      }
    }
    if (!userConfig.altInputClass) {
      self.config.altInputClass = getInputElem().className + " " + self.config.altInputClass;
    }
    triggerEvent("onParseConfig");
  }
  function getInputElem() {
    return self.config.wrap ? element.querySelector("[data-input]") : element;
  }
  function setupLocale() {
    if (typeof self.config.locale !== "object" && typeof flatpickr.l10ns[self.config.locale] === "undefined") self.config.errorHandler(new Error("flatpickr: invalid locale ".concat(self.config.locale)));
    self.l10n = Object.assign(Object.assign({}, flatpickr.l10ns.default), typeof self.config.locale === "object" ? self.config.locale : self.config.locale !== "default" ? flatpickr.l10ns[self.config.locale] : undefined);
    _utils_formatting__WEBPACK_IMPORTED_MODULE_6__.tokenRegex.K = "(".concat(self.l10n.amPM[0], "|").concat(self.l10n.amPM[1], "|").concat(self.l10n.amPM[0].toLowerCase(), "|").concat(self.l10n.amPM[1].toLowerCase(), ")");
    var userConfig = Object.assign(Object.assign({}, instanceConfig), JSON.parse(JSON.stringify(element.dataset || {})));
    if (userConfig.time_24hr === undefined && flatpickr.defaultConfig.time_24hr === undefined) {
      self.config.time_24hr = self.l10n.time_24hr;
    }
    self.formatDate = (0,_utils_dates__WEBPACK_IMPORTED_MODULE_5__.createDateFormatter)(self);
    self.parseDate = (0,_utils_dates__WEBPACK_IMPORTED_MODULE_5__.createDateParser)({
      config: self.config,
      l10n: self.l10n
    });
  }
  function positionCalendar(customPositionElement) {
    if (typeof self.config.position === "function") {
      return void self.config.position(self, customPositionElement);
    }
    if (self.calendarContainer === undefined) return;
    triggerEvent("onPreCalendarPosition");
    var positionElement = customPositionElement || self._positionElement;
    var calendarHeight = Array.prototype.reduce.call(self.calendarContainer.children, function (acc, child) {
        return acc + child.offsetHeight;
      }, 0),
      calendarWidth = self.calendarContainer.offsetWidth,
      configPos = self.config.position.split(" "),
      configPosVertical = configPos[0],
      configPosHorizontal = configPos.length > 1 ? configPos[1] : null,
      inputBounds = positionElement.getBoundingClientRect(),
      distanceFromBottom = window.innerHeight - inputBounds.bottom,
      showOnTop = configPosVertical === "above" || configPosVertical !== "below" && distanceFromBottom < calendarHeight && inputBounds.top > calendarHeight;
    var top = window.pageYOffset + inputBounds.top + (!showOnTop ? positionElement.offsetHeight + 2 : -calendarHeight - 2);
    (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.toggleClass)(self.calendarContainer, "arrowTop", !showOnTop);
    (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.toggleClass)(self.calendarContainer, "arrowBottom", showOnTop);
    if (self.config.inline) return;
    var left = window.pageXOffset + inputBounds.left;
    var isCenter = false;
    var isRight = false;
    if (configPosHorizontal === "center") {
      left -= (calendarWidth - inputBounds.width) / 2;
      isCenter = true;
    } else if (configPosHorizontal === "right") {
      left -= calendarWidth - inputBounds.width;
      isRight = true;
    }
    (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.toggleClass)(self.calendarContainer, "arrowLeft", !isCenter && !isRight);
    (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.toggleClass)(self.calendarContainer, "arrowCenter", isCenter);
    (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.toggleClass)(self.calendarContainer, "arrowRight", isRight);
    var right = window.document.body.offsetWidth - (window.pageXOffset + inputBounds.right);
    var rightMost = left + calendarWidth > window.document.body.offsetWidth;
    var centerMost = right + calendarWidth > window.document.body.offsetWidth;
    (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.toggleClass)(self.calendarContainer, "rightMost", rightMost);
    if (self.config.static) return;
    self.calendarContainer.style.top = "".concat(top, "px");
    if (!rightMost) {
      self.calendarContainer.style.left = "".concat(left, "px");
      self.calendarContainer.style.right = "auto";
    } else if (!centerMost) {
      self.calendarContainer.style.left = "auto";
      self.calendarContainer.style.right = "".concat(right, "px");
    } else {
      var doc = getDocumentStyleSheet();
      if (doc === undefined) return;
      var bodyWidth = window.document.body.offsetWidth;
      var centerLeft = Math.max(0, bodyWidth / 2 - calendarWidth / 2);
      var centerBefore = ".flatpickr-calendar.centerMost:before";
      var centerAfter = ".flatpickr-calendar.centerMost:after";
      var centerIndex = doc.cssRules.length;
      var centerStyle = "{left:".concat(inputBounds.left, "px;right:auto;}");
      (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.toggleClass)(self.calendarContainer, "rightMost", false);
      (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.toggleClass)(self.calendarContainer, "centerMost", true);
      doc.insertRule("".concat(centerBefore, ",").concat(centerAfter).concat(centerStyle), centerIndex);
      self.calendarContainer.style.left = "".concat(centerLeft, "px");
      self.calendarContainer.style.right = "auto";
    }
  }
  function getDocumentStyleSheet() {
    var editableSheet = null;
    for (var i = 0; i < document.styleSheets.length; i++) {
      var sheet = document.styleSheets[i];
      try {
        sheet.cssRules;
      } catch (err) {
        continue;
      }
      editableSheet = sheet;
      break;
    }
    return editableSheet != null ? editableSheet : createStyleSheet();
  }
  function createStyleSheet() {
    var style = document.createElement("style");
    document.head.appendChild(style);
    return style.sheet;
  }
  function redraw() {
    if (self.config.noCalendar || self.isMobile) return;
    buildMonthSwitch();
    updateNavigationCurrentMonth();
    buildDays();
  }
  function focusAndClose() {
    self._input.focus();
    if (window.navigator.userAgent.indexOf("MSIE") !== -1 || navigator.msMaxTouchPoints !== undefined) {
      setTimeout(self.close, 0);
    } else {
      self.close();
    }
  }
  function selectDate(e) {
    e.preventDefault();
    e.stopPropagation();
    var isSelectable = function isSelectable(day) {
      return day.classList && day.classList.contains("flatpickr-day") && !day.classList.contains("flatpickr-disabled") && !day.classList.contains("notAllowed");
    };
    var t = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.findParent)((0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.getEventTarget)(e), isSelectable);
    if (t === undefined) return;
    var target = t;
    var selectedDate = self.latestSelectedDateObj = new Date(target.dateObj.getTime());
    var shouldChangeMonth = (selectedDate.getMonth() < self.currentMonth || selectedDate.getMonth() > self.currentMonth + self.config.showMonths - 1) && self.config.mode !== "range";
    self.selectedDateElem = target;
    if (self.config.mode === "single") self.selectedDates = [selectedDate];else if (self.config.mode === "multiple") {
      var selectedIndex = isDateSelected(selectedDate);
      if (selectedIndex) self.selectedDates.splice(parseInt(selectedIndex), 1);else self.selectedDates.push(selectedDate);
    } else if (self.config.mode === "range") {
      if (self.selectedDates.length === 2) {
        self.clear(false, false);
      }
      self.latestSelectedDateObj = selectedDate;
      self.selectedDates.push(selectedDate);
      if ((0,_utils_dates__WEBPACK_IMPORTED_MODULE_5__.compareDates)(selectedDate, self.selectedDates[0], true) !== 0) self.selectedDates.sort(function (a, b) {
        return a.getTime() - b.getTime();
      });
    }
    setHoursFromInputs();
    if (shouldChangeMonth) {
      var isNewYear = self.currentYear !== selectedDate.getFullYear();
      self.currentYear = selectedDate.getFullYear();
      self.currentMonth = selectedDate.getMonth();
      if (isNewYear) {
        triggerEvent("onYearChange");
        buildMonthSwitch();
      }
      triggerEvent("onMonthChange");
    }
    updateNavigationCurrentMonth();
    buildDays();
    updateValue();
    if (!shouldChangeMonth && self.config.mode !== "range" && self.config.showMonths === 1) focusOnDayElem(target);else if (self.selectedDateElem !== undefined && self.hourElement === undefined) {
      self.selectedDateElem && self.selectedDateElem.focus();
    }
    if (self.hourElement !== undefined) self.hourElement !== undefined && self.hourElement.focus();
    if (self.config.closeOnSelect) {
      var single = self.config.mode === "single" && !self.config.enableTime;
      var range = self.config.mode === "range" && self.selectedDates.length === 2 && !self.config.enableTime;
      if (single || range) {
        focusAndClose();
      }
    }
    triggerChange();
  }
  var CALLBACKS = {
    locale: [setupLocale, updateWeekdays],
    showMonths: [buildMonths, setCalendarWidth, buildWeekdays],
    minDate: [jumpToDate],
    maxDate: [jumpToDate],
    clickOpens: [function () {
      if (self.config.clickOpens === true) {
        bind(self._input, "focus", self.open);
        bind(self._input, "click", self.open);
      } else {
        self._input.removeEventListener("focus", self.open);
        self._input.removeEventListener("click", self.open);
      }
    }]
  };
  function set(option, value) {
    if (option !== null && typeof option === "object") {
      Object.assign(self.config, option);
      for (var key in option) {
        if (CALLBACKS[key] !== undefined) CALLBACKS[key].forEach(function (x) {
          return x();
        });
      }
    } else {
      self.config[option] = value;
      if (CALLBACKS[option] !== undefined) CALLBACKS[option].forEach(function (x) {
        return x();
      });else if (_types_options__WEBPACK_IMPORTED_MODULE_1__.HOOKS.indexOf(option) > -1) self.config[option] = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.arrayify)(value);
    }
    self.redraw();
    updateValue(true);
  }
  function setSelectedDate(inputDate, format) {
    var dates = [];
    if (inputDate instanceof Array) dates = inputDate.map(function (d) {
      return self.parseDate(d, format);
    });else if (inputDate instanceof Date || typeof inputDate === "number") dates = [self.parseDate(inputDate, format)];else if (typeof inputDate === "string") {
      switch (self.config.mode) {
        case "single":
        case "time":
          dates = [self.parseDate(inputDate, format)];
          break;
        case "multiple":
          dates = inputDate.split(self.config.conjunction).map(function (date) {
            return self.parseDate(date, format);
          });
          break;
        case "range":
          dates = inputDate.split(self.l10n.rangeSeparator).map(function (date) {
            return self.parseDate(date, format);
          });
          break;
        default:
          break;
      }
    } else self.config.errorHandler(new Error("Invalid date supplied: ".concat(JSON.stringify(inputDate))));
    self.selectedDates = self.config.allowInvalidPreload ? dates : dates.filter(function (d) {
      return d instanceof Date && isEnabled(d, false);
    });
    if (self.config.mode === "range") self.selectedDates.sort(function (a, b) {
      return a.getTime() - b.getTime();
    });
  }
  function setDate(date) {
    var triggerChange = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var format = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : self.config.dateFormat;
    if (date !== 0 && !date || date instanceof Array && date.length === 0) return self.clear(triggerChange);
    setSelectedDate(date, format);
    self.latestSelectedDateObj = self.selectedDates[self.selectedDates.length - 1];
    self.redraw();
    jumpToDate(undefined, triggerChange);
    setHoursFromDate();
    if (self.selectedDates.length === 0) {
      self.clear(false);
    }
    updateValue(triggerChange);
    if (triggerChange) triggerEvent("onChange");
  }
  function parseDateRules(arr) {
    return arr.slice().map(function (rule) {
      if (typeof rule === "string" || typeof rule === "number" || rule instanceof Date) {
        return self.parseDate(rule, undefined, true);
      } else if (rule && typeof rule === "object" && rule.from && rule.to) return {
        from: self.parseDate(rule.from, undefined),
        to: self.parseDate(rule.to, undefined)
      };
      return rule;
    }).filter(function (x) {
      return x;
    });
  }
  function setupDates() {
    self.selectedDates = [];
    self.now = self.parseDate(self.config.now) || new Date();
    var preloadedDate = self.config.defaultDate || ((self.input.nodeName === "INPUT" || self.input.nodeName === "TEXTAREA") && self.input.placeholder && self.input.value === self.input.placeholder ? null : self.input.value);
    if (preloadedDate) setSelectedDate(preloadedDate, self.config.dateFormat);
    self._initialDate = self.selectedDates.length > 0 ? self.selectedDates[0] : self.config.minDate && self.config.minDate.getTime() > self.now.getTime() ? self.config.minDate : self.config.maxDate && self.config.maxDate.getTime() < self.now.getTime() ? self.config.maxDate : self.now;
    self.currentYear = self._initialDate.getFullYear();
    self.currentMonth = self._initialDate.getMonth();
    if (self.selectedDates.length > 0) self.latestSelectedDateObj = self.selectedDates[0];
    if (self.config.minTime !== undefined) self.config.minTime = self.parseDate(self.config.minTime, "H:i");
    if (self.config.maxTime !== undefined) self.config.maxTime = self.parseDate(self.config.maxTime, "H:i");
    self.minDateHasTime = !!self.config.minDate && (self.config.minDate.getHours() > 0 || self.config.minDate.getMinutes() > 0 || self.config.minDate.getSeconds() > 0);
    self.maxDateHasTime = !!self.config.maxDate && (self.config.maxDate.getHours() > 0 || self.config.maxDate.getMinutes() > 0 || self.config.maxDate.getSeconds() > 0);
  }
  function setupInputs() {
    self.input = getInputElem();
    if (!self.input) {
      self.config.errorHandler(new Error("Invalid input element specified"));
      return;
    }
    self.input._type = self.input.type;
    self.input.type = "text";
    self.input.classList.add("flatpickr-input");
    self._input = self.input;
    if (self.config.altInput) {
      self.altInput = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.createElement)(self.input.nodeName, self.config.altInputClass);
      self._input = self.altInput;
      self.altInput.placeholder = self.input.placeholder;
      self.altInput.disabled = self.input.disabled;
      self.altInput.required = self.input.required;
      self.altInput.tabIndex = self.input.tabIndex;
      self.altInput.type = "text";
      self.input.setAttribute("type", "hidden");
      if (!self.config.static && self.input.parentNode) self.input.parentNode.insertBefore(self.altInput, self.input.nextSibling);
    }
    if (!self.config.allowInput) self._input.setAttribute("readonly", "readonly");
    self._positionElement = self.config.positionElement || self._input;
  }
  function setupMobile() {
    var inputType = self.config.enableTime ? self.config.noCalendar ? "time" : "datetime-local" : "date";
    self.mobileInput = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.createElement)("input", self.input.className + " flatpickr-mobile");
    self.mobileInput.tabIndex = 1;
    self.mobileInput.type = inputType;
    self.mobileInput.disabled = self.input.disabled;
    self.mobileInput.required = self.input.required;
    self.mobileInput.placeholder = self.input.placeholder;
    self.mobileFormatStr = inputType === "datetime-local" ? "Y-m-d\\TH:i:S" : inputType === "date" ? "Y-m-d" : "H:i:S";
    if (self.selectedDates.length > 0) {
      self.mobileInput.defaultValue = self.mobileInput.value = self.formatDate(self.selectedDates[0], self.mobileFormatStr);
    }
    if (self.config.minDate) self.mobileInput.min = self.formatDate(self.config.minDate, "Y-m-d");
    if (self.config.maxDate) self.mobileInput.max = self.formatDate(self.config.maxDate, "Y-m-d");
    if (self.input.getAttribute("step")) self.mobileInput.step = String(self.input.getAttribute("step"));
    self.input.type = "hidden";
    if (self.altInput !== undefined) self.altInput.type = "hidden";
    try {
      if (self.input.parentNode) self.input.parentNode.insertBefore(self.mobileInput, self.input.nextSibling);
    } catch (_a) {}
    bind(self.mobileInput, "change", function (e) {
      self.setDate((0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.getEventTarget)(e).value, false, self.mobileFormatStr);
      triggerEvent("onChange");
      triggerEvent("onClose");
    });
  }
  function toggle(e) {
    if (self.isOpen === true) return self.close();
    self.open(e);
  }
  function triggerEvent(event, data) {
    if (self.config === undefined) return;
    var hooks = self.config[event];
    if (hooks !== undefined && hooks.length > 0) {
      for (var i = 0; hooks[i] && i < hooks.length; i++) hooks[i](self.selectedDates, self.input.value, self, data);
    }
    if (event === "onChange") {
      self.input.dispatchEvent(createEvent("change"));
      self.input.dispatchEvent(createEvent("input"));
    }
  }
  function createEvent(name) {
    var e = document.createEvent("Event");
    e.initEvent(name, true, true);
    return e;
  }
  function isDateSelected(date) {
    for (var i = 0; i < self.selectedDates.length; i++) {
      if ((0,_utils_dates__WEBPACK_IMPORTED_MODULE_5__.compareDates)(self.selectedDates[i], date) === 0) return "" + i;
    }
    return false;
  }
  function isDateInRange(date) {
    if (self.config.mode !== "range" || self.selectedDates.length < 2) return false;
    return (0,_utils_dates__WEBPACK_IMPORTED_MODULE_5__.compareDates)(date, self.selectedDates[0]) >= 0 && (0,_utils_dates__WEBPACK_IMPORTED_MODULE_5__.compareDates)(date, self.selectedDates[1]) <= 0;
  }
  function updateNavigationCurrentMonth() {
    if (self.config.noCalendar || self.isMobile || !self.monthNav) return;
    self.yearElements.forEach(function (yearElement, i) {
      var d = new Date(self.currentYear, self.currentMonth, 1);
      d.setMonth(self.currentMonth + i);
      if (self.config.showMonths > 1 || self.config.monthSelectorType === "static") {
        self.monthElements[i].textContent = (0,_utils_formatting__WEBPACK_IMPORTED_MODULE_6__.monthToStr)(d.getMonth(), self.config.shorthandCurrentMonth, self.l10n) + " ";
      } else {
        self.monthsDropdownContainer.value = d.getMonth().toString();
      }
      yearElement.value = d.getFullYear().toString();
    });
    self._hidePrevMonthArrow = self.config.minDate !== undefined && (self.currentYear === self.config.minDate.getFullYear() ? self.currentMonth <= self.config.minDate.getMonth() : self.currentYear < self.config.minDate.getFullYear());
    self._hideNextMonthArrow = self.config.maxDate !== undefined && (self.currentYear === self.config.maxDate.getFullYear() ? self.currentMonth + 1 > self.config.maxDate.getMonth() : self.currentYear > self.config.maxDate.getFullYear());
  }
  function getDateStr(format) {
    return self.selectedDates.map(function (dObj) {
      return self.formatDate(dObj, format);
    }).filter(function (d, i, arr) {
      return self.config.mode !== "range" || self.config.enableTime || arr.indexOf(d) === i;
    }).join(self.config.mode !== "range" ? self.config.conjunction : self.l10n.rangeSeparator);
  }
  function updateValue() {
    var triggerChange = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    if (self.mobileInput !== undefined && self.mobileFormatStr) {
      self.mobileInput.value = self.latestSelectedDateObj !== undefined ? self.formatDate(self.latestSelectedDateObj, self.mobileFormatStr) : "";
    }
    self.input.value = getDateStr(self.config.dateFormat);
    if (self.altInput !== undefined) {
      self.altInput.value = getDateStr(self.config.altFormat);
    }
    if (triggerChange !== false) triggerEvent("onValueUpdate");
  }
  function onMonthNavClick(e) {
    var eventTarget = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.getEventTarget)(e);
    var isPrevMonth = self.prevMonthNav.contains(eventTarget);
    var isNextMonth = self.nextMonthNav.contains(eventTarget);
    if (isPrevMonth || isNextMonth) {
      changeMonth(isPrevMonth ? -1 : 1);
    } else if (self.yearElements.indexOf(eventTarget) >= 0) {
      eventTarget.select();
    } else if (eventTarget.classList.contains("arrowUp")) {
      self.changeYear(self.currentYear + 1);
    } else if (eventTarget.classList.contains("arrowDown")) {
      self.changeYear(self.currentYear - 1);
    }
  }
  function timeWrapper(e) {
    e.preventDefault();
    var isKeyDown = e.type === "keydown",
      eventTarget = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.getEventTarget)(e),
      input = eventTarget;
    if (self.amPM !== undefined && eventTarget === self.amPM) {
      self.amPM.textContent = self.l10n.amPM[(0,_utils__WEBPACK_IMPORTED_MODULE_3__.int)(self.amPM.textContent === self.l10n.amPM[0])];
    }
    var min = parseFloat(input.getAttribute("min")),
      max = parseFloat(input.getAttribute("max")),
      step = parseFloat(input.getAttribute("step")),
      curValue = parseInt(input.value, 10),
      delta = e.delta || (isKeyDown ? e.which === 38 ? 1 : -1 : 0);
    var newValue = curValue + step * delta;
    if (typeof input.value !== "undefined" && input.value.length === 2) {
      var isHourElem = input === self.hourElement,
        isMinuteElem = input === self.minuteElement;
      if (newValue < min) {
        newValue = max + newValue + (0,_utils__WEBPACK_IMPORTED_MODULE_3__.int)(!isHourElem) + ((0,_utils__WEBPACK_IMPORTED_MODULE_3__.int)(isHourElem) && (0,_utils__WEBPACK_IMPORTED_MODULE_3__.int)(!self.amPM));
        if (isMinuteElem) incrementNumInput(undefined, -1, self.hourElement);
      } else if (newValue > max) {
        newValue = input === self.hourElement ? newValue - max - (0,_utils__WEBPACK_IMPORTED_MODULE_3__.int)(!self.amPM) : min;
        if (isMinuteElem) incrementNumInput(undefined, 1, self.hourElement);
      }
      if (self.amPM && isHourElem && (step === 1 ? newValue + curValue === 23 : Math.abs(newValue - curValue) > step)) {
        self.amPM.textContent = self.l10n.amPM[(0,_utils__WEBPACK_IMPORTED_MODULE_3__.int)(self.amPM.textContent === self.l10n.amPM[0])];
      }
      input.value = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.pad)(newValue);
    }
  }
  init();
  return self;
}
function _flatpickr(nodeList, config) {
  var nodes = Array.prototype.slice.call(nodeList).filter(function (x) {
    return x instanceof HTMLElement;
  });
  var instances = [];
  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    try {
      if (node.getAttribute("data-fp-omit") !== null) continue;
      if (node._flatpickr !== undefined) {
        node._flatpickr.destroy();
        node._flatpickr = undefined;
      }
      node._flatpickr = FlatpickrInstance(node, config || {});
      instances.push(node._flatpickr);
    } catch (e) {
      console.error(e);
    }
  }
  return instances.length === 1 ? instances[0] : instances;
}
if (typeof HTMLElement !== "undefined" && typeof HTMLCollection !== "undefined" && typeof NodeList !== "undefined") {
  HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function (config) {
    return _flatpickr(this, config);
  };
  HTMLElement.prototype.flatpickr = function (config) {
    return _flatpickr([this], config);
  };
}
var flatpickr = function flatpickr(selector, config) {
  if (typeof selector === "string") {
    return _flatpickr(window.document.querySelectorAll(selector), config);
  } else if (selector instanceof Node) {
    return _flatpickr([selector], config);
  } else {
    return _flatpickr(selector, config);
  }
};
flatpickr.defaultConfig = {};
flatpickr.l10ns = {
  en: Object.assign({}, _l10n_default__WEBPACK_IMPORTED_MODULE_2__["default"]),
  default: Object.assign({}, _l10n_default__WEBPACK_IMPORTED_MODULE_2__["default"])
};
flatpickr.localize = function (l10n) {
  flatpickr.l10ns.default = Object.assign(Object.assign({}, flatpickr.l10ns.default), l10n);
};
flatpickr.setDefaults = function (config) {
  flatpickr.defaultConfig = Object.assign(Object.assign({}, flatpickr.defaultConfig), config);
};
flatpickr.parseDate = (0,_utils_dates__WEBPACK_IMPORTED_MODULE_5__.createDateParser)({});
flatpickr.formatDate = (0,_utils_dates__WEBPACK_IMPORTED_MODULE_5__.createDateFormatter)({});
flatpickr.compareDates = _utils_dates__WEBPACK_IMPORTED_MODULE_5__.compareDates;
if (typeof jQuery !== "undefined" && typeof jQuery.fn !== "undefined") {
  jQuery.fn.flatpickr = function (config) {
    return _flatpickr(this, config);
  };
}
Date.prototype.fp_incr = function (days) {
  return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof days === "string" ? parseInt(days, 10) : days));
};
if (typeof window !== "undefined") {
  window.flatpickr = flatpickr;
}
/* harmony default export */ __webpack_exports__["default"] = (flatpickr);

/***/ }),

/***/ 2027:
/*!*********************************************************!*\
  !*** ./node_modules/flatpickr/dist/esm/l10n/default.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "english": function() { return /* binding */ english; }
/* harmony export */ });
var english = {
  weekdays: {
    shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    longhand: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  },
  months: {
    shorthand: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    longhand: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  },
  daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  firstDayOfWeek: 0,
  ordinal: function ordinal(nth) {
    var s = nth % 100;
    if (s > 3 && s < 21) return "th";
    switch (s % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  },
  rangeSeparator: " to ",
  weekAbbreviation: "Wk",
  scrollTitle: "Scroll to increment",
  toggleTitle: "Click to toggle",
  amPM: ["AM", "PM"],
  yearAriaLabel: "Year",
  monthAriaLabel: "Month",
  hourAriaLabel: "Hour",
  minuteAriaLabel: "Minute",
  time_24hr: false
};
/* harmony default export */ __webpack_exports__["default"] = (english);

/***/ }),

/***/ 9794:
/*!**********************************************************!*\
  !*** ./node_modules/flatpickr/dist/esm/types/options.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HOOKS": function() { return /* binding */ HOOKS; },
/* harmony export */   "defaults": function() { return /* binding */ defaults; }
/* harmony export */ });
var HOOKS = ["onChange", "onClose", "onDayCreate", "onDestroy", "onKeyDown", "onMonthChange", "onOpen", "onParseConfig", "onReady", "onValueUpdate", "onYearChange", "onPreCalendarPosition"];
var defaults = {
  _disable: [],
  allowInput: false,
  allowInvalidPreload: false,
  altFormat: "F j, Y",
  altInput: false,
  altInputClass: "form-control input",
  animate: typeof window === "object" && window.navigator.userAgent.indexOf("MSIE") === -1,
  ariaDateFormat: "F j, Y",
  autoFillDefaultTime: true,
  clickOpens: true,
  closeOnSelect: true,
  conjunction: ", ",
  dateFormat: "Y-m-d",
  defaultHour: 12,
  defaultMinute: 0,
  defaultSeconds: 0,
  disable: [],
  disableMobile: false,
  enableSeconds: false,
  enableTime: false,
  errorHandler: function errorHandler(err) {
    return typeof console !== "undefined" && console.warn(err);
  },
  getWeek: function getWeek(givenDate) {
    var date = new Date(givenDate.getTime());
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    var week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  },
  hourIncrement: 1,
  ignoredFocusElements: [],
  inline: false,
  locale: "default",
  minuteIncrement: 5,
  mode: "single",
  monthSelectorType: "dropdown",
  nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
  noCalendar: false,
  now: new Date(),
  onChange: [],
  onClose: [],
  onDayCreate: [],
  onDestroy: [],
  onKeyDown: [],
  onMonthChange: [],
  onOpen: [],
  onParseConfig: [],
  onReady: [],
  onValueUpdate: [],
  onYearChange: [],
  onPreCalendarPosition: [],
  plugins: [],
  position: "auto",
  positionElement: undefined,
  prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
  shorthandCurrentMonth: false,
  showMonths: 1,
  static: false,
  time_24hr: false,
  weekNumbers: false,
  wrap: false
};

/***/ }),

/***/ 8621:
/*!********************************************************!*\
  !*** ./node_modules/flatpickr/dist/esm/utils/dates.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createDateFormatter": function() { return /* binding */ createDateFormatter; },
/* harmony export */   "createDateParser": function() { return /* binding */ createDateParser; },
/* harmony export */   "compareDates": function() { return /* binding */ compareDates; },
/* harmony export */   "compareTimes": function() { return /* binding */ compareTimes; },
/* harmony export */   "isBetween": function() { return /* binding */ isBetween; },
/* harmony export */   "duration": function() { return /* binding */ duration; },
/* harmony export */   "getDefaultHours": function() { return /* binding */ getDefaultHours; }
/* harmony export */ });
/* harmony import */ var _formatting__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./formatting */ 9352);
/* harmony import */ var _types_options__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types/options */ 9794);
/* harmony import */ var _l10n_default__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../l10n/default */ 2027);



var createDateFormatter = function createDateFormatter(_ref) {
  var _ref$config = _ref.config,
    config = _ref$config === void 0 ? _types_options__WEBPACK_IMPORTED_MODULE_1__.defaults : _ref$config,
    _ref$l10n = _ref.l10n,
    l10n = _ref$l10n === void 0 ? _l10n_default__WEBPACK_IMPORTED_MODULE_2__.english : _ref$l10n,
    _ref$isMobile = _ref.isMobile,
    isMobile = _ref$isMobile === void 0 ? false : _ref$isMobile;
  return function (dateObj, frmt, overrideLocale) {
    var locale = overrideLocale || l10n;
    if (config.formatDate !== undefined && !isMobile) {
      return config.formatDate(dateObj, frmt, locale);
    }
    return frmt.split("").map(function (c, i, arr) {
      return _formatting__WEBPACK_IMPORTED_MODULE_0__.formats[c] && arr[i - 1] !== "\\" ? _formatting__WEBPACK_IMPORTED_MODULE_0__.formats[c](dateObj, locale, config) : c !== "\\" ? c : "";
    }).join("");
  };
};
var createDateParser = function createDateParser(_ref2) {
  var _ref2$config = _ref2.config,
    config = _ref2$config === void 0 ? _types_options__WEBPACK_IMPORTED_MODULE_1__.defaults : _ref2$config,
    _ref2$l10n = _ref2.l10n,
    l10n = _ref2$l10n === void 0 ? _l10n_default__WEBPACK_IMPORTED_MODULE_2__.english : _ref2$l10n;
  return function (date, givenFormat, timeless, customLocale) {
    if (date !== 0 && !date) return undefined;
    var locale = customLocale || l10n;
    var parsedDate;
    var dateOrig = date;
    if (date instanceof Date) parsedDate = new Date(date.getTime());else if (typeof date !== "string" && date.toFixed !== undefined) parsedDate = new Date(date);else if (typeof date === "string") {
      var format = givenFormat || (config || _types_options__WEBPACK_IMPORTED_MODULE_1__.defaults).dateFormat;
      var datestr = String(date).trim();
      if (datestr === "today") {
        parsedDate = new Date();
        timeless = true;
      } else if (/Z$/.test(datestr) || /GMT$/.test(datestr)) parsedDate = new Date(date);else if (config && config.parseDate) parsedDate = config.parseDate(date, format);else {
        parsedDate = !config || !config.noCalendar ? new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0) : new Date(new Date().setHours(0, 0, 0, 0));
        var matched,
          ops = [];
        for (var i = 0, matchIndex = 0, regexStr = ""; i < format.length; i++) {
          var token = format[i];
          var isBackSlash = token === "\\";
          var escaped = format[i - 1] === "\\" || isBackSlash;
          if (_formatting__WEBPACK_IMPORTED_MODULE_0__.tokenRegex[token] && !escaped) {
            regexStr += _formatting__WEBPACK_IMPORTED_MODULE_0__.tokenRegex[token];
            var match = new RegExp(regexStr).exec(date);
            if (match && (matched = true)) {
              ops[token !== "Y" ? "push" : "unshift"]({
                fn: _formatting__WEBPACK_IMPORTED_MODULE_0__.revFormat[token],
                val: match[++matchIndex]
              });
            }
          } else if (!isBackSlash) regexStr += ".";
          ops.forEach(function (_ref3) {
            var fn = _ref3.fn,
              val = _ref3.val;
            return parsedDate = fn(parsedDate, val, locale) || parsedDate;
          });
        }
        parsedDate = matched ? parsedDate : undefined;
      }
    }
    if (!(parsedDate instanceof Date && !isNaN(parsedDate.getTime()))) {
      config.errorHandler(new Error("Invalid date provided: ".concat(dateOrig)));
      return undefined;
    }
    if (timeless === true) parsedDate.setHours(0, 0, 0, 0);
    return parsedDate;
  };
};
function compareDates(date1, date2) {
  var timeless = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (timeless !== false) {
    return new Date(date1.getTime()).setHours(0, 0, 0, 0) - new Date(date2.getTime()).setHours(0, 0, 0, 0);
  }
  return date1.getTime() - date2.getTime();
}
function compareTimes(date1, date2) {
  return 3600 * (date1.getHours() - date2.getHours()) + 60 * (date1.getMinutes() - date2.getMinutes()) + date1.getSeconds() - date2.getSeconds();
}
var isBetween = function isBetween(ts, ts1, ts2) {
  return ts > Math.min(ts1, ts2) && ts < Math.max(ts1, ts2);
};
var duration = {
  DAY: 86400000
};
function getDefaultHours(config) {
  var hours = config.defaultHour;
  var minutes = config.defaultMinute;
  var seconds = config.defaultSeconds;
  if (config.minDate !== undefined) {
    var minHour = config.minDate.getHours();
    var minMinutes = config.minDate.getMinutes();
    var minSeconds = config.minDate.getSeconds();
    if (hours < minHour) {
      hours = minHour;
    }
    if (hours === minHour && minutes < minMinutes) {
      minutes = minMinutes;
    }
    if (hours === minHour && minutes === minMinutes && seconds < minSeconds) seconds = config.minDate.getSeconds();
  }
  if (config.maxDate !== undefined) {
    var maxHr = config.maxDate.getHours();
    var maxMinutes = config.maxDate.getMinutes();
    hours = Math.min(hours, maxHr);
    if (hours === maxHr) minutes = Math.min(maxMinutes, minutes);
    if (hours === maxHr && minutes === maxMinutes) seconds = config.maxDate.getSeconds();
  }
  return {
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };
}

/***/ }),

/***/ 6:
/*!******************************************************!*\
  !*** ./node_modules/flatpickr/dist/esm/utils/dom.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toggleClass": function() { return /* binding */ toggleClass; },
/* harmony export */   "createElement": function() { return /* binding */ createElement; },
/* harmony export */   "clearNode": function() { return /* binding */ clearNode; },
/* harmony export */   "findParent": function() { return /* binding */ findParent; },
/* harmony export */   "createNumberInput": function() { return /* binding */ createNumberInput; },
/* harmony export */   "getEventTarget": function() { return /* binding */ getEventTarget; }
/* harmony export */ });
function toggleClass(elem, className, bool) {
  if (bool === true) return elem.classList.add(className);
  elem.classList.remove(className);
}
function createElement(tag, className, content) {
  var e = window.document.createElement(tag);
  className = className || "";
  content = content || "";
  e.className = className;
  if (content !== undefined) e.textContent = content;
  return e;
}
function clearNode(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
}
function findParent(node, condition) {
  if (condition(node)) return node;else if (node.parentNode) return findParent(node.parentNode, condition);
  return undefined;
}
function createNumberInput(inputClassName, opts) {
  var wrapper = createElement("div", "numInputWrapper"),
    numInput = createElement("input", "numInput " + inputClassName),
    arrowUp = createElement("span", "arrowUp"),
    arrowDown = createElement("span", "arrowDown");
  if (navigator.userAgent.indexOf("MSIE 9.0") === -1) {
    numInput.type = "number";
  } else {
    numInput.type = "text";
    numInput.pattern = "\\d*";
  }
  if (opts !== undefined) for (var key in opts) numInput.setAttribute(key, opts[key]);
  wrapper.appendChild(numInput);
  wrapper.appendChild(arrowUp);
  wrapper.appendChild(arrowDown);
  return wrapper;
}
function getEventTarget(event) {
  try {
    if (typeof event.composedPath === "function") {
      var path = event.composedPath();
      return path[0];
    }
    return event.target;
  } catch (error) {
    return event.target;
  }
}

/***/ }),

/***/ 9352:
/*!*************************************************************!*\
  !*** ./node_modules/flatpickr/dist/esm/utils/formatting.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "monthToStr": function() { return /* binding */ monthToStr; },
/* harmony export */   "revFormat": function() { return /* binding */ revFormat; },
/* harmony export */   "tokenRegex": function() { return /* binding */ tokenRegex; },
/* harmony export */   "formats": function() { return /* binding */ formats; }
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ 476);

var doNothing = function doNothing() {
  return undefined;
};
var monthToStr = function monthToStr(monthNumber, shorthand, locale) {
  return locale.months[shorthand ? "shorthand" : "longhand"][monthNumber];
};
var revFormat = {
  D: doNothing,
  F: function F(dateObj, monthName, locale) {
    dateObj.setMonth(locale.months.longhand.indexOf(monthName));
  },
  G: function G(dateObj, hour) {
    dateObj.setHours(parseFloat(hour));
  },
  H: function H(dateObj, hour) {
    dateObj.setHours(parseFloat(hour));
  },
  J: function J(dateObj, day) {
    dateObj.setDate(parseFloat(day));
  },
  K: function K(dateObj, amPM, locale) {
    dateObj.setHours(dateObj.getHours() % 12 + 12 * (0,_utils__WEBPACK_IMPORTED_MODULE_0__.int)(new RegExp(locale.amPM[1], "i").test(amPM)));
  },
  M: function M(dateObj, shortMonth, locale) {
    dateObj.setMonth(locale.months.shorthand.indexOf(shortMonth));
  },
  S: function S(dateObj, seconds) {
    dateObj.setSeconds(parseFloat(seconds));
  },
  U: function U(_, unixSeconds) {
    return new Date(parseFloat(unixSeconds) * 1000);
  },
  W: function W(dateObj, weekNum, locale) {
    var weekNumber = parseInt(weekNum);
    var date = new Date(dateObj.getFullYear(), 0, 2 + (weekNumber - 1) * 7, 0, 0, 0, 0);
    date.setDate(date.getDate() - date.getDay() + locale.firstDayOfWeek);
    return date;
  },
  Y: function Y(dateObj, year) {
    dateObj.setFullYear(parseFloat(year));
  },
  Z: function Z(_, ISODate) {
    return new Date(ISODate);
  },
  d: function d(dateObj, day) {
    dateObj.setDate(parseFloat(day));
  },
  h: function h(dateObj, hour) {
    dateObj.setHours(parseFloat(hour));
  },
  i: function i(dateObj, minutes) {
    dateObj.setMinutes(parseFloat(minutes));
  },
  j: function j(dateObj, day) {
    dateObj.setDate(parseFloat(day));
  },
  l: doNothing,
  m: function m(dateObj, month) {
    dateObj.setMonth(parseFloat(month) - 1);
  },
  n: function n(dateObj, month) {
    dateObj.setMonth(parseFloat(month) - 1);
  },
  s: function s(dateObj, seconds) {
    dateObj.setSeconds(parseFloat(seconds));
  },
  u: function u(_, unixMillSeconds) {
    return new Date(parseFloat(unixMillSeconds));
  },
  w: doNothing,
  y: function y(dateObj, year) {
    dateObj.setFullYear(2000 + parseFloat(year));
  }
};
var tokenRegex = {
  D: "(\\w+)",
  F: "(\\w+)",
  G: "(\\d\\d|\\d)",
  H: "(\\d\\d|\\d)",
  J: "(\\d\\d|\\d)\\w+",
  K: "",
  M: "(\\w+)",
  S: "(\\d\\d|\\d)",
  U: "(.+)",
  W: "(\\d\\d|\\d)",
  Y: "(\\d{4})",
  Z: "(.+)",
  d: "(\\d\\d|\\d)",
  h: "(\\d\\d|\\d)",
  i: "(\\d\\d|\\d)",
  j: "(\\d\\d|\\d)",
  l: "(\\w+)",
  m: "(\\d\\d|\\d)",
  n: "(\\d\\d|\\d)",
  s: "(\\d\\d|\\d)",
  u: "(.+)",
  w: "(\\d\\d|\\d)",
  y: "(\\d{2})"
};
var formats = {
  Z: function Z(date) {
    return date.toISOString();
  },
  D: function D(date, locale, options) {
    return locale.weekdays.shorthand[formats.w(date, locale, options)];
  },
  F: function F(date, locale, options) {
    return monthToStr(formats.n(date, locale, options) - 1, false, locale);
  },
  G: function G(date, locale, options) {
    return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.pad)(formats.h(date, locale, options));
  },
  H: function H(date) {
    return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.pad)(date.getHours());
  },
  J: function J(date, locale) {
    return locale.ordinal !== undefined ? date.getDate() + locale.ordinal(date.getDate()) : date.getDate();
  },
  K: function K(date, locale) {
    return locale.amPM[(0,_utils__WEBPACK_IMPORTED_MODULE_0__.int)(date.getHours() > 11)];
  },
  M: function M(date, locale) {
    return monthToStr(date.getMonth(), true, locale);
  },
  S: function S(date) {
    return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.pad)(date.getSeconds());
  },
  U: function U(date) {
    return date.getTime() / 1000;
  },
  W: function W(date, _, options) {
    return options.getWeek(date);
  },
  Y: function Y(date) {
    return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.pad)(date.getFullYear(), 4);
  },
  d: function d(date) {
    return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.pad)(date.getDate());
  },
  h: function h(date) {
    return date.getHours() % 12 ? date.getHours() % 12 : 12;
  },
  i: function i(date) {
    return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.pad)(date.getMinutes());
  },
  j: function j(date) {
    return date.getDate();
  },
  l: function l(date, locale) {
    return locale.weekdays.longhand[date.getDay()];
  },
  m: function m(date) {
    return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.pad)(date.getMonth() + 1);
  },
  n: function n(date) {
    return date.getMonth() + 1;
  },
  s: function s(date) {
    return date.getSeconds();
  },
  u: function u(date) {
    return date.getTime();
  },
  w: function w(date) {
    return date.getDay();
  },
  y: function y(date) {
    return String(date.getFullYear()).substring(2);
  }
};

/***/ }),

/***/ 476:
/*!********************************************************!*\
  !*** ./node_modules/flatpickr/dist/esm/utils/index.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pad": function() { return /* binding */ pad; },
/* harmony export */   "int": function() { return /* binding */ int; },
/* harmony export */   "debounce": function() { return /* binding */ debounce; },
/* harmony export */   "arrayify": function() { return /* binding */ arrayify; }
/* harmony export */ });
var pad = function pad(number) {
  var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  return "000".concat(number).slice(length * -1);
};
var int = function int(bool) {
  return bool === true ? 1 : 0;
};
function debounce(fn, wait) {
  var t;
  return function () {
    var _arguments = arguments,
      _this = this;
    clearTimeout(t);
    t = setTimeout(function () {
      return fn.apply(_this, _arguments);
    }, wait);
  };
}
var arrayify = function arrayify(obj) {
  return obj instanceof Array ? obj : [obj];
};

/***/ }),

/***/ 9406:
/*!************************************************************!*\
  !*** ./node_modules/flatpickr/dist/esm/utils/polyfills.js ***!
  \************************************************************/
/***/ (function() {



if (typeof Object.assign !== "function") {
  Object.assign = function (target) {
    if (!target) {
      throw TypeError("Cannot convert undefined or null to object");
    }
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    var _loop = function _loop() {
      var source = _args[_i];
      if (source) {
        Object.keys(source).forEach(function (key) {
          return target[key] = source[key];
        });
      }
    };
    for (var _i = 0, _args = args; _i < _args.length; _i++) {
      _loop();
    }
    return target;
  };
}

/***/ }),

/***/ 9792:
/*!***************************************************************************!*\
  !*** ./node_modules/ng2-flatpickr/__ivy_ngcc__/fesm2015/ng2-flatpickr.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ng2FlatpickrComponent": function() { return /* binding */ Ng2FlatpickrComponent; },
/* harmony export */   "Ng2FlatpickrDirective": function() { return /* binding */ Ng2FlatpickrDirective; },
/* harmony export */   "Ng2FlatpickrModule": function() { return /* binding */ Ng2FlatpickrModule; }
/* harmony export */ });
/* harmony import */ var F_project_development_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ 5960);
/* harmony import */ var F_project_development_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ 9367);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 1794);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 8346);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 8267);
/* harmony import */ var flatpickr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flatpickr */ 224);










var _c0 = ["flatpickr"];
function Ng2FlatpickrComponent_input_2_Template(rf, ctx) {
  if (rf & 1) {
    var _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "input", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("focus", function Ng2FlatpickrComponent_input_2_Template_input_focus_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r3);
      var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return ctx_r2.onFocus($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassMapInterpolate1"]("ng2-flatpickr-input ", ctx_r1.addClass, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("placeholder", ctx_r1.placeholder)("tabindex", ctx_r1.tabindex);
  }
}
var _c1 = ["*"];
var Ng2FlatpickrComponent_1;
if (typeof window !== 'undefined') {
  __webpack_require__(/*! flatpickr */ 224);
}
var Ng2FlatpickrComponent = Ng2FlatpickrComponent_1 = /*#__PURE__*/function () {
  function Ng2FlatpickrComponent() {
    var _this = this;
    (0,F_project_development_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Ng2FlatpickrComponent);
    this._tabindex = 0;
    this.onTouchedFn = function () {};
    this.defaultFlatpickrOptions = {
      wrap: true,
      clickOpens: true,
      onChange: function onChange(selectedDates) {
        _this.writeValue(selectedDates);
      }
    };
    this.placeholder = "";
    this.addClass = "";
    this.hideButton = false;
    this.propagateChange = function (_) {};
  }
  (0,F_project_development_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Ng2FlatpickrComponent, [{
    key: "tabindex",
    get: function get() {
      return this._tabindex;
    },
    set: function set(ti) {
      this._tabindex = Number(ti);
    }
    ///////////////////////////////////
  }, {
    key: "writeValue",
    value: function writeValue(value) {
      this.propagateChange(value);
    }
  }, {
    key: "registerOnChange",
    value: function registerOnChange(fn) {
      this.propagateChange = fn;
    }
  }, {
    key: "registerOnTouched",
    value: function registerOnTouched(fn) {
      this.onTouchedFn = fn;
    }
    ///////////////////////////////////
  }, {
    key: "setDateFromInput",
    value: function setDateFromInput(date) {
      this.flatpickrElement.nativeElement._flatpickr.setDate(date, true);
    }
  }, {
    key: "setAltInputPlaceholder",
    value: function setAltInputPlaceholder(placeholder) {
      this.flatpickrElement.nativeElement._flatpickr.altInput.setAttribute('placeholder', placeholder);
    }
  }, {
    key: "ngAfterViewInit",
    value: function ngAfterViewInit() {
      if (this.config) {
        Object.assign(this.defaultFlatpickrOptions, this.config);
      }
      if (this.flatpickrElement.nativeElement.flatpickr) {
        this.flatpickr = this.flatpickrElement.nativeElement.flatpickr(this.defaultFlatpickrOptions);
      }
      if (this.setDate) {
        this.setDateFromInput(this.setDate);
      }
    }
  }, {
    key: "ngOnChanges",
    value: function ngOnChanges(changes) {
      if (this.flatpickrElement.nativeElement && this.flatpickrElement.nativeElement._flatpickr) {
        if (changes.hasOwnProperty('setDate') && changes['setDate'].currentValue) {
          this.setDateFromInput(changes['setDate'].currentValue);
        }
        if (this.config.altInput && changes.hasOwnProperty('placeholder') && changes['placeholder'].currentValue) {
          this.setAltInputPlaceholder(changes['placeholder'].currentValue);
        }
      }
    }
  }, {
    key: "onFocus",
    value: function onFocus(event) {
      this.onTouchedFn();
    }
  }]);
  return Ng2FlatpickrComponent;
}();
Ng2FlatpickrComponent.ɵfac = function Ng2FlatpickrComponent_Factory(t) {
  return new (t || Ng2FlatpickrComponent)();
};
Ng2FlatpickrComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: Ng2FlatpickrComponent,
  selectors: [["ng2-flatpickr"]],
  viewQuery: function Ng2FlatpickrComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c0, 7);
    }
    if (rf & 2) {
      var _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.flatpickrElement = _t.first);
    }
  },
  inputs: {
    placeholder: "placeholder",
    addClass: "addClass",
    hideButton: "hideButton",
    tabindex: "tabindex",
    config: "config",
    setDate: "setDate"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵProvidersFeature"]([{
    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NG_VALUE_ACCESSOR,
    useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.forwardRef)(function () {
      return Ng2FlatpickrComponent_1;
    }),
    multi: true
  }]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵNgOnChangesFeature"]],
  ngContentSelectors: _c1,
  decls: 4,
  vars: 1,
  consts: [[1, "ng2-flatpickr-input-container"], ["flatpickr", ""], ["type", "text", "data-input", "", 3, "class", "placeholder", "tabindex", "focus", 4, "ngIf"], ["type", "text", "data-input", "", 3, "placeholder", "tabindex", "focus"]],
  template: function Ng2FlatpickrComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵprojectionDef"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0, 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, Ng2FlatpickrComponent_input_2_Template, 1, 5, "input", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵprojection"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.hideButton);
    }
  },
  directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf],
  encapsulation: 2
});
(0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.ViewChild)('flatpickr', {
  static: true
})], Ng2FlatpickrComponent.prototype, "flatpickrElement", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input)()], Ng2FlatpickrComponent.prototype, "config", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input)()], Ng2FlatpickrComponent.prototype, "placeholder", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input)()], Ng2FlatpickrComponent.prototype, "addClass", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input)()], Ng2FlatpickrComponent.prototype, "setDate", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input)()], Ng2FlatpickrComponent.prototype, "tabindex", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input)()], Ng2FlatpickrComponent.prototype, "hideButton", void 0);
var Ng2FlatpickrDirective = /*#__PURE__*/function () {
  function Ng2FlatpickrDirective(parent, ngControl, element, renderer) {
    (0,F_project_development_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Ng2FlatpickrDirective);
    this.parent = parent;
    this.ngControl = ngControl;
    this.element = element;
    this.renderer = renderer;
    /**
     * onChange gets triggered when the user selects a date, or changes the time on a selected date.
     *
     * Default:  null
     */
    this.flatpickrOnChange = new _angular_core__WEBPACK_IMPORTED_MODULE_3__.EventEmitter();
    /**
     * onClose gets triggered when the calendar is closed.
     *
     * Default:  null
     */
    this.flatpickrOnClose = new _angular_core__WEBPACK_IMPORTED_MODULE_3__.EventEmitter();
    /**
     * onOpen gets triggered when the calendar is opened.
     *
     * Default:  null
     */
    this.flatpickrOnOpen = new _angular_core__WEBPACK_IMPORTED_MODULE_3__.EventEmitter();
    /**
     * onReady gets triggered once the calendar is in a ready state.
     *
     * Default:  null
     */
    this.flatpickrOnReady = new _angular_core__WEBPACK_IMPORTED_MODULE_3__.EventEmitter();
  }
  /** Allow double-clicking on the control to open/close it. */
  (0,F_project_development_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Ng2FlatpickrDirective, [{
    key: "onClick",
    value: function onClick() {
      this.flatpickr.toggle();
    }
  }, {
    key: "control",
    get: function get() {
      return this.parent ? this.parent.formDirective.getControl(this.ngControl) : null;
    }
  }, {
    key: "ngAfterViewInit",
    value: function ngAfterViewInit() {
      /** We cannot initialize the flatpickr instance in ngOnInit(); it will
          randomize the date when the form control initializes. */
      var nativeElement = this.element.nativeElement;
      if (typeof nativeElement === 'undefined' || nativeElement === null) {
        throw 'Error: invalid input element specified';
      }
      if (this.flatpickrOptions.wrap) {
        this.renderer.setAttribute(this.element.nativeElement, 'data-input', '');
        nativeElement = nativeElement.parentNode;
      }
      this.flatpickr = nativeElement.flatpickr(this.flatpickrOptions);
    }
  }, {
    key: "ngOnChanges",
    value: function ngOnChanges(changes) {
      if (this.flatpickr && this.flatpickrAltInput && changes.hasOwnProperty('placeholder') && changes['placeholder'].currentValue) {
        this.flatpickr.altInput.setAttribute('placeholder', changes['placeholder'].currentValue);
      }
    }
  }, {
    key: "ngOnDestroy",
    value: function ngOnDestroy() {
      if (this.flatpickr) {
        this.flatpickr.destroy();
      }
      if (this.formControlListener) {
        this.formControlListener.unsubscribe();
        this.formControlListener = undefined;
      }
      this.flatpickrOnChange = undefined;
      this.flatpickrOnClose = undefined;
      this.flatpickrOnOpen = undefined;
      this.flatpickrOnReady = undefined;
    }
  }, {
    key: "ngOnInit",
    value: function ngOnInit() {
      var _this2 = this;
      this.globalOnChange = this.flatpickrOptions.onChange;
      this.globalOnClose = this.flatpickrOptions.onClose;
      this.globalOnOpen = this.flatpickrOptions.onOpen;
      this.globalOnReady = this.flatpickrOptions.onReady;
      this.flatpickrOptions = {
        altFormat: this.getOption('altFormat'),
        altInput: this.getOption('altInput'),
        altInputClass: this.getOption('altInputClass'),
        allowInput: this.getOption('allowInput'),
        appendTo: this.getOption('appendTo'),
        clickOpens: this.getOption('clickOpens', true),
        dateFormat: this.getOption('dateFormat'),
        defaultDate: this.getOption('defaultDate'),
        disable: this.getOption('disable'),
        disableMobile: this.getOption('disableMobile'),
        enable: this.getOption('enable'),
        enableTime: this.getOption('enableTime'),
        enableSeconds: this.getOption('enableSeconds'),
        hourIncrement: this.getOption('hourIncrement'),
        inline: this.getOption('inline'),
        locale: this.getOption('locale'),
        maxDate: this.getOption('maxDate'),
        minDate: this.getOption('minDate'),
        minuteIncrement: this.getOption('minuteIncrement'),
        mode: this.getOption('mode'),
        nextArrow: this.getOption('nextArrow'),
        noCalendar: this.getOption('noCalendar'),
        onChange: this.eventOnChange.bind(this),
        onClose: this.eventOnClose.bind(this),
        onOpen: this.eventOnOpen.bind(this),
        onReady: this.eventOnReady.bind(this),
        parseDate: this.getOption('parseDate'),
        prevArrow: this.getOption('prevArrow'),
        shorthandCurrentMonth: this.getOption('shorthandCurrentMonth'),
        static: this.getOption('static'),
        time_24hr: this.getOption('time_24hr'),
        utc: this.getOption('utc'),
        weekNumbers: this.getOption('weekNumbers'),
        wrap: this.getOption('wrap', true)
      };
      // Remove unset properties
      Object.keys(this.flatpickrOptions).forEach(function (key) {
        _this2.flatpickrOptions[key] === undefined && delete _this2.flatpickrOptions[key];
      });
      if (this.control) {
        this.formControlListener = this.control.valueChanges.subscribe(function (value) {
          if (!(value instanceof Date)) {
            // Quietly update the value of the form control to be a
            // Date object. This avoids any external subscribers
            // from being notified a second time (once for the user
            // initiated event, and once for our conversion to
            // Date()).
            _this2.control.setValue(new Date('' + value), {
              onlySelf: true,
              emitEvent: false,
              emitModelToViewChange: false,
              emitViewToModelChange: false
            });
          }
        });
      }
    }
    /**
     * Fire off the event emitter for the directive element, and also for the
     * global onChange callback, if defined.
     */
  }, {
    key: "eventOnChange",
    value: function eventOnChange(selectedDates, dateStr, instance) {
      var event = {
        selectedDates: selectedDates,
        dateStr: dateStr,
        instance: instance
      };
      if (this.flatpickrOnChange) {
        this.flatpickrOnChange.emit(event);
      }
      if (this.globalOnChange) {
        this.globalOnChange(event);
      }
    }
    /**
     * Fire off the event emitter for the directive element, and also for the
     * global onClose callback, if defined.
     */
  }, {
    key: "eventOnClose",
    value: function eventOnClose(selectedDates, dateStr, instance) {
      var event = {
        selectedDates: selectedDates,
        dateStr: dateStr,
        instance: instance
      };
      if (this.flatpickrOnClose) {
        this.flatpickrOnClose.emit(event);
      }
      if (this.globalOnClose) {
        this.globalOnClose(event);
      }
    }
    /**
     * Fire off the event emitter for the directive element, and also for the
     * global onOpen callback, if defined.
     */
  }, {
    key: "eventOnOpen",
    value: function eventOnOpen(selectedDates, dateStr, instance) {
      var event = {
        selectedDates: selectedDates,
        dateStr: dateStr,
        instance: instance
      };
      if (this.flatpickrOnOpen) {
        this.flatpickrOnOpen.emit(event);
      }
      if (this.globalOnOpen) {
        this.globalOnOpen(event);
      }
    }
    /**
     * Fire off the event emitter for the directive element, and also for the
     * global onReady callback, if defined.
     */
  }, {
    key: "eventOnReady",
    value: function eventOnReady(selectedDates, dateStr, instance) {
      var event = {
        selectedDates: selectedDates,
        dateStr: dateStr,
        instance: instance
      };
      if (this.flatpickrOnReady) {
        this.flatpickrOnReady.emit(event);
      }
      if (this.globalOnReady) {
        this.globalOnReady(event);
      }
    }
    /**
     * Return the configuration value for option {option}, or {defaultValue} if it
     * doesn't exist.
     */
  }, {
    key: "getOption",
    value: function getOption(option, defaultValue) {
      var localName = 'flatpickr' + option.substring(0, 1).toUpperCase() + option.substring(1);
      if (typeof this[localName] !== 'undefined') {
        return this[localName];
      } else if (typeof this.flatpickrOptions[option] !== 'undefined') {
        return this.flatpickrOptions[option];
      } else {
        return defaultValue;
      }
    }
  }]);
  return Ng2FlatpickrDirective;
}();
Ng2FlatpickrDirective.ɵfac = function Ng2FlatpickrDirective_Factory(t) {
  return new (t || Ng2FlatpickrDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_4__.ControlContainer), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControl), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.Renderer2));
};
Ng2FlatpickrDirective.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineDirective"]({
  type: Ng2FlatpickrDirective,
  selectors: [["", "flatpickr", ""]],
  hostBindings: function Ng2FlatpickrDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("dblclick", function Ng2FlatpickrDirective_dblclick_HostBindingHandler() {
        return ctx.onClick();
      });
    }
  },
  inputs: {
    flatpickrOptions: ["flatpickr", "flatpickrOptions"],
    placeholder: "placeholder",
    flatpickrAltFormat: ["altFormat", "flatpickrAltFormat"],
    flatpickrAltInput: ["altInput", "flatpickrAltInput"],
    flatpickrAltInputClass: ["altInputClass", "flatpickrAltInputClass"],
    flatpickrAllowInput: ["allowInput", "flatpickrAllowInput"],
    flatpickrAppendTo: ["appendTo", "flatpickrAppendTo"],
    flatpickrClickOpens: ["clickOpens", "flatpickrClickOpens"],
    flatpickrDateFormat: ["dateFormat", "flatpickrDateFormat"],
    flatpickrDefaultDate: ["defaultDate", "flatpickrDefaultDate"],
    flatpickrDisable: ["disable", "flatpickrDisable"],
    flatpickrDisableMobile: ["disableMobile", "flatpickrDisableMobile"],
    flatpickrEnable: ["enable", "flatpickrEnable"],
    flatpickrEnableTime: ["enableTime", "flatpickrEnableTime"],
    flatpickrEnableSeconds: ["enableSeconds", "flatpickrEnableSeconds"],
    flatpickrHourIncrement: ["hourIncrement", "flatpickrHourIncrement"],
    flatpickrInline: ["inline", "flatpickrInline"],
    flatpickrLocale: ["locale", "flatpickrLocale"],
    flatpickrMaxDate: ["maxDate", "flatpickrMaxDate"],
    flatpickrMinDate: ["minDate", "flatpickrMinDate"],
    flatpickrMinuteIncrement: ["minuteIncrement", "flatpickrMinuteIncrement"],
    flatpickrMode: ["mode", "flatpickrMode"],
    flatpickrNextArrow: ["nextArrow", "flatpickrNextArrow"],
    flatpickrNoCalendar: ["noCalendar", "flatpickrNoCalendar"],
    flatpickrParseDate: ["parseDate", "flatpickrParseDate"],
    flatpickrPrevArrow: ["prevArrow", "flatpickrPrevArrow"],
    flatpickrShorthandCurrentMonth: ["shorthandCurrentMonth", "flatpickrShorthandCurrentMonth"],
    flatpickrStatic: ["static", "flatpickrStatic"],
    flatpickrTime_24hr: ["time_24hr", "flatpickrTime_24hr"],
    flatpickrUtc: ["utc", "flatpickrUtc"],
    flatpickrWeekNumbers: ["weekNumbers", "flatpickrWeekNumbers"],
    flatpickrWrap: ["wrap", "flatpickrWrap"]
  },
  outputs: {
    flatpickrOnChange: "onChange",
    flatpickrOnClose: "onClose",
    flatpickrOnOpen: "onOpen",
    flatpickrOnReady: "onReady"
  },
  exportAs: ["ng2-flatpickr"],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵNgOnChangesFeature"]]
});
Ng2FlatpickrDirective.ctorParameters = function () {
  return [{
    type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__.ControlContainer
  }, {
    type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControl
  }, {
    type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.ElementRef
  }, {
    type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Renderer2
  }];
};
(0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input)('flatpickr')], Ng2FlatpickrDirective.prototype, "flatpickrOptions", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input)('placeholder')], Ng2FlatpickrDirective.prototype, "placeholder", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input)('altFormat')], Ng2FlatpickrDirective.prototype, "flatpickrAltFormat", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input)('altInput')], Ng2FlatpickrDirective.prototype, "flatpickrAltInput", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input)('altInputClass')], Ng2FlatpickrDirective.prototype, "flatpickrAltInputClass", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input)('allowInput')], Ng2FlatpickrDirective.prototype, "flatpickrAllowInput", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input)('appendTo')], Ng2FlatpickrDirective.prototype, "flatpickrAppendTo", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input)('clickOpens')], Ng2FlatpickrDirective.prototype, "flatpickrClickOpens", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input)('dateFormat')], Ng2FlatpickrDirective.prototype, "flatpickrDateFormat", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input)('defaultDate')], Ng2FlatpickrDirective.prototype, "flatpickrDefaultDate", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input)('disable')], Ng2FlatpickrDirective.prototype, "flatpickrDisable", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input)('disableMobile')], Ng2FlatpickrDirective.prototype, "flatpickrDisableMobile", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input)('enable')], Ng2FlatpickrDirective.prototype, "flatpickrEnable", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input)('enableTime')], Ng2FlatpickrDirective.prototype, "flatpickrEnableTime", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input)('enableSeconds')], Ng2FlatpickrDirective.prototype, "flatpickrEnableSeconds", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input)('hourIncrement')], Ng2FlatpickrDirective.prototype, "flatpickrHourIncrement", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input)('inline')], Ng2FlatpickrDirective.prototype, "flatpickrInline", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input)('locale')], Ng2FlatpickrDirective.prototype, "flatpickrLocale", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input)('maxDate')], Ng2FlatpickrDirective.prototype, "flatpickrMaxDate", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input)('minDate')], Ng2FlatpickrDirective.prototype, "flatpickrMinDate", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input)('minuteIncrement')], Ng2FlatpickrDirective.prototype, "flatpickrMinuteIncrement", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input)('mode')], Ng2FlatpickrDirective.prototype, "flatpickrMode", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input)('nextArrow')], Ng2FlatpickrDirective.prototype, "flatpickrNextArrow", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input)('noCalendar')], Ng2FlatpickrDirective.prototype, "flatpickrNoCalendar", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input)('parseDate')], Ng2FlatpickrDirective.prototype, "flatpickrParseDate", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input)('prevArrow')], Ng2FlatpickrDirective.prototype, "flatpickrPrevArrow", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input)('shorthandCurrentMonth')], Ng2FlatpickrDirective.prototype, "flatpickrShorthandCurrentMonth", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input)('static')], Ng2FlatpickrDirective.prototype, "flatpickrStatic", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input)('time_24hr')], Ng2FlatpickrDirective.prototype, "flatpickrTime_24hr", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input)('utc')], Ng2FlatpickrDirective.prototype, "flatpickrUtc", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input)('weekNumbers')], Ng2FlatpickrDirective.prototype, "flatpickrWeekNumbers", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input)('wrap')], Ng2FlatpickrDirective.prototype, "flatpickrWrap", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Output)('onChange')], Ng2FlatpickrDirective.prototype, "flatpickrOnChange", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Output)('onClose')], Ng2FlatpickrDirective.prototype, "flatpickrOnClose", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Output)('onOpen')], Ng2FlatpickrDirective.prototype, "flatpickrOnOpen", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Output)('onReady')], Ng2FlatpickrDirective.prototype, "flatpickrOnReady", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.HostListener)('dblclick')], Ng2FlatpickrDirective.prototype, "onClick", null);
var Ng2FlatpickrModule = /*#__PURE__*/(0,F_project_development_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(function Ng2FlatpickrModule() {
  (0,F_project_development_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Ng2FlatpickrModule);
});
Ng2FlatpickrModule.ɵfac = function Ng2FlatpickrModule_Factory(t) {
  return new (t || Ng2FlatpickrModule)();
};
Ng2FlatpickrModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
  type: Ng2FlatpickrModule
});
Ng2FlatpickrModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
  imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule]]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵsetClassMetadata"](Ng2FlatpickrComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Component,
    args: [{
      selector: 'ng2-flatpickr',
      template: "\n\t\t<div class=\"ng2-flatpickr-input-container\" #flatpickr>\n\t\t\t<input *ngIf=\"!hideButton\" class=\"ng2-flatpickr-input {{ addClass }}\" [placeholder]=\"placeholder\" [tabindex]=\"tabindex\" type=\"text\" (focus)=\"onFocus($event)\" data-input>\n\t\t\t<ng-content></ng-content>\n\t\t</div>\n\t\t",
      providers: [{
        provide: _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NG_VALUE_ACCESSOR,
        useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.forwardRef)(function () {
          return Ng2FlatpickrComponent_1;
        }),
        multi: true
      }]
    }]
  }], function () {
    return [];
  }, {
    placeholder: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input
    }],
    addClass: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input
    }],
    hideButton: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input
    }],
    tabindex: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input
    }],
    flatpickrElement: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.ViewChild,
      args: ['flatpickr', {
        static: true
      }]
    }],
    config: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input
    }],
    setDate: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input
    }]
  });
})();
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵsetClassMetadata"](Ng2FlatpickrDirective, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Directive,
    args: [{
      selector: '[flatpickr]',
      exportAs: 'ng2-flatpickr'
    }]
  }], function () {
    return [{
      type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__.ControlContainer
    }, {
      type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControl
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.ElementRef
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Renderer2
    }];
  }, {
    flatpickrOnChange: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Output,
      args: ['onChange']
    }],
    flatpickrOnClose: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Output,
      args: ['onClose']
    }],
    flatpickrOnOpen: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Output,
      args: ['onOpen']
    }],
    flatpickrOnReady: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Output,
      args: ['onReady']
    }],
    /** Allow double-clicking on the control to open/close it. */
    onClick: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.HostListener,
      args: ['dblclick']
    }],
    flatpickrOptions: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: ['flatpickr']
    }],
    placeholder: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: ['placeholder']
    }],
    flatpickrAltFormat: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: ['altFormat']
    }],
    flatpickrAltInput: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: ['altInput']
    }],
    flatpickrAltInputClass: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: ['altInputClass']
    }],
    flatpickrAllowInput: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: ['allowInput']
    }],
    flatpickrAppendTo: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: ['appendTo']
    }],
    flatpickrClickOpens: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: ['clickOpens']
    }],
    flatpickrDateFormat: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: ['dateFormat']
    }],
    flatpickrDefaultDate: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: ['defaultDate']
    }],
    flatpickrDisable: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: ['disable']
    }],
    flatpickrDisableMobile: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: ['disableMobile']
    }],
    flatpickrEnable: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: ['enable']
    }],
    flatpickrEnableTime: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: ['enableTime']
    }],
    flatpickrEnableSeconds: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: ['enableSeconds']
    }],
    flatpickrHourIncrement: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: ['hourIncrement']
    }],
    flatpickrInline: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: ['inline']
    }],
    flatpickrLocale: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: ['locale']
    }],
    flatpickrMaxDate: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: ['maxDate']
    }],
    flatpickrMinDate: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: ['minDate']
    }],
    flatpickrMinuteIncrement: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: ['minuteIncrement']
    }],
    flatpickrMode: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: ['mode']
    }],
    flatpickrNextArrow: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: ['nextArrow']
    }],
    flatpickrNoCalendar: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: ['noCalendar']
    }],
    flatpickrParseDate: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: ['parseDate']
    }],
    flatpickrPrevArrow: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: ['prevArrow']
    }],
    flatpickrShorthandCurrentMonth: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: ['shorthandCurrentMonth']
    }],
    flatpickrStatic: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: ['static']
    }],
    flatpickrTime_24hr: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: ['time_24hr']
    }],
    flatpickrUtc: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: ['utc']
    }],
    flatpickrWeekNumbers: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: ['weekNumbers']
    }],
    flatpickrWrap: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: ['wrap']
    }]
  });
})();
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵsetClassMetadata"](Ng2FlatpickrModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule,
    args: [{
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule],
      declarations: [Ng2FlatpickrComponent, Ng2FlatpickrDirective],
      exports: [Ng2FlatpickrComponent, Ng2FlatpickrDirective]
    }]
  }], null, null);
})();
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](Ng2FlatpickrModule, {
    declarations: function declarations() {
      return [Ng2FlatpickrComponent, Ng2FlatpickrDirective];
    },
    imports: function imports() {
      return [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule];
    },
    exports: function exports() {
      return [Ng2FlatpickrComponent, Ng2FlatpickrDirective];
    }
  });
})();

/**
 * Generated bundle index. Do not edit.
 */



/***/ }),

/***/ 7846:
/*!*****************************************************************!*\
  !*** ./node_modules/ngx-mask/__ivy_ngcc__/fesm2015/ngx-mask.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "INITIAL_CONFIG": function() { return /* binding */ INITIAL_CONFIG; },
/* harmony export */   "MaskApplierService": function() { return /* binding */ MaskApplierService; },
/* harmony export */   "MaskDirective": function() { return /* binding */ MaskDirective; },
/* harmony export */   "MaskPipe": function() { return /* binding */ MaskPipe; },
/* harmony export */   "MaskService": function() { return /* binding */ MaskService; },
/* harmony export */   "NEW_CONFIG": function() { return /* binding */ NEW_CONFIG; },
/* harmony export */   "NgxMaskModule": function() { return /* binding */ NgxMaskModule; },
/* harmony export */   "_configFactory": function() { return /* binding */ _configFactory; },
/* harmony export */   "config": function() { return /* binding */ config; },
/* harmony export */   "initialConfig": function() { return /* binding */ initialConfig; },
/* harmony export */   "timeMasks": function() { return /* binding */ timeMasks; },
/* harmony export */   "withoutValidation": function() { return /* binding */ withoutValidation; }
/* harmony export */ });
/* harmony import */ var F_project_development_node_modules_babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/get */ 1389);
/* harmony import */ var F_project_development_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf */ 1413);
/* harmony import */ var F_project_development_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/inherits */ 5738);
/* harmony import */ var F_project_development_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createSuper */ 9664);
/* harmony import */ var F_project_development_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray */ 7990);
/* harmony import */ var F_project_development_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ 5960);
/* harmony import */ var F_project_development_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ 9367);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ 8346);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 8267);







function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }





var config = new _angular_core__WEBPACK_IMPORTED_MODULE_7__.InjectionToken('config');
var NEW_CONFIG = new _angular_core__WEBPACK_IMPORTED_MODULE_7__.InjectionToken('NEW_CONFIG');
var INITIAL_CONFIG = new _angular_core__WEBPACK_IMPORTED_MODULE_7__.InjectionToken('INITIAL_CONFIG');
var initialConfig = {
  suffix: '',
  prefix: '',
  thousandSeparator: ' ',
  decimalMarker: '.',
  clearIfNotMatch: false,
  showTemplate: false,
  showMaskTyped: false,
  placeHolderCharacter: '_',
  dropSpecialCharacters: true,
  hiddenInput: undefined,
  shownMaskExpression: '',
  separatorLimit: '',
  allowNegativeNumbers: false,
  validation: true,
  // tslint:disable-next-line: quotemark
  specialCharacters: ['-', '/', '(', ')', '.', ':', ' ', '+', ',', '@', '[', ']', '"', "'"],
  leadZeroDateTime: false,
  patterns: {
    '0': {
      pattern: new RegExp('\\d')
    },
    '9': {
      pattern: new RegExp('\\d'),
      optional: true
    },
    X: {
      pattern: new RegExp('\\d'),
      symbol: '*'
    },
    A: {
      pattern: new RegExp('[a-zA-Z0-9]')
    },
    S: {
      pattern: new RegExp('[a-zA-Z]')
    },
    d: {
      pattern: new RegExp('\\d')
    },
    m: {
      pattern: new RegExp('\\d')
    },
    M: {
      pattern: new RegExp('\\d')
    },
    H: {
      pattern: new RegExp('\\d')
    },
    h: {
      pattern: new RegExp('\\d')
    },
    s: {
      pattern: new RegExp('\\d')
    }
  }
};
var timeMasks = ['Hh:m0:s0', 'Hh:m0', 'm0:s0'];
var withoutValidation = ['percent', 'Hh', 's0', 'm0', 'separator', 'd0/M0/0000', 'd0/M0', 'd0', 'M0'];
var MaskApplierService = /*#__PURE__*/function () {
  function MaskApplierService(_config) {
    var _this = this;
    (0,F_project_development_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_5__["default"])(this, MaskApplierService);
    this._config = _config;
    this.maskExpression = '';
    this.actualValue = '';
    this.shownMaskExpression = '';
    this._formatWithSeparators = function (str, thousandSeparatorChar, decimalChar, precision) {
      var x = str.split(decimalChar);
      var decimals = x.length > 1 ? "".concat(decimalChar).concat(x[1]) : '';
      var res = x[0];
      var separatorLimit = _this.separatorLimit.replace(/\s/g, '');
      if (separatorLimit && +separatorLimit) {
        if (res[0] === '-') {
          res = "-".concat(res.slice(1, res.length).slice(0, separatorLimit.length));
        } else {
          res = res.slice(0, separatorLimit.length);
        }
      }
      var rgx = /(\d+)(\d{3})/;
      while (thousandSeparatorChar && rgx.test(res)) {
        res = res.replace(rgx, '$1' + thousandSeparatorChar + '$2');
      }
      if (precision === undefined) {
        return res + decimals;
      } else if (precision === 0) {
        return res;
      }
      return res + decimals.substr(0, precision + 1);
    };
    this.percentage = function (str) {
      return Number(str) >= 0 && Number(str) <= 100;
    };
    this.getPrecision = function (maskExpression) {
      var x = maskExpression.split('.');
      if (x.length > 1) {
        return Number(x[x.length - 1]);
      }
      return Infinity;
    };
    this.checkAndRemoveSuffix = function (inputValue) {
      var _a, _b, _c;
      for (var i = ((_a = _this.suffix) === null || _a === void 0 ? void 0 : _a.length) - 1; i >= 0; i--) {
        var substr = _this.suffix.substr(i, (_b = _this.suffix) === null || _b === void 0 ? void 0 : _b.length);
        if (inputValue.includes(substr) && (i - 1 < 0 || !inputValue.includes(_this.suffix.substr(i - 1, (_c = _this.suffix) === null || _c === void 0 ? void 0 : _c.length)))) {
          return inputValue.replace(substr, '');
        }
      }
      return inputValue;
    };
    this.checkInputPrecision = function (inputValue, precision, decimalMarker) {
      if (precision < Infinity) {
        var precisionRegEx = new RegExp(_this._charToRegExpExpression(decimalMarker) + "\\d{".concat(precision, "}.*$"));
        var precisionMatch = inputValue.match(precisionRegEx);
        if (precisionMatch && precisionMatch[0].length - 1 > precision) {
          var diff = precisionMatch[0].length - 1 - precision;
          inputValue = inputValue.substring(0, inputValue.length - diff);
        }
        if (precision === 0 && inputValue.endsWith(decimalMarker)) {
          inputValue = inputValue.substring(0, inputValue.length - 1);
        }
      }
      return inputValue;
    };
    this._shift = new Set();
    this.clearIfNotMatch = this._config.clearIfNotMatch;
    this.dropSpecialCharacters = this._config.dropSpecialCharacters;
    this.maskSpecialCharacters = this._config.specialCharacters;
    this.maskAvailablePatterns = this._config.patterns;
    this.prefix = this._config.prefix;
    this.suffix = this._config.suffix;
    this.thousandSeparator = this._config.thousandSeparator;
    this.decimalMarker = this._config.decimalMarker;
    this.hiddenInput = this._config.hiddenInput;
    this.showMaskTyped = this._config.showMaskTyped;
    this.placeHolderCharacter = this._config.placeHolderCharacter;
    this.validation = this._config.validation;
    this.separatorLimit = this._config.separatorLimit;
    this.allowNegativeNumbers = this._config.allowNegativeNumbers;
    this.leadZeroDateTime = this._config.leadZeroDateTime;
  }
  (0,F_project_development_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_6__["default"])(MaskApplierService, [{
    key: "applyMaskWithPattern",
    value: function applyMaskWithPattern(inputValue, maskAndPattern) {
      var _maskAndPattern = (0,F_project_development_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_4__["default"])(maskAndPattern, 2),
        mask = _maskAndPattern[0],
        customPattern = _maskAndPattern[1];
      this.customPattern = customPattern;
      return this.applyMask(inputValue, mask);
    }
  }, {
    key: "applyMask",
    value: function applyMask(inputValue, maskExpression) {
      var _this2 = this;
      var position = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var justPasted = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var backspaced = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var cb = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : function () {};
      if (inputValue === undefined || inputValue === null || maskExpression === undefined) {
        return '';
      }
      var cursor = 0;
      var result = '';
      var multi = false;
      var backspaceShift = false;
      var shift = 1;
      var stepBack = false;
      if (inputValue.slice(0, this.prefix.length) === this.prefix) {
        inputValue = inputValue.slice(this.prefix.length, inputValue.length);
      }
      if (!!this.suffix && (inputValue === null || inputValue === void 0 ? void 0 : inputValue.length) > 0) {
        inputValue = this.checkAndRemoveSuffix(inputValue);
      }
      var inputArray = inputValue.toString().split('');
      if (maskExpression === 'IP') {
        this.ipError = !!(inputArray.filter(function (i) {
          return i === '.';
        }).length < 3 && inputArray.length < 7);
        maskExpression = '099.099.099.099';
      }
      var arr = [];
      for (var i = 0; i < inputValue.length; i++) {
        if (inputValue[i].match('\\d')) {
          arr.push(inputValue[i]);
        }
      }
      if (maskExpression === 'CPF_CNPJ') {
        this.cpfCnpjError = !!(arr.length !== 11 && arr.length !== 14);
        if (arr.length > 11) {
          maskExpression = '00.000.000/0000-00';
        } else {
          maskExpression = '000.000.000-00';
        }
      }
      if (maskExpression.startsWith('percent')) {
        if (inputValue.match('[a-z]|[A-Z]') || inputValue.match(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,\/.]/)) {
          inputValue = this._stripToDecimal(inputValue);
          var precision = this.getPrecision(maskExpression);
          inputValue = this.checkInputPrecision(inputValue, precision, this.decimalMarker);
        }
        if (inputValue.indexOf('.') > 0 && !this.percentage(inputValue.substring(0, inputValue.indexOf('.')))) {
          var base = inputValue.substring(0, inputValue.indexOf('.') - 1);
          inputValue = "".concat(base).concat(inputValue.substring(inputValue.indexOf('.'), inputValue.length));
        }
        if (this.percentage(inputValue)) {
          result = inputValue;
        } else {
          result = inputValue.substring(0, inputValue.length - 1);
        }
      } else if (maskExpression.startsWith('separator')) {
        if (inputValue.match('[wа-яА-Я]') || inputValue.match('[ЁёА-я]') || inputValue.match('[a-z]|[A-Z]') || inputValue.match(/[-@#!$%\\^&*()_£¬'+|~=`{}\[\]:";<>.?\/]/) || inputValue.match('[^A-Za-z0-9,]')) {
          inputValue = this._stripToDecimal(inputValue);
        }
        inputValue = inputValue.length > 1 && inputValue[0] === '0' && inputValue[1] !== this.decimalMarker && !backspaced ? inputValue.slice(1, inputValue.length) : inputValue;
        // TODO: we had different rexexps here for the different cases... but tests dont seam to bother - check this
        //  separator: no COMMA, dot-sep: no SPACE, COMMA OK, comma-sep: no SPACE, COMMA OK
        var thousandSeperatorCharEscaped = this._charToRegExpExpression(this.thousandSeparator);
        var decimalMarkerEscaped = this._charToRegExpExpression(this.decimalMarker);
        var invalidChars = '@#!$%^&*()_+|~=`{}\\[\\]:\\s,\\.";<>?\\/'.replace(thousandSeperatorCharEscaped, '').replace(decimalMarkerEscaped, '');
        var invalidCharRegexp = new RegExp('[' + invalidChars + ']');
        if (inputValue.match(invalidCharRegexp)) {
          inputValue = inputValue.substring(0, inputValue.length - 1);
        }
        var _precision = this.getPrecision(maskExpression);
        inputValue = this.checkInputPrecision(inputValue, _precision, this.decimalMarker);
        var strForSep = inputValue.replace(new RegExp(thousandSeperatorCharEscaped, 'g'), '');
        result = this._formatWithSeparators(strForSep, this.thousandSeparator, this.decimalMarker, _precision);
        var commaShift = result.indexOf(',') - inputValue.indexOf(',');
        var shiftStep = result.length - inputValue.length;
        if (shiftStep > 0 && result[position] !== ',') {
          backspaceShift = true;
          var _shift = 0;
          do {
            this._shift.add(position + _shift);
            _shift++;
          } while (_shift < shiftStep);
        } else if (commaShift !== 0 && position > 0 && !(result.indexOf(',') >= position && position > 3) || !(result.indexOf('.') >= position && position > 3) && shiftStep <= 0) {
          this._shift.clear();
          backspaceShift = true;
          shift = shiftStep;
          position += shiftStep;
          this._shift.add(position);
        } else {
          this._shift.clear();
        }
      } else {
        for (
        // tslint:disable-next-line
        var _i = 0, inputSymbol = inputArray[0]; _i < inputArray.length; _i++, inputSymbol = inputArray[_i]) {
          if (cursor === maskExpression.length) {
            break;
          }
          if (this._checkSymbolMask(inputSymbol, maskExpression[cursor]) && maskExpression[cursor + 1] === '?') {
            result += inputSymbol;
            cursor += 2;
          } else if (maskExpression[cursor + 1] === '*' && multi && this._checkSymbolMask(inputSymbol, maskExpression[cursor + 2])) {
            result += inputSymbol;
            cursor += 3;
            multi = false;
          } else if (this._checkSymbolMask(inputSymbol, maskExpression[cursor]) && maskExpression[cursor + 1] === '*') {
            result += inputSymbol;
            multi = true;
          } else if (maskExpression[cursor + 1] === '?' && this._checkSymbolMask(inputSymbol, maskExpression[cursor + 2])) {
            result += inputSymbol;
            cursor += 3;
          } else if (this._checkSymbolMask(inputSymbol, maskExpression[cursor])) {
            if (maskExpression[cursor] === 'H') {
              if (Number(inputSymbol) > 2) {
                cursor += 1;
                this._shiftStep(maskExpression, cursor, inputArray.length);
                _i--;
                if (this.leadZeroDateTime) {
                  result += '0';
                }
                continue;
              }
            }
            if (maskExpression[cursor] === 'h') {
              if (result === '2' && Number(inputSymbol) > 3) {
                cursor += 1;
                _i--;
                continue;
              }
            }
            if (maskExpression[cursor] === 'm') {
              if (Number(inputSymbol) > 5) {
                cursor += 1;
                this._shiftStep(maskExpression, cursor, inputArray.length);
                _i--;
                if (this.leadZeroDateTime) {
                  result += '0';
                }
                continue;
              }
            }
            if (maskExpression[cursor] === 's') {
              if (Number(inputSymbol) > 5) {
                cursor += 1;
                this._shiftStep(maskExpression, cursor, inputArray.length);
                _i--;
                if (this.leadZeroDateTime) {
                  result += '0';
                }
                continue;
              }
            }
            var daysCount = 31;
            if (maskExpression[cursor] === 'd') {
              if (Number(inputSymbol) > 3 && this.leadZeroDateTime || Number(inputValue.slice(cursor, cursor + 2)) > daysCount || inputValue[cursor + 1] === '/') {
                cursor += 1;
                this._shiftStep(maskExpression, cursor, inputArray.length);
                _i--;
                if (this.leadZeroDateTime) {
                  result += '0';
                }
                continue;
              }
            }
            if (maskExpression[cursor] === 'M') {
              var monthsCount = 12;
              // mask without day
              var withoutDays = cursor === 0 && (Number(inputSymbol) > 2 || Number(inputValue.slice(cursor, cursor + 2)) > monthsCount || inputValue[cursor + 1] === '/');
              // day<10 && month<12 for input
              var day1monthInput = inputValue.slice(cursor - 3, cursor - 1).includes('/') && (inputValue[cursor - 2] === '/' && Number(inputValue.slice(cursor - 1, cursor + 1)) > monthsCount && inputValue[cursor] !== '/' || inputValue[cursor] === '/' || inputValue[cursor - 3] === '/' && Number(inputValue.slice(cursor - 2, cursor)) > monthsCount && inputValue[cursor - 1] !== '/' || inputValue[cursor - 1] === '/');
              // 10<day<31 && month<12 for input
              var day2monthInput = Number(inputValue.slice(cursor - 3, cursor - 1)) <= daysCount && !inputValue.slice(cursor - 3, cursor - 1).includes('/') && inputValue[cursor - 1] === '/' && (Number(inputValue.slice(cursor, cursor + 2)) > monthsCount || inputValue[cursor + 1] === '/');
              // day<10 && month<12 for paste whole data
              var day1monthPaste = Number(inputValue.slice(cursor - 3, cursor - 1)) > daysCount && !inputValue.slice(cursor - 3, cursor - 1).includes('/') && !inputValue.slice(cursor - 2, cursor).includes('/') && Number(inputValue.slice(cursor - 2, cursor)) > monthsCount;
              // 10<day<31 && month<12 for paste whole data
              var day2monthPaste = Number(inputValue.slice(cursor - 3, cursor - 1)) <= daysCount && !inputValue.slice(cursor - 3, cursor - 1).includes('/') && inputValue[cursor - 1] !== '/' && Number(inputValue.slice(cursor - 1, cursor + 1)) > monthsCount;
              if (Number(inputSymbol) > 1 && this.leadZeroDateTime || withoutDays || day1monthInput || day2monthInput || day1monthPaste || day2monthPaste) {
                cursor += 1;
                this._shiftStep(maskExpression, cursor, inputArray.length);
                _i--;
                if (this.leadZeroDateTime) {
                  result += '0';
                }
                continue;
              }
            }
            result += inputSymbol;
            cursor++;
          } else if (this.maskSpecialCharacters.indexOf(maskExpression[cursor]) !== -1) {
            result += maskExpression[cursor];
            cursor++;
            this._shiftStep(maskExpression, cursor, inputArray.length);
            _i--;
          } else if (this.maskSpecialCharacters.indexOf(inputSymbol) > -1 && this.maskAvailablePatterns[maskExpression[cursor]] && this.maskAvailablePatterns[maskExpression[cursor]].optional) {
            if (!!inputArray[cursor] && maskExpression !== '099.099.099.099' && maskExpression !== '000.000.000-00' && maskExpression !== '00.000.000/0000-00') {
              result += inputArray[cursor];
            }
            cursor++;
            _i--;
          } else if (this.maskExpression[cursor + 1] === '*' && this._findSpecialChar(this.maskExpression[cursor + 2]) && this._findSpecialChar(inputSymbol) === this.maskExpression[cursor + 2] && multi) {
            cursor += 3;
            result += inputSymbol;
          } else if (this.maskExpression[cursor + 1] === '?' && this._findSpecialChar(this.maskExpression[cursor + 2]) && this._findSpecialChar(inputSymbol) === this.maskExpression[cursor + 2] && multi) {
            cursor += 3;
            result += inputSymbol;
          } else if (this.showMaskTyped && this.maskSpecialCharacters.indexOf(inputSymbol) < 0 && inputSymbol !== this.placeHolderCharacter) {
            stepBack = true;
          }
        }
      }
      if (result.length + 1 === maskExpression.length && this.maskSpecialCharacters.indexOf(maskExpression[maskExpression.length - 1]) !== -1) {
        result += maskExpression[maskExpression.length - 1];
      }
      var newPosition = position + 1;
      while (this._shift.has(newPosition)) {
        shift++;
        newPosition++;
      }
      var actualShift = justPasted ? cursor : this._shift.has(position) ? shift : 0;
      if (stepBack) {
        actualShift--;
      }
      cb(actualShift, backspaceShift);
      if (shift < 0) {
        this._shift.clear();
      }
      var onlySpecial = false;
      if (backspaced) {
        onlySpecial = inputArray.every(function (char) {
          return _this2.maskSpecialCharacters.includes(char);
        });
      }
      var res = "".concat(this.prefix).concat(onlySpecial ? '' : result).concat(this.suffix);
      if (result.length === 0) {
        res = "".concat(this.prefix).concat(result);
      }
      return res;
    }
  }, {
    key: "_findSpecialChar",
    value: function _findSpecialChar(inputSymbol) {
      return this.maskSpecialCharacters.find(function (val) {
        return val === inputSymbol;
      });
    }
  }, {
    key: "_checkSymbolMask",
    value: function _checkSymbolMask(inputSymbol, maskSymbol) {
      this.maskAvailablePatterns = this.customPattern ? this.customPattern : this.maskAvailablePatterns;
      return this.maskAvailablePatterns[maskSymbol] && this.maskAvailablePatterns[maskSymbol].pattern && this.maskAvailablePatterns[maskSymbol].pattern.test(inputSymbol);
    }
  }, {
    key: "_stripToDecimal",
    value: function _stripToDecimal(str) {
      var _this3 = this;
      return str.split('').filter(function (i, idx) {
        return i.match('^-?\\d') || i.match('\\s') || i === '.' || i === ',' || i === '-' && idx === 0 && _this3.allowNegativeNumbers;
      }).join('');
    }
  }, {
    key: "_charToRegExpExpression",
    value: function _charToRegExpExpression(char) {
      if (char) {
        var charsToEscape = '[\\^$.|?*+()';
        return char === ' ' ? '\\s' : charsToEscape.indexOf(char) >= 0 ? '\\' + char : char;
      }
      return char;
    }
  }, {
    key: "_shiftStep",
    value: function _shiftStep(maskExpression, cursor, inputLength) {
      var shiftStep = /[*?]/g.test(maskExpression.slice(0, cursor)) ? inputLength : cursor;
      this._shift.add(shiftStep + this.prefix.length || 0);
    }
  }]);
  return MaskApplierService;
}();
MaskApplierService.ɵfac = function MaskApplierService_Factory(t) {
  return new (t || MaskApplierService)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](config));
};
MaskApplierService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: MaskApplierService,
  factory: MaskApplierService.ɵfac
});
MaskApplierService.ctorParameters = function () {
  return [{
    type: undefined,
    decorators: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Inject,
      args: [config]
    }]
  }];
};
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵsetClassMetadata"](MaskApplierService, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Injectable
  }], function () {
    return [{
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Inject,
        args: [config]
      }]
    }];
  }, null);
})();
var MaskService = /*#__PURE__*/function (_MaskApplierService) {
  (0,F_project_development_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__["default"])(MaskService, _MaskApplierService);
  var _super = (0,F_project_development_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_3__["default"])(MaskService);
  function MaskService(document, _config, _elementRef, _renderer) {
    var _this4;
    (0,F_project_development_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_5__["default"])(this, MaskService);
    _this4 = _super.call(this, _config);
    _this4.document = document;
    _this4._config = _config;
    _this4._elementRef = _elementRef;
    _this4._renderer = _renderer;
    _this4.maskExpression = '';
    _this4.isNumberValue = false;
    _this4.placeHolderCharacter = '_';
    _this4.maskIsShown = '';
    _this4.selStart = null;
    _this4.selEnd = null;
    /**
     * Whether we are currently in writeValue function, in this case when applying the mask we don't want to trigger onChange function,
     * since writeValue should be a one way only process of writing the DOM value based on the Angular model value.
     */
    _this4.writingValue = false;
    _this4.maskChanged = false;
    _this4.onChange = function (_) {};
    return _this4;
  }
  // tslint:disable-next-line:cyclomatic-complexity
  (0,F_project_development_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_6__["default"])(MaskService, [{
    key: "applyMask",
    value: function applyMask(inputValue, maskExpression) {
      var _this5 = this;
      var position = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var justPasted = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var backspaced = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var cb = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : function () {};
      if (!maskExpression) {
        return inputValue;
      }
      this.maskIsShown = this.showMaskTyped ? this.showMaskInInput() : '';
      if (this.maskExpression === 'IP' && this.showMaskTyped) {
        this.maskIsShown = this.showMaskInInput(inputValue || '#');
      }
      if (this.maskExpression === 'CPF_CNPJ' && this.showMaskTyped) {
        this.maskIsShown = this.showMaskInInput(inputValue || '#');
      }
      if (!inputValue && this.showMaskTyped) {
        this.formControlResult(this.prefix);
        return this.prefix + this.maskIsShown;
      }
      var getSymbol = !!inputValue && typeof this.selStart === 'number' ? inputValue[this.selStart] : '';
      var newInputValue = '';
      if (this.hiddenInput && !this.writingValue) {
        var actualResult = this.actualValue.split('');
        // tslint:disable no-unused-expression
        inputValue !== '' && actualResult.length ? typeof this.selStart === 'number' && typeof this.selEnd === 'number' ? inputValue.length > actualResult.length ? actualResult.splice(this.selStart, 0, getSymbol) : inputValue.length < actualResult.length ? actualResult.length - inputValue.length === 1 ? actualResult.splice(this.selStart - 1, 1) : actualResult.splice(this.selStart, this.selEnd - this.selStart) : null : null : actualResult = [];
        // tslint:enable no-unused-expression
        newInputValue = this.actualValue.length && actualResult.length <= inputValue.length ? this.shiftTypedSymbols(actualResult.join('')) : inputValue;
      }
      newInputValue = Boolean(newInputValue) && newInputValue.length ? newInputValue : inputValue;
      var result = (0,F_project_development_node_modules_babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_0__["default"])((0,F_project_development_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_1__["default"])(MaskService.prototype), "applyMask", this).call(this, newInputValue, maskExpression, position, justPasted, backspaced, cb);
      this.actualValue = this.getActualValue(result);
      // handle some separator implications:
      // a.) adjust decimalMarker default (. -> ,) if thousandSeparator is a dot
      if (this.thousandSeparator === '.' && this.decimalMarker === '.') {
        this.decimalMarker = ',';
      }
      // b) remove decimal marker from list of special characters to mask
      if (this.maskExpression.startsWith('separator') && this.dropSpecialCharacters === true) {
        this.maskSpecialCharacters = this.maskSpecialCharacters.filter(function (item) {
          return item !== _this5.decimalMarker;
        });
      }
      this.formControlResult(result);
      if (!this.showMaskTyped) {
        if (this.hiddenInput) {
          return result && result.length ? this.hideInput(result, this.maskExpression) : result;
        }
        return result;
      }
      var resLen = result.length;
      var prefNmask = this.prefix + this.maskIsShown;
      if (this.maskExpression.includes('H')) {
        var countSkipedSymbol = this._numberSkipedSymbols(result);
        return result + prefNmask.slice(resLen + countSkipedSymbol);
      } else if (this.maskExpression === 'IP' || this.maskExpression === 'CPF_CNPJ') {
        return result + prefNmask;
      }
      return result + prefNmask.slice(resLen);
    }
    // get the number of characters that were shifted
  }, {
    key: "_numberSkipedSymbols",
    value: function _numberSkipedSymbols(value) {
      var regex = /(^|\D)(\d\D)/g;
      var match = regex.exec(value);
      var countSkipedSymbol = 0;
      while (match != null) {
        countSkipedSymbol += 1;
        match = regex.exec(value);
      }
      return countSkipedSymbol;
    }
  }, {
    key: "applyValueChanges",
    value: function applyValueChanges() {
      var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var justPasted = arguments.length > 1 ? arguments[1] : undefined;
      var backspaced = arguments.length > 2 ? arguments[2] : undefined;
      var cb = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};
      var formElement = this._elementRef.nativeElement;
      formElement.value = this.applyMask(formElement.value, this.maskExpression, position, justPasted, backspaced, cb);
      if (formElement === this.document.activeElement) {
        return;
      }
      this.clearIfNotMatchFn();
    }
  }, {
    key: "hideInput",
    value: function hideInput(inputValue, maskExpression) {
      var _this6 = this;
      return inputValue.split('').map(function (curr, index) {
        if (_this6.maskAvailablePatterns && _this6.maskAvailablePatterns[maskExpression[index]] && _this6.maskAvailablePatterns[maskExpression[index]].symbol) {
          return _this6.maskAvailablePatterns[maskExpression[index]].symbol;
        }
        return curr;
      }).join('');
    }
    // this function is not necessary, it checks result against maskExpression
  }, {
    key: "getActualValue",
    value: function getActualValue(res) {
      var _this7 = this;
      var compare = res.split('').filter(function (symbol, i) {
        return _this7._checkSymbolMask(symbol, _this7.maskExpression[i]) || _this7.maskSpecialCharacters.includes(_this7.maskExpression[i]) && symbol === _this7.maskExpression[i];
      });
      if (compare.join('') === res) {
        return compare.join('');
      }
      return res;
    }
  }, {
    key: "shiftTypedSymbols",
    value: function shiftTypedSymbols(inputValue) {
      var _this8 = this;
      var symbolToReplace = '';
      var newInputValue = inputValue && inputValue.split('').map(function (currSymbol, index) {
        if (_this8.maskSpecialCharacters.includes(inputValue[index + 1]) && inputValue[index + 1] !== _this8.maskExpression[index + 1]) {
          symbolToReplace = currSymbol;
          return inputValue[index + 1];
        }
        if (symbolToReplace.length) {
          var replaceSymbol = symbolToReplace;
          symbolToReplace = '';
          return replaceSymbol;
        }
        return currSymbol;
      }) || [];
      return newInputValue.join('');
    }
  }, {
    key: "showMaskInInput",
    value: function showMaskInInput(inputVal) {
      if (this.showMaskTyped && !!this.shownMaskExpression) {
        if (this.maskExpression.length !== this.shownMaskExpression.length) {
          throw new Error('Mask expression must match mask placeholder length');
        } else {
          return this.shownMaskExpression;
        }
      } else if (this.showMaskTyped) {
        if (inputVal) {
          if (this.maskExpression === 'IP') {
            return this._checkForIp(inputVal);
          }
          if (this.maskExpression === 'CPF_CNPJ') {
            return this._checkForCpfCnpj(inputVal);
          }
        }
        return this.maskExpression.replace(/\w/g, this.placeHolderCharacter);
      }
      return '';
    }
  }, {
    key: "clearIfNotMatchFn",
    value: function clearIfNotMatchFn() {
      var formElement = this._elementRef.nativeElement;
      if (this.clearIfNotMatch && this.prefix.length + this.maskExpression.length + this.suffix.length !== formElement.value.replace(/_/g, '').length) {
        this.formElementProperty = ['value', ''];
        this.applyMask(formElement.value, this.maskExpression);
      }
    }
  }, {
    key: "formElementProperty",
    set: function set(_ref) {
      var _this9 = this;
      var _ref2 = (0,F_project_development_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_4__["default"])(_ref, 2),
        name = _ref2[0],
        value = _ref2[1];
      Promise.resolve().then(function () {
        return _this9._renderer.setProperty(_this9._elementRef.nativeElement, name, value);
      });
    }
  }, {
    key: "checkSpecialCharAmount",
    value: function checkSpecialCharAmount(mask) {
      var _this10 = this;
      var chars = mask.split('').filter(function (item) {
        return _this10._findSpecialChar(item);
      });
      return chars.length;
    }
  }, {
    key: "removeMask",
    value: function removeMask(inputValue) {
      return this._removeMask(this._removeSuffix(this._removePrefix(inputValue)), this.maskSpecialCharacters.concat('_').concat(this.placeHolderCharacter));
    }
  }, {
    key: "_checkForIp",
    value: function _checkForIp(inputVal) {
      if (inputVal === '#') {
        return "".concat(this.placeHolderCharacter, ".").concat(this.placeHolderCharacter, ".").concat(this.placeHolderCharacter, ".").concat(this.placeHolderCharacter);
      }
      var arr = [];
      for (var i = 0; i < inputVal.length; i++) {
        if (inputVal[i].match('\\d')) {
          arr.push(inputVal[i]);
        }
      }
      if (arr.length <= 3) {
        return "".concat(this.placeHolderCharacter, ".").concat(this.placeHolderCharacter, ".").concat(this.placeHolderCharacter);
      }
      if (arr.length > 3 && arr.length <= 6) {
        return "".concat(this.placeHolderCharacter, ".").concat(this.placeHolderCharacter);
      }
      if (arr.length > 6 && arr.length <= 9) {
        return this.placeHolderCharacter;
      }
      if (arr.length > 9 && arr.length <= 12) {
        return '';
      }
      return '';
    }
  }, {
    key: "_checkForCpfCnpj",
    value: function _checkForCpfCnpj(inputVal) {
      var cpf = "".concat(this.placeHolderCharacter).concat(this.placeHolderCharacter).concat(this.placeHolderCharacter) + ".".concat(this.placeHolderCharacter).concat(this.placeHolderCharacter).concat(this.placeHolderCharacter) + ".".concat(this.placeHolderCharacter).concat(this.placeHolderCharacter).concat(this.placeHolderCharacter) + "-".concat(this.placeHolderCharacter).concat(this.placeHolderCharacter);
      var cnpj = "".concat(this.placeHolderCharacter).concat(this.placeHolderCharacter) + ".".concat(this.placeHolderCharacter).concat(this.placeHolderCharacter).concat(this.placeHolderCharacter) + ".".concat(this.placeHolderCharacter).concat(this.placeHolderCharacter).concat(this.placeHolderCharacter) + "/".concat(this.placeHolderCharacter).concat(this.placeHolderCharacter).concat(this.placeHolderCharacter).concat(this.placeHolderCharacter) + "-".concat(this.placeHolderCharacter).concat(this.placeHolderCharacter);
      if (inputVal === '#') {
        return cpf;
      }
      var arr = [];
      for (var i = 0; i < inputVal.length; i++) {
        if (inputVal[i].match('\\d')) {
          arr.push(inputVal[i]);
        }
      }
      if (arr.length <= 3) {
        return cpf.slice(arr.length, cpf.length);
      }
      if (arr.length > 3 && arr.length <= 6) {
        return cpf.slice(arr.length + 1, cpf.length);
      }
      if (arr.length > 6 && arr.length <= 9) {
        return cpf.slice(arr.length + 2, cpf.length);
      }
      if (arr.length > 9 && arr.length < 11) {
        return cpf.slice(arr.length + 3, cpf.length);
      }
      if (arr.length === 11) {
        return '';
      }
      if (arr.length === 12) {
        if (inputVal.length === 17) {
          return cnpj.slice(16, cnpj.length);
        }
        return cnpj.slice(15, cnpj.length);
      }
      if (arr.length > 12 && arr.length <= 14) {
        return cnpj.slice(arr.length + 4, cnpj.length);
      }
      return '';
    }
    /**
     * Propogates the input value back to the Angular model by triggering the onChange function. It won't do this if writingValue
     * is true. If that is true it means we are currently in the writeValue function, which is supposed to only update the actual
     * DOM element based on the Angular model value. It should be a one way process, i.e. writeValue should not be modifying the Angular
     * model value too. Therefore, we don't trigger onChange in this scenario.
     * @param inputValue the current form input value
     */
  }, {
    key: "formControlResult",
    value: function formControlResult(inputValue) {
      if (this.writingValue || this.maskChanged) {
        this.maskChanged = false;
        return;
      }
      if (Array.isArray(this.dropSpecialCharacters)) {
        this.onChange(this._toNumber(this._removeMask(this._removeSuffix(this._removePrefix(inputValue)), this.dropSpecialCharacters)));
      } else if (this.dropSpecialCharacters) {
        this.onChange(this._toNumber(this._checkSymbols(inputValue)));
      } else {
        this.onChange(this._removeSuffix(inputValue));
      }
    }
  }, {
    key: "_toNumber",
    value: function _toNumber(value) {
      if (!this.isNumberValue || value === '') {
        return value;
      }
      var num = Number(value);
      return Number.isNaN(num) ? value : num;
    }
  }, {
    key: "_removeMask",
    value: function _removeMask(value, specialCharactersForRemove) {
      return value ? value.replace(this._regExpForRemove(specialCharactersForRemove), '') : value;
    }
  }, {
    key: "_removePrefix",
    value: function _removePrefix(value) {
      if (!this.prefix) {
        return value;
      }
      return value ? value.replace(this.prefix, '') : value;
    }
  }, {
    key: "_removeSuffix",
    value: function _removeSuffix(value) {
      if (!this.suffix) {
        return value;
      }
      return value ? value.replace(this.suffix, '') : value;
    }
  }, {
    key: "_retrieveSeparatorValue",
    value: function _retrieveSeparatorValue(result) {
      return this._removeMask(this._removeSuffix(this._removePrefix(result)), this.maskSpecialCharacters);
    }
  }, {
    key: "_regExpForRemove",
    value: function _regExpForRemove(specialCharactersForRemove) {
      return new RegExp(specialCharactersForRemove.map(function (item) {
        return "\\".concat(item);
      }).join('|'), 'gi');
    }
  }, {
    key: "_checkSymbols",
    value: function _checkSymbols(result) {
      if (result === '') {
        return result;
      }
      var separatorPrecision = this._retrieveSeparatorPrecision(this.maskExpression);
      var separatorValue = this._retrieveSeparatorValue(result);
      if (this.decimalMarker !== '.') {
        separatorValue = separatorValue.replace(this.decimalMarker, '.');
      }
      if (!this.isNumberValue) {
        return separatorValue;
      }
      if (separatorPrecision) {
        if (result === this.decimalMarker) {
          return null;
        }
        return this._checkPrecision(this.maskExpression, separatorValue);
      } else {
        return Number(separatorValue);
      }
    }
    // TODO should think about helpers or separting decimal precision to own property
  }, {
    key: "_retrieveSeparatorPrecision",
    value: function _retrieveSeparatorPrecision(maskExpretion) {
      var matcher = maskExpretion.match(new RegExp("^separator\\.([^d]*)"));
      return matcher ? Number(matcher[1]) : null;
    }
  }, {
    key: "_checkPrecision",
    value: function _checkPrecision(separatorExpression, separatorValue) {
      if (separatorExpression.indexOf('2') > 0) {
        return Number(separatorValue).toFixed(2);
      }
      return Number(separatorValue);
    }
  }]);
  return MaskService;
}(MaskApplierService);
MaskService.ɵfac = function MaskService_Factory(t) {
  return new (t || MaskService)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_8__.DOCUMENT), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](config), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__.Renderer2));
};
MaskService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: MaskService,
  factory: MaskService.ɵfac
});
MaskService.ctorParameters = function () {
  return [{
    type: undefined,
    decorators: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Inject,
      args: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.DOCUMENT]
    }]
  }, {
    type: undefined,
    decorators: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Inject,
      args: [config]
    }]
  }, {
    type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.ElementRef
  }, {
    type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Renderer2
  }];
};
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵsetClassMetadata"](MaskService, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Injectable
  }], function () {
    return [{
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Inject,
        args: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.DOCUMENT]
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Inject,
        args: [config]
      }]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.ElementRef
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Renderer2
    }];
  }, null);
})();

// tslint:disable deprecation
// tslint:disable no-input-rename
var MaskDirective = /*#__PURE__*/function () {
  function MaskDirective(document, _maskService, _config) {
    (0,F_project_development_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_5__["default"])(this, MaskDirective);
    this.document = document;
    this._maskService = _maskService;
    this._config = _config;
    this.maskExpression = '';
    this.specialCharacters = [];
    this.patterns = {};
    this.prefix = '';
    this.suffix = '';
    this.thousandSeparator = ' ';
    this.decimalMarker = '.';
    this.dropSpecialCharacters = null;
    this.hiddenInput = null;
    this.showMaskTyped = null;
    this.placeHolderCharacter = null;
    this.shownMaskExpression = null;
    this.showTemplate = null;
    this.clearIfNotMatch = null;
    this.validation = null;
    this.separatorLimit = null;
    this.allowNegativeNumbers = null;
    this.leadZeroDateTime = null;
    this._maskValue = '';
    this._position = null;
    this._maskExpressionArray = [];
    this._justPasted = false;
    this.onChange = function (_) {};
    this.onTouch = function () {};
  }
  (0,F_project_development_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_6__["default"])(MaskDirective, [{
    key: "ngOnChanges",
    value: function ngOnChanges(changes) {
      var maskExpression = changes.maskExpression,
        specialCharacters = changes.specialCharacters,
        patterns = changes.patterns,
        prefix = changes.prefix,
        suffix = changes.suffix,
        thousandSeparator = changes.thousandSeparator,
        decimalMarker = changes.decimalMarker,
        dropSpecialCharacters = changes.dropSpecialCharacters,
        hiddenInput = changes.hiddenInput,
        showMaskTyped = changes.showMaskTyped,
        placeHolderCharacter = changes.placeHolderCharacter,
        shownMaskExpression = changes.shownMaskExpression,
        showTemplate = changes.showTemplate,
        clearIfNotMatch = changes.clearIfNotMatch,
        validation = changes.validation,
        separatorLimit = changes.separatorLimit,
        allowNegativeNumbers = changes.allowNegativeNumbers,
        leadZeroDateTime = changes.leadZeroDateTime;
      if (maskExpression) {
        if (maskExpression.currentValue !== maskExpression.previousValue && !maskExpression.firstChange) {
          this._maskService.maskChanged = true;
        }
        this._maskValue = maskExpression.currentValue || '';
        if (maskExpression.currentValue && maskExpression.currentValue.split('||').length > 1) {
          this._maskExpressionArray = maskExpression.currentValue.split('||').sort(function (a, b) {
            return a.length - b.length;
          });
          this._maskValue = this._maskExpressionArray[0];
          this.maskExpression = this._maskExpressionArray[0];
          this._maskService.maskExpression = this._maskExpressionArray[0];
        }
      }
      if (specialCharacters) {
        if (!specialCharacters.currentValue || !Array.isArray(specialCharacters.currentValue)) {
          return;
        } else {
          this._maskService.maskSpecialCharacters = specialCharacters.currentValue || [];
        }
      }
      // Only overwrite the mask available patterns if a pattern has actually been passed in
      if (patterns && patterns.currentValue) {
        this._maskService.maskAvailablePatterns = patterns.currentValue;
      }
      if (prefix) {
        this._maskService.prefix = prefix.currentValue;
      }
      if (suffix) {
        this._maskService.suffix = suffix.currentValue;
      }
      if (thousandSeparator) {
        this._maskService.thousandSeparator = thousandSeparator.currentValue;
      }
      if (decimalMarker) {
        this._maskService.decimalMarker = decimalMarker.currentValue;
      }
      if (dropSpecialCharacters) {
        this._maskService.dropSpecialCharacters = dropSpecialCharacters.currentValue;
      }
      if (hiddenInput) {
        this._maskService.hiddenInput = hiddenInput.currentValue;
      }
      if (showMaskTyped) {
        this._maskService.showMaskTyped = showMaskTyped.currentValue;
      }
      if (placeHolderCharacter) {
        this._maskService.placeHolderCharacter = placeHolderCharacter.currentValue;
      }
      if (shownMaskExpression) {
        this._maskService.shownMaskExpression = shownMaskExpression.currentValue;
      }
      if (showTemplate) {
        this._maskService.showTemplate = showTemplate.currentValue;
      }
      if (clearIfNotMatch) {
        this._maskService.clearIfNotMatch = clearIfNotMatch.currentValue;
      }
      if (validation) {
        this._maskService.validation = validation.currentValue;
      }
      if (separatorLimit) {
        this._maskService.separatorLimit = separatorLimit.currentValue;
      }
      if (allowNegativeNumbers) {
        this._maskService.allowNegativeNumbers = allowNegativeNumbers.currentValue;
        if (this._maskService.allowNegativeNumbers) {
          this._maskService.maskSpecialCharacters = this._maskService.maskSpecialCharacters.filter(function (c) {
            return c !== '-';
          });
        }
      }
      if (leadZeroDateTime) {
        this._maskService.leadZeroDateTime = leadZeroDateTime.currentValue;
      }
      this._applyMask();
    }
    // tslint:disable-next-line: cyclomatic-complexity
  }, {
    key: "validate",
    value: function validate(_ref3) {
      var _this11 = this;
      var value = _ref3.value;
      if (!this._maskService.validation || !this._maskValue) {
        return null;
      }
      if (this._maskService.ipError) {
        return this._createValidationError(value);
      }
      if (this._maskService.cpfCnpjError) {
        return this._createValidationError(value);
      }
      if (this._maskValue.startsWith('separator')) {
        return null;
      }
      if (withoutValidation.includes(this._maskValue)) {
        return null;
      }
      if (this._maskService.clearIfNotMatch) {
        return null;
      }
      if (timeMasks.includes(this._maskValue)) {
        return this._validateTime(value);
      }
      if (value && value.toString().length >= 1) {
        var counterOfOpt = 0;
        var _loop = function _loop(key) {
          if (_this11._maskService.maskAvailablePatterns[key].optional && _this11._maskService.maskAvailablePatterns[key].optional === true) {
            if (_this11._maskValue.indexOf(key) !== _this11._maskValue.lastIndexOf(key)) {
              var opt = _this11._maskValue.split('').filter(function (i) {
                return i === key;
              }).join('');
              counterOfOpt += opt.length;
            } else if (_this11._maskValue.indexOf(key) !== -1) {
              counterOfOpt++;
            }
            if (_this11._maskValue.indexOf(key) !== -1 && value.toString().length >= _this11._maskValue.indexOf(key)) {
              return {
                v: null
              };
            }
            if (counterOfOpt === _this11._maskValue.length) {
              return {
                v: null
              };
            }
          }
        };
        for (var key in this._maskService.maskAvailablePatterns) {
          var _ret = _loop(key);
          if (typeof _ret === "object") return _ret.v;
        }
        if (this._maskValue.indexOf('{') === 1 && value.toString().length === this._maskValue.length + Number(this._maskValue.split('{')[1].split('}')[0]) - 4) {
          return null;
        }
        if (this._maskValue.indexOf('*') === 1 || this._maskValue.indexOf('?') === 1) {
          return null;
        } else if (this._maskValue.indexOf('*') > 1 && value.toString().length < this._maskValue.indexOf('*') || this._maskValue.indexOf('?') > 1 && value.toString().length < this._maskValue.indexOf('?') || this._maskValue.indexOf('{') === 1) {
          return this._createValidationError(value);
        }
        if (this._maskValue.indexOf('*') === -1 || this._maskValue.indexOf('?') === -1) {
          var length = this._maskService.dropSpecialCharacters ? this._maskValue.length - this._maskService.checkSpecialCharAmount(this._maskValue) - counterOfOpt : this._maskValue.length - counterOfOpt;
          if (value.toString().length < length) {
            return this._createValidationError(value);
          }
        }
      }
      return null;
    }
  }, {
    key: "onPaste",
    value: function onPaste() {
      this._justPasted = true;
    }
  }, {
    key: "onInput",
    value: function onInput(e) {
      var _this12 = this;
      var el = e.target;
      this._inputValue = el.value;
      this._setMask();
      if (!this._maskValue) {
        this.onChange(el.value);
        return;
      }
      var position = el.selectionStart === 1 ? el.selectionStart + this._maskService.prefix.length : el.selectionStart;
      var caretShift = 0;
      var backspaceShift = false;
      this._maskService.applyValueChanges(position, this._justPasted, this._code === 'Backspace' || this._code === 'Delete', function (shift, _backspaceShift) {
        _this12._justPasted = false;
        caretShift = shift;
        backspaceShift = _backspaceShift;
      });
      // only set the selection if the element is active
      if (this.document.activeElement !== el) {
        return;
      }
      this._position = this._position === 1 && this._inputValue.length === 1 ? null : this._position;
      var positionToApply = this._position ? this._inputValue.length + position + caretShift : position + (this._code === 'Backspace' && !backspaceShift ? 0 : caretShift);
      if (positionToApply > this._getActualInputLength()) {
        positionToApply = this._getActualInputLength();
      }
      if (positionToApply < 0) {
        positionToApply = 0;
      }
      el.setSelectionRange(positionToApply, positionToApply);
      this._position = null;
    }
  }, {
    key: "onBlur",
    value: function onBlur() {
      if (this._maskValue) {
        this._maskService.clearIfNotMatchFn();
      }
      this.onTouch();
    }
  }, {
    key: "onFocus",
    value: function onFocus(e) {
      if (!this._maskValue) {
        return;
      }
      var el = e.target;
      var posStart = 0;
      var posEnd = 0;
      if (el !== null && el.selectionStart !== null && el.selectionStart === el.selectionEnd && el.selectionStart > this._maskService.prefix.length &&
      // tslint:disable-next-line
      e.keyCode !== 38) {
        if (this._maskService.showMaskTyped) {
          // We are showing the mask in the input
          this._maskService.maskIsShown = this._maskService.showMaskInInput();
          if (el.setSelectionRange && this._maskService.prefix + this._maskService.maskIsShown === el.value) {
            // the input ONLY contains the mask, so position the cursor at the start
            el.focus();
            el.setSelectionRange(posStart, posEnd);
          } else {
            // the input contains some characters already
            if (el.selectionStart > this._maskService.actualValue.length) {
              // if the user clicked beyond our value's length, position the cursor at the end of our value
              el.setSelectionRange(this._maskService.actualValue.length, this._maskService.actualValue.length);
            }
          }
        }
      }
      var nextValue = !el.value || el.value === this._maskService.prefix ? this._maskService.prefix + this._maskService.maskIsShown : el.value;
      /** Fix of cursor position jumping to end in most browsers no matter where cursor is inserted onFocus */
      if (el.value !== nextValue) {
        el.value = nextValue;
      }
      /** fix of cursor position with prefix when mouse click occur */
      if ((el.selectionStart || el.selectionEnd) <= this._maskService.prefix.length) {
        el.selectionStart = this._maskService.prefix.length;
        return;
      }
      /** select only inserted text */
      if (el.selectionEnd > this._getActualInputLength()) {
        el.selectionEnd = this._getActualInputLength();
      }
    }
    // tslint:disable-next-line: cyclomatic-complexity
  }, {
    key: "onKeyDown",
    value: function onKeyDown(e) {
      var _a;
      if (!this._maskValue) {
        return;
      }
      this._code = e.code ? e.code : e.key;
      var el = e.target;
      this._inputValue = el.value;
      this._setMask();
      if (e.keyCode === 38) {
        e.preventDefault();
      }
      if (e.keyCode === 37 || e.keyCode === 8 || e.keyCode === 46) {
        if (e.keyCode === 8 && el.value.length === 0) {
          el.selectionStart = el.selectionEnd;
        }
        if (e.keyCode === 8 && el.selectionStart !== 0) {
          // If specialChars is false, (shouldn't ever happen) then set to the defaults
          this.specialCharacters = ((_a = this.specialCharacters) === null || _a === void 0 ? void 0 : _a.length) ? this.specialCharacters : this._config.specialCharacters;
          if (this.prefix.length > 1 && el.selectionStart <= this.prefix.length) {
            el.setSelectionRange(this.prefix.length, this.prefix.length);
          } else {
            if (this._inputValue.length !== el.selectionStart && el.selectionStart !== 1) {
              while (this.specialCharacters.includes(this._inputValue[el.selectionStart - 1].toString()) && (this.prefix.length >= 1 && el.selectionStart > this.prefix.length || this.prefix.length === 0)) {
                el.setSelectionRange(el.selectionStart - 1, el.selectionStart - 1);
              }
            }
            this.suffixCheckOnPressDelete(e.keyCode, el);
          }
        }
        this.suffixCheckOnPressDelete(e.keyCode, el);
        if (this._maskService.prefix.length && el.selectionStart <= this._maskService.prefix.length && el.selectionEnd <= this._maskService.prefix.length) {
          e.preventDefault();
        }
        var cursorStart = el.selectionStart;
        // this.onFocus(e);
        if (e.keyCode === 8 && !el.readOnly && cursorStart === 0 && el.selectionEnd === el.value.length && el.value.length !== 0) {
          this._position = this._maskService.prefix ? this._maskService.prefix.length : 0;
          this._maskService.applyMask(this._maskService.prefix, this._maskService.maskExpression, this._position);
        }
      }
      if (!!this.suffix && this.suffix.length > 1 && this._inputValue.length - this.suffix.length < el.selectionStart) {
        el.setSelectionRange(this._inputValue.length - this.suffix.length, this._inputValue.length);
      } else if (e.keyCode === 65 && e.ctrlKey === true ||
      // Ctrl+ A
      e.keyCode === 65 && e.metaKey === true // Cmd + A (Mac)
      ) {
        el.setSelectionRange(0, this._getActualInputLength());
        e.preventDefault();
      }
      this._maskService.selStart = el.selectionStart;
      this._maskService.selEnd = el.selectionEnd;
    }
    /** It writes the value in the input */
  }, {
    key: "writeValue",
    value: function writeValue(inputValue) {
      return (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (typeof inputValue === 'object' && inputValue !== null && 'value' in inputValue) {
                if ('disable' in inputValue) {
                  this.setDisabledState(Boolean(inputValue.disable));
                }
                inputValue = inputValue.value;
              }
              if (inputValue === undefined) {
                inputValue = '';
              }
              if (typeof inputValue === 'number') {
                inputValue = String(inputValue);
                inputValue = this.decimalMarker !== '.' ? inputValue.replace('.', this.decimalMarker) : inputValue;
                this._maskService.isNumberValue = true;
              }
              this._inputValue = inputValue;
              this._setMask();
              if (inputValue && this._maskService.maskExpression || this._maskService.maskExpression && (this._maskService.prefix || this._maskService.showMaskTyped)) {
                // Let the service we know we are writing value so that triggering onChange function wont happen during applyMask
                this._maskService.writingValue = true;
                this._maskService.formElementProperty = ['value', this._maskService.applyMask(inputValue, this._maskService.maskExpression)];
                // Let the service know we've finished writing value
                this._maskService.writingValue = false;
              } else {
                this._maskService.formElementProperty = ['value', inputValue];
              }
              this._inputValue = inputValue;
            case 7:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
    }
  }, {
    key: "registerOnChange",
    value: function registerOnChange(fn) {
      this.onChange = fn;
      this._maskService.onChange = this.onChange;
    }
  }, {
    key: "registerOnTouched",
    value: function registerOnTouched(fn) {
      this.onTouch = fn;
    }
  }, {
    key: "suffixCheckOnPressDelete",
    value: function suffixCheckOnPressDelete(keyCode, el) {
      if (keyCode === 46 && this.suffix.length > 0) {
        if (this._inputValue.length - this.suffix.length <= el.selectionStart) {
          el.setSelectionRange(this._inputValue.length - this.suffix.length, this._inputValue.length);
        }
      }
      if (keyCode === 8) {
        if (this.suffix.length > 1 && this._inputValue.length - this.suffix.length < el.selectionStart) {
          el.setSelectionRange(this._inputValue.length - this.suffix.length, this._inputValue.length);
        }
        if (this.suffix.length === 1 && this._inputValue.length === el.selectionStart) {
          el.setSelectionRange(el.selectionStart - 1, el.selectionStart - 1);
        }
      }
    }
    /** It disables the input element */
  }, {
    key: "setDisabledState",
    value: function setDisabledState(isDisabled) {
      this._maskService.formElementProperty = ['disabled', isDisabled];
    }
  }, {
    key: "_repeatPatternSymbols",
    value: function _repeatPatternSymbols(maskExp) {
      var _this13 = this;
      return maskExp.match(/{[0-9]+}/) && maskExp.split('').reduce(function (accum, currval, index) {
        _this13._start = currval === '{' ? index : _this13._start;
        if (currval !== '}') {
          return _this13._maskService._findSpecialChar(currval) ? accum + currval : accum;
        }
        _this13._end = index;
        var repeatNumber = Number(maskExp.slice(_this13._start + 1, _this13._end));
        var replaceWith = new Array(repeatNumber + 1).join(maskExp[_this13._start - 1]);
        return accum + replaceWith;
      }, '') || maskExp;
    }
    // tslint:disable-next-line:no-any
  }, {
    key: "_applyMask",
    value: function _applyMask() {
      this._maskService.maskExpression = this._repeatPatternSymbols(this._maskValue || '');
      this._maskService.formElementProperty = ['value', this._maskService.applyMask(this._inputValue, this._maskService.maskExpression)];
    }
  }, {
    key: "_validateTime",
    value: function _validateTime(value) {
      var rowMaskLen = this._maskValue.split('').filter(function (s) {
        return s !== ':';
      }).length;
      if (!value) {
        return null; // Don't validate empty values to allow for optional form control
      }

      if (+value[value.length - 1] === 0 && value.length < rowMaskLen || value.length <= rowMaskLen - 2) {
        return this._createValidationError(value);
      }
      return null;
    }
  }, {
    key: "_getActualInputLength",
    value: function _getActualInputLength() {
      return this._maskService.actualValue.length || this._maskService.actualValue.length + this._maskService.prefix.length;
    }
  }, {
    key: "_createValidationError",
    value: function _createValidationError(actualValue) {
      return {
        mask: {
          requiredMask: this._maskValue,
          actualValue: actualValue
        }
      };
    }
  }, {
    key: "_setMask",
    value: function _setMask() {
      var _this14 = this;
      if (this._maskExpressionArray.length > 0) {
        this._maskExpressionArray.some(function (mask) {
          var _a, _b;
          var test = ((_a = _this14._maskService.removeMask(_this14._inputValue)) === null || _a === void 0 ? void 0 : _a.length) <= ((_b = _this14._maskService.removeMask(mask)) === null || _b === void 0 ? void 0 : _b.length);
          if (_this14._inputValue && test) {
            _this14._maskValue = mask;
            _this14.maskExpression = mask;
            _this14._maskService.maskExpression = mask;
            return test;
          } else {
            _this14._maskValue = _this14._maskExpressionArray[_this14._maskExpressionArray.length - 1];
            _this14.maskExpression = _this14._maskExpressionArray[_this14._maskExpressionArray.length - 1];
            _this14._maskService.maskExpression = _this14._maskExpressionArray[_this14._maskExpressionArray.length - 1];
          }
        });
      }
    }
  }]);
  return MaskDirective;
}();
MaskDirective.ɵfac = function MaskDirective_Factory(t) {
  return new (t || MaskDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_8__.DOCUMENT), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](MaskService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](config));
};
MaskDirective.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineDirective"]({
  type: MaskDirective,
  selectors: [["input", "mask", ""], ["textarea", "mask", ""]],
  hostBindings: function MaskDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("paste", function MaskDirective_paste_HostBindingHandler() {
        return ctx.onPaste();
      })("input", function MaskDirective_input_HostBindingHandler($event) {
        return ctx.onInput($event);
      })("blur", function MaskDirective_blur_HostBindingHandler() {
        return ctx.onBlur();
      })("click", function MaskDirective_click_HostBindingHandler($event) {
        return ctx.onFocus($event);
      })("keydown", function MaskDirective_keydown_HostBindingHandler($event) {
        return ctx.onKeyDown($event);
      });
    }
  },
  inputs: {
    maskExpression: ["mask", "maskExpression"],
    specialCharacters: "specialCharacters",
    patterns: "patterns",
    prefix: "prefix",
    suffix: "suffix",
    thousandSeparator: "thousandSeparator",
    decimalMarker: "decimalMarker",
    dropSpecialCharacters: "dropSpecialCharacters",
    hiddenInput: "hiddenInput",
    showMaskTyped: "showMaskTyped",
    placeHolderCharacter: "placeHolderCharacter",
    shownMaskExpression: "shownMaskExpression",
    showTemplate: "showTemplate",
    clearIfNotMatch: "clearIfNotMatch",
    validation: "validation",
    separatorLimit: "separatorLimit",
    allowNegativeNumbers: "allowNegativeNumbers",
    leadZeroDateTime: "leadZeroDateTime"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵProvidersFeature"]([{
    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NG_VALUE_ACCESSOR,
    useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.forwardRef)(function () {
      return MaskDirective;
    }),
    multi: true
  }, {
    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NG_VALIDATORS,
    useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.forwardRef)(function () {
      return MaskDirective;
    }),
    multi: true
  }, MaskService]), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵNgOnChangesFeature"]]
});
MaskDirective.ctorParameters = function () {
  return [{
    type: undefined,
    decorators: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Inject,
      args: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.DOCUMENT]
    }]
  }, {
    type: MaskService
  }, {
    type: undefined,
    decorators: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Inject,
      args: [config]
    }]
  }];
};
MaskDirective.propDecorators = {
  maskExpression: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input,
    args: ['mask']
  }],
  specialCharacters: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input
  }],
  patterns: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input
  }],
  prefix: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input
  }],
  suffix: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input
  }],
  thousandSeparator: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input
  }],
  decimalMarker: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input
  }],
  dropSpecialCharacters: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input
  }],
  hiddenInput: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input
  }],
  showMaskTyped: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input
  }],
  placeHolderCharacter: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input
  }],
  shownMaskExpression: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input
  }],
  showTemplate: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input
  }],
  clearIfNotMatch: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input
  }],
  validation: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input
  }],
  separatorLimit: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input
  }],
  allowNegativeNumbers: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input
  }],
  leadZeroDateTime: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input
  }],
  onPaste: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.HostListener,
    args: ['paste']
  }],
  onInput: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.HostListener,
    args: ['input', ['$event']]
  }],
  onBlur: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.HostListener,
    args: ['blur']
  }],
  onFocus: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.HostListener,
    args: ['click', ['$event']]
  }],
  onKeyDown: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.HostListener,
    args: ['keydown', ['$event']]
  }]
};
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵsetClassMetadata"](MaskDirective, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Directive,
    args: [{
      selector: 'input[mask], textarea[mask]',
      providers: [{
        provide: _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NG_VALUE_ACCESSOR,
        useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.forwardRef)(function () {
          return MaskDirective;
        }),
        multi: true
      }, {
        provide: _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NG_VALIDATORS,
        useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.forwardRef)(function () {
          return MaskDirective;
        }),
        multi: true
      }, MaskService]
    }]
  }], function () {
    return [{
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Inject,
        args: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.DOCUMENT]
      }]
    }, {
      type: MaskService
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Inject,
        args: [config]
      }]
    }];
  }, {
    maskExpression: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input,
      args: ['mask']
    }],
    specialCharacters: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input
    }],
    patterns: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input
    }],
    prefix: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input
    }],
    suffix: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input
    }],
    thousandSeparator: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input
    }],
    decimalMarker: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input
    }],
    dropSpecialCharacters: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input
    }],
    hiddenInput: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input
    }],
    showMaskTyped: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input
    }],
    placeHolderCharacter: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input
    }],
    shownMaskExpression: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input
    }],
    showTemplate: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input
    }],
    clearIfNotMatch: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input
    }],
    validation: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input
    }],
    separatorLimit: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input
    }],
    allowNegativeNumbers: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input
    }],
    leadZeroDateTime: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input
    }],
    onPaste: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.HostListener,
      args: ['paste']
    }],
    onInput: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.HostListener,
      args: ['input', ['$event']]
    }],
    onBlur: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.HostListener,
      args: ['blur']
    }],
    onFocus: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.HostListener,
      args: ['click', ['$event']]
    }],
    // tslint:disable-next-line: cyclomatic-complexity
    onKeyDown: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.HostListener,
      args: ['keydown', ['$event']]
    }]
  });
})();
var MaskPipe = /*#__PURE__*/function () {
  function MaskPipe(_maskService) {
    (0,F_project_development_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_5__["default"])(this, MaskPipe);
    this._maskService = _maskService;
  }
  (0,F_project_development_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_6__["default"])(MaskPipe, [{
    key: "transform",
    value: function transform(value, mask) {
      var thousandSeparator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      if (!value && typeof value !== 'number') {
        return '';
      }
      if (thousandSeparator) {
        this._maskService.thousandSeparator = thousandSeparator;
      }
      if (typeof mask === 'string') {
        return this._maskService.applyMask("".concat(value), mask);
      }
      return this._maskService.applyMaskWithPattern("".concat(value), mask);
    }
  }]);
  return MaskPipe;
}();
MaskPipe.ɵfac = function MaskPipe_Factory(t) {
  return new (t || MaskPipe)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](MaskApplierService, 16));
};
MaskPipe.ɵpipe = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefinePipe"]({
  name: "mask",
  type: MaskPipe,
  pure: true
});
MaskPipe.ctorParameters = function () {
  return [{
    type: MaskApplierService
  }];
};
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵsetClassMetadata"](MaskPipe, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Pipe,
    args: [{
      name: 'mask',
      pure: true
    }]
  }], function () {
    return [{
      type: MaskApplierService
    }];
  }, null);
})();
var NgxMaskModule = /*#__PURE__*/function () {
  function NgxMaskModule() {
    (0,F_project_development_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_5__["default"])(this, NgxMaskModule);
  }
  (0,F_project_development_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_6__["default"])(NgxMaskModule, null, [{
    key: "forRoot",
    value: function forRoot(configValue) {
      return {
        ngModule: NgxMaskModule,
        providers: [{
          provide: NEW_CONFIG,
          useValue: configValue
        }, {
          provide: INITIAL_CONFIG,
          useValue: initialConfig
        }, {
          provide: config,
          useFactory: _configFactory,
          deps: [INITIAL_CONFIG, NEW_CONFIG]
        }, MaskApplierService]
      };
    }
  }, {
    key: "forChild",
    value: function forChild() {
      return {
        ngModule: NgxMaskModule
      };
    }
  }]);
  return NgxMaskModule;
}();
NgxMaskModule.ɵfac = function NgxMaskModule_Factory(t) {
  return new (t || NgxMaskModule)();
};
NgxMaskModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({
  type: NgxMaskModule
});
NgxMaskModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵsetClassMetadata"](NgxMaskModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.NgModule,
    args: [{
      exports: [MaskDirective, MaskPipe],
      declarations: [MaskDirective, MaskPipe]
    }]
  }], null, null);
})();
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](NgxMaskModule, {
    declarations: [MaskDirective, MaskPipe],
    exports: [MaskDirective, MaskPipe]
  });
})();
/**
 * @internal
 */
function _configFactory(initConfig, configValue) {
  return configValue instanceof Function ? Object.assign(Object.assign({}, initConfig), configValue()) : Object.assign(Object.assign({}, initConfig), configValue);
}
var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
(function () {
  if (!commonjsGlobal.KeyboardEvent) {
    commonjsGlobal.KeyboardEvent = function (_eventType, _init) {};
  }
})();

/**
 * Generated bundle index. Do not edit.
 */



/***/ }),

/***/ 9028:
/*!*************************************************************************************************!*\
  !*** ./src/app/modules/customer-ledger/components/customer-ledger/customer-ledger.component.ts ***!
  \*************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CustomerLedgerComponent": function() { return /* binding */ CustomerLedgerComponent; }
/* harmony export */ });
/* harmony import */ var F_project_development_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ 5960);
/* harmony import */ var F_project_development_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ 9367);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 8346);
/* harmony import */ var app_shared_sweetalert_sweetalert_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/shared/sweetalert/sweetalert.component */ 3579);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var app_modules_user_service_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/modules/user/service/user.service */ 5564);
/* harmony import */ var app_modules_order_service_order_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/modules/order/service/order.service */ 9172);
/* harmony import */ var app_layout_components_content_header_content_header_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/layout/components/content-header/content-header.component */ 4665);
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ng-select/ng-select */ 5025);
/* harmony import */ var _core_directives_core_ripple_effect_core_ripple_effect_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @core/directives/core-ripple-effect/core-ripple-effect.directive */ 3113);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 8267);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 3252);














function CustomerLedgerComponent_tr_83_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "td", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2, "No Result Found");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
}
var _c0 = function _c0(a1) {
  return ["/order/form", a1];
};
function CustomerLedgerComponent_tr_84_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "td", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](5, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](7, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](8, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](10, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](12, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    var item_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction1"](10, _c0, item_r2.id));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" NW-00", item_r2.id, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](item_r2.customer_name);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind2"](7, 7, item_r2.plan_date, "longDate"));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](item_r2.total_amount);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](item_r2.amount_received);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](item_r2.balance_amount);
  }
}
var _c1 = function _c1() {
  return {
    standalone: true
  };
};
var CustomerLedgerComponent = /*#__PURE__*/function () {
  function CustomerLedgerComponent(_customerService, _orderService, fb, _sw) {
    (0,F_project_development_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, CustomerLedgerComponent);
    this._customerService = _customerService;
    this._orderService = _orderService;
    this.fb = fb;
    this._sw = _sw;
    this.submitted = false;
    this.customerData = {
      customerName: null,
      customerNumber: null,
      customerEmail: "",
      customerCity: "",
      customerAddress: ""
    };
    this.customerTableData = [];
    this.paymentCM = {
      totalAmount: null,
      balanceAmount: null,
      collectedAmount: null,
      receivedAmount: null,
      collectedNow: null,
      advanceAmount: null
    };
    this.advancePayment = 0;
  }
  (0,F_project_development_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(CustomerLedgerComponent, [{
    key: "onSubmit",
    value: function onSubmit(formValue) {
      var _this = this;
      if (this.paymentCM.collectedAmount == null || this.paymentCM.collectedAmount == 0) {
        return false;
      }
      this._orderService.updateCustomerLedger(formValue).subscribe(function (res) {
        _this._sw.fire("success", "Ledger Amount", "Record Successfully Update..");
        _this.submitted = false;
      }, function (err) {
        _this._sw.fire("error", "Ledger Amount", err.error.message);
      });
    }
  }, {
    key: "selectCustomer",
    value: function selectCustomer(selectedCustomer) {
      this.customerData.customerName = selectedCustomer.full_name;
      this.customerData.customerNumber = selectedCustomer.phone;
      this.customerData.customerEmail = selectedCustomer.email;
      this.customerData.customerCity = selectedCustomer.city;
      this.customerData.customerAddress = selectedCustomer.address;
      this.getLedgerByCustomer({
        customer_name: this.customerData.customerName,
        customer_phone: this.customerData.customerNumber
      });
    }
  }, {
    key: "getLedgerByCustomer",
    value: function getLedgerByCustomer(getOj) {
      var _this2 = this;
      this._orderService.getByCustomer(getOj).subscribe(function (res) {
        if (res.data) {
          _this2.customerTableData = res.data.results;
          _this2.ledgerFrom.patchValue({
            id: res.data.amount.id,
            totalAmount: res.data.amount.total_amount,
            totalReceived: res.data.amount.total_received,
            totalBalance: res.data.amount.total_balance,
            collectedAmount: res.data.amount.collected_amount,
            advancePayment: res.data.amount.advance_payment
          });
          _this2.receivedAmount = res.data.amount.total_received;
          _this2.balanceAmount = res.data.amount.total_balance;
          _this2.collectedAmount = res.data.amount.collected_amount;
          _this2.advancePayment = res.data.amount.advance_payment;
        } else {
          _this2.customerTableData = [];
          _this2.ledgerFrom.reset();
          _this2.receivedAmount = 0;
          _this2.balanceAmount = 0;
        }
      });
    }
  }, {
    key: "paymentCollectedChange",
    value: function paymentCollectedChange(val) {
      this.paymentCM.balanceAmount = this.balanceAmount - +val;
      this.paymentCM.receivedAmount = this.receivedAmount + +val;
      this.paymentCM.collectedAmount = this.collectedAmount + +val;
      if (this.paymentCM.balanceAmount < 0) {
        this.paymentCM.advanceAmount = this.advancePayment + -this.paymentCM.balanceAmount;
        this.paymentCM.receivedAmount = this.paymentCM.totalAmount;
        this.paymentCM.balanceAmount = 0;
      }
    }
  }, {
    key: "getUserDetails",
    value: function getUserDetails() {
      var _this3 = this;
      this._customerService.getAll().subscribe(function (res) {
        if (res.data) {
          _this3.userDetail = res.data.filter(function (type) {
            return type.customer_type == "Stitching";
          });
        }
      });
    }
  }, {
    key: "makeReactiveForm",
    value: function makeReactiveForm() {
      this.ledgerFrom = this.fb.group({
        id: [],
        totalAmount: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.required]],
        totalReceived: [],
        totalBalance: [],
        collectedAmount: [],
        advancePayment: []
      });
    }
  }, {
    key: "ngOnInit",
    value: function ngOnInit() {
      this.getUserDetails();
      this.makeReactiveForm();
      this.contentHeader = {
        headerTitle: "Customer Ledger",
        actionButton: true,
        breadcrumb: {
          type: "",
          links: [{
            name: "Customer",
            isLink: true,
            link: "/customer"
          }, {
            name: "Ledger",
            isLink: false
          }]
        }
      };
    }
  }]);
  return CustomerLedgerComponent;
}();
CustomerLedgerComponent.ɵfac = function CustomerLedgerComponent_Factory(t) {
  return new (t || CustomerLedgerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](app_modules_user_service_user_service__WEBPACK_IMPORTED_MODULE_3__.UserService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](app_modules_order_service_order_service__WEBPACK_IMPORTED_MODULE_4__.OrderService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](app_shared_sweetalert_sweetalert_component__WEBPACK_IMPORTED_MODULE_2__.SweetalertComponent));
};
CustomerLedgerComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
  type: CustomerLedgerComponent,
  selectors: [["app-customer-ledger"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵProvidersFeature"]([app_shared_sweetalert_sweetalert_component__WEBPACK_IMPORTED_MODULE_2__.SweetalertComponent])],
  decls: 85,
  vars: 22,
  consts: [[1, "content-wrapper", "container-xxl", "p-0"], [1, "content-body"], [3, "contentHeader"], [1, "card", "p-2"], [1, "row"], [1, "col-12", "col-md-4"], [1, "form-group"], ["for", "customer-name"], ["placeholder", "Customer Name", "bindLabel", "full_name", "bindValue", "full_name", 3, "items", "searchable", "ngModel", "ngModelChange", "change"], ["for", "customer-number"], ["placeholder", "Customer Number", "bindLabel", "phone", "bindValue", "phone", 3, "items", "searchable", "ngModel", "ngModelChange", "change"], ["for", "customer-email"], ["type", "text", "id", "customer-email", "placeholder", "Customer Email", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "city"], ["type", "text", "id", "city", "placeholder", "City", 1, "form-control", 3, "ngModel", "ngModelChange"], [1, "col-12", "col-md-8"], ["for", "address"], ["type", "text", "id", "address", "placeholder", "Address", 1, "form-control", 3, "ngModel", "ngModelChange"], [1, "form", "form-vertical", 3, "formGroup"], [1, "col-12", "col-md-2", "pr-0"], ["for", "total-amount"], ["type", "text", "id", "total-amount", "placeholder", "Total Amount", "formControlName", "totalAmount", "readonly", "", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "amount-received"], ["type", "text", "id", "amount-received", "placeholder", "Total Amount Received", "formControlName", "totalReceived", "readonly", "", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "net-balance"], ["type", "text", "id", "net-balance", "placeholder", "Total Net Balance", "formControlName", "totalBalance", "readonly", "", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "net-collected"], ["type", "text", "id", "net-collected", "readonly", "", "placeholder", "Total Payment Collected", "formControlName", "collectedAmount", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "advance-payment"], ["type", "number", "id", "advance-payment", "placeholder", "Advance Payment", "formControlName", "advancePayment", 1, "form-control", 3, "ngModel", "ngModelChange"], [1, "col-12", "col-md-2"], ["for", "now-collected"], ["type", "number", "id", "now-collected", "placeholder", "Payment Collected Now", 1, "form-control", 3, "ngModel", "ngModelOptions", "ngModelChange", "input"], [1, "col-12", "col-md-12"], ["type", "submit", "rippleEffect", "", 1, "btn", "btn-primary", "float-right", 3, "disabled", "click"], [1, "table-responsive", "border"], [1, "table"], [4, "ngIf"], [4, "ngFor", "ngForOf"], ["colspan", "7"], [1, "text-info", "cursor-pointer", 3, "routerLink"]],
  template: function CustomerLedgerComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](2, "app-content-header", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "section", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](5, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](7, "label", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](8, "Customer Name");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](9, "ng-select", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function CustomerLedgerComponent_Template_ng_select_ngModelChange_9_listener($event) {
        return ctx.customerData.customerName = $event;
      })("change", function CustomerLedgerComponent_Template_ng_select_change_9_listener($event) {
        return ctx.selectCustomer($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](10, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](11, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](12, "label", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](13, "Customer Number");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](14, "ng-select", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function CustomerLedgerComponent_Template_ng_select_ngModelChange_14_listener($event) {
        return ctx.customerData.customerNumber = $event;
      })("change", function CustomerLedgerComponent_Template_ng_select_change_14_listener($event) {
        return ctx.selectCustomer($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](15, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](16, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](17, "label", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](18, "Customer Email");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](19, "input", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function CustomerLedgerComponent_Template_input_ngModelChange_19_listener($event) {
        return ctx.customerData.customerEmail = $event;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](20, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](21, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](22, "label", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](23, "City");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](24, "input", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function CustomerLedgerComponent_Template_input_ngModelChange_24_listener($event) {
        return ctx.customerData.customerCity = $event;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](25, "div", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](26, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](27, "label", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](28, "Address");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](29, "input", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function CustomerLedgerComponent_Template_input_ngModelChange_29_listener($event) {
        return ctx.customerData.customerAddress = $event;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](30, "hr");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](31, "form", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](32, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](33, "div", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](34, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](35, "label", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](36, "Total Amount");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](37, "input", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function CustomerLedgerComponent_Template_input_ngModelChange_37_listener($event) {
        return ctx.paymentCM.totalAmount = $event;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](38, "div", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](39, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](40, "label", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](41, "Total Amount Received");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](42, "input", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function CustomerLedgerComponent_Template_input_ngModelChange_42_listener($event) {
        return ctx.paymentCM.receivedAmount = $event;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](43, "div", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](44, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](45, "label", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](46, "Total Net Balance");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](47, "input", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function CustomerLedgerComponent_Template_input_ngModelChange_47_listener($event) {
        return ctx.paymentCM.balanceAmount = $event;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](48, "div", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](49, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](50, "label", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](51, "Total Payment Collected");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](52, "input", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function CustomerLedgerComponent_Template_input_ngModelChange_52_listener($event) {
        return ctx.paymentCM.collectedAmount = $event;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](53, "div", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](54, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](55, "label", 28);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](56, "Advance Payment");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](57, "input", 29);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function CustomerLedgerComponent_Template_input_ngModelChange_57_listener($event) {
        return ctx.paymentCM.advanceAmount = $event;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](58, "div", 30);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](59, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](60, "label", 31);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](61, "Payment Collected Now");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](62, "input", 32);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function CustomerLedgerComponent_Template_input_ngModelChange_62_listener($event) {
        return ctx.paymentCM.collectedNow = $event;
      })("input", function CustomerLedgerComponent_Template_input_input_62_listener($event) {
        return ctx.paymentCollectedChange($event.target.value);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](63, "div", 33);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](64, "button", 34);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function CustomerLedgerComponent_Template_button_click_64_listener() {
        return ctx.onSubmit(ctx.ledgerFrom.value);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](65, " Save ");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](66, "div", 35);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](67, "table", 36);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](68, "thead");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](69, "tr");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](70, "th");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](71, "Order Number");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](72, "th");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](73, "Customer Name");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](74, "th");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](75, "Delivery Date");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](76, "th");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](77, "Order Amount");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](78, "th");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](79, "Amount Received");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](80, "th");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](81, "Net Balance");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](82, "tbody");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](83, CustomerLedgerComponent_tr_83_Template, 3, 0, "tr", 37);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](84, CustomerLedgerComponent_tr_84_Template, 14, 12, "tr", 38);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("contentHeader", ctx.contentHeader);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("items", ctx.userDetail)("searchable", true)("ngModel", ctx.customerData.customerName);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("items", ctx.userDetail)("searchable", true)("ngModel", ctx.customerData.customerNumber);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngModel", ctx.customerData.customerEmail);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngModel", ctx.customerData.customerCity);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngModel", ctx.customerData.customerAddress);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("formGroup", ctx.ledgerFrom);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngModel", ctx.paymentCM.totalAmount);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngModel", ctx.paymentCM.receivedAmount);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngModel", ctx.paymentCM.balanceAmount);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngModel", ctx.paymentCM.collectedAmount);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngModel", ctx.paymentCM.advanceAmount);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngModel", ctx.paymentCM.collectedNow)("ngModelOptions", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction0"](21, _c1));
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("disabled", ctx.paymentCM.balanceAmount < 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](19);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.customerTableData.length == 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", ctx.customerTableData);
    }
  },
  directives: [app_layout_components_content_header_content_header_component__WEBPACK_IMPORTED_MODULE_5__.ContentHeaderComponent, _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_9__.NgSelectComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControlName, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NumberValueAccessor, _core_directives_core_ripple_effect_core_ripple_effect_directive__WEBPACK_IMPORTED_MODULE_6__.RippleEffectDirective, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgForOf, _angular_router__WEBPACK_IMPORTED_MODULE_11__.RouterLink],
  pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.DatePipe],
  styles: [".ng-select.ng-select-opened>.ng-select-container{background:#fff;border-color:#b3b3b3 #ccc #d9d9d9}.ng-select.ng-select-opened>.ng-select-container:hover{box-shadow:none}.ng-select.ng-select-opened>.ng-select-container .ng-arrow{top:-2px;border-color:transparent transparent #999;border-width:0 5px 5px}.ng-select.ng-select-opened>.ng-select-container .ng-arrow:hover{border-color:transparent transparent #333}.ng-select.ng-select-opened.ng-select-bottom>.ng-select-container{border-bottom-right-radius:0;border-bottom-left-radius:0}.ng-select.ng-select-opened.ng-select-top>.ng-select-container{border-top-right-radius:0;border-top-left-radius:0}.ng-select.ng-select-focused:not(.ng-select-opened)>.ng-select-container{border-color:#007eff;box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 0 3px rgba(0,126,255,0.1)}.ng-select.ng-select-disabled>.ng-select-container{background-color:#f9f9f9}.ng-select .ng-has-value .ng-placeholder{display:none}.ng-select .ng-select-container{color:#333;background-color:#fff;border-radius:4px;border:1px solid #ccc;min-height:36px;align-items:center}.ng-select .ng-select-container:hover{box-shadow:0 1px 0 rgba(0,0,0,0.06)}.ng-select .ng-select-container .ng-value-container{align-items:center;padding-left:10px}[dir=\"rtl\"] .ng-select .ng-select-container .ng-value-container{padding-right:10px;padding-left:0}.ng-select .ng-select-container .ng-value-container .ng-placeholder{color:#999}.ng-select.ng-select-single .ng-select-container{height:36px}.ng-select.ng-select-single .ng-select-container .ng-value-container .ng-input{top:5px;left:0;padding-left:10px;padding-right:50px}[dir=\"rtl\"] .ng-select.ng-select-single .ng-select-container .ng-value-container .ng-input{padding-right:10px;padding-left:50px}.ng-select.ng-select-multiple.ng-select-disabled>.ng-select-container .ng-value-container .ng-value{background-color:#f9f9f9;border:1px solid #e6e6e6}.ng-select.ng-select-multiple.ng-select-disabled>.ng-select-container .ng-value-container .ng-value .ng-value-label{padding:0 5px}.ng-select.ng-select-multiple .ng-select-container .ng-value-container{padding-top:5px;padding-left:7px}[dir=\"rtl\"] .ng-select.ng-select-multiple .ng-select-container .ng-value-container{padding-right:7px;padding-left:0}.ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value{font-size:.9em;margin-bottom:5px;background-color:#ebf5ff;border-radius:2px;margin-right:5px}[dir=\"rtl\"] .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value{margin-right:0;margin-left:5px}.ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value.ng-value-disabled{background-color:#f9f9f9}.ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value.ng-value-disabled .ng-value-label{padding-left:5px}[dir=\"rtl\"] .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value.ng-value-disabled .ng-value-label{padding-left:0;padding-right:5px}.ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value .ng-value-label{display:inline-block;padding:1px 5px}.ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value .ng-value-icon{display:inline-block;padding:1px 5px}.ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value .ng-value-icon:hover{background-color:#d1e8ff}.ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value .ng-value-icon.left{border-right:1px solid #b8dbff}[dir=\"rtl\"] .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value .ng-value-icon.left{border-left:1px solid #b8dbff;border-right:none}.ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value .ng-value-icon.right{border-left:1px solid #b8dbff}[dir=\"rtl\"] .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value .ng-value-icon.right{border-left:0;border-right:1px solid #b8dbff}.ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-input{padding:0 0 3px 3px}[dir=\"rtl\"] .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-input{padding:0 3px 3px 0}.ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-placeholder{top:5px;padding-bottom:5px;padding-left:3px}[dir=\"rtl\"] .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-placeholder{padding-right:3px;padding-left:0}.ng-select .ng-clear-wrapper{color:#999}.ng-select .ng-clear-wrapper:hover .ng-clear{color:#D0021B}.ng-select .ng-spinner-zone{padding:5px 5px 0 0}[dir=\"rtl\"] .ng-select .ng-spinner-zone{padding:5px 0 0 5px}.ng-select .ng-arrow-wrapper{width:25px;padding-right:5px}[dir=\"rtl\"] .ng-select .ng-arrow-wrapper{padding-left:5px;padding-right:0}.ng-select .ng-arrow-wrapper:hover .ng-arrow{border-top-color:#666}.ng-select .ng-arrow-wrapper .ng-arrow{border-color:#999 transparent transparent;border-style:solid;border-width:5px 5px 2.5px}.ng-dropdown-panel{background-color:#fff;border:1px solid #ccc;box-shadow:0 1px 0 rgba(0,0,0,0.06);left:0}.ng-dropdown-panel.ng-select-bottom{top:100%;border-bottom-right-radius:4px;border-bottom-left-radius:4px;border-top-color:#e6e6e6;margin-top:-1px}.ng-dropdown-panel.ng-select-bottom .ng-dropdown-panel-items .ng-option:last-child{border-bottom-right-radius:4px;border-bottom-left-radius:4px}.ng-dropdown-panel.ng-select-top{bottom:100%;border-top-right-radius:4px;border-top-left-radius:4px;border-bottom-color:#e6e6e6;margin-bottom:-1px}.ng-dropdown-panel.ng-select-top .ng-dropdown-panel-items .ng-option:first-child{border-top-right-radius:4px;border-top-left-radius:4px}.ng-dropdown-panel .ng-dropdown-header{border-bottom:1px solid #ccc;padding:5px 7px}.ng-dropdown-panel .ng-dropdown-footer{border-top:1px solid #ccc;padding:5px 7px}.ng-dropdown-panel .ng-dropdown-panel-items .ng-optgroup{-webkit-user-select:none;-moz-user-select:none;user-select:none;padding:8px 10px;font-weight:500;color:rgba(0,0,0,0.54);cursor:pointer}.ng-dropdown-panel .ng-dropdown-panel-items .ng-optgroup.ng-option-disabled{cursor:default}.ng-dropdown-panel .ng-dropdown-panel-items .ng-optgroup.ng-option-marked{background-color:#f5faff}.ng-dropdown-panel .ng-dropdown-panel-items .ng-optgroup.ng-option-selected,.ng-dropdown-panel .ng-dropdown-panel-items .ng-optgroup.ng-option-selected.ng-option-marked{background-color:#ebf5ff;font-weight:600}.ng-dropdown-panel .ng-dropdown-panel-items .ng-option{background-color:#fff;color:rgba(0,0,0,0.87);padding:8px 10px}.ng-dropdown-panel .ng-dropdown-panel-items .ng-option.ng-option-selected,.ng-dropdown-panel .ng-dropdown-panel-items .ng-option.ng-option-selected.ng-option-marked{color:#333;background-color:#ebf5ff}.ng-dropdown-panel .ng-dropdown-panel-items .ng-option.ng-option-selected .ng-option-label,.ng-dropdown-panel .ng-dropdown-panel-items .ng-option.ng-option-selected.ng-option-marked .ng-option-label{font-weight:600}.ng-dropdown-panel .ng-dropdown-panel-items .ng-option.ng-option-marked{background-color:#f5faff;color:#333}.ng-dropdown-panel .ng-dropdown-panel-items .ng-option.ng-option-disabled{color:#ccc}.ng-dropdown-panel .ng-dropdown-panel-items .ng-option.ng-option-child{padding-left:22px}[dir=\"rtl\"] .ng-dropdown-panel .ng-dropdown-panel-items .ng-option.ng-option-child{padding-right:22px;padding-left:0}.ng-dropdown-panel .ng-dropdown-panel-items .ng-option .ng-tag-label{font-size:80%;font-weight:400;padding-right:5px}[dir=\"rtl\"] .ng-dropdown-panel .ng-dropdown-panel-items .ng-option .ng-tag-label{padding-left:5px;padding-right:0}[dir=\"rtl\"] .ng-dropdown-panel{direction:rtl;text-align:right}.bg-white {\n  background-color: #ffffff !important;\n}.bg-white .card-header,\n.bg-white .card-footer {\n  background-color: transparent;\n}.border-white {\n  border: 1px solid #ffffff !important;\n}.border-top-white {\n  border-top: 1px solid #ffffff;\n}.border-bottom-white {\n  border-bottom: 1px solid #ffffff;\n}.border-left-white {\n  border-left: 1px solid #ffffff;\n}.border-right-white {\n  border-right: 1px solid #ffffff;\n}.bg-white.badge-glow,\n.border-white.badge-glow,\n.badge-white.badge-glow {\n  box-shadow: 0px 0px 10px #ffffff;\n}.overlay-white {\n  background: #ffffff;\n  /* The Fallback */\n  background: rgba(255, 255, 255, 0.6);\n}input:focus ~ .bg-white {\n  box-shadow: 0 0 0 0.075rem #fff, 0 0 0 0.21rem #ffffff !important;\n}.bg-black {\n  background-color: #000000 !important;\n}.bg-black .card-header,\n.bg-black .card-footer {\n  background-color: transparent;\n}.border-black {\n  border: 1px solid #000000 !important;\n}.border-top-black {\n  border-top: 1px solid #000000;\n}.border-bottom-black {\n  border-bottom: 1px solid #000000;\n}.border-left-black {\n  border-left: 1px solid #000000;\n}.border-right-black {\n  border-right: 1px solid #000000;\n}.bg-black.badge-glow,\n.border-black.badge-glow,\n.badge-black.badge-glow {\n  box-shadow: 0px 0px 10px #000000;\n}.overlay-black {\n  background: #000000;\n  /* The Fallback */\n  background: rgba(0, 0, 0, 0.6);\n}input:focus ~ .bg-black {\n  box-shadow: 0 0 0 0.075rem #fff, 0 0 0 0.21rem #000000 !important;\n}.bg-dark {\n  background-color: #4b4b4b !important;\n}.bg-dark .card-header,\n.bg-dark .card-footer {\n  background-color: transparent;\n}.alert-dark {\n  background: rgba(75, 75, 75, 0.12) !important;\n  color: #4b4b4b !important;\n}.alert-dark .alert-heading {\n  box-shadow: rgba(75, 75, 75, 0.4) 0px 6px 15px -7px;\n}.alert-dark .alert-link {\n  color: #3e3e3e !important;\n}.alert-dark .close {\n  color: #4b4b4b !important;\n}.border-dark {\n  border: 1px solid #4b4b4b !important;\n}.border-top-dark {\n  border-top: 1px solid #4b4b4b;\n}.border-bottom-dark {\n  border-bottom: 1px solid #4b4b4b;\n}.border-left-dark {\n  border-left: 1px solid #4b4b4b;\n}.border-right-dark {\n  border-right: 1px solid #4b4b4b;\n}.bg-dark.badge-glow,\n.border-dark.badge-glow,\n.badge-dark.badge-glow {\n  box-shadow: 0px 0px 10px #4b4b4b;\n}.badge.badge-light-dark {\n  background-color: rgba(75, 75, 75, 0.12);\n  color: #4b4b4b !important;\n}.overlay-dark {\n  background: #4b4b4b;\n  /* The Fallback */\n  background: rgba(75, 75, 75, 0.6);\n}.btn-dark {\n  border-color: #4b4b4b !important;\n  background-color: #4b4b4b !important;\n  color: #fff !important;\n}.btn-dark:focus, .btn-dark:active, .btn-dark.active {\n  color: #fff;\n  background-color: #343434 !important;\n}.btn-dark:hover:not(.disabled):not(:disabled) {\n  box-shadow: 0 8px 25px -8px #4b4b4b;\n}.btn-dark:not(:disabled):not(.disabled):active:focus {\n  box-shadow: none;\n}.btn-flat-dark {\n  background-color: transparent;\n  color: #4b4b4b;\n}.btn-flat-dark:hover {\n  color: #4b4b4b;\n}.btn-flat-dark:hover:not(.disabled):not(:disabled) {\n  background-color: rgba(75, 75, 75, 0.12);\n}.btn-flat-dark:active, .btn-flat-dark.active, .btn-flat-dark:focus {\n  background-color: rgba(75, 75, 75, 0.2);\n  color: #4b4b4b;\n}.btn-flat-dark.dropdown-toggle::after {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234b4b4b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-down'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\");\n}.btn-relief-dark {\n  background-color: #4b4b4b;\n  box-shadow: inset 0 -3px 0 0 rgba(34, 41, 47, 0.2);\n  color: #fff;\n  transition: all 0.2s ease;\n}.btn-relief-dark:hover:not(.disabled):not(:disabled) {\n  background-color: #626262;\n}.btn-relief-dark:active, .btn-relief-dark.active, .btn-relief-dark:focus {\n  background-color: #343434;\n}.btn-relief-dark:hover {\n  color: #fff;\n}.btn-relief-dark:active, .btn-relief-dark.active {\n  outline: none;\n  box-shadow: none;\n  transform: translateY(3px);\n}.btn-outline-dark {\n  border: 1px solid #4b4b4b !important;\n  background-color: transparent;\n  color: #4b4b4b;\n}.btn-outline-dark:hover:not(.disabled):not(:disabled) {\n  background-color: rgba(75, 75, 75, 0.04);\n  color: #4b4b4b;\n}.btn-outline-dark:not(:disabled):not(.disabled):active:focus {\n  box-shadow: none;\n}.btn-outline-dark:not(:disabled):not(.disabled):active, .btn-outline-dark:not(:disabled):not(.disabled).active, .btn-outline-dark:not(:disabled):not(.disabled):focus {\n  background-color: rgba(75, 75, 75, 0.2);\n  color: #4b4b4b;\n}.btn-outline-dark.dropdown-toggle::after {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234b4b4b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-down'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\");\n}.show > .btn-outline-dark.dropdown-toggle {\n  background-color: rgba(75, 75, 75, 0.2);\n  color: #4b4b4b;\n}.btn-outline-dark.waves-effect .waves-ripple,\n.btn-flat-dark.waves-effect .waves-ripple {\n  background: radial-gradient(rgba(75, 75, 75, 0.2) 0, rgba(75, 75, 75, 0.3) 40%, rgba(75, 75, 75, 0.4) 50%, rgba(75, 75, 75, 0.5) 60%, rgba(255, 255, 255, 0) 70%);\n}.bullet.bullet-dark {\n  background-color: #4b4b4b;\n}.modal.modal-dark .modal-header .modal-title {\n  color: #4b4b4b;\n}.modal.modal-dark .modal-header .close {\n  color: #4b4b4b !important;\n}.progress-bar-dark {\n  background-color: rgba(75, 75, 75, 0.12);\n}.progress-bar-dark .progress-bar {\n  background-color: #4b4b4b;\n}.timeline .timeline-point-dark {\n  border-color: #4b4b4b !important;\n}.timeline .timeline-point-dark i,\n.timeline .timeline-point-dark svg {\n  stroke: #4b4b4b !important;\n}.timeline .timeline-point-dark.timeline-point-indicator {\n  background-color: #4b4b4b !important;\n}.timeline .timeline-point-dark.timeline-point-indicator:before {\n  background: rgba(75, 75, 75, 0.12) !important;\n}.divider.divider-dark .divider-text:before, .divider.divider-dark .divider-text:after {\n  border-color: #4b4b4b !important;\n}input:focus ~ .bg-dark {\n  box-shadow: 0 0 0 0.075rem #fff, 0 0 0 0.21rem #4b4b4b !important;\n}.custom-control-dark .custom-control-input:checked ~ .custom-control-label::before,\n.custom-control-dark .custom-control-input:active ~ .custom-control-label::before {\n  border-color: #4b4b4b;\n  background-color: #4b4b4b;\n}.custom-control-dark.custom-checkbox .custom-control-input:checked ~ .custom-control-label::before,\n.custom-control-dark.custom-checkbox .custom-control-input:active ~ .custom-control-label::before,\n.custom-control-dark.custom-checkbox .custom-control-input:focus ~ .custom-control-label::before, .custom-control-dark.custom-radio .custom-control-input:checked ~ .custom-control-label::before,\n.custom-control-dark.custom-radio .custom-control-input:active ~ .custom-control-label::before,\n.custom-control-dark.custom-radio .custom-control-input:focus ~ .custom-control-label::before {\n  box-shadow: 0 2px 4px 0 rgba(75, 75, 75, 0.4) !important;\n}.custom-control-dark .custom-control-input:disabled:checked ~ .custom-control-label::before {\n  background-color: rgba(75, 75, 75, 0.65) !important;\n  border: none;\n  box-shadow: none !important;\n}.custom-control-dark .custom-control-input:focus ~ .custom-control-label::before {\n  border-color: #4b4b4b !important;\n}.custom-switch-dark .custom-control-input:checked ~ .custom-control-label::before {\n  background-color: #4b4b4b !important;\n  color: #fff;\n  transition: all 0.2s ease-out;\n}.select2-dark .select2-container--default .select2-selection--multiple .select2-selection__choice {\n  background: #4b4b4b !important;\n  border-color: #4b4b4b !important;\n}.text-dark.text-darken-1 {\n  color: #343434 !important;\n}.bg-dark.bg-darken-1 {\n  background-color: #343434 !important;\n}.border-dark.border-darken-1 {\n  border: 1px solid #343434 !important;\n}.border-top-dark.border-top-darken-1 {\n  border-top: 1px solid #343434 !important;\n}.border-bottom-dark.border-bottom-darken-1 {\n  border-bottom: 1px solid #343434 !important;\n}.border-left-dark.border-left-darken-1 {\n  border-left: 1px solid #343434 !important;\n}.border-right-dark.border-right-darken-1 {\n  border-right: 1px solid #343434 !important;\n}.overlay-dark.overlay-darken-1 {\n  background: #343434;\n  /* The Fallback */\n  background: rgba(52, 52, 52, 0.6);\n}.text-dark.text-darken-2 {\n  color: #1e1e1e !important;\n}.bg-dark.bg-darken-2 {\n  background-color: #1e1e1e !important;\n}.border-dark.border-darken-2 {\n  border: 1px solid #1e1e1e !important;\n}.border-top-dark.border-top-darken-2 {\n  border-top: 1px solid #1e1e1e !important;\n}.border-bottom-dark.border-bottom-darken-2 {\n  border-bottom: 1px solid #1e1e1e !important;\n}.border-left-dark.border-left-darken-2 {\n  border-left: 1px solid #1e1e1e !important;\n}.border-right-dark.border-right-darken-2 {\n  border-right: 1px solid #1e1e1e !important;\n}.overlay-dark.overlay-darken-2 {\n  background: #1e1e1e;\n  /* The Fallback */\n  background: rgba(30, 30, 30, 0.6);\n}.text-dark.text-darken-3 {\n  color: #626262 !important;\n}.bg-dark.bg-darken-3 {\n  background-color: #626262 !important;\n}.border-dark.border-darken-3 {\n  border: 1px solid #626262 !important;\n}.border-top-dark.border-top-darken-3 {\n  border-top: 1px solid #626262 !important;\n}.border-bottom-dark.border-bottom-darken-3 {\n  border-bottom: 1px solid #626262 !important;\n}.border-left-dark.border-left-darken-3 {\n  border-left: 1px solid #626262 !important;\n}.border-right-dark.border-right-darken-3 {\n  border-right: 1px solid #626262 !important;\n}.overlay-dark.overlay-darken-3 {\n  background: #626262;\n  /* The Fallback */\n  background: rgba(98, 98, 98, 0.6);\n}.bg-light {\n  background-color: #f6f6f6 !important;\n}.bg-light .card-header,\n.bg-light .card-footer {\n  background-color: transparent;\n}.border-light {\n  border: 1px solid #f6f6f6 !important;\n}.border-top-light {\n  border-top: 1px solid #f6f6f6;\n}.border-bottom-light {\n  border-bottom: 1px solid #f6f6f6;\n}.border-left-light {\n  border-left: 1px solid #f6f6f6;\n}.border-right-light {\n  border-right: 1px solid #f6f6f6;\n}.bg-light.badge-glow,\n.border-light.badge-glow,\n.badge-light.badge-glow {\n  box-shadow: 0px 0px 10px #f6f6f6;\n}.overlay-light {\n  background: #f6f6f6;\n  /* The Fallback */\n  background: rgba(246, 246, 246, 0.6);\n}input:focus ~ .bg-light {\n  box-shadow: 0 0 0 0.075rem #fff, 0 0 0 0.21rem #f6f6f6 !important;\n}.text-primary.text-lighten-5 {\n  color: #ed6d9d !important;\n}.bg-primary.bg-lighten-5 {\n  background-color: #ed6d9d !important;\n}.border-primary.border-lighten-5 {\n  border: 1px solid #ed6d9d !important;\n}.border-top-primary.border-top-lighten-5 {\n  border-top: 1px solid #ed6d9d !important;\n}.border-bottom-primary.border-bottom-lighten-5 {\n  border-bottom: 1px solid #ed6d9d !important;\n}.border-left-primary.border-left-lighten-5 {\n  border-left: 1px solid #ed6d9d !important;\n}.border-right-primary.border-right-lighten-5 {\n  border-right: 1px solid #ed6d9d !important;\n}.overlay-primary.overlay-lighten-5 {\n  background: #ed6d9d;\n  /* The Fallback */\n  background: rgba(237, 109, 157, 0.6);\n}.text-primary.text-lighten-4 {\n  color: #ea568e !important;\n}.bg-primary.bg-lighten-4 {\n  background-color: #ea568e !important;\n}.border-primary.border-lighten-4 {\n  border: 1px solid #ea568e !important;\n}.border-top-primary.border-top-lighten-4 {\n  border-top: 1px solid #ea568e !important;\n}.border-bottom-primary.border-bottom-lighten-4 {\n  border-bottom: 1px solid #ea568e !important;\n}.border-left-primary.border-left-lighten-4 {\n  border-left: 1px solid #ea568e !important;\n}.border-right-primary.border-right-lighten-4 {\n  border-right: 1px solid #ea568e !important;\n}.overlay-primary.overlay-lighten-4 {\n  background: #ea568e;\n  /* The Fallback */\n  background: rgba(234, 86, 142, 0.6);\n}.text-primary.text-lighten-3 {\n  color: #e73f7e !important;\n}.bg-primary.bg-lighten-3 {\n  background-color: #e73f7e !important;\n}.border-primary.border-lighten-3 {\n  border: 1px solid #e73f7e !important;\n}.border-top-primary.border-top-lighten-3 {\n  border-top: 1px solid #e73f7e !important;\n}.border-bottom-primary.border-bottom-lighten-3 {\n  border-bottom: 1px solid #e73f7e !important;\n}.border-left-primary.border-left-lighten-3 {\n  border-left: 1px solid #e73f7e !important;\n}.border-right-primary.border-right-lighten-3 {\n  border-right: 1px solid #e73f7e !important;\n}.overlay-primary.overlay-lighten-3 {\n  background: #e73f7e;\n  /* The Fallback */\n  background: rgba(231, 63, 126, 0.6);\n}.text-primary.text-lighten-2 {\n  color: #e4296f !important;\n}.bg-primary.bg-lighten-2 {\n  background-color: #e4296f !important;\n}.border-primary.border-lighten-2 {\n  border: 1px solid #e4296f !important;\n}.border-top-primary.border-top-lighten-2 {\n  border-top: 1px solid #e4296f !important;\n}.border-bottom-primary.border-bottom-lighten-2 {\n  border-bottom: 1px solid #e4296f !important;\n}.border-left-primary.border-left-lighten-2 {\n  border-left: 1px solid #e4296f !important;\n}.border-right-primary.border-right-lighten-2 {\n  border-right: 1px solid #e4296f !important;\n}.overlay-primary.overlay-lighten-2 {\n  background: #e4296f;\n  /* The Fallback */\n  background: rgba(228, 41, 111, 0.6);\n}.text-primary.text-lighten-1 {\n  color: #d91b62 !important;\n}.bg-primary.bg-lighten-1 {\n  background-color: #d91b62 !important;\n}.border-primary.border-lighten-1 {\n  border: 1px solid #d91b62 !important;\n}.border-top-primary.border-top-lighten-1 {\n  border-top: 1px solid #d91b62 !important;\n}.border-bottom-primary.border-bottom-lighten-1 {\n  border-bottom: 1px solid #d91b62 !important;\n}.border-left-primary.border-left-lighten-1 {\n  border-left: 1px solid #d91b62 !important;\n}.border-right-primary.border-right-lighten-1 {\n  border-right: 1px solid #d91b62 !important;\n}.overlay-primary.overlay-lighten-1 {\n  background: #d91b62;\n  /* The Fallback */\n  background: rgba(217, 27, 98, 0.6);\n}.bg-primary {\n  background-color: #C21858 !important;\n}.bg-primary .card-header,\n.bg-primary .card-footer {\n  background-color: transparent;\n}.alert-primary {\n  background: rgba(194, 24, 88, 0.12) !important;\n  color: #C21858 !important;\n}.alert-primary .alert-heading {\n  box-shadow: rgba(194, 24, 88, 0.4) 0px 6px 15px -7px;\n}.alert-primary .alert-link {\n  color: #ab154e !important;\n}.alert-primary .close {\n  color: #C21858 !important;\n}.bg-light-primary {\n  background: rgba(194, 24, 88, 0.12) !important;\n  color: #C21858 !important;\n}.bg-light-primary.fc-h-event, .bg-light-primary.fc-v-event {\n  border-color: rgba(194, 24, 88, 0.1);\n}.bg-light-primary .fc-list-event-dot,\n.bg-light-primary .fc-daygrid-event-dot {\n  border-color: #C21858 !important;\n}.bg-light-primary.fc-list-event:hover td {\n  background: rgba(194, 24, 88, 0.1) !important;\n}.bg-light-primary.fc-list-event .fc-list-event-title {\n  color: #6e6b7b;\n}.avatar.bg-light-primary {\n  color: #C21858 !important;\n}.border-primary {\n  border: 1px solid #C21858 !important;\n}.border-top-primary {\n  border-top: 1px solid #C21858;\n}.border-bottom-primary {\n  border-bottom: 1px solid #C21858;\n}.border-left-primary {\n  border-left: 1px solid #C21858;\n}.border-right-primary {\n  border-right: 1px solid #C21858;\n}.bg-primary.badge-glow,\n.border-primary.badge-glow,\n.badge-primary.badge-glow {\n  box-shadow: 0px 0px 10px #C21858;\n}.badge.badge-light-primary {\n  background-color: rgba(194, 24, 88, 0.12);\n  color: #C21858 !important;\n}.overlay-primary {\n  background: #C21858;\n  /* The Fallback */\n  background: rgba(194, 24, 88, 0.6);\n}.btn-primary {\n  border-color: #C21858 !important;\n  background-color: #C21858 !important;\n  color: #fff !important;\n}.btn-primary:focus, .btn-primary:active, .btn-primary.active {\n  color: #fff;\n  background-color: #ab154e !important;\n}.btn-primary:hover:not(.disabled):not(:disabled) {\n  box-shadow: 0 8px 25px -8px #c21858;\n}.btn-primary:not(:disabled):not(.disabled):active:focus {\n  box-shadow: none;\n}.btn-flat-primary {\n  background-color: transparent;\n  color: #C21858;\n}.btn-flat-primary:hover {\n  color: #C21858;\n}.btn-flat-primary:hover:not(.disabled):not(:disabled) {\n  background-color: rgba(194, 24, 88, 0.12);\n}.btn-flat-primary:active, .btn-flat-primary.active, .btn-flat-primary:focus {\n  background-color: rgba(194, 24, 88, 0.2);\n  color: #C21858;\n}.btn-flat-primary.dropdown-toggle::after {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23C21858' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-down'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\");\n}.btn-relief-primary {\n  background-color: #C21858;\n  box-shadow: inset 0 -3px 0 0 rgba(34, 41, 47, 0.2);\n  color: #fff;\n  transition: all 0.2s ease;\n}.btn-relief-primary:hover:not(.disabled):not(:disabled) {\n  background-color: #d91b62;\n}.btn-relief-primary:active, .btn-relief-primary.active, .btn-relief-primary:focus {\n  background-color: #ab154e;\n}.btn-relief-primary:hover {\n  color: #fff;\n}.btn-relief-primary:active, .btn-relief-primary.active {\n  outline: none;\n  box-shadow: none;\n  transform: translateY(3px);\n}.btn-outline-primary {\n  border: 1px solid #C21858 !important;\n  background-color: transparent;\n  color: #C21858;\n}.btn-outline-primary:hover:not(.disabled):not(:disabled) {\n  background-color: rgba(194, 24, 88, 0.04);\n  color: #C21858;\n}.btn-outline-primary:not(:disabled):not(.disabled):active:focus {\n  box-shadow: none;\n}.btn-outline-primary:not(:disabled):not(.disabled):active, .btn-outline-primary:not(:disabled):not(.disabled).active, .btn-outline-primary:not(:disabled):not(.disabled):focus {\n  background-color: rgba(194, 24, 88, 0.2);\n  color: #C21858;\n}.btn-outline-primary.dropdown-toggle::after {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23C21858' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-down'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\");\n}.show > .btn-outline-primary.dropdown-toggle {\n  background-color: rgba(194, 24, 88, 0.2);\n  color: #C21858;\n}.btn-outline-primary.waves-effect .waves-ripple,\n.btn-flat-primary.waves-effect .waves-ripple {\n  background: radial-gradient(rgba(194, 24, 88, 0.2) 0, rgba(194, 24, 88, 0.3) 40%, rgba(194, 24, 88, 0.4) 50%, rgba(194, 24, 88, 0.5) 60%, rgba(255, 255, 255, 0) 70%);\n}.bullet.bullet-primary {\n  background-color: #C21858;\n}.modal.modal-primary .modal-header .modal-title {\n  color: #C21858;\n}.modal.modal-primary .modal-header .close {\n  color: #C21858 !important;\n}.pagination-primary .page-item.active .page-link {\n  background: #C21858 !important;\n  color: #fff;\n}.pagination-primary .page-item.active .page-link:hover {\n  color: #fff;\n}.pagination-primary .page-item .page-link:hover {\n  color: #C21858;\n}.pagination-primary .page-item.prev-item .page-link:hover, .pagination-primary .page-item.next-item .page-link:hover {\n  background: #C21858;\n  color: #fff;\n}.pagination-primary .page-item.next-item .page-link:active:after, .pagination-primary .page-item.next-item .page-link:hover:after, .pagination-primary .page-item.next .page-link:active:after, .pagination-primary .page-item.next .page-link:hover:after {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23C21858' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-right'%3E%3Cpolyline points='9 18 15 12 9 6'%3E%3C/polyline%3E%3C/svg%3E\") !important;\n}.pagination-primary .page-item.prev-item .page-link:active:before, .pagination-primary .page-item.prev-item .page-link:hover:before, .pagination-primary .page-item.prev .page-link:active:before, .pagination-primary .page-item.prev .page-link:hover:before {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23C21858' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-left'%3E%3Cpolyline points='15 18 9 12 15 6'%3E%3C/polyline%3E%3C/svg%3E\") !important;\n}.nav-pill-primary .nav-item .nav-link.active {\n  color: #fff;\n  background-color: #C21858 !important;\n  border-color: #C21858;\n  box-shadow: 0 4px 18px -4px rgba(194, 24, 88, 0.65);\n}.progress-bar-primary {\n  background-color: rgba(194, 24, 88, 0.12);\n}.progress-bar-primary .progress-bar {\n  background-color: #C21858;\n}.timeline .timeline-point-primary {\n  border-color: #C21858 !important;\n}.timeline .timeline-point-primary i,\n.timeline .timeline-point-primary svg {\n  stroke: #C21858 !important;\n}.timeline .timeline-point-primary.timeline-point-indicator {\n  background-color: #C21858 !important;\n}.timeline .timeline-point-primary.timeline-point-indicator:before {\n  background: rgba(194, 24, 88, 0.12) !important;\n}.divider.divider-primary .divider-text:before, .divider.divider-primary .divider-text:after {\n  border-color: #C21858 !important;\n}input:focus ~ .bg-primary {\n  box-shadow: 0 0 0 0.075rem #fff, 0 0 0 0.21rem #C21858 !important;\n}.custom-control-primary .custom-control-input:checked ~ .custom-control-label::before,\n.custom-control-primary .custom-control-input:active ~ .custom-control-label::before {\n  border-color: #C21858;\n  background-color: #C21858;\n}.custom-control-primary.custom-checkbox .custom-control-input:checked ~ .custom-control-label::before,\n.custom-control-primary.custom-checkbox .custom-control-input:active ~ .custom-control-label::before,\n.custom-control-primary.custom-checkbox .custom-control-input:focus ~ .custom-control-label::before, .custom-control-primary.custom-radio .custom-control-input:checked ~ .custom-control-label::before,\n.custom-control-primary.custom-radio .custom-control-input:active ~ .custom-control-label::before,\n.custom-control-primary.custom-radio .custom-control-input:focus ~ .custom-control-label::before {\n  box-shadow: 0 2px 4px 0 rgba(194, 24, 88, 0.4) !important;\n}.custom-control-primary .custom-control-input:disabled:checked ~ .custom-control-label::before {\n  background-color: rgba(194, 24, 88, 0.65) !important;\n  border: none;\n  box-shadow: none !important;\n}.custom-control-primary .custom-control-input:focus ~ .custom-control-label::before {\n  border-color: #C21858 !important;\n}.custom-switch-primary .custom-control-input:checked ~ .custom-control-label::before {\n  background-color: #C21858 !important;\n  color: #fff;\n  transition: all 0.2s ease-out;\n}.select2-primary .select2-container--default .select2-selection--multiple .select2-selection__choice {\n  background: #C21858 !important;\n  border-color: #C21858 !important;\n}.text-primary.text-darken-1 {\n  color: #ab154e !important;\n}.bg-primary.bg-darken-1 {\n  background-color: #ab154e !important;\n}.border-primary.border-darken-1 {\n  border: 1px solid #ab154e !important;\n}.border-top-primary.border-top-darken-1 {\n  border-top: 1px solid #ab154e !important;\n}.border-bottom-primary.border-bottom-darken-1 {\n  border-bottom: 1px solid #ab154e !important;\n}.border-left-primary.border-left-darken-1 {\n  border-left: 1px solid #ab154e !important;\n}.border-right-primary.border-right-darken-1 {\n  border-right: 1px solid #ab154e !important;\n}.overlay-primary.overlay-darken-1 {\n  background: #ab154e;\n  /* The Fallback */\n  background: rgba(171, 21, 78, 0.6);\n}.text-primary.text-darken-2 {\n  color: #951243 !important;\n}.bg-primary.bg-darken-2 {\n  background-color: #951243 !important;\n}.border-primary.border-darken-2 {\n  border: 1px solid #951243 !important;\n}.border-top-primary.border-top-darken-2 {\n  border-top: 1px solid #951243 !important;\n}.border-bottom-primary.border-bottom-darken-2 {\n  border-bottom: 1px solid #951243 !important;\n}.border-left-primary.border-left-darken-2 {\n  border-left: 1px solid #951243 !important;\n}.border-right-primary.border-right-darken-2 {\n  border-right: 1px solid #951243 !important;\n}.overlay-primary.overlay-darken-2 {\n  background: #951243;\n  /* The Fallback */\n  background: rgba(149, 18, 67, 0.6);\n}.text-primary.text-darken-3 {\n  color: #7e1039 !important;\n}.bg-primary.bg-darken-3 {\n  background-color: #7e1039 !important;\n}.border-primary.border-darken-3 {\n  border: 1px solid #7e1039 !important;\n}.border-top-primary.border-top-darken-3 {\n  border-top: 1px solid #7e1039 !important;\n}.border-bottom-primary.border-bottom-darken-3 {\n  border-bottom: 1px solid #7e1039 !important;\n}.border-left-primary.border-left-darken-3 {\n  border-left: 1px solid #7e1039 !important;\n}.border-right-primary.border-right-darken-3 {\n  border-right: 1px solid #7e1039 !important;\n}.overlay-primary.overlay-darken-3 {\n  background: #7e1039;\n  /* The Fallback */\n  background: rgba(126, 16, 57, 0.6);\n}.text-primary.text-darken-4 {\n  color: #670d2f !important;\n}.bg-primary.bg-darken-4 {\n  background-color: #670d2f !important;\n}.border-primary.border-darken-4 {\n  border: 1px solid #670d2f !important;\n}.border-top-primary.border-top-darken-4 {\n  border-top: 1px solid #670d2f !important;\n}.border-bottom-primary.border-bottom-darken-4 {\n  border-bottom: 1px solid #670d2f !important;\n}.border-left-primary.border-left-darken-4 {\n  border-left: 1px solid #670d2f !important;\n}.border-right-primary.border-right-darken-4 {\n  border-right: 1px solid #670d2f !important;\n}.overlay-primary.overlay-darken-4 {\n  background: #670d2f;\n  /* The Fallback */\n  background: rgba(103, 13, 47, 0.6);\n}.text-primary.text-accent-1 {\n  color: #bdfdff !important;\n}.bg-primary.bg-accent-1 {\n  background-color: #bdfdff !important;\n}.border-primary.border-accent-1 {\n  border: 1px solid #bdfdff !important;\n}.border-top-primary.border-top-accent-1 {\n  border-top: 1px solid #bdfdff !important;\n}.border-bottom-primary.border-bottom-accent-1 {\n  border-bottom: 1px solid #bdfdff !important;\n}.border-left-primary.border-left-accent-1 {\n  border-left: 1px solid #bdfdff !important;\n}.border-right-primary.border-right-accent-1 {\n  border-right: 1px solid #bdfdff !important;\n}.overlay-primary.overlay-accent-1 {\n  background: #bdfdff;\n  /* The Fallback */\n  background: rgba(189, 253, 255, 0.6);\n}.text-primary.text-accent-2 {\n  color: #8afbff !important;\n}.bg-primary.bg-accent-2 {\n  background-color: #8afbff !important;\n}.border-primary.border-accent-2 {\n  border: 1px solid #8afbff !important;\n}.border-top-primary.border-top-accent-2 {\n  border-top: 1px solid #8afbff !important;\n}.border-bottom-primary.border-bottom-accent-2 {\n  border-bottom: 1px solid #8afbff !important;\n}.border-left-primary.border-left-accent-2 {\n  border-left: 1px solid #8afbff !important;\n}.border-right-primary.border-right-accent-2 {\n  border-right: 1px solid #8afbff !important;\n}.overlay-primary.overlay-accent-2 {\n  background: #8afbff;\n  /* The Fallback */\n  background: rgba(138, 251, 255, 0.6);\n}.text-primary.text-accent-3 {\n  color: #57faff !important;\n}.bg-primary.bg-accent-3 {\n  background-color: #57faff !important;\n}.border-primary.border-accent-3 {\n  border: 1px solid #57faff !important;\n}.border-top-primary.border-top-accent-3 {\n  border-top: 1px solid #57faff !important;\n}.border-bottom-primary.border-bottom-accent-3 {\n  border-bottom: 1px solid #57faff !important;\n}.border-left-primary.border-left-accent-3 {\n  border-left: 1px solid #57faff !important;\n}.border-right-primary.border-right-accent-3 {\n  border-right: 1px solid #57faff !important;\n}.overlay-primary.overlay-accent-3 {\n  background: #57faff;\n  /* The Fallback */\n  background: rgba(87, 250, 255, 0.6);\n}.text-primary.text-accent-4 {\n  color: #3df9ff !important;\n}.bg-primary.bg-accent-4 {\n  background-color: #3df9ff !important;\n}.border-primary.border-accent-4 {\n  border: 1px solid #3df9ff !important;\n}.border-top-primary.border-top-accent-4 {\n  border-top: 1px solid #3df9ff !important;\n}.border-bottom-primary.border-bottom-accent-4 {\n  border-bottom: 1px solid #3df9ff !important;\n}.border-left-primary.border-left-accent-4 {\n  border-left: 1px solid #3df9ff !important;\n}.border-right-primary.border-right-accent-4 {\n  border-right: 1px solid #3df9ff !important;\n}.overlay-primary.overlay-accent-4 {\n  background: #3df9ff;\n  /* The Fallback */\n  background: rgba(61, 249, 255, 0.6);\n}.text-secondary.text-lighten-5 {\n  color: #c4c6c8 !important;\n}.bg-secondary.bg-lighten-5 {\n  background-color: #c4c6c8 !important;\n}.border-secondary.border-lighten-5 {\n  border: 1px solid #c4c6c8 !important;\n}.border-top-secondary.border-top-lighten-5 {\n  border-top: 1px solid #c4c6c8 !important;\n}.border-bottom-secondary.border-bottom-lighten-5 {\n  border-bottom: 1px solid #c4c6c8 !important;\n}.border-left-secondary.border-left-lighten-5 {\n  border-left: 1px solid #c4c6c8 !important;\n}.border-right-secondary.border-right-lighten-5 {\n  border-right: 1px solid #c4c6c8 !important;\n}.overlay-secondary.overlay-lighten-5 {\n  background: #c4c6c8;\n  /* The Fallback */\n  background: rgba(196, 198, 200, 0.6);\n}.text-secondary.text-lighten-4 {\n  color: #b7b9bc !important;\n}.bg-secondary.bg-lighten-4 {\n  background-color: #b7b9bc !important;\n}.border-secondary.border-lighten-4 {\n  border: 1px solid #b7b9bc !important;\n}.border-top-secondary.border-top-lighten-4 {\n  border-top: 1px solid #b7b9bc !important;\n}.border-bottom-secondary.border-bottom-lighten-4 {\n  border-bottom: 1px solid #b7b9bc !important;\n}.border-left-secondary.border-left-lighten-4 {\n  border-left: 1px solid #b7b9bc !important;\n}.border-right-secondary.border-right-lighten-4 {\n  border-right: 1px solid #b7b9bc !important;\n}.overlay-secondary.overlay-lighten-4 {\n  background: #b7b9bc;\n  /* The Fallback */\n  background: rgba(183, 185, 188, 0.6);\n}.text-secondary.text-lighten-3 {\n  color: #aaacb0 !important;\n}.bg-secondary.bg-lighten-3 {\n  background-color: #aaacb0 !important;\n}.border-secondary.border-lighten-3 {\n  border: 1px solid #aaacb0 !important;\n}.border-top-secondary.border-top-lighten-3 {\n  border-top: 1px solid #aaacb0 !important;\n}.border-bottom-secondary.border-bottom-lighten-3 {\n  border-bottom: 1px solid #aaacb0 !important;\n}.border-left-secondary.border-left-lighten-3 {\n  border-left: 1px solid #aaacb0 !important;\n}.border-right-secondary.border-right-lighten-3 {\n  border-right: 1px solid #aaacb0 !important;\n}.overlay-secondary.overlay-lighten-3 {\n  background: #aaacb0;\n  /* The Fallback */\n  background: rgba(170, 172, 176, 0.6);\n}.text-secondary.text-lighten-2 {\n  color: #9ca0a4 !important;\n}.bg-secondary.bg-lighten-2 {\n  background-color: #9ca0a4 !important;\n}.border-secondary.border-lighten-2 {\n  border: 1px solid #9ca0a4 !important;\n}.border-top-secondary.border-top-lighten-2 {\n  border-top: 1px solid #9ca0a4 !important;\n}.border-bottom-secondary.border-bottom-lighten-2 {\n  border-bottom: 1px solid #9ca0a4 !important;\n}.border-left-secondary.border-left-lighten-2 {\n  border-left: 1px solid #9ca0a4 !important;\n}.border-right-secondary.border-right-lighten-2 {\n  border-right: 1px solid #9ca0a4 !important;\n}.overlay-secondary.overlay-lighten-2 {\n  background: #9ca0a4;\n  /* The Fallback */\n  background: rgba(156, 160, 164, 0.6);\n}.text-secondary.text-lighten-1 {\n  color: #8f9397 !important;\n}.bg-secondary.bg-lighten-1 {\n  background-color: #8f9397 !important;\n}.border-secondary.border-lighten-1 {\n  border: 1px solid #8f9397 !important;\n}.border-top-secondary.border-top-lighten-1 {\n  border-top: 1px solid #8f9397 !important;\n}.border-bottom-secondary.border-bottom-lighten-1 {\n  border-bottom: 1px solid #8f9397 !important;\n}.border-left-secondary.border-left-lighten-1 {\n  border-left: 1px solid #8f9397 !important;\n}.border-right-secondary.border-right-lighten-1 {\n  border-right: 1px solid #8f9397 !important;\n}.overlay-secondary.overlay-lighten-1 {\n  background: #8f9397;\n  /* The Fallback */\n  background: rgba(143, 147, 151, 0.6);\n}.bg-secondary {\n  background-color: #82868b !important;\n}.bg-secondary .card-header,\n.bg-secondary .card-footer {\n  background-color: transparent;\n}.alert-secondary {\n  background: rgba(130, 134, 139, 0.12) !important;\n  color: #82868b !important;\n}.alert-secondary .alert-heading {\n  box-shadow: rgba(130, 134, 139, 0.4) 0px 6px 15px -7px;\n}.alert-secondary .alert-link {\n  color: #75797e !important;\n}.alert-secondary .close {\n  color: #82868b !important;\n}.bg-light-secondary {\n  background: rgba(130, 134, 139, 0.12) !important;\n  color: #82868b !important;\n}.bg-light-secondary.fc-h-event, .bg-light-secondary.fc-v-event {\n  border-color: rgba(130, 134, 139, 0.1);\n}.bg-light-secondary .fc-list-event-dot,\n.bg-light-secondary .fc-daygrid-event-dot {\n  border-color: #82868b !important;\n}.bg-light-secondary.fc-list-event:hover td {\n  background: rgba(130, 134, 139, 0.1) !important;\n}.bg-light-secondary.fc-list-event .fc-list-event-title {\n  color: #6e6b7b;\n}.avatar.bg-light-secondary {\n  color: #82868b !important;\n}.border-secondary {\n  border: 1px solid #82868b !important;\n}.border-top-secondary {\n  border-top: 1px solid #82868b;\n}.border-bottom-secondary {\n  border-bottom: 1px solid #82868b;\n}.border-left-secondary {\n  border-left: 1px solid #82868b;\n}.border-right-secondary {\n  border-right: 1px solid #82868b;\n}.bg-secondary.badge-glow,\n.border-secondary.badge-glow,\n.badge-secondary.badge-glow {\n  box-shadow: 0px 0px 10px #82868b;\n}.badge.badge-light-secondary {\n  background-color: rgba(130, 134, 139, 0.12);\n  color: #82868b !important;\n}.overlay-secondary {\n  background: #82868b;\n  /* The Fallback */\n  background: rgba(130, 134, 139, 0.6);\n}.btn-secondary {\n  border-color: #82868b !important;\n  background-color: #82868b !important;\n  color: #fff !important;\n}.btn-secondary:focus, .btn-secondary:active, .btn-secondary.active {\n  color: #fff;\n  background-color: #75797e !important;\n}.btn-secondary:hover:not(.disabled):not(:disabled) {\n  box-shadow: 0 8px 25px -8px #82868b;\n}.btn-secondary:not(:disabled):not(.disabled):active:focus {\n  box-shadow: none;\n}.btn-flat-secondary {\n  background-color: transparent;\n  color: #82868b;\n}.btn-flat-secondary:hover {\n  color: #82868b;\n}.btn-flat-secondary:hover:not(.disabled):not(:disabled) {\n  background-color: rgba(130, 134, 139, 0.12);\n}.btn-flat-secondary:active, .btn-flat-secondary.active, .btn-flat-secondary:focus {\n  background-color: rgba(130, 134, 139, 0.2);\n  color: #82868b;\n}.btn-flat-secondary.dropdown-toggle::after {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2382868b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-down'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\");\n}.btn-relief-secondary {\n  background-color: #82868b;\n  box-shadow: inset 0 -3px 0 0 rgba(34, 41, 47, 0.2);\n  color: #fff;\n  transition: all 0.2s ease;\n}.btn-relief-secondary:hover:not(.disabled):not(:disabled) {\n  background-color: #8f9397;\n}.btn-relief-secondary:active, .btn-relief-secondary.active, .btn-relief-secondary:focus {\n  background-color: #75797e;\n}.btn-relief-secondary:hover {\n  color: #fff;\n}.btn-relief-secondary:active, .btn-relief-secondary.active {\n  outline: none;\n  box-shadow: none;\n  transform: translateY(3px);\n}.btn-outline-secondary {\n  border: 1px solid #82868b !important;\n  background-color: transparent;\n  color: #82868b;\n}.btn-outline-secondary:hover:not(.disabled):not(:disabled) {\n  background-color: rgba(130, 134, 139, 0.04);\n  color: #82868b;\n}.btn-outline-secondary:not(:disabled):not(.disabled):active:focus {\n  box-shadow: none;\n}.btn-outline-secondary:not(:disabled):not(.disabled):active, .btn-outline-secondary:not(:disabled):not(.disabled).active, .btn-outline-secondary:not(:disabled):not(.disabled):focus {\n  background-color: rgba(130, 134, 139, 0.2);\n  color: #82868b;\n}.btn-outline-secondary.dropdown-toggle::after {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2382868b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-down'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\");\n}.show > .btn-outline-secondary.dropdown-toggle {\n  background-color: rgba(130, 134, 139, 0.2);\n  color: #82868b;\n}.btn-outline-secondary.waves-effect .waves-ripple,\n.btn-flat-secondary.waves-effect .waves-ripple {\n  background: radial-gradient(rgba(130, 134, 139, 0.2) 0, rgba(130, 134, 139, 0.3) 40%, rgba(130, 134, 139, 0.4) 50%, rgba(130, 134, 139, 0.5) 60%, rgba(255, 255, 255, 0) 70%);\n}.bullet.bullet-secondary {\n  background-color: #82868b;\n}.modal.modal-secondary .modal-header .modal-title {\n  color: #82868b;\n}.modal.modal-secondary .modal-header .close {\n  color: #82868b !important;\n}.pagination-secondary .page-item.active .page-link {\n  background: #82868b !important;\n  color: #fff;\n}.pagination-secondary .page-item.active .page-link:hover {\n  color: #fff;\n}.pagination-secondary .page-item .page-link:hover {\n  color: #82868b;\n}.pagination-secondary .page-item.prev-item .page-link:hover, .pagination-secondary .page-item.next-item .page-link:hover {\n  background: #82868b;\n  color: #fff;\n}.pagination-secondary .page-item.next-item .page-link:active:after, .pagination-secondary .page-item.next-item .page-link:hover:after, .pagination-secondary .page-item.next .page-link:active:after, .pagination-secondary .page-item.next .page-link:hover:after {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2382868b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-right'%3E%3Cpolyline points='9 18 15 12 9 6'%3E%3C/polyline%3E%3C/svg%3E\") !important;\n}.pagination-secondary .page-item.prev-item .page-link:active:before, .pagination-secondary .page-item.prev-item .page-link:hover:before, .pagination-secondary .page-item.prev .page-link:active:before, .pagination-secondary .page-item.prev .page-link:hover:before {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2382868b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-left'%3E%3Cpolyline points='15 18 9 12 15 6'%3E%3C/polyline%3E%3C/svg%3E\") !important;\n}.nav-pill-secondary .nav-item .nav-link.active {\n  color: #fff;\n  background-color: #82868b !important;\n  border-color: #82868b;\n  box-shadow: 0 4px 18px -4px rgba(130, 134, 139, 0.65);\n}.progress-bar-secondary {\n  background-color: rgba(130, 134, 139, 0.12);\n}.progress-bar-secondary .progress-bar {\n  background-color: #82868b;\n}.timeline .timeline-point-secondary {\n  border-color: #82868b !important;\n}.timeline .timeline-point-secondary i,\n.timeline .timeline-point-secondary svg {\n  stroke: #82868b !important;\n}.timeline .timeline-point-secondary.timeline-point-indicator {\n  background-color: #82868b !important;\n}.timeline .timeline-point-secondary.timeline-point-indicator:before {\n  background: rgba(130, 134, 139, 0.12) !important;\n}.divider.divider-secondary .divider-text:before, .divider.divider-secondary .divider-text:after {\n  border-color: #82868b !important;\n}input:focus ~ .bg-secondary {\n  box-shadow: 0 0 0 0.075rem #fff, 0 0 0 0.21rem #82868b !important;\n}.custom-control-secondary .custom-control-input:checked ~ .custom-control-label::before,\n.custom-control-secondary .custom-control-input:active ~ .custom-control-label::before {\n  border-color: #82868b;\n  background-color: #82868b;\n}.custom-control-secondary.custom-checkbox .custom-control-input:checked ~ .custom-control-label::before,\n.custom-control-secondary.custom-checkbox .custom-control-input:active ~ .custom-control-label::before,\n.custom-control-secondary.custom-checkbox .custom-control-input:focus ~ .custom-control-label::before, .custom-control-secondary.custom-radio .custom-control-input:checked ~ .custom-control-label::before,\n.custom-control-secondary.custom-radio .custom-control-input:active ~ .custom-control-label::before,\n.custom-control-secondary.custom-radio .custom-control-input:focus ~ .custom-control-label::before {\n  box-shadow: 0 2px 4px 0 rgba(130, 134, 139, 0.4) !important;\n}.custom-control-secondary .custom-control-input:disabled:checked ~ .custom-control-label::before {\n  background-color: rgba(130, 134, 139, 0.65) !important;\n  border: none;\n  box-shadow: none !important;\n}.custom-control-secondary .custom-control-input:focus ~ .custom-control-label::before {\n  border-color: #82868b !important;\n}.custom-switch-secondary .custom-control-input:checked ~ .custom-control-label::before {\n  background-color: #82868b !important;\n  color: #fff;\n  transition: all 0.2s ease-out;\n}.select2-secondary .select2-container--default .select2-selection--multiple .select2-selection__choice {\n  background: #82868b !important;\n  border-color: #82868b !important;\n}.text-secondary.text-darken-1 {\n  color: #75797e !important;\n}.bg-secondary.bg-darken-1 {\n  background-color: #75797e !important;\n}.border-secondary.border-darken-1 {\n  border: 1px solid #75797e !important;\n}.border-top-secondary.border-top-darken-1 {\n  border-top: 1px solid #75797e !important;\n}.border-bottom-secondary.border-bottom-darken-1 {\n  border-bottom: 1px solid #75797e !important;\n}.border-left-secondary.border-left-darken-1 {\n  border-left: 1px solid #75797e !important;\n}.border-right-secondary.border-right-darken-1 {\n  border-right: 1px solid #75797e !important;\n}.overlay-secondary.overlay-darken-1 {\n  background: #75797e;\n  /* The Fallback */\n  background: rgba(117, 121, 126, 0.6);\n}.text-secondary.text-darken-2 {\n  color: #696d71 !important;\n}.bg-secondary.bg-darken-2 {\n  background-color: #696d71 !important;\n}.border-secondary.border-darken-2 {\n  border: 1px solid #696d71 !important;\n}.border-top-secondary.border-top-darken-2 {\n  border-top: 1px solid #696d71 !important;\n}.border-bottom-secondary.border-bottom-darken-2 {\n  border-bottom: 1px solid #696d71 !important;\n}.border-left-secondary.border-left-darken-2 {\n  border-left: 1px solid #696d71 !important;\n}.border-right-secondary.border-right-darken-2 {\n  border-right: 1px solid #696d71 !important;\n}.overlay-secondary.overlay-darken-2 {\n  background: #696d71;\n  /* The Fallback */\n  background: rgba(105, 109, 113, 0.6);\n}.text-secondary.text-darken-3 {\n  color: #5d6064 !important;\n}.bg-secondary.bg-darken-3 {\n  background-color: #5d6064 !important;\n}.border-secondary.border-darken-3 {\n  border: 1px solid #5d6064 !important;\n}.border-top-secondary.border-top-darken-3 {\n  border-top: 1px solid #5d6064 !important;\n}.border-bottom-secondary.border-bottom-darken-3 {\n  border-bottom: 1px solid #5d6064 !important;\n}.border-left-secondary.border-left-darken-3 {\n  border-left: 1px solid #5d6064 !important;\n}.border-right-secondary.border-right-darken-3 {\n  border-right: 1px solid #5d6064 !important;\n}.overlay-secondary.overlay-darken-3 {\n  background: #5d6064;\n  /* The Fallback */\n  background: rgba(93, 96, 100, 0.6);\n}.text-secondary.text-darken-4 {\n  color: #505357 !important;\n}.bg-secondary.bg-darken-4 {\n  background-color: #505357 !important;\n}.border-secondary.border-darken-4 {\n  border: 1px solid #505357 !important;\n}.border-top-secondary.border-top-darken-4 {\n  border-top: 1px solid #505357 !important;\n}.border-bottom-secondary.border-bottom-darken-4 {\n  border-bottom: 1px solid #505357 !important;\n}.border-left-secondary.border-left-darken-4 {\n  border-left: 1px solid #505357 !important;\n}.border-right-secondary.border-right-darken-4 {\n  border-right: 1px solid #505357 !important;\n}.overlay-secondary.overlay-darken-4 {\n  background: #505357;\n  /* The Fallback */\n  background: rgba(80, 83, 87, 0.6);\n}.text-success.text-lighten-5 {\n  color: #88e7b2 !important;\n}.bg-success.bg-lighten-5 {\n  background-color: #88e7b2 !important;\n}.border-success.border-lighten-5 {\n  border: 1px solid #88e7b2 !important;\n}.border-top-success.border-top-lighten-5 {\n  border-top: 1px solid #88e7b2 !important;\n}.border-bottom-success.border-bottom-lighten-5 {\n  border-bottom: 1px solid #88e7b2 !important;\n}.border-left-success.border-left-lighten-5 {\n  border-left: 1px solid #88e7b2 !important;\n}.border-right-success.border-right-lighten-5 {\n  border-right: 1px solid #88e7b2 !important;\n}.overlay-success.overlay-lighten-5 {\n  background: #88e7b2;\n  /* The Fallback */\n  background: rgba(136, 231, 178, 0.6);\n}.text-success.text-lighten-4 {\n  color: #72e3a4 !important;\n}.bg-success.bg-lighten-4 {\n  background-color: #72e3a4 !important;\n}.border-success.border-lighten-4 {\n  border: 1px solid #72e3a4 !important;\n}.border-top-success.border-top-lighten-4 {\n  border-top: 1px solid #72e3a4 !important;\n}.border-bottom-success.border-bottom-lighten-4 {\n  border-bottom: 1px solid #72e3a4 !important;\n}.border-left-success.border-left-lighten-4 {\n  border-left: 1px solid #72e3a4 !important;\n}.border-right-success.border-right-lighten-4 {\n  border-right: 1px solid #72e3a4 !important;\n}.overlay-success.overlay-lighten-4 {\n  background: #72e3a4;\n  /* The Fallback */\n  background: rgba(114, 227, 164, 0.6);\n}.text-success.text-lighten-3 {\n  color: #5dde97 !important;\n}.bg-success.bg-lighten-3 {\n  background-color: #5dde97 !important;\n}.border-success.border-lighten-3 {\n  border: 1px solid #5dde97 !important;\n}.border-top-success.border-top-lighten-3 {\n  border-top: 1px solid #5dde97 !important;\n}.border-bottom-success.border-bottom-lighten-3 {\n  border-bottom: 1px solid #5dde97 !important;\n}.border-left-success.border-left-lighten-3 {\n  border-left: 1px solid #5dde97 !important;\n}.border-right-success.border-right-lighten-3 {\n  border-right: 1px solid #5dde97 !important;\n}.overlay-success.overlay-lighten-3 {\n  background: #5dde97;\n  /* The Fallback */\n  background: rgba(93, 222, 151, 0.6);\n}.text-success.text-lighten-2 {\n  color: #48da89 !important;\n}.bg-success.bg-lighten-2 {\n  background-color: #48da89 !important;\n}.border-success.border-lighten-2 {\n  border: 1px solid #48da89 !important;\n}.border-top-success.border-top-lighten-2 {\n  border-top: 1px solid #48da89 !important;\n}.border-bottom-success.border-bottom-lighten-2 {\n  border-bottom: 1px solid #48da89 !important;\n}.border-left-success.border-left-lighten-2 {\n  border-left: 1px solid #48da89 !important;\n}.border-right-success.border-right-lighten-2 {\n  border-right: 1px solid #48da89 !important;\n}.overlay-success.overlay-lighten-2 {\n  background: #48da89;\n  /* The Fallback */\n  background: rgba(72, 218, 137, 0.6);\n}.text-success.text-lighten-1 {\n  color: #33d67c !important;\n}.bg-success.bg-lighten-1 {\n  background-color: #33d67c !important;\n}.border-success.border-lighten-1 {\n  border: 1px solid #33d67c !important;\n}.border-top-success.border-top-lighten-1 {\n  border-top: 1px solid #33d67c !important;\n}.border-bottom-success.border-bottom-lighten-1 {\n  border-bottom: 1px solid #33d67c !important;\n}.border-left-success.border-left-lighten-1 {\n  border-left: 1px solid #33d67c !important;\n}.border-right-success.border-right-lighten-1 {\n  border-right: 1px solid #33d67c !important;\n}.overlay-success.overlay-lighten-1 {\n  background: #33d67c;\n  /* The Fallback */\n  background: rgba(51, 214, 124, 0.6);\n}.bg-success {\n  background-color: #28c76f !important;\n}.bg-success .card-header,\n.bg-success .card-footer {\n  background-color: transparent;\n}.alert-success {\n  background: rgba(40, 199, 111, 0.12) !important;\n  color: #28c76f !important;\n}.alert-success .alert-heading {\n  box-shadow: rgba(40, 199, 111, 0.4) 0px 6px 15px -7px;\n}.alert-success .alert-link {\n  color: #24b263 !important;\n}.alert-success .close {\n  color: #28c76f !important;\n}.bg-light-success {\n  background: rgba(40, 199, 111, 0.12) !important;\n  color: #28c76f !important;\n}.bg-light-success.fc-h-event, .bg-light-success.fc-v-event {\n  border-color: rgba(40, 199, 111, 0.1);\n}.bg-light-success .fc-list-event-dot,\n.bg-light-success .fc-daygrid-event-dot {\n  border-color: #28c76f !important;\n}.bg-light-success.fc-list-event:hover td {\n  background: rgba(40, 199, 111, 0.1) !important;\n}.bg-light-success.fc-list-event .fc-list-event-title {\n  color: #6e6b7b;\n}.avatar.bg-light-success {\n  color: #28c76f !important;\n}.border-success {\n  border: 1px solid #28c76f !important;\n}.border-top-success {\n  border-top: 1px solid #28c76f;\n}.border-bottom-success {\n  border-bottom: 1px solid #28c76f;\n}.border-left-success {\n  border-left: 1px solid #28c76f;\n}.border-right-success {\n  border-right: 1px solid #28c76f;\n}.bg-success.badge-glow,\n.border-success.badge-glow,\n.badge-success.badge-glow {\n  box-shadow: 0px 0px 10px #28c76f;\n}.badge.badge-light-success {\n  background-color: rgba(40, 199, 111, 0.12);\n  color: #28c76f !important;\n}.overlay-success {\n  background: #28c76f;\n  /* The Fallback */\n  background: rgba(40, 199, 111, 0.6);\n}.btn-success {\n  border-color: #28c76f !important;\n  background-color: #28c76f !important;\n  color: #fff !important;\n}.btn-success:focus, .btn-success:active, .btn-success.active {\n  color: #fff;\n  background-color: #24b263 !important;\n}.btn-success:hover:not(.disabled):not(:disabled) {\n  box-shadow: 0 8px 25px -8px #28c76f;\n}.btn-success:not(:disabled):not(.disabled):active:focus {\n  box-shadow: none;\n}.btn-flat-success {\n  background-color: transparent;\n  color: #28c76f;\n}.btn-flat-success:hover {\n  color: #28c76f;\n}.btn-flat-success:hover:not(.disabled):not(:disabled) {\n  background-color: rgba(40, 199, 111, 0.12);\n}.btn-flat-success:active, .btn-flat-success.active, .btn-flat-success:focus {\n  background-color: rgba(40, 199, 111, 0.2);\n  color: #28c76f;\n}.btn-flat-success.dropdown-toggle::after {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2328c76f' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-down'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\");\n}.btn-relief-success {\n  background-color: #28c76f;\n  box-shadow: inset 0 -3px 0 0 rgba(34, 41, 47, 0.2);\n  color: #fff;\n  transition: all 0.2s ease;\n}.btn-relief-success:hover:not(.disabled):not(:disabled) {\n  background-color: #33d67c;\n}.btn-relief-success:active, .btn-relief-success.active, .btn-relief-success:focus {\n  background-color: #24b263;\n}.btn-relief-success:hover {\n  color: #fff;\n}.btn-relief-success:active, .btn-relief-success.active {\n  outline: none;\n  box-shadow: none;\n  transform: translateY(3px);\n}.btn-outline-success {\n  border: 1px solid #28c76f !important;\n  background-color: transparent;\n  color: #28c76f;\n}.btn-outline-success:hover:not(.disabled):not(:disabled) {\n  background-color: rgba(40, 199, 111, 0.04);\n  color: #28c76f;\n}.btn-outline-success:not(:disabled):not(.disabled):active:focus {\n  box-shadow: none;\n}.btn-outline-success:not(:disabled):not(.disabled):active, .btn-outline-success:not(:disabled):not(.disabled).active, .btn-outline-success:not(:disabled):not(.disabled):focus {\n  background-color: rgba(40, 199, 111, 0.2);\n  color: #28c76f;\n}.btn-outline-success.dropdown-toggle::after {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2328c76f' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-down'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\");\n}.show > .btn-outline-success.dropdown-toggle {\n  background-color: rgba(40, 199, 111, 0.2);\n  color: #28c76f;\n}.btn-outline-success.waves-effect .waves-ripple,\n.btn-flat-success.waves-effect .waves-ripple {\n  background: radial-gradient(rgba(40, 199, 111, 0.2) 0, rgba(40, 199, 111, 0.3) 40%, rgba(40, 199, 111, 0.4) 50%, rgba(40, 199, 111, 0.5) 60%, rgba(255, 255, 255, 0) 70%);\n}.bullet.bullet-success {\n  background-color: #28c76f;\n}.modal.modal-success .modal-header .modal-title {\n  color: #28c76f;\n}.modal.modal-success .modal-header .close {\n  color: #28c76f !important;\n}.pagination-success .page-item.active .page-link {\n  background: #28c76f !important;\n  color: #fff;\n}.pagination-success .page-item.active .page-link:hover {\n  color: #fff;\n}.pagination-success .page-item .page-link:hover {\n  color: #28c76f;\n}.pagination-success .page-item.prev-item .page-link:hover, .pagination-success .page-item.next-item .page-link:hover {\n  background: #28c76f;\n  color: #fff;\n}.pagination-success .page-item.next-item .page-link:active:after, .pagination-success .page-item.next-item .page-link:hover:after, .pagination-success .page-item.next .page-link:active:after, .pagination-success .page-item.next .page-link:hover:after {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2328c76f' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-right'%3E%3Cpolyline points='9 18 15 12 9 6'%3E%3C/polyline%3E%3C/svg%3E\") !important;\n}.pagination-success .page-item.prev-item .page-link:active:before, .pagination-success .page-item.prev-item .page-link:hover:before, .pagination-success .page-item.prev .page-link:active:before, .pagination-success .page-item.prev .page-link:hover:before {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2328c76f' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-left'%3E%3Cpolyline points='15 18 9 12 15 6'%3E%3C/polyline%3E%3C/svg%3E\") !important;\n}.nav-pill-success .nav-item .nav-link.active {\n  color: #fff;\n  background-color: #28c76f !important;\n  border-color: #28c76f;\n  box-shadow: 0 4px 18px -4px rgba(40, 199, 111, 0.65);\n}.progress-bar-success {\n  background-color: rgba(40, 199, 111, 0.12);\n}.progress-bar-success .progress-bar {\n  background-color: #28c76f;\n}.timeline .timeline-point-success {\n  border-color: #28c76f !important;\n}.timeline .timeline-point-success i,\n.timeline .timeline-point-success svg {\n  stroke: #28c76f !important;\n}.timeline .timeline-point-success.timeline-point-indicator {\n  background-color: #28c76f !important;\n}.timeline .timeline-point-success.timeline-point-indicator:before {\n  background: rgba(40, 199, 111, 0.12) !important;\n}.divider.divider-success .divider-text:before, .divider.divider-success .divider-text:after {\n  border-color: #28c76f !important;\n}input:focus ~ .bg-success {\n  box-shadow: 0 0 0 0.075rem #fff, 0 0 0 0.21rem #28c76f !important;\n}.custom-control-success .custom-control-input:checked ~ .custom-control-label::before,\n.custom-control-success .custom-control-input:active ~ .custom-control-label::before {\n  border-color: #28c76f;\n  background-color: #28c76f;\n}.custom-control-success.custom-checkbox .custom-control-input:checked ~ .custom-control-label::before,\n.custom-control-success.custom-checkbox .custom-control-input:active ~ .custom-control-label::before,\n.custom-control-success.custom-checkbox .custom-control-input:focus ~ .custom-control-label::before, .custom-control-success.custom-radio .custom-control-input:checked ~ .custom-control-label::before,\n.custom-control-success.custom-radio .custom-control-input:active ~ .custom-control-label::before,\n.custom-control-success.custom-radio .custom-control-input:focus ~ .custom-control-label::before {\n  box-shadow: 0 2px 4px 0 rgba(40, 199, 111, 0.4) !important;\n}.custom-control-success .custom-control-input:disabled:checked ~ .custom-control-label::before {\n  background-color: rgba(40, 199, 111, 0.65) !important;\n  border: none;\n  box-shadow: none !important;\n}.custom-control-success .custom-control-input:focus ~ .custom-control-label::before {\n  border-color: #28c76f !important;\n}.custom-switch-success .custom-control-input:checked ~ .custom-control-label::before {\n  background-color: #28c76f !important;\n  color: #fff;\n  transition: all 0.2s ease-out;\n}.select2-success .select2-container--default .select2-selection--multiple .select2-selection__choice {\n  background: #28c76f !important;\n  border-color: #28c76f !important;\n}.text-success.text-darken-1 {\n  color: #24b263 !important;\n}.bg-success.bg-darken-1 {\n  background-color: #24b263 !important;\n}.border-success.border-darken-1 {\n  border: 1px solid #24b263 !important;\n}.border-top-success.border-top-darken-1 {\n  border-top: 1px solid #24b263 !important;\n}.border-bottom-success.border-bottom-darken-1 {\n  border-bottom: 1px solid #24b263 !important;\n}.border-left-success.border-left-darken-1 {\n  border-left: 1px solid #24b263 !important;\n}.border-right-success.border-right-darken-1 {\n  border-right: 1px solid #24b263 !important;\n}.overlay-success.overlay-darken-1 {\n  background: #24b263;\n  /* The Fallback */\n  background: rgba(36, 178, 99, 0.6);\n}.text-success.text-darken-2 {\n  color: #1f9d57 !important;\n}.bg-success.bg-darken-2 {\n  background-color: #1f9d57 !important;\n}.border-success.border-darken-2 {\n  border: 1px solid #1f9d57 !important;\n}.border-top-success.border-top-darken-2 {\n  border-top: 1px solid #1f9d57 !important;\n}.border-bottom-success.border-bottom-darken-2 {\n  border-bottom: 1px solid #1f9d57 !important;\n}.border-left-success.border-left-darken-2 {\n  border-left: 1px solid #1f9d57 !important;\n}.border-right-success.border-right-darken-2 {\n  border-right: 1px solid #1f9d57 !important;\n}.overlay-success.overlay-darken-2 {\n  background: #1f9d57;\n  /* The Fallback */\n  background: rgba(31, 157, 87, 0.6);\n}.text-success.text-darken-3 {\n  color: #1b874b !important;\n}.bg-success.bg-darken-3 {\n  background-color: #1b874b !important;\n}.border-success.border-darken-3 {\n  border: 1px solid #1b874b !important;\n}.border-top-success.border-top-darken-3 {\n  border-top: 1px solid #1b874b !important;\n}.border-bottom-success.border-bottom-darken-3 {\n  border-bottom: 1px solid #1b874b !important;\n}.border-left-success.border-left-darken-3 {\n  border-left: 1px solid #1b874b !important;\n}.border-right-success.border-right-darken-3 {\n  border-right: 1px solid #1b874b !important;\n}.overlay-success.overlay-darken-3 {\n  background: #1b874b;\n  /* The Fallback */\n  background: rgba(27, 135, 75, 0.6);\n}.text-success.text-darken-4 {\n  color: #177240 !important;\n}.bg-success.bg-darken-4 {\n  background-color: #177240 !important;\n}.border-success.border-darken-4 {\n  border: 1px solid #177240 !important;\n}.border-top-success.border-top-darken-4 {\n  border-top: 1px solid #177240 !important;\n}.border-bottom-success.border-bottom-darken-4 {\n  border-bottom: 1px solid #177240 !important;\n}.border-left-success.border-left-darken-4 {\n  border-left: 1px solid #177240 !important;\n}.border-right-success.border-right-darken-4 {\n  border-right: 1px solid #177240 !important;\n}.overlay-success.overlay-darken-4 {\n  background: #177240;\n  /* The Fallback */\n  background: rgba(23, 114, 64, 0.6);\n}.text-success.text-accent-1 {\n  color: #e1fff1 !important;\n}.bg-success.bg-accent-1 {\n  background-color: #e1fff1 !important;\n}.border-success.border-accent-1 {\n  border: 1px solid #e1fff1 !important;\n}.border-top-success.border-top-accent-1 {\n  border-top: 1px solid #e1fff1 !important;\n}.border-bottom-success.border-bottom-accent-1 {\n  border-bottom: 1px solid #e1fff1 !important;\n}.border-left-success.border-left-accent-1 {\n  border-left: 1px solid #e1fff1 !important;\n}.border-right-success.border-right-accent-1 {\n  border-right: 1px solid #e1fff1 !important;\n}.overlay-success.overlay-accent-1 {\n  background: #e1fff1;\n  /* The Fallback */\n  background: rgba(225, 255, 241, 0.6);\n}.text-success.text-accent-2 {\n  color: #aeffd9 !important;\n}.bg-success.bg-accent-2 {\n  background-color: #aeffd9 !important;\n}.border-success.border-accent-2 {\n  border: 1px solid #aeffd9 !important;\n}.border-top-success.border-top-accent-2 {\n  border-top: 1px solid #aeffd9 !important;\n}.border-bottom-success.border-bottom-accent-2 {\n  border-bottom: 1px solid #aeffd9 !important;\n}.border-left-success.border-left-accent-2 {\n  border-left: 1px solid #aeffd9 !important;\n}.border-right-success.border-right-accent-2 {\n  border-right: 1px solid #aeffd9 !important;\n}.overlay-success.overlay-accent-2 {\n  background: #aeffd9;\n  /* The Fallback */\n  background: rgba(174, 255, 217, 0.6);\n}.text-success.text-accent-3 {\n  color: #7bffc1 !important;\n}.bg-success.bg-accent-3 {\n  background-color: #7bffc1 !important;\n}.border-success.border-accent-3 {\n  border: 1px solid #7bffc1 !important;\n}.border-top-success.border-top-accent-3 {\n  border-top: 1px solid #7bffc1 !important;\n}.border-bottom-success.border-bottom-accent-3 {\n  border-bottom: 1px solid #7bffc1 !important;\n}.border-left-success.border-left-accent-3 {\n  border-left: 1px solid #7bffc1 !important;\n}.border-right-success.border-right-accent-3 {\n  border-right: 1px solid #7bffc1 !important;\n}.overlay-success.overlay-accent-3 {\n  background: #7bffc1;\n  /* The Fallback */\n  background: rgba(123, 255, 193, 0.6);\n}.text-success.text-accent-4 {\n  color: #62ffb5 !important;\n}.bg-success.bg-accent-4 {\n  background-color: #62ffb5 !important;\n}.border-success.border-accent-4 {\n  border: 1px solid #62ffb5 !important;\n}.border-top-success.border-top-accent-4 {\n  border-top: 1px solid #62ffb5 !important;\n}.border-bottom-success.border-bottom-accent-4 {\n  border-bottom: 1px solid #62ffb5 !important;\n}.border-left-success.border-left-accent-4 {\n  border-left: 1px solid #62ffb5 !important;\n}.border-right-success.border-right-accent-4 {\n  border-right: 1px solid #62ffb5 !important;\n}.overlay-success.overlay-accent-4 {\n  background: #62ffb5;\n  /* The Fallback */\n  background: rgba(98, 255, 181, 0.6);\n}.text-info.text-lighten-5 {\n  color: #69efff !important;\n}.bg-info.bg-lighten-5 {\n  background-color: #69efff !important;\n}.border-info.border-lighten-5 {\n  border: 1px solid #69efff !important;\n}.border-top-info.border-top-lighten-5 {\n  border-top: 1px solid #69efff !important;\n}.border-bottom-info.border-bottom-lighten-5 {\n  border-bottom: 1px solid #69efff !important;\n}.border-left-info.border-left-lighten-5 {\n  border-left: 1px solid #69efff !important;\n}.border-right-info.border-right-lighten-5 {\n  border-right: 1px solid #69efff !important;\n}.overlay-info.overlay-lighten-5 {\n  background: #69efff;\n  /* The Fallback */\n  background: rgba(105, 239, 255, 0.6);\n}.text-info.text-lighten-4 {\n  color: #4fecff !important;\n}.bg-info.bg-lighten-4 {\n  background-color: #4fecff !important;\n}.border-info.border-lighten-4 {\n  border: 1px solid #4fecff !important;\n}.border-top-info.border-top-lighten-4 {\n  border-top: 1px solid #4fecff !important;\n}.border-bottom-info.border-bottom-lighten-4 {\n  border-bottom: 1px solid #4fecff !important;\n}.border-left-info.border-left-lighten-4 {\n  border-left: 1px solid #4fecff !important;\n}.border-right-info.border-right-lighten-4 {\n  border-right: 1px solid #4fecff !important;\n}.overlay-info.overlay-lighten-4 {\n  background: #4fecff;\n  /* The Fallback */\n  background: rgba(79, 236, 255, 0.6);\n}.text-info.text-lighten-3 {\n  color: #36e9ff !important;\n}.bg-info.bg-lighten-3 {\n  background-color: #36e9ff !important;\n}.border-info.border-lighten-3 {\n  border: 1px solid #36e9ff !important;\n}.border-top-info.border-top-lighten-3 {\n  border-top: 1px solid #36e9ff !important;\n}.border-bottom-info.border-bottom-lighten-3 {\n  border-bottom: 1px solid #36e9ff !important;\n}.border-left-info.border-left-lighten-3 {\n  border-left: 1px solid #36e9ff !important;\n}.border-right-info.border-right-lighten-3 {\n  border-right: 1px solid #36e9ff !important;\n}.overlay-info.overlay-lighten-3 {\n  background: #36e9ff;\n  /* The Fallback */\n  background: rgba(54, 233, 255, 0.6);\n}.text-info.text-lighten-2 {\n  color: #1ce7ff !important;\n}.bg-info.bg-lighten-2 {\n  background-color: #1ce7ff !important;\n}.border-info.border-lighten-2 {\n  border: 1px solid #1ce7ff !important;\n}.border-top-info.border-top-lighten-2 {\n  border-top: 1px solid #1ce7ff !important;\n}.border-bottom-info.border-bottom-lighten-2 {\n  border-bottom: 1px solid #1ce7ff !important;\n}.border-left-info.border-left-lighten-2 {\n  border-left: 1px solid #1ce7ff !important;\n}.border-right-info.border-right-lighten-2 {\n  border-right: 1px solid #1ce7ff !important;\n}.overlay-info.overlay-lighten-2 {\n  background: #1ce7ff;\n  /* The Fallback */\n  background: rgba(28, 231, 255, 0.6);\n}.text-info.text-lighten-1 {\n  color: #03e4ff !important;\n}.bg-info.bg-lighten-1 {\n  background-color: #03e4ff !important;\n}.border-info.border-lighten-1 {\n  border: 1px solid #03e4ff !important;\n}.border-top-info.border-top-lighten-1 {\n  border-top: 1px solid #03e4ff !important;\n}.border-bottom-info.border-bottom-lighten-1 {\n  border-bottom: 1px solid #03e4ff !important;\n}.border-left-info.border-left-lighten-1 {\n  border-left: 1px solid #03e4ff !important;\n}.border-right-info.border-right-lighten-1 {\n  border-right: 1px solid #03e4ff !important;\n}.overlay-info.overlay-lighten-1 {\n  background: #03e4ff;\n  /* The Fallback */\n  background: rgba(3, 228, 255, 0.6);\n}.bg-info {\n  background-color: #00cfe8 !important;\n}.bg-info .card-header,\n.bg-info .card-footer {\n  background-color: transparent;\n}.alert-info {\n  background: rgba(0, 207, 232, 0.12) !important;\n  color: #00cfe8 !important;\n}.alert-info .alert-heading {\n  box-shadow: rgba(0, 207, 232, 0.4) 0px 6px 15px -7px;\n}.alert-info .alert-link {\n  color: #00b8cf !important;\n}.alert-info .close {\n  color: #00cfe8 !important;\n}.bg-light-info {\n  background: rgba(0, 207, 232, 0.12) !important;\n  color: #00cfe8 !important;\n}.bg-light-info.fc-h-event, .bg-light-info.fc-v-event {\n  border-color: rgba(0, 207, 232, 0.1);\n}.bg-light-info .fc-list-event-dot,\n.bg-light-info .fc-daygrid-event-dot {\n  border-color: #00cfe8 !important;\n}.bg-light-info.fc-list-event:hover td {\n  background: rgba(0, 207, 232, 0.1) !important;\n}.bg-light-info.fc-list-event .fc-list-event-title {\n  color: #6e6b7b;\n}.avatar.bg-light-info {\n  color: #00cfe8 !important;\n}.border-info {\n  border: 1px solid #00cfe8 !important;\n}.border-top-info {\n  border-top: 1px solid #00cfe8;\n}.border-bottom-info {\n  border-bottom: 1px solid #00cfe8;\n}.border-left-info {\n  border-left: 1px solid #00cfe8;\n}.border-right-info {\n  border-right: 1px solid #00cfe8;\n}.bg-info.badge-glow,\n.border-info.badge-glow,\n.badge-info.badge-glow {\n  box-shadow: 0px 0px 10px #00cfe8;\n}.badge.badge-light-info {\n  background-color: rgba(0, 207, 232, 0.12);\n  color: #00cfe8 !important;\n}.overlay-info {\n  background: #00cfe8;\n  /* The Fallback */\n  background: rgba(0, 207, 232, 0.6);\n}.btn-info {\n  border-color: #00cfe8 !important;\n  background-color: #00cfe8 !important;\n  color: #fff !important;\n}.btn-info:focus, .btn-info:active, .btn-info.active {\n  color: #fff;\n  background-color: #00b8cf !important;\n}.btn-info:hover:not(.disabled):not(:disabled) {\n  box-shadow: 0 8px 25px -8px #00cfe8;\n}.btn-info:not(:disabled):not(.disabled):active:focus {\n  box-shadow: none;\n}.btn-flat-info {\n  background-color: transparent;\n  color: #00cfe8;\n}.btn-flat-info:hover {\n  color: #00cfe8;\n}.btn-flat-info:hover:not(.disabled):not(:disabled) {\n  background-color: rgba(0, 207, 232, 0.12);\n}.btn-flat-info:active, .btn-flat-info.active, .btn-flat-info:focus {\n  background-color: rgba(0, 207, 232, 0.2);\n  color: #00cfe8;\n}.btn-flat-info.dropdown-toggle::after {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2300cfe8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-down'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\");\n}.btn-relief-info {\n  background-color: #00cfe8;\n  box-shadow: inset 0 -3px 0 0 rgba(34, 41, 47, 0.2);\n  color: #fff;\n  transition: all 0.2s ease;\n}.btn-relief-info:hover:not(.disabled):not(:disabled) {\n  background-color: #03e4ff;\n}.btn-relief-info:active, .btn-relief-info.active, .btn-relief-info:focus {\n  background-color: #00b8cf;\n}.btn-relief-info:hover {\n  color: #fff;\n}.btn-relief-info:active, .btn-relief-info.active {\n  outline: none;\n  box-shadow: none;\n  transform: translateY(3px);\n}.btn-outline-info {\n  border: 1px solid #00cfe8 !important;\n  background-color: transparent;\n  color: #00cfe8;\n}.btn-outline-info:hover:not(.disabled):not(:disabled) {\n  background-color: rgba(0, 207, 232, 0.04);\n  color: #00cfe8;\n}.btn-outline-info:not(:disabled):not(.disabled):active:focus {\n  box-shadow: none;\n}.btn-outline-info:not(:disabled):not(.disabled):active, .btn-outline-info:not(:disabled):not(.disabled).active, .btn-outline-info:not(:disabled):not(.disabled):focus {\n  background-color: rgba(0, 207, 232, 0.2);\n  color: #00cfe8;\n}.btn-outline-info.dropdown-toggle::after {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2300cfe8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-down'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\");\n}.show > .btn-outline-info.dropdown-toggle {\n  background-color: rgba(0, 207, 232, 0.2);\n  color: #00cfe8;\n}.btn-outline-info.waves-effect .waves-ripple,\n.btn-flat-info.waves-effect .waves-ripple {\n  background: radial-gradient(rgba(0, 207, 232, 0.2) 0, rgba(0, 207, 232, 0.3) 40%, rgba(0, 207, 232, 0.4) 50%, rgba(0, 207, 232, 0.5) 60%, rgba(255, 255, 255, 0) 70%);\n}.bullet.bullet-info {\n  background-color: #00cfe8;\n}.modal.modal-info .modal-header .modal-title {\n  color: #00cfe8;\n}.modal.modal-info .modal-header .close {\n  color: #00cfe8 !important;\n}.pagination-info .page-item.active .page-link {\n  background: #00cfe8 !important;\n  color: #fff;\n}.pagination-info .page-item.active .page-link:hover {\n  color: #fff;\n}.pagination-info .page-item .page-link:hover {\n  color: #00cfe8;\n}.pagination-info .page-item.prev-item .page-link:hover, .pagination-info .page-item.next-item .page-link:hover {\n  background: #00cfe8;\n  color: #fff;\n}.pagination-info .page-item.next-item .page-link:active:after, .pagination-info .page-item.next-item .page-link:hover:after, .pagination-info .page-item.next .page-link:active:after, .pagination-info .page-item.next .page-link:hover:after {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2300cfe8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-right'%3E%3Cpolyline points='9 18 15 12 9 6'%3E%3C/polyline%3E%3C/svg%3E\") !important;\n}.pagination-info .page-item.prev-item .page-link:active:before, .pagination-info .page-item.prev-item .page-link:hover:before, .pagination-info .page-item.prev .page-link:active:before, .pagination-info .page-item.prev .page-link:hover:before {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2300cfe8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-left'%3E%3Cpolyline points='15 18 9 12 15 6'%3E%3C/polyline%3E%3C/svg%3E\") !important;\n}.nav-pill-info .nav-item .nav-link.active {\n  color: #fff;\n  background-color: #00cfe8 !important;\n  border-color: #00cfe8;\n  box-shadow: 0 4px 18px -4px rgba(0, 207, 232, 0.65);\n}.progress-bar-info {\n  background-color: rgba(0, 207, 232, 0.12);\n}.progress-bar-info .progress-bar {\n  background-color: #00cfe8;\n}.timeline .timeline-point-info {\n  border-color: #00cfe8 !important;\n}.timeline .timeline-point-info i,\n.timeline .timeline-point-info svg {\n  stroke: #00cfe8 !important;\n}.timeline .timeline-point-info.timeline-point-indicator {\n  background-color: #00cfe8 !important;\n}.timeline .timeline-point-info.timeline-point-indicator:before {\n  background: rgba(0, 207, 232, 0.12) !important;\n}.divider.divider-info .divider-text:before, .divider.divider-info .divider-text:after {\n  border-color: #00cfe8 !important;\n}input:focus ~ .bg-info {\n  box-shadow: 0 0 0 0.075rem #fff, 0 0 0 0.21rem #00cfe8 !important;\n}.custom-control-info .custom-control-input:checked ~ .custom-control-label::before,\n.custom-control-info .custom-control-input:active ~ .custom-control-label::before {\n  border-color: #00cfe8;\n  background-color: #00cfe8;\n}.custom-control-info.custom-checkbox .custom-control-input:checked ~ .custom-control-label::before,\n.custom-control-info.custom-checkbox .custom-control-input:active ~ .custom-control-label::before,\n.custom-control-info.custom-checkbox .custom-control-input:focus ~ .custom-control-label::before, .custom-control-info.custom-radio .custom-control-input:checked ~ .custom-control-label::before,\n.custom-control-info.custom-radio .custom-control-input:active ~ .custom-control-label::before,\n.custom-control-info.custom-radio .custom-control-input:focus ~ .custom-control-label::before {\n  box-shadow: 0 2px 4px 0 rgba(0, 207, 232, 0.4) !important;\n}.custom-control-info .custom-control-input:disabled:checked ~ .custom-control-label::before {\n  background-color: rgba(0, 207, 232, 0.65) !important;\n  border: none;\n  box-shadow: none !important;\n}.custom-control-info .custom-control-input:focus ~ .custom-control-label::before {\n  border-color: #00cfe8 !important;\n}.custom-switch-info .custom-control-input:checked ~ .custom-control-label::before {\n  background-color: #00cfe8 !important;\n  color: #fff;\n  transition: all 0.2s ease-out;\n}.select2-info .select2-container--default .select2-selection--multiple .select2-selection__choice {\n  background: #00cfe8 !important;\n  border-color: #00cfe8 !important;\n}.text-info.text-darken-1 {\n  color: #00b8cf !important;\n}.bg-info.bg-darken-1 {\n  background-color: #00b8cf !important;\n}.border-info.border-darken-1 {\n  border: 1px solid #00b8cf !important;\n}.border-top-info.border-top-darken-1 {\n  border-top: 1px solid #00b8cf !important;\n}.border-bottom-info.border-bottom-darken-1 {\n  border-bottom: 1px solid #00b8cf !important;\n}.border-left-info.border-left-darken-1 {\n  border-left: 1px solid #00b8cf !important;\n}.border-right-info.border-right-darken-1 {\n  border-right: 1px solid #00b8cf !important;\n}.overlay-info.overlay-darken-1 {\n  background: #00b8cf;\n  /* The Fallback */\n  background: rgba(0, 184, 207, 0.6);\n}.text-info.text-darken-2 {\n  color: #00a1b5 !important;\n}.bg-info.bg-darken-2 {\n  background-color: #00a1b5 !important;\n}.border-info.border-darken-2 {\n  border: 1px solid #00a1b5 !important;\n}.border-top-info.border-top-darken-2 {\n  border-top: 1px solid #00a1b5 !important;\n}.border-bottom-info.border-bottom-darken-2 {\n  border-bottom: 1px solid #00a1b5 !important;\n}.border-left-info.border-left-darken-2 {\n  border-left: 1px solid #00a1b5 !important;\n}.border-right-info.border-right-darken-2 {\n  border-right: 1px solid #00a1b5 !important;\n}.overlay-info.overlay-darken-2 {\n  background: #00a1b5;\n  /* The Fallback */\n  background: rgba(0, 161, 181, 0.6);\n}.text-info.text-darken-3 {\n  color: #008b9c !important;\n}.bg-info.bg-darken-3 {\n  background-color: #008b9c !important;\n}.border-info.border-darken-3 {\n  border: 1px solid #008b9c !important;\n}.border-top-info.border-top-darken-3 {\n  border-top: 1px solid #008b9c !important;\n}.border-bottom-info.border-bottom-darken-3 {\n  border-bottom: 1px solid #008b9c !important;\n}.border-left-info.border-left-darken-3 {\n  border-left: 1px solid #008b9c !important;\n}.border-right-info.border-right-darken-3 {\n  border-right: 1px solid #008b9c !important;\n}.overlay-info.overlay-darken-3 {\n  background: #008b9c;\n  /* The Fallback */\n  background: rgba(0, 139, 156, 0.6);\n}.text-info.text-darken-4 {\n  color: #007482 !important;\n}.bg-info.bg-darken-4 {\n  background-color: #007482 !important;\n}.border-info.border-darken-4 {\n  border: 1px solid #007482 !important;\n}.border-top-info.border-top-darken-4 {\n  border-top: 1px solid #007482 !important;\n}.border-bottom-info.border-bottom-darken-4 {\n  border-bottom: 1px solid #007482 !important;\n}.border-left-info.border-left-darken-4 {\n  border-left: 1px solid #007482 !important;\n}.border-right-info.border-right-darken-4 {\n  border-right: 1px solid #007482 !important;\n}.overlay-info.overlay-darken-4 {\n  background: #007482;\n  /* The Fallback */\n  background: rgba(0, 116, 130, 0.6);\n}.text-info.text-accent-1 {\n  color: #feffff !important;\n}.bg-info.bg-accent-1 {\n  background-color: #feffff !important;\n}.border-info.border-accent-1 {\n  border: 1px solid #feffff !important;\n}.border-top-info.border-top-accent-1 {\n  border-top: 1px solid #feffff !important;\n}.border-bottom-info.border-bottom-accent-1 {\n  border-bottom: 1px solid #feffff !important;\n}.border-left-info.border-left-accent-1 {\n  border-left: 1px solid #feffff !important;\n}.border-right-info.border-right-accent-1 {\n  border-right: 1px solid #feffff !important;\n}.overlay-info.overlay-accent-1 {\n  background: #feffff;\n  /* The Fallback */\n  background: rgba(254, 255, 255, 0.6);\n}.text-info.text-accent-2 {\n  color: #cbf5ff !important;\n}.bg-info.bg-accent-2 {\n  background-color: #cbf5ff !important;\n}.border-info.border-accent-2 {\n  border: 1px solid #cbf5ff !important;\n}.border-top-info.border-top-accent-2 {\n  border-top: 1px solid #cbf5ff !important;\n}.border-bottom-info.border-bottom-accent-2 {\n  border-bottom: 1px solid #cbf5ff !important;\n}.border-left-info.border-left-accent-2 {\n  border-left: 1px solid #cbf5ff !important;\n}.border-right-info.border-right-accent-2 {\n  border-right: 1px solid #cbf5ff !important;\n}.overlay-info.overlay-accent-2 {\n  background: #cbf5ff;\n  /* The Fallback */\n  background: rgba(203, 245, 255, 0.6);\n}.text-info.text-accent-3 {\n  color: #98ecff !important;\n}.bg-info.bg-accent-3 {\n  background-color: #98ecff !important;\n}.border-info.border-accent-3 {\n  border: 1px solid #98ecff !important;\n}.border-top-info.border-top-accent-3 {\n  border-top: 1px solid #98ecff !important;\n}.border-bottom-info.border-bottom-accent-3 {\n  border-bottom: 1px solid #98ecff !important;\n}.border-left-info.border-left-accent-3 {\n  border-left: 1px solid #98ecff !important;\n}.border-right-info.border-right-accent-3 {\n  border-right: 1px solid #98ecff !important;\n}.overlay-info.overlay-accent-3 {\n  background: #98ecff;\n  /* The Fallback */\n  background: rgba(152, 236, 255, 0.6);\n}.text-info.text-accent-4 {\n  color: #7fe7ff !important;\n}.bg-info.bg-accent-4 {\n  background-color: #7fe7ff !important;\n}.border-info.border-accent-4 {\n  border: 1px solid #7fe7ff !important;\n}.border-top-info.border-top-accent-4 {\n  border-top: 1px solid #7fe7ff !important;\n}.border-bottom-info.border-bottom-accent-4 {\n  border-bottom: 1px solid #7fe7ff !important;\n}.border-left-info.border-left-accent-4 {\n  border-left: 1px solid #7fe7ff !important;\n}.border-right-info.border-right-accent-4 {\n  border-right: 1px solid #7fe7ff !important;\n}.overlay-info.overlay-accent-4 {\n  background: #7fe7ff;\n  /* The Fallback */\n  background: rgba(127, 231, 255, 0.6);\n}.text-warning.text-lighten-5 {\n  color: #ffe0c3 !important;\n}.bg-warning.bg-lighten-5 {\n  background-color: #ffe0c3 !important;\n}.border-warning.border-lighten-5 {\n  border: 1px solid #ffe0c3 !important;\n}.border-top-warning.border-top-lighten-5 {\n  border-top: 1px solid #ffe0c3 !important;\n}.border-bottom-warning.border-bottom-lighten-5 {\n  border-bottom: 1px solid #ffe0c3 !important;\n}.border-left-warning.border-left-lighten-5 {\n  border-left: 1px solid #ffe0c3 !important;\n}.border-right-warning.border-right-lighten-5 {\n  border-right: 1px solid #ffe0c3 !important;\n}.overlay-warning.overlay-lighten-5 {\n  background: #ffe0c3;\n  /* The Fallback */\n  background: rgba(255, 224, 195, 0.6);\n}.text-warning.text-lighten-4 {\n  color: #ffd3a9 !important;\n}.bg-warning.bg-lighten-4 {\n  background-color: #ffd3a9 !important;\n}.border-warning.border-lighten-4 {\n  border: 1px solid #ffd3a9 !important;\n}.border-top-warning.border-top-lighten-4 {\n  border-top: 1px solid #ffd3a9 !important;\n}.border-bottom-warning.border-bottom-lighten-4 {\n  border-bottom: 1px solid #ffd3a9 !important;\n}.border-left-warning.border-left-lighten-4 {\n  border-left: 1px solid #ffd3a9 !important;\n}.border-right-warning.border-right-lighten-4 {\n  border-right: 1px solid #ffd3a9 !important;\n}.overlay-warning.overlay-lighten-4 {\n  background: #ffd3a9;\n  /* The Fallback */\n  background: rgba(255, 211, 169, 0.6);\n}.text-warning.text-lighten-3 {\n  color: #ffc690 !important;\n}.bg-warning.bg-lighten-3 {\n  background-color: #ffc690 !important;\n}.border-warning.border-lighten-3 {\n  border: 1px solid #ffc690 !important;\n}.border-top-warning.border-top-lighten-3 {\n  border-top: 1px solid #ffc690 !important;\n}.border-bottom-warning.border-bottom-lighten-3 {\n  border-bottom: 1px solid #ffc690 !important;\n}.border-left-warning.border-left-lighten-3 {\n  border-left: 1px solid #ffc690 !important;\n}.border-right-warning.border-right-lighten-3 {\n  border-right: 1px solid #ffc690 !important;\n}.overlay-warning.overlay-lighten-3 {\n  background: #ffc690;\n  /* The Fallback */\n  background: rgba(255, 198, 144, 0.6);\n}.text-warning.text-lighten-2 {\n  color: #ffb976 !important;\n}.bg-warning.bg-lighten-2 {\n  background-color: #ffb976 !important;\n}.border-warning.border-lighten-2 {\n  border: 1px solid #ffb976 !important;\n}.border-top-warning.border-top-lighten-2 {\n  border-top: 1px solid #ffb976 !important;\n}.border-bottom-warning.border-bottom-lighten-2 {\n  border-bottom: 1px solid #ffb976 !important;\n}.border-left-warning.border-left-lighten-2 {\n  border-left: 1px solid #ffb976 !important;\n}.border-right-warning.border-right-lighten-2 {\n  border-right: 1px solid #ffb976 !important;\n}.overlay-warning.overlay-lighten-2 {\n  background: #ffb976;\n  /* The Fallback */\n  background: rgba(255, 185, 118, 0.6);\n}.text-warning.text-lighten-1 {\n  color: #ffac5d !important;\n}.bg-warning.bg-lighten-1 {\n  background-color: #ffac5d !important;\n}.border-warning.border-lighten-1 {\n  border: 1px solid #ffac5d !important;\n}.border-top-warning.border-top-lighten-1 {\n  border-top: 1px solid #ffac5d !important;\n}.border-bottom-warning.border-bottom-lighten-1 {\n  border-bottom: 1px solid #ffac5d !important;\n}.border-left-warning.border-left-lighten-1 {\n  border-left: 1px solid #ffac5d !important;\n}.border-right-warning.border-right-lighten-1 {\n  border-right: 1px solid #ffac5d !important;\n}.overlay-warning.overlay-lighten-1 {\n  background: #ffac5d;\n  /* The Fallback */\n  background: rgba(255, 172, 93, 0.6);\n}.bg-warning {\n  background-color: #ff9f43 !important;\n}.bg-warning .card-header,\n.bg-warning .card-footer {\n  background-color: transparent;\n}.alert-warning {\n  background: rgba(255, 159, 67, 0.12) !important;\n  color: #ff9f43 !important;\n}.alert-warning .alert-heading {\n  box-shadow: rgba(255, 159, 67, 0.4) 0px 6px 15px -7px;\n}.alert-warning .alert-link {\n  color: #ff922a !important;\n}.alert-warning .close {\n  color: #ff9f43 !important;\n}.bg-light-warning {\n  background: rgba(255, 159, 67, 0.12) !important;\n  color: #ff9f43 !important;\n}.bg-light-warning.fc-h-event, .bg-light-warning.fc-v-event {\n  border-color: rgba(255, 159, 67, 0.1);\n}.bg-light-warning .fc-list-event-dot,\n.bg-light-warning .fc-daygrid-event-dot {\n  border-color: #ff9f43 !important;\n}.bg-light-warning.fc-list-event:hover td {\n  background: rgba(255, 159, 67, 0.1) !important;\n}.bg-light-warning.fc-list-event .fc-list-event-title {\n  color: #6e6b7b;\n}.avatar.bg-light-warning {\n  color: #ff9f43 !important;\n}.border-warning {\n  border: 1px solid #ff9f43 !important;\n}.border-top-warning {\n  border-top: 1px solid #ff9f43;\n}.border-bottom-warning {\n  border-bottom: 1px solid #ff9f43;\n}.border-left-warning {\n  border-left: 1px solid #ff9f43;\n}.border-right-warning {\n  border-right: 1px solid #ff9f43;\n}.bg-warning.badge-glow,\n.border-warning.badge-glow,\n.badge-warning.badge-glow {\n  box-shadow: 0px 0px 10px #ff9f43;\n}.badge.badge-light-warning {\n  background-color: rgba(255, 159, 67, 0.12);\n  color: #ff9f43 !important;\n}.overlay-warning {\n  background: #ff9f43;\n  /* The Fallback */\n  background: rgba(255, 159, 67, 0.6);\n}.btn-warning {\n  border-color: #ff9f43 !important;\n  background-color: #ff9f43 !important;\n  color: #fff !important;\n}.btn-warning:focus, .btn-warning:active, .btn-warning.active {\n  color: #fff;\n  background-color: #ff922a !important;\n}.btn-warning:hover:not(.disabled):not(:disabled) {\n  box-shadow: 0 8px 25px -8px #ff9f43;\n}.btn-warning:not(:disabled):not(.disabled):active:focus {\n  box-shadow: none;\n}.btn-flat-warning {\n  background-color: transparent;\n  color: #ff9f43;\n}.btn-flat-warning:hover {\n  color: #ff9f43;\n}.btn-flat-warning:hover:not(.disabled):not(:disabled) {\n  background-color: rgba(255, 159, 67, 0.12);\n}.btn-flat-warning:active, .btn-flat-warning.active, .btn-flat-warning:focus {\n  background-color: rgba(255, 159, 67, 0.2);\n  color: #ff9f43;\n}.btn-flat-warning.dropdown-toggle::after {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ff9f43' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-down'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\");\n}.btn-relief-warning {\n  background-color: #ff9f43;\n  box-shadow: inset 0 -3px 0 0 rgba(34, 41, 47, 0.2);\n  color: #fff;\n  transition: all 0.2s ease;\n}.btn-relief-warning:hover:not(.disabled):not(:disabled) {\n  background-color: #ffac5d;\n}.btn-relief-warning:active, .btn-relief-warning.active, .btn-relief-warning:focus {\n  background-color: #ff922a;\n}.btn-relief-warning:hover {\n  color: #fff;\n}.btn-relief-warning:active, .btn-relief-warning.active {\n  outline: none;\n  box-shadow: none;\n  transform: translateY(3px);\n}.btn-outline-warning {\n  border: 1px solid #ff9f43 !important;\n  background-color: transparent;\n  color: #ff9f43;\n}.btn-outline-warning:hover:not(.disabled):not(:disabled) {\n  background-color: rgba(255, 159, 67, 0.04);\n  color: #ff9f43;\n}.btn-outline-warning:not(:disabled):not(.disabled):active:focus {\n  box-shadow: none;\n}.btn-outline-warning:not(:disabled):not(.disabled):active, .btn-outline-warning:not(:disabled):not(.disabled).active, .btn-outline-warning:not(:disabled):not(.disabled):focus {\n  background-color: rgba(255, 159, 67, 0.2);\n  color: #ff9f43;\n}.btn-outline-warning.dropdown-toggle::after {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ff9f43' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-down'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\");\n}.show > .btn-outline-warning.dropdown-toggle {\n  background-color: rgba(255, 159, 67, 0.2);\n  color: #ff9f43;\n}.btn-outline-warning.waves-effect .waves-ripple,\n.btn-flat-warning.waves-effect .waves-ripple {\n  background: radial-gradient(rgba(255, 159, 67, 0.2) 0, rgba(255, 159, 67, 0.3) 40%, rgba(255, 159, 67, 0.4) 50%, rgba(255, 159, 67, 0.5) 60%, rgba(255, 255, 255, 0) 70%);\n}.bullet.bullet-warning {\n  background-color: #ff9f43;\n}.modal.modal-warning .modal-header .modal-title {\n  color: #ff9f43;\n}.modal.modal-warning .modal-header .close {\n  color: #ff9f43 !important;\n}.pagination-warning .page-item.active .page-link {\n  background: #ff9f43 !important;\n  color: #fff;\n}.pagination-warning .page-item.active .page-link:hover {\n  color: #fff;\n}.pagination-warning .page-item .page-link:hover {\n  color: #ff9f43;\n}.pagination-warning .page-item.prev-item .page-link:hover, .pagination-warning .page-item.next-item .page-link:hover {\n  background: #ff9f43;\n  color: #fff;\n}.pagination-warning .page-item.next-item .page-link:active:after, .pagination-warning .page-item.next-item .page-link:hover:after, .pagination-warning .page-item.next .page-link:active:after, .pagination-warning .page-item.next .page-link:hover:after {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ff9f43' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-right'%3E%3Cpolyline points='9 18 15 12 9 6'%3E%3C/polyline%3E%3C/svg%3E\") !important;\n}.pagination-warning .page-item.prev-item .page-link:active:before, .pagination-warning .page-item.prev-item .page-link:hover:before, .pagination-warning .page-item.prev .page-link:active:before, .pagination-warning .page-item.prev .page-link:hover:before {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ff9f43' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-left'%3E%3Cpolyline points='15 18 9 12 15 6'%3E%3C/polyline%3E%3C/svg%3E\") !important;\n}.nav-pill-warning .nav-item .nav-link.active {\n  color: #fff;\n  background-color: #ff9f43 !important;\n  border-color: #ff9f43;\n  box-shadow: 0 4px 18px -4px rgba(255, 159, 67, 0.65);\n}.progress-bar-warning {\n  background-color: rgba(255, 159, 67, 0.12);\n}.progress-bar-warning .progress-bar {\n  background-color: #ff9f43;\n}.timeline .timeline-point-warning {\n  border-color: #ff9f43 !important;\n}.timeline .timeline-point-warning i,\n.timeline .timeline-point-warning svg {\n  stroke: #ff9f43 !important;\n}.timeline .timeline-point-warning.timeline-point-indicator {\n  background-color: #ff9f43 !important;\n}.timeline .timeline-point-warning.timeline-point-indicator:before {\n  background: rgba(255, 159, 67, 0.12) !important;\n}.divider.divider-warning .divider-text:before, .divider.divider-warning .divider-text:after {\n  border-color: #ff9f43 !important;\n}input:focus ~ .bg-warning {\n  box-shadow: 0 0 0 0.075rem #fff, 0 0 0 0.21rem #ff9f43 !important;\n}.custom-control-warning .custom-control-input:checked ~ .custom-control-label::before,\n.custom-control-warning .custom-control-input:active ~ .custom-control-label::before {\n  border-color: #ff9f43;\n  background-color: #ff9f43;\n}.custom-control-warning.custom-checkbox .custom-control-input:checked ~ .custom-control-label::before,\n.custom-control-warning.custom-checkbox .custom-control-input:active ~ .custom-control-label::before,\n.custom-control-warning.custom-checkbox .custom-control-input:focus ~ .custom-control-label::before, .custom-control-warning.custom-radio .custom-control-input:checked ~ .custom-control-label::before,\n.custom-control-warning.custom-radio .custom-control-input:active ~ .custom-control-label::before,\n.custom-control-warning.custom-radio .custom-control-input:focus ~ .custom-control-label::before {\n  box-shadow: 0 2px 4px 0 rgba(255, 159, 67, 0.4) !important;\n}.custom-control-warning .custom-control-input:disabled:checked ~ .custom-control-label::before {\n  background-color: rgba(255, 159, 67, 0.65) !important;\n  border: none;\n  box-shadow: none !important;\n}.custom-control-warning .custom-control-input:focus ~ .custom-control-label::before {\n  border-color: #ff9f43 !important;\n}.custom-switch-warning .custom-control-input:checked ~ .custom-control-label::before {\n  background-color: #ff9f43 !important;\n  color: #fff;\n  transition: all 0.2s ease-out;\n}.select2-warning .select2-container--default .select2-selection--multiple .select2-selection__choice {\n  background: #ff9f43 !important;\n  border-color: #ff9f43 !important;\n}.text-warning.text-darken-1 {\n  color: #ff922a !important;\n}.bg-warning.bg-darken-1 {\n  background-color: #ff922a !important;\n}.border-warning.border-darken-1 {\n  border: 1px solid #ff922a !important;\n}.border-top-warning.border-top-darken-1 {\n  border-top: 1px solid #ff922a !important;\n}.border-bottom-warning.border-bottom-darken-1 {\n  border-bottom: 1px solid #ff922a !important;\n}.border-left-warning.border-left-darken-1 {\n  border-left: 1px solid #ff922a !important;\n}.border-right-warning.border-right-darken-1 {\n  border-right: 1px solid #ff922a !important;\n}.overlay-warning.overlay-darken-1 {\n  background: #ff922a;\n  /* The Fallback */\n  background: rgba(255, 146, 42, 0.6);\n}.text-warning.text-darken-2 {\n  color: #ff8510 !important;\n}.bg-warning.bg-darken-2 {\n  background-color: #ff8510 !important;\n}.border-warning.border-darken-2 {\n  border: 1px solid #ff8510 !important;\n}.border-top-warning.border-top-darken-2 {\n  border-top: 1px solid #ff8510 !important;\n}.border-bottom-warning.border-bottom-darken-2 {\n  border-bottom: 1px solid #ff8510 !important;\n}.border-left-warning.border-left-darken-2 {\n  border-left: 1px solid #ff8510 !important;\n}.border-right-warning.border-right-darken-2 {\n  border-right: 1px solid #ff8510 !important;\n}.overlay-warning.overlay-darken-2 {\n  background: #ff8510;\n  /* The Fallback */\n  background: rgba(255, 133, 16, 0.6);\n}.text-warning.text-darken-3 {\n  color: #f67800 !important;\n}.bg-warning.bg-darken-3 {\n  background-color: #f67800 !important;\n}.border-warning.border-darken-3 {\n  border: 1px solid #f67800 !important;\n}.border-top-warning.border-top-darken-3 {\n  border-top: 1px solid #f67800 !important;\n}.border-bottom-warning.border-bottom-darken-3 {\n  border-bottom: 1px solid #f67800 !important;\n}.border-left-warning.border-left-darken-3 {\n  border-left: 1px solid #f67800 !important;\n}.border-right-warning.border-right-darken-3 {\n  border-right: 1px solid #f67800 !important;\n}.overlay-warning.overlay-darken-3 {\n  background: #f67800;\n  /* The Fallback */\n  background: rgba(246, 120, 0, 0.6);\n}.text-warning.text-darken-4 {\n  color: #dc6c00 !important;\n}.bg-warning.bg-darken-4 {\n  background-color: #dc6c00 !important;\n}.border-warning.border-darken-4 {\n  border: 1px solid #dc6c00 !important;\n}.border-top-warning.border-top-darken-4 {\n  border-top: 1px solid #dc6c00 !important;\n}.border-bottom-warning.border-bottom-darken-4 {\n  border-bottom: 1px solid #dc6c00 !important;\n}.border-left-warning.border-left-darken-4 {\n  border-left: 1px solid #dc6c00 !important;\n}.border-right-warning.border-right-darken-4 {\n  border-right: 1px solid #dc6c00 !important;\n}.overlay-warning.overlay-darken-4 {\n  background: #dc6c00;\n  /* The Fallback */\n  background: rgba(220, 108, 0, 0.6);\n}.text-warning.text-accent-1 {\n  color: #fff5ef !important;\n}.bg-warning.bg-accent-1 {\n  background-color: #fff5ef !important;\n}.border-warning.border-accent-1 {\n  border: 1px solid #fff5ef !important;\n}.border-top-warning.border-top-accent-1 {\n  border-top: 1px solid #fff5ef !important;\n}.border-bottom-warning.border-bottom-accent-1 {\n  border-bottom: 1px solid #fff5ef !important;\n}.border-left-warning.border-left-accent-1 {\n  border-left: 1px solid #fff5ef !important;\n}.border-right-warning.border-right-accent-1 {\n  border-right: 1px solid #fff5ef !important;\n}.overlay-warning.overlay-accent-1 {\n  background: #fff5ef;\n  /* The Fallback */\n  background: rgba(255, 245, 239, 0.6);\n}.text-warning.text-accent-2 {\n  color: #ffe5d8 !important;\n}.bg-warning.bg-accent-2 {\n  background-color: #ffe5d8 !important;\n}.border-warning.border-accent-2 {\n  border: 1px solid #ffe5d8 !important;\n}.border-top-warning.border-top-accent-2 {\n  border-top: 1px solid #ffe5d8 !important;\n}.border-bottom-warning.border-bottom-accent-2 {\n  border-bottom: 1px solid #ffe5d8 !important;\n}.border-left-warning.border-left-accent-2 {\n  border-left: 1px solid #ffe5d8 !important;\n}.border-right-warning.border-right-accent-2 {\n  border-right: 1px solid #ffe5d8 !important;\n}.overlay-warning.overlay-accent-2 {\n  background: #ffe5d8;\n  /* The Fallback */\n  background: rgba(255, 229, 216, 0.6);\n}.text-warning.text-accent-3 {\n  color: #fff6f3 !important;\n}.bg-warning.bg-accent-3 {\n  background-color: #fff6f3 !important;\n}.border-warning.border-accent-3 {\n  border: 1px solid #fff6f3 !important;\n}.border-top-warning.border-top-accent-3 {\n  border-top: 1px solid #fff6f3 !important;\n}.border-bottom-warning.border-bottom-accent-3 {\n  border-bottom: 1px solid #fff6f3 !important;\n}.border-left-warning.border-left-accent-3 {\n  border-left: 1px solid #fff6f3 !important;\n}.border-right-warning.border-right-accent-3 {\n  border-right: 1px solid #fff6f3 !important;\n}.overlay-warning.overlay-accent-3 {\n  background: #fff6f3;\n  /* The Fallback */\n  background: rgba(255, 246, 243, 0.6);\n}.text-warning.text-accent-4 {\n  color: #ffe3da !important;\n}.bg-warning.bg-accent-4 {\n  background-color: #ffe3da !important;\n}.border-warning.border-accent-4 {\n  border: 1px solid #ffe3da !important;\n}.border-top-warning.border-top-accent-4 {\n  border-top: 1px solid #ffe3da !important;\n}.border-bottom-warning.border-bottom-accent-4 {\n  border-bottom: 1px solid #ffe3da !important;\n}.border-left-warning.border-left-accent-4 {\n  border-left: 1px solid #ffe3da !important;\n}.border-right-warning.border-right-accent-4 {\n  border-right: 1px solid #ffe3da !important;\n}.overlay-warning.overlay-accent-4 {\n  background: #ffe3da;\n  /* The Fallback */\n  background: rgba(255, 227, 218, 0.6);\n}.text-danger.text-lighten-5 {\n  color: #ff8080 !important;\n}.bg-danger.bg-lighten-5 {\n  background-color: #ff8080 !important;\n}.border-danger.border-lighten-5 {\n  border: 1px solid #ff8080 !important;\n}.border-top-danger.border-top-lighten-5 {\n  border-top: 1px solid #ff8080 !important;\n}.border-bottom-danger.border-bottom-lighten-5 {\n  border-bottom: 1px solid #ff8080 !important;\n}.border-left-danger.border-left-lighten-5 {\n  border-left: 1px solid #ff8080 !important;\n}.border-right-danger.border-right-lighten-5 {\n  border-right: 1px solid #ff8080 !important;\n}.overlay-danger.overlay-lighten-5 {\n  background: #ff8080;\n  /* The Fallback */\n  background: rgba(255, 128, 128, 0.6);\n}.text-danger.text-lighten-4 {\n  color: #ff6666 !important;\n}.bg-danger.bg-lighten-4 {\n  background-color: #ff6666 !important;\n}.border-danger.border-lighten-4 {\n  border: 1px solid #ff6666 !important;\n}.border-top-danger.border-top-lighten-4 {\n  border-top: 1px solid #ff6666 !important;\n}.border-bottom-danger.border-bottom-lighten-4 {\n  border-bottom: 1px solid #ff6666 !important;\n}.border-left-danger.border-left-lighten-4 {\n  border-left: 1px solid #ff6666 !important;\n}.border-right-danger.border-right-lighten-4 {\n  border-right: 1px solid #ff6666 !important;\n}.overlay-danger.overlay-lighten-4 {\n  background: #ff6666;\n  /* The Fallback */\n  background: rgba(255, 102, 102, 0.6);\n}.text-danger.text-lighten-3 {\n  color: #ff4d4d !important;\n}.bg-danger.bg-lighten-3 {\n  background-color: #ff4d4d !important;\n}.border-danger.border-lighten-3 {\n  border: 1px solid #ff4d4d !important;\n}.border-top-danger.border-top-lighten-3 {\n  border-top: 1px solid #ff4d4d !important;\n}.border-bottom-danger.border-bottom-lighten-3 {\n  border-bottom: 1px solid #ff4d4d !important;\n}.border-left-danger.border-left-lighten-3 {\n  border-left: 1px solid #ff4d4d !important;\n}.border-right-danger.border-right-lighten-3 {\n  border-right: 1px solid #ff4d4d !important;\n}.overlay-danger.overlay-lighten-3 {\n  background: #ff4d4d;\n  /* The Fallback */\n  background: rgba(255, 77, 77, 0.6);\n}.text-danger.text-lighten-2 {\n  color: #ff3333 !important;\n}.bg-danger.bg-lighten-2 {\n  background-color: #ff3333 !important;\n}.border-danger.border-lighten-2 {\n  border: 1px solid #ff3333 !important;\n}.border-top-danger.border-top-lighten-2 {\n  border-top: 1px solid #ff3333 !important;\n}.border-bottom-danger.border-bottom-lighten-2 {\n  border-bottom: 1px solid #ff3333 !important;\n}.border-left-danger.border-left-lighten-2 {\n  border-left: 1px solid #ff3333 !important;\n}.border-right-danger.border-right-lighten-2 {\n  border-right: 1px solid #ff3333 !important;\n}.overlay-danger.overlay-lighten-2 {\n  background: #ff3333;\n  /* The Fallback */\n  background: rgba(255, 51, 51, 0.6);\n}.text-danger.text-lighten-1 {\n  color: #ff1a1a !important;\n}.bg-danger.bg-lighten-1 {\n  background-color: #ff1a1a !important;\n}.border-danger.border-lighten-1 {\n  border: 1px solid #ff1a1a !important;\n}.border-top-danger.border-top-lighten-1 {\n  border-top: 1px solid #ff1a1a !important;\n}.border-bottom-danger.border-bottom-lighten-1 {\n  border-bottom: 1px solid #ff1a1a !important;\n}.border-left-danger.border-left-lighten-1 {\n  border-left: 1px solid #ff1a1a !important;\n}.border-right-danger.border-right-lighten-1 {\n  border-right: 1px solid #ff1a1a !important;\n}.overlay-danger.overlay-lighten-1 {\n  background: #ff1a1a;\n  /* The Fallback */\n  background: rgba(255, 26, 26, 0.6);\n}.bg-danger {\n  background-color: #ff0000 !important;\n}.bg-danger .card-header,\n.bg-danger .card-footer {\n  background-color: transparent;\n}.alert-danger {\n  background: rgba(255, 0, 0, 0.12) !important;\n  color: #ff0000 !important;\n}.alert-danger .alert-heading {\n  box-shadow: rgba(255, 0, 0, 0.4) 0px 6px 15px -7px;\n}.alert-danger .alert-link {\n  color: #e60000 !important;\n}.alert-danger .close {\n  color: #ff0000 !important;\n}.bg-light-danger {\n  background: rgba(255, 0, 0, 0.12) !important;\n  color: #ff0000 !important;\n}.bg-light-danger.fc-h-event, .bg-light-danger.fc-v-event {\n  border-color: rgba(255, 0, 0, 0.1);\n}.bg-light-danger .fc-list-event-dot,\n.bg-light-danger .fc-daygrid-event-dot {\n  border-color: #ff0000 !important;\n}.bg-light-danger.fc-list-event:hover td {\n  background: rgba(255, 0, 0, 0.1) !important;\n}.bg-light-danger.fc-list-event .fc-list-event-title {\n  color: #6e6b7b;\n}.avatar.bg-light-danger {\n  color: #ff0000 !important;\n}.border-danger {\n  border: 1px solid #ff0000 !important;\n}.border-top-danger {\n  border-top: 1px solid #ff0000;\n}.border-bottom-danger {\n  border-bottom: 1px solid #ff0000;\n}.border-left-danger {\n  border-left: 1px solid #ff0000;\n}.border-right-danger {\n  border-right: 1px solid #ff0000;\n}.bg-danger.badge-glow,\n.border-danger.badge-glow,\n.badge-danger.badge-glow {\n  box-shadow: 0px 0px 10px #ff0000;\n}.badge.badge-light-danger {\n  background-color: rgba(255, 0, 0, 0.12);\n  color: #ff0000 !important;\n}.overlay-danger {\n  background: #ff0000;\n  /* The Fallback */\n  background: rgba(255, 0, 0, 0.6);\n}.btn-danger {\n  border-color: #ff0000 !important;\n  background-color: #ff0000 !important;\n  color: #fff !important;\n}.btn-danger:focus, .btn-danger:active, .btn-danger.active {\n  color: #fff;\n  background-color: #e60000 !important;\n}.btn-danger:hover:not(.disabled):not(:disabled) {\n  box-shadow: 0 8px 25px -8px red;\n}.btn-danger:not(:disabled):not(.disabled):active:focus {\n  box-shadow: none;\n}.btn-flat-danger {\n  background-color: transparent;\n  color: #ff0000;\n}.btn-flat-danger:hover {\n  color: #ff0000;\n}.btn-flat-danger:hover:not(.disabled):not(:disabled) {\n  background-color: rgba(255, 0, 0, 0.12);\n}.btn-flat-danger:active, .btn-flat-danger.active, .btn-flat-danger:focus {\n  background-color: rgba(255, 0, 0, 0.2);\n  color: #ff0000;\n}.btn-flat-danger.dropdown-toggle::after {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ff0000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-down'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\");\n}.btn-relief-danger {\n  background-color: #ff0000;\n  box-shadow: inset 0 -3px 0 0 rgba(34, 41, 47, 0.2);\n  color: #fff;\n  transition: all 0.2s ease;\n}.btn-relief-danger:hover:not(.disabled):not(:disabled) {\n  background-color: #ff1a1a;\n}.btn-relief-danger:active, .btn-relief-danger.active, .btn-relief-danger:focus {\n  background-color: #e60000;\n}.btn-relief-danger:hover {\n  color: #fff;\n}.btn-relief-danger:active, .btn-relief-danger.active {\n  outline: none;\n  box-shadow: none;\n  transform: translateY(3px);\n}.btn-outline-danger {\n  border: 1px solid #ff0000 !important;\n  background-color: transparent;\n  color: #ff0000;\n}.btn-outline-danger:hover:not(.disabled):not(:disabled) {\n  background-color: rgba(255, 0, 0, 0.04);\n  color: #ff0000;\n}.btn-outline-danger:not(:disabled):not(.disabled):active:focus {\n  box-shadow: none;\n}.btn-outline-danger:not(:disabled):not(.disabled):active, .btn-outline-danger:not(:disabled):not(.disabled).active, .btn-outline-danger:not(:disabled):not(.disabled):focus {\n  background-color: rgba(255, 0, 0, 0.2);\n  color: #ff0000;\n}.btn-outline-danger.dropdown-toggle::after {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ff0000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-down'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\");\n}.show > .btn-outline-danger.dropdown-toggle {\n  background-color: rgba(255, 0, 0, 0.2);\n  color: #ff0000;\n}.btn-outline-danger.waves-effect .waves-ripple,\n.btn-flat-danger.waves-effect .waves-ripple {\n  background: radial-gradient(rgba(255, 0, 0, 0.2) 0, rgba(255, 0, 0, 0.3) 40%, rgba(255, 0, 0, 0.4) 50%, rgba(255, 0, 0, 0.5) 60%, rgba(255, 255, 255, 0) 70%);\n}.bullet.bullet-danger {\n  background-color: #ff0000;\n}.modal.modal-danger .modal-header .modal-title {\n  color: #ff0000;\n}.modal.modal-danger .modal-header .close {\n  color: #ff0000 !important;\n}.pagination-danger .page-item.active .page-link {\n  background: #ff0000 !important;\n  color: #fff;\n}.pagination-danger .page-item.active .page-link:hover {\n  color: #fff;\n}.pagination-danger .page-item .page-link:hover {\n  color: #ff0000;\n}.pagination-danger .page-item.prev-item .page-link:hover, .pagination-danger .page-item.next-item .page-link:hover {\n  background: #ff0000;\n  color: #fff;\n}.pagination-danger .page-item.next-item .page-link:active:after, .pagination-danger .page-item.next-item .page-link:hover:after, .pagination-danger .page-item.next .page-link:active:after, .pagination-danger .page-item.next .page-link:hover:after {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ff0000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-right'%3E%3Cpolyline points='9 18 15 12 9 6'%3E%3C/polyline%3E%3C/svg%3E\") !important;\n}.pagination-danger .page-item.prev-item .page-link:active:before, .pagination-danger .page-item.prev-item .page-link:hover:before, .pagination-danger .page-item.prev .page-link:active:before, .pagination-danger .page-item.prev .page-link:hover:before {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ff0000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-left'%3E%3Cpolyline points='15 18 9 12 15 6'%3E%3C/polyline%3E%3C/svg%3E\") !important;\n}.nav-pill-danger .nav-item .nav-link.active {\n  color: #fff;\n  background-color: #ff0000 !important;\n  border-color: #ff0000;\n  box-shadow: 0 4px 18px -4px rgba(255, 0, 0, 0.65);\n}.progress-bar-danger {\n  background-color: rgba(255, 0, 0, 0.12);\n}.progress-bar-danger .progress-bar {\n  background-color: #ff0000;\n}.timeline .timeline-point-danger {\n  border-color: #ff0000 !important;\n}.timeline .timeline-point-danger i,\n.timeline .timeline-point-danger svg {\n  stroke: #ff0000 !important;\n}.timeline .timeline-point-danger.timeline-point-indicator {\n  background-color: #ff0000 !important;\n}.timeline .timeline-point-danger.timeline-point-indicator:before {\n  background: rgba(255, 0, 0, 0.12) !important;\n}.divider.divider-danger .divider-text:before, .divider.divider-danger .divider-text:after {\n  border-color: #ff0000 !important;\n}input:focus ~ .bg-danger {\n  box-shadow: 0 0 0 0.075rem #fff, 0 0 0 0.21rem #ff0000 !important;\n}.custom-control-danger .custom-control-input:checked ~ .custom-control-label::before,\n.custom-control-danger .custom-control-input:active ~ .custom-control-label::before {\n  border-color: #ff0000;\n  background-color: #ff0000;\n}.custom-control-danger.custom-checkbox .custom-control-input:checked ~ .custom-control-label::before,\n.custom-control-danger.custom-checkbox .custom-control-input:active ~ .custom-control-label::before,\n.custom-control-danger.custom-checkbox .custom-control-input:focus ~ .custom-control-label::before, .custom-control-danger.custom-radio .custom-control-input:checked ~ .custom-control-label::before,\n.custom-control-danger.custom-radio .custom-control-input:active ~ .custom-control-label::before,\n.custom-control-danger.custom-radio .custom-control-input:focus ~ .custom-control-label::before {\n  box-shadow: 0 2px 4px 0 rgba(255, 0, 0, 0.4) !important;\n}.custom-control-danger .custom-control-input:disabled:checked ~ .custom-control-label::before {\n  background-color: rgba(255, 0, 0, 0.65) !important;\n  border: none;\n  box-shadow: none !important;\n}.custom-control-danger .custom-control-input:focus ~ .custom-control-label::before {\n  border-color: #ff0000 !important;\n}.custom-switch-danger .custom-control-input:checked ~ .custom-control-label::before {\n  background-color: #ff0000 !important;\n  color: #fff;\n  transition: all 0.2s ease-out;\n}.select2-danger .select2-container--default .select2-selection--multiple .select2-selection__choice {\n  background: #ff0000 !important;\n  border-color: #ff0000 !important;\n}.text-danger.text-darken-1 {\n  color: #e60000 !important;\n}.bg-danger.bg-darken-1 {\n  background-color: #e60000 !important;\n}.border-danger.border-darken-1 {\n  border: 1px solid #e60000 !important;\n}.border-top-danger.border-top-darken-1 {\n  border-top: 1px solid #e60000 !important;\n}.border-bottom-danger.border-bottom-darken-1 {\n  border-bottom: 1px solid #e60000 !important;\n}.border-left-danger.border-left-darken-1 {\n  border-left: 1px solid #e60000 !important;\n}.border-right-danger.border-right-darken-1 {\n  border-right: 1px solid #e60000 !important;\n}.overlay-danger.overlay-darken-1 {\n  background: #e60000;\n  /* The Fallback */\n  background: rgba(230, 0, 0, 0.6);\n}.text-danger.text-darken-2 {\n  color: #cc0000 !important;\n}.bg-danger.bg-darken-2 {\n  background-color: #cc0000 !important;\n}.border-danger.border-darken-2 {\n  border: 1px solid #cc0000 !important;\n}.border-top-danger.border-top-darken-2 {\n  border-top: 1px solid #cc0000 !important;\n}.border-bottom-danger.border-bottom-darken-2 {\n  border-bottom: 1px solid #cc0000 !important;\n}.border-left-danger.border-left-darken-2 {\n  border-left: 1px solid #cc0000 !important;\n}.border-right-danger.border-right-darken-2 {\n  border-right: 1px solid #cc0000 !important;\n}.overlay-danger.overlay-darken-2 {\n  background: #cc0000;\n  /* The Fallback */\n  background: rgba(204, 0, 0, 0.6);\n}.text-danger.text-darken-3 {\n  color: #b30000 !important;\n}.bg-danger.bg-darken-3 {\n  background-color: #b30000 !important;\n}.border-danger.border-darken-3 {\n  border: 1px solid #b30000 !important;\n}.border-top-danger.border-top-darken-3 {\n  border-top: 1px solid #b30000 !important;\n}.border-bottom-danger.border-bottom-darken-3 {\n  border-bottom: 1px solid #b30000 !important;\n}.border-left-danger.border-left-darken-3 {\n  border-left: 1px solid #b30000 !important;\n}.border-right-danger.border-right-darken-3 {\n  border-right: 1px solid #b30000 !important;\n}.overlay-danger.overlay-darken-3 {\n  background: #b30000;\n  /* The Fallback */\n  background: rgba(179, 0, 0, 0.6);\n}.text-danger.text-darken-4 {\n  color: #990000 !important;\n}.bg-danger.bg-darken-4 {\n  background-color: #990000 !important;\n}.border-danger.border-darken-4 {\n  border: 1px solid #990000 !important;\n}.border-top-danger.border-top-darken-4 {\n  border-top: 1px solid #990000 !important;\n}.border-bottom-danger.border-bottom-darken-4 {\n  border-bottom: 1px solid #990000 !important;\n}.border-left-danger.border-left-darken-4 {\n  border-left: 1px solid #990000 !important;\n}.border-right-danger.border-right-darken-4 {\n  border-right: 1px solid #990000 !important;\n}.overlay-danger.overlay-darken-4 {\n  background: #990000;\n  /* The Fallback */\n  background: rgba(153, 0, 0, 0.6);\n}.text-danger.text-accent-1 {\n  color: #ffeef1 !important;\n}.bg-danger.bg-accent-1 {\n  background-color: #ffeef1 !important;\n}.border-danger.border-accent-1 {\n  border: 1px solid #ffeef1 !important;\n}.border-top-danger.border-top-accent-1 {\n  border-top: 1px solid #ffeef1 !important;\n}.border-bottom-danger.border-bottom-accent-1 {\n  border-bottom: 1px solid #ffeef1 !important;\n}.border-left-danger.border-left-accent-1 {\n  border-left: 1px solid #ffeef1 !important;\n}.border-right-danger.border-right-accent-1 {\n  border-right: 1px solid #ffeef1 !important;\n}.overlay-danger.overlay-accent-1 {\n  background: #ffeef1;\n  /* The Fallback */\n  background: rgba(255, 238, 241, 0.6);\n}.text-danger.text-accent-2 {\n  color: #ffd6db !important;\n}.bg-danger.bg-accent-2 {\n  background-color: #ffd6db !important;\n}.border-danger.border-accent-2 {\n  border: 1px solid #ffd6db !important;\n}.border-top-danger.border-top-accent-2 {\n  border-top: 1px solid #ffd6db !important;\n}.border-bottom-danger.border-bottom-accent-2 {\n  border-bottom: 1px solid #ffd6db !important;\n}.border-left-danger.border-left-accent-2 {\n  border-left: 1px solid #ffd6db !important;\n}.border-right-danger.border-right-accent-2 {\n  border-right: 1px solid #ffd6db !important;\n}.overlay-danger.overlay-accent-2 {\n  background: #ffd6db;\n  /* The Fallback */\n  background: rgba(255, 214, 219, 0.6);\n}.text-danger.text-accent-3 {\n  color: #ffecee !important;\n}.bg-danger.bg-accent-3 {\n  background-color: #ffecee !important;\n}.border-danger.border-accent-3 {\n  border: 1px solid #ffecee !important;\n}.border-top-danger.border-top-accent-3 {\n  border-top: 1px solid #ffecee !important;\n}.border-bottom-danger.border-bottom-accent-3 {\n  border-bottom: 1px solid #ffecee !important;\n}.border-left-danger.border-left-accent-3 {\n  border-left: 1px solid #ffecee !important;\n}.border-right-danger.border-right-accent-3 {\n  border-right: 1px solid #ffecee !important;\n}.overlay-danger.overlay-accent-3 {\n  background: #ffecee;\n  /* The Fallback */\n  background: rgba(255, 236, 238, 0.6);\n}.text-danger.text-accent-4 {\n  color: #ffd3d7 !important;\n}.bg-danger.bg-accent-4 {\n  background-color: #ffd3d7 !important;\n}.border-danger.border-accent-4 {\n  border: 1px solid #ffd3d7 !important;\n}.border-top-danger.border-top-accent-4 {\n  border-top: 1px solid #ffd3d7 !important;\n}.border-bottom-danger.border-bottom-accent-4 {\n  border-bottom: 1px solid #ffd3d7 !important;\n}.border-left-danger.border-left-accent-4 {\n  border-left: 1px solid #ffd3d7 !important;\n}.border-right-danger.border-right-accent-4 {\n  border-right: 1px solid #ffd3d7 !important;\n}.overlay-danger.overlay-accent-4 {\n  background: #ffd3d7;\n  /* The Fallback */\n  background: rgba(255, 211, 215, 0.6);\n}.bg-gradient-dark,\n.btn-gradient-dark {\n  color: #fff;\n  transition: all 0.2s ease;\n  background-image: linear-gradient(47deg, #4b4b4b, #1e1e1e);\n  background-repeat: repeat-x;\n  background-repeat: repeat;\n}.dark-layout .bg-gradient-dark,\n.dark-layout .btn-gradient-dark {\n  background-image: linear-gradient(47deg, #1e1e1e, #4b4b4b);\n  background-repeat: repeat-x;\n  background-repeat: repeat;\n}.bg-gradient-dark:hover, .bg-gradient-dark:active,\n.btn-gradient-dark:hover,\n.btn-gradient-dark:active {\n  color: #fff;\n}.bg-gradient-dark:hover:not(.disabled):not(:disabled),\n.btn-gradient-dark:hover:not(.disabled):not(:disabled) {\n  transform: translateY(-2px);\n}.bg-gradient-dark:active,\n.btn-gradient-dark:active {\n  transform: translateY(0);\n}.bg-gradient-dark:active, .bg-gradient-dark:focus,\n.btn-gradient-dark:active,\n.btn-gradient-dark:focus {\n  background-image: linear-gradient(47deg, #1e1e1e, #4b4b4b);\n  background-repeat: repeat-x;\n  background-repeat: repeat;\n}.bg-gradient-primary,\n.btn-gradient-primary {\n  color: #fff;\n  transition: all 0.2s ease;\n  background-image: linear-gradient(47deg, #C21858, #e4296f);\n  background-repeat: repeat-x;\n  background-repeat: repeat;\n}.bg-gradient-primary:hover, .bg-gradient-primary:active,\n.btn-gradient-primary:hover,\n.btn-gradient-primary:active {\n  color: #fff;\n}.bg-gradient-primary:hover:not(.disabled):not(:disabled),\n.btn-gradient-primary:hover:not(.disabled):not(:disabled) {\n  transform: translateY(-2px);\n}.bg-gradient-primary:active,\n.btn-gradient-primary:active {\n  transform: translateY(0);\n}.bg-gradient-primary:active, .bg-gradient-primary:focus,\n.btn-gradient-primary:active,\n.btn-gradient-primary:focus {\n  background-image: linear-gradient(47deg, #951243, #C21858);\n  background-repeat: repeat-x;\n  background-repeat: repeat;\n}.bg-gradient-secondary,\n.btn-gradient-secondary {\n  color: #fff;\n  transition: all 0.2s ease;\n  background-image: linear-gradient(47deg, #82868b, #9ca0a4);\n  background-repeat: repeat-x;\n  background-repeat: repeat;\n}.bg-gradient-secondary:hover, .bg-gradient-secondary:active,\n.btn-gradient-secondary:hover,\n.btn-gradient-secondary:active {\n  color: #fff;\n}.bg-gradient-secondary:hover:not(.disabled):not(:disabled),\n.btn-gradient-secondary:hover:not(.disabled):not(:disabled) {\n  transform: translateY(-2px);\n}.bg-gradient-secondary:active,\n.btn-gradient-secondary:active {\n  transform: translateY(0);\n}.bg-gradient-secondary:active, .bg-gradient-secondary:focus,\n.btn-gradient-secondary:active,\n.btn-gradient-secondary:focus {\n  background-image: linear-gradient(47deg, #696d71, #82868b);\n  background-repeat: repeat-x;\n  background-repeat: repeat;\n}.bg-gradient-success,\n.btn-gradient-success {\n  color: #fff;\n  transition: all 0.2s ease;\n  background-image: linear-gradient(47deg, #28c76f, #48da89);\n  background-repeat: repeat-x;\n  background-repeat: repeat;\n}.bg-gradient-success:hover, .bg-gradient-success:active,\n.btn-gradient-success:hover,\n.btn-gradient-success:active {\n  color: #fff;\n}.bg-gradient-success:hover:not(.disabled):not(:disabled),\n.btn-gradient-success:hover:not(.disabled):not(:disabled) {\n  transform: translateY(-2px);\n}.bg-gradient-success:active,\n.btn-gradient-success:active {\n  transform: translateY(0);\n}.bg-gradient-success:active, .bg-gradient-success:focus,\n.btn-gradient-success:active,\n.btn-gradient-success:focus {\n  background-image: linear-gradient(47deg, #1f9d57, #28c76f);\n  background-repeat: repeat-x;\n  background-repeat: repeat;\n}.bg-gradient-info,\n.btn-gradient-info {\n  color: #fff;\n  transition: all 0.2s ease;\n  background-image: linear-gradient(47deg, #00cfe8, #1ce7ff);\n  background-repeat: repeat-x;\n  background-repeat: repeat;\n}.bg-gradient-info:hover, .bg-gradient-info:active,\n.btn-gradient-info:hover,\n.btn-gradient-info:active {\n  color: #fff;\n}.bg-gradient-info:hover:not(.disabled):not(:disabled),\n.btn-gradient-info:hover:not(.disabled):not(:disabled) {\n  transform: translateY(-2px);\n}.bg-gradient-info:active,\n.btn-gradient-info:active {\n  transform: translateY(0);\n}.bg-gradient-info:active, .bg-gradient-info:focus,\n.btn-gradient-info:active,\n.btn-gradient-info:focus {\n  background-image: linear-gradient(47deg, #00a1b5, #00cfe8);\n  background-repeat: repeat-x;\n  background-repeat: repeat;\n}.bg-gradient-warning,\n.btn-gradient-warning {\n  color: #fff;\n  transition: all 0.2s ease;\n  background-image: linear-gradient(47deg, #ff9f43, #ffb976);\n  background-repeat: repeat-x;\n  background-repeat: repeat;\n}.bg-gradient-warning:hover, .bg-gradient-warning:active,\n.btn-gradient-warning:hover,\n.btn-gradient-warning:active {\n  color: #fff;\n}.bg-gradient-warning:hover:not(.disabled):not(:disabled),\n.btn-gradient-warning:hover:not(.disabled):not(:disabled) {\n  transform: translateY(-2px);\n}.bg-gradient-warning:active,\n.btn-gradient-warning:active {\n  transform: translateY(0);\n}.bg-gradient-warning:active, .bg-gradient-warning:focus,\n.btn-gradient-warning:active,\n.btn-gradient-warning:focus {\n  background-image: linear-gradient(47deg, #ff8510, #ff9f43);\n  background-repeat: repeat-x;\n  background-repeat: repeat;\n}.bg-gradient-danger,\n.btn-gradient-danger {\n  color: #fff;\n  transition: all 0.2s ease;\n  background-image: linear-gradient(47deg, #ff0000, #ff3333);\n  background-repeat: repeat-x;\n  background-repeat: repeat;\n}.bg-gradient-danger:hover, .bg-gradient-danger:active,\n.btn-gradient-danger:hover,\n.btn-gradient-danger:active {\n  color: #fff;\n}.bg-gradient-danger:hover:not(.disabled):not(:disabled),\n.btn-gradient-danger:hover:not(.disabled):not(:disabled) {\n  transform: translateY(-2px);\n}.bg-gradient-danger:active,\n.btn-gradient-danger:active {\n  transform: translateY(0);\n}.bg-gradient-danger:active, .bg-gradient-danger:focus,\n.btn-gradient-danger:active,\n.btn-gradient-danger:focus {\n  background-image: linear-gradient(47deg, #cc0000, #ff0000);\n  background-repeat: repeat-x;\n  background-repeat: repeat;\n}.ng-select.ng-select-focused {\n  outline: 0;\n  box-shadow: 0 3px 10px 0 rgba(34, 41, 47, 0.1);\n}.ng-select.ng-select-focused .ng-select-container {\n  border-color: #C21858 !important;\n  z-index: 2000 !important;\n  box-shadow: none !important;\n  color: #6e6b7b !important;\n  min-height: 38px !important;\n}.ng-select .ng-select-container {\n  color: #6e6b7b !important;\n  min-height: 38px !important;\n}.ng-select.error .ng-select-container {\n  border-color: #ff0000 !important;\n}.ng-select.ng-select-multiple .ng-value {\n  background-color: #C21858 !important;\n  color: #fff;\n  border: none !important;\n  font-size: 0.8rem !important;\n  border-radius: 4px !important;\n  display: flex;\n  align-items: center;\n}.ng-select.ng-select-multiple .ng-value .ng-value-icon.right {\n  border: 0 !important;\n}.ng-select.ng-select-multiple .ng-value .ng-value-icon.left {\n  border: 0 !important;\n}.ng-select.ng-select-multiple .ng-value .ng-value-icon:hover {\n  background-color: transparent !important;\n}.ng-select.ng-select-multiple .ng-value .ng-value-icon.left {\n  font-size: 1.1rem !important;\n}.ng-select.ng-select-multiple .ng-value .ng-value-icon.right {\n  font-size: 1.1rem !important;\n}.ng-select.ng-select-multiple .ng-select-container .ng-placeholder {\n  top: 8px !important;\n}.ng-select.ng-select-size-lg .ng-select-container {\n  min-height: 48px;\n  font-size: 1.2rem !important;\n}.ng-select.ng-select-size-lg .ng-select-container .ng-value {\n  font-size: 1.2rem !important;\n  padding: 7px;\n}.ng-select.ng-select-size-lg .ng-select-container .ng-value .ng-value-icon.left {\n  font-size: 1.1rem !important;\n}.ng-select.ng-select-size-lg .ng-select-container .ng-value .ng-value-icon.right {\n  font-size: 1.1rem !important;\n}.ng-select.ng-select-size-lg .ng-select-container .ng-clear-wrapper {\n  height: 22px !important;\n}.ng-select.ng-select-size-sm .ng-select-container {\n  min-height: 28px !important;\n  font-size: 0.75rem;\n}.ng-select.ng-select-size-sm .ng-select-container .ng-value {\n  padding: 0px;\n  font-size: 0.9em !important;\n}.ng-select.ng-select-size-sm .ng-select-container .ng-value .ng-value-icon.left {\n  font-size: 0.9em !important;\n}.ng-select.ng-select-size-sm .ng-select-container .ng-value .ng-value-icon.right {\n  font-size: 0.9em !important;\n}.ng-select .ng-option.ng-option-selected {\n  background-color: #C21858 !important;\n  color: #fff !important;\n}.ng-select .ng-option.ng-option-selected.ng-option-marked {\n  background-color: #C21858 !important;\n  color: #fff !important;\n}.ng-select .ng-option.ng-option-selected .ng-option-label {\n  font-weight: inherit !important;\n}.ng-select .ng-option.ng-option-marked {\n  background-color: rgba(194, 24, 88, 0.12) !important;\n  color: #C21858 !important;\n}.ng-select .ng-option.ng-option-disabled {\n  color: #b9b9c3 !important;\n}.ng-select .ng-arrow {\n  background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaBAMAAABbZFH9AAAAG1BMVEUAAACRkZGRkZGSkpKRkZGSkpKSkpKRkZGRkZHLso+9AAAACHRSTlMA+1JoWo0vLFQDmmkAAABlSURBVBjTY6ALSACTbBAOazOYsggAUxEdBkCSuaMVxGGX6BABUo4djQUgrmJHhwFQqkMIrJJJoqOZwaKjUQHIhkg6g6QggEWiQ7Cj0QHIgkpCpaA6wbrgkiAphKSgArJTXRhoBgB9GRPswyvBqAAAAABJRU5ErkJggg==\");\n  background-size: 12px 12px, 10px 10px;\n  background-repeat: no-repeat;\n  height: 0.8rem !important;\n  padding-right: 1.5rem;\n  margin-left: 0;\n  margin-top: 0;\n  left: 0;\n  border-style: none !important;\n}.ng-select.ng-select-opened > .ng-select-container .ng-arrow {\n  top: 0px !important;\n}.ng-select .ng-clear-wrapper {\n  height: 18px;\n}.dark-layout .ng-select-container {\n  background-color: #283046;\n  border-color: #3b4253;\n  color: #676d7d;\n}.dark-layout .ng-select-container .ng-placeholder {\n  color: #676d7d !important;\n}.dark-layout .ng-select.ng-select-multiple .ng-value {\n  background-color: rgba(194, 24, 88, 0.12) !important;\n  color: #C21858 !important;\n}.dark-layout .ng-dropdown-header {\n  background-color: #161d31;\n  border-color: #3b4253;\n}.dark-layout .ng-dropdown-footer {\n  background-color: #161d31;\n  border-color: #3b4253;\n}.dark-layout .ng-select.ng-select-opened > .ng-select-container {\n  background-color: #161d31;\n}.dark-layout .ng-option {\n  background-color: #283046 !important;\n  color: #b4b7bd !important;\n}.dark-layout .ng-option.ng-option-disabled {\n  color: #676d7d !important;\n}.dark-layout ng-dropdown-panel {\n  border-color: #3b4253 !important;\n}.dark-layout ng-dropdown-panel .ng-dropdown-panel-items {\n  background-color: #161d31 !important;\n}.dark-layout ng-dropdown-panel .ng-dropdown-panel-items .ng-optgroup {\n  color: #676d7d !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9Abmctc2VsZWN0L25nLXNlbGVjdC90aGVtZXMvZGVmYXVsdC50aGVtZS5jc3MiLCIuLlxcLi5cXC4uXFwuLlxcLi5cXEBjb3JlXFxzY3NzXFxiYXNlXFxjb3JlXFxjb2xvcnNcXF9wYWxldHRlLnNjc3MiLCJjdXN0b21lci1sZWRnZXIuY29tcG9uZW50LnNjc3MiLCIuLlxcLi5cXC4uXFwuLlxcLi5cXEBjb3JlXFxzY3NzXFxiYXNlXFxjb3JlXFxtaXhpbnNcXGhleDJyZ2Iuc2NzcyIsIi4uXFwuLlxcLi5cXC4uXFwuLlxcQGNvcmVcXHNjc3NcXGJhc2VcXGNvcmVcXGNvbG9yc1xccGFsZXR0ZS12YXJpYWJsZXMuc2NzcyIsIi4uXFwuLlxcLi5cXC4uXFwuLlxcQGNvcmVcXHNjc3NcXGJhc2VcXGNvcmVcXG1peGluc1xcYWxlcnQuc2NzcyIsIi4uXFwuLlxcLi5cXC4uXFwuLlxcQGNvcmVcXHNjc3NcXGJhc2VcXGJvb3RzdHJhcC1leHRlbmRlZFxcX3ZhcmlhYmxlcy5zY3NzIiwiLi5cXC4uXFwuLlxcLi5cXC4uXFxAY29yZVxcc2Nzc1xcYmFzZVxcY29yZVxcY29sb3JzXFxwYWxldHRlLWdyYWRpZW50LnNjc3MiLCIuLlxcLi5cXC4uXFwuLlxcLi5cXC4uXFxub2RlX21vZHVsZXNcXGJvb3RzdHJhcFxcc2Nzc1xcbWl4aW5zXFxfZ3JhZGllbnRzLnNjc3MiLCIuLlxcLi5cXC4uXFwuLlxcLi5cXEBjb3JlXFxzY3NzXFxhbmd1bGFyXFxsaWJzXFxzZWxlY3QuY29tcG9uZW50LnNjc3MiLCIuLlxcLi5cXC4uXFwuLlxcLi5cXEBjb3JlXFxzY3NzXFxiYXNlXFxjb21wb25lbnRzXFxfdmFyaWFibGVzLWRhcmsuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxpREFBaUQsZUFBZSxDQUFDLGlDQUFpQyxDQUFDLHVEQUF1RCxlQUFlLENBQUMsMkRBQTJELFFBQVEsQ0FBQyx5Q0FBeUMsQ0FBQyxzQkFBc0IsQ0FBQyxpRUFBaUUseUNBQXlDLENBQUMsa0VBQWtFLDRCQUE0QixDQUFDLDJCQUEyQixDQUFDLCtEQUErRCx5QkFBeUIsQ0FBQyx3QkFBd0IsQ0FBQyx5RUFBeUUsb0JBQW9CLENBQUMsMEVBQTBFLENBQUMsbURBQW1ELHdCQUF3QixDQUFDLHlDQUF5QyxZQUFZLENBQUMsZ0NBQWdDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsc0NBQXNDLG1DQUFtQyxDQUFDLG9EQUFvRCxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxnRUFBZ0Usa0JBQWtCLENBQUMsY0FBYyxDQUFDLG9FQUFvRSxVQUFVLENBQUMsaURBQWlELFdBQVcsQ0FBQywrRUFBK0UsT0FBTyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FBQywyRkFBMkYsa0JBQWtCLENBQUMsaUJBQWlCLENBQUMsb0dBQW9HLHdCQUF3QixDQUFDLHdCQUF3QixDQUFDLG9IQUFvSCxhQUFhLENBQUMsdUVBQXVFLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxtRkFBbUYsaUJBQWlCLENBQUMsY0FBYyxDQUFDLGlGQUFpRixjQUFjLENBQUMsaUJBQWlCLENBQUMsd0JBQXdCLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsNkZBQTZGLGNBQWMsQ0FBQyxlQUFlLENBQUMsbUdBQW1HLHdCQUF3QixDQUFDLG1IQUFtSCxnQkFBZ0IsQ0FBQywrSEFBK0gsY0FBYyxDQUFDLGlCQUFpQixDQUFDLGlHQUFpRyxvQkFBb0IsQ0FBQyxlQUFlLENBQUMsZ0dBQWdHLG9CQUFvQixDQUFDLGVBQWUsQ0FBQyxzR0FBc0csd0JBQXdCLENBQUMscUdBQXFHLDhCQUE4QixDQUFDLGlIQUFpSCw2QkFBNkIsQ0FBQyxpQkFBaUIsQ0FBQyxzR0FBc0csNkJBQTZCLENBQUMsa0hBQWtILGFBQWEsQ0FBQyw4QkFBOEIsQ0FBQyxpRkFBaUYsbUJBQW1CLENBQUMsNkZBQTZGLG1CQUFtQixDQUFDLHVGQUF1RixPQUFPLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsbUdBQW1HLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyw2QkFBNkIsVUFBVSxDQUFDLDZDQUE2QyxhQUFhLENBQUMsNEJBQTRCLG1CQUFtQixDQUFDLHdDQUF3QyxtQkFBbUIsQ0FBQyw2QkFBNkIsVUFBVSxDQUFDLGlCQUFpQixDQUFDLHlDQUF5QyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsNkNBQTZDLHFCQUFxQixDQUFDLHVDQUF1Qyx5Q0FBeUMsQ0FBQyxrQkFBa0IsQ0FBQywwQkFBMEIsQ0FBQyxtQkFBbUIscUJBQXFCLENBQUMscUJBQXFCLENBQUMsbUNBQW1DLENBQUMsTUFBTSxDQUFDLG9DQUFvQyxRQUFRLENBQUMsOEJBQThCLENBQUMsNkJBQTZCLENBQUMsd0JBQXdCLENBQUMsZUFBZSxDQUFDLG1GQUFtRiw4QkFBOEIsQ0FBQyw2QkFBNkIsQ0FBQyxpQ0FBaUMsV0FBVyxDQUFDLDJCQUEyQixDQUFDLDBCQUEwQixDQUFDLDJCQUEyQixDQUFDLGtCQUFrQixDQUFDLGlGQUFpRiwyQkFBMkIsQ0FBQywwQkFBMEIsQ0FBQyx1Q0FBdUMsNEJBQTRCLENBQUMsZUFBZSxDQUFDLHVDQUF1Qyx5QkFBeUIsQ0FBQyxlQUFlLENBQUMseURBQXlELHdCQUFnQixDQUFoQixxQkFBZ0IsQ0FBaEIsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLHNCQUFzQixDQUFDLGNBQWMsQ0FBQyw0RUFBNEUsY0FBYyxDQUFDLDBFQUEwRSx3QkFBd0IsQ0FBQyx5S0FBeUssd0JBQXdCLENBQUMsZUFBZSxDQUFDLHVEQUF1RCxxQkFBcUIsQ0FBQyxzQkFBc0IsQ0FBQyxnQkFBZ0IsQ0FBQyxxS0FBcUssVUFBVSxDQUFDLHdCQUF3QixDQUFDLHVNQUF1TSxlQUFlLENBQUMsd0VBQXdFLHdCQUF3QixDQUFDLFVBQVUsQ0FBQywwRUFBMEUsVUFBVSxDQUFDLHVFQUF1RSxpQkFBaUIsQ0FBQyxtRkFBbUYsa0JBQWtCLENBQUMsY0FBYyxDQUFDLHFFQUFxRSxhQUFhLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLGlGQUFpRixnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsK0JBQStCLGFBQWEsQ0FBQyxnQkFBZ0IsQ0MrQ3A0TztFQUNFLG9DQUFBO0FDN0NSLENEK0NROztFQUVFLDZCQUFBO0FDN0NWLENEMkdNO0VBQ0Usb0NBQUE7QUN4R1IsQ0QyR007RUFDRSw2QkFBQTtBQ3hHUixDRDJHTTtFQUNFLGdDQUFBO0FDeEdSLENEMkdNO0VBQ0UsOEJBQUE7QUN4R1IsQ0QyR007RUFDRSwrQkFBQTtBQ3hHUixDRCtHUTs7O0VBQ0UsZ0NBQUE7QUMxR1YsQ0QwSE07RUUxSkosbUJDaUhPO0VEakhhLGlCQUFBO0VBQ3BCLG9DQUFBO0FEcUNGLENEc1pNO0VBQ0UsaUVBQUE7QUNuWlIsQ0RJTTtFQUNFLG9DQUFBO0FDRFIsQ0RHUTs7RUFFRSw2QkFBQTtBQ0RWLENEK0RNO0VBQ0Usb0NBQUE7QUM1RFIsQ0QrRE07RUFDRSw2QkFBQTtBQzVEUixDRCtETTtFQUNFLGdDQUFBO0FDNURSLENEK0RNO0VBQ0UsOEJBQUE7QUM1RFIsQ0QrRE07RUFDRSwrQkFBQTtBQzVEUixDRG1FUTs7O0VBQ0UsZ0NBQUE7QUM5RFYsQ0Q4RU07RUUxSkosbUJDaUhPO0VEakhhLGlCQUFBO0VBQ3BCLDhCQUFBO0FEaUZGLENEMFdNO0VBQ0UsaUVBQUE7QUN2V1IsQ0R4Q007RUFDRSxvQ0FBQTtBQzJDUixDRHpDUTs7RUFFRSw2QkFBQTtBQzJDVixDRHJDUTtFQUNFLDZDQUFBO0VBQ0EseUJBQUE7QUN3Q1YsQ0R0Q1U7RUkzRFIsbURBQUE7QUhvR0YsQ0RyQ1U7RUFDRSx5QkFBQTtBQ3VDWixDRG5DVTtFQUNFLHlCQUFBO0FDcUNaLENES007RUFDRSxvQ0FBQTtBQ0ZSLENES007RUFDRSw2QkFBQTtBQ0ZSLENES007RUFDRSxnQ0FBQTtBQ0ZSLENES007RUFDRSw4QkFBQTtBQ0ZSLENES007RUFDRSwrQkFBQTtBQ0ZSLENEU1E7OztFQUNFLGdDQUFBO0FDSlYsQ0RZVTtFQUNFLHdDQUFBO0VBQ0EseUJBQUE7QUNUWixDRGVNO0VFMUpKLG1CQ2lITztFRGpIYSxpQkFBQTtFQUNwQixpQ0FBQTtBRGdKRixDRGVRO0VBQ0UsZ0NBQUE7RUFDQSxvQ0FBQTtFQUNBLHNCQUFBO0FDWlYsQ0RjVTtFQUdFLFdLOUpKO0VMK0pJLG9DQUFBO0FDZFosQ0RpQlU7RUFDRSxtQ0FBQTtBQ2ZaLENEa0JVO0VBQ0UsZ0JBQUE7QUNoQlosQ0R1QlE7RUFDRSw2QkFBQTtFQUNBLGNHekVEO0FGcURULENEc0JVO0VBQ0UsY0c1RUg7QUZ3RFQsQ0R1QlU7RUFDRSx3Q0FBQTtBQ3JCWixDRHdCVTtFQUdFLHVDQUFBO0VBQ0EsY0d2Rkg7QUYrRFQsQ0QyQlU7RUFDRSwrU0FBQTtBQ3pCWixDRGdDUTtFQUNFLHlCR25HRDtFSG9HQyxrREFBQTtFQUNBLFdLNU1GO0VMNk1FLHlCQUFBO0FDN0JWLENEK0JZO0VBQ0UseUJBQUE7QUM3QmQsQ0RvQ1U7RUFHRSx5QkFBQTtBQ3BDWixDRHVDVTtFQUNFLFdLOU5KO0FKeUxSLENEdUNVO0VBRUUsYUFBQTtFQUNBLGdCQUFBO0VBQ0EsMEJBQUE7QUN0Q1osQ0Q2Q1E7RUFDRSxvQ0FBQTtFQUNBLDZCQUFBO0VBQ0EsY0d2SUQ7QUY2RlQsQ0Q0Q1U7RUFDRSx3Q0FBQTtFQUNBLGNHM0lIO0FGaUdULENENENVO0VBQ0UsZ0JBQUE7QUMxQ1osQ0Q0Q1U7RUFHRSx1Q0FBQTtFQUNBLGNHcEpIO0FGd0dULENEK0NVO0VBQ0UsK1NBQUE7QUM3Q1osQ0RnRFU7RUFDRSx1Q0FBQTtFQUNBLGNHN0pIO0FGK0dULENEd0RZOztFQUNFLGlLQUFBO0FDcERkLENEbUVVO0VBQ0UseUJHeExIO0FGd0hULENEMEVjO0VBQ0UsY0duTVA7QUY0SFQsQ0R5RWM7RUFDRSx5QkFBQTtBQ3ZFaEIsQ0Q4SlE7RUFDRSx3Q0FBQTtBQzNKVixDRDZKVTtFQUNFLHlCR2pTSDtBRnNJVCxDRG1LVTtFQUNFLGdDQUFBO0FDaEtaLENEa0tZOztFQUVFLDBCQUFBO0FDaEtkLENEbUtZO0VBQ0Usb0NBQUE7QUNqS2QsQ0RrS2M7RUFDRSw2Q0FBQTtBQ2hLaEIsQ0QyS1k7RUFFRSxnQ0FBQTtBQ3pLZCxDRG1MTTtFQUNFLGlFQUFBO0FDaExSLENEc0xVOztFQUVFLHFCR3BWSDtFSHFWRyx5QkdyVkg7QUZrS1QsQ0R1TFk7Ozs7O0VBR0Usd0RBQUE7QUNuTGQsQ0RzTFU7RUFDRSxtREFBQTtFQUNBLFlBQUE7RUFDQSwyQkFBQTtBQ3BMWixDRHNMVTtFQUNFLGdDQUFBO0FDcExaLENENExVO0VBQ0Usb0NBQUE7RUFDQSxXS3RkSjtFTHVkSSw2QkFBQTtBQ3pMWixDRG1NYztFQUNFLDhCQUFBO0VBQ0EsZ0NBQUE7QUNoTWhCLENEdU1NO0VBQ0UseUJBQUE7QUNwTVIsQ0R1TU07RUFDRSxvQ0FBQTtBQ3BNUixDRHVNTTtFQUNFLG9DQUFBO0FDcE1SLENEdU1NO0VBQ0Usd0NBQUE7QUNwTVIsQ0R1TU07RUFDRSwyQ0FBQTtBQ3BNUixDRHVNTTtFQUNFLHlDQUFBO0FDcE1SLENEdU1NO0VBQ0UsMENBQUE7QUNwTVIsQ0R1TU07RUVoaEJKLG1CQ2lITztFRGpIYSxpQkFBQTtFQUNwQixpQ0FBQTtBRDhVRixDRHFLTTtFQUNFLHlCQUFBO0FDbEtSLENEcUtNO0VBQ0Usb0NBQUE7QUNsS1IsQ0RxS007RUFDRSxvQ0FBQTtBQ2xLUixDRHFLTTtFQUNFLHdDQUFBO0FDbEtSLENEcUtNO0VBQ0UsMkNBQUE7QUNsS1IsQ0RxS007RUFDRSx5Q0FBQTtBQ2xLUixDRHFLTTtFQUNFLDBDQUFBO0FDbEtSLENEcUtNO0VFaGhCSixtQkNpSE87RURqSGEsaUJBQUE7RUFDcEIsaUNBQUE7QURnWEYsQ0RtSU07RUFDRSx5QkFBQTtBQ2hJUixDRG1JTTtFQUNFLG9DQUFBO0FDaElSLENEbUlNO0VBQ0Usb0NBQUE7QUNoSVIsQ0RtSU07RUFDRSx3Q0FBQTtBQ2hJUixDRG1JTTtFQUNFLDJDQUFBO0FDaElSLENEbUlNO0VBQ0UseUNBQUE7QUNoSVIsQ0RtSU07RUFDRSwwQ0FBQTtBQ2hJUixDRG1JTTtFRWhoQkosbUJDaUhPO0VEakhhLGlCQUFBO0VBQ3BCLGlDQUFBO0FEa1pGLENEcldNO0VBQ0Usb0NBQUE7QUN3V1IsQ0R0V1E7O0VBRUUsNkJBQUE7QUN3V1YsQ0QxU007RUFDRSxvQ0FBQTtBQzZTUixDRDFTTTtFQUNFLDZCQUFBO0FDNlNSLENEMVNNO0VBQ0UsZ0NBQUE7QUM2U1IsQ0QxU007RUFDRSw4QkFBQTtBQzZTUixDRDFTTTtFQUNFLCtCQUFBO0FDNlNSLENEdFNROzs7RUFDRSxnQ0FBQTtBQzJTVixDRDNSTTtFRTFKSixtQkNpSE87RURqSGEsaUJBQUE7RUFDcEIsb0NBQUE7QUQwYkYsQ0RDTTtFQUNFLGlFQUFBO0FDRVIsQ0RxRE07RUFDRSx5QkFBQTtBQ2xEUixDRHFETTtFQUNFLG9DQUFBO0FDbERSLENEcURNO0VBQ0Usb0NBQUE7QUNsRFIsQ0RxRE07RUFDRSx3Q0FBQTtBQ2xEUixDRHFETTtFQUNFLDJDQUFBO0FDbERSLENEcURNO0VBQ0UseUNBQUE7QUNsRFIsQ0RxRE07RUFDRSwwQ0FBQTtBQ2xEUixDRHFETTtFRWhoQkosbUJDaUhPO0VEakhhLGlCQUFBO0VBQ3BCLG9DQUFBO0FEZ2VGLENEbUJNO0VBQ0UseUJBQUE7QUNoQlIsQ0RtQk07RUFDRSxvQ0FBQTtBQ2hCUixDRG1CTTtFQUNFLG9DQUFBO0FDaEJSLENEbUJNO0VBQ0Usd0NBQUE7QUNoQlIsQ0RtQk07RUFDRSwyQ0FBQTtBQ2hCUixDRG1CTTtFQUNFLHlDQUFBO0FDaEJSLENEbUJNO0VBQ0UsMENBQUE7QUNoQlIsQ0RtQk07RUVoaEJKLG1CQ2lITztFRGpIYSxpQkFBQTtFQUNwQixtQ0FBQTtBRGtnQkYsQ0RmTTtFQUNFLHlCQUFBO0FDa0JSLENEZk07RUFDRSxvQ0FBQTtBQ2tCUixDRGZNO0VBQ0Usb0NBQUE7QUNrQlIsQ0RmTTtFQUNFLHdDQUFBO0FDa0JSLENEZk07RUFDRSwyQ0FBQTtBQ2tCUixDRGZNO0VBQ0UseUNBQUE7QUNrQlIsQ0RmTTtFQUNFLDBDQUFBO0FDa0JSLENEZk07RUVoaEJKLG1CQ2lITztFRGpIYSxpQkFBQTtFQUNwQixtQ0FBQTtBRG9pQkYsQ0RqRE07RUFDRSx5QkFBQTtBQ29EUixDRGpETTtFQUNFLG9DQUFBO0FDb0RSLENEakRNO0VBQ0Usb0NBQUE7QUNvRFIsQ0RqRE07RUFDRSx3Q0FBQTtBQ29EUixDRGpETTtFQUNFLDJDQUFBO0FDb0RSLENEakRNO0VBQ0UseUNBQUE7QUNvRFIsQ0RqRE07RUFDRSwwQ0FBQTtBQ29EUixDRGpETTtFRWhoQkosbUJDaUhPO0VEakhhLGlCQUFBO0VBQ3BCLG1DQUFBO0FEc2tCRixDRG5GTTtFQUNFLHlCQUFBO0FDc0ZSLENEbkZNO0VBQ0Usb0NBQUE7QUNzRlIsQ0RuRk07RUFDRSxvQ0FBQTtBQ3NGUixDRG5GTTtFQUNFLHdDQUFBO0FDc0ZSLENEbkZNO0VBQ0UsMkNBQUE7QUNzRlIsQ0RuRk07RUFDRSx5Q0FBQTtBQ3NGUixDRG5GTTtFQUNFLDBDQUFBO0FDc0ZSLENEbkZNO0VFaGhCSixtQkNpSE87RURqSGEsaUJBQUE7RUFDcEIsa0NBQUE7QUR3bUJGLENEM2pCTTtFQUNFLG9DQUFBO0FDOGpCUixDRDVqQlE7O0VBRUUsNkJBQUE7QUM4akJWLENEeGpCUTtFQUNFLDhDQUFBO0VBQ0EseUJBQUE7QUMyakJWLENEempCVTtFSTNEUixvREFBQTtBSHVuQkYsQ0R4akJVO0VBQ0UseUJBQUE7QUMwakJaLENEdGpCVTtFQUNFLHlCQUFBO0FDd2pCWixDRGpqQlE7RUFDRSw4Q0FBQTtFQUNBLHlCQUFBO0FDb2pCVixDRGpqQlU7RUFFRSxvQ0FBQTtBQ2tqQlosQ0QvaUJVOztFQUVFLGdDQUFBO0FDaWpCWixDRDdpQlk7RUFDRSw2Q0FBQTtBQytpQmQsQ0Q1aUJZO0VBQ0UsY0tFRDtBSjRpQmIsQ0R0aUJRO0VBQ0UseUJBQUE7QUN5aUJWLENEcGlCTTtFQUNFLG9DQUFBO0FDdWlCUixDRHBpQk07RUFDRSw2QkFBQTtBQ3VpQlIsQ0RwaUJNO0VBQ0UsZ0NBQUE7QUN1aUJSLENEcGlCTTtFQUNFLDhCQUFBO0FDdWlCUixDRHBpQk07RUFDRSwrQkFBQTtBQ3VpQlIsQ0RoaUJROzs7RUFDRSxnQ0FBQTtBQ3FpQlYsQ0Q3aEJVO0VBQ0UseUNBQUE7RUFDQSx5QkFBQTtBQ2dpQlosQ0QxaEJNO0VFMUpKLG1CQ2lITztFRGpIYSxpQkFBQTtFQUNwQixrQ0FBQTtBRHlyQkYsQ0QxaEJRO0VBQ0UsZ0NBQUE7RUFDQSxvQ0FBQTtFQUNBLHNCQUFBO0FDNmhCVixDRDNoQlU7RUFHRSxXSzlKSjtFTCtKSSxvQ0FBQTtBQzJoQlosQ0R4aEJVO0VBQ0UsbUNBQUE7QUMwaEJaLENEdmhCVTtFQUNFLGdCQUFBO0FDeWhCWixDRGxoQlE7RUFDRSw2QkFBQTtFQUNBLGNHekVEO0FGOGxCVCxDRG5oQlU7RUFDRSxjRzVFSDtBRmltQlQsQ0RsaEJVO0VBQ0UseUNBQUE7QUNvaEJaLENEamhCVTtFQUdFLHdDQUFBO0VBQ0EsY0d2Rkg7QUZ3bUJULENEOWdCVTtFQUNFLCtTQUFBO0FDZ2hCWixDRHpnQlE7RUFDRSx5QkduR0Q7RUhvR0Msa0RBQUE7RUFDQSxXSzVNRjtFTDZNRSx5QkFBQTtBQzRnQlYsQ0R0Z0JZO0VBQ0UseUJBQUE7QUN3Z0JkLENEcmdCVTtFQUdFLHlCQUFBO0FDcWdCWixDRGxnQlU7RUFDRSxXSzlOSjtBSmt1QlIsQ0RsZ0JVO0VBRUUsYUFBQTtFQUNBLGdCQUFBO0VBQ0EsMEJBQUE7QUNtZ0JaLENENWZRO0VBQ0Usb0NBQUE7RUFDQSw2QkFBQTtFQUNBLGNHdklEO0FGc29CVCxDRDdmVTtFQUNFLHlDQUFBO0VBQ0EsY0czSUg7QUYwb0JULENEN2ZVO0VBQ0UsZ0JBQUE7QUMrZlosQ0Q3ZlU7RUFHRSx3Q0FBQTtFQUNBLGNHcEpIO0FGaXBCVCxDRDFmVTtFQUNFLCtTQUFBO0FDNGZaLENEemZVO0VBQ0Usd0NBQUE7RUFDQSxjRzdKSDtBRndwQlQsQ0RqZlk7O0VBQ0UscUtBQUE7QUNxZmQsQ0R0ZVU7RUFDRSx5Qkd4TEg7QUZpcUJULENEL2RjO0VBQ0UsY0duTVA7QUZxcUJULENEaGVjO0VBQ0UseUJBQUE7QUNrZWhCLENEdGRjO0VBQ0UsOEJBQUE7RUFDQSxXSzNUUjtBSm94QlIsQ0R2ZGdCO0VBQ0UsV0s5VFY7QUp1eEJSLENEbmRjO0VBQ0UsY0c5TlA7QUZtckJULENEL2NjO0VBQ0UsbUJHck9QO0VIc09PLFdLN1VSO0FKOHhCUixDRHpja0I7RUFDRSwyVEFBQTtBQzJjcEIsQ0Q3YmtCO0VBQ0UsMlRBQUE7QUMrYnBCLENEN2FjO0VBQ0UsV0t4WFI7RUx5WFEsb0NBQUE7RUFDQSxxQkduUlA7RUhvUk8sbURBQUE7QUNnYmhCLENEdmFRO0VBQ0UseUNBQUE7QUMwYVYsQ0R4YVU7RUFDRSx5QkdqU0g7QUYyc0JULENEbGFVO0VBQ0UsZ0NBQUE7QUNxYVosQ0RuYVk7O0VBRUUsMEJBQUE7QUNxYWQsQ0RsYVk7RUFDRSxvQ0FBQTtBQ29hZCxDRG5hYztFQUNFLDhDQUFBO0FDcWFoQixDRDFaWTtFQUVFLGdDQUFBO0FDNFpkLENEbFpNO0VBQ0UsaUVBQUE7QUNxWlIsQ0QvWVU7O0VBRUUscUJHcFZIO0VIcVZHLHlCR3JWSDtBRnV1QlQsQ0Q5WVk7Ozs7O0VBR0UseURBQUE7QUNrWmQsQ0QvWVU7RUFDRSxvREFBQTtFQUNBLFlBQUE7RUFDQSwyQkFBQTtBQ2laWixDRC9ZVTtFQUNFLGdDQUFBO0FDaVpaLENEellVO0VBQ0Usb0NBQUE7RUFDQSxXS3RkSjtFTHVkSSw2QkFBQTtBQzRZWixDRGxZYztFQUNFLDhCQUFBO0VBQ0EsZ0NBQUE7QUNxWWhCLENEOVhNO0VBQ0UseUJBQUE7QUNpWVIsQ0Q5WE07RUFDRSxvQ0FBQTtBQ2lZUixDRDlYTTtFQUNFLG9DQUFBO0FDaVlSLENEOVhNO0VBQ0Usd0NBQUE7QUNpWVIsQ0Q5WE07RUFDRSwyQ0FBQTtBQ2lZUixDRDlYTTtFQUNFLHlDQUFBO0FDaVlSLENEOVhNO0VBQ0UsMENBQUE7QUNpWVIsQ0Q5WE07RUVoaEJKLG1CQ2lITztFRGpIYSxpQkFBQTtFQUNwQixrQ0FBQTtBRG01QkYsQ0RoYU07RUFDRSx5QkFBQTtBQ21hUixDRGhhTTtFQUNFLG9DQUFBO0FDbWFSLENEaGFNO0VBQ0Usb0NBQUE7QUNtYVIsQ0RoYU07RUFDRSx3Q0FBQTtBQ21hUixDRGhhTTtFQUNFLDJDQUFBO0FDbWFSLENEaGFNO0VBQ0UseUNBQUE7QUNtYVIsQ0RoYU07RUFDRSwwQ0FBQTtBQ21hUixDRGhhTTtFRWhoQkosbUJDaUhPO0VEakhhLGlCQUFBO0VBQ3BCLGtDQUFBO0FEcTdCRixDRGxjTTtFQUNFLHlCQUFBO0FDcWNSLENEbGNNO0VBQ0Usb0NBQUE7QUNxY1IsQ0RsY007RUFDRSxvQ0FBQTtBQ3FjUixDRGxjTTtFQUNFLHdDQUFBO0FDcWNSLENEbGNNO0VBQ0UsMkNBQUE7QUNxY1IsQ0RsY007RUFDRSx5Q0FBQTtBQ3FjUixDRGxjTTtFQUNFLDBDQUFBO0FDcWNSLENEbGNNO0VFaGhCSixtQkNpSE87RURqSGEsaUJBQUE7RUFDcEIsa0NBQUE7QUR1OUJGLENEcGVNO0VBQ0UseUJBQUE7QUN1ZVIsQ0RwZU07RUFDRSxvQ0FBQTtBQ3VlUixDRHBlTTtFQUNFLG9DQUFBO0FDdWVSLENEcGVNO0VBQ0Usd0NBQUE7QUN1ZVIsQ0RwZU07RUFDRSwyQ0FBQTtBQ3VlUixDRHBlTTtFQUNFLHlDQUFBO0FDdWVSLENEcGVNO0VBQ0UsMENBQUE7QUN1ZVIsQ0RwZU07RUVoaEJKLG1CQ2lITztFRGpIYSxpQkFBQTtFQUNwQixrQ0FBQTtBRHkvQkYsQ0R0Z0JNO0VBQ0UseUJBQUE7QUN5Z0JSLENEdGdCTTtFQUNFLG9DQUFBO0FDeWdCUixDRHRnQk07RUFDRSxvQ0FBQTtBQ3lnQlIsQ0R0Z0JNO0VBQ0Usd0NBQUE7QUN5Z0JSLENEdGdCTTtFQUNFLDJDQUFBO0FDeWdCUixDRHRnQk07RUFDRSx5Q0FBQTtBQ3lnQlIsQ0R0Z0JNO0VBQ0UsMENBQUE7QUN5Z0JSLENEdGdCTTtFRWhoQkosbUJDaUhPO0VEakhhLGlCQUFBO0VBQ3BCLG9DQUFBO0FEMmhDRixDRHhpQk07RUFDRSx5QkFBQTtBQzJpQlIsQ0R4aUJNO0VBQ0Usb0NBQUE7QUMyaUJSLENEeGlCTTtFQUNFLG9DQUFBO0FDMmlCUixDRHhpQk07RUFDRSx3Q0FBQTtBQzJpQlIsQ0R4aUJNO0VBQ0UsMkNBQUE7QUMyaUJSLENEeGlCTTtFQUNFLHlDQUFBO0FDMmlCUixDRHhpQk07RUFDRSwwQ0FBQTtBQzJpQlIsQ0R4aUJNO0VFaGhCSixtQkNpSE87RURqSGEsaUJBQUE7RUFDcEIsb0NBQUE7QUQ2akNGLENEMWtCTTtFQUNFLHlCQUFBO0FDNmtCUixDRDFrQk07RUFDRSxvQ0FBQTtBQzZrQlIsQ0Qxa0JNO0VBQ0Usb0NBQUE7QUM2a0JSLENEMWtCTTtFQUNFLHdDQUFBO0FDNmtCUixDRDFrQk07RUFDRSwyQ0FBQTtBQzZrQlIsQ0Qxa0JNO0VBQ0UseUNBQUE7QUM2a0JSLENEMWtCTTtFQUNFLDBDQUFBO0FDNmtCUixDRDFrQk07RUVoaEJKLG1CQ2lITztFRGpIYSxpQkFBQTtFQUNwQixtQ0FBQTtBRCtsQ0YsQ0Q1bUJNO0VBQ0UseUJBQUE7QUMrbUJSLENENW1CTTtFQUNFLG9DQUFBO0FDK21CUixDRDVtQk07RUFDRSxvQ0FBQTtBQyttQlIsQ0Q1bUJNO0VBQ0Usd0NBQUE7QUMrbUJSLENENW1CTTtFQUNFLDJDQUFBO0FDK21CUixDRDVtQk07RUFDRSx5Q0FBQTtBQyttQlIsQ0Q1bUJNO0VBQ0UsMENBQUE7QUMrbUJSLENENW1CTTtFRWhoQkosbUJDaUhPO0VEakhhLGlCQUFBO0VBQ3BCLG1DQUFBO0FEaW9DRixDRDlvQk07RUFDRSx5QkFBQTtBQ2lwQlIsQ0Q5b0JNO0VBQ0Usb0NBQUE7QUNpcEJSLENEOW9CTTtFQUNFLG9DQUFBO0FDaXBCUixDRDlvQk07RUFDRSx3Q0FBQTtBQ2lwQlIsQ0Q5b0JNO0VBQ0UsMkNBQUE7QUNpcEJSLENEOW9CTTtFQUNFLHlDQUFBO0FDaXBCUixDRDlvQk07RUFDRSwwQ0FBQTtBQ2lwQlIsQ0Q5b0JNO0VFaGhCSixtQkNpSE87RURqSGEsaUJBQUE7RUFDcEIsb0NBQUE7QURtcUNGLENEaHJCTTtFQUNFLHlCQUFBO0FDbXJCUixDRGhyQk07RUFDRSxvQ0FBQTtBQ21yQlIsQ0RockJNO0VBQ0Usb0NBQUE7QUNtckJSLENEaHJCTTtFQUNFLHdDQUFBO0FDbXJCUixDRGhyQk07RUFDRSwyQ0FBQTtBQ21yQlIsQ0RockJNO0VBQ0UseUNBQUE7QUNtckJSLENEaHJCTTtFQUNFLDBDQUFBO0FDbXJCUixDRGhyQk07RUVoaEJKLG1CQ2lITztFRGpIYSxpQkFBQTtFQUNwQixvQ0FBQTtBRHFzQ0YsQ0RsdEJNO0VBQ0UseUJBQUE7QUNxdEJSLENEbHRCTTtFQUNFLG9DQUFBO0FDcXRCUixDRGx0Qk07RUFDRSxvQ0FBQTtBQ3F0QlIsQ0RsdEJNO0VBQ0Usd0NBQUE7QUNxdEJSLENEbHRCTTtFQUNFLDJDQUFBO0FDcXRCUixDRGx0Qk07RUFDRSx5Q0FBQTtBQ3F0QlIsQ0RsdEJNO0VBQ0UsMENBQUE7QUNxdEJSLENEbHRCTTtFRWhoQkosbUJDaUhPO0VEakhhLGlCQUFBO0VBQ3BCLG9DQUFBO0FEdXVDRixDRHB2Qk07RUFDRSx5QkFBQTtBQ3V2QlIsQ0RwdkJNO0VBQ0Usb0NBQUE7QUN1dkJSLENEcHZCTTtFQUNFLG9DQUFBO0FDdXZCUixDRHB2Qk07RUFDRSx3Q0FBQTtBQ3V2QlIsQ0RwdkJNO0VBQ0UsMkNBQUE7QUN1dkJSLENEcHZCTTtFQUNFLHlDQUFBO0FDdXZCUixDRHB2Qk07RUFDRSwwQ0FBQTtBQ3V2QlIsQ0RwdkJNO0VFaGhCSixtQkNpSE87RURqSGEsaUJBQUE7RUFDcEIsb0NBQUE7QUR5d0NGLENEdHhCTTtFQUNFLHlCQUFBO0FDeXhCUixDRHR4Qk07RUFDRSxvQ0FBQTtBQ3l4QlIsQ0R0eEJNO0VBQ0Usb0NBQUE7QUN5eEJSLENEdHhCTTtFQUNFLHdDQUFBO0FDeXhCUixDRHR4Qk07RUFDRSwyQ0FBQTtBQ3l4QlIsQ0R0eEJNO0VBQ0UseUNBQUE7QUN5eEJSLENEdHhCTTtFQUNFLDBDQUFBO0FDeXhCUixDRHR4Qk07RUVoaEJKLG1CQ2lITztFRGpIYSxpQkFBQTtFQUNwQixvQ0FBQTtBRDJ5Q0YsQ0Q5dkNNO0VBQ0Usb0NBQUE7QUNpd0NSLENEL3ZDUTs7RUFFRSw2QkFBQTtBQ2l3Q1YsQ0QzdkNRO0VBQ0UsZ0RBQUE7RUFDQSx5QkFBQTtBQzh2Q1YsQ0Q1dkNVO0VJM0RSLHNEQUFBO0FIMHpDRixDRDN2Q1U7RUFDRSx5QkFBQTtBQzZ2Q1osQ0R6dkNVO0VBQ0UseUJBQUE7QUMydkNaLENEcHZDUTtFQUNFLGdEQUFBO0VBQ0EseUJBQUE7QUN1dkNWLENEcHZDVTtFQUVFLHNDQUFBO0FDcXZDWixDRGx2Q1U7O0VBRUUsZ0NBQUE7QUNvdkNaLENEaHZDWTtFQUNFLCtDQUFBO0FDa3ZDZCxDRC91Q1k7RUFDRSxjS0VEO0FKK3VDYixDRHp1Q1E7RUFDRSx5QkFBQTtBQzR1Q1YsQ0R2dUNNO0VBQ0Usb0NBQUE7QUMwdUNSLENEdnVDTTtFQUNFLDZCQUFBO0FDMHVDUixDRHZ1Q007RUFDRSxnQ0FBQTtBQzB1Q1IsQ0R2dUNNO0VBQ0UsOEJBQUE7QUMwdUNSLENEdnVDTTtFQUNFLCtCQUFBO0FDMHVDUixDRG51Q1E7OztFQUNFLGdDQUFBO0FDd3VDVixDRGh1Q1U7RUFDRSwyQ0FBQTtFQUNBLHlCQUFBO0FDbXVDWixDRDd0Q007RUUxSkosbUJDaUhPO0VEakhhLGlCQUFBO0VBQ3BCLG9DQUFBO0FENDNDRixDRDd0Q1E7RUFDRSxnQ0FBQTtFQUNBLG9DQUFBO0VBQ0Esc0JBQUE7QUNndUNWLENEOXRDVTtFQUdFLFdLOUpKO0VMK0pJLG9DQUFBO0FDOHRDWixDRDN0Q1U7RUFDRSxtQ0FBQTtBQzZ0Q1osQ0QxdENVO0VBQ0UsZ0JBQUE7QUM0dENaLENEcnRDUTtFQUNFLDZCQUFBO0VBQ0EsY0d6RUQ7QUZpeUNULENEdHRDVTtFQUNFLGNHNUVIO0FGb3lDVCxDRHJ0Q1U7RUFDRSwyQ0FBQTtBQ3V0Q1osQ0RwdENVO0VBR0UsMENBQUE7RUFDQSxjR3ZGSDtBRjJ5Q1QsQ0RqdENVO0VBQ0UsK1NBQUE7QUNtdENaLENENXNDUTtFQUNFLHlCR25HRDtFSG9HQyxrREFBQTtFQUNBLFdLNU1GO0VMNk1FLHlCQUFBO0FDK3NDVixDRHpzQ1k7RUFDRSx5QkFBQTtBQzJzQ2QsQ0R4c0NVO0VBR0UseUJBQUE7QUN3c0NaLENEcnNDVTtFQUNFLFdLOU5KO0FKcTZDUixDRHJzQ1U7RUFFRSxhQUFBO0VBQ0EsZ0JBQUE7RUFDQSwwQkFBQTtBQ3NzQ1osQ0QvckNRO0VBQ0Usb0NBQUE7RUFDQSw2QkFBQTtFQUNBLGNHdklEO0FGeTBDVCxDRGhzQ1U7RUFDRSwyQ0FBQTtFQUNBLGNHM0lIO0FGNjBDVCxDRGhzQ1U7RUFDRSxnQkFBQTtBQ2tzQ1osQ0Roc0NVO0VBR0UsMENBQUE7RUFDQSxjR3BKSDtBRm8xQ1QsQ0Q3ckNVO0VBQ0UsK1NBQUE7QUMrckNaLENENXJDVTtFQUNFLDBDQUFBO0VBQ0EsY0c3Skg7QUYyMUNULENEcHJDWTs7RUFDRSw2S0FBQTtBQ3dyQ2QsQ0R6cUNVO0VBQ0UseUJHeExIO0FGbzJDVCxDRGxxQ2M7RUFDRSxjR25NUDtBRncyQ1QsQ0RucUNjO0VBQ0UseUJBQUE7QUNxcUNoQixDRHpwQ2M7RUFDRSw4QkFBQTtFQUNBLFdLM1RSO0FKdTlDUixDRDFwQ2dCO0VBQ0UsV0s5VFY7QUowOUNSLENEdHBDYztFQUNFLGNHOU5QO0FGczNDVCxDRGxwQ2M7RUFDRSxtQkdyT1A7RUhzT08sV0s3VVI7QUppK0NSLENENW9Da0I7RUFDRSwyVEFBQTtBQzhvQ3BCLENEaG9Da0I7RUFDRSwyVEFBQTtBQ2tvQ3BCLENEaG5DYztFQUNFLFdLeFhSO0VMeVhRLG9DQUFBO0VBQ0EscUJHblJQO0VIb1JPLHFEQUFBO0FDbW5DaEIsQ0QxbUNRO0VBQ0UsMkNBQUE7QUM2bUNWLENEM21DVTtFQUNFLHlCR2pTSDtBRjg0Q1QsQ0RybUNVO0VBQ0UsZ0NBQUE7QUN3bUNaLENEdG1DWTs7RUFFRSwwQkFBQTtBQ3dtQ2QsQ0RybUNZO0VBQ0Usb0NBQUE7QUN1bUNkLENEdG1DYztFQUNFLGdEQUFBO0FDd21DaEIsQ0Q3bENZO0VBRUUsZ0NBQUE7QUMrbENkLENEcmxDTTtFQUNFLGlFQUFBO0FDd2xDUixDRGxsQ1U7O0VBRUUscUJHcFZIO0VIcVZHLHlCR3JWSDtBRjA2Q1QsQ0RqbENZOzs7OztFQUdFLDJEQUFBO0FDcWxDZCxDRGxsQ1U7RUFDRSxzREFBQTtFQUNBLFlBQUE7RUFDQSwyQkFBQTtBQ29sQ1osQ0RsbENVO0VBQ0UsZ0NBQUE7QUNvbENaLENENWtDVTtFQUNFLG9DQUFBO0VBQ0EsV0t0ZEo7RUx1ZEksNkJBQUE7QUMra0NaLENEcmtDYztFQUNFLDhCQUFBO0VBQ0EsZ0NBQUE7QUN3a0NoQixDRGprQ007RUFDRSx5QkFBQTtBQ29rQ1IsQ0Rqa0NNO0VBQ0Usb0NBQUE7QUNva0NSLENEamtDTTtFQUNFLG9DQUFBO0FDb2tDUixDRGprQ007RUFDRSx3Q0FBQTtBQ29rQ1IsQ0Rqa0NNO0VBQ0UsMkNBQUE7QUNva0NSLENEamtDTTtFQUNFLHlDQUFBO0FDb2tDUixDRGprQ007RUFDRSwwQ0FBQTtBQ29rQ1IsQ0Rqa0NNO0VFaGhCSixtQkNpSE87RURqSGEsaUJBQUE7RUFDcEIsb0NBQUE7QURzbERGLENEbm1DTTtFQUNFLHlCQUFBO0FDc21DUixDRG5tQ007RUFDRSxvQ0FBQTtBQ3NtQ1IsQ0RubUNNO0VBQ0Usb0NBQUE7QUNzbUNSLENEbm1DTTtFQUNFLHdDQUFBO0FDc21DUixDRG5tQ007RUFDRSwyQ0FBQTtBQ3NtQ1IsQ0RubUNNO0VBQ0UseUNBQUE7QUNzbUNSLENEbm1DTTtFQUNFLDBDQUFBO0FDc21DUixDRG5tQ007RUVoaEJKLG1CQ2lITztFRGpIYSxpQkFBQTtFQUNwQixvQ0FBQTtBRHduREYsQ0Ryb0NNO0VBQ0UseUJBQUE7QUN3b0NSLENEcm9DTTtFQUNFLG9DQUFBO0FDd29DUixDRHJvQ007RUFDRSxvQ0FBQTtBQ3dvQ1IsQ0Ryb0NNO0VBQ0Usd0NBQUE7QUN3b0NSLENEcm9DTTtFQUNFLDJDQUFBO0FDd29DUixDRHJvQ007RUFDRSx5Q0FBQTtBQ3dvQ1IsQ0Ryb0NNO0VBQ0UsMENBQUE7QUN3b0NSLENEcm9DTTtFRWhoQkosbUJDaUhPO0VEakhhLGlCQUFBO0VBQ3BCLGtDQUFBO0FEMHBERixDRHZxQ007RUFDRSx5QkFBQTtBQzBxQ1IsQ0R2cUNNO0VBQ0Usb0NBQUE7QUMwcUNSLENEdnFDTTtFQUNFLG9DQUFBO0FDMHFDUixDRHZxQ007RUFDRSx3Q0FBQTtBQzBxQ1IsQ0R2cUNNO0VBQ0UsMkNBQUE7QUMwcUNSLENEdnFDTTtFQUNFLHlDQUFBO0FDMHFDUixDRHZxQ007RUFDRSwwQ0FBQTtBQzBxQ1IsQ0R2cUNNO0VFaGhCSixtQkNpSE87RURqSGEsaUJBQUE7RUFDcEIsaUNBQUE7QUQ0ckRGLENEenNDTTtFQUNFLHlCQUFBO0FDNHNDUixDRHpzQ007RUFDRSxvQ0FBQTtBQzRzQ1IsQ0R6c0NNO0VBQ0Usb0NBQUE7QUM0c0NSLENEenNDTTtFQUNFLHdDQUFBO0FDNHNDUixDRHpzQ007RUFDRSwyQ0FBQTtBQzRzQ1IsQ0R6c0NNO0VBQ0UseUNBQUE7QUM0c0NSLENEenNDTTtFQUNFLDBDQUFBO0FDNHNDUixDRHpzQ007RUVoaEJKLG1CQ2lITztFRGpIYSxpQkFBQTtFQUNwQixvQ0FBQTtBRDh0REYsQ0QzdUNNO0VBQ0UseUJBQUE7QUM4dUNSLENEM3VDTTtFQUNFLG9DQUFBO0FDOHVDUixDRDN1Q007RUFDRSxvQ0FBQTtBQzh1Q1IsQ0QzdUNNO0VBQ0Usd0NBQUE7QUM4dUNSLENEM3VDTTtFQUNFLDJDQUFBO0FDOHVDUixDRDN1Q007RUFDRSx5Q0FBQTtBQzh1Q1IsQ0QzdUNNO0VBQ0UsMENBQUE7QUM4dUNSLENEM3VDTTtFRWhoQkosbUJDaUhPO0VEakhhLGlCQUFBO0VBQ3BCLG9DQUFBO0FEZ3dERixDRDd3Q007RUFDRSx5QkFBQTtBQ2d4Q1IsQ0Q3d0NNO0VBQ0Usb0NBQUE7QUNneENSLENEN3dDTTtFQUNFLG9DQUFBO0FDZ3hDUixDRDd3Q007RUFDRSx3Q0FBQTtBQ2d4Q1IsQ0Q3d0NNO0VBQ0UsMkNBQUE7QUNneENSLENEN3dDTTtFQUNFLHlDQUFBO0FDZ3hDUixDRDd3Q007RUFDRSwwQ0FBQTtBQ2d4Q1IsQ0Q3d0NNO0VFaGhCSixtQkNpSE87RURqSGEsaUJBQUE7RUFDcEIsbUNBQUE7QURreURGLENEL3lDTTtFQUNFLHlCQUFBO0FDa3pDUixDRC95Q007RUFDRSxvQ0FBQTtBQ2t6Q1IsQ0QveUNNO0VBQ0Usb0NBQUE7QUNrekNSLENEL3lDTTtFQUNFLHdDQUFBO0FDa3pDUixDRC95Q007RUFDRSwyQ0FBQTtBQ2t6Q1IsQ0QveUNNO0VBQ0UseUNBQUE7QUNrekNSLENEL3lDTTtFQUNFLDBDQUFBO0FDa3pDUixDRC95Q007RUVoaEJKLG1CQ2lITztFRGpIYSxpQkFBQTtFQUNwQixtQ0FBQTtBRG8wREYsQ0RqMUNNO0VBQ0UseUJBQUE7QUNvMUNSLENEajFDTTtFQUNFLG9DQUFBO0FDbzFDUixDRGoxQ007RUFDRSxvQ0FBQTtBQ28xQ1IsQ0RqMUNNO0VBQ0Usd0NBQUE7QUNvMUNSLENEajFDTTtFQUNFLDJDQUFBO0FDbzFDUixDRGoxQ007RUFDRSx5Q0FBQTtBQ28xQ1IsQ0RqMUNNO0VBQ0UsMENBQUE7QUNvMUNSLENEajFDTTtFRWhoQkosbUJDaUhPO0VEakhhLGlCQUFBO0VBQ3BCLG1DQUFBO0FEczJERixDRHp6RE07RUFDRSxvQ0FBQTtBQzR6RFIsQ0QxekRROztFQUVFLDZCQUFBO0FDNHpEVixDRHR6RFE7RUFDRSwrQ0FBQTtFQUNBLHlCQUFBO0FDeXpEVixDRHZ6RFU7RUkzRFIscURBQUE7QUhxM0RGLENEdHpEVTtFQUNFLHlCQUFBO0FDd3pEWixDRHB6RFU7RUFDRSx5QkFBQTtBQ3N6RFosQ0QveURRO0VBQ0UsK0NBQUE7RUFDQSx5QkFBQTtBQ2t6RFYsQ0QveURVO0VBRUUscUNBQUE7QUNnekRaLENEN3lEVTs7RUFFRSxnQ0FBQTtBQyt5RFosQ0QzeURZO0VBQ0UsOENBQUE7QUM2eURkLENEMXlEWTtFQUNFLGNLRUQ7QUoweURiLENEcHlEUTtFQUNFLHlCQUFBO0FDdXlEVixDRGx5RE07RUFDRSxvQ0FBQTtBQ3F5RFIsQ0RseURNO0VBQ0UsNkJBQUE7QUNxeURSLENEbHlETTtFQUNFLGdDQUFBO0FDcXlEUixDRGx5RE07RUFDRSw4QkFBQTtBQ3F5RFIsQ0RseURNO0VBQ0UsK0JBQUE7QUNxeURSLENEOXhEUTs7O0VBQ0UsZ0NBQUE7QUNteURWLENEM3hEVTtFQUNFLDBDQUFBO0VBQ0EseUJBQUE7QUM4eERaLENEeHhETTtFRTFKSixtQkNpSE87RURqSGEsaUJBQUE7RUFDcEIsbUNBQUE7QUR1N0RGLENEeHhEUTtFQUNFLGdDQUFBO0VBQ0Esb0NBQUE7RUFDQSxzQkFBQTtBQzJ4RFYsQ0R6eERVO0VBR0UsV0s5Sko7RUwrSkksb0NBQUE7QUN5eERaLENEdHhEVTtFQUNFLG1DQUFBO0FDd3hEWixDRHJ4RFU7RUFDRSxnQkFBQTtBQ3V4RFosQ0RoeERRO0VBQ0UsNkJBQUE7RUFDQSxjR3pFRDtBRjQxRFQsQ0RqeERVO0VBQ0UsY0c1RUg7QUYrMURULENEaHhEVTtFQUNFLDBDQUFBO0FDa3hEWixDRC93RFU7RUFHRSx5Q0FBQTtFQUNBLGNHdkZIO0FGczJEVCxDRDV3RFU7RUFDRSwrU0FBQTtBQzh3RFosQ0R2d0RRO0VBQ0UseUJHbkdEO0VIb0dDLGtEQUFBO0VBQ0EsV0s1TUY7RUw2TUUseUJBQUE7QUMwd0RWLENEcHdEWTtFQUNFLHlCQUFBO0FDc3dEZCxDRG53RFU7RUFHRSx5QkFBQTtBQ213RFosQ0Rod0RVO0VBQ0UsV0s5Tko7QUpnK0RSLENEaHdEVTtFQUVFLGFBQUE7RUFDQSxnQkFBQTtFQUNBLDBCQUFBO0FDaXdEWixDRDF2RFE7RUFDRSxvQ0FBQTtFQUNBLDZCQUFBO0VBQ0EsY0d2SUQ7QUZvNERULENEM3ZEVTtFQUNFLDBDQUFBO0VBQ0EsY0czSUg7QUZ3NERULENEM3ZEVTtFQUNFLGdCQUFBO0FDNnZEWixDRDN2RFU7RUFHRSx5Q0FBQTtFQUNBLGNHcEpIO0FGKzREVCxDRHh2RFU7RUFDRSwrU0FBQTtBQzB2RFosQ0R2dkRVO0VBQ0UseUNBQUE7RUFDQSxjRzdKSDtBRnM1RFQsQ0QvdURZOztFQUNFLHlLQUFBO0FDbXZEZCxDRHB1RFU7RUFDRSx5Qkd4TEg7QUYrNURULENEN3REYztFQUNFLGNHbk1QO0FGbTZEVCxDRDl0RGM7RUFDRSx5QkFBQTtBQ2d1RGhCLENEcHREYztFQUNFLDhCQUFBO0VBQ0EsV0szVFI7QUpraEVSLENEcnREZ0I7RUFDRSxXSzlUVjtBSnFoRVIsQ0RqdERjO0VBQ0UsY0c5TlA7QUZpN0RULENEN3NEYztFQUNFLG1CR3JPUDtFSHNPTyxXSzdVUjtBSjRoRVIsQ0R2c0RrQjtFQUNFLDJUQUFBO0FDeXNEcEIsQ0QzckRrQjtFQUNFLDJUQUFBO0FDNnJEcEIsQ0QzcURjO0VBQ0UsV0t4WFI7RUx5WFEsb0NBQUE7RUFDQSxxQkduUlA7RUhvUk8sb0RBQUE7QUM4cURoQixDRHJxRFE7RUFDRSwwQ0FBQTtBQ3dxRFYsQ0R0cURVO0VBQ0UseUJHalNIO0FGeThEVCxDRGhxRFU7RUFDRSxnQ0FBQTtBQ21xRFosQ0RqcURZOztFQUVFLDBCQUFBO0FDbXFEZCxDRGhxRFk7RUFDRSxvQ0FBQTtBQ2txRGQsQ0RqcURjO0VBQ0UsK0NBQUE7QUNtcURoQixDRHhwRFk7RUFFRSxnQ0FBQTtBQzBwRGQsQ0RocERNO0VBQ0UsaUVBQUE7QUNtcERSLENEN29EVTs7RUFFRSxxQkdwVkg7RUhxVkcseUJHclZIO0FGcStEVCxDRDVvRFk7Ozs7O0VBR0UsMERBQUE7QUNncERkLENEN29EVTtFQUNFLHFEQUFBO0VBQ0EsWUFBQTtFQUNBLDJCQUFBO0FDK29EWixDRDdvRFU7RUFDRSxnQ0FBQTtBQytvRFosQ0R2b0RVO0VBQ0Usb0NBQUE7RUFDQSxXS3RkSjtFTHVkSSw2QkFBQTtBQzBvRFosQ0Rob0RjO0VBQ0UsOEJBQUE7RUFDQSxnQ0FBQTtBQ21vRGhCLENENW5ETTtFQUNFLHlCQUFBO0FDK25EUixDRDVuRE07RUFDRSxvQ0FBQTtBQytuRFIsQ0Q1bkRNO0VBQ0Usb0NBQUE7QUMrbkRSLENENW5ETTtFQUNFLHdDQUFBO0FDK25EUixDRDVuRE07RUFDRSwyQ0FBQTtBQytuRFIsQ0Q1bkRNO0VBQ0UseUNBQUE7QUMrbkRSLENENW5ETTtFQUNFLDBDQUFBO0FDK25EUixDRDVuRE07RUVoaEJKLG1CQ2lITztFRGpIYSxpQkFBQTtFQUNwQixrQ0FBQTtBRGlwRUYsQ0Q5cERNO0VBQ0UseUJBQUE7QUNpcURSLENEOXBETTtFQUNFLG9DQUFBO0FDaXFEUixDRDlwRE07RUFDRSxvQ0FBQTtBQ2lxRFIsQ0Q5cERNO0VBQ0Usd0NBQUE7QUNpcURSLENEOXBETTtFQUNFLDJDQUFBO0FDaXFEUixDRDlwRE07RUFDRSx5Q0FBQTtBQ2lxRFIsQ0Q5cERNO0VBQ0UsMENBQUE7QUNpcURSLENEOXBETTtFRWhoQkosbUJDaUhPO0VEakhhLGlCQUFBO0VBQ3BCLGtDQUFBO0FEbXJFRixDRGhzRE07RUFDRSx5QkFBQTtBQ21zRFIsQ0Roc0RNO0VBQ0Usb0NBQUE7QUNtc0RSLENEaHNETTtFQUNFLG9DQUFBO0FDbXNEUixDRGhzRE07RUFDRSx3Q0FBQTtBQ21zRFIsQ0Roc0RNO0VBQ0UsMkNBQUE7QUNtc0RSLENEaHNETTtFQUNFLHlDQUFBO0FDbXNEUixDRGhzRE07RUFDRSwwQ0FBQTtBQ21zRFIsQ0Roc0RNO0VFaGhCSixtQkNpSE87RURqSGEsaUJBQUE7RUFDcEIsa0NBQUE7QURxdEVGLENEbHVETTtFQUNFLHlCQUFBO0FDcXVEUixDRGx1RE07RUFDRSxvQ0FBQTtBQ3F1RFIsQ0RsdURNO0VBQ0Usb0NBQUE7QUNxdURSLENEbHVETTtFQUNFLHdDQUFBO0FDcXVEUixDRGx1RE07RUFDRSwyQ0FBQTtBQ3F1RFIsQ0RsdURNO0VBQ0UseUNBQUE7QUNxdURSLENEbHVETTtFQUNFLDBDQUFBO0FDcXVEUixDRGx1RE07RUVoaEJKLG1CQ2lITztFRGpIYSxpQkFBQTtFQUNwQixrQ0FBQTtBRHV2RUYsQ0Rwd0RNO0VBQ0UseUJBQUE7QUN1d0RSLENEcHdETTtFQUNFLG9DQUFBO0FDdXdEUixDRHB3RE07RUFDRSxvQ0FBQTtBQ3V3RFIsQ0Rwd0RNO0VBQ0Usd0NBQUE7QUN1d0RSLENEcHdETTtFQUNFLDJDQUFBO0FDdXdEUixDRHB3RE07RUFDRSx5Q0FBQTtBQ3V3RFIsQ0Rwd0RNO0VBQ0UsMENBQUE7QUN1d0RSLENEcHdETTtFRWhoQkosbUJDaUhPO0VEakhhLGlCQUFBO0VBQ3BCLG9DQUFBO0FEeXhFRixDRHR5RE07RUFDRSx5QkFBQTtBQ3l5RFIsQ0R0eURNO0VBQ0Usb0NBQUE7QUN5eURSLENEdHlETTtFQUNFLG9DQUFBO0FDeXlEUixDRHR5RE07RUFDRSx3Q0FBQTtBQ3l5RFIsQ0R0eURNO0VBQ0UsMkNBQUE7QUN5eURSLENEdHlETTtFQUNFLHlDQUFBO0FDeXlEUixDRHR5RE07RUFDRSwwQ0FBQTtBQ3l5RFIsQ0R0eURNO0VFaGhCSixtQkNpSE87RURqSGEsaUJBQUE7RUFDcEIsb0NBQUE7QUQyekVGLENEeDBETTtFQUNFLHlCQUFBO0FDMjBEUixDRHgwRE07RUFDRSxvQ0FBQTtBQzIwRFIsQ0R4MERNO0VBQ0Usb0NBQUE7QUMyMERSLENEeDBETTtFQUNFLHdDQUFBO0FDMjBEUixDRHgwRE07RUFDRSwyQ0FBQTtBQzIwRFIsQ0R4MERNO0VBQ0UseUNBQUE7QUMyMERSLENEeDBETTtFQUNFLDBDQUFBO0FDMjBEUixDRHgwRE07RUVoaEJKLG1CQ2lITztFRGpIYSxpQkFBQTtFQUNwQixvQ0FBQTtBRDYxRUYsQ0QxMkRNO0VBQ0UseUJBQUE7QUM2MkRSLENEMTJETTtFQUNFLG9DQUFBO0FDNjJEUixDRDEyRE07RUFDRSxvQ0FBQTtBQzYyRFIsQ0QxMkRNO0VBQ0Usd0NBQUE7QUM2MkRSLENEMTJETTtFQUNFLDJDQUFBO0FDNjJEUixDRDEyRE07RUFDRSx5Q0FBQTtBQzYyRFIsQ0QxMkRNO0VBQ0UsMENBQUE7QUM2MkRSLENEMTJETTtFRWhoQkosbUJDaUhPO0VEakhhLGlCQUFBO0VBQ3BCLG1DQUFBO0FEKzNFRixDRDU0RE07RUFDRSx5QkFBQTtBQys0RFIsQ0Q1NERNO0VBQ0Usb0NBQUE7QUMrNERSLENENTRETTtFQUNFLG9DQUFBO0FDKzREUixDRDU0RE07RUFDRSx3Q0FBQTtBQys0RFIsQ0Q1NERNO0VBQ0UsMkNBQUE7QUMrNERSLENENTRETTtFQUNFLHlDQUFBO0FDKzREUixDRDU0RE07RUFDRSwwQ0FBQTtBQys0RFIsQ0Q1NERNO0VFaGhCSixtQkNpSE87RURqSGEsaUJBQUE7RUFDcEIsb0NBQUE7QURpNkVGLENEOTZETTtFQUNFLHlCQUFBO0FDaTdEUixDRDk2RE07RUFDRSxvQ0FBQTtBQ2k3RFIsQ0Q5NkRNO0VBQ0Usb0NBQUE7QUNpN0RSLENEOTZETTtFQUNFLHdDQUFBO0FDaTdEUixDRDk2RE07RUFDRSwyQ0FBQTtBQ2k3RFIsQ0Q5NkRNO0VBQ0UseUNBQUE7QUNpN0RSLENEOTZETTtFQUNFLDBDQUFBO0FDaTdEUixDRDk2RE07RUVoaEJKLG1CQ2lITztFRGpIYSxpQkFBQTtFQUNwQixtQ0FBQTtBRG04RUYsQ0RoOURNO0VBQ0UseUJBQUE7QUNtOURSLENEaDlETTtFQUNFLG9DQUFBO0FDbTlEUixDRGg5RE07RUFDRSxvQ0FBQTtBQ205RFIsQ0RoOURNO0VBQ0Usd0NBQUE7QUNtOURSLENEaDlETTtFQUNFLDJDQUFBO0FDbTlEUixDRGg5RE07RUFDRSx5Q0FBQTtBQ205RFIsQ0RoOURNO0VBQ0UsMENBQUE7QUNtOURSLENEaDlETTtFRWhoQkosbUJDaUhPO0VEakhhLGlCQUFBO0VBQ3BCLG1DQUFBO0FEcStFRixDRGwvRE07RUFDRSx5QkFBQTtBQ3EvRFIsQ0RsL0RNO0VBQ0Usb0NBQUE7QUNxL0RSLENEbC9ETTtFQUNFLG9DQUFBO0FDcS9EUixDRGwvRE07RUFDRSx3Q0FBQTtBQ3EvRFIsQ0RsL0RNO0VBQ0UsMkNBQUE7QUNxL0RSLENEbC9ETTtFQUNFLHlDQUFBO0FDcS9EUixDRGwvRE07RUFDRSwwQ0FBQTtBQ3EvRFIsQ0RsL0RNO0VFaGhCSixtQkNpSE87RURqSGEsaUJBQUE7RUFDcEIsbUNBQUE7QUR1Z0ZGLENEcGhFTTtFQUNFLHlCQUFBO0FDdWhFUixDRHBoRU07RUFDRSxvQ0FBQTtBQ3VoRVIsQ0RwaEVNO0VBQ0Usb0NBQUE7QUN1aEVSLENEcGhFTTtFQUNFLHdDQUFBO0FDdWhFUixDRHBoRU07RUFDRSwyQ0FBQTtBQ3VoRVIsQ0RwaEVNO0VBQ0UseUNBQUE7QUN1aEVSLENEcGhFTTtFQUNFLDBDQUFBO0FDdWhFUixDRHBoRU07RUVoaEJKLG1CQ2lITztFRGpIYSxpQkFBQTtFQUNwQixrQ0FBQTtBRHlpRkYsQ0Q1L0VNO0VBQ0Usb0NBQUE7QUMrL0VSLENENy9FUTs7RUFFRSw2QkFBQTtBQysvRVYsQ0R6L0VRO0VBQ0UsOENBQUE7RUFDQSx5QkFBQTtBQzQvRVYsQ0QxL0VVO0VJM0RSLG9EQUFBO0FId2pGRixDRHovRVU7RUFDRSx5QkFBQTtBQzIvRVosQ0R2L0VVO0VBQ0UseUJBQUE7QUN5L0VaLENEbC9FUTtFQUNFLDhDQUFBO0VBQ0EseUJBQUE7QUNxL0VWLENEbC9FVTtFQUVFLG9DQUFBO0FDbS9FWixDRGgvRVU7O0VBRUUsZ0NBQUE7QUNrL0VaLENEOStFWTtFQUNFLDZDQUFBO0FDZy9FZCxDRDcrRVk7RUFDRSxjS0VEO0FKNitFYixDRHYrRVE7RUFDRSx5QkFBQTtBQzArRVYsQ0RyK0VNO0VBQ0Usb0NBQUE7QUN3K0VSLENEcitFTTtFQUNFLDZCQUFBO0FDdytFUixDRHIrRU07RUFDRSxnQ0FBQTtBQ3crRVIsQ0RyK0VNO0VBQ0UsOEJBQUE7QUN3K0VSLENEcitFTTtFQUNFLCtCQUFBO0FDdytFUixDRGorRVE7OztFQUNFLGdDQUFBO0FDcytFVixDRDk5RVU7RUFDRSx5Q0FBQTtFQUNBLHlCQUFBO0FDaStFWixDRDM5RU07RUUxSkosbUJDaUhPO0VEakhhLGlCQUFBO0VBQ3BCLGtDQUFBO0FEMG5GRixDRDM5RVE7RUFDRSxnQ0FBQTtFQUNBLG9DQUFBO0VBQ0Esc0JBQUE7QUM4OUVWLENENTlFVTtFQUdFLFdLOUpKO0VMK0pJLG9DQUFBO0FDNDlFWixDRHo5RVU7RUFDRSxtQ0FBQTtBQzI5RVosQ0R4OUVVO0VBQ0UsZ0JBQUE7QUMwOUVaLENEbjlFUTtFQUNFLDZCQUFBO0VBQ0EsY0d6RUQ7QUYraEZULENEcDlFVTtFQUNFLGNHNUVIO0FGa2lGVCxDRG45RVU7RUFDRSx5Q0FBQTtBQ3E5RVosQ0RsOUVVO0VBR0Usd0NBQUE7RUFDQSxjR3ZGSDtBRnlpRlQsQ0QvOEVVO0VBQ0UsK1NBQUE7QUNpOUVaLENEMThFUTtFQUNFLHlCR25HRDtFSG9HQyxrREFBQTtFQUNBLFdLNU1GO0VMNk1FLHlCQUFBO0FDNjhFVixDRHY4RVk7RUFDRSx5QkFBQTtBQ3k4RWQsQ0R0OEVVO0VBR0UseUJBQUE7QUNzOEVaLENEbjhFVTtFQUNFLFdLOU5KO0FKbXFGUixDRG44RVU7RUFFRSxhQUFBO0VBQ0EsZ0JBQUE7RUFDQSwwQkFBQTtBQ284RVosQ0Q3N0VRO0VBQ0Usb0NBQUE7RUFDQSw2QkFBQTtFQUNBLGNHdklEO0FGdWtGVCxDRDk3RVU7RUFDRSx5Q0FBQTtFQUNBLGNHM0lIO0FGMmtGVCxDRDk3RVU7RUFDRSxnQkFBQTtBQ2c4RVosQ0Q5N0VVO0VBR0Usd0NBQUE7RUFDQSxjR3BKSDtBRmtsRlQsQ0QzN0VVO0VBQ0UsK1NBQUE7QUM2N0VaLENEMTdFVTtFQUNFLHdDQUFBO0VBQ0EsY0c3Skg7QUZ5bEZULENEbDdFWTs7RUFDRSxxS0FBQTtBQ3M3RWQsQ0R2NkVVO0VBQ0UseUJHeExIO0FGa21GVCxDRGg2RWM7RUFDRSxjR25NUDtBRnNtRlQsQ0RqNkVjO0VBQ0UseUJBQUE7QUNtNkVoQixDRHY1RWM7RUFDRSw4QkFBQTtFQUNBLFdLM1RSO0FKcXRGUixDRHg1RWdCO0VBQ0UsV0s5VFY7QUp3dEZSLENEcDVFYztFQUNFLGNHOU5QO0FGb25GVCxDRGg1RWM7RUFDRSxtQkdyT1A7RUhzT08sV0s3VVI7QUordEZSLENEMTRFa0I7RUFDRSwyVEFBQTtBQzQ0RXBCLENEOTNFa0I7RUFDRSwyVEFBQTtBQ2c0RXBCLENEOTJFYztFQUNFLFdLeFhSO0VMeVhRLG9DQUFBO0VBQ0EscUJHblJQO0VIb1JPLG1EQUFBO0FDaTNFaEIsQ0R4MkVRO0VBQ0UseUNBQUE7QUMyMkVWLENEejJFVTtFQUNFLHlCR2pTSDtBRjRvRlQsQ0RuMkVVO0VBQ0UsZ0NBQUE7QUNzMkVaLENEcDJFWTs7RUFFRSwwQkFBQTtBQ3MyRWQsQ0RuMkVZO0VBQ0Usb0NBQUE7QUNxMkVkLENEcDJFYztFQUNFLDhDQUFBO0FDczJFaEIsQ0QzMUVZO0VBRUUsZ0NBQUE7QUM2MUVkLENEbjFFTTtFQUNFLGlFQUFBO0FDczFFUixDRGgxRVU7O0VBRUUscUJHcFZIO0VIcVZHLHlCR3JWSDtBRndxRlQsQ0QvMEVZOzs7OztFQUdFLHlEQUFBO0FDbTFFZCxDRGgxRVU7RUFDRSxvREFBQTtFQUNBLFlBQUE7RUFDQSwyQkFBQTtBQ2sxRVosQ0RoMUVVO0VBQ0UsZ0NBQUE7QUNrMUVaLENEMTBFVTtFQUNFLG9DQUFBO0VBQ0EsV0t0ZEo7RUx1ZEksNkJBQUE7QUM2MEVaLENEbjBFYztFQUNFLDhCQUFBO0VBQ0EsZ0NBQUE7QUNzMEVoQixDRC96RU07RUFDRSx5QkFBQTtBQ2swRVIsQ0QvekVNO0VBQ0Usb0NBQUE7QUNrMEVSLENEL3pFTTtFQUNFLG9DQUFBO0FDazBFUixDRC96RU07RUFDRSx3Q0FBQTtBQ2swRVIsQ0QvekVNO0VBQ0UsMkNBQUE7QUNrMEVSLENEL3pFTTtFQUNFLHlDQUFBO0FDazBFUixDRC96RU07RUFDRSwwQ0FBQTtBQ2swRVIsQ0QvekVNO0VFaGhCSixtQkNpSE87RURqSGEsaUJBQUE7RUFDcEIsa0NBQUE7QURvMUZGLENEajJFTTtFQUNFLHlCQUFBO0FDbzJFUixDRGoyRU07RUFDRSxvQ0FBQTtBQ28yRVIsQ0RqMkVNO0VBQ0Usb0NBQUE7QUNvMkVSLENEajJFTTtFQUNFLHdDQUFBO0FDbzJFUixDRGoyRU07RUFDRSwyQ0FBQTtBQ28yRVIsQ0RqMkVNO0VBQ0UseUNBQUE7QUNvMkVSLENEajJFTTtFQUNFLDBDQUFBO0FDbzJFUixDRGoyRU07RUVoaEJKLG1CQ2lITztFRGpIYSxpQkFBQTtFQUNwQixrQ0FBQTtBRHMzRkYsQ0RuNEVNO0VBQ0UseUJBQUE7QUNzNEVSLENEbjRFTTtFQUNFLG9DQUFBO0FDczRFUixDRG40RU07RUFDRSxvQ0FBQTtBQ3M0RVIsQ0RuNEVNO0VBQ0Usd0NBQUE7QUNzNEVSLENEbjRFTTtFQUNFLDJDQUFBO0FDczRFUixDRG40RU07RUFDRSx5Q0FBQTtBQ3M0RVIsQ0RuNEVNO0VBQ0UsMENBQUE7QUNzNEVSLENEbjRFTTtFRWhoQkosbUJDaUhPO0VEakhhLGlCQUFBO0VBQ3BCLGtDQUFBO0FEdzVGRixDRHI2RU07RUFDRSx5QkFBQTtBQ3c2RVIsQ0RyNkVNO0VBQ0Usb0NBQUE7QUN3NkVSLENEcjZFTTtFQUNFLG9DQUFBO0FDdzZFUixDRHI2RU07RUFDRSx3Q0FBQTtBQ3c2RVIsQ0RyNkVNO0VBQ0UsMkNBQUE7QUN3NkVSLENEcjZFTTtFQUNFLHlDQUFBO0FDdzZFUixDRHI2RU07RUFDRSwwQ0FBQTtBQ3c2RVIsQ0RyNkVNO0VFaGhCSixtQkNpSE87RURqSGEsaUJBQUE7RUFDcEIsa0NBQUE7QUQwN0ZGLENEdjhFTTtFQUNFLHlCQUFBO0FDMDhFUixDRHY4RU07RUFDRSxvQ0FBQTtBQzA4RVIsQ0R2OEVNO0VBQ0Usb0NBQUE7QUMwOEVSLENEdjhFTTtFQUNFLHdDQUFBO0FDMDhFUixDRHY4RU07RUFDRSwyQ0FBQTtBQzA4RVIsQ0R2OEVNO0VBQ0UseUNBQUE7QUMwOEVSLENEdjhFTTtFQUNFLDBDQUFBO0FDMDhFUixDRHY4RU07RUVoaEJKLG1CQ2lITztFRGpIYSxpQkFBQTtFQUNwQixvQ0FBQTtBRDQ5RkYsQ0R6K0VNO0VBQ0UseUJBQUE7QUM0K0VSLENEeitFTTtFQUNFLG9DQUFBO0FDNCtFUixDRHorRU07RUFDRSxvQ0FBQTtBQzQrRVIsQ0R6K0VNO0VBQ0Usd0NBQUE7QUM0K0VSLENEeitFTTtFQUNFLDJDQUFBO0FDNCtFUixDRHorRU07RUFDRSx5Q0FBQTtBQzQrRVIsQ0R6K0VNO0VBQ0UsMENBQUE7QUM0K0VSLENEeitFTTtFRWhoQkosbUJDaUhPO0VEakhhLGlCQUFBO0VBQ3BCLG9DQUFBO0FEOC9GRixDRDNnRk07RUFDRSx5QkFBQTtBQzhnRlIsQ0QzZ0ZNO0VBQ0Usb0NBQUE7QUM4Z0ZSLENEM2dGTTtFQUNFLG9DQUFBO0FDOGdGUixDRDNnRk07RUFDRSx3Q0FBQTtBQzhnRlIsQ0QzZ0ZNO0VBQ0UsMkNBQUE7QUM4Z0ZSLENEM2dGTTtFQUNFLHlDQUFBO0FDOGdGUixDRDNnRk07RUFDRSwwQ0FBQTtBQzhnRlIsQ0QzZ0ZNO0VFaGhCSixtQkNpSE87RURqSGEsaUJBQUE7RUFDcEIsb0NBQUE7QURnaUdGLENEN2lGTTtFQUNFLHlCQUFBO0FDZ2pGUixDRDdpRk07RUFDRSxvQ0FBQTtBQ2dqRlIsQ0Q3aUZNO0VBQ0Usb0NBQUE7QUNnakZSLENEN2lGTTtFQUNFLHdDQUFBO0FDZ2pGUixDRDdpRk07RUFDRSwyQ0FBQTtBQ2dqRlIsQ0Q3aUZNO0VBQ0UseUNBQUE7QUNnakZSLENEN2lGTTtFQUNFLDBDQUFBO0FDZ2pGUixDRDdpRk07RUVoaEJKLG1CQ2lITztFRGpIYSxpQkFBQTtFQUNwQixvQ0FBQTtBRGtrR0YsQ0Qva0ZNO0VBQ0UseUJBQUE7QUNrbEZSLENEL2tGTTtFQUNFLG9DQUFBO0FDa2xGUixDRC9rRk07RUFDRSxvQ0FBQTtBQ2tsRlIsQ0Qva0ZNO0VBQ0Usd0NBQUE7QUNrbEZSLENEL2tGTTtFQUNFLDJDQUFBO0FDa2xGUixDRC9rRk07RUFDRSx5Q0FBQTtBQ2tsRlIsQ0Qva0ZNO0VBQ0UsMENBQUE7QUNrbEZSLENEL2tGTTtFRWhoQkosbUJDaUhPO0VEakhhLGlCQUFBO0VBQ3BCLG9DQUFBO0FEb21HRixDRGpuRk07RUFDRSx5QkFBQTtBQ29uRlIsQ0RqbkZNO0VBQ0Usb0NBQUE7QUNvbkZSLENEam5GTTtFQUNFLG9DQUFBO0FDb25GUixDRGpuRk07RUFDRSx3Q0FBQTtBQ29uRlIsQ0RqbkZNO0VBQ0UsMkNBQUE7QUNvbkZSLENEam5GTTtFQUNFLHlDQUFBO0FDb25GUixDRGpuRk07RUFDRSwwQ0FBQTtBQ29uRlIsQ0RqbkZNO0VFaGhCSixtQkNpSE87RURqSGEsaUJBQUE7RUFDcEIsb0NBQUE7QURzb0dGLENEbnBGTTtFQUNFLHlCQUFBO0FDc3BGUixDRG5wRk07RUFDRSxvQ0FBQTtBQ3NwRlIsQ0RucEZNO0VBQ0Usb0NBQUE7QUNzcEZSLENEbnBGTTtFQUNFLHdDQUFBO0FDc3BGUixDRG5wRk07RUFDRSwyQ0FBQTtBQ3NwRlIsQ0RucEZNO0VBQ0UseUNBQUE7QUNzcEZSLENEbnBGTTtFQUNFLDBDQUFBO0FDc3BGUixDRG5wRk07RUVoaEJKLG1CQ2lITztFRGpIYSxpQkFBQTtFQUNwQixvQ0FBQTtBRHdxR0YsQ0RyckZNO0VBQ0UseUJBQUE7QUN3ckZSLENEcnJGTTtFQUNFLG9DQUFBO0FDd3JGUixDRHJyRk07RUFDRSxvQ0FBQTtBQ3dyRlIsQ0RyckZNO0VBQ0Usd0NBQUE7QUN3ckZSLENEcnJGTTtFQUNFLDJDQUFBO0FDd3JGUixDRHJyRk07RUFDRSx5Q0FBQTtBQ3dyRlIsQ0RyckZNO0VBQ0UsMENBQUE7QUN3ckZSLENEcnJGTTtFRWhoQkosbUJDaUhPO0VEakhhLGlCQUFBO0VBQ3BCLG9DQUFBO0FEMHNHRixDRHZ0Rk07RUFDRSx5QkFBQTtBQzB0RlIsQ0R2dEZNO0VBQ0Usb0NBQUE7QUMwdEZSLENEdnRGTTtFQUNFLG9DQUFBO0FDMHRGUixDRHZ0Rk07RUFDRSx3Q0FBQTtBQzB0RlIsQ0R2dEZNO0VBQ0UsMkNBQUE7QUMwdEZSLENEdnRGTTtFQUNFLHlDQUFBO0FDMHRGUixDRHZ0Rk07RUFDRSwwQ0FBQTtBQzB0RlIsQ0R2dEZNO0VFaGhCSixtQkNpSE87RURqSGEsaUJBQUE7RUFDcEIsbUNBQUE7QUQ0dUdGLENEL3JHTTtFQUNFLG9DQUFBO0FDa3NHUixDRGhzR1E7O0VBRUUsNkJBQUE7QUNrc0dWLENENXJHUTtFQUNFLCtDQUFBO0VBQ0EseUJBQUE7QUMrckdWLENEN3JHVTtFSTNEUixxREFBQTtBSDJ2R0YsQ0Q1ckdVO0VBQ0UseUJBQUE7QUM4ckdaLENEMXJHVTtFQUNFLHlCQUFBO0FDNHJHWixDRHJyR1E7RUFDRSwrQ0FBQTtFQUNBLHlCQUFBO0FDd3JHVixDRHJyR1U7RUFFRSxxQ0FBQTtBQ3NyR1osQ0RuckdVOztFQUVFLGdDQUFBO0FDcXJHWixDRGpyR1k7RUFDRSw4Q0FBQTtBQ21yR2QsQ0RockdZO0VBQ0UsY0tFRDtBSmdyR2IsQ0QxcUdRO0VBQ0UseUJBQUE7QUM2cUdWLENEeHFHTTtFQUNFLG9DQUFBO0FDMnFHUixDRHhxR007RUFDRSw2QkFBQTtBQzJxR1IsQ0R4cUdNO0VBQ0UsZ0NBQUE7QUMycUdSLENEeHFHTTtFQUNFLDhCQUFBO0FDMnFHUixDRHhxR007RUFDRSwrQkFBQTtBQzJxR1IsQ0RwcUdROzs7RUFDRSxnQ0FBQTtBQ3lxR1YsQ0RqcUdVO0VBQ0UsMENBQUE7RUFDQSx5QkFBQTtBQ29xR1osQ0Q5cEdNO0VFMUpKLG1CQ2lITztFRGpIYSxpQkFBQTtFQUNwQixtQ0FBQTtBRDZ6R0YsQ0Q5cEdRO0VBQ0UsZ0NBQUE7RUFDQSxvQ0FBQTtFQUNBLHNCQUFBO0FDaXFHVixDRC9wR1U7RUFHRSxXSzlKSjtFTCtKSSxvQ0FBQTtBQytwR1osQ0Q1cEdVO0VBQ0UsbUNBQUE7QUM4cEdaLENEM3BHVTtFQUNFLGdCQUFBO0FDNnBHWixDRHRwR1E7RUFDRSw2QkFBQTtFQUNBLGNHekVEO0FGa3VHVCxDRHZwR1U7RUFDRSxjRzVFSDtBRnF1R1QsQ0R0cEdVO0VBQ0UsMENBQUE7QUN3cEdaLENEcnBHVTtFQUdFLHlDQUFBO0VBQ0EsY0d2Rkg7QUY0dUdULENEbHBHVTtFQUNFLCtTQUFBO0FDb3BHWixDRDdvR1E7RUFDRSx5QkduR0Q7RUhvR0Msa0RBQUE7RUFDQSxXSzVNRjtFTDZNRSx5QkFBQTtBQ2dwR1YsQ0Qxb0dZO0VBQ0UseUJBQUE7QUM0b0dkLENEem9HVTtFQUdFLHlCQUFBO0FDeW9HWixDRHRvR1U7RUFDRSxXSzlOSjtBSnMyR1IsQ0R0b0dVO0VBRUUsYUFBQTtFQUNBLGdCQUFBO0VBQ0EsMEJBQUE7QUN1b0daLENEaG9HUTtFQUNFLG9DQUFBO0VBQ0EsNkJBQUE7RUFDQSxjR3ZJRDtBRjB3R1QsQ0Rqb0dVO0VBQ0UsMENBQUE7RUFDQSxjRzNJSDtBRjh3R1QsQ0Rqb0dVO0VBQ0UsZ0JBQUE7QUNtb0daLENEam9HVTtFQUdFLHlDQUFBO0VBQ0EsY0dwSkg7QUZxeEdULENEOW5HVTtFQUNFLCtTQUFBO0FDZ29HWixDRDduR1U7RUFDRSx5Q0FBQTtFQUNBLGNHN0pIO0FGNHhHVCxDRHJuR1k7O0VBQ0UseUtBQUE7QUN5bkdkLENEMW1HVTtFQUNFLHlCR3hMSDtBRnF5R1QsQ0RubUdjO0VBQ0UsY0duTVA7QUZ5eUdULENEcG1HYztFQUNFLHlCQUFBO0FDc21HaEIsQ0QxbEdjO0VBQ0UsOEJBQUE7RUFDQSxXSzNUUjtBSnc1R1IsQ0QzbEdnQjtFQUNFLFdLOVRWO0FKMjVHUixDRHZsR2M7RUFDRSxjRzlOUDtBRnV6R1QsQ0RubEdjO0VBQ0UsbUJHck9QO0VIc09PLFdLN1VSO0FKazZHUixDRDdrR2tCO0VBQ0UsMlRBQUE7QUMra0dwQixDRGprR2tCO0VBQ0UsMlRBQUE7QUNta0dwQixDRGpqR2M7RUFDRSxXS3hYUjtFTHlYUSxvQ0FBQTtFQUNBLHFCR25SUDtFSG9STyxvREFBQTtBQ29qR2hCLENEM2lHUTtFQUNFLDBDQUFBO0FDOGlHVixDRDVpR1U7RUFDRSx5QkdqU0g7QUYrMEdULENEdGlHVTtFQUNFLGdDQUFBO0FDeWlHWixDRHZpR1k7O0VBRUUsMEJBQUE7QUN5aUdkLENEdGlHWTtFQUNFLG9DQUFBO0FDd2lHZCxDRHZpR2M7RUFDRSwrQ0FBQTtBQ3lpR2hCLENEOWhHWTtFQUVFLGdDQUFBO0FDZ2lHZCxDRHRoR007RUFDRSxpRUFBQTtBQ3loR1IsQ0RuaEdVOztFQUVFLHFCR3BWSDtFSHFWRyx5QkdyVkg7QUYyMkdULENEbGhHWTs7Ozs7RUFHRSwwREFBQTtBQ3NoR2QsQ0RuaEdVO0VBQ0UscURBQUE7RUFDQSxZQUFBO0VBQ0EsMkJBQUE7QUNxaEdaLENEbmhHVTtFQUNFLGdDQUFBO0FDcWhHWixDRDdnR1U7RUFDRSxvQ0FBQTtFQUNBLFdLdGRKO0VMdWRJLDZCQUFBO0FDZ2hHWixDRHRnR2M7RUFDRSw4QkFBQTtFQUNBLGdDQUFBO0FDeWdHaEIsQ0RsZ0dNO0VBQ0UseUJBQUE7QUNxZ0dSLENEbGdHTTtFQUNFLG9DQUFBO0FDcWdHUixDRGxnR007RUFDRSxvQ0FBQTtBQ3FnR1IsQ0RsZ0dNO0VBQ0Usd0NBQUE7QUNxZ0dSLENEbGdHTTtFQUNFLDJDQUFBO0FDcWdHUixDRGxnR007RUFDRSx5Q0FBQTtBQ3FnR1IsQ0RsZ0dNO0VBQ0UsMENBQUE7QUNxZ0dSLENEbGdHTTtFRWhoQkosbUJDaUhPO0VEakhhLGlCQUFBO0VBQ3BCLG1DQUFBO0FEdWhIRixDRHBpR007RUFDRSx5QkFBQTtBQ3VpR1IsQ0RwaUdNO0VBQ0Usb0NBQUE7QUN1aUdSLENEcGlHTTtFQUNFLG9DQUFBO0FDdWlHUixDRHBpR007RUFDRSx3Q0FBQTtBQ3VpR1IsQ0RwaUdNO0VBQ0UsMkNBQUE7QUN1aUdSLENEcGlHTTtFQUNFLHlDQUFBO0FDdWlHUixDRHBpR007RUFDRSwwQ0FBQTtBQ3VpR1IsQ0RwaUdNO0VFaGhCSixtQkNpSE87RURqSGEsaUJBQUE7RUFDcEIsbUNBQUE7QUR5akhGLENEdGtHTTtFQUNFLHlCQUFBO0FDeWtHUixDRHRrR007RUFDRSxvQ0FBQTtBQ3lrR1IsQ0R0a0dNO0VBQ0Usb0NBQUE7QUN5a0dSLENEdGtHTTtFQUNFLHdDQUFBO0FDeWtHUixDRHRrR007RUFDRSwyQ0FBQTtBQ3lrR1IsQ0R0a0dNO0VBQ0UseUNBQUE7QUN5a0dSLENEdGtHTTtFQUNFLDBDQUFBO0FDeWtHUixDRHRrR007RUVoaEJKLG1CQ2lITztFRGpIYSxpQkFBQTtFQUNwQixrQ0FBQTtBRDJsSEYsQ0R4bUdNO0VBQ0UseUJBQUE7QUMybUdSLENEeG1HTTtFQUNFLG9DQUFBO0FDMm1HUixDRHhtR007RUFDRSxvQ0FBQTtBQzJtR1IsQ0R4bUdNO0VBQ0Usd0NBQUE7QUMybUdSLENEeG1HTTtFQUNFLDJDQUFBO0FDMm1HUixDRHhtR007RUFDRSx5Q0FBQTtBQzJtR1IsQ0R4bUdNO0VBQ0UsMENBQUE7QUMybUdSLENEeG1HTTtFRWhoQkosbUJDaUhPO0VEakhhLGlCQUFBO0VBQ3BCLGtDQUFBO0FENm5IRixDRDFvR007RUFDRSx5QkFBQTtBQzZvR1IsQ0Qxb0dNO0VBQ0Usb0NBQUE7QUM2b0dSLENEMW9HTTtFQUNFLG9DQUFBO0FDNm9HUixDRDFvR007RUFDRSx3Q0FBQTtBQzZvR1IsQ0Qxb0dNO0VBQ0UsMkNBQUE7QUM2b0dSLENEMW9HTTtFQUNFLHlDQUFBO0FDNm9HUixDRDFvR007RUFDRSwwQ0FBQTtBQzZvR1IsQ0Qxb0dNO0VFaGhCSixtQkNpSE87RURqSGEsaUJBQUE7RUFDcEIsb0NBQUE7QUQrcEhGLENENXFHTTtFQUNFLHlCQUFBO0FDK3FHUixDRDVxR007RUFDRSxvQ0FBQTtBQytxR1IsQ0Q1cUdNO0VBQ0Usb0NBQUE7QUMrcUdSLENENXFHTTtFQUNFLHdDQUFBO0FDK3FHUixDRDVxR007RUFDRSwyQ0FBQTtBQytxR1IsQ0Q1cUdNO0VBQ0UseUNBQUE7QUMrcUdSLENENXFHTTtFQUNFLDBDQUFBO0FDK3FHUixDRDVxR007RUVoaEJKLG1CQ2lITztFRGpIYSxpQkFBQTtFQUNwQixvQ0FBQTtBRGlzSEYsQ0Q5c0dNO0VBQ0UseUJBQUE7QUNpdEdSLENEOXNHTTtFQUNFLG9DQUFBO0FDaXRHUixDRDlzR007RUFDRSxvQ0FBQTtBQ2l0R1IsQ0Q5c0dNO0VBQ0Usd0NBQUE7QUNpdEdSLENEOXNHTTtFQUNFLDJDQUFBO0FDaXRHUixDRDlzR007RUFDRSx5Q0FBQTtBQ2l0R1IsQ0Q5c0dNO0VBQ0UsMENBQUE7QUNpdEdSLENEOXNHTTtFRWhoQkosbUJDaUhPO0VEakhhLGlCQUFBO0VBQ3BCLG9DQUFBO0FEbXVIRixDRGh2R007RUFDRSx5QkFBQTtBQ212R1IsQ0RodkdNO0VBQ0Usb0NBQUE7QUNtdkdSLENEaHZHTTtFQUNFLG9DQUFBO0FDbXZHUixDRGh2R007RUFDRSx3Q0FBQTtBQ212R1IsQ0RodkdNO0VBQ0UsMkNBQUE7QUNtdkdSLENEaHZHTTtFQUNFLHlDQUFBO0FDbXZHUixDRGh2R007RUFDRSwwQ0FBQTtBQ212R1IsQ0RodkdNO0VFaGhCSixtQkNpSE87RURqSGEsaUJBQUE7RUFDcEIsb0NBQUE7QURxd0hGLENEbHhHTTtFQUNFLHlCQUFBO0FDcXhHUixDRGx4R007RUFDRSxvQ0FBQTtBQ3F4R1IsQ0RseEdNO0VBQ0Usb0NBQUE7QUNxeEdSLENEbHhHTTtFQUNFLHdDQUFBO0FDcXhHUixDRGx4R007RUFDRSwyQ0FBQTtBQ3F4R1IsQ0RseEdNO0VBQ0UseUNBQUE7QUNxeEdSLENEbHhHTTtFQUNFLDBDQUFBO0FDcXhHUixDRGx4R007RUVoaEJKLG1CQ2lITztFRGpIYSxpQkFBQTtFQUNwQixvQ0FBQTtBRHV5SEYsQ0RwekdNO0VBQ0UseUJBQUE7QUN1ekdSLENEcHpHTTtFQUNFLG9DQUFBO0FDdXpHUixDRHB6R007RUFDRSxvQ0FBQTtBQ3V6R1IsQ0RwekdNO0VBQ0Usd0NBQUE7QUN1ekdSLENEcHpHTTtFQUNFLDJDQUFBO0FDdXpHUixDRHB6R007RUFDRSx5Q0FBQTtBQ3V6R1IsQ0RwekdNO0VBQ0UsMENBQUE7QUN1ekdSLENEcHpHTTtFRWhoQkosbUJDaUhPO0VEakhhLGlCQUFBO0VBQ3BCLG9DQUFBO0FEeTBIRixDRHQxR007RUFDRSx5QkFBQTtBQ3kxR1IsQ0R0MUdNO0VBQ0Usb0NBQUE7QUN5MUdSLENEdDFHTTtFQUNFLG9DQUFBO0FDeTFHUixDRHQxR007RUFDRSx3Q0FBQTtBQ3kxR1IsQ0R0MUdNO0VBQ0UsMkNBQUE7QUN5MUdSLENEdDFHTTtFQUNFLHlDQUFBO0FDeTFHUixDRHQxR007RUFDRSwwQ0FBQTtBQ3kxR1IsQ0R0MUdNO0VFaGhCSixtQkNpSE87RURqSGEsaUJBQUE7RUFDcEIsa0NBQUE7QUQyMkhGLENEeDNHTTtFQUNFLHlCQUFBO0FDMjNHUixDRHgzR007RUFDRSxvQ0FBQTtBQzIzR1IsQ0R4M0dNO0VBQ0Usb0NBQUE7QUMyM0dSLENEeDNHTTtFQUNFLHdDQUFBO0FDMjNHUixDRHgzR007RUFDRSwyQ0FBQTtBQzIzR1IsQ0R4M0dNO0VBQ0UseUNBQUE7QUMyM0dSLENEeDNHTTtFQUNFLDBDQUFBO0FDMjNHUixDRHgzR007RUVoaEJKLG1CQ2lITztFRGpIYSxpQkFBQTtFQUNwQixrQ0FBQTtBRDY0SEYsQ0QxNUdNO0VBQ0UseUJBQUE7QUM2NUdSLENEMTVHTTtFQUNFLG9DQUFBO0FDNjVHUixDRDE1R007RUFDRSxvQ0FBQTtBQzY1R1IsQ0QxNUdNO0VBQ0Usd0NBQUE7QUM2NUdSLENEMTVHTTtFQUNFLDJDQUFBO0FDNjVHUixDRDE1R007RUFDRSx5Q0FBQTtBQzY1R1IsQ0QxNUdNO0VBQ0UsMENBQUE7QUM2NUdSLENEMTVHTTtFRWhoQkosbUJDaUhPO0VEakhhLGlCQUFBO0VBQ3BCLGtDQUFBO0FEKzZIRixDRGw0SE07RUFDRSxvQ0FBQTtBQ3E0SFIsQ0RuNEhROztFQUVFLDZCQUFBO0FDcTRIVixDRC8zSFE7RUFDRSw0Q0FBQTtFQUNBLHlCQUFBO0FDazRIVixDRGg0SFU7RUkzRFIsa0RBQUE7QUg4N0hGLENELzNIVTtFQUNFLHlCQUFBO0FDaTRIWixDRDczSFU7RUFDRSx5QkFBQTtBQyszSFosQ0R4M0hRO0VBQ0UsNENBQUE7RUFDQSx5QkFBQTtBQzIzSFYsQ0R4M0hVO0VBRUUsa0NBQUE7QUN5M0haLENEdDNIVTs7RUFFRSxnQ0FBQTtBQ3czSFosQ0RwM0hZO0VBQ0UsMkNBQUE7QUNzM0hkLENEbjNIWTtFQUNFLGNLRUQ7QUptM0hiLENENzJIUTtFQUNFLHlCQUFBO0FDZzNIVixDRDMySE07RUFDRSxvQ0FBQTtBQzgySFIsQ0QzMkhNO0VBQ0UsNkJBQUE7QUM4MkhSLENEMzJITTtFQUNFLGdDQUFBO0FDODJIUixDRDMySE07RUFDRSw4QkFBQTtBQzgySFIsQ0QzMkhNO0VBQ0UsK0JBQUE7QUM4MkhSLENEdjJIUTs7O0VBQ0UsZ0NBQUE7QUM0MkhWLENEcDJIVTtFQUNFLHVDQUFBO0VBQ0EseUJBQUE7QUN1MkhaLENEajJITTtFRTFKSixtQkNpSE87RURqSGEsaUJBQUE7RUFDcEIsZ0NBQUE7QURnZ0lGLENEajJIUTtFQUNFLGdDQUFBO0VBQ0Esb0NBQUE7RUFDQSxzQkFBQTtBQ28ySFYsQ0RsMkhVO0VBR0UsV0s5Sko7RUwrSkksb0NBQUE7QUNrMkhaLENELzFIVTtFQUNFLCtCQUFBO0FDaTJIWixDRDkxSFU7RUFDRSxnQkFBQTtBQ2cySFosQ0R6MUhRO0VBQ0UsNkJBQUE7RUFDQSxjR3pFRDtBRnE2SFQsQ0QxMUhVO0VBQ0UsY0c1RUg7QUZ3NkhULENEejFIVTtFQUNFLHVDQUFBO0FDMjFIWixDRHgxSFU7RUFHRSxzQ0FBQTtFQUNBLGNHdkZIO0FGKzZIVCxDRHIxSFU7RUFDRSwrU0FBQTtBQ3UxSFosQ0RoMUhRO0VBQ0UseUJHbkdEO0VIb0dDLGtEQUFBO0VBQ0EsV0s1TUY7RUw2TUUseUJBQUE7QUNtMUhWLENENzBIWTtFQUNFLHlCQUFBO0FDKzBIZCxDRDUwSFU7RUFHRSx5QkFBQTtBQzQwSFosQ0R6MEhVO0VBQ0UsV0s5Tko7QUp5aUlSLENEejBIVTtFQUVFLGFBQUE7RUFDQSxnQkFBQTtFQUNBLDBCQUFBO0FDMDBIWixDRG4wSFE7RUFDRSxvQ0FBQTtFQUNBLDZCQUFBO0VBQ0EsY0d2SUQ7QUY2OEhULENEcDBIVTtFQUNFLHVDQUFBO0VBQ0EsY0czSUg7QUZpOUhULENEcDBIVTtFQUNFLGdCQUFBO0FDczBIWixDRHAwSFU7RUFHRSxzQ0FBQTtFQUNBLGNHcEpIO0FGdzlIVCxDRGowSFU7RUFDRSwrU0FBQTtBQ20wSFosQ0RoMEhVO0VBQ0Usc0NBQUE7RUFDQSxjRzdKSDtBRis5SFQsQ0R4ekhZOztFQUNFLDZKQUFBO0FDNHpIZCxDRDd5SFU7RUFDRSx5Qkd4TEg7QUZ3K0hULENEdHlIYztFQUNFLGNHbk1QO0FGNCtIVCxDRHZ5SGM7RUFDRSx5QkFBQTtBQ3l5SGhCLENEN3hIYztFQUNFLDhCQUFBO0VBQ0EsV0szVFI7QUoybElSLENEOXhIZ0I7RUFDRSxXSzlUVjtBSjhsSVIsQ0QxeEhjO0VBQ0UsY0c5TlA7QUYwL0hULENEdHhIYztFQUNFLG1CR3JPUDtFSHNPTyxXSzdVUjtBSnFtSVIsQ0RoeEhrQjtFQUNFLDJUQUFBO0FDa3hIcEIsQ0Rwd0hrQjtFQUNFLDJUQUFBO0FDc3dIcEIsQ0RwdkhjO0VBQ0UsV0t4WFI7RUx5WFEsb0NBQUE7RUFDQSxxQkduUlA7RUhvUk8saURBQUE7QUN1dkhoQixDRDl1SFE7RUFDRSx1Q0FBQTtBQ2l2SFYsQ0QvdUhVO0VBQ0UseUJHalNIO0FGa2hJVCxDRHp1SFU7RUFDRSxnQ0FBQTtBQzR1SFosQ0QxdUhZOztFQUVFLDBCQUFBO0FDNHVIZCxDRHp1SFk7RUFDRSxvQ0FBQTtBQzJ1SGQsQ0QxdUhjO0VBQ0UsNENBQUE7QUM0dUhoQixDRGp1SFk7RUFFRSxnQ0FBQTtBQ211SGQsQ0R6dEhNO0VBQ0UsaUVBQUE7QUM0dEhSLENEdHRIVTs7RUFFRSxxQkdwVkg7RUhxVkcseUJHclZIO0FGOGlJVCxDRHJ0SFk7Ozs7O0VBR0UsdURBQUE7QUN5dEhkLENEdHRIVTtFQUNFLGtEQUFBO0VBQ0EsWUFBQTtFQUNBLDJCQUFBO0FDd3RIWixDRHR0SFU7RUFDRSxnQ0FBQTtBQ3d0SFosQ0RodEhVO0VBQ0Usb0NBQUE7RUFDQSxXS3RkSjtFTHVkSSw2QkFBQTtBQ210SFosQ0R6c0hjO0VBQ0UsOEJBQUE7RUFDQSxnQ0FBQTtBQzRzSGhCLENEcnNITTtFQUNFLHlCQUFBO0FDd3NIUixDRHJzSE07RUFDRSxvQ0FBQTtBQ3dzSFIsQ0Ryc0hNO0VBQ0Usb0NBQUE7QUN3c0hSLENEcnNITTtFQUNFLHdDQUFBO0FDd3NIUixDRHJzSE07RUFDRSwyQ0FBQTtBQ3dzSFIsQ0Ryc0hNO0VBQ0UseUNBQUE7QUN3c0hSLENEcnNITTtFQUNFLDBDQUFBO0FDd3NIUixDRHJzSE07RUVoaEJKLG1CQ2lITztFRGpIYSxpQkFBQTtFQUNwQixnQ0FBQTtBRDB0SUYsQ0R2dUhNO0VBQ0UseUJBQUE7QUMwdUhSLENEdnVITTtFQUNFLG9DQUFBO0FDMHVIUixDRHZ1SE07RUFDRSxvQ0FBQTtBQzB1SFIsQ0R2dUhNO0VBQ0Usd0NBQUE7QUMwdUhSLENEdnVITTtFQUNFLDJDQUFBO0FDMHVIUixDRHZ1SE07RUFDRSx5Q0FBQTtBQzB1SFIsQ0R2dUhNO0VBQ0UsMENBQUE7QUMwdUhSLENEdnVITTtFRWhoQkosbUJDaUhPO0VEakhhLGlCQUFBO0VBQ3BCLGdDQUFBO0FENHZJRixDRHp3SE07RUFDRSx5QkFBQTtBQzR3SFIsQ0R6d0hNO0VBQ0Usb0NBQUE7QUM0d0hSLENEendITTtFQUNFLG9DQUFBO0FDNHdIUixDRHp3SE07RUFDRSx3Q0FBQTtBQzR3SFIsQ0R6d0hNO0VBQ0UsMkNBQUE7QUM0d0hSLENEendITTtFQUNFLHlDQUFBO0FDNHdIUixDRHp3SE07RUFDRSwwQ0FBQTtBQzR3SFIsQ0R6d0hNO0VFaGhCSixtQkNpSE87RURqSGEsaUJBQUE7RUFDcEIsZ0NBQUE7QUQ4eElGLENEM3lITTtFQUNFLHlCQUFBO0FDOHlIUixDRDN5SE07RUFDRSxvQ0FBQTtBQzh5SFIsQ0QzeUhNO0VBQ0Usb0NBQUE7QUM4eUhSLENEM3lITTtFQUNFLHdDQUFBO0FDOHlIUixDRDN5SE07RUFDRSwyQ0FBQTtBQzh5SFIsQ0QzeUhNO0VBQ0UseUNBQUE7QUM4eUhSLENEM3lITTtFQUNFLDBDQUFBO0FDOHlIUixDRDN5SE07RUVoaEJKLG1CQ2lITztFRGpIYSxpQkFBQTtFQUNwQixnQ0FBQTtBRGcwSUYsQ0Q3MEhNO0VBQ0UseUJBQUE7QUNnMUhSLENENzBITTtFQUNFLG9DQUFBO0FDZzFIUixDRDcwSE07RUFDRSxvQ0FBQTtBQ2cxSFIsQ0Q3MEhNO0VBQ0Usd0NBQUE7QUNnMUhSLENENzBITTtFQUNFLDJDQUFBO0FDZzFIUixDRDcwSE07RUFDRSx5Q0FBQTtBQ2cxSFIsQ0Q3MEhNO0VBQ0UsMENBQUE7QUNnMUhSLENENzBITTtFRWhoQkosbUJDaUhPO0VEakhhLGlCQUFBO0VBQ3BCLG9DQUFBO0FEazJJRixDRC8ySE07RUFDRSx5QkFBQTtBQ2szSFIsQ0QvMkhNO0VBQ0Usb0NBQUE7QUNrM0hSLENELzJITTtFQUNFLG9DQUFBO0FDazNIUixDRC8ySE07RUFDRSx3Q0FBQTtBQ2szSFIsQ0QvMkhNO0VBQ0UsMkNBQUE7QUNrM0hSLENELzJITTtFQUNFLHlDQUFBO0FDazNIUixDRC8ySE07RUFDRSwwQ0FBQTtBQ2szSFIsQ0QvMkhNO0VFaGhCSixtQkNpSE87RURqSGEsaUJBQUE7RUFDcEIsb0NBQUE7QURvNElGLENEajVITTtFQUNFLHlCQUFBO0FDbzVIUixDRGo1SE07RUFDRSxvQ0FBQTtBQ281SFIsQ0RqNUhNO0VBQ0Usb0NBQUE7QUNvNUhSLENEajVITTtFQUNFLHdDQUFBO0FDbzVIUixDRGo1SE07RUFDRSwyQ0FBQTtBQ281SFIsQ0RqNUhNO0VBQ0UseUNBQUE7QUNvNUhSLENEajVITTtFQUNFLDBDQUFBO0FDbzVIUixDRGo1SE07RUVoaEJKLG1CQ2lITztFRGpIYSxpQkFBQTtFQUNwQixvQ0FBQTtBRHM2SUYsQ0RuN0hNO0VBQ0UseUJBQUE7QUNzN0hSLENEbjdITTtFQUNFLG9DQUFBO0FDczdIUixDRG43SE07RUFDRSxvQ0FBQTtBQ3M3SFIsQ0RuN0hNO0VBQ0Usd0NBQUE7QUNzN0hSLENEbjdITTtFQUNFLDJDQUFBO0FDczdIUixDRG43SE07RUFDRSx5Q0FBQTtBQ3M3SFIsQ0RuN0hNO0VBQ0UsMENBQUE7QUNzN0hSLENEbjdITTtFRWhoQkosbUJDaUhPO0VEakhhLGlCQUFBO0VBQ3BCLG9DQUFBO0FEdzhJRixDSzU2SVE7O0VBRUUsV0RyQkY7RUNzQkUseUJBQUE7RUNOUiwwREFBQTtFQUNBLDJCQUFBO0VEZVUseUJBQUE7QUx3NklaLENLNTZJWTs7RUNaViwwREFBQTtFQUNBLDJCQUFBO0VEYVkseUJBQUE7QUxnN0lkLENLdjZJVTs7O0VBRUUsV0R6Q0o7QUptOUlSLENLeDZJVTs7RUFDRSwyQkFBQTtBTDI2SVosQ0t6NklVOztFQUNFLHdCQUFBO0FMNDZJWixDSzE2SVU7OztFQ2pDUiwwREFBQTtFQUNBLDJCQUFBO0VEcUNVLHlCQUFBO0FMNDZJWixDSy84SVE7O0VBRUUsV0RyQkY7RUNzQkUseUJBQUE7RUNOUiwwREFBQTtFQUNBLDJCQUFBO0VEb0JVLHlCQUFBO0FMczhJWixDS3A4SVU7OztFQUVFLFdEekNKO0FKZy9JUixDS3I4SVU7O0VBQ0UsMkJBQUE7QUx3OElaLENLdDhJVTs7RUFDRSx3QkFBQTtBTHk4SVosQ0t2OElVOzs7RUNqQ1IsMERBQUE7RUFDQSwyQkFBQTtFRHFDVSx5QkFBQTtBTHk4SVosQ0s1K0lROztFQUVFLFdEckJGO0VDc0JFLHlCQUFBO0VDTlIsMERBQUE7RUFDQSwyQkFBQTtFRG9CVSx5QkFBQTtBTG0rSVosQ0tqK0lVOzs7RUFFRSxXRHpDSjtBSjZnSlIsQ0tsK0lVOztFQUNFLDJCQUFBO0FMcStJWixDS24rSVU7O0VBQ0Usd0JBQUE7QUxzK0laLENLcCtJVTs7O0VDakNSLDBEQUFBO0VBQ0EsMkJBQUE7RURxQ1UseUJBQUE7QUxzK0laLENLemdKUTs7RUFFRSxXRHJCRjtFQ3NCRSx5QkFBQTtFQ05SLDBEQUFBO0VBQ0EsMkJBQUE7RURvQlUseUJBQUE7QUxnZ0paLENLOS9JVTs7O0VBRUUsV0R6Q0o7QUowaUpSLENLLy9JVTs7RUFDRSwyQkFBQTtBTGtnSlosQ0toZ0pVOztFQUNFLHdCQUFBO0FMbWdKWixDS2pnSlU7OztFQ2pDUiwwREFBQTtFQUNBLDJCQUFBO0VEcUNVLHlCQUFBO0FMbWdKWixDS3RpSlE7O0VBRUUsV0RyQkY7RUNzQkUseUJBQUE7RUNOUiwwREFBQTtFQUNBLDJCQUFBO0VEb0JVLHlCQUFBO0FMNmhKWixDSzNoSlU7OztFQUVFLFdEekNKO0FKdWtKUixDSzVoSlU7O0VBQ0UsMkJBQUE7QUwraEpaLENLN2hKVTs7RUFDRSx3QkFBQTtBTGdpSlosQ0s5aEpVOzs7RUNqQ1IsMERBQUE7RUFDQSwyQkFBQTtFRHFDVSx5QkFBQTtBTGdpSlosQ0tua0pROztFQUVFLFdEckJGO0VDc0JFLHlCQUFBO0VDTlIsMERBQUE7RUFDQSwyQkFBQTtFRG9CVSx5QkFBQTtBTDBqSlosQ0t4akpVOzs7RUFFRSxXRHpDSjtBSm9tSlIsQ0t6akpVOztFQUNFLDJCQUFBO0FMNGpKWixDSzFqSlU7O0VBQ0Usd0JBQUE7QUw2akpaLENLM2pKVTs7O0VDakNSLDBEQUFBO0VBQ0EsMkJBQUE7RURxQ1UseUJBQUE7QUw2akpaLENLaG1KUTs7RUFFRSxXRHJCRjtFQ3NCRSx5QkFBQTtFQ05SLDBEQUFBO0VBQ0EsMkJBQUE7RURvQlUseUJBQUE7QUx1bEpaLENLcmxKVTs7O0VBRUUsV0R6Q0o7QUppb0pSLENLdGxKVTs7RUFDRSwyQkFBQTtBTHlsSlosQ0t2bEpVOztFQUNFLHdCQUFBO0FMMGxKWixDS3hsSlU7OztFQ2pDUiwwREFBQTtFQUNBLDJCQUFBO0VEcUNVLHlCQUFBO0FMMGxKWixDTzdvSkU7RUFDRSxVQUFBO0VBQ0EsOENIbU9xQjtBSjY2SXpCLENPOW9KSTtFQUNFLGdDQUFBO0VBQ0Esd0JBQUE7RUFDQSwyQkFBQTtFQUNBLHlCQUFBO0VBQ0EsMkJBQUE7QVBncEpOLENPN29KRTtFQUNFLHlCQUFBO0VBQ0EsMkJBQUE7QVArb0pKLENPNW9KSTtFQUNFLGdDQUFBO0FQOG9KTixDT3pvSkk7RUFDRSxvQ0FBQTtFQUNBLFdINUJFO0VHNkJGLHVCQUFBO0VBQ0EsNEJBQUE7RUFDQSw2QkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtBUDJvSk4sQ094b0pRO0VBQ0Usb0JBQUE7QVAwb0pWLENPdm9KUTtFQUNFLG9CQUFBO0FQeW9KVixDT3RvSlE7RUFDRSx3Q0FBQTtBUHdvSlYsQ09wb0pRO0VBQ0UsNEJBQUE7QVBzb0pWLENPcG9KUTtFQUNFLDRCQUFBO0FQc29KVixDT2pvSk07RUFDRSxtQkFBQTtBUG1vSlIsQ083bkpJO0VBQ0UsZ0JBQUE7RUFDQSw0QkFBQTtBUCtuSk4sQ083bkpNO0VBQ0UsNEJBQUE7RUFDQSxZQUFBO0FQK25KUixDTzduSlU7RUFDRSw0QkFBQTtBUCtuSlosQ083bkpVO0VBQ0UsNEJBQUE7QVArbkpaLENPM25KTTtFQUNFLHVCQUFBO0FQNm5KUixDT3ZuSkk7RUFDRSwyQkFBQTtFQUNBLGtCQUFBO0FQeW5KTixDT3ZuSk07RUFDRSxZQUFBO0VBQ0EsMkJBQUE7QVB5bkpSLENPdm5KVTtFQUNFLDJCQUFBO0FQeW5KWixDT3ZuSlU7RUFDRSwyQkFBQTtBUHluSlosQ09qbkpJO0VBQ0Usb0NBQUE7RUFDQSxzQkFBQTtBUG1uSk4sQ09sbkpNO0VBQ0Usb0NBQUE7RUFDQSxzQkFBQTtBUG9uSlIsQ09sbkpNO0VBQ0UsK0JBQUE7QVBvbkpSLENPam5KSTtFQUNFLG9EQUFBO0VBQ0EseUJBQUE7QVBtbkpOLENPam5KSTtFQUNFLHlCQUFBO0FQbW5KTixDT2huSkU7RUFDRSxtVkFBQTtFQUNBLHFDQUFBO0VBQ0EsNEJBQUE7RUFDQSx5QkFBQTtFQUNBLHFCQUFBO0VBQ0EsY0FBQTtFQUNBLGFBQUE7RUFDQSxPQUFBO0VBQ0EsNkJBQUE7QVBrbkpKLENPaG5KRTtFQUNFLG1CQUFBO0FQa25KSixDT2huSkU7RUFDRSxZQUFBO0FQa25KSixDTzVtSkU7RUFDRSx5QkNoSWtCO0VEaUlsQixxQkM5SXNCO0VEK0l0QixjQ3pJMEI7QVJ3dko5QixDTzltSkk7RUFDRSx5QkFBQTtBUGduSk4sQ08zbUpNO0VBQ0Usb0RBQUE7RUFDQSx5QkFBQTtBUDZtSlIsQ096bUpFO0VBQ0UseUJDL0ppQjtFRGdLakIscUJDOUpzQjtBUnl3SjFCLENPem1KRTtFQUNFLHlCQ25LaUI7RURvS2pCLHFCQ2xLc0I7QVI2d0oxQixDT3ptSkU7RUFDRSx5QkN2S2lCO0FSa3hKckIsQ096bUpFO0VBQ0Usb0NBQUE7RUFDQSx5QkFBQTtBUDJtSkosQ08xbUpJO0VBQ0UseUJBQUE7QVA0bUpOLENPem1KRTtFQUNFLGdDQUFBO0FQMm1KSixDTzFtSkk7RUFDRSxvQ0FBQTtBUDRtSk4sQ08zbUpNO0VBQ0UseUJBQUE7QVA2bUpSIiwiZmlsZSI6ImN1c3RvbWVyLWxlZGdlci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5uZy1zZWxlY3Qubmctc2VsZWN0LW9wZW5lZD4ubmctc2VsZWN0LWNvbnRhaW5lcntiYWNrZ3JvdW5kOiNmZmY7Ym9yZGVyLWNvbG9yOiNiM2IzYjMgI2NjYyAjZDlkOWQ5fS5uZy1zZWxlY3Qubmctc2VsZWN0LW9wZW5lZD4ubmctc2VsZWN0LWNvbnRhaW5lcjpob3Zlcntib3gtc2hhZG93Om5vbmV9Lm5nLXNlbGVjdC5uZy1zZWxlY3Qtb3BlbmVkPi5uZy1zZWxlY3QtY29udGFpbmVyIC5uZy1hcnJvd3t0b3A6LTJweDtib3JkZXItY29sb3I6dHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgIzk5OTtib3JkZXItd2lkdGg6MCA1cHggNXB4fS5uZy1zZWxlY3Qubmctc2VsZWN0LW9wZW5lZD4ubmctc2VsZWN0LWNvbnRhaW5lciAubmctYXJyb3c6aG92ZXJ7Ym9yZGVyLWNvbG9yOnRyYW5zcGFyZW50IHRyYW5zcGFyZW50ICMzMzN9Lm5nLXNlbGVjdC5uZy1zZWxlY3Qtb3BlbmVkLm5nLXNlbGVjdC1ib3R0b20+Lm5nLXNlbGVjdC1jb250YWluZXJ7Ym9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6MDtib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOjB9Lm5nLXNlbGVjdC5uZy1zZWxlY3Qtb3BlbmVkLm5nLXNlbGVjdC10b3A+Lm5nLXNlbGVjdC1jb250YWluZXJ7Ym9yZGVyLXRvcC1yaWdodC1yYWRpdXM6MDtib3JkZXItdG9wLWxlZnQtcmFkaXVzOjB9Lm5nLXNlbGVjdC5uZy1zZWxlY3QtZm9jdXNlZDpub3QoLm5nLXNlbGVjdC1vcGVuZWQpPi5uZy1zZWxlY3QtY29udGFpbmVye2JvcmRlci1jb2xvcjojMDA3ZWZmO2JveC1zaGFkb3c6aW5zZXQgMCAxcHggMXB4IHJnYmEoMCwwLDAsMC4wNzUpLDAgMCAwIDNweCByZ2JhKDAsMTI2LDI1NSwwLjEpfS5uZy1zZWxlY3Qubmctc2VsZWN0LWRpc2FibGVkPi5uZy1zZWxlY3QtY29udGFpbmVye2JhY2tncm91bmQtY29sb3I6I2Y5ZjlmOX0ubmctc2VsZWN0IC5uZy1oYXMtdmFsdWUgLm5nLXBsYWNlaG9sZGVye2Rpc3BsYXk6bm9uZX0ubmctc2VsZWN0IC5uZy1zZWxlY3QtY29udGFpbmVye2NvbG9yOiMzMzM7YmFja2dyb3VuZC1jb2xvcjojZmZmO2JvcmRlci1yYWRpdXM6NHB4O2JvcmRlcjoxcHggc29saWQgI2NjYzttaW4taGVpZ2h0OjM2cHg7YWxpZ24taXRlbXM6Y2VudGVyfS5uZy1zZWxlY3QgLm5nLXNlbGVjdC1jb250YWluZXI6aG92ZXJ7Ym94LXNoYWRvdzowIDFweCAwIHJnYmEoMCwwLDAsMC4wNil9Lm5nLXNlbGVjdCAubmctc2VsZWN0LWNvbnRhaW5lciAubmctdmFsdWUtY29udGFpbmVye2FsaWduLWl0ZW1zOmNlbnRlcjtwYWRkaW5nLWxlZnQ6MTBweH1bZGlyPVwicnRsXCJdIC5uZy1zZWxlY3QgLm5nLXNlbGVjdC1jb250YWluZXIgLm5nLXZhbHVlLWNvbnRhaW5lcntwYWRkaW5nLXJpZ2h0OjEwcHg7cGFkZGluZy1sZWZ0OjB9Lm5nLXNlbGVjdCAubmctc2VsZWN0LWNvbnRhaW5lciAubmctdmFsdWUtY29udGFpbmVyIC5uZy1wbGFjZWhvbGRlcntjb2xvcjojOTk5fS5uZy1zZWxlY3Qubmctc2VsZWN0LXNpbmdsZSAubmctc2VsZWN0LWNvbnRhaW5lcntoZWlnaHQ6MzZweH0ubmctc2VsZWN0Lm5nLXNlbGVjdC1zaW5nbGUgLm5nLXNlbGVjdC1jb250YWluZXIgLm5nLXZhbHVlLWNvbnRhaW5lciAubmctaW5wdXR7dG9wOjVweDtsZWZ0OjA7cGFkZGluZy1sZWZ0OjEwcHg7cGFkZGluZy1yaWdodDo1MHB4fVtkaXI9XCJydGxcIl0gLm5nLXNlbGVjdC5uZy1zZWxlY3Qtc2luZ2xlIC5uZy1zZWxlY3QtY29udGFpbmVyIC5uZy12YWx1ZS1jb250YWluZXIgLm5nLWlucHV0e3BhZGRpbmctcmlnaHQ6MTBweDtwYWRkaW5nLWxlZnQ6NTBweH0ubmctc2VsZWN0Lm5nLXNlbGVjdC1tdWx0aXBsZS5uZy1zZWxlY3QtZGlzYWJsZWQ+Lm5nLXNlbGVjdC1jb250YWluZXIgLm5nLXZhbHVlLWNvbnRhaW5lciAubmctdmFsdWV7YmFja2dyb3VuZC1jb2xvcjojZjlmOWY5O2JvcmRlcjoxcHggc29saWQgI2U2ZTZlNn0ubmctc2VsZWN0Lm5nLXNlbGVjdC1tdWx0aXBsZS5uZy1zZWxlY3QtZGlzYWJsZWQ+Lm5nLXNlbGVjdC1jb250YWluZXIgLm5nLXZhbHVlLWNvbnRhaW5lciAubmctdmFsdWUgLm5nLXZhbHVlLWxhYmVse3BhZGRpbmc6MCA1cHh9Lm5nLXNlbGVjdC5uZy1zZWxlY3QtbXVsdGlwbGUgLm5nLXNlbGVjdC1jb250YWluZXIgLm5nLXZhbHVlLWNvbnRhaW5lcntwYWRkaW5nLXRvcDo1cHg7cGFkZGluZy1sZWZ0OjdweH1bZGlyPVwicnRsXCJdIC5uZy1zZWxlY3Qubmctc2VsZWN0LW11bHRpcGxlIC5uZy1zZWxlY3QtY29udGFpbmVyIC5uZy12YWx1ZS1jb250YWluZXJ7cGFkZGluZy1yaWdodDo3cHg7cGFkZGluZy1sZWZ0OjB9Lm5nLXNlbGVjdC5uZy1zZWxlY3QtbXVsdGlwbGUgLm5nLXNlbGVjdC1jb250YWluZXIgLm5nLXZhbHVlLWNvbnRhaW5lciAubmctdmFsdWV7Zm9udC1zaXplOi45ZW07bWFyZ2luLWJvdHRvbTo1cHg7YmFja2dyb3VuZC1jb2xvcjojZWJmNWZmO2JvcmRlci1yYWRpdXM6MnB4O21hcmdpbi1yaWdodDo1cHh9W2Rpcj1cInJ0bFwiXSAubmctc2VsZWN0Lm5nLXNlbGVjdC1tdWx0aXBsZSAubmctc2VsZWN0LWNvbnRhaW5lciAubmctdmFsdWUtY29udGFpbmVyIC5uZy12YWx1ZXttYXJnaW4tcmlnaHQ6MDttYXJnaW4tbGVmdDo1cHh9Lm5nLXNlbGVjdC5uZy1zZWxlY3QtbXVsdGlwbGUgLm5nLXNlbGVjdC1jb250YWluZXIgLm5nLXZhbHVlLWNvbnRhaW5lciAubmctdmFsdWUubmctdmFsdWUtZGlzYWJsZWR7YmFja2dyb3VuZC1jb2xvcjojZjlmOWY5fS5uZy1zZWxlY3Qubmctc2VsZWN0LW11bHRpcGxlIC5uZy1zZWxlY3QtY29udGFpbmVyIC5uZy12YWx1ZS1jb250YWluZXIgLm5nLXZhbHVlLm5nLXZhbHVlLWRpc2FibGVkIC5uZy12YWx1ZS1sYWJlbHtwYWRkaW5nLWxlZnQ6NXB4fVtkaXI9XCJydGxcIl0gLm5nLXNlbGVjdC5uZy1zZWxlY3QtbXVsdGlwbGUgLm5nLXNlbGVjdC1jb250YWluZXIgLm5nLXZhbHVlLWNvbnRhaW5lciAubmctdmFsdWUubmctdmFsdWUtZGlzYWJsZWQgLm5nLXZhbHVlLWxhYmVse3BhZGRpbmctbGVmdDowO3BhZGRpbmctcmlnaHQ6NXB4fS5uZy1zZWxlY3Qubmctc2VsZWN0LW11bHRpcGxlIC5uZy1zZWxlY3QtY29udGFpbmVyIC5uZy12YWx1ZS1jb250YWluZXIgLm5nLXZhbHVlIC5uZy12YWx1ZS1sYWJlbHtkaXNwbGF5OmlubGluZS1ibG9jaztwYWRkaW5nOjFweCA1cHh9Lm5nLXNlbGVjdC5uZy1zZWxlY3QtbXVsdGlwbGUgLm5nLXNlbGVjdC1jb250YWluZXIgLm5nLXZhbHVlLWNvbnRhaW5lciAubmctdmFsdWUgLm5nLXZhbHVlLWljb257ZGlzcGxheTppbmxpbmUtYmxvY2s7cGFkZGluZzoxcHggNXB4fS5uZy1zZWxlY3Qubmctc2VsZWN0LW11bHRpcGxlIC5uZy1zZWxlY3QtY29udGFpbmVyIC5uZy12YWx1ZS1jb250YWluZXIgLm5nLXZhbHVlIC5uZy12YWx1ZS1pY29uOmhvdmVye2JhY2tncm91bmQtY29sb3I6I2QxZThmZn0ubmctc2VsZWN0Lm5nLXNlbGVjdC1tdWx0aXBsZSAubmctc2VsZWN0LWNvbnRhaW5lciAubmctdmFsdWUtY29udGFpbmVyIC5uZy12YWx1ZSAubmctdmFsdWUtaWNvbi5sZWZ0e2JvcmRlci1yaWdodDoxcHggc29saWQgI2I4ZGJmZn1bZGlyPVwicnRsXCJdIC5uZy1zZWxlY3Qubmctc2VsZWN0LW11bHRpcGxlIC5uZy1zZWxlY3QtY29udGFpbmVyIC5uZy12YWx1ZS1jb250YWluZXIgLm5nLXZhbHVlIC5uZy12YWx1ZS1pY29uLmxlZnR7Ym9yZGVyLWxlZnQ6MXB4IHNvbGlkICNiOGRiZmY7Ym9yZGVyLXJpZ2h0Om5vbmV9Lm5nLXNlbGVjdC5uZy1zZWxlY3QtbXVsdGlwbGUgLm5nLXNlbGVjdC1jb250YWluZXIgLm5nLXZhbHVlLWNvbnRhaW5lciAubmctdmFsdWUgLm5nLXZhbHVlLWljb24ucmlnaHR7Ym9yZGVyLWxlZnQ6MXB4IHNvbGlkICNiOGRiZmZ9W2Rpcj1cInJ0bFwiXSAubmctc2VsZWN0Lm5nLXNlbGVjdC1tdWx0aXBsZSAubmctc2VsZWN0LWNvbnRhaW5lciAubmctdmFsdWUtY29udGFpbmVyIC5uZy12YWx1ZSAubmctdmFsdWUtaWNvbi5yaWdodHtib3JkZXItbGVmdDowO2JvcmRlci1yaWdodDoxcHggc29saWQgI2I4ZGJmZn0ubmctc2VsZWN0Lm5nLXNlbGVjdC1tdWx0aXBsZSAubmctc2VsZWN0LWNvbnRhaW5lciAubmctdmFsdWUtY29udGFpbmVyIC5uZy1pbnB1dHtwYWRkaW5nOjAgMCAzcHggM3B4fVtkaXI9XCJydGxcIl0gLm5nLXNlbGVjdC5uZy1zZWxlY3QtbXVsdGlwbGUgLm5nLXNlbGVjdC1jb250YWluZXIgLm5nLXZhbHVlLWNvbnRhaW5lciAubmctaW5wdXR7cGFkZGluZzowIDNweCAzcHggMH0ubmctc2VsZWN0Lm5nLXNlbGVjdC1tdWx0aXBsZSAubmctc2VsZWN0LWNvbnRhaW5lciAubmctdmFsdWUtY29udGFpbmVyIC5uZy1wbGFjZWhvbGRlcnt0b3A6NXB4O3BhZGRpbmctYm90dG9tOjVweDtwYWRkaW5nLWxlZnQ6M3B4fVtkaXI9XCJydGxcIl0gLm5nLXNlbGVjdC5uZy1zZWxlY3QtbXVsdGlwbGUgLm5nLXNlbGVjdC1jb250YWluZXIgLm5nLXZhbHVlLWNvbnRhaW5lciAubmctcGxhY2Vob2xkZXJ7cGFkZGluZy1yaWdodDozcHg7cGFkZGluZy1sZWZ0OjB9Lm5nLXNlbGVjdCAubmctY2xlYXItd3JhcHBlcntjb2xvcjojOTk5fS5uZy1zZWxlY3QgLm5nLWNsZWFyLXdyYXBwZXI6aG92ZXIgLm5nLWNsZWFye2NvbG9yOiNEMDAyMUJ9Lm5nLXNlbGVjdCAubmctc3Bpbm5lci16b25le3BhZGRpbmc6NXB4IDVweCAwIDB9W2Rpcj1cInJ0bFwiXSAubmctc2VsZWN0IC5uZy1zcGlubmVyLXpvbmV7cGFkZGluZzo1cHggMCAwIDVweH0ubmctc2VsZWN0IC5uZy1hcnJvdy13cmFwcGVye3dpZHRoOjI1cHg7cGFkZGluZy1yaWdodDo1cHh9W2Rpcj1cInJ0bFwiXSAubmctc2VsZWN0IC5uZy1hcnJvdy13cmFwcGVye3BhZGRpbmctbGVmdDo1cHg7cGFkZGluZy1yaWdodDowfS5uZy1zZWxlY3QgLm5nLWFycm93LXdyYXBwZXI6aG92ZXIgLm5nLWFycm93e2JvcmRlci10b3AtY29sb3I6IzY2Nn0ubmctc2VsZWN0IC5uZy1hcnJvdy13cmFwcGVyIC5uZy1hcnJvd3tib3JkZXItY29sb3I6Izk5OSB0cmFuc3BhcmVudCB0cmFuc3BhcmVudDtib3JkZXItc3R5bGU6c29saWQ7Ym9yZGVyLXdpZHRoOjVweCA1cHggMi41cHh9Lm5nLWRyb3Bkb3duLXBhbmVse2JhY2tncm91bmQtY29sb3I6I2ZmZjtib3JkZXI6MXB4IHNvbGlkICNjY2M7Ym94LXNoYWRvdzowIDFweCAwIHJnYmEoMCwwLDAsMC4wNik7bGVmdDowfS5uZy1kcm9wZG93bi1wYW5lbC5uZy1zZWxlY3QtYm90dG9te3RvcDoxMDAlO2JvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOjRweDtib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOjRweDtib3JkZXItdG9wLWNvbG9yOiNlNmU2ZTY7bWFyZ2luLXRvcDotMXB4fS5uZy1kcm9wZG93bi1wYW5lbC5uZy1zZWxlY3QtYm90dG9tIC5uZy1kcm9wZG93bi1wYW5lbC1pdGVtcyAubmctb3B0aW9uOmxhc3QtY2hpbGR7Ym9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6NHB4O2JvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6NHB4fS5uZy1kcm9wZG93bi1wYW5lbC5uZy1zZWxlY3QtdG9we2JvdHRvbToxMDAlO2JvcmRlci10b3AtcmlnaHQtcmFkaXVzOjRweDtib3JkZXItdG9wLWxlZnQtcmFkaXVzOjRweDtib3JkZXItYm90dG9tLWNvbG9yOiNlNmU2ZTY7bWFyZ2luLWJvdHRvbTotMXB4fS5uZy1kcm9wZG93bi1wYW5lbC5uZy1zZWxlY3QtdG9wIC5uZy1kcm9wZG93bi1wYW5lbC1pdGVtcyAubmctb3B0aW9uOmZpcnN0LWNoaWxke2JvcmRlci10b3AtcmlnaHQtcmFkaXVzOjRweDtib3JkZXItdG9wLWxlZnQtcmFkaXVzOjRweH0ubmctZHJvcGRvd24tcGFuZWwgLm5nLWRyb3Bkb3duLWhlYWRlcntib3JkZXItYm90dG9tOjFweCBzb2xpZCAjY2NjO3BhZGRpbmc6NXB4IDdweH0ubmctZHJvcGRvd24tcGFuZWwgLm5nLWRyb3Bkb3duLWZvb3Rlcntib3JkZXItdG9wOjFweCBzb2xpZCAjY2NjO3BhZGRpbmc6NXB4IDdweH0ubmctZHJvcGRvd24tcGFuZWwgLm5nLWRyb3Bkb3duLXBhbmVsLWl0ZW1zIC5uZy1vcHRncm91cHt1c2VyLXNlbGVjdDpub25lO3BhZGRpbmc6OHB4IDEwcHg7Zm9udC13ZWlnaHQ6NTAwO2NvbG9yOnJnYmEoMCwwLDAsMC41NCk7Y3Vyc29yOnBvaW50ZXJ9Lm5nLWRyb3Bkb3duLXBhbmVsIC5uZy1kcm9wZG93bi1wYW5lbC1pdGVtcyAubmctb3B0Z3JvdXAubmctb3B0aW9uLWRpc2FibGVke2N1cnNvcjpkZWZhdWx0fS5uZy1kcm9wZG93bi1wYW5lbCAubmctZHJvcGRvd24tcGFuZWwtaXRlbXMgLm5nLW9wdGdyb3VwLm5nLW9wdGlvbi1tYXJrZWR7YmFja2dyb3VuZC1jb2xvcjojZjVmYWZmfS5uZy1kcm9wZG93bi1wYW5lbCAubmctZHJvcGRvd24tcGFuZWwtaXRlbXMgLm5nLW9wdGdyb3VwLm5nLW9wdGlvbi1zZWxlY3RlZCwubmctZHJvcGRvd24tcGFuZWwgLm5nLWRyb3Bkb3duLXBhbmVsLWl0ZW1zIC5uZy1vcHRncm91cC5uZy1vcHRpb24tc2VsZWN0ZWQubmctb3B0aW9uLW1hcmtlZHtiYWNrZ3JvdW5kLWNvbG9yOiNlYmY1ZmY7Zm9udC13ZWlnaHQ6NjAwfS5uZy1kcm9wZG93bi1wYW5lbCAubmctZHJvcGRvd24tcGFuZWwtaXRlbXMgLm5nLW9wdGlvbntiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7Y29sb3I6cmdiYSgwLDAsMCwwLjg3KTtwYWRkaW5nOjhweCAxMHB4fS5uZy1kcm9wZG93bi1wYW5lbCAubmctZHJvcGRvd24tcGFuZWwtaXRlbXMgLm5nLW9wdGlvbi5uZy1vcHRpb24tc2VsZWN0ZWQsLm5nLWRyb3Bkb3duLXBhbmVsIC5uZy1kcm9wZG93bi1wYW5lbC1pdGVtcyAubmctb3B0aW9uLm5nLW9wdGlvbi1zZWxlY3RlZC5uZy1vcHRpb24tbWFya2Vke2NvbG9yOiMzMzM7YmFja2dyb3VuZC1jb2xvcjojZWJmNWZmfS5uZy1kcm9wZG93bi1wYW5lbCAubmctZHJvcGRvd24tcGFuZWwtaXRlbXMgLm5nLW9wdGlvbi5uZy1vcHRpb24tc2VsZWN0ZWQgLm5nLW9wdGlvbi1sYWJlbCwubmctZHJvcGRvd24tcGFuZWwgLm5nLWRyb3Bkb3duLXBhbmVsLWl0ZW1zIC5uZy1vcHRpb24ubmctb3B0aW9uLXNlbGVjdGVkLm5nLW9wdGlvbi1tYXJrZWQgLm5nLW9wdGlvbi1sYWJlbHtmb250LXdlaWdodDo2MDB9Lm5nLWRyb3Bkb3duLXBhbmVsIC5uZy1kcm9wZG93bi1wYW5lbC1pdGVtcyAubmctb3B0aW9uLm5nLW9wdGlvbi1tYXJrZWR7YmFja2dyb3VuZC1jb2xvcjojZjVmYWZmO2NvbG9yOiMzMzN9Lm5nLWRyb3Bkb3duLXBhbmVsIC5uZy1kcm9wZG93bi1wYW5lbC1pdGVtcyAubmctb3B0aW9uLm5nLW9wdGlvbi1kaXNhYmxlZHtjb2xvcjojY2NjfS5uZy1kcm9wZG93bi1wYW5lbCAubmctZHJvcGRvd24tcGFuZWwtaXRlbXMgLm5nLW9wdGlvbi5uZy1vcHRpb24tY2hpbGR7cGFkZGluZy1sZWZ0OjIycHh9W2Rpcj1cInJ0bFwiXSAubmctZHJvcGRvd24tcGFuZWwgLm5nLWRyb3Bkb3duLXBhbmVsLWl0ZW1zIC5uZy1vcHRpb24ubmctb3B0aW9uLWNoaWxke3BhZGRpbmctcmlnaHQ6MjJweDtwYWRkaW5nLWxlZnQ6MH0ubmctZHJvcGRvd24tcGFuZWwgLm5nLWRyb3Bkb3duLXBhbmVsLWl0ZW1zIC5uZy1vcHRpb24gLm5nLXRhZy1sYWJlbHtmb250LXNpemU6ODAlO2ZvbnQtd2VpZ2h0OjQwMDtwYWRkaW5nLXJpZ2h0OjVweH1bZGlyPVwicnRsXCJdIC5uZy1kcm9wZG93bi1wYW5lbCAubmctZHJvcGRvd24tcGFuZWwtaXRlbXMgLm5nLW9wdGlvbiAubmctdGFnLWxhYmVse3BhZGRpbmctbGVmdDo1cHg7cGFkZGluZy1yaWdodDowfVtkaXI9XCJydGxcIl0gLm5nLWRyb3Bkb3duLXBhbmVse2RpcmVjdGlvbjpydGw7dGV4dC1hbGlnbjpyaWdodH1cbiIsIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gICBGaWxlIE5hbWU6IHBhbGxldHRlLnNjc3Ncbi8vICAgRGVzY3JpcHRpb246IEN1c3RvbSBjb2xvciBzeXN0ZW0gc3R5bGVzLCBpbmNsdWRlcyBiYWNrZ3JvdW5kLCBib3JkZXIgYW5kIHRleHQgY29sb3JzXG4vLyAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vICAgSXRlbSBOYW1lOiBWdWV4eSAtIFZ1ZWpzLCBSZWFjdCwgQW5ndWxhciwgSFRNTCAmIExhcmF2ZWwgQWRtaW4gRGFzaGJvYXJkIFRlbXBsYXRlXG4vLyAgIEF1dGhvcjogUElYSU5WRU5UXG4vLyAgIEF1dGhvciBVUkw6IGh0dHA6Ly93d3cudGhlbWVmb3Jlc3QubmV0L3VzZXIvcGl4aW52ZW50XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLy8gID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gIFdBUk5JTkc6IFBMRUFTRSBETyBOT1QgQ0hBTkdFIFRISVMgVkFSSUFCTEUgRklMRS5cbi8vICBUSElTIEZJTEUgV0lMTCBHRVQgT1ZFUldSSVRURU4gV0lUSCBFQUNIIFZ1ZXh5IEhUTUwgVEVNUExBVEUgUkVMRUFTRS5cbi8vICBUSVA6XG4vLyAgV2Ugc3VnZ2VzdCB5b3UgdG8gdXNlIHRoaXMgKGFzc2V0cy9zY3NzL2NvbG9ycy9wYWxldHRlLnNjc3MpIGZpbGUgZm9yIG92ZXJyaWRpbmcgY29sb3IgdmFyaWFibGVzLlxuLy8gID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vLyB1c2FnZTogdGhlbWUtY29sb3IoXCJuYW1lX29mX2NvbG9yXCIsIFwidHlwZV9vZl9jb2xvclwiKVxuLy8gdG8gYXZvaWQgdG8gcmVwZWF0aW5nIG1hcC1nZXQoJGNvbG9ycywgLi4uKVxuXG5AZnVuY3Rpb24gY29sb3ItZnVuY3Rpb24oJGNvbG9yLCAkdHlwZSkge1xuICBAaWYgbWFwLWhhcy1rZXkoJGNvbG9ycywgJGNvbG9yKSB7XG4gICAgJGN1cnJfY29sb3I6IG1hcC1nZXQoJGNvbG9ycywgJGNvbG9yKTtcbiAgICBAaWYgbWFwLWhhcy1rZXkoJGN1cnJfY29sb3IsICR0eXBlKSB7XG4gICAgICBAcmV0dXJuIG1hcC1nZXQoJGN1cnJfY29sb3IsICR0eXBlKTtcbiAgICB9XG4gIH1cblxuICAvLyBAd2FybiBcIlVua25vd24gYCN7bmFtZX1gIGluICRjb2xvcnMuXCI7XG4gIEByZXR1cm4gbnVsbDtcbn1cblxuLy8gQ29sb3IgcGFsZXR0ZXNcbkBpbXBvcnQgJ3BhbGV0dGUtdmFyaWFibGVzJztcblxuLy8gQ29sb3IgQ2xhc3Nlc1xuLy8gICBUZXh0IGNvbG9yOiAuY29sb3IgLmxpZ2h0ZW4tKiAvIC5kYXJrZW4tKiAvIC5hY2NlbnQtKlxuLy8gICBCYWNrZ3JvdW5kOiAuYmctY29sb3IgLmJnLWxpZ2h0ZW4tKiAvIC5iZy1kYXJrZW4tKiAvIC5iZy1hY2NlbnQtKlxuLy8gICBib3JkZXI6IC5ib3JkZXItY29sb3IgLmJvcmRlci1saWdodGVuLSogLyAuYm9yZGVyLWRhcmtlbi0qIC8gLmJvcmRlci1hY2NlbnQtKlxuLy8gICBib3JkZXItdG9wOiAuYm9yZGVyLXRvcC1jb2xvciAuYm9yZGVyLXRvcC1saWdodGVuLSogLyAuYm9yZGVyLXRvcC1kYXJrZW4tKiAvIC5ib3JkZXItdG9wLWFjY2VudC0qXG4vLyAgIGJvcmRlci1ib3R0b206IC5ib3JkZXItYm90dG9tLWNvbG9yIC5ib3JkZXItYm90dG9tLWxpZ2h0ZW4tKiAvIC5ib3JkZXItYm90dG9tLWRhcmtlbi0qIC8gLmJvcmRlci1ib3R0b20tYWNjZW50LSpcbi8vICAgYm9yZGVyLWxlZnQ6IC5ib3JkZXItbGVmdC1jb2xvciAuYm9yZGVyLWxlZnQtbGlnaHRlbi0qIC8gLmJvcmRlci1sZWZ0LWRhcmtlbi0qIC8gLmJvcmRlci1sZWZ0LWFjY2VudC0qXG4vLyAgIGJvcmRlci1yaWdodDogLmJvcmRlci1yaWdodC1jb2xvciAuYm9yZGVyLXJpZ2h0LWxpZ2h0ZW4tKiAvIC5ib3JkZXItcmlnaHQtZGFya2VuLSogLyAuYm9yZGVyLXJpZ2h0LWFjY2VudC0qXG5cbkBlYWNoICRjb2xvcl9uYW1lLCAkY29sb3IgaW4gJGNvbG9ycyB7XG4gIEBlYWNoICRjb2xvcl90eXBlLCAkY29sb3JfdmFsdWUgaW4gJGNvbG9yIHtcbiAgICBAaWYgJGNvbG9yX3R5cGU9PSAnYmFzZScge1xuICAgICAgLy8gYmFja2dyb3VuZCBjb2xvclxuICAgICAgLmJnLSN7JGNvbG9yX25hbWV9IHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yX3ZhbHVlICFpbXBvcnRhbnQ7XG5cbiAgICAgICAgLmNhcmQtaGVhZGVyLFxuICAgICAgICAuY2FyZC1mb290ZXIge1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIEFsZXJ0XG4gICAgICBAaWYgKCRjb2xvcl9uYW1lICE9ICdsaWdodCcgYW5kICRjb2xvcl9uYW1lICE9ICdibGFjaycgYW5kICRjb2xvcl9uYW1lICE9ICd3aGl0ZScpIHtcbiAgICAgICAgLmFsZXJ0LSN7JGNvbG9yX25hbWV9IHtcbiAgICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKCRjb2xvcl92YWx1ZSwgMC4xMikgIWltcG9ydGFudDtcbiAgICAgICAgICBjb2xvcjogJGNvbG9yX3ZhbHVlICFpbXBvcnRhbnQ7XG5cbiAgICAgICAgICAuYWxlcnQtaGVhZGluZyB7XG4gICAgICAgICAgICBAaW5jbHVkZSBhbGVydC1oZWFkaW5nLWJzKCRjb2xvcl92YWx1ZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLmFsZXJ0LWxpbmsge1xuICAgICAgICAgICAgY29sb3I6IGRhcmtlbigkY29sb3JfdmFsdWUsIDUlKSAhaW1wb3J0YW50O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGNsb3NhYmxlIGFsZXJ0XG4gICAgICAgICAgLmNsb3NlIHtcbiAgICAgICAgICAgIGNvbG9yOiAkY29sb3JfdmFsdWUgIWltcG9ydGFudDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gYmcgY29sb3IgbGlnaHRlbiBmb3IgcmdiYSAtIG9wYWNpdHkgc2V0XG4gICAgICBAaWYgKCRjb2xvcl9uYW1lICE9ICdsaWdodCcgYW5kICRjb2xvcl9uYW1lICE9ICdibGFjaycgYW5kICRjb2xvcl9uYW1lICE9ICd3aGl0ZScgYW5kICRjb2xvcl9uYW1lICE9ICdkYXJrJykge1xuICAgICAgICAuYmctbGlnaHQtI3skY29sb3JfbmFtZX0ge1xuICAgICAgICAgIGJhY2tncm91bmQ6IHJnYmEoJGNvbG9yX3ZhbHVlLCAwLjEyKSAhaW1wb3J0YW50O1xuICAgICAgICAgIGNvbG9yOiAkY29sb3JfdmFsdWUgIWltcG9ydGFudDtcblxuICAgICAgICAgIC8vIENhbGVuZGFyIGJhY2tncm91bmQsIGNvbG9yIGFuZCBib3JkZXIgY29sb3JcbiAgICAgICAgICAmLmZjLWgtZXZlbnQsXG4gICAgICAgICAgJi5mYy12LWV2ZW50IHtcbiAgICAgICAgICAgIGJvcmRlci1jb2xvcjogcmdiYSgkY29sb3JfdmFsdWUsIDAuMSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLmZjLWxpc3QtZXZlbnQtZG90LFxuICAgICAgICAgIC5mYy1kYXlncmlkLWV2ZW50LWRvdCB7XG4gICAgICAgICAgICBib3JkZXItY29sb3I6ICRjb2xvcl92YWx1ZSAhaW1wb3J0YW50O1xuICAgICAgICAgIH1cblxuICAgICAgICAgICYuZmMtbGlzdC1ldmVudCB7XG4gICAgICAgICAgICAmOmhvdmVyIHRkIHtcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogcmdiYSgkY29sb3JfdmFsdWUsIDAuMSkgIWltcG9ydGFudDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLmZjLWxpc3QtZXZlbnQtdGl0bGUge1xuICAgICAgICAgICAgICBjb2xvcjogJGJvZHktY29sb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGF2YXRhciB3aXRoIGxpZ2h0IGJnXG4gICAgICBAaWYgKCRjb2xvcl9uYW1lICE9ICdsaWdodCcgYW5kICRjb2xvcl9uYW1lICE9ICdibGFjaycgYW5kICRjb2xvcl9uYW1lICE9ICd3aGl0ZScgYW5kICRjb2xvcl9uYW1lICE9ICdkYXJrJykge1xuICAgICAgICAuYXZhdGFyLmJnLWxpZ2h0LSN7JGNvbG9yX25hbWV9IHtcbiAgICAgICAgICBjb2xvcjogJGNvbG9yX3ZhbHVlICFpbXBvcnRhbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gQm9yZGVyIGNvbG9yc1xuICAgICAgLmJvcmRlci0jeyRjb2xvcl9uYW1lfSB7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICRjb2xvcl92YWx1ZSAhaW1wb3J0YW50O1xuICAgICAgfVxuXG4gICAgICAuYm9yZGVyLXRvcC0jeyRjb2xvcl9uYW1lfSB7XG4gICAgICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAkY29sb3JfdmFsdWU7XG4gICAgICB9XG5cbiAgICAgIC5ib3JkZXItYm90dG9tLSN7JGNvbG9yX25hbWV9IHtcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICRjb2xvcl92YWx1ZTtcbiAgICAgIH1cblxuICAgICAgLmJvcmRlci1sZWZ0LSN7JGNvbG9yX25hbWV9IHtcbiAgICAgICAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAkY29sb3JfdmFsdWU7XG4gICAgICB9XG5cbiAgICAgIC5ib3JkZXItcmlnaHQtI3skY29sb3JfbmFtZX0ge1xuICAgICAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAkY29sb3JfdmFsdWU7XG4gICAgICB9XG5cbiAgICAgIC8vIGJhZGdlIGdsb3cgY29sb3JzXG4gICAgICAuYmctI3skY29sb3JfbmFtZX0sXG4gICAgICAuYm9yZGVyLSN7JGNvbG9yX25hbWV9LFxuICAgICAgLmJhZGdlLSN7JGNvbG9yLW5hbWV9IHtcbiAgICAgICAgJi5iYWRnZS1nbG93IHtcbiAgICAgICAgICBib3gtc2hhZG93OiAwcHggMHB4IDEwcHggJGNvbG9yX3ZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIEJhZGdlIEJhY2tncm91bmQgQ29sb3JcbiAgICAgIEBpZiAoJGNvbG9yX25hbWUgIT0gJ2xpZ2h0JyBhbmQgJGNvbG9yX25hbWUgIT0gJ2JsYWNrJyBhbmQgJGNvbG9yX25hbWUgIT0gJ3doaXRlJykge1xuICAgICAgICAuYmFkZ2Uge1xuICAgICAgICAgIC8vIEJhZGdlIExpZ2h0IEJhY2tncm91bmRcbiAgICAgICAgICAmLmJhZGdlLWxpZ2h0LSN7JGNvbG9yX25hbWV9IHtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoJGNvbG9yOiAkY29sb3JfdmFsdWUsICRhbHBoYTogMC4xMik7XG4gICAgICAgICAgICBjb2xvcjogJGNvbG9yX3ZhbHVlICFpbXBvcnRhbnQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIE92ZXJsYXkgY29sb3JzXG4gICAgICAub3ZlcmxheS0jeyRjb2xvcl9uYW1lfSB7XG4gICAgICAgIEBpbmNsdWRlIGJnLW9wYWNpdHkoJGNvbG9yX3ZhbHVlLCAwLjYpO1xuICAgICAgfVxuXG4gICAgICAvLyBCYXNpYyBidXR0b25zXG4gICAgICBAaWYgKCRjb2xvcl9uYW1lICE9ICdsaWdodCcgYW5kICRjb2xvcl9uYW1lICE9ICdibGFjaycgYW5kICRjb2xvcl9uYW1lICE9ICd3aGl0ZScpIHtcbiAgICAgICAgLmJ0bi0jeyRjb2xvcl9uYW1lfSB7XG4gICAgICAgICAgYm9yZGVyLWNvbG9yOiAkY29sb3JfdmFsdWUgIWltcG9ydGFudDtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3JfdmFsdWUgIWltcG9ydGFudDtcbiAgICAgICAgICBjb2xvcjogJHdoaXRlICFpbXBvcnRhbnQ7XG5cbiAgICAgICAgICAmOmZvY3VzLFxuICAgICAgICAgICY6YWN0aXZlLFxuICAgICAgICAgICYuYWN0aXZlIHtcbiAgICAgICAgICAgIGNvbG9yOiAkd2hpdGU7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBjb2xvci1mdW5jdGlvbigkY29sb3JfbmFtZSwgJ2Rhcmtlbi0xJykgIWltcG9ydGFudDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAmOmhvdmVyOm5vdCguZGlzYWJsZWQpOm5vdCg6ZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGJveC1zaGFkb3c6IDAgOHB4IDI1cHggLThweCByZ2JhKCRjb2xvci12YWx1ZSwgMSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJjpub3QoOmRpc2FibGVkKTpub3QoLmRpc2FibGVkKTphY3RpdmU6Zm9jdXMge1xuICAgICAgICAgICAgYm94LXNoYWRvdzogbm9uZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gRm9yIEJ0biBGbGF0XG4gICAgICBAaWYgKCRjb2xvcl9uYW1lICE9ICdsaWdodCcgYW5kICRjb2xvcl9uYW1lICE9ICdibGFjaycgYW5kICRjb2xvcl9uYW1lICE9ICd3aGl0ZScpIHtcbiAgICAgICAgLmJ0bi1mbGF0LSN7JGNvbG9yLW5hbWV9IHtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICBjb2xvcjogJGNvbG9yLXZhbHVlO1xuXG4gICAgICAgICAgJjpob3ZlciB7XG4gICAgICAgICAgICBjb2xvcjogJGNvbG9yLXZhbHVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgICY6aG92ZXI6bm90KC5kaXNhYmxlZCk6bm90KDpkaXNhYmxlZCkge1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgkY29sb3ItdmFsdWUsIDAuMTIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgICY6YWN0aXZlLFxuICAgICAgICAgICYuYWN0aXZlLFxuICAgICAgICAgICY6Zm9jdXMge1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgkY29sb3I6ICRjb2xvcl92YWx1ZSwgJGFscGhhOiAwLjIpO1xuICAgICAgICAgICAgY29sb3I6ICRjb2xvcl92YWx1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAmLmRyb3Bkb3duLXRvZ2dsZTo6YWZ0ZXIge1xuICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKHN0ci1yZXBsYWNlKHN0ci1yZXBsYWNlKCRjaGV2cm9uLWRvd24sICdjdXJyZW50Q29sb3InLCAkY29sb3JfdmFsdWUpLCAnIycsICclMjMnKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIEZvciBCdG4gUmVsaWVmXG4gICAgICBAaWYgKCRjb2xvcl9uYW1lICE9ICdsaWdodCcgYW5kICRjb2xvcl9uYW1lICE9ICdibGFjaycgYW5kICRjb2xvcl9uYW1lICE9ICd3aGl0ZScpIHtcbiAgICAgICAgLmJ0bi1yZWxpZWYtI3skY29sb3ItbmFtZX0ge1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci12YWx1ZTtcbiAgICAgICAgICBib3gtc2hhZG93OiBpbnNldCAwIC0zcHggMCAwIHJnYmEoJGJsYWNrLCAwLjIpO1xuICAgICAgICAgIGNvbG9yOiAkd2hpdGU7XG4gICAgICAgICAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZTtcbiAgICAgICAgICBAaWYgJGNvbG9yX25hbWUgPT0gJ2RhcmsnIHtcbiAgICAgICAgICAgICY6aG92ZXI6bm90KC5kaXNhYmxlZCk6bm90KDpkaXNhYmxlZCkge1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBjb2xvci1mdW5jdGlvbigkY29sb3JfbmFtZSwgJ2Rhcmtlbi0zJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBAZWxzZSB7XG4gICAgICAgICAgICAmOmhvdmVyOm5vdCguZGlzYWJsZWQpOm5vdCg6ZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogY29sb3ItZnVuY3Rpb24oJGNvbG9yX25hbWUsICdsaWdodGVuLTEnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgJjphY3RpdmUsXG4gICAgICAgICAgJi5hY3RpdmUsXG4gICAgICAgICAgJjpmb2N1cyB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBjb2xvci1mdW5jdGlvbigkY29sb3JfbmFtZSwgJ2Rhcmtlbi0xJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJjpob3ZlciB7XG4gICAgICAgICAgICBjb2xvcjogJHdoaXRlO1xuICAgICAgICAgIH1cbiAgICAgICAgICAmOmFjdGl2ZSxcbiAgICAgICAgICAmLmFjdGl2ZSB7XG4gICAgICAgICAgICBvdXRsaW5lOiBub25lO1xuICAgICAgICAgICAgYm94LXNoYWRvdzogbm9uZTtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgzcHgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBPdXRsaW5lIGJ1dHRvbnNcbiAgICAgIEBpZiAoJGNvbG9yX25hbWUgIT0gJ2xpZ2h0JyBhbmQgJGNvbG9yX25hbWUgIT0gJ2JsYWNrJyBhbmQgJGNvbG9yX25hbWUgIT0gJ3doaXRlJykge1xuICAgICAgICAuYnRuLW91dGxpbmUtI3skY29sb3JfbmFtZX0ge1xuICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICRjb2xvcl92YWx1ZSAhaW1wb3J0YW50O1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgIGNvbG9yOiAkY29sb3JfdmFsdWU7XG5cbiAgICAgICAgICAmOmhvdmVyOm5vdCguZGlzYWJsZWQpOm5vdCg6ZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoJGNvbG9yOiAkY29sb3JfdmFsdWUsICRhbHBoYTogMC4wNCk7XG4gICAgICAgICAgICBjb2xvcjogJGNvbG9yX3ZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICAmOm5vdCg6ZGlzYWJsZWQpOm5vdCguZGlzYWJsZWQpOmFjdGl2ZTpmb2N1cyB7XG4gICAgICAgICAgICBib3gtc2hhZG93OiBub25lO1xuICAgICAgICAgIH1cbiAgICAgICAgICAmOm5vdCg6ZGlzYWJsZWQpOm5vdCguZGlzYWJsZWQpOmFjdGl2ZSxcbiAgICAgICAgICAmOm5vdCg6ZGlzYWJsZWQpOm5vdCguZGlzYWJsZWQpLmFjdGl2ZSxcbiAgICAgICAgICAmOm5vdCg6ZGlzYWJsZWQpOm5vdCguZGlzYWJsZWQpOmZvY3VzIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoJGNvbG9yOiAkY29sb3JfdmFsdWUsICRhbHBoYTogMC4yKTtcbiAgICAgICAgICAgIGNvbG9yOiAkY29sb3JfdmFsdWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJi5kcm9wZG93bi10b2dnbGU6OmFmdGVyIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChzdHItcmVwbGFjZShzdHItcmVwbGFjZSgkY2hldnJvbi1kb3duLCAnY3VycmVudENvbG9yJywgJGNvbG9yX3ZhbHVlKSwgJyMnLCAnJTIzJykpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBzcGxpdCB0b2dnbGUgaGF2ZSBzaG93IGNsYXNzXG4gICAgICAgICAgLnNob3cgPiAmLmRyb3Bkb3duLXRvZ2dsZSB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKCRjb2xvcjogJGNvbG9yX3ZhbHVlLCAkYWxwaGE6IDAuMik7XG4gICAgICAgICAgICBjb2xvcjogJGNvbG9yX3ZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBXYXZlIGVmZmVjdFxuICAgICAgQGlmICgkY29sb3JfbmFtZSAhPSAnbGlnaHQnIGFuZCAkY29sb3JfbmFtZSAhPSAnYmxhY2snIGFuZCAkY29sb3JfbmFtZSAhPSAnd2hpdGUnKSB7XG4gICAgICAgIC5idG4tb3V0bGluZS0jeyRjb2xvcl9uYW1lfSxcbiAgICAgICAgLmJ0bi1mbGF0LSN7JGNvbG9yLW5hbWV9IHtcbiAgICAgICAgICAmLndhdmVzLWVmZmVjdCB7XG4gICAgICAgICAgICAud2F2ZXMtcmlwcGxlIHtcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KFxuICAgICAgICAgICAgICAgIHJnYmEoJGNvbG9yX3ZhbHVlLCAwLjIpIDAsXG4gICAgICAgICAgICAgICAgcmdiYSgkY29sb3JfdmFsdWUsIDAuMykgNDAlLFxuICAgICAgICAgICAgICAgIHJnYmEoJGNvbG9yX3ZhbHVlLCAwLjQpIDUwJSxcbiAgICAgICAgICAgICAgICByZ2JhKCRjb2xvcl92YWx1ZSwgMC41KSA2MCUsXG4gICAgICAgICAgICAgICAgcmdiYSgkd2hpdGUsIDApIDcwJVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBCdWxsZXQgY29sb3JzIGZvciBlbWFpbCBhcHBcbiAgICAgIEBpZiAoJGNvbG9yX25hbWUgIT0gJ2xpZ2h0JyBhbmQgJGNvbG9yX25hbWUgIT0gJ2JsYWNrJyBhbmQgJGNvbG9yX25hbWUgIT0gJ3doaXRlJykge1xuICAgICAgICAuYnVsbGV0IHtcbiAgICAgICAgICAmLmJ1bGxldC0jeyRjb2xvcl9uYW1lfSB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3JfdmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIE1vZGFsXG4gICAgICBAaWYgKCRjb2xvcl9uYW1lICE9ICdsaWdodCcgYW5kICRjb2xvcl9uYW1lICE9ICdibGFjaycgYW5kICRjb2xvcl9uYW1lICE9ICd3aGl0ZScpIHtcbiAgICAgICAgLm1vZGFsIHtcbiAgICAgICAgICAmLm1vZGFsLSN7JGNvbG9yX25hbWV9IHtcbiAgICAgICAgICAgIC5tb2RhbC1oZWFkZXIge1xuICAgICAgICAgICAgICAubW9kYWwtdGl0bGUge1xuICAgICAgICAgICAgICAgIGNvbG9yOiAkY29sb3JfdmFsdWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLmNsb3NlIHtcbiAgICAgICAgICAgICAgICBjb2xvcjogJGNvbG9yX3ZhbHVlICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gRm9yIFBhZ2luYXRpb25cbiAgICAgIEBpZiAoJGNvbG9yX25hbWUgIT0gJ2xpZ2h0JyBhbmQgJGNvbG9yX25hbWUgIT0gJ2JsYWNrJyBhbmQgJGNvbG9yX25hbWUgIT0gJ3doaXRlJyBhbmQgJGNvbG9yX25hbWUgIT0gJ2RhcmsnKSB7XG4gICAgICAgIC5wYWdpbmF0aW9uLSN7JGNvbG9yLW5hbWV9IHtcbiAgICAgICAgICAucGFnZS1pdGVtIHtcbiAgICAgICAgICAgICYuYWN0aXZlIHtcbiAgICAgICAgICAgICAgLnBhZ2UtbGluayB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJGNvbG9yLXZhbHVlICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICAgICAgY29sb3I6ICR3aGl0ZTtcblxuICAgICAgICAgICAgICAgICY6aG92ZXIge1xuICAgICAgICAgICAgICAgICAgY29sb3I6ICR3aGl0ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLnBhZ2UtbGluayB7XG4gICAgICAgICAgICAgICY6aG92ZXIge1xuICAgICAgICAgICAgICAgIGNvbG9yOiAkY29sb3JfdmFsdWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJi5wcmV2LWl0ZW0sXG4gICAgICAgICAgICAmLm5leHQtaXRlbSB7XG4gICAgICAgICAgICAgIC5wYWdlLWxpbms6aG92ZXIge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICRjb2xvcl92YWx1ZTtcbiAgICAgICAgICAgICAgICBjb2xvcjogJHdoaXRlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAmLm5leHQtaXRlbSxcbiAgICAgICAgICAgICYubmV4dCB7XG4gICAgICAgICAgICAgIC5wYWdlLWxpbmsge1xuICAgICAgICAgICAgICAgICY6YWN0aXZlLFxuICAgICAgICAgICAgICAgICY6aG92ZXIge1xuICAgICAgICAgICAgICAgICAgJjphZnRlciB7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChzdHItcmVwbGFjZShcbiAgICAgICAgICAgICAgICAgICAgICBzdHItcmVwbGFjZSgkY2hldnJvbi1yaWdodCwgJ2N1cnJlbnRDb2xvcicsICRjb2xvcl92YWx1ZSksXG4gICAgICAgICAgICAgICAgICAgICAgJyMnLFxuICAgICAgICAgICAgICAgICAgICAgICclMjMnXG4gICAgICAgICAgICAgICAgICAgICkpICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAmLnByZXYtaXRlbSxcbiAgICAgICAgICAgICYucHJldiB7XG4gICAgICAgICAgICAgIC5wYWdlLWxpbmsge1xuICAgICAgICAgICAgICAgICY6YWN0aXZlLFxuICAgICAgICAgICAgICAgICY6aG92ZXIge1xuICAgICAgICAgICAgICAgICAgJjpiZWZvcmUge1xuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoc3RyLXJlcGxhY2UoXG4gICAgICAgICAgICAgICAgICAgICAgc3RyLXJlcGxhY2UoJGNoZXZyb24tbGVmdCwgJ2N1cnJlbnRDb2xvcicsICRjb2xvcl92YWx1ZSksXG4gICAgICAgICAgICAgICAgICAgICAgJyMnLFxuICAgICAgICAgICAgICAgICAgICAgICclMjMnXG4gICAgICAgICAgICAgICAgICAgICkpICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIEZvciBOYXYgUGlsbHNcbiAgICAgIEBpZiAoJGNvbG9yX25hbWUgIT0gJ2xpZ2h0JyBhbmQgJGNvbG9yX25hbWUgIT0gJ2JsYWNrJyBhbmQgJGNvbG9yX25hbWUgIT0gJ3doaXRlJyBhbmQgJGNvbG9yX25hbWUgIT0gJ2RhcmsnKSB7XG4gICAgICAgIC5uYXYtcGlsbC0jeyRjb2xvci1uYW1lfSB7XG4gICAgICAgICAgLm5hdi1pdGVtIHtcbiAgICAgICAgICAgIC5uYXYtbGluayB7XG4gICAgICAgICAgICAgICYuYWN0aXZlIHtcbiAgICAgICAgICAgICAgICBjb2xvcjogJHdoaXRlO1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvcl92YWx1ZSAhaW1wb3J0YW50O1xuICAgICAgICAgICAgICAgIGJvcmRlci1jb2xvcjogJGNvbG9yX3ZhbHVlO1xuICAgICAgICAgICAgICAgIGJveC1zaGFkb3c6IDAgNHB4IDE4cHggLTRweCByZ2JhKCRjb2xvcl92YWx1ZSwgMC42NSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gUHJvZ3Jlc3MgQmFyc1xuICAgICAgQGlmICgkY29sb3JfbmFtZSAhPSAnbGlnaHQnIGFuZCAkY29sb3JfbmFtZSAhPSAnYmxhY2snIGFuZCAkY29sb3JfbmFtZSAhPSAnd2hpdGUnKSB7XG4gICAgICAgIC5wcm9ncmVzcy1iYXItI3skY29sb3JfbmFtZX0ge1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoJGNvbG9yX3ZhbHVlLCAwLjEyKTtcblxuICAgICAgICAgIC5wcm9ncmVzcy1iYXIge1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLXZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUaW1lbGluZVxuICAgICAgQGlmICgkY29sb3JfbmFtZSAhPSAnbGlnaHQnIGFuZCAkY29sb3JfbmFtZSAhPSAnYmxhY2snIGFuZCAkY29sb3JfbmFtZSAhPSAnd2hpdGUnKSB7XG4gICAgICAgIC50aW1lbGluZSB7XG4gICAgICAgICAgLnRpbWVsaW5lLXBvaW50LSN7JGNvbG9yX25hbWV9IHtcbiAgICAgICAgICAgIGJvcmRlci1jb2xvcjogJGNvbG9yX3ZhbHVlICFpbXBvcnRhbnQ7XG5cbiAgICAgICAgICAgIGksXG4gICAgICAgICAgICBzdmcge1xuICAgICAgICAgICAgICBzdHJva2U6ICRjb2xvcl92YWx1ZSAhaW1wb3J0YW50O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAmLnRpbWVsaW5lLXBvaW50LWluZGljYXRvciB7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvcl92YWx1ZSAhaW1wb3J0YW50O1xuICAgICAgICAgICAgICAmOmJlZm9yZSB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogcmdiYSgkY29sb3I6ICRjb2xvcl92YWx1ZSwgJGFscGhhOiAwLjEyKSAhaW1wb3J0YW50O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIERpdmlkZXJcbiAgICAgIEBpZiAoJGNvbG9yX25hbWUgIT0gJ2xpZ2h0JyBhbmQgJGNvbG9yX25hbWUgIT0gJ2JsYWNrJyBhbmQgJGNvbG9yX25hbWUgIT0gJ3doaXRlJykge1xuICAgICAgICAuZGl2aWRlci5kaXZpZGVyLSN7JGNvbG9yLW5hbWV9IHtcbiAgICAgICAgICAuZGl2aWRlci10ZXh0IHtcbiAgICAgICAgICAgICY6YmVmb3JlLFxuICAgICAgICAgICAgJjphZnRlciB7XG4gICAgICAgICAgICAgIGJvcmRlci1jb2xvcjogJGNvbG9yLXZhbHVlICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIEZvcm0gSW5wdXQgRWxlbWVudHNcbiAgICAgIC8vIENoZWNrYm94ICYgUmFkaW9cblxuICAgICAgLy8gdG9kbzogcmVtb3ZlIGl0IG9uY2UgY29uZmlybVxuICAgICAgaW5wdXQ6Zm9jdXMgfiAuYmctI3skY29sb3JfbmFtZX0ge1xuICAgICAgICBib3gtc2hhZG93OiAwIDAgMCAwLjA3NXJlbSAkd2hpdGUsIDAgMCAwIDAuMjFyZW0gJGNvbG9yX3ZhbHVlICFpbXBvcnRhbnQ7XG4gICAgICB9XG5cbiAgICAgIC8vIEN1c3RvbSBDaGVja2JveCAmIFJhZGlvXG4gICAgICBAaWYgKCRjb2xvcl9uYW1lICE9ICdsaWdodCcgYW5kICRjb2xvcl9uYW1lICE9ICdibGFjaycgYW5kICRjb2xvcl9uYW1lICE9ICd3aGl0ZScpIHtcbiAgICAgICAgLmN1c3RvbS1jb250cm9sLSN7JGNvbG9yX25hbWV9IHtcbiAgICAgICAgICAuY3VzdG9tLWNvbnRyb2wtaW5wdXQ6Y2hlY2tlZCB+IC5jdXN0b20tY29udHJvbC1sYWJlbDo6YmVmb3JlLFxuICAgICAgICAgIC5jdXN0b20tY29udHJvbC1pbnB1dDphY3RpdmUgfiAuY3VzdG9tLWNvbnRyb2wtbGFiZWw6OmJlZm9yZSB7XG4gICAgICAgICAgICBib3JkZXItY29sb3I6ICRjb2xvcl92YWx1ZTtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvcl92YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJi5jdXN0b20tY2hlY2tib3gsXG4gICAgICAgICAgJi5jdXN0b20tcmFkaW8ge1xuICAgICAgICAgICAgLmN1c3RvbS1jb250cm9sLWlucHV0OmNoZWNrZWQgfiAuY3VzdG9tLWNvbnRyb2wtbGFiZWw6OmJlZm9yZSxcbiAgICAgICAgICAgIC5jdXN0b20tY29udHJvbC1pbnB1dDphY3RpdmUgfiAuY3VzdG9tLWNvbnRyb2wtbGFiZWw6OmJlZm9yZSxcbiAgICAgICAgICAgIC5jdXN0b20tY29udHJvbC1pbnB1dDpmb2N1cyB+IC5jdXN0b20tY29udHJvbC1sYWJlbDo6YmVmb3JlIHtcbiAgICAgICAgICAgICAgYm94LXNoYWRvdzogMCAycHggNHB4IDAgcmdiYSgkY29sb3JfdmFsdWUsIDAuNCkgIWltcG9ydGFudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgLmN1c3RvbS1jb250cm9sLWlucHV0OmRpc2FibGVkOmNoZWNrZWQgfiAuY3VzdG9tLWNvbnRyb2wtbGFiZWw6OmJlZm9yZSB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKCRjb2xvcl92YWx1ZSwgMC42NSkgIWltcG9ydGFudDtcbiAgICAgICAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgICAgICAgIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcbiAgICAgICAgICB9XG4gICAgICAgICAgLmN1c3RvbS1jb250cm9sLWlucHV0OmZvY3VzIH4gLmN1c3RvbS1jb250cm9sLWxhYmVsOjpiZWZvcmUge1xuICAgICAgICAgICAgYm9yZGVyLWNvbG9yOiAkY29sb3JfdmFsdWUgIWltcG9ydGFudDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gQm9vdHN0cmFwIEN1c3RvbSBTd2l0Y2hlc1xuICAgICAgQGlmICgkY29sb3JfbmFtZSAhPSAnbGlnaHQnIGFuZCAkY29sb3JfbmFtZSAhPSAnYmxhY2snIGFuZCAkY29sb3JfbmFtZSAhPSAnd2hpdGUnKSB7XG4gICAgICAgIC5jdXN0b20tc3dpdGNoLSN7JGNvbG9yLW5hbWV9IHtcbiAgICAgICAgICAuY3VzdG9tLWNvbnRyb2wtaW5wdXQ6Y2hlY2tlZCB+IC5jdXN0b20tY29udHJvbC1sYWJlbDo6YmVmb3JlIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvcl92YWx1ZSAhaW1wb3J0YW50O1xuICAgICAgICAgICAgY29sb3I6ICR3aGl0ZTtcbiAgICAgICAgICAgIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2Utb3V0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBTZWxlY3QyXG4gICAgICBAaWYgKCRjb2xvcl9uYW1lICE9ICdsaWdodCcgYW5kICRjb2xvcl9uYW1lICE9ICdibGFjaycgYW5kICRjb2xvcl9uYW1lICE9ICd3aGl0ZScpIHtcbiAgICAgICAgLnNlbGVjdDItI3skY29sb3ItbmFtZX0ge1xuICAgICAgICAgIC5zZWxlY3QyLWNvbnRhaW5lci0tZGVmYXVsdCB7XG4gICAgICAgICAgICAuc2VsZWN0Mi1zZWxlY3Rpb24tLW11bHRpcGxlIHtcbiAgICAgICAgICAgICAgLnNlbGVjdDItc2VsZWN0aW9uX19jaG9pY2Uge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICRjb2xvcl92YWx1ZSAhaW1wb3J0YW50O1xuICAgICAgICAgICAgICAgIGJvcmRlci1jb2xvcjogJGNvbG9yX3ZhbHVlICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IEBlbHNlIHtcbiAgICAgIC50ZXh0LSN7JGNvbG9yX25hbWV9LnRleHQtI3skY29sb3JfdHlwZX0ge1xuICAgICAgICBjb2xvcjogJGNvbG9yX3ZhbHVlICFpbXBvcnRhbnQ7XG4gICAgICB9XG5cbiAgICAgIC5iZy0jeyRjb2xvcl9uYW1lfS5iZy0jeyRjb2xvcl90eXBlfSB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvcl92YWx1ZSAhaW1wb3J0YW50O1xuICAgICAgfVxuXG4gICAgICAuYm9yZGVyLSN7JGNvbG9yX25hbWV9LmJvcmRlci0jeyRjb2xvcl90eXBlfSB7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICRjb2xvcl92YWx1ZSAhaW1wb3J0YW50O1xuICAgICAgfVxuXG4gICAgICAuYm9yZGVyLXRvcC0jeyRjb2xvcl9uYW1lfS5ib3JkZXItdG9wLSN7JGNvbG9yX3R5cGV9IHtcbiAgICAgICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICRjb2xvcl92YWx1ZSAhaW1wb3J0YW50O1xuICAgICAgfVxuXG4gICAgICAuYm9yZGVyLWJvdHRvbS0jeyRjb2xvcl9uYW1lfS5ib3JkZXItYm90dG9tLSN7JGNvbG9yX3R5cGV9IHtcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICRjb2xvcl92YWx1ZSAhaW1wb3J0YW50O1xuICAgICAgfVxuXG4gICAgICAuYm9yZGVyLWxlZnQtI3skY29sb3JfbmFtZX0uYm9yZGVyLWxlZnQtI3skY29sb3JfdHlwZX0ge1xuICAgICAgICBib3JkZXItbGVmdDogMXB4IHNvbGlkICRjb2xvcl92YWx1ZSAhaW1wb3J0YW50O1xuICAgICAgfVxuXG4gICAgICAuYm9yZGVyLXJpZ2h0LSN7JGNvbG9yX25hbWV9LmJvcmRlci1yaWdodC0jeyRjb2xvcl90eXBlfSB7XG4gICAgICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICRjb2xvcl92YWx1ZSAhaW1wb3J0YW50O1xuICAgICAgfVxuXG4gICAgICAub3ZlcmxheS0jeyRjb2xvcl9uYW1lfS5vdmVybGF5LSN7JGNvbG9yX3R5cGV9IHtcbiAgICAgICAgQGluY2x1ZGUgYmctb3BhY2l0eSgkY29sb3JfdmFsdWUsIDAuNik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJAaW1wb3J0ICd+QG5nLXNlbGVjdC9uZy1zZWxlY3QvdGhlbWVzL2RlZmF1bHQudGhlbWUuY3NzJztcbi5iZy13aGl0ZSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmYgIWltcG9ydGFudDtcbn1cbi5iZy13aGl0ZSAuY2FyZC1oZWFkZXIsXG4uYmctd2hpdGUgLmNhcmQtZm9vdGVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG59XG5cbi5ib3JkZXItd2hpdGUge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZmZmZmZmICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItdG9wLXdoaXRlIHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNmZmZmZmY7XG59XG5cbi5ib3JkZXItYm90dG9tLXdoaXRlIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNmZmZmZmY7XG59XG5cbi5ib3JkZXItbGVmdC13aGl0ZSB7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2ZmZmZmZjtcbn1cblxuLmJvcmRlci1yaWdodC13aGl0ZSB7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNmZmZmZmY7XG59XG5cbi5iZy13aGl0ZS5iYWRnZS1nbG93LFxuLmJvcmRlci13aGl0ZS5iYWRnZS1nbG93LFxuLmJhZGdlLXdoaXRlLmJhZGdlLWdsb3cge1xuICBib3gtc2hhZG93OiAwcHggMHB4IDEwcHggI2ZmZmZmZjtcbn1cblxuLm92ZXJsYXktd2hpdGUge1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICAvKiBUaGUgRmFsbGJhY2sgKi9cbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjYpO1xufVxuXG5pbnB1dDpmb2N1cyB+IC5iZy13aGl0ZSB7XG4gIGJveC1zaGFkb3c6IDAgMCAwIDAuMDc1cmVtICNmZmYsIDAgMCAwIDAuMjFyZW0gI2ZmZmZmZiAhaW1wb3J0YW50O1xufVxuXG4uYmctYmxhY2sge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwICFpbXBvcnRhbnQ7XG59XG4uYmctYmxhY2sgLmNhcmQtaGVhZGVyLFxuLmJnLWJsYWNrIC5jYXJkLWZvb3RlciB7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xufVxuXG4uYm9yZGVyLWJsYWNrIHtcbiAgYm9yZGVyOiAxcHggc29saWQgIzAwMDAwMCAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXRvcC1ibGFjayB7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjMDAwMDAwO1xufVxuXG4uYm9yZGVyLWJvdHRvbS1ibGFjayB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMDAwMDAwO1xufVxuXG4uYm9yZGVyLWxlZnQtYmxhY2sge1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICMwMDAwMDA7XG59XG5cbi5ib3JkZXItcmlnaHQtYmxhY2sge1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjMDAwMDAwO1xufVxuXG4uYmctYmxhY2suYmFkZ2UtZ2xvdyxcbi5ib3JkZXItYmxhY2suYmFkZ2UtZ2xvdyxcbi5iYWRnZS1ibGFjay5iYWRnZS1nbG93IHtcbiAgYm94LXNoYWRvdzogMHB4IDBweCAxMHB4ICMwMDAwMDA7XG59XG5cbi5vdmVybGF5LWJsYWNrIHtcbiAgYmFja2dyb3VuZDogIzAwMDAwMDtcbiAgLyogVGhlIEZhbGxiYWNrICovXG4gIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC42KTtcbn1cblxuaW5wdXQ6Zm9jdXMgfiAuYmctYmxhY2sge1xuICBib3gtc2hhZG93OiAwIDAgMCAwLjA3NXJlbSAjZmZmLCAwIDAgMCAwLjIxcmVtICMwMDAwMDAgIWltcG9ydGFudDtcbn1cblxuLmJnLWRhcmsge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNGI0YjRiICFpbXBvcnRhbnQ7XG59XG4uYmctZGFyayAuY2FyZC1oZWFkZXIsXG4uYmctZGFyayAuY2FyZC1mb290ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cblxuLmFsZXJ0LWRhcmsge1xuICBiYWNrZ3JvdW5kOiByZ2JhKDc1LCA3NSwgNzUsIDAuMTIpICFpbXBvcnRhbnQ7XG4gIGNvbG9yOiAjNGI0YjRiICFpbXBvcnRhbnQ7XG59XG4uYWxlcnQtZGFyayAuYWxlcnQtaGVhZGluZyB7XG4gIGJveC1zaGFkb3c6IHJnYmEoNzUsIDc1LCA3NSwgMC40KSAwcHggNnB4IDE1cHggLTdweDtcbn1cbi5hbGVydC1kYXJrIC5hbGVydC1saW5rIHtcbiAgY29sb3I6ICMzZTNlM2UgIWltcG9ydGFudDtcbn1cbi5hbGVydC1kYXJrIC5jbG9zZSB7XG4gIGNvbG9yOiAjNGI0YjRiICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItZGFyayB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICM0YjRiNGIgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci10b3AtZGFyayB7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjNGI0YjRiO1xufVxuXG4uYm9yZGVyLWJvdHRvbS1kYXJrIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICM0YjRiNGI7XG59XG5cbi5ib3JkZXItbGVmdC1kYXJrIHtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjNGI0YjRiO1xufVxuXG4uYm9yZGVyLXJpZ2h0LWRhcmsge1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjNGI0YjRiO1xufVxuXG4uYmctZGFyay5iYWRnZS1nbG93LFxuLmJvcmRlci1kYXJrLmJhZGdlLWdsb3csXG4uYmFkZ2UtZGFyay5iYWRnZS1nbG93IHtcbiAgYm94LXNoYWRvdzogMHB4IDBweCAxMHB4ICM0YjRiNGI7XG59XG5cbi5iYWRnZS5iYWRnZS1saWdodC1kYXJrIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg3NSwgNzUsIDc1LCAwLjEyKTtcbiAgY29sb3I6ICM0YjRiNGIgIWltcG9ydGFudDtcbn1cblxuLm92ZXJsYXktZGFyayB7XG4gIGJhY2tncm91bmQ6ICM0YjRiNGI7XG4gIC8qIFRoZSBGYWxsYmFjayAqL1xuICBiYWNrZ3JvdW5kOiByZ2JhKDc1LCA3NSwgNzUsIDAuNik7XG59XG5cbi5idG4tZGFyayB7XG4gIGJvcmRlci1jb2xvcjogIzRiNGI0YiAhaW1wb3J0YW50O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNGI0YjRiICFpbXBvcnRhbnQ7XG4gIGNvbG9yOiAjZmZmICFpbXBvcnRhbnQ7XG59XG4uYnRuLWRhcms6Zm9jdXMsIC5idG4tZGFyazphY3RpdmUsIC5idG4tZGFyay5hY3RpdmUge1xuICBjb2xvcjogI2ZmZjtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzM0MzQzNCAhaW1wb3J0YW50O1xufVxuLmJ0bi1kYXJrOmhvdmVyOm5vdCguZGlzYWJsZWQpOm5vdCg6ZGlzYWJsZWQpIHtcbiAgYm94LXNoYWRvdzogMCA4cHggMjVweCAtOHB4ICM0YjRiNGI7XG59XG4uYnRuLWRhcms6bm90KDpkaXNhYmxlZCk6bm90KC5kaXNhYmxlZCk6YWN0aXZlOmZvY3VzIHtcbiAgYm94LXNoYWRvdzogbm9uZTtcbn1cblxuLmJ0bi1mbGF0LWRhcmsge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICM0YjRiNGI7XG59XG4uYnRuLWZsYXQtZGFyazpob3ZlciB7XG4gIGNvbG9yOiAjNGI0YjRiO1xufVxuLmJ0bi1mbGF0LWRhcms6aG92ZXI6bm90KC5kaXNhYmxlZCk6bm90KDpkaXNhYmxlZCkge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDc1LCA3NSwgNzUsIDAuMTIpO1xufVxuLmJ0bi1mbGF0LWRhcms6YWN0aXZlLCAuYnRuLWZsYXQtZGFyay5hY3RpdmUsIC5idG4tZmxhdC1kYXJrOmZvY3VzIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg3NSwgNzUsIDc1LCAwLjIpO1xuICBjb2xvcjogIzRiNGI0Yjtcbn1cbi5idG4tZmxhdC1kYXJrLmRyb3Bkb3duLXRvZ2dsZTo6YWZ0ZXIge1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCJkYXRhOmltYWdlL3N2Zyt4bWwsJTNDc3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgdmlld0JveD0nMCAwIDI0IDI0JyBmaWxsPSdub25lJyBzdHJva2U9JyUyMzRiNGI0Yicgc3Ryb2tlLXdpZHRoPScyJyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnIGNsYXNzPSdmZWF0aGVyIGZlYXRoZXItY2hldnJvbi1kb3duJyUzRSUzQ3BvbHlsaW5lIHBvaW50cz0nNiA5IDEyIDE1IDE4IDknJTNFJTNDL3BvbHlsaW5lJTNFJTNDL3N2ZyUzRVwiKTtcbn1cblxuLmJ0bi1yZWxpZWYtZGFyayB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM0YjRiNGI7XG4gIGJveC1zaGFkb3c6IGluc2V0IDAgLTNweCAwIDAgcmdiYSgzNCwgNDEsIDQ3LCAwLjIpO1xuICBjb2xvcjogI2ZmZjtcbiAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZTtcbn1cbi5idG4tcmVsaWVmLWRhcms6aG92ZXI6bm90KC5kaXNhYmxlZCk6bm90KDpkaXNhYmxlZCkge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNjI2MjYyO1xufVxuLmJ0bi1yZWxpZWYtZGFyazphY3RpdmUsIC5idG4tcmVsaWVmLWRhcmsuYWN0aXZlLCAuYnRuLXJlbGllZi1kYXJrOmZvY3VzIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzM0MzQzNDtcbn1cbi5idG4tcmVsaWVmLWRhcms6aG92ZXIge1xuICBjb2xvcjogI2ZmZjtcbn1cbi5idG4tcmVsaWVmLWRhcms6YWN0aXZlLCAuYnRuLXJlbGllZi1kYXJrLmFjdGl2ZSB7XG4gIG91dGxpbmU6IG5vbmU7XG4gIGJveC1zaGFkb3c6IG5vbmU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgzcHgpO1xufVxuXG4uYnRuLW91dGxpbmUtZGFyayB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICM0YjRiNGIgIWltcG9ydGFudDtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAjNGI0YjRiO1xufVxuLmJ0bi1vdXRsaW5lLWRhcms6aG92ZXI6bm90KC5kaXNhYmxlZCk6bm90KDpkaXNhYmxlZCkge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDc1LCA3NSwgNzUsIDAuMDQpO1xuICBjb2xvcjogIzRiNGI0Yjtcbn1cbi5idG4tb3V0bGluZS1kYXJrOm5vdCg6ZGlzYWJsZWQpOm5vdCguZGlzYWJsZWQpOmFjdGl2ZTpmb2N1cyB7XG4gIGJveC1zaGFkb3c6IG5vbmU7XG59XG4uYnRuLW91dGxpbmUtZGFyazpub3QoOmRpc2FibGVkKTpub3QoLmRpc2FibGVkKTphY3RpdmUsIC5idG4tb3V0bGluZS1kYXJrOm5vdCg6ZGlzYWJsZWQpOm5vdCguZGlzYWJsZWQpLmFjdGl2ZSwgLmJ0bi1vdXRsaW5lLWRhcms6bm90KDpkaXNhYmxlZCk6bm90KC5kaXNhYmxlZCk6Zm9jdXMge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDc1LCA3NSwgNzUsIDAuMik7XG4gIGNvbG9yOiAjNGI0YjRiO1xufVxuLmJ0bi1vdXRsaW5lLWRhcmsuZHJvcGRvd24tdG9nZ2xlOjphZnRlciB7XG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcImRhdGE6aW1hZ2Uvc3ZnK3htbCwlM0NzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB2aWV3Qm94PScwIDAgMjQgMjQnIGZpbGw9J25vbmUnIHN0cm9rZT0nJTIzNGI0YjRiJyBzdHJva2Utd2lkdGg9JzInIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcgY2xhc3M9J2ZlYXRoZXIgZmVhdGhlci1jaGV2cm9uLWRvd24nJTNFJTNDcG9seWxpbmUgcG9pbnRzPSc2IDkgMTIgMTUgMTggOSclM0UlM0MvcG9seWxpbmUlM0UlM0Mvc3ZnJTNFXCIpO1xufVxuLnNob3cgPiAuYnRuLW91dGxpbmUtZGFyay5kcm9wZG93bi10b2dnbGUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDc1LCA3NSwgNzUsIDAuMik7XG4gIGNvbG9yOiAjNGI0YjRiO1xufVxuXG4uYnRuLW91dGxpbmUtZGFyay53YXZlcy1lZmZlY3QgLndhdmVzLXJpcHBsZSxcbi5idG4tZmxhdC1kYXJrLndhdmVzLWVmZmVjdCAud2F2ZXMtcmlwcGxlIHtcbiAgYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KHJnYmEoNzUsIDc1LCA3NSwgMC4yKSAwLCByZ2JhKDc1LCA3NSwgNzUsIDAuMykgNDAlLCByZ2JhKDc1LCA3NSwgNzUsIDAuNCkgNTAlLCByZ2JhKDc1LCA3NSwgNzUsIDAuNSkgNjAlLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDApIDcwJSk7XG59XG5cbi5idWxsZXQuYnVsbGV0LWRhcmsge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNGI0YjRiO1xufVxuXG4ubW9kYWwubW9kYWwtZGFyayAubW9kYWwtaGVhZGVyIC5tb2RhbC10aXRsZSB7XG4gIGNvbG9yOiAjNGI0YjRiO1xufVxuLm1vZGFsLm1vZGFsLWRhcmsgLm1vZGFsLWhlYWRlciAuY2xvc2Uge1xuICBjb2xvcjogIzRiNGI0YiAhaW1wb3J0YW50O1xufVxuXG4ucHJvZ3Jlc3MtYmFyLWRhcmsge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDc1LCA3NSwgNzUsIDAuMTIpO1xufVxuLnByb2dyZXNzLWJhci1kYXJrIC5wcm9ncmVzcy1iYXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNGI0YjRiO1xufVxuXG4udGltZWxpbmUgLnRpbWVsaW5lLXBvaW50LWRhcmsge1xuICBib3JkZXItY29sb3I6ICM0YjRiNGIgIWltcG9ydGFudDtcbn1cbi50aW1lbGluZSAudGltZWxpbmUtcG9pbnQtZGFyayBpLFxuLnRpbWVsaW5lIC50aW1lbGluZS1wb2ludC1kYXJrIHN2ZyB7XG4gIHN0cm9rZTogIzRiNGI0YiAhaW1wb3J0YW50O1xufVxuLnRpbWVsaW5lIC50aW1lbGluZS1wb2ludC1kYXJrLnRpbWVsaW5lLXBvaW50LWluZGljYXRvciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM0YjRiNGIgIWltcG9ydGFudDtcbn1cbi50aW1lbGluZSAudGltZWxpbmUtcG9pbnQtZGFyay50aW1lbGluZS1wb2ludC1pbmRpY2F0b3I6YmVmb3JlIHtcbiAgYmFja2dyb3VuZDogcmdiYSg3NSwgNzUsIDc1LCAwLjEyKSAhaW1wb3J0YW50O1xufVxuXG4uZGl2aWRlci5kaXZpZGVyLWRhcmsgLmRpdmlkZXItdGV4dDpiZWZvcmUsIC5kaXZpZGVyLmRpdmlkZXItZGFyayAuZGl2aWRlci10ZXh0OmFmdGVyIHtcbiAgYm9yZGVyLWNvbG9yOiAjNGI0YjRiICFpbXBvcnRhbnQ7XG59XG5cbmlucHV0OmZvY3VzIH4gLmJnLWRhcmsge1xuICBib3gtc2hhZG93OiAwIDAgMCAwLjA3NXJlbSAjZmZmLCAwIDAgMCAwLjIxcmVtICM0YjRiNGIgIWltcG9ydGFudDtcbn1cblxuLmN1c3RvbS1jb250cm9sLWRhcmsgLmN1c3RvbS1jb250cm9sLWlucHV0OmNoZWNrZWQgfiAuY3VzdG9tLWNvbnRyb2wtbGFiZWw6OmJlZm9yZSxcbi5jdXN0b20tY29udHJvbC1kYXJrIC5jdXN0b20tY29udHJvbC1pbnB1dDphY3RpdmUgfiAuY3VzdG9tLWNvbnRyb2wtbGFiZWw6OmJlZm9yZSB7XG4gIGJvcmRlci1jb2xvcjogIzRiNGI0YjtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzRiNGI0Yjtcbn1cbi5jdXN0b20tY29udHJvbC1kYXJrLmN1c3RvbS1jaGVja2JveCAuY3VzdG9tLWNvbnRyb2wtaW5wdXQ6Y2hlY2tlZCB+IC5jdXN0b20tY29udHJvbC1sYWJlbDo6YmVmb3JlLFxuLmN1c3RvbS1jb250cm9sLWRhcmsuY3VzdG9tLWNoZWNrYm94IC5jdXN0b20tY29udHJvbC1pbnB1dDphY3RpdmUgfiAuY3VzdG9tLWNvbnRyb2wtbGFiZWw6OmJlZm9yZSxcbi5jdXN0b20tY29udHJvbC1kYXJrLmN1c3RvbS1jaGVja2JveCAuY3VzdG9tLWNvbnRyb2wtaW5wdXQ6Zm9jdXMgfiAuY3VzdG9tLWNvbnRyb2wtbGFiZWw6OmJlZm9yZSwgLmN1c3RvbS1jb250cm9sLWRhcmsuY3VzdG9tLXJhZGlvIC5jdXN0b20tY29udHJvbC1pbnB1dDpjaGVja2VkIH4gLmN1c3RvbS1jb250cm9sLWxhYmVsOjpiZWZvcmUsXG4uY3VzdG9tLWNvbnRyb2wtZGFyay5jdXN0b20tcmFkaW8gLmN1c3RvbS1jb250cm9sLWlucHV0OmFjdGl2ZSB+IC5jdXN0b20tY29udHJvbC1sYWJlbDo6YmVmb3JlLFxuLmN1c3RvbS1jb250cm9sLWRhcmsuY3VzdG9tLXJhZGlvIC5jdXN0b20tY29udHJvbC1pbnB1dDpmb2N1cyB+IC5jdXN0b20tY29udHJvbC1sYWJlbDo6YmVmb3JlIHtcbiAgYm94LXNoYWRvdzogMCAycHggNHB4IDAgcmdiYSg3NSwgNzUsIDc1LCAwLjQpICFpbXBvcnRhbnQ7XG59XG4uY3VzdG9tLWNvbnRyb2wtZGFyayAuY3VzdG9tLWNvbnRyb2wtaW5wdXQ6ZGlzYWJsZWQ6Y2hlY2tlZCB+IC5jdXN0b20tY29udHJvbC1sYWJlbDo6YmVmb3JlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg3NSwgNzUsIDc1LCAwLjY1KSAhaW1wb3J0YW50O1xuICBib3JkZXI6IG5vbmU7XG4gIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcbn1cbi5jdXN0b20tY29udHJvbC1kYXJrIC5jdXN0b20tY29udHJvbC1pbnB1dDpmb2N1cyB+IC5jdXN0b20tY29udHJvbC1sYWJlbDo6YmVmb3JlIHtcbiAgYm9yZGVyLWNvbG9yOiAjNGI0YjRiICFpbXBvcnRhbnQ7XG59XG5cbi5jdXN0b20tc3dpdGNoLWRhcmsgLmN1c3RvbS1jb250cm9sLWlucHV0OmNoZWNrZWQgfiAuY3VzdG9tLWNvbnRyb2wtbGFiZWw6OmJlZm9yZSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM0YjRiNGIgIWltcG9ydGFudDtcbiAgY29sb3I6ICNmZmY7XG4gIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2Utb3V0O1xufVxuXG4uc2VsZWN0Mi1kYXJrIC5zZWxlY3QyLWNvbnRhaW5lci0tZGVmYXVsdCAuc2VsZWN0Mi1zZWxlY3Rpb24tLW11bHRpcGxlIC5zZWxlY3QyLXNlbGVjdGlvbl9fY2hvaWNlIHtcbiAgYmFja2dyb3VuZDogIzRiNGI0YiAhaW1wb3J0YW50O1xuICBib3JkZXItY29sb3I6ICM0YjRiNGIgIWltcG9ydGFudDtcbn1cblxuLnRleHQtZGFyay50ZXh0LWRhcmtlbi0xIHtcbiAgY29sb3I6ICMzNDM0MzQgIWltcG9ydGFudDtcbn1cblxuLmJnLWRhcmsuYmctZGFya2VuLTEge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzQzNDM0ICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItZGFyay5ib3JkZXItZGFya2VuLTEge1xuICBib3JkZXI6IDFweCBzb2xpZCAjMzQzNDM0ICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItdG9wLWRhcmsuYm9yZGVyLXRvcC1kYXJrZW4tMSB7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjMzQzNDM0ICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItYm90dG9tLWRhcmsuYm9yZGVyLWJvdHRvbS1kYXJrZW4tMSB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMzQzNDM0ICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItbGVmdC1kYXJrLmJvcmRlci1sZWZ0LWRhcmtlbi0xIHtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjMzQzNDM0ICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItcmlnaHQtZGFyay5ib3JkZXItcmlnaHQtZGFya2VuLTEge1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjMzQzNDM0ICFpbXBvcnRhbnQ7XG59XG5cbi5vdmVybGF5LWRhcmsub3ZlcmxheS1kYXJrZW4tMSB7XG4gIGJhY2tncm91bmQ6ICMzNDM0MzQ7XG4gIC8qIFRoZSBGYWxsYmFjayAqL1xuICBiYWNrZ3JvdW5kOiByZ2JhKDUyLCA1MiwgNTIsIDAuNik7XG59XG5cbi50ZXh0LWRhcmsudGV4dC1kYXJrZW4tMiB7XG4gIGNvbG9yOiAjMWUxZTFlICFpbXBvcnRhbnQ7XG59XG5cbi5iZy1kYXJrLmJnLWRhcmtlbi0yIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFlMWUxZSAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWRhcmsuYm9yZGVyLWRhcmtlbi0yIHtcbiAgYm9yZGVyOiAxcHggc29saWQgIzFlMWUxZSAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXRvcC1kYXJrLmJvcmRlci10b3AtZGFya2VuLTIge1xuICBib3JkZXItdG9wOiAxcHggc29saWQgIzFlMWUxZSAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWJvdHRvbS1kYXJrLmJvcmRlci1ib3R0b20tZGFya2VuLTIge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzFlMWUxZSAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWxlZnQtZGFyay5ib3JkZXItbGVmdC1kYXJrZW4tMiB7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgIzFlMWUxZSAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXJpZ2h0LWRhcmsuYm9yZGVyLXJpZ2h0LWRhcmtlbi0yIHtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgIzFlMWUxZSAhaW1wb3J0YW50O1xufVxuXG4ub3ZlcmxheS1kYXJrLm92ZXJsYXktZGFya2VuLTIge1xuICBiYWNrZ3JvdW5kOiAjMWUxZTFlO1xuICAvKiBUaGUgRmFsbGJhY2sgKi9cbiAgYmFja2dyb3VuZDogcmdiYSgzMCwgMzAsIDMwLCAwLjYpO1xufVxuXG4udGV4dC1kYXJrLnRleHQtZGFya2VuLTMge1xuICBjb2xvcjogIzYyNjI2MiAhaW1wb3J0YW50O1xufVxuXG4uYmctZGFyay5iZy1kYXJrZW4tMyB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM2MjYyNjIgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1kYXJrLmJvcmRlci1kYXJrZW4tMyB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICM2MjYyNjIgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci10b3AtZGFyay5ib3JkZXItdG9wLWRhcmtlbi0zIHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM2MjYyNjIgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1ib3R0b20tZGFyay5ib3JkZXItYm90dG9tLWRhcmtlbi0zIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICM2MjYyNjIgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1sZWZ0LWRhcmsuYm9yZGVyLWxlZnQtZGFya2VuLTMge1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICM2MjYyNjIgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1yaWdodC1kYXJrLmJvcmRlci1yaWdodC1kYXJrZW4tMyB7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICM2MjYyNjIgIWltcG9ydGFudDtcbn1cblxuLm92ZXJsYXktZGFyay5vdmVybGF5LWRhcmtlbi0zIHtcbiAgYmFja2dyb3VuZDogIzYyNjI2MjtcbiAgLyogVGhlIEZhbGxiYWNrICovXG4gIGJhY2tncm91bmQ6IHJnYmEoOTgsIDk4LCA5OCwgMC42KTtcbn1cblxuLmJnLWxpZ2h0IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y2ZjZmNiAhaW1wb3J0YW50O1xufVxuLmJnLWxpZ2h0IC5jYXJkLWhlYWRlcixcbi5iZy1saWdodCAuY2FyZC1mb290ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cblxuLmJvcmRlci1saWdodCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNmNmY2ZjYgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci10b3AtbGlnaHQge1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI2Y2ZjZmNjtcbn1cblxuLmJvcmRlci1ib3R0b20tbGlnaHQge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2Y2ZjZmNjtcbn1cblxuLmJvcmRlci1sZWZ0LWxpZ2h0IHtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjZjZmNmY2O1xufVxuXG4uYm9yZGVyLXJpZ2h0LWxpZ2h0IHtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2Y2ZjZmNjtcbn1cblxuLmJnLWxpZ2h0LmJhZGdlLWdsb3csXG4uYm9yZGVyLWxpZ2h0LmJhZGdlLWdsb3csXG4uYmFkZ2UtbGlnaHQuYmFkZ2UtZ2xvdyB7XG4gIGJveC1zaGFkb3c6IDBweCAwcHggMTBweCAjZjZmNmY2O1xufVxuXG4ub3ZlcmxheS1saWdodCB7XG4gIGJhY2tncm91bmQ6ICNmNmY2ZjY7XG4gIC8qIFRoZSBGYWxsYmFjayAqL1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI0NiwgMjQ2LCAyNDYsIDAuNik7XG59XG5cbmlucHV0OmZvY3VzIH4gLmJnLWxpZ2h0IHtcbiAgYm94LXNoYWRvdzogMCAwIDAgMC4wNzVyZW0gI2ZmZiwgMCAwIDAgMC4yMXJlbSAjZjZmNmY2ICFpbXBvcnRhbnQ7XG59XG5cbi50ZXh0LXByaW1hcnkudGV4dC1saWdodGVuLTUge1xuICBjb2xvcjogI2VkNmQ5ZCAhaW1wb3J0YW50O1xufVxuXG4uYmctcHJpbWFyeS5iZy1saWdodGVuLTUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWQ2ZDlkICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItcHJpbWFyeS5ib3JkZXItbGlnaHRlbi01IHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2VkNmQ5ZCAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXRvcC1wcmltYXJ5LmJvcmRlci10b3AtbGlnaHRlbi01IHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNlZDZkOWQgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1ib3R0b20tcHJpbWFyeS5ib3JkZXItYm90dG9tLWxpZ2h0ZW4tNSB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZWQ2ZDlkICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItbGVmdC1wcmltYXJ5LmJvcmRlci1sZWZ0LWxpZ2h0ZW4tNSB7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2VkNmQ5ZCAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXJpZ2h0LXByaW1hcnkuYm9yZGVyLXJpZ2h0LWxpZ2h0ZW4tNSB7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNlZDZkOWQgIWltcG9ydGFudDtcbn1cblxuLm92ZXJsYXktcHJpbWFyeS5vdmVybGF5LWxpZ2h0ZW4tNSB7XG4gIGJhY2tncm91bmQ6ICNlZDZkOWQ7XG4gIC8qIFRoZSBGYWxsYmFjayAqL1xuICBiYWNrZ3JvdW5kOiByZ2JhKDIzNywgMTA5LCAxNTcsIDAuNik7XG59XG5cbi50ZXh0LXByaW1hcnkudGV4dC1saWdodGVuLTQge1xuICBjb2xvcjogI2VhNTY4ZSAhaW1wb3J0YW50O1xufVxuXG4uYmctcHJpbWFyeS5iZy1saWdodGVuLTQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWE1NjhlICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItcHJpbWFyeS5ib3JkZXItbGlnaHRlbi00IHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2VhNTY4ZSAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXRvcC1wcmltYXJ5LmJvcmRlci10b3AtbGlnaHRlbi00IHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNlYTU2OGUgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1ib3R0b20tcHJpbWFyeS5ib3JkZXItYm90dG9tLWxpZ2h0ZW4tNCB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZWE1NjhlICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItbGVmdC1wcmltYXJ5LmJvcmRlci1sZWZ0LWxpZ2h0ZW4tNCB7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2VhNTY4ZSAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXJpZ2h0LXByaW1hcnkuYm9yZGVyLXJpZ2h0LWxpZ2h0ZW4tNCB7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNlYTU2OGUgIWltcG9ydGFudDtcbn1cblxuLm92ZXJsYXktcHJpbWFyeS5vdmVybGF5LWxpZ2h0ZW4tNCB7XG4gIGJhY2tncm91bmQ6ICNlYTU2OGU7XG4gIC8qIFRoZSBGYWxsYmFjayAqL1xuICBiYWNrZ3JvdW5kOiByZ2JhKDIzNCwgODYsIDE0MiwgMC42KTtcbn1cblxuLnRleHQtcHJpbWFyeS50ZXh0LWxpZ2h0ZW4tMyB7XG4gIGNvbG9yOiAjZTczZjdlICFpbXBvcnRhbnQ7XG59XG5cbi5iZy1wcmltYXJ5LmJnLWxpZ2h0ZW4tMyB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlNzNmN2UgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1wcmltYXJ5LmJvcmRlci1saWdodGVuLTMge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZTczZjdlICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItdG9wLXByaW1hcnkuYm9yZGVyLXRvcC1saWdodGVuLTMge1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI2U3M2Y3ZSAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWJvdHRvbS1wcmltYXJ5LmJvcmRlci1ib3R0b20tbGlnaHRlbi0zIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlNzNmN2UgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1sZWZ0LXByaW1hcnkuYm9yZGVyLWxlZnQtbGlnaHRlbi0zIHtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjZTczZjdlICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItcmlnaHQtcHJpbWFyeS5ib3JkZXItcmlnaHQtbGlnaHRlbi0zIHtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2U3M2Y3ZSAhaW1wb3J0YW50O1xufVxuXG4ub3ZlcmxheS1wcmltYXJ5Lm92ZXJsYXktbGlnaHRlbi0zIHtcbiAgYmFja2dyb3VuZDogI2U3M2Y3ZTtcbiAgLyogVGhlIEZhbGxiYWNrICovXG4gIGJhY2tncm91bmQ6IHJnYmEoMjMxLCA2MywgMTI2LCAwLjYpO1xufVxuXG4udGV4dC1wcmltYXJ5LnRleHQtbGlnaHRlbi0yIHtcbiAgY29sb3I6ICNlNDI5NmYgIWltcG9ydGFudDtcbn1cblxuLmJnLXByaW1hcnkuYmctbGlnaHRlbi0yIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U0Mjk2ZiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXByaW1hcnkuYm9yZGVyLWxpZ2h0ZW4tMiB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNlNDI5NmYgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci10b3AtcHJpbWFyeS5ib3JkZXItdG9wLWxpZ2h0ZW4tMiB7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZTQyOTZmICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItYm90dG9tLXByaW1hcnkuYm9yZGVyLWJvdHRvbS1saWdodGVuLTIge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2U0Mjk2ZiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWxlZnQtcHJpbWFyeS5ib3JkZXItbGVmdC1saWdodGVuLTIge1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICNlNDI5NmYgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1yaWdodC1wcmltYXJ5LmJvcmRlci1yaWdodC1saWdodGVuLTIge1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjZTQyOTZmICFpbXBvcnRhbnQ7XG59XG5cbi5vdmVybGF5LXByaW1hcnkub3ZlcmxheS1saWdodGVuLTIge1xuICBiYWNrZ3JvdW5kOiAjZTQyOTZmO1xuICAvKiBUaGUgRmFsbGJhY2sgKi9cbiAgYmFja2dyb3VuZDogcmdiYSgyMjgsIDQxLCAxMTEsIDAuNik7XG59XG5cbi50ZXh0LXByaW1hcnkudGV4dC1saWdodGVuLTEge1xuICBjb2xvcjogI2Q5MWI2MiAhaW1wb3J0YW50O1xufVxuXG4uYmctcHJpbWFyeS5iZy1saWdodGVuLTEge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDkxYjYyICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItcHJpbWFyeS5ib3JkZXItbGlnaHRlbi0xIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2Q5MWI2MiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXRvcC1wcmltYXJ5LmJvcmRlci10b3AtbGlnaHRlbi0xIHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNkOTFiNjIgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1ib3R0b20tcHJpbWFyeS5ib3JkZXItYm90dG9tLWxpZ2h0ZW4tMSB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZDkxYjYyICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItbGVmdC1wcmltYXJ5LmJvcmRlci1sZWZ0LWxpZ2h0ZW4tMSB7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2Q5MWI2MiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXJpZ2h0LXByaW1hcnkuYm9yZGVyLXJpZ2h0LWxpZ2h0ZW4tMSB7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNkOTFiNjIgIWltcG9ydGFudDtcbn1cblxuLm92ZXJsYXktcHJpbWFyeS5vdmVybGF5LWxpZ2h0ZW4tMSB7XG4gIGJhY2tncm91bmQ6ICNkOTFiNjI7XG4gIC8qIFRoZSBGYWxsYmFjayAqL1xuICBiYWNrZ3JvdW5kOiByZ2JhKDIxNywgMjcsIDk4LCAwLjYpO1xufVxuXG4uYmctcHJpbWFyeSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNDMjE4NTggIWltcG9ydGFudDtcbn1cbi5iZy1wcmltYXJ5IC5jYXJkLWhlYWRlcixcbi5iZy1wcmltYXJ5IC5jYXJkLWZvb3RlciB7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xufVxuXG4uYWxlcnQtcHJpbWFyeSB7XG4gIGJhY2tncm91bmQ6IHJnYmEoMTk0LCAyNCwgODgsIDAuMTIpICFpbXBvcnRhbnQ7XG4gIGNvbG9yOiAjQzIxODU4ICFpbXBvcnRhbnQ7XG59XG4uYWxlcnQtcHJpbWFyeSAuYWxlcnQtaGVhZGluZyB7XG4gIGJveC1zaGFkb3c6IHJnYmEoMTk0LCAyNCwgODgsIDAuNCkgMHB4IDZweCAxNXB4IC03cHg7XG59XG4uYWxlcnQtcHJpbWFyeSAuYWxlcnQtbGluayB7XG4gIGNvbG9yOiAjYWIxNTRlICFpbXBvcnRhbnQ7XG59XG4uYWxlcnQtcHJpbWFyeSAuY2xvc2Uge1xuICBjb2xvcjogI0MyMTg1OCAhaW1wb3J0YW50O1xufVxuXG4uYmctbGlnaHQtcHJpbWFyeSB7XG4gIGJhY2tncm91bmQ6IHJnYmEoMTk0LCAyNCwgODgsIDAuMTIpICFpbXBvcnRhbnQ7XG4gIGNvbG9yOiAjQzIxODU4ICFpbXBvcnRhbnQ7XG59XG4uYmctbGlnaHQtcHJpbWFyeS5mYy1oLWV2ZW50LCAuYmctbGlnaHQtcHJpbWFyeS5mYy12LWV2ZW50IHtcbiAgYm9yZGVyLWNvbG9yOiByZ2JhKDE5NCwgMjQsIDg4LCAwLjEpO1xufVxuLmJnLWxpZ2h0LXByaW1hcnkgLmZjLWxpc3QtZXZlbnQtZG90LFxuLmJnLWxpZ2h0LXByaW1hcnkgLmZjLWRheWdyaWQtZXZlbnQtZG90IHtcbiAgYm9yZGVyLWNvbG9yOiAjQzIxODU4ICFpbXBvcnRhbnQ7XG59XG4uYmctbGlnaHQtcHJpbWFyeS5mYy1saXN0LWV2ZW50OmhvdmVyIHRkIHtcbiAgYmFja2dyb3VuZDogcmdiYSgxOTQsIDI0LCA4OCwgMC4xKSAhaW1wb3J0YW50O1xufVxuLmJnLWxpZ2h0LXByaW1hcnkuZmMtbGlzdC1ldmVudCAuZmMtbGlzdC1ldmVudC10aXRsZSB7XG4gIGNvbG9yOiAjNmU2YjdiO1xufVxuXG4uYXZhdGFyLmJnLWxpZ2h0LXByaW1hcnkge1xuICBjb2xvcjogI0MyMTg1OCAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXByaW1hcnkge1xuICBib3JkZXI6IDFweCBzb2xpZCAjQzIxODU4ICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItdG9wLXByaW1hcnkge1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI0MyMTg1ODtcbn1cblxuLmJvcmRlci1ib3R0b20tcHJpbWFyeSB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjQzIxODU4O1xufVxuXG4uYm9yZGVyLWxlZnQtcHJpbWFyeSB7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI0MyMTg1ODtcbn1cblxuLmJvcmRlci1yaWdodC1wcmltYXJ5IHtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI0MyMTg1ODtcbn1cblxuLmJnLXByaW1hcnkuYmFkZ2UtZ2xvdyxcbi5ib3JkZXItcHJpbWFyeS5iYWRnZS1nbG93LFxuLmJhZGdlLXByaW1hcnkuYmFkZ2UtZ2xvdyB7XG4gIGJveC1zaGFkb3c6IDBweCAwcHggMTBweCAjQzIxODU4O1xufVxuXG4uYmFkZ2UuYmFkZ2UtbGlnaHQtcHJpbWFyeSB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTk0LCAyNCwgODgsIDAuMTIpO1xuICBjb2xvcjogI0MyMTg1OCAhaW1wb3J0YW50O1xufVxuXG4ub3ZlcmxheS1wcmltYXJ5IHtcbiAgYmFja2dyb3VuZDogI0MyMTg1ODtcbiAgLyogVGhlIEZhbGxiYWNrICovXG4gIGJhY2tncm91bmQ6IHJnYmEoMTk0LCAyNCwgODgsIDAuNik7XG59XG5cbi5idG4tcHJpbWFyeSB7XG4gIGJvcmRlci1jb2xvcjogI0MyMTg1OCAhaW1wb3J0YW50O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjQzIxODU4ICFpbXBvcnRhbnQ7XG4gIGNvbG9yOiAjZmZmICFpbXBvcnRhbnQ7XG59XG4uYnRuLXByaW1hcnk6Zm9jdXMsIC5idG4tcHJpbWFyeTphY3RpdmUsIC5idG4tcHJpbWFyeS5hY3RpdmUge1xuICBjb2xvcjogI2ZmZjtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2FiMTU0ZSAhaW1wb3J0YW50O1xufVxuLmJ0bi1wcmltYXJ5OmhvdmVyOm5vdCguZGlzYWJsZWQpOm5vdCg6ZGlzYWJsZWQpIHtcbiAgYm94LXNoYWRvdzogMCA4cHggMjVweCAtOHB4ICNjMjE4NTg7XG59XG4uYnRuLXByaW1hcnk6bm90KDpkaXNhYmxlZCk6bm90KC5kaXNhYmxlZCk6YWN0aXZlOmZvY3VzIHtcbiAgYm94LXNoYWRvdzogbm9uZTtcbn1cblxuLmJ0bi1mbGF0LXByaW1hcnkge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICNDMjE4NTg7XG59XG4uYnRuLWZsYXQtcHJpbWFyeTpob3ZlciB7XG4gIGNvbG9yOiAjQzIxODU4O1xufVxuLmJ0bi1mbGF0LXByaW1hcnk6aG92ZXI6bm90KC5kaXNhYmxlZCk6bm90KDpkaXNhYmxlZCkge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDE5NCwgMjQsIDg4LCAwLjEyKTtcbn1cbi5idG4tZmxhdC1wcmltYXJ5OmFjdGl2ZSwgLmJ0bi1mbGF0LXByaW1hcnkuYWN0aXZlLCAuYnRuLWZsYXQtcHJpbWFyeTpmb2N1cyB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTk0LCAyNCwgODgsIDAuMik7XG4gIGNvbG9yOiAjQzIxODU4O1xufVxuLmJ0bi1mbGF0LXByaW1hcnkuZHJvcGRvd24tdG9nZ2xlOjphZnRlciB7XG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcImRhdGE6aW1hZ2Uvc3ZnK3htbCwlM0NzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB2aWV3Qm94PScwIDAgMjQgMjQnIGZpbGw9J25vbmUnIHN0cm9rZT0nJTIzQzIxODU4JyBzdHJva2Utd2lkdGg9JzInIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcgY2xhc3M9J2ZlYXRoZXIgZmVhdGhlci1jaGV2cm9uLWRvd24nJTNFJTNDcG9seWxpbmUgcG9pbnRzPSc2IDkgMTIgMTUgMTggOSclM0UlM0MvcG9seWxpbmUlM0UlM0Mvc3ZnJTNFXCIpO1xufVxuXG4uYnRuLXJlbGllZi1wcmltYXJ5IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0MyMTg1ODtcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAtM3B4IDAgMCByZ2JhKDM0LCA0MSwgNDcsIDAuMik7XG4gIGNvbG9yOiAjZmZmO1xuICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlO1xufVxuLmJ0bi1yZWxpZWYtcHJpbWFyeTpob3Zlcjpub3QoLmRpc2FibGVkKTpub3QoOmRpc2FibGVkKSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNkOTFiNjI7XG59XG4uYnRuLXJlbGllZi1wcmltYXJ5OmFjdGl2ZSwgLmJ0bi1yZWxpZWYtcHJpbWFyeS5hY3RpdmUsIC5idG4tcmVsaWVmLXByaW1hcnk6Zm9jdXMge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWIxNTRlO1xufVxuLmJ0bi1yZWxpZWYtcHJpbWFyeTpob3ZlciB7XG4gIGNvbG9yOiAjZmZmO1xufVxuLmJ0bi1yZWxpZWYtcHJpbWFyeTphY3RpdmUsIC5idG4tcmVsaWVmLXByaW1hcnkuYWN0aXZlIHtcbiAgb3V0bGluZTogbm9uZTtcbiAgYm94LXNoYWRvdzogbm9uZTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDNweCk7XG59XG5cbi5idG4tb3V0bGluZS1wcmltYXJ5IHtcbiAgYm9yZGVyOiAxcHggc29saWQgI0MyMTg1OCAhaW1wb3J0YW50O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICNDMjE4NTg7XG59XG4uYnRuLW91dGxpbmUtcHJpbWFyeTpob3Zlcjpub3QoLmRpc2FibGVkKTpub3QoOmRpc2FibGVkKSB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTk0LCAyNCwgODgsIDAuMDQpO1xuICBjb2xvcjogI0MyMTg1ODtcbn1cbi5idG4tb3V0bGluZS1wcmltYXJ5Om5vdCg6ZGlzYWJsZWQpOm5vdCguZGlzYWJsZWQpOmFjdGl2ZTpmb2N1cyB7XG4gIGJveC1zaGFkb3c6IG5vbmU7XG59XG4uYnRuLW91dGxpbmUtcHJpbWFyeTpub3QoOmRpc2FibGVkKTpub3QoLmRpc2FibGVkKTphY3RpdmUsIC5idG4tb3V0bGluZS1wcmltYXJ5Om5vdCg6ZGlzYWJsZWQpOm5vdCguZGlzYWJsZWQpLmFjdGl2ZSwgLmJ0bi1vdXRsaW5lLXByaW1hcnk6bm90KDpkaXNhYmxlZCk6bm90KC5kaXNhYmxlZCk6Zm9jdXMge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDE5NCwgMjQsIDg4LCAwLjIpO1xuICBjb2xvcjogI0MyMTg1ODtcbn1cbi5idG4tb3V0bGluZS1wcmltYXJ5LmRyb3Bkb3duLXRvZ2dsZTo6YWZ0ZXIge1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCJkYXRhOmltYWdlL3N2Zyt4bWwsJTNDc3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgdmlld0JveD0nMCAwIDI0IDI0JyBmaWxsPSdub25lJyBzdHJva2U9JyUyM0MyMTg1OCcgc3Ryb2tlLXdpZHRoPScyJyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnIGNsYXNzPSdmZWF0aGVyIGZlYXRoZXItY2hldnJvbi1kb3duJyUzRSUzQ3BvbHlsaW5lIHBvaW50cz0nNiA5IDEyIDE1IDE4IDknJTNFJTNDL3BvbHlsaW5lJTNFJTNDL3N2ZyUzRVwiKTtcbn1cbi5zaG93ID4gLmJ0bi1vdXRsaW5lLXByaW1hcnkuZHJvcGRvd24tdG9nZ2xlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxOTQsIDI0LCA4OCwgMC4yKTtcbiAgY29sb3I6ICNDMjE4NTg7XG59XG5cbi5idG4tb3V0bGluZS1wcmltYXJ5LndhdmVzLWVmZmVjdCAud2F2ZXMtcmlwcGxlLFxuLmJ0bi1mbGF0LXByaW1hcnkud2F2ZXMtZWZmZWN0IC53YXZlcy1yaXBwbGUge1xuICBiYWNrZ3JvdW5kOiByYWRpYWwtZ3JhZGllbnQocmdiYSgxOTQsIDI0LCA4OCwgMC4yKSAwLCByZ2JhKDE5NCwgMjQsIDg4LCAwLjMpIDQwJSwgcmdiYSgxOTQsIDI0LCA4OCwgMC40KSA1MCUsIHJnYmEoMTk0LCAyNCwgODgsIDAuNSkgNjAlLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDApIDcwJSk7XG59XG5cbi5idWxsZXQuYnVsbGV0LXByaW1hcnkge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjQzIxODU4O1xufVxuXG4ubW9kYWwubW9kYWwtcHJpbWFyeSAubW9kYWwtaGVhZGVyIC5tb2RhbC10aXRsZSB7XG4gIGNvbG9yOiAjQzIxODU4O1xufVxuLm1vZGFsLm1vZGFsLXByaW1hcnkgLm1vZGFsLWhlYWRlciAuY2xvc2Uge1xuICBjb2xvcjogI0MyMTg1OCAhaW1wb3J0YW50O1xufVxuXG4ucGFnaW5hdGlvbi1wcmltYXJ5IC5wYWdlLWl0ZW0uYWN0aXZlIC5wYWdlLWxpbmsge1xuICBiYWNrZ3JvdW5kOiAjQzIxODU4ICFpbXBvcnRhbnQ7XG4gIGNvbG9yOiAjZmZmO1xufVxuLnBhZ2luYXRpb24tcHJpbWFyeSAucGFnZS1pdGVtLmFjdGl2ZSAucGFnZS1saW5rOmhvdmVyIHtcbiAgY29sb3I6ICNmZmY7XG59XG4ucGFnaW5hdGlvbi1wcmltYXJ5IC5wYWdlLWl0ZW0gLnBhZ2UtbGluazpob3ZlciB7XG4gIGNvbG9yOiAjQzIxODU4O1xufVxuLnBhZ2luYXRpb24tcHJpbWFyeSAucGFnZS1pdGVtLnByZXYtaXRlbSAucGFnZS1saW5rOmhvdmVyLCAucGFnaW5hdGlvbi1wcmltYXJ5IC5wYWdlLWl0ZW0ubmV4dC1pdGVtIC5wYWdlLWxpbms6aG92ZXIge1xuICBiYWNrZ3JvdW5kOiAjQzIxODU4O1xuICBjb2xvcjogI2ZmZjtcbn1cbi5wYWdpbmF0aW9uLXByaW1hcnkgLnBhZ2UtaXRlbS5uZXh0LWl0ZW0gLnBhZ2UtbGluazphY3RpdmU6YWZ0ZXIsIC5wYWdpbmF0aW9uLXByaW1hcnkgLnBhZ2UtaXRlbS5uZXh0LWl0ZW0gLnBhZ2UtbGluazpob3ZlcjphZnRlciwgLnBhZ2luYXRpb24tcHJpbWFyeSAucGFnZS1pdGVtLm5leHQgLnBhZ2UtbGluazphY3RpdmU6YWZ0ZXIsIC5wYWdpbmF0aW9uLXByaW1hcnkgLnBhZ2UtaXRlbS5uZXh0IC5wYWdlLWxpbms6aG92ZXI6YWZ0ZXIge1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCJkYXRhOmltYWdlL3N2Zyt4bWwsJTNDc3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgdmlld0JveD0nMCAwIDI0IDI0JyBmaWxsPSdub25lJyBzdHJva2U9JyUyM0MyMTg1OCcgc3Ryb2tlLXdpZHRoPScyJyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnIGNsYXNzPSdmZWF0aGVyIGZlYXRoZXItY2hldnJvbi1yaWdodCclM0UlM0Nwb2x5bGluZSBwb2ludHM9JzkgMTggMTUgMTIgOSA2JyUzRSUzQy9wb2x5bGluZSUzRSUzQy9zdmclM0VcIikgIWltcG9ydGFudDtcbn1cbi5wYWdpbmF0aW9uLXByaW1hcnkgLnBhZ2UtaXRlbS5wcmV2LWl0ZW0gLnBhZ2UtbGluazphY3RpdmU6YmVmb3JlLCAucGFnaW5hdGlvbi1wcmltYXJ5IC5wYWdlLWl0ZW0ucHJldi1pdGVtIC5wYWdlLWxpbms6aG92ZXI6YmVmb3JlLCAucGFnaW5hdGlvbi1wcmltYXJ5IC5wYWdlLWl0ZW0ucHJldiAucGFnZS1saW5rOmFjdGl2ZTpiZWZvcmUsIC5wYWdpbmF0aW9uLXByaW1hcnkgLnBhZ2UtaXRlbS5wcmV2IC5wYWdlLWxpbms6aG92ZXI6YmVmb3JlIHtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiZGF0YTppbWFnZS9zdmcreG1sLCUzQ3N2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNCAyNCcgZmlsbD0nbm9uZScgc3Ryb2tlPSclMjNDMjE4NTgnIHN0cm9rZS13aWR0aD0nMicgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJyBjbGFzcz0nZmVhdGhlciBmZWF0aGVyLWNoZXZyb24tbGVmdCclM0UlM0Nwb2x5bGluZSBwb2ludHM9JzE1IDE4IDkgMTIgMTUgNiclM0UlM0MvcG9seWxpbmUlM0UlM0Mvc3ZnJTNFXCIpICFpbXBvcnRhbnQ7XG59XG5cbi5uYXYtcGlsbC1wcmltYXJ5IC5uYXYtaXRlbSAubmF2LWxpbmsuYWN0aXZlIHtcbiAgY29sb3I6ICNmZmY7XG4gIGJhY2tncm91bmQtY29sb3I6ICNDMjE4NTggIWltcG9ydGFudDtcbiAgYm9yZGVyLWNvbG9yOiAjQzIxODU4O1xuICBib3gtc2hhZG93OiAwIDRweCAxOHB4IC00cHggcmdiYSgxOTQsIDI0LCA4OCwgMC42NSk7XG59XG5cbi5wcm9ncmVzcy1iYXItcHJpbWFyeSB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTk0LCAyNCwgODgsIDAuMTIpO1xufVxuLnByb2dyZXNzLWJhci1wcmltYXJ5IC5wcm9ncmVzcy1iYXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjQzIxODU4O1xufVxuXG4udGltZWxpbmUgLnRpbWVsaW5lLXBvaW50LXByaW1hcnkge1xuICBib3JkZXItY29sb3I6ICNDMjE4NTggIWltcG9ydGFudDtcbn1cbi50aW1lbGluZSAudGltZWxpbmUtcG9pbnQtcHJpbWFyeSBpLFxuLnRpbWVsaW5lIC50aW1lbGluZS1wb2ludC1wcmltYXJ5IHN2ZyB7XG4gIHN0cm9rZTogI0MyMTg1OCAhaW1wb3J0YW50O1xufVxuLnRpbWVsaW5lIC50aW1lbGluZS1wb2ludC1wcmltYXJ5LnRpbWVsaW5lLXBvaW50LWluZGljYXRvciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNDMjE4NTggIWltcG9ydGFudDtcbn1cbi50aW1lbGluZSAudGltZWxpbmUtcG9pbnQtcHJpbWFyeS50aW1lbGluZS1wb2ludC1pbmRpY2F0b3I6YmVmb3JlIHtcbiAgYmFja2dyb3VuZDogcmdiYSgxOTQsIDI0LCA4OCwgMC4xMikgIWltcG9ydGFudDtcbn1cblxuLmRpdmlkZXIuZGl2aWRlci1wcmltYXJ5IC5kaXZpZGVyLXRleHQ6YmVmb3JlLCAuZGl2aWRlci5kaXZpZGVyLXByaW1hcnkgLmRpdmlkZXItdGV4dDphZnRlciB7XG4gIGJvcmRlci1jb2xvcjogI0MyMTg1OCAhaW1wb3J0YW50O1xufVxuXG5pbnB1dDpmb2N1cyB+IC5iZy1wcmltYXJ5IHtcbiAgYm94LXNoYWRvdzogMCAwIDAgMC4wNzVyZW0gI2ZmZiwgMCAwIDAgMC4yMXJlbSAjQzIxODU4ICFpbXBvcnRhbnQ7XG59XG5cbi5jdXN0b20tY29udHJvbC1wcmltYXJ5IC5jdXN0b20tY29udHJvbC1pbnB1dDpjaGVja2VkIH4gLmN1c3RvbS1jb250cm9sLWxhYmVsOjpiZWZvcmUsXG4uY3VzdG9tLWNvbnRyb2wtcHJpbWFyeSAuY3VzdG9tLWNvbnRyb2wtaW5wdXQ6YWN0aXZlIH4gLmN1c3RvbS1jb250cm9sLWxhYmVsOjpiZWZvcmUge1xuICBib3JkZXItY29sb3I6ICNDMjE4NTg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNDMjE4NTg7XG59XG4uY3VzdG9tLWNvbnRyb2wtcHJpbWFyeS5jdXN0b20tY2hlY2tib3ggLmN1c3RvbS1jb250cm9sLWlucHV0OmNoZWNrZWQgfiAuY3VzdG9tLWNvbnRyb2wtbGFiZWw6OmJlZm9yZSxcbi5jdXN0b20tY29udHJvbC1wcmltYXJ5LmN1c3RvbS1jaGVja2JveCAuY3VzdG9tLWNvbnRyb2wtaW5wdXQ6YWN0aXZlIH4gLmN1c3RvbS1jb250cm9sLWxhYmVsOjpiZWZvcmUsXG4uY3VzdG9tLWNvbnRyb2wtcHJpbWFyeS5jdXN0b20tY2hlY2tib3ggLmN1c3RvbS1jb250cm9sLWlucHV0OmZvY3VzIH4gLmN1c3RvbS1jb250cm9sLWxhYmVsOjpiZWZvcmUsIC5jdXN0b20tY29udHJvbC1wcmltYXJ5LmN1c3RvbS1yYWRpbyAuY3VzdG9tLWNvbnRyb2wtaW5wdXQ6Y2hlY2tlZCB+IC5jdXN0b20tY29udHJvbC1sYWJlbDo6YmVmb3JlLFxuLmN1c3RvbS1jb250cm9sLXByaW1hcnkuY3VzdG9tLXJhZGlvIC5jdXN0b20tY29udHJvbC1pbnB1dDphY3RpdmUgfiAuY3VzdG9tLWNvbnRyb2wtbGFiZWw6OmJlZm9yZSxcbi5jdXN0b20tY29udHJvbC1wcmltYXJ5LmN1c3RvbS1yYWRpbyAuY3VzdG9tLWNvbnRyb2wtaW5wdXQ6Zm9jdXMgfiAuY3VzdG9tLWNvbnRyb2wtbGFiZWw6OmJlZm9yZSB7XG4gIGJveC1zaGFkb3c6IDAgMnB4IDRweCAwIHJnYmEoMTk0LCAyNCwgODgsIDAuNCkgIWltcG9ydGFudDtcbn1cbi5jdXN0b20tY29udHJvbC1wcmltYXJ5IC5jdXN0b20tY29udHJvbC1pbnB1dDpkaXNhYmxlZDpjaGVja2VkIH4gLmN1c3RvbS1jb250cm9sLWxhYmVsOjpiZWZvcmUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDE5NCwgMjQsIDg4LCAwLjY1KSAhaW1wb3J0YW50O1xuICBib3JkZXI6IG5vbmU7XG4gIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcbn1cbi5jdXN0b20tY29udHJvbC1wcmltYXJ5IC5jdXN0b20tY29udHJvbC1pbnB1dDpmb2N1cyB+IC5jdXN0b20tY29udHJvbC1sYWJlbDo6YmVmb3JlIHtcbiAgYm9yZGVyLWNvbG9yOiAjQzIxODU4ICFpbXBvcnRhbnQ7XG59XG5cbi5jdXN0b20tc3dpdGNoLXByaW1hcnkgLmN1c3RvbS1jb250cm9sLWlucHV0OmNoZWNrZWQgfiAuY3VzdG9tLWNvbnRyb2wtbGFiZWw6OmJlZm9yZSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNDMjE4NTggIWltcG9ydGFudDtcbiAgY29sb3I6ICNmZmY7XG4gIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2Utb3V0O1xufVxuXG4uc2VsZWN0Mi1wcmltYXJ5IC5zZWxlY3QyLWNvbnRhaW5lci0tZGVmYXVsdCAuc2VsZWN0Mi1zZWxlY3Rpb24tLW11bHRpcGxlIC5zZWxlY3QyLXNlbGVjdGlvbl9fY2hvaWNlIHtcbiAgYmFja2dyb3VuZDogI0MyMTg1OCAhaW1wb3J0YW50O1xuICBib3JkZXItY29sb3I6ICNDMjE4NTggIWltcG9ydGFudDtcbn1cblxuLnRleHQtcHJpbWFyeS50ZXh0LWRhcmtlbi0xIHtcbiAgY29sb3I6ICNhYjE1NGUgIWltcG9ydGFudDtcbn1cblxuLmJnLXByaW1hcnkuYmctZGFya2VuLTEge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWIxNTRlICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItcHJpbWFyeS5ib3JkZXItZGFya2VuLTEge1xuICBib3JkZXI6IDFweCBzb2xpZCAjYWIxNTRlICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItdG9wLXByaW1hcnkuYm9yZGVyLXRvcC1kYXJrZW4tMSB7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjYWIxNTRlICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItYm90dG9tLXByaW1hcnkuYm9yZGVyLWJvdHRvbS1kYXJrZW4tMSB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjYWIxNTRlICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItbGVmdC1wcmltYXJ5LmJvcmRlci1sZWZ0LWRhcmtlbi0xIHtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjYWIxNTRlICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItcmlnaHQtcHJpbWFyeS5ib3JkZXItcmlnaHQtZGFya2VuLTEge1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjYWIxNTRlICFpbXBvcnRhbnQ7XG59XG5cbi5vdmVybGF5LXByaW1hcnkub3ZlcmxheS1kYXJrZW4tMSB7XG4gIGJhY2tncm91bmQ6ICNhYjE1NGU7XG4gIC8qIFRoZSBGYWxsYmFjayAqL1xuICBiYWNrZ3JvdW5kOiByZ2JhKDE3MSwgMjEsIDc4LCAwLjYpO1xufVxuXG4udGV4dC1wcmltYXJ5LnRleHQtZGFya2VuLTIge1xuICBjb2xvcjogIzk1MTI0MyAhaW1wb3J0YW50O1xufVxuXG4uYmctcHJpbWFyeS5iZy1kYXJrZW4tMiB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM5NTEyNDMgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1wcmltYXJ5LmJvcmRlci1kYXJrZW4tMiB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICM5NTEyNDMgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci10b3AtcHJpbWFyeS5ib3JkZXItdG9wLWRhcmtlbi0yIHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM5NTEyNDMgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1ib3R0b20tcHJpbWFyeS5ib3JkZXItYm90dG9tLWRhcmtlbi0yIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICM5NTEyNDMgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1sZWZ0LXByaW1hcnkuYm9yZGVyLWxlZnQtZGFya2VuLTIge1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICM5NTEyNDMgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1yaWdodC1wcmltYXJ5LmJvcmRlci1yaWdodC1kYXJrZW4tMiB7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICM5NTEyNDMgIWltcG9ydGFudDtcbn1cblxuLm92ZXJsYXktcHJpbWFyeS5vdmVybGF5LWRhcmtlbi0yIHtcbiAgYmFja2dyb3VuZDogIzk1MTI0MztcbiAgLyogVGhlIEZhbGxiYWNrICovXG4gIGJhY2tncm91bmQ6IHJnYmEoMTQ5LCAxOCwgNjcsIDAuNik7XG59XG5cbi50ZXh0LXByaW1hcnkudGV4dC1kYXJrZW4tMyB7XG4gIGNvbG9yOiAjN2UxMDM5ICFpbXBvcnRhbnQ7XG59XG5cbi5iZy1wcmltYXJ5LmJnLWRhcmtlbi0zIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzdlMTAzOSAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXByaW1hcnkuYm9yZGVyLWRhcmtlbi0zIHtcbiAgYm9yZGVyOiAxcHggc29saWQgIzdlMTAzOSAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXRvcC1wcmltYXJ5LmJvcmRlci10b3AtZGFya2VuLTMge1xuICBib3JkZXItdG9wOiAxcHggc29saWQgIzdlMTAzOSAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWJvdHRvbS1wcmltYXJ5LmJvcmRlci1ib3R0b20tZGFya2VuLTMge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzdlMTAzOSAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWxlZnQtcHJpbWFyeS5ib3JkZXItbGVmdC1kYXJrZW4tMyB7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgIzdlMTAzOSAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXJpZ2h0LXByaW1hcnkuYm9yZGVyLXJpZ2h0LWRhcmtlbi0zIHtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgIzdlMTAzOSAhaW1wb3J0YW50O1xufVxuXG4ub3ZlcmxheS1wcmltYXJ5Lm92ZXJsYXktZGFya2VuLTMge1xuICBiYWNrZ3JvdW5kOiAjN2UxMDM5O1xuICAvKiBUaGUgRmFsbGJhY2sgKi9cbiAgYmFja2dyb3VuZDogcmdiYSgxMjYsIDE2LCA1NywgMC42KTtcbn1cblxuLnRleHQtcHJpbWFyeS50ZXh0LWRhcmtlbi00IHtcbiAgY29sb3I6ICM2NzBkMmYgIWltcG9ydGFudDtcbn1cblxuLmJnLXByaW1hcnkuYmctZGFya2VuLTQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNjcwZDJmICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItcHJpbWFyeS5ib3JkZXItZGFya2VuLTQge1xuICBib3JkZXI6IDFweCBzb2xpZCAjNjcwZDJmICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItdG9wLXByaW1hcnkuYm9yZGVyLXRvcC1kYXJrZW4tNCB7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjNjcwZDJmICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItYm90dG9tLXByaW1hcnkuYm9yZGVyLWJvdHRvbS1kYXJrZW4tNCB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjNjcwZDJmICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItbGVmdC1wcmltYXJ5LmJvcmRlci1sZWZ0LWRhcmtlbi00IHtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjNjcwZDJmICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItcmlnaHQtcHJpbWFyeS5ib3JkZXItcmlnaHQtZGFya2VuLTQge1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjNjcwZDJmICFpbXBvcnRhbnQ7XG59XG5cbi5vdmVybGF5LXByaW1hcnkub3ZlcmxheS1kYXJrZW4tNCB7XG4gIGJhY2tncm91bmQ6ICM2NzBkMmY7XG4gIC8qIFRoZSBGYWxsYmFjayAqL1xuICBiYWNrZ3JvdW5kOiByZ2JhKDEwMywgMTMsIDQ3LCAwLjYpO1xufVxuXG4udGV4dC1wcmltYXJ5LnRleHQtYWNjZW50LTEge1xuICBjb2xvcjogI2JkZmRmZiAhaW1wb3J0YW50O1xufVxuXG4uYmctcHJpbWFyeS5iZy1hY2NlbnQtMSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNiZGZkZmYgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1wcmltYXJ5LmJvcmRlci1hY2NlbnQtMSB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNiZGZkZmYgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci10b3AtcHJpbWFyeS5ib3JkZXItdG9wLWFjY2VudC0xIHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNiZGZkZmYgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1ib3R0b20tcHJpbWFyeS5ib3JkZXItYm90dG9tLWFjY2VudC0xIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNiZGZkZmYgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1sZWZ0LXByaW1hcnkuYm9yZGVyLWxlZnQtYWNjZW50LTEge1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICNiZGZkZmYgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1yaWdodC1wcmltYXJ5LmJvcmRlci1yaWdodC1hY2NlbnQtMSB7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNiZGZkZmYgIWltcG9ydGFudDtcbn1cblxuLm92ZXJsYXktcHJpbWFyeS5vdmVybGF5LWFjY2VudC0xIHtcbiAgYmFja2dyb3VuZDogI2JkZmRmZjtcbiAgLyogVGhlIEZhbGxiYWNrICovXG4gIGJhY2tncm91bmQ6IHJnYmEoMTg5LCAyNTMsIDI1NSwgMC42KTtcbn1cblxuLnRleHQtcHJpbWFyeS50ZXh0LWFjY2VudC0yIHtcbiAgY29sb3I6ICM4YWZiZmYgIWltcG9ydGFudDtcbn1cblxuLmJnLXByaW1hcnkuYmctYWNjZW50LTIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOGFmYmZmICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItcHJpbWFyeS5ib3JkZXItYWNjZW50LTIge1xuICBib3JkZXI6IDFweCBzb2xpZCAjOGFmYmZmICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItdG9wLXByaW1hcnkuYm9yZGVyLXRvcC1hY2NlbnQtMiB7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjOGFmYmZmICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItYm90dG9tLXByaW1hcnkuYm9yZGVyLWJvdHRvbS1hY2NlbnQtMiB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjOGFmYmZmICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItbGVmdC1wcmltYXJ5LmJvcmRlci1sZWZ0LWFjY2VudC0yIHtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjOGFmYmZmICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItcmlnaHQtcHJpbWFyeS5ib3JkZXItcmlnaHQtYWNjZW50LTIge1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjOGFmYmZmICFpbXBvcnRhbnQ7XG59XG5cbi5vdmVybGF5LXByaW1hcnkub3ZlcmxheS1hY2NlbnQtMiB7XG4gIGJhY2tncm91bmQ6ICM4YWZiZmY7XG4gIC8qIFRoZSBGYWxsYmFjayAqL1xuICBiYWNrZ3JvdW5kOiByZ2JhKDEzOCwgMjUxLCAyNTUsIDAuNik7XG59XG5cbi50ZXh0LXByaW1hcnkudGV4dC1hY2NlbnQtMyB7XG4gIGNvbG9yOiAjNTdmYWZmICFpbXBvcnRhbnQ7XG59XG5cbi5iZy1wcmltYXJ5LmJnLWFjY2VudC0zIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzU3ZmFmZiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXByaW1hcnkuYm9yZGVyLWFjY2VudC0zIHtcbiAgYm9yZGVyOiAxcHggc29saWQgIzU3ZmFmZiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXRvcC1wcmltYXJ5LmJvcmRlci10b3AtYWNjZW50LTMge1xuICBib3JkZXItdG9wOiAxcHggc29saWQgIzU3ZmFmZiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWJvdHRvbS1wcmltYXJ5LmJvcmRlci1ib3R0b20tYWNjZW50LTMge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzU3ZmFmZiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWxlZnQtcHJpbWFyeS5ib3JkZXItbGVmdC1hY2NlbnQtMyB7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgIzU3ZmFmZiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXJpZ2h0LXByaW1hcnkuYm9yZGVyLXJpZ2h0LWFjY2VudC0zIHtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgIzU3ZmFmZiAhaW1wb3J0YW50O1xufVxuXG4ub3ZlcmxheS1wcmltYXJ5Lm92ZXJsYXktYWNjZW50LTMge1xuICBiYWNrZ3JvdW5kOiAjNTdmYWZmO1xuICAvKiBUaGUgRmFsbGJhY2sgKi9cbiAgYmFja2dyb3VuZDogcmdiYSg4NywgMjUwLCAyNTUsIDAuNik7XG59XG5cbi50ZXh0LXByaW1hcnkudGV4dC1hY2NlbnQtNCB7XG4gIGNvbG9yOiAjM2RmOWZmICFpbXBvcnRhbnQ7XG59XG5cbi5iZy1wcmltYXJ5LmJnLWFjY2VudC00IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzNkZjlmZiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXByaW1hcnkuYm9yZGVyLWFjY2VudC00IHtcbiAgYm9yZGVyOiAxcHggc29saWQgIzNkZjlmZiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXRvcC1wcmltYXJ5LmJvcmRlci10b3AtYWNjZW50LTQge1xuICBib3JkZXItdG9wOiAxcHggc29saWQgIzNkZjlmZiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWJvdHRvbS1wcmltYXJ5LmJvcmRlci1ib3R0b20tYWNjZW50LTQge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzNkZjlmZiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWxlZnQtcHJpbWFyeS5ib3JkZXItbGVmdC1hY2NlbnQtNCB7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgIzNkZjlmZiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXJpZ2h0LXByaW1hcnkuYm9yZGVyLXJpZ2h0LWFjY2VudC00IHtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgIzNkZjlmZiAhaW1wb3J0YW50O1xufVxuXG4ub3ZlcmxheS1wcmltYXJ5Lm92ZXJsYXktYWNjZW50LTQge1xuICBiYWNrZ3JvdW5kOiAjM2RmOWZmO1xuICAvKiBUaGUgRmFsbGJhY2sgKi9cbiAgYmFja2dyb3VuZDogcmdiYSg2MSwgMjQ5LCAyNTUsIDAuNik7XG59XG5cbi50ZXh0LXNlY29uZGFyeS50ZXh0LWxpZ2h0ZW4tNSB7XG4gIGNvbG9yOiAjYzRjNmM4ICFpbXBvcnRhbnQ7XG59XG5cbi5iZy1zZWNvbmRhcnkuYmctbGlnaHRlbi01IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2M0YzZjOCAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXNlY29uZGFyeS5ib3JkZXItbGlnaHRlbi01IHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2M0YzZjOCAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXRvcC1zZWNvbmRhcnkuYm9yZGVyLXRvcC1saWdodGVuLTUge1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI2M0YzZjOCAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWJvdHRvbS1zZWNvbmRhcnkuYm9yZGVyLWJvdHRvbS1saWdodGVuLTUge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2M0YzZjOCAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWxlZnQtc2Vjb25kYXJ5LmJvcmRlci1sZWZ0LWxpZ2h0ZW4tNSB7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2M0YzZjOCAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXJpZ2h0LXNlY29uZGFyeS5ib3JkZXItcmlnaHQtbGlnaHRlbi01IHtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2M0YzZjOCAhaW1wb3J0YW50O1xufVxuXG4ub3ZlcmxheS1zZWNvbmRhcnkub3ZlcmxheS1saWdodGVuLTUge1xuICBiYWNrZ3JvdW5kOiAjYzRjNmM4O1xuICAvKiBUaGUgRmFsbGJhY2sgKi9cbiAgYmFja2dyb3VuZDogcmdiYSgxOTYsIDE5OCwgMjAwLCAwLjYpO1xufVxuXG4udGV4dC1zZWNvbmRhcnkudGV4dC1saWdodGVuLTQge1xuICBjb2xvcjogI2I3YjliYyAhaW1wb3J0YW50O1xufVxuXG4uYmctc2Vjb25kYXJ5LmJnLWxpZ2h0ZW4tNCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNiN2I5YmMgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1zZWNvbmRhcnkuYm9yZGVyLWxpZ2h0ZW4tNCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNiN2I5YmMgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci10b3Atc2Vjb25kYXJ5LmJvcmRlci10b3AtbGlnaHRlbi00IHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNiN2I5YmMgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1ib3R0b20tc2Vjb25kYXJ5LmJvcmRlci1ib3R0b20tbGlnaHRlbi00IHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNiN2I5YmMgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1sZWZ0LXNlY29uZGFyeS5ib3JkZXItbGVmdC1saWdodGVuLTQge1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICNiN2I5YmMgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1yaWdodC1zZWNvbmRhcnkuYm9yZGVyLXJpZ2h0LWxpZ2h0ZW4tNCB7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNiN2I5YmMgIWltcG9ydGFudDtcbn1cblxuLm92ZXJsYXktc2Vjb25kYXJ5Lm92ZXJsYXktbGlnaHRlbi00IHtcbiAgYmFja2dyb3VuZDogI2I3YjliYztcbiAgLyogVGhlIEZhbGxiYWNrICovXG4gIGJhY2tncm91bmQ6IHJnYmEoMTgzLCAxODUsIDE4OCwgMC42KTtcbn1cblxuLnRleHQtc2Vjb25kYXJ5LnRleHQtbGlnaHRlbi0zIHtcbiAgY29sb3I6ICNhYWFjYjAgIWltcG9ydGFudDtcbn1cblxuLmJnLXNlY29uZGFyeS5iZy1saWdodGVuLTMge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWFhY2IwICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItc2Vjb25kYXJ5LmJvcmRlci1saWdodGVuLTMge1xuICBib3JkZXI6IDFweCBzb2xpZCAjYWFhY2IwICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItdG9wLXNlY29uZGFyeS5ib3JkZXItdG9wLWxpZ2h0ZW4tMyB7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjYWFhY2IwICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItYm90dG9tLXNlY29uZGFyeS5ib3JkZXItYm90dG9tLWxpZ2h0ZW4tMyB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjYWFhY2IwICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItbGVmdC1zZWNvbmRhcnkuYm9yZGVyLWxlZnQtbGlnaHRlbi0zIHtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjYWFhY2IwICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItcmlnaHQtc2Vjb25kYXJ5LmJvcmRlci1yaWdodC1saWdodGVuLTMge1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjYWFhY2IwICFpbXBvcnRhbnQ7XG59XG5cbi5vdmVybGF5LXNlY29uZGFyeS5vdmVybGF5LWxpZ2h0ZW4tMyB7XG4gIGJhY2tncm91bmQ6ICNhYWFjYjA7XG4gIC8qIFRoZSBGYWxsYmFjayAqL1xuICBiYWNrZ3JvdW5kOiByZ2JhKDE3MCwgMTcyLCAxNzYsIDAuNik7XG59XG5cbi50ZXh0LXNlY29uZGFyeS50ZXh0LWxpZ2h0ZW4tMiB7XG4gIGNvbG9yOiAjOWNhMGE0ICFpbXBvcnRhbnQ7XG59XG5cbi5iZy1zZWNvbmRhcnkuYmctbGlnaHRlbi0yIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzljYTBhNCAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXNlY29uZGFyeS5ib3JkZXItbGlnaHRlbi0yIHtcbiAgYm9yZGVyOiAxcHggc29saWQgIzljYTBhNCAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXRvcC1zZWNvbmRhcnkuYm9yZGVyLXRvcC1saWdodGVuLTIge1xuICBib3JkZXItdG9wOiAxcHggc29saWQgIzljYTBhNCAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWJvdHRvbS1zZWNvbmRhcnkuYm9yZGVyLWJvdHRvbS1saWdodGVuLTIge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzljYTBhNCAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWxlZnQtc2Vjb25kYXJ5LmJvcmRlci1sZWZ0LWxpZ2h0ZW4tMiB7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgIzljYTBhNCAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXJpZ2h0LXNlY29uZGFyeS5ib3JkZXItcmlnaHQtbGlnaHRlbi0yIHtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgIzljYTBhNCAhaW1wb3J0YW50O1xufVxuXG4ub3ZlcmxheS1zZWNvbmRhcnkub3ZlcmxheS1saWdodGVuLTIge1xuICBiYWNrZ3JvdW5kOiAjOWNhMGE0O1xuICAvKiBUaGUgRmFsbGJhY2sgKi9cbiAgYmFja2dyb3VuZDogcmdiYSgxNTYsIDE2MCwgMTY0LCAwLjYpO1xufVxuXG4udGV4dC1zZWNvbmRhcnkudGV4dC1saWdodGVuLTEge1xuICBjb2xvcjogIzhmOTM5NyAhaW1wb3J0YW50O1xufVxuXG4uYmctc2Vjb25kYXJ5LmJnLWxpZ2h0ZW4tMSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM4ZjkzOTcgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1zZWNvbmRhcnkuYm9yZGVyLWxpZ2h0ZW4tMSB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICM4ZjkzOTcgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci10b3Atc2Vjb25kYXJ5LmJvcmRlci10b3AtbGlnaHRlbi0xIHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM4ZjkzOTcgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1ib3R0b20tc2Vjb25kYXJ5LmJvcmRlci1ib3R0b20tbGlnaHRlbi0xIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICM4ZjkzOTcgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1sZWZ0LXNlY29uZGFyeS5ib3JkZXItbGVmdC1saWdodGVuLTEge1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICM4ZjkzOTcgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1yaWdodC1zZWNvbmRhcnkuYm9yZGVyLXJpZ2h0LWxpZ2h0ZW4tMSB7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICM4ZjkzOTcgIWltcG9ydGFudDtcbn1cblxuLm92ZXJsYXktc2Vjb25kYXJ5Lm92ZXJsYXktbGlnaHRlbi0xIHtcbiAgYmFja2dyb3VuZDogIzhmOTM5NztcbiAgLyogVGhlIEZhbGxiYWNrICovXG4gIGJhY2tncm91bmQ6IHJnYmEoMTQzLCAxNDcsIDE1MSwgMC42KTtcbn1cblxuLmJnLXNlY29uZGFyeSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM4Mjg2OGIgIWltcG9ydGFudDtcbn1cbi5iZy1zZWNvbmRhcnkgLmNhcmQtaGVhZGVyLFxuLmJnLXNlY29uZGFyeSAuY2FyZC1mb290ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cblxuLmFsZXJ0LXNlY29uZGFyeSB7XG4gIGJhY2tncm91bmQ6IHJnYmEoMTMwLCAxMzQsIDEzOSwgMC4xMikgIWltcG9ydGFudDtcbiAgY29sb3I6ICM4Mjg2OGIgIWltcG9ydGFudDtcbn1cbi5hbGVydC1zZWNvbmRhcnkgLmFsZXJ0LWhlYWRpbmcge1xuICBib3gtc2hhZG93OiByZ2JhKDEzMCwgMTM0LCAxMzksIDAuNCkgMHB4IDZweCAxNXB4IC03cHg7XG59XG4uYWxlcnQtc2Vjb25kYXJ5IC5hbGVydC1saW5rIHtcbiAgY29sb3I6ICM3NTc5N2UgIWltcG9ydGFudDtcbn1cbi5hbGVydC1zZWNvbmRhcnkgLmNsb3NlIHtcbiAgY29sb3I6ICM4Mjg2OGIgIWltcG9ydGFudDtcbn1cblxuLmJnLWxpZ2h0LXNlY29uZGFyeSB7XG4gIGJhY2tncm91bmQ6IHJnYmEoMTMwLCAxMzQsIDEzOSwgMC4xMikgIWltcG9ydGFudDtcbiAgY29sb3I6ICM4Mjg2OGIgIWltcG9ydGFudDtcbn1cbi5iZy1saWdodC1zZWNvbmRhcnkuZmMtaC1ldmVudCwgLmJnLWxpZ2h0LXNlY29uZGFyeS5mYy12LWV2ZW50IHtcbiAgYm9yZGVyLWNvbG9yOiByZ2JhKDEzMCwgMTM0LCAxMzksIDAuMSk7XG59XG4uYmctbGlnaHQtc2Vjb25kYXJ5IC5mYy1saXN0LWV2ZW50LWRvdCxcbi5iZy1saWdodC1zZWNvbmRhcnkgLmZjLWRheWdyaWQtZXZlbnQtZG90IHtcbiAgYm9yZGVyLWNvbG9yOiAjODI4NjhiICFpbXBvcnRhbnQ7XG59XG4uYmctbGlnaHQtc2Vjb25kYXJ5LmZjLWxpc3QtZXZlbnQ6aG92ZXIgdGQge1xuICBiYWNrZ3JvdW5kOiByZ2JhKDEzMCwgMTM0LCAxMzksIDAuMSkgIWltcG9ydGFudDtcbn1cbi5iZy1saWdodC1zZWNvbmRhcnkuZmMtbGlzdC1ldmVudCAuZmMtbGlzdC1ldmVudC10aXRsZSB7XG4gIGNvbG9yOiAjNmU2YjdiO1xufVxuXG4uYXZhdGFyLmJnLWxpZ2h0LXNlY29uZGFyeSB7XG4gIGNvbG9yOiAjODI4NjhiICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItc2Vjb25kYXJ5IHtcbiAgYm9yZGVyOiAxcHggc29saWQgIzgyODY4YiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXRvcC1zZWNvbmRhcnkge1xuICBib3JkZXItdG9wOiAxcHggc29saWQgIzgyODY4Yjtcbn1cblxuLmJvcmRlci1ib3R0b20tc2Vjb25kYXJ5IHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICM4Mjg2OGI7XG59XG5cbi5ib3JkZXItbGVmdC1zZWNvbmRhcnkge1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICM4Mjg2OGI7XG59XG5cbi5ib3JkZXItcmlnaHQtc2Vjb25kYXJ5IHtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgIzgyODY4Yjtcbn1cblxuLmJnLXNlY29uZGFyeS5iYWRnZS1nbG93LFxuLmJvcmRlci1zZWNvbmRhcnkuYmFkZ2UtZ2xvdyxcbi5iYWRnZS1zZWNvbmRhcnkuYmFkZ2UtZ2xvdyB7XG4gIGJveC1zaGFkb3c6IDBweCAwcHggMTBweCAjODI4NjhiO1xufVxuXG4uYmFkZ2UuYmFkZ2UtbGlnaHQtc2Vjb25kYXJ5IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxMzAsIDEzNCwgMTM5LCAwLjEyKTtcbiAgY29sb3I6ICM4Mjg2OGIgIWltcG9ydGFudDtcbn1cblxuLm92ZXJsYXktc2Vjb25kYXJ5IHtcbiAgYmFja2dyb3VuZDogIzgyODY4YjtcbiAgLyogVGhlIEZhbGxiYWNrICovXG4gIGJhY2tncm91bmQ6IHJnYmEoMTMwLCAxMzQsIDEzOSwgMC42KTtcbn1cblxuLmJ0bi1zZWNvbmRhcnkge1xuICBib3JkZXItY29sb3I6ICM4Mjg2OGIgIWltcG9ydGFudDtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzgyODY4YiAhaW1wb3J0YW50O1xuICBjb2xvcjogI2ZmZiAhaW1wb3J0YW50O1xufVxuLmJ0bi1zZWNvbmRhcnk6Zm9jdXMsIC5idG4tc2Vjb25kYXJ5OmFjdGl2ZSwgLmJ0bi1zZWNvbmRhcnkuYWN0aXZlIHtcbiAgY29sb3I6ICNmZmY7XG4gIGJhY2tncm91bmQtY29sb3I6ICM3NTc5N2UgIWltcG9ydGFudDtcbn1cbi5idG4tc2Vjb25kYXJ5OmhvdmVyOm5vdCguZGlzYWJsZWQpOm5vdCg6ZGlzYWJsZWQpIHtcbiAgYm94LXNoYWRvdzogMCA4cHggMjVweCAtOHB4ICM4Mjg2OGI7XG59XG4uYnRuLXNlY29uZGFyeTpub3QoOmRpc2FibGVkKTpub3QoLmRpc2FibGVkKTphY3RpdmU6Zm9jdXMge1xuICBib3gtc2hhZG93OiBub25lO1xufVxuXG4uYnRuLWZsYXQtc2Vjb25kYXJ5IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAjODI4NjhiO1xufVxuLmJ0bi1mbGF0LXNlY29uZGFyeTpob3ZlciB7XG4gIGNvbG9yOiAjODI4NjhiO1xufVxuLmJ0bi1mbGF0LXNlY29uZGFyeTpob3Zlcjpub3QoLmRpc2FibGVkKTpub3QoOmRpc2FibGVkKSB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTMwLCAxMzQsIDEzOSwgMC4xMik7XG59XG4uYnRuLWZsYXQtc2Vjb25kYXJ5OmFjdGl2ZSwgLmJ0bi1mbGF0LXNlY29uZGFyeS5hY3RpdmUsIC5idG4tZmxhdC1zZWNvbmRhcnk6Zm9jdXMge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDEzMCwgMTM0LCAxMzksIDAuMik7XG4gIGNvbG9yOiAjODI4NjhiO1xufVxuLmJ0bi1mbGF0LXNlY29uZGFyeS5kcm9wZG93bi10b2dnbGU6OmFmdGVyIHtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiZGF0YTppbWFnZS9zdmcreG1sLCUzQ3N2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNCAyNCcgZmlsbD0nbm9uZScgc3Ryb2tlPSclMjM4Mjg2OGInIHN0cm9rZS13aWR0aD0nMicgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJyBjbGFzcz0nZmVhdGhlciBmZWF0aGVyLWNoZXZyb24tZG93biclM0UlM0Nwb2x5bGluZSBwb2ludHM9JzYgOSAxMiAxNSAxOCA5JyUzRSUzQy9wb2x5bGluZSUzRSUzQy9zdmclM0VcIik7XG59XG5cbi5idG4tcmVsaWVmLXNlY29uZGFyeSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM4Mjg2OGI7XG4gIGJveC1zaGFkb3c6IGluc2V0IDAgLTNweCAwIDAgcmdiYSgzNCwgNDEsIDQ3LCAwLjIpO1xuICBjb2xvcjogI2ZmZjtcbiAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZTtcbn1cbi5idG4tcmVsaWVmLXNlY29uZGFyeTpob3Zlcjpub3QoLmRpc2FibGVkKTpub3QoOmRpc2FibGVkKSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM4ZjkzOTc7XG59XG4uYnRuLXJlbGllZi1zZWNvbmRhcnk6YWN0aXZlLCAuYnRuLXJlbGllZi1zZWNvbmRhcnkuYWN0aXZlLCAuYnRuLXJlbGllZi1zZWNvbmRhcnk6Zm9jdXMge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNzU3OTdlO1xufVxuLmJ0bi1yZWxpZWYtc2Vjb25kYXJ5OmhvdmVyIHtcbiAgY29sb3I6ICNmZmY7XG59XG4uYnRuLXJlbGllZi1zZWNvbmRhcnk6YWN0aXZlLCAuYnRuLXJlbGllZi1zZWNvbmRhcnkuYWN0aXZlIHtcbiAgb3V0bGluZTogbm9uZTtcbiAgYm94LXNoYWRvdzogbm9uZTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDNweCk7XG59XG5cbi5idG4tb3V0bGluZS1zZWNvbmRhcnkge1xuICBib3JkZXI6IDFweCBzb2xpZCAjODI4NjhiICFpbXBvcnRhbnQ7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogIzgyODY4Yjtcbn1cbi5idG4tb3V0bGluZS1zZWNvbmRhcnk6aG92ZXI6bm90KC5kaXNhYmxlZCk6bm90KDpkaXNhYmxlZCkge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDEzMCwgMTM0LCAxMzksIDAuMDQpO1xuICBjb2xvcjogIzgyODY4Yjtcbn1cbi5idG4tb3V0bGluZS1zZWNvbmRhcnk6bm90KDpkaXNhYmxlZCk6bm90KC5kaXNhYmxlZCk6YWN0aXZlOmZvY3VzIHtcbiAgYm94LXNoYWRvdzogbm9uZTtcbn1cbi5idG4tb3V0bGluZS1zZWNvbmRhcnk6bm90KDpkaXNhYmxlZCk6bm90KC5kaXNhYmxlZCk6YWN0aXZlLCAuYnRuLW91dGxpbmUtc2Vjb25kYXJ5Om5vdCg6ZGlzYWJsZWQpOm5vdCguZGlzYWJsZWQpLmFjdGl2ZSwgLmJ0bi1vdXRsaW5lLXNlY29uZGFyeTpub3QoOmRpc2FibGVkKTpub3QoLmRpc2FibGVkKTpmb2N1cyB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTMwLCAxMzQsIDEzOSwgMC4yKTtcbiAgY29sb3I6ICM4Mjg2OGI7XG59XG4uYnRuLW91dGxpbmUtc2Vjb25kYXJ5LmRyb3Bkb3duLXRvZ2dsZTo6YWZ0ZXIge1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCJkYXRhOmltYWdlL3N2Zyt4bWwsJTNDc3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgdmlld0JveD0nMCAwIDI0IDI0JyBmaWxsPSdub25lJyBzdHJva2U9JyUyMzgyODY4Yicgc3Ryb2tlLXdpZHRoPScyJyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnIGNsYXNzPSdmZWF0aGVyIGZlYXRoZXItY2hldnJvbi1kb3duJyUzRSUzQ3BvbHlsaW5lIHBvaW50cz0nNiA5IDEyIDE1IDE4IDknJTNFJTNDL3BvbHlsaW5lJTNFJTNDL3N2ZyUzRVwiKTtcbn1cbi5zaG93ID4gLmJ0bi1vdXRsaW5lLXNlY29uZGFyeS5kcm9wZG93bi10b2dnbGUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDEzMCwgMTM0LCAxMzksIDAuMik7XG4gIGNvbG9yOiAjODI4NjhiO1xufVxuXG4uYnRuLW91dGxpbmUtc2Vjb25kYXJ5LndhdmVzLWVmZmVjdCAud2F2ZXMtcmlwcGxlLFxuLmJ0bi1mbGF0LXNlY29uZGFyeS53YXZlcy1lZmZlY3QgLndhdmVzLXJpcHBsZSB7XG4gIGJhY2tncm91bmQ6IHJhZGlhbC1ncmFkaWVudChyZ2JhKDEzMCwgMTM0LCAxMzksIDAuMikgMCwgcmdiYSgxMzAsIDEzNCwgMTM5LCAwLjMpIDQwJSwgcmdiYSgxMzAsIDEzNCwgMTM5LCAwLjQpIDUwJSwgcmdiYSgxMzAsIDEzNCwgMTM5LCAwLjUpIDYwJSwgcmdiYSgyNTUsIDI1NSwgMjU1LCAwKSA3MCUpO1xufVxuXG4uYnVsbGV0LmJ1bGxldC1zZWNvbmRhcnkge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjODI4NjhiO1xufVxuXG4ubW9kYWwubW9kYWwtc2Vjb25kYXJ5IC5tb2RhbC1oZWFkZXIgLm1vZGFsLXRpdGxlIHtcbiAgY29sb3I6ICM4Mjg2OGI7XG59XG4ubW9kYWwubW9kYWwtc2Vjb25kYXJ5IC5tb2RhbC1oZWFkZXIgLmNsb3NlIHtcbiAgY29sb3I6ICM4Mjg2OGIgIWltcG9ydGFudDtcbn1cblxuLnBhZ2luYXRpb24tc2Vjb25kYXJ5IC5wYWdlLWl0ZW0uYWN0aXZlIC5wYWdlLWxpbmsge1xuICBiYWNrZ3JvdW5kOiAjODI4NjhiICFpbXBvcnRhbnQ7XG4gIGNvbG9yOiAjZmZmO1xufVxuLnBhZ2luYXRpb24tc2Vjb25kYXJ5IC5wYWdlLWl0ZW0uYWN0aXZlIC5wYWdlLWxpbms6aG92ZXIge1xuICBjb2xvcjogI2ZmZjtcbn1cbi5wYWdpbmF0aW9uLXNlY29uZGFyeSAucGFnZS1pdGVtIC5wYWdlLWxpbms6aG92ZXIge1xuICBjb2xvcjogIzgyODY4Yjtcbn1cbi5wYWdpbmF0aW9uLXNlY29uZGFyeSAucGFnZS1pdGVtLnByZXYtaXRlbSAucGFnZS1saW5rOmhvdmVyLCAucGFnaW5hdGlvbi1zZWNvbmRhcnkgLnBhZ2UtaXRlbS5uZXh0LWl0ZW0gLnBhZ2UtbGluazpob3ZlciB7XG4gIGJhY2tncm91bmQ6ICM4Mjg2OGI7XG4gIGNvbG9yOiAjZmZmO1xufVxuLnBhZ2luYXRpb24tc2Vjb25kYXJ5IC5wYWdlLWl0ZW0ubmV4dC1pdGVtIC5wYWdlLWxpbms6YWN0aXZlOmFmdGVyLCAucGFnaW5hdGlvbi1zZWNvbmRhcnkgLnBhZ2UtaXRlbS5uZXh0LWl0ZW0gLnBhZ2UtbGluazpob3ZlcjphZnRlciwgLnBhZ2luYXRpb24tc2Vjb25kYXJ5IC5wYWdlLWl0ZW0ubmV4dCAucGFnZS1saW5rOmFjdGl2ZTphZnRlciwgLnBhZ2luYXRpb24tc2Vjb25kYXJ5IC5wYWdlLWl0ZW0ubmV4dCAucGFnZS1saW5rOmhvdmVyOmFmdGVyIHtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiZGF0YTppbWFnZS9zdmcreG1sLCUzQ3N2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNCAyNCcgZmlsbD0nbm9uZScgc3Ryb2tlPSclMjM4Mjg2OGInIHN0cm9rZS13aWR0aD0nMicgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJyBjbGFzcz0nZmVhdGhlciBmZWF0aGVyLWNoZXZyb24tcmlnaHQnJTNFJTNDcG9seWxpbmUgcG9pbnRzPSc5IDE4IDE1IDEyIDkgNiclM0UlM0MvcG9seWxpbmUlM0UlM0Mvc3ZnJTNFXCIpICFpbXBvcnRhbnQ7XG59XG4ucGFnaW5hdGlvbi1zZWNvbmRhcnkgLnBhZ2UtaXRlbS5wcmV2LWl0ZW0gLnBhZ2UtbGluazphY3RpdmU6YmVmb3JlLCAucGFnaW5hdGlvbi1zZWNvbmRhcnkgLnBhZ2UtaXRlbS5wcmV2LWl0ZW0gLnBhZ2UtbGluazpob3ZlcjpiZWZvcmUsIC5wYWdpbmF0aW9uLXNlY29uZGFyeSAucGFnZS1pdGVtLnByZXYgLnBhZ2UtbGluazphY3RpdmU6YmVmb3JlLCAucGFnaW5hdGlvbi1zZWNvbmRhcnkgLnBhZ2UtaXRlbS5wcmV2IC5wYWdlLWxpbms6aG92ZXI6YmVmb3JlIHtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiZGF0YTppbWFnZS9zdmcreG1sLCUzQ3N2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNCAyNCcgZmlsbD0nbm9uZScgc3Ryb2tlPSclMjM4Mjg2OGInIHN0cm9rZS13aWR0aD0nMicgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJyBjbGFzcz0nZmVhdGhlciBmZWF0aGVyLWNoZXZyb24tbGVmdCclM0UlM0Nwb2x5bGluZSBwb2ludHM9JzE1IDE4IDkgMTIgMTUgNiclM0UlM0MvcG9seWxpbmUlM0UlM0Mvc3ZnJTNFXCIpICFpbXBvcnRhbnQ7XG59XG5cbi5uYXYtcGlsbC1zZWNvbmRhcnkgLm5hdi1pdGVtIC5uYXYtbGluay5hY3RpdmUge1xuICBjb2xvcjogI2ZmZjtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzgyODY4YiAhaW1wb3J0YW50O1xuICBib3JkZXItY29sb3I6ICM4Mjg2OGI7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDE4cHggLTRweCByZ2JhKDEzMCwgMTM0LCAxMzksIDAuNjUpO1xufVxuXG4ucHJvZ3Jlc3MtYmFyLXNlY29uZGFyeSB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTMwLCAxMzQsIDEzOSwgMC4xMik7XG59XG4ucHJvZ3Jlc3MtYmFyLXNlY29uZGFyeSAucHJvZ3Jlc3MtYmFyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzgyODY4Yjtcbn1cblxuLnRpbWVsaW5lIC50aW1lbGluZS1wb2ludC1zZWNvbmRhcnkge1xuICBib3JkZXItY29sb3I6ICM4Mjg2OGIgIWltcG9ydGFudDtcbn1cbi50aW1lbGluZSAudGltZWxpbmUtcG9pbnQtc2Vjb25kYXJ5IGksXG4udGltZWxpbmUgLnRpbWVsaW5lLXBvaW50LXNlY29uZGFyeSBzdmcge1xuICBzdHJva2U6ICM4Mjg2OGIgIWltcG9ydGFudDtcbn1cbi50aW1lbGluZSAudGltZWxpbmUtcG9pbnQtc2Vjb25kYXJ5LnRpbWVsaW5lLXBvaW50LWluZGljYXRvciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM4Mjg2OGIgIWltcG9ydGFudDtcbn1cbi50aW1lbGluZSAudGltZWxpbmUtcG9pbnQtc2Vjb25kYXJ5LnRpbWVsaW5lLXBvaW50LWluZGljYXRvcjpiZWZvcmUge1xuICBiYWNrZ3JvdW5kOiByZ2JhKDEzMCwgMTM0LCAxMzksIDAuMTIpICFpbXBvcnRhbnQ7XG59XG5cbi5kaXZpZGVyLmRpdmlkZXItc2Vjb25kYXJ5IC5kaXZpZGVyLXRleHQ6YmVmb3JlLCAuZGl2aWRlci5kaXZpZGVyLXNlY29uZGFyeSAuZGl2aWRlci10ZXh0OmFmdGVyIHtcbiAgYm9yZGVyLWNvbG9yOiAjODI4NjhiICFpbXBvcnRhbnQ7XG59XG5cbmlucHV0OmZvY3VzIH4gLmJnLXNlY29uZGFyeSB7XG4gIGJveC1zaGFkb3c6IDAgMCAwIDAuMDc1cmVtICNmZmYsIDAgMCAwIDAuMjFyZW0gIzgyODY4YiAhaW1wb3J0YW50O1xufVxuXG4uY3VzdG9tLWNvbnRyb2wtc2Vjb25kYXJ5IC5jdXN0b20tY29udHJvbC1pbnB1dDpjaGVja2VkIH4gLmN1c3RvbS1jb250cm9sLWxhYmVsOjpiZWZvcmUsXG4uY3VzdG9tLWNvbnRyb2wtc2Vjb25kYXJ5IC5jdXN0b20tY29udHJvbC1pbnB1dDphY3RpdmUgfiAuY3VzdG9tLWNvbnRyb2wtbGFiZWw6OmJlZm9yZSB7XG4gIGJvcmRlci1jb2xvcjogIzgyODY4YjtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzgyODY4Yjtcbn1cbi5jdXN0b20tY29udHJvbC1zZWNvbmRhcnkuY3VzdG9tLWNoZWNrYm94IC5jdXN0b20tY29udHJvbC1pbnB1dDpjaGVja2VkIH4gLmN1c3RvbS1jb250cm9sLWxhYmVsOjpiZWZvcmUsXG4uY3VzdG9tLWNvbnRyb2wtc2Vjb25kYXJ5LmN1c3RvbS1jaGVja2JveCAuY3VzdG9tLWNvbnRyb2wtaW5wdXQ6YWN0aXZlIH4gLmN1c3RvbS1jb250cm9sLWxhYmVsOjpiZWZvcmUsXG4uY3VzdG9tLWNvbnRyb2wtc2Vjb25kYXJ5LmN1c3RvbS1jaGVja2JveCAuY3VzdG9tLWNvbnRyb2wtaW5wdXQ6Zm9jdXMgfiAuY3VzdG9tLWNvbnRyb2wtbGFiZWw6OmJlZm9yZSwgLmN1c3RvbS1jb250cm9sLXNlY29uZGFyeS5jdXN0b20tcmFkaW8gLmN1c3RvbS1jb250cm9sLWlucHV0OmNoZWNrZWQgfiAuY3VzdG9tLWNvbnRyb2wtbGFiZWw6OmJlZm9yZSxcbi5jdXN0b20tY29udHJvbC1zZWNvbmRhcnkuY3VzdG9tLXJhZGlvIC5jdXN0b20tY29udHJvbC1pbnB1dDphY3RpdmUgfiAuY3VzdG9tLWNvbnRyb2wtbGFiZWw6OmJlZm9yZSxcbi5jdXN0b20tY29udHJvbC1zZWNvbmRhcnkuY3VzdG9tLXJhZGlvIC5jdXN0b20tY29udHJvbC1pbnB1dDpmb2N1cyB+IC5jdXN0b20tY29udHJvbC1sYWJlbDo6YmVmb3JlIHtcbiAgYm94LXNoYWRvdzogMCAycHggNHB4IDAgcmdiYSgxMzAsIDEzNCwgMTM5LCAwLjQpICFpbXBvcnRhbnQ7XG59XG4uY3VzdG9tLWNvbnRyb2wtc2Vjb25kYXJ5IC5jdXN0b20tY29udHJvbC1pbnB1dDpkaXNhYmxlZDpjaGVja2VkIH4gLmN1c3RvbS1jb250cm9sLWxhYmVsOjpiZWZvcmUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDEzMCwgMTM0LCAxMzksIDAuNjUpICFpbXBvcnRhbnQ7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xufVxuLmN1c3RvbS1jb250cm9sLXNlY29uZGFyeSAuY3VzdG9tLWNvbnRyb2wtaW5wdXQ6Zm9jdXMgfiAuY3VzdG9tLWNvbnRyb2wtbGFiZWw6OmJlZm9yZSB7XG4gIGJvcmRlci1jb2xvcjogIzgyODY4YiAhaW1wb3J0YW50O1xufVxuXG4uY3VzdG9tLXN3aXRjaC1zZWNvbmRhcnkgLmN1c3RvbS1jb250cm9sLWlucHV0OmNoZWNrZWQgfiAuY3VzdG9tLWNvbnRyb2wtbGFiZWw6OmJlZm9yZSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM4Mjg2OGIgIWltcG9ydGFudDtcbiAgY29sb3I6ICNmZmY7XG4gIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2Utb3V0O1xufVxuXG4uc2VsZWN0Mi1zZWNvbmRhcnkgLnNlbGVjdDItY29udGFpbmVyLS1kZWZhdWx0IC5zZWxlY3QyLXNlbGVjdGlvbi0tbXVsdGlwbGUgLnNlbGVjdDItc2VsZWN0aW9uX19jaG9pY2Uge1xuICBiYWNrZ3JvdW5kOiAjODI4NjhiICFpbXBvcnRhbnQ7XG4gIGJvcmRlci1jb2xvcjogIzgyODY4YiAhaW1wb3J0YW50O1xufVxuXG4udGV4dC1zZWNvbmRhcnkudGV4dC1kYXJrZW4tMSB7XG4gIGNvbG9yOiAjNzU3OTdlICFpbXBvcnRhbnQ7XG59XG5cbi5iZy1zZWNvbmRhcnkuYmctZGFya2VuLTEge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNzU3OTdlICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItc2Vjb25kYXJ5LmJvcmRlci1kYXJrZW4tMSB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICM3NTc5N2UgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci10b3Atc2Vjb25kYXJ5LmJvcmRlci10b3AtZGFya2VuLTEge1xuICBib3JkZXItdG9wOiAxcHggc29saWQgIzc1Nzk3ZSAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWJvdHRvbS1zZWNvbmRhcnkuYm9yZGVyLWJvdHRvbS1kYXJrZW4tMSB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjNzU3OTdlICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItbGVmdC1zZWNvbmRhcnkuYm9yZGVyLWxlZnQtZGFya2VuLTEge1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICM3NTc5N2UgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1yaWdodC1zZWNvbmRhcnkuYm9yZGVyLXJpZ2h0LWRhcmtlbi0xIHtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgIzc1Nzk3ZSAhaW1wb3J0YW50O1xufVxuXG4ub3ZlcmxheS1zZWNvbmRhcnkub3ZlcmxheS1kYXJrZW4tMSB7XG4gIGJhY2tncm91bmQ6ICM3NTc5N2U7XG4gIC8qIFRoZSBGYWxsYmFjayAqL1xuICBiYWNrZ3JvdW5kOiByZ2JhKDExNywgMTIxLCAxMjYsIDAuNik7XG59XG5cbi50ZXh0LXNlY29uZGFyeS50ZXh0LWRhcmtlbi0yIHtcbiAgY29sb3I6ICM2OTZkNzEgIWltcG9ydGFudDtcbn1cblxuLmJnLXNlY29uZGFyeS5iZy1kYXJrZW4tMiB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM2OTZkNzEgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1zZWNvbmRhcnkuYm9yZGVyLWRhcmtlbi0yIHtcbiAgYm9yZGVyOiAxcHggc29saWQgIzY5NmQ3MSAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXRvcC1zZWNvbmRhcnkuYm9yZGVyLXRvcC1kYXJrZW4tMiB7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjNjk2ZDcxICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItYm90dG9tLXNlY29uZGFyeS5ib3JkZXItYm90dG9tLWRhcmtlbi0yIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICM2OTZkNzEgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1sZWZ0LXNlY29uZGFyeS5ib3JkZXItbGVmdC1kYXJrZW4tMiB7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgIzY5NmQ3MSAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXJpZ2h0LXNlY29uZGFyeS5ib3JkZXItcmlnaHQtZGFya2VuLTIge1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjNjk2ZDcxICFpbXBvcnRhbnQ7XG59XG5cbi5vdmVybGF5LXNlY29uZGFyeS5vdmVybGF5LWRhcmtlbi0yIHtcbiAgYmFja2dyb3VuZDogIzY5NmQ3MTtcbiAgLyogVGhlIEZhbGxiYWNrICovXG4gIGJhY2tncm91bmQ6IHJnYmEoMTA1LCAxMDksIDExMywgMC42KTtcbn1cblxuLnRleHQtc2Vjb25kYXJ5LnRleHQtZGFya2VuLTMge1xuICBjb2xvcjogIzVkNjA2NCAhaW1wb3J0YW50O1xufVxuXG4uYmctc2Vjb25kYXJ5LmJnLWRhcmtlbi0zIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzVkNjA2NCAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXNlY29uZGFyeS5ib3JkZXItZGFya2VuLTMge1xuICBib3JkZXI6IDFweCBzb2xpZCAjNWQ2MDY0ICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItdG9wLXNlY29uZGFyeS5ib3JkZXItdG9wLWRhcmtlbi0zIHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM1ZDYwNjQgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1ib3R0b20tc2Vjb25kYXJ5LmJvcmRlci1ib3R0b20tZGFya2VuLTMge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzVkNjA2NCAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWxlZnQtc2Vjb25kYXJ5LmJvcmRlci1sZWZ0LWRhcmtlbi0zIHtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjNWQ2MDY0ICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItcmlnaHQtc2Vjb25kYXJ5LmJvcmRlci1yaWdodC1kYXJrZW4tMyB7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICM1ZDYwNjQgIWltcG9ydGFudDtcbn1cblxuLm92ZXJsYXktc2Vjb25kYXJ5Lm92ZXJsYXktZGFya2VuLTMge1xuICBiYWNrZ3JvdW5kOiAjNWQ2MDY0O1xuICAvKiBUaGUgRmFsbGJhY2sgKi9cbiAgYmFja2dyb3VuZDogcmdiYSg5MywgOTYsIDEwMCwgMC42KTtcbn1cblxuLnRleHQtc2Vjb25kYXJ5LnRleHQtZGFya2VuLTQge1xuICBjb2xvcjogIzUwNTM1NyAhaW1wb3J0YW50O1xufVxuXG4uYmctc2Vjb25kYXJ5LmJnLWRhcmtlbi00IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzUwNTM1NyAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXNlY29uZGFyeS5ib3JkZXItZGFya2VuLTQge1xuICBib3JkZXI6IDFweCBzb2xpZCAjNTA1MzU3ICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItdG9wLXNlY29uZGFyeS5ib3JkZXItdG9wLWRhcmtlbi00IHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM1MDUzNTcgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1ib3R0b20tc2Vjb25kYXJ5LmJvcmRlci1ib3R0b20tZGFya2VuLTQge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzUwNTM1NyAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWxlZnQtc2Vjb25kYXJ5LmJvcmRlci1sZWZ0LWRhcmtlbi00IHtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjNTA1MzU3ICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItcmlnaHQtc2Vjb25kYXJ5LmJvcmRlci1yaWdodC1kYXJrZW4tNCB7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICM1MDUzNTcgIWltcG9ydGFudDtcbn1cblxuLm92ZXJsYXktc2Vjb25kYXJ5Lm92ZXJsYXktZGFya2VuLTQge1xuICBiYWNrZ3JvdW5kOiAjNTA1MzU3O1xuICAvKiBUaGUgRmFsbGJhY2sgKi9cbiAgYmFja2dyb3VuZDogcmdiYSg4MCwgODMsIDg3LCAwLjYpO1xufVxuXG4udGV4dC1zdWNjZXNzLnRleHQtbGlnaHRlbi01IHtcbiAgY29sb3I6ICM4OGU3YjIgIWltcG9ydGFudDtcbn1cblxuLmJnLXN1Y2Nlc3MuYmctbGlnaHRlbi01IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzg4ZTdiMiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXN1Y2Nlc3MuYm9yZGVyLWxpZ2h0ZW4tNSB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICM4OGU3YjIgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci10b3Atc3VjY2Vzcy5ib3JkZXItdG9wLWxpZ2h0ZW4tNSB7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjODhlN2IyICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItYm90dG9tLXN1Y2Nlc3MuYm9yZGVyLWJvdHRvbS1saWdodGVuLTUge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzg4ZTdiMiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWxlZnQtc3VjY2Vzcy5ib3JkZXItbGVmdC1saWdodGVuLTUge1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICM4OGU3YjIgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1yaWdodC1zdWNjZXNzLmJvcmRlci1yaWdodC1saWdodGVuLTUge1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjODhlN2IyICFpbXBvcnRhbnQ7XG59XG5cbi5vdmVybGF5LXN1Y2Nlc3Mub3ZlcmxheS1saWdodGVuLTUge1xuICBiYWNrZ3JvdW5kOiAjODhlN2IyO1xuICAvKiBUaGUgRmFsbGJhY2sgKi9cbiAgYmFja2dyb3VuZDogcmdiYSgxMzYsIDIzMSwgMTc4LCAwLjYpO1xufVxuXG4udGV4dC1zdWNjZXNzLnRleHQtbGlnaHRlbi00IHtcbiAgY29sb3I6ICM3MmUzYTQgIWltcG9ydGFudDtcbn1cblxuLmJnLXN1Y2Nlc3MuYmctbGlnaHRlbi00IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzcyZTNhNCAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXN1Y2Nlc3MuYm9yZGVyLWxpZ2h0ZW4tNCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICM3MmUzYTQgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci10b3Atc3VjY2Vzcy5ib3JkZXItdG9wLWxpZ2h0ZW4tNCB7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjNzJlM2E0ICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItYm90dG9tLXN1Y2Nlc3MuYm9yZGVyLWJvdHRvbS1saWdodGVuLTQge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzcyZTNhNCAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWxlZnQtc3VjY2Vzcy5ib3JkZXItbGVmdC1saWdodGVuLTQge1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICM3MmUzYTQgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1yaWdodC1zdWNjZXNzLmJvcmRlci1yaWdodC1saWdodGVuLTQge1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjNzJlM2E0ICFpbXBvcnRhbnQ7XG59XG5cbi5vdmVybGF5LXN1Y2Nlc3Mub3ZlcmxheS1saWdodGVuLTQge1xuICBiYWNrZ3JvdW5kOiAjNzJlM2E0O1xuICAvKiBUaGUgRmFsbGJhY2sgKi9cbiAgYmFja2dyb3VuZDogcmdiYSgxMTQsIDIyNywgMTY0LCAwLjYpO1xufVxuXG4udGV4dC1zdWNjZXNzLnRleHQtbGlnaHRlbi0zIHtcbiAgY29sb3I6ICM1ZGRlOTcgIWltcG9ydGFudDtcbn1cblxuLmJnLXN1Y2Nlc3MuYmctbGlnaHRlbi0zIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzVkZGU5NyAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXN1Y2Nlc3MuYm9yZGVyLWxpZ2h0ZW4tMyB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICM1ZGRlOTcgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci10b3Atc3VjY2Vzcy5ib3JkZXItdG9wLWxpZ2h0ZW4tMyB7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjNWRkZTk3ICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItYm90dG9tLXN1Y2Nlc3MuYm9yZGVyLWJvdHRvbS1saWdodGVuLTMge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzVkZGU5NyAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWxlZnQtc3VjY2Vzcy5ib3JkZXItbGVmdC1saWdodGVuLTMge1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICM1ZGRlOTcgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1yaWdodC1zdWNjZXNzLmJvcmRlci1yaWdodC1saWdodGVuLTMge1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjNWRkZTk3ICFpbXBvcnRhbnQ7XG59XG5cbi5vdmVybGF5LXN1Y2Nlc3Mub3ZlcmxheS1saWdodGVuLTMge1xuICBiYWNrZ3JvdW5kOiAjNWRkZTk3O1xuICAvKiBUaGUgRmFsbGJhY2sgKi9cbiAgYmFja2dyb3VuZDogcmdiYSg5MywgMjIyLCAxNTEsIDAuNik7XG59XG5cbi50ZXh0LXN1Y2Nlc3MudGV4dC1saWdodGVuLTIge1xuICBjb2xvcjogIzQ4ZGE4OSAhaW1wb3J0YW50O1xufVxuXG4uYmctc3VjY2Vzcy5iZy1saWdodGVuLTIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDhkYTg5ICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItc3VjY2Vzcy5ib3JkZXItbGlnaHRlbi0yIHtcbiAgYm9yZGVyOiAxcHggc29saWQgIzQ4ZGE4OSAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXRvcC1zdWNjZXNzLmJvcmRlci10b3AtbGlnaHRlbi0yIHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM0OGRhODkgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1ib3R0b20tc3VjY2Vzcy5ib3JkZXItYm90dG9tLWxpZ2h0ZW4tMiB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjNDhkYTg5ICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItbGVmdC1zdWNjZXNzLmJvcmRlci1sZWZ0LWxpZ2h0ZW4tMiB7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgIzQ4ZGE4OSAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXJpZ2h0LXN1Y2Nlc3MuYm9yZGVyLXJpZ2h0LWxpZ2h0ZW4tMiB7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICM0OGRhODkgIWltcG9ydGFudDtcbn1cblxuLm92ZXJsYXktc3VjY2Vzcy5vdmVybGF5LWxpZ2h0ZW4tMiB7XG4gIGJhY2tncm91bmQ6ICM0OGRhODk7XG4gIC8qIFRoZSBGYWxsYmFjayAqL1xuICBiYWNrZ3JvdW5kOiByZ2JhKDcyLCAyMTgsIDEzNywgMC42KTtcbn1cblxuLnRleHQtc3VjY2Vzcy50ZXh0LWxpZ2h0ZW4tMSB7XG4gIGNvbG9yOiAjMzNkNjdjICFpbXBvcnRhbnQ7XG59XG5cbi5iZy1zdWNjZXNzLmJnLWxpZ2h0ZW4tMSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMzM2Q2N2MgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1zdWNjZXNzLmJvcmRlci1saWdodGVuLTEge1xuICBib3JkZXI6IDFweCBzb2xpZCAjMzNkNjdjICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItdG9wLXN1Y2Nlc3MuYm9yZGVyLXRvcC1saWdodGVuLTEge1xuICBib3JkZXItdG9wOiAxcHggc29saWQgIzMzZDY3YyAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWJvdHRvbS1zdWNjZXNzLmJvcmRlci1ib3R0b20tbGlnaHRlbi0xIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICMzM2Q2N2MgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1sZWZ0LXN1Y2Nlc3MuYm9yZGVyLWxlZnQtbGlnaHRlbi0xIHtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjMzNkNjdjICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItcmlnaHQtc3VjY2Vzcy5ib3JkZXItcmlnaHQtbGlnaHRlbi0xIHtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgIzMzZDY3YyAhaW1wb3J0YW50O1xufVxuXG4ub3ZlcmxheS1zdWNjZXNzLm92ZXJsYXktbGlnaHRlbi0xIHtcbiAgYmFja2dyb3VuZDogIzMzZDY3YztcbiAgLyogVGhlIEZhbGxiYWNrICovXG4gIGJhY2tncm91bmQ6IHJnYmEoNTEsIDIxNCwgMTI0LCAwLjYpO1xufVxuXG4uYmctc3VjY2VzcyB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMyOGM3NmYgIWltcG9ydGFudDtcbn1cbi5iZy1zdWNjZXNzIC5jYXJkLWhlYWRlcixcbi5iZy1zdWNjZXNzIC5jYXJkLWZvb3RlciB7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xufVxuXG4uYWxlcnQtc3VjY2VzcyB7XG4gIGJhY2tncm91bmQ6IHJnYmEoNDAsIDE5OSwgMTExLCAwLjEyKSAhaW1wb3J0YW50O1xuICBjb2xvcjogIzI4Yzc2ZiAhaW1wb3J0YW50O1xufVxuLmFsZXJ0LXN1Y2Nlc3MgLmFsZXJ0LWhlYWRpbmcge1xuICBib3gtc2hhZG93OiByZ2JhKDQwLCAxOTksIDExMSwgMC40KSAwcHggNnB4IDE1cHggLTdweDtcbn1cbi5hbGVydC1zdWNjZXNzIC5hbGVydC1saW5rIHtcbiAgY29sb3I6ICMyNGIyNjMgIWltcG9ydGFudDtcbn1cbi5hbGVydC1zdWNjZXNzIC5jbG9zZSB7XG4gIGNvbG9yOiAjMjhjNzZmICFpbXBvcnRhbnQ7XG59XG5cbi5iZy1saWdodC1zdWNjZXNzIHtcbiAgYmFja2dyb3VuZDogcmdiYSg0MCwgMTk5LCAxMTEsIDAuMTIpICFpbXBvcnRhbnQ7XG4gIGNvbG9yOiAjMjhjNzZmICFpbXBvcnRhbnQ7XG59XG4uYmctbGlnaHQtc3VjY2Vzcy5mYy1oLWV2ZW50LCAuYmctbGlnaHQtc3VjY2Vzcy5mYy12LWV2ZW50IHtcbiAgYm9yZGVyLWNvbG9yOiByZ2JhKDQwLCAxOTksIDExMSwgMC4xKTtcbn1cbi5iZy1saWdodC1zdWNjZXNzIC5mYy1saXN0LWV2ZW50LWRvdCxcbi5iZy1saWdodC1zdWNjZXNzIC5mYy1kYXlncmlkLWV2ZW50LWRvdCB7XG4gIGJvcmRlci1jb2xvcjogIzI4Yzc2ZiAhaW1wb3J0YW50O1xufVxuLmJnLWxpZ2h0LXN1Y2Nlc3MuZmMtbGlzdC1ldmVudDpob3ZlciB0ZCB7XG4gIGJhY2tncm91bmQ6IHJnYmEoNDAsIDE5OSwgMTExLCAwLjEpICFpbXBvcnRhbnQ7XG59XG4uYmctbGlnaHQtc3VjY2Vzcy5mYy1saXN0LWV2ZW50IC5mYy1saXN0LWV2ZW50LXRpdGxlIHtcbiAgY29sb3I6ICM2ZTZiN2I7XG59XG5cbi5hdmF0YXIuYmctbGlnaHQtc3VjY2VzcyB7XG4gIGNvbG9yOiAjMjhjNzZmICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItc3VjY2VzcyB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICMyOGM3NmYgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci10b3Atc3VjY2VzcyB7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjMjhjNzZmO1xufVxuXG4uYm9yZGVyLWJvdHRvbS1zdWNjZXNzIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICMyOGM3NmY7XG59XG5cbi5ib3JkZXItbGVmdC1zdWNjZXNzIHtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjMjhjNzZmO1xufVxuXG4uYm9yZGVyLXJpZ2h0LXN1Y2Nlc3Mge1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjMjhjNzZmO1xufVxuXG4uYmctc3VjY2Vzcy5iYWRnZS1nbG93LFxuLmJvcmRlci1zdWNjZXNzLmJhZGdlLWdsb3csXG4uYmFkZ2Utc3VjY2Vzcy5iYWRnZS1nbG93IHtcbiAgYm94LXNoYWRvdzogMHB4IDBweCAxMHB4ICMyOGM3NmY7XG59XG5cbi5iYWRnZS5iYWRnZS1saWdodC1zdWNjZXNzIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg0MCwgMTk5LCAxMTEsIDAuMTIpO1xuICBjb2xvcjogIzI4Yzc2ZiAhaW1wb3J0YW50O1xufVxuXG4ub3ZlcmxheS1zdWNjZXNzIHtcbiAgYmFja2dyb3VuZDogIzI4Yzc2ZjtcbiAgLyogVGhlIEZhbGxiYWNrICovXG4gIGJhY2tncm91bmQ6IHJnYmEoNDAsIDE5OSwgMTExLCAwLjYpO1xufVxuXG4uYnRuLXN1Y2Nlc3Mge1xuICBib3JkZXItY29sb3I6ICMyOGM3NmYgIWltcG9ydGFudDtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI4Yzc2ZiAhaW1wb3J0YW50O1xuICBjb2xvcjogI2ZmZiAhaW1wb3J0YW50O1xufVxuLmJ0bi1zdWNjZXNzOmZvY3VzLCAuYnRuLXN1Y2Nlc3M6YWN0aXZlLCAuYnRuLXN1Y2Nlc3MuYWN0aXZlIHtcbiAgY29sb3I6ICNmZmY7XG4gIGJhY2tncm91bmQtY29sb3I6ICMyNGIyNjMgIWltcG9ydGFudDtcbn1cbi5idG4tc3VjY2Vzczpob3Zlcjpub3QoLmRpc2FibGVkKTpub3QoOmRpc2FibGVkKSB7XG4gIGJveC1zaGFkb3c6IDAgOHB4IDI1cHggLThweCAjMjhjNzZmO1xufVxuLmJ0bi1zdWNjZXNzOm5vdCg6ZGlzYWJsZWQpOm5vdCguZGlzYWJsZWQpOmFjdGl2ZTpmb2N1cyB7XG4gIGJveC1zaGFkb3c6IG5vbmU7XG59XG5cbi5idG4tZmxhdC1zdWNjZXNzIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAjMjhjNzZmO1xufVxuLmJ0bi1mbGF0LXN1Y2Nlc3M6aG92ZXIge1xuICBjb2xvcjogIzI4Yzc2Zjtcbn1cbi5idG4tZmxhdC1zdWNjZXNzOmhvdmVyOm5vdCguZGlzYWJsZWQpOm5vdCg6ZGlzYWJsZWQpIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg0MCwgMTk5LCAxMTEsIDAuMTIpO1xufVxuLmJ0bi1mbGF0LXN1Y2Nlc3M6YWN0aXZlLCAuYnRuLWZsYXQtc3VjY2Vzcy5hY3RpdmUsIC5idG4tZmxhdC1zdWNjZXNzOmZvY3VzIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg0MCwgMTk5LCAxMTEsIDAuMik7XG4gIGNvbG9yOiAjMjhjNzZmO1xufVxuLmJ0bi1mbGF0LXN1Y2Nlc3MuZHJvcGRvd24tdG9nZ2xlOjphZnRlciB7XG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcImRhdGE6aW1hZ2Uvc3ZnK3htbCwlM0NzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB2aWV3Qm94PScwIDAgMjQgMjQnIGZpbGw9J25vbmUnIHN0cm9rZT0nJTIzMjhjNzZmJyBzdHJva2Utd2lkdGg9JzInIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcgY2xhc3M9J2ZlYXRoZXIgZmVhdGhlci1jaGV2cm9uLWRvd24nJTNFJTNDcG9seWxpbmUgcG9pbnRzPSc2IDkgMTIgMTUgMTggOSclM0UlM0MvcG9seWxpbmUlM0UlM0Mvc3ZnJTNFXCIpO1xufVxuXG4uYnRuLXJlbGllZi1zdWNjZXNzIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI4Yzc2ZjtcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAtM3B4IDAgMCByZ2JhKDM0LCA0MSwgNDcsIDAuMik7XG4gIGNvbG9yOiAjZmZmO1xuICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlO1xufVxuLmJ0bi1yZWxpZWYtc3VjY2Vzczpob3Zlcjpub3QoLmRpc2FibGVkKTpub3QoOmRpc2FibGVkKSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMzM2Q2N2M7XG59XG4uYnRuLXJlbGllZi1zdWNjZXNzOmFjdGl2ZSwgLmJ0bi1yZWxpZWYtc3VjY2Vzcy5hY3RpdmUsIC5idG4tcmVsaWVmLXN1Y2Nlc3M6Zm9jdXMge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjRiMjYzO1xufVxuLmJ0bi1yZWxpZWYtc3VjY2Vzczpob3ZlciB7XG4gIGNvbG9yOiAjZmZmO1xufVxuLmJ0bi1yZWxpZWYtc3VjY2VzczphY3RpdmUsIC5idG4tcmVsaWVmLXN1Y2Nlc3MuYWN0aXZlIHtcbiAgb3V0bGluZTogbm9uZTtcbiAgYm94LXNoYWRvdzogbm9uZTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDNweCk7XG59XG5cbi5idG4tb3V0bGluZS1zdWNjZXNzIHtcbiAgYm9yZGVyOiAxcHggc29saWQgIzI4Yzc2ZiAhaW1wb3J0YW50O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICMyOGM3NmY7XG59XG4uYnRuLW91dGxpbmUtc3VjY2Vzczpob3Zlcjpub3QoLmRpc2FibGVkKTpub3QoOmRpc2FibGVkKSB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNDAsIDE5OSwgMTExLCAwLjA0KTtcbiAgY29sb3I6ICMyOGM3NmY7XG59XG4uYnRuLW91dGxpbmUtc3VjY2Vzczpub3QoOmRpc2FibGVkKTpub3QoLmRpc2FibGVkKTphY3RpdmU6Zm9jdXMge1xuICBib3gtc2hhZG93OiBub25lO1xufVxuLmJ0bi1vdXRsaW5lLXN1Y2Nlc3M6bm90KDpkaXNhYmxlZCk6bm90KC5kaXNhYmxlZCk6YWN0aXZlLCAuYnRuLW91dGxpbmUtc3VjY2Vzczpub3QoOmRpc2FibGVkKTpub3QoLmRpc2FibGVkKS5hY3RpdmUsIC5idG4tb3V0bGluZS1zdWNjZXNzOm5vdCg6ZGlzYWJsZWQpOm5vdCguZGlzYWJsZWQpOmZvY3VzIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg0MCwgMTk5LCAxMTEsIDAuMik7XG4gIGNvbG9yOiAjMjhjNzZmO1xufVxuLmJ0bi1vdXRsaW5lLXN1Y2Nlc3MuZHJvcGRvd24tdG9nZ2xlOjphZnRlciB7XG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcImRhdGE6aW1hZ2Uvc3ZnK3htbCwlM0NzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB2aWV3Qm94PScwIDAgMjQgMjQnIGZpbGw9J25vbmUnIHN0cm9rZT0nJTIzMjhjNzZmJyBzdHJva2Utd2lkdGg9JzInIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcgY2xhc3M9J2ZlYXRoZXIgZmVhdGhlci1jaGV2cm9uLWRvd24nJTNFJTNDcG9seWxpbmUgcG9pbnRzPSc2IDkgMTIgMTUgMTggOSclM0UlM0MvcG9seWxpbmUlM0UlM0Mvc3ZnJTNFXCIpO1xufVxuLnNob3cgPiAuYnRuLW91dGxpbmUtc3VjY2Vzcy5kcm9wZG93bi10b2dnbGUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDQwLCAxOTksIDExMSwgMC4yKTtcbiAgY29sb3I6ICMyOGM3NmY7XG59XG5cbi5idG4tb3V0bGluZS1zdWNjZXNzLndhdmVzLWVmZmVjdCAud2F2ZXMtcmlwcGxlLFxuLmJ0bi1mbGF0LXN1Y2Nlc3Mud2F2ZXMtZWZmZWN0IC53YXZlcy1yaXBwbGUge1xuICBiYWNrZ3JvdW5kOiByYWRpYWwtZ3JhZGllbnQocmdiYSg0MCwgMTk5LCAxMTEsIDAuMikgMCwgcmdiYSg0MCwgMTk5LCAxMTEsIDAuMykgNDAlLCByZ2JhKDQwLCAxOTksIDExMSwgMC40KSA1MCUsIHJnYmEoNDAsIDE5OSwgMTExLCAwLjUpIDYwJSwgcmdiYSgyNTUsIDI1NSwgMjU1LCAwKSA3MCUpO1xufVxuXG4uYnVsbGV0LmJ1bGxldC1zdWNjZXNzIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI4Yzc2Zjtcbn1cblxuLm1vZGFsLm1vZGFsLXN1Y2Nlc3MgLm1vZGFsLWhlYWRlciAubW9kYWwtdGl0bGUge1xuICBjb2xvcjogIzI4Yzc2Zjtcbn1cbi5tb2RhbC5tb2RhbC1zdWNjZXNzIC5tb2RhbC1oZWFkZXIgLmNsb3NlIHtcbiAgY29sb3I6ICMyOGM3NmYgIWltcG9ydGFudDtcbn1cblxuLnBhZ2luYXRpb24tc3VjY2VzcyAucGFnZS1pdGVtLmFjdGl2ZSAucGFnZS1saW5rIHtcbiAgYmFja2dyb3VuZDogIzI4Yzc2ZiAhaW1wb3J0YW50O1xuICBjb2xvcjogI2ZmZjtcbn1cbi5wYWdpbmF0aW9uLXN1Y2Nlc3MgLnBhZ2UtaXRlbS5hY3RpdmUgLnBhZ2UtbGluazpob3ZlciB7XG4gIGNvbG9yOiAjZmZmO1xufVxuLnBhZ2luYXRpb24tc3VjY2VzcyAucGFnZS1pdGVtIC5wYWdlLWxpbms6aG92ZXIge1xuICBjb2xvcjogIzI4Yzc2Zjtcbn1cbi5wYWdpbmF0aW9uLXN1Y2Nlc3MgLnBhZ2UtaXRlbS5wcmV2LWl0ZW0gLnBhZ2UtbGluazpob3ZlciwgLnBhZ2luYXRpb24tc3VjY2VzcyAucGFnZS1pdGVtLm5leHQtaXRlbSAucGFnZS1saW5rOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogIzI4Yzc2ZjtcbiAgY29sb3I6ICNmZmY7XG59XG4ucGFnaW5hdGlvbi1zdWNjZXNzIC5wYWdlLWl0ZW0ubmV4dC1pdGVtIC5wYWdlLWxpbms6YWN0aXZlOmFmdGVyLCAucGFnaW5hdGlvbi1zdWNjZXNzIC5wYWdlLWl0ZW0ubmV4dC1pdGVtIC5wYWdlLWxpbms6aG92ZXI6YWZ0ZXIsIC5wYWdpbmF0aW9uLXN1Y2Nlc3MgLnBhZ2UtaXRlbS5uZXh0IC5wYWdlLWxpbms6YWN0aXZlOmFmdGVyLCAucGFnaW5hdGlvbi1zdWNjZXNzIC5wYWdlLWl0ZW0ubmV4dCAucGFnZS1saW5rOmhvdmVyOmFmdGVyIHtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiZGF0YTppbWFnZS9zdmcreG1sLCUzQ3N2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNCAyNCcgZmlsbD0nbm9uZScgc3Ryb2tlPSclMjMyOGM3NmYnIHN0cm9rZS13aWR0aD0nMicgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJyBjbGFzcz0nZmVhdGhlciBmZWF0aGVyLWNoZXZyb24tcmlnaHQnJTNFJTNDcG9seWxpbmUgcG9pbnRzPSc5IDE4IDE1IDEyIDkgNiclM0UlM0MvcG9seWxpbmUlM0UlM0Mvc3ZnJTNFXCIpICFpbXBvcnRhbnQ7XG59XG4ucGFnaW5hdGlvbi1zdWNjZXNzIC5wYWdlLWl0ZW0ucHJldi1pdGVtIC5wYWdlLWxpbms6YWN0aXZlOmJlZm9yZSwgLnBhZ2luYXRpb24tc3VjY2VzcyAucGFnZS1pdGVtLnByZXYtaXRlbSAucGFnZS1saW5rOmhvdmVyOmJlZm9yZSwgLnBhZ2luYXRpb24tc3VjY2VzcyAucGFnZS1pdGVtLnByZXYgLnBhZ2UtbGluazphY3RpdmU6YmVmb3JlLCAucGFnaW5hdGlvbi1zdWNjZXNzIC5wYWdlLWl0ZW0ucHJldiAucGFnZS1saW5rOmhvdmVyOmJlZm9yZSB7XG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcImRhdGE6aW1hZ2Uvc3ZnK3htbCwlM0NzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB2aWV3Qm94PScwIDAgMjQgMjQnIGZpbGw9J25vbmUnIHN0cm9rZT0nJTIzMjhjNzZmJyBzdHJva2Utd2lkdGg9JzInIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcgY2xhc3M9J2ZlYXRoZXIgZmVhdGhlci1jaGV2cm9uLWxlZnQnJTNFJTNDcG9seWxpbmUgcG9pbnRzPScxNSAxOCA5IDEyIDE1IDYnJTNFJTNDL3BvbHlsaW5lJTNFJTNDL3N2ZyUzRVwiKSAhaW1wb3J0YW50O1xufVxuXG4ubmF2LXBpbGwtc3VjY2VzcyAubmF2LWl0ZW0gLm5hdi1saW5rLmFjdGl2ZSB7XG4gIGNvbG9yOiAjZmZmO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjhjNzZmICFpbXBvcnRhbnQ7XG4gIGJvcmRlci1jb2xvcjogIzI4Yzc2ZjtcbiAgYm94LXNoYWRvdzogMCA0cHggMThweCAtNHB4IHJnYmEoNDAsIDE5OSwgMTExLCAwLjY1KTtcbn1cblxuLnByb2dyZXNzLWJhci1zdWNjZXNzIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg0MCwgMTk5LCAxMTEsIDAuMTIpO1xufVxuLnByb2dyZXNzLWJhci1zdWNjZXNzIC5wcm9ncmVzcy1iYXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjhjNzZmO1xufVxuXG4udGltZWxpbmUgLnRpbWVsaW5lLXBvaW50LXN1Y2Nlc3Mge1xuICBib3JkZXItY29sb3I6ICMyOGM3NmYgIWltcG9ydGFudDtcbn1cbi50aW1lbGluZSAudGltZWxpbmUtcG9pbnQtc3VjY2VzcyBpLFxuLnRpbWVsaW5lIC50aW1lbGluZS1wb2ludC1zdWNjZXNzIHN2ZyB7XG4gIHN0cm9rZTogIzI4Yzc2ZiAhaW1wb3J0YW50O1xufVxuLnRpbWVsaW5lIC50aW1lbGluZS1wb2ludC1zdWNjZXNzLnRpbWVsaW5lLXBvaW50LWluZGljYXRvciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMyOGM3NmYgIWltcG9ydGFudDtcbn1cbi50aW1lbGluZSAudGltZWxpbmUtcG9pbnQtc3VjY2Vzcy50aW1lbGluZS1wb2ludC1pbmRpY2F0b3I6YmVmb3JlIHtcbiAgYmFja2dyb3VuZDogcmdiYSg0MCwgMTk5LCAxMTEsIDAuMTIpICFpbXBvcnRhbnQ7XG59XG5cbi5kaXZpZGVyLmRpdmlkZXItc3VjY2VzcyAuZGl2aWRlci10ZXh0OmJlZm9yZSwgLmRpdmlkZXIuZGl2aWRlci1zdWNjZXNzIC5kaXZpZGVyLXRleHQ6YWZ0ZXIge1xuICBib3JkZXItY29sb3I6ICMyOGM3NmYgIWltcG9ydGFudDtcbn1cblxuaW5wdXQ6Zm9jdXMgfiAuYmctc3VjY2VzcyB7XG4gIGJveC1zaGFkb3c6IDAgMCAwIDAuMDc1cmVtICNmZmYsIDAgMCAwIDAuMjFyZW0gIzI4Yzc2ZiAhaW1wb3J0YW50O1xufVxuXG4uY3VzdG9tLWNvbnRyb2wtc3VjY2VzcyAuY3VzdG9tLWNvbnRyb2wtaW5wdXQ6Y2hlY2tlZCB+IC5jdXN0b20tY29udHJvbC1sYWJlbDo6YmVmb3JlLFxuLmN1c3RvbS1jb250cm9sLXN1Y2Nlc3MgLmN1c3RvbS1jb250cm9sLWlucHV0OmFjdGl2ZSB+IC5jdXN0b20tY29udHJvbC1sYWJlbDo6YmVmb3JlIHtcbiAgYm9yZGVyLWNvbG9yOiAjMjhjNzZmO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjhjNzZmO1xufVxuLmN1c3RvbS1jb250cm9sLXN1Y2Nlc3MuY3VzdG9tLWNoZWNrYm94IC5jdXN0b20tY29udHJvbC1pbnB1dDpjaGVja2VkIH4gLmN1c3RvbS1jb250cm9sLWxhYmVsOjpiZWZvcmUsXG4uY3VzdG9tLWNvbnRyb2wtc3VjY2Vzcy5jdXN0b20tY2hlY2tib3ggLmN1c3RvbS1jb250cm9sLWlucHV0OmFjdGl2ZSB+IC5jdXN0b20tY29udHJvbC1sYWJlbDo6YmVmb3JlLFxuLmN1c3RvbS1jb250cm9sLXN1Y2Nlc3MuY3VzdG9tLWNoZWNrYm94IC5jdXN0b20tY29udHJvbC1pbnB1dDpmb2N1cyB+IC5jdXN0b20tY29udHJvbC1sYWJlbDo6YmVmb3JlLCAuY3VzdG9tLWNvbnRyb2wtc3VjY2Vzcy5jdXN0b20tcmFkaW8gLmN1c3RvbS1jb250cm9sLWlucHV0OmNoZWNrZWQgfiAuY3VzdG9tLWNvbnRyb2wtbGFiZWw6OmJlZm9yZSxcbi5jdXN0b20tY29udHJvbC1zdWNjZXNzLmN1c3RvbS1yYWRpbyAuY3VzdG9tLWNvbnRyb2wtaW5wdXQ6YWN0aXZlIH4gLmN1c3RvbS1jb250cm9sLWxhYmVsOjpiZWZvcmUsXG4uY3VzdG9tLWNvbnRyb2wtc3VjY2Vzcy5jdXN0b20tcmFkaW8gLmN1c3RvbS1jb250cm9sLWlucHV0OmZvY3VzIH4gLmN1c3RvbS1jb250cm9sLWxhYmVsOjpiZWZvcmUge1xuICBib3gtc2hhZG93OiAwIDJweCA0cHggMCByZ2JhKDQwLCAxOTksIDExMSwgMC40KSAhaW1wb3J0YW50O1xufVxuLmN1c3RvbS1jb250cm9sLXN1Y2Nlc3MgLmN1c3RvbS1jb250cm9sLWlucHV0OmRpc2FibGVkOmNoZWNrZWQgfiAuY3VzdG9tLWNvbnRyb2wtbGFiZWw6OmJlZm9yZSB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNDAsIDE5OSwgMTExLCAwLjY1KSAhaW1wb3J0YW50O1xuICBib3JkZXI6IG5vbmU7XG4gIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcbn1cbi5jdXN0b20tY29udHJvbC1zdWNjZXNzIC5jdXN0b20tY29udHJvbC1pbnB1dDpmb2N1cyB+IC5jdXN0b20tY29udHJvbC1sYWJlbDo6YmVmb3JlIHtcbiAgYm9yZGVyLWNvbG9yOiAjMjhjNzZmICFpbXBvcnRhbnQ7XG59XG5cbi5jdXN0b20tc3dpdGNoLXN1Y2Nlc3MgLmN1c3RvbS1jb250cm9sLWlucHV0OmNoZWNrZWQgfiAuY3VzdG9tLWNvbnRyb2wtbGFiZWw6OmJlZm9yZSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMyOGM3NmYgIWltcG9ydGFudDtcbiAgY29sb3I6ICNmZmY7XG4gIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2Utb3V0O1xufVxuXG4uc2VsZWN0Mi1zdWNjZXNzIC5zZWxlY3QyLWNvbnRhaW5lci0tZGVmYXVsdCAuc2VsZWN0Mi1zZWxlY3Rpb24tLW11bHRpcGxlIC5zZWxlY3QyLXNlbGVjdGlvbl9fY2hvaWNlIHtcbiAgYmFja2dyb3VuZDogIzI4Yzc2ZiAhaW1wb3J0YW50O1xuICBib3JkZXItY29sb3I6ICMyOGM3NmYgIWltcG9ydGFudDtcbn1cblxuLnRleHQtc3VjY2Vzcy50ZXh0LWRhcmtlbi0xIHtcbiAgY29sb3I6ICMyNGIyNjMgIWltcG9ydGFudDtcbn1cblxuLmJnLXN1Y2Nlc3MuYmctZGFya2VuLTEge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjRiMjYzICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItc3VjY2Vzcy5ib3JkZXItZGFya2VuLTEge1xuICBib3JkZXI6IDFweCBzb2xpZCAjMjRiMjYzICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItdG9wLXN1Y2Nlc3MuYm9yZGVyLXRvcC1kYXJrZW4tMSB7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjMjRiMjYzICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItYm90dG9tLXN1Y2Nlc3MuYm9yZGVyLWJvdHRvbS1kYXJrZW4tMSB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMjRiMjYzICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItbGVmdC1zdWNjZXNzLmJvcmRlci1sZWZ0LWRhcmtlbi0xIHtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjMjRiMjYzICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItcmlnaHQtc3VjY2Vzcy5ib3JkZXItcmlnaHQtZGFya2VuLTEge1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjMjRiMjYzICFpbXBvcnRhbnQ7XG59XG5cbi5vdmVybGF5LXN1Y2Nlc3Mub3ZlcmxheS1kYXJrZW4tMSB7XG4gIGJhY2tncm91bmQ6ICMyNGIyNjM7XG4gIC8qIFRoZSBGYWxsYmFjayAqL1xuICBiYWNrZ3JvdW5kOiByZ2JhKDM2LCAxNzgsIDk5LCAwLjYpO1xufVxuXG4udGV4dC1zdWNjZXNzLnRleHQtZGFya2VuLTIge1xuICBjb2xvcjogIzFmOWQ1NyAhaW1wb3J0YW50O1xufVxuXG4uYmctc3VjY2Vzcy5iZy1kYXJrZW4tMiB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMxZjlkNTcgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1zdWNjZXNzLmJvcmRlci1kYXJrZW4tMiB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICMxZjlkNTcgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci10b3Atc3VjY2Vzcy5ib3JkZXItdG9wLWRhcmtlbi0yIHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICMxZjlkNTcgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1ib3R0b20tc3VjY2Vzcy5ib3JkZXItYm90dG9tLWRhcmtlbi0yIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICMxZjlkNTcgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1sZWZ0LXN1Y2Nlc3MuYm9yZGVyLWxlZnQtZGFya2VuLTIge1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICMxZjlkNTcgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1yaWdodC1zdWNjZXNzLmJvcmRlci1yaWdodC1kYXJrZW4tMiB7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICMxZjlkNTcgIWltcG9ydGFudDtcbn1cblxuLm92ZXJsYXktc3VjY2Vzcy5vdmVybGF5LWRhcmtlbi0yIHtcbiAgYmFja2dyb3VuZDogIzFmOWQ1NztcbiAgLyogVGhlIEZhbGxiYWNrICovXG4gIGJhY2tncm91bmQ6IHJnYmEoMzEsIDE1NywgODcsIDAuNik7XG59XG5cbi50ZXh0LXN1Y2Nlc3MudGV4dC1kYXJrZW4tMyB7XG4gIGNvbG9yOiAjMWI4NzRiICFpbXBvcnRhbnQ7XG59XG5cbi5iZy1zdWNjZXNzLmJnLWRhcmtlbi0zIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFiODc0YiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXN1Y2Nlc3MuYm9yZGVyLWRhcmtlbi0zIHtcbiAgYm9yZGVyOiAxcHggc29saWQgIzFiODc0YiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXRvcC1zdWNjZXNzLmJvcmRlci10b3AtZGFya2VuLTMge1xuICBib3JkZXItdG9wOiAxcHggc29saWQgIzFiODc0YiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWJvdHRvbS1zdWNjZXNzLmJvcmRlci1ib3R0b20tZGFya2VuLTMge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzFiODc0YiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWxlZnQtc3VjY2Vzcy5ib3JkZXItbGVmdC1kYXJrZW4tMyB7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgIzFiODc0YiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXJpZ2h0LXN1Y2Nlc3MuYm9yZGVyLXJpZ2h0LWRhcmtlbi0zIHtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgIzFiODc0YiAhaW1wb3J0YW50O1xufVxuXG4ub3ZlcmxheS1zdWNjZXNzLm92ZXJsYXktZGFya2VuLTMge1xuICBiYWNrZ3JvdW5kOiAjMWI4NzRiO1xuICAvKiBUaGUgRmFsbGJhY2sgKi9cbiAgYmFja2dyb3VuZDogcmdiYSgyNywgMTM1LCA3NSwgMC42KTtcbn1cblxuLnRleHQtc3VjY2Vzcy50ZXh0LWRhcmtlbi00IHtcbiAgY29sb3I6ICMxNzcyNDAgIWltcG9ydGFudDtcbn1cblxuLmJnLXN1Y2Nlc3MuYmctZGFya2VuLTQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTc3MjQwICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItc3VjY2Vzcy5ib3JkZXItZGFya2VuLTQge1xuICBib3JkZXI6IDFweCBzb2xpZCAjMTc3MjQwICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItdG9wLXN1Y2Nlc3MuYm9yZGVyLXRvcC1kYXJrZW4tNCB7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjMTc3MjQwICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItYm90dG9tLXN1Y2Nlc3MuYm9yZGVyLWJvdHRvbS1kYXJrZW4tNCB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMTc3MjQwICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItbGVmdC1zdWNjZXNzLmJvcmRlci1sZWZ0LWRhcmtlbi00IHtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjMTc3MjQwICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItcmlnaHQtc3VjY2Vzcy5ib3JkZXItcmlnaHQtZGFya2VuLTQge1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjMTc3MjQwICFpbXBvcnRhbnQ7XG59XG5cbi5vdmVybGF5LXN1Y2Nlc3Mub3ZlcmxheS1kYXJrZW4tNCB7XG4gIGJhY2tncm91bmQ6ICMxNzcyNDA7XG4gIC8qIFRoZSBGYWxsYmFjayAqL1xuICBiYWNrZ3JvdW5kOiByZ2JhKDIzLCAxMTQsIDY0LCAwLjYpO1xufVxuXG4udGV4dC1zdWNjZXNzLnRleHQtYWNjZW50LTEge1xuICBjb2xvcjogI2UxZmZmMSAhaW1wb3J0YW50O1xufVxuXG4uYmctc3VjY2Vzcy5iZy1hY2NlbnQtMSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlMWZmZjEgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1zdWNjZXNzLmJvcmRlci1hY2NlbnQtMSB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNlMWZmZjEgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci10b3Atc3VjY2Vzcy5ib3JkZXItdG9wLWFjY2VudC0xIHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNlMWZmZjEgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1ib3R0b20tc3VjY2Vzcy5ib3JkZXItYm90dG9tLWFjY2VudC0xIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlMWZmZjEgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1sZWZ0LXN1Y2Nlc3MuYm9yZGVyLWxlZnQtYWNjZW50LTEge1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICNlMWZmZjEgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1yaWdodC1zdWNjZXNzLmJvcmRlci1yaWdodC1hY2NlbnQtMSB7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNlMWZmZjEgIWltcG9ydGFudDtcbn1cblxuLm92ZXJsYXktc3VjY2Vzcy5vdmVybGF5LWFjY2VudC0xIHtcbiAgYmFja2dyb3VuZDogI2UxZmZmMTtcbiAgLyogVGhlIEZhbGxiYWNrICovXG4gIGJhY2tncm91bmQ6IHJnYmEoMjI1LCAyNTUsIDI0MSwgMC42KTtcbn1cblxuLnRleHQtc3VjY2Vzcy50ZXh0LWFjY2VudC0yIHtcbiAgY29sb3I6ICNhZWZmZDkgIWltcG9ydGFudDtcbn1cblxuLmJnLXN1Y2Nlc3MuYmctYWNjZW50LTIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWVmZmQ5ICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItc3VjY2Vzcy5ib3JkZXItYWNjZW50LTIge1xuICBib3JkZXI6IDFweCBzb2xpZCAjYWVmZmQ5ICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItdG9wLXN1Y2Nlc3MuYm9yZGVyLXRvcC1hY2NlbnQtMiB7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjYWVmZmQ5ICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItYm90dG9tLXN1Y2Nlc3MuYm9yZGVyLWJvdHRvbS1hY2NlbnQtMiB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjYWVmZmQ5ICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItbGVmdC1zdWNjZXNzLmJvcmRlci1sZWZ0LWFjY2VudC0yIHtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjYWVmZmQ5ICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItcmlnaHQtc3VjY2Vzcy5ib3JkZXItcmlnaHQtYWNjZW50LTIge1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjYWVmZmQ5ICFpbXBvcnRhbnQ7XG59XG5cbi5vdmVybGF5LXN1Y2Nlc3Mub3ZlcmxheS1hY2NlbnQtMiB7XG4gIGJhY2tncm91bmQ6ICNhZWZmZDk7XG4gIC8qIFRoZSBGYWxsYmFjayAqL1xuICBiYWNrZ3JvdW5kOiByZ2JhKDE3NCwgMjU1LCAyMTcsIDAuNik7XG59XG5cbi50ZXh0LXN1Y2Nlc3MudGV4dC1hY2NlbnQtMyB7XG4gIGNvbG9yOiAjN2JmZmMxICFpbXBvcnRhbnQ7XG59XG5cbi5iZy1zdWNjZXNzLmJnLWFjY2VudC0zIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzdiZmZjMSAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXN1Y2Nlc3MuYm9yZGVyLWFjY2VudC0zIHtcbiAgYm9yZGVyOiAxcHggc29saWQgIzdiZmZjMSAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXRvcC1zdWNjZXNzLmJvcmRlci10b3AtYWNjZW50LTMge1xuICBib3JkZXItdG9wOiAxcHggc29saWQgIzdiZmZjMSAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWJvdHRvbS1zdWNjZXNzLmJvcmRlci1ib3R0b20tYWNjZW50LTMge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzdiZmZjMSAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWxlZnQtc3VjY2Vzcy5ib3JkZXItbGVmdC1hY2NlbnQtMyB7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgIzdiZmZjMSAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXJpZ2h0LXN1Y2Nlc3MuYm9yZGVyLXJpZ2h0LWFjY2VudC0zIHtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgIzdiZmZjMSAhaW1wb3J0YW50O1xufVxuXG4ub3ZlcmxheS1zdWNjZXNzLm92ZXJsYXktYWNjZW50LTMge1xuICBiYWNrZ3JvdW5kOiAjN2JmZmMxO1xuICAvKiBUaGUgRmFsbGJhY2sgKi9cbiAgYmFja2dyb3VuZDogcmdiYSgxMjMsIDI1NSwgMTkzLCAwLjYpO1xufVxuXG4udGV4dC1zdWNjZXNzLnRleHQtYWNjZW50LTQge1xuICBjb2xvcjogIzYyZmZiNSAhaW1wb3J0YW50O1xufVxuXG4uYmctc3VjY2Vzcy5iZy1hY2NlbnQtNCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM2MmZmYjUgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1zdWNjZXNzLmJvcmRlci1hY2NlbnQtNCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICM2MmZmYjUgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci10b3Atc3VjY2Vzcy5ib3JkZXItdG9wLWFjY2VudC00IHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM2MmZmYjUgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1ib3R0b20tc3VjY2Vzcy5ib3JkZXItYm90dG9tLWFjY2VudC00IHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICM2MmZmYjUgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1sZWZ0LXN1Y2Nlc3MuYm9yZGVyLWxlZnQtYWNjZW50LTQge1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICM2MmZmYjUgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1yaWdodC1zdWNjZXNzLmJvcmRlci1yaWdodC1hY2NlbnQtNCB7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICM2MmZmYjUgIWltcG9ydGFudDtcbn1cblxuLm92ZXJsYXktc3VjY2Vzcy5vdmVybGF5LWFjY2VudC00IHtcbiAgYmFja2dyb3VuZDogIzYyZmZiNTtcbiAgLyogVGhlIEZhbGxiYWNrICovXG4gIGJhY2tncm91bmQ6IHJnYmEoOTgsIDI1NSwgMTgxLCAwLjYpO1xufVxuXG4udGV4dC1pbmZvLnRleHQtbGlnaHRlbi01IHtcbiAgY29sb3I6ICM2OWVmZmYgIWltcG9ydGFudDtcbn1cblxuLmJnLWluZm8uYmctbGlnaHRlbi01IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzY5ZWZmZiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWluZm8uYm9yZGVyLWxpZ2h0ZW4tNSB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICM2OWVmZmYgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci10b3AtaW5mby5ib3JkZXItdG9wLWxpZ2h0ZW4tNSB7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjNjllZmZmICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItYm90dG9tLWluZm8uYm9yZGVyLWJvdHRvbS1saWdodGVuLTUge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzY5ZWZmZiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWxlZnQtaW5mby5ib3JkZXItbGVmdC1saWdodGVuLTUge1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICM2OWVmZmYgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1yaWdodC1pbmZvLmJvcmRlci1yaWdodC1saWdodGVuLTUge1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjNjllZmZmICFpbXBvcnRhbnQ7XG59XG5cbi5vdmVybGF5LWluZm8ub3ZlcmxheS1saWdodGVuLTUge1xuICBiYWNrZ3JvdW5kOiAjNjllZmZmO1xuICAvKiBUaGUgRmFsbGJhY2sgKi9cbiAgYmFja2dyb3VuZDogcmdiYSgxMDUsIDIzOSwgMjU1LCAwLjYpO1xufVxuXG4udGV4dC1pbmZvLnRleHQtbGlnaHRlbi00IHtcbiAgY29sb3I6ICM0ZmVjZmYgIWltcG9ydGFudDtcbn1cblxuLmJnLWluZm8uYmctbGlnaHRlbi00IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzRmZWNmZiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWluZm8uYm9yZGVyLWxpZ2h0ZW4tNCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICM0ZmVjZmYgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci10b3AtaW5mby5ib3JkZXItdG9wLWxpZ2h0ZW4tNCB7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjNGZlY2ZmICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItYm90dG9tLWluZm8uYm9yZGVyLWJvdHRvbS1saWdodGVuLTQge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzRmZWNmZiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWxlZnQtaW5mby5ib3JkZXItbGVmdC1saWdodGVuLTQge1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICM0ZmVjZmYgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1yaWdodC1pbmZvLmJvcmRlci1yaWdodC1saWdodGVuLTQge1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjNGZlY2ZmICFpbXBvcnRhbnQ7XG59XG5cbi5vdmVybGF5LWluZm8ub3ZlcmxheS1saWdodGVuLTQge1xuICBiYWNrZ3JvdW5kOiAjNGZlY2ZmO1xuICAvKiBUaGUgRmFsbGJhY2sgKi9cbiAgYmFja2dyb3VuZDogcmdiYSg3OSwgMjM2LCAyNTUsIDAuNik7XG59XG5cbi50ZXh0LWluZm8udGV4dC1saWdodGVuLTMge1xuICBjb2xvcjogIzM2ZTlmZiAhaW1wb3J0YW50O1xufVxuXG4uYmctaW5mby5iZy1saWdodGVuLTMge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzZlOWZmICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItaW5mby5ib3JkZXItbGlnaHRlbi0zIHtcbiAgYm9yZGVyOiAxcHggc29saWQgIzM2ZTlmZiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXRvcC1pbmZvLmJvcmRlci10b3AtbGlnaHRlbi0zIHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICMzNmU5ZmYgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1ib3R0b20taW5mby5ib3JkZXItYm90dG9tLWxpZ2h0ZW4tMyB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMzZlOWZmICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItbGVmdC1pbmZvLmJvcmRlci1sZWZ0LWxpZ2h0ZW4tMyB7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgIzM2ZTlmZiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXJpZ2h0LWluZm8uYm9yZGVyLXJpZ2h0LWxpZ2h0ZW4tMyB7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICMzNmU5ZmYgIWltcG9ydGFudDtcbn1cblxuLm92ZXJsYXktaW5mby5vdmVybGF5LWxpZ2h0ZW4tMyB7XG4gIGJhY2tncm91bmQ6ICMzNmU5ZmY7XG4gIC8qIFRoZSBGYWxsYmFjayAqL1xuICBiYWNrZ3JvdW5kOiByZ2JhKDU0LCAyMzMsIDI1NSwgMC42KTtcbn1cblxuLnRleHQtaW5mby50ZXh0LWxpZ2h0ZW4tMiB7XG4gIGNvbG9yOiAjMWNlN2ZmICFpbXBvcnRhbnQ7XG59XG5cbi5iZy1pbmZvLmJnLWxpZ2h0ZW4tMiB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMxY2U3ZmYgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1pbmZvLmJvcmRlci1saWdodGVuLTIge1xuICBib3JkZXI6IDFweCBzb2xpZCAjMWNlN2ZmICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItdG9wLWluZm8uYm9yZGVyLXRvcC1saWdodGVuLTIge1xuICBib3JkZXItdG9wOiAxcHggc29saWQgIzFjZTdmZiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWJvdHRvbS1pbmZvLmJvcmRlci1ib3R0b20tbGlnaHRlbi0yIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICMxY2U3ZmYgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1sZWZ0LWluZm8uYm9yZGVyLWxlZnQtbGlnaHRlbi0yIHtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjMWNlN2ZmICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItcmlnaHQtaW5mby5ib3JkZXItcmlnaHQtbGlnaHRlbi0yIHtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgIzFjZTdmZiAhaW1wb3J0YW50O1xufVxuXG4ub3ZlcmxheS1pbmZvLm92ZXJsYXktbGlnaHRlbi0yIHtcbiAgYmFja2dyb3VuZDogIzFjZTdmZjtcbiAgLyogVGhlIEZhbGxiYWNrICovXG4gIGJhY2tncm91bmQ6IHJnYmEoMjgsIDIzMSwgMjU1LCAwLjYpO1xufVxuXG4udGV4dC1pbmZvLnRleHQtbGlnaHRlbi0xIHtcbiAgY29sb3I6ICMwM2U0ZmYgIWltcG9ydGFudDtcbn1cblxuLmJnLWluZm8uYmctbGlnaHRlbi0xIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAzZTRmZiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWluZm8uYm9yZGVyLWxpZ2h0ZW4tMSB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICMwM2U0ZmYgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci10b3AtaW5mby5ib3JkZXItdG9wLWxpZ2h0ZW4tMSB7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjMDNlNGZmICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItYm90dG9tLWluZm8uYm9yZGVyLWJvdHRvbS1saWdodGVuLTEge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzAzZTRmZiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWxlZnQtaW5mby5ib3JkZXItbGVmdC1saWdodGVuLTEge1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICMwM2U0ZmYgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1yaWdodC1pbmZvLmJvcmRlci1yaWdodC1saWdodGVuLTEge1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjMDNlNGZmICFpbXBvcnRhbnQ7XG59XG5cbi5vdmVybGF5LWluZm8ub3ZlcmxheS1saWdodGVuLTEge1xuICBiYWNrZ3JvdW5kOiAjMDNlNGZmO1xuICAvKiBUaGUgRmFsbGJhY2sgKi9cbiAgYmFja2dyb3VuZDogcmdiYSgzLCAyMjgsIDI1NSwgMC42KTtcbn1cblxuLmJnLWluZm8ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBjZmU4ICFpbXBvcnRhbnQ7XG59XG4uYmctaW5mbyAuY2FyZC1oZWFkZXIsXG4uYmctaW5mbyAuY2FyZC1mb290ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cblxuLmFsZXJ0LWluZm8ge1xuICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDIwNywgMjMyLCAwLjEyKSAhaW1wb3J0YW50O1xuICBjb2xvcjogIzAwY2ZlOCAhaW1wb3J0YW50O1xufVxuLmFsZXJ0LWluZm8gLmFsZXJ0LWhlYWRpbmcge1xuICBib3gtc2hhZG93OiByZ2JhKDAsIDIwNywgMjMyLCAwLjQpIDBweCA2cHggMTVweCAtN3B4O1xufVxuLmFsZXJ0LWluZm8gLmFsZXJ0LWxpbmsge1xuICBjb2xvcjogIzAwYjhjZiAhaW1wb3J0YW50O1xufVxuLmFsZXJ0LWluZm8gLmNsb3NlIHtcbiAgY29sb3I6ICMwMGNmZTggIWltcG9ydGFudDtcbn1cblxuLmJnLWxpZ2h0LWluZm8ge1xuICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDIwNywgMjMyLCAwLjEyKSAhaW1wb3J0YW50O1xuICBjb2xvcjogIzAwY2ZlOCAhaW1wb3J0YW50O1xufVxuLmJnLWxpZ2h0LWluZm8uZmMtaC1ldmVudCwgLmJnLWxpZ2h0LWluZm8uZmMtdi1ldmVudCB7XG4gIGJvcmRlci1jb2xvcjogcmdiYSgwLCAyMDcsIDIzMiwgMC4xKTtcbn1cbi5iZy1saWdodC1pbmZvIC5mYy1saXN0LWV2ZW50LWRvdCxcbi5iZy1saWdodC1pbmZvIC5mYy1kYXlncmlkLWV2ZW50LWRvdCB7XG4gIGJvcmRlci1jb2xvcjogIzAwY2ZlOCAhaW1wb3J0YW50O1xufVxuLmJnLWxpZ2h0LWluZm8uZmMtbGlzdC1ldmVudDpob3ZlciB0ZCB7XG4gIGJhY2tncm91bmQ6IHJnYmEoMCwgMjA3LCAyMzIsIDAuMSkgIWltcG9ydGFudDtcbn1cbi5iZy1saWdodC1pbmZvLmZjLWxpc3QtZXZlbnQgLmZjLWxpc3QtZXZlbnQtdGl0bGUge1xuICBjb2xvcjogIzZlNmI3Yjtcbn1cblxuLmF2YXRhci5iZy1saWdodC1pbmZvIHtcbiAgY29sb3I6ICMwMGNmZTggIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1pbmZvIHtcbiAgYm9yZGVyOiAxcHggc29saWQgIzAwY2ZlOCAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXRvcC1pbmZvIHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICMwMGNmZTg7XG59XG5cbi5ib3JkZXItYm90dG9tLWluZm8ge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzAwY2ZlODtcbn1cblxuLmJvcmRlci1sZWZ0LWluZm8ge1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICMwMGNmZTg7XG59XG5cbi5ib3JkZXItcmlnaHQtaW5mbyB7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICMwMGNmZTg7XG59XG5cbi5iZy1pbmZvLmJhZGdlLWdsb3csXG4uYm9yZGVyLWluZm8uYmFkZ2UtZ2xvdyxcbi5iYWRnZS1pbmZvLmJhZGdlLWdsb3cge1xuICBib3gtc2hhZG93OiAwcHggMHB4IDEwcHggIzAwY2ZlODtcbn1cblxuLmJhZGdlLmJhZGdlLWxpZ2h0LWluZm8ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDIwNywgMjMyLCAwLjEyKTtcbiAgY29sb3I6ICMwMGNmZTggIWltcG9ydGFudDtcbn1cblxuLm92ZXJsYXktaW5mbyB7XG4gIGJhY2tncm91bmQ6ICMwMGNmZTg7XG4gIC8qIFRoZSBGYWxsYmFjayAqL1xuICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDIwNywgMjMyLCAwLjYpO1xufVxuXG4uYnRuLWluZm8ge1xuICBib3JkZXItY29sb3I6ICMwMGNmZTggIWltcG9ydGFudDtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwY2ZlOCAhaW1wb3J0YW50O1xuICBjb2xvcjogI2ZmZiAhaW1wb3J0YW50O1xufVxuLmJ0bi1pbmZvOmZvY3VzLCAuYnRuLWluZm86YWN0aXZlLCAuYnRuLWluZm8uYWN0aXZlIHtcbiAgY29sb3I6ICNmZmY7XG4gIGJhY2tncm91bmQtY29sb3I6ICMwMGI4Y2YgIWltcG9ydGFudDtcbn1cbi5idG4taW5mbzpob3Zlcjpub3QoLmRpc2FibGVkKTpub3QoOmRpc2FibGVkKSB7XG4gIGJveC1zaGFkb3c6IDAgOHB4IDI1cHggLThweCAjMDBjZmU4O1xufVxuLmJ0bi1pbmZvOm5vdCg6ZGlzYWJsZWQpOm5vdCguZGlzYWJsZWQpOmFjdGl2ZTpmb2N1cyB7XG4gIGJveC1zaGFkb3c6IG5vbmU7XG59XG5cbi5idG4tZmxhdC1pbmZvIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAjMDBjZmU4O1xufVxuLmJ0bi1mbGF0LWluZm86aG92ZXIge1xuICBjb2xvcjogIzAwY2ZlODtcbn1cbi5idG4tZmxhdC1pbmZvOmhvdmVyOm5vdCguZGlzYWJsZWQpOm5vdCg6ZGlzYWJsZWQpIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAyMDcsIDIzMiwgMC4xMik7XG59XG4uYnRuLWZsYXQtaW5mbzphY3RpdmUsIC5idG4tZmxhdC1pbmZvLmFjdGl2ZSwgLmJ0bi1mbGF0LWluZm86Zm9jdXMge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDIwNywgMjMyLCAwLjIpO1xuICBjb2xvcjogIzAwY2ZlODtcbn1cbi5idG4tZmxhdC1pbmZvLmRyb3Bkb3duLXRvZ2dsZTo6YWZ0ZXIge1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCJkYXRhOmltYWdlL3N2Zyt4bWwsJTNDc3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgdmlld0JveD0nMCAwIDI0IDI0JyBmaWxsPSdub25lJyBzdHJva2U9JyUyMzAwY2ZlOCcgc3Ryb2tlLXdpZHRoPScyJyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnIGNsYXNzPSdmZWF0aGVyIGZlYXRoZXItY2hldnJvbi1kb3duJyUzRSUzQ3BvbHlsaW5lIHBvaW50cz0nNiA5IDEyIDE1IDE4IDknJTNFJTNDL3BvbHlsaW5lJTNFJTNDL3N2ZyUzRVwiKTtcbn1cblxuLmJ0bi1yZWxpZWYtaW5mbyB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMwMGNmZTg7XG4gIGJveC1zaGFkb3c6IGluc2V0IDAgLTNweCAwIDAgcmdiYSgzNCwgNDEsIDQ3LCAwLjIpO1xuICBjb2xvcjogI2ZmZjtcbiAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZTtcbn1cbi5idG4tcmVsaWVmLWluZm86aG92ZXI6bm90KC5kaXNhYmxlZCk6bm90KDpkaXNhYmxlZCkge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDNlNGZmO1xufVxuLmJ0bi1yZWxpZWYtaW5mbzphY3RpdmUsIC5idG4tcmVsaWVmLWluZm8uYWN0aXZlLCAuYnRuLXJlbGllZi1pbmZvOmZvY3VzIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwYjhjZjtcbn1cbi5idG4tcmVsaWVmLWluZm86aG92ZXIge1xuICBjb2xvcjogI2ZmZjtcbn1cbi5idG4tcmVsaWVmLWluZm86YWN0aXZlLCAuYnRuLXJlbGllZi1pbmZvLmFjdGl2ZSB7XG4gIG91dGxpbmU6IG5vbmU7XG4gIGJveC1zaGFkb3c6IG5vbmU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgzcHgpO1xufVxuXG4uYnRuLW91dGxpbmUtaW5mbyB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICMwMGNmZTggIWltcG9ydGFudDtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAjMDBjZmU4O1xufVxuLmJ0bi1vdXRsaW5lLWluZm86aG92ZXI6bm90KC5kaXNhYmxlZCk6bm90KDpkaXNhYmxlZCkge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDIwNywgMjMyLCAwLjA0KTtcbiAgY29sb3I6ICMwMGNmZTg7XG59XG4uYnRuLW91dGxpbmUtaW5mbzpub3QoOmRpc2FibGVkKTpub3QoLmRpc2FibGVkKTphY3RpdmU6Zm9jdXMge1xuICBib3gtc2hhZG93OiBub25lO1xufVxuLmJ0bi1vdXRsaW5lLWluZm86bm90KDpkaXNhYmxlZCk6bm90KC5kaXNhYmxlZCk6YWN0aXZlLCAuYnRuLW91dGxpbmUtaW5mbzpub3QoOmRpc2FibGVkKTpub3QoLmRpc2FibGVkKS5hY3RpdmUsIC5idG4tb3V0bGluZS1pbmZvOm5vdCg6ZGlzYWJsZWQpOm5vdCguZGlzYWJsZWQpOmZvY3VzIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAyMDcsIDIzMiwgMC4yKTtcbiAgY29sb3I6ICMwMGNmZTg7XG59XG4uYnRuLW91dGxpbmUtaW5mby5kcm9wZG93bi10b2dnbGU6OmFmdGVyIHtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiZGF0YTppbWFnZS9zdmcreG1sLCUzQ3N2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNCAyNCcgZmlsbD0nbm9uZScgc3Ryb2tlPSclMjMwMGNmZTgnIHN0cm9rZS13aWR0aD0nMicgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJyBjbGFzcz0nZmVhdGhlciBmZWF0aGVyLWNoZXZyb24tZG93biclM0UlM0Nwb2x5bGluZSBwb2ludHM9JzYgOSAxMiAxNSAxOCA5JyUzRSUzQy9wb2x5bGluZSUzRSUzQy9zdmclM0VcIik7XG59XG4uc2hvdyA+IC5idG4tb3V0bGluZS1pbmZvLmRyb3Bkb3duLXRvZ2dsZSB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMjA3LCAyMzIsIDAuMik7XG4gIGNvbG9yOiAjMDBjZmU4O1xufVxuXG4uYnRuLW91dGxpbmUtaW5mby53YXZlcy1lZmZlY3QgLndhdmVzLXJpcHBsZSxcbi5idG4tZmxhdC1pbmZvLndhdmVzLWVmZmVjdCAud2F2ZXMtcmlwcGxlIHtcbiAgYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KHJnYmEoMCwgMjA3LCAyMzIsIDAuMikgMCwgcmdiYSgwLCAyMDcsIDIzMiwgMC4zKSA0MCUsIHJnYmEoMCwgMjA3LCAyMzIsIDAuNCkgNTAlLCByZ2JhKDAsIDIwNywgMjMyLCAwLjUpIDYwJSwgcmdiYSgyNTUsIDI1NSwgMjU1LCAwKSA3MCUpO1xufVxuXG4uYnVsbGV0LmJ1bGxldC1pbmZvIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwY2ZlODtcbn1cblxuLm1vZGFsLm1vZGFsLWluZm8gLm1vZGFsLWhlYWRlciAubW9kYWwtdGl0bGUge1xuICBjb2xvcjogIzAwY2ZlODtcbn1cbi5tb2RhbC5tb2RhbC1pbmZvIC5tb2RhbC1oZWFkZXIgLmNsb3NlIHtcbiAgY29sb3I6ICMwMGNmZTggIWltcG9ydGFudDtcbn1cblxuLnBhZ2luYXRpb24taW5mbyAucGFnZS1pdGVtLmFjdGl2ZSAucGFnZS1saW5rIHtcbiAgYmFja2dyb3VuZDogIzAwY2ZlOCAhaW1wb3J0YW50O1xuICBjb2xvcjogI2ZmZjtcbn1cbi5wYWdpbmF0aW9uLWluZm8gLnBhZ2UtaXRlbS5hY3RpdmUgLnBhZ2UtbGluazpob3ZlciB7XG4gIGNvbG9yOiAjZmZmO1xufVxuLnBhZ2luYXRpb24taW5mbyAucGFnZS1pdGVtIC5wYWdlLWxpbms6aG92ZXIge1xuICBjb2xvcjogIzAwY2ZlODtcbn1cbi5wYWdpbmF0aW9uLWluZm8gLnBhZ2UtaXRlbS5wcmV2LWl0ZW0gLnBhZ2UtbGluazpob3ZlciwgLnBhZ2luYXRpb24taW5mbyAucGFnZS1pdGVtLm5leHQtaXRlbSAucGFnZS1saW5rOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogIzAwY2ZlODtcbiAgY29sb3I6ICNmZmY7XG59XG4ucGFnaW5hdGlvbi1pbmZvIC5wYWdlLWl0ZW0ubmV4dC1pdGVtIC5wYWdlLWxpbms6YWN0aXZlOmFmdGVyLCAucGFnaW5hdGlvbi1pbmZvIC5wYWdlLWl0ZW0ubmV4dC1pdGVtIC5wYWdlLWxpbms6aG92ZXI6YWZ0ZXIsIC5wYWdpbmF0aW9uLWluZm8gLnBhZ2UtaXRlbS5uZXh0IC5wYWdlLWxpbms6YWN0aXZlOmFmdGVyLCAucGFnaW5hdGlvbi1pbmZvIC5wYWdlLWl0ZW0ubmV4dCAucGFnZS1saW5rOmhvdmVyOmFmdGVyIHtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiZGF0YTppbWFnZS9zdmcreG1sLCUzQ3N2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNCAyNCcgZmlsbD0nbm9uZScgc3Ryb2tlPSclMjMwMGNmZTgnIHN0cm9rZS13aWR0aD0nMicgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJyBjbGFzcz0nZmVhdGhlciBmZWF0aGVyLWNoZXZyb24tcmlnaHQnJTNFJTNDcG9seWxpbmUgcG9pbnRzPSc5IDE4IDE1IDEyIDkgNiclM0UlM0MvcG9seWxpbmUlM0UlM0Mvc3ZnJTNFXCIpICFpbXBvcnRhbnQ7XG59XG4ucGFnaW5hdGlvbi1pbmZvIC5wYWdlLWl0ZW0ucHJldi1pdGVtIC5wYWdlLWxpbms6YWN0aXZlOmJlZm9yZSwgLnBhZ2luYXRpb24taW5mbyAucGFnZS1pdGVtLnByZXYtaXRlbSAucGFnZS1saW5rOmhvdmVyOmJlZm9yZSwgLnBhZ2luYXRpb24taW5mbyAucGFnZS1pdGVtLnByZXYgLnBhZ2UtbGluazphY3RpdmU6YmVmb3JlLCAucGFnaW5hdGlvbi1pbmZvIC5wYWdlLWl0ZW0ucHJldiAucGFnZS1saW5rOmhvdmVyOmJlZm9yZSB7XG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcImRhdGE6aW1hZ2Uvc3ZnK3htbCwlM0NzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB2aWV3Qm94PScwIDAgMjQgMjQnIGZpbGw9J25vbmUnIHN0cm9rZT0nJTIzMDBjZmU4JyBzdHJva2Utd2lkdGg9JzInIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcgY2xhc3M9J2ZlYXRoZXIgZmVhdGhlci1jaGV2cm9uLWxlZnQnJTNFJTNDcG9seWxpbmUgcG9pbnRzPScxNSAxOCA5IDEyIDE1IDYnJTNFJTNDL3BvbHlsaW5lJTNFJTNDL3N2ZyUzRVwiKSAhaW1wb3J0YW50O1xufVxuXG4ubmF2LXBpbGwtaW5mbyAubmF2LWl0ZW0gLm5hdi1saW5rLmFjdGl2ZSB7XG4gIGNvbG9yOiAjZmZmO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBjZmU4ICFpbXBvcnRhbnQ7XG4gIGJvcmRlci1jb2xvcjogIzAwY2ZlODtcbiAgYm94LXNoYWRvdzogMCA0cHggMThweCAtNHB4IHJnYmEoMCwgMjA3LCAyMzIsIDAuNjUpO1xufVxuXG4ucHJvZ3Jlc3MtYmFyLWluZm8ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDIwNywgMjMyLCAwLjEyKTtcbn1cbi5wcm9ncmVzcy1iYXItaW5mbyAucHJvZ3Jlc3MtYmFyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwY2ZlODtcbn1cblxuLnRpbWVsaW5lIC50aW1lbGluZS1wb2ludC1pbmZvIHtcbiAgYm9yZGVyLWNvbG9yOiAjMDBjZmU4ICFpbXBvcnRhbnQ7XG59XG4udGltZWxpbmUgLnRpbWVsaW5lLXBvaW50LWluZm8gaSxcbi50aW1lbGluZSAudGltZWxpbmUtcG9pbnQtaW5mbyBzdmcge1xuICBzdHJva2U6ICMwMGNmZTggIWltcG9ydGFudDtcbn1cbi50aW1lbGluZSAudGltZWxpbmUtcG9pbnQtaW5mby50aW1lbGluZS1wb2ludC1pbmRpY2F0b3Ige1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBjZmU4ICFpbXBvcnRhbnQ7XG59XG4udGltZWxpbmUgLnRpbWVsaW5lLXBvaW50LWluZm8udGltZWxpbmUtcG9pbnQtaW5kaWNhdG9yOmJlZm9yZSB7XG4gIGJhY2tncm91bmQ6IHJnYmEoMCwgMjA3LCAyMzIsIDAuMTIpICFpbXBvcnRhbnQ7XG59XG5cbi5kaXZpZGVyLmRpdmlkZXItaW5mbyAuZGl2aWRlci10ZXh0OmJlZm9yZSwgLmRpdmlkZXIuZGl2aWRlci1pbmZvIC5kaXZpZGVyLXRleHQ6YWZ0ZXIge1xuICBib3JkZXItY29sb3I6ICMwMGNmZTggIWltcG9ydGFudDtcbn1cblxuaW5wdXQ6Zm9jdXMgfiAuYmctaW5mbyB7XG4gIGJveC1zaGFkb3c6IDAgMCAwIDAuMDc1cmVtICNmZmYsIDAgMCAwIDAuMjFyZW0gIzAwY2ZlOCAhaW1wb3J0YW50O1xufVxuXG4uY3VzdG9tLWNvbnRyb2wtaW5mbyAuY3VzdG9tLWNvbnRyb2wtaW5wdXQ6Y2hlY2tlZCB+IC5jdXN0b20tY29udHJvbC1sYWJlbDo6YmVmb3JlLFxuLmN1c3RvbS1jb250cm9sLWluZm8gLmN1c3RvbS1jb250cm9sLWlucHV0OmFjdGl2ZSB+IC5jdXN0b20tY29udHJvbC1sYWJlbDo6YmVmb3JlIHtcbiAgYm9yZGVyLWNvbG9yOiAjMDBjZmU4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBjZmU4O1xufVxuLmN1c3RvbS1jb250cm9sLWluZm8uY3VzdG9tLWNoZWNrYm94IC5jdXN0b20tY29udHJvbC1pbnB1dDpjaGVja2VkIH4gLmN1c3RvbS1jb250cm9sLWxhYmVsOjpiZWZvcmUsXG4uY3VzdG9tLWNvbnRyb2wtaW5mby5jdXN0b20tY2hlY2tib3ggLmN1c3RvbS1jb250cm9sLWlucHV0OmFjdGl2ZSB+IC5jdXN0b20tY29udHJvbC1sYWJlbDo6YmVmb3JlLFxuLmN1c3RvbS1jb250cm9sLWluZm8uY3VzdG9tLWNoZWNrYm94IC5jdXN0b20tY29udHJvbC1pbnB1dDpmb2N1cyB+IC5jdXN0b20tY29udHJvbC1sYWJlbDo6YmVmb3JlLCAuY3VzdG9tLWNvbnRyb2wtaW5mby5jdXN0b20tcmFkaW8gLmN1c3RvbS1jb250cm9sLWlucHV0OmNoZWNrZWQgfiAuY3VzdG9tLWNvbnRyb2wtbGFiZWw6OmJlZm9yZSxcbi5jdXN0b20tY29udHJvbC1pbmZvLmN1c3RvbS1yYWRpbyAuY3VzdG9tLWNvbnRyb2wtaW5wdXQ6YWN0aXZlIH4gLmN1c3RvbS1jb250cm9sLWxhYmVsOjpiZWZvcmUsXG4uY3VzdG9tLWNvbnRyb2wtaW5mby5jdXN0b20tcmFkaW8gLmN1c3RvbS1jb250cm9sLWlucHV0OmZvY3VzIH4gLmN1c3RvbS1jb250cm9sLWxhYmVsOjpiZWZvcmUge1xuICBib3gtc2hhZG93OiAwIDJweCA0cHggMCByZ2JhKDAsIDIwNywgMjMyLCAwLjQpICFpbXBvcnRhbnQ7XG59XG4uY3VzdG9tLWNvbnRyb2wtaW5mbyAuY3VzdG9tLWNvbnRyb2wtaW5wdXQ6ZGlzYWJsZWQ6Y2hlY2tlZCB+IC5jdXN0b20tY29udHJvbC1sYWJlbDo6YmVmb3JlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAyMDcsIDIzMiwgMC42NSkgIWltcG9ydGFudDtcbiAgYm9yZGVyOiBub25lO1xuICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XG59XG4uY3VzdG9tLWNvbnRyb2wtaW5mbyAuY3VzdG9tLWNvbnRyb2wtaW5wdXQ6Zm9jdXMgfiAuY3VzdG9tLWNvbnRyb2wtbGFiZWw6OmJlZm9yZSB7XG4gIGJvcmRlci1jb2xvcjogIzAwY2ZlOCAhaW1wb3J0YW50O1xufVxuXG4uY3VzdG9tLXN3aXRjaC1pbmZvIC5jdXN0b20tY29udHJvbC1pbnB1dDpjaGVja2VkIH4gLmN1c3RvbS1jb250cm9sLWxhYmVsOjpiZWZvcmUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBjZmU4ICFpbXBvcnRhbnQ7XG4gIGNvbG9yOiAjZmZmO1xuICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlLW91dDtcbn1cblxuLnNlbGVjdDItaW5mbyAuc2VsZWN0Mi1jb250YWluZXItLWRlZmF1bHQgLnNlbGVjdDItc2VsZWN0aW9uLS1tdWx0aXBsZSAuc2VsZWN0Mi1zZWxlY3Rpb25fX2Nob2ljZSB7XG4gIGJhY2tncm91bmQ6ICMwMGNmZTggIWltcG9ydGFudDtcbiAgYm9yZGVyLWNvbG9yOiAjMDBjZmU4ICFpbXBvcnRhbnQ7XG59XG5cbi50ZXh0LWluZm8udGV4dC1kYXJrZW4tMSB7XG4gIGNvbG9yOiAjMDBiOGNmICFpbXBvcnRhbnQ7XG59XG5cbi5iZy1pbmZvLmJnLWRhcmtlbi0xIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwYjhjZiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWluZm8uYm9yZGVyLWRhcmtlbi0xIHtcbiAgYm9yZGVyOiAxcHggc29saWQgIzAwYjhjZiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXRvcC1pbmZvLmJvcmRlci10b3AtZGFya2VuLTEge1xuICBib3JkZXItdG9wOiAxcHggc29saWQgIzAwYjhjZiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWJvdHRvbS1pbmZvLmJvcmRlci1ib3R0b20tZGFya2VuLTEge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzAwYjhjZiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWxlZnQtaW5mby5ib3JkZXItbGVmdC1kYXJrZW4tMSB7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgIzAwYjhjZiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXJpZ2h0LWluZm8uYm9yZGVyLXJpZ2h0LWRhcmtlbi0xIHtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgIzAwYjhjZiAhaW1wb3J0YW50O1xufVxuXG4ub3ZlcmxheS1pbmZvLm92ZXJsYXktZGFya2VuLTEge1xuICBiYWNrZ3JvdW5kOiAjMDBiOGNmO1xuICAvKiBUaGUgRmFsbGJhY2sgKi9cbiAgYmFja2dyb3VuZDogcmdiYSgwLCAxODQsIDIwNywgMC42KTtcbn1cblxuLnRleHQtaW5mby50ZXh0LWRhcmtlbi0yIHtcbiAgY29sb3I6ICMwMGExYjUgIWltcG9ydGFudDtcbn1cblxuLmJnLWluZm8uYmctZGFya2VuLTIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBhMWI1ICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItaW5mby5ib3JkZXItZGFya2VuLTIge1xuICBib3JkZXI6IDFweCBzb2xpZCAjMDBhMWI1ICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItdG9wLWluZm8uYm9yZGVyLXRvcC1kYXJrZW4tMiB7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjMDBhMWI1ICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItYm90dG9tLWluZm8uYm9yZGVyLWJvdHRvbS1kYXJrZW4tMiB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMDBhMWI1ICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItbGVmdC1pbmZvLmJvcmRlci1sZWZ0LWRhcmtlbi0yIHtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjMDBhMWI1ICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItcmlnaHQtaW5mby5ib3JkZXItcmlnaHQtZGFya2VuLTIge1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjMDBhMWI1ICFpbXBvcnRhbnQ7XG59XG5cbi5vdmVybGF5LWluZm8ub3ZlcmxheS1kYXJrZW4tMiB7XG4gIGJhY2tncm91bmQ6ICMwMGExYjU7XG4gIC8qIFRoZSBGYWxsYmFjayAqL1xuICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDE2MSwgMTgxLCAwLjYpO1xufVxuXG4udGV4dC1pbmZvLnRleHQtZGFya2VuLTMge1xuICBjb2xvcjogIzAwOGI5YyAhaW1wb3J0YW50O1xufVxuXG4uYmctaW5mby5iZy1kYXJrZW4tMyB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDhiOWMgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1pbmZvLmJvcmRlci1kYXJrZW4tMyB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICMwMDhiOWMgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci10b3AtaW5mby5ib3JkZXItdG9wLWRhcmtlbi0zIHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICMwMDhiOWMgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1ib3R0b20taW5mby5ib3JkZXItYm90dG9tLWRhcmtlbi0zIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICMwMDhiOWMgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1sZWZ0LWluZm8uYm9yZGVyLWxlZnQtZGFya2VuLTMge1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICMwMDhiOWMgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1yaWdodC1pbmZvLmJvcmRlci1yaWdodC1kYXJrZW4tMyB7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICMwMDhiOWMgIWltcG9ydGFudDtcbn1cblxuLm92ZXJsYXktaW5mby5vdmVybGF5LWRhcmtlbi0zIHtcbiAgYmFja2dyb3VuZDogIzAwOGI5YztcbiAgLyogVGhlIEZhbGxiYWNrICovXG4gIGJhY2tncm91bmQ6IHJnYmEoMCwgMTM5LCAxNTYsIDAuNik7XG59XG5cbi50ZXh0LWluZm8udGV4dC1kYXJrZW4tNCB7XG4gIGNvbG9yOiAjMDA3NDgyICFpbXBvcnRhbnQ7XG59XG5cbi5iZy1pbmZvLmJnLWRhcmtlbi00IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwNzQ4MiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWluZm8uYm9yZGVyLWRhcmtlbi00IHtcbiAgYm9yZGVyOiAxcHggc29saWQgIzAwNzQ4MiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXRvcC1pbmZvLmJvcmRlci10b3AtZGFya2VuLTQge1xuICBib3JkZXItdG9wOiAxcHggc29saWQgIzAwNzQ4MiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWJvdHRvbS1pbmZvLmJvcmRlci1ib3R0b20tZGFya2VuLTQge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzAwNzQ4MiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWxlZnQtaW5mby5ib3JkZXItbGVmdC1kYXJrZW4tNCB7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgIzAwNzQ4MiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXJpZ2h0LWluZm8uYm9yZGVyLXJpZ2h0LWRhcmtlbi00IHtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgIzAwNzQ4MiAhaW1wb3J0YW50O1xufVxuXG4ub3ZlcmxheS1pbmZvLm92ZXJsYXktZGFya2VuLTQge1xuICBiYWNrZ3JvdW5kOiAjMDA3NDgyO1xuICAvKiBUaGUgRmFsbGJhY2sgKi9cbiAgYmFja2dyb3VuZDogcmdiYSgwLCAxMTYsIDEzMCwgMC42KTtcbn1cblxuLnRleHQtaW5mby50ZXh0LWFjY2VudC0xIHtcbiAgY29sb3I6ICNmZWZmZmYgIWltcG9ydGFudDtcbn1cblxuLmJnLWluZm8uYmctYWNjZW50LTEge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmVmZmZmICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItaW5mby5ib3JkZXItYWNjZW50LTEge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZmVmZmZmICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItdG9wLWluZm8uYm9yZGVyLXRvcC1hY2NlbnQtMSB7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZmVmZmZmICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItYm90dG9tLWluZm8uYm9yZGVyLWJvdHRvbS1hY2NlbnQtMSB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZmVmZmZmICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItbGVmdC1pbmZvLmJvcmRlci1sZWZ0LWFjY2VudC0xIHtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjZmVmZmZmICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItcmlnaHQtaW5mby5ib3JkZXItcmlnaHQtYWNjZW50LTEge1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjZmVmZmZmICFpbXBvcnRhbnQ7XG59XG5cbi5vdmVybGF5LWluZm8ub3ZlcmxheS1hY2NlbnQtMSB7XG4gIGJhY2tncm91bmQ6ICNmZWZmZmY7XG4gIC8qIFRoZSBGYWxsYmFjayAqL1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NCwgMjU1LCAyNTUsIDAuNik7XG59XG5cbi50ZXh0LWluZm8udGV4dC1hY2NlbnQtMiB7XG4gIGNvbG9yOiAjY2JmNWZmICFpbXBvcnRhbnQ7XG59XG5cbi5iZy1pbmZvLmJnLWFjY2VudC0yIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2NiZjVmZiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWluZm8uYm9yZGVyLWFjY2VudC0yIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NiZjVmZiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXRvcC1pbmZvLmJvcmRlci10b3AtYWNjZW50LTIge1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI2NiZjVmZiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWJvdHRvbS1pbmZvLmJvcmRlci1ib3R0b20tYWNjZW50LTIge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2NiZjVmZiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWxlZnQtaW5mby5ib3JkZXItbGVmdC1hY2NlbnQtMiB7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2NiZjVmZiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXJpZ2h0LWluZm8uYm9yZGVyLXJpZ2h0LWFjY2VudC0yIHtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2NiZjVmZiAhaW1wb3J0YW50O1xufVxuXG4ub3ZlcmxheS1pbmZvLm92ZXJsYXktYWNjZW50LTIge1xuICBiYWNrZ3JvdW5kOiAjY2JmNWZmO1xuICAvKiBUaGUgRmFsbGJhY2sgKi9cbiAgYmFja2dyb3VuZDogcmdiYSgyMDMsIDI0NSwgMjU1LCAwLjYpO1xufVxuXG4udGV4dC1pbmZvLnRleHQtYWNjZW50LTMge1xuICBjb2xvcjogIzk4ZWNmZiAhaW1wb3J0YW50O1xufVxuXG4uYmctaW5mby5iZy1hY2NlbnQtMyB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM5OGVjZmYgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1pbmZvLmJvcmRlci1hY2NlbnQtMyB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICM5OGVjZmYgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci10b3AtaW5mby5ib3JkZXItdG9wLWFjY2VudC0zIHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM5OGVjZmYgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1ib3R0b20taW5mby5ib3JkZXItYm90dG9tLWFjY2VudC0zIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICM5OGVjZmYgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1sZWZ0LWluZm8uYm9yZGVyLWxlZnQtYWNjZW50LTMge1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICM5OGVjZmYgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1yaWdodC1pbmZvLmJvcmRlci1yaWdodC1hY2NlbnQtMyB7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICM5OGVjZmYgIWltcG9ydGFudDtcbn1cblxuLm92ZXJsYXktaW5mby5vdmVybGF5LWFjY2VudC0zIHtcbiAgYmFja2dyb3VuZDogIzk4ZWNmZjtcbiAgLyogVGhlIEZhbGxiYWNrICovXG4gIGJhY2tncm91bmQ6IHJnYmEoMTUyLCAyMzYsIDI1NSwgMC42KTtcbn1cblxuLnRleHQtaW5mby50ZXh0LWFjY2VudC00IHtcbiAgY29sb3I6ICM3ZmU3ZmYgIWltcG9ydGFudDtcbn1cblxuLmJnLWluZm8uYmctYWNjZW50LTQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjN2ZlN2ZmICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItaW5mby5ib3JkZXItYWNjZW50LTQge1xuICBib3JkZXI6IDFweCBzb2xpZCAjN2ZlN2ZmICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItdG9wLWluZm8uYm9yZGVyLXRvcC1hY2NlbnQtNCB7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjN2ZlN2ZmICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItYm90dG9tLWluZm8uYm9yZGVyLWJvdHRvbS1hY2NlbnQtNCB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjN2ZlN2ZmICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItbGVmdC1pbmZvLmJvcmRlci1sZWZ0LWFjY2VudC00IHtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjN2ZlN2ZmICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItcmlnaHQtaW5mby5ib3JkZXItcmlnaHQtYWNjZW50LTQge1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjN2ZlN2ZmICFpbXBvcnRhbnQ7XG59XG5cbi5vdmVybGF5LWluZm8ub3ZlcmxheS1hY2NlbnQtNCB7XG4gIGJhY2tncm91bmQ6ICM3ZmU3ZmY7XG4gIC8qIFRoZSBGYWxsYmFjayAqL1xuICBiYWNrZ3JvdW5kOiByZ2JhKDEyNywgMjMxLCAyNTUsIDAuNik7XG59XG5cbi50ZXh0LXdhcm5pbmcudGV4dC1saWdodGVuLTUge1xuICBjb2xvcjogI2ZmZTBjMyAhaW1wb3J0YW50O1xufVxuXG4uYmctd2FybmluZy5iZy1saWdodGVuLTUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZlMGMzICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItd2FybmluZy5ib3JkZXItbGlnaHRlbi01IHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2ZmZTBjMyAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXRvcC13YXJuaW5nLmJvcmRlci10b3AtbGlnaHRlbi01IHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNmZmUwYzMgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1ib3R0b20td2FybmluZy5ib3JkZXItYm90dG9tLWxpZ2h0ZW4tNSB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZmZlMGMzICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItbGVmdC13YXJuaW5nLmJvcmRlci1sZWZ0LWxpZ2h0ZW4tNSB7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2ZmZTBjMyAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXJpZ2h0LXdhcm5pbmcuYm9yZGVyLXJpZ2h0LWxpZ2h0ZW4tNSB7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNmZmUwYzMgIWltcG9ydGFudDtcbn1cblxuLm92ZXJsYXktd2FybmluZy5vdmVybGF5LWxpZ2h0ZW4tNSB7XG4gIGJhY2tncm91bmQ6ICNmZmUwYzM7XG4gIC8qIFRoZSBGYWxsYmFjayAqL1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjI0LCAxOTUsIDAuNik7XG59XG5cbi50ZXh0LXdhcm5pbmcudGV4dC1saWdodGVuLTQge1xuICBjb2xvcjogI2ZmZDNhOSAhaW1wb3J0YW50O1xufVxuXG4uYmctd2FybmluZy5iZy1saWdodGVuLTQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZkM2E5ICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItd2FybmluZy5ib3JkZXItbGlnaHRlbi00IHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2ZmZDNhOSAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXRvcC13YXJuaW5nLmJvcmRlci10b3AtbGlnaHRlbi00IHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNmZmQzYTkgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1ib3R0b20td2FybmluZy5ib3JkZXItYm90dG9tLWxpZ2h0ZW4tNCB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZmZkM2E5ICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItbGVmdC13YXJuaW5nLmJvcmRlci1sZWZ0LWxpZ2h0ZW4tNCB7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2ZmZDNhOSAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXJpZ2h0LXdhcm5pbmcuYm9yZGVyLXJpZ2h0LWxpZ2h0ZW4tNCB7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNmZmQzYTkgIWltcG9ydGFudDtcbn1cblxuLm92ZXJsYXktd2FybmluZy5vdmVybGF5LWxpZ2h0ZW4tNCB7XG4gIGJhY2tncm91bmQ6ICNmZmQzYTk7XG4gIC8qIFRoZSBGYWxsYmFjayAqL1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjExLCAxNjksIDAuNik7XG59XG5cbi50ZXh0LXdhcm5pbmcudGV4dC1saWdodGVuLTMge1xuICBjb2xvcjogI2ZmYzY5MCAhaW1wb3J0YW50O1xufVxuXG4uYmctd2FybmluZy5iZy1saWdodGVuLTMge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZjNjkwICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItd2FybmluZy5ib3JkZXItbGlnaHRlbi0zIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2ZmYzY5MCAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXRvcC13YXJuaW5nLmJvcmRlci10b3AtbGlnaHRlbi0zIHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNmZmM2OTAgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1ib3R0b20td2FybmluZy5ib3JkZXItYm90dG9tLWxpZ2h0ZW4tMyB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZmZjNjkwICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItbGVmdC13YXJuaW5nLmJvcmRlci1sZWZ0LWxpZ2h0ZW4tMyB7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2ZmYzY5MCAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXJpZ2h0LXdhcm5pbmcuYm9yZGVyLXJpZ2h0LWxpZ2h0ZW4tMyB7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNmZmM2OTAgIWltcG9ydGFudDtcbn1cblxuLm92ZXJsYXktd2FybmluZy5vdmVybGF5LWxpZ2h0ZW4tMyB7XG4gIGJhY2tncm91bmQ6ICNmZmM2OTA7XG4gIC8qIFRoZSBGYWxsYmFjayAqL1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMTk4LCAxNDQsIDAuNik7XG59XG5cbi50ZXh0LXdhcm5pbmcudGV4dC1saWdodGVuLTIge1xuICBjb2xvcjogI2ZmYjk3NiAhaW1wb3J0YW50O1xufVxuXG4uYmctd2FybmluZy5iZy1saWdodGVuLTIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZiOTc2ICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItd2FybmluZy5ib3JkZXItbGlnaHRlbi0yIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2ZmYjk3NiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXRvcC13YXJuaW5nLmJvcmRlci10b3AtbGlnaHRlbi0yIHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNmZmI5NzYgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1ib3R0b20td2FybmluZy5ib3JkZXItYm90dG9tLWxpZ2h0ZW4tMiB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZmZiOTc2ICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItbGVmdC13YXJuaW5nLmJvcmRlci1sZWZ0LWxpZ2h0ZW4tMiB7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2ZmYjk3NiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXJpZ2h0LXdhcm5pbmcuYm9yZGVyLXJpZ2h0LWxpZ2h0ZW4tMiB7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNmZmI5NzYgIWltcG9ydGFudDtcbn1cblxuLm92ZXJsYXktd2FybmluZy5vdmVybGF5LWxpZ2h0ZW4tMiB7XG4gIGJhY2tncm91bmQ6ICNmZmI5NzY7XG4gIC8qIFRoZSBGYWxsYmFjayAqL1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMTg1LCAxMTgsIDAuNik7XG59XG5cbi50ZXh0LXdhcm5pbmcudGV4dC1saWdodGVuLTEge1xuICBjb2xvcjogI2ZmYWM1ZCAhaW1wb3J0YW50O1xufVxuXG4uYmctd2FybmluZy5iZy1saWdodGVuLTEge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZhYzVkICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItd2FybmluZy5ib3JkZXItbGlnaHRlbi0xIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2ZmYWM1ZCAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXRvcC13YXJuaW5nLmJvcmRlci10b3AtbGlnaHRlbi0xIHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNmZmFjNWQgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1ib3R0b20td2FybmluZy5ib3JkZXItYm90dG9tLWxpZ2h0ZW4tMSB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZmZhYzVkICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItbGVmdC13YXJuaW5nLmJvcmRlci1sZWZ0LWxpZ2h0ZW4tMSB7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2ZmYWM1ZCAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXJpZ2h0LXdhcm5pbmcuYm9yZGVyLXJpZ2h0LWxpZ2h0ZW4tMSB7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNmZmFjNWQgIWltcG9ydGFudDtcbn1cblxuLm92ZXJsYXktd2FybmluZy5vdmVybGF5LWxpZ2h0ZW4tMSB7XG4gIGJhY2tncm91bmQ6ICNmZmFjNWQ7XG4gIC8qIFRoZSBGYWxsYmFjayAqL1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMTcyLCA5MywgMC42KTtcbn1cblxuLmJnLXdhcm5pbmcge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmY5ZjQzICFpbXBvcnRhbnQ7XG59XG4uYmctd2FybmluZyAuY2FyZC1oZWFkZXIsXG4uYmctd2FybmluZyAuY2FyZC1mb290ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cblxuLmFsZXJ0LXdhcm5pbmcge1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMTU5LCA2NywgMC4xMikgIWltcG9ydGFudDtcbiAgY29sb3I6ICNmZjlmNDMgIWltcG9ydGFudDtcbn1cbi5hbGVydC13YXJuaW5nIC5hbGVydC1oZWFkaW5nIHtcbiAgYm94LXNoYWRvdzogcmdiYSgyNTUsIDE1OSwgNjcsIDAuNCkgMHB4IDZweCAxNXB4IC03cHg7XG59XG4uYWxlcnQtd2FybmluZyAuYWxlcnQtbGluayB7XG4gIGNvbG9yOiAjZmY5MjJhICFpbXBvcnRhbnQ7XG59XG4uYWxlcnQtd2FybmluZyAuY2xvc2Uge1xuICBjb2xvcjogI2ZmOWY0MyAhaW1wb3J0YW50O1xufVxuXG4uYmctbGlnaHQtd2FybmluZyB7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAxNTksIDY3LCAwLjEyKSAhaW1wb3J0YW50O1xuICBjb2xvcjogI2ZmOWY0MyAhaW1wb3J0YW50O1xufVxuLmJnLWxpZ2h0LXdhcm5pbmcuZmMtaC1ldmVudCwgLmJnLWxpZ2h0LXdhcm5pbmcuZmMtdi1ldmVudCB7XG4gIGJvcmRlci1jb2xvcjogcmdiYSgyNTUsIDE1OSwgNjcsIDAuMSk7XG59XG4uYmctbGlnaHQtd2FybmluZyAuZmMtbGlzdC1ldmVudC1kb3QsXG4uYmctbGlnaHQtd2FybmluZyAuZmMtZGF5Z3JpZC1ldmVudC1kb3Qge1xuICBib3JkZXItY29sb3I6ICNmZjlmNDMgIWltcG9ydGFudDtcbn1cbi5iZy1saWdodC13YXJuaW5nLmZjLWxpc3QtZXZlbnQ6aG92ZXIgdGQge1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMTU5LCA2NywgMC4xKSAhaW1wb3J0YW50O1xufVxuLmJnLWxpZ2h0LXdhcm5pbmcuZmMtbGlzdC1ldmVudCAuZmMtbGlzdC1ldmVudC10aXRsZSB7XG4gIGNvbG9yOiAjNmU2YjdiO1xufVxuXG4uYXZhdGFyLmJnLWxpZ2h0LXdhcm5pbmcge1xuICBjb2xvcjogI2ZmOWY0MyAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXdhcm5pbmcge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZmY5ZjQzICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItdG9wLXdhcm5pbmcge1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI2ZmOWY0Mztcbn1cblxuLmJvcmRlci1ib3R0b20td2FybmluZyB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZmY5ZjQzO1xufVxuXG4uYm9yZGVyLWxlZnQtd2FybmluZyB7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2ZmOWY0Mztcbn1cblxuLmJvcmRlci1yaWdodC13YXJuaW5nIHtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2ZmOWY0Mztcbn1cblxuLmJnLXdhcm5pbmcuYmFkZ2UtZ2xvdyxcbi5ib3JkZXItd2FybmluZy5iYWRnZS1nbG93LFxuLmJhZGdlLXdhcm5pbmcuYmFkZ2UtZ2xvdyB7XG4gIGJveC1zaGFkb3c6IDBweCAwcHggMTBweCAjZmY5ZjQzO1xufVxuXG4uYmFkZ2UuYmFkZ2UtbGlnaHQtd2FybmluZyB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAxNTksIDY3LCAwLjEyKTtcbiAgY29sb3I6ICNmZjlmNDMgIWltcG9ydGFudDtcbn1cblxuLm92ZXJsYXktd2FybmluZyB7XG4gIGJhY2tncm91bmQ6ICNmZjlmNDM7XG4gIC8qIFRoZSBGYWxsYmFjayAqL1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMTU5LCA2NywgMC42KTtcbn1cblxuLmJ0bi13YXJuaW5nIHtcbiAgYm9yZGVyLWNvbG9yOiAjZmY5ZjQzICFpbXBvcnRhbnQ7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZjlmNDMgIWltcG9ydGFudDtcbiAgY29sb3I6ICNmZmYgIWltcG9ydGFudDtcbn1cbi5idG4td2FybmluZzpmb2N1cywgLmJ0bi13YXJuaW5nOmFjdGl2ZSwgLmJ0bi13YXJuaW5nLmFjdGl2ZSB7XG4gIGNvbG9yOiAjZmZmO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmY5MjJhICFpbXBvcnRhbnQ7XG59XG4uYnRuLXdhcm5pbmc6aG92ZXI6bm90KC5kaXNhYmxlZCk6bm90KDpkaXNhYmxlZCkge1xuICBib3gtc2hhZG93OiAwIDhweCAyNXB4IC04cHggI2ZmOWY0Mztcbn1cbi5idG4td2FybmluZzpub3QoOmRpc2FibGVkKTpub3QoLmRpc2FibGVkKTphY3RpdmU6Zm9jdXMge1xuICBib3gtc2hhZG93OiBub25lO1xufVxuXG4uYnRuLWZsYXQtd2FybmluZyB7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogI2ZmOWY0Mztcbn1cbi5idG4tZmxhdC13YXJuaW5nOmhvdmVyIHtcbiAgY29sb3I6ICNmZjlmNDM7XG59XG4uYnRuLWZsYXQtd2FybmluZzpob3Zlcjpub3QoLmRpc2FibGVkKTpub3QoOmRpc2FibGVkKSB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAxNTksIDY3LCAwLjEyKTtcbn1cbi5idG4tZmxhdC13YXJuaW5nOmFjdGl2ZSwgLmJ0bi1mbGF0LXdhcm5pbmcuYWN0aXZlLCAuYnRuLWZsYXQtd2FybmluZzpmb2N1cyB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAxNTksIDY3LCAwLjIpO1xuICBjb2xvcjogI2ZmOWY0Mztcbn1cbi5idG4tZmxhdC13YXJuaW5nLmRyb3Bkb3duLXRvZ2dsZTo6YWZ0ZXIge1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCJkYXRhOmltYWdlL3N2Zyt4bWwsJTNDc3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgdmlld0JveD0nMCAwIDI0IDI0JyBmaWxsPSdub25lJyBzdHJva2U9JyUyM2ZmOWY0Mycgc3Ryb2tlLXdpZHRoPScyJyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnIGNsYXNzPSdmZWF0aGVyIGZlYXRoZXItY2hldnJvbi1kb3duJyUzRSUzQ3BvbHlsaW5lIHBvaW50cz0nNiA5IDEyIDE1IDE4IDknJTNFJTNDL3BvbHlsaW5lJTNFJTNDL3N2ZyUzRVwiKTtcbn1cblxuLmJ0bi1yZWxpZWYtd2FybmluZyB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZjlmNDM7XG4gIGJveC1zaGFkb3c6IGluc2V0IDAgLTNweCAwIDAgcmdiYSgzNCwgNDEsIDQ3LCAwLjIpO1xuICBjb2xvcjogI2ZmZjtcbiAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZTtcbn1cbi5idG4tcmVsaWVmLXdhcm5pbmc6aG92ZXI6bm90KC5kaXNhYmxlZCk6bm90KDpkaXNhYmxlZCkge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZhYzVkO1xufVxuLmJ0bi1yZWxpZWYtd2FybmluZzphY3RpdmUsIC5idG4tcmVsaWVmLXdhcm5pbmcuYWN0aXZlLCAuYnRuLXJlbGllZi13YXJuaW5nOmZvY3VzIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmOTIyYTtcbn1cbi5idG4tcmVsaWVmLXdhcm5pbmc6aG92ZXIge1xuICBjb2xvcjogI2ZmZjtcbn1cbi5idG4tcmVsaWVmLXdhcm5pbmc6YWN0aXZlLCAuYnRuLXJlbGllZi13YXJuaW5nLmFjdGl2ZSB7XG4gIG91dGxpbmU6IG5vbmU7XG4gIGJveC1zaGFkb3c6IG5vbmU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgzcHgpO1xufVxuXG4uYnRuLW91dGxpbmUtd2FybmluZyB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNmZjlmNDMgIWltcG9ydGFudDtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAjZmY5ZjQzO1xufVxuLmJ0bi1vdXRsaW5lLXdhcm5pbmc6aG92ZXI6bm90KC5kaXNhYmxlZCk6bm90KDpkaXNhYmxlZCkge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMTU5LCA2NywgMC4wNCk7XG4gIGNvbG9yOiAjZmY5ZjQzO1xufVxuLmJ0bi1vdXRsaW5lLXdhcm5pbmc6bm90KDpkaXNhYmxlZCk6bm90KC5kaXNhYmxlZCk6YWN0aXZlOmZvY3VzIHtcbiAgYm94LXNoYWRvdzogbm9uZTtcbn1cbi5idG4tb3V0bGluZS13YXJuaW5nOm5vdCg6ZGlzYWJsZWQpOm5vdCguZGlzYWJsZWQpOmFjdGl2ZSwgLmJ0bi1vdXRsaW5lLXdhcm5pbmc6bm90KDpkaXNhYmxlZCk6bm90KC5kaXNhYmxlZCkuYWN0aXZlLCAuYnRuLW91dGxpbmUtd2FybmluZzpub3QoOmRpc2FibGVkKTpub3QoLmRpc2FibGVkKTpmb2N1cyB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAxNTksIDY3LCAwLjIpO1xuICBjb2xvcjogI2ZmOWY0Mztcbn1cbi5idG4tb3V0bGluZS13YXJuaW5nLmRyb3Bkb3duLXRvZ2dsZTo6YWZ0ZXIge1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCJkYXRhOmltYWdlL3N2Zyt4bWwsJTNDc3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgdmlld0JveD0nMCAwIDI0IDI0JyBmaWxsPSdub25lJyBzdHJva2U9JyUyM2ZmOWY0Mycgc3Ryb2tlLXdpZHRoPScyJyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnIGNsYXNzPSdmZWF0aGVyIGZlYXRoZXItY2hldnJvbi1kb3duJyUzRSUzQ3BvbHlsaW5lIHBvaW50cz0nNiA5IDEyIDE1IDE4IDknJTNFJTNDL3BvbHlsaW5lJTNFJTNDL3N2ZyUzRVwiKTtcbn1cbi5zaG93ID4gLmJ0bi1vdXRsaW5lLXdhcm5pbmcuZHJvcGRvd24tdG9nZ2xlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDE1OSwgNjcsIDAuMik7XG4gIGNvbG9yOiAjZmY5ZjQzO1xufVxuXG4uYnRuLW91dGxpbmUtd2FybmluZy53YXZlcy1lZmZlY3QgLndhdmVzLXJpcHBsZSxcbi5idG4tZmxhdC13YXJuaW5nLndhdmVzLWVmZmVjdCAud2F2ZXMtcmlwcGxlIHtcbiAgYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KHJnYmEoMjU1LCAxNTksIDY3LCAwLjIpIDAsIHJnYmEoMjU1LCAxNTksIDY3LCAwLjMpIDQwJSwgcmdiYSgyNTUsIDE1OSwgNjcsIDAuNCkgNTAlLCByZ2JhKDI1NSwgMTU5LCA2NywgMC41KSA2MCUsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMCkgNzAlKTtcbn1cblxuLmJ1bGxldC5idWxsZXQtd2FybmluZyB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZjlmNDM7XG59XG5cbi5tb2RhbC5tb2RhbC13YXJuaW5nIC5tb2RhbC1oZWFkZXIgLm1vZGFsLXRpdGxlIHtcbiAgY29sb3I6ICNmZjlmNDM7XG59XG4ubW9kYWwubW9kYWwtd2FybmluZyAubW9kYWwtaGVhZGVyIC5jbG9zZSB7XG4gIGNvbG9yOiAjZmY5ZjQzICFpbXBvcnRhbnQ7XG59XG5cbi5wYWdpbmF0aW9uLXdhcm5pbmcgLnBhZ2UtaXRlbS5hY3RpdmUgLnBhZ2UtbGluayB7XG4gIGJhY2tncm91bmQ6ICNmZjlmNDMgIWltcG9ydGFudDtcbiAgY29sb3I6ICNmZmY7XG59XG4ucGFnaW5hdGlvbi13YXJuaW5nIC5wYWdlLWl0ZW0uYWN0aXZlIC5wYWdlLWxpbms6aG92ZXIge1xuICBjb2xvcjogI2ZmZjtcbn1cbi5wYWdpbmF0aW9uLXdhcm5pbmcgLnBhZ2UtaXRlbSAucGFnZS1saW5rOmhvdmVyIHtcbiAgY29sb3I6ICNmZjlmNDM7XG59XG4ucGFnaW5hdGlvbi13YXJuaW5nIC5wYWdlLWl0ZW0ucHJldi1pdGVtIC5wYWdlLWxpbms6aG92ZXIsIC5wYWdpbmF0aW9uLXdhcm5pbmcgLnBhZ2UtaXRlbS5uZXh0LWl0ZW0gLnBhZ2UtbGluazpob3ZlciB7XG4gIGJhY2tncm91bmQ6ICNmZjlmNDM7XG4gIGNvbG9yOiAjZmZmO1xufVxuLnBhZ2luYXRpb24td2FybmluZyAucGFnZS1pdGVtLm5leHQtaXRlbSAucGFnZS1saW5rOmFjdGl2ZTphZnRlciwgLnBhZ2luYXRpb24td2FybmluZyAucGFnZS1pdGVtLm5leHQtaXRlbSAucGFnZS1saW5rOmhvdmVyOmFmdGVyLCAucGFnaW5hdGlvbi13YXJuaW5nIC5wYWdlLWl0ZW0ubmV4dCAucGFnZS1saW5rOmFjdGl2ZTphZnRlciwgLnBhZ2luYXRpb24td2FybmluZyAucGFnZS1pdGVtLm5leHQgLnBhZ2UtbGluazpob3ZlcjphZnRlciB7XG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcImRhdGE6aW1hZ2Uvc3ZnK3htbCwlM0NzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB2aWV3Qm94PScwIDAgMjQgMjQnIGZpbGw9J25vbmUnIHN0cm9rZT0nJTIzZmY5ZjQzJyBzdHJva2Utd2lkdGg9JzInIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcgY2xhc3M9J2ZlYXRoZXIgZmVhdGhlci1jaGV2cm9uLXJpZ2h0JyUzRSUzQ3BvbHlsaW5lIHBvaW50cz0nOSAxOCAxNSAxMiA5IDYnJTNFJTNDL3BvbHlsaW5lJTNFJTNDL3N2ZyUzRVwiKSAhaW1wb3J0YW50O1xufVxuLnBhZ2luYXRpb24td2FybmluZyAucGFnZS1pdGVtLnByZXYtaXRlbSAucGFnZS1saW5rOmFjdGl2ZTpiZWZvcmUsIC5wYWdpbmF0aW9uLXdhcm5pbmcgLnBhZ2UtaXRlbS5wcmV2LWl0ZW0gLnBhZ2UtbGluazpob3ZlcjpiZWZvcmUsIC5wYWdpbmF0aW9uLXdhcm5pbmcgLnBhZ2UtaXRlbS5wcmV2IC5wYWdlLWxpbms6YWN0aXZlOmJlZm9yZSwgLnBhZ2luYXRpb24td2FybmluZyAucGFnZS1pdGVtLnByZXYgLnBhZ2UtbGluazpob3ZlcjpiZWZvcmUge1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCJkYXRhOmltYWdlL3N2Zyt4bWwsJTNDc3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgdmlld0JveD0nMCAwIDI0IDI0JyBmaWxsPSdub25lJyBzdHJva2U9JyUyM2ZmOWY0Mycgc3Ryb2tlLXdpZHRoPScyJyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnIGNsYXNzPSdmZWF0aGVyIGZlYXRoZXItY2hldnJvbi1sZWZ0JyUzRSUzQ3BvbHlsaW5lIHBvaW50cz0nMTUgMTggOSAxMiAxNSA2JyUzRSUzQy9wb2x5bGluZSUzRSUzQy9zdmclM0VcIikgIWltcG9ydGFudDtcbn1cblxuLm5hdi1waWxsLXdhcm5pbmcgLm5hdi1pdGVtIC5uYXYtbGluay5hY3RpdmUge1xuICBjb2xvcjogI2ZmZjtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmOWY0MyAhaW1wb3J0YW50O1xuICBib3JkZXItY29sb3I6ICNmZjlmNDM7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDE4cHggLTRweCByZ2JhKDI1NSwgMTU5LCA2NywgMC42NSk7XG59XG5cbi5wcm9ncmVzcy1iYXItd2FybmluZyB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAxNTksIDY3LCAwLjEyKTtcbn1cbi5wcm9ncmVzcy1iYXItd2FybmluZyAucHJvZ3Jlc3MtYmFyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmOWY0Mztcbn1cblxuLnRpbWVsaW5lIC50aW1lbGluZS1wb2ludC13YXJuaW5nIHtcbiAgYm9yZGVyLWNvbG9yOiAjZmY5ZjQzICFpbXBvcnRhbnQ7XG59XG4udGltZWxpbmUgLnRpbWVsaW5lLXBvaW50LXdhcm5pbmcgaSxcbi50aW1lbGluZSAudGltZWxpbmUtcG9pbnQtd2FybmluZyBzdmcge1xuICBzdHJva2U6ICNmZjlmNDMgIWltcG9ydGFudDtcbn1cbi50aW1lbGluZSAudGltZWxpbmUtcG9pbnQtd2FybmluZy50aW1lbGluZS1wb2ludC1pbmRpY2F0b3Ige1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmY5ZjQzICFpbXBvcnRhbnQ7XG59XG4udGltZWxpbmUgLnRpbWVsaW5lLXBvaW50LXdhcm5pbmcudGltZWxpbmUtcG9pbnQtaW5kaWNhdG9yOmJlZm9yZSB7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAxNTksIDY3LCAwLjEyKSAhaW1wb3J0YW50O1xufVxuXG4uZGl2aWRlci5kaXZpZGVyLXdhcm5pbmcgLmRpdmlkZXItdGV4dDpiZWZvcmUsIC5kaXZpZGVyLmRpdmlkZXItd2FybmluZyAuZGl2aWRlci10ZXh0OmFmdGVyIHtcbiAgYm9yZGVyLWNvbG9yOiAjZmY5ZjQzICFpbXBvcnRhbnQ7XG59XG5cbmlucHV0OmZvY3VzIH4gLmJnLXdhcm5pbmcge1xuICBib3gtc2hhZG93OiAwIDAgMCAwLjA3NXJlbSAjZmZmLCAwIDAgMCAwLjIxcmVtICNmZjlmNDMgIWltcG9ydGFudDtcbn1cblxuLmN1c3RvbS1jb250cm9sLXdhcm5pbmcgLmN1c3RvbS1jb250cm9sLWlucHV0OmNoZWNrZWQgfiAuY3VzdG9tLWNvbnRyb2wtbGFiZWw6OmJlZm9yZSxcbi5jdXN0b20tY29udHJvbC13YXJuaW5nIC5jdXN0b20tY29udHJvbC1pbnB1dDphY3RpdmUgfiAuY3VzdG9tLWNvbnRyb2wtbGFiZWw6OmJlZm9yZSB7XG4gIGJvcmRlci1jb2xvcjogI2ZmOWY0MztcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmOWY0Mztcbn1cbi5jdXN0b20tY29udHJvbC13YXJuaW5nLmN1c3RvbS1jaGVja2JveCAuY3VzdG9tLWNvbnRyb2wtaW5wdXQ6Y2hlY2tlZCB+IC5jdXN0b20tY29udHJvbC1sYWJlbDo6YmVmb3JlLFxuLmN1c3RvbS1jb250cm9sLXdhcm5pbmcuY3VzdG9tLWNoZWNrYm94IC5jdXN0b20tY29udHJvbC1pbnB1dDphY3RpdmUgfiAuY3VzdG9tLWNvbnRyb2wtbGFiZWw6OmJlZm9yZSxcbi5jdXN0b20tY29udHJvbC13YXJuaW5nLmN1c3RvbS1jaGVja2JveCAuY3VzdG9tLWNvbnRyb2wtaW5wdXQ6Zm9jdXMgfiAuY3VzdG9tLWNvbnRyb2wtbGFiZWw6OmJlZm9yZSwgLmN1c3RvbS1jb250cm9sLXdhcm5pbmcuY3VzdG9tLXJhZGlvIC5jdXN0b20tY29udHJvbC1pbnB1dDpjaGVja2VkIH4gLmN1c3RvbS1jb250cm9sLWxhYmVsOjpiZWZvcmUsXG4uY3VzdG9tLWNvbnRyb2wtd2FybmluZy5jdXN0b20tcmFkaW8gLmN1c3RvbS1jb250cm9sLWlucHV0OmFjdGl2ZSB+IC5jdXN0b20tY29udHJvbC1sYWJlbDo6YmVmb3JlLFxuLmN1c3RvbS1jb250cm9sLXdhcm5pbmcuY3VzdG9tLXJhZGlvIC5jdXN0b20tY29udHJvbC1pbnB1dDpmb2N1cyB+IC5jdXN0b20tY29udHJvbC1sYWJlbDo6YmVmb3JlIHtcbiAgYm94LXNoYWRvdzogMCAycHggNHB4IDAgcmdiYSgyNTUsIDE1OSwgNjcsIDAuNCkgIWltcG9ydGFudDtcbn1cbi5jdXN0b20tY29udHJvbC13YXJuaW5nIC5jdXN0b20tY29udHJvbC1pbnB1dDpkaXNhYmxlZDpjaGVja2VkIH4gLmN1c3RvbS1jb250cm9sLWxhYmVsOjpiZWZvcmUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMTU5LCA2NywgMC42NSkgIWltcG9ydGFudDtcbiAgYm9yZGVyOiBub25lO1xuICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XG59XG4uY3VzdG9tLWNvbnRyb2wtd2FybmluZyAuY3VzdG9tLWNvbnRyb2wtaW5wdXQ6Zm9jdXMgfiAuY3VzdG9tLWNvbnRyb2wtbGFiZWw6OmJlZm9yZSB7XG4gIGJvcmRlci1jb2xvcjogI2ZmOWY0MyAhaW1wb3J0YW50O1xufVxuXG4uY3VzdG9tLXN3aXRjaC13YXJuaW5nIC5jdXN0b20tY29udHJvbC1pbnB1dDpjaGVja2VkIH4gLmN1c3RvbS1jb250cm9sLWxhYmVsOjpiZWZvcmUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmY5ZjQzICFpbXBvcnRhbnQ7XG4gIGNvbG9yOiAjZmZmO1xuICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlLW91dDtcbn1cblxuLnNlbGVjdDItd2FybmluZyAuc2VsZWN0Mi1jb250YWluZXItLWRlZmF1bHQgLnNlbGVjdDItc2VsZWN0aW9uLS1tdWx0aXBsZSAuc2VsZWN0Mi1zZWxlY3Rpb25fX2Nob2ljZSB7XG4gIGJhY2tncm91bmQ6ICNmZjlmNDMgIWltcG9ydGFudDtcbiAgYm9yZGVyLWNvbG9yOiAjZmY5ZjQzICFpbXBvcnRhbnQ7XG59XG5cbi50ZXh0LXdhcm5pbmcudGV4dC1kYXJrZW4tMSB7XG4gIGNvbG9yOiAjZmY5MjJhICFpbXBvcnRhbnQ7XG59XG5cbi5iZy13YXJuaW5nLmJnLWRhcmtlbi0xIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmOTIyYSAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXdhcm5pbmcuYm9yZGVyLWRhcmtlbi0xIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2ZmOTIyYSAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXRvcC13YXJuaW5nLmJvcmRlci10b3AtZGFya2VuLTEge1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI2ZmOTIyYSAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWJvdHRvbS13YXJuaW5nLmJvcmRlci1ib3R0b20tZGFya2VuLTEge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2ZmOTIyYSAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWxlZnQtd2FybmluZy5ib3JkZXItbGVmdC1kYXJrZW4tMSB7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2ZmOTIyYSAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXJpZ2h0LXdhcm5pbmcuYm9yZGVyLXJpZ2h0LWRhcmtlbi0xIHtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2ZmOTIyYSAhaW1wb3J0YW50O1xufVxuXG4ub3ZlcmxheS13YXJuaW5nLm92ZXJsYXktZGFya2VuLTEge1xuICBiYWNrZ3JvdW5kOiAjZmY5MjJhO1xuICAvKiBUaGUgRmFsbGJhY2sgKi9cbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDE0NiwgNDIsIDAuNik7XG59XG5cbi50ZXh0LXdhcm5pbmcudGV4dC1kYXJrZW4tMiB7XG4gIGNvbG9yOiAjZmY4NTEwICFpbXBvcnRhbnQ7XG59XG5cbi5iZy13YXJuaW5nLmJnLWRhcmtlbi0yIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmODUxMCAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXdhcm5pbmcuYm9yZGVyLWRhcmtlbi0yIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2ZmODUxMCAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXRvcC13YXJuaW5nLmJvcmRlci10b3AtZGFya2VuLTIge1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI2ZmODUxMCAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWJvdHRvbS13YXJuaW5nLmJvcmRlci1ib3R0b20tZGFya2VuLTIge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2ZmODUxMCAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWxlZnQtd2FybmluZy5ib3JkZXItbGVmdC1kYXJrZW4tMiB7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2ZmODUxMCAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXJpZ2h0LXdhcm5pbmcuYm9yZGVyLXJpZ2h0LWRhcmtlbi0yIHtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2ZmODUxMCAhaW1wb3J0YW50O1xufVxuXG4ub3ZlcmxheS13YXJuaW5nLm92ZXJsYXktZGFya2VuLTIge1xuICBiYWNrZ3JvdW5kOiAjZmY4NTEwO1xuICAvKiBUaGUgRmFsbGJhY2sgKi9cbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDEzMywgMTYsIDAuNik7XG59XG5cbi50ZXh0LXdhcm5pbmcudGV4dC1kYXJrZW4tMyB7XG4gIGNvbG9yOiAjZjY3ODAwICFpbXBvcnRhbnQ7XG59XG5cbi5iZy13YXJuaW5nLmJnLWRhcmtlbi0zIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y2NzgwMCAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXdhcm5pbmcuYm9yZGVyLWRhcmtlbi0zIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2Y2NzgwMCAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXRvcC13YXJuaW5nLmJvcmRlci10b3AtZGFya2VuLTMge1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI2Y2NzgwMCAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWJvdHRvbS13YXJuaW5nLmJvcmRlci1ib3R0b20tZGFya2VuLTMge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2Y2NzgwMCAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWxlZnQtd2FybmluZy5ib3JkZXItbGVmdC1kYXJrZW4tMyB7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2Y2NzgwMCAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXJpZ2h0LXdhcm5pbmcuYm9yZGVyLXJpZ2h0LWRhcmtlbi0zIHtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2Y2NzgwMCAhaW1wb3J0YW50O1xufVxuXG4ub3ZlcmxheS13YXJuaW5nLm92ZXJsYXktZGFya2VuLTMge1xuICBiYWNrZ3JvdW5kOiAjZjY3ODAwO1xuICAvKiBUaGUgRmFsbGJhY2sgKi9cbiAgYmFja2dyb3VuZDogcmdiYSgyNDYsIDEyMCwgMCwgMC42KTtcbn1cblxuLnRleHQtd2FybmluZy50ZXh0LWRhcmtlbi00IHtcbiAgY29sb3I6ICNkYzZjMDAgIWltcG9ydGFudDtcbn1cblxuLmJnLXdhcm5pbmcuYmctZGFya2VuLTQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGM2YzAwICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItd2FybmluZy5ib3JkZXItZGFya2VuLTQge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGM2YzAwICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItdG9wLXdhcm5pbmcuYm9yZGVyLXRvcC1kYXJrZW4tNCB7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZGM2YzAwICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItYm90dG9tLXdhcm5pbmcuYm9yZGVyLWJvdHRvbS1kYXJrZW4tNCB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZGM2YzAwICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItbGVmdC13YXJuaW5nLmJvcmRlci1sZWZ0LWRhcmtlbi00IHtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjZGM2YzAwICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItcmlnaHQtd2FybmluZy5ib3JkZXItcmlnaHQtZGFya2VuLTQge1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjZGM2YzAwICFpbXBvcnRhbnQ7XG59XG5cbi5vdmVybGF5LXdhcm5pbmcub3ZlcmxheS1kYXJrZW4tNCB7XG4gIGJhY2tncm91bmQ6ICNkYzZjMDA7XG4gIC8qIFRoZSBGYWxsYmFjayAqL1xuICBiYWNrZ3JvdW5kOiByZ2JhKDIyMCwgMTA4LCAwLCAwLjYpO1xufVxuXG4udGV4dC13YXJuaW5nLnRleHQtYWNjZW50LTEge1xuICBjb2xvcjogI2ZmZjVlZiAhaW1wb3J0YW50O1xufVxuXG4uYmctd2FybmluZy5iZy1hY2NlbnQtMSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY1ZWYgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci13YXJuaW5nLmJvcmRlci1hY2NlbnQtMSB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNmZmY1ZWYgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci10b3Atd2FybmluZy5ib3JkZXItdG9wLWFjY2VudC0xIHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNmZmY1ZWYgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1ib3R0b20td2FybmluZy5ib3JkZXItYm90dG9tLWFjY2VudC0xIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNmZmY1ZWYgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1sZWZ0LXdhcm5pbmcuYm9yZGVyLWxlZnQtYWNjZW50LTEge1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICNmZmY1ZWYgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1yaWdodC13YXJuaW5nLmJvcmRlci1yaWdodC1hY2NlbnQtMSB7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNmZmY1ZWYgIWltcG9ydGFudDtcbn1cblxuLm92ZXJsYXktd2FybmluZy5vdmVybGF5LWFjY2VudC0xIHtcbiAgYmFja2dyb3VuZDogI2ZmZjVlZjtcbiAgLyogVGhlIEZhbGxiYWNrICovXG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNDUsIDIzOSwgMC42KTtcbn1cblxuLnRleHQtd2FybmluZy50ZXh0LWFjY2VudC0yIHtcbiAgY29sb3I6ICNmZmU1ZDggIWltcG9ydGFudDtcbn1cblxuLmJnLXdhcm5pbmcuYmctYWNjZW50LTIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZlNWQ4ICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItd2FybmluZy5ib3JkZXItYWNjZW50LTIge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZmZlNWQ4ICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItdG9wLXdhcm5pbmcuYm9yZGVyLXRvcC1hY2NlbnQtMiB7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZmZlNWQ4ICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItYm90dG9tLXdhcm5pbmcuYm9yZGVyLWJvdHRvbS1hY2NlbnQtMiB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZmZlNWQ4ICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItbGVmdC13YXJuaW5nLmJvcmRlci1sZWZ0LWFjY2VudC0yIHtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjZmZlNWQ4ICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItcmlnaHQtd2FybmluZy5ib3JkZXItcmlnaHQtYWNjZW50LTIge1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjZmZlNWQ4ICFpbXBvcnRhbnQ7XG59XG5cbi5vdmVybGF5LXdhcm5pbmcub3ZlcmxheS1hY2NlbnQtMiB7XG4gIGJhY2tncm91bmQ6ICNmZmU1ZDg7XG4gIC8qIFRoZSBGYWxsYmFjayAqL1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjI5LCAyMTYsIDAuNik7XG59XG5cbi50ZXh0LXdhcm5pbmcudGV4dC1hY2NlbnQtMyB7XG4gIGNvbG9yOiAjZmZmNmYzICFpbXBvcnRhbnQ7XG59XG5cbi5iZy13YXJuaW5nLmJnLWFjY2VudC0zIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjZmMyAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXdhcm5pbmcuYm9yZGVyLWFjY2VudC0zIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2ZmZjZmMyAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXRvcC13YXJuaW5nLmJvcmRlci10b3AtYWNjZW50LTMge1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI2ZmZjZmMyAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWJvdHRvbS13YXJuaW5nLmJvcmRlci1ib3R0b20tYWNjZW50LTMge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2ZmZjZmMyAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWxlZnQtd2FybmluZy5ib3JkZXItbGVmdC1hY2NlbnQtMyB7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2ZmZjZmMyAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXJpZ2h0LXdhcm5pbmcuYm9yZGVyLXJpZ2h0LWFjY2VudC0zIHtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2ZmZjZmMyAhaW1wb3J0YW50O1xufVxuXG4ub3ZlcmxheS13YXJuaW5nLm92ZXJsYXktYWNjZW50LTMge1xuICBiYWNrZ3JvdW5kOiAjZmZmNmYzO1xuICAvKiBUaGUgRmFsbGJhY2sgKi9cbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI0NiwgMjQzLCAwLjYpO1xufVxuXG4udGV4dC13YXJuaW5nLnRleHQtYWNjZW50LTQge1xuICBjb2xvcjogI2ZmZTNkYSAhaW1wb3J0YW50O1xufVxuXG4uYmctd2FybmluZy5iZy1hY2NlbnQtNCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmUzZGEgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci13YXJuaW5nLmJvcmRlci1hY2NlbnQtNCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNmZmUzZGEgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci10b3Atd2FybmluZy5ib3JkZXItdG9wLWFjY2VudC00IHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNmZmUzZGEgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1ib3R0b20td2FybmluZy5ib3JkZXItYm90dG9tLWFjY2VudC00IHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNmZmUzZGEgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1sZWZ0LXdhcm5pbmcuYm9yZGVyLWxlZnQtYWNjZW50LTQge1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICNmZmUzZGEgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1yaWdodC13YXJuaW5nLmJvcmRlci1yaWdodC1hY2NlbnQtNCB7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNmZmUzZGEgIWltcG9ydGFudDtcbn1cblxuLm92ZXJsYXktd2FybmluZy5vdmVybGF5LWFjY2VudC00IHtcbiAgYmFja2dyb3VuZDogI2ZmZTNkYTtcbiAgLyogVGhlIEZhbGxiYWNrICovXG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyMjcsIDIxOCwgMC42KTtcbn1cblxuLnRleHQtZGFuZ2VyLnRleHQtbGlnaHRlbi01IHtcbiAgY29sb3I6ICNmZjgwODAgIWltcG9ydGFudDtcbn1cblxuLmJnLWRhbmdlci5iZy1saWdodGVuLTUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmY4MDgwICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItZGFuZ2VyLmJvcmRlci1saWdodGVuLTUge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZmY4MDgwICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItdG9wLWRhbmdlci5ib3JkZXItdG9wLWxpZ2h0ZW4tNSB7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZmY4MDgwICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItYm90dG9tLWRhbmdlci5ib3JkZXItYm90dG9tLWxpZ2h0ZW4tNSB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZmY4MDgwICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItbGVmdC1kYW5nZXIuYm9yZGVyLWxlZnQtbGlnaHRlbi01IHtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjZmY4MDgwICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItcmlnaHQtZGFuZ2VyLmJvcmRlci1yaWdodC1saWdodGVuLTUge1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjZmY4MDgwICFpbXBvcnRhbnQ7XG59XG5cbi5vdmVybGF5LWRhbmdlci5vdmVybGF5LWxpZ2h0ZW4tNSB7XG4gIGJhY2tncm91bmQ6ICNmZjgwODA7XG4gIC8qIFRoZSBGYWxsYmFjayAqL1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMTI4LCAxMjgsIDAuNik7XG59XG5cbi50ZXh0LWRhbmdlci50ZXh0LWxpZ2h0ZW4tNCB7XG4gIGNvbG9yOiAjZmY2NjY2ICFpbXBvcnRhbnQ7XG59XG5cbi5iZy1kYW5nZXIuYmctbGlnaHRlbi00IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmNjY2NiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWRhbmdlci5ib3JkZXItbGlnaHRlbi00IHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2ZmNjY2NiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXRvcC1kYW5nZXIuYm9yZGVyLXRvcC1saWdodGVuLTQge1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI2ZmNjY2NiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWJvdHRvbS1kYW5nZXIuYm9yZGVyLWJvdHRvbS1saWdodGVuLTQge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2ZmNjY2NiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWxlZnQtZGFuZ2VyLmJvcmRlci1sZWZ0LWxpZ2h0ZW4tNCB7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2ZmNjY2NiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXJpZ2h0LWRhbmdlci5ib3JkZXItcmlnaHQtbGlnaHRlbi00IHtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2ZmNjY2NiAhaW1wb3J0YW50O1xufVxuXG4ub3ZlcmxheS1kYW5nZXIub3ZlcmxheS1saWdodGVuLTQge1xuICBiYWNrZ3JvdW5kOiAjZmY2NjY2O1xuICAvKiBUaGUgRmFsbGJhY2sgKi9cbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDEwMiwgMTAyLCAwLjYpO1xufVxuXG4udGV4dC1kYW5nZXIudGV4dC1saWdodGVuLTMge1xuICBjb2xvcjogI2ZmNGQ0ZCAhaW1wb3J0YW50O1xufVxuXG4uYmctZGFuZ2VyLmJnLWxpZ2h0ZW4tMyB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZjRkNGQgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1kYW5nZXIuYm9yZGVyLWxpZ2h0ZW4tMyB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNmZjRkNGQgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci10b3AtZGFuZ2VyLmJvcmRlci10b3AtbGlnaHRlbi0zIHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNmZjRkNGQgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1ib3R0b20tZGFuZ2VyLmJvcmRlci1ib3R0b20tbGlnaHRlbi0zIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNmZjRkNGQgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1sZWZ0LWRhbmdlci5ib3JkZXItbGVmdC1saWdodGVuLTMge1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICNmZjRkNGQgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1yaWdodC1kYW5nZXIuYm9yZGVyLXJpZ2h0LWxpZ2h0ZW4tMyB7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNmZjRkNGQgIWltcG9ydGFudDtcbn1cblxuLm92ZXJsYXktZGFuZ2VyLm92ZXJsYXktbGlnaHRlbi0zIHtcbiAgYmFja2dyb3VuZDogI2ZmNGQ0ZDtcbiAgLyogVGhlIEZhbGxiYWNrICovXG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCA3NywgNzcsIDAuNik7XG59XG5cbi50ZXh0LWRhbmdlci50ZXh0LWxpZ2h0ZW4tMiB7XG4gIGNvbG9yOiAjZmYzMzMzICFpbXBvcnRhbnQ7XG59XG5cbi5iZy1kYW5nZXIuYmctbGlnaHRlbi0yIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmMzMzMyAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWRhbmdlci5ib3JkZXItbGlnaHRlbi0yIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2ZmMzMzMyAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXRvcC1kYW5nZXIuYm9yZGVyLXRvcC1saWdodGVuLTIge1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI2ZmMzMzMyAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWJvdHRvbS1kYW5nZXIuYm9yZGVyLWJvdHRvbS1saWdodGVuLTIge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2ZmMzMzMyAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWxlZnQtZGFuZ2VyLmJvcmRlci1sZWZ0LWxpZ2h0ZW4tMiB7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2ZmMzMzMyAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXJpZ2h0LWRhbmdlci5ib3JkZXItcmlnaHQtbGlnaHRlbi0yIHtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2ZmMzMzMyAhaW1wb3J0YW50O1xufVxuXG4ub3ZlcmxheS1kYW5nZXIub3ZlcmxheS1saWdodGVuLTIge1xuICBiYWNrZ3JvdW5kOiAjZmYzMzMzO1xuICAvKiBUaGUgRmFsbGJhY2sgKi9cbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDUxLCA1MSwgMC42KTtcbn1cblxuLnRleHQtZGFuZ2VyLnRleHQtbGlnaHRlbi0xIHtcbiAgY29sb3I6ICNmZjFhMWEgIWltcG9ydGFudDtcbn1cblxuLmJnLWRhbmdlci5iZy1saWdodGVuLTEge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmYxYTFhICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItZGFuZ2VyLmJvcmRlci1saWdodGVuLTEge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZmYxYTFhICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItdG9wLWRhbmdlci5ib3JkZXItdG9wLWxpZ2h0ZW4tMSB7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZmYxYTFhICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItYm90dG9tLWRhbmdlci5ib3JkZXItYm90dG9tLWxpZ2h0ZW4tMSB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZmYxYTFhICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItbGVmdC1kYW5nZXIuYm9yZGVyLWxlZnQtbGlnaHRlbi0xIHtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjZmYxYTFhICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItcmlnaHQtZGFuZ2VyLmJvcmRlci1yaWdodC1saWdodGVuLTEge1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjZmYxYTFhICFpbXBvcnRhbnQ7XG59XG5cbi5vdmVybGF5LWRhbmdlci5vdmVybGF5LWxpZ2h0ZW4tMSB7XG4gIGJhY2tncm91bmQ6ICNmZjFhMWE7XG4gIC8qIFRoZSBGYWxsYmFjayAqL1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjYsIDI2LCAwLjYpO1xufVxuXG4uYmctZGFuZ2VyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmMDAwMCAhaW1wb3J0YW50O1xufVxuLmJnLWRhbmdlciAuY2FyZC1oZWFkZXIsXG4uYmctZGFuZ2VyIC5jYXJkLWZvb3RlciB7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xufVxuXG4uYWxlcnQtZGFuZ2VyIHtcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDAsIDAsIDAuMTIpICFpbXBvcnRhbnQ7XG4gIGNvbG9yOiAjZmYwMDAwICFpbXBvcnRhbnQ7XG59XG4uYWxlcnQtZGFuZ2VyIC5hbGVydC1oZWFkaW5nIHtcbiAgYm94LXNoYWRvdzogcmdiYSgyNTUsIDAsIDAsIDAuNCkgMHB4IDZweCAxNXB4IC03cHg7XG59XG4uYWxlcnQtZGFuZ2VyIC5hbGVydC1saW5rIHtcbiAgY29sb3I6ICNlNjAwMDAgIWltcG9ydGFudDtcbn1cbi5hbGVydC1kYW5nZXIgLmNsb3NlIHtcbiAgY29sb3I6ICNmZjAwMDAgIWltcG9ydGFudDtcbn1cblxuLmJnLWxpZ2h0LWRhbmdlciB7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAwLCAwLCAwLjEyKSAhaW1wb3J0YW50O1xuICBjb2xvcjogI2ZmMDAwMCAhaW1wb3J0YW50O1xufVxuLmJnLWxpZ2h0LWRhbmdlci5mYy1oLWV2ZW50LCAuYmctbGlnaHQtZGFuZ2VyLmZjLXYtZXZlbnQge1xuICBib3JkZXItY29sb3I6IHJnYmEoMjU1LCAwLCAwLCAwLjEpO1xufVxuLmJnLWxpZ2h0LWRhbmdlciAuZmMtbGlzdC1ldmVudC1kb3QsXG4uYmctbGlnaHQtZGFuZ2VyIC5mYy1kYXlncmlkLWV2ZW50LWRvdCB7XG4gIGJvcmRlci1jb2xvcjogI2ZmMDAwMCAhaW1wb3J0YW50O1xufVxuLmJnLWxpZ2h0LWRhbmdlci5mYy1saXN0LWV2ZW50OmhvdmVyIHRkIHtcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDAsIDAsIDAuMSkgIWltcG9ydGFudDtcbn1cbi5iZy1saWdodC1kYW5nZXIuZmMtbGlzdC1ldmVudCAuZmMtbGlzdC1ldmVudC10aXRsZSB7XG4gIGNvbG9yOiAjNmU2YjdiO1xufVxuXG4uYXZhdGFyLmJnLWxpZ2h0LWRhbmdlciB7XG4gIGNvbG9yOiAjZmYwMDAwICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItZGFuZ2VyIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2ZmMDAwMCAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXRvcC1kYW5nZXIge1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI2ZmMDAwMDtcbn1cblxuLmJvcmRlci1ib3R0b20tZGFuZ2VyIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNmZjAwMDA7XG59XG5cbi5ib3JkZXItbGVmdC1kYW5nZXIge1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICNmZjAwMDA7XG59XG5cbi5ib3JkZXItcmlnaHQtZGFuZ2VyIHtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2ZmMDAwMDtcbn1cblxuLmJnLWRhbmdlci5iYWRnZS1nbG93LFxuLmJvcmRlci1kYW5nZXIuYmFkZ2UtZ2xvdyxcbi5iYWRnZS1kYW5nZXIuYmFkZ2UtZ2xvdyB7XG4gIGJveC1zaGFkb3c6IDBweCAwcHggMTBweCAjZmYwMDAwO1xufVxuXG4uYmFkZ2UuYmFkZ2UtbGlnaHQtZGFuZ2VyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDAsIDAsIDAuMTIpO1xuICBjb2xvcjogI2ZmMDAwMCAhaW1wb3J0YW50O1xufVxuXG4ub3ZlcmxheS1kYW5nZXIge1xuICBiYWNrZ3JvdW5kOiAjZmYwMDAwO1xuICAvKiBUaGUgRmFsbGJhY2sgKi9cbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDAsIDAsIDAuNik7XG59XG5cbi5idG4tZGFuZ2VyIHtcbiAgYm9yZGVyLWNvbG9yOiAjZmYwMDAwICFpbXBvcnRhbnQ7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZjAwMDAgIWltcG9ydGFudDtcbiAgY29sb3I6ICNmZmYgIWltcG9ydGFudDtcbn1cbi5idG4tZGFuZ2VyOmZvY3VzLCAuYnRuLWRhbmdlcjphY3RpdmUsIC5idG4tZGFuZ2VyLmFjdGl2ZSB7XG4gIGNvbG9yOiAjZmZmO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTYwMDAwICFpbXBvcnRhbnQ7XG59XG4uYnRuLWRhbmdlcjpob3Zlcjpub3QoLmRpc2FibGVkKTpub3QoOmRpc2FibGVkKSB7XG4gIGJveC1zaGFkb3c6IDAgOHB4IDI1cHggLThweCByZWQ7XG59XG4uYnRuLWRhbmdlcjpub3QoOmRpc2FibGVkKTpub3QoLmRpc2FibGVkKTphY3RpdmU6Zm9jdXMge1xuICBib3gtc2hhZG93OiBub25lO1xufVxuXG4uYnRuLWZsYXQtZGFuZ2VyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAjZmYwMDAwO1xufVxuLmJ0bi1mbGF0LWRhbmdlcjpob3ZlciB7XG4gIGNvbG9yOiAjZmYwMDAwO1xufVxuLmJ0bi1mbGF0LWRhbmdlcjpob3Zlcjpub3QoLmRpc2FibGVkKTpub3QoOmRpc2FibGVkKSB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAwLCAwLCAwLjEyKTtcbn1cbi5idG4tZmxhdC1kYW5nZXI6YWN0aXZlLCAuYnRuLWZsYXQtZGFuZ2VyLmFjdGl2ZSwgLmJ0bi1mbGF0LWRhbmdlcjpmb2N1cyB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAwLCAwLCAwLjIpO1xuICBjb2xvcjogI2ZmMDAwMDtcbn1cbi5idG4tZmxhdC1kYW5nZXIuZHJvcGRvd24tdG9nZ2xlOjphZnRlciB7XG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcImRhdGE6aW1hZ2Uvc3ZnK3htbCwlM0NzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB2aWV3Qm94PScwIDAgMjQgMjQnIGZpbGw9J25vbmUnIHN0cm9rZT0nJTIzZmYwMDAwJyBzdHJva2Utd2lkdGg9JzInIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcgY2xhc3M9J2ZlYXRoZXIgZmVhdGhlci1jaGV2cm9uLWRvd24nJTNFJTNDcG9seWxpbmUgcG9pbnRzPSc2IDkgMTIgMTUgMTggOSclM0UlM0MvcG9seWxpbmUlM0UlM0Mvc3ZnJTNFXCIpO1xufVxuXG4uYnRuLXJlbGllZi1kYW5nZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmYwMDAwO1xuICBib3gtc2hhZG93OiBpbnNldCAwIC0zcHggMCAwIHJnYmEoMzQsIDQxLCA0NywgMC4yKTtcbiAgY29sb3I6ICNmZmY7XG4gIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2U7XG59XG4uYnRuLXJlbGllZi1kYW5nZXI6aG92ZXI6bm90KC5kaXNhYmxlZCk6bm90KDpkaXNhYmxlZCkge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmYxYTFhO1xufVxuLmJ0bi1yZWxpZWYtZGFuZ2VyOmFjdGl2ZSwgLmJ0bi1yZWxpZWYtZGFuZ2VyLmFjdGl2ZSwgLmJ0bi1yZWxpZWYtZGFuZ2VyOmZvY3VzIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U2MDAwMDtcbn1cbi5idG4tcmVsaWVmLWRhbmdlcjpob3ZlciB7XG4gIGNvbG9yOiAjZmZmO1xufVxuLmJ0bi1yZWxpZWYtZGFuZ2VyOmFjdGl2ZSwgLmJ0bi1yZWxpZWYtZGFuZ2VyLmFjdGl2ZSB7XG4gIG91dGxpbmU6IG5vbmU7XG4gIGJveC1zaGFkb3c6IG5vbmU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgzcHgpO1xufVxuXG4uYnRuLW91dGxpbmUtZGFuZ2VyIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2ZmMDAwMCAhaW1wb3J0YW50O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICNmZjAwMDA7XG59XG4uYnRuLW91dGxpbmUtZGFuZ2VyOmhvdmVyOm5vdCguZGlzYWJsZWQpOm5vdCg6ZGlzYWJsZWQpIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDAsIDAsIDAuMDQpO1xuICBjb2xvcjogI2ZmMDAwMDtcbn1cbi5idG4tb3V0bGluZS1kYW5nZXI6bm90KDpkaXNhYmxlZCk6bm90KC5kaXNhYmxlZCk6YWN0aXZlOmZvY3VzIHtcbiAgYm94LXNoYWRvdzogbm9uZTtcbn1cbi5idG4tb3V0bGluZS1kYW5nZXI6bm90KDpkaXNhYmxlZCk6bm90KC5kaXNhYmxlZCk6YWN0aXZlLCAuYnRuLW91dGxpbmUtZGFuZ2VyOm5vdCg6ZGlzYWJsZWQpOm5vdCguZGlzYWJsZWQpLmFjdGl2ZSwgLmJ0bi1vdXRsaW5lLWRhbmdlcjpub3QoOmRpc2FibGVkKTpub3QoLmRpc2FibGVkKTpmb2N1cyB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAwLCAwLCAwLjIpO1xuICBjb2xvcjogI2ZmMDAwMDtcbn1cbi5idG4tb3V0bGluZS1kYW5nZXIuZHJvcGRvd24tdG9nZ2xlOjphZnRlciB7XG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcImRhdGE6aW1hZ2Uvc3ZnK3htbCwlM0NzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB2aWV3Qm94PScwIDAgMjQgMjQnIGZpbGw9J25vbmUnIHN0cm9rZT0nJTIzZmYwMDAwJyBzdHJva2Utd2lkdGg9JzInIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcgY2xhc3M9J2ZlYXRoZXIgZmVhdGhlci1jaGV2cm9uLWRvd24nJTNFJTNDcG9seWxpbmUgcG9pbnRzPSc2IDkgMTIgMTUgMTggOSclM0UlM0MvcG9seWxpbmUlM0UlM0Mvc3ZnJTNFXCIpO1xufVxuLnNob3cgPiAuYnRuLW91dGxpbmUtZGFuZ2VyLmRyb3Bkb3duLXRvZ2dsZSB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAwLCAwLCAwLjIpO1xuICBjb2xvcjogI2ZmMDAwMDtcbn1cblxuLmJ0bi1vdXRsaW5lLWRhbmdlci53YXZlcy1lZmZlY3QgLndhdmVzLXJpcHBsZSxcbi5idG4tZmxhdC1kYW5nZXIud2F2ZXMtZWZmZWN0IC53YXZlcy1yaXBwbGUge1xuICBiYWNrZ3JvdW5kOiByYWRpYWwtZ3JhZGllbnQocmdiYSgyNTUsIDAsIDAsIDAuMikgMCwgcmdiYSgyNTUsIDAsIDAsIDAuMykgNDAlLCByZ2JhKDI1NSwgMCwgMCwgMC40KSA1MCUsIHJnYmEoMjU1LCAwLCAwLCAwLjUpIDYwJSwgcmdiYSgyNTUsIDI1NSwgMjU1LCAwKSA3MCUpO1xufVxuXG4uYnVsbGV0LmJ1bGxldC1kYW5nZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmYwMDAwO1xufVxuXG4ubW9kYWwubW9kYWwtZGFuZ2VyIC5tb2RhbC1oZWFkZXIgLm1vZGFsLXRpdGxlIHtcbiAgY29sb3I6ICNmZjAwMDA7XG59XG4ubW9kYWwubW9kYWwtZGFuZ2VyIC5tb2RhbC1oZWFkZXIgLmNsb3NlIHtcbiAgY29sb3I6ICNmZjAwMDAgIWltcG9ydGFudDtcbn1cblxuLnBhZ2luYXRpb24tZGFuZ2VyIC5wYWdlLWl0ZW0uYWN0aXZlIC5wYWdlLWxpbmsge1xuICBiYWNrZ3JvdW5kOiAjZmYwMDAwICFpbXBvcnRhbnQ7XG4gIGNvbG9yOiAjZmZmO1xufVxuLnBhZ2luYXRpb24tZGFuZ2VyIC5wYWdlLWl0ZW0uYWN0aXZlIC5wYWdlLWxpbms6aG92ZXIge1xuICBjb2xvcjogI2ZmZjtcbn1cbi5wYWdpbmF0aW9uLWRhbmdlciAucGFnZS1pdGVtIC5wYWdlLWxpbms6aG92ZXIge1xuICBjb2xvcjogI2ZmMDAwMDtcbn1cbi5wYWdpbmF0aW9uLWRhbmdlciAucGFnZS1pdGVtLnByZXYtaXRlbSAucGFnZS1saW5rOmhvdmVyLCAucGFnaW5hdGlvbi1kYW5nZXIgLnBhZ2UtaXRlbS5uZXh0LWl0ZW0gLnBhZ2UtbGluazpob3ZlciB7XG4gIGJhY2tncm91bmQ6ICNmZjAwMDA7XG4gIGNvbG9yOiAjZmZmO1xufVxuLnBhZ2luYXRpb24tZGFuZ2VyIC5wYWdlLWl0ZW0ubmV4dC1pdGVtIC5wYWdlLWxpbms6YWN0aXZlOmFmdGVyLCAucGFnaW5hdGlvbi1kYW5nZXIgLnBhZ2UtaXRlbS5uZXh0LWl0ZW0gLnBhZ2UtbGluazpob3ZlcjphZnRlciwgLnBhZ2luYXRpb24tZGFuZ2VyIC5wYWdlLWl0ZW0ubmV4dCAucGFnZS1saW5rOmFjdGl2ZTphZnRlciwgLnBhZ2luYXRpb24tZGFuZ2VyIC5wYWdlLWl0ZW0ubmV4dCAucGFnZS1saW5rOmhvdmVyOmFmdGVyIHtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiZGF0YTppbWFnZS9zdmcreG1sLCUzQ3N2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNCAyNCcgZmlsbD0nbm9uZScgc3Ryb2tlPSclMjNmZjAwMDAnIHN0cm9rZS13aWR0aD0nMicgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJyBjbGFzcz0nZmVhdGhlciBmZWF0aGVyLWNoZXZyb24tcmlnaHQnJTNFJTNDcG9seWxpbmUgcG9pbnRzPSc5IDE4IDE1IDEyIDkgNiclM0UlM0MvcG9seWxpbmUlM0UlM0Mvc3ZnJTNFXCIpICFpbXBvcnRhbnQ7XG59XG4ucGFnaW5hdGlvbi1kYW5nZXIgLnBhZ2UtaXRlbS5wcmV2LWl0ZW0gLnBhZ2UtbGluazphY3RpdmU6YmVmb3JlLCAucGFnaW5hdGlvbi1kYW5nZXIgLnBhZ2UtaXRlbS5wcmV2LWl0ZW0gLnBhZ2UtbGluazpob3ZlcjpiZWZvcmUsIC5wYWdpbmF0aW9uLWRhbmdlciAucGFnZS1pdGVtLnByZXYgLnBhZ2UtbGluazphY3RpdmU6YmVmb3JlLCAucGFnaW5hdGlvbi1kYW5nZXIgLnBhZ2UtaXRlbS5wcmV2IC5wYWdlLWxpbms6aG92ZXI6YmVmb3JlIHtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiZGF0YTppbWFnZS9zdmcreG1sLCUzQ3N2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNCAyNCcgZmlsbD0nbm9uZScgc3Ryb2tlPSclMjNmZjAwMDAnIHN0cm9rZS13aWR0aD0nMicgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJyBjbGFzcz0nZmVhdGhlciBmZWF0aGVyLWNoZXZyb24tbGVmdCclM0UlM0Nwb2x5bGluZSBwb2ludHM9JzE1IDE4IDkgMTIgMTUgNiclM0UlM0MvcG9seWxpbmUlM0UlM0Mvc3ZnJTNFXCIpICFpbXBvcnRhbnQ7XG59XG5cbi5uYXYtcGlsbC1kYW5nZXIgLm5hdi1pdGVtIC5uYXYtbGluay5hY3RpdmUge1xuICBjb2xvcjogI2ZmZjtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmMDAwMCAhaW1wb3J0YW50O1xuICBib3JkZXItY29sb3I6ICNmZjAwMDA7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDE4cHggLTRweCByZ2JhKDI1NSwgMCwgMCwgMC42NSk7XG59XG5cbi5wcm9ncmVzcy1iYXItZGFuZ2VyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDAsIDAsIDAuMTIpO1xufVxuLnByb2dyZXNzLWJhci1kYW5nZXIgLnByb2dyZXNzLWJhciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZjAwMDA7XG59XG5cbi50aW1lbGluZSAudGltZWxpbmUtcG9pbnQtZGFuZ2VyIHtcbiAgYm9yZGVyLWNvbG9yOiAjZmYwMDAwICFpbXBvcnRhbnQ7XG59XG4udGltZWxpbmUgLnRpbWVsaW5lLXBvaW50LWRhbmdlciBpLFxuLnRpbWVsaW5lIC50aW1lbGluZS1wb2ludC1kYW5nZXIgc3ZnIHtcbiAgc3Ryb2tlOiAjZmYwMDAwICFpbXBvcnRhbnQ7XG59XG4udGltZWxpbmUgLnRpbWVsaW5lLXBvaW50LWRhbmdlci50aW1lbGluZS1wb2ludC1pbmRpY2F0b3Ige1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmYwMDAwICFpbXBvcnRhbnQ7XG59XG4udGltZWxpbmUgLnRpbWVsaW5lLXBvaW50LWRhbmdlci50aW1lbGluZS1wb2ludC1pbmRpY2F0b3I6YmVmb3JlIHtcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDAsIDAsIDAuMTIpICFpbXBvcnRhbnQ7XG59XG5cbi5kaXZpZGVyLmRpdmlkZXItZGFuZ2VyIC5kaXZpZGVyLXRleHQ6YmVmb3JlLCAuZGl2aWRlci5kaXZpZGVyLWRhbmdlciAuZGl2aWRlci10ZXh0OmFmdGVyIHtcbiAgYm9yZGVyLWNvbG9yOiAjZmYwMDAwICFpbXBvcnRhbnQ7XG59XG5cbmlucHV0OmZvY3VzIH4gLmJnLWRhbmdlciB7XG4gIGJveC1zaGFkb3c6IDAgMCAwIDAuMDc1cmVtICNmZmYsIDAgMCAwIDAuMjFyZW0gI2ZmMDAwMCAhaW1wb3J0YW50O1xufVxuXG4uY3VzdG9tLWNvbnRyb2wtZGFuZ2VyIC5jdXN0b20tY29udHJvbC1pbnB1dDpjaGVja2VkIH4gLmN1c3RvbS1jb250cm9sLWxhYmVsOjpiZWZvcmUsXG4uY3VzdG9tLWNvbnRyb2wtZGFuZ2VyIC5jdXN0b20tY29udHJvbC1pbnB1dDphY3RpdmUgfiAuY3VzdG9tLWNvbnRyb2wtbGFiZWw6OmJlZm9yZSB7XG4gIGJvcmRlci1jb2xvcjogI2ZmMDAwMDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmMDAwMDtcbn1cbi5jdXN0b20tY29udHJvbC1kYW5nZXIuY3VzdG9tLWNoZWNrYm94IC5jdXN0b20tY29udHJvbC1pbnB1dDpjaGVja2VkIH4gLmN1c3RvbS1jb250cm9sLWxhYmVsOjpiZWZvcmUsXG4uY3VzdG9tLWNvbnRyb2wtZGFuZ2VyLmN1c3RvbS1jaGVja2JveCAuY3VzdG9tLWNvbnRyb2wtaW5wdXQ6YWN0aXZlIH4gLmN1c3RvbS1jb250cm9sLWxhYmVsOjpiZWZvcmUsXG4uY3VzdG9tLWNvbnRyb2wtZGFuZ2VyLmN1c3RvbS1jaGVja2JveCAuY3VzdG9tLWNvbnRyb2wtaW5wdXQ6Zm9jdXMgfiAuY3VzdG9tLWNvbnRyb2wtbGFiZWw6OmJlZm9yZSwgLmN1c3RvbS1jb250cm9sLWRhbmdlci5jdXN0b20tcmFkaW8gLmN1c3RvbS1jb250cm9sLWlucHV0OmNoZWNrZWQgfiAuY3VzdG9tLWNvbnRyb2wtbGFiZWw6OmJlZm9yZSxcbi5jdXN0b20tY29udHJvbC1kYW5nZXIuY3VzdG9tLXJhZGlvIC5jdXN0b20tY29udHJvbC1pbnB1dDphY3RpdmUgfiAuY3VzdG9tLWNvbnRyb2wtbGFiZWw6OmJlZm9yZSxcbi5jdXN0b20tY29udHJvbC1kYW5nZXIuY3VzdG9tLXJhZGlvIC5jdXN0b20tY29udHJvbC1pbnB1dDpmb2N1cyB+IC5jdXN0b20tY29udHJvbC1sYWJlbDo6YmVmb3JlIHtcbiAgYm94LXNoYWRvdzogMCAycHggNHB4IDAgcmdiYSgyNTUsIDAsIDAsIDAuNCkgIWltcG9ydGFudDtcbn1cbi5jdXN0b20tY29udHJvbC1kYW5nZXIgLmN1c3RvbS1jb250cm9sLWlucHV0OmRpc2FibGVkOmNoZWNrZWQgfiAuY3VzdG9tLWNvbnRyb2wtbGFiZWw6OmJlZm9yZSB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAwLCAwLCAwLjY1KSAhaW1wb3J0YW50O1xuICBib3JkZXI6IG5vbmU7XG4gIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcbn1cbi5jdXN0b20tY29udHJvbC1kYW5nZXIgLmN1c3RvbS1jb250cm9sLWlucHV0OmZvY3VzIH4gLmN1c3RvbS1jb250cm9sLWxhYmVsOjpiZWZvcmUge1xuICBib3JkZXItY29sb3I6ICNmZjAwMDAgIWltcG9ydGFudDtcbn1cblxuLmN1c3RvbS1zd2l0Y2gtZGFuZ2VyIC5jdXN0b20tY29udHJvbC1pbnB1dDpjaGVja2VkIH4gLmN1c3RvbS1jb250cm9sLWxhYmVsOjpiZWZvcmUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmYwMDAwICFpbXBvcnRhbnQ7XG4gIGNvbG9yOiAjZmZmO1xuICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlLW91dDtcbn1cblxuLnNlbGVjdDItZGFuZ2VyIC5zZWxlY3QyLWNvbnRhaW5lci0tZGVmYXVsdCAuc2VsZWN0Mi1zZWxlY3Rpb24tLW11bHRpcGxlIC5zZWxlY3QyLXNlbGVjdGlvbl9fY2hvaWNlIHtcbiAgYmFja2dyb3VuZDogI2ZmMDAwMCAhaW1wb3J0YW50O1xuICBib3JkZXItY29sb3I6ICNmZjAwMDAgIWltcG9ydGFudDtcbn1cblxuLnRleHQtZGFuZ2VyLnRleHQtZGFya2VuLTEge1xuICBjb2xvcjogI2U2MDAwMCAhaW1wb3J0YW50O1xufVxuXG4uYmctZGFuZ2VyLmJnLWRhcmtlbi0xIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U2MDAwMCAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWRhbmdlci5ib3JkZXItZGFya2VuLTEge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZTYwMDAwICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItdG9wLWRhbmdlci5ib3JkZXItdG9wLWRhcmtlbi0xIHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNlNjAwMDAgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1ib3R0b20tZGFuZ2VyLmJvcmRlci1ib3R0b20tZGFya2VuLTEge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2U2MDAwMCAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWxlZnQtZGFuZ2VyLmJvcmRlci1sZWZ0LWRhcmtlbi0xIHtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjZTYwMDAwICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItcmlnaHQtZGFuZ2VyLmJvcmRlci1yaWdodC1kYXJrZW4tMSB7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNlNjAwMDAgIWltcG9ydGFudDtcbn1cblxuLm92ZXJsYXktZGFuZ2VyLm92ZXJsYXktZGFya2VuLTEge1xuICBiYWNrZ3JvdW5kOiAjZTYwMDAwO1xuICAvKiBUaGUgRmFsbGJhY2sgKi9cbiAgYmFja2dyb3VuZDogcmdiYSgyMzAsIDAsIDAsIDAuNik7XG59XG5cbi50ZXh0LWRhbmdlci50ZXh0LWRhcmtlbi0yIHtcbiAgY29sb3I6ICNjYzAwMDAgIWltcG9ydGFudDtcbn1cblxuLmJnLWRhbmdlci5iZy1kYXJrZW4tMiB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNjYzAwMDAgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1kYW5nZXIuYm9yZGVyLWRhcmtlbi0yIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjMDAwMCAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXRvcC1kYW5nZXIuYm9yZGVyLXRvcC1kYXJrZW4tMiB7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjY2MwMDAwICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItYm90dG9tLWRhbmdlci5ib3JkZXItYm90dG9tLWRhcmtlbi0yIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjYzAwMDAgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1sZWZ0LWRhbmdlci5ib3JkZXItbGVmdC1kYXJrZW4tMiB7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2NjMDAwMCAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXJpZ2h0LWRhbmdlci5ib3JkZXItcmlnaHQtZGFya2VuLTIge1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjY2MwMDAwICFpbXBvcnRhbnQ7XG59XG5cbi5vdmVybGF5LWRhbmdlci5vdmVybGF5LWRhcmtlbi0yIHtcbiAgYmFja2dyb3VuZDogI2NjMDAwMDtcbiAgLyogVGhlIEZhbGxiYWNrICovXG4gIGJhY2tncm91bmQ6IHJnYmEoMjA0LCAwLCAwLCAwLjYpO1xufVxuXG4udGV4dC1kYW5nZXIudGV4dC1kYXJrZW4tMyB7XG4gIGNvbG9yOiAjYjMwMDAwICFpbXBvcnRhbnQ7XG59XG5cbi5iZy1kYW5nZXIuYmctZGFya2VuLTMge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYjMwMDAwICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItZGFuZ2VyLmJvcmRlci1kYXJrZW4tMyB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNiMzAwMDAgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci10b3AtZGFuZ2VyLmJvcmRlci10b3AtZGFya2VuLTMge1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI2IzMDAwMCAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWJvdHRvbS1kYW5nZXIuYm9yZGVyLWJvdHRvbS1kYXJrZW4tMyB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjYjMwMDAwICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItbGVmdC1kYW5nZXIuYm9yZGVyLWxlZnQtZGFya2VuLTMge1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICNiMzAwMDAgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1yaWdodC1kYW5nZXIuYm9yZGVyLXJpZ2h0LWRhcmtlbi0zIHtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2IzMDAwMCAhaW1wb3J0YW50O1xufVxuXG4ub3ZlcmxheS1kYW5nZXIub3ZlcmxheS1kYXJrZW4tMyB7XG4gIGJhY2tncm91bmQ6ICNiMzAwMDA7XG4gIC8qIFRoZSBGYWxsYmFjayAqL1xuICBiYWNrZ3JvdW5kOiByZ2JhKDE3OSwgMCwgMCwgMC42KTtcbn1cblxuLnRleHQtZGFuZ2VyLnRleHQtZGFya2VuLTQge1xuICBjb2xvcjogIzk5MDAwMCAhaW1wb3J0YW50O1xufVxuXG4uYmctZGFuZ2VyLmJnLWRhcmtlbi00IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzk5MDAwMCAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWRhbmdlci5ib3JkZXItZGFya2VuLTQge1xuICBib3JkZXI6IDFweCBzb2xpZCAjOTkwMDAwICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItdG9wLWRhbmdlci5ib3JkZXItdG9wLWRhcmtlbi00IHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM5OTAwMDAgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1ib3R0b20tZGFuZ2VyLmJvcmRlci1ib3R0b20tZGFya2VuLTQge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzk5MDAwMCAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWxlZnQtZGFuZ2VyLmJvcmRlci1sZWZ0LWRhcmtlbi00IHtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjOTkwMDAwICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItcmlnaHQtZGFuZ2VyLmJvcmRlci1yaWdodC1kYXJrZW4tNCB7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICM5OTAwMDAgIWltcG9ydGFudDtcbn1cblxuLm92ZXJsYXktZGFuZ2VyLm92ZXJsYXktZGFya2VuLTQge1xuICBiYWNrZ3JvdW5kOiAjOTkwMDAwO1xuICAvKiBUaGUgRmFsbGJhY2sgKi9cbiAgYmFja2dyb3VuZDogcmdiYSgxNTMsIDAsIDAsIDAuNik7XG59XG5cbi50ZXh0LWRhbmdlci50ZXh0LWFjY2VudC0xIHtcbiAgY29sb3I6ICNmZmVlZjEgIWltcG9ydGFudDtcbn1cblxuLmJnLWRhbmdlci5iZy1hY2NlbnQtMSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmVlZjEgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1kYW5nZXIuYm9yZGVyLWFjY2VudC0xIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2ZmZWVmMSAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXRvcC1kYW5nZXIuYm9yZGVyLXRvcC1hY2NlbnQtMSB7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZmZlZWYxICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItYm90dG9tLWRhbmdlci5ib3JkZXItYm90dG9tLWFjY2VudC0xIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNmZmVlZjEgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1sZWZ0LWRhbmdlci5ib3JkZXItbGVmdC1hY2NlbnQtMSB7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2ZmZWVmMSAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXJpZ2h0LWRhbmdlci5ib3JkZXItcmlnaHQtYWNjZW50LTEge1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjZmZlZWYxICFpbXBvcnRhbnQ7XG59XG5cbi5vdmVybGF5LWRhbmdlci5vdmVybGF5LWFjY2VudC0xIHtcbiAgYmFja2dyb3VuZDogI2ZmZWVmMTtcbiAgLyogVGhlIEZhbGxiYWNrICovXG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyMzgsIDI0MSwgMC42KTtcbn1cblxuLnRleHQtZGFuZ2VyLnRleHQtYWNjZW50LTIge1xuICBjb2xvcjogI2ZmZDZkYiAhaW1wb3J0YW50O1xufVxuXG4uYmctZGFuZ2VyLmJnLWFjY2VudC0yIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZDZkYiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWRhbmdlci5ib3JkZXItYWNjZW50LTIge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZmZkNmRiICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItdG9wLWRhbmdlci5ib3JkZXItdG9wLWFjY2VudC0yIHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNmZmQ2ZGIgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1ib3R0b20tZGFuZ2VyLmJvcmRlci1ib3R0b20tYWNjZW50LTIge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2ZmZDZkYiAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWxlZnQtZGFuZ2VyLmJvcmRlci1sZWZ0LWFjY2VudC0yIHtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjZmZkNmRiICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItcmlnaHQtZGFuZ2VyLmJvcmRlci1yaWdodC1hY2NlbnQtMiB7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNmZmQ2ZGIgIWltcG9ydGFudDtcbn1cblxuLm92ZXJsYXktZGFuZ2VyLm92ZXJsYXktYWNjZW50LTIge1xuICBiYWNrZ3JvdW5kOiAjZmZkNmRiO1xuICAvKiBUaGUgRmFsbGJhY2sgKi9cbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDIxNCwgMjE5LCAwLjYpO1xufVxuXG4udGV4dC1kYW5nZXIudGV4dC1hY2NlbnQtMyB7XG4gIGNvbG9yOiAjZmZlY2VlICFpbXBvcnRhbnQ7XG59XG5cbi5iZy1kYW5nZXIuYmctYWNjZW50LTMge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZlY2VlICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItZGFuZ2VyLmJvcmRlci1hY2NlbnQtMyB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNmZmVjZWUgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci10b3AtZGFuZ2VyLmJvcmRlci10b3AtYWNjZW50LTMge1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI2ZmZWNlZSAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLWJvdHRvbS1kYW5nZXIuYm9yZGVyLWJvdHRvbS1hY2NlbnQtMyB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZmZlY2VlICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItbGVmdC1kYW5nZXIuYm9yZGVyLWxlZnQtYWNjZW50LTMge1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICNmZmVjZWUgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1yaWdodC1kYW5nZXIuYm9yZGVyLXJpZ2h0LWFjY2VudC0zIHtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2ZmZWNlZSAhaW1wb3J0YW50O1xufVxuXG4ub3ZlcmxheS1kYW5nZXIub3ZlcmxheS1hY2NlbnQtMyB7XG4gIGJhY2tncm91bmQ6ICNmZmVjZWU7XG4gIC8qIFRoZSBGYWxsYmFjayAqL1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjM2LCAyMzgsIDAuNik7XG59XG5cbi50ZXh0LWRhbmdlci50ZXh0LWFjY2VudC00IHtcbiAgY29sb3I6ICNmZmQzZDcgIWltcG9ydGFudDtcbn1cblxuLmJnLWRhbmdlci5iZy1hY2NlbnQtNCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmQzZDcgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1kYW5nZXIuYm9yZGVyLWFjY2VudC00IHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2ZmZDNkNyAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXRvcC1kYW5nZXIuYm9yZGVyLXRvcC1hY2NlbnQtNCB7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZmZkM2Q3ICFpbXBvcnRhbnQ7XG59XG5cbi5ib3JkZXItYm90dG9tLWRhbmdlci5ib3JkZXItYm90dG9tLWFjY2VudC00IHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNmZmQzZDcgIWltcG9ydGFudDtcbn1cblxuLmJvcmRlci1sZWZ0LWRhbmdlci5ib3JkZXItbGVmdC1hY2NlbnQtNCB7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2ZmZDNkNyAhaW1wb3J0YW50O1xufVxuXG4uYm9yZGVyLXJpZ2h0LWRhbmdlci5ib3JkZXItcmlnaHQtYWNjZW50LTQge1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjZmZkM2Q3ICFpbXBvcnRhbnQ7XG59XG5cbi5vdmVybGF5LWRhbmdlci5vdmVybGF5LWFjY2VudC00IHtcbiAgYmFja2dyb3VuZDogI2ZmZDNkNztcbiAgLyogVGhlIEZhbGxiYWNrICovXG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyMTEsIDIxNSwgMC42KTtcbn1cblxuLmJnLWdyYWRpZW50LWRhcmssXG4uYnRuLWdyYWRpZW50LWRhcmsge1xuICBjb2xvcjogI2ZmZjtcbiAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZTtcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KDQ3ZGVnLCAjNGI0YjRiLCAjMWUxZTFlKTtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IHJlcGVhdC14O1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0O1xufVxuLmRhcmstbGF5b3V0IC5iZy1ncmFkaWVudC1kYXJrLFxuLmRhcmstbGF5b3V0IC5idG4tZ3JhZGllbnQtZGFyayB7XG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCg0N2RlZywgIzFlMWUxZSwgIzRiNGI0Yik7XG4gIGJhY2tncm91bmQtcmVwZWF0OiByZXBlYXQteDtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IHJlcGVhdDtcbn1cbi5iZy1ncmFkaWVudC1kYXJrOmhvdmVyLCAuYmctZ3JhZGllbnQtZGFyazphY3RpdmUsXG4uYnRuLWdyYWRpZW50LWRhcms6aG92ZXIsXG4uYnRuLWdyYWRpZW50LWRhcms6YWN0aXZlIHtcbiAgY29sb3I6ICNmZmY7XG59XG4uYmctZ3JhZGllbnQtZGFyazpob3Zlcjpub3QoLmRpc2FibGVkKTpub3QoOmRpc2FibGVkKSxcbi5idG4tZ3JhZGllbnQtZGFyazpob3Zlcjpub3QoLmRpc2FibGVkKTpub3QoOmRpc2FibGVkKSB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMnB4KTtcbn1cbi5iZy1ncmFkaWVudC1kYXJrOmFjdGl2ZSxcbi5idG4tZ3JhZGllbnQtZGFyazphY3RpdmUge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG59XG4uYmctZ3JhZGllbnQtZGFyazphY3RpdmUsIC5iZy1ncmFkaWVudC1kYXJrOmZvY3VzLFxuLmJ0bi1ncmFkaWVudC1kYXJrOmFjdGl2ZSxcbi5idG4tZ3JhZGllbnQtZGFyazpmb2N1cyB7XG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCg0N2RlZywgIzFlMWUxZSwgIzRiNGI0Yik7XG4gIGJhY2tncm91bmQtcmVwZWF0OiByZXBlYXQteDtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IHJlcGVhdDtcbn1cblxuLmJnLWdyYWRpZW50LXByaW1hcnksXG4uYnRuLWdyYWRpZW50LXByaW1hcnkge1xuICBjb2xvcjogI2ZmZjtcbiAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZTtcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KDQ3ZGVnLCAjQzIxODU4LCAjZTQyOTZmKTtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IHJlcGVhdC14O1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0O1xufVxuLmJnLWdyYWRpZW50LXByaW1hcnk6aG92ZXIsIC5iZy1ncmFkaWVudC1wcmltYXJ5OmFjdGl2ZSxcbi5idG4tZ3JhZGllbnQtcHJpbWFyeTpob3Zlcixcbi5idG4tZ3JhZGllbnQtcHJpbWFyeTphY3RpdmUge1xuICBjb2xvcjogI2ZmZjtcbn1cbi5iZy1ncmFkaWVudC1wcmltYXJ5OmhvdmVyOm5vdCguZGlzYWJsZWQpOm5vdCg6ZGlzYWJsZWQpLFxuLmJ0bi1ncmFkaWVudC1wcmltYXJ5OmhvdmVyOm5vdCguZGlzYWJsZWQpOm5vdCg6ZGlzYWJsZWQpIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0ycHgpO1xufVxuLmJnLWdyYWRpZW50LXByaW1hcnk6YWN0aXZlLFxuLmJ0bi1ncmFkaWVudC1wcmltYXJ5OmFjdGl2ZSB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbn1cbi5iZy1ncmFkaWVudC1wcmltYXJ5OmFjdGl2ZSwgLmJnLWdyYWRpZW50LXByaW1hcnk6Zm9jdXMsXG4uYnRuLWdyYWRpZW50LXByaW1hcnk6YWN0aXZlLFxuLmJ0bi1ncmFkaWVudC1wcmltYXJ5OmZvY3VzIHtcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KDQ3ZGVnLCAjOTUxMjQzLCAjQzIxODU4KTtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IHJlcGVhdC14O1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0O1xufVxuXG4uYmctZ3JhZGllbnQtc2Vjb25kYXJ5LFxuLmJ0bi1ncmFkaWVudC1zZWNvbmRhcnkge1xuICBjb2xvcjogI2ZmZjtcbiAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZTtcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KDQ3ZGVnLCAjODI4NjhiLCAjOWNhMGE0KTtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IHJlcGVhdC14O1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0O1xufVxuLmJnLWdyYWRpZW50LXNlY29uZGFyeTpob3ZlciwgLmJnLWdyYWRpZW50LXNlY29uZGFyeTphY3RpdmUsXG4uYnRuLWdyYWRpZW50LXNlY29uZGFyeTpob3Zlcixcbi5idG4tZ3JhZGllbnQtc2Vjb25kYXJ5OmFjdGl2ZSB7XG4gIGNvbG9yOiAjZmZmO1xufVxuLmJnLWdyYWRpZW50LXNlY29uZGFyeTpob3Zlcjpub3QoLmRpc2FibGVkKTpub3QoOmRpc2FibGVkKSxcbi5idG4tZ3JhZGllbnQtc2Vjb25kYXJ5OmhvdmVyOm5vdCguZGlzYWJsZWQpOm5vdCg6ZGlzYWJsZWQpIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0ycHgpO1xufVxuLmJnLWdyYWRpZW50LXNlY29uZGFyeTphY3RpdmUsXG4uYnRuLWdyYWRpZW50LXNlY29uZGFyeTphY3RpdmUge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG59XG4uYmctZ3JhZGllbnQtc2Vjb25kYXJ5OmFjdGl2ZSwgLmJnLWdyYWRpZW50LXNlY29uZGFyeTpmb2N1cyxcbi5idG4tZ3JhZGllbnQtc2Vjb25kYXJ5OmFjdGl2ZSxcbi5idG4tZ3JhZGllbnQtc2Vjb25kYXJ5OmZvY3VzIHtcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KDQ3ZGVnLCAjNjk2ZDcxLCAjODI4NjhiKTtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IHJlcGVhdC14O1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0O1xufVxuXG4uYmctZ3JhZGllbnQtc3VjY2Vzcyxcbi5idG4tZ3JhZGllbnQtc3VjY2VzcyB7XG4gIGNvbG9yOiAjZmZmO1xuICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlO1xuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQoNDdkZWcsICMyOGM3NmYsICM0OGRhODkpO1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0LXg7XG4gIGJhY2tncm91bmQtcmVwZWF0OiByZXBlYXQ7XG59XG4uYmctZ3JhZGllbnQtc3VjY2Vzczpob3ZlciwgLmJnLWdyYWRpZW50LXN1Y2Nlc3M6YWN0aXZlLFxuLmJ0bi1ncmFkaWVudC1zdWNjZXNzOmhvdmVyLFxuLmJ0bi1ncmFkaWVudC1zdWNjZXNzOmFjdGl2ZSB7XG4gIGNvbG9yOiAjZmZmO1xufVxuLmJnLWdyYWRpZW50LXN1Y2Nlc3M6aG92ZXI6bm90KC5kaXNhYmxlZCk6bm90KDpkaXNhYmxlZCksXG4uYnRuLWdyYWRpZW50LXN1Y2Nlc3M6aG92ZXI6bm90KC5kaXNhYmxlZCk6bm90KDpkaXNhYmxlZCkge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTJweCk7XG59XG4uYmctZ3JhZGllbnQtc3VjY2VzczphY3RpdmUsXG4uYnRuLWdyYWRpZW50LXN1Y2Nlc3M6YWN0aXZlIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xufVxuLmJnLWdyYWRpZW50LXN1Y2Nlc3M6YWN0aXZlLCAuYmctZ3JhZGllbnQtc3VjY2Vzczpmb2N1cyxcbi5idG4tZ3JhZGllbnQtc3VjY2VzczphY3RpdmUsXG4uYnRuLWdyYWRpZW50LXN1Y2Nlc3M6Zm9jdXMge1xuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQoNDdkZWcsICMxZjlkNTcsICMyOGM3NmYpO1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0LXg7XG4gIGJhY2tncm91bmQtcmVwZWF0OiByZXBlYXQ7XG59XG5cbi5iZy1ncmFkaWVudC1pbmZvLFxuLmJ0bi1ncmFkaWVudC1pbmZvIHtcbiAgY29sb3I6ICNmZmY7XG4gIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2U7XG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCg0N2RlZywgIzAwY2ZlOCwgIzFjZTdmZik7XG4gIGJhY2tncm91bmQtcmVwZWF0OiByZXBlYXQteDtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IHJlcGVhdDtcbn1cbi5iZy1ncmFkaWVudC1pbmZvOmhvdmVyLCAuYmctZ3JhZGllbnQtaW5mbzphY3RpdmUsXG4uYnRuLWdyYWRpZW50LWluZm86aG92ZXIsXG4uYnRuLWdyYWRpZW50LWluZm86YWN0aXZlIHtcbiAgY29sb3I6ICNmZmY7XG59XG4uYmctZ3JhZGllbnQtaW5mbzpob3Zlcjpub3QoLmRpc2FibGVkKTpub3QoOmRpc2FibGVkKSxcbi5idG4tZ3JhZGllbnQtaW5mbzpob3Zlcjpub3QoLmRpc2FibGVkKTpub3QoOmRpc2FibGVkKSB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMnB4KTtcbn1cbi5iZy1ncmFkaWVudC1pbmZvOmFjdGl2ZSxcbi5idG4tZ3JhZGllbnQtaW5mbzphY3RpdmUge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG59XG4uYmctZ3JhZGllbnQtaW5mbzphY3RpdmUsIC5iZy1ncmFkaWVudC1pbmZvOmZvY3VzLFxuLmJ0bi1ncmFkaWVudC1pbmZvOmFjdGl2ZSxcbi5idG4tZ3JhZGllbnQtaW5mbzpmb2N1cyB7XG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCg0N2RlZywgIzAwYTFiNSwgIzAwY2ZlOCk7XG4gIGJhY2tncm91bmQtcmVwZWF0OiByZXBlYXQteDtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IHJlcGVhdDtcbn1cblxuLmJnLWdyYWRpZW50LXdhcm5pbmcsXG4uYnRuLWdyYWRpZW50LXdhcm5pbmcge1xuICBjb2xvcjogI2ZmZjtcbiAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZTtcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KDQ3ZGVnLCAjZmY5ZjQzLCAjZmZiOTc2KTtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IHJlcGVhdC14O1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0O1xufVxuLmJnLWdyYWRpZW50LXdhcm5pbmc6aG92ZXIsIC5iZy1ncmFkaWVudC13YXJuaW5nOmFjdGl2ZSxcbi5idG4tZ3JhZGllbnQtd2FybmluZzpob3Zlcixcbi5idG4tZ3JhZGllbnQtd2FybmluZzphY3RpdmUge1xuICBjb2xvcjogI2ZmZjtcbn1cbi5iZy1ncmFkaWVudC13YXJuaW5nOmhvdmVyOm5vdCguZGlzYWJsZWQpOm5vdCg6ZGlzYWJsZWQpLFxuLmJ0bi1ncmFkaWVudC13YXJuaW5nOmhvdmVyOm5vdCguZGlzYWJsZWQpOm5vdCg6ZGlzYWJsZWQpIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0ycHgpO1xufVxuLmJnLWdyYWRpZW50LXdhcm5pbmc6YWN0aXZlLFxuLmJ0bi1ncmFkaWVudC13YXJuaW5nOmFjdGl2ZSB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbn1cbi5iZy1ncmFkaWVudC13YXJuaW5nOmFjdGl2ZSwgLmJnLWdyYWRpZW50LXdhcm5pbmc6Zm9jdXMsXG4uYnRuLWdyYWRpZW50LXdhcm5pbmc6YWN0aXZlLFxuLmJ0bi1ncmFkaWVudC13YXJuaW5nOmZvY3VzIHtcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KDQ3ZGVnLCAjZmY4NTEwLCAjZmY5ZjQzKTtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IHJlcGVhdC14O1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0O1xufVxuXG4uYmctZ3JhZGllbnQtZGFuZ2VyLFxuLmJ0bi1ncmFkaWVudC1kYW5nZXIge1xuICBjb2xvcjogI2ZmZjtcbiAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZTtcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KDQ3ZGVnLCAjZmYwMDAwLCAjZmYzMzMzKTtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IHJlcGVhdC14O1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0O1xufVxuLmJnLWdyYWRpZW50LWRhbmdlcjpob3ZlciwgLmJnLWdyYWRpZW50LWRhbmdlcjphY3RpdmUsXG4uYnRuLWdyYWRpZW50LWRhbmdlcjpob3Zlcixcbi5idG4tZ3JhZGllbnQtZGFuZ2VyOmFjdGl2ZSB7XG4gIGNvbG9yOiAjZmZmO1xufVxuLmJnLWdyYWRpZW50LWRhbmdlcjpob3Zlcjpub3QoLmRpc2FibGVkKTpub3QoOmRpc2FibGVkKSxcbi5idG4tZ3JhZGllbnQtZGFuZ2VyOmhvdmVyOm5vdCguZGlzYWJsZWQpOm5vdCg6ZGlzYWJsZWQpIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0ycHgpO1xufVxuLmJnLWdyYWRpZW50LWRhbmdlcjphY3RpdmUsXG4uYnRuLWdyYWRpZW50LWRhbmdlcjphY3RpdmUge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG59XG4uYmctZ3JhZGllbnQtZGFuZ2VyOmFjdGl2ZSwgLmJnLWdyYWRpZW50LWRhbmdlcjpmb2N1cyxcbi5idG4tZ3JhZGllbnQtZGFuZ2VyOmFjdGl2ZSxcbi5idG4tZ3JhZGllbnQtZGFuZ2VyOmZvY3VzIHtcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KDQ3ZGVnLCAjY2MwMDAwLCAjZmYwMDAwKTtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IHJlcGVhdC14O1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0O1xufVxuXG4ubmctc2VsZWN0Lm5nLXNlbGVjdC1mb2N1c2VkIHtcbiAgb3V0bGluZTogMDtcbiAgYm94LXNoYWRvdzogMCAzcHggMTBweCAwIHJnYmEoMzQsIDQxLCA0NywgMC4xKTtcbn1cbi5uZy1zZWxlY3Qubmctc2VsZWN0LWZvY3VzZWQgLm5nLXNlbGVjdC1jb250YWluZXIge1xuICBib3JkZXItY29sb3I6ICNDMjE4NTggIWltcG9ydGFudDtcbiAgei1pbmRleDogMjAwMCAhaW1wb3J0YW50O1xuICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XG4gIGNvbG9yOiAjNmU2YjdiICFpbXBvcnRhbnQ7XG4gIG1pbi1oZWlnaHQ6IDM4cHggIWltcG9ydGFudDtcbn1cbi5uZy1zZWxlY3QgLm5nLXNlbGVjdC1jb250YWluZXIge1xuICBjb2xvcjogIzZlNmI3YiAhaW1wb3J0YW50O1xuICBtaW4taGVpZ2h0OiAzOHB4ICFpbXBvcnRhbnQ7XG59XG4ubmctc2VsZWN0LmVycm9yIC5uZy1zZWxlY3QtY29udGFpbmVyIHtcbiAgYm9yZGVyLWNvbG9yOiAjZmYwMDAwICFpbXBvcnRhbnQ7XG59XG4ubmctc2VsZWN0Lm5nLXNlbGVjdC1tdWx0aXBsZSAubmctdmFsdWUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjQzIxODU4ICFpbXBvcnRhbnQ7XG4gIGNvbG9yOiAjZmZmO1xuICBib3JkZXI6IG5vbmUgIWltcG9ydGFudDtcbiAgZm9udC1zaXplOiAwLjhyZW0gIWltcG9ydGFudDtcbiAgYm9yZGVyLXJhZGl1czogNHB4ICFpbXBvcnRhbnQ7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4ubmctc2VsZWN0Lm5nLXNlbGVjdC1tdWx0aXBsZSAubmctdmFsdWUgLm5nLXZhbHVlLWljb24ucmlnaHQge1xuICBib3JkZXI6IDAgIWltcG9ydGFudDtcbn1cbi5uZy1zZWxlY3Qubmctc2VsZWN0LW11bHRpcGxlIC5uZy12YWx1ZSAubmctdmFsdWUtaWNvbi5sZWZ0IHtcbiAgYm9yZGVyOiAwICFpbXBvcnRhbnQ7XG59XG4ubmctc2VsZWN0Lm5nLXNlbGVjdC1tdWx0aXBsZSAubmctdmFsdWUgLm5nLXZhbHVlLWljb246aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xufVxuLm5nLXNlbGVjdC5uZy1zZWxlY3QtbXVsdGlwbGUgLm5nLXZhbHVlIC5uZy12YWx1ZS1pY29uLmxlZnQge1xuICBmb250LXNpemU6IDEuMXJlbSAhaW1wb3J0YW50O1xufVxuLm5nLXNlbGVjdC5uZy1zZWxlY3QtbXVsdGlwbGUgLm5nLXZhbHVlIC5uZy12YWx1ZS1pY29uLnJpZ2h0IHtcbiAgZm9udC1zaXplOiAxLjFyZW0gIWltcG9ydGFudDtcbn1cbi5uZy1zZWxlY3Qubmctc2VsZWN0LW11bHRpcGxlIC5uZy1zZWxlY3QtY29udGFpbmVyIC5uZy1wbGFjZWhvbGRlciB7XG4gIHRvcDogOHB4ICFpbXBvcnRhbnQ7XG59XG4ubmctc2VsZWN0Lm5nLXNlbGVjdC1zaXplLWxnIC5uZy1zZWxlY3QtY29udGFpbmVyIHtcbiAgbWluLWhlaWdodDogNDhweDtcbiAgZm9udC1zaXplOiAxLjJyZW0gIWltcG9ydGFudDtcbn1cbi5uZy1zZWxlY3Qubmctc2VsZWN0LXNpemUtbGcgLm5nLXNlbGVjdC1jb250YWluZXIgLm5nLXZhbHVlIHtcbiAgZm9udC1zaXplOiAxLjJyZW0gIWltcG9ydGFudDtcbiAgcGFkZGluZzogN3B4O1xufVxuLm5nLXNlbGVjdC5uZy1zZWxlY3Qtc2l6ZS1sZyAubmctc2VsZWN0LWNvbnRhaW5lciAubmctdmFsdWUgLm5nLXZhbHVlLWljb24ubGVmdCB7XG4gIGZvbnQtc2l6ZTogMS4xcmVtICFpbXBvcnRhbnQ7XG59XG4ubmctc2VsZWN0Lm5nLXNlbGVjdC1zaXplLWxnIC5uZy1zZWxlY3QtY29udGFpbmVyIC5uZy12YWx1ZSAubmctdmFsdWUtaWNvbi5yaWdodCB7XG4gIGZvbnQtc2l6ZTogMS4xcmVtICFpbXBvcnRhbnQ7XG59XG4ubmctc2VsZWN0Lm5nLXNlbGVjdC1zaXplLWxnIC5uZy1zZWxlY3QtY29udGFpbmVyIC5uZy1jbGVhci13cmFwcGVyIHtcbiAgaGVpZ2h0OiAyMnB4ICFpbXBvcnRhbnQ7XG59XG4ubmctc2VsZWN0Lm5nLXNlbGVjdC1zaXplLXNtIC5uZy1zZWxlY3QtY29udGFpbmVyIHtcbiAgbWluLWhlaWdodDogMjhweCAhaW1wb3J0YW50O1xuICBmb250LXNpemU6IDAuNzVyZW07XG59XG4ubmctc2VsZWN0Lm5nLXNlbGVjdC1zaXplLXNtIC5uZy1zZWxlY3QtY29udGFpbmVyIC5uZy12YWx1ZSB7XG4gIHBhZGRpbmc6IDBweDtcbiAgZm9udC1zaXplOiAwLjllbSAhaW1wb3J0YW50O1xufVxuLm5nLXNlbGVjdC5uZy1zZWxlY3Qtc2l6ZS1zbSAubmctc2VsZWN0LWNvbnRhaW5lciAubmctdmFsdWUgLm5nLXZhbHVlLWljb24ubGVmdCB7XG4gIGZvbnQtc2l6ZTogMC45ZW0gIWltcG9ydGFudDtcbn1cbi5uZy1zZWxlY3Qubmctc2VsZWN0LXNpemUtc20gLm5nLXNlbGVjdC1jb250YWluZXIgLm5nLXZhbHVlIC5uZy12YWx1ZS1pY29uLnJpZ2h0IHtcbiAgZm9udC1zaXplOiAwLjllbSAhaW1wb3J0YW50O1xufVxuLm5nLXNlbGVjdCAubmctb3B0aW9uLm5nLW9wdGlvbi1zZWxlY3RlZCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNDMjE4NTggIWltcG9ydGFudDtcbiAgY29sb3I6ICNmZmYgIWltcG9ydGFudDtcbn1cbi5uZy1zZWxlY3QgLm5nLW9wdGlvbi5uZy1vcHRpb24tc2VsZWN0ZWQubmctb3B0aW9uLW1hcmtlZCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNDMjE4NTggIWltcG9ydGFudDtcbiAgY29sb3I6ICNmZmYgIWltcG9ydGFudDtcbn1cbi5uZy1zZWxlY3QgLm5nLW9wdGlvbi5uZy1vcHRpb24tc2VsZWN0ZWQgLm5nLW9wdGlvbi1sYWJlbCB7XG4gIGZvbnQtd2VpZ2h0OiBpbmhlcml0ICFpbXBvcnRhbnQ7XG59XG4ubmctc2VsZWN0IC5uZy1vcHRpb24ubmctb3B0aW9uLW1hcmtlZCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTk0LCAyNCwgODgsIDAuMTIpICFpbXBvcnRhbnQ7XG4gIGNvbG9yOiAjQzIxODU4ICFpbXBvcnRhbnQ7XG59XG4ubmctc2VsZWN0IC5uZy1vcHRpb24ubmctb3B0aW9uLWRpc2FibGVkIHtcbiAgY29sb3I6ICNiOWI5YzMgIWltcG9ydGFudDtcbn1cbi5uZy1zZWxlY3QgLm5nLWFycm93IHtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFCb0FBQUFhQkFNQUFBQmJaRkg5QUFBQUcxQk1WRVVBQUFDUmtaR1JrWkdTa3BLUmtaR1NrcEtTa3BLUmtaR1JrWkhMc28rOUFBQUFDSFJTVGxNQSsxSm9XbzB2TEZRRG1ta0FBQUJsU1VSQlZCalRZNkFMU0FDVGJCQU9hek9Zc2dnQVV4RWRCa0NTdWFNVnhHR1g2QkFCVW80ZGpRVWdybUpIaHdGUXFrTUlySkpKb3FPWndhS2pVUUhJaGtnNmc2UWdnRVdpUTdDajBRSElna3BDcGFBNndicmdraUFwaEtTZ0FySlRYUmhvQmdCOUdSUHN3eXZCcUFBQUFBQkpSVTVFcmtKZ2dnPT1cIik7XG4gIGJhY2tncm91bmQtc2l6ZTogMTJweCAxMnB4LCAxMHB4IDEwcHg7XG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gIGhlaWdodDogMC44cmVtICFpbXBvcnRhbnQ7XG4gIHBhZGRpbmctcmlnaHQ6IDEuNXJlbTtcbiAgbWFyZ2luLWxlZnQ6IDA7XG4gIG1hcmdpbi10b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIGJvcmRlci1zdHlsZTogbm9uZSAhaW1wb3J0YW50O1xufVxuLm5nLXNlbGVjdC5uZy1zZWxlY3Qtb3BlbmVkID4gLm5nLXNlbGVjdC1jb250YWluZXIgLm5nLWFycm93IHtcbiAgdG9wOiAwcHggIWltcG9ydGFudDtcbn1cbi5uZy1zZWxlY3QgLm5nLWNsZWFyLXdyYXBwZXIge1xuICBoZWlnaHQ6IDE4cHg7XG59XG5cbi5kYXJrLWxheW91dCAubmctc2VsZWN0LWNvbnRhaW5lciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMyODMwNDY7XG4gIGJvcmRlci1jb2xvcjogIzNiNDI1MztcbiAgY29sb3I6ICM2NzZkN2Q7XG59XG4uZGFyay1sYXlvdXQgLm5nLXNlbGVjdC1jb250YWluZXIgLm5nLXBsYWNlaG9sZGVyIHtcbiAgY29sb3I6ICM2NzZkN2QgIWltcG9ydGFudDtcbn1cbi5kYXJrLWxheW91dCAubmctc2VsZWN0Lm5nLXNlbGVjdC1tdWx0aXBsZSAubmctdmFsdWUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDE5NCwgMjQsIDg4LCAwLjEyKSAhaW1wb3J0YW50O1xuICBjb2xvcjogI0MyMTg1OCAhaW1wb3J0YW50O1xufVxuLmRhcmstbGF5b3V0IC5uZy1kcm9wZG93bi1oZWFkZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTYxZDMxO1xuICBib3JkZXItY29sb3I6ICMzYjQyNTM7XG59XG4uZGFyay1sYXlvdXQgLm5nLWRyb3Bkb3duLWZvb3RlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMxNjFkMzE7XG4gIGJvcmRlci1jb2xvcjogIzNiNDI1Mztcbn1cbi5kYXJrLWxheW91dCAubmctc2VsZWN0Lm5nLXNlbGVjdC1vcGVuZWQgPiAubmctc2VsZWN0LWNvbnRhaW5lciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMxNjFkMzE7XG59XG4uZGFyay1sYXlvdXQgLm5nLW9wdGlvbiB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMyODMwNDYgIWltcG9ydGFudDtcbiAgY29sb3I6ICNiNGI3YmQgIWltcG9ydGFudDtcbn1cbi5kYXJrLWxheW91dCAubmctb3B0aW9uLm5nLW9wdGlvbi1kaXNhYmxlZCB7XG4gIGNvbG9yOiAjNjc2ZDdkICFpbXBvcnRhbnQ7XG59XG4uZGFyay1sYXlvdXQgbmctZHJvcGRvd24tcGFuZWwge1xuICBib3JkZXItY29sb3I6ICMzYjQyNTMgIWltcG9ydGFudDtcbn1cbi5kYXJrLWxheW91dCBuZy1kcm9wZG93bi1wYW5lbCAubmctZHJvcGRvd24tcGFuZWwtaXRlbXMge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTYxZDMxICFpbXBvcnRhbnQ7XG59XG4uZGFyay1sYXlvdXQgbmctZHJvcGRvd24tcGFuZWwgLm5nLWRyb3Bkb3duLXBhbmVsLWl0ZW1zIC5uZy1vcHRncm91cCB7XG4gIGNvbG9yOiAjNjc2ZDdkICFpbXBvcnRhbnQ7XG59IiwiQG1peGluIGJnLW9wYWNpdHkoJGNvbG9yLCAkb3BhY2l0eTogMSkge1xuICBiYWNrZ3JvdW5kOiAkY29sb3I7IC8qIFRoZSBGYWxsYmFjayAqL1xuICBiYWNrZ3JvdW5kOiByZ2JhKCRjb2xvciwgJG9wYWNpdHkpO1xufVxuIiwiLy8gT3ZlcnJpZGVzIHVzZXIgX3ZhcmlhYmxlcy1jb21wb25lbnRzXG5AaW1wb3J0ICcuLi8uLi9ib290c3RyYXAtZXh0ZW5kZWQvaW5jbHVkZSc7XG5cbi8vIEdvb2dsZSBDb2xvciBQYWxldHRlIGRlZmluZWQ6IGh0dHA6Ly93d3cuZ29vZ2xlLmNvbS9kZXNpZ24vc3BlYy9zdHlsZS9jb2xvci5odG1sXG5cbiR3aGl0ZS1jb2xvcjogKFxuICAnYmFzZSc6ICNmZmZmZmZcbik7XG4kYmxhY2stY29sb3I6IChcbiAgJ2Jhc2UnOiAjMDAwMDAwXG4pO1xuJGRhcmstY29sb3I6IChcbiAgJ2Jhc2UnOiB0aGVtZS1jb2xvcignZGFyaycpLFxuICAnZGFya2VuLTEnOiAjMzQzNDM0LFxuICAnZGFya2VuLTInOiAjMWUxZTFlLFxuICAnZGFya2VuLTMnOiAjNjI2MjYyXG4pO1xuJGxpZ2h0LWNvbG9yOiAoXG4gICdiYXNlJzogdGhlbWUtY29sb3IoJ2xpZ2h0Jylcbik7XG5cbiRwcmltYXJ5LWNvbG9yOiAoXG4gICdsaWdodGVuLTUnOiBsaWdodGVuKHRoZW1lLWNvbG9yKCdwcmltYXJ5JyksIDI1JSksXG4gICdsaWdodGVuLTQnOiBsaWdodGVuKHRoZW1lLWNvbG9yKCdwcmltYXJ5JyksIDIwJSksXG4gICdsaWdodGVuLTMnOiBsaWdodGVuKHRoZW1lLWNvbG9yKCdwcmltYXJ5JyksIDE1JSksXG4gICdsaWdodGVuLTInOiBsaWdodGVuKHRoZW1lLWNvbG9yKCdwcmltYXJ5JyksIDEwJSksXG4gICdsaWdodGVuLTEnOiBsaWdodGVuKHRoZW1lLWNvbG9yKCdwcmltYXJ5JyksIDUlKSxcbiAgJ2Jhc2UnOiB0aGVtZS1jb2xvcigncHJpbWFyeScpLFxuICAnZGFya2VuLTEnOiBkYXJrZW4odGhlbWUtY29sb3IoJ3ByaW1hcnknKSwgNSUpLFxuICAnZGFya2VuLTInOiBkYXJrZW4odGhlbWUtY29sb3IoJ3ByaW1hcnknKSwgMTAlKSxcbiAgJ2Rhcmtlbi0zJzogZGFya2VuKHRoZW1lLWNvbG9yKCdwcmltYXJ5JyksIDE1JSksXG4gICdkYXJrZW4tNCc6IGRhcmtlbih0aGVtZS1jb2xvcigncHJpbWFyeScpLCAyMCUpLFxuICAnYWNjZW50LTEnOiAjYmRmZGZmLFxuICAnYWNjZW50LTInOiAjOGFmYmZmLFxuICAnYWNjZW50LTMnOiAjNTdmYWZmLFxuICAnYWNjZW50LTQnOiAjM2RmOWZmXG4pO1xuJHNlY29uZGFyeS1jb2xvcjogKFxuICAnbGlnaHRlbi01JzogbGlnaHRlbih0aGVtZS1jb2xvcignc2Vjb25kYXJ5JyksIDI1JSksXG4gICdsaWdodGVuLTQnOiBsaWdodGVuKHRoZW1lLWNvbG9yKCdzZWNvbmRhcnknKSwgMjAlKSxcbiAgJ2xpZ2h0ZW4tMyc6IGxpZ2h0ZW4odGhlbWUtY29sb3IoJ3NlY29uZGFyeScpLCAxNSUpLFxuICAnbGlnaHRlbi0yJzogbGlnaHRlbih0aGVtZS1jb2xvcignc2Vjb25kYXJ5JyksIDEwJSksXG4gICdsaWdodGVuLTEnOiBsaWdodGVuKHRoZW1lLWNvbG9yKCdzZWNvbmRhcnknKSwgNSUpLFxuICAnYmFzZSc6IHRoZW1lLWNvbG9yKCdzZWNvbmRhcnknKSxcbiAgJ2Rhcmtlbi0xJzogZGFya2VuKHRoZW1lLWNvbG9yKCdzZWNvbmRhcnknKSwgNSUpLFxuICAnZGFya2VuLTInOiBkYXJrZW4odGhlbWUtY29sb3IoJ3NlY29uZGFyeScpLCAxMCUpLFxuICAnZGFya2VuLTMnOiBkYXJrZW4odGhlbWUtY29sb3IoJ3NlY29uZGFyeScpLCAxNSUpLFxuICAnZGFya2VuLTQnOiBkYXJrZW4odGhlbWUtY29sb3IoJ3NlY29uZGFyeScpLCAyMCUpXG4pO1xuJHN1Y2Nlc3MtY29sb3I6IChcbiAgJ2xpZ2h0ZW4tNSc6IGxpZ2h0ZW4odGhlbWUtY29sb3IoJ3N1Y2Nlc3MnKSwgMjUlKSxcbiAgJ2xpZ2h0ZW4tNCc6IGxpZ2h0ZW4odGhlbWUtY29sb3IoJ3N1Y2Nlc3MnKSwgMjAlKSxcbiAgJ2xpZ2h0ZW4tMyc6IGxpZ2h0ZW4odGhlbWUtY29sb3IoJ3N1Y2Nlc3MnKSwgMTUlKSxcbiAgJ2xpZ2h0ZW4tMic6IGxpZ2h0ZW4odGhlbWUtY29sb3IoJ3N1Y2Nlc3MnKSwgMTAlKSxcbiAgJ2xpZ2h0ZW4tMSc6IGxpZ2h0ZW4odGhlbWUtY29sb3IoJ3N1Y2Nlc3MnKSwgNSUpLFxuICAnYmFzZSc6IHRoZW1lLWNvbG9yKCdzdWNjZXNzJyksXG4gICdkYXJrZW4tMSc6IGRhcmtlbih0aGVtZS1jb2xvcignc3VjY2VzcycpLCA1JSksXG4gICdkYXJrZW4tMic6IGRhcmtlbih0aGVtZS1jb2xvcignc3VjY2VzcycpLCAxMCUpLFxuICAnZGFya2VuLTMnOiBkYXJrZW4odGhlbWUtY29sb3IoJ3N1Y2Nlc3MnKSwgMTUlKSxcbiAgJ2Rhcmtlbi00JzogZGFya2VuKHRoZW1lLWNvbG9yKCdzdWNjZXNzJyksIDIwJSksXG4gICdhY2NlbnQtMSc6ICNlMWZmZjEsXG4gICdhY2NlbnQtMic6ICNhZWZmZDksXG4gICdhY2NlbnQtMyc6ICM3YmZmYzEsXG4gICdhY2NlbnQtNCc6ICM2MmZmYjVcbik7XG4kaW5mby1jb2xvcjogKFxuICAnbGlnaHRlbi01JzogbGlnaHRlbih0aGVtZS1jb2xvcignaW5mbycpLCAyNSUpLFxuICAnbGlnaHRlbi00JzogbGlnaHRlbih0aGVtZS1jb2xvcignaW5mbycpLCAyMCUpLFxuICAnbGlnaHRlbi0zJzogbGlnaHRlbih0aGVtZS1jb2xvcignaW5mbycpLCAxNSUpLFxuICAnbGlnaHRlbi0yJzogbGlnaHRlbih0aGVtZS1jb2xvcignaW5mbycpLCAxMCUpLFxuICAnbGlnaHRlbi0xJzogbGlnaHRlbih0aGVtZS1jb2xvcignaW5mbycpLCA1JSksXG4gICdiYXNlJzogdGhlbWUtY29sb3IoJ2luZm8nKSxcbiAgJ2Rhcmtlbi0xJzogZGFya2VuKHRoZW1lLWNvbG9yKCdpbmZvJyksIDUlKSxcbiAgJ2Rhcmtlbi0yJzogZGFya2VuKHRoZW1lLWNvbG9yKCdpbmZvJyksIDEwJSksXG4gICdkYXJrZW4tMyc6IGRhcmtlbih0aGVtZS1jb2xvcignaW5mbycpLCAxNSUpLFxuICAnZGFya2VuLTQnOiBkYXJrZW4odGhlbWUtY29sb3IoJ2luZm8nKSwgMjAlKSxcbiAgJ2FjY2VudC0xJzogI2ZlZmZmZixcbiAgJ2FjY2VudC0yJzogI2NiZjVmZixcbiAgJ2FjY2VudC0zJzogIzk4ZWNmZixcbiAgJ2FjY2VudC00JzogIzdmZTdmZlxuKTtcbiR3YXJuaW5nLWNvbG9yOiAoXG4gICdsaWdodGVuLTUnOiBsaWdodGVuKHRoZW1lLWNvbG9yKCd3YXJuaW5nJyksIDI1JSksXG4gICdsaWdodGVuLTQnOiBsaWdodGVuKHRoZW1lLWNvbG9yKCd3YXJuaW5nJyksIDIwJSksXG4gICdsaWdodGVuLTMnOiBsaWdodGVuKHRoZW1lLWNvbG9yKCd3YXJuaW5nJyksIDE1JSksXG4gICdsaWdodGVuLTInOiBsaWdodGVuKHRoZW1lLWNvbG9yKCd3YXJuaW5nJyksIDEwJSksXG4gICdsaWdodGVuLTEnOiBsaWdodGVuKHRoZW1lLWNvbG9yKCd3YXJuaW5nJyksIDUlKSxcbiAgJ2Jhc2UnOiB0aGVtZS1jb2xvcignd2FybmluZycpLFxuICAnZGFya2VuLTEnOiBkYXJrZW4odGhlbWUtY29sb3IoJ3dhcm5pbmcnKSwgNSUpLFxuICAnZGFya2VuLTInOiBkYXJrZW4odGhlbWUtY29sb3IoJ3dhcm5pbmcnKSwgMTAlKSxcbiAgJ2Rhcmtlbi0zJzogZGFya2VuKHRoZW1lLWNvbG9yKCd3YXJuaW5nJyksIDE1JSksXG4gICdkYXJrZW4tNCc6IGRhcmtlbih0aGVtZS1jb2xvcignd2FybmluZycpLCAyMCUpLFxuICAnYWNjZW50LTEnOiAjZmZmNWVmLFxuICAnYWNjZW50LTInOiAjZmZlNWQ4LFxuICAnYWNjZW50LTMnOiAjZmZmNmYzLFxuICAnYWNjZW50LTQnOiAjZmZlM2RhXG4pO1xuJGRhbmdlci1jb2xvcjogKFxuICAnbGlnaHRlbi01JzogbGlnaHRlbih0aGVtZS1jb2xvcignZGFuZ2VyJyksIDI1JSksXG4gICdsaWdodGVuLTQnOiBsaWdodGVuKHRoZW1lLWNvbG9yKCdkYW5nZXInKSwgMjAlKSxcbiAgJ2xpZ2h0ZW4tMyc6IGxpZ2h0ZW4odGhlbWUtY29sb3IoJ2RhbmdlcicpLCAxNSUpLFxuICAnbGlnaHRlbi0yJzogbGlnaHRlbih0aGVtZS1jb2xvcignZGFuZ2VyJyksIDEwJSksXG4gICdsaWdodGVuLTEnOiBsaWdodGVuKHRoZW1lLWNvbG9yKCdkYW5nZXInKSwgNSUpLFxuICAnYmFzZSc6IHRoZW1lLWNvbG9yKCdkYW5nZXInKSxcbiAgJ2Rhcmtlbi0xJzogZGFya2VuKHRoZW1lLWNvbG9yKCdkYW5nZXInKSwgNSUpLFxuICAnZGFya2VuLTInOiBkYXJrZW4odGhlbWUtY29sb3IoJ2RhbmdlcicpLCAxMCUpLFxuICAnZGFya2VuLTMnOiBkYXJrZW4odGhlbWUtY29sb3IoJ2RhbmdlcicpLCAxNSUpLFxuICAnZGFya2VuLTQnOiBkYXJrZW4odGhlbWUtY29sb3IoJ2RhbmdlcicpLCAyMCUpLFxuICAnYWNjZW50LTEnOiAjZmZlZWYxLFxuICAnYWNjZW50LTInOiAjZmZkNmRiLFxuICAnYWNjZW50LTMnOiAjZmZlY2VlLFxuICAnYWNjZW50LTQnOiAjZmZkM2Q3XG4pO1xuXG4kY29sb3JzOiAoXG4gICd3aGl0ZSc6ICR3aGl0ZS1jb2xvcixcbiAgJ2JsYWNrJzogJGJsYWNrLWNvbG9yLFxuICAnZGFyayc6ICRkYXJrLWNvbG9yLFxuICAnbGlnaHQnOiAkbGlnaHQtY29sb3IsXG4gICdwcmltYXJ5JzogJHByaW1hcnktY29sb3IsXG4gICdzZWNvbmRhcnknOiAkc2Vjb25kYXJ5LWNvbG9yLFxuICAnc3VjY2Vzcyc6ICRzdWNjZXNzLWNvbG9yLFxuICAnaW5mbyc6ICRpbmZvLWNvbG9yLFxuICAnd2FybmluZyc6ICR3YXJuaW5nLWNvbG9yLFxuICAnZGFuZ2VyJzogJGRhbmdlci1jb2xvclxuKTtcbiIsIi8vIEZvciBhbGVydCdzIGhlYWRpbmcgYm94LXNoYWRvd1xuXG5AbWl4aW4gYWxlcnQtaGVhZGluZy1icygkY29sb3IpIHtcbiAgYm94LXNoYWRvdzogcmdiYSgkY29sb3IsIDAuNCkgMHB4IDZweCAxNXB4IC03cHg7XG59XG4iLCIvLyAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyAgRmlsZSBOYW1lOiB2YXJpYWJsZXMuc2Nzc1xuLy8gIERlc2NyaXB0aW9uOiBDdXN0b20gb3ZlcnJpZGVzIG9mIEJvb3RzdHJhcCB2YXJpYWJsZXNcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyAgSXRlbSBOYW1lOiBWdWV4eSAtIFZ1ZWpzLCBSZWFjdCwgQW5ndWxhciwgSFRNTCAmIExhcmF2ZWwgQWRtaW4gRGFzaGJvYXJkIFRlbXBsYXRlXG4vLyAgQXV0aG9yOiBQSVhJTlZFTlRcbi8vICBBdXRob3IgVVJMOiBodHRwOi8vd3d3LnRoZW1lZm9yZXN0Lm5ldC91c2VyL3BpeGludmVudFxuLy8gID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vLyBDb2xvciBzeXN0ZW1cblxuJHdoaXRlOiAjZmZmICFkZWZhdWx0O1xuJGdyYXktNTA6ICNmNmY2ZjYgIWRlZmF1bHQ7XG4kZ3JheS0xMDA6ICNiYWJmYzcgIWRlZmF1bHQ7IC8vICRncmF5LWxpZ2h0ZXN0XG4kZ3JheS0yMDA6ICNlZGVkZWQgIWRlZmF1bHQ7IC8vICRncmF5LWxpZ2h0ZXJcbiRncmF5LTMwMDogI2RhZTFlNyAhZGVmYXVsdDsgLy8gJGdyYXktbGlnaHRcbiRncmF5LTQwMDogIzYzNjM2MyAhZGVmYXVsdDtcbiRncmF5LTUwMDogI2FkYjViZCAhZGVmYXVsdDtcbiRncmF5LTYwMDogI2I4YzJjYyAhZGVmYXVsdDsgLy8gJGdyYXlcbiRncmF5LTcwMDogIzRlNTE1NCAhZGVmYXVsdDtcbiRncmF5LTgwMDogIzFlMWUxZSAhZGVmYXVsdDsgLy8gJGdyYXktZGFya1xuJGdyYXktOTAwOiAjMmEyZTMwICFkZWZhdWx0O1xuJGJsYWNrOiAjMjIyOTJmICFkZWZhdWx0OyAvLyAyMzFmNDggMjIyOTJmXG5cbiRwdXJwbGU6ICNDMjE4NTggIWRlZmF1bHQ7IC8vJHByaW1hcnlcbiRncmVlbjogIzI4Yzc2ZiAhZGVmYXVsdDsgLy8kc3VjY2Vzc1xuJGJsdWU6ICMwMGNmZTggIWRlZmF1bHQ7IC8vJGluZm9cbiRvcmFuZ2U6ICNmZjlmNDMgIWRlZmF1bHQ7IC8vJHdhcm5pbmdcbiRyZWQ6ICNmZjAwMDAgIWRlZmF1bHQ7IC8vJGRhbmdlclxuXG4kcHJpbWFyeTogJHB1cnBsZSAhZGVmYXVsdDtcbiRzZWNvbmRhcnk6ICM4Mjg2OGIgIWRlZmF1bHQ7XG4kaW5mbzogJGJsdWUgIWRlZmF1bHQ7XG4kd2FybmluZzogJG9yYW5nZSAhZGVmYXVsdDtcbiRsaWdodDogJGdyYXktNTAgIWRlZmF1bHQ7XG4kZGFyazogIzRiNGI0YiAhZGVmYXVsdDtcblxuLy8gU3BhY2luZ1xuLy9cbi8vIENvbnRyb2wgdGhlIGRlZmF1bHQgc3R5bGluZyBvZiBtb3N0IEJvb3RzdHJhcCBlbGVtZW50cyBieSBtb2RpZnlpbmcgdGhlc2Vcbi8vIHZhcmlhYmxlcy4gTW9zdGx5IGZvY3VzZWQgb24gc3BhY2luZy5cbi8vIFlvdSBjYW4gYWRkIG1vcmUgZW50cmllcyB0byB0aGUgJHNwYWNlcnMgbWFwLCBzaG91bGQgeW91IG5lZWQgbW9yZSB2YXJpYXRpb24uXG5cbi8vIHNjc3MtZG9jcy1zdGFydCBjb250YWluZXItbWF4LXdpZHRoc1xuJGdyaWQtYnJlYWtwb2ludHM6IChcbiAgeHM6IDAsXG4gIHNtOiA1NzZweCxcbiAgbWQ6IDc2OHB4LFxuICBsZzogOTkycHgsXG4gIHhsOiAxMjAwcHgsXG4gIHh4bDogMTQ0MHB4IC8vIEN1c3RvbSB4eGwgc2l6ZVxuKSAhZGVmYXVsdDtcblxuJGNvbnRhaW5lci1tYXgtd2lkdGhzOiAoXG4gIHhzOiAwLFxuICBzbTogNTc2cHgsXG4gIG1kOiA3NjhweCxcbiAgbGc6IDk5MnB4LFxuICB4bDogMTIwMHB4LFxuICB4eGw6IDE0NDBweCAvLyBDdXN0b20geHhsIHNpemVcbikgIWRlZmF1bHQ7XG4vLyBzY3NzLWRvY3MtZW5kIGNvbnRhaW5lci1tYXgtd2lkdGhzXG5cbi8vIHN0eWxlbGludC1kaXNhYmxlXG4kc3BhY2VyOiAxcmVtICFkZWZhdWx0O1xuJHNwYWNlcnM6ICgpICFkZWZhdWx0O1xuLy8gc3R5bGVsaW50LWRpc2FibGUtbmV4dC1saW5lIHNjc3MvZG9sbGFyLXZhcmlhYmxlLWRlZmF1bHRcbiRzcGFjZXJzOiBtYXAtbWVyZ2UoXG4gIChcbiAgICAwOiAwLFxuICAgIDI1OiAoXG4gICAgICAkc3BhY2VyICogMC4yNVxuICAgICksXG4gICAgNTA6IChcbiAgICAgICRzcGFjZXIgKiAwLjVcbiAgICApLFxuICAgIDc1OiAoXG4gICAgICAkc3BhY2VyICogMC43NVxuICAgICksXG4gICAgMTogKFxuICAgICAgJHNwYWNlclxuICAgICksXG4gICAgMjogKFxuICAgICAgJHNwYWNlciAqIDEuNVxuICAgICksXG4gICAgMzogKFxuICAgICAgJHNwYWNlciAqIDNcbiAgICApLFxuICAgIDQ6IChcbiAgICAgICRzcGFjZXIgKiAzLjVcbiAgICApLFxuICAgIDU6IChcbiAgICAgICRzcGFjZXIgKiA0XG4gICAgKVxuICApLFxuICAkc3BhY2Vyc1xuKTtcblxuLy8gQm9keVxuLy9cbi8vIFNldHRpbmdzIGZvciB0aGUgYDxib2R5PmAgZWxlbWVudC5cbiRib2R5LWJnOiAjZjhmOGY4ICFkZWZhdWx0O1xuJGJvZHktY29sb3I6ICM2ZTZiN2IgIWRlZmF1bHQ7XG5cbi8vIExpbmtzXG4vL1xuLy8gU3R5bGUgYW5jaG9yIGVsZW1lbnRzLlxuXG4kbGluay1jb2xvcjogJHByaW1hcnkgIWRlZmF1bHQ7XG4kbGluay1ob3Zlci1jb2xvcjogZGFya2VuKCRsaW5rLWNvbG9yLCA1JSkgIWRlZmF1bHQ7XG4kbGluay1ob3Zlci1kZWNvcmF0aW9uOiBub25lICFkZWZhdWx0O1xuXG4vLyBHcmlkIGNvbHVtbnNcbi8vXG4vLyBTZXQgdGhlIG51bWJlciBvZiBjb2x1bW5zIGFuZCBzcGVjaWZ5IHRoZSB3aWR0aCBvZiB0aGUgZ3V0dGVycy5cblxuJGdyaWQtZ3V0dGVyLXdpZHRoOiAycmVtICFkZWZhdWx0O1xuXG4vLyBDb21wb25lbnRzXG4vL1xuLy8gRGVmaW5lIGNvbW1vbiBwYWRkaW5nIGFuZCBib3JkZXIgcmFkaXVzIHNpemVzIGFuZCBtb3JlLlxuXG4kbGluZS1oZWlnaHQtbGc6IDEuMjUgIWRlZmF1bHQ7XG4kbGluZS1oZWlnaHQtc206IDEgIWRlZmF1bHQ7XG5cbiRib3JkZXItd2lkdGg6IDFweCAhZGVmYXVsdDtcbiRib3JkZXItY29sb3I6ICNlYmU5ZjEgIWRlZmF1bHQ7XG4kYm9yZGVyLXJhZGl1czogMC4zNTdyZW0gIWRlZmF1bHQ7XG4kYm9yZGVyLXJhZGl1cy1sZzogMC42cmVtICFkZWZhdWx0O1xuJGJvcmRlci1yYWRpdXMtc206IDAuMjVyZW0gIWRlZmF1bHQ7XG5cbi8vIHNoYWRvd1xuJGJveC1zaGFkb3c6IDAgNHB4IDI0cHggMCByZ2JhKCRibGFjaywgMC4xKSAhZGVmYXVsdDtcbi8vIFR5cG9ncmFwaHlcblxuLy9cbi8vIEZvbnQsIGxpbmUtaGVpZ2h0LCBhbmQgY29sb3IgZm9yIGJvZHkgdGV4dCwgaGVhZGluZ3MsIGFuZCBtb3JlLlxuXG4vLyBzdHlsZWxpbnQtZGlzYWJsZSB2YWx1ZS1rZXl3b3JkLWNhc2VcbiRmb250LWZhbWlseS1zYW5zLXNlcmlmOiAnTW9udHNlcnJhdCcsIEhlbHZldGljYSwgQXJpYWwsIHNlcmlmICFkZWZhdWx0O1xuJGZvbnQtZmFtaWx5LW1vbm9zcGFjZTogJ01vbnRzZXJyYXQnLCBIZWx2ZXRpY2EsIEFyaWFsLCBzZXJpZiAhZGVmYXVsdDtcblxuLy8gc3R5bGVsaW50LWVuYWJsZSB2YWx1ZS1rZXl3b3JkLWNhc2VcbiRmb250LXNpemUtYmFzZTogMXJlbSAhZGVmYXVsdDtcbiRmb250LXNpemUtbGc6IGNlaWwoJGZvbnQtc2l6ZS1iYXNlICogMS4yNSkgIWRlZmF1bHQ7XG4kZm9udC1zaXplLXNtOiBjZWlsKCRmb250LXNpemUtYmFzZSAqIDAuODUpICFkZWZhdWx0O1xuXG4kZm9udC13ZWlnaHQtbm9ybWFsOiA0MDAgIWRlZmF1bHQ7XG4kZm9udC13ZWlnaHQtYm9sZDogNTAwICFkZWZhdWx0O1xuJGZvbnQtd2VpZ2h0LWJvbGRlcjogNjAwICFkZWZhdWx0O1xuXG4kbGluZS1oZWlnaHQtYmFzZTogMS40NSAhZGVmYXVsdDtcblxuJGgxLWZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1iYXNlICogMiAhZGVmYXVsdDtcbiRoMi1mb250LXNpemU6ICRmb250LXNpemUtYmFzZSAqIDEuNzE0ICFkZWZhdWx0O1xuJGgzLWZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1iYXNlICogMS41ICFkZWZhdWx0O1xuJGg0LWZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1iYXNlICogMS4yODYgIWRlZmF1bHQ7XG4kaDUtZm9udC1zaXplOiAkZm9udC1zaXplLWJhc2UgKiAxLjA3ICFkZWZhdWx0O1xuXG4kaGVhZGluZ3MtZm9udC1mYW1pbHk6IGluaGVyaXQgIWRlZmF1bHQ7XG4kaGVhZGluZ3MtY29sb3I6ICM1ZTU4NzMgIWRlZmF1bHQ7XG5cbiRkaXNwbGF5MS13ZWlnaHQ6ICRmb250LXdlaWdodC1ub3JtYWwgIWRlZmF1bHQ7XG4kZGlzcGxheTItd2VpZ2h0OiAkZm9udC13ZWlnaHQtbm9ybWFsICFkZWZhdWx0O1xuJGRpc3BsYXkzLXdlaWdodDogJGZvbnQtd2VpZ2h0LW5vcm1hbCAhZGVmYXVsdDtcbiRkaXNwbGF5NC13ZWlnaHQ6ICRmb250LXdlaWdodC1ub3JtYWwgIWRlZmF1bHQ7XG5cbiRsZWFkLWZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1iYXNlICogMS4xNCAhZGVmYXVsdDtcbiRsZWFkLWZvbnQtd2VpZ2h0OiAkZm9udC13ZWlnaHQtbm9ybWFsICFkZWZhdWx0O1xuXG4kc21hbGwtZm9udC1zaXplOiAwLjg1N3JlbSAhZGVmYXVsdDtcblxuJHRleHQtbXV0ZWQ6ICNiOWI5YzMgIWRlZmF1bHQ7XG4kaHItYm9yZGVyLWNvbG9yOiAkYm9yZGVyLWNvbG9yICFkZWZhdWx0O1xuXG4kYmxvY2txdW90ZS1zbWFsbC1jb2xvcjogJHRleHQtbXV0ZWQgIWRlZmF1bHQ7XG5cbi8vIFRhYmxlc1xuXG4kdGFibGUtY2VsbC1wYWRkaW5nOiAwLjcycmVtICFkZWZhdWx0O1xuXG4kdGFibGUtYWNjZW50LWJnOiAjZmFmYWZjICFkZWZhdWx0O1xuJHRhYmxlLWhvdmVyLWJnOiAjZjZmNmY5ICFkZWZhdWx0O1xuXG4kdGFibGUtYm9yZGVyLWNvbG9yOiAkYm9yZGVyLWNvbG9yICFkZWZhdWx0O1xuXG4kdGFibGUtaGVhZC1iZzogI2YzZjJmNyAhZGVmYXVsdDtcbiR0YWJsZS1oZWFkLWNvbG9yOiAkaGVhZGluZ3MtY29sb3IgIWRlZmF1bHQ7XG5cbiR0YWJsZS1kYXJrLWJnOiAkZGFyayAhZGVmYXVsdDtcbiR0YWJsZS1kYXJrLWJvcmRlci1jb2xvcjogIzQwNDA0MCAhZGVmYXVsdDtcblxuJHRhYmxlLXRoLWZvbnQtc2l6ZTogMC44NTdyZW0gIWRlZmF1bHQ7IC8vIGN1c3RvbVxuXG4vLyBCdXR0b25zICsgRm9ybXNcbiRidG4tcGFkZGluZy15OiAwLjc4NnJlbSAhZGVmYXVsdDtcbiRidG4tcGFkZGluZy14OiAxLjVyZW0gIWRlZmF1bHQ7XG4kaW5wdXQtYnRuLXBhZGRpbmcteTogMC43NXJlbSAhZGVmYXVsdDtcbiRpbnB1dC1idG4tcGFkZGluZy14OiAycmVtICFkZWZhdWx0O1xuXG4kaW5wdXQtYnRuLXBhZGRpbmcteS1zbTogMC40ODZyZW0gIWRlZmF1bHQ7XG4kaW5wdXQtYnRuLXBhZGRpbmcteC1zbTogMXJlbSAhZGVmYXVsdDtcbiRpbnB1dC1idG4tZm9udC1zaXplLXNtOiAkZm9udC1zaXplLWJhc2UgKiAwLjkgIWRlZmF1bHQ7XG5cbiRpbnB1dC1idG4tcGFkZGluZy15LWxnOiAwLjhyZW0gIWRlZmF1bHQ7XG4kaW5wdXQtYnRuLXBhZGRpbmcteC1sZzogMnJlbSAhZGVmYXVsdDtcbiRpbnB1dC1idG4tZm9udC1zaXplLWxnOiAkZm9udC1zaXplLWJhc2UgKiAxLjI1ICFkZWZhdWx0O1xuJGJ0bi1saW5lLWhlaWdodDogMSAhZGVmYXVsdDtcbiRidG4tYm9yZGVyLXJhZGl1czogMC4zNThyZW0gIWRlZmF1bHQ7XG4kYnRuLWJvcmRlci1yYWRpdXMtbGc6IDAuMzU4cmVtICFkZWZhdWx0O1xuJGJ0bi1ib3JkZXItcmFkaXVzLXNtOiAwLjM1OHJlbSAhZGVmYXVsdDtcblxuJGJ0bi10cmFuc2l0aW9uOiBjb2xvciAwLjE1cyBlYXNlLWluLW91dCwgYmFja2dyb3VuZC1jb2xvciAwLjE1cyBlYXNlLWluLW91dCwgYm9yZGVyLWNvbG9yIDAuMTVzIGVhc2UtaW4tb3V0LFxuICBib3gtc2hhZG93IDAuMTVzIGVhc2UtaW4tb3V0LCBiYWNrZ3JvdW5kIDBzLCBib3JkZXIgMHMgIWRlZmF1bHQ7XG5cbi8vIEZvcm1zXG4kY3VzdG9tLWNvbnRyb2wtYm9yZGVyLWNvbG9yOiAjZDhkNmRlO1xuJGxhYmVsLW1hcmdpbi1ib3R0b206IDAuMjg1N3JlbSAhZGVmYXVsdDtcblxuJGlucHV0LXBhZGRpbmcteTogMC40MzhyZW0gIWRlZmF1bHQ7XG4kaW5wdXQtcGFkZGluZy14OiAxcmVtICFkZWZhdWx0O1xuJGlucHV0LWZvbnQtc2l6ZTogMXJlbSAhZGVmYXVsdDtcbiRpbnB1dC1saW5lLWhlaWdodDogJGxpbmUtaGVpZ2h0LWJhc2UgIWRlZmF1bHQ7XG5cbiRpbnB1dC1wYWRkaW5nLXktc206IDAuMTg4cmVtICFkZWZhdWx0O1xuJGlucHV0LXBhZGRpbmcteC1zbTogMC44NTdyZW0gIWRlZmF1bHQ7XG4kaW5wdXQtZm9udC1zaXplLXNtOiAwLjg1N3JlbSAhZGVmYXVsdDtcblxuJGlucHV0LXBhZGRpbmcteS1sZzogMC43NXJlbSAhZGVmYXVsdDtcbiRpbnB1dC1wYWRkaW5nLXgtbGc6IDEuMTQzcmVtICFkZWZhdWx0O1xuJGlucHV0LWZvbnQtc2l6ZS1sZzogMS4xNDNyZW0gIWRlZmF1bHQ7XG5cbiRpbnB1dC1kaXNhYmxlZC1iZzogI2VmZWZlZiAhZGVmYXVsdDtcblxuJGlucHV0LWNvbG9yOiAkYm9keS1jb2xvciAhZGVmYXVsdDtcbiRpbnB1dC1ib3JkZXItY29sb3I6ICRjdXN0b20tY29udHJvbC1ib3JkZXItY29sb3IgIWRlZmF1bHQ7XG4kaW5wdXQtYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMXB4IHJnYmEoJGJsYWNrLCAwLjA3NSkgIWRlZmF1bHQ7XG5cbiRpbnB1dC1ib3JkZXItcmFkaXVzOiAkYm9yZGVyLXJhZGl1cyAhZGVmYXVsdDtcbiRpbnB1dC1ib3JkZXItcmFkaXVzLWxnOiAkYm9yZGVyLXJhZGl1cyAhZGVmYXVsdDtcbiRpbnB1dC1ib3JkZXItcmFkaXVzLXNtOiAkYm9yZGVyLXJhZGl1cyAhZGVmYXVsdDtcblxuJGlucHV0LWZvY3VzLWJvcmRlci1jb2xvcjogJHByaW1hcnkgIWRlZmF1bHQ7XG4kaW5wdXQtZm9jdXMtYm94LXNoYWRvdzogMCAzcHggMTBweCAwIHJnYmEoJGJsYWNrLCAwLjEpICFkZWZhdWx0O1xuXG4kaW5wdXQtcGxhY2Vob2xkZXItY29sb3I6ICR0ZXh0LW11dGVkICFkZWZhdWx0O1xuJGlucHV0LXBsYWludGV4dC1jb2xvcjogJGJvZHktY29sb3IgIWRlZmF1bHQ7XG5cbiRpbnB1dC1oZWlnaHQ6IDIuNzE0cmVtICFkZWZhdWx0O1xuJGlucHV0LWhlaWdodC1zbTogMi4xNDJyZW0gIWRlZmF1bHQ7XG4kaW5wdXQtaGVpZ2h0LWxnOiAzLjI4NTdyZW0gIWRlZmF1bHQ7XG5cbiRpbnB1dC1ncm91cC1hZGRvbi1iZzogd2hpdGUgIWRlZmF1bHQ7XG4kY3VzdG9tLWZvcm1zLXRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4xNXMgZWFzZS1pbi1vdXQsIGJvcmRlci1jb2xvciAwLjE1cyBlYXNlLWluLW91dCxcbiAgYm94LXNoYWRvdyAwLjE1cyBlYXNlLWluLW91dCwgYmFja2dyb3VuZCAwcywgYm9yZGVyLWNvbG9yIDBzICFkZWZhdWx0O1xuXG4kY3VzdG9tLWNvbnRyb2wtaW5kaWNhdG9yLWJvcmRlci1jb2xvcjogJGN1c3RvbS1jb250cm9sLWJvcmRlci1jb2xvcjtcblxuJGN1c3RvbS1jaGVja2JveC1pbmRpY2F0b3ItYm9yZGVyLXJhZGl1czogM3B4ICFkZWZhdWx0O1xuJGN1c3RvbS1jaGVja2JveC1pbmRpY2F0b3ItY2hlY2tlZC1jb2xvcjogd2hpdGUgIWRlZmF1bHQ7XG4kY3VzdG9tLWNoZWNrYm94LWluZGljYXRvci1pbmRldGVybWluYXRlLWNvbG9yOiB3aGl0ZSAhZGVmYXVsdDtcbiRjdXN0b20tY2hlY2tib3gtaW5kaWNhdG9yLWljb24tY2hlY2tlZDogdXJsKFwiZGF0YTppbWFnZS9zdmcreG1sO2NoYXJzZXQ9dXRmOCwlM0NzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB2aWV3Qm94PScwIDAgOS41IDcuNSclM0UlM0Nwb2x5bGluZSBwb2ludHM9JzAuNzUgNC4zNSA0LjE4IDYuNzUgOC43NSAwLjc1JyBzdHlsZT0nZmlsbDpub25lO3N0cm9rZTolMjNmZmY7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS13aWR0aDoxLjVweCcvJTNFJTNDL3N2ZyUzRVwiKTtcblxuJGN1c3RvbS1jaGVja2JveC1pbmRpY2F0b3ItaWNvbi1pbmRldGVybWluYXRlOiB1cmwoXCJkYXRhOmltYWdlL3N2Zyt4bWw7Y2hhcnNldD11dGY4LCUzQ3N2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScyNCcgaGVpZ2h0PScyNCcgdmlld0JveD0nMCAwIDI0IDI0JyBmaWxsPSdub25lJyBzdHJva2U9JyN7JGN1c3RvbS1jaGVja2JveC1pbmRpY2F0b3ItaW5kZXRlcm1pbmF0ZS1jb2xvcn0nIHN0cm9rZS13aWR0aD0nMicgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJyBjbGFzcz0nZmVhdGhlciBmZWF0aGVyLW1pbnVzJyUzRSUzQ2xpbmUgeDE9JzUnIHkxPScxMicgeDI9JzE5JyB5Mj0nMTInJTNFJTNDL2xpbmUlM0UlM0Mvc3ZnJTNFXCIpO1xuXG4kY3VzdG9tLWNvbnRyb2wtaW5kaWNhdG9yLWNoZWNrZWQtZGlzYWJsZWQtYmc6IHJnYmEoJHByaW1hcnksIDAuNjUpO1xuXG4kY3VzdG9tLXJhZGlvLWluZGljYXRvci1pY29uLWNoZWNrZWQ6IG5vbmU7XG5cbiRjdXN0b20tZmlsZS1oZWlnaHQtaW5uZXI6ICRpbnB1dC1oZWlnaHQgIWRlZmF1bHQ7XG5cbiRjdXN0b20tc2VsZWN0LWluZGljYXRvci1wYWRkaW5nOiAxcmVtICFkZWZhdWx0OyAvLyBFeHRyYSBwYWRkaW5nIHRvIGFjY291bnQgZm9yIHRoZSBwcmVzZW5jZSBvZiB0aGUgYmFja2dyb3VuZC1pbWFnZSBiYXNlZCBpbmRpY2F0b3JcbiRjdXN0b20tc2VsZWN0LWRpc2FibGVkLWJnOiAkaW5wdXQtZGlzYWJsZWQtYmcgIWRlZmF1bHQ7XG4kY3VzdG9tLXNlbGVjdC1iZy1zaXplOiAxMHB4IDEwcHggIWRlZmF1bHQ7IC8vIEluIHBpeGVscyBiZWNhdXNlIGltYWdlIGRpbWVuc2lvbnNcbiRjdXN0b20tc2VsZWN0LWluZGljYXRvci1jb2xvcjogJGlucHV0LWJvcmRlci1jb2xvciAhZGVmYXVsdDtcbiRjdXN0b20tc2VsZWN0LWluZGljYXRvcjogdXJsKFwiZGF0YTppbWFnZS9zdmcreG1sLDxzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB3aWR0aD0nNCcgaGVpZ2h0PSc1JyB2aWV3Qm94PScwIDAgNCA1Jz48cGF0aCBmaWxsPScjeyRjdXN0b20tc2VsZWN0LWluZGljYXRvci1jb2xvcn0nIGQ9J00yIDBMMCAyaDR6bTAgNUwwIDNoNHonLz48L3N2Zz5cIikgIWRlZmF1bHQ7XG5cbi8vICRjdXN0b20tc2VsZWN0LWZlZWRiYWNrLWljb24tcG9zaXRpb246IGNlbnRlciByaWdodCAoJGN1c3RvbS1zZWxlY3QtcGFkZGluZy14ICsgJGN1c3RvbS1zZWxlY3QtaW5kaWNhdG9yLXBhZGRpbmcpICFkZWZhdWx0O1xuLy8gJGN1c3RvbS1zZWxlY3QtZmVlZGJhY2staWNvbi1zaXplOiAkaW5wdXQtaGVpZ2h0LWlubmVyLWhhbGYgJGlucHV0LWhlaWdodC1pbm5lci1oYWxmICFkZWZhdWx0O1xuXG4kY3VzdG9tLXNlbGVjdC1ib3JkZXItcmFkaXVzOiAkaW5wdXQtYm9yZGVyLXJhZGl1cyAhZGVmYXVsdDtcbiRjdXN0b20tc2VsZWN0LWZvY3VzLWJveC1zaGFkb3c6ICRpbnB1dC1mb2N1cy1ib3gtc2hhZG93ICFkZWZhdWx0O1xuXG4kY3VzdG9tLXNlbGVjdC1wYWRkaW5nLXktc206ICRpbnB1dC1wYWRkaW5nLXktc20gIWRlZmF1bHQ7XG4kY3VzdG9tLXNlbGVjdC1wYWRkaW5nLXgtc206ICRpbnB1dC1wYWRkaW5nLXgtc20gIWRlZmF1bHQ7XG4kY3VzdG9tLXNlbGVjdC1mb250LXNpemUtc206ICRpbnB1dC1mb250LXNpemUtc20gIWRlZmF1bHQ7XG4kY3VzdG9tLXNlbGVjdC1oZWlnaHQtc206ICRpbnB1dC1oZWlnaHQtc20gIWRlZmF1bHQ7XG5cbiRjdXN0b20tc2VsZWN0LXBhZGRpbmcteS1sZzogJGlucHV0LXBhZGRpbmcteS1sZyAhZGVmYXVsdDtcbiRjdXN0b20tc2VsZWN0LXBhZGRpbmcteC1sZzogJGlucHV0LXBhZGRpbmcteC1sZyAhZGVmYXVsdDtcbiRjdXN0b20tc2VsZWN0LWZvbnQtc2l6ZS1sZzogJGlucHV0LWZvbnQtc2l6ZS1sZyAhZGVmYXVsdDtcbiRjdXN0b20tc2VsZWN0LWhlaWdodC1sZzogJGlucHV0LWhlaWdodC1sZyAhZGVmYXVsdDtcblxuLy8gRHJvcGRvd25zXG4vL1xuLy8gRHJvcGRvd24gbWVudSBjb250YWluZXIgYW5kIGNvbnRlbnRzLlxuXG4kZHJvcGRvd24tYm9yZGVyLWNvbG9yOiByZ2JhKCRibGFjaywgMC4wNSkgIWRlZmF1bHQ7XG4kZHJvcGRvd24tYm9yZGVyLXJhZGl1czogMC4zNThyZW0gIWRlZmF1bHQ7XG4kZHJvcGRvd24tYm94LXNoYWRvdzogMCA1cHggMjVweCByZ2JhKCRibGFjaywgMC4xKSAhZGVmYXVsdDtcblxuJGRyb3Bkb3duLWxpbmstY29sb3I6ICRib2R5LWNvbG9yICFkZWZhdWx0O1xuJGRyb3Bkb3duLWxpbmstaG92ZXItY29sb3I6ICRwcmltYXJ5ICFkZWZhdWx0O1xuJGRyb3Bkb3duLWxpbmstaG92ZXItYmc6IHJnYmEoJHByaW1hcnksIDAuMTIpICFkZWZhdWx0O1xuXG4kZHJvcGRvd24tZGl2aWRlci1iZzogcmdiYSgkYmxhY2ssIDAuMDgpICFkZWZhdWx0O1xuJGRyb3Bkb3duLWZvbnQtc2l6ZTogMXJlbSAhZGVmYXVsdDtcbiRkcm9wZG93bi1zcGFjZXI6IDAgIWRlZmF1bHQ7XG4kemluZGV4LWRyb3Bkb3duOiAxMCAhZGVmYXVsdDtcblxuJGRyb3Bkb3duLWJveC1zaGFkb3c6IDAgNXB4IDI1cHggMCByZ2JhKCRibGFjaywgMC4xKSAhZGVmYXVsdDtcblxuJGRyb3Bkb3duLWxpbmstZGlzYWJsZWQtY29sb3I6ICR0ZXh0LW11dGVkICFkZWZhdWx0O1xuXG4kZHJvcGRvd24taXRlbS1wYWRkaW5nLXk6IDAuNjVyZW0gIWRlZmF1bHQ7XG4kZHJvcGRvd24taXRlbS1wYWRkaW5nLXg6IDEuMjhyZW0gIWRlZmF1bHQ7XG5cbiRkcm9wZG93bi1oZWFkZXItY29sb3I6ICRoZWFkaW5ncy1jb2xvciAhZGVmYXVsdDtcblxuJGRyb3Bkb3duX3NwYWNpbmc6IDAuNXJlbTsgLy8gY3VzdG9tXG5cbi8vIFBhZ2luYXRpb25cblxuJHBhZ2luYXRpb24tcGFkZGluZy15OiAwLjVyZW0gIWRlZmF1bHQ7XG4kcGFnaW5hdGlvbi1wYWRkaW5nLXg6IDAuODVyZW0gIWRlZmF1bHQ7XG4kcGFnaW5hdGlvbi1wYWRkaW5nLXktbGc6IDAuNTU3NXJlbSAhZGVmYXVsdDtcbiRwYWdpbmF0aW9uLXBhZGRpbmcteC1sZzogMXJlbSAhZGVmYXVsdDtcbiRwYWdpbmF0aW9uLXBhZGRpbmcteS1zbTogMC40NDNyZW0gIWRlZmF1bHQ7XG4kcGFnaW5hdGlvbi1wYWRkaW5nLXgtc206IDAuNzQ1cmVtICFkZWZhdWx0O1xuXG4kcGFnaW5hdGlvbi1kaXNhYmxlZC1jb2xvcjogJHRleHQtbXV0ZWQgIWRlZmF1bHQ7XG5cbiRwYWdpbmF0aW9uLWNvbG9yOiAkYm9keS1jb2xvciAhZGVmYXVsdDtcbiRwYWdpbmF0aW9uLWJnOiAjZjNmMmY3ICFkZWZhdWx0O1xuXG4kcGFnaW5hdGlvbi1ob3Zlci1jb2xvcjogJHByaW1hcnkgIWRlZmF1bHQ7XG4kcGFnaW5hdGlvbi1ob3Zlci1iZzogI2YzZjJmNyAhZGVmYXVsdDtcblxuJHBhZ2luYXRpb24tYWN0aXZlLWNvbG9yOiAkcHJpbWFyeSAhZGVmYXVsdDtcblxuJHBhZ2luYXRpb24tZGlzYWJsZWQtY29sb3I6ICR0ZXh0LW11dGVkICFkZWZhdWx0O1xuJHBhZ2luYXRpb24tZGlzYWJsZWQtYmc6ICNmM2YyZjcgIWRlZmF1bHQ7XG5cbiRwYWdpbmF0aW9uLWZvbnQtc2l6ZS1sZzogMS4xNHJlbSAhZGVmYXVsdDsgLy8gY3VzdG9tXG4kcGFnaW5hdGlvbi1mb250LXNpemUtc206IDAuODU3cmVtICFkZWZhdWx0OyAvLyBjdXN0b21cblxuLy8gQ2FyZHNcbiRjYXJkLXNwYWNlci15OiAxLjVyZW0gIWRlZmF1bHQ7XG4kY2FyZC1zcGFjZXIteDogMS41cmVtICFkZWZhdWx0O1xuJGNhcmQtYm9yZGVyLXJhZGl1czogMC40MjhyZW0gIWRlZmF1bHQ7XG5cbi8vQWxlcnRzXG5cbiRhbGVydC1wYWRkaW5nLXk6IDAuNzFyZW0gIWRlZmF1bHQ7XG4kYWxlcnQtcGFkZGluZy14OiAxcmVtICFkZWZhdWx0O1xuJGFsZXJ0LWJvcmRlci1yYWRpdXM6IDAuMzU4cmVtICFkZWZhdWx0O1xuJGFsZXJ0LWxpbmstZm9udC13ZWlnaHQ6IDcwMCAhZGVmYXVsdDtcblxuLy8gTGlzdCBncm91cFxuXG4kbGlzdC1ncm91cC1ib3JkZXItcmFkaXVzOiAwLjM1OHJlbSAhZGVmYXVsdDtcbiRsaXN0LWdyb3VwLWRpc2FibGVkLWNvbG9yOiAkdGV4dC1tdXRlZCAhZGVmYXVsdDtcblxuJGxpc3QtZ3JvdXAtYWN0aW9uLWFjdGl2ZS1jb2xvcjogJHdoaXRlICFkZWZhdWx0O1xuJGxpc3QtZ3JvdXAtYWN0aW9uLWFjdGl2ZS1iZzogJHByaW1hcnkgIWRlZmF1bHQ7XG5cbi8vIE5hdiB0YWJzXG5cbiRuYXYtbGluay1wYWRkaW5nLXk6IDAuMzU4cmVtICFkZWZhdWx0O1xuJG5hdi1saW5rLXBhZGRpbmcteDogMC41cmVtICFkZWZhdWx0O1xuJG5hdi1saW5rLWRpc2FibGVkLWNvbG9yOiAkdGV4dC1tdXRlZCAhZGVmYXVsdDtcblxuJG5hdi10YWJzLWJvcmRlci13aWR0aDogMCAhZGVmYXVsdDtcbiRuYXYtdGFicy1ib3JkZXItcmFkaXVzOiAwLjI1ICFkZWZhdWx0O1xuJG5hdi10YWJzLWxpbmstYWN0aXZlLWNvbG9yOiAkcHJpbWFyeSAhZGVmYXVsdDtcblxuJG5hdi10YWJzLWxpbmstYWN0aXZlLWJnOiB0cmFuc3BhcmVudCAhZGVmYXVsdDtcblxuJG5hdi1waWxscy1ib3JkZXItcmFkaXVzOiAkYnRuLWJvcmRlci1yYWRpdXMgIWRlZmF1bHQ7XG5cbi8vIG5hdmJhclxuXG4kZmxvYXRpbmctbmF2LW1hcmdpbjogMS4zcmVtO1xuXG4vLyBUb29sdGlwc1xuXG4kdG9vbHRpcC1iZzogIzMyMzIzMiAhZGVmYXVsdDtcbiR0b29sdGlwLXBhZGRpbmcteTogMC40cmVtICFkZWZhdWx0O1xuJHRvb2x0aXAtcGFkZGluZy14OiAwLjc3NXJlbSAhZGVmYXVsdDtcbiR0b29sdGlwLWZvbnQtc2l6ZTogMC44NTdyZW0gIWRlZmF1bHQ7XG4kdG9vbHRpcC1ib3JkZXItcmFkaXVzOiAwLjM1OHJlbSAhZGVmYXVsdDtcbiR0b29sdGlwLW9wYWNpdHk6IDEgIWRlZmF1bHQ7XG4kdG9vbHRpcC1tYXgtd2lkdGg6IDIyMHB4ICFkZWZhdWx0O1xuXG4vLyBQb3BvdmVyc1xuXG4kcG9wb3Zlci1mb250LXNpemU6IDFyZW0gIWRlZmF1bHQ7XG4kcG9wb3Zlci1ib3JkZXItd2lkdGg6IDAgIWRlZmF1bHQ7XG4kcG9wb3Zlci1ib3JkZXItcmFkaXVzOiAwLjM1OHJlbSAhZGVmYXVsdDtcbiRwb3BvdmVyLWJvcmRlci1jb2xvcjogJGJvcmRlci1jb2xvciAhZGVmYXVsdDtcbiRwb3BvdmVyLWJveC1zaGFkb3c6IDAgMCAxMHB4IDAgcmdiYSgkYmxhY2ssIDAuMSkgIWRlZmF1bHQ7XG5cbiRwb3BvdmVyLWhlYWRlci1iZzogJHByaW1hcnkgIWRlZmF1bHQ7XG4kcG9wb3Zlci1oZWFkZXItY29sb3I6ICR3aGl0ZSAhZGVmYXVsdDtcbiRwb3BvdmVyLWhlYWRlci1wYWRkaW5nLXk6IDAuNjVyZW0gIWRlZmF1bHQ7XG4kcG9wb3Zlci1oZWFkZXItcGFkZGluZy14OiAxLjIxcmVtICFkZWZhdWx0O1xuXG4vLyBUb2FzdHNcblxuJHRvYXN0LW1heC13aWR0aDogMzgwcHggIWRlZmF1bHQ7XG4kdG9hc3QtcGFkZGluZy14OiAxLjE0cmVtICFkZWZhdWx0O1xuJHRvYXN0LXBhZGRpbmcteTogMC4xNXJlbSAhZGVmYXVsdDtcbiR0b2FzdC1mb250LXNpemU6IDAuODU3cmVtICFkZWZhdWx0O1xuJHRvYXN0LWNvbG9yOiAkYm9keS1jb2xvciAhZGVmYXVsdDtcbiR0b2FzdC1ib3JkZXItd2lkdGg6IDAgIWRlZmF1bHQ7XG4kdG9hc3QtYm9yZGVyLXJhZGl1czogMC4yODZyZW0gIWRlZmF1bHQ7XG4kdG9hc3QtYm94LXNoYWRvdzogMCAycHggMjBweCAwIHJnYmEoJGJsYWNrLCAwLjA4KSAhZGVmYXVsdDtcblxuJHRvYXN0LWhlYWRlci1jb2xvcjogJGJvZHktY29sb3IgIWRlZmF1bHQ7XG4kdG9hc3QtaGVhZGVyLWJhY2tncm91bmQtY29sb3I6ICR3aGl0ZSAhZGVmYXVsdDtcblxuLy8gUHJvZ3Jlc3NcblxuJHByb2dyZXNzLWhlaWdodDogMC44NTdyZW0gIWRlZmF1bHQ7XG4kcHJvZ3Jlc3MtYm9yZGVyLXJhZGl1czogNXJlbSAhZGVmYXVsdDtcbiRwcm9ncmVzcy1mb250LXNpemU6ICRmb250LXNpemUtYmFzZSAqIDAuODU3ICFkZWZhdWx0O1xuJHByb2dyZXNzLWJnOiByZ2JhKCRwcmltYXJ5LCAwLjEyKSAhZGVmYXVsdDtcblxuLy8gQnJlYWRjcnVtYnNcblxuJGJyZWFkY3J1bWItZm9udC1zaXplOiAxcmVtICFkZWZhdWx0O1xuXG4kYnJlYWRjcnVtYi1wYWRkaW5nLXk6IDAuM3JlbSAhZGVmYXVsdDtcbiRicmVhZGNydW1iLWl0ZW0tcGFkZGluZzogMC42cmVtICFkZWZhdWx0O1xuXG4kYnJlYWRjcnVtYi1tYXJnaW4tYm90dG9tOiAwICFkZWZhdWx0O1xuXG4kYnJlYWRjcnVtYi1iZzogdHJhbnNwYXJlbnQgIWRlZmF1bHQ7XG4kYnJlYWRjcnVtYi1kaXZpZGVyLWNvbG9yOiAkYm9keS1jb2xvciAhZGVmYXVsdDtcbiRicmVhZGNydW1iLWFjdGl2ZS1jb2xvcjogJGJvZHktY29sb3IgIWRlZmF1bHQ7XG5cbiRicmVhZGNydW1iLWJvcmRlci1yYWRpdXM6IDAgIWRlZmF1bHQ7XG5cbi8vIENhcm91c2VsXG5cbiRjYXJvdXNlbC1jb250cm9sLWNvbG9yOiAkd2hpdGUgIWRlZmF1bHQ7XG4kY2Fyb3VzZWwtY29udHJvbC1wcmV2LWljb24tYmc6IHVybCgnZGF0YTppbWFnZS9zdmcreG1sLDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cIiN7JGNhcm91c2VsLWNvbnRyb2wtY29sb3J9XCIgc3Ryb2tlLXdpZHRoPVwiMlwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiIGNsYXNzPVwiZmVhdGhlciBmZWF0aGVyLWNoZXZyb24tbGVmdFwiPjxwb2x5bGluZSBwb2ludHM9XCIxNSAxOCA5IDEyIDE1IDZcIj48L3BvbHlsaW5lPjwvc3ZnPicpICFkZWZhdWx0O1xuJGNhcm91c2VsLWNvbnRyb2wtbmV4dC1pY29uLWJnOiB1cmwoJ2RhdGE6aW1hZ2Uvc3ZnK3htbCw8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCIjeyRjYXJvdXNlbC1jb250cm9sLWNvbG9yfVwiIHN0cm9rZS13aWR0aD1cIjJcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiBjbGFzcz1cImZlYXRoZXIgZmVhdGhlci1jaGV2cm9uLXJpZ2h0XCI+PHBvbHlsaW5lIHBvaW50cz1cIjkgMTggMTUgMTIgOSA2XCI+PC9wb2x5bGluZT48L3N2Zz4nKSAhZGVmYXVsdDtcblxuLy8gQmFkZ2VzXG5cbiRiYWRnZS1mb250LXNpemU6IDg1JSAhZGVmYXVsdDtcbiRiYWRnZS1wYWRkaW5nLXk6IDAuM3JlbSAhZGVmYXVsdDtcbiRiYWRnZS1wYWRkaW5nLXg6IDAuNXJlbSAhZGVmYXVsdDtcbiRiYWRnZS1mb250LXdlaWdodDogNjAwICFkZWZhdWx0O1xuJGJhZGdlLWJvcmRlci1yYWRpdXM6IDAuMzU4cmVtICFkZWZhdWx0O1xuXG4kYmFkZ2UtcGlsbC1wYWRkaW5nLXg6IDAuNXJlbSAhZGVmYXVsdDtcblxuLy8gTW9kYWxcbiRtb2RhbC1pbm5lci1wYWRkaW5nOiAwLjhyZW0gMS40cmVtICFkZWZhdWx0O1xuXG4kbW9kYWwtZm9vdGVyLWJvcmRlci1jb2xvcjogcmdiYSgkYmxhY2ssIDAuMDUpICFkZWZhdWx0O1xuXG4kbW9kYWwtaGVhZGVyLXBhZGRpbmcteTogMC44cmVtICFkZWZhdWx0O1xuJG1vZGFsLWhlYWRlci1wYWRkaW5nLXg6IDEuNHJlbSAhZGVmYXVsdDtcbiRtb2RhbC1jb250ZW50LWJvcmRlci1yYWRpdXM6IDAuMzU4cmVtICFkZWZhdWx0O1xuXG4kbW9kYWwteGw6IDk0JSAhZGVmYXVsdDtcbiRtb2RhbC1zbTogNDAwcHggIWRlZmF1bHQ7XG5cbi8vICAgIFNsaWRlIEluIE1vZGFsXG4kbW9kYWwtc2xpZGUtaW4td2lkdGgtc206IDI1cmVtICFkZWZhdWx0OyAvLyBjdXN0b21cbiRtb2RhbC1zbGlkZS1pbi13aWR0aDogMjhyZW0gIWRlZmF1bHQ7IC8vIGN1c3RvbVxuJG1vZGFsLXNsaWRlLWluLXdpZHRoLWxnOiAzMHJlbSAhZGVmYXVsdDsgLy8gY3VzdG9tXG5cbi8vIENsb3NlXG5cbiRjbG9zZS1mb250LXNpemU6ICRmb250LXNpemUtYmFzZSAqIDIgIWRlZmF1bHQ7XG4kY2xvc2UtZm9udC13ZWlnaHQ6IDQwMCAhZGVmYXVsdDtcbiRjbG9zZS1jb2xvcjogJGhlYWRpbmdzLWNvbG9yICFkZWZhdWx0O1xuXG4vLyBDb2RlXG5cbiRjb2RlLWZvbnQtc2l6ZTogOTAlICFkZWZhdWx0O1xuJGtiZC1iZzogI2VlZSAhZGVmYXVsdDtcblxuLy8gU3dpdGNoXG4kY3VzdG9tLXN3aXRjaC13aWR0aDogM3JlbSAhZGVmYXVsdDtcbiRjdXN0b20tc3dpdGNoLWluZGljYXRvci1ib3JkZXItcmFkaXVzOiAxcmVtICFkZWZhdWx0O1xuJGN1c3RvbS1zd2l0Y2gtaW5kaWNhdG9yLXNpemU6IDFyZW0gIWRlZmF1bHQ7XG5cbi8vc3ZnIGNvbG9yXG4kc3ZnLWNvbG9yLWxpZ2h0OiAjNjI2MjYyICFkZWZhdWx0O1xuXG4vLyBTVkcgaWNvbnNcbi8vIEZvciBCcmVhZGNydW1iXG4kZG91YmxlLWNoZXZyb24tcmlnaHQ6IFwiZGF0YTppbWFnZS9zdmcreG1sLCUzQ3N2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNCAyNCcgZmlsbD0nbm9uZScgc3Ryb2tlPSdjdXJyZW50Q29sb3InIHN0cm9rZS13aWR0aD0nMicgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJyBjbGFzcz0nZmVhdGhlciBmZWF0aGVyLWNoZXZyb25zLXJpZ2h0JyUzRSUzQ3BvbHlsaW5lIHBvaW50cz0nMTMgMTcgMTggMTIgMTMgNyclM0UlM0MvcG9seWxpbmUlM0UlM0Nwb2x5bGluZSBwb2ludHM9JzYgMTcgMTEgMTIgNiA3JyUzRSUzQy9wb2x5bGluZSUzRSUzQy9zdmclM0VcIjtcbi8vIENoZXZyb24gSWNvbnNcbiRjaGV2cm9uLWxlZnQ6IFwiZGF0YTppbWFnZS9zdmcreG1sLCUzQ3N2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNCAyNCcgZmlsbD0nbm9uZScgc3Ryb2tlPSdjdXJyZW50Q29sb3InIHN0cm9rZS13aWR0aD0nMicgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJyBjbGFzcz0nZmVhdGhlciBmZWF0aGVyLWNoZXZyb24tbGVmdCclM0UlM0Nwb2x5bGluZSBwb2ludHM9JzE1IDE4IDkgMTIgMTUgNiclM0UlM0MvcG9seWxpbmUlM0UlM0Mvc3ZnJTNFXCI7XG4kY2hldnJvbi1yaWdodDogXCJkYXRhOmltYWdlL3N2Zyt4bWwsJTNDc3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgdmlld0JveD0nMCAwIDI0IDI0JyBmaWxsPSdub25lJyBzdHJva2U9J2N1cnJlbnRDb2xvcicgc3Ryb2tlLXdpZHRoPScyJyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnIGNsYXNzPSdmZWF0aGVyIGZlYXRoZXItY2hldnJvbi1yaWdodCclM0UlM0Nwb2x5bGluZSBwb2ludHM9JzkgMTggMTUgMTIgOSA2JyUzRSUzQy9wb2x5bGluZSUzRSUzQy9zdmclM0VcIjtcbiRjaGV2cm9uLXVwOiBcImRhdGE6aW1hZ2Uvc3ZnK3htbCwlM0NzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB2aWV3Qm94PScwIDAgMjQgMjQnIGZpbGw9J25vbmUnIHN0cm9rZT0nY3VycmVudENvbG9yJyBzdHJva2Utd2lkdGg9JzInIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcgY2xhc3M9J2ZlYXRoZXIgZmVhdGhlci1jaGV2cm9uLXVwJyUzRSUzQ3BvbHlsaW5lIHBvaW50cz0nMTggMTUgMTIgOSA2IDE1JyUzRSUzQy9wb2x5bGluZSUzRSUzQy9zdmclM0VcIjtcbiRjaGV2cm9uLWRvd246IFwiZGF0YTppbWFnZS9zdmcreG1sLCUzQ3N2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNCAyNCcgZmlsbD0nbm9uZScgc3Ryb2tlPSdjdXJyZW50Q29sb3InIHN0cm9rZS13aWR0aD0nMicgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJyBjbGFzcz0nZmVhdGhlciBmZWF0aGVyLWNoZXZyb24tZG93biclM0UlM0Nwb2x5bGluZSBwb2ludHM9JzYgOSAxMiAxNSAxOCA5JyUzRSUzQy9wb2x5bGluZSUzRSUzQy9zdmclM0VcIjtcblxuJGRvd25sb2FkOiBcImRhdGE6aW1hZ2Uvc3ZnK3htbCwlM0NzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB2aWV3Qm94PScwIDAgMjQgMjQnIGZpbGw9J25vbmUnIHN0cm9rZT0nY3VycmVudENvbG9yJyBzdHJva2Utd2lkdGg9JzInIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcgY2xhc3M9J2ZlYXRoZXIgZmVhdGhlci1kb3dubG9hZCclM0UlM0NwYXRoIGQ9J00yMSAxNXY0YTIgMiAwIDAgMS0yIDJINWEyIDIgMCAwIDEtMi0ydi00JyUzRSUzQy9wYXRoJTNFJTNDcG9seWxpbmUgcG9pbnRzPSc3IDEwIDEyIDE1IDE3IDEwJyUzRSUzQy9wb2x5bGluZSUzRSUzQ2xpbmUgeDE9JzEyJyB5MT0nMTUnIHgyPScxMicgeTI9JzMnJTNFJTNDL2xpbmUlM0UlM0Mvc3ZnJTNFXCI7XG4kcmVtb3ZlOiBcImRhdGE6aW1hZ2Uvc3ZnK3htbCwlM0NzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB2aWV3Qm94PScwIDAgMjQgMjQnIGZpbGw9J25vbmUnIHN0cm9rZT0nY3VycmVudENvbG9yJyBzdHJva2Utd2lkdGg9JzInIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcgY2xhc3M9J2ZlYXRoZXIgZmVhdGhlci14JyUzRSUzQ2xpbmUgeDE9JzE4JyB5MT0nNicgeDI9JzYnIHkyPScxOCclM0UlM0MvbGluZSUzRSUzQ2xpbmUgeDE9JzYnIHkxPSc2JyB4Mj0nMTgnIHkyPScxOCclM0UlM0MvbGluZSUzRSUzQy9zdmclM0VcIjtcbiRjaGVjazogXCJkYXRhOmltYWdlL3N2Zyt4bWwsJTNDc3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgd2lkdGg9JzI0JyBoZWlnaHQ9JzI0JyB2aWV3Qm94PScwIDAgMjQgMjQnIGZpbGw9J25vbmUnIHN0cm9rZT0nY3VycmVudENvbG9yJyBzdHJva2Utd2lkdGg9JzInIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcgY2xhc3M9J2ZlYXRoZXIgZmVhdGhlci1jaGVjayclM0UlM0Nwb2x5bGluZSBwb2ludHM9JzIwIDYgOSAxNyA0IDEyJyUzRSUzQy9wb2x5bGluZSUzRSUzQy9zdmclM0VcIjtcbiRjaXJjbGU6IFwiZGF0YTppbWFnZS9zdmcreG1sLCUzQ3N2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScyNCcgaGVpZ2h0PScyNCcgdmlld0JveD0nMCAwIDI0IDI0JyBmaWxsPSdub25lJyBzdHJva2U9J2N1cnJlbnRDb2xvcicgc3Ryb2tlLXdpZHRoPScyJyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnIGNsYXNzPSdmZWF0aGVyIGZlYXRoZXItY2lyY2xlJyUzRSUzQ2NpcmNsZSBjeD0nMTInIGN5PScxMicgcj0nMTAnJTNFJTNDL2NpcmNsZSUzRSUzQy9zdmclM0VcIjtcbiRpbmZvSWNvbjogXCJkYXRhOmltYWdlL3N2Zyt4bWwsJTNDc3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgd2lkdGg9JzI0JyBoZWlnaHQ9JzI0JyB2aWV3Qm94PScwIDAgMjQgMjQnIGZpbGw9J25vbmUnIHN0cm9rZT0nY3VycmVudENvbG9yJyBzdHJva2Utd2lkdGg9JzInIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcgY2xhc3M9J2ZlYXRoZXIgZmVhdGhlci1pbmZvJyUzRSUzQ2NpcmNsZSBjeD0nMTInIGN5PScxMicgcj0nMTAnJTNFJTNDL2NpcmNsZSUzRSUzQ2xpbmUgeDE9JzEyJyB5MT0nMTYnIHgyPScxMicgeTI9JzEyJyUzRSUzQy9saW5lJTNFJTNDbGluZSB4MT0nMTInIHkxPSc4JyB4Mj0nMTIuMDEnIHkyPSc4JyUzRSUzQy9saW5lJTNFJTNDL3N2ZyUzRVwiO1xuJHdhcm5pbmdJY29uOiBcImRhdGE6aW1hZ2Uvc3ZnK3htbCwlM0NzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB3aWR0aD0nMjQnIGhlaWdodD0nMjQnIHZpZXdCb3g9JzAgMCAyNCAyNCcgZmlsbD0nbm9uZScgc3Ryb2tlPSdjdXJyZW50Q29sb3InIHN0cm9rZS13aWR0aD0nMicgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJyBjbGFzcz0nZmVhdGhlciBmZWF0aGVyLWFsZXJ0LXRyaWFuZ2xlJyUzRSUzQ3BhdGggZD0nTTEwLjI5IDMuODZMMS44MiAxOGEyIDIgMCAwIDAgMS43MSAzaDE2Ljk0YTIgMiAwIDAgMCAxLjcxLTNMMTMuNzEgMy44NmEyIDIgMCAwIDAtMy40MiAweiclM0UlM0MvcGF0aCUzRSUzQ2xpbmUgeDE9JzEyJyB5MT0nOScgeDI9JzEyJyB5Mj0nMTMnJTNFJTNDL2xpbmUlM0UlM0NsaW5lIHgxPScxMicgeTE9JzE3JyB4Mj0nMTIuMDEnIHkyPScxNyclM0UlM0MvbGluZSUzRSUzQy9zdmclM0VcIjtcbiRtZW51OiBcImRhdGE6aW1hZ2Uvc3ZnK3htbCwlM0NzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB2aWV3Qm94PScwIDAgMjQgMjQnIHdpZHRoPScyNCcgaGVpZ2h0PScyNCcgc3Ryb2tlPSdjdXJyZW50Q29sb3InIHN0cm9rZS13aWR0aD0nMicgZmlsbD0nbm9uZScgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJyBjbGFzcz0nY3NzLWk2ZHpxMSclM0UlM0NsaW5lIHgxPSczJyB5MT0nMTInIHgyPScyMScgeTI9JzEyJyUzRSUzQy9saW5lJTNFJTNDbGluZSB4MT0nMycgeTE9JzYnIHgyPScyMScgeTI9JzYnJTNFJTNDL2xpbmUlM0UlM0NsaW5lIHgxPSczJyB5MT0nMTgnIHgyPScyMScgeTI9JzE4JyUzRSUzQy9saW5lJTNFJTNDL3N2ZyUzRVwiO1xuXG4kY2hhdC1iZy1saWdodDogJ2RhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEQ5NGJXd2dkbVZ5YzJsdmJqMGlNUzR3SWlCbGJtTnZaR2x1WnowaWRYUm1MVGdpUHo0S1BDRXRMU0JIWlc1bGNtRjBiM0k2SUVGa2IySmxJRWxzYkhWemRISmhkRzl5SURJekxqQXVNU3dnVTFaSElFVjRjRzl5ZENCUWJIVm5MVWx1SUM0Z1UxWkhJRlpsY25OcGIyNDZJRFl1TURBZ1FuVnBiR1FnTUNrZ0lDMHRQZ284YzNabklIWmxjbk5wYjI0OUlqRXVNU0lnYVdROUlreGhlV1Z5WHpFaUlIaHRiRzV6UFNKb2RIUndPaTh2ZDNkM0xuY3pMbTl5Wnk4eU1EQXdMM04yWnlJZ2VHMXNibk02ZUd4cGJtczlJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5MekU1T1RrdmVHeHBibXNpSUhnOUlqQndlQ0lnZVQwaU1IQjRJZ29KSUhacFpYZENiM2c5SWpBZ01DQXlOakFnTWpZd0lpQnpkSGxzWlQwaVpXNWhZbXhsTFdKaFkydG5jbTkxYm1RNmJtVjNJREFnTUNBeU5qQWdNall3T3lJZ2VHMXNPbk53WVdObFBTSndjbVZ6WlhKMlpTSStDanh6ZEhsc1pTQjBlWEJsUFNKMFpYaDBMMk56Y3lJK0Nna3VjM1F3ZTJacGJHd3RjblZzWlRwbGRtVnViMlJrTzJOc2FYQXRjblZzWlRwbGRtVnViMlJrTzJacGJHdzZJMFV4UlRCRk9UdDlDand2YzNSNWJHVStDanhuUGdvSlBHY2dhV1E5SW1rdGJHbHJaUzFtYjI5a0lqNEtDUWs4Y0dGMGFDQmpiR0Z6Y3owaWMzUXdJaUJrUFNKTk1qUXVOQ3d4Tm1Nd0xqSXNNQzQyTERBdU5Dd3hMak1zTUM0MUxESm9MVE11TjJ3eExqSXNNaTR6YkRBdU5Td3dMamxzTFRBdU1pd3dMakZXTWpoak1pNHlMREV1Tnl3eUxqY3NOQzQ0TERFc053b0pDUWxqTFRBdU9Dd3hMVEV1T1N3eExqY3RNeTR5TERFdU9WWXpOMk10TUM0NUxETXVOUzAwTGpFc05pMDNMamdzTm1ndE1qQmpMVE11Tml3d0xUWXVPQzB5TGpVdE55NDNMVFoyTFRBdU1XTXRNaTQzTFRBdU5DMDBMall0TXkwMExqSXROUzQzWXpBdU1pMHhMak1zTUM0NUxUSXVOU3d4TGprdE15NHlDZ2tKQ1hZdE5pNDRiQzB3TGpndE1TNDJiQzB3TGpRdE1DNDViREF1T1Mwd0xqUk1MVEUzTERFNGFDMHpReTB4Tnk0eUxEVXVOaTAwTGprdE1pNHlMRGN1TlN3d0xqWkRNVFV1TkN3eUxqTXNNakV1T1N3NExqSXNNalF1TkN3eE5ub2dUUzB4TWk0MExERTRZeTB3TGpJc01DMHdMak1zTUMwd0xqUXNNQzR4Q2drSkNXd3RNeTR4TERFdU5td3dMamtzTVM0NGJERXVNeTB3TGpkak1DNDRMVEF1TkN3eExqZ3RNQzQwTERJdU55d3diREl1TWl3eExqRmpNQzR6TERBdU1Td3dMallzTUM0eExEQXVPU3d3YkRJdU1pMHhMakZqTUM0NExUQXVOQ3d4TGpndE1DNDBMREl1Tnl3d2JESXVNaXd4TGpFS0NRa0pZekF1TXl3d0xqRXNNQzQyTERBdU1Td3dMamtzTUd3eUxqSXRNUzR4WXpBdU9DMHdMalFzTVM0NExUQXVOQ3d5TGpjc01Hd3lMaklzTVM0eFF6Y3VOQ3d5TWl3M0xqY3NNaklzT0N3eU1TNDViREl1T1MweExqTmpNQzQ0TFRBdU15d3hMamN0TUM0ekxESXVOQ3d3YkRJdU9Td3hMak1LQ1FrSll6QXVNeXd3TGpFc01DNDJMREF1TVN3d0xqa3NNR3d6TGpFdE1TNDFiQzB3TGprdE1TNDRiQzB4TGpRc01DNDNZeTB3TGpnc01DNDBMVEV1Tnl3d0xqUXRNaTQyTERBdU1Xd3RNaTQ0TFRFdU1rTXhNaTR6TERFNExERXlMaklzTVRnc01USXVNU3d4T0d3d0xEQUtDUWtKWXkwd0xqRXNNQzB3TGpNc01DMHdMalFzTUM0eGJDMHlMamdzTVM0eVl5MHdMamdzTUM0MExURXVPQ3d3TGpNdE1pNDJMVEF1TVV3MExERTRMakZETXk0NUxERTRMRE11Tnl3eE9Dd3pMallzTVRoc01Dd3dZeTB3TGpJc01DMHdMak1zTUMwd0xqUXNNQzR4VERFc01Ua3VNZ29KQ1FsakxUQXVPQ3d3TGpRdE1TNDRMREF1TkMweUxqY3NNRXd0TkN3eE9DNHhReTAwTGpFc01UZ3ROQzR6TERFNExUUXVOQ3d4T0d3d0xEQmpMVEF1TWl3d0xUQXVNeXd3TFRBdU5Dd3dMakZNTFRjc01Ua3VNbU10TUM0NExEQXVOQzB4TGpnc01DNDBMVEl1Tnl3d2JDMHlMakl0TVM0eENna0pDVU10TVRJdU1Td3hPQzB4TWk0ekxERTRMVEV5TGpRc01UaE1MVEV5TGpRc01UaE1MVEV5TGpRc01UaDZJRTB0TVRJdU5Dd3hObWd0TkM0NVF5MHhNeTQxTERVdU1TMHhMalV0TUM0M0xEa3VOU3d6TGpKak5pd3lMakVzTVRBdU55dzJMamdzTVRJdU9Dd3hNaTQ0YUMweUxqRnNMVEF1TVMwd0xqRUtDUWtKVERFNUxqa3NNVFpJTFRFeUxqUk1MVEV5TGpRc01UWjZJRTB4Tnk0NUxESXpMamRzTVM0MExUQXVOMmd4TGpOMk1tZ3RNeloyTFRFdU1Xd3dMak10TUM0eWJERXVOQzB3TGpkb01pNDJiREV1TkN3d0xqZGpNQzQ0TERBdU5Dd3hMamdzTUM0MExESXVOeXd3YkRFdU5DMHdMamRJTFRNS0NRa0piREV1TkN3d0xqZGpNQzQ0TERBdU5Dd3hMamdzTUM0MExESXVOeXd3VERJdU15d3lNMmd5TGpac01TNDBMREF1TjJNd0xqY3NNQzQwTERFdU55d3dMalFzTWk0MUxEQnNNUzQzTFRBdU4yZ3pMakpzTVM0M0xEQXVOME14Tmk0eUxESTBMakVzTVRjdU1Td3lOQzR4TERFM0xqa3NNak11TjNvS0NRa0pJRTB0TVRNdU9Dd3lOMnd4Tmk0MExEUXVPVXd4T0M0NUxESTNTQzB4TXk0NGVpQk5MVEUwTGpRc01qbG9NQzR6YkRFMkxqY3NOV3d4Tmk0M0xUVm9NQzR6WXpFdU55d3dMRE1zTVM0ekxETXNNM010TVM0ekxETXRNeXd6YUMwek5HTXRNUzQzTERBdE15MHhMak10TXkwekNna0pDVU10TVRjdU5Dd3pNQzR6TFRFMkxqRXNNamt0TVRRdU5Dd3lPWG9nVFMweE15NHhMRE0zWXpBdU9Dd3lMalFzTXk0eExEUXNOUzQzTERSb01qQmpNaTQxTERBc05DNDRMVEV1Tml3MUxqY3RORU14T0M0eUxETTNMVEV6TGpFc016Y3RNVE11TVN3ek4zb2lMejRLQ1FrOGNHRjBhQ0JwWkQwaWNHRjBhRFpmWm1sc2JDMWpiM0I1SWlCamJHRnpjejBpYzNRd0lpQmtQU0pOTWpnMExqUXNNVFpqTUM0eUxEQXVOaXd3TGpRc01TNHpMREF1TlN3eWFDMHpMamRzTVM0eUxESXVNMnd3TGpVc01DNDViQzB3TGpJc01DNHhWakk0WXpJdU1pd3hMamNzTWk0M0xEUXVPQ3d4TERjS0NRa0pZeTB3TGpnc01TMHhMamtzTVM0M0xUTXVNaXd4TGpsV016ZGpMVEF1T1N3ekxqVXROQzR4TERZdE55NDRMRFpvTFRJd1l5MHpMallzTUMwMkxqZ3RNaTQxTFRjdU55MDJkaTB3TGpGakxUSXVOeTB3TGpRdE5DNDJMVE10TkM0eUxUVXVOMk13TGpJdE1TNHpMREF1T1MweUxqVXNNUzQ1TFRNdU1nb0pDUWwyTFRZdU9Hd3RNQzQ0TFRFdU5td3RNQzQwTFRBdU9Xd3dMamt0TUM0MFRESTBNeXd4T0dndE0yTXlMamd0TVRJdU5Dd3hOUzR4TFRJd0xqSXNNamN1TlMweE55NDBRekkzTlM0MExESXVNeXd5T0RFdU9TdzRMaklzTWpnMExqUXNNVFo2SUUweU5EY3VOU3d4T0FvSkNRbGpMVEF1TWl3d0xUQXVNeXd3TFRBdU5Dd3dMakZzTFRNdU1Td3hMalpzTUM0NUxERXVPR3d4TGpNdE1DNDNZekF1T0Mwd0xqUXNNUzQ0TFRBdU5Dd3lMamNzTUd3eUxqSXNNUzR4WXpBdU15d3dMakVzTUM0MkxEQXVNU3d3TGprc01Hd3lMakl0TVM0eENna0pDV013TGpndE1DNDBMREV1T0Mwd0xqUXNNaTQzTERCc01pNHlMREV1TVdNd0xqTXNNQzR4TERBdU5pd3dMakVzTUM0NUxEQnNNaTR5TFRFdU1XTXdMamd0TUM0MExERXVPQzB3TGpRc01pNDNMREJzTWk0eUxERXVNV013TGpNc01DNHhMREF1Tml3d0xqRXNNQzQ1TERCc01pNDVMVEV1TXdvSkNRbGpNQzQ0TFRBdU15d3hMamN0TUM0ekxESXVOQ3d3YkRJdU9Td3hMak5qTUM0ekxEQXVNU3d3TGpZc01DNHhMREF1T1N3d2JETXVNUzB4TGpWc0xUQXVPUzB4TGpoc0xURXVOQ3d3TGpkakxUQXVPQ3d3TGpRdE1TNDNMREF1TkMweUxqWXNNQzR4YkMweUxqZ3RNUzR5Q2drSkNXTXRNQzR4TFRBdU1TMHdMak10TUM0eExUQXVOQzB3TGpGc01Dd3dZeTB3TGpFc01DMHdMak1zTUMwd0xqUXNNQzR4YkMweUxqZ3NNUzR5WXkwd0xqZ3NNQzQwTFRFdU9Dd3dMak10TWk0MkxUQXVNV3d0TWk0ekxURXVNV010TUM0eExUQXVNUzB3TGpNdE1DNHhMVEF1TlMwd0xqRnNNQ3d3Q2drSkNXTXRNQzR5TERBdE1DNHpMREF0TUM0MExEQXVNV3d0TWk0eUxERXVNV010TUM0NExEQXVOQzB4TGpnc01DNDBMVEl1Tnl3d2JDMHlMakl0TVM0eFl5MHdMakV0TUM0eExUQXVNeTB3TGpFdE1DNDBMVEF1TVd3d0xEQmpMVEF1TWl3d0xUQXVNeXd3TFRBdU5Dd3dMakZzTFRJdU1pd3hMakVLQ1FrSll5MHdMamdzTUM0MExURXVPQ3d3TGpRdE1pNDNMREJzTFRJdU1pMHhMakZETWpRM0xqa3NNVGdzTWpRM0xqY3NNVGdzTWpRM0xqVXNNVGhNTWpRM0xqVXNNVGhNTWpRM0xqVXNNVGg2SUUweU5EY3VOU3d4Tm1ndE5DNDVZek11T1MweE1DNDVMREUxTGprdE1UWXVOeXd5Tmk0NExURXlMamdLQ1FrSll6WXNNaTR4TERFd0xqY3NOaTQ0TERFeUxqZ3NNVEl1T0dndE1pNHhiQzB3TGpFdE1DNHhiQzB3TGpNc01DNHhTREkwTnk0MVRESTBOeTQxTERFMmVpQk5NamMzTGprc01qTXVOMnd4TGpRdE1DNDNhREV1TTNZeWFDMHpObll0TVM0eGJEQXVNeTB3TGpKc01TNDBMVEF1TjJneUxqWUtDUWtKYkRFdU5Dd3dMamRqTUM0NExEQXVOQ3d4TGpnc01DNDBMREl1Tnl3d2JERXVOQzB3TGpkb01pNDJiREV1TkN3d0xqZGpNQzQ0TERBdU5Dd3hMamdzTUM0MExESXVOeXd3YkRFdU5DMHdMamRvTWk0MmJERXVOQ3d3TGpkak1DNDRMREF1TkN3eExqY3NNQzQwTERJdU5pd3dMakZzTVM0M0xUQXVOd29KQ1Fsb015NHliREV1Tnl3d0xqZERNamMyTGpJc01qUXVNU3d5TnpjdU1Td3lOQzR4TERJM055NDVMREl6TGpkTU1qYzNMamtzTWpNdU4zb2dUVEkwTmk0eUxESTNiREUyTGpRc05DNDVUREkzT1N3eU4wZ3lORFl1TW5vZ1RUSTBOUzQxTERJNWFEQXVNMnd4Tmk0M0xEVnNNVFl1TnkwMWFEQXVNd29KQ1Fsak1TNDNMREFzTXl3eExqTXNNeXd6Y3kweExqTXNNeTB6TEROb0xUTTBZeTB4TGpjc01DMHpMVEV1TXkwekxUTlRNalF6TGprc01qa3NNalExTGpVc01qbDZJRTB5TkRZdU9Td3pOMk13TGpnc01pNDBMRE11TVN3MExEVXVOaXcwYURJd1l6SXVOU3d3TERRdU9DMHhMallzTlM0M0xUUUtDUWtKU0RJME5pNDVlaUl2UGdvSkNUeHdZWFJvSUdOc1lYTnpQU0p6ZERBaUlHUTlJazB4TlRrdU5Td3lNV010TVM0ekxUTXVOaTAwTGpjdE5pMDRMalV0Tm1ndE5ESmpMVE11T0N3d0xUY3VNaXd5TGpRdE9DNDFMRFpqTFRNdU15d3dMak10TlM0NExETXVNaTAxTGpVc05pNDFZekF1TWl3eUxqa3NNaTQyTERVdU1pdzFMalVzTlM0MUNna0pDV010TVM0M0xEUXVOeXd3TGpnc09TNDRMRFV1TkN3eE1TNDFZekVzTUM0ekxESXNNQzQxTERNc01DNDFhRFF5WXpVc01DdzVMVFFzT1MwNVl6QXRNUzB3TGpJdE1pNHhMVEF1TlMwell6TXVNeTB3TGpNc05TNDRMVE11TWl3MUxqVXROaTQxQ2drSkNVTXhOalF1Tnl3eU15NDJMREUyTWk0MExESXhMak1zTVRVNUxqVXNNakY2SUUweE5URXNNVGRvTFRReVl5MHlMamNzTUMwMUxqSXNNUzQyTFRZdU15dzBhRFUwTGpkRE1UVTJMaklzTVRndU5pd3hOVE11Tnl3eE55d3hOVEVzTVRkNklFMHhOREV1Tnl3ME13b0pDUWxqTWk0eExURXVOeXd6TGpNdE5DNHpMRE11TXkwM2FDMHlZekFzTXk0NUxUTXVNU3czTFRjc04yZ3ROQzR6WXpJdU1TMHhMamNzTXk0ekxUUXVNeXd6TGpNdE4yZ3RNbU13TERNdU9TMHpMakVzTnkwM0xEZG9MVFF1TTJNeUxqRXRNUzQzTERNdU15MDBMak1zTXk0ekxUZG9MVElLQ1FrSll6QXNNeTQ1TFRNdU1TdzNMVGNzTjJndE4yTXRNeTQ1TERBdE55MHpMakV0TnkwM2N6TXVNUzAzTERjdE4yZzBNbU16TGprc01DdzNMRE11TVN3M0xEZHpMVE11TVN3M0xUY3NOMGd4TkRFdU4zb2dUVEV3T1N3eU4yTXRNeXd3TFRVdU9Dd3hMalV0Tnk0MUxEUklNVEF4Q2drSkNXTXRNaTR5TERBdE5DMHhMamd0TkMwMGN6RXVPQzAwTERRdE5HZzFPR015TGpJc01DdzBMREV1T0N3MExEUnpMVEV1T0N3MExUUXNOR2d0TUM0MVl5MHhMamN0TWk0MUxUUXVOUzAwTFRjdU5TMDBTREV3T1hvaUx6NEtDUWs4Y0dGMGFDQmpiR0Z6Y3owaWMzUXdJaUJrUFNKTk16a3NNVEUxWXpRdU5Dd3dMRGd0TXk0MkxEZ3RPSE10TXk0MkxUZ3RPQzA0Y3kwNExETXVOaTA0TERoVE16UXVOaXd4TVRVc016a3NNVEUxZWlCTk5EVXNNVEEzWXpBc015NHpMVEl1Tnl3MkxUWXNObk10TmkweUxqY3ROaTAyQ2drSkNYTXlMamN0Tml3MkxUWlRORFVzTVRBekxqY3NORFVzTVRBM2VpQk5ORElzTnpoMkxUSm9PSFl0TmtnME1HTXRNaTR5TERBdE5Dd3hMamd0TkN3MGRqRXdTREl5YkMweExqTXNORXd5TUN3NU1HZ3lMakpzTXk0NExEUXdhREkyYkRNdU9DMDBNRWcxT0d3dE1DNDNMVEpNTlRZc09EUklOREpXTnpoNkNna0pDU0JOTXpnc056UjJNVEJvTWxZM05HZzRkaTB5YUMwNFF6TTRMamtzTnpJc016Z3NOekl1T1N3ek9DdzNOSG9nVFRRd0xEZzJhREUwTGpac01DNDNMREpJTWpJdU9Hd3dMamN0TWtnME1Ib2dUVFV6TGpnc09UQklNalF1TW13ekxqWXNNemhvTWpJdU5FdzFNeTQ0TERrd2VpSXZQZ29KQ1R4d1lYUm9JR05zWVhOelBTSnpkREFpSUdROUlrMHhNamtzT1RKb0xUWjJOR2d0Tm5ZMGFDMDJkakUwYUMwemJEQXVNaXd5YkRNdU9Dd3pNbWd6Tm13ekxqZ3RNekpzTUM0eUxUSm9MVE4yTFRFMGFDMDJkaTAwYUMwMmRpMDBTREV5T1hvZ1RURTBOeXd4TVRSMkxURXlhQzAwZGpSb00zWTRTREUwTndvSkNRbDZJRTB4TkRRc01URTBkaTAyYUMwMGRqWklNVFEwZWlCTk1UTTRMREV5TUhZdE1UWm9MVFIyTVRrdU1rTXhNelV1Tml3eE1qSXVOU3d4TXpjc01USXhMalFzTVRNNExERXlNSG9nVFRFek1pd3hNak11T0ZZeE1EQm9MVFIyTWpNdU9Bb0pDUWxETVRJNUxqTXNNVEkwTGpFc01UTXdMamNzTVRJMExqRXNNVE15TERFeU15NDRlaUJOTVRJMkxERXlNeTR5VmpFd05HZ3ROSFl4TmtNeE1qTXNNVEl4TGpRc01USTBMalFzTVRJeUxqVXNNVEkyTERFeU15NHllaUJOTVRJd0xERXhOSFl0Tm1ndE5IWTJTREV5TUhvZ1RURXhOQ3d4TVRSMkxUaG9Nd29KQ1FsMkxUUm9MVFIyTVRKSU1URTBlaUJOTVRReExERXdNbll0TkdndE5IWTBhRE4yTkdneFZqRXdNbm9nVFRFek5Td3hNREoyTFRob0xUUjJOR2d6ZGpSSU1UTTFlaUJOTVRJNUxEazRkaTAwYUMwMGRqaG9NWFl0TkVneE1qbDZJRTB4TWpNc01UQXlkaTAwYUMwMGRqaG9NWFl0TkVneE1qTjZDZ2tKQ1NCTk1UTXdMREV5Tm1NMUxqa3NNQ3d4TUM0NUxUUXVNaXd4TVM0NExURXdhRGN1T1d3dE15NDFMRE13YUMwek1pNDBiQzB6TGpVdE16Qm9OeTQ1UXpFeE9TNHhMREV5TVM0NExERXlOQzR4TERFeU5pd3hNekFzTVRJMmVpSXZQZ29KQ1R4d1lYUm9JR05zWVhOelBTSnpkREFpSUdROUlrMHlNVElzT0RaMk1tZ3ROSFl0TWtneU1USjZJRTB5TVRZc09EWm9MVEoyTW1neVZqZzJlaUJOTVRrMkxEZzJUREU1Tml3NE5tTXRNaTQzTERBdU55MDBMalVzTXk0ekxUTXVPU3cyWXpBdU5Dd3hMamdzTVM0MkxETXVNaXd6TGpNc015NDRDZ2tKQ1d3d0xqRXNNQzR5YkRFdU1TdzBMalZqTUM0eUxEQXVPU3d4TERFdU5Td3hMamtzTVM0MWJEQXNNR3czTERJMExqWmpNQzR5TERBdU9Td3hMREV1TkN3eExqa3NNUzQwYURWak1DNDVMREFzTVM0M0xUQXVOaXd4TGprdE1TNDBiRGN0TWpRdU5tTXdMamtzTUN3eExqY3RNQzQyTERFdU9TMHhMalVLQ1FrSmJERXVNUzAwTGpWc01DNHhMVEF1TW1NeUxqWXRNQzQ1TERRdU1TMHpMamNzTXk0eUxUWXVNMk10TUM0MkxURXVOeTB5TFRNdE15NDRMVE11TTFZNE5tTXdMVGN1TnkwMkxqTXRNVFF0TVRRdE1UUlRNVGsyTERjNExqTXNNVGsyTERnMmVpQk5NakF3TERnMmFEWjJNbWd0T1FvSkNRbGpMVEV1Tnl3d0xUTXNNUzR6TFRNc00zTXhMak1zTXl3ekxETm9NalpqTVM0M0xEQXNNeTB4TGpNc015MHpjeTB4TGpNdE15MHpMVE5vTFROMkxUSm9NbU13TFRZdU5pMDFMalF0TVRJdE1USXRNVEp6TFRFeUxEVXVOQzB4TWl3eE1rZ3lNREI2SUUweE9UZ3VOaXd4TURCc0xURXROR2d5TkM0NUNna0pDV3d0TVN3MFNERTVPQzQyZWlCTk1qQTNMalVzTVRJMmJDMDJMamt0TWpSb01UZ3VOMnd0Tmk0NUxESTBTREl3Tnk0MWVpQk5NVFV3TERJME1tTXhNaTR5TERBc01qSXRPUzQ0TERJeUxUSXljeTA1TGpndE1qSXRNakl0TWpKekxUSXlMRGt1T0MweU1pd3lNZ29KQ1FsVE1UTTNMamdzTWpReUxERTFNQ3d5TkRKNklFMHhOelFzTWpJd1l6QXNNVE11TXkweE1DNDNMREkwTFRJMExESTBjeTB5TkMweE1DNDNMVEkwTFRJMGJEQXNNR013TFRFekxqTXNNVEF1TnkweU5Dd3lOQzB5TkZNeE56UXNNakEyTGpjc01UYzBMREl5TUhvZ1RURTBOUzQyTERJek55NDNDZ2tKQ1d3eUxUQXVPV014TGpVdE1DNDJMRE11TWkwd0xqWXNOQzQzTERCc01pd3dMamxqTUM0NUxEQXVOQ3d5TERBc01pNDFMVEF1T0d3eExqRXRNUzQ1WXpBdU9DMHhMalFzTWk0eUxUSXVOQ3d6TGpndE1pNDRiREl1TVMwd0xqVmpNUzB3TGpJc01TNDJMVEV1TVN3eExqVXRNaTR4YkMwd0xqSXRNaTR5Q2drSkNXTXRNQzR4TFRFdU5pd3dMalF0TXk0eUxERXVOQzAwTGpWc01TNDBMVEV1TjJNd0xqY3RNQzQ0TERBdU55MHhMamtzTUMweUxqWnNMVEV1TkMweExqZGpMVEV1TVMweExqSXRNUzQyTFRJdU9DMHhMalF0TkM0MWJEQXVNaTB5TGpKak1DNHhMVEV0TUM0MkxURXVPUzB4TGpZdE1pNHhDZ2tKQ1d3dE1pNHhMVEF1TldNdE1TNDJMVEF1TkMwekxURXVOQzB6TGpndE1pNDRiQzB4TGpFdE1TNDVZeTB3TGpVdE1DNDVMVEV1TmkweExqSXRNaTQxTFRBdU9Hd3RNaXd3TGpsakxURXVOU3d3TGpZdE15NHlMREF1TmkwMExqY3NNR3d0TWkwd0xqbGpMVEF1T1Mwd0xqUXRNaXd3TFRJdU5Td3dMamdLQ1FrSmJDMHhMREl1TVdNdE1DNDRMREV1TkMweUxqSXNNaTQwTFRNdU9Dd3lMamhzTFRJdU1Td3dMalZqTFRFc01DNHlMVEV1Tml3eExqRXRNUzQxTERJdU1Xd3dMaklzTWk0eVl6QXVNU3d4TGpZdE1DNDBMRE11TWkweExqUXNOQzQxYkMweExqUXNNUzQzQ2drSkNXTXRNQzQzTERBdU9DMHdMamNzTVM0NUxEQXNNaTQyYkRFdU5Dd3hMamRqTVM0eExERXVNaXd4TGpZc01pNDRMREV1TkN3MExqVnNMVEF1TWl3eUxqSmpMVEF1TVN3eExEQXVOaXd4TGprc01TNDJMREl1TVd3eUxqRXNNQzQxWXpFdU5pd3dMalFzTXl3eExqUXNNeTQ0TERJdU9Hd3hMakVzTVM0NUNna0pDVU14TkRNdU5pd3lNemN1T0N3eE5EUXVOeXd5TXpndU1Td3hORFV1Tml3eU16Y3VOMHd4TkRVdU5pd3lNemN1TjNvZ1RURTBPQzQwTERJek9DNDNZekV0TUM0MExESXVNUzB3TGpRc015NHhMREJzTWl3d0xqbGpNUzQ0TERBdU9DdzBMREF1TVN3MUxURXVObXd4TGpFdE1TNDVDZ2tKQ1dNd0xqWXRNQzQ1TERFdU5TMHhMallzTWk0MUxURXVPR3d5TGpFdE1DNDFZekV1T1Mwd0xqUXNNeTR6TFRJdU15d3pMakV0TkM0eWJDMHdMakl0TWk0eVl5MHdMakV0TVM0eExEQXVNeTB5TGpJc01TMHpiREV1TkMweExqZGpNUzR6TFRFdU5Td3hMak10TXk0M0xEQXROUzR5YkMweExqUXRNUzQzQ2drSkNXTXRNQzQzTFRBdU9DMHhMakV0TVM0NUxURXRNMnd3TGpJdE1pNHlZekF1TWkweUxURXVNUzB6TGpndE15NHhMVFF1TW13dE1pNHhMVEF1TldNdE1TNHhMVEF1TWkweUxUQXVPUzB5TGpVdE1TNDRiQzB4TGpFdE1TNDVZeTB4TFRFdU55MHpMakl0TWk0MExUVXRNUzQyYkMweUxEQXVPUW9KQ1FsakxURXNNQzQwTFRJdU1Td3dMalF0TXk0eExEQnNMVEl0TUM0NVl5MHhMamd0TUM0NExUUXRNQzR4TFRVc01TNDJiQzB4TGpFc01TNDVZeTB3TGpZc01DNDVMVEV1TlN3eExqWXRNaTQxTERFdU9Hd3RNaTR4TERBdU5XTXRNUzQ1TERBdU5DMHpMak1zTWk0ekxUTXVNU3cwTGpKc01DNHlMREl1TWdvSkNRbGpNQzR4TERFdU1TMHdMak1zTWk0eUxURXNNMnd0TVM0MExERXVOMk10TVM0ekxERXVOUzB4TGpNc015NDNMREFzTlM0eWJERXVOQ3d4TGpkak1DNDNMREF1T0N3eExqRXNNUzQ1TERFc00yd3RNQzR5TERJdU1tTXRNQzR5TERJc01TNHhMRE11T0N3ekxqRXNOQzR5YkRJdU1Td3dMalVLQ1FrSll6RXVNU3d3TGpJc01pd3dMamtzTWk0MUxERXVPR3d4TGpFc01TNDVZekVzTVM0M0xETXVNaXd5TGpRc05Td3hMalpNTVRRNExqUXNNak00TGpkNklFMHhOVElzTWpBM1l6QXRNQzQyTERBdU5DMHhMREV0TVhNeExEQXVOQ3d4TERGekxUQXVOQ3d4TFRFc01Rb0pDUWxUTVRVeUxESXdOeTQyTERFMU1pd3lNRGQ2SUUweE5UZ3NNakE1WXpBdE1DNDJMREF1TkMweExERXRNWE14TERBdU5Dd3hMREZ6TFRBdU5Dd3hMVEVzTVZNeE5UZ3NNakE1TGpZc01UVTRMREl3T1hvZ1RURTBOeXd5TVRCak1DMHdMallzTUM0MExURXNNUzB4Y3pFc01DNDBMREVzTVFvSkNRbHpMVEF1TkN3eExURXNNVk14TkRjc01qRXdMallzTVRRM0xESXhNSG9nVFRFME1Td3lNVEJqTUMwd0xqWXNNQzQwTFRFc01TMHhjekVzTUM0MExERXNNWE10TUM0MExERXRNU3d4VXpFME1Td3lNVEF1Tml3eE5ERXNNakV3ZWlCTk1UUTBMREl3TldNd0xUQXVOaXd3TGpRdE1Td3hMVEVLQ1FrSmN6RXNNQzQwTERFc01YTXRNQzQwTERFdE1Td3hVekUwTkN3eU1EVXVOaXd4TkRRc01qQTFlaUJOTVRNMkxESXhNMk13TFRBdU5pd3dMalF0TVN3eExURnpNU3d3TGpRc01Td3hjeTB3TGpRc01TMHhMREZUTVRNMkxESXhNeTQyTERFek5pd3lNVE42SUUweE16a3NNakU1Q2drSkNXTXdMVEF1Tml3d0xqUXRNU3d4TFRGek1Td3dMalFzTVN3eGN5MHdMalFzTVMweExERlRNVE01TERJeE9TNDJMREV6T1N3eU1UbDZJRTB4TXprc01qSTFZekF0TUM0MkxEQXVOQzB4TERFdE1YTXhMREF1TkN3eExERnpMVEF1TkN3eExURXNNVk14TXprc01qSTFMallzTVRNNUxESXlOWG9LQ1FrSklFMHhORE1zTWpNeVl6QXRNQzQyTERBdU5DMHhMREV0TVhNeExEQXVOQ3d4TERGekxUQXVOQ3d4TFRFc01WTXhORE1zTWpNeUxqWXNNVFF6TERJek1ub2dUVEUwT0N3eU16QmpNQzB3TGpZc01DNDBMVEVzTVMweGN6RXNNQzQwTERFc01YTXRNQzQwTERFdE1Td3hDZ2tKQ1ZNeE5EZ3NNak13TGpZc01UUTRMREl6TUhvZ1RURTFNeXd5TXpSak1DMHdMallzTUM0MExURXNNUzB4Y3pFc01DNDBMREVzTVhNdE1DNDBMREV0TVN3eFV6RTFNeXd5TXpRdU5pd3hOVE1zTWpNMGVpQk5NVFUzTERJeU9HTXdMVEF1Tml3d0xqUXRNU3d4TFRGek1Td3dMalFzTVN3eENna0pDWE10TUM0MExERXRNU3d4VXpFMU55d3lNamd1Tml3eE5UY3NNakk0ZWlCTk1UWXpMREl5TkdNd0xUQXVOaXd3TGpRdE1Td3hMVEZ6TVN3d0xqUXNNU3d4Y3kwd0xqUXNNUzB4TERGVE1UWXpMREl5TkM0MkxERTJNeXd5TWpSNklFMHhOVGtzTWpJeFl6QXRNQzQyTERBdU5DMHhMREV0TVFvSkNRbHpNU3d3TGpRc01Td3hjeTB3TGpRc01TMHhMREZUTVRVNUxESXlNUzQyTERFMU9Td3lNakY2SUUweE5qTXNNakU0WXpBdE1DNDJMREF1TkMweExERXRNWE14TERBdU5Dd3hMREZ6TFRBdU5Dd3hMVEVzTVZNeE5qTXNNakU0TGpZc01UWXpMREl4T0hvZ1RURTFPQ3d5TVRRS0NRa0pZekF0TUM0MkxEQXVOQzB4TERFdE1YTXhMREF1TkN3eExERnpMVEF1TkN3eExURXNNVk14TlRnc01qRTBMallzTVRVNExESXhOSG9nVFRFek5Dd3lNakJqTUMwd0xqWXNNQzQwTFRFc01TMHhjekVzTUM0MExERXNNWE10TUM0MExERXRNU3d4VXpFek5Dd3lNakF1Tml3eE16UXNNakl3ZWdvSkNRa2dUVEUxTUN3eU1qVmpNaTQ0TERBc05TMHlMaklzTlMwMWN5MHlMakl0TlMwMUxUVnpMVFVzTWk0eUxUVXNOVk14TkRjdU1pd3lNalVzTVRVd0xESXlOWG9nVFRFMU55d3lNakJqTUN3ekxqa3RNeTR4TERjdE55dzNjeTAzTFRNdU1TMDNMVGR6TXk0eExUY3NOeTAzQ2drSkNWTXhOVGNzTWpFMkxqRXNNVFUzTERJeU1Ib2dUVEkwTXl3eE9URmpMVEF1Tml3d0xURXNNQzQwTFRFc01YTXdMalFzTVN3eExERm9NbU13TGpZc01Dd3hMVEF1TkN3eExURnpMVEF1TkMweExURXRNVWd5TkRONklFMHlOaklzTWpBd1l6QXRNQzQyTERBdU5DMHhMREV0TVdneUNna0pDV013TGpZc01Dd3hMREF1TkN3eExERnpMVEF1TkN3eExURXNNV2d0TWtNeU5qSXVOQ3d5TURFc01qWXlMREl3TUM0MkxESTJNaXd5TURCNklFMHlORGdzTWpBMVl5MHdMallzTUMweExEQXVOQzB4TERGek1DNDBMREVzTVN3eGFESmpNQzQyTERBc01TMHdMalFzTVMweGN5MHdMalF0TVMweExURUtDUWtKU0RJME9Ib2dUVEl5TXl3eU1EWmpMVEF1Tml3d0xURXNNQzQwTFRFc01YTXdMalFzTVN3eExERm9NbU13TGpZc01Dd3hMVEF1TkN3eExURnpMVEF1TkMweExURXRNVWd5TWpONklFMHlNamdzTWpFd1l5MHdMallzTUMweExEQXVOQzB4TERGek1DNDBMREVzTVN3eGFESUtDUWtKWXpBdU5pd3dMREV0TUM0MExERXRNWE10TUM0MExURXRNUzB4U0RJeU9Ib2dUVEl6Tnl3eU1UQmpNQzB3TGpZc01DNDBMVEVzTVMweGFESmpNQzQyTERBc01Td3dMalFzTVN3eGN5MHdMalFzTVMweExERm9MVEpETWpNM0xqUXNNakV4TERJek55d3lNVEF1Tml3eU16Y3NNakV3ZWdvSkNRa2dUVEkxTWl3eU1URmpNQzB3TGpZc01DNDBMVEVzTVMweGFESmpNQzQyTERBc01Td3dMalFzTVN3eGN5MHdMalFzTVMweExERm9MVEpETWpVeUxqUXNNakV5TERJMU1pd3lNVEV1Tml3eU5USXNNakV4ZWlCTk1qWTBMREl3T1dNdE1DNDJMREF0TVN3d0xqUXRNU3d4Y3pBdU5Dd3hMREVzTVdneUNna0pDV013TGpZc01Dd3hMVEF1TkN3eExURnpMVEF1TkMweExURXRNVWd5TmpSNklFMHlOVE1zTVRrMVl6QXRNQzQyTERBdU5DMHhMREV0TVdneVl6QXVOaXd3TERFc01DNDBMREVzTVhNdE1DNDBMREV0TVN3eGFDMHlRekkxTXk0MExERTVOaXd5TlRNc01UazFMallzTWpVekxERTVOWG9LQ1FrSklFMHlNelFzTVRrMVl5MHdMallzTUMweExEQXVOQzB4TERGek1DNDBMREVzTVN3eGFESmpNQzQyTERBc01TMHdMalFzTVMweGN5MHdMalF0TVMweExURklNak0wZWlCTk1qUXdMREl3TUdNd0xUQXVOaXd3TGpRdE1Td3hMVEZvTW1Nd0xqWXNNQ3d4TERBdU5Dd3hMREZ6TFRBdU5Dd3hMVEVzTVFvSkNRbG9MVEpETWpRd0xqUXNNakF4TERJME1Dd3lNREF1Tml3eU5EQXNNakF3ZWlCTk1qRTFMREl4TldNd0xUQXVOU3d3TFRBdU9Td3dMVEV1TkdNdE1pNDFMVEV1TVMwekxqY3ROQzB5TGpZdE5pNDJZekF1TWkwd0xqVXNNQzQxTFRFc01DNDVMVEV1TkdNdE1DNDVMVElzTUMwMExqSXNNUzQ1TFRVdU1nb0pDUWxqTFRBdU9DMHlMallzTUM0M0xUVXVOQ3d6TGpRdE5pNHliREFzTUdNd0xqUXRNQzQxTERBdU9TMHdMamtzTVM0MUxURXVNV013TGpVdE1pNDNMRE11TVMwMExqVXNOUzQ0TFRRdU1XTXdMamNzTUM0eExERXVOQ3d3TGpRc01pd3dMamhqTlM0ekxUTXVPQ3d4TVM0MkxUVXVPU3d4T0M0eUxUVXVPUW9KQ1Fsak5pNDRMREFzTVRNdU1Td3lMaklzTVRndU1pdzFMamxqTWk0ekxURXVOaXcxTGpRdE1TdzNMREV1TTJNd0xqUXNNQzQyTERBdU55d3hMak1zTUM0NExESmpNQzQyTERBdU1pd3hMakVzTUM0MkxERXVOU3d4TGpGak1pNDNMREF1T0N3MExqSXNNeTQxTERNdU5DdzJMakpzTUN3d0Nna0pDV014TGprc01Td3lMamNzTXk0eUxERXVPU3cxTGpKak1TNDVMRElzTVM0NExEVXVNaTB3TGpJc04yTXRNQzQwTERBdU5DMHdMamtzTUM0M0xURXVOU3d4WXpBc01DNDFMREFzTUM0NUxEQXNNUzQwZGpGb0xUWXlkaTB4U0RJeE5Yb2dUVEl4TlM0NExESXdOeTQ0Q2drSkNXTXRNQzR6TERFdU1pMHdMalVzTWk0MExUQXVOaXd6TGpaakxURXVNeTB4TFRFdU5pMHlMamt0TUM0MkxUUXVNbXd3TERCRE1qRTFMREl3Tnk0MUxESXhOUzQwTERJd055NDNMREl4TlM0NExESXdOeTQ0VERJeE5TNDRMREl3Tnk0NGVpQk5NakUzTGpNc01qQXpMaklLQ1FrSll5MHdMalFzTUM0NUxUQXVOeXd4TGpndE1Td3lMamRqTFRFdE1DNDBMVEV1TmkweExqVXRNUzR6TFRJdU5XTXdMakl0TUM0MUxEQXVOaTB3TGprc01TNHhMVEV1TWtNeU1UWXVOU3d5TURJdU5pd3lNVFl1T1N3eU1ESXVPU3d5TVRjdU15d3lNRE11TWt3eU1UY3VNeXd5TURNdU1ub0tDUWtKSUUweU1Ua3VOaXd4T1RndU4yTXRNQzQxTERBdU9TMHhMREV1T0MweExqVXNNaTQzWXkweExqTXRNUzB4TGpVdE1pNDVMVEF1TlMwMExqSmpNQzR4TFRBdU1pd3dMak10TUM0ekxEQXVOQzB3TGpWRE1qRTRMak1zTVRrM0xqWXNNakU0TGprc01UazRMak1zTWpFNUxqWXNNVGs0TGpjS0NRa0pUREl4T1M0MkxERTVPQzQzZWlCTk1qSXdMamdzTVRrM1l6QXVOQzB3TGpVc01DNDNMVEVzTVM0eExURXVOV010TUM0ekxUQXVOUzB3TGprdE1DNDNMVEV1TkMwd0xqUnpMVEF1Tnl3d0xqa3RNQzQwTERFdU5FTXlNakF1TXl3eE9UWXVOeXd5TWpBdU5Td3hPVFl1T1N3eU1qQXVPQ3d4T1RjS0NRa0pUREl5TUM0NExERTVOM29nVFRJeU5pNHhMREU1TVM0eVl5MHhMREF1T1MweUxERXVPQzB5TGprc01pNDRZeTB3TGpNdE1DNHpMVEF1Tnkwd0xqWXRNUzR4TFRBdU9HTXdMalF0TVM0MkxESXVNUzB5TGpVc015NDNMVEl1TVFvSkNRbERNakkxTGprc01Ua3hMakVzTWpJMkxERTVNUzR5TERJeU5pNHhMREU1TVM0eVRESXlOaTR4TERFNU1TNHllaUJOTWpZNExqZ3NNVGswWXkwd0xqa3RNUzB4TGprdE1TNDVMVEl1T1MweUxqaGpNUzQxTFRBdU5pd3pMak1zTUM0eExETXVPU3d4TGpjS0NRa0pZekFzTUM0eExEQXVNU3d3TGpJc01DNHhMREF1TTBNeU5qa3VOU3d4T1RNdU5Dd3lOamt1TVN3eE9UTXVOaXd5TmpndU9Dd3hPVFJNTWpZNExqZ3NNVGswZWlCTk1qY3dMakVzTVRrMUxqVmpNQzQwTERBdU5Td3dMamdzTVN3eExqRXNNUzQwQ2drSkNXTXdMalV0TUM0eExEQXVPUzB3TGpjc01DNDRMVEV1TW5NdE1DNDNMVEF1T1MweExqSXRNQzQ0UXpJM01DNDFMREU1TlM0eExESTNNQzR6TERFNU5TNHpMREkzTUM0eExERTVOUzQxZWlCTk1qY3pMamtzTWpBeExqUmpMVEF1TlMwd0xqa3RNUzB4TGpndE1TNDFMVEl1TndvSkNRbGpNQzQ0TFRBdU5Dd3hMalF0TVM0eExERXVOaTB5WXpFdU15d3hMakVzTVM0MExETXNNQzQwTERRdU1rTXlOelF1TWl3eU1ERXVNU3d5TnpRc01qQXhMaklzTWpjekxqa3NNakF4TGpSNklFMHlOelV1Tml3eU1EVXVPV010TUM0ekxUQXVPUzB3TGpZdE1TNDRMVEV0TWk0M0Nna0pDV013TGpRdE1DNHpMREF1T0Mwd0xqWXNNUzR5TFRGak1Td3dMalVzTVM0MExERXVOeXd4TERJdU4wTXlOell1Tml3eU1EVXVNeXd5TnpZdU1pd3lNRFV1Tnl3eU56VXVOaXd5TURVdU9Yb2dUVEkzTmk0NExESXhNUzQwWXkwd0xqRXRNUzR5TFRBdU5DMHlMalF0TUM0MkxUTXVOZ29KQ1Fsak1DNDFMVEF1TVN3d0xqa3RNQzQwTERFdU1pMHdMalpETWpjNExqUXNNakE0TGpVc01qYzRMakVzTWpFd0xqUXNNamMyTGpnc01qRXhMalJNTWpjMkxqZ3NNakV4TGpSTU1qYzJMamdzTWpFeExqUjZJRTB5TnpVc01qRTBZeTB3TGpVdE1UWXRNVE11T1MweU9DNDJMVEk1TGprdE1qZ3VNUW9KQ1FsakxURTFMak1zTUM0MUxUSTNMallzTVRJdU9DMHlPQzR4TERJNExqRklNamMxVERJM05Td3lNVFI2SUUwM01pNHpMREU1T0M0eFl5MHdMakl0TUM0ekxUQXVNeTB3TGpjdE1DNHpMVEV1TVhZdE1USm9MVEoyTVRKak1Dd3lMaklzTVM0NExEUXNOQ3cwQ2drSkNXTXhMaklzTUN3eUxqTXRNQzQxTERNdU1TMHhMalJqTUM0MkxUQXVOeXd3TGprdE1TNDJMREF1T1MweUxqVjJMVEV5YUMweWRqRXlZekFzTVM0eExUQXVPU3d5TFRJc01td3dMREJETnpNdU15d3hPVGtzTnpJdU55d3hPVGd1Tnl3M01pNHpMREU1T0M0eGVpQk5OelVzTVRjMkNna0pDV013TGpRc01Dd3dMamNzTUN3eExqRXRNQzR4WXpBdU5Td3lMaklzTWk0MkxETXVOU3cwTGpnc00yTXdMalV0TUM0eExERXRNQzR6TERFdU5DMHdMalpqTVM0eExESXVNU3d4TGpjc05DNDBMREV1Tnl3MkxqZDJNalJqTUN3ekxqTXRNaTQzTERZdE5pdzJhQzB6ZGprS0NRa0pZekFzTWk0NExUSXVNaXcxTFRVc05YTXROUzB5TGpJdE5TMDFkaTA1YUMwell5MHpMak1zTUMwMkxUSXVOeTAyTFRaMkxUSTBZekF0Tnk0M0xEWXVNeTB4TkN3eE5DMHhORU0zTUN3eE56TXVPQ3czTWk0eUxERTNOaXczTlN3eE56WjZJRTAxT0N3eE9URjJNVElLQ1FrSll6QXNNQzQ0TERBdU5Td3hMalVzTVM0eUxERXVPR013TGprc01DNDBMREV1T1N3d0xqRXNNaTQwTFRBdU4yTXdMakl0TUM0ekxEQXVNeTB3TGpjc01DNHpMVEV1TVhZdE1USm9Nbll4TW1Nd0xESXVNaTB4TGpjc05DMHpMamtzTkdNdE1DNDFMREF0TVMwd0xqRXRNUzQwTFRBdU1nb0pDUWxqTFRBdU1pMHdMakV0TUM0MExUQXVNaTB3TGpjdE1DNHpkakl1TldNd0xESXVNaXd4TGpnc05DdzBMRFJvTVRaak1pNHlMREFzTkMweExqZ3NOQzAwZGkweU5HTXdMVEV1TlMwd0xqSXRNaTQ1TFRBdU55MDBMakpqTFRBdU5Dd3dMakV0TUM0NUxEQXVNaTB4TGpNc01DNHlDZ2tKQ1dNdE1pNHhMREF0TkM0eExURXVNUzAxTGpJdE0yTXRNeTB3TGpFdE5TNDJMVEl0Tmk0MUxUUXVPVU0yTWk0MExERTNOQ3cxT0N3eE56a3NOVGdzTVRnMVZqRTVNWG9nVFRZM0xESXhOWFk1WXpBc01TNDNMREV1TXl3ekxETXNNM016TFRFdU15d3pMVE4yTFRsSU5qZDZJaTgrQ2drSlBIQmhkR2dnWTJ4aGMzTTlJbk4wTUNJZ1pEMGlUUzB4Tnl3eE9URmpMVEF1Tml3d0xURXNNQzQwTFRFc01YTXdMalFzTVN3eExERm9NbU13TGpZc01Dd3hMVEF1TkN3eExURnpMVEF1TkMweExURXRNVWd0TVRkNklFMHlMREl3TUdNd0xUQXVOaXd3TGpRdE1Td3hMVEZvTWdvSkNRbGpNQzQyTERBc01Td3dMalFzTVN3eGN5MHdMalFzTVMweExERklNME15TGpRc01qQXhMRElzTWpBd0xqWXNNaXd5TURCNklFMHRNVElzTWpBMVl5MHdMallzTUMweExEQXVOQzB4TERGek1DNDBMREVzTVN3eGFESmpNQzQyTERBc01TMHdMalFzTVMweGN5MHdMalF0TVMweExURklMVEV5ZWdvSkNRa2dUUzB6Tnl3eU1EWmpMVEF1Tml3d0xURXNNQzQwTFRFc01YTXdMalFzTVN3eExERm9NbU13TGpZc01Dd3hMVEF1TkN3eExURnpMVEF1TkMweExURXRNVWd0TXpkNklFMHRNeklzTWpFd1l5MHdMallzTUMweExEQXVOQzB4TERGek1DNDBMREVzTVN3eGFESmpNQzQyTERBc01TMHdMalFzTVMweENna0pDWE10TUM0MExURXRNUzB4U0Mwek1ub2dUUzB5TXl3eU1UQmpNQzB3TGpZc01DNDBMVEVzTVMweGFESmpNQzQyTERBc01Td3dMalFzTVN3eGN5MHdMalFzTVMweExERm9MVEpETFRJeUxqWXNNakV4TFRJekxESXhNQzQyTFRJekxESXhNSG9nVFMwNExESXhNV013TFRBdU5pd3dMalF0TVN3eExURUtDUWtKYURKak1DNDJMREFzTVN3d0xqUXNNU3d4Y3kwd0xqUXNNUzB4TERGb0xUSkRMVGN1Tml3eU1USXRPQ3d5TVRFdU5pMDRMREl4TVhvZ1RUUXNNakE1WXkwd0xqWXNNQzB4TERBdU5DMHhMREZ6TUM0MExERXNNU3d4YURKak1DNDJMREFzTVMwd0xqUXNNUzB4Y3kwd0xqUXRNUzB4TFRGSU5Ib0tDUWtKSUUwdE55d3hPVFZqTUMwd0xqWXNNQzQwTFRFc01TMHhhREpqTUM0MkxEQXNNU3d3TGpRc01Td3hjeTB3TGpRc01TMHhMREZvTFRKRExUWXVOaXd4T1RZdE55d3hPVFV1TmkwM0xERTVOWG9nVFMweU5pd3hPVFZqTFRBdU5pd3dMVEVzTUM0MExURXNNWE13TGpRc01Td3hMREZvTWdvSkNRbGpNQzQyTERBc01TMHdMalFzTVMweGN5MHdMalF0TVMweExURklMVEkyZWlCTkxUSXdMREl3TUdNd0xUQXVOaXd3TGpRdE1Td3hMVEZvTW1Nd0xqWXNNQ3d4TERBdU5Dd3hMREZ6TFRBdU5Dd3hMVEVzTVdndE1rTXRNVGt1Tml3eU1ERXRNakFzTWpBd0xqWXRNakFzTWpBd2VpQk5MVFExTERJeE5Rb0pDUWxqTUMwd0xqVXNNQzB3TGprc01DMHhMalJqTFRJdU5TMHhMakV0TXk0M0xUUXRNaTQyTFRZdU5tTXdMakl0TUM0MUxEQXVOUzB4TERBdU9TMHhMalJqTFRBdU9TMHlMREF0TkM0eUxERXVPUzAxTGpKakxUQXVPQzB5TGpZc01DNDNMVFV1TkN3ekxqUXROaTR5YkRBc01Bb0pDUWxqTUM0MExUQXVOU3d3TGprdE1DNDVMREV1TlMweExqRmpNQzQxTFRJdU55d3pMakV0TkM0MUxEVXVPQzAwTGpGak1DNDNMREF1TVN3eExqUXNNQzQwTERJc01DNDRZelV1TXkwekxqZ3NNVEV1TmkwMUxqa3NNVGd1TWkwMUxqbGpOaTQ0TERBc01UTXVNU3d5TGpJc01UZ3VNaXcxTGprS0NRa0pZekl1TXkweExqWXNOUzQwTFRFc055d3hMak5qTUM0MExEQXVOaXd3TGpjc01TNHpMREF1T0N3eVl6QXVOaXd3TGpJc01TNHhMREF1Tml3eExqVXNNUzR4WXpJdU55d3dMamdzTkM0eUxETXVOU3d6TGpRc05pNHliREFzTUdNeExqa3NNU3d5TGpjc015NHlMREV1T1N3MUxqSUtDUWtKWXpFdU9Td3lMREV1T0N3MUxqSXRNQzR5TERkakxUQXVOQ3d3TGpRdE1DNDVMREF1TnkweExqVXNNV013TERBdU5Td3dMREF1T1N3d0xERXVOSFl4YUMwMk1uWXRNVWd0TkRWNklFMHRORFF1TWl3eU1EY3VPR010TUM0ekxERXVNaTB3TGpVc01pNDBMVEF1Tml3ekxqWUtDUWtKWXkweExqTXRNUzB4TGpZdE1pNDVMVEF1TmkwMExqSnNNQ3d3UXkwME5Td3lNRGN1TlMwME5DNDJMREl3Tnk0M0xUUTBMaklzTWpBM0xqaE1MVFEwTGpJc01qQTNMamg2SUUwdE5ESXVOeXd5TURNdU1tTXRNQzQwTERBdU9TMHdMamNzTVM0NExURXNNaTQzQ2drSkNXTXRNUzB3TGpRdE1TNDJMVEV1TlMweExqTXRNaTQxWXpBdU1pMHdMalVzTUM0MkxUQXVPU3d4TGpFdE1TNHlReTAwTXk0MUxESXdNaTQyTFRRekxqRXNNakF5TGprdE5ESXVOeXd5TURNdU1rd3ROREl1Tnl3eU1ETXVNbm9nVFMwME1DNDBMREU1T0M0M0Nna0pDV010TUM0MUxEQXVPUzB4TERFdU9DMHhMalVzTWk0M1l5MHhMak10TVMweExqVXRNaTQ1TFRBdU5TMDBMakpqTUM0eExUQXVNaXd3TGpNdE1DNHpMREF1TkMwd0xqVkRMVFF4TGpjc01UazNMall0TkRFdU1Td3hPVGd1TXkwME1DNDBMREU1T0M0M2VpQk5MVE01TGpJc01UazNDZ2tKQ1dNd0xqTXRNQzQxTERBdU55MHhMREV1TVMweExqVmpMVEF1TXkwd0xqVXRNQzQ1TFRBdU55MHhMalF0TUM0MGN5MHdMamNzTUM0NUxUQXVOQ3d4TGpSRExUTTVMamNzTVRrMkxqY3RNemt1TlN3eE9UWXVPUzB6T1M0eUxERTVOMHd0TXprdU1pd3hPVGQ2SUUwdE16TXVPU3d4T1RFdU1nb0pDUWxqTFRFc01DNDVMVElzTVM0NExUSXVPU3d5TGpoakxUQXVNeTB3TGpNdE1DNDNMVEF1TmkweExqRXRNQzQ0WXpBdU5DMHhMallzTWk0eExUSXVOU3d6TGpjdE1pNHhReTB6TkM0eExERTVNUzR4TFRNMExERTVNUzR5TFRNekxqa3NNVGt4TGpKTUxUTXpMamtzTVRreExqSjZJRTA0TGpnc01UazBDZ2tKQ1dNdE1DNDVMVEV0TVM0NUxURXVPUzB5TGprdE1pNDRZekV1TlMwd0xqWXNNeTR6TERBdU1Td3pMamtzTVM0M1l6QXNNQzR4TERBdU1Td3dMaklzTUM0eExEQXVNME01TGpVc01Ua3pMalFzT1M0eExERTVNeTQyTERndU9Dd3hPVFJNT0M0NExERTVOSG9nVFRFd0xqRXNNVGsxTGpVS0NRa0pZekF1TkN3d0xqVXNNQzQ0TERFc01TNHhMREV1TkdNd0xqVXRNQzR4TERBdU9TMHdMamNzTUM0NExURXVNbU10TUM0eExUQXVOUzB3TGpjdE1DNDVMVEV1TWkwd0xqaERNVEF1TlN3eE9UVXVNU3d4TUM0ekxERTVOUzR6TERFd0xqRXNNVGsxTGpWNklFMHhNeTQ1TERJd01TNDBDZ2tKQ1dNdE1DNDFMVEF1T1Mwd0xqa3RNUzQ0TFRFdU5TMHlMamRqTUM0NExUQXVOQ3d4TGpRdE1TNHhMREV1TmkweVl6RXVNeXd4TGpFc01TNDBMRE1zTUM0MExEUXVNa014TkM0eUxESXdNUzR4TERFMExESXdNUzR5TERFekxqa3NNakF4TGpSNklFMHhOUzQzTERJd05TNDVDZ2tKQ1dNdE1DNHpMVEF1T1Mwd0xqWXRNUzQ0TFRFdE1pNDNZekF1TkMwd0xqTXNNQzQ0TFRBdU5pd3hMakl0TVdNeExEQXVOU3d4TGpRc01TNDNMREVzTWk0M1F6RTJMallzTWpBMUxqTXNNVFl1TWl3eU1EVXVOeXd4TlM0M0xESXdOUzQ1ZWlCTk1UWXVPQ3d5TVRFdU5Bb0pDUWxqTFRBdU1TMHhMakl0TUM0MExUSXVOQzB3TGpZdE15NDJZekF1TlMwd0xqRXNNQzQ1TFRBdU5Dd3hMakl0TUM0MlF6RTRMalFzTWpBNExqVXNNVGd1TVN3eU1UQXVOQ3d4Tmk0NExESXhNUzQwVERFMkxqZ3NNakV4TGpSTU1UWXVPQ3d5TVRFdU5Ib2dUVEUxTERJeE5Bb0pDUWxqTFRBdU5TMHhOaTB4TXk0NUxUSTRMall0TWprdU9TMHlPQzR4WXkweE5TNHpMREF1TlMweU55NDJMREV5TGpndE1qZ3VNU3d5T0M0eFNERTFUREUxTERJeE5Ib2lMejRLQ1R3dlp6NEtQQzluUGdvOEwzTjJaejRLJztcbiRjaGF0LWJnLWRhcms6ICdkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBEOTRiV3dnZG1WeWMybHZiajBpTVM0d0lpQmxibU52WkdsdVp6MGlkWFJtTFRnaVB6NEtQQ0V0TFNCSFpXNWxjbUYwYjNJNklFRmtiMkpsSUVsc2JIVnpkSEpoZEc5eUlESTFMakF1TUN3Z1UxWkhJRVY0Y0c5eWRDQlFiSFZuTFVsdUlDNGdVMVpISUZabGNuTnBiMjQ2SURZdU1EQWdRblZwYkdRZ01Da2dJQzB0UGdvOGMzWm5JSFpsY25OcGIyNDlJakV1TVNJZ2FXUTlJa3hoZVdWeVh6RWlJSGh0Ykc1elBTSm9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OHlNREF3TDNOMlp5SWdlRzFzYm5NNmVHeHBibXM5SW1oMGRIQTZMeTkzZDNjdWR6TXViM0puTHpFNU9Ua3ZlR3hwYm1zaUlIZzlJakJ3ZUNJZ2VUMGlNSEI0SWdvSklIWnBaWGRDYjNnOUlqQWdNQ0F5TmpBZ01qWXdJaUJ6ZEhsc1pUMGlaVzVoWW14bExXSmhZMnRuY205MWJtUTZibVYzSURBZ01DQXlOakFnTWpZd095SWdlRzFzT25Od1lXTmxQU0p3Y21WelpYSjJaU0krQ2p4emRIbHNaU0IwZVhCbFBTSjBaWGgwTDJOemN5SStDZ2t1YzNRd2UyWnBiR3d0Y25Wc1pUcGxkbVZ1YjJSa08yTnNhWEF0Y25Wc1pUcGxkbVZ1YjJSa08yWnBiR3c2SXpFM01VRXlORHQ5Q2p3dmMzUjViR1UrQ2p4blBnb0pQR2NnYVdROUlta3RiR2xyWlMxbWIyOWtJajRLQ1FrOGNHRjBhQ0JqYkdGemN6MGljM1F3SWlCa1BTSk5NalF1TkN3eE5tTXdMaklzTUM0MkxEQXVOQ3d4TGpNc01DNDFMREpvTFRNdU4yd3hMaklzTWk0emJEQXVOU3d3TGpsc0xUQXVNaXd3TGpGV01qaGpNaTR5TERFdU55d3lMamNzTkM0NExERXNOd29KQ1FsakxUQXVPQ3d4TFRFdU9Td3hMamN0TXk0eUxERXVPVll6TjJNdE1DNDVMRE11TlMwMExqRXNOaTAzTGpnc05tZ3RNakJqTFRNdU5pd3dMVFl1T0MweUxqVXROeTQzTFRaMkxUQXVNV010TWk0M0xUQXVOQzAwTGpZdE15MDBMakl0TlM0M1l6QXVNaTB4TGpNc01DNDVMVEl1TlN3eExqa3RNeTR5Q2drSkNYWXROaTQ0YkMwd0xqZ3RNUzQyYkMwd0xqUXRNQzQ1YkRBdU9TMHdMalJNTFRFM0xERTRhQzB6UXkweE55NHlMRFV1TmkwMExqa3RNaTR5TERjdU5Td3dMalpETVRVdU5Dd3lMak1zTWpFdU9TdzRMaklzTWpRdU5Dd3hObm9nVFMweE1pNDBMREU0WXkwd0xqSXNNQzB3TGpNc01DMHdMalFzTUM0eENna0pDV3d0TXk0eExERXVObXd3TGprc01TNDRiREV1TXkwd0xqZGpNQzQ0TFRBdU5Dd3hMamd0TUM0MExESXVOeXd3YkRJdU1pd3hMakZqTUM0ekxEQXVNU3d3TGpZc01DNHhMREF1T1N3d2JESXVNaTB4TGpGak1DNDRMVEF1TkN3eExqZ3RNQzQwTERJdU55d3diREl1TWl3eExqRUtDUWtKWXpBdU15d3dMakVzTUM0MkxEQXVNU3d3TGprc01Hd3lMakl0TVM0eFl6QXVPQzB3TGpRc01TNDRMVEF1TkN3eUxqY3NNR3d5TGpJc01TNHhRemN1TkN3eU1pdzNMamNzTWpJc09Dd3lNUzQ1YkRJdU9TMHhMak5qTUM0NExUQXVNeXd4TGpjdE1DNHpMREl1TkN3d2JESXVPU3d4TGpNS0NRa0pZekF1TXl3d0xqRXNNQzQyTERBdU1Td3dMamtzTUd3ekxqRXRNUzQxYkMwd0xqa3RNUzQ0YkMweExqUXNNQzQzWXkwd0xqZ3NNQzQwTFRFdU55d3dMalF0TWk0MkxEQXVNV3d0TWk0NExURXVNa014TWk0ekxERTRMREV5TGpJc01UZ3NNVEl1TVN3eE9Hd3dMREFLQ1FrSll5MHdMakVzTUMwd0xqTXNNQzB3TGpRc01DNHhiQzB5TGpnc01TNHlZeTB3TGpnc01DNDBMVEV1T0N3d0xqTXRNaTQyTFRBdU1VdzBMREU0TGpGRE15NDVMREU0TERNdU55d3hPQ3d6TGpZc01UaHNNQ3d3WXkwd0xqSXNNQzB3TGpNc01DMHdMalFzTUM0eFRERXNNVGt1TWdvSkNRbGpMVEF1T0N3d0xqUXRNUzQ0TERBdU5DMHlMamNzTUV3dE5Dd3hPQzR4UXkwMExqRXNNVGd0TkM0ekxERTRMVFF1TkN3eE9Hd3dMREJqTFRBdU1pd3dMVEF1TXl3d0xUQXVOQ3d3TGpGTUxUY3NNVGt1TW1NdE1DNDRMREF1TkMweExqZ3NNQzQwTFRJdU55d3diQzB5TGpJdE1TNHhDZ2tKQ1VNdE1USXVNU3d4T0MweE1pNHpMREU0TFRFeUxqUXNNVGhNTFRFeUxqUXNNVGhNTFRFeUxqUXNNVGg2SUUwdE1USXVOQ3d4Tm1ndE5DNDVReTB4TXk0MUxEVXVNUzB4TGpVdE1DNDNMRGt1TlN3ekxqSmpOaXd5TGpFc01UQXVOeXcyTGpnc01USXVPQ3d4TWk0NGFDMHlMakZzTFRBdU1TMHdMakVLQ1FrSlRERTVMamtzTVRaSUxURXlMalJNTFRFeUxqUXNNVFo2SUUweE55NDVMREl6TGpkc01TNDBMVEF1TjJneExqTjJNbWd0TXpaMkxURXVNV3d3TGpNdE1DNHliREV1TkMwd0xqZG9NaTQyYkRFdU5Dd3dMamRqTUM0NExEQXVOQ3d4TGpnc01DNDBMREl1Tnl3d2JERXVOQzB3TGpkSUxUTUtDUWtKYkRFdU5Dd3dMamRqTUM0NExEQXVOQ3d4TGpnc01DNDBMREl1Tnl3d1RESXVNeXd5TTJneUxqWnNNUzQwTERBdU4yTXdMamNzTUM0MExERXVOeXd3TGpRc01pNDFMREJzTVM0M0xUQXVOMmd6TGpKc01TNDNMREF1TjBNeE5pNHlMREkwTGpFc01UY3VNU3d5TkM0eExERTNMamtzTWpNdU4zb0tDUWtKSUUwdE1UTXVPQ3d5TjJ3eE5pNDBMRFF1T1V3eE9DNDVMREkzU0MweE15NDRlaUJOTFRFMExqUXNNamxvTUM0emJERTJMamNzTld3eE5pNDNMVFZvTUM0ell6RXVOeXd3TERNc01TNHpMRE1zTTNNdE1TNHpMRE10TXl3emFDMHpOR010TVM0M0xEQXRNeTB4TGpNdE15MHpDZ2tKQ1VNdE1UY3VOQ3d6TUM0ekxURTJMakVzTWprdE1UUXVOQ3d5T1hvZ1RTMHhNeTR4TERNM1l6QXVPQ3d5TGpRc015NHhMRFFzTlM0M0xEUm9NakJqTWk0MUxEQXNOQzQ0TFRFdU5pdzFMamN0TkVNeE9DNHlMRE0zTFRFekxqRXNNemN0TVRNdU1Td3pOM29pTHo0S0NRazhjR0YwYUNCcFpEMGljR0YwYURaZlptbHNiQzFqYjNCNUlpQmpiR0Z6Y3owaWMzUXdJaUJrUFNKTk1qZzBMalFzTVRaak1DNHlMREF1Tml3d0xqUXNNUzR6TERBdU5Td3lhQzB6TGpkc01TNHlMREl1TTJ3d0xqVXNNQzQ1YkMwd0xqSXNNQzR4VmpJNFl6SXVNaXd4TGpjc01pNDNMRFF1T0N3eExEY0tDUWtKWXkwd0xqZ3NNUzB4TGprc01TNDNMVE11TWl3eExqbFdNemRqTFRBdU9Td3pMalV0TkM0eExEWXROeTQ0TERab0xUSXdZeTB6TGpZc01DMDJMamd0TWk0MUxUY3VOeTAyZGkwd0xqRmpMVEl1Tnkwd0xqUXROQzQyTFRNdE5DNHlMVFV1TjJNd0xqSXRNUzR6TERBdU9TMHlMalVzTVM0NUxUTXVNZ29KQ1FsMkxUWXVPR3d0TUM0NExURXVObXd0TUM0MExUQXVPV3d3TGprdE1DNDBUREkwTXl3eE9HZ3RNMk15TGpndE1USXVOQ3d4TlM0eExUSXdMaklzTWpjdU5TMHhOeTQwUXpJM05TNDBMREl1TXl3eU9ERXVPU3c0TGpJc01qZzBMalFzTVRaNklFMHlORGN1TlN3eE9Bb0pDUWxqTFRBdU1pd3dMVEF1TXl3d0xUQXVOQ3d3TGpGc0xUTXVNU3d4TGpac01DNDVMREV1T0d3eExqTXRNQzQzWXpBdU9DMHdMalFzTVM0NExUQXVOQ3d5TGpjc01Hd3lMaklzTVM0eFl6QXVNeXd3TGpFc01DNDJMREF1TVN3d0xqa3NNR3d5TGpJdE1TNHhDZ2tKQ1dNd0xqZ3RNQzQwTERFdU9DMHdMalFzTWk0M0xEQnNNaTR5TERFdU1XTXdMak1zTUM0eExEQXVOaXd3TGpFc01DNDVMREJzTWk0eUxURXVNV013TGpndE1DNDBMREV1T0Mwd0xqUXNNaTQzTERCc01pNHlMREV1TVdNd0xqTXNNQzR4TERBdU5pd3dMakVzTUM0NUxEQnNNaTQ1TFRFdU13b0pDUWxqTUM0NExUQXVNeXd4TGpjdE1DNHpMREl1TkN3d2JESXVPU3d4TGpOak1DNHpMREF1TVN3d0xqWXNNQzR4TERBdU9Td3diRE11TVMweExqVnNMVEF1T1MweExqaHNMVEV1TkN3d0xqZGpMVEF1T0N3d0xqUXRNUzQzTERBdU5DMHlMallzTUM0eGJDMHlMamd0TVM0eUNna0pDV010TUM0eExUQXVNUzB3TGpNdE1DNHhMVEF1TkMwd0xqRnNNQ3d3WXkwd0xqRXNNQzB3TGpNc01DMHdMalFzTUM0eGJDMHlMamdzTVM0eVl5MHdMamdzTUM0MExURXVPQ3d3TGpNdE1pNDJMVEF1TVd3dE1pNHpMVEV1TVdNdE1DNHhMVEF1TVMwd0xqTXRNQzR4TFRBdU5TMHdMakZzTUN3d0Nna0pDV010TUM0eUxEQXRNQzR6TERBdE1DNDBMREF1TVd3dE1pNHlMREV1TVdNdE1DNDRMREF1TkMweExqZ3NNQzQwTFRJdU55d3diQzB5TGpJdE1TNHhZeTB3TGpFdE1DNHhMVEF1TXkwd0xqRXRNQzQwTFRBdU1Xd3dMREJqTFRBdU1pd3dMVEF1TXl3d0xUQXVOQ3d3TGpGc0xUSXVNaXd4TGpFS0NRa0pZeTB3TGpnc01DNDBMVEV1T0N3d0xqUXRNaTQzTERCc0xUSXVNaTB4TGpGRE1qUTNMamtzTVRnc01qUTNMamNzTVRnc01qUTNMalVzTVRoTU1qUTNMalVzTVRoTU1qUTNMalVzTVRoNklFMHlORGN1TlN3eE5tZ3ROQzQ1WXpNdU9TMHhNQzQ1TERFMUxqa3RNVFl1Tnl3eU5pNDRMVEV5TGpnS0NRa0pZellzTWk0eExERXdMamNzTmk0NExERXlMamdzTVRJdU9HZ3RNaTR4YkMwd0xqRXRNQzR4YkMwd0xqTXNNQzR4U0RJME55NDFUREkwTnk0MUxERTJlaUJOTWpjM0xqa3NNak11TjJ3eExqUXRNQzQzYURFdU0zWXlhQzB6Tm5ZdE1TNHhiREF1TXkwd0xqSnNNUzQwTFRBdU4yZ3lMallLQ1FrSmJERXVOQ3d3TGpkak1DNDRMREF1TkN3eExqZ3NNQzQwTERJdU55d3diREV1TkMwd0xqZG9NaTQyYkRFdU5Dd3dMamRqTUM0NExEQXVOQ3d4TGpnc01DNDBMREl1Tnl3d2JERXVOQzB3TGpkb01pNDJiREV1TkN3d0xqZGpNQzQ0TERBdU5Dd3hMamNzTUM0MExESXVOaXd3TGpGc01TNDNMVEF1TndvSkNRbG9NeTR5YkRFdU55d3dMamRETWpjMkxqSXNNalF1TVN3eU56Y3VNU3d5TkM0eExESTNOeTQ1TERJekxqZE1NamMzTGprc01qTXVOM29nVFRJME5pNHlMREkzYkRFMkxqUXNOQzQ1VERJM09Td3lOMGd5TkRZdU1ub2dUVEkwTlM0MUxESTVhREF1TTJ3eE5pNDNMRFZzTVRZdU55MDFhREF1TXdvSkNRbGpNUzQzTERBc015d3hMak1zTXl3emN5MHhMak1zTXkwekxETm9MVE0wWXkweExqY3NNQzB6TFRFdU15MHpMVE5UTWpRekxqa3NNamtzTWpRMUxqVXNNamw2SUUweU5EWXVPU3d6TjJNd0xqZ3NNaTQwTERNdU1TdzBMRFV1Tml3MGFESXdZekl1TlN3d0xEUXVPQzB4TGpZc05TNDNMVFFLQ1FrSlNESTBOaTQ1ZWlJdlBnb0pDVHh3WVhSb0lHTnNZWE56UFNKemREQWlJR1E5SWsweE5Ua3VOU3d5TVdNdE1TNHpMVE11TmkwMExqY3ROaTA0TGpVdE5tZ3ROREpqTFRNdU9Dd3dMVGN1TWl3eUxqUXRPQzQxTERaakxUTXVNeXd3TGpNdE5TNDRMRE11TWkwMUxqVXNOaTQxWXpBdU1pd3lMamtzTWk0MkxEVXVNaXcxTGpVc05TNDFDZ2tKQ1dNdE1TNDNMRFF1Tnl3d0xqZ3NPUzQ0TERVdU5Dd3hNUzQxWXpFc01DNHpMRElzTUM0MUxETXNNQzQxYURReVl6VXNNQ3c1TFRRc09TMDVZekF0TVMwd0xqSXRNaTR4TFRBdU5TMHpZek11TXkwd0xqTXNOUzQ0TFRNdU1pdzFMalV0Tmk0MUNna0pDVU14TmpRdU55d3lNeTQyTERFMk1pNDBMREl4TGpNc01UVTVMalVzTWpGNklFMHhOVEVzTVRkb0xUUXlZeTB5TGpjc01DMDFMaklzTVM0MkxUWXVNeXcwYURVMExqZERNVFUyTGpJc01UZ3VOaXd4TlRNdU55d3hOeXd4TlRFc01UZDZJRTB4TkRFdU55dzBNd29KQ1Fsak1pNHhMVEV1Tnl3ekxqTXROQzR6TERNdU15MDNhQzB5WXpBc015NDVMVE11TVN3M0xUY3NOMmd0TkM0ell6SXVNUzB4TGpjc015NHpMVFF1TXl3ekxqTXROMmd0TW1Nd0xETXVPUzB6TGpFc055MDNMRGRvTFRRdU0yTXlMakV0TVM0M0xETXVNeTAwTGpNc015NHpMVGRvTFRJS0NRa0pZekFzTXk0NUxUTXVNU3czTFRjc04yZ3ROMk10TXk0NUxEQXROeTB6TGpFdE55MDNjek11TVMwM0xEY3ROMmcwTW1Nekxqa3NNQ3czTERNdU1TdzNMRGR6TFRNdU1TdzNMVGNzTjBneE5ERXVOM29nVFRFd09Td3lOMk10TXl3d0xUVXVPQ3d4TGpVdE55NDFMRFJJTVRBeENna0pDV010TWk0eUxEQXROQzB4TGpndE5DMDBjekV1T0MwMExEUXROR2cxT0dNeUxqSXNNQ3cwTERFdU9DdzBMRFJ6TFRFdU9DdzBMVFFzTkdndE1DNDFZeTB4TGpjdE1pNDFMVFF1TlMwMExUY3VOUzAwU0RFd09Yb2lMejRLQ1FrOGNHRjBhQ0JqYkdGemN6MGljM1F3SWlCa1BTSk5NemtzTVRFMVl6UXVOQ3d3TERndE15NDJMRGd0T0hNdE15NDJMVGd0T0MwNGN5MDRMRE11TmkwNExEaFRNelF1Tml3eE1UVXNNemtzTVRFMWVpQk5ORFVzTVRBM1l6QXNNeTR6TFRJdU55dzJMVFlzTm5NdE5pMHlMamN0TmkwMkNna0pDWE15TGpjdE5pdzJMVFpUTkRVc01UQXpMamNzTkRVc01UQTNlaUJOTkRJc056aDJMVEpvT0hZdE5rZzBNR010TWk0eUxEQXROQ3d4TGpndE5DdzBkakV3U0RJeWJDMHhMak1zTkV3eU1DdzVNR2d5TGpKc015NDRMRFF3YURJMmJETXVPQzAwTUVnMU9Hd3RNQzQzTFRKTU5UWXNPRFJJTkRKV056aDZDZ2tKQ1NCTk16Z3NOelIyTVRCb01sWTNOR2c0ZGkweWFDMDRRek00TGprc056SXNNemdzTnpJdU9Td3pPQ3czTkhvZ1RUUXdMRGcyYURFMExqWnNNQzQzTERKSU1qSXVPR3d3TGpjdE1rZzBNSG9nVFRVekxqZ3NPVEJJTWpRdU1td3pMallzTXpob01qSXVORXcxTXk0NExEa3dlaUl2UGdvSkNUeHdZWFJvSUdOc1lYTnpQU0p6ZERBaUlHUTlJazB4TWprc09USm9MVFoyTkdndE5uWTBhQzAyZGpFMGFDMHpiREF1TWl3eWJETXVPQ3d6TW1nek5td3pMamd0TXpKc01DNHlMVEpvTFROMkxURTBhQzAyZGkwMGFDMDJkaTAwU0RFeU9Yb2dUVEUwTnl3eE1UUjJMVEV5YUMwMGRqUm9NM1k0U0RFME53b0pDUWw2SUUweE5EUXNNVEUwZGkwMmFDMDBkalpJTVRRMGVpQk5NVE00TERFeU1IWXRNVFpvTFRSMk1Ua3VNa014TXpVdU5pd3hNakl1TlN3eE16Y3NNVEl4TGpRc01UTTRMREV5TUhvZ1RURXpNaXd4TWpNdU9GWXhNREJvTFRSMk1qTXVPQW9KQ1FsRE1USTVMak1zTVRJMExqRXNNVE13TGpjc01USTBMakVzTVRNeUxERXlNeTQ0ZWlCTk1USTJMREV5TXk0eVZqRXdOR2d0TkhZeE5rTXhNak1zTVRJeExqUXNNVEkwTGpRc01USXlMalVzTVRJMkxERXlNeTR5ZWlCTk1USXdMREV4TkhZdE5tZ3ROSFkyU0RFeU1Ib2dUVEV4TkN3eE1UUjJMVGhvTXdvSkNRbDJMVFJvTFRSMk1USklNVEUwZWlCTk1UUXhMREV3TW5ZdE5HZ3ROSFkwYUROMk5HZ3hWakV3TW5vZ1RURXpOU3d4TURKMkxUaG9MVFIyTkdnemRqUklNVE0xZWlCTk1USTVMRGs0ZGkwMGFDMDBkamhvTVhZdE5FZ3hNamw2SUUweE1qTXNNVEF5ZGkwMGFDMDBkamhvTVhZdE5FZ3hNak42Q2drSkNTQk5NVE13TERFeU5tTTFMamtzTUN3eE1DNDVMVFF1TWl3eE1TNDRMVEV3YURjdU9Xd3RNeTQxTERNd2FDMHpNaTQwYkMwekxqVXRNekJvTnk0NVF6RXhPUzR4TERFeU1TNDRMREV5TkM0eExERXlOaXd4TXpBc01USTJlaUl2UGdvSkNUeHdZWFJvSUdOc1lYTnpQU0p6ZERBaUlHUTlJazB5TVRJc09EWjJNbWd0TkhZdE1rZ3lNVEo2SUUweU1UWXNPRFpvTFRKMk1tZ3lWamcyZWlCTk1UazJMRGcyVERFNU5pdzRObU10TWk0M0xEQXVOeTAwTGpVc015NHpMVE11T1N3Mll6QXVOQ3d4TGpnc01TNDJMRE11TWl3ekxqTXNNeTQ0Q2drSkNXd3dMakVzTUM0eWJERXVNU3cwTGpWak1DNHlMREF1T1N3eExERXVOU3d4TGprc01TNDFiREFzTUd3M0xESTBMalpqTUM0eUxEQXVPU3d4TERFdU5Dd3hMamtzTVM0MGFEVmpNQzQ1TERBc01TNDNMVEF1Tml3eExqa3RNUzQwYkRjdE1qUXVObU13TGprc01Dd3hMamN0TUM0MkxERXVPUzB4TGpVS0NRa0piREV1TVMwMExqVnNNQzR4TFRBdU1tTXlMall0TUM0NUxEUXVNUzB6TGpjc015NHlMVFl1TTJNdE1DNDJMVEV1TnkweUxUTXRNeTQ0TFRNdU0xWTRObU13TFRjdU55MDJMak10TVRRdE1UUXRNVFJUTVRrMkxEYzRMak1zTVRrMkxEZzJlaUJOTWpBd0xEZzJhRFoyTW1ndE9Rb0pDUWxqTFRFdU55d3dMVE1zTVM0ekxUTXNNM014TGpNc015d3pMRE5vTWpaak1TNDNMREFzTXkweExqTXNNeTB6Y3kweExqTXRNeTB6TFROb0xUTjJMVEpvTW1Nd0xUWXVOaTAxTGpRdE1USXRNVEl0TVRKekxURXlMRFV1TkMweE1pd3hNa2d5TURCNklFMHhPVGd1Tml3eE1EQnNMVEV0TkdneU5DNDVDZ2tKQ1d3dE1TdzBTREU1T0M0MmVpQk5NakEzTGpVc01USTJiQzAyTGprdE1qUm9NVGd1TjJ3dE5pNDVMREkwU0RJd055NDFlaUJOTVRVd0xESTBNbU14TWk0eUxEQXNNakl0T1M0NExESXlMVEl5Y3kwNUxqZ3RNakl0TWpJdE1qSnpMVEl5TERrdU9DMHlNaXd5TWdvSkNRbFRNVE0zTGpnc01qUXlMREUxTUN3eU5ESjZJRTB4TnpRc01qSXdZekFzTVRNdU15MHhNQzQzTERJMExUSTBMREkwY3kweU5DMHhNQzQzTFRJMExUSTBiREFzTUdNd0xURXpMak1zTVRBdU55MHlOQ3d5TkMweU5GTXhOelFzTWpBMkxqY3NNVGMwTERJeU1Ib2dUVEUwTlM0MkxESXpOeTQzQ2drSkNXd3lMVEF1T1dNeExqVXRNQzQyTERNdU1pMHdMallzTkM0M0xEQnNNaXd3TGpsak1DNDVMREF1TkN3eUxEQXNNaTQxTFRBdU9Hd3hMakV0TVM0NVl6QXVPQzB4TGpRc01pNHlMVEl1TkN3ekxqZ3RNaTQ0YkRJdU1TMHdMalZqTVMwd0xqSXNNUzQyTFRFdU1Td3hMalV0TWk0eGJDMHdMakl0TWk0eUNna0pDV010TUM0eExURXVOaXd3TGpRdE15NHlMREV1TkMwMExqVnNNUzQwTFRFdU4yTXdMamN0TUM0NExEQXVOeTB4TGprc01DMHlMalpzTFRFdU5DMHhMamRqTFRFdU1TMHhMakl0TVM0MkxUSXVPQzB4TGpRdE5DNDFiREF1TWkweUxqSmpNQzR4TFRFdE1DNDJMVEV1T1MweExqWXRNaTR4Q2drSkNXd3RNaTR4TFRBdU5XTXRNUzQyTFRBdU5DMHpMVEV1TkMwekxqZ3RNaTQ0YkMweExqRXRNUzQ1WXkwd0xqVXRNQzQ1TFRFdU5pMHhMakl0TWk0MUxUQXVPR3d0TWl3d0xqbGpMVEV1TlN3d0xqWXRNeTR5TERBdU5pMDBMamNzTUd3dE1pMHdMamxqTFRBdU9TMHdMalF0TWl3d0xUSXVOU3d3TGpnS0NRa0piQzB4TERJdU1XTXRNQzQ0TERFdU5DMHlMaklzTWk0MExUTXVPQ3d5TGpoc0xUSXVNU3d3TGpWakxURXNNQzR5TFRFdU5pd3hMakV0TVM0MUxESXVNV3d3TGpJc01pNHlZekF1TVN3eExqWXRNQzQwTERNdU1pMHhMalFzTkM0MWJDMHhMalFzTVM0M0Nna0pDV010TUM0M0xEQXVPQzB3TGpjc01TNDVMREFzTWk0MmJERXVOQ3d4TGpkak1TNHhMREV1TWl3eExqWXNNaTQ0TERFdU5DdzBMalZzTFRBdU1pd3lMakpqTFRBdU1Td3hMREF1Tml3eExqa3NNUzQyTERJdU1Xd3lMakVzTUM0MVl6RXVOaXd3TGpRc015d3hMalFzTXk0NExESXVPR3d4TGpFc01TNDVDZ2tKQ1VNeE5ETXVOaXd5TXpjdU9Dd3hORFF1Tnl3eU16Z3VNU3d4TkRVdU5pd3lNemN1TjB3eE5EVXVOaXd5TXpjdU4zb2dUVEUwT0M0MExESXpPQzQzWXpFdE1DNDBMREl1TVMwd0xqUXNNeTR4TERCc01pd3dMamxqTVM0NExEQXVPQ3cwTERBdU1TdzFMVEV1Tm13eExqRXRNUzQ1Q2drSkNXTXdMall0TUM0NUxERXVOUzB4TGpZc01pNDFMVEV1T0d3eUxqRXRNQzQxWXpFdU9TMHdMalFzTXk0ekxUSXVNeXd6TGpFdE5DNHliQzB3TGpJdE1pNHlZeTB3TGpFdE1TNHhMREF1TXkweUxqSXNNUzB6YkRFdU5DMHhMamRqTVM0ekxURXVOU3d4TGpNdE15NDNMREF0TlM0eWJDMHhMalF0TVM0M0Nna0pDV010TUM0M0xUQXVPQzB4TGpFdE1TNDVMVEV0TTJ3d0xqSXRNaTR5WXpBdU1pMHlMVEV1TVMwekxqZ3RNeTR4TFRRdU1td3RNaTR4TFRBdU5XTXRNUzR4TFRBdU1pMHlMVEF1T1MweUxqVXRNUzQ0YkMweExqRXRNUzQ1WXkweExURXVOeTB6TGpJdE1pNDBMVFV0TVM0MmJDMHlMREF1T1FvSkNRbGpMVEVzTUM0MExUSXVNU3d3TGpRdE15NHhMREJzTFRJdE1DNDVZeTB4TGpndE1DNDRMVFF0TUM0eExUVXNNUzQyYkMweExqRXNNUzQ1WXkwd0xqWXNNQzQ1TFRFdU5Td3hMall0TWk0MUxERXVPR3d0TWk0eExEQXVOV010TVM0NUxEQXVOQzB6TGpNc01pNHpMVE11TVN3MExqSnNNQzR5TERJdU1nb0pDUWxqTUM0eExERXVNUzB3TGpNc01pNHlMVEVzTTJ3dE1TNDBMREV1TjJNdE1TNHpMREV1TlMweExqTXNNeTQzTERBc05TNHliREV1TkN3eExqZGpNQzQzTERBdU9Dd3hMakVzTVM0NUxERXNNMnd0TUM0eUxESXVNbU10TUM0eUxESXNNUzR4TERNdU9Dd3pMakVzTkM0eWJESXVNU3d3TGpVS0NRa0pZekV1TVN3d0xqSXNNaXd3TGprc01pNDFMREV1T0d3eExqRXNNUzQ1WXpFc01TNDNMRE11TWl3eUxqUXNOU3d4TGpaTU1UUTRMalFzTWpNNExqZDZJRTB4TlRJc01qQTNZekF0TUM0MkxEQXVOQzB4TERFdE1YTXhMREF1TkN3eExERnpMVEF1TkN3eExURXNNUW9KQ1FsVE1UVXlMREl3Tnk0MkxERTFNaXd5TURkNklFMHhOVGdzTWpBNVl6QXRNQzQyTERBdU5DMHhMREV0TVhNeExEQXVOQ3d4TERGekxUQXVOQ3d4TFRFc01WTXhOVGdzTWpBNUxqWXNNVFU0TERJd09Yb2dUVEUwTnl3eU1UQmpNQzB3TGpZc01DNDBMVEVzTVMweGN6RXNNQzQwTERFc01Rb0pDUWx6TFRBdU5Dd3hMVEVzTVZNeE5EY3NNakV3TGpZc01UUTNMREl4TUhvZ1RURTBNU3d5TVRCak1DMHdMallzTUM0MExURXNNUzB4Y3pFc01DNDBMREVzTVhNdE1DNDBMREV0TVN3eFV6RTBNU3d5TVRBdU5pd3hOREVzTWpFd2VpQk5NVFEwTERJd05XTXdMVEF1Tml3d0xqUXRNU3d4TFRFS0NRa0pjekVzTUM0MExERXNNWE10TUM0MExERXRNU3d4VXpFME5Dd3lNRFV1Tml3eE5EUXNNakExZWlCTk1UTTJMREl4TTJNd0xUQXVOaXd3TGpRdE1Td3hMVEZ6TVN3d0xqUXNNU3d4Y3kwd0xqUXNNUzB4TERGVE1UTTJMREl4TXk0MkxERXpOaXd5TVRONklFMHhNemtzTWpFNUNna0pDV013TFRBdU5pd3dMalF0TVN3eExURnpNU3d3TGpRc01Td3hjeTB3TGpRc01TMHhMREZUTVRNNUxESXhPUzQyTERFek9Td3lNVGw2SUUweE16a3NNakkxWXpBdE1DNDJMREF1TkMweExERXRNWE14TERBdU5Dd3hMREZ6TFRBdU5Dd3hMVEVzTVZNeE16a3NNakkxTGpZc01UTTVMREl5TlhvS0NRa0pJRTB4TkRNc01qTXlZekF0TUM0MkxEQXVOQzB4TERFdE1YTXhMREF1TkN3eExERnpMVEF1TkN3eExURXNNVk14TkRNc01qTXlMallzTVRRekxESXpNbm9nVFRFME9Dd3lNekJqTUMwd0xqWXNNQzQwTFRFc01TMHhjekVzTUM0MExERXNNWE10TUM0MExERXRNU3d4Q2drSkNWTXhORGdzTWpNd0xqWXNNVFE0TERJek1Ib2dUVEUxTXl3eU16UmpNQzB3TGpZc01DNDBMVEVzTVMweGN6RXNNQzQwTERFc01YTXRNQzQwTERFdE1Td3hVekUxTXl3eU16UXVOaXd4TlRNc01qTTBlaUJOTVRVM0xESXlPR013TFRBdU5pd3dMalF0TVN3eExURnpNU3d3TGpRc01Td3hDZ2tKQ1hNdE1DNDBMREV0TVN3eFV6RTFOeXd5TWpndU5pd3hOVGNzTWpJNGVpQk5NVFl6TERJeU5HTXdMVEF1Tml3d0xqUXRNU3d4TFRGek1Td3dMalFzTVN3eGN5MHdMalFzTVMweExERlRNVFl6TERJeU5DNDJMREUyTXl3eU1qUjZJRTB4TlRrc01qSXhZekF0TUM0MkxEQXVOQzB4TERFdE1Rb0pDUWx6TVN3d0xqUXNNU3d4Y3kwd0xqUXNNUzB4TERGVE1UVTVMREl5TVM0MkxERTFPU3d5TWpGNklFMHhOak1zTWpFNFl6QXRNQzQyTERBdU5DMHhMREV0TVhNeExEQXVOQ3d4TERGekxUQXVOQ3d4TFRFc01WTXhOak1zTWpFNExqWXNNVFl6TERJeE9Ib2dUVEUxT0N3eU1UUUtDUWtKWXpBdE1DNDJMREF1TkMweExERXRNWE14TERBdU5Dd3hMREZ6TFRBdU5Dd3hMVEVzTVZNeE5UZ3NNakUwTGpZc01UVTRMREl4TkhvZ1RURXpOQ3d5TWpCak1DMHdMallzTUM0MExURXNNUzB4Y3pFc01DNDBMREVzTVhNdE1DNDBMREV0TVN3eFV6RXpOQ3d5TWpBdU5pd3hNelFzTWpJd2Vnb0pDUWtnVFRFMU1Dd3lNalZqTWk0NExEQXNOUzB5TGpJc05TMDFjeTB5TGpJdE5TMDFMVFZ6TFRVc01pNHlMVFVzTlZNeE5EY3VNaXd5TWpVc01UVXdMREl5TlhvZ1RURTFOeXd5TWpCak1Dd3pMamt0TXk0eExEY3ROeXczY3kwM0xUTXVNUzAzTFRkek15NHhMVGNzTnkwM0Nna0pDVk14TlRjc01qRTJMakVzTVRVM0xESXlNSG9nVFRJME15d3hPVEZqTFRBdU5pd3dMVEVzTUM0MExURXNNWE13TGpRc01Td3hMREZvTW1Nd0xqWXNNQ3d4TFRBdU5Dd3hMVEZ6TFRBdU5DMHhMVEV0TVVneU5ETjZJRTB5TmpJc01qQXdZekF0TUM0MkxEQXVOQzB4TERFdE1XZ3lDZ2tKQ1dNd0xqWXNNQ3d4TERBdU5Dd3hMREZ6TFRBdU5Dd3hMVEVzTVdndE1rTXlOakl1TkN3eU1ERXNNall5TERJd01DNDJMREkyTWl3eU1EQjZJRTB5TkRnc01qQTFZeTB3TGpZc01DMHhMREF1TkMweExERnpNQzQwTERFc01Td3hhREpqTUM0MkxEQXNNUzB3TGpRc01TMHhjeTB3TGpRdE1TMHhMVEVLQ1FrSlNESTBPSG9nVFRJeU15d3lNRFpqTFRBdU5pd3dMVEVzTUM0MExURXNNWE13TGpRc01Td3hMREZvTW1Nd0xqWXNNQ3d4TFRBdU5Dd3hMVEZ6TFRBdU5DMHhMVEV0TVVneU1qTjZJRTB5TWpnc01qRXdZeTB3TGpZc01DMHhMREF1TkMweExERnpNQzQwTERFc01Td3hhRElLQ1FrSll6QXVOaXd3TERFdE1DNDBMREV0TVhNdE1DNDBMVEV0TVMweFNESXlPSG9nVFRJek55d3lNVEJqTUMwd0xqWXNNQzQwTFRFc01TMHhhREpqTUM0MkxEQXNNU3d3TGpRc01Td3hjeTB3TGpRc01TMHhMREZvTFRKRE1qTTNMalFzTWpFeExESXpOeXd5TVRBdU5pd3lNemNzTWpFd2Vnb0pDUWtnVFRJMU1pd3lNVEZqTUMwd0xqWXNNQzQwTFRFc01TMHhhREpqTUM0MkxEQXNNU3d3TGpRc01Td3hjeTB3TGpRc01TMHhMREZvTFRKRE1qVXlMalFzTWpFeUxESTFNaXd5TVRFdU5pd3lOVElzTWpFeGVpQk5NalkwTERJd09XTXRNQzQyTERBdE1Td3dMalF0TVN3eGN6QXVOQ3d4TERFc01XZ3lDZ2tKQ1dNd0xqWXNNQ3d4TFRBdU5Dd3hMVEZ6TFRBdU5DMHhMVEV0TVVneU5qUjZJRTB5TlRNc01UazFZekF0TUM0MkxEQXVOQzB4TERFdE1XZ3lZekF1Tml3d0xERXNNQzQwTERFc01YTXRNQzQwTERFdE1Td3hhQzB5UXpJMU15NDBMREU1Tml3eU5UTXNNVGsxTGpZc01qVXpMREU1TlhvS0NRa0pJRTB5TXpRc01UazFZeTB3TGpZc01DMHhMREF1TkMweExERnpNQzQwTERFc01Td3hhREpqTUM0MkxEQXNNUzB3TGpRc01TMHhjeTB3TGpRdE1TMHhMVEZJTWpNMGVpQk5NalF3TERJd01HTXdMVEF1Tml3d0xqUXRNU3d4TFRGb01tTXdMallzTUN3eExEQXVOQ3d4TERGekxUQXVOQ3d4TFRFc01Rb0pDUWxvTFRKRE1qUXdMalFzTWpBeExESTBNQ3d5TURBdU5pd3lOREFzTWpBd2VpQk5NakUxTERJeE5XTXdMVEF1TlN3d0xUQXVPU3d3TFRFdU5HTXRNaTQxTFRFdU1TMHpMamN0TkMweUxqWXROaTQyWXpBdU1pMHdMalVzTUM0MUxURXNNQzQ1TFRFdU5HTXRNQzQ1TFRJc01DMDBMaklzTVM0NUxUVXVNZ29KQ1FsakxUQXVPQzB5TGpZc01DNDNMVFV1TkN3ekxqUXROaTR5YkRBc01HTXdMalF0TUM0MUxEQXVPUzB3TGprc01TNDFMVEV1TVdNd0xqVXRNaTQzTERNdU1TMDBMalVzTlM0NExUUXVNV013TGpjc01DNHhMREV1TkN3d0xqUXNNaXd3TGpoak5TNHpMVE11T0N3eE1TNDJMVFV1T1N3eE9DNHlMVFV1T1FvSkNRbGpOaTQ0TERBc01UTXVNU3d5TGpJc01UZ3VNaXcxTGpsak1pNHpMVEV1Tml3MUxqUXRNU3czTERFdU0yTXdMalFzTUM0MkxEQXVOeXd4TGpNc01DNDRMREpqTUM0MkxEQXVNaXd4TGpFc01DNDJMREV1TlN3eExqRmpNaTQzTERBdU9DdzBMaklzTXk0MUxETXVOQ3cyTGpKc01Dd3dDZ2tKQ1dNeExqa3NNU3d5TGpjc015NHlMREV1T1N3MUxqSmpNUzQ1TERJc01TNDRMRFV1TWkwd0xqSXNOMk10TUM0MExEQXVOQzB3TGprc01DNDNMVEV1TlN3eFl6QXNNQzQxTERBc01DNDVMREFzTVM0MGRqRm9MVFl5ZGkweFNESXhOWG9nVFRJeE5TNDRMREl3Tnk0NENna0pDV010TUM0ekxERXVNaTB3TGpVc01pNDBMVEF1Tml3ekxqWmpMVEV1TXkweExURXVOaTB5TGprdE1DNDJMVFF1TW13d0xEQkRNakUxTERJd055NDFMREl4TlM0MExESXdOeTQzTERJeE5TNDRMREl3Tnk0NFRESXhOUzQ0TERJd055NDRlaUJOTWpFM0xqTXNNakF6TGpJS0NRa0pZeTB3TGpRc01DNDVMVEF1Tnl3eExqZ3RNU3d5TGpkakxURXRNQzQwTFRFdU5pMHhMalV0TVM0ekxUSXVOV013TGpJdE1DNDFMREF1Tmkwd0xqa3NNUzR4TFRFdU1rTXlNVFl1TlN3eU1ESXVOaXd5TVRZdU9Td3lNREl1T1N3eU1UY3VNeXd5TURNdU1rd3lNVGN1TXl3eU1ETXVNbm9LQ1FrSklFMHlNVGt1Tml3eE9UZ3VOMk10TUM0MUxEQXVPUzB4TERFdU9DMHhMalVzTWk0M1l5MHhMak10TVMweExqVXRNaTQ1TFRBdU5TMDBMakpqTUM0eExUQXVNaXd3TGpNdE1DNHpMREF1TkMwd0xqVkRNakU0TGpNc01UazNMallzTWpFNExqa3NNVGs0TGpNc01qRTVMallzTVRrNExqY0tDUWtKVERJeE9TNDJMREU1T0M0M2VpQk5Nakl3TGpnc01UazNZekF1TkMwd0xqVXNNQzQzTFRFc01TNHhMVEV1TldNdE1DNHpMVEF1TlMwd0xqa3RNQzQzTFRFdU5DMHdMalJ6TFRBdU55d3dMamt0TUM0MExERXVORU15TWpBdU15d3hPVFl1Tnl3eU1qQXVOU3d4T1RZdU9Td3lNakF1T0N3eE9UY0tDUWtKVERJeU1DNDRMREU1TjNvZ1RUSXlOaTR4TERFNU1TNHlZeTB4TERBdU9TMHlMREV1T0MweUxqa3NNaTQ0WXkwd0xqTXRNQzR6TFRBdU55MHdMall0TVM0eExUQXVPR013TGpRdE1TNDJMREl1TVMweUxqVXNNeTQzTFRJdU1Rb0pDUWxETWpJMUxqa3NNVGt4TGpFc01qSTJMREU1TVM0eUxESXlOaTR4TERFNU1TNHlUREl5Tmk0eExERTVNUzR5ZWlCTk1qWTRMamdzTVRrMFl5MHdMamt0TVMweExqa3RNUzQ1TFRJdU9TMHlMamhqTVM0MUxUQXVOaXd6TGpNc01DNHhMRE11T1N3eExqY0tDUWtKWXpBc01DNHhMREF1TVN3d0xqSXNNQzR4TERBdU0wTXlOamt1TlN3eE9UTXVOQ3d5TmprdU1Td3hPVE11Tml3eU5qZ3VPQ3d4T1RSTU1qWTRMamdzTVRrMGVpQk5NamN3TGpFc01UazFMalZqTUM0MExEQXVOU3d3TGpnc01Td3hMakVzTVM0MENna0pDV013TGpVdE1DNHhMREF1T1Mwd0xqY3NNQzQ0TFRFdU1uTXRNQzQzTFRBdU9TMHhMakl0TUM0NFF6STNNQzQxTERFNU5TNHhMREkzTUM0ekxERTVOUzR6TERJM01DNHhMREU1TlM0MWVpQk5NamN6TGprc01qQXhMalJqTFRBdU5TMHdMamt0TVMweExqZ3RNUzQxTFRJdU53b0pDUWxqTUM0NExUQXVOQ3d4TGpRdE1TNHhMREV1TmkweVl6RXVNeXd4TGpFc01TNDBMRE1zTUM0MExEUXVNa015TnpRdU1pd3lNREV1TVN3eU56UXNNakF4TGpJc01qY3pMamtzTWpBeExqUjZJRTB5TnpVdU5pd3lNRFV1T1dNdE1DNHpMVEF1T1Mwd0xqWXRNUzQ0TFRFdE1pNDNDZ2tKQ1dNd0xqUXRNQzR6TERBdU9DMHdMallzTVM0eUxURmpNU3d3TGpVc01TNDBMREV1Tnl3eExESXVOME15TnpZdU5pd3lNRFV1TXl3eU56WXVNaXd5TURVdU55d3lOelV1Tml3eU1EVXVPWG9nVFRJM05pNDRMREl4TVM0MFl5MHdMakV0TVM0eUxUQXVOQzB5TGpRdE1DNDJMVE11TmdvSkNRbGpNQzQxTFRBdU1Td3dMamt0TUM0MExERXVNaTB3TGpaRE1qYzRMalFzTWpBNExqVXNNamM0TGpFc01qRXdMalFzTWpjMkxqZ3NNakV4TGpSTU1qYzJMamdzTWpFeExqUk1NamMyTGpnc01qRXhMalI2SUUweU56VXNNakUwWXkwd0xqVXRNVFl0TVRNdU9TMHlPQzQyTFRJNUxqa3RNamd1TVFvSkNRbGpMVEUxTGpNc01DNDFMVEkzTGpZc01USXVPQzB5T0M0eExESTRMakZJTWpjMVRESTNOU3d5TVRSNklFMDNNaTR6TERFNU9DNHhZeTB3TGpJdE1DNHpMVEF1TXkwd0xqY3RNQzR6TFRFdU1YWXRNVEpvTFRKMk1USmpNQ3d5TGpJc01TNDRMRFFzTkN3MENna0pDV014TGpJc01Dd3lMak10TUM0MUxETXVNUzB4TGpSak1DNDJMVEF1Tnl3d0xqa3RNUzQyTERBdU9TMHlMalYyTFRFeWFDMHlkakV5WXpBc01TNHhMVEF1T1N3eUxUSXNNbXd3TERCRE56TXVNeXd4T1Rrc056SXVOeXd4T1RndU55dzNNaTR6TERFNU9DNHhlaUJOTnpVc01UYzJDZ2tKQ1dNd0xqUXNNQ3d3TGpjc01Dd3hMakV0TUM0eFl6QXVOU3d5TGpJc01pNDJMRE11TlN3MExqZ3NNMk13TGpVdE1DNHhMREV0TUM0ekxERXVOQzB3TGpaak1TNHhMREl1TVN3eExqY3NOQzQwTERFdU55dzJMamQyTWpSak1Dd3pMak10TWk0M0xEWXROaXcyYUMwemRqa0tDUWtKWXpBc01pNDRMVEl1TWl3MUxUVXNOWE10TlMweUxqSXROUzAxZGkwNWFDMHpZeTB6TGpNc01DMDJMVEl1TnkwMkxUWjJMVEkwWXpBdE55NDNMRFl1TXkweE5Dd3hOQzB4TkVNM01Dd3hOek11T0N3M01pNHlMREUzTml3M05Td3hOelo2SUUwMU9Dd3hPVEYyTVRJS0NRa0pZekFzTUM0NExEQXVOU3d4TGpVc01TNHlMREV1T0dNd0xqa3NNQzQwTERFdU9Td3dMakVzTWk0MExUQXVOMk13TGpJdE1DNHpMREF1TXkwd0xqY3NNQzR6TFRFdU1YWXRNVEpvTW5ZeE1tTXdMREl1TWkweExqY3NOQzB6TGprc05HTXRNQzQxTERBdE1TMHdMakV0TVM0MExUQXVNZ29KQ1FsakxUQXVNaTB3TGpFdE1DNDBMVEF1TWkwd0xqY3RNQzR6ZGpJdU5XTXdMREl1TWl3eExqZ3NOQ3cwTERSb01UWmpNaTR5TERBc05DMHhMamdzTkMwMGRpMHlOR013TFRFdU5TMHdMakl0TWk0NUxUQXVOeTAwTGpKakxUQXVOQ3d3TGpFdE1DNDVMREF1TWkweExqTXNNQzR5Q2drSkNXTXRNaTR4TERBdE5DNHhMVEV1TVMwMUxqSXRNMk10TXkwd0xqRXROUzQyTFRJdE5pNDFMVFF1T1VNMk1pNDBMREUzTkN3MU9Dd3hOemtzTlRnc01UZzFWakU1TVhvZ1RUWTNMREl4TlhZNVl6QXNNUzQzTERFdU15d3pMRE1zTTNNekxURXVNeXd6TFROMkxUbElOamQ2SWk4K0Nna0pQSEJoZEdnZ1kyeGhjM005SW5OME1DSWdaRDBpVFMweE55d3hPVEZqTFRBdU5pd3dMVEVzTUM0MExURXNNWE13TGpRc01Td3hMREZvTW1Nd0xqWXNNQ3d4TFRBdU5Dd3hMVEZ6TFRBdU5DMHhMVEV0TVVndE1UZDZJRTB5TERJd01HTXdMVEF1Tml3d0xqUXRNU3d4TFRGb01nb0pDUWxqTUM0MkxEQXNNU3d3TGpRc01Td3hjeTB3TGpRc01TMHhMREZJTTBNeUxqUXNNakF4TERJc01qQXdMallzTWl3eU1EQjZJRTB0TVRJc01qQTFZeTB3TGpZc01DMHhMREF1TkMweExERnpNQzQwTERFc01Td3hhREpqTUM0MkxEQXNNUzB3TGpRc01TMHhjeTB3TGpRdE1TMHhMVEZJTFRFeWVnb0pDUWtnVFMwek55d3lNRFpqTFRBdU5pd3dMVEVzTUM0MExURXNNWE13TGpRc01Td3hMREZvTW1Nd0xqWXNNQ3d4TFRBdU5Dd3hMVEZ6TFRBdU5DMHhMVEV0TVVndE16ZDZJRTB0TXpJc01qRXdZeTB3TGpZc01DMHhMREF1TkMweExERnpNQzQwTERFc01Td3hhREpqTUM0MkxEQXNNUzB3TGpRc01TMHhDZ2tKQ1hNdE1DNDBMVEV0TVMweFNDMHpNbm9nVFMweU15d3lNVEJqTUMwd0xqWXNNQzQwTFRFc01TMHhhREpqTUM0MkxEQXNNU3d3TGpRc01Td3hjeTB3TGpRc01TMHhMREZvTFRKRExUSXlMallzTWpFeExUSXpMREl4TUM0MkxUSXpMREl4TUhvZ1RTMDRMREl4TVdNd0xUQXVOaXd3TGpRdE1Td3hMVEVLQ1FrSmFESmpNQzQyTERBc01Td3dMalFzTVN3eGN5MHdMalFzTVMweExERm9MVEpETFRjdU5pd3lNVEl0T0N3eU1URXVOaTA0TERJeE1Yb2dUVFFzTWpBNVl5MHdMallzTUMweExEQXVOQzB4TERGek1DNDBMREVzTVN3eGFESmpNQzQyTERBc01TMHdMalFzTVMweGN5MHdMalF0TVMweExURklOSG9LQ1FrSklFMHROeXd4T1RWak1DMHdMallzTUM0MExURXNNUzB4YURKak1DNDJMREFzTVN3d0xqUXNNU3d4Y3kwd0xqUXNNUzB4TERGb0xUSkRMVFl1Tml3eE9UWXROeXd4T1RVdU5pMDNMREU1TlhvZ1RTMHlOaXd4T1RWakxUQXVOaXd3TFRFc01DNDBMVEVzTVhNd0xqUXNNU3d4TERGb01nb0pDUWxqTUM0MkxEQXNNUzB3TGpRc01TMHhjeTB3TGpRdE1TMHhMVEZJTFRJMmVpQk5MVEl3TERJd01HTXdMVEF1Tml3d0xqUXRNU3d4TFRGb01tTXdMallzTUN3eExEQXVOQ3d4TERGekxUQXVOQ3d4TFRFc01XZ3RNa010TVRrdU5pd3lNREV0TWpBc01qQXdMall0TWpBc01qQXdlaUJOTFRRMUxESXhOUW9KQ1Fsak1DMHdMalVzTUMwd0xqa3NNQzB4TGpSakxUSXVOUzB4TGpFdE15NDNMVFF0TWk0MkxUWXVObU13TGpJdE1DNDFMREF1TlMweExEQXVPUzB4TGpSakxUQXVPUzB5TERBdE5DNHlMREV1T1MwMUxqSmpMVEF1T0MweUxqWXNNQzQzTFRVdU5Dd3pMalF0Tmk0eWJEQXNNQW9KQ1Fsak1DNDBMVEF1TlN3d0xqa3RNQzQ1TERFdU5TMHhMakZqTUM0MUxUSXVOeXd6TGpFdE5DNDFMRFV1T0MwMExqRmpNQzQzTERBdU1Td3hMalFzTUM0MExESXNNQzQ0WXpVdU15MHpMamdzTVRFdU5pMDFMamtzTVRndU1pMDFMamxqTmk0NExEQXNNVE11TVN3eUxqSXNNVGd1TWl3MUxqa0tDUWtKWXpJdU15MHhMallzTlM0MExURXNOeXd4TGpOak1DNDBMREF1Tml3d0xqY3NNUzR6TERBdU9Dd3lZekF1Tml3d0xqSXNNUzR4TERBdU5pd3hMalVzTVM0eFl6SXVOeXd3TGpnc05DNHlMRE11TlN3ekxqUXNOaTR5YkRBc01HTXhMamtzTVN3eUxqY3NNeTR5TERFdU9TdzFMaklLQ1FrSll6RXVPU3d5TERFdU9DdzFMakl0TUM0eUxEZGpMVEF1TkN3d0xqUXRNQzQ1TERBdU55MHhMalVzTVdNd0xEQXVOU3d3TERBdU9Td3dMREV1TkhZeGFDMDJNbll0TVVndE5EVjZJRTB0TkRRdU1pd3lNRGN1T0dNdE1DNHpMREV1TWkwd0xqVXNNaTQwTFRBdU5pd3pMallLQ1FrSll5MHhMak10TVMweExqWXRNaTQ1TFRBdU5pMDBMakpzTUN3d1F5MDBOU3d5TURjdU5TMDBOQzQyTERJd055NDNMVFEwTGpJc01qQTNMamhNTFRRMExqSXNNakEzTGpoNklFMHROREl1Tnl3eU1ETXVNbU10TUM0MExEQXVPUzB3TGpjc01TNDRMVEVzTWk0M0Nna0pDV010TVMwd0xqUXRNUzQyTFRFdU5TMHhMak10TWk0MVl6QXVNaTB3TGpVc01DNDJMVEF1T1N3eExqRXRNUzR5UXkwME15NDFMREl3TWk0MkxUUXpMakVzTWpBeUxqa3ROREl1Tnl3eU1ETXVNa3d0TkRJdU55d3lNRE11TW5vZ1RTMDBNQzQwTERFNU9DNDNDZ2tKQ1dNdE1DNDFMREF1T1MweExERXVPQzB4TGpVc01pNDNZeTB4TGpNdE1TMHhMalV0TWk0NUxUQXVOUzAwTGpKak1DNHhMVEF1TWl3d0xqTXRNQzR6TERBdU5DMHdMalZETFRReExqY3NNVGszTGpZdE5ERXVNU3d4T1RndU15MDBNQzQwTERFNU9DNDNlaUJOTFRNNUxqSXNNVGszQ2drSkNXTXdMak10TUM0MUxEQXVOeTB4TERFdU1TMHhMalZqTFRBdU15MHdMalV0TUM0NUxUQXVOeTB4TGpRdE1DNDBjeTB3TGpjc01DNDVMVEF1TkN3eExqUkRMVE01TGpjc01UazJMamN0TXprdU5Td3hPVFl1T1Mwek9TNHlMREU1TjB3dE16a3VNaXd4T1RkNklFMHRNek11T1N3eE9URXVNZ29KQ1FsakxURXNNQzQ1TFRJc01TNDRMVEl1T1N3eUxqaGpMVEF1TXkwd0xqTXRNQzQzTFRBdU5pMHhMakV0TUM0NFl6QXVOQzB4TGpZc01pNHhMVEl1TlN3ekxqY3RNaTR4UXkwek5DNHhMREU1TVM0eExUTTBMREU1TVM0eUxUTXpMamtzTVRreExqSk1MVE16TGprc01Ua3hMako2SUUwNExqZ3NNVGswQ2drSkNXTXRNQzQ1TFRFdE1TNDVMVEV1T1MweUxqa3RNaTQ0WXpFdU5TMHdMallzTXk0ekxEQXVNU3d6TGprc01TNDNZekFzTUM0eExEQXVNU3d3TGpJc01DNHhMREF1TTBNNUxqVXNNVGt6TGpRc09TNHhMREU1TXk0MkxEZ3VPQ3d4T1RSTU9DNDRMREU1TkhvZ1RURXdMakVzTVRrMUxqVUtDUWtKWXpBdU5Dd3dMalVzTUM0NExERXNNUzR4TERFdU5HTXdMalV0TUM0eExEQXVPUzB3TGpjc01DNDRMVEV1TW1NdE1DNHhMVEF1TlMwd0xqY3RNQzQ1TFRFdU1pMHdMamhETVRBdU5Td3hPVFV1TVN3eE1DNHpMREU1TlM0ekxERXdMakVzTVRrMUxqVjZJRTB4TXk0NUxESXdNUzQwQ2drSkNXTXRNQzQxTFRBdU9TMHdMamt0TVM0NExURXVOUzB5TGpkak1DNDRMVEF1TkN3eExqUXRNUzR4TERFdU5pMHlZekV1TXl3eExqRXNNUzQwTERNc01DNDBMRFF1TWtNeE5DNHlMREl3TVM0eExERTBMREl3TVM0eUxERXpMamtzTWpBeExqUjZJRTB4TlM0M0xESXdOUzQ1Q2drSkNXTXRNQzR6TFRBdU9TMHdMall0TVM0NExURXRNaTQzWXpBdU5DMHdMak1zTUM0NExUQXVOaXd4TGpJdE1XTXhMREF1TlN3eExqUXNNUzQzTERFc01pNDNRekUyTGpZc01qQTFMak1zTVRZdU1pd3lNRFV1Tnl3eE5TNDNMREl3TlM0NWVpQk5NVFl1T0N3eU1URXVOQW9KQ1FsakxUQXVNUzB4TGpJdE1DNDBMVEl1TkMwd0xqWXRNeTQyWXpBdU5TMHdMakVzTUM0NUxUQXVOQ3d4TGpJdE1DNDJRekU0TGpRc01qQTRMalVzTVRndU1Td3lNVEF1TkN3eE5pNDRMREl4TVM0MFRERTJMamdzTWpFeExqUk1NVFl1T0N3eU1URXVOSG9nVFRFMUxESXhOQW9KQ1FsakxUQXVOUzB4TmkweE15NDVMVEk0TGpZdE1qa3VPUzB5T0M0eFl5MHhOUzR6TERBdU5TMHlOeTQyTERFeUxqZ3RNamd1TVN3eU9DNHhTREUxVERFMUxESXhOSG9pTHo0S0NUd3ZaejRLUEM5blBnbzhMM04yWno0Syc7XG4iLCIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vICAgRmlsZSBOYW1lOiBwYWxsZXR0ZS1ncmFkaWVudC5zY3NzXG4vLyAgIERlc2NyaXB0aW9uOiBncmFkaWVudCBjb2xvciBzeXN0ZW0gc3R5bGVzXG4vLyAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vICAgSXRlbSBOYW1lOiBWdWV4eSAtIFZ1ZWpzLCBSZWFjdCwgQW5ndWxhciwgSFRNTCAmIExhcmF2ZWwgQWRtaW4gRGFzaGJvYXJkIFRlbXBsYXRlXG4vLyAgIEF1dGhvcjogUElYSU5WRU5UXG4vLyAgIEF1dGhvciBVUkw6IGh0dHA6Ly93d3cudGhlbWVmb3Jlc3QubmV0L3VzZXIvcGl4aW52ZW50XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuQGZ1bmN0aW9uIGNvbG9yLWZ1bmN0aW9uKCRjb2xvciwgJHR5cGUpIHtcbiAgQGlmIG1hcC1oYXMta2V5KCRjb2xvcnMsICRjb2xvcikge1xuICAgICRjdXJyX2NvbG9yOiBtYXAtZ2V0KCRjb2xvcnMsICRjb2xvcik7XG4gICAgQGlmIG1hcC1oYXMta2V5KCRjdXJyX2NvbG9yLCAkdHlwZSkge1xuICAgICAgQHJldHVybiBtYXAtZ2V0KCRjdXJyX2NvbG9yLCAkdHlwZSk7XG4gICAgfVxuICB9XG4gIC8vIEB3YXJuIFwiVW5rbm93biBgI3tuYW1lfWAgaW4gJGNvbG9ycy5cIjtcbiAgQHJldHVybiBudWxsO1xufVxuXG4vLyBDb2xvciBwYWxldHRlc1xuQGltcG9ydCAncGFsZXR0ZS12YXJpYWJsZXMnO1xuXG5AaW1wb3J0ICdib290c3RyYXAvc2Nzcy9taXhpbnMvX2dyYWRpZW50cyc7XG5AaW1wb3J0ICdib290c3RyYXAvc2Nzcy9taXhpbnMvZ3JhZGllbnRzJztcblxuQGVhY2ggJGNvbG9yX25hbWUsICRjb2xvciBpbiAkY29sb3JzIHtcbiAgQGVhY2ggJGNvbG9yX3R5cGUsICRjb2xvcl92YWx1ZSBpbiAkY29sb3Ige1xuICAgIEBpZiAkY29sb3JfdHlwZSA9PSAnYmFzZScge1xuICAgICAgQGlmICgkY29sb3JfbmFtZSAhPSAnbGlnaHQnIGFuZCAkY29sb3JfbmFtZSAhPSAnYmxhY2snIGFuZCAkY29sb3JfbmFtZSAhPSAnd2hpdGUnKSB7XG4gICAgICAgIC5iZy1ncmFkaWVudC0jeyRjb2xvcl9uYW1lfSxcbiAgICAgICAgLmJ0bi1ncmFkaWVudC0jeyRjb2xvcl9uYW1lfSB7XG4gICAgICAgICAgY29sb3I6ICR3aGl0ZTtcbiAgICAgICAgICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlO1xuICAgICAgICAgIEBpZiAkY29sb3JfbmFtZSA9PSAnZGFyaycge1xuICAgICAgICAgICAgQGlmIChjb2xvci1mdW5jdGlvbigkY29sb3JfbmFtZSwgJ2Jhc2UnKSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIEBpbmNsdWRlIGdyYWRpZW50LWRpcmVjdGlvbmFsKG1hcC1nZXQoKCRjb2xvciksICdiYXNlJyksIG1hcC1nZXQoKCRjb2xvciksICdkYXJrZW4tMicpLCA0N2RlZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBmb3IgZGFyayBsYXlvdXRcbiAgICAgICAgICAgIC5kYXJrLWxheW91dCAmIHtcbiAgICAgICAgICAgICAgQGluY2x1ZGUgZ3JhZGllbnQtZGlyZWN0aW9uYWwobWFwLWdldCgoJGNvbG9yKSwgJ2Rhcmtlbi0yJyksIG1hcC1nZXQoKCRjb2xvciksICdiYXNlJyksIDQ3ZGVnKTtcbiAgICAgICAgICAgICAgYmFja2dyb3VuZC1yZXBlYXQ6IHJlcGVhdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJhY2tncm91bmQtcmVwZWF0OiByZXBlYXQ7XG4gICAgICAgICAgfSBAZWxzZSB7XG4gICAgICAgICAgICBAaWYgKGNvbG9yLWZ1bmN0aW9uKCRjb2xvcl9uYW1lLCAnYmFzZScpICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgQGluY2x1ZGUgZ3JhZGllbnQtZGlyZWN0aW9uYWwobWFwLWdldCgoJGNvbG9yKSwgJ2Jhc2UnKSwgbWFwLWdldCgoJGNvbG9yKSwgJ2xpZ2h0ZW4tMicpLCA0N2RlZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0O1xuICAgICAgICAgIH1cbiAgICAgICAgICAmOmhvdmVyLFxuICAgICAgICAgICY6YWN0aXZlIHtcbiAgICAgICAgICAgIGNvbG9yOiAkd2hpdGU7XG4gICAgICAgICAgfVxuICAgICAgICAgICY6aG92ZXI6bm90KC5kaXNhYmxlZCk6bm90KDpkaXNhYmxlZCkge1xuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0ycHgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAmOmFjdGl2ZSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG4gICAgICAgICAgfVxuICAgICAgICAgICY6YWN0aXZlLFxuICAgICAgICAgICY6Zm9jdXMge1xuICAgICAgICAgICAgQGlmIChjb2xvci1mdW5jdGlvbigkY29sb3JfbmFtZSwgJ2Rhcmtlbi0yJykgIT0gbnVsbCkge1xuICAgICAgICAgICAgICBAaW5jbHVkZSBncmFkaWVudC1kaXJlY3Rpb25hbChtYXAtZ2V0KCgkY29sb3IpLCAnZGFya2VuLTInKSwgbWFwLWdldCgoJGNvbG9yKSwgJ2Jhc2UnKSwgNDdkZWcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYmFja2dyb3VuZC1yZXBlYXQ6IHJlcGVhdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsIi8vIEdyYWRpZW50c1xuXG5AbWl4aW4gZ3JhZGllbnQtYmcoJGNvbG9yKSB7XG4gIEBpZiAkZW5hYmxlLWdyYWRpZW50cyB7XG4gICAgYmFja2dyb3VuZDogJGNvbG9yIGxpbmVhci1ncmFkaWVudCgxODBkZWcsIG1peCgkYm9keS1iZywgJGNvbG9yLCAxNSUpLCAkY29sb3IpIHJlcGVhdC14O1xuICB9IEBlbHNlIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3I7XG4gIH1cbn1cblxuLy8gSG9yaXpvbnRhbCBncmFkaWVudCwgZnJvbSBsZWZ0IHRvIHJpZ2h0XG4vL1xuLy8gQ3JlYXRlcyB0d28gY29sb3Igc3RvcHMsIHN0YXJ0IGFuZCBlbmQsIGJ5IHNwZWNpZnlpbmcgYSBjb2xvciBhbmQgcG9zaXRpb24gZm9yIGVhY2ggY29sb3Igc3RvcC5cbkBtaXhpbiBncmFkaWVudC14KCRzdGFydC1jb2xvcjogJGdyYXktNzAwLCAkZW5kLWNvbG9yOiAkZ3JheS04MDAsICRzdGFydC1wZXJjZW50OiAwJSwgJGVuZC1wZXJjZW50OiAxMDAlKSB7XG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgJHN0YXJ0LWNvbG9yICRzdGFydC1wZXJjZW50LCAkZW5kLWNvbG9yICRlbmQtcGVyY2VudCk7XG4gIGJhY2tncm91bmQtcmVwZWF0OiByZXBlYXQteDtcbn1cblxuLy8gVmVydGljYWwgZ3JhZGllbnQsIGZyb20gdG9wIHRvIGJvdHRvbVxuLy9cbi8vIENyZWF0ZXMgdHdvIGNvbG9yIHN0b3BzLCBzdGFydCBhbmQgZW5kLCBieSBzcGVjaWZ5aW5nIGEgY29sb3IgYW5kIHBvc2l0aW9uIGZvciBlYWNoIGNvbG9yIHN0b3AuXG5AbWl4aW4gZ3JhZGllbnQteSgkc3RhcnQtY29sb3I6ICRncmF5LTcwMCwgJGVuZC1jb2xvcjogJGdyYXktODAwLCAkc3RhcnQtcGVyY2VudDogMCUsICRlbmQtcGVyY2VudDogMTAwJSkge1xuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLCAkc3RhcnQtY29sb3IgJHN0YXJ0LXBlcmNlbnQsICRlbmQtY29sb3IgJGVuZC1wZXJjZW50KTtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IHJlcGVhdC14O1xufVxuXG5AbWl4aW4gZ3JhZGllbnQtZGlyZWN0aW9uYWwoJHN0YXJ0LWNvbG9yOiAkZ3JheS03MDAsICRlbmQtY29sb3I6ICRncmF5LTgwMCwgJGRlZzogNDVkZWcpIHtcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KCRkZWcsICRzdGFydC1jb2xvciwgJGVuZC1jb2xvcik7XG4gIGJhY2tncm91bmQtcmVwZWF0OiByZXBlYXQteDtcbn1cbkBtaXhpbiBncmFkaWVudC14LXRocmVlLWNvbG9ycygkc3RhcnQtY29sb3I6ICRibHVlLCAkbWlkLWNvbG9yOiAkcHVycGxlLCAkY29sb3Itc3RvcDogNTAlLCAkZW5kLWNvbG9yOiAkcmVkKSB7XG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgJHN0YXJ0LWNvbG9yLCAkbWlkLWNvbG9yICRjb2xvci1zdG9wLCAkZW5kLWNvbG9yKTtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbn1cbkBtaXhpbiBncmFkaWVudC15LXRocmVlLWNvbG9ycygkc3RhcnQtY29sb3I6ICRibHVlLCAkbWlkLWNvbG9yOiAkcHVycGxlLCAkY29sb3Itc3RvcDogNTAlLCAkZW5kLWNvbG9yOiAkcmVkKSB7XG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCgkc3RhcnQtY29sb3IsICRtaWQtY29sb3IgJGNvbG9yLXN0b3AsICRlbmQtY29sb3IpO1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xufVxuQG1peGluIGdyYWRpZW50LXJhZGlhbCgkaW5uZXItY29sb3I6ICRncmF5LTcwMCwgJG91dGVyLWNvbG9yOiAkZ3JheS04MDApIHtcbiAgYmFja2dyb3VuZC1pbWFnZTogcmFkaWFsLWdyYWRpZW50KGNpcmNsZSwgJGlubmVyLWNvbG9yLCAkb3V0ZXItY29sb3IpO1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xufVxuQG1peGluIGdyYWRpZW50LXN0cmlwZWQoJGNvbG9yOiByZ2JhKCR3aGl0ZSwgLjE1KSwgJGFuZ2xlOiA0NWRlZykge1xuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQoJGFuZ2xlLCAkY29sb3IgMjUlLCB0cmFuc3BhcmVudCAyNSUsIHRyYW5zcGFyZW50IDUwJSwgJGNvbG9yIDUwJSwgJGNvbG9yIDc1JSwgdHJhbnNwYXJlbnQgNzUlLCB0cmFuc3BhcmVudCk7XG59XG4iLCJAaW1wb3J0ICd+QG5nLXNlbGVjdC9uZy1zZWxlY3QvdGhlbWVzL2RlZmF1bHQudGhlbWUuY3NzJztcbkBpbXBvcnQgJ0Bjb3JlL3Njc3MvYmFzZS9jb2xvcnMnO1xuQGltcG9ydCAnQGNvcmUvc2Nzcy9iYXNlL2NvbXBvbmVudHMvaW5jbHVkZSc7IC8vIENvbXBvbmVudHMgaW5jbHVkZXNcblxuLy8gdmFyaWFibGUgZGVjbGFyYXRpb25cbiRuZy1zZWxlY3QtZGFyay1iZy1jb2xvcjogJHRoZW1lLWRhcmstYm9keS1iZztcbiRuZy1zZWxlY3QtZHJvcGRvd24tYmctY29sb3I6ICR0aGVtZS1kYXJrLWNhcmQtYmc7XG4kbmctc2VsZWN0LWRhcmstbXV0ZWQtY29sb3I6ICR0aGVtZS1kYXJrLXRleHQtbXV0ZWQtY29sb3I7XG4kbmctc2VsZWN0LWRhcmstYm9yZGVyLWNvbG9yOiAkdGhlbWUtZGFyay1ib3JkZXItY29sb3I7XG4kbmctc2VsZWN0LWRhcmstY29sb3I6ICR0aGVtZS1kYXJrLWJvZHktY29sb3I7XG4kbmctc2VsZWN0LWRhcmstaW5wdXQtYmctY29sb3I6ICR0aGVtZS1kYXJrLWlucHV0LWJnO1xuXG4vLyBuZy1zZWxlY3Rcbi5uZy1zZWxlY3Qge1xuICAmLm5nLXNlbGVjdC1mb2N1c2VkIHtcbiAgICBvdXRsaW5lOiAwO1xuICAgIGJveC1zaGFkb3c6ICRpbnB1dC1mb2N1cy1ib3gtc2hhZG93O1xuXG4gICAgLm5nLXNlbGVjdC1jb250YWluZXIge1xuICAgICAgYm9yZGVyLWNvbG9yOiAkcHJpbWFyeSAhaW1wb3J0YW50O1xuICAgICAgei1pbmRleDogMjAwMCAhaW1wb3J0YW50O1xuICAgICAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xuICAgICAgY29sb3I6ICRib2R5LWNvbG9yICFpbXBvcnRhbnQ7XG4gICAgICBtaW4taGVpZ2h0OiAzOHB4ICFpbXBvcnRhbnQ7XG4gICAgfVxuICB9XG4gIC5uZy1zZWxlY3QtY29udGFpbmVyIHtcbiAgICBjb2xvcjogJGJvZHktY29sb3IgIWltcG9ydGFudDtcbiAgICBtaW4taGVpZ2h0OiAzOHB4ICFpbXBvcnRhbnQ7XG4gIH1cbiAgJi5lcnJvciB7XG4gICAgLm5nLXNlbGVjdC1jb250YWluZXIge1xuICAgICAgYm9yZGVyLWNvbG9yOiAkZGFuZ2VyICFpbXBvcnRhbnQ7XG4gICAgfVxuICB9XG5cbiAgJi5uZy1zZWxlY3QtbXVsdGlwbGUge1xuICAgIC5uZy12YWx1ZSB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkcHJpbWFyeSAhaW1wb3J0YW50O1xuICAgICAgY29sb3I6ICR3aGl0ZTtcbiAgICAgIGJvcmRlcjogbm9uZSAhaW1wb3J0YW50O1xuICAgICAgZm9udC1zaXplOiAwLjhyZW0gIWltcG9ydGFudDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDRweCAhaW1wb3J0YW50O1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cbiAgICAgIC5uZy12YWx1ZS1pY29uIHtcbiAgICAgICAgJi5yaWdodCB7XG4gICAgICAgICAgYm9yZGVyOiAwICFpbXBvcnRhbnQ7XG4gICAgICAgIH1cblxuICAgICAgICAmLmxlZnQge1xuICAgICAgICAgIGJvcmRlcjogMCAhaW1wb3J0YW50O1xuICAgICAgICB9XG5cbiAgICAgICAgJjpob3ZlciB7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLm5nLXZhbHVlLWljb24ge1xuICAgICAgICAmLmxlZnQge1xuICAgICAgICAgIGZvbnQtc2l6ZTogMS4xcmVtICFpbXBvcnRhbnQ7XG4gICAgICAgIH1cbiAgICAgICAgJi5yaWdodCB7XG4gICAgICAgICAgZm9udC1zaXplOiAxLjFyZW0gIWltcG9ydGFudDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAubmctc2VsZWN0LWNvbnRhaW5lciB7XG4gICAgICAubmctcGxhY2Vob2xkZXIge1xuICAgICAgICB0b3A6IDhweCAhaW1wb3J0YW50O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gICYubmctc2VsZWN0LXNpemUtbGcge1xuICAgIC5uZy1zZWxlY3QtY29udGFpbmVyIHtcbiAgICAgIG1pbi1oZWlnaHQ6IDQ4cHg7XG4gICAgICBmb250LXNpemU6IDEuMnJlbSAhaW1wb3J0YW50O1xuXG4gICAgICAubmctdmFsdWUge1xuICAgICAgICBmb250LXNpemU6IDEuMnJlbSAhaW1wb3J0YW50O1xuICAgICAgICBwYWRkaW5nOiA3cHg7XG4gICAgICAgIC5uZy12YWx1ZS1pY29uIHtcbiAgICAgICAgICAmLmxlZnQge1xuICAgICAgICAgICAgZm9udC1zaXplOiAxLjFyZW0gIWltcG9ydGFudDtcbiAgICAgICAgICB9XG4gICAgICAgICAgJi5yaWdodCB7XG4gICAgICAgICAgICBmb250LXNpemU6IDEuMXJlbSAhaW1wb3J0YW50O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLm5nLWNsZWFyLXdyYXBwZXIge1xuICAgICAgICBoZWlnaHQ6IDIycHggIWltcG9ydGFudDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAmLm5nLXNlbGVjdC1zaXplLXNtIHtcbiAgICAubmctc2VsZWN0LWNvbnRhaW5lciB7XG4gICAgICBtaW4taGVpZ2h0OiAyOHB4ICFpbXBvcnRhbnQ7XG4gICAgICBmb250LXNpemU6IDAuNzVyZW07XG5cbiAgICAgIC5uZy12YWx1ZSB7XG4gICAgICAgIHBhZGRpbmc6IDBweDtcbiAgICAgICAgZm9udC1zaXplOiAwLjllbSAhaW1wb3J0YW50O1xuICAgICAgICAubmctdmFsdWUtaWNvbiB7XG4gICAgICAgICAgJi5sZWZ0IHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMC45ZW0gIWltcG9ydGFudDtcbiAgICAgICAgICB9XG4gICAgICAgICAgJi5yaWdodCB7XG4gICAgICAgICAgICBmb250LXNpemU6IDAuOWVtICFpbXBvcnRhbnQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLm5nLW9wdGlvbiB7XG4gICAgJi5uZy1vcHRpb24tc2VsZWN0ZWQge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHByaW1hcnkgIWltcG9ydGFudDtcbiAgICAgIGNvbG9yOiAkd2hpdGUgIWltcG9ydGFudDtcbiAgICAgICYubmctb3B0aW9uLW1hcmtlZCB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRwcmltYXJ5ICFpbXBvcnRhbnQ7XG4gICAgICAgIGNvbG9yOiAkd2hpdGUgIWltcG9ydGFudDtcbiAgICAgIH1cbiAgICAgIC5uZy1vcHRpb24tbGFiZWwge1xuICAgICAgICBmb250LXdlaWdodDogaW5oZXJpdCAhaW1wb3J0YW50O1xuICAgICAgfVxuICAgIH1cbiAgICAmLm5nLW9wdGlvbi1tYXJrZWQge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgkcHJpbWFyeSwgMC4xMikgIWltcG9ydGFudDtcbiAgICAgIGNvbG9yOiAkcHJpbWFyeSAhaW1wb3J0YW50O1xuICAgIH1cbiAgICAmLm5nLW9wdGlvbi1kaXNhYmxlZCB7XG4gICAgICBjb2xvcjogJHRleHQtbXV0ZWQgIWltcG9ydGFudDtcbiAgICB9XG4gIH1cbiAgLm5nLWFycm93IHtcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQm9BQUFBYUJBTUFBQUJiWkZIOUFBQUFHMUJNVkVVQUFBQ1JrWkdSa1pHU2twS1JrWkdTa3BLU2twS1JrWkdSa1pITHNvKzlBQUFBQ0hSU1RsTUErMUpvV28wdkxGUURtbWtBQUFCbFNVUkJWQmpUWTZBTFNBQ1RiQkFPYXpPWXNnZ0FVeEVkQmtDU3VhTVZ4R0dYNkJBQlVvNGRqUVVncm1KSGh3RlFxa01JckpKSm9xT1p3YUtqVVFISWhrZzZnNlFnZ0VXaVE3Q2owUUhJZ2twQ3BhQTZ3YnJna2lBcGhLU2dBckpUWFJob0JnQjlHUlBzd3l2QnFBQUFBQUJKUlU1RXJrSmdnZz09Jyk7XG4gICAgYmFja2dyb3VuZC1zaXplOiAxMnB4IDEycHgsIDEwcHggMTBweDtcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICAgIGhlaWdodDogMC44cmVtICFpbXBvcnRhbnQ7XG4gICAgcGFkZGluZy1yaWdodDogMS41cmVtO1xuICAgIG1hcmdpbi1sZWZ0OiAwO1xuICAgIG1hcmdpbi10b3A6IDA7XG4gICAgbGVmdDogMDtcbiAgICBib3JkZXItc3R5bGU6IG5vbmUgIWltcG9ydGFudDtcbiAgfVxuICAmLm5nLXNlbGVjdC1vcGVuZWQgPiAubmctc2VsZWN0LWNvbnRhaW5lciAubmctYXJyb3cge1xuICAgIHRvcDogMHB4ICFpbXBvcnRhbnQ7XG4gIH1cbiAgLm5nLWNsZWFyLXdyYXBwZXIge1xuICAgIGhlaWdodDogMThweDtcbiAgfVxufVxuXG4vLyBkYXJrIGxheW91dCBzdHlsZVxuLmRhcmstbGF5b3V0IHtcbiAgLm5nLXNlbGVjdC1jb250YWluZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRuZy1zZWxlY3QtZGFyay1pbnB1dC1iZy1jb2xvcjtcbiAgICBib3JkZXItY29sb3I6ICRuZy1zZWxlY3QtZGFyay1ib3JkZXItY29sb3I7XG4gICAgY29sb3I6ICRuZy1zZWxlY3QtZGFyay1tdXRlZC1jb2xvcjtcbiAgICAubmctcGxhY2Vob2xkZXIge1xuICAgICAgY29sb3I6ICRuZy1zZWxlY3QtZGFyay1tdXRlZC1jb2xvciAhaW1wb3J0YW50O1xuICAgIH1cbiAgfVxuICAubmctc2VsZWN0IHtcbiAgICAmLm5nLXNlbGVjdC1tdWx0aXBsZSB7XG4gICAgICAubmctdmFsdWUge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKCRwcmltYXJ5LCAwLjEyKSAhaW1wb3J0YW50O1xuICAgICAgICBjb2xvcjogJHByaW1hcnkgIWltcG9ydGFudDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLm5nLWRyb3Bkb3duLWhlYWRlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJG5nLXNlbGVjdC1kYXJrLWJnLWNvbG9yO1xuICAgIGJvcmRlci1jb2xvcjogJG5nLXNlbGVjdC1kYXJrLWJvcmRlci1jb2xvcjtcbiAgfVxuICAubmctZHJvcGRvd24tZm9vdGVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkbmctc2VsZWN0LWRhcmstYmctY29sb3I7XG4gICAgYm9yZGVyLWNvbG9yOiAkbmctc2VsZWN0LWRhcmstYm9yZGVyLWNvbG9yO1xuICB9XG4gIC5uZy1zZWxlY3Qubmctc2VsZWN0LW9wZW5lZCA+IC5uZy1zZWxlY3QtY29udGFpbmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkbmctc2VsZWN0LWRhcmstYmctY29sb3I7XG4gIH1cbiAgLm5nLW9wdGlvbiB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJG5nLXNlbGVjdC1kcm9wZG93bi1iZy1jb2xvciAhaW1wb3J0YW50O1xuICAgIGNvbG9yOiAkbmctc2VsZWN0LWRhcmstY29sb3IgIWltcG9ydGFudDtcbiAgICAmLm5nLW9wdGlvbi1kaXNhYmxlZCB7XG4gICAgICBjb2xvcjogJG5nLXNlbGVjdC1kYXJrLW11dGVkLWNvbG9yICFpbXBvcnRhbnQ7XG4gICAgfVxuICB9XG4gIG5nLWRyb3Bkb3duLXBhbmVsIHtcbiAgICBib3JkZXItY29sb3I6ICRuZy1zZWxlY3QtZGFyay1ib3JkZXItY29sb3IgIWltcG9ydGFudDtcbiAgICAubmctZHJvcGRvd24tcGFuZWwtaXRlbXMge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJG5nLXNlbGVjdC1kYXJrLWJnLWNvbG9yICFpbXBvcnRhbnQ7XG4gICAgICAubmctb3B0Z3JvdXAge1xuICAgICAgICBjb2xvcjogJG5nLXNlbGVjdC1kYXJrLW11dGVkLWNvbG9yICFpbXBvcnRhbnQ7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCIvLyAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyAgRmlsZSBOYW1lOiB2YXJpYWJsZXMtZGFyay5zY3NzXG4vLyAgRGVzY3JpcHRpb246IEN1c3RvbSBkYXJrIHRoZW1lIHZhcmlhYmxlc1xuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vICBJdGVtIE5hbWU6IFZ1ZXh5IC0gVnVlanMsIFJlYWN0LCBBbmd1bGFyLCBIVE1MICYgTGFyYXZlbCBBZG1pbiBEYXNoYm9hcmQgVGVtcGxhdGVcbi8vICBBdXRob3I6IFBJWElOVkVOVFxuLy8gIEF1dGhvciBVUkw6IGh0dHA6Ly93d3cudGhlbWVmb3Jlc3QubmV0L3VzZXIvcGl4aW52ZW50XG4vLyAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8vICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vICBXQVJOSU5HOiBQTEVBU0UgRE8gTk9UIENIQU5HRSBUSElTIFZBUklBQkxFIEZJTEUuXG4vLyAgVEhJUyBGSUxFIFdJTEwgR0VUIE9WRVJXUklUVEVOIFdJVEggRUFDSCBWVUVYWSBIVE1MIFRFTVBMQVRFIFJFTEVBU0UuXG4vLyAgVElQOlxuLy8gIFdlIHN1Z2dlc3QgeW91IHRvIHVzZSB0aGlzIChhc3NldHMvc2Nzcy92YXJpYWJsZXMvX3ZhcmlhYmxlcy1jb21wb25lbnRzLnNjc3MpIGZpbGUgZm9yIG92ZXJyaWRpbmcgY29tcG9uZW50cyB2YXJpYWJsZXMuXG4vLyAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8vQm9keVxuJHRoZW1lLWRhcmstYm9keS1iZzogIzE2MWQzMSAhZGVmYXVsdDtcbiR0aGVtZS1kYXJrLWJvZHktY29sb3I6ICNiNGI3YmQgIWRlZmF1bHQ7XG4kdGhlbWUtZGFyay1ib3JkZXItY29sb3I6ICMzYjQyNTMgIWRlZmF1bHQ7XG4kdGhlbWUtZGFyay1jdXN0b20tY29udHJvbC1ib3JkZXItY29sb3I6ICM0NDQwNWUgIWRlZmF1bHQ7XG5cbi8vVHlwb2dyYXBoeVxuJHRoZW1lLWRhcmstaGVhZGluZ3MtY29sb3I6ICNkMGQyZDYgIWRlZmF1bHQ7XG4kdGhlbWUtZGFyay1sYWJlbC1jb2xvcjogI2QwZDJkNiAhZGVmYXVsdDtcbiR0aGVtZS1kYXJrLXRleHQtbXV0ZWQtY29sb3I6ICM2NzZkN2QgIWRlZmF1bHQ7XG5cbi8vQ2FyZFxuJHRoZW1lLWRhcmstY2FyZC1iZzogIzI4MzA0NiAhZGVmYXVsdDtcbiR0aGVtZS1kYXJrLWJveC1zaGFkb3c6IDAgNHB4IDI0cHggMCByZ2JhKCRibGFjaywgMC4yNCk7XG5cbi8vSW5wdXRcbiR0aGVtZS1kYXJrLWlucHV0LWJnOiAjMjgzMDQ2ICFkZWZhdWx0O1xuJHRoZW1lLWRhcmstaW5wdXQtcGxhY2Vob2xkZXItY29sb3I6ICM2NzZkN2QgIWRlZmF1bHQ7XG4kdGhlbWUtZGFyay1pbnB1dC1ib3JkZXItY29sb3I6ICM0MDQ2NTYgIWRlZmF1bHQ7XG4kdGhlbWUtZGFyay1pbnB1dC1kaXNhYmxlZC1iZzogIzI0MjMzYSAhZGVmYXVsdDtcbiR0aGVtZS1kYXJrLWlucHV0LWRpc2FibGVkLWJvcmRlci1jb2xvcjogIzQ0NGI2MCAhZGVmYXVsdDtcblxuLy8gU3dpdGNoXG4kdGhlbWUtZGFyay1zd2l0Y2gtYmc6ICM1NDVhNmE7XG4kdGhlbWUtZGFyay1zd2l0Y2gtYmctZGlzYWJsZWQ6ICMxYjIzMzc7XG5cbi8vVGFibGVcbiR0aGVtZS1kYXJrLXRhYmxlLWJnOiAjMjgzMDQ2ICFkZWZhdWx0O1xuJHRoZW1lLWRhcmstdGFibGUtaGVhZGVyLWJnOiAjMzQzZDU1ICFkZWZhdWx0O1xuJHRoZW1lLWRhcmstdGFibGUtcm93LWJnOiAjMjgzMDQ2ICFkZWZhdWx0O1xuJHRoZW1lLWRhcmstdGFibGUtaG92ZXItYmc6ICMyNDJiM2QgIWRlZmF1bHQ7XG4kdGhlbWUtZGFyay10YWJsZS1zdHJpcGVkLWJnOiAjMjQyYjNkICFkZWZhdWx0O1xuXG4kdGhlbWUtZGFyay1tb2RhbC1oZWFkZXItYmc6ICMxNjFkMzEgIWRlZmF1bHQ7XG4kdGhlbWUtZGFyay1wYWdpbmF0aW9uLWJnOiAjMjQyYjNkICFkZWZhdWx0O1xuJHRoZW1lLWRhcmstY2hhcnQtYmc6ICMzODQwNTYgIWRlZmF1bHQ7XG4kdGhlbWUtZGFyay13aWRnZXQtYmc6ICMzODQwNTYgIWRlZmF1bHQ7XG4iXX0= */"],
  encapsulation: 2
});

/***/ }),

/***/ 8255:
/*!*************************************************************************************************!*\
  !*** ./src/app/modules/customer-ledger/components/expenses-ledger/expenses-ledger.component.ts ***!
  \*************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExpensesFormComponent": function() { return /* binding */ ExpensesFormComponent; }
/* harmony export */ });
/* harmony import */ var F_project_development_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ 5960);
/* harmony import */ var F_project_development_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ 9367);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 8346);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var app_shared_sweetalert_sweetalert_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/shared/sweetalert/sweetalert.component */ 3579);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _service_expenses_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../service/expenses.service */ 918);
/* harmony import */ var app_layout_components_content_header_content_header_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/layout/components/content-header/content-header.component */ 4665);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 8267);
/* harmony import */ var _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/flex-layout/extended */ 3479);
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ng-select/ng-select */ 5025);
/* harmony import */ var _core_directives_core_ripple_effect_core_ripple_effect_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @core/directives/core-ripple-effect/core-ripple-effect.directive */ 3113);
/* harmony import */ var ng2_flatpickr__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ng2-flatpickr */ 9792);
/* harmony import */ var _core_directives_core_feather_icons_core_feather_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @core/directives/core-feather-icons/core-feather-icons */ 9850);















var _c0 = function _c0(a1) {
  return ["/ledger/expenses-ledger", a1];
};
function ExpensesFormComponent_tr_76_Template(rf, ctx) {
  if (rf & 1) {
    var _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](5, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](7, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](9, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](11, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](13, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](14, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](15, "button", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function ExpensesFormComponent_tr_76_Template_button_click_15_listener() {
      var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r5);
      var item_r2 = restoredCtx.$implicit;
      var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return ctx_r4.confirmDelete(item_r2.id);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](16, "span", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](17, "button", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](18, "span", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    var item_r2 = ctx.$implicit;
    var i_r3 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](i_r3 + 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](item_r2.toDate);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](item_r2.fromDate);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](item_r2.expensesType);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](item_r2.amount);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](item_r2.remarks);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("data-feather", "trash-2");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction1"](9, _c0, item_r2.id));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("data-feather", "edit");
  }
}
function ExpensesFormComponent_tr_77_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "td", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2, "No Result Found");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
}
var _c1 = function _c1() {
  return ["/ledger/expenses-ledger"];
};
var ExpensesFormComponent = /*#__PURE__*/function () {
  function ExpensesFormComponent(_sw, route, fb, _serviceData, _router) {
    (0,F_project_development_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, ExpensesFormComponent);
    this._sw = _sw;
    this.route = route;
    this.fb = fb;
    this._serviceData = _serviceData;
    this._router = _router;
    this.DateRangeOptions = {
      altInput: true,
      mode: "range"
    };
    this.tableDataArray = [];
    this.businessType = ["Needlework Stiching", "Needlework Fabric Wholesale"];
    this.expensesType = ["Karigar Salary", "Utility Expenses", "Conveyance Expenses", "Tea Expenses", "Meal Expenses", "Guest Meal Expenses", "Office Expenses", "Miscellaneous Expenses"];
    this.submitted = false;
    this.editable = false;
  }
  (0,F_project_development_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(ExpensesFormComponent, [{
    key: "onSubmit",
    value: function onSubmit(formData) {
      console.log(formData);
      this.submitted = true;
      if (this.expensesLedgerForm.invalid) {
        return;
      }
      if (this.editable) {
        this.updateFormDetail(formData);
      } else {
        this.insertFormDetail(formData);
      }
    }
  }, {
    key: "insertFormDetail",
    value: function insertFormDetail(formData) {
      var _this = this;
      this._serviceData.create(formData).subscribe(function (res) {
        _this._sw.fire("success", "Expenses Ledger", "Record Successfully Add..");
        _this.submitted = false;
        _this.expensesLedgerForm.reset();
        _this.getAllDetail();
      }, function (err) {
        _this._sw.fire("error", "Expenses Ledger", err.error.message);
      });
    }
  }, {
    key: "updateFormDetail",
    value: function updateFormDetail(formData) {
      var _this2 = this;
      this._serviceData.update(Object.assign({
        id: this.id
      }, formData)).subscribe(function (res) {
        _this2._sw.fire("success", "Expenses Ledger", "Record Successfully Update..");
        _this2.editable = false;
        _this2.submitted = false;
        _this2._router.navigate(["/ledger/expenses-ledger"]);
      }, function (err) {
        _this2._sw.fire("error", "Expenses Ledger", err.error.message);
      });
    }
  }, {
    key: "ngOnInit",
    value: function ngOnInit() {
      this.getAllDetail();
      this.id = +this.route.snapshot.paramMap.get("id");
      if (this.id > 0) {
        this.getDetailById();
      }
      this.makeReactiveForm();
      this.contentHeader = {
        headerTitle: "Expenses Ledger",
        actionButton: true,
        breadcrumb: {
          type: "",
          links: [{
            name: "Expenses",
            isLink: true,
            link: "/"
          }, {
            name: "Expenses Ledger",
            isLink: false
          }]
        }
      };
    }
  }, {
    key: "getDetailById",
    value: function getDetailById() {
      var _this3 = this;
      this._serviceData.getDetailById({
        id: this.id
      }).subscribe(function (res) {
        _this3.editable = true;
        _this3.expensesLedgerForm.patchValue({
          fromDate: res.data.fromDate,
          toDate: res.data.toDate,
          businessType: res.data.businessType,
          expensesType: res.data.expensesType,
          amount: res.data.amount,
          remarks: res.data.remarks
        });
      });
    }
  }, {
    key: "f",
    get: function get() {
      return this.expensesLedgerForm.controls;
    }
  }, {
    key: "makeReactiveForm",
    value: function makeReactiveForm() {
      this.expensesLedgerForm = this.fb.group({
        fromDate: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.required]],
        toDate: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.required]],
        businessType: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.required]],
        expensesType: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.required]],
        amount: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.required]],
        remarks: [""]
      });
    }
  }, {
    key: "getAllDetail",
    value: function getAllDetail() {
      var _this4 = this;
      this._serviceData.getAll().subscribe(function (res) {
        if (res.data) {
          _this4.tableDataArray = res.data;
        } else if (!res.data && _this4.tableDataArray.length == 1) {
          _this4.tableDataArray = [];
        }
      });
    }
  }, {
    key: "confirmDelete",
    value: function confirmDelete(id) {
      var _this5 = this;
      var deleteId = {
        id: id
      };
      this._sw.delete(function () {
        return _this5._serviceData.delete(deleteId).subscribe(function (res) {
          setTimeout(function () {
            return _this5.getAllDetail();
          }, 2000);
        }, function (err) {
          _this5._sw.fire("error", "Collection", "There is a problem");
        });
      });
    }
  }, {
    key: "filterDataByDateRange",
    value: function filterDataByDateRange(value) {
      if (value == "") {
        this.filterStartDate = null;
        this.filterEndDate = null;
      }
      var dateRange = value.split("to");
      if (dateRange[1]) {
        this.filterStartDate = new Date(dateRange[0]);
        this.filterEndDate = new Date(dateRange[1]);
      }
    }
  }, {
    key: "filterTableData",
    get: function get() {
      var _this6 = this;
      if (!this.filterStartDate) {
        return this.tableDataArray;
      }
      return this.tableDataArray.filter(function (item) {
        return new Date(item.toDate) >= _this6.filterStartDate && new Date(item.fromDate) <= _this6.filterEndDate;
      });
    }
  }]);
  return ExpensesFormComponent;
}();
ExpensesFormComponent.ɵfac = function ExpensesFormComponent_Factory(t) {
  return new (t || ExpensesFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](app_shared_sweetalert_sweetalert_component__WEBPACK_IMPORTED_MODULE_2__.SweetalertComponent), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_service_expenses_service__WEBPACK_IMPORTED_MODULE_3__.ExpensesLedgerService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router));
};
ExpensesFormComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
  type: ExpensesFormComponent,
  selectors: [["app-expenses-ledger"]],
  decls: 78,
  vars: 14,
  consts: [[1, "content-wrapper", "container-xxl", "p-0"], [1, "content-body"], [3, "contentHeader"], [1, "card"], [1, "card-header"], [1, "card-body"], [1, "form", "form-vertical", 3, "formGroup"], [1, "row"], [1, "col-12", "col-md-3"], [1, "form-group"], ["for", "from-date"], ["type", "date", "id", "from-date", "required", "", "formControlName", "fromDate", 1, "form-control", 3, "ngClass"], ["for", "to-date"], ["type", "date", "id", "to-date", "required", "", "formControlName", "toDate", 1, "form-control", 3, "ngClass"], ["for", "business-type"], ["formControlName", "businessType", "placeholder", "Business Type", "bindLabel", "name", "bindValue", "name", 3, "items", "searchable"], ["for", "expenses-type"], ["formControlName", "expensesType", "placeholder", "Expenses Type", "bindLabel", "name", "bindValue", "name", 3, "items", "searchable"], ["for", "amount"], ["type", "number", "id", "amount", "required", "", "formControlName", "amount", "placeholder", "Amount", 1, "form-control", 3, "ngClass"], [1, "col-12", "col-md-9"], ["for", "remarks"], ["type", "text", "id", "remarks", "formControlName", "remarks", "placeholder", "Remarks", 1, "form-control"], [1, "col-12"], [1, "float-right"], ["type", "submit", "rippleEffect", "", 1, "btn", "btn-primary", "mr-1", 3, "click"], ["type", "button", "rippleEffect", "", 1, "btn", "btn-outline-secondary", 3, "routerLink"], [1, "w-25", "float-right"], ["placeholder", "Filter By Date..", 3, "config", "change"], [1, "table-responsive"], [1, "table"], ["width", "5%"], ["width", "10%"], ["width", "15%"], ["width", "45%"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [1, "d-flex", "align-items-center"], ["type", "button", "rippleEffect", "", 1, "btn", "btn-icon", "btn-flat-danger", 3, "click"], [3, "data-feather"], ["type", "button", "rippleEffect", "", 1, "btn", "btn-icon", "btn-flat-primary", 3, "routerLink"], ["colspan", "5"]],
  template: function ExpensesFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](2, "app-content-header", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "section");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](5, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "h4");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](7, "Expenses Ledger");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](8, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](9, "form", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](10, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](11, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](12, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](13, "label", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](14, "From Date");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](15, "input", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](16, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](17, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](18, "label", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](19, "to Date");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](20, "input", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](21, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](22, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](23, "label", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](24, "Business Type");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](25, "ng-select", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](26, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](27, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](28, "label", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](29, "Expenses Type");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](30, "ng-select", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](31, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](32, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](33, "label", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](34, "Amount");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](35, "input", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](36, "div", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](37, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](38, "label", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](39, "Remarks");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](40, "input", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](41, "div", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](42, "div", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](43, "button", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function ExpensesFormComponent_Template_button_click_43_listener() {
        return ctx.onSubmit(ctx.expensesLedgerForm.value);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](44, " Save ");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](45, "button", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](46, " Cancel ");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](47, "div", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](48, "div", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](49, "ng2-flatpickr", 28);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("change", function ExpensesFormComponent_Template_ng2_flatpickr_change_49_listener($event) {
        return ctx.filterDataByDateRange($event.target.value);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](50, "div", 29);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](51, "table", 30);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](52, "colgroup");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](53, "col", 31);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](54, "col", 32);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](55, "col", 32);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](56, "col", 33);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](57, "col", 32);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](58, "col", 34);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](59, "col", 31);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](60, "thead");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](61, "tr");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](62, "th");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](63, "th");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](64, "To Date");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](65, "th");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](66, "From Date");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](67, "th");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](68, "Expenses Type");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](69, "th");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](70, "Amount");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](71, "th");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](72, "Remark");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](73, "th");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](74, "Actions");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](75, "tbody");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](76, ExpensesFormComponent_tr_76_Template, 19, 11, "tr", 35);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](77, ExpensesFormComponent_tr_77_Template, 3, 0, "tr", 36);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("contentHeader", ctx.contentHeader);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("formGroup", ctx.expensesLedgerForm);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngClass", ctx.submitted && ctx.f.fromDate.errors ? "is-invalid" : ctx.f.fromDate.errors ? " " : "is-valid");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngClass", ctx.submitted && ctx.f.toDate.errors ? "is-invalid" : ctx.f.toDate.errors ? " " : "is-valid");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("items", ctx.businessType)("searchable", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("items", ctx.expensesType)("searchable", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngClass", ctx.submitted && ctx.f.amount.errors ? "is-invalid" : ctx.f.amount.errors ? " " : "is-valid");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction0"](13, _c1));
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("config", ctx.DateRangeOptions);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](27);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", ctx.filterTableData);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.filterTableData.length == 0);
    }
  },
  directives: [app_layout_components_content_header_content_header_component__WEBPACK_IMPORTED_MODULE_4__.ContentHeaderComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControlName, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgClass, _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_11__.DefaultClassDirective, _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_12__.NgSelectComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NumberValueAccessor, _core_directives_core_ripple_effect_core_ripple_effect_directive__WEBPACK_IMPORTED_MODULE_5__.RippleEffectDirective, _angular_router__WEBPACK_IMPORTED_MODULE_9__.RouterLink, ng2_flatpickr__WEBPACK_IMPORTED_MODULE_13__.Ng2FlatpickrComponent, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, _core_directives_core_feather_icons_core_feather_icons__WEBPACK_IMPORTED_MODULE_6__.FeatherIconDirective],
  encapsulation: 2
});

/***/ }),

/***/ 8043:
/*!*******************************************************************!*\
  !*** ./src/app/modules/customer-ledger/customer-ledger.module.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CustomerLedgerModule": function() { return /* binding */ CustomerLedgerModule; }
/* harmony export */ });
/* harmony import */ var F_project_development_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ 9367);
/* harmony import */ var F_project_development_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ 5960);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 8267);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ 8346);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var app_layout_components_content_header_content_header_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/layout/components/content-header/content-header.module */ 9079);
/* harmony import */ var app_shared_shared_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/shared/shared.module */ 1382);
/* harmony import */ var _core_common_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @core/common.module */ 1705);
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ng-select/ng-select */ 5025);
/* harmony import */ var ngx_mask__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ngx-mask */ 7846);
/* harmony import */ var _components_customer_ledger_customer_ledger_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/customer-ledger/customer-ledger.component */ 9028);
/* harmony import */ var _components_expenses_ledger_expenses_ledger_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/expenses-ledger/expenses-ledger.component */ 8255);
/* harmony import */ var app_shared_sweetalert_sweetalert_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/shared/sweetalert/sweetalert.component */ 3579);
/* harmony import */ var ng2_flatpickr__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ng2-flatpickr */ 9792);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 4001);

















var routes = [{
  path: "customer-ledger",
  component: _components_customer_ledger_customer_ledger_component__WEBPACK_IMPORTED_MODULE_5__.CustomerLedgerComponent,
  data: {
    animation: "customer-ledger"
  }
}, {
  path: "expenses-ledger",
  component: _components_expenses_ledger_expenses_ledger_component__WEBPACK_IMPORTED_MODULE_6__.ExpensesFormComponent,
  data: {
    animation: "expenses-ledger"
  }
}, {
  path: "expenses-ledger/:id",
  component: _components_expenses_ledger_expenses_ledger_component__WEBPACK_IMPORTED_MODULE_6__.ExpensesFormComponent,
  data: {
    animation: "expenses-ledger-id"
  }
}];
var CustomerLedgerModule = /*#__PURE__*/(0,F_project_development_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_0__["default"])(function CustomerLedgerModule() {
  (0,F_project_development_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, CustomerLedgerModule);
});
CustomerLedgerModule.ɵfac = function CustomerLedgerModule_Factory(t) {
  return new (t || CustomerLedgerModule)();
};
CustomerLedgerModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({
  type: CustomerLedgerModule
});
CustomerLedgerModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({
  providers: [app_shared_sweetalert_sweetalert_component__WEBPACK_IMPORTED_MODULE_7__.SweetalertComponent],
  imports: [[ng2_flatpickr__WEBPACK_IMPORTED_MODULE_9__.Ng2FlatpickrModule, _angular_common__WEBPACK_IMPORTED_MODULE_10__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.FormsModule, _angular_router__WEBPACK_IMPORTED_MODULE_12__.RouterModule.forChild(routes), app_layout_components_content_header_content_header_module__WEBPACK_IMPORTED_MODULE_2__.ContentHeaderModule, app_shared_shared_module__WEBPACK_IMPORTED_MODULE_3__.SharedModule, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.ReactiveFormsModule, _core_common_module__WEBPACK_IMPORTED_MODULE_4__.CoreCommonModule, _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_13__.NgSelectModule, ngx_mask__WEBPACK_IMPORTED_MODULE_14__.NgxMaskModule.forRoot()]]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](CustomerLedgerModule, {
    declarations: [_components_customer_ledger_customer_ledger_component__WEBPACK_IMPORTED_MODULE_5__.CustomerLedgerComponent, _components_expenses_ledger_expenses_ledger_component__WEBPACK_IMPORTED_MODULE_6__.ExpensesFormComponent],
    imports: [ng2_flatpickr__WEBPACK_IMPORTED_MODULE_9__.Ng2FlatpickrModule, _angular_common__WEBPACK_IMPORTED_MODULE_10__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.FormsModule, _angular_router__WEBPACK_IMPORTED_MODULE_12__.RouterModule, app_layout_components_content_header_content_header_module__WEBPACK_IMPORTED_MODULE_2__.ContentHeaderModule, app_shared_shared_module__WEBPACK_IMPORTED_MODULE_3__.SharedModule, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.ReactiveFormsModule, _core_common_module__WEBPACK_IMPORTED_MODULE_4__.CoreCommonModule, _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_13__.NgSelectModule, ngx_mask__WEBPACK_IMPORTED_MODULE_14__.NgxMaskModule]
  });
})();

/***/ }),

/***/ 918:
/*!*********************************************************************!*\
  !*** ./src/app/modules/customer-ledger/service/expenses.service.ts ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExpensesLedgerService": function() { return /* binding */ ExpensesLedgerService; }
/* harmony export */ });
/* harmony import */ var F_project_development_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ 5960);
/* harmony import */ var F_project_development_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ 9367);
/* harmony import */ var environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! environments/environment */ 8260);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 5029);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ 6781);






var ExpensesLedgerService = /*#__PURE__*/function () {
  function ExpensesLedgerService(_http) {
    (0,F_project_development_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, ExpensesLedgerService);
    this._http = _http;
    this.baseUrl = environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.apiUrl;
    this.path = 'expenses-ledger';
  }
  (0,F_project_development_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(ExpensesLedgerService, [{
    key: "create",
    value: function create(addData) {
      return this._http.post("".concat(this.baseUrl, "/").concat(this.path, "/create"), addData).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(function (res) {
        return res;
      }));
    }
  }, {
    key: "getAll",
    value: function getAll() {
      return this._http.post("".concat(this.baseUrl, "/").concat(this.path, "/get-all"), {}).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(function (res) {
        return res;
      }));
    }
  }, {
    key: "getDetailById",
    value: function getDetailById(UserId) {
      return this._http.post("".concat(this.baseUrl, "/").concat(this.path, "/get-by-id"), UserId).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(function (res) {
        return res;
      }));
    }
  }, {
    key: "delete",
    value: function _delete(UserId) {
      return this._http.post("".concat(this.baseUrl, "/").concat(this.path, "/delete"), UserId).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(function (res) {
        return res;
      }));
    }
  }, {
    key: "update",
    value: function update(updateData) {
      return this._http.post("".concat(this.baseUrl, "/").concat(this.path, "/update"), updateData).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(function (res) {
        return res;
      }));
    }
  }]);
  return ExpensesLedgerService;
}();
ExpensesLedgerService.ɵfac = function ExpensesLedgerService_Factory(t) {
  return new (t || ExpensesLedgerService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClient));
};
ExpensesLedgerService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
  token: ExpensesLedgerService,
  factory: ExpensesLedgerService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 1794:
/*!********************************************************************!*\
  !*** ./node_modules/ng2-flatpickr/node_modules/tslib/tslib.es6.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__extends": function() { return /* binding */ __extends; },
/* harmony export */   "__assign": function() { return /* binding */ __assign; },
/* harmony export */   "__rest": function() { return /* binding */ __rest; },
/* harmony export */   "__decorate": function() { return /* binding */ __decorate; },
/* harmony export */   "__param": function() { return /* binding */ __param; },
/* harmony export */   "__metadata": function() { return /* binding */ __metadata; },
/* harmony export */   "__awaiter": function() { return /* binding */ __awaiter; },
/* harmony export */   "__generator": function() { return /* binding */ __generator; },
/* harmony export */   "__createBinding": function() { return /* binding */ __createBinding; },
/* harmony export */   "__exportStar": function() { return /* binding */ __exportStar; },
/* harmony export */   "__values": function() { return /* binding */ __values; },
/* harmony export */   "__read": function() { return /* binding */ __read; },
/* harmony export */   "__spread": function() { return /* binding */ __spread; },
/* harmony export */   "__spreadArrays": function() { return /* binding */ __spreadArrays; },
/* harmony export */   "__await": function() { return /* binding */ __await; },
/* harmony export */   "__asyncGenerator": function() { return /* binding */ __asyncGenerator; },
/* harmony export */   "__asyncDelegator": function() { return /* binding */ __asyncDelegator; },
/* harmony export */   "__asyncValues": function() { return /* binding */ __asyncValues; },
/* harmony export */   "__makeTemplateObject": function() { return /* binding */ __makeTemplateObject; },
/* harmony export */   "__importStar": function() { return /* binding */ __importStar; },
/* harmony export */   "__importDefault": function() { return /* binding */ __importDefault; },
/* harmony export */   "__classPrivateFieldGet": function() { return /* binding */ __classPrivateFieldGet; },
/* harmony export */   "__classPrivateFieldSet": function() { return /* binding */ __classPrivateFieldSet; }
/* harmony export */ });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}

function __exportStar(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ })

}]);
//# sourceMappingURL=src_app_modules_customer-ledger_customer-ledger_module_ts.js.map