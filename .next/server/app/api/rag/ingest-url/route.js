/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/rag/ingest-url/route";
exports.ids = ["app/api/rag/ingest-url/route"];
exports.modules = {

/***/ "(rsc)/./node_modules/pdf-parse/lib/pdf.js sync recursive ^\\.\\/.*\\/build\\/pdf\\.js$":
/*!**************************************************************************!*\
  !*** ./node_modules/pdf-parse/lib/pdf.js/ sync ^\.\/.*\/build\/pdf\.js$ ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./v1.10.100/build/pdf.js": "(rsc)/./node_modules/pdf-parse/lib/pdf.js/v1.10.100/build/pdf.js",
	"./v1.10.88/build/pdf.js": "(rsc)/./node_modules/pdf-parse/lib/pdf.js/v1.10.88/build/pdf.js",
	"./v1.9.426/build/pdf.js": "(rsc)/./node_modules/pdf-parse/lib/pdf.js/v1.9.426/build/pdf.js",
	"./v2.0.550/build/pdf.js": "(rsc)/./node_modules/pdf-parse/lib/pdf.js/v2.0.550/build/pdf.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "(rsc)/./node_modules/pdf-parse/lib/pdf.js sync recursive ^\\.\\/.*\\/build\\/pdf\\.js$";

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "http2":
/*!************************!*\
  !*** external "http2" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("http2");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "string_decoder":
/*!*********************************!*\
  !*** external "string_decoder" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("string_decoder");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ }),

/***/ "pg":
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = import("pg");;

/***/ }),

/***/ "node:assert":
/*!******************************!*\
  !*** external "node:assert" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:assert");

/***/ }),

/***/ "node:async_hooks":
/*!***********************************!*\
  !*** external "node:async_hooks" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:async_hooks");

/***/ }),

/***/ "node:buffer":
/*!******************************!*\
  !*** external "node:buffer" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:buffer");

/***/ }),

/***/ "node:console":
/*!*******************************!*\
  !*** external "node:console" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:console");

/***/ }),

/***/ "node:crypto":
/*!******************************!*\
  !*** external "node:crypto" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:crypto");

/***/ }),

/***/ "node:diagnostics_channel":
/*!*******************************************!*\
  !*** external "node:diagnostics_channel" ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:diagnostics_channel");

/***/ }),

/***/ "node:dns":
/*!***************************!*\
  !*** external "node:dns" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:dns");

/***/ }),

/***/ "node:events":
/*!******************************!*\
  !*** external "node:events" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:events");

/***/ }),

/***/ "node:fs/promises":
/*!***********************************!*\
  !*** external "node:fs/promises" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:fs/promises");

/***/ }),

/***/ "node:http":
/*!****************************!*\
  !*** external "node:http" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:http");

/***/ }),

/***/ "node:http2":
/*!*****************************!*\
  !*** external "node:http2" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:http2");

/***/ }),

/***/ "node:net":
/*!***************************!*\
  !*** external "node:net" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:net");

/***/ }),

/***/ "node:path":
/*!****************************!*\
  !*** external "node:path" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:path");

/***/ }),

/***/ "node:perf_hooks":
/*!**********************************!*\
  !*** external "node:perf_hooks" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:perf_hooks");

/***/ }),

/***/ "node:querystring":
/*!***********************************!*\
  !*** external "node:querystring" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:querystring");

/***/ }),

/***/ "node:sqlite":
/*!******************************!*\
  !*** external "node:sqlite" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:sqlite");

/***/ }),

/***/ "node:stream":
/*!******************************!*\
  !*** external "node:stream" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:stream");

/***/ }),

/***/ "node:timers":
/*!******************************!*\
  !*** external "node:timers" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:timers");

/***/ }),

/***/ "node:tls":
/*!***************************!*\
  !*** external "node:tls" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:tls");

/***/ }),

/***/ "node:util":
/*!****************************!*\
  !*** external "node:util" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:util");

/***/ }),

/***/ "node:util/types":
/*!**********************************!*\
  !*** external "node:util/types" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:util/types");

/***/ }),

/***/ "node:worker_threads":
/*!**************************************!*\
  !*** external "node:worker_threads" ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:worker_threads");

/***/ }),

/***/ "node:zlib":
/*!****************************!*\
  !*** external "node:zlib" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Frag%2Fingest-url%2Froute&page=%2Fapi%2Frag%2Fingest-url%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Frag%2Fingest-url%2Froute.ts&appDir=C%3A%5CUsers%5CAdministrator%5CDesktop%5Cnvidia-bot%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CAdministrator%5CDesktop%5Cnvidia-bot&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Frag%2Fingest-url%2Froute&page=%2Fapi%2Frag%2Fingest-url%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Frag%2Fingest-url%2Froute.ts&appDir=C%3A%5CUsers%5CAdministrator%5CDesktop%5Cnvidia-bot%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CAdministrator%5CDesktop%5Cnvidia-bot&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Administrator_Desktop_nvidia_bot_src_app_api_rag_ingest_url_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/rag/ingest-url/route.ts */ \"(rsc)/./src/app/api/rag/ingest-url/route.ts\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([C_Users_Administrator_Desktop_nvidia_bot_src_app_api_rag_ingest_url_route_ts__WEBPACK_IMPORTED_MODULE_3__]);\nC_Users_Administrator_Desktop_nvidia_bot_src_app_api_rag_ingest_url_route_ts__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/rag/ingest-url/route\",\n        pathname: \"/api/rag/ingest-url\",\n        filename: \"route\",\n        bundlePath: \"app/api/rag/ingest-url/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Administrator\\\\Desktop\\\\nvidia-bot\\\\src\\\\app\\\\api\\\\rag\\\\ingest-url\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_Administrator_Desktop_nvidia_bot_src_app_api_rag_ingest_url_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/rag/ingest-url/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZyYWclMkZpbmdlc3QtdXJsJTJGcm91dGUmcGFnZT0lMkZhcGklMkZyYWclMkZpbmdlc3QtdXJsJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGcmFnJTJGaW5nZXN0LXVybCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNBZG1pbmlzdHJhdG9yJTVDRGVza3RvcCU1Q252aWRpYS1ib3QlNUNzcmMlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q0FkbWluaXN0cmF0b3IlNUNEZXNrdG9wJTVDbnZpZGlhLWJvdCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDdUM7QUFDcEg7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgscUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9udmlkaWEtYm90Lz83YmEwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXEFkbWluaXN0cmF0b3JcXFxcRGVza3RvcFxcXFxudmlkaWEtYm90XFxcXHNyY1xcXFxhcHBcXFxcYXBpXFxcXHJhZ1xcXFxpbmdlc3QtdXJsXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9yYWcvaW5nZXN0LXVybC9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3JhZy9pbmdlc3QtdXJsXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9yYWcvaW5nZXN0LXVybC9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXEFkbWluaXN0cmF0b3JcXFxcRGVza3RvcFxcXFxudmlkaWEtYm90XFxcXHNyY1xcXFxhcHBcXFxcYXBpXFxcXHJhZ1xcXFxpbmdlc3QtdXJsXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9yYWcvaW5nZXN0LXVybC9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Frag%2Fingest-url%2Froute&page=%2Fapi%2Frag%2Fingest-url%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Frag%2Fingest-url%2Froute.ts&appDir=C%3A%5CUsers%5CAdministrator%5CDesktop%5Cnvidia-bot%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CAdministrator%5CDesktop%5Cnvidia-bot&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/rag/ingest-url/route.ts":
/*!*********************************************!*\
  !*** ./src/app/api/rag/ingest-url/route.ts ***!
  \*********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _rag_pinecone_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/rag/pinecone-store */ \"(rsc)/./src/rag/pinecone-store.ts\");\n/* harmony import */ var _rag_rag_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/rag/rag-manager */ \"(rsc)/./src/rag/rag-manager.ts\");\n/* harmony import */ var _rag_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/rag/index */ \"(rsc)/./src/rag/index.ts\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_rag_index__WEBPACK_IMPORTED_MODULE_3__]);\n_rag_index__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\nasync function POST(req) {\n    try {\n        const { url, indexName } = await req.json();\n        if (!url) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"URL is required\"\n            }, {\n                status: 400\n            });\n        }\n        const apiKey = process.env.PINECONE_API_KEY;\n        const targetIndex = indexName || process.env.PINECONE_INDEX || \"nvidia-bot\";\n        let store;\n        if (apiKey) {\n            store = new _rag_pinecone_store__WEBPACK_IMPORTED_MODULE_1__.PineconeVectorStore(apiKey, targetIndex);\n        } else {\n            // Fallback to local\n            const { SimpleVectorStore } = await Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! @/rag/simple-store */ \"(rsc)/./src/rag/simple-store.ts\"));\n            store = new SimpleVectorStore();\n            console.log(\"Using SimpleVectorStore (Fallback)\");\n        }\n        const manager = new _rag_rag_manager__WEBPACK_IMPORTED_MODULE_2__.RAGManager(store);\n        const webSource = new _rag_index__WEBPACK_IMPORTED_MODULE_3__.WebDataSource(url);\n        manager.registerSource(webSource);\n        await manager.ingestAll();\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            message: `Successfully ingested content from ${url}`\n        });\n    } catch (error) {\n        console.error(\"Ingest API Error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: error.message || \"Internal Server Error\"\n        }, {\n            status: 500\n        });\n    }\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9yYWcvaW5nZXN0LXVybC9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUN3RDtBQUNHO0FBQ1o7QUFDSDtBQUVyQyxlQUFlSSxLQUFLQyxHQUFnQjtJQUN2QyxJQUFJO1FBQ0EsTUFBTSxFQUFFQyxHQUFHLEVBQUVDLFNBQVMsRUFBRSxHQUFHLE1BQU1GLElBQUlHLElBQUk7UUFFekMsSUFBSSxDQUFDRixLQUFLO1lBQ04sT0FBT04scURBQVlBLENBQUNRLElBQUksQ0FBQztnQkFBRUMsT0FBTztZQUFrQixHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDekU7UUFFQSxNQUFNQyxTQUFTQyxRQUFRQyxHQUFHLENBQUNDLGdCQUFnQjtRQUMzQyxNQUFNQyxjQUFjUixhQUFhSyxRQUFRQyxHQUFHLENBQUNHLGNBQWMsSUFBSTtRQUUvRCxJQUFJQztRQUVKLElBQUlOLFFBQVE7WUFDUk0sUUFBUSxJQUFJaEIsb0VBQW1CQSxDQUFDVSxRQUFRSTtRQUM1QyxPQUFPO1lBQ0gsb0JBQW9CO1lBQ3BCLE1BQU0sRUFBRUcsaUJBQWlCLEVBQUUsR0FBRyxNQUFNLGlKQUFPO1lBQzNDRCxRQUFRLElBQUlDO1lBQ1pDLFFBQVFDLEdBQUcsQ0FBQztRQUNoQjtRQUVBLE1BQU1DLFVBQVUsSUFBSW5CLHdEQUFVQSxDQUFDZTtRQUMvQixNQUFNSyxZQUFZLElBQUluQixxREFBYUEsQ0FBQ0c7UUFFcENlLFFBQVFFLGNBQWMsQ0FBQ0Q7UUFDdkIsTUFBTUQsUUFBUUcsU0FBUztRQUV2QixPQUFPeEIscURBQVlBLENBQUNRLElBQUksQ0FBQztZQUFFaUIsU0FBUztZQUFNQyxTQUFTLENBQUMsbUNBQW1DLEVBQUVwQixJQUFJLENBQUM7UUFBQztJQUNuRyxFQUFFLE9BQU9HLE9BQVk7UUFDakJVLFFBQVFWLEtBQUssQ0FBQyxxQkFBcUJBO1FBQ25DLE9BQU9ULHFEQUFZQSxDQUFDUSxJQUFJLENBQUM7WUFBRUMsT0FBT0EsTUFBTWlCLE9BQU8sSUFBSTtRQUF3QixHQUFHO1lBQUVoQixRQUFRO1FBQUk7SUFDaEc7QUFDSiIsInNvdXJjZXMiOlsid2VicGFjazovL252aWRpYS1ib3QvLi9zcmMvYXBwL2FwaS9yYWcvaW5nZXN0LXVybC9yb3V0ZS50cz9iYzc5Il0sInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xyXG5pbXBvcnQgeyBQaW5lY29uZVZlY3RvclN0b3JlIH0gZnJvbSAnQC9yYWcvcGluZWNvbmUtc3RvcmUnO1xyXG5pbXBvcnQgeyBSQUdNYW5hZ2VyIH0gZnJvbSAnQC9yYWcvcmFnLW1hbmFnZXInO1xyXG5pbXBvcnQgeyBXZWJEYXRhU291cmNlIH0gZnJvbSAnQC9yYWcvaW5kZXgnO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxOiBOZXh0UmVxdWVzdCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCB7IHVybCwgaW5kZXhOYW1lIH0gPSBhd2FpdCByZXEuanNvbigpO1xyXG5cclxuICAgICAgICBpZiAoIXVybCkge1xyXG4gICAgICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ1VSTCBpcyByZXF1aXJlZCcgfSwgeyBzdGF0dXM6IDQwMCB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGFwaUtleSA9IHByb2Nlc3MuZW52LlBJTkVDT05FX0FQSV9LRVk7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0SW5kZXggPSBpbmRleE5hbWUgfHwgcHJvY2Vzcy5lbnYuUElORUNPTkVfSU5ERVggfHwgJ252aWRpYS1ib3QnO1xyXG5cclxuICAgICAgICBsZXQgc3RvcmU7XHJcblxyXG4gICAgICAgIGlmIChhcGlLZXkpIHtcclxuICAgICAgICAgICAgc3RvcmUgPSBuZXcgUGluZWNvbmVWZWN0b3JTdG9yZShhcGlLZXksIHRhcmdldEluZGV4KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBGYWxsYmFjayB0byBsb2NhbFxyXG4gICAgICAgICAgICBjb25zdCB7IFNpbXBsZVZlY3RvclN0b3JlIH0gPSBhd2FpdCBpbXBvcnQoJ0AvcmFnL3NpbXBsZS1zdG9yZScpO1xyXG4gICAgICAgICAgICBzdG9yZSA9IG5ldyBTaW1wbGVWZWN0b3JTdG9yZSgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnVXNpbmcgU2ltcGxlVmVjdG9yU3RvcmUgKEZhbGxiYWNrKScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbWFuYWdlciA9IG5ldyBSQUdNYW5hZ2VyKHN0b3JlKTtcclxuICAgICAgICBjb25zdCB3ZWJTb3VyY2UgPSBuZXcgV2ViRGF0YVNvdXJjZSh1cmwpO1xyXG5cclxuICAgICAgICBtYW5hZ2VyLnJlZ2lzdGVyU291cmNlKHdlYlNvdXJjZSk7XHJcbiAgICAgICAgYXdhaXQgbWFuYWdlci5pbmdlc3RBbGwoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgbWVzc2FnZTogYFN1Y2Nlc3NmdWxseSBpbmdlc3RlZCBjb250ZW50IGZyb20gJHt1cmx9YCB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdJbmdlc3QgQVBJIEVycm9yOicsIGVycm9yKTtcclxuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogZXJyb3IubWVzc2FnZSB8fCAnSW50ZXJuYWwgU2VydmVyIEVycm9yJyB9LCB7IHN0YXR1czogNTAwIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJQaW5lY29uZVZlY3RvclN0b3JlIiwiUkFHTWFuYWdlciIsIldlYkRhdGFTb3VyY2UiLCJQT1NUIiwicmVxIiwidXJsIiwiaW5kZXhOYW1lIiwianNvbiIsImVycm9yIiwic3RhdHVzIiwiYXBpS2V5IiwicHJvY2VzcyIsImVudiIsIlBJTkVDT05FX0FQSV9LRVkiLCJ0YXJnZXRJbmRleCIsIlBJTkVDT05FX0lOREVYIiwic3RvcmUiLCJTaW1wbGVWZWN0b3JTdG9yZSIsImNvbnNvbGUiLCJsb2ciLCJtYW5hZ2VyIiwid2ViU291cmNlIiwicmVnaXN0ZXJTb3VyY2UiLCJpbmdlc3RBbGwiLCJzdWNjZXNzIiwibWVzc2FnZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/rag/ingest-url/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/file-processor.ts":
