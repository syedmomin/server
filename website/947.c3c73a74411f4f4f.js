"use strict";(self.webpackChunkvuexy=self.webpackChunkvuexy||[]).push([[947],{9947:function(M,v,o){o.r(v),o.d(v,{ItemMasterModule:function(){return Q}});var g=o(7289),f=o(5134),d=o(6019),t=o(6154),Z=o(3579),T=o(3273),A=o(1781),p=o(3113),u=o(8922),c=o(9850),i=o(9133),m=o(4104),q=function(s){return["/item-master/form",s]};function I(n,s){if(1&n){var r=t.EpF();t.TgZ(0,"tr"),t.TgZ(1,"td"),t._uU(2),t.qZA(),t.TgZ(3,"td"),t._uU(4),t.qZA(),t.TgZ(5,"td"),t._uU(6),t.qZA(),t.TgZ(7,"td"),t.TgZ(8,"span",16),t._uU(9),t.qZA(),t.qZA(),t.TgZ(10,"td"),t.TgZ(11,"div",17),t.TgZ(12,"button",18),t.NdJ("click",function(){var b=t.CHM(r).$implicit;return t.oxw().confirmDelete(b.id)}),t._UZ(13,"span",6),t.qZA(),t.TgZ(14,"button",19),t._UZ(15,"span",6),t.qZA(),t.qZA(),t.qZA(),t.qZA()}if(2&n){var e=s.$implicit,a=s.index;t.xp6(2),t.Oqu(a+1),t.xp6(2),t.Oqu(e.shortName),t.xp6(2),t.Oqu(e.name),t.xp6(2),t.Q6J("ngClass",0==e.status?" badge-light-warning":" badge-light-success"),t.xp6(1),t.Oqu(0==e.status?" deactivate":" active"),t.xp6(4),t.Q6J("data-feather","trash-2"),t.xp6(1),t.Q6J("routerLink",t.VKq(8,q,e.id)),t.xp6(1),t.Q6J("data-feather","edit")}}function C(n,s){1&n&&(t.TgZ(0,"tr"),t.TgZ(1,"td",20),t._uU(2,"No Result Found"),t.qZA(),t.qZA())}var U=function(){return["/item-master/form"]},_=function(){var n=function(){function s(r,e){(0,f.Z)(this,s),this._sw=r,this._serviceData=e,this.tableDataArray=[],this.searchTerm=""}return(0,g.Z)(s,[{key:"ngOnInit",value:function(){this.getAllDetail(),this.contentHeader={headerTitle:"Design",actionButton:!0,breadcrumb:{type:"",links:[{name:"Item Master",isLink:!0,link:"/"},{name:"List",isLink:!1}]}}}},{key:"getAllDetail",value:function(){var e=this;this._serviceData.getAll().subscribe(function(a){a.data?e.tableDataArray=a.data:!a.data&&1==e.tableDataArray.length&&(e.tableDataArray=[])})}},{key:"confirmDelete",value:function(e){var a=this,l={id:e};this._sw.delete(function(){return a._serviceData.delete(l).subscribe(function(h){setTimeout(function(){return a.getAllDetail()},2e3)},function(h){a._sw.fire("error","Collection","There is a problem")})})}},{key:"filterTableData",get:function(){if(!this.searchTerm)return this.tableDataArray;var e=this.searchTerm.toLowerCase();return this.tableDataArray.filter(function(a){return a.shortName.toLowerCase().includes(e)||a.name.toLowerCase().includes(e)})}}]),s}();return n.\u0275fac=function(r){return new(r||n)(t.Y36(Z.i),t.Y36(T.c))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-list-item-master"]],decls:34,vars:9,consts:[[1,"content-wrapper","container-xxl","p-0"],[1,"content-body"],[3,"contentHeader"],[1,"card"],[1,"card-header"],["type","button","rippleEffect","",1,"btn","btn-primary",3,"routerLink"],[3,"data-feather"],[1,"input-group","input-group-merge","shadow","w-25","float-right"],[1,"input-group-prepend"],["id","basic-addon-search1",1,"input-group-text"],["data-feather","search"],["type","text","placeholder","Search...","aria-label","Search...","aria-describedby","basic-addon-search1",1,"form-control",3,"ngModel","ngModelChange"],[1,"table-responsive"],[1,"table","table-striped"],[4,"ngFor","ngForOf"],[4,"ngIf"],[1,"badge","badge-pill","mr-1",3,"ngClass"],[1,"d-flex","align-items-center"],["type","button","rippleEffect","",1,"btn","btn-icon","btn-flat-danger",3,"click"],["type","button","rippleEffect","",1,"btn","btn-icon","btn-flat-primary",3,"routerLink"],["colspan","5"]],template:function(r,e){1&r&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t._UZ(2,"app-content-header",2),t.TgZ(3,"section"),t.TgZ(4,"div",3),t.TgZ(5,"div",4),t._uU(6," . "),t.TgZ(7,"div"),t.TgZ(8,"button",5),t._UZ(9,"span",6),t._uU(10,"Add Item Master "),t.qZA(),t.qZA(),t.qZA(),t.TgZ(11,"div"),t.TgZ(12,"div",7),t.TgZ(13,"div",8),t.TgZ(14,"span",9),t._UZ(15,"i",10),t.qZA(),t.qZA(),t.TgZ(16,"input",11),t.NdJ("ngModelChange",function(l){return e.searchTerm=l}),t.qZA(),t.qZA(),t.qZA(),t.TgZ(17,"div",12),t.TgZ(18,"table",13),t.TgZ(19,"thead"),t.TgZ(20,"tr"),t.TgZ(21,"th"),t._uU(22,"S No"),t.qZA(),t.TgZ(23,"th"),t._uU(24,"Item Master Short Name"),t.qZA(),t.TgZ(25,"th"),t._uU(26,"Item Master Name"),t.qZA(),t.TgZ(27,"th"),t._uU(28,"Status"),t.qZA(),t.TgZ(29,"th"),t._uU(30,"Actions"),t.qZA(),t.qZA(),t.qZA(),t.TgZ(31,"tbody"),t.YNc(32,I,16,10,"tr",14),t.YNc(33,C,3,0,"tr",15),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA()),2&r&&(t.xp6(2),t.Q6J("contentHeader",e.contentHeader),t.xp6(6),t.Q6J("routerLink",t.DdM(8,U)),t.xp6(1),t.Tol("mr-25"),t.Q6J("data-feather","plus-circle"),t.xp6(7),t.Q6J("ngModel",e.searchTerm),t.xp6(16),t.Q6J("ngForOf",e.filterTableData),t.xp6(1),t.Q6J("ngIf",0==e.filterTableData.length))},directives:[A.e,p.R,u.rH,c.R,i.Fj,i.JJ,i.On,d.sg,d.O5,d.mk,m.oO],styles:[""]}),n}(),D=o(7970);function N(n,s){if(1&n&&(t.TgZ(0,"option"),t._uU(1),t.qZA()),2&n){var r=s.$implicit;t.xp6(1),t.hij(" ",r.name," ")}}function O(n,s){if(1&n&&(t.TgZ(0,"div",8),t.TgZ(1,"div",9),t.TgZ(2,"label",34),t._uU(3,"Status"),t.qZA(),t.TgZ(4,"select",35),t.TgZ(5,"option",36),t._uU(6,"Active"),t.qZA(),t.TgZ(7,"option",37),t._uU(8,"Deactivate"),t.qZA(),t.qZA(),t.qZA(),t.qZA()),2&n){var r=t.oxw();t.xp6(4),t.Q6J("ngClass",r.submitted&&r.f.status.errors?"is-invalid":r.f.status.errors?" ":"is-valid")}}var F=function(){return["/item-master"]},y=function(){var n=function(){function s(r,e,a,l,h,b){(0,f.Z)(this,s),this._sw=r,this.route=e,this.fb=a,this._serviceData=l,this._colorService=h,this._router=b,this.submitted=!1,this.editable=!1}return(0,g.Z)(s,[{key:"getAllColors",value:function(){var e=this;this._colorService.getAll().subscribe(function(a){a.data&&(e.getColors=a.data)})}},{key:"onSubmit",value:function(e){this.submitted=!0,!this.ItemMasterForm.invalid&&(this.editable?this.updateFormDetail(e):this.insertFormDetail(e))}},{key:"insertFormDetail",value:function(e){var a=this;this._serviceData.create(e).subscribe(function(l){a._sw.fire("success","Item Master","Record Successfully Add.."),a.submitted=!1,a.ItemMasterForm.reset()},function(l){a._sw.fire("error","Item Master",l.error.message)})}},{key:"updateFormDetail",value:function(e){var a=this;this._serviceData.update(Object.assign({id:this.id},e)).subscribe(function(l){a._sw.fire("success","Item Master","Record Successfully Update.."),a.editable=!1,a.submitted=!1,a._router.navigate(["/item-master"])},function(l){a._sw.fire("error","Item Master",l.error.message)})}},{key:"ngOnInit",value:function(){this.id=+this.route.snapshot.paramMap.get("id"),this.id>0&&this.getDetailById(),this.makeReactiveForm(),this.getAllColors(),this.contentHeader={headerTitle:"Design",actionButton:!0,breadcrumb:{type:"",links:[{name:"Item Master",isLink:!0,link:"/"},{name:"Form",isLink:!1}]}}}},{key:"f",get:function(){return this.ItemMasterForm.controls}},{key:"getDetailById",value:function(){var e=this;this._serviceData.getDetailById({id:this.id}).subscribe(function(a){e.editable=!0,e.ItemMasterForm.patchValue({shortName:a.data.shortName,name:a.data.name,itemType:a.data.itemType,UOM:a.data.UOM,article:a.data.article,color:a.data.color,closingQuantity:a.data.closingQuantity,status:a.data.status})})}},{key:"makeReactiveForm",value:function(){this.ItemMasterForm=this.fb.group({name:["",[i.kI.required]],shortName:[null],itemType:["Stich",[i.kI.required]],UOM:["No"],article:[null],color:[null],closingQuantity:[null],status:[null]})}}]),s}();return n.\u0275fac=function(r){return new(r||n)(t.Y36(Z.i),t.Y36(u.gz),t.Y36(i.qu),t.Y36(T.c),t.Y36(D._),t.Y36(u.F0))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-detail-item-master"]],decls:70,vars:9,consts:[[1,"content-wrapper","container-xxl","p-0"],[1,"content-body"],[3,"contentHeader"],[1,"card"],[1,"card-header"],[1,"card-body"],[1,"form","form-vertical",3,"formGroup"],[1,"row"],[1,"col-12","col-md-4"],[1,"form-group"],["for","name"],["type","text","id","name","formControlName","name","placeholder","Item Name","required","",1,"form-control",3,"ngClass"],["for","shortName"],["type","text","id","shortName","formControlName","shortName","placeholder","Item Short Name",1,"form-control"],["formControlName","itemType","required","",1,"form-control",3,"ngClass"],["hidden","","value","-1"],["value","Stich"],["value","Unstich"],["formControlName","UOM","required","",1,"form-control",3,"ngClass"],["hidden",""],["value","No"],["value","MTR"],["value","KG"],["for","article"],["type","text","id","article","formControlName","article","placeholder","Article",1,"form-control"],["formControlName","color",1,"form-control"],[4,"ngFor","ngForOf"],["for","closing-Quantity"],["type","text","readonly","","id","closing-Quantity","formControlName","closingQuantity","placeholder","Closing Quantity",1,"form-control"],["class","col-12 col-md-4",4,"ngIf"],[1,"col-12"],[1,"float-right"],["type","submit","rippleEffect","",1,"btn","btn-primary","mr-1",3,"click"],["type","button","rippleEffect","",1,"btn","btn-outline-secondary",3,"routerLink"],["for","status"],["formControlName","status","id","status",1,"form-control","mb-1",3,"ngClass"],["value","1"],["value","0"]],template:function(r,e){1&r&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t._UZ(2,"app-content-header",2),t.TgZ(3,"section"),t.TgZ(4,"div",3),t.TgZ(5,"div",4),t.TgZ(6,"h4"),t._uU(7,"Item Master Detail"),t.qZA(),t.qZA(),t.TgZ(8,"div",5),t.TgZ(9,"form",6),t.TgZ(10,"div",7),t.TgZ(11,"div",8),t.TgZ(12,"div",9),t.TgZ(13,"label",10),t._uU(14,"Item Name"),t.qZA(),t._UZ(15,"input",11),t.qZA(),t.qZA(),t.TgZ(16,"div",8),t.TgZ(17,"div",9),t.TgZ(18,"label",12),t._uU(19,"Item Short Name"),t.qZA(),t._UZ(20,"input",13),t.qZA(),t.qZA(),t.TgZ(21,"div",8),t.TgZ(22,"div",9),t.TgZ(23,"label"),t._uU(24,"Item Type"),t.qZA(),t.TgZ(25,"select",14),t.TgZ(26,"option",15),t._uU(27,"Item Type"),t.qZA(),t.TgZ(28,"option",16),t._uU(29,"Stich"),t.qZA(),t.TgZ(30,"option",17),t._uU(31,"Unstich"),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.TgZ(32,"div",8),t.TgZ(33,"div",9),t.TgZ(34,"label"),t._uU(35,"UOM"),t.qZA(),t.TgZ(36,"select",18),t.TgZ(37,"option",19),t._uU(38,"Item Type"),t.qZA(),t.TgZ(39,"option",20),t._uU(40,"NO"),t.qZA(),t.TgZ(41,"option",21),t._uU(42,"MTR"),t.qZA(),t.TgZ(43,"option",22),t._uU(44,"KG"),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.TgZ(45,"div",8),t.TgZ(46,"div",9),t.TgZ(47,"label",23),t._uU(48,"Article"),t.qZA(),t._UZ(49,"input",24),t.qZA(),t.qZA(),t.TgZ(50,"div",8),t.TgZ(51,"div",9),t.TgZ(52,"label"),t._uU(53,"Color"),t.qZA(),t.TgZ(54,"select",25),t.TgZ(55,"option",19),t._uU(56,"Color"),t.qZA(),t.YNc(57,N,2,1,"option",26),t.qZA(),t.qZA(),t.qZA(),t.TgZ(58,"div",8),t.TgZ(59,"div",9),t.TgZ(60,"label",27),t._uU(61,"Closing Quantity"),t.qZA(),t._UZ(62,"input",28),t.qZA(),t.qZA(),t.YNc(63,O,9,1,"div",29),t.TgZ(64,"div",30),t.TgZ(65,"div",31),t.TgZ(66,"button",32),t.NdJ("click",function(){return e.onSubmit(e.ItemMasterForm.value)}),t._uU(67," Save "),t.qZA(),t.TgZ(68,"button",33),t._uU(69," Cancel "),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA()),2&r&&(t.xp6(2),t.Q6J("contentHeader",e.contentHeader),t.xp6(7),t.Q6J("formGroup",e.ItemMasterForm),t.xp6(6),t.Q6J("ngClass",e.submitted&&e.f.name.errors?"is-invalid":e.f.name.errors?" ":"is-valid"),t.xp6(10),t.Q6J("ngClass",e.submitted&&e.f.itemType.errors?"is-invalid":e.f.itemType.errors?" ":"is-valid"),t.xp6(11),t.Q6J("ngClass",e.submitted&&e.f.UOM.errors?"is-invalid":e.f.UOM.errors?" ":"is-valid"),t.xp6(21),t.Q6J("ngForOf",e.getColors),t.xp6(6),t.Q6J("ngIf",e.editable),t.xp6(5),t.Q6J("routerLink",t.DdM(8,F)))},directives:[A.e,i._Y,i.JL,i.sg,i.Fj,i.JJ,i.u,i.Q7,d.mk,m.oO,i.EJ,i.YN,i.Kr,d.sg,d.O5,p.R,u.rH],styles:[""]}),n}(),L=o(8947),k=o(2286),J=[{path:"",component:_,data:{animation:"item-master"}},{path:"list",component:_,data:{animation:"item-list-master"}},{path:"form",component:y,data:{animation:"item-detail-master"}},{path:"form/:id",component:y,data:{animation:"item-detail-master-id"}}],Q=function(){var n=(0,g.Z)(function s(){(0,f.Z)(this,s)});return n.\u0275fac=function(r){return new(r||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({providers:[Z.i],imports:[[d.ez,u.Bz.forChild(J),L.N,k.$,i.u5,i.UX]]}),n}()},3273:function(M,v,o){o.d(v,{c:function(){return A}});var g=o(5134),f=o(7289),d=o(8260),t=o(1366),Z=o(6154),T=o(4522),A=function(){var p=function(){function u(c){(0,g.Z)(this,u),this._http=c,this.baseUrl=d.N.apiUrl,this.path="item-master"}return(0,f.Z)(u,[{key:"create",value:function(i){return this._http.post("".concat(this.baseUrl,"/").concat(this.path,"/create"),i).pipe((0,t.b)(function(m){return m}))}},{key:"getAll",value:function(){return this._http.post("".concat(this.baseUrl,"/").concat(this.path,"/get-all"),{}).pipe((0,t.b)(function(i){return i}))}},{key:"getDetailById",value:function(i){return this._http.post("".concat(this.baseUrl,"/").concat(this.path,"/get-by-id"),i).pipe((0,t.b)(function(m){return m}))}},{key:"delete",value:function(i){return this._http.post("".concat(this.baseUrl,"/").concat(this.path,"/delete"),i).pipe((0,t.b)(function(m){return m}))}},{key:"update",value:function(i){return this._http.post("".concat(this.baseUrl,"/").concat(this.path,"/update"),i).pipe((0,t.b)(function(m){return m}))}}]),u}();return p.\u0275fac=function(c){return new(c||p)(Z.LFG(T.eN))},p.\u0275prov=Z.Yz7({token:p,factory:p.\u0275fac,providedIn:"root"}),p}()}}]);