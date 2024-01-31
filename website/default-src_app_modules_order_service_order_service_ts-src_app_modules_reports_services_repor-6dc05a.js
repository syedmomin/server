"use strict";
(self["webpackChunkvuexy"] = self["webpackChunkvuexy"] || []).push([["default-src_app_modules_order_service_order_service_ts-src_app_modules_reports_services_repor-6dc05a"],{

/***/ 39172:
/*!********************************************************!*\
  !*** ./src/app/modules/order/service/order.service.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OrderService": function() { return /* binding */ OrderService; }
/* harmony export */ });
/* harmony import */ var E_tailor_angularApp_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ 65960);
/* harmony import */ var E_tailor_angularApp_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ 59367);
/* harmony import */ var environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! environments/environment */ 18260);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 85029);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 14001);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ 83981);






var OrderService = /*#__PURE__*/function () {
  function OrderService(_http) {
    (0,E_tailor_angularApp_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, OrderService);
    this._http = _http;
    this.baseUrl = environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.apiUrl;
    this.path = 'order';
  }
  (0,E_tailor_angularApp_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(OrderService, [{
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
  }, {
    key: "getByCustomer",
    value: function getByCustomer(customerData) {
      return this._http.post("".concat(this.baseUrl, "/").concat(this.path, "/get-by-customer"), customerData).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(function (res) {
        return res;
      }));
    }
  }, {
    key: "updateCustomerLedger",
    value: function updateCustomerLedger(customerLedger) {
      return this._http.post("".concat(this.baseUrl, "/").concat(this.path, "/updateCustomerLedger"), customerLedger).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(function (res) {
        return res;
      }));
    }
  }, {
    key: "getCustomerTotalBalance",
    value: function getCustomerTotalBalance(customerDetail) {
      return this._http.post("".concat(this.baseUrl, "/").concat(this.path, "/getCustomerTotalBalance"), customerDetail).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(function (res) {
        return res;
      }));
    }
  }, {
    key: "uploadMultipleImage",
    value: function uploadMultipleImage(orderImage) {
      return this._http.post("".concat(this.baseUrl, "/upload/multiImage"), orderImage).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(function (res) {
        return res;
      }));
    }
  }, {
    key: "getCustomerLastRecord",
    value: function getCustomerLastRecord(customerDetail) {
      return this._http.post("".concat(this.baseUrl, "/").concat(this.path, "/getCustomerLastRecord"), customerDetail).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(function (res) {
        return res;
      }));
    }
  }]);
  return OrderService;
}();
OrderService.ɵfac = function OrderService_Factory(t) {
  return new (t || OrderService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClient));
};
OrderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
  token: OrderService,
  factory: OrderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 15315:
/*!************************************************************!*\
  !*** ./src/app/modules/reports/services/report.service.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReportService": function() { return /* binding */ ReportService; }
/* harmony export */ });
/* harmony import */ var E_tailor_angularApp_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ 65960);
/* harmony import */ var E_tailor_angularApp_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ 59367);
/* harmony import */ var environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! environments/environment */ 18260);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 85029);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 14001);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ 83981);