/*!*******************************!*\
  !*** ./src/file-processor.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   extractTextFromFile: () => (/* binding */ extractTextFromFile),\n/* harmony export */   getFileExtension: () => (/* binding */ getFileExtension),\n/* harmony export */   isDocumentFile: () => (/* binding */ isDocumentFile),\n/* harmony export */   isImageFile: () => (/* binding */ isImageFile),\n/* harmony export */   isTextFile: () => (/* binding */ isTextFile)\n/* harmony export */ });\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var pdf_parse__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! pdf-parse */ \"(rsc)/./node_modules/pdf-parse/index.js\");\n/* harmony import */ var pdf_parse__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(pdf_parse__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var mammoth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! mammoth */ \"(rsc)/./node_modules/mammoth/lib/index.js\");\n\n\n\n\nasync function extractTextFromFile(filePath, mimetype) {\n    try {\n        const ext = path__WEBPACK_IMPORTED_MODULE_1___default().extname(filePath).toLowerCase();\n        if (mimetype.startsWith(\"text/\") || ext === \".txt\" || ext === \".md\" || ext === \".json\" || ext === \".csv\") {\n            return fs__WEBPACK_IMPORTED_MODULE_0___default().promises.readFile(filePath, \"utf-8\");\n        }\n        if (mimetype === \"application/pdf\" || ext === \".pdf\") {\n            const data = await fs__WEBPACK_IMPORTED_MODULE_0___default().promises.readFile(filePath);\n            const result = await pdf_parse__WEBPACK_IMPORTED_MODULE_2___default()(data);\n            return result.text;\n        }\n        if (mimetype === \"application/vnd.openxmlformats-officedocument.wordprocessingml.document\" || ext === \".docx\") {\n            const buffer = await fs__WEBPACK_IMPORTED_MODULE_0___default().promises.readFile(filePath);\n            const result = await mammoth__WEBPACK_IMPORTED_MODULE_3__.extractRawText({\n                buffer\n            });\n            return result.value;\n        }\n        if (mimetype.startsWith(\"image/\")) {\n            return `[Image file: ${path__WEBPACK_IMPORTED_MODULE_1___default().basename(filePath)}]`;\n        }\n        return `[Unsupported file type: ${mimetype}]`;\n    } catch (error) {\n        throw new Error(`Failed to extract text from file: ${error.message}`);\n    }\n}\nfunction getFileExtension(filename) {\n    return path__WEBPACK_IMPORTED_MODULE_1___default().extname(filename).toLowerCase();\n}\nfunction isImageFile(mimetype) {\n    return mimetype.startsWith(\"image/\");\n}\nfunction isTextFile(mimetype) {\n    return mimetype.startsWith(\"text/\") || mimetype === \"application/json\" || mimetype === \"application/csv\" || mimetype === \"text/markdown\";\n}\nfunction isDocumentFile(mimetype) {\n    return mimetype === \"application/pdf\" || mimetype === \"application/vnd.openxmlformats-officedocument.wordprocessingml.document\" || mimetype === \"application/msword\";\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvZmlsZS1wcm9jZXNzb3IudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQW9CO0FBQ0k7QUFDSTtBQUNFO0FBV3ZCLGVBQWVJLG9CQUFvQkMsUUFBZ0IsRUFBRUMsUUFBZ0I7SUFDeEUsSUFBSTtRQUNBLE1BQU1DLE1BQU1OLG1EQUFZLENBQUNJLFVBQVVJLFdBQVc7UUFFOUMsSUFBSUgsU0FBU0ksVUFBVSxDQUFDLFlBQVlILFFBQVEsVUFBVUEsUUFBUSxTQUFTQSxRQUFRLFdBQVdBLFFBQVEsUUFBUTtZQUN0RyxPQUFPUCxrREFBVyxDQUFDWSxRQUFRLENBQUNQLFVBQVU7UUFDMUM7UUFFQSxJQUFJQyxhQUFhLHFCQUFxQkMsUUFBUSxRQUFRO1lBQ2xELE1BQU1NLE9BQU8sTUFBTWIsa0RBQVcsQ0FBQ1ksUUFBUSxDQUFDUDtZQUN4QyxNQUFNUyxTQUFTLE1BQU1aLGdEQUFHQSxDQUFDVztZQUN6QixPQUFPQyxPQUFPQyxJQUFJO1FBQ3RCO1FBRUEsSUFBSVQsYUFBYSw2RUFBNkVDLFFBQVEsU0FBUztZQUMzRyxNQUFNUyxTQUFTLE1BQU1oQixrREFBVyxDQUFDWSxRQUFRLENBQUNQO1lBQzFDLE1BQU1TLFNBQVMsTUFBTVgsbURBQXNCLENBQUM7Z0JBQUVhO1lBQU87WUFDckQsT0FBT0YsT0FBT0ksS0FBSztRQUN2QjtRQUVBLElBQUlaLFNBQVNJLFVBQVUsQ0FBQyxXQUFXO1lBQy9CLE9BQU8sQ0FBQyxhQUFhLEVBQUVULG9EQUFhLENBQUNJLFVBQVUsQ0FBQyxDQUFDO1FBQ3JEO1FBRUEsT0FBTyxDQUFDLHdCQUF3QixFQUFFQyxTQUFTLENBQUMsQ0FBQztJQUNqRCxFQUFFLE9BQU9jLE9BQVk7UUFDakIsTUFBTSxJQUFJQyxNQUFNLENBQUMsa0NBQWtDLEVBQUVELE1BQU1FLE9BQU8sQ0FBQyxDQUFDO0lBQ3hFO0FBQ0o7QUFFTyxTQUFTQyxpQkFBaUJDLFFBQWdCO0lBQzdDLE9BQU92QixtREFBWSxDQUFDdUIsVUFBVWYsV0FBVztBQUM3QztBQUVPLFNBQVNnQixZQUFZbkIsUUFBZ0I7SUFDeEMsT0FBT0EsU0FBU0ksVUFBVSxDQUFDO0FBQy9CO0FBRU8sU0FBU2dCLFdBQVdwQixRQUFnQjtJQUN2QyxPQUFPQSxTQUFTSSxVQUFVLENBQUMsWUFDdkJKLGFBQWEsc0JBQ2JBLGFBQWEscUJBQ2JBLGFBQWE7QUFDckI7QUFFTyxTQUFTcUIsZUFBZXJCLFFBQWdCO0lBQzNDLE9BQU9BLGFBQWEscUJBQ2hCQSxhQUFhLDZFQUNiQSxhQUFhO0FBQ3JCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbnZpZGlhLWJvdC8uL3NyYy9maWxlLXByb2Nlc3Nvci50cz9hNGRkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyBmcm9tICdmcyc7XHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgcGRmIGZyb20gJ3BkZi1wYXJzZSc7XHJcbmltcG9ydCBtYW1tb3RoIGZyb20gJ21hbW1vdGgnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBVcGxvYWRlZEZpbGUge1xyXG4gICAgZmlsZW5hbWU6IHN0cmluZztcclxuICAgIG9yaWdpbmFsbmFtZTogc3RyaW5nO1xyXG4gICAgbWltZXR5cGU6IHN0cmluZztcclxuICAgIHNpemU6IG51bWJlcjtcclxuICAgIGNvbnRlbnQ/OiBzdHJpbmc7XHJcbiAgICBlcnJvcj86IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4dHJhY3RUZXh0RnJvbUZpbGUoZmlsZVBhdGg6IHN0cmluZywgbWltZXR5cGU6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGV4dCA9IHBhdGguZXh0bmFtZShmaWxlUGF0aCkudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICAgICAgaWYgKG1pbWV0eXBlLnN0YXJ0c1dpdGgoJ3RleHQvJykgfHwgZXh0ID09PSAnLnR4dCcgfHwgZXh0ID09PSAnLm1kJyB8fCBleHQgPT09ICcuanNvbicgfHwgZXh0ID09PSAnLmNzdicpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZzLnByb21pc2VzLnJlYWRGaWxlKGZpbGVQYXRoLCAndXRmLTgnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChtaW1ldHlwZSA9PT0gJ2FwcGxpY2F0aW9uL3BkZicgfHwgZXh0ID09PSAnLnBkZicpIHtcclxuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKGZpbGVQYXRoKTtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcGRmKGRhdGEpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0LnRleHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobWltZXR5cGUgPT09ICdhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQud29yZHByb2Nlc3NpbmdtbC5kb2N1bWVudCcgfHwgZXh0ID09PSAnLmRvY3gnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJ1ZmZlciA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKGZpbGVQYXRoKTtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgbWFtbW90aC5leHRyYWN0UmF3VGV4dCh7IGJ1ZmZlciB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC52YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChtaW1ldHlwZS5zdGFydHNXaXRoKCdpbWFnZS8nKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gYFtJbWFnZSBmaWxlOiAke3BhdGguYmFzZW5hbWUoZmlsZVBhdGgpfV1gO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGBbVW5zdXBwb3J0ZWQgZmlsZSB0eXBlOiAke21pbWV0eXBlfV1gO1xyXG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGV4dHJhY3QgdGV4dCBmcm9tIGZpbGU6ICR7ZXJyb3IubWVzc2FnZX1gKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEZpbGVFeHRlbnNpb24oZmlsZW5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gcGF0aC5leHRuYW1lKGZpbGVuYW1lKS50b0xvd2VyQ2FzZSgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNJbWFnZUZpbGUobWltZXR5cGU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIG1pbWV0eXBlLnN0YXJ0c1dpdGgoJ2ltYWdlLycpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNUZXh0RmlsZShtaW1ldHlwZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gbWltZXR5cGUuc3RhcnRzV2l0aCgndGV4dC8nKSB8fFxyXG4gICAgICAgIG1pbWV0eXBlID09PSAnYXBwbGljYXRpb24vanNvbicgfHxcclxuICAgICAgICBtaW1ldHlwZSA9PT0gJ2FwcGxpY2F0aW9uL2NzdicgfHxcclxuICAgICAgICBtaW1ldHlwZSA9PT0gJ3RleHQvbWFya2Rvd24nO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNEb2N1bWVudEZpbGUobWltZXR5cGU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIG1pbWV0eXBlID09PSAnYXBwbGljYXRpb24vcGRmJyB8fFxyXG4gICAgICAgIG1pbWV0eXBlID09PSAnYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LndvcmRwcm9jZXNzaW5nbWwuZG9jdW1lbnQnIHx8XHJcbiAgICAgICAgbWltZXR5cGUgPT09ICdhcHBsaWNhdGlvbi9tc3dvcmQnO1xyXG59Il0sIm5hbWVzIjpbImZzIiwicGF0aCIsInBkZiIsIm1hbW1vdGgiLCJleHRyYWN0VGV4dEZyb21GaWxlIiwiZmlsZVBhdGgiLCJtaW1ldHlwZSIsImV4dCIsImV4dG5hbWUiLCJ0b0xvd2VyQ2FzZSIsInN0YXJ0c1dpdGgiLCJwcm9taXNlcyIsInJlYWRGaWxlIiwiZGF0YSIsInJlc3VsdCIsInRleHQiLCJidWZmZXIiLCJleHRyYWN0UmF3VGV4dCIsInZhbHVlIiwiYmFzZW5hbWUiLCJlcnJvciIsIkVycm9yIiwibWVzc2FnZSIsImdldEZpbGVFeHRlbnNpb24iLCJmaWxlbmFtZSIsImlzSW1hZ2VGaWxlIiwiaXNUZXh0RmlsZSIsImlzRG9jdW1lbnRGaWxlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/file-processor.ts\n");

/***/ }),

/***/ "(rsc)/./src/rag/connectors/cms.ts":
/*!***********************************!*\
  !*** ./src/rag/connectors/cms.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MockCMSDataSource: () => (/* binding */ MockCMSDataSource)\n/* harmony export */ });\nclass MockCMSDataSource {\n    constructor(apiUrl, apiKey){\n        this.name = \"Headless CMS\";\n        this.apiUrl = apiUrl;\n        this.apiKey = apiKey;\n    }\n    async connect() {\n        console.log(`Connected to CMS at ${this.apiUrl}`);\n    }\n    async disconnect() {\n        console.log(\"Disconnected from CMS\");\n    }\n    async getData() {\n        // Mock fetching articles/pages from a CMS\n        const mockArticles = [\n            {\n                id: \"article-1\",\n                title: \"NVIDIA H100 Architecture\",\n                body: \"The NVIDIA H100 Tensor Core GPU delivers unprecedented performance...\"\n            },\n            {\n                id: \"article-2\",\n                title: \"Data Center Solutions\",\n                body: \"Our data center platform accelerates every workload...\"\n            }\n        ];\n        return mockArticles.map((article)=>({\n                id: `cms-${article.id}`,\n                content: `# ${article.title}\\n\\n${article.body}`,\n                metadata: {\n                    type: \"article\",\n                    sourceId: article.id,\n                    url: `${this.apiUrl}/articles/${article.id}`\n                },\n                source: this.name,\n                createdAt: new Date()\n            }));\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvcmFnL2Nvbm5lY3RvcnMvY21zLnRzIiwibWFwcGluZ3MiOiI7Ozs7QUFFTyxNQUFNQTtJQUtUQyxZQUFZQyxNQUFjLEVBQUVDLE1BQWMsQ0FBRTthQUo1Q0MsT0FBTztRQUtILElBQUksQ0FBQ0YsTUFBTSxHQUFHQTtRQUNkLElBQUksQ0FBQ0MsTUFBTSxHQUFHQTtJQUNsQjtJQUVBLE1BQU1FLFVBQXlCO1FBQzNCQyxRQUFRQyxHQUFHLENBQUMsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUNMLE1BQU0sQ0FBQyxDQUFDO0lBQ3BEO0lBRUEsTUFBTU0sYUFBNEI7UUFDOUJGLFFBQVFDLEdBQUcsQ0FBQztJQUNoQjtJQUVBLE1BQU1FLFVBQStCO1FBQ2pDLDBDQUEwQztRQUMxQyxNQUFNQyxlQUFlO1lBQ2pCO2dCQUNJQyxJQUFJO2dCQUNKQyxPQUFPO2dCQUNQQyxNQUFNO1lBQ1Y7WUFDQTtnQkFDSUYsSUFBSTtnQkFDSkMsT0FBTztnQkFDUEMsTUFBTTtZQUNWO1NBQ0g7UUFFRCxPQUFPSCxhQUFhSSxHQUFHLENBQUNDLENBQUFBLFVBQVk7Z0JBQ2hDSixJQUFJLENBQUMsSUFBSSxFQUFFSSxRQUFRSixFQUFFLENBQUMsQ0FBQztnQkFDdkJLLFNBQVMsQ0FBQyxFQUFFLEVBQUVELFFBQVFILEtBQUssQ0FBQyxJQUFJLEVBQUVHLFFBQVFGLElBQUksQ0FBQyxDQUFDO2dCQUNoREksVUFBVTtvQkFDTkMsTUFBTTtvQkFDTkMsVUFBVUosUUFBUUosRUFBRTtvQkFDcEJTLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQ2xCLE1BQU0sQ0FBQyxVQUFVLEVBQUVhLFFBQVFKLEVBQUUsQ0FBQyxDQUFDO2dCQUNoRDtnQkFDQVUsUUFBUSxJQUFJLENBQUNqQixJQUFJO2dCQUNqQmtCLFdBQVcsSUFBSUM7WUFDbkI7SUFDSjtBQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbnZpZGlhLWJvdC8uL3NyYy9yYWcvY29ubmVjdG9ycy9jbXMudHM/MzY5NyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYXRhU291cmNlLCBEb2N1bWVudCB9IGZyb20gJy4uL3R5cGVzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBNb2NrQ01TRGF0YVNvdXJjZSBpbXBsZW1lbnRzIERhdGFTb3VyY2Uge1xyXG4gICAgbmFtZSA9ICdIZWFkbGVzcyBDTVMnO1xyXG4gICAgcHJpdmF0ZSBhcGlVcmw6IHN0cmluZztcclxuICAgIHByaXZhdGUgYXBpS2V5OiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYXBpVXJsOiBzdHJpbmcsIGFwaUtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5hcGlVcmwgPSBhcGlVcmw7XHJcbiAgICAgICAgdGhpcy5hcGlLZXkgPSBhcGlLZXk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgY29ubmVjdCgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhgQ29ubmVjdGVkIHRvIENNUyBhdCAke3RoaXMuYXBpVXJsfWApO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGRpc2Nvbm5lY3QoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0Rpc2Nvbm5lY3RlZCBmcm9tIENNUycpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGdldERhdGEoKTogUHJvbWlzZTxEb2N1bWVudFtdPiB7XHJcbiAgICAgICAgLy8gTW9jayBmZXRjaGluZyBhcnRpY2xlcy9wYWdlcyBmcm9tIGEgQ01TXHJcbiAgICAgICAgY29uc3QgbW9ja0FydGljbGVzID0gW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZDogJ2FydGljbGUtMScsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ05WSURJQSBIMTAwIEFyY2hpdGVjdHVyZScsXHJcbiAgICAgICAgICAgICAgICBib2R5OiAnVGhlIE5WSURJQSBIMTAwIFRlbnNvciBDb3JlIEdQVSBkZWxpdmVycyB1bnByZWNlZGVudGVkIHBlcmZvcm1hbmNlLi4uJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZDogJ2FydGljbGUtMicsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ0RhdGEgQ2VudGVyIFNvbHV0aW9ucycsXHJcbiAgICAgICAgICAgICAgICBib2R5OiAnT3VyIGRhdGEgY2VudGVyIHBsYXRmb3JtIGFjY2VsZXJhdGVzIGV2ZXJ5IHdvcmtsb2FkLi4uJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG1vY2tBcnRpY2xlcy5tYXAoYXJ0aWNsZSA9PiAoe1xyXG4gICAgICAgICAgICBpZDogYGNtcy0ke2FydGljbGUuaWR9YCxcclxuICAgICAgICAgICAgY29udGVudDogYCMgJHthcnRpY2xlLnRpdGxlfVxcblxcbiR7YXJ0aWNsZS5ib2R5fWAsXHJcbiAgICAgICAgICAgIG1ldGFkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnYXJ0aWNsZScsXHJcbiAgICAgICAgICAgICAgICBzb3VyY2VJZDogYXJ0aWNsZS5pZCxcclxuICAgICAgICAgICAgICAgIHVybDogYCR7dGhpcy5hcGlVcmx9L2FydGljbGVzLyR7YXJ0aWNsZS5pZH1gXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNvdXJjZTogdGhpcy5uYW1lLFxyXG4gICAgICAgICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKClcclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIk1vY2tDTVNEYXRhU291cmNlIiwiY29uc3RydWN0b3IiLCJhcGlVcmwiLCJhcGlLZXkiLCJuYW1lIiwiY29ubmVjdCIsImNvbnNvbGUiLCJsb2ciLCJkaXNjb25uZWN0IiwiZ2V0RGF0YSIsIm1vY2tBcnRpY2xlcyIsImlkIiwidGl0bGUiLCJib2R5IiwibWFwIiwiYXJ0aWNsZSIsImNvbnRlbnQiLCJtZXRhZGF0YSIsInR5cGUiLCJzb3VyY2VJZCIsInVybCIsInNvdXJjZSIsImNyZWF0ZWRBdCIsIkRhdGUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/rag/connectors/cms.ts\n");

/***/ }),

