"use strict";
(self["webpackChunkvuexy"] = self["webpackChunkvuexy"] || []).push([["default-src_app_modules_reports_services_report_service_ts-src_app_shared_reports_measurement-f6c1cb"],{

/***/ 5315:
/*!************************************************************!*\
  !*** ./src/app/modules/reports/services/report.service.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReportService": function() { return /* binding */ ReportService; }
/* harmony export */ });
/* harmony import */ var F_project_development_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ 5960);
/* harmony import */ var F_project_development_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ 9367);
/* harmony import */ var environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! environments/environment */ 8260);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 5029);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ 6781);






var ReportService = /*#__PURE__*/function () {
  function ReportService(_http) {
    (0,F_project_development_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, ReportService);
    this._http = _http;
    this.baseUrl = environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.apiUrl;
    this.path = "report";
  }
  (0,F_project_development_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(ReportService, [{
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

/***/ 7171:
/*!*******************************************************!*\
  !*** ./src/app/shared/reports/measurement.service.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "measurementInvoiceReport": function() { return /* binding */ measurementInvoiceReport; }
/* harmony export */ });
/* harmony import */ var F_project_development_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ 5960);
/* harmony import */ var F_project_development_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ 9367);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 1119);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 4001);




var measurementInvoiceReport = /*#__PURE__*/function () {
  function measurementInvoiceReport() {
    (0,F_project_development_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, measurementInvoiceReport);
    this.getPdfContent = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject("");
  }
  (0,F_project_development_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(measurementInvoiceReport, [{
    key: "generatePdfContent",
    value: function generatePdfContent(getDetail) {
      var totalQuantity = 0;
      var totalAmount = 0;
      var makePdf = "<div class=\"card invoice-preview-card\">\n    <div class=\"card-body invoice-padding pb-0\">\n      <div\n        class=\"d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0\"\n      >\n        <div>\n          <div class=\"logo-wrapper mb-0\">\n            <img src=\"../../../../assets/images/logo/logo.svg\" />\n          </div>\n          <p class=\"card-text mb-25\">\n            Plot No. 329/C Commercial Area Tariq Road,PECHS Block 2\n            Karachi\n          </p>\n          <p class=\"card-text mb-0\">+92 333 3346598</p>\n          <p class=\"card-text mb-0\">Info@needlework.pk</p>\n          <p class=\"card-text mb-0\">www.needlework.pk</p>\n        </div>\n        <div class=\"mt-md-0 mt-2\">\n          <h4 class=\"invoice-title mt-1\">\n            Order Number\n            <span class=\"invoice-number\">#NW-00".concat(getDetail.id, "</span>\n          </h4>\n          <div class=\"invoice-date-wrapper\">\n            <p class=\"invoice-date\">Order Date:</p>\n            <p class=\"invoice-date-title\">").concat(getDetail.order_date, "</p>\n          </div>\n          <div class=\"invoice-date-wrapper\">\n            <p class=\"invoice-date\">Delivery Date:</p>\n            <p class=\"invoice-date-title\">").concat(getDetail.actual_date, "</p>\n          </div>\n          <div class=\"invoice-date-wrapper\">\n            <p class=\"invoice-date\">Item Name:</p>\n            <p class=\"invoice-date-title\">").concat(getDetail.item_master, "</p>\n          </div>\n        </div>\n      </div>\n    </div>\n    <hr class=\"m-0\" />\n    <div class=\"card-body invoice-padding pt-0\">\n      <div class=\"row invoice-spacing\">\n        <div class=\"col-6 p-0\">\n          <table>\n            <tbody>\n              <tr>\n                <td class=\"pr-1\">Customer Name:</td>\n                <td>").concat(getDetail.customer_name, "</td>\n              </tr>\n              <tr>\n                <td class=\"pr-1\">Person Name:</td>\n                <td>").concat(getDetail.person_name, "</td>\n              </tr>\n              <tr>\n                <td class=\"pr-1\">Address:</td>\n                <td>").concat(getDetail.address, "</td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n        <div class=\"col-6 p-0\">\n          <div class=\"float-right\">\n            <table>\n              <tbody>\n                <tr>\n                  <td class=\"pr-1\">Mobile No:</td>\n                  <td>").concat(getDetail.customer_phone, "</td>\n                </tr>\n                <tr>\n                  <td class=\"pr-1\">City:</td>\n                  <td>").concat(getDetail.city, "</td>\n                </tr>\n                <tr>\n                  <td class=\"pr-1\">Email:</td>\n                  <td>").concat(getDetail.email, "</td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"card-body py-0 row\">\n      <div class=\"col-8 border-right\">\n        <h4 class=\"text-center mt-25\">TOP MEASUREMENTS</h4>\n      </div>\n      <div class=\"col-4\">\n        <h4 class=\"text-center mt-25\">TROUSER / PANTS / SHALWAR</h4>\n      </div>\n      <div class=\"col-8 p-0 border-right\">\n        <div class=\"table-responsive\">\n          <table class=\"table\">\n            <tr>\n              <th class=\"bg-light\">Length</th>\n              <td>").concat(getDetail.length, "</td>\n              <th class=\"bg-light\">Shoulder</th>\n              <td>").concat(getDetail.shoulder, "</td>\n            </tr>\n            <tr>\n              <th class=\"bg-light\">Sleeve</th>\n              <td>").concat(getDetail.sleeve, "</td>\n              <th class=\"bg-light\">Collar</th>\n              <td>").concat(getDetail.collar, "</td>\n            </tr>\n            <tr>\n              <th class=\"bg-light\">Collar Type</th>\n              <td>").concat(getDetail.collar_type, "</td>\n              <th class=\"bg-light\">Collar Type Size</th>\n              <td>").concat(getDetail.collar_type_size, "</td>\n            </tr>\n            <tr>\n              <th class=\"bg-light\">Chest</th>\n              <td>").concat(getDetail.chest, "</td>\n              <th class=\"bg-light\">Chest Loosing</th>\n              <td>").concat(getDetail.chest_loosing, "</td>\n            </tr>\n            <tr>\n              <th class=\"bg-light\">Middle</th>\n              <td>").concat(getDetail.middle, "</td>\n              <th class=\"bg-light\">Middle Loosing</th>\n              <td>").concat(getDetail.middle_loosing, "</td>\n            </tr>\n            <tr>\n              <th class=\"bg-light\">West</th>\n              <td>").concat(getDetail.west, "</td>\n              <th class=\"bg-light\">West Loosing</th>\n              <td>").concat(getDetail.west_loosing, "</td>\n            </tr>\n            <tr>\n              <th class=\"bg-light\">Hip</th>\n              <td>").concat(getDetail.hip, "</td>\n              <th class=\"bg-light\">Hip Loosing</th>\n              <td>").concat(getDetail.hip_loosing, "</td>\n            </tr>\n            <tr>\n              <th class=\"bg-light\">Cuff</th>\n              <td>").concat(getDetail.cuff_type, "</td>\n              <th class=\"bg-light\">Cuff Type Size</th>\n              <td>").concat(getDetail.cuff_type_size, "</td>\n            </tr>\n            <tr>\n              <th class=\"bg-light\">Placket Type</th>\n              <td>").concat(getDetail.placket_type, "</td>\n              <th class=\"bg-light\">Placket Type Size</th>\n              <td>").concat(getDetail.placket_type_size, "</td>\n            </tr>\n            <tr>\n              <th class=\"bg-light\">Daman</th>\n              <td>").concat(getDetail.daman, "</td>\n              <th class=\"bg-light\">Daman Loosing</th>\n              <td>").concat(getDetail.daman_loosing, "</td>\n            </tr>\n            <tr>\n              <th class=\"bg-light\">Daman Type</th>\n              <td>").concat(getDetail.daman_type, "</td>\n              <th class=\"bg-light\">Front Pocket</th>\n              <td>").concat(getDetail.front_pocket, "</td>\n            </tr>\n            <tr>\n              <th class=\"bg-light\">Side Pocket</th>\n              <td>").concat(getDetail.side_pocket, "</td>\n              <th class=\"bg-light\"></th>\n              <td></td>\n            </tr>\n          </table>\n        </div>\n      </div>\n      <div class=\"col-4 p-0\">\n        <table class=\"table\">\n          <tr>\n            <th class=\"bg-light\">Length</th>\n            <td>").concat(getDetail.right_length, "</td>\n          </tr>\n          <tr>\n            <th class=\"bg-light\">West</th>\n            <td>").concat(getDetail.right_west, "</td>\n          </tr>\n          <tr>\n            <th class=\"bg-light\">Hip</th>\n            <td>").concat(getDetail.right_hip, "</td>\n          </tr>\n          <tr>\n            <th class=\"bg-light\">Thai</th>\n            <td>").concat(getDetail.thai, "</td>\n          </tr>\n          <tr>\n            <th class=\"bg-light\">Knee</th>\n            <td>").concat(getDetail.knee, "</td>\n          </tr>\n          <tr>\n            <th class=\"bg-light\">Calf</th>\n            <td>").concat(getDetail.calf, "</td>\n          </tr>\n          <tr>\n            <th class=\"bg-light\">Bottom</th>\n            <td>").concat(getDetail.bottom, "</td>\n          </tr>\n          <tr>\n            <th class=\"bg-light\">Zip Type</th>\n            <td>").concat(getDetail.rightZip, "</td>\n          </tr>\n          <tr>\n            <th class=\"bg-light\">-</th>\n            <td></td>\n          </tr>\n          <tr>\n            <th class=\"bg-light\">-</th>\n            <td></td>\n          </tr>\n          <tr>\n            <th class=\"bg-light\">-</th>\n            <td></td>\n          </tr>\n          <tr>\n            <th class=\"bg-light\">-</th>\n            <td></td>\n          </tr>\n        </table>\n      </div>\n    </div>\n    <div class=\"card-body invoice-padding pt-0\">\n      <div class=\"row\">\n        <div class=\"col-12\" style=\"height: 100px\">\n          <span class=\"font-weight-bold\">Note: </span>\n          <span\n            >").concat(getDetail.note, "</span\n          >\n        </div>\n      </div>\n    </div>\n  </div>");
      this.getPdfContent.next(makePdf);
    }
  }, {
    key: "getData",
    value: function getData() {
      return this.getPdfContent.asObservable();
    }
  }]);
  return measurementInvoiceReport;
}();
measurementInvoiceReport.ɵfac = function measurementInvoiceReport_Factory(t) {
  return new (t || measurementInvoiceReport)();
};
measurementInvoiceReport.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
  token: measurementInvoiceReport,
  factory: measurementInvoiceReport.ɵfac,
  providedIn: "root"
});