var ReportService = /*#__PURE__*/function () {
  function ReportService(_http) {
    (0,E_tailor_angularApp_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, ReportService);
    this._http = _http;
    this.baseUrl = environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.apiUrl;
    this.path = "report";
  }
  (0,E_tailor_angularApp_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(ReportService, [{
    key: "customerInvoiceFabricReport",
    value: function customerInvoiceFabricReport(invoiceId) {
      return this._http.post("".concat(this.baseUrl, "/").concat(this.path, "/customerInvoice"), invoiceId).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(function (res) {
        return res;
      }));
    }
  }, {
    key: "goodsReceivingNoteReport",
    value: function goodsReceivingNoteReport(invoiceId) {
      return this._http.post("".concat(this.baseUrl, "/").concat(this.path, "/goodReceivingNote"), invoiceId).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(function (res) {
        return res;
      }));
    }
  }, {
    key: "orderInvoiceReport",
    value: function orderInvoiceReport(orderId) {
      return this._http.post("".concat(this.baseUrl, "/").concat(this.path, "/invoiceReport"), orderId).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(function (res) {
        return res;
      }));
    }
  }, {
    key: "customerLedgerReport",
    value: function customerLedgerReport(customerData) {
      return this._http.post("".concat(this.baseUrl, "/").concat(this.path, "/ledgerReport"), customerData).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(function (res) {
        return res;
      }));
    }
  }, {
    key: "expensesDetailReport",
    value: function expensesDetailReport(expenseDetail) {
      return this._http.post("".concat(this.baseUrl, "/").concat(this.path, "/expenseDetail"), expenseDetail).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(function (res) {
        return res;
      }));
    }
  }, {
    key: "expensesSummaryReport",
    value: function expensesSummaryReport(expenseSummary) {
      return this._http.post("".concat(this.baseUrl, "/").concat(this.path, "/expenseSummary"), expenseSummary).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(function (res) {
        return res;
      }));
    }
  }, {
    key: "orderSummaryReport",
    value: function orderSummaryReport(orderSummary) {
      return this._http.post("".concat(this.baseUrl, "/").concat(this.path, "/orderSummary"), orderSummary).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(function (res) {
        return res;
      }));
    }
  }, {
    key: "invoiceSummaryReport",
    value: function invoiceSummaryReport(orderSummary) {
      return this._http.post("".concat(this.baseUrl, "/").concat(this.path, "/invoiceSummary"), orderSummary).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(function (res) {
        return res;
      }));
    }
  }, {
    key: "inventoryActivityReport",
    value: function inventoryActivityReport(orderSummary) {
      return this._http.post("".concat(this.baseUrl, "/").concat(this.path, "/inventoryActivity"), orderSummary).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(function (res) {
        return res;
      }));
    }
  }, {
    key: "inventoryReport",
    value: function inventoryReport() {
      return this._http.post("".concat(this.baseUrl, "/").concat(this.path, "/inventoryReport"), {}).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(function (res) {
        return res;
      }));
    }
  }, {
    key: "karigarSummaryReport",
    value: function karigarSummaryReport(karigarSummary) {
      return this._http.post("".concat(this.baseUrl, "/").concat(this.path, "/karigarSummary"), karigarSummary).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(function (res) {
        return res;
      }));
    }
  }, {
    key: "karigarLedgerReport",
    value: function karigarLedgerReport(karigarLedger) {
      return this._http.post("".concat(this.baseUrl, "/").concat(this.path, "/karigarLedger"), karigarLedger).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(function (res) {
        return res;
      }));
    }
  }, {
    key: "wholeSalePurchaseReport",
    value: function wholeSalePurchaseReport(dateRange) {
      return this._http.post("".concat(this.baseUrl, "/").concat(this.path, "/wholeSalePurchase"), dateRange).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(function (res) {
        return res;
      }));
    }
  }, {
    key: "wholeSaleSaleReport",
    value: function wholeSaleSaleReport(dateRange) {
      return this._http.post("".concat(this.baseUrl, "/").concat(this.path, "/wholeSaleSale"), dateRange).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(function (res) {
        return res;
      }));
    }
  }, {
    key: "stichCustomerOrderReport",
    value: function stichCustomerOrderReport(dateRange) {
      return this._http.post("".concat(this.baseUrl, "/").concat(this.path, "/stichCustomerOrder"), dateRange).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(function (res) {
        return res;
      }));
    }
  }]);
  return ReportService;
}();
ReportService.ɵfac = function ReportService_Factory(t) {
  return new (t || ReportService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClient));
};
ReportService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
  token: ReportService,
  factory: ReportService.ɵfac,
  providedIn: "root"
});

/***/ }),

/***/ 16594:
/*!***************************************!*\
  !*** ./src/app/shared/date-format.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dateFormatter": function() { return /* binding */ dateFormatter; },