/***/ "(rsc)/./src/rag/connectors/file-system.ts":
/*!*******************************************!*\
  !*** ./src/rag/connectors/file-system.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   FileSystemDataSource: () => (/* binding */ FileSystemDataSource)\n/* harmony export */ });\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _file_processor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../file-processor */ \"(rsc)/./src/file-processor.ts\");\n\n\n\nclass FileSystemDataSource {\n    constructor(rootPath){\n        this.name = \"FileSystem\";\n        this.rootPath = rootPath;\n    }\n    async connect() {\n        // Check if directory exists\n        try {\n            await fs__WEBPACK_IMPORTED_MODULE_0___default().promises.access(this.rootPath);\n        } catch (error) {\n            throw new Error(`Directory not found: ${this.rootPath}`);\n        }\n        console.log(`Connected to File System at ${this.rootPath}`);\n    }\n    async disconnect() {\n        console.log(\"Disconnected from File System\");\n    }\n    async getData() {\n        const documents = [];\n        await this.scanDirectory(this.rootPath, documents);\n        return documents;\n    }\n    async scanDirectory(dir, documents) {\n        const entries = await fs__WEBPACK_IMPORTED_MODULE_0___default().promises.readdir(dir, {\n            withFileTypes: true\n        });\n        for (const entry of entries){\n            const fullPath = path__WEBPACK_IMPORTED_MODULE_1___default().join(dir, entry.name);\n            if (entry.isDirectory()) {\n                // Recursively scan subdirectories, ignoring node_modules and hidden files\n                if (entry.name !== \"node_modules\" && !entry.name.startsWith(\".\")) {\n                    await this.scanDirectory(fullPath, documents);\n                }\n            } else if (entry.isFile()) {\n                const ext = path__WEBPACK_IMPORTED_MODULE_1___default().extname(entry.name).toLowerCase();\n                // Simple mime type inference based on file-processor logic\n                let mimetype = \"application/octet-stream\";\n                if (ext === \".txt\") mimetype = \"text/plain\";\n                else if (ext === \".json\") mimetype = \"application/json\";\n                else if (ext === \".md\") mimetype = \"text/markdown\";\n                else if (ext === \".pdf\") mimetype = \"application/pdf\";\n                else if (ext === \".docx\") mimetype = \"application/vnd.openxmlformats-officedocument.wordprocessingml.document\";\n                if ((0,_file_processor__WEBPACK_IMPORTED_MODULE_2__.isTextFile)(mimetype) || (0,_file_processor__WEBPACK_IMPORTED_MODULE_2__.isDocumentFile)(mimetype)) {\n                    try {\n                        const content = await (0,_file_processor__WEBPACK_IMPORTED_MODULE_2__.extractTextFromFile)(fullPath, mimetype);\n                        documents.push({\n                            id: fullPath,\n                            content: content,\n                            metadata: {\n                                filename: entry.name,\n                                path: fullPath,\n                                extension: ext,\n                                size: (await fs__WEBPACK_IMPORTED_MODULE_0___default().promises.stat(fullPath)).size\n                            },\n                            source: this.name,\n                            createdAt: new Date()\n                        });\n                    } catch (err) {\n                        console.error(`Failed to process file ${fullPath}:`, err);\n                    }\n                }\n            }\n        }\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvcmFnL2Nvbm5lY3RvcnMvZmlsZS1zeXN0ZW0udHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQW9CO0FBQ0k7QUFFK0Q7QUFFaEYsTUFBTUs7SUFJVEMsWUFBWUMsUUFBZ0IsQ0FBRTthQUg5QkMsT0FBTztRQUlILElBQUksQ0FBQ0QsUUFBUSxHQUFHQTtJQUNwQjtJQUVBLE1BQU1FLFVBQXlCO1FBQzNCLDRCQUE0QjtRQUM1QixJQUFJO1lBQ0EsTUFBTVQsa0RBQVcsQ0FBQ1csTUFBTSxDQUFDLElBQUksQ0FBQ0osUUFBUTtRQUMxQyxFQUFFLE9BQU9LLE9BQU87WUFDWixNQUFNLElBQUlDLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUNOLFFBQVEsQ0FBQyxDQUFDO1FBQzNEO1FBQ0FPLFFBQVFDLEdBQUcsQ0FBQyxDQUFDLDRCQUE0QixFQUFFLElBQUksQ0FBQ1IsUUFBUSxDQUFDLENBQUM7SUFDOUQ7SUFFQSxNQUFNUyxhQUE0QjtRQUM5QkYsUUFBUUMsR0FBRyxDQUFDO0lBQ2hCO0lBRUEsTUFBTUUsVUFBK0I7UUFDakMsTUFBTUMsWUFBd0IsRUFBRTtRQUNoQyxNQUFNLElBQUksQ0FBQ0MsYUFBYSxDQUFDLElBQUksQ0FBQ1osUUFBUSxFQUFFVztRQUN4QyxPQUFPQTtJQUNYO0lBRUEsTUFBY0MsY0FBY0MsR0FBVyxFQUFFRixTQUFxQixFQUFpQjtRQUMzRSxNQUFNRyxVQUFVLE1BQU1yQixrREFBVyxDQUFDc0IsT0FBTyxDQUFDRixLQUFLO1lBQUVHLGVBQWU7UUFBSztRQUVyRSxLQUFLLE1BQU1DLFNBQVNILFFBQVM7WUFDekIsTUFBTUksV0FBV3hCLGdEQUFTLENBQUNtQixLQUFLSSxNQUFNaEIsSUFBSTtZQUUxQyxJQUFJZ0IsTUFBTUcsV0FBVyxJQUFJO2dCQUNyQiwwRUFBMEU7Z0JBQzFFLElBQUlILE1BQU1oQixJQUFJLEtBQUssa0JBQWtCLENBQUNnQixNQUFNaEIsSUFBSSxDQUFDb0IsVUFBVSxDQUFDLE1BQU07b0JBQzlELE1BQU0sSUFBSSxDQUFDVCxhQUFhLENBQUNNLFVBQVVQO2dCQUN2QztZQUNKLE9BQU8sSUFBSU0sTUFBTUssTUFBTSxJQUFJO2dCQUN2QixNQUFNQyxNQUFNN0IsbURBQVksQ0FBQ3VCLE1BQU1oQixJQUFJLEVBQUV3QixXQUFXO2dCQUNoRCwyREFBMkQ7Z0JBQzNELElBQUlDLFdBQVc7Z0JBQ2YsSUFBSUgsUUFBUSxRQUFRRyxXQUFXO3FCQUMxQixJQUFJSCxRQUFRLFNBQVNHLFdBQVc7cUJBQ2hDLElBQUlILFFBQVEsT0FBT0csV0FBVztxQkFDOUIsSUFBSUgsUUFBUSxRQUFRRyxXQUFXO3FCQUMvQixJQUFJSCxRQUFRLFNBQVNHLFdBQVc7Z0JBRXJDLElBQUk5QiwyREFBVUEsQ0FBQzhCLGFBQWE3QiwrREFBY0EsQ0FBQzZCLFdBQVc7b0JBQ2xELElBQUk7d0JBQ0EsTUFBTUMsVUFBVSxNQUFNaEMsb0VBQW1CQSxDQUFDdUIsVUFBVVE7d0JBQ3BEZixVQUFVaUIsSUFBSSxDQUFDOzRCQUNYQyxJQUFJWDs0QkFDSlMsU0FBU0E7NEJBQ1RHLFVBQVU7Z0NBQ05DLFVBQVVkLE1BQU1oQixJQUFJO2dDQUNwQlAsTUFBTXdCO2dDQUNOYyxXQUFXVDtnQ0FDWFUsTUFBTSxDQUFDLE1BQU14QyxrREFBVyxDQUFDeUMsSUFBSSxDQUFDaEIsU0FBUSxFQUFHZSxJQUFJOzRCQUNqRDs0QkFDQUUsUUFBUSxJQUFJLENBQUNsQyxJQUFJOzRCQUNqQm1DLFdBQVcsSUFBSUM7d0JBQ25CO29CQUNKLEVBQUUsT0FBT0MsS0FBSzt3QkFDVi9CLFFBQVFGLEtBQUssQ0FBQyxDQUFDLHVCQUF1QixFQUFFYSxTQUFTLENBQUMsQ0FBQyxFQUFFb0I7b0JBQ3pEO2dCQUNKO1lBQ0o7UUFDSjtJQUNKO0FBQ0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9udmlkaWEtYm90Ly4vc3JjL3JhZy9jb25uZWN0b3JzL2ZpbGUtc3lzdGVtLnRzP2MyMTkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gJ2ZzJztcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCB7IERhdGFTb3VyY2UsIERvY3VtZW50IH0gZnJvbSAnLi4vdHlwZXMnO1xyXG5pbXBvcnQgeyBleHRyYWN0VGV4dEZyb21GaWxlLCBpc1RleHRGaWxlLCBpc0RvY3VtZW50RmlsZSB9IGZyb20gJy4uLy4uL2ZpbGUtcHJvY2Vzc29yJztcclxuXHJcbmV4cG9ydCBjbGFzcyBGaWxlU3lzdGVtRGF0YVNvdXJjZSBpbXBsZW1lbnRzIERhdGFTb3VyY2Uge1xyXG4gICAgbmFtZSA9ICdGaWxlU3lzdGVtJztcclxuICAgIHByaXZhdGUgcm9vdFBhdGg6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihyb290UGF0aDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5yb290UGF0aCA9IHJvb3RQYXRoO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGNvbm5lY3QoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgZGlyZWN0b3J5IGV4aXN0c1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGF3YWl0IGZzLnByb21pc2VzLmFjY2Vzcyh0aGlzLnJvb3RQYXRoKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYERpcmVjdG9yeSBub3QgZm91bmQ6ICR7dGhpcy5yb290UGF0aH1gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coYENvbm5lY3RlZCB0byBGaWxlIFN5c3RlbSBhdCAke3RoaXMucm9vdFBhdGh9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZGlzY29ubmVjdCgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zb2xlLmxvZygnRGlzY29ubmVjdGVkIGZyb20gRmlsZSBTeXN0ZW0nKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBnZXREYXRhKCk6IFByb21pc2U8RG9jdW1lbnRbXT4ge1xyXG4gICAgICAgIGNvbnN0IGRvY3VtZW50czogRG9jdW1lbnRbXSA9IFtdO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuc2NhbkRpcmVjdG9yeSh0aGlzLnJvb3RQYXRoLCBkb2N1bWVudHMpO1xyXG4gICAgICAgIHJldHVybiBkb2N1bWVudHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBzY2FuRGlyZWN0b3J5KGRpcjogc3RyaW5nLCBkb2N1bWVudHM6IERvY3VtZW50W10pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zdCBlbnRyaWVzID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZGRpcihkaXIsIHsgd2l0aEZpbGVUeXBlczogdHJ1ZSB9KTtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBlbnRyeSBvZiBlbnRyaWVzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZ1bGxQYXRoID0gcGF0aC5qb2luKGRpciwgZW50cnkubmFtZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZW50cnkuaXNEaXJlY3RvcnkoKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gUmVjdXJzaXZlbHkgc2NhbiBzdWJkaXJlY3RvcmllcywgaWdub3Jpbmcgbm9kZV9tb2R1bGVzIGFuZCBoaWRkZW4gZmlsZXNcclxuICAgICAgICAgICAgICAgIGlmIChlbnRyeS5uYW1lICE9PSAnbm9kZV9tb2R1bGVzJyAmJiAhZW50cnkubmFtZS5zdGFydHNXaXRoKCcuJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnNjYW5EaXJlY3RvcnkoZnVsbFBhdGgsIGRvY3VtZW50cyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZW50cnkuaXNGaWxlKCkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGV4dCA9IHBhdGguZXh0bmFtZShlbnRyeS5uYW1lKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgLy8gU2ltcGxlIG1pbWUgdHlwZSBpbmZlcmVuY2UgYmFzZWQgb24gZmlsZS1wcm9jZXNzb3IgbG9naWNcclxuICAgICAgICAgICAgICAgIGxldCBtaW1ldHlwZSA9ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nO1xyXG4gICAgICAgICAgICAgICAgaWYgKGV4dCA9PT0gJy50eHQnKSBtaW1ldHlwZSA9ICd0ZXh0L3BsYWluJztcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGV4dCA9PT0gJy5qc29uJykgbWltZXR5cGUgPSAnYXBwbGljYXRpb24vanNvbic7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChleHQgPT09ICcubWQnKSBtaW1ldHlwZSA9ICd0ZXh0L21hcmtkb3duJztcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGV4dCA9PT0gJy5wZGYnKSBtaW1ldHlwZSA9ICdhcHBsaWNhdGlvbi9wZGYnO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZXh0ID09PSAnLmRvY3gnKSBtaW1ldHlwZSA9ICdhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQud29yZHByb2Nlc3NpbmdtbC5kb2N1bWVudCc7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGlzVGV4dEZpbGUobWltZXR5cGUpIHx8IGlzRG9jdW1lbnRGaWxlKG1pbWV0eXBlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCBleHRyYWN0VGV4dEZyb21GaWxlKGZ1bGxQYXRoLCBtaW1ldHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50cy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBmdWxsUGF0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGNvbnRlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRhZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVuYW1lOiBlbnRyeS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IGZ1bGxQYXRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4dGVuc2lvbjogZXh0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpemU6IChhd2FpdCBmcy5wcm9taXNlcy5zdGF0KGZ1bGxQYXRoKSkuc2l6ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZTogdGhpcy5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gcHJvY2VzcyBmaWxlICR7ZnVsbFBhdGh9OmAsIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJmcyIsInBhdGgiLCJleHRyYWN0VGV4dEZyb21GaWxlIiwiaXNUZXh0RmlsZSIsImlzRG9jdW1lbnRGaWxlIiwiRmlsZVN5c3RlbURhdGFTb3VyY2UiLCJjb25zdHJ1Y3RvciIsInJvb3RQYXRoIiwibmFtZSIsImNvbm5lY3QiLCJwcm9taXNlcyIsImFjY2VzcyIsImVycm9yIiwiRXJyb3IiLCJjb25zb2xlIiwibG9nIiwiZGlzY29ubmVjdCIsImdldERhdGEiLCJkb2N1bWVudHMiLCJzY2FuRGlyZWN0b3J5IiwiZGlyIiwiZW50cmllcyIsInJlYWRkaXIiLCJ3aXRoRmlsZVR5cGVzIiwiZW50cnkiLCJmdWxsUGF0aCIsImpvaW4iLCJpc0RpcmVjdG9yeSIsInN0YXJ0c1dpdGgiLCJpc0ZpbGUiLCJleHQiLCJleHRuYW1lIiwidG9Mb3dlckNhc2UiLCJtaW1ldHlwZSIsImNvbnRlbnQiLCJwdXNoIiwiaWQiLCJtZXRhZGF0YSIsImZpbGVuYW1lIiwiZXh0ZW5zaW9uIiwic2l6ZSIsInN0YXQiLCJzb3VyY2UiLCJjcmVhdGVkQXQiLCJEYXRlIiwiZXJyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/rag/connectors/file-system.ts\n");

/***/ }),

/***/ "(rsc)/./src/rag/connectors/postgres.ts":
/*!****************************************!*\
  !*** ./src/rag/connectors/postgres.ts ***!
  \****************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PostgresDataSource: () => (/* binding */ PostgresDataSource)\n/* harmony export */ });\n/* harmony import */ var pg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pg */ \"pg\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([pg__WEBPACK_IMPORTED_MODULE_0__]);\npg__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nclass PostgresDataSource {\n    constructor(config){\n        this.name = \"PostgreSQL Database\";\n        this.isConnected = false;\n        this.config = config;\n        this.pool = new pg__WEBPACK_IMPORTED_MODULE_0__.Pool(config);\n    }\n    async connect() {\n        try {\n            await this.pool.query(\"SELECT NOW()\");\n            this.isConnected = true;\n            console.log(`Connected to PostgreSQL Database at ${this.config.host}:${this.config.port}/${this.config.database}`);\n        } catch (error) {\n            throw new Error(`Failed to connect to PostgreSQL: ${error}`);\n        }\n    }\n    async disconnect() {\n        if (this.isConnected) {\n            await this.pool.end();\n            this.isConnected = false;\n            console.log(\"Disconnected from PostgreSQL Database\");\n        }\n    }\n    async getData() {\n        if (!this.isConnected) {\n            throw new Error(\"Not connected to database\");\n        }\n        const { tableName, columns } = this.config;\n        const metadataCols = columns.metadata ? columns.metadata.join(\", \") : \"\";\n        const selectCols = `${columns.id} as id, ${columns.content} as content${metadataCols ? \", \" + metadataCols : \"\"}`;\n        const query = `SELECT ${selectCols} FROM ${tableName} LIMIT 100`; // Limit for safety in this demo\n        try {\n            const res = await this.pool.query(query);\n            return res.rows.map((row)=>{\n                const metadata = {};\n                if (columns.metadata) {\n                    columns.metadata.forEach((col)=>{\n                        metadata[col] = row[col];\n                    });\n                }\n                metadata.sourceTable = tableName;\n                return {\n                    id: `pg-${tableName}-${row.id}`,\n                    content: String(row.content),\n                    metadata: metadata,\n                    source: this.name,\n                    createdAt: new Date()\n                };\n            });\n        } catch (error) {\n            console.error(\"Error fetching data from PostgreSQL:\", error);\n            throw error;\n        }\n    }\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvcmFnL2Nvbm5lY3RvcnMvcG9zdGdyZXMudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDc0M7QUFXL0IsTUFBTUM7SUFNVEMsWUFBWUMsTUFBc0IsQ0FBRTthQUxwQ0MsT0FBTzthQUdDQyxjQUF1QjtRQUczQixJQUFJLENBQUNGLE1BQU0sR0FBR0E7UUFDZCxJQUFJLENBQUNHLElBQUksR0FBRyxJQUFJTixvQ0FBSUEsQ0FBQ0c7SUFDekI7SUFFQSxNQUFNSSxVQUF5QjtRQUMzQixJQUFJO1lBQ0EsTUFBTSxJQUFJLENBQUNELElBQUksQ0FBQ0UsS0FBSyxDQUFDO1lBQ3RCLElBQUksQ0FBQ0gsV0FBVyxHQUFHO1lBQ25CSSxRQUFRQyxHQUFHLENBQUMsQ0FBQyxvQ0FBb0MsRUFBRSxJQUFJLENBQUNQLE1BQU0sQ0FBQ1EsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUNSLE1BQU0sQ0FBQ1MsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUNULE1BQU0sQ0FBQ1UsUUFBUSxDQUFDLENBQUM7UUFDckgsRUFBRSxPQUFPQyxPQUFPO1lBQ1osTUFBTSxJQUFJQyxNQUFNLENBQUMsaUNBQWlDLEVBQUVELE1BQU0sQ0FBQztRQUMvRDtJQUNKO0lBRUEsTUFBTUUsYUFBNEI7UUFDOUIsSUFBSSxJQUFJLENBQUNYLFdBQVcsRUFBRTtZQUNsQixNQUFNLElBQUksQ0FBQ0MsSUFBSSxDQUFDVyxHQUFHO1lBQ25CLElBQUksQ0FBQ1osV0FBVyxHQUFHO1lBQ25CSSxRQUFRQyxHQUFHLENBQUM7UUFDaEI7SUFDSjtJQUVBLE1BQU1RLFVBQStCO1FBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUNiLFdBQVcsRUFBRTtZQUNuQixNQUFNLElBQUlVLE1BQU07UUFDcEI7UUFFQSxNQUFNLEVBQUVJLFNBQVMsRUFBRUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDakIsTUFBTTtRQUMxQyxNQUFNa0IsZUFBZUQsUUFBUUUsUUFBUSxHQUFHRixRQUFRRSxRQUFRLENBQUNDLElBQUksQ0FBQyxRQUFRO1FBQ3RFLE1BQU1DLGFBQWEsQ0FBQyxFQUFFSixRQUFRSyxFQUFFLENBQUMsUUFBUSxFQUFFTCxRQUFRTSxPQUFPLENBQUMsV0FBVyxFQUFFTCxlQUFlLE9BQU9BLGVBQWUsR0FBRyxDQUFDO1FBRWpILE1BQU1iLFFBQVEsQ0FBQyxPQUFPLEVBQUVnQixXQUFXLE1BQU0sRUFBRUwsVUFBVSxVQUFVLENBQUMsRUFBRSxnQ0FBZ0M7UUFFbEcsSUFBSTtZQUNBLE1BQU1RLE1BQU0sTUFBTSxJQUFJLENBQUNyQixJQUFJLENBQUNFLEtBQUssQ0FBQ0E7WUFFbEMsT0FBT21CLElBQUlDLElBQUksQ0FBQ0MsR0FBRyxDQUFDQyxDQUFBQTtnQkFDaEIsTUFBTVIsV0FBZ0MsQ0FBQztnQkFDdkMsSUFBSUYsUUFBUUUsUUFBUSxFQUFFO29CQUNsQkYsUUFBUUUsUUFBUSxDQUFDUyxPQUFPLENBQUNDLENBQUFBO3dCQUNyQlYsUUFBUSxDQUFDVSxJQUFJLEdBQUdGLEdBQUcsQ0FBQ0UsSUFBSTtvQkFDNUI7Z0JBQ0o7Z0JBQ0FWLFNBQVNXLFdBQVcsR0FBR2Q7Z0JBRXZCLE9BQU87b0JBQ0hNLElBQUksQ0FBQyxHQUFHLEVBQUVOLFVBQVUsQ0FBQyxFQUFFVyxJQUFJTCxFQUFFLENBQUMsQ0FBQztvQkFDL0JDLFNBQVNRLE9BQU9KLElBQUlKLE9BQU87b0JBQzNCSixVQUFVQTtvQkFDVmEsUUFBUSxJQUFJLENBQUMvQixJQUFJO29CQUNqQmdDLFdBQVcsSUFBSUM7Z0JBQ25CO1lBQ0o7UUFDSixFQUFFLE9BQU92QixPQUFPO1lBQ1pMLFFBQVFLLEtBQUssQ0FBQyx3Q0FBd0NBO1lBQ3RELE1BQU1BO1FBQ1Y7SUFDSjtBQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbnZpZGlhLWJvdC8uL3NyYy9yYWcvY29ubmVjdG9ycy9wb3N0Z3Jlcy50cz82MTJjIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdGFTb3VyY2UsIERvY3VtZW50IH0gZnJvbSAnLi4vdHlwZXMnO1xyXG5pbXBvcnQgeyBQb29sLCBQb29sQ29uZmlnIH0gZnJvbSAncGcnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQb3N0Z3Jlc0NvbmZpZyBleHRlbmRzIFBvb2xDb25maWcge1xyXG4gICAgdGFibGVOYW1lOiBzdHJpbmc7XHJcbiAgICBjb2x1bW5zOiB7XHJcbiAgICAgICAgaWQ6IHN0cmluZztcclxuICAgICAgICBjb250ZW50OiBzdHJpbmc7IC8vIFRoZSBjb2x1bW4gdG8gYWxsb3cgc2ltcGxlIGZ1bGwtdGV4dCBzZWFyY2ggb3IganVzdCByZXRyaWV2YWxcclxuICAgICAgICBtZXRhZGF0YT86IHN0cmluZ1tdOyAvLyBDb2x1bW5zIHRvIHN0b3JlIGFzIG1ldGFkYXRhXHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUG9zdGdyZXNEYXRhU291cmNlIGltcGxlbWVudHMgRGF0YVNvdXJjZSB7XHJcbiAgICBuYW1lID0gJ1Bvc3RncmVTUUwgRGF0YWJhc2UnO1xyXG4gICAgcHJpdmF0ZSBwb29sOiBQb29sO1xyXG4gICAgcHJpdmF0ZSBjb25maWc6IFBvc3RncmVzQ29uZmlnO1xyXG4gICAgcHJpdmF0ZSBpc0Nvbm5lY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZzogUG9zdGdyZXNDb25maWcpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLnBvb2wgPSBuZXcgUG9vbChjb25maWcpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGNvbm5lY3QoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5wb29sLnF1ZXJ5KCdTRUxFQ1QgTk9XKCknKTtcclxuICAgICAgICAgICAgdGhpcy5pc0Nvbm5lY3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBDb25uZWN0ZWQgdG8gUG9zdGdyZVNRTCBEYXRhYmFzZSBhdCAke3RoaXMuY29uZmlnLmhvc3R9OiR7dGhpcy5jb25maWcucG9ydH0vJHt0aGlzLmNvbmZpZy5kYXRhYmFzZX1gKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBjb25uZWN0IHRvIFBvc3RncmVTUUw6ICR7ZXJyb3J9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGRpc2Nvbm5lY3QoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNDb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5wb29sLmVuZCgpO1xyXG4gICAgICAgICAgICB0aGlzLmlzQ29ubmVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdEaXNjb25uZWN0ZWQgZnJvbSBQb3N0Z3JlU1FMIERhdGFiYXNlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGdldERhdGEoKTogUHJvbWlzZTxEb2N1bWVudFtdPiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzQ29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGNvbm5lY3RlZCB0byBkYXRhYmFzZScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgeyB0YWJsZU5hbWUsIGNvbHVtbnMgfSA9IHRoaXMuY29uZmlnO1xyXG4gICAgICAgIGNvbnN0IG1ldGFkYXRhQ29scyA9IGNvbHVtbnMubWV0YWRhdGEgPyBjb2x1bW5zLm1ldGFkYXRhLmpvaW4oJywgJykgOiAnJztcclxuICAgICAgICBjb25zdCBzZWxlY3RDb2xzID0gYCR7Y29sdW1ucy5pZH0gYXMgaWQsICR7Y29sdW1ucy5jb250ZW50fSBhcyBjb250ZW50JHttZXRhZGF0YUNvbHMgPyAnLCAnICsgbWV0YWRhdGFDb2xzIDogJyd9YDtcclxuXHJcbiAgICAgICAgY29uc3QgcXVlcnkgPSBgU0VMRUNUICR7c2VsZWN0Q29sc30gRlJPTSAke3RhYmxlTmFtZX0gTElNSVQgMTAwYDsgLy8gTGltaXQgZm9yIHNhZmV0eSBpbiB0aGlzIGRlbW9cclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5wb29sLnF1ZXJ5KHF1ZXJ5KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXMucm93cy5tYXAocm93ID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1ldGFkYXRhOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge307XHJcbiAgICAgICAgICAgICAgICBpZiAoY29sdW1ucy5tZXRhZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnMubWV0YWRhdGEuZm9yRWFjaChjb2wgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRhZGF0YVtjb2xdID0gcm93W2NvbF07XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBtZXRhZGF0YS5zb3VyY2VUYWJsZSA9IHRhYmxlTmFtZTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBgcGctJHt0YWJsZU5hbWV9LSR7cm93LmlkfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogU3RyaW5nKHJvdy5jb250ZW50KSxcclxuICAgICAgICAgICAgICAgICAgICBtZXRhZGF0YTogbWV0YWRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlOiB0aGlzLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBkYXRhIGZyb20gUG9zdGdyZVNRTDonLCBlcnJvcik7XHJcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXSwibmFtZXMiOlsiUG9vbCIsIlBvc3RncmVzRGF0YVNvdXJjZSIsImNvbnN0cnVjdG9yIiwiY29uZmlnIiwibmFtZSIsImlzQ29ubmVjdGVkIiwicG9vbCIsImNvbm5lY3QiLCJxdWVyeSIsImNvbnNvbGUiLCJsb2ciLCJob3N0IiwicG9ydCIsImRhdGFiYXNlIiwiZXJyb3IiLCJFcnJvciIsImRpc2Nvbm5lY3QiLCJlbmQiLCJnZXREYXRhIiwidGFibGVOYW1lIiwiY29sdW1ucyIsIm1ldGFkYXRhQ29scyIsIm1ldGFkYXRhIiwiam9pbiIsInNlbGVjdENvbHMiLCJpZCIsImNvbnRlbnQiLCJyZXMiLCJyb3dzIiwibWFwIiwicm93IiwiZm9yRWFjaCIsImNvbCIsInNvdXJjZVRhYmxlIiwiU3RyaW5nIiwic291cmNlIiwiY3JlYXRlZEF0IiwiRGF0ZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/rag/connectors/postgres.ts\n");

/***/ }),

/***/ "(rsc)/./src/rag/connectors/sql.ts":
/*!***********************************!*\
  !*** ./src/rag/connectors/sql.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MockSQLDataSource: () => (/* binding */ MockSQLDataSource)\n/* harmony export */ });\nclass MockSQLDataSource {\n    constructor(connectionString){\n        this.name = \"SQL Database\";\n        this.isConnected = false;\n        this.connectionString = connectionString;\n    }\n    async connect() {\n        // Simulate connection delay\n        await new Promise((resolve)=>setTimeout(resolve, 500));\n        this.isConnected = true;\n        console.log(`Connected to SQL Database at ${this.connectionString}`);\n    }\n    async disconnect() {\n        this.isConnected = false;\n        console.log(\"Disconnected from SQL Database\");\n    }\n    async getData() {\n        if (!this.isConnected) {\n            throw new Error(\"Not connected to database\");\n        }\n        // Simulate fetching data from a \"users\" table and \"products\" table\n        const mockData = [\n            {\n                id: \"1\",\n                table: \"users\",\n                data: {\n                    name: \"Alice\",\n                    role: \"Admin\",\n                    email: \"alice@example.com\"\n                }\n            },\n            {\n                id: \"2\",\n                table: \"users\",\n                data: {\n                    name: \"Bob\",\n                    role: \"User\",\n                    email: \"bob@example.com\"\n                }\n            },\n            {\n                id: \"101\",\n                table: \"products\",\n                data: {\n                    name: \"GPU H100\",\n                    category: \"Hardware\",\n                    price: 30000\n                }\n            },\n            {\n                id: \"102\",\n                table: \"products\",\n                data: {\n                    name: \"NVIDIA AI Enterprise\",\n                    category: \"Software\",\n                    price: 5000\n                }\n            }\n        ];\n        return mockData.map((row)=>({\n                id: `${row.table}-${row.id}`,\n                content: JSON.stringify(row.data, null, 2),\n                metadata: {\n                    table: row.table,\n                    primaryKey: row.id,\n                    origin: this.connectionString\n                },\n                source: this.name,\n                createdAt: new Date()\n            }));\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvcmFnL2Nvbm5lY3RvcnMvc3FsLnRzIiwibWFwcGluZ3MiOiI7Ozs7QUFFTyxNQUFNQTtJQUtUQyxZQUFZQyxnQkFBd0IsQ0FBRTthQUp0Q0MsT0FBTzthQUVDQyxjQUF1QjtRQUczQixJQUFJLENBQUNGLGdCQUFnQixHQUFHQTtJQUM1QjtJQUVBLE1BQU1HLFVBQXlCO1FBQzNCLDRCQUE0QjtRQUM1QixNQUFNLElBQUlDLFFBQVFDLENBQUFBLFVBQVdDLFdBQVdELFNBQVM7UUFDakQsSUFBSSxDQUFDSCxXQUFXLEdBQUc7UUFDbkJLLFFBQVFDLEdBQUcsQ0FBQyxDQUFDLDZCQUE2QixFQUFFLElBQUksQ0FBQ1IsZ0JBQWdCLENBQUMsQ0FBQztJQUN2RTtJQUVBLE1BQU1TLGFBQTRCO1FBQzlCLElBQUksQ0FBQ1AsV0FBVyxHQUFHO1FBQ25CSyxRQUFRQyxHQUFHLENBQUM7SUFDaEI7SUFFQSxNQUFNRSxVQUErQjtRQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDUixXQUFXLEVBQUU7WUFDbkIsTUFBTSxJQUFJUyxNQUFNO1FBQ3BCO1FBRUEsbUVBQW1FO1FBQ25FLE1BQU1DLFdBQVc7WUFDYjtnQkFBRUMsSUFBSTtnQkFBS0MsT0FBTztnQkFBU0MsTUFBTTtvQkFBRWQsTUFBTTtvQkFBU2UsTUFBTTtvQkFBU0MsT0FBTztnQkFBb0I7WUFBRTtZQUM5RjtnQkFBRUosSUFBSTtnQkFBS0MsT0FBTztnQkFBU0MsTUFBTTtvQkFBRWQsTUFBTTtvQkFBT2UsTUFBTTtvQkFBUUMsT0FBTztnQkFBa0I7WUFBRTtZQUN6RjtnQkFBRUosSUFBSTtnQkFBT0MsT0FBTztnQkFBWUMsTUFBTTtvQkFBRWQsTUFBTTtvQkFBWWlCLFVBQVU7b0JBQVlDLE9BQU87Z0JBQU07WUFBRTtZQUMvRjtnQkFBRU4sSUFBSTtnQkFBT0MsT0FBTztnQkFBWUMsTUFBTTtvQkFBRWQsTUFBTTtvQkFBd0JpQixVQUFVO29CQUFZQyxPQUFPO2dCQUFLO1lBQUU7U0FDN0c7UUFFRCxPQUFPUCxTQUFTUSxHQUFHLENBQUNDLENBQUFBLE1BQVE7Z0JBQ3hCUixJQUFJLENBQUMsRUFBRVEsSUFBSVAsS0FBSyxDQUFDLENBQUMsRUFBRU8sSUFBSVIsRUFBRSxDQUFDLENBQUM7Z0JBQzVCUyxTQUFTQyxLQUFLQyxTQUFTLENBQUNILElBQUlOLElBQUksRUFBRSxNQUFNO2dCQUN4Q1UsVUFBVTtvQkFDTlgsT0FBT08sSUFBSVAsS0FBSztvQkFDaEJZLFlBQVlMLElBQUlSLEVBQUU7b0JBQ2xCYyxRQUFRLElBQUksQ0FBQzNCLGdCQUFnQjtnQkFDakM7Z0JBQ0E0QixRQUFRLElBQUksQ0FBQzNCLElBQUk7Z0JBQ2pCNEIsV0FBVyxJQUFJQztZQUNuQjtJQUNKO0FBQ0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9udmlkaWEtYm90Ly4vc3JjL3JhZy9jb25uZWN0b3JzL3NxbC50cz85YWNmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdGFTb3VyY2UsIERvY3VtZW50IH0gZnJvbSAnLi4vdHlwZXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1vY2tTUUxEYXRhU291cmNlIGltcGxlbWVudHMgRGF0YVNvdXJjZSB7XHJcbiAgICBuYW1lID0gJ1NRTCBEYXRhYmFzZSc7XHJcbiAgICBwcml2YXRlIGNvbm5lY3Rpb25TdHJpbmc6IHN0cmluZztcclxuICAgIHByaXZhdGUgaXNDb25uZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb25uZWN0aW9uU3RyaW5nOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmNvbm5lY3Rpb25TdHJpbmcgPSBjb25uZWN0aW9uU3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGNvbm5lY3QoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgLy8gU2ltdWxhdGUgY29ubmVjdGlvbiBkZWxheVxyXG4gICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCA1MDApKTtcclxuICAgICAgICB0aGlzLmlzQ29ubmVjdGVkID0gdHJ1ZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhgQ29ubmVjdGVkIHRvIFNRTCBEYXRhYmFzZSBhdCAke3RoaXMuY29ubmVjdGlvblN0cmluZ31gKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBkaXNjb25uZWN0KCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHRoaXMuaXNDb25uZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICBjb25zb2xlLmxvZygnRGlzY29ubmVjdGVkIGZyb20gU1FMIERhdGFiYXNlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZ2V0RGF0YSgpOiBQcm9taXNlPERvY3VtZW50W10+IHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNDb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgY29ubmVjdGVkIHRvIGRhdGFiYXNlJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTaW11bGF0ZSBmZXRjaGluZyBkYXRhIGZyb20gYSBcInVzZXJzXCIgdGFibGUgYW5kIFwicHJvZHVjdHNcIiB0YWJsZVxyXG4gICAgICAgIGNvbnN0IG1vY2tEYXRhID0gW1xyXG4gICAgICAgICAgICB7IGlkOiAnMScsIHRhYmxlOiAndXNlcnMnLCBkYXRhOiB7IG5hbWU6ICdBbGljZScsIHJvbGU6ICdBZG1pbicsIGVtYWlsOiAnYWxpY2VAZXhhbXBsZS5jb20nIH0gfSxcclxuICAgICAgICAgICAgeyBpZDogJzInLCB0YWJsZTogJ3VzZXJzJywgZGF0YTogeyBuYW1lOiAnQm9iJywgcm9sZTogJ1VzZXInLCBlbWFpbDogJ2JvYkBleGFtcGxlLmNvbScgfSB9LFxyXG4gICAgICAgICAgICB7IGlkOiAnMTAxJywgdGFibGU6ICdwcm9kdWN0cycsIGRhdGE6IHsgbmFtZTogJ0dQVSBIMTAwJywgY2F0ZWdvcnk6ICdIYXJkd2FyZScsIHByaWNlOiAzMDAwMCB9IH0sXHJcbiAgICAgICAgICAgIHsgaWQ6ICcxMDInLCB0YWJsZTogJ3Byb2R1Y3RzJywgZGF0YTogeyBuYW1lOiAnTlZJRElBIEFJIEVudGVycHJpc2UnLCBjYXRlZ29yeTogJ1NvZnR3YXJlJywgcHJpY2U6IDUwMDAgfSB9XHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG1vY2tEYXRhLm1hcChyb3cgPT4gKHtcclxuICAgICAgICAgICAgaWQ6IGAke3Jvdy50YWJsZX0tJHtyb3cuaWR9YCxcclxuICAgICAgICAgICAgY29udGVudDogSlNPTi5zdHJpbmdpZnkocm93LmRhdGEsIG51bGwsIDIpLCAvLyBDb252ZXJ0IHJvdyB0byB0ZXh0IHJlcHJlc2VudGF0aW9uXHJcbiAgICAgICAgICAgIG1ldGFkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICB0YWJsZTogcm93LnRhYmxlLFxyXG4gICAgICAgICAgICAgICAgcHJpbWFyeUtleTogcm93LmlkLFxyXG4gICAgICAgICAgICAgICAgb3JpZ2luOiB0aGlzLmNvbm5lY3Rpb25TdHJpbmdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc291cmNlOiB0aGlzLm5hbWUsXHJcbiAgICAgICAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKVxyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxufVxyXG4iXSwibmFtZXMiOlsiTW9ja1NRTERhdGFTb3VyY2UiLCJjb25zdHJ1Y3RvciIsImNvbm5lY3Rpb25TdHJpbmciLCJuYW1lIiwiaXNDb25uZWN0ZWQiLCJjb25uZWN0IiwiUHJvbWlzZSIsInJlc29sdmUiLCJzZXRUaW1lb3V0IiwiY29uc29sZSIsImxvZyIsImRpc2Nvbm5lY3QiLCJnZXREYXRhIiwiRXJyb3IiLCJtb2NrRGF0YSIsImlkIiwidGFibGUiLCJkYXRhIiwicm9sZSIsImVtYWlsIiwiY2F0ZWdvcnkiLCJwcmljZSIsIm1hcCIsInJvdyIsImNvbnRlbnQiLCJKU09OIiwic3RyaW5naWZ5IiwibWV0YWRhdGEiLCJwcmltYXJ5S2V5Iiwib3JpZ2luIiwic291cmNlIiwiY3JlYXRlZEF0IiwiRGF0ZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/rag/connectors/sql.ts\n");

/***/ }),

/***/ "(rsc)/./src/rag/connectors/web.ts":
/*!***********************************!*\
  !*** ./src/rag/connectors/web.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   WebDataSource: () => (/* binding */ WebDataSource)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"(rsc)/./node_modules/axios/lib/axios.js\");\n/* harmony import */ var cheerio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheerio */ \"(rsc)/./node_modules/cheerio/dist/esm/index.js\");\n\n\nclass WebDataSource {\n    constructor(url){\n        this.name = \"Web\";\n        this.url = url;\n        this.name = `Web (${url})`;\n    }\n    async connect() {\n    // No persistent connection needed for HTTP\n    }\n    async disconnect() {\n    // No disconnection needed\n    }\n    async getData() {\n        console.log(`WebDataSource: Fetching ${this.url}`);\n        try {\n            const response = await axios__WEBPACK_IMPORTED_MODULE_1__[\"default\"].get(this.url, {\n                headers: {\n                    \"User-Agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36\"\n                },\n                timeout: 10000\n            });\n            const html = response.data;\n            const $ = cheerio__WEBPACK_IMPORTED_MODULE_0__.load(html);\n            // Remove script and style elements\n            $(\"script\").remove();\n            $(\"style\").remove();\n            $(\"noscript\").remove();\n            $(\"nav\").remove();\n            $(\"footer\").remove();\n            $(\"iframe\").remove();\n            // Extract title\n            const title = $(\"title\").text().trim() || this.url;\n            // Extract main content - simplistic approach\n            // Try to find main content containers if possible, otherwise body\n            let content = \"\";\n            const main = $(\"main\");\n            const article = $(\"article\");\n            const contentDiv = $(\"#content, .content, #main, .main\");\n            if (main.length > 0) {\n                content = main.text();\n            } else if (article.length > 0) {\n                content = article.text();\n            } else if (contentDiv.length > 0) {\n                content = contentDiv.text();\n            } else {\n                content = $(\"body\").text();\n            }\n            // Cleanup whitespace\n            content = content.replace(/\\s+/g, \" \").trim();\n            if (!content) {\n                console.warn(`WebDataSource: No content found for ${this.url}`);\n            }\n            const doc = {\n                id: this.url,\n                content: content,\n                metadata: {\n                    title: title,\n                    url: this.url,\n                    sourceType: \"web\",\n                    dateFetched: new Date().toISOString()\n                },\n                source: \"web\",\n                createdAt: new Date()\n            };\n            return [\n                doc\n            ];\n        } catch (error) {\n            console.error(`Failed to fetch URL ${this.url}:`, error.message);\n            throw new Error(`Failed to fetch URL ${this.url}: ${error.message}`);\n        }\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvcmFnL2Nvbm5lY3RvcnMvd2ViLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUMwQjtBQUNTO0FBRzVCLE1BQU1FO0lBSVRDLFlBQVlDLEdBQVcsQ0FBRTthQUh6QkMsT0FBTztRQUlILElBQUksQ0FBQ0QsR0FBRyxHQUFHQTtRQUNYLElBQUksQ0FBQ0MsSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFRCxJQUFJLENBQUMsQ0FBQztJQUM5QjtJQUVBLE1BQU1FLFVBQXlCO0lBQzNCLDJDQUEyQztJQUMvQztJQUVBLE1BQU1DLGFBQTRCO0lBQzlCLDBCQUEwQjtJQUM5QjtJQUVBLE1BQU1DLFVBQStCO1FBQ2pDQyxRQUFRQyxHQUFHLENBQUMsQ0FBQyx3QkFBd0IsRUFBRSxJQUFJLENBQUNOLEdBQUcsQ0FBQyxDQUFDO1FBQ2pELElBQUk7WUFDQSxNQUFNTyxXQUFXLE1BQU1YLDZDQUFLQSxDQUFDWSxHQUFHLENBQUMsSUFBSSxDQUFDUixHQUFHLEVBQUU7Z0JBQ3ZDUyxTQUFTO29CQUNMLGNBQWM7Z0JBQ2xCO2dCQUNBQyxTQUFTO1lBQ2I7WUFDQSxNQUFNQyxPQUFPSixTQUFTSyxJQUFJO1lBQzFCLE1BQU1DLElBQUloQix5Q0FBWSxDQUFDYztZQUV2QixtQ0FBbUM7WUFDbkNFLEVBQUUsVUFBVUUsTUFBTTtZQUNsQkYsRUFBRSxTQUFTRSxNQUFNO1lBQ2pCRixFQUFFLFlBQVlFLE1BQU07WUFDcEJGLEVBQUUsT0FBT0UsTUFBTTtZQUNmRixFQUFFLFVBQVVFLE1BQU07WUFDbEJGLEVBQUUsVUFBVUUsTUFBTTtZQUVsQixnQkFBZ0I7WUFDaEIsTUFBTUMsUUFBUUgsRUFBRSxTQUFTSSxJQUFJLEdBQUdDLElBQUksTUFBTSxJQUFJLENBQUNsQixHQUFHO1lBRWxELDZDQUE2QztZQUM3QyxrRUFBa0U7WUFDbEUsSUFBSW1CLFVBQVU7WUFDZCxNQUFNQyxPQUFPUCxFQUFFO1lBQ2YsTUFBTVEsVUFBVVIsRUFBRTtZQUNsQixNQUFNUyxhQUFhVCxFQUFFO1lBRXJCLElBQUlPLEtBQUtHLE1BQU0sR0FBRyxHQUFHO2dCQUNqQkosVUFBVUMsS0FBS0gsSUFBSTtZQUN2QixPQUFPLElBQUlJLFFBQVFFLE1BQU0sR0FBRyxHQUFHO2dCQUMzQkosVUFBVUUsUUFBUUosSUFBSTtZQUMxQixPQUFPLElBQUlLLFdBQVdDLE1BQU0sR0FBRyxHQUFHO2dCQUM5QkosVUFBVUcsV0FBV0wsSUFBSTtZQUM3QixPQUFPO2dCQUNIRSxVQUFVTixFQUFFLFFBQVFJLElBQUk7WUFDNUI7WUFFQSxxQkFBcUI7WUFDckJFLFVBQVVBLFFBQVFLLE9BQU8sQ0FBQyxRQUFRLEtBQUtOLElBQUk7WUFFM0MsSUFBSSxDQUFDQyxTQUFTO2dCQUNWZCxRQUFRb0IsSUFBSSxDQUFDLENBQUMsb0NBQW9DLEVBQUUsSUFBSSxDQUFDekIsR0FBRyxDQUFDLENBQUM7WUFDbEU7WUFFQSxNQUFNMEIsTUFBZ0I7Z0JBQ2xCQyxJQUFJLElBQUksQ0FBQzNCLEdBQUc7Z0JBQ1ptQixTQUFTQTtnQkFDVFMsVUFBVTtvQkFDTlosT0FBT0E7b0JBQ1BoQixLQUFLLElBQUksQ0FBQ0EsR0FBRztvQkFDYjZCLFlBQVk7b0JBQ1pDLGFBQWEsSUFBSUMsT0FBT0MsV0FBVztnQkFDdkM7Z0JBQ0FDLFFBQVE7Z0JBQ1JDLFdBQVcsSUFBSUg7WUFDbkI7WUFFQSxPQUFPO2dCQUFDTDthQUFJO1FBQ2hCLEVBQUUsT0FBT1MsT0FBWTtZQUNqQjlCLFFBQVE4QixLQUFLLENBQUMsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUNuQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUVtQyxNQUFNQyxPQUFPO1lBQy9ELE1BQU0sSUFBSUMsTUFBTSxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQ3JDLEdBQUcsQ0FBQyxFQUFFLEVBQUVtQyxNQUFNQyxPQUFPLENBQUMsQ0FBQztRQUN2RTtJQUNKO0FBQ0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9udmlkaWEtYm90Ly4vc3JjL3JhZy9jb25uZWN0b3JzL3dlYi50cz8yN2I5Il0sInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xyXG5pbXBvcnQgKiBhcyBjaGVlcmlvIGZyb20gJ2NoZWVyaW8nO1xyXG5pbXBvcnQgeyBEYXRhU291cmNlLCBEb2N1bWVudCB9IGZyb20gJy4uL3R5cGVzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBXZWJEYXRhU291cmNlIGltcGxlbWVudHMgRGF0YVNvdXJjZSB7XHJcbiAgICBuYW1lID0gJ1dlYic7XHJcbiAgICBwcml2YXRlIHVybDogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHVybDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gYFdlYiAoJHt1cmx9KWA7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgY29ubmVjdCgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICAvLyBObyBwZXJzaXN0ZW50IGNvbm5lY3Rpb24gbmVlZGVkIGZvciBIVFRQXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZGlzY29ubmVjdCgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICAvLyBObyBkaXNjb25uZWN0aW9uIG5lZWRlZFxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGdldERhdGEoKTogUHJvbWlzZTxEb2N1bWVudFtdPiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYFdlYkRhdGFTb3VyY2U6IEZldGNoaW5nICR7dGhpcy51cmx9YCk7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5nZXQodGhpcy51cmwsIHtcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAnVXNlci1BZ2VudCc6ICdNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvOTEuMC40NDcyLjEyNCBTYWZhcmkvNTM3LjM2J1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHRpbWVvdXQ6IDEwMDAwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zdCBodG1sID0gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgICAgICAgY29uc3QgJCA9IGNoZWVyaW8ubG9hZChodG1sKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlbW92ZSBzY3JpcHQgYW5kIHN0eWxlIGVsZW1lbnRzXHJcbiAgICAgICAgICAgICQoJ3NjcmlwdCcpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAkKCdzdHlsZScpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAkKCdub3NjcmlwdCcpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAkKCduYXYnKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgJCgnZm9vdGVyJykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICQoJ2lmcmFtZScpLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gRXh0cmFjdCB0aXRsZVxyXG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9ICQoJ3RpdGxlJykudGV4dCgpLnRyaW0oKSB8fCB0aGlzLnVybDtcclxuXHJcbiAgICAgICAgICAgIC8vIEV4dHJhY3QgbWFpbiBjb250ZW50IC0gc2ltcGxpc3RpYyBhcHByb2FjaFxyXG4gICAgICAgICAgICAvLyBUcnkgdG8gZmluZCBtYWluIGNvbnRlbnQgY29udGFpbmVycyBpZiBwb3NzaWJsZSwgb3RoZXJ3aXNlIGJvZHlcclxuICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSAnJztcclxuICAgICAgICAgICAgY29uc3QgbWFpbiA9ICQoJ21haW4nKTtcclxuICAgICAgICAgICAgY29uc3QgYXJ0aWNsZSA9ICQoJ2FydGljbGUnKTtcclxuICAgICAgICAgICAgY29uc3QgY29udGVudERpdiA9ICQoJyNjb250ZW50LCAuY29udGVudCwgI21haW4sIC5tYWluJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAobWFpbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50ID0gbWFpbi50ZXh0KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYXJ0aWNsZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50ID0gYXJ0aWNsZS50ZXh0KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY29udGVudERpdi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50ID0gY29udGVudERpdi50ZXh0KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50ID0gJCgnYm9keScpLnRleHQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQ2xlYW51cCB3aGl0ZXNwYWNlXHJcbiAgICAgICAgICAgIGNvbnRlbnQgPSBjb250ZW50LnJlcGxhY2UoL1xccysvZywgJyAnKS50cmltKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWNvbnRlbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgV2ViRGF0YVNvdXJjZTogTm8gY29udGVudCBmb3VuZCBmb3IgJHt0aGlzLnVybH1gKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgZG9jOiBEb2N1bWVudCA9IHtcclxuICAgICAgICAgICAgICAgIGlkOiB0aGlzLnVybCxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGNvbnRlbnQsXHJcbiAgICAgICAgICAgICAgICBtZXRhZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IHRoaXMudXJsLFxyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZVR5cGU6ICd3ZWInLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGVGZXRjaGVkOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKClcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzb3VyY2U6ICd3ZWInLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gW2RvY107XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gZmV0Y2ggVVJMICR7dGhpcy51cmx9OmAsIGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBmZXRjaCBVUkwgJHt0aGlzLnVybH06ICR7ZXJyb3IubWVzc2FnZX1gKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbImF4aW9zIiwiY2hlZXJpbyIsIldlYkRhdGFTb3VyY2UiLCJjb25zdHJ1Y3RvciIsInVybCIsIm5hbWUiLCJjb25uZWN0IiwiZGlzY29ubmVjdCIsImdldERhdGEiLCJjb25zb2xlIiwibG9nIiwicmVzcG9uc2UiLCJnZXQiLCJoZWFkZXJzIiwidGltZW91dCIsImh0bWwiLCJkYXRhIiwiJCIsImxvYWQiLCJyZW1vdmUiLCJ0aXRsZSIsInRleHQiLCJ0cmltIiwiY29udGVudCIsIm1haW4iLCJhcnRpY2xlIiwiY29udGVudERpdiIsImxlbmd0aCIsInJlcGxhY2UiLCJ3YXJuIiwiZG9jIiwiaWQiLCJtZXRhZGF0YSIsInNvdXJjZVR5cGUiLCJkYXRlRmV0Y2hlZCIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsInNvdXJjZSIsImNyZWF0ZWRBdCIsImVycm9yIiwibWVzc2FnZSIsIkVycm9yIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/rag/connectors/web.ts\n");

/***/ }),

/***/ "(rsc)/./src/rag/index.ts":
/*!**************************!*\
  !*** ./src/rag/index.ts ***!
  \**************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   FileSystemDataSource: () => (/* reexport safe */ _connectors_file_system__WEBPACK_IMPORTED_MODULE_3__.FileSystemDataSource),\n/* harmony export */   MockCMSDataSource: () => (/* reexport safe */ _connectors_cms__WEBPACK_IMPORTED_MODULE_5__.MockCMSDataSource),\n/* harmony export */   MockSQLDataSource: () => (/* reexport safe */ _connectors_sql__WEBPACK_IMPORTED_MODULE_4__.MockSQLDataSource),\n/* harmony export */   PineconeVectorStore: () => (/* reexport safe */ _pinecone_store__WEBPACK_IMPORTED_MODULE_7__.PineconeVectorStore),\n/* harmony export */   PostgresDataSource: () => (/* reexport safe */ _connectors_postgres__WEBPACK_IMPORTED_MODULE_6__.PostgresDataSource),\n/* harmony export */   RAGManager: () => (/* reexport safe */ _rag_manager__WEBPACK_IMPORTED_MODULE_2__.RAGManager),\n/* harmony export */   SimpleVectorStore: () => (/* reexport safe */ _vector_store__WEBPACK_IMPORTED_MODULE_1__.SimpleVectorStore),\n/* harmony export */   WebDataSource: () => (/* reexport safe */ _connectors_web__WEBPACK_IMPORTED_MODULE_8__.WebDataSource)\n/* harmony export */ });\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ \"(rsc)/./src/rag/types.ts\");\n/* harmony import */ var _vector_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vector-store */ \"(rsc)/./src/rag/vector-store.ts\");\n/* harmony import */ var _rag_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rag-manager */ \"(rsc)/./src/rag/rag-manager.ts\");\n/* harmony import */ var _connectors_file_system__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./connectors/file-system */ \"(rsc)/./src/rag/connectors/file-system.ts\");\n/* harmony import */ var _connectors_sql__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./connectors/sql */ \"(rsc)/./src/rag/connectors/sql.ts\");\n/* harmony import */ var _connectors_cms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./connectors/cms */ \"(rsc)/./src/rag/connectors/cms.ts\");\n/* harmony import */ var _connectors_postgres__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./connectors/postgres */ \"(rsc)/./src/rag/connectors/postgres.ts\");\n/* harmony import */ var _pinecone_store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pinecone-store */ \"(rsc)/./src/rag/pinecone-store.ts\");\n/* harmony import */ var _connectors_web__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./connectors/web */ \"(rsc)/./src/rag/connectors/web.ts\");\n/* harmony import */ var _simple_store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./simple-store */ \"(rsc)/./src/rag/simple-store.ts\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_connectors_postgres__WEBPACK_IMPORTED_MODULE_6__]);\n_connectors_postgres__WEBPACK_IMPORTED_MODULE_6__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\n\n\n\n\n\n\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvcmFnL2luZGV4LnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF3QjtBQUNPO0FBQ0Q7QUFDVztBQUNSO0FBQ0E7QUFDSztBQUNMO0FBQ0E7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL252aWRpYS1ib3QvLi9zcmMvcmFnL2luZGV4LnRzPzVmYWEiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0ICogZnJvbSAnLi90eXBlcyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vdmVjdG9yLXN0b3JlJztcclxuZXhwb3J0ICogZnJvbSAnLi9yYWctbWFuYWdlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vY29ubmVjdG9ycy9maWxlLXN5c3RlbSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vY29ubmVjdG9ycy9zcWwnO1xyXG5leHBvcnQgKiBmcm9tICcuL2Nvbm5lY3RvcnMvY21zJztcclxuZXhwb3J0ICogZnJvbSAnLi9jb25uZWN0b3JzL3Bvc3RncmVzJztcclxuZXhwb3J0ICogZnJvbSAnLi9waW5lY29uZS1zdG9yZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vY29ubmVjdG9ycy93ZWInO1xyXG5leHBvcnQgKiBmcm9tICcuL3NpbXBsZS1zdG9yZSc7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/rag/index.ts\n");

/***/ }),

/***/ "(rsc)/./src/rag/pinecone-store.ts":
/*!***********************************!*\
  !*** ./src/rag/pinecone-store.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PineconeVectorStore: () => (/* binding */ PineconeVectorStore)\n/* harmony export */ });\n/* harmony import */ var _pinecone_database_pinecone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pinecone-database/pinecone */ \"(rsc)/./node_modules/@pinecone-database/pinecone/dist/index.js\");\n/* harmony import */ var _pinecone_database_pinecone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_pinecone_database_pinecone__WEBPACK_IMPORTED_MODULE_0__);\n\nclass PineconeVectorStore {\n    constructor(apiKey, indexName){\n        this.client = new _pinecone_database_pinecone__WEBPACK_IMPORTED_MODULE_0__.Pinecone({\n            apiKey: apiKey\n        });\n        this.indexName = indexName;\n    }\n    async addDocuments(documents) {\n        console.log(`Adding ${documents.length} documents to Pinecone Index: ${this.indexName}`);\n        const index = this.client.index(this.indexName);\n        // Convert documents to Pinecone records\n        // Note: In a real app, we need an embedding model (like OpenAI or NVIDIAs) to generate vectors.\n        // For this plumbing demo, we will generate \"dummy\" random vectors to satisfy the API check if needed,\n        // OR warn that embeddings are missing.\n        // Pinecone REQUIRES vectors. \n        console.log(\"NOTE: Real embeddings are required for Pinecone. Using mock random vectors for demonstration.\");\n        // Assuming 1536 dimensions (common for OpenAI text-embedding-ada-002)\n        const records = documents.map((doc)=>({\n                id: doc.id,\n                values: Array.from({\n                    length: 1536\n                }, ()=>Math.random()),\n                metadata: {\n                    ...doc.metadata,\n                    content: doc.content,\n                    source: doc.source\n                }\n            }));\n        // Batch upload (Pinecone limits batch sizes, usually 100-200 is safe)\n        const batchSize = 100;\n        for(let i = 0; i < records.length; i += batchSize){\n            const batch = records.slice(i, i + batchSize);\n            await index.upsert({\n                records: batch\n            });\n        }\n        console.log(`Successfully added documents to Pinecone.`);\n    }\n    async search(query, limit = 5) {\n        console.log(`Searching Pinecone for: \"${query}\"`);\n        const index = this.client.index(this.indexName);\n        // Again, we need a query vector.\n        console.log(\"NOTE: Using mock query vector.\");\n        const queryVector = Array.from({\n            length: 1536\n        }, ()=>Math.random());\n        const results = await index.query({\n            vector: queryVector,\n            topK: limit,\n            includeMetadata: true\n        });\n        return results.matches.map((match)=>{\n            const metadata = match.metadata;\n            return {\n                id: match.id,\n                content: metadata.content || \"\",\n                metadata: metadata,\n                source: metadata.source || \"pinecone\",\n                createdAt: new Date() // Metadata usually doesn't store dates as objects\n            };\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvcmFnL3BpbmVjb25lLXN0b3JlLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUN1RDtBQUVoRCxNQUFNQztJQUlUQyxZQUFZQyxNQUFjLEVBQUVDLFNBQWlCLENBQUU7UUFDM0MsSUFBSSxDQUFDQyxNQUFNLEdBQUcsSUFBSUwsaUVBQVFBLENBQUM7WUFDdkJHLFFBQVFBO1FBQ1o7UUFDQSxJQUFJLENBQUNDLFNBQVMsR0FBR0E7SUFDckI7SUFFQSxNQUFNRSxhQUFhQyxTQUFxQixFQUFpQjtRQUNyREMsUUFBUUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFRixVQUFVRyxNQUFNLENBQUMsOEJBQThCLEVBQUUsSUFBSSxDQUFDTixTQUFTLENBQUMsQ0FBQztRQUV2RixNQUFNTyxRQUFRLElBQUksQ0FBQ04sTUFBTSxDQUFDTSxLQUFLLENBQUMsSUFBSSxDQUFDUCxTQUFTO1FBRTlDLHdDQUF3QztRQUN4QyxnR0FBZ0c7UUFDaEcsc0dBQXNHO1FBQ3RHLHVDQUF1QztRQUN2Qyw4QkFBOEI7UUFFOUJJLFFBQVFDLEdBQUcsQ0FBQztRQUVaLHNFQUFzRTtRQUN0RSxNQUFNRyxVQUFVTCxVQUFVTSxHQUFHLENBQUNDLENBQUFBLE1BQVE7Z0JBQ2xDQyxJQUFJRCxJQUFJQyxFQUFFO2dCQUNWQyxRQUFRQyxNQUFNQyxJQUFJLENBQUM7b0JBQUVSLFFBQVE7Z0JBQUssR0FBRyxJQUFNUyxLQUFLQyxNQUFNO2dCQUN0REMsVUFBVTtvQkFDTixHQUFHUCxJQUFJTyxRQUFRO29CQUNmQyxTQUFTUixJQUFJUSxPQUFPO29CQUNwQkMsUUFBUVQsSUFBSVMsTUFBTTtnQkFDdEI7WUFDSjtRQUVBLHNFQUFzRTtRQUN0RSxNQUFNQyxZQUFZO1FBQ2xCLElBQUssSUFBSUMsSUFBSSxHQUFHQSxJQUFJYixRQUFRRixNQUFNLEVBQUVlLEtBQUtELFVBQVc7WUFDaEQsTUFBTUUsUUFBUWQsUUFBUWUsS0FBSyxDQUFDRixHQUFHQSxJQUFJRDtZQUNuQyxNQUFNYixNQUFNaUIsTUFBTSxDQUFDO2dCQUFFaEIsU0FBU2M7WUFBTTtRQUN4QztRQUVBbEIsUUFBUUMsR0FBRyxDQUFDLENBQUMseUNBQXlDLENBQUM7SUFDM0Q7SUFFQSxNQUFNb0IsT0FBT0MsS0FBYSxFQUFFQyxRQUFnQixDQUFDLEVBQXVCO1FBQ2hFdkIsUUFBUUMsR0FBRyxDQUFDLENBQUMseUJBQXlCLEVBQUVxQixNQUFNLENBQUMsQ0FBQztRQUNoRCxNQUFNbkIsUUFBUSxJQUFJLENBQUNOLE1BQU0sQ0FBQ00sS0FBSyxDQUFDLElBQUksQ0FBQ1AsU0FBUztRQUU5QyxpQ0FBaUM7UUFDakNJLFFBQVFDLEdBQUcsQ0FBQztRQUNaLE1BQU11QixjQUFjZixNQUFNQyxJQUFJLENBQUM7WUFBRVIsUUFBUTtRQUFLLEdBQUcsSUFBTVMsS0FBS0MsTUFBTTtRQUVsRSxNQUFNYSxVQUFVLE1BQU10QixNQUFNbUIsS0FBSyxDQUFDO1lBQzlCSSxRQUFRRjtZQUNSRyxNQUFNSjtZQUNOSyxpQkFBaUI7UUFDckI7UUFFQSxPQUFPSCxRQUFRSSxPQUFPLENBQUN4QixHQUFHLENBQUN5QixDQUFBQTtZQUN2QixNQUFNakIsV0FBV2lCLE1BQU1qQixRQUFRO1lBQy9CLE9BQU87Z0JBQ0hOLElBQUl1QixNQUFNdkIsRUFBRTtnQkFDWk8sU0FBU0QsU0FBU0MsT0FBTyxJQUFJO2dCQUM3QkQsVUFBVUE7Z0JBQ1ZFLFFBQVFGLFNBQVNFLE1BQU0sSUFBSTtnQkFDM0JnQixXQUFXLElBQUlDLE9BQU8sa0RBQWtEO1lBQzVFO1FBQ0o7SUFDSjtBQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbnZpZGlhLWJvdC8uL3NyYy9yYWcvcGluZWNvbmUtc3RvcmUudHM/YzZjNyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWZWN0b3JTdG9yZSwgRG9jdW1lbnQgfSBmcm9tICcuL3R5cGVzJztcclxuaW1wb3J0IHsgUGluZWNvbmUgfSBmcm9tICdAcGluZWNvbmUtZGF0YWJhc2UvcGluZWNvbmUnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBpbmVjb25lVmVjdG9yU3RvcmUgaW1wbGVtZW50cyBWZWN0b3JTdG9yZSB7XHJcbiAgICBwcml2YXRlIGNsaWVudDogUGluZWNvbmU7XHJcbiAgICBwcml2YXRlIGluZGV4TmFtZTogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGFwaUtleTogc3RyaW5nLCBpbmRleE5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuY2xpZW50ID0gbmV3IFBpbmVjb25lKHtcclxuICAgICAgICAgICAgYXBpS2V5OiBhcGlLZXlcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmluZGV4TmFtZSA9IGluZGV4TmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBhZGREb2N1bWVudHMoZG9jdW1lbnRzOiBEb2N1bWVudFtdKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYEFkZGluZyAke2RvY3VtZW50cy5sZW5ndGh9IGRvY3VtZW50cyB0byBQaW5lY29uZSBJbmRleDogJHt0aGlzLmluZGV4TmFtZX1gKTtcclxuXHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmNsaWVudC5pbmRleCh0aGlzLmluZGV4TmFtZSk7XHJcblxyXG4gICAgICAgIC8vIENvbnZlcnQgZG9jdW1lbnRzIHRvIFBpbmVjb25lIHJlY29yZHNcclxuICAgICAgICAvLyBOb3RlOiBJbiBhIHJlYWwgYXBwLCB3ZSBuZWVkIGFuIGVtYmVkZGluZyBtb2RlbCAobGlrZSBPcGVuQUkgb3IgTlZJRElBcykgdG8gZ2VuZXJhdGUgdmVjdG9ycy5cclxuICAgICAgICAvLyBGb3IgdGhpcyBwbHVtYmluZyBkZW1vLCB3ZSB3aWxsIGdlbmVyYXRlIFwiZHVtbXlcIiByYW5kb20gdmVjdG9ycyB0byBzYXRpc2Z5IHRoZSBBUEkgY2hlY2sgaWYgbmVlZGVkLFxyXG4gICAgICAgIC8vIE9SIHdhcm4gdGhhdCBlbWJlZGRpbmdzIGFyZSBtaXNzaW5nLlxyXG4gICAgICAgIC8vIFBpbmVjb25lIFJFUVVJUkVTIHZlY3RvcnMuIFxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIk5PVEU6IFJlYWwgZW1iZWRkaW5ncyBhcmUgcmVxdWlyZWQgZm9yIFBpbmVjb25lLiBVc2luZyBtb2NrIHJhbmRvbSB2ZWN0b3JzIGZvciBkZW1vbnN0cmF0aW9uLlwiKTtcclxuXHJcbiAgICAgICAgLy8gQXNzdW1pbmcgMTUzNiBkaW1lbnNpb25zIChjb21tb24gZm9yIE9wZW5BSSB0ZXh0LWVtYmVkZGluZy1hZGEtMDAyKVxyXG4gICAgICAgIGNvbnN0IHJlY29yZHMgPSBkb2N1bWVudHMubWFwKGRvYyA9PiAoe1xyXG4gICAgICAgICAgICBpZDogZG9jLmlkLFxyXG4gICAgICAgICAgICB2YWx1ZXM6IEFycmF5LmZyb20oeyBsZW5ndGg6IDE1MzYgfSwgKCkgPT4gTWF0aC5yYW5kb20oKSksIC8vIE1PQ0sgVkVDVE9SU1xyXG4gICAgICAgICAgICBtZXRhZGF0YToge1xyXG4gICAgICAgICAgICAgICAgLi4uZG9jLm1ldGFkYXRhLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogZG9jLmNvbnRlbnQsIC8vIHN0b3JpbmcgY29udGVudCBpbiBtZXRhZGF0YSBmb3IgcmV0cmlldmFsXHJcbiAgICAgICAgICAgICAgICBzb3VyY2U6IGRvYy5zb3VyY2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgLy8gQmF0Y2ggdXBsb2FkIChQaW5lY29uZSBsaW1pdHMgYmF0Y2ggc2l6ZXMsIHVzdWFsbHkgMTAwLTIwMCBpcyBzYWZlKVxyXG4gICAgICAgIGNvbnN0IGJhdGNoU2l6ZSA9IDEwMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlY29yZHMubGVuZ3RoOyBpICs9IGJhdGNoU2l6ZSkge1xyXG4gICAgICAgICAgICBjb25zdCBiYXRjaCA9IHJlY29yZHMuc2xpY2UoaSwgaSArIGJhdGNoU2l6ZSk7XHJcbiAgICAgICAgICAgIGF3YWl0IGluZGV4LnVwc2VydCh7IHJlY29yZHM6IGJhdGNoIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coYFN1Y2Nlc3NmdWxseSBhZGRlZCBkb2N1bWVudHMgdG8gUGluZWNvbmUuYCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgc2VhcmNoKHF1ZXJ5OiBzdHJpbmcsIGxpbWl0OiBudW1iZXIgPSA1KTogUHJvbWlzZTxEb2N1bWVudFtdPiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYFNlYXJjaGluZyBQaW5lY29uZSBmb3I6IFwiJHtxdWVyeX1cImApO1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jbGllbnQuaW5kZXgodGhpcy5pbmRleE5hbWUpO1xyXG5cclxuICAgICAgICAvLyBBZ2Fpbiwgd2UgbmVlZCBhIHF1ZXJ5IHZlY3Rvci5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIk5PVEU6IFVzaW5nIG1vY2sgcXVlcnkgdmVjdG9yLlwiKTtcclxuICAgICAgICBjb25zdCBxdWVyeVZlY3RvciA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDE1MzYgfSwgKCkgPT4gTWF0aC5yYW5kb20oKSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCBpbmRleC5xdWVyeSh7XHJcbiAgICAgICAgICAgIHZlY3RvcjogcXVlcnlWZWN0b3IsXHJcbiAgICAgICAgICAgIHRvcEs6IGxpbWl0LFxyXG4gICAgICAgICAgICBpbmNsdWRlTWV0YWRhdGE6IHRydWVcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdHMubWF0Y2hlcy5tYXAobWF0Y2ggPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBtZXRhZGF0YSA9IG1hdGNoLm1ldGFkYXRhIGFzIFJlY29yZDxzdHJpbmcsIGFueT47XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBpZDogbWF0Y2guaWQsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiBtZXRhZGF0YS5jb250ZW50IHx8ICcnLFxyXG4gICAgICAgICAgICAgICAgbWV0YWRhdGE6IG1ldGFkYXRhLFxyXG4gICAgICAgICAgICAgICAgc291cmNlOiBtZXRhZGF0YS5zb3VyY2UgfHwgJ3BpbmVjb25lJyxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKSAvLyBNZXRhZGF0YSB1c3VhbGx5IGRvZXNuJ3Qgc3RvcmUgZGF0ZXMgYXMgb2JqZWN0c1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJQaW5lY29uZSIsIlBpbmVjb25lVmVjdG9yU3RvcmUiLCJjb25zdHJ1Y3RvciIsImFwaUtleSIsImluZGV4TmFtZSIsImNsaWVudCIsImFkZERvY3VtZW50cyIsImRvY3VtZW50cyIsImNvbnNvbGUiLCJsb2ciLCJsZW5ndGgiLCJpbmRleCIsInJlY29yZHMiLCJtYXAiLCJkb2MiLCJpZCIsInZhbHVlcyIsIkFycmF5IiwiZnJvbSIsIk1hdGgiLCJyYW5kb20iLCJtZXRhZGF0YSIsImNvbnRlbnQiLCJzb3VyY2UiLCJiYXRjaFNpemUiLCJpIiwiYmF0Y2giLCJzbGljZSIsInVwc2VydCIsInNlYXJjaCIsInF1ZXJ5IiwibGltaXQiLCJxdWVyeVZlY3RvciIsInJlc3VsdHMiLCJ2ZWN0b3IiLCJ0b3BLIiwiaW5jbHVkZU1ldGFkYXRhIiwibWF0Y2hlcyIsIm1hdGNoIiwiY3JlYXRlZEF0IiwiRGF0ZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/rag/pinecone-store.ts\n");

/***/ }),

/***/ "(rsc)/./src/rag/rag-manager.ts":
/*!********************************!*\
  !*** ./src/rag/rag-manager.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   RAGManager: () => (/* binding */ RAGManager)\n/* harmony export */ });\nclass RAGManager {\n    constructor(vectorStore){\n        this.sources = [];\n        this.vectorStore = vectorStore;\n    }\n    registerSource(source) {\n        this.sources.push(source);\n        console.log(`Registered Data Source: ${source.name}`);\n    }\n    async ingestAll() {\n        console.log(\"Starting ingestion from all sources...\");\n        for (const source of this.sources){\n            try {\n                await source.connect();\n                console.log(`Fetching data from ${source.name}...`);\n                const documents = await source.getData();\n                console.log(`Retrieved ${documents.length} documents from ${source.name}.`);\n                await this.vectorStore.addDocuments(documents);\n                await source.disconnect();\n            } catch (error) {\n                console.error(`Error ingesting from ${source.name}:`, error);\n            }\n        }\n        console.log(\"Ingestion complete.\");\n    }\n    async retrieve(query) {\n        return this.vectorStore.search(query);\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvcmFnL3JhZy1tYW5hZ2VyLnRzIiwibWFwcGluZ3MiOiI7Ozs7QUFFTyxNQUFNQTtJQUlUQyxZQUFZQyxXQUF3QixDQUFFO2FBSDlCQyxVQUF3QixFQUFFO1FBSTlCLElBQUksQ0FBQ0QsV0FBVyxHQUFHQTtJQUN2QjtJQUVBRSxlQUFlQyxNQUFrQixFQUFFO1FBQy9CLElBQUksQ0FBQ0YsT0FBTyxDQUFDRyxJQUFJLENBQUNEO1FBQ2xCRSxRQUFRQyxHQUFHLENBQUMsQ0FBQyx3QkFBd0IsRUFBRUgsT0FBT0ksSUFBSSxDQUFDLENBQUM7SUFDeEQ7SUFFQSxNQUFNQyxZQUEyQjtRQUM3QkgsUUFBUUMsR0FBRyxDQUFDO1FBQ1osS0FBSyxNQUFNSCxVQUFVLElBQUksQ0FBQ0YsT0FBTyxDQUFFO1lBQy9CLElBQUk7Z0JBQ0EsTUFBTUUsT0FBT00sT0FBTztnQkFDcEJKLFFBQVFDLEdBQUcsQ0FBQyxDQUFDLG1CQUFtQixFQUFFSCxPQUFPSSxJQUFJLENBQUMsR0FBRyxDQUFDO2dCQUNsRCxNQUFNRyxZQUFZLE1BQU1QLE9BQU9RLE9BQU87Z0JBQ3RDTixRQUFRQyxHQUFHLENBQUMsQ0FBQyxVQUFVLEVBQUVJLFVBQVVFLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRVQsT0FBT0ksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFFMUUsTUFBTSxJQUFJLENBQUNQLFdBQVcsQ0FBQ2EsWUFBWSxDQUFDSDtnQkFDcEMsTUFBTVAsT0FBT1csVUFBVTtZQUMzQixFQUFFLE9BQU9DLE9BQU87Z0JBQ1pWLFFBQVFVLEtBQUssQ0FBQyxDQUFDLHFCQUFxQixFQUFFWixPQUFPSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUVRO1lBQzFEO1FBQ0o7UUFDQVYsUUFBUUMsR0FBRyxDQUFDO0lBQ2hCO0lBRUEsTUFBTVUsU0FBU0MsS0FBYSxFQUF1QjtRQUMvQyxPQUFPLElBQUksQ0FBQ2pCLFdBQVcsQ0FBQ2tCLE1BQU0sQ0FBQ0Q7SUFDbkM7QUFDSiIsInNvdXJjZXMiOlsid2VicGFjazovL252aWRpYS1ib3QvLi9zcmMvcmFnL3JhZy1tYW5hZ2VyLnRzPzQ3NzAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0YVNvdXJjZSwgVmVjdG9yU3RvcmUsIERvY3VtZW50IH0gZnJvbSAnLi90eXBlcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgUkFHTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHNvdXJjZXM6IERhdGFTb3VyY2VbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSB2ZWN0b3JTdG9yZTogVmVjdG9yU3RvcmU7XHJcblxyXG4gICAgY29uc3RydWN0b3IodmVjdG9yU3RvcmU6IFZlY3RvclN0b3JlKSB7XHJcbiAgICAgICAgdGhpcy52ZWN0b3JTdG9yZSA9IHZlY3RvclN0b3JlO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyU291cmNlKHNvdXJjZTogRGF0YVNvdXJjZSkge1xyXG4gICAgICAgIHRoaXMuc291cmNlcy5wdXNoKHNvdXJjZSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coYFJlZ2lzdGVyZWQgRGF0YSBTb3VyY2U6ICR7c291cmNlLm5hbWV9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgaW5nZXN0QWxsKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdTdGFydGluZyBpbmdlc3Rpb24gZnJvbSBhbGwgc291cmNlcy4uLicpO1xyXG4gICAgICAgIGZvciAoY29uc3Qgc291cmNlIG9mIHRoaXMuc291cmNlcykge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgc291cmNlLmNvbm5lY3QoKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBGZXRjaGluZyBkYXRhIGZyb20gJHtzb3VyY2UubmFtZX0uLi5gKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRvY3VtZW50cyA9IGF3YWl0IHNvdXJjZS5nZXREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgUmV0cmlldmVkICR7ZG9jdW1lbnRzLmxlbmd0aH0gZG9jdW1lbnRzIGZyb20gJHtzb3VyY2UubmFtZX0uYCk7XHJcblxyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy52ZWN0b3JTdG9yZS5hZGREb2N1bWVudHMoZG9jdW1lbnRzKTtcclxuICAgICAgICAgICAgICAgIGF3YWl0IHNvdXJjZS5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBpbmdlc3RpbmcgZnJvbSAke3NvdXJjZS5uYW1lfTpgLCBlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0luZ2VzdGlvbiBjb21wbGV0ZS4nKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyByZXRyaWV2ZShxdWVyeTogc3RyaW5nKTogUHJvbWlzZTxEb2N1bWVudFtdPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmVjdG9yU3RvcmUuc2VhcmNoKHF1ZXJ5KTtcclxuICAgIH1cclxufVxyXG4iXSwibmFtZXMiOlsiUkFHTWFuYWdlciIsImNvbnN0cnVjdG9yIiwidmVjdG9yU3RvcmUiLCJzb3VyY2VzIiwicmVnaXN0ZXJTb3VyY2UiLCJzb3VyY2UiLCJwdXNoIiwiY29uc29sZSIsImxvZyIsIm5hbWUiLCJpbmdlc3RBbGwiLCJjb25uZWN0IiwiZG9jdW1lbnRzIiwiZ2V0RGF0YSIsImxlbmd0aCIsImFkZERvY3VtZW50cyIsImRpc2Nvbm5lY3QiLCJlcnJvciIsInJldHJpZXZlIiwicXVlcnkiLCJzZWFyY2giXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/rag/rag-manager.ts\n");

/***/ }),

/***/ "(rsc)/./src/rag/simple-store.ts":
/*!*********************************!*\
  !*** ./src/rag/simple-store.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SimpleVectorStore: () => (/* binding */ SimpleVectorStore)\n/* harmony export */ });\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst DB_PATH = path__WEBPACK_IMPORTED_MODULE_1___default().join(process.cwd(), \"data\", \"simple-vectors.json\");\nclass SimpleVectorStore {\n    constructor(){\n        try {\n            const dir = path__WEBPACK_IMPORTED_MODULE_1___default().dirname(DB_PATH);\n            if (!fs__WEBPACK_IMPORTED_MODULE_0___default().existsSync(dir)) {\n                fs__WEBPACK_IMPORTED_MODULE_0___default().mkdirSync(dir, {\n                    recursive: true\n                });\n            }\n        } catch (e) {\n            console.error(\"SimpleVectorStore init error:\", e);\n        }\n    }\n    async addDocuments(documents) {\n        let currentDocs = [];\n        try {\n            if (fs__WEBPACK_IMPORTED_MODULE_0___default().existsSync(DB_PATH)) {\n                const data = fs__WEBPACK_IMPORTED_MODULE_0___default().readFileSync(DB_PATH, \"utf-8\");\n                currentDocs = JSON.parse(data);\n            }\n        } catch (e) {\n            console.warn(\"Could not read existing vector store, starting new.\");\n        }\n        // Remove old versions of documents with same ID\n        const newIds = new Set(documents.map((d)=>d.id));\n        const keptDocs = currentDocs.filter((d)=>!newIds.has(d.id));\n        const combined = [\n            ...keptDocs,\n            ...documents\n        ];\n        fs__WEBPACK_IMPORTED_MODULE_0___default().writeFileSync(DB_PATH, JSON.stringify(combined, null, 2));\n        console.log(`Saved ${documents.length} docs to SimpleVectorStore. Total: ${combined.length}`);\n    }\n    async search(query, limit = 3) {\n        if (!fs__WEBPACK_IMPORTED_MODULE_0___default().existsSync(DB_PATH)) return [];\n        let docs = [];\n        try {\n            docs = JSON.parse(fs__WEBPACK_IMPORTED_MODULE_0___default().readFileSync(DB_PATH, \"utf-8\"));\n        } catch (e) {\n            return [];\n        }\n        const terms = query.toLowerCase().split(/\\s+/).filter((t)=>t.length > 2);\n        if (terms.length === 0) return []; // Return nothing if query is empty\n        const scored = docs.map((doc)=>{\n            const content = (doc.content || \"\").toLowerCase();\n            const title = (doc.metadata?.title || \"\").toString().toLowerCase();\n            let score = 0;\n            terms.forEach((term)=>{\n                // Count occurrences\n                const regex = new RegExp(term.replace(/[.*+?^${}()|[\\]\\\\]/g, \"\\\\$&\"), \"g\");\n                const contentMatches = (content.match(regex) || []).length;\n                const titleMatches = (title.match(regex) || []).length;\n                score += contentMatches + titleMatches * 5;\n            });\n            return {\n                doc,\n                score\n            };\n        });\n        const results = scored.filter((s)=>s.score > 0).sort((a, b)=>b.score - a.score);\n        return results.slice(0, limit).map((s)=>s.doc);\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvcmFnL3NpbXBsZS1zdG9yZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUVvQjtBQUNJO0FBRXhCLE1BQU1FLFVBQVVELGdEQUFTLENBQUNHLFFBQVFDLEdBQUcsSUFBSSxRQUFRO0FBRTFDLE1BQU1DO0lBQ1RDLGFBQWM7UUFDVixJQUFJO1lBQ0EsTUFBTUMsTUFBTVAsbURBQVksQ0FBQ0M7WUFDekIsSUFBSSxDQUFDRixvREFBYSxDQUFDUSxNQUFNO2dCQUNyQlIsbURBQVksQ0FBQ1EsS0FBSztvQkFBRUksV0FBVztnQkFBSztZQUN4QztRQUNKLEVBQUUsT0FBT0MsR0FBRztZQUNSQyxRQUFRQyxLQUFLLENBQUMsaUNBQWlDRjtRQUNuRDtJQUNKO0lBRUEsTUFBTUcsYUFBYUMsU0FBcUIsRUFBaUI7UUFDckQsSUFBSUMsY0FBMEIsRUFBRTtRQUNoQyxJQUFJO1lBQ0EsSUFBSWxCLG9EQUFhLENBQUNFLFVBQVU7Z0JBQ3hCLE1BQU1pQixPQUFPbkIsc0RBQWUsQ0FBQ0UsU0FBUztnQkFDdENnQixjQUFjRyxLQUFLQyxLQUFLLENBQUNIO1lBQzdCO1FBQ0osRUFBRSxPQUFPTixHQUFHO1lBQ1JDLFFBQVFTLElBQUksQ0FBQztRQUNqQjtRQUVBLGdEQUFnRDtRQUNoRCxNQUFNQyxTQUFTLElBQUlDLElBQUlSLFVBQVVTLEdBQUcsQ0FBQ0MsQ0FBQUEsSUFBS0EsRUFBRUMsRUFBRTtRQUM5QyxNQUFNQyxXQUFXWCxZQUFZWSxNQUFNLENBQUNILENBQUFBLElBQUssQ0FBQ0gsT0FBT08sR0FBRyxDQUFDSixFQUFFQyxFQUFFO1FBRXpELE1BQU1JLFdBQVc7ZUFBSUg7ZUFBYVo7U0FBVTtRQUU1Q2pCLHVEQUFnQixDQUFDRSxTQUFTbUIsS0FBS2EsU0FBUyxDQUFDRixVQUFVLE1BQU07UUFDekRsQixRQUFRcUIsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFbEIsVUFBVW1CLE1BQU0sQ0FBQyxtQ0FBbUMsRUFBRUosU0FBU0ksTUFBTSxDQUFDLENBQUM7SUFDaEc7SUFFQSxNQUFNQyxPQUFPQyxLQUFhLEVBQUVDLFFBQWdCLENBQUMsRUFBdUI7UUFDaEUsSUFBSSxDQUFDdkMsb0RBQWEsQ0FBQ0UsVUFBVSxPQUFPLEVBQUU7UUFDdEMsSUFBSXNDLE9BQW1CLEVBQUU7UUFDekIsSUFBSTtZQUNBQSxPQUFPbkIsS0FBS0MsS0FBSyxDQUFDdEIsc0RBQWUsQ0FBQ0UsU0FBUztRQUMvQyxFQUFFLE9BQU9XLEdBQUc7WUFBRSxPQUFPLEVBQUU7UUFBRTtRQUV6QixNQUFNNEIsUUFBUUgsTUFBTUksV0FBVyxHQUFHQyxLQUFLLENBQUMsT0FBT2IsTUFBTSxDQUFDYyxDQUFBQSxJQUFLQSxFQUFFUixNQUFNLEdBQUc7UUFDdEUsSUFBSUssTUFBTUwsTUFBTSxLQUFLLEdBQUcsT0FBTyxFQUFFLEVBQUUsbUNBQW1DO1FBRXRFLE1BQU1TLFNBQVNMLEtBQUtkLEdBQUcsQ0FBQ29CLENBQUFBO1lBQ3BCLE1BQU1DLFVBQVUsQ0FBQ0QsSUFBSUMsT0FBTyxJQUFJLEVBQUMsRUFBR0wsV0FBVztZQUMvQyxNQUFNTSxRQUFRLENBQUNGLElBQUlHLFFBQVEsRUFBRUQsU0FBUyxFQUFDLEVBQUdFLFFBQVEsR0FBR1IsV0FBVztZQUVoRSxJQUFJUyxRQUFRO1lBQ1pWLE1BQU1XLE9BQU8sQ0FBQ0MsQ0FBQUE7Z0JBQ1Ysb0JBQW9CO2dCQUNwQixNQUFNQyxRQUFRLElBQUlDLE9BQU9GLEtBQUtHLE9BQU8sQ0FBQyx1QkFBdUIsU0FBUztnQkFDdEUsTUFBTUMsaUJBQWlCLENBQUNWLFFBQVFXLEtBQUssQ0FBQ0osVUFBVSxFQUFFLEVBQUVsQixNQUFNO2dCQUMxRCxNQUFNdUIsZUFBZSxDQUFDWCxNQUFNVSxLQUFLLENBQUNKLFVBQVUsRUFBRSxFQUFFbEIsTUFBTTtnQkFFdERlLFNBQVNNLGlCQUFrQkUsZUFBZTtZQUM5QztZQUNBLE9BQU87Z0JBQUViO2dCQUFLSztZQUFNO1FBQ3hCO1FBRUEsTUFBTVMsVUFBVWYsT0FDWGYsTUFBTSxDQUFDK0IsQ0FBQUEsSUFBS0EsRUFBRVYsS0FBSyxHQUFHLEdBQ3RCVyxJQUFJLENBQUMsQ0FBQ0MsR0FBR0MsSUFBTUEsRUFBRWIsS0FBSyxHQUFHWSxFQUFFWixLQUFLO1FBRXJDLE9BQU9TLFFBQVFLLEtBQUssQ0FBQyxHQUFHMUIsT0FBT2IsR0FBRyxDQUFDbUMsQ0FBQUEsSUFBS0EsRUFBRWYsR0FBRztJQUNqRDtBQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbnZpZGlhLWJvdC8uL3NyYy9yYWcvc2ltcGxlLXN0b3JlLnRzPzhkZjYiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IFZlY3RvclN0b3JlLCBEb2N1bWVudCB9IGZyb20gJy4vdHlwZXMnO1xyXG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcclxuXHJcbmNvbnN0IERCX1BBVEggPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ2RhdGEnLCAnc2ltcGxlLXZlY3RvcnMuanNvbicpO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNpbXBsZVZlY3RvclN0b3JlIGltcGxlbWVudHMgVmVjdG9yU3RvcmUge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgZGlyID0gcGF0aC5kaXJuYW1lKERCX1BBVEgpO1xyXG4gICAgICAgICAgICBpZiAoIWZzLmV4aXN0c1N5bmMoZGlyKSkge1xyXG4gICAgICAgICAgICAgICAgZnMubWtkaXJTeW5jKGRpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1NpbXBsZVZlY3RvclN0b3JlIGluaXQgZXJyb3I6JywgZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGFkZERvY3VtZW50cyhkb2N1bWVudHM6IERvY3VtZW50W10pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBsZXQgY3VycmVudERvY3M6IERvY3VtZW50W10gPSBbXTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZnMuZXhpc3RzU3luYyhEQl9QQVRIKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IGZzLnJlYWRGaWxlU3luYyhEQl9QQVRILCAndXRmLTgnKTtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnREb2NzID0gSlNPTi5wYXJzZShkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKCdDb3VsZCBub3QgcmVhZCBleGlzdGluZyB2ZWN0b3Igc3RvcmUsIHN0YXJ0aW5nIG5ldy4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSBvbGQgdmVyc2lvbnMgb2YgZG9jdW1lbnRzIHdpdGggc2FtZSBJRFxyXG4gICAgICAgIGNvbnN0IG5ld0lkcyA9IG5ldyBTZXQoZG9jdW1lbnRzLm1hcChkID0+IGQuaWQpKTtcclxuICAgICAgICBjb25zdCBrZXB0RG9jcyA9IGN1cnJlbnREb2NzLmZpbHRlcihkID0+ICFuZXdJZHMuaGFzKGQuaWQpKTtcclxuXHJcbiAgICAgICAgY29uc3QgY29tYmluZWQgPSBbLi4ua2VwdERvY3MsIC4uLmRvY3VtZW50c107XHJcblxyXG4gICAgICAgIGZzLndyaXRlRmlsZVN5bmMoREJfUEFUSCwgSlNPTi5zdHJpbmdpZnkoY29tYmluZWQsIG51bGwsIDIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhgU2F2ZWQgJHtkb2N1bWVudHMubGVuZ3RofSBkb2NzIHRvIFNpbXBsZVZlY3RvclN0b3JlLiBUb3RhbDogJHtjb21iaW5lZC5sZW5ndGh9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgc2VhcmNoKHF1ZXJ5OiBzdHJpbmcsIGxpbWl0OiBudW1iZXIgPSAzKTogUHJvbWlzZTxEb2N1bWVudFtdPiB7XHJcbiAgICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKERCX1BBVEgpKSByZXR1cm4gW107XHJcbiAgICAgICAgbGV0IGRvY3M6IERvY3VtZW50W10gPSBbXTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBkb2NzID0gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoREJfUEFUSCwgJ3V0Zi04JykpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgcmV0dXJuIFtdOyB9XHJcblxyXG4gICAgICAgIGNvbnN0IHRlcm1zID0gcXVlcnkudG9Mb3dlckNhc2UoKS5zcGxpdCgvXFxzKy8pLmZpbHRlcih0ID0+IHQubGVuZ3RoID4gMik7XHJcbiAgICAgICAgaWYgKHRlcm1zLmxlbmd0aCA9PT0gMCkgcmV0dXJuIFtdOyAvLyBSZXR1cm4gbm90aGluZyBpZiBxdWVyeSBpcyBlbXB0eVxyXG5cclxuICAgICAgICBjb25zdCBzY29yZWQgPSBkb2NzLm1hcChkb2MgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gKGRvYy5jb250ZW50IHx8ICcnKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9IChkb2MubWV0YWRhdGE/LnRpdGxlIHx8ICcnKS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2NvcmUgPSAwO1xyXG4gICAgICAgICAgICB0ZXJtcy5mb3JFYWNoKHRlcm0gPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gQ291bnQgb2NjdXJyZW5jZXNcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cCh0ZXJtLnJlcGxhY2UoL1suKis/XiR7fSgpfFtcXF1cXFxcXS9nLCAnXFxcXCQmJyksICdnJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50TWF0Y2hlcyA9IChjb250ZW50Lm1hdGNoKHJlZ2V4KSB8fCBbXSkubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGl0bGVNYXRjaGVzID0gKHRpdGxlLm1hdGNoKHJlZ2V4KSB8fCBbXSkubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgICAgIHNjb3JlICs9IGNvbnRlbnRNYXRjaGVzICsgKHRpdGxlTWF0Y2hlcyAqIDUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHsgZG9jLCBzY29yZSB9O1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCByZXN1bHRzID0gc2NvcmVkXHJcbiAgICAgICAgICAgIC5maWx0ZXIocyA9PiBzLnNjb3JlID4gMClcclxuICAgICAgICAgICAgLnNvcnQoKGEsIGIpID0+IGIuc2NvcmUgLSBhLnNjb3JlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdHMuc2xpY2UoMCwgbGltaXQpLm1hcChzID0+IHMuZG9jKTtcclxuICAgIH1cclxufVxyXG4iXSwibmFtZXMiOlsiZnMiLCJwYXRoIiwiREJfUEFUSCIsImpvaW4iLCJwcm9jZXNzIiwiY3dkIiwiU2ltcGxlVmVjdG9yU3RvcmUiLCJjb25zdHJ1Y3RvciIsImRpciIsImRpcm5hbWUiLCJleGlzdHNTeW5jIiwibWtkaXJTeW5jIiwicmVjdXJzaXZlIiwiZSIsImNvbnNvbGUiLCJlcnJvciIsImFkZERvY3VtZW50cyIsImRvY3VtZW50cyIsImN1cnJlbnREb2NzIiwiZGF0YSIsInJlYWRGaWxlU3luYyIsIkpTT04iLCJwYXJzZSIsIndhcm4iLCJuZXdJZHMiLCJTZXQiLCJtYXAiLCJkIiwiaWQiLCJrZXB0RG9jcyIsImZpbHRlciIsImhhcyIsImNvbWJpbmVkIiwid3JpdGVGaWxlU3luYyIsInN0cmluZ2lmeSIsImxvZyIsImxlbmd0aCIsInNlYXJjaCIsInF1ZXJ5IiwibGltaXQiLCJkb2NzIiwidGVybXMiLCJ0b0xvd2VyQ2FzZSIsInNwbGl0IiwidCIsInNjb3JlZCIsImRvYyIsImNvbnRlbnQiLCJ0aXRsZSIsIm1ldGFkYXRhIiwidG9TdHJpbmciLCJzY29yZSIsImZvckVhY2giLCJ0ZXJtIiwicmVnZXgiLCJSZWdFeHAiLCJyZXBsYWNlIiwiY29udGVudE1hdGNoZXMiLCJtYXRjaCIsInRpdGxlTWF0Y2hlcyIsInJlc3VsdHMiLCJzIiwic29ydCIsImEiLCJiIiwic2xpY2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/rag/simple-store.ts\n");

/***/ }),

/***/ "(rsc)/./src/rag/types.ts":
/*!**************************!*\
  !*** ./src/rag/types.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvcmFnL3R5cGVzLnRzIiwibWFwcGluZ3MiOiI7QUFrQkMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9udmlkaWEtYm90Ly4vc3JjL3JhZy90eXBlcy50cz9jMDU5Il0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBpbnRlcmZhY2UgRG9jdW1lbnQge1xyXG4gICAgaWQ6IHN0cmluZztcclxuICAgIGNvbnRlbnQ6IHN0cmluZztcclxuICAgIG1ldGFkYXRhOiBSZWNvcmQ8c3RyaW5nLCBhbnk+O1xyXG4gICAgc291cmNlOiBzdHJpbmc7IC8vIGUuZy4sIFwiZmlsZS1zeXN0ZW1cIiwgXCJzcWwtZGJcIiwgXCJjbXNcIlxyXG4gICAgY3JlYXRlZEF0OiBEYXRlO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIERhdGFTb3VyY2Uge1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgY29ubmVjdCgpOiBQcm9taXNlPHZvaWQ+O1xyXG4gICAgZGlzY29ubmVjdCgpOiBQcm9taXNlPHZvaWQ+O1xyXG4gICAgZ2V0RGF0YSgpOiBQcm9taXNlPERvY3VtZW50W10+O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFZlY3RvclN0b3JlIHtcclxuICAgIGFkZERvY3VtZW50cyhkb2N1bWVudHM6IERvY3VtZW50W10pOiBQcm9taXNlPHZvaWQ+O1xyXG4gICAgc2VhcmNoKHF1ZXJ5OiBzdHJpbmcsIGxpbWl0PzogbnVtYmVyKTogUHJvbWlzZTxEb2N1bWVudFtdPjtcclxufVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/rag/types.ts\n");

/***/ }),

/***/ "(rsc)/./src/rag/vector-store.ts":
/*!*********************************!*\
  !*** ./src/rag/vector-store.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SimpleVectorStore: () => (/* binding */ SimpleVectorStore)\n/* harmony export */ });\nclass SimpleVectorStore {\n    async addDocuments(documents) {\n        console.log(`Adding ${documents.length} documents to Vector Store...`);\n        // In a real implementation, this would generate embeddings and upsert to Pinecone/Milvus/Weaviate\n        this.store.push(...documents);\n        console.log(`Vector Store now contains ${this.store.length} documents.`);\n    }\n    async search(query, limit = 5) {\n        console.log(`Searching Vector Store for: \"${query}\"`);\n        // Naive mock search: filter by content containing the query string (case-insensitive)\n        // detailed \"simulated embedding\" search is overkill, simple keyword overlap is enough to show \"plumbing\"\n        const lowerQuery = query.toLowerCase();\n        const results = this.store.map((doc)=>({\n                doc,\n                score: this.calculateMockScore(doc.content, lowerQuery)\n            })).filter((item)=>item.score > 0).sort((a, b)=>b.score - a.score).slice(0, limit).map((item)=>item.doc);\n        return results;\n    }\n    calculateMockScore(content, query) {\n        const lowerContent = content.toLowerCase();\n        const queryTerms = query.split(/\\s+/);\n        let matchCount = 0;\n        for (const term of queryTerms){\n            if (lowerContent.includes(term)) {\n                matchCount++;\n            }\n        }\n        return matchCount / queryTerms.length;\n    }\n    constructor(){\n        this.store = [];\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvcmFnL3ZlY3Rvci1zdG9yZS50cyIsIm1hcHBpbmdzIjoiOzs7O0FBRU8sTUFBTUE7SUFHVCxNQUFNQyxhQUFhQyxTQUFxQixFQUFpQjtRQUNyREMsUUFBUUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFRixVQUFVRyxNQUFNLENBQUMsNkJBQTZCLENBQUM7UUFDckUsa0dBQWtHO1FBQ2xHLElBQUksQ0FBQ0MsS0FBSyxDQUFDQyxJQUFJLElBQUlMO1FBQ25CQyxRQUFRQyxHQUFHLENBQUMsQ0FBQywwQkFBMEIsRUFBRSxJQUFJLENBQUNFLEtBQUssQ0FBQ0QsTUFBTSxDQUFDLFdBQVcsQ0FBQztJQUMzRTtJQUVBLE1BQU1HLE9BQU9DLEtBQWEsRUFBRUMsUUFBZ0IsQ0FBQyxFQUF1QjtRQUNoRVAsUUFBUUMsR0FBRyxDQUFDLENBQUMsNkJBQTZCLEVBQUVLLE1BQU0sQ0FBQyxDQUFDO1FBQ3BELHNGQUFzRjtRQUN0Rix5R0FBeUc7UUFFekcsTUFBTUUsYUFBYUYsTUFBTUcsV0FBVztRQUVwQyxNQUFNQyxVQUFVLElBQUksQ0FBQ1AsS0FBSyxDQUNyQlEsR0FBRyxDQUFDQyxDQUFBQSxNQUFRO2dCQUNUQTtnQkFDQUMsT0FBTyxJQUFJLENBQUNDLGtCQUFrQixDQUFDRixJQUFJRyxPQUFPLEVBQUVQO1lBQ2hELElBQ0NRLE1BQU0sQ0FBQ0MsQ0FBQUEsT0FBUUEsS0FBS0osS0FBSyxHQUFHLEdBQzVCSyxJQUFJLENBQUMsQ0FBQ0MsR0FBR0MsSUFBTUEsRUFBRVAsS0FBSyxHQUFHTSxFQUFFTixLQUFLLEVBQ2hDUSxLQUFLLENBQUMsR0FBR2QsT0FDVEksR0FBRyxDQUFDTSxDQUFBQSxPQUFRQSxLQUFLTCxHQUFHO1FBRXpCLE9BQU9GO0lBQ1g7SUFFUUksbUJBQW1CQyxPQUFlLEVBQUVULEtBQWEsRUFBVTtRQUMvRCxNQUFNZ0IsZUFBZVAsUUFBUU4sV0FBVztRQUN4QyxNQUFNYyxhQUFhakIsTUFBTWtCLEtBQUssQ0FBQztRQUMvQixJQUFJQyxhQUFhO1FBRWpCLEtBQUssTUFBTUMsUUFBUUgsV0FBWTtZQUMzQixJQUFJRCxhQUFhSyxRQUFRLENBQUNELE9BQU87Z0JBQzdCRDtZQUNKO1FBQ0o7UUFFQSxPQUFPQSxhQUFhRixXQUFXckIsTUFBTTtJQUN6Qzs7YUF6Q1FDLFFBQW9CLEVBQUU7O0FBMENsQyIsInNvdXJjZXMiOlsid2VicGFjazovL252aWRpYS1ib3QvLi9zcmMvcmFnL3ZlY3Rvci1zdG9yZS50cz9lYTZiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZlY3RvclN0b3JlLCBEb2N1bWVudCB9IGZyb20gJy4vdHlwZXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNpbXBsZVZlY3RvclN0b3JlIGltcGxlbWVudHMgVmVjdG9yU3RvcmUge1xyXG4gICAgcHJpdmF0ZSBzdG9yZTogRG9jdW1lbnRbXSA9IFtdO1xyXG5cclxuICAgIGFzeW5jIGFkZERvY3VtZW50cyhkb2N1bWVudHM6IERvY3VtZW50W10pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhgQWRkaW5nICR7ZG9jdW1lbnRzLmxlbmd0aH0gZG9jdW1lbnRzIHRvIFZlY3RvciBTdG9yZS4uLmApO1xyXG4gICAgICAgIC8vIEluIGEgcmVhbCBpbXBsZW1lbnRhdGlvbiwgdGhpcyB3b3VsZCBnZW5lcmF0ZSBlbWJlZGRpbmdzIGFuZCB1cHNlcnQgdG8gUGluZWNvbmUvTWlsdnVzL1dlYXZpYXRlXHJcbiAgICAgICAgdGhpcy5zdG9yZS5wdXNoKC4uLmRvY3VtZW50cyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coYFZlY3RvciBTdG9yZSBub3cgY29udGFpbnMgJHt0aGlzLnN0b3JlLmxlbmd0aH0gZG9jdW1lbnRzLmApO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHNlYXJjaChxdWVyeTogc3RyaW5nLCBsaW1pdDogbnVtYmVyID0gNSk6IFByb21pc2U8RG9jdW1lbnRbXT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBTZWFyY2hpbmcgVmVjdG9yIFN0b3JlIGZvcjogXCIke3F1ZXJ5fVwiYCk7XHJcbiAgICAgICAgLy8gTmFpdmUgbW9jayBzZWFyY2g6IGZpbHRlciBieSBjb250ZW50IGNvbnRhaW5pbmcgdGhlIHF1ZXJ5IHN0cmluZyAoY2FzZS1pbnNlbnNpdGl2ZSlcclxuICAgICAgICAvLyBkZXRhaWxlZCBcInNpbXVsYXRlZCBlbWJlZGRpbmdcIiBzZWFyY2ggaXMgb3ZlcmtpbGwsIHNpbXBsZSBrZXl3b3JkIG92ZXJsYXAgaXMgZW5vdWdoIHRvIHNob3cgXCJwbHVtYmluZ1wiXHJcblxyXG4gICAgICAgIGNvbnN0IGxvd2VyUXVlcnkgPSBxdWVyeS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgICAgICBjb25zdCByZXN1bHRzID0gdGhpcy5zdG9yZVxyXG4gICAgICAgICAgICAubWFwKGRvYyA9PiAoe1xyXG4gICAgICAgICAgICAgICAgZG9jLFxyXG4gICAgICAgICAgICAgICAgc2NvcmU6IHRoaXMuY2FsY3VsYXRlTW9ja1Njb3JlKGRvYy5jb250ZW50LCBsb3dlclF1ZXJ5KVxyXG4gICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgLmZpbHRlcihpdGVtID0+IGl0ZW0uc2NvcmUgPiAwKVxyXG4gICAgICAgICAgICAuc29ydCgoYSwgYikgPT4gYi5zY29yZSAtIGEuc2NvcmUpXHJcbiAgICAgICAgICAgIC5zbGljZSgwLCBsaW1pdClcclxuICAgICAgICAgICAgLm1hcChpdGVtID0+IGl0ZW0uZG9jKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVNb2NrU2NvcmUoY29udGVudDogc3RyaW5nLCBxdWVyeTogc3RyaW5nKTogbnVtYmVyIHtcclxuICAgICAgICBjb25zdCBsb3dlckNvbnRlbnQgPSBjb250ZW50LnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgY29uc3QgcXVlcnlUZXJtcyA9IHF1ZXJ5LnNwbGl0KC9cXHMrLyk7XHJcbiAgICAgICAgbGV0IG1hdGNoQ291bnQgPSAwO1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IHRlcm0gb2YgcXVlcnlUZXJtcykge1xyXG4gICAgICAgICAgICBpZiAobG93ZXJDb250ZW50LmluY2x1ZGVzKHRlcm0pKSB7XHJcbiAgICAgICAgICAgICAgICBtYXRjaENvdW50Kys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBtYXRjaENvdW50IC8gcXVlcnlUZXJtcy5sZW5ndGg7XHJcbiAgICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIlNpbXBsZVZlY3RvclN0b3JlIiwiYWRkRG9jdW1lbnRzIiwiZG9jdW1lbnRzIiwiY29uc29sZSIsImxvZyIsImxlbmd0aCIsInN0b3JlIiwicHVzaCIsInNlYXJjaCIsInF1ZXJ5IiwibGltaXQiLCJsb3dlclF1ZXJ5IiwidG9Mb3dlckNhc2UiLCJyZXN1bHRzIiwibWFwIiwiZG9jIiwic2NvcmUiLCJjYWxjdWxhdGVNb2NrU2NvcmUiLCJjb250ZW50IiwiZmlsdGVyIiwiaXRlbSIsInNvcnQiLCJhIiwiYiIsInNsaWNlIiwibG93ZXJDb250ZW50IiwicXVlcnlUZXJtcyIsInNwbGl0IiwibWF0Y2hDb3VudCIsInRlcm0iLCJpbmNsdWRlcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/rag/vector-store.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/pdf-parse","vendor-chunks/ms","vendor-chunks/@pinecone-database","vendor-chunks/underscore","vendor-chunks/undici","vendor-chunks/axios","vendor-chunks/jszip","vendor-chunks/mammoth","vendor-chunks/bluebird","vendor-chunks/xmlbuilder","vendor-chunks/iconv-lite","vendor-chunks/parse5","vendor-chunks/pako","vendor-chunks/cheerio","vendor-chunks/lop","vendor-chunks/css-select","vendor-chunks/asynckit","vendor-chunks/htmlparser2","vendor-chunks/entities","vendor-chunks/domutils","vendor-chunks/math-intrinsics","vendor-chunks/es-errors","vendor-chunks/@xmldom","vendor-chunks/whatwg-mimetype","vendor-chunks/call-bind-apply-helpers","vendor-chunks/debug","vendor-chunks/nth-check","vendor-chunks/cheerio-select","vendor-chunks/whatwg-encoding","vendor-chunks/get-proto","vendor-chunks/encoding-sniffer","vendor-chunks/domhandler","vendor-chunks/dom-serializer","vendor-chunks/mime-db","vendor-chunks/inherits","vendor-chunks/has-symbols","vendor-chunks/gopd","vendor-chunks/function-bind","vendor-chunks/form-data","vendor-chunks/follow-redirects","vendor-chunks/dingbat-to-unicode","vendor-chunks/css-what","vendor-chunks/parse5-parser-stream","vendor-chunks/parse5-htmlparser2-tree-adapter","vendor-chunks/domelementtype","vendor-chunks/util-deprecate","vendor-chunks/supports-color","vendor-chunks/safer-buffer","vendor-chunks/proxy-from-env","vendor-chunks/process-nextick-args","vendor-chunks/path-is-absolute","vendor-chunks/option","vendor-chunks/mime-types","vendor-chunks/lie","vendor-chunks/isarray","vendor-chunks/immediate","vendor-chunks/hasown","vendor-chunks/has-tostringtag","vendor-chunks/has-flag","vendor-chunks/get-intrinsic","vendor-chunks/es-set-tostringtag","vendor-chunks/es-object-atoms","vendor-chunks/es-define-property","vendor-chunks/dunder-proto","vendor-chunks/delayed-stream","vendor-chunks/core-util-is","vendor-chunks/combined-stream","vendor-chunks/boolbase","vendor-chunks/base64-js"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Frag%2Fingest-url%2Froute&page=%2Fapi%2Frag%2Fingest-url%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Frag%2Fingest-url%2Froute.ts&appDir=C%3A%5CUsers%5CAdministrator%5CDesktop%5Cnvidia-bot%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CAdministrator%5CDesktop%5Cnvidia-bot&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();