/***/ }),

/***/ 9627:
/*!*****************************************************!*\
  !*** ./src/app/shared/reports/orderFrom.service.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "orderInvoiceReport": function() { return /* binding */ orderInvoiceReport; }
/* harmony export */ });
/* harmony import */ var F_project_development_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ 5960);
/* harmony import */ var F_project_development_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ 9367);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 1119);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 4001);




var orderInvoiceReport = /*#__PURE__*/function () {
  function orderInvoiceReport() {
    (0,F_project_development_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, orderInvoiceReport);
    this.getPdfContent = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject("");
  }
  (0,F_project_development_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(orderInvoiceReport, [{
    key: "numberToWords",
    value: function numberToWords(num) {
      var ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
      var teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
      var tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
      if (num === 0) return 'Zero';
      var words = '';
      if (num >= 1000) {
        words += this.numberToWords(Math.floor(num / 1000)) + ' Thousand ';
        num %= 1000;
      }
      if (num >= 100) {
        words += ones[Math.floor(num / 100)] + ' Hundred ';
        num %= 100;
      }
      if (num >= 20) {
        words += tens[Math.floor(num / 10)];
        num %= 10;
        if (num > 0) words += ' ';
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
  }, {
    key: "generatePdfContent",
    value: function generatePdfContent(getDetail) {
      var totalQuantity = 0;
      var totalAmount = 0;
      var makePdf = "<div class=\"card invoice-preview-card\">\n    <div class=\"card-body invoice-padding pb-0\">\n      <div\n        class=\"d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0\"\n      >\n        <div>\n          <div class=\"logo-wrapper mb-0\">\n            <img src=\"../../../../assets/images/logo/logo.svg\" />\n          </div>\n          <p class=\"card-text mb-25\">\n            Plot No. 329/C Commercial Area Tariq Road,PECHS Block 2\n            Karachi\n          </p>\n          <p class=\"card-text mb-0\">+92 333 3346598</p>\n          <p class=\"card-text mb-0\">Info@needlework.pk</p>\n          <p class=\"card-text mb-0\">www.needlework.pk</p>\n        </div>\n        <div class=\"mt-md-0 mt-2\">\n          <h4 class=\"invoice-title mt-1\">\n            Order Number\n            <span class=\"invoice-number\">#NW-00".concat(getDetail.id, "</span>\n          </h4>\n          <div class=\"invoice-date-wrapper\">\n            <p class=\"invoice-date\">Order Date:</p>\n            <p class=\"invoice-date-title\">").concat(getDetail.order_date, "</p>\n          </div>\n          <div class=\"invoice-date-wrapper\">\n            <p class=\"invoice-date\">Delivery Date:</p>\n            <p class=\"invoice-date-title\">").concat(getDetail.actual_date, "</p>\n          </div>\n          <div class=\"invoice-date-wrapper\">\n            <p class=\"invoice-date\">Item Name:</p>\n            <p class=\"invoice-date-title\">").concat(getDetail.item_master, "</p>\n          </div>\n        </div>\n      </div>\n    </div>\n    <hr class=\"m-0\" />\n    <div class=\"card-body invoice-padding pt-0\">\n      <div class=\"row invoice-spacing\">\n        <div class=\"col-6 p-0\">\n          <table>\n            <tbody>\n              <tr>\n                <td class=\"pr-1\">Customer Name:</td>\n                <td>").concat(getDetail.customer_name, "</td>\n              </tr>\n              <tr>\n                <td class=\"pr-1\">Person Name:</td>\n                <td>").concat(getDetail.person_name, "</td>\n              </tr>\n              <tr>\n                <td class=\"pr-1\">Address:</td>\n                <td>").concat(getDetail.address, "</td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n        <div class=\"col-6 p-0\">\n          <div class=\"float-right\">\n            <table>\n              <tbody>\n                <tr>\n                  <td class=\"pr-1\">Mobile No:</td>\n                  <td>").concat(getDetail.customer_phone, "</td>\n                </tr>\n                <tr>\n                  <td class=\"pr-1\">City:</td>\n                  <td>").concat(getDetail.city, "</td>\n                </tr>\n                <tr>\n                  <td class=\"pr-1\">Email:</td>\n                  <td>").concat(getDetail.email, "</td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"table-responsive\">\n      <table class=\"table\">\n        <colgroup>\n        <col width=\"10%\" />\n        <col width=\"20%\" />\n        <col width=\"10%\" />\n        <col width=\"10%\" />\n        <col width=\"20%\" />\n        <col width=\"30%\" />\n       </colgroup>\n        <thead>\n          <tr>\n            <th class=\"py-1\">Image</th>\n            <th class=\"py-1\">Stich Type</th>\n            <th class=\"py-1\">Qty</th>\n            <th class=\"py-1\">Price</th>\n            <th class=\"py-1\">Amount</th>\n            <th class=\"py-1\">Note</th>\n          </tr>\n        </thead>\n        <tbody>\n        ").concat(getDetail.details.map(function (element) {
        totalQuantity += element.quantity;
        totalAmount += element.amount;
        return "<tr class=\"border-bottom\">\n              <td class=\"py-0 px-25\"><img src=\"assets/images/order/".concat(element.imageName, "\" height=\"70px\" width=\"100px\"/></td>\n              <td class=\"py-1\">").concat(element.stich_type, "</td>\n              <td class=\"py-1\">").concat(element.quantity, "</td>\n              <td class=\"py-1\">").concat(element.price, "</td>\n              <td class=\"py-1\">").concat(element.amount, "</td>\n              <td class=\"py-1\">").concat(element.note, "</td>\n            </tr>");
      }), "\n          <tr class=\"border-bottom border-top bg-light\">\n            <td colspan=\"2\">\n              <span class=\"font-weight-bold\">Total</span>\n            </td>\n            <td colspan=\"2\"> <span class=\"font-weight-bold\">").concat(totalQuantity, "</span></td>\n            <td colspan=\"2\"> <span class=\"font-weight-bold\">").concat(totalAmount, "</span></td>\n          </tr>\n          <tr class=\"border-bottom border-top \">\n            <td colspan=\"2\">\n              <span class=\"font-weight-bold\">Amount in Words:</span>\n            </td>\n            <td colspan=\"4\"> <span class=\"font-weight-bold\">").concat(this.numberToWords(totalAmount), "</span></td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n    <div class=\"card-body invoice-padding pt-0\">\n      <div class=\"row\">\n        <div class=\"col-12\" style=\"height: 100px\">\n          <span class=\"font-weight-bold\">Note: </span>\n          <span\n            >").concat(getDetail.note, "</span\n          >\n        </div>\n      </div>\n    </div>\n  </div>");
      this.getPdfContent.next(makePdf);
    }
  }, {
    key: "getData",
    value: function getData() {
      return this.getPdfContent.asObservable();
    }
  }]);
  return orderInvoiceReport;
}();
orderInvoiceReport.ɵfac = function orderInvoiceReport_Factory(t) {
  return new (t || orderInvoiceReport)();
};
orderInvoiceReport.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
  token: orderInvoiceReport,
  factory: orderInvoiceReport.ɵfac,
  providedIn: "root"
});

/***/ })

}]);
//# sourceMappingURL=default-src_app_modules_reports_services_report_service_ts-src_app_shared_reports_measurement-f6c1cb.js.map