/* harmony export */   "thousandSeparator": function() { return /* binding */ thousandSeparator; },
/* harmony export */   "handleNullUndefinedValues": function() { return /* binding */ handleNullUndefinedValues; }
/* harmony export */ });
function dateFormatter(date) {
  // Create a new Date object from the provided date string
  var formattedDate = new Date(date);
  var day = formattedDate.getDate().toString().padStart(2, "0");
  var month = (formattedDate.getMonth() + 1).toString().padStart(2, "0"); // Note: Month is zero-based
  var year = formattedDate.getFullYear();
  // Return the formatted date
  return "".concat(day, "-").concat(month, "-").concat(year);
}
function thousandSeparator(number) {
  // Convert the number to a string
  var numberString = number.toString();
  // Add thousand separators
  var regex = /\B(?=(\d{3})+(?!\d))/g;
  numberString = numberString.replace(regex, ",");
  return numberString;
}
function handleNullUndefinedValues(obj) {
  // If the input is an object
  if (typeof obj === "object" && obj !== null) {
    // If the input is an array
    if (Array.isArray(obj)) {
      // Iterate over array elements
      return obj.map(function (element) {
        return handleNullUndefinedValues(element);
      });
    } else {
      // Iterate over object keys
      for (var key in obj) {
        // Check if the value is null or undefined
        if (obj[key] === null || obj[key] === undefined) {
          // Replace null or undefined with empty string
          obj[key] = "";
        } else if (typeof obj[key] === "object") {
          // Recursively handle nested objects or arrays
          obj[key] = handleNullUndefinedValues(obj[key]);
        }
      }
      return obj;
    }
  } else {
    return obj;
  }
}

/***/ }),

/***/ 37637:
/*!*******************************************!*\
  !*** ./src/app/shared/number-to-words.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "numberToWords": function() { return /* binding */ numberToWords; }
/* harmony export */ });
function numberToWords(num) {
  var ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  var teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  var tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  if (num === 0) return "Zero";
  var words = "";
  if (num >= 1000) {
    words += numberToWords(Math.floor(num / 1000)) + " Thousand ";
    num %= 1000;
  }
  if (num >= 100) {
    words += ones[Math.floor(num / 100)] + " Hundred ";
    num %= 100;
  }
  if (num >= 20) {
    words += tens[Math.floor(num / 10)];
    num %= 10;
    if (num > 0) words += " ";
  }
  if (num >= 10) {
    words += teens[num - 10];
    num = 0;
  }
  if (num > 0) {
    words += ones[num];
  }
  return words.trim();
}

/***/ }),

/***/ 33231:
/*!************************************************************!*\
  !*** ./src/app/shared/reports/reportViewInHtml.service.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "reportViewInHtmlReport": function() { return /* binding */ reportViewInHtmlReport; }
/* harmony export */ });
/* harmony import */ var E_tailor_angularApp_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ 65960);
/* harmony import */ var E_tailor_angularApp_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ 59367);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 41119);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 14001);




var reportViewInHtmlReport = /*#__PURE__*/function () {
  function reportViewInHtmlReport() {
    (0,E_tailor_angularApp_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, reportViewInHtmlReport);
    this.getPdfContent = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject("");
  }
  (0,E_tailor_angularApp_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(reportViewInHtmlReport, [{
    key: "getData",
    value: function getData() {
      return this.getPdfContent.asObservable();
    }
  }]);
  return reportViewInHtmlReport;
}();
reportViewInHtmlReport.ɵfac = function reportViewInHtmlReport_Factory(t) {
  return new (t || reportViewInHtmlReport)();
};
reportViewInHtmlReport.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
  token: reportViewInHtmlReport,
  factory: reportViewInHtmlReport.ɵfac,
  providedIn: "root"
});

/***/ })

}]);
//# sourceMappingURL=default-src_app_modules_order_service_order_service_ts-src_app_modules_reports_services_repor-6dc05a.js.map