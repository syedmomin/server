"use strict";
(self["webpackChunkvuexy"] = self["webpackChunkvuexy"] || []).push([["common"],{

/***/ 17803:
/*!**************************************************************!*\
  !*** ./src/app/modules/design/service/collarType.service.ts ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CollarTypeService": function() { return /* binding */ CollarTypeService; }
/* harmony export */ });
/* harmony import */ var E_tailor_angularApp_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ 65960);
/* harmony import */ var E_tailor_angularApp_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ 59367);
/* harmony import */ var environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! environments/environment */ 18260);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 85029);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 14001);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ 83981);






var CollarTypeService = /*#__PURE__*/function () {
  function CollarTypeService(_http) {
    (0,E_tailor_angularApp_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, CollarTypeService);
    this._http = _http;
    this.baseUrl = environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.apiUrl;
    this.path = 'collar-type';
  }
  (0,E_tailor_angularApp_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(CollarTypeService, [{
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
  return CollarTypeService;
}();
CollarTypeService.ɵfac = function CollarTypeService_Factory(t) {
  return new (t || CollarTypeService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClient));
};
CollarTypeService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
  token: CollarTypeService,
  factory: CollarTypeService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 3512:
/*!*************************************************************!*\
  !*** ./src/app/modules/design/service/colorType.service.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ColorTypeService": function() { return /* binding */ ColorTypeService; }
/* harmony export */ });
/* harmony import */ var E_tailor_angularApp_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ 65960);
/* harmony import */ var E_tailor_angularApp_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ 59367);
/* harmony import */ var environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! environments/environment */ 18260);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 85029);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 14001);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ 83981);






var ColorTypeService = /*#__PURE__*/function () {
  function ColorTypeService(_http) {
    (0,E_tailor_angularApp_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, ColorTypeService);
    this._http = _http;
    this.baseUrl = environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.apiUrl;
    this.path = 'color-type';
  }
  (0,E_tailor_angularApp_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(ColorTypeService, [{
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
  return ColorTypeService;
}();
ColorTypeService.ɵfac = function ColorTypeService_Factory(t) {
  return new (t || ColorTypeService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClient));
};
ColorTypeService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
  token: ColorTypeService,
  factory: ColorTypeService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 71111:
/*!************************************************************!*\
  !*** ./src/app/modules/design/service/cuffType.service.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CuffTypeService": function() { return /* binding */ CuffTypeService; }
/* harmony export */ });
/* harmony import */ var E_tailor_angularApp_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ 65960);
/* harmony import */ var E_tailor_angularApp_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ 59367);
/* harmony import */ var environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! environments/environment */ 18260);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 85029);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 14001);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ 83981);






var CuffTypeService = /*#__PURE__*/function () {
  function CuffTypeService(_http) {
    (0,E_tailor_angularApp_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, CuffTypeService);
    this._http = _http;
    this.baseUrl = environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.apiUrl;
    this.path = 'cuff-type';
  }
  (0,E_tailor_angularApp_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(CuffTypeService, [{
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
  return CuffTypeService;
}();
CuffTypeService.ɵfac = function CuffTypeService_Factory(t) {
  return new (t || CuffTypeService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClient));
};
CuffTypeService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
  token: CuffTypeService,
  factory: CuffTypeService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 38198:
/*!***************************************************************!*\
  !*** ./src/app/modules/design/service/placketType.service.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlacketTypeService": function() { return /* binding */ PlacketTypeService; }
/* harmony export */ });
/* harmony import */ var E_tailor_angularApp_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ 65960);
/* harmony import */ var E_tailor_angularApp_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ 59367);
/* harmony import */ var environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! environments/environment */ 18260);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 85029);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 14001);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ 83981);






var PlacketTypeService = /*#__PURE__*/function () {
  function PlacketTypeService(_http) {
    (0,E_tailor_angularApp_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, PlacketTypeService);
    this._http = _http;
    this.baseUrl = environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.apiUrl;
    this.path = 'placket-type';
  }
  (0,E_tailor_angularApp_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(PlacketTypeService, [{
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
  return PlacketTypeService;
}();
PlacketTypeService.ɵfac = function PlacketTypeService_Factory(t) {
  return new (t || PlacketTypeService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClient));
};
PlacketTypeService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
  token: PlacketTypeService,
  factory: PlacketTypeService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 61437:
/*!*************************************************************!*\
  !*** ./src/app/modules/design/service/stichType.service.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StichTypeService": function() { return /* binding */ StichTypeService; }
/* harmony export */ });
/* harmony import */ var E_tailor_angularApp_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ 65960);
/* harmony import */ var E_tailor_angularApp_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ 59367);
/* harmony import */ var environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! environments/environment */ 18260);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 85029);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 14001);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ 83981);






var StichTypeService = /*#__PURE__*/function () {
  function StichTypeService(_http) {
    (0,E_tailor_angularApp_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, StichTypeService);
    this._http = _http;
    this.baseUrl = environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.apiUrl;
    this.path = 'stich-type';
  }
  (0,E_tailor_angularApp_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(StichTypeService, [{
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
  return StichTypeService;
}();
StichTypeService.ɵfac = function StichTypeService_Factory(t) {
  return new (t || StichTypeService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClient));
};
StichTypeService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
  token: StichTypeService,
  factory: StichTypeService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 35636:
/*!************************************************************!*\
  !*** ./src/app/modules/karigar/service/karigar.service.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KarigarService": function() { return /* binding */ KarigarService; }
/* harmony export */ });
/* harmony import */ var E_tailor_angularApp_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ 65960);
/* harmony import */ var E_tailor_angularApp_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ 59367);
/* harmony import */ var environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! environments/environment */ 18260);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 85029);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 14001);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ 83981);






var KarigarService = /*#__PURE__*/function () {
  function KarigarService(_http) {
    (0,E_tailor_angularApp_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, KarigarService);
    this._http = _http;
    this.baseUrl = environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.apiUrl;
    this.path = 'karigar';
  }
  (0,E_tailor_angularApp_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(KarigarService, [{
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
    key: "uploadImage",
    value: function uploadImage(imageDetails) {
      return this._http.post("".concat(environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.apiUrl, "/upload/save-image"), imageDetails).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(function (res) {
        return res;
      }));
    }
  }]);
  return KarigarService;
}();
KarigarService.ɵfac = function KarigarService_Factory(t) {
  return new (t || KarigarService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClient));
};
KarigarService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
  token: KarigarService,
  factory: KarigarService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 90934:
/*!****************************************************************!*\
  !*** ./src/app/modules/wholesale/service/wholeSale.service.ts ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WholeSaleService": function() { return /* binding */ WholeSaleService; }
/* harmony export */ });
/* harmony import */ var E_tailor_angularApp_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ 65960);
/* harmony import */ var E_tailor_angularApp_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ 59367);
/* harmony import */ var environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! environments/environment */ 18260);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 85029);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 14001);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ 83981);






var WholeSaleService = /*#__PURE__*/function () {
  function WholeSaleService(_http) {
    (0,E_tailor_angularApp_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, WholeSaleService);
    this._http = _http;
    this.baseUrl = environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.apiUrl;
    this.path = "wholeSale";
  }
  (0,E_tailor_angularApp_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(WholeSaleService, [{
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
    key: "getByCustomerLedger",
    value: function getByCustomerLedger(customerDetail) {
      return this._http.post("".concat(this.baseUrl, "/").concat(this.path, "/getWholeSaleLedger"), customerDetail).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(function (res) {
        return res;
      }));
    }
  }, {
    key: "updateCustomerWholeSaleLedger",
    value: function updateCustomerWholeSaleLedger(wholeSaleLedger) {
      return this._http.post("".concat(this.baseUrl, "/").concat(this.path, "/updateWholeSaleLedger"), wholeSaleLedger).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(function (res) {
        return res;
      }));
    }
  }]);
  return WholeSaleService;
}();
WholeSaleService.ɵfac = function WholeSaleService_Factory(t) {
  return new (t || WholeSaleService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClient));
};
WholeSaleService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
  token: WholeSaleService,
  factory: WholeSaleService.ɵfac,
  providedIn: "root"
});

/***/ })

}]);
//# sourceMappingURL=common.js.map