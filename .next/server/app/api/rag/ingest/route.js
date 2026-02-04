"use strict";
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
exports.id = "app/api/rag/ingest/route";
exports.ids = ["app/api/rag/ingest/route"];
exports.modules = {

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "http2":
/*!************************!*\
  !*** external "http2" ***!
  \************************/
/***/ ((module) => {

module.exports = require("http2");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "string_decoder":
/*!*********************************!*\
  !*** external "string_decoder" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("string_decoder");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("tty");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "pg":
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
/***/ ((module) => {

module.exports = import("pg");;

/***/ }),

/***/ "node:assert":
/*!******************************!*\
  !*** external "node:assert" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("node:assert");

/***/ }),

/***/ "node:async_hooks":
/*!***********************************!*\
  !*** external "node:async_hooks" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("node:async_hooks");

/***/ }),

/***/ "node:buffer":
/*!******************************!*\
  !*** external "node:buffer" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("node:buffer");

/***/ }),

/***/ "node:console":
/*!*******************************!*\
  !*** external "node:console" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("node:console");

/***/ }),

/***/ "node:crypto":
/*!******************************!*\
  !*** external "node:crypto" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("node:crypto");

/***/ }),

/***/ "node:diagnostics_channel":
/*!*******************************************!*\
  !*** external "node:diagnostics_channel" ***!
  \*******************************************/
/***/ ((module) => {

module.exports = require("node:diagnostics_channel");

/***/ }),

/***/ "node:dns":
/*!***************************!*\
  !*** external "node:dns" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("node:dns");

/***/ }),

/***/ "node:events":
/*!******************************!*\
  !*** external "node:events" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("node:events");

/***/ }),

/***/ "node:fs/promises":
/*!***********************************!*\
  !*** external "node:fs/promises" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("node:fs/promises");

/***/ }),

/***/ "node:http":
/*!****************************!*\
  !*** external "node:http" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("node:http");

/***/ }),

/***/ "node:http2":
/*!*****************************!*\
  !*** external "node:http2" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("node:http2");

/***/ }),

/***/ "node:net":
/*!***************************!*\
  !*** external "node:net" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("node:net");

/***/ }),

/***/ "node:path":
/*!****************************!*\
  !*** external "node:path" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("node:path");

/***/ }),

/***/ "node:perf_hooks":
/*!**********************************!*\
  !*** external "node:perf_hooks" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("node:perf_hooks");

/***/ }),

/***/ "node:querystring":
/*!***********************************!*\
  !*** external "node:querystring" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("node:querystring");

/***/ }),

/***/ "node:sqlite":
/*!******************************!*\
  !*** external "node:sqlite" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("node:sqlite");

/***/ }),

/***/ "node:stream":
/*!******************************!*\
  !*** external "node:stream" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("node:stream");

/***/ }),

/***/ "node:timers":
/*!******************************!*\
  !*** external "node:timers" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("node:timers");

/***/ }),

/***/ "node:tls":
/*!***************************!*\
  !*** external "node:tls" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("node:tls");

/***/ }),

/***/ "node:util":
/*!****************************!*\
  !*** external "node:util" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("node:util");

/***/ }),

/***/ "node:util/types":
/*!**********************************!*\
  !*** external "node:util/types" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("node:util/types");

/***/ }),

/***/ "node:worker_threads":
/*!**************************************!*\
  !*** external "node:worker_threads" ***!
  \**************************************/
/***/ ((module) => {

module.exports = require("node:worker_threads");

/***/ }),

/***/ "node:zlib":
/*!****************************!*\
  !*** external "node:zlib" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("node:zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Frag%2Fingest%2Froute&page=%2Fapi%2Frag%2Fingest%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Frag%2Fingest%2Froute.ts&appDir=C%3A%5CUsers%5CAdministrator%5CDesktop%5Cnvidia-bot%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CAdministrator%5CDesktop%5Cnvidia-bot&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Frag%2Fingest%2Froute&page=%2Fapi%2Frag%2Fingest%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Frag%2Fingest%2Froute.ts&appDir=C%3A%5CUsers%5CAdministrator%5CDesktop%5Cnvidia-bot%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CAdministrator%5CDesktop%5Cnvidia-bot&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Administrator_Desktop_nvidia_bot_src_app_api_rag_ingest_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/rag/ingest/route.ts */ \"(rsc)/./src/app/api/rag/ingest/route.ts\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([C_Users_Administrator_Desktop_nvidia_bot_src_app_api_rag_ingest_route_ts__WEBPACK_IMPORTED_MODULE_3__]);\nC_Users_Administrator_Desktop_nvidia_bot_src_app_api_rag_ingest_route_ts__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/rag/ingest/route\",\n        pathname: \"/api/rag/ingest\",\n        filename: \"route\",\n        bundlePath: \"app/api/rag/ingest/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Administrator\\\\Desktop\\\\nvidia-bot\\\\src\\\\app\\\\api\\\\rag\\\\ingest\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_Administrator_Desktop_nvidia_bot_src_app_api_rag_ingest_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/rag/ingest/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZyYWclMkZpbmdlc3QlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnJhZyUyRmluZ2VzdCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnJhZyUyRmluZ2VzdCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNBZG1pbmlzdHJhdG9yJTVDRGVza3RvcCU1Q252aWRpYS1ib3QlNUNzcmMlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q0FkbWluaXN0cmF0b3IlNUNEZXNrdG9wJTVDbnZpZGlhLWJvdCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDbUM7QUFDaEg7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgscUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9udmlkaWEtYm90Lz8wMmRiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXEFkbWluaXN0cmF0b3JcXFxcRGVza3RvcFxcXFxudmlkaWEtYm90XFxcXHNyY1xcXFxhcHBcXFxcYXBpXFxcXHJhZ1xcXFxpbmdlc3RcXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3JhZy9pbmdlc3Qvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9yYWcvaW5nZXN0XCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9yYWcvaW5nZXN0L3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcQWRtaW5pc3RyYXRvclxcXFxEZXNrdG9wXFxcXG52aWRpYS1ib3RcXFxcc3JjXFxcXGFwcFxcXFxhcGlcXFxccmFnXFxcXGluZ2VzdFxcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvcmFnL2luZ2VzdC9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Frag%2Fingest%2Froute&page=%2Fapi%2Frag%2Fingest%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Frag%2Fingest%2Froute.ts&appDir=C%3A%5CUsers%5CAdministrator%5CDesktop%5Cnvidia-bot%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CAdministrator%5CDesktop%5Cnvidia-bot&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/rag/ingest/route.ts":
/*!*****************************************!*\
  !*** ./src/app/api/rag/ingest/route.ts ***!
  \*****************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _rag_pinecone_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/rag/pinecone-store */ \"(rsc)/./src/rag/pinecone-store.ts\");\n/* harmony import */ var _rag_rag_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/rag/rag-manager */ \"(rsc)/./src/rag/rag-manager.ts\");\n/* harmony import */ var _rag_connectors_web__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/rag/connectors/web */ \"(rsc)/./src/rag/connectors/web.ts\");\n/* harmony import */ var _rag_connectors_raw_text__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/rag/connectors/raw-text */ \"(rsc)/./src/rag/connectors/raw-text.ts\");\n/* harmony import */ var _rag_connectors_postgres__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/rag/connectors/postgres */ \"(rsc)/./src/rag/connectors/postgres.ts\");\n/* harmony import */ var _rag_connectors_cms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/rag/connectors/cms */ \"(rsc)/./src/rag/connectors/cms.ts\");\n/* harmony import */ var _rag_connectors_mongodb__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/rag/connectors/mongodb */ \"(rsc)/./src/rag/connectors/mongodb.ts\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_rag_connectors_postgres__WEBPACK_IMPORTED_MODULE_5__]);\n_rag_connectors_postgres__WEBPACK_IMPORTED_MODULE_5__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\n\n\n\n\nasync function POST(req) {\n    try {\n        const body = await req.json();\n        const { type, config, indexName } = body;\n        if (!type || !config) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Type and config are required\"\n            }, {\n                status: 400\n            });\n        }\n        // Initialize Vector Store (Pinecone or Local Fallback)\n        const apiKey = process.env.PINECONE_API_KEY;\n        const targetIndex = indexName || process.env.PINECONE_INDEX || \"nvidia-bot\";\n        let store;\n        if (apiKey) {\n            store = new _rag_pinecone_store__WEBPACK_IMPORTED_MODULE_1__.PineconeVectorStore(apiKey, targetIndex);\n        } else {\n            const { SimpleVectorStore } = await __webpack_require__.e(/*! import() */ \"_rsc_src_rag_simple-store_ts\").then(__webpack_require__.bind(__webpack_require__, /*! @/rag/simple-store */ \"(rsc)/./src/rag/simple-store.ts\"));\n            store = new SimpleVectorStore();\n            console.log(\"Using SimpleVectorStore (Fallback)\");\n        }\n        const manager = new _rag_rag_manager__WEBPACK_IMPORTED_MODULE_2__.RAGManager(store);\n        let source;\n        // Initialize Source based on Type\n        switch(type){\n            case \"web\":\n                if (!config.url) throw new Error(\"URL is required for Web source\");\n                source = new _rag_connectors_web__WEBPACK_IMPORTED_MODULE_3__.WebDataSource(config.url);\n                break;\n            case \"text\":\n                if (!config.text) throw new Error(\"Text is required for Raw Text source\");\n                source = new _rag_connectors_raw_text__WEBPACK_IMPORTED_MODULE_4__.RawTextDataSource(config.text, config.title);\n                break;\n            case \"postgres\":\n                // config should match PostgresConfig\n                source = new _rag_connectors_postgres__WEBPACK_IMPORTED_MODULE_5__.PostgresDataSource(config);\n                break;\n            case \"mongo\":\n                // config should match MongoConfig\n                source = new _rag_connectors_mongodb__WEBPACK_IMPORTED_MODULE_7__.MongoDataSource(config);\n                break;\n            case \"cms\":\n                if (!config.apiUrl || !config.apiKey) throw new Error(\"API URL and Key required for CMS\");\n                source = new _rag_connectors_cms__WEBPACK_IMPORTED_MODULE_6__.MockCMSDataSource(config.apiUrl, config.apiKey);\n                break;\n            default:\n                throw new Error(`Unknown source type: ${type}`);\n        }\n        manager.registerSource(source);\n        await manager.ingestAll();\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            message: `Successfully ingested content from ${type} source.`\n        });\n    } catch (error) {\n        console.error(\"Ingest API Error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: error.message || \"Internal Server Error\"\n        }, {\n            status: 500\n        });\n    }\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9yYWcvaW5nZXN0L3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUN3RDtBQUNHO0FBQ1o7QUFDTTtBQUNTO0FBQ0M7QUFDTjtBQUNFO0FBRXBELGVBQWVRLEtBQUtDLEdBQWdCO0lBQ3ZDLElBQUk7UUFDQSxNQUFNQyxPQUFPLE1BQU1ELElBQUlFLElBQUk7UUFDM0IsTUFBTSxFQUFFQyxJQUFJLEVBQUVDLE1BQU0sRUFBRUMsU0FBUyxFQUFFLEdBQUdKO1FBRXBDLElBQUksQ0FBQ0UsUUFBUSxDQUFDQyxRQUFRO1lBQ2xCLE9BQU9iLHFEQUFZQSxDQUFDVyxJQUFJLENBQUM7Z0JBQUVJLE9BQU87WUFBK0IsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQ3RGO1FBRUEsdURBQXVEO1FBQ3ZELE1BQU1DLFNBQVNDLFFBQVFDLEdBQUcsQ0FBQ0MsZ0JBQWdCO1FBQzNDLE1BQU1DLGNBQWNQLGFBQWFJLFFBQVFDLEdBQUcsQ0FBQ0csY0FBYyxJQUFJO1FBQy9ELElBQUlDO1FBRUosSUFBSU4sUUFBUTtZQUNSTSxRQUFRLElBQUl0QixvRUFBbUJBLENBQUNnQixRQUFRSTtRQUM1QyxPQUFPO1lBQ0gsTUFBTSxFQUFFRyxpQkFBaUIsRUFBRSxHQUFHLE1BQU0sc0xBQU87WUFDM0NELFFBQVEsSUFBSUM7WUFDWkMsUUFBUUMsR0FBRyxDQUFDO1FBQ2hCO1FBRUEsTUFBTUMsVUFBVSxJQUFJekIsd0RBQVVBLENBQUNxQjtRQUMvQixJQUFJSztRQUVKLGtDQUFrQztRQUNsQyxPQUFRaEI7WUFDSixLQUFLO2dCQUNELElBQUksQ0FBQ0MsT0FBT2dCLEdBQUcsRUFBRSxNQUFNLElBQUlDLE1BQU07Z0JBQ2pDRixTQUFTLElBQUl6Qiw4REFBYUEsQ0FBQ1UsT0FBT2dCLEdBQUc7Z0JBQ3JDO1lBQ0osS0FBSztnQkFDRCxJQUFJLENBQUNoQixPQUFPa0IsSUFBSSxFQUFFLE1BQU0sSUFBSUQsTUFBTTtnQkFDbENGLFNBQVMsSUFBSXhCLHVFQUFpQkEsQ0FBQ1MsT0FBT2tCLElBQUksRUFBRWxCLE9BQU9tQixLQUFLO2dCQUN4RDtZQUNKLEtBQUs7Z0JBQ0QscUNBQXFDO2dCQUNyQ0osU0FBUyxJQUFJdkIsd0VBQWtCQSxDQUFDUTtnQkFDaEM7WUFDSixLQUFLO2dCQUNELGtDQUFrQztnQkFDbENlLFNBQVMsSUFBSXJCLG9FQUFlQSxDQUFDTTtnQkFDN0I7WUFDSixLQUFLO2dCQUNELElBQUksQ0FBQ0EsT0FBT29CLE1BQU0sSUFBSSxDQUFDcEIsT0FBT0ksTUFBTSxFQUFFLE1BQU0sSUFBSWEsTUFBTTtnQkFDdERGLFNBQVMsSUFBSXRCLGtFQUFpQkEsQ0FBQ08sT0FBT29CLE1BQU0sRUFBRXBCLE9BQU9JLE1BQU07Z0JBQzNEO1lBQ0o7Z0JBQ0ksTUFBTSxJQUFJYSxNQUFNLENBQUMscUJBQXFCLEVBQUVsQixLQUFLLENBQUM7UUFDdEQ7UUFFQWUsUUFBUU8sY0FBYyxDQUFDTjtRQUN2QixNQUFNRCxRQUFRUSxTQUFTO1FBRXZCLE9BQU9uQyxxREFBWUEsQ0FBQ1csSUFBSSxDQUFDO1lBQ3JCeUIsU0FBUztZQUNUQyxTQUFTLENBQUMsbUNBQW1DLEVBQUV6QixLQUFLLFFBQVEsQ0FBQztRQUNqRTtJQUVKLEVBQUUsT0FBT0csT0FBWTtRQUNqQlUsUUFBUVYsS0FBSyxDQUFDLHFCQUFxQkE7UUFDbkMsT0FBT2YscURBQVlBLENBQUNXLElBQUksQ0FBQztZQUFFSSxPQUFPQSxNQUFNc0IsT0FBTyxJQUFJO1FBQXdCLEdBQUc7WUFBRXJCLFFBQVE7UUFBSTtJQUNoRztBQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbnZpZGlhLWJvdC8uL3NyYy9hcHAvYXBpL3JhZy9pbmdlc3Qvcm91dGUudHM/ODQ1YSJdLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcclxuaW1wb3J0IHsgUGluZWNvbmVWZWN0b3JTdG9yZSB9IGZyb20gJ0AvcmFnL3BpbmVjb25lLXN0b3JlJztcclxuaW1wb3J0IHsgUkFHTWFuYWdlciB9IGZyb20gJ0AvcmFnL3JhZy1tYW5hZ2VyJztcclxuaW1wb3J0IHsgV2ViRGF0YVNvdXJjZSB9IGZyb20gJ0AvcmFnL2Nvbm5lY3RvcnMvd2ViJztcclxuaW1wb3J0IHsgUmF3VGV4dERhdGFTb3VyY2UgfSBmcm9tICdAL3JhZy9jb25uZWN0b3JzL3Jhdy10ZXh0JztcclxuaW1wb3J0IHsgUG9zdGdyZXNEYXRhU291cmNlIH0gZnJvbSAnQC9yYWcvY29ubmVjdG9ycy9wb3N0Z3Jlcyc7XHJcbmltcG9ydCB7IE1vY2tDTVNEYXRhU291cmNlIH0gZnJvbSAnQC9yYWcvY29ubmVjdG9ycy9jbXMnO1xyXG5pbXBvcnQgeyBNb25nb0RhdGFTb3VyY2UgfSBmcm9tICdAL3JhZy9jb25uZWN0b3JzL21vbmdvZGInO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxOiBOZXh0UmVxdWVzdCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBib2R5ID0gYXdhaXQgcmVxLmpzb24oKTtcclxuICAgICAgICBjb25zdCB7IHR5cGUsIGNvbmZpZywgaW5kZXhOYW1lIH0gPSBib2R5O1xyXG5cclxuICAgICAgICBpZiAoIXR5cGUgfHwgIWNvbmZpZykge1xyXG4gICAgICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ1R5cGUgYW5kIGNvbmZpZyBhcmUgcmVxdWlyZWQnIH0sIHsgc3RhdHVzOiA0MDAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBJbml0aWFsaXplIFZlY3RvciBTdG9yZSAoUGluZWNvbmUgb3IgTG9jYWwgRmFsbGJhY2spXHJcbiAgICAgICAgY29uc3QgYXBpS2V5ID0gcHJvY2Vzcy5lbnYuUElORUNPTkVfQVBJX0tFWTtcclxuICAgICAgICBjb25zdCB0YXJnZXRJbmRleCA9IGluZGV4TmFtZSB8fCBwcm9jZXNzLmVudi5QSU5FQ09ORV9JTkRFWCB8fCAnbnZpZGlhLWJvdCc7XHJcbiAgICAgICAgbGV0IHN0b3JlO1xyXG5cclxuICAgICAgICBpZiAoYXBpS2V5KSB7XHJcbiAgICAgICAgICAgIHN0b3JlID0gbmV3IFBpbmVjb25lVmVjdG9yU3RvcmUoYXBpS2V5LCB0YXJnZXRJbmRleCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgeyBTaW1wbGVWZWN0b3JTdG9yZSB9ID0gYXdhaXQgaW1wb3J0KCdAL3JhZy9zaW1wbGUtc3RvcmUnKTtcclxuICAgICAgICAgICAgc3RvcmUgPSBuZXcgU2ltcGxlVmVjdG9yU3RvcmUoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1VzaW5nIFNpbXBsZVZlY3RvclN0b3JlIChGYWxsYmFjayknKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG1hbmFnZXIgPSBuZXcgUkFHTWFuYWdlcihzdG9yZSk7XHJcbiAgICAgICAgbGV0IHNvdXJjZTtcclxuXHJcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBTb3VyY2UgYmFzZWQgb24gVHlwZVxyXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICd3ZWInOlxyXG4gICAgICAgICAgICAgICAgaWYgKCFjb25maWcudXJsKSB0aHJvdyBuZXcgRXJyb3IoJ1VSTCBpcyByZXF1aXJlZCBmb3IgV2ViIHNvdXJjZScpO1xyXG4gICAgICAgICAgICAgICAgc291cmNlID0gbmV3IFdlYkRhdGFTb3VyY2UoY29uZmlnLnVybCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAndGV4dCc6XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNvbmZpZy50ZXh0KSB0aHJvdyBuZXcgRXJyb3IoJ1RleHQgaXMgcmVxdWlyZWQgZm9yIFJhdyBUZXh0IHNvdXJjZScpO1xyXG4gICAgICAgICAgICAgICAgc291cmNlID0gbmV3IFJhd1RleHREYXRhU291cmNlKGNvbmZpZy50ZXh0LCBjb25maWcudGl0bGUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3Bvc3RncmVzJzpcclxuICAgICAgICAgICAgICAgIC8vIGNvbmZpZyBzaG91bGQgbWF0Y2ggUG9zdGdyZXNDb25maWdcclxuICAgICAgICAgICAgICAgIHNvdXJjZSA9IG5ldyBQb3N0Z3Jlc0RhdGFTb3VyY2UoY29uZmlnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdtb25nbyc6XHJcbiAgICAgICAgICAgICAgICAvLyBjb25maWcgc2hvdWxkIG1hdGNoIE1vbmdvQ29uZmlnXHJcbiAgICAgICAgICAgICAgICBzb3VyY2UgPSBuZXcgTW9uZ29EYXRhU291cmNlKGNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnY21zJzpcclxuICAgICAgICAgICAgICAgIGlmICghY29uZmlnLmFwaVVybCB8fCAhY29uZmlnLmFwaUtleSkgdGhyb3cgbmV3IEVycm9yKCdBUEkgVVJMIGFuZCBLZXkgcmVxdWlyZWQgZm9yIENNUycpO1xyXG4gICAgICAgICAgICAgICAgc291cmNlID0gbmV3IE1vY2tDTVNEYXRhU291cmNlKGNvbmZpZy5hcGlVcmwsIGNvbmZpZy5hcGlLZXkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gc291cmNlIHR5cGU6ICR7dHlwZX1gKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG1hbmFnZXIucmVnaXN0ZXJTb3VyY2Uoc291cmNlKTtcclxuICAgICAgICBhd2FpdCBtYW5hZ2VyLmluZ2VzdEFsbCgpO1xyXG5cclxuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiBgU3VjY2Vzc2Z1bGx5IGluZ2VzdGVkIGNvbnRlbnQgZnJvbSAke3R5cGV9IHNvdXJjZS5gXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0luZ2VzdCBBUEkgRXJyb3I6JywgZXJyb3IpO1xyXG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBlcnJvci5tZXNzYWdlIHx8ICdJbnRlcm5hbCBTZXJ2ZXIgRXJyb3InIH0sIHsgc3RhdHVzOiA1MDAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsIlBpbmVjb25lVmVjdG9yU3RvcmUiLCJSQUdNYW5hZ2VyIiwiV2ViRGF0YVNvdXJjZSIsIlJhd1RleHREYXRhU291cmNlIiwiUG9zdGdyZXNEYXRhU291cmNlIiwiTW9ja0NNU0RhdGFTb3VyY2UiLCJNb25nb0RhdGFTb3VyY2UiLCJQT1NUIiwicmVxIiwiYm9keSIsImpzb24iLCJ0eXBlIiwiY29uZmlnIiwiaW5kZXhOYW1lIiwiZXJyb3IiLCJzdGF0dXMiLCJhcGlLZXkiLCJwcm9jZXNzIiwiZW52IiwiUElORUNPTkVfQVBJX0tFWSIsInRhcmdldEluZGV4IiwiUElORUNPTkVfSU5ERVgiLCJzdG9yZSIsIlNpbXBsZVZlY3RvclN0b3JlIiwiY29uc29sZSIsImxvZyIsIm1hbmFnZXIiLCJzb3VyY2UiLCJ1cmwiLCJFcnJvciIsInRleHQiLCJ0aXRsZSIsImFwaVVybCIsInJlZ2lzdGVyU291cmNlIiwiaW5nZXN0QWxsIiwic3VjY2VzcyIsIm1lc3NhZ2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/rag/ingest/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/rag/connectors/cms.ts":
/*!***********************************!*\
  !*** ./src/rag/connectors/cms.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MockCMSDataSource: () => (/* binding */ MockCMSDataSource)\n/* harmony export */ });\nclass MockCMSDataSource {\n    constructor(apiUrl, apiKey){\n        this.name = \"Headless CMS\";\n        this.apiUrl = apiUrl;\n        this.apiKey = apiKey;\n    }\n    async connect() {\n        console.log(`Connected to CMS at ${this.apiUrl}`);\n    }\n    async disconnect() {\n        console.log(\"Disconnected from CMS\");\n    }\n    async getData() {\n        // Mock fetching articles/pages from a CMS\n        const mockArticles = [\n            {\n                id: \"article-1\",\n                title: \"NVIDIA H100 Architecture\",\n                body: \"The NVIDIA H100 Tensor Core GPU delivers unprecedented performance...\"\n            },\n            {\n                id: \"article-2\",\n                title: \"Data Center Solutions\",\n                body: \"Our data center platform accelerates every workload...\"\n            }\n        ];\n        return mockArticles.map((article)=>({\n                id: `cms-${article.id}`,\n                content: `# ${article.title}\\n\\n${article.body}`,\n                metadata: {\n                    type: \"article\",\n                    sourceId: article.id,\n                    url: `${this.apiUrl}/articles/${article.id}`\n                },\n                source: this.name,\n                createdAt: new Date()\n            }));\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvcmFnL2Nvbm5lY3RvcnMvY21zLnRzIiwibWFwcGluZ3MiOiI7Ozs7QUFFTyxNQUFNQTtJQUtUQyxZQUFZQyxNQUFjLEVBQUVDLE1BQWMsQ0FBRTthQUo1Q0MsT0FBTztRQUtILElBQUksQ0FBQ0YsTUFBTSxHQUFHQTtRQUNkLElBQUksQ0FBQ0MsTUFBTSxHQUFHQTtJQUNsQjtJQUVBLE1BQU1FLFVBQXlCO1FBQzNCQyxRQUFRQyxHQUFHLENBQUMsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUNMLE1BQU0sQ0FBQyxDQUFDO0lBQ3BEO0lBRUEsTUFBTU0sYUFBNEI7UUFDOUJGLFFBQVFDLEdBQUcsQ0FBQztJQUNoQjtJQUVBLE1BQU1FLFVBQStCO1FBQ2pDLDBDQUEwQztRQUMxQyxNQUFNQyxlQUFlO1lBQ2pCO2dCQUNJQyxJQUFJO2dCQUNKQyxPQUFPO2dCQUNQQyxNQUFNO1lBQ1Y7WUFDQTtnQkFDSUYsSUFBSTtnQkFDSkMsT0FBTztnQkFDUEMsTUFBTTtZQUNWO1NBQ0g7UUFFRCxPQUFPSCxhQUFhSSxHQUFHLENBQUNDLENBQUFBLFVBQVk7Z0JBQ2hDSixJQUFJLENBQUMsSUFBSSxFQUFFSSxRQUFRSixFQUFFLENBQUMsQ0FBQztnQkFDdkJLLFNBQVMsQ0FBQyxFQUFFLEVBQUVELFFBQVFILEtBQUssQ0FBQyxJQUFJLEVBQUVHLFFBQVFGLElBQUksQ0FBQyxDQUFDO2dCQUNoREksVUFBVTtvQkFDTkMsTUFBTTtvQkFDTkMsVUFBVUosUUFBUUosRUFBRTtvQkFDcEJTLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQ2xCLE1BQU0sQ0FBQyxVQUFVLEVBQUVhLFFBQVFKLEVBQUUsQ0FBQyxDQUFDO2dCQUNoRDtnQkFDQVUsUUFBUSxJQUFJLENBQUNqQixJQUFJO2dCQUNqQmtCLFdBQVcsSUFBSUM7WUFDbkI7SUFDSjtBQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbnZpZGlhLWJvdC8uL3NyYy9yYWcvY29ubmVjdG9ycy9jbXMudHM/MzY5NyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYXRhU291cmNlLCBEb2N1bWVudCB9IGZyb20gJy4uL3R5cGVzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBNb2NrQ01TRGF0YVNvdXJjZSBpbXBsZW1lbnRzIERhdGFTb3VyY2Uge1xyXG4gICAgbmFtZSA9ICdIZWFkbGVzcyBDTVMnO1xyXG4gICAgcHJpdmF0ZSBhcGlVcmw6IHN0cmluZztcclxuICAgIHByaXZhdGUgYXBpS2V5OiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYXBpVXJsOiBzdHJpbmcsIGFwaUtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5hcGlVcmwgPSBhcGlVcmw7XHJcbiAgICAgICAgdGhpcy5hcGlLZXkgPSBhcGlLZXk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgY29ubmVjdCgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhgQ29ubmVjdGVkIHRvIENNUyBhdCAke3RoaXMuYXBpVXJsfWApO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGRpc2Nvbm5lY3QoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0Rpc2Nvbm5lY3RlZCBmcm9tIENNUycpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGdldERhdGEoKTogUHJvbWlzZTxEb2N1bWVudFtdPiB7XHJcbiAgICAgICAgLy8gTW9jayBmZXRjaGluZyBhcnRpY2xlcy9wYWdlcyBmcm9tIGEgQ01TXHJcbiAgICAgICAgY29uc3QgbW9ja0FydGljbGVzID0gW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZDogJ2FydGljbGUtMScsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ05WSURJQSBIMTAwIEFyY2hpdGVjdHVyZScsXHJcbiAgICAgICAgICAgICAgICBib2R5OiAnVGhlIE5WSURJQSBIMTAwIFRlbnNvciBDb3JlIEdQVSBkZWxpdmVycyB1bnByZWNlZGVudGVkIHBlcmZvcm1hbmNlLi4uJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZDogJ2FydGljbGUtMicsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ0RhdGEgQ2VudGVyIFNvbHV0aW9ucycsXHJcbiAgICAgICAgICAgICAgICBib2R5OiAnT3VyIGRhdGEgY2VudGVyIHBsYXRmb3JtIGFjY2VsZXJhdGVzIGV2ZXJ5IHdvcmtsb2FkLi4uJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG1vY2tBcnRpY2xlcy5tYXAoYXJ0aWNsZSA9PiAoe1xyXG4gICAgICAgICAgICBpZDogYGNtcy0ke2FydGljbGUuaWR9YCxcclxuICAgICAgICAgICAgY29udGVudDogYCMgJHthcnRpY2xlLnRpdGxlfVxcblxcbiR7YXJ0aWNsZS5ib2R5fWAsXHJcbiAgICAgICAgICAgIG1ldGFkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnYXJ0aWNsZScsXHJcbiAgICAgICAgICAgICAgICBzb3VyY2VJZDogYXJ0aWNsZS5pZCxcclxuICAgICAgICAgICAgICAgIHVybDogYCR7dGhpcy5hcGlVcmx9L2FydGljbGVzLyR7YXJ0aWNsZS5pZH1gXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNvdXJjZTogdGhpcy5uYW1lLFxyXG4gICAgICAgICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKClcclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIk1vY2tDTVNEYXRhU291cmNlIiwiY29uc3RydWN0b3IiLCJhcGlVcmwiLCJhcGlLZXkiLCJuYW1lIiwiY29ubmVjdCIsImNvbnNvbGUiLCJsb2ciLCJkaXNjb25uZWN0IiwiZ2V0RGF0YSIsIm1vY2tBcnRpY2xlcyIsImlkIiwidGl0bGUiLCJib2R5IiwibWFwIiwiYXJ0aWNsZSIsImNvbnRlbnQiLCJtZXRhZGF0YSIsInR5cGUiLCJzb3VyY2VJZCIsInVybCIsInNvdXJjZSIsImNyZWF0ZWRBdCIsIkRhdGUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/rag/connectors/cms.ts\n");

/***/ }),

/***/ "(rsc)/./src/rag/connectors/mongodb.ts":
/*!***************************************!*\
  !*** ./src/rag/connectors/mongodb.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MongoDataSource: () => (/* binding */ MongoDataSource)\n/* harmony export */ });\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongodb */ \"mongodb\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_0__);\n\nclass MongoDataSource {\n    constructor(config){\n        this.name = \"MongoDB\";\n        this.isConnected = false;\n        this.config = config;\n        this.client = new mongodb__WEBPACK_IMPORTED_MODULE_0__.MongoClient(config.uri, {\n            serverApi: {\n                version: mongodb__WEBPACK_IMPORTED_MODULE_0__.ServerApiVersion.v1,\n                strict: true,\n                deprecationErrors: true\n            }\n        });\n    }\n    async connect() {\n        try {\n            await this.client.connect();\n            await this.client.db(\"admin\").command({\n                ping: 1\n            });\n            this.isConnected = true;\n            console.log(`Connected to MongoDB: ${this.config.database}.${this.config.collection}`);\n        } catch (error) {\n            throw new Error(`Failed to connect to MongoDB: ${error}`);\n        }\n    }\n    async disconnect() {\n        if (this.isConnected) {\n            await this.client.close();\n            this.isConnected = false;\n            console.log(\"Disconnected from MongoDB\");\n        }\n    }\n    async getData() {\n        if (!this.isConnected) {\n            throw new Error(\"Not connected to database\");\n        }\n        const db = this.client.db(this.config.database);\n        const collection = db.collection(this.config.collection);\n        // Limit to 50 documents for this demo to avoid token limits\n        const cursor = collection.find({}).limit(50);\n        const documents = [];\n        for await (const doc of cursor){\n            // Extract Content\n            const contentParts = this.config.fields.content.map((field)=>{\n                const val = doc[field];\n                return val ? `${field}: ${val}` : \"\";\n            });\n            const content = contentParts.filter((s)=>s).join(\"\\n\");\n            // Extract Metadata\n            const metadata = {\n                sourceType: \"mongodb\",\n                collection: this.config.collection\n            };\n            if (this.config.fields.metadata) {\n                this.config.fields.metadata.forEach((field)=>{\n                    if (doc[field]) metadata[field] = doc[field];\n                });\n            }\n            // ID\n            const idField = this.config.fields.id || \"_id\";\n            const docId = doc[idField]?.toString() || new Date().toISOString();\n            documents.push({\n                id: `mongo-${this.config.collection}-${docId}`,\n                content: content,\n                metadata: metadata,\n                source: this.name,\n                createdAt: new Date()\n            });\n        }\n        return documents;\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q1ksRUFBRSxJQUFJO1lBQ3pDLE1BQU1DLFFBQVFmLEdBQUcsQ0FBQ2EsUUFBUSxFQUFFRyxjQUFjLElBQUlDLE9BQU9DLFdBQVc7WUFFaEVuQixVQUFVb0IsSUFBSSxDQUFDO2dCQUNYTCxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQ3pDLE1BQU0sQ0FBQ2lCLFVBQVUsQ0FBQyxDQUFDLEVBQUV5QixNQUFNLENBQUM7Z0JBQzlDWixTQUFTQTtnQkFDVE8sVUFBVUE7Z0JBQ1ZVLFFBQVEsSUFBSSxDQUFDOUMsSUFBSTtnQkFDakIrQyxXQUFXLElBQUlKO1lBQ25CO1FBQ0o7UUFFQSxPQUFPbEI7SUFDWDtBQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbnZpZGlhLWJvdC8uL3NyYy9yYWcvY29ubmVjdG9ycy9tb25nb2RiLnRzPzA0NDYiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IERhdGFTb3VyY2UsIERvY3VtZW50IH0gZnJvbSAnLi4vdHlwZXMnO1xyXG5pbXBvcnQgeyBNb25nb0NsaWVudCwgU2VydmVyQXBpVmVyc2lvbiB9IGZyb20gJ21vbmdvZGInO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNb25nb0NvbmZpZyB7XHJcbiAgICB1cmk6IHN0cmluZztcclxuICAgIGRhdGFiYXNlOiBzdHJpbmc7XHJcbiAgICBjb2xsZWN0aW9uOiBzdHJpbmc7XHJcbiAgICBmaWVsZHM6IHtcclxuICAgICAgICBpZD86IHN0cmluZzsgICAgIC8vIERlZmF1bHQgdG8gX2lkXHJcbiAgICAgICAgY29udGVudDogc3RyaW5nW107IC8vIEZpZWxkcyB0byBjb25jYXRlbmF0ZSBhcyBjb250ZW50XHJcbiAgICAgICAgbWV0YWRhdGE/OiBzdHJpbmdbXTtcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNb25nb0RhdGFTb3VyY2UgaW1wbGVtZW50cyBEYXRhU291cmNlIHtcclxuICAgIG5hbWUgPSAnTW9uZ29EQic7XHJcbiAgICBwcml2YXRlIGNsaWVudDogTW9uZ29DbGllbnQ7XHJcbiAgICBwcml2YXRlIGNvbmZpZzogTW9uZ29Db25maWc7XHJcbiAgICBwcml2YXRlIGlzQ29ubmVjdGVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29uZmlnOiBNb25nb0NvbmZpZykge1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMuY2xpZW50ID0gbmV3IE1vbmdvQ2xpZW50KGNvbmZpZy51cmksIHtcclxuICAgICAgICAgICAgc2VydmVyQXBpOiB7XHJcbiAgICAgICAgICAgICAgICB2ZXJzaW9uOiBTZXJ2ZXJBcGlWZXJzaW9uLnYxLFxyXG4gICAgICAgICAgICAgICAgc3RyaWN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZGVwcmVjYXRpb25FcnJvcnM6IHRydWUsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBjb25uZWN0KCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuY2xpZW50LmNvbm5lY3QoKTtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5jbGllbnQuZGIoXCJhZG1pblwiKS5jb21tYW5kKHsgcGluZzogMSB9KTtcclxuICAgICAgICAgICAgdGhpcy5pc0Nvbm5lY3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBDb25uZWN0ZWQgdG8gTW9uZ29EQjogJHt0aGlzLmNvbmZpZy5kYXRhYmFzZX0uJHt0aGlzLmNvbmZpZy5jb2xsZWN0aW9ufWApO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGNvbm5lY3QgdG8gTW9uZ29EQjogJHtlcnJvcn1gKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZGlzY29ubmVjdCgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBpZiAodGhpcy5pc0Nvbm5lY3RlZCkge1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmNsaWVudC5jbG9zZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmlzQ29ubmVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdEaXNjb25uZWN0ZWQgZnJvbSBNb25nb0RCJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGdldERhdGEoKTogUHJvbWlzZTxEb2N1bWVudFtdPiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzQ29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGNvbm5lY3RlZCB0byBkYXRhYmFzZScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZGIgPSB0aGlzLmNsaWVudC5kYih0aGlzLmNvbmZpZy5kYXRhYmFzZSk7XHJcbiAgICAgICAgY29uc3QgY29sbGVjdGlvbiA9IGRiLmNvbGxlY3Rpb24odGhpcy5jb25maWcuY29sbGVjdGlvbik7XHJcblxyXG4gICAgICAgIC8vIExpbWl0IHRvIDUwIGRvY3VtZW50cyBmb3IgdGhpcyBkZW1vIHRvIGF2b2lkIHRva2VuIGxpbWl0c1xyXG4gICAgICAgIGNvbnN0IGN1cnNvciA9IGNvbGxlY3Rpb24uZmluZCh7fSkubGltaXQoNTApO1xyXG5cclxuICAgICAgICBjb25zdCBkb2N1bWVudHM6IERvY3VtZW50W10gPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIGF3YWl0IChjb25zdCBkb2Mgb2YgY3Vyc29yKSB7XHJcbiAgICAgICAgICAgIC8vIEV4dHJhY3QgQ29udGVudFxyXG4gICAgICAgICAgICBjb25zdCBjb250ZW50UGFydHMgPSB0aGlzLmNvbmZpZy5maWVsZHMuY29udGVudC5tYXAoZmllbGQgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsID0gZG9jW2ZpZWxkXTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWwgPyBgJHtmaWVsZH06ICR7dmFsfWAgOiAnJztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBjb250ZW50UGFydHMuZmlsdGVyKHMgPT4gcykuam9pbignXFxuJyk7XHJcblxyXG4gICAgICAgICAgICAvLyBFeHRyYWN0IE1ldGFkYXRhXHJcbiAgICAgICAgICAgIGNvbnN0IG1ldGFkYXRhOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge1xyXG4gICAgICAgICAgICAgICAgc291cmNlVHlwZTogJ21vbmdvZGInLFxyXG4gICAgICAgICAgICAgICAgY29sbGVjdGlvbjogdGhpcy5jb25maWcuY29sbGVjdGlvblxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jb25maWcuZmllbGRzLm1ldGFkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5maWVsZHMubWV0YWRhdGEuZm9yRWFjaChmaWVsZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRvY1tmaWVsZF0pIG1ldGFkYXRhW2ZpZWxkXSA9IGRvY1tmaWVsZF07XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gSURcclxuICAgICAgICAgICAgY29uc3QgaWRGaWVsZCA9IHRoaXMuY29uZmlnLmZpZWxkcy5pZCB8fCAnX2lkJztcclxuICAgICAgICAgICAgY29uc3QgZG9jSWQgPSBkb2NbaWRGaWVsZF0/LnRvU3RyaW5nKCkgfHwgbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnRzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgaWQ6IGBtb25nby0ke3RoaXMuY29uZmlnLmNvbGxlY3Rpb259LSR7ZG9jSWR9YCxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGNvbnRlbnQsXHJcbiAgICAgICAgICAgICAgICBtZXRhZGF0YTogbWV0YWRhdGEsXHJcbiAgICAgICAgICAgICAgICBzb3VyY2U6IHRoaXMubmFtZSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBkb2N1bWVudHM7XHJcbiAgICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIk1vbmdvQ2xpZW50IiwiU2VydmVyQXBpVmVyc2lvbiIsIk1vbmdvRGF0YVNvdXJjZSIsImNvbnN0cnVjdG9yIiwiY29uZmlnIiwibmFtZSIsImlzQ29ubmVjdGVkIiwiY2xpZW50IiwidXJpIiwic2VydmVyQXBpIiwidmVyc2lvbiIsInYxIiwic3RyaWN0IiwiZGVwcmVjYXRpb25FcnJvcnMiLCJjb25uZWN0IiwiZGIiLCJjb21tYW5kIiwicGluZyIsImNvbnNvbGUiLCJsb2ciLCJkYXRhYmFzZSIsImNvbGxlY3Rpb24iLCJlcnJvciIsIkVycm9yIiwiZGlzY29ubmVjdCIsImNsb3NlIiwiZ2V0RGF0YSIsImN1cnNvciIsImZpbmQiLCJsaW1pdCIsImRvY3VtZW50cyIsImRvYyIsImNvbnRlbnRQYXJ0cyIsImZpZWxkcyIsImNvbnRlbnQiLCJtYXAiLCJmaWVsZCIsInZhbCIsImZpbHRlciIsInMiLCJqb2luIiwibWV0YWRhdGEiLCJzb3VyY2VUeXBlIiwiZm9yRWFjaCIsImlkRmllbGQiLCJpZCIsImRvY0lkIiwidG9TdHJpbmciLCJEYXRlIiwidG9JU09TdHJpbmciLCJwdXNoIiwic291cmNlIiwiY3JlYXRlZEF0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/rag/connectors/mongodb.ts\n");

/***/ }),

/***/ "(rsc)/./src/rag/connectors/postgres.ts":
/*!****************************************!*\
  !*** ./src/rag/connectors/postgres.ts ***!
  \****************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PostgresDataSource: () => (/* binding */ PostgresDataSource)\n/* harmony export */ });\n/* harmony import */ var pg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pg */ \"pg\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([pg__WEBPACK_IMPORTED_MODULE_0__]);\npg__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nclass PostgresDataSource {\n    constructor(config){\n        this.name = \"PostgreSQL Database\";\n        this.isConnected = false;\n        this.config = config;\n        this.pool = new pg__WEBPACK_IMPORTED_MODULE_0__.Pool(config);\n    }\n    async connect() {\n        try {\n            await this.pool.query(\"SELECT NOW()\");\n            this.isConnected = true;\n            console.log(`Connected to PostgreSQL Database at ${this.config.host}:${this.config.port}/${this.config.database}`);\n        } catch (error) {\n            throw new Error(`Failed to connect to PostgreSQL: ${error}`);\n        }\n    }\n    async disconnect() {\n        if (this.isConnected) {\n            await this.pool.end();\n            this.isConnected = false;\n            console.log(\"Disconnected from PostgreSQL Database\");\n        }\n    }\n    async getData() {\n        if (!this.isConnected) {\n            throw new Error(\"Not connected to database\");\n        }\n        const { tableName, columns } = this.config;\n        const metadataCols = columns.metadata ? columns.metadata.join(\", \") : \"\";\n        const selectCols = `${columns.id} as id, ${columns.content} as content${metadataCols ? \", \" + metadataCols : \"\"}`;\n        const query = `SELECT ${selectCols} FROM ${tableName} LIMIT 100`; // Limit for safety in this demo\n        try {\n            const res = await this.pool.query(query);\n            return res.rows.map((row)=>{\n                const metadata = {};\n                if (columns.metadata) {\n                    columns.metadata.forEach((col)=>{\n                        metadata[col] = row[col];\n                    });\n                }\n                metadata.sourceTable = tableName;\n                return {\n                    id: `pg-${tableName}-${row.id}`,\n                    content: String(row.content),\n                    metadata: metadata,\n                    source: this.name,\n                    createdAt: new Date()\n                };\n            });\n        } catch (error) {\n            console.error(\"Error fetching data from PostgreSQL:\", error);\n            throw error;\n        }\n    }\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvcmFnL2Nvbm5lY3RvcnMvcG9zdGdyZXMudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDc0M7QUFXL0IsTUFBTUM7SUFNVEMsWUFBWUMsTUFBc0IsQ0FBRTthQUxwQ0MsT0FBTzthQUdDQyxjQUF1QjtRQUczQixJQUFJLENBQUNGLE1BQU0sR0FBR0E7UUFDZCxJQUFJLENBQUNHLElBQUksR0FBRyxJQUFJTixvQ0FBSUEsQ0FBQ0c7SUFDekI7SUFFQSxNQUFNSSxVQUF5QjtRQUMzQixJQUFJO1lBQ0EsTUFBTSxJQUFJLENBQUNELElBQUksQ0FBQ0UsS0FBSyxDQUFDO1lBQ3RCLElBQUksQ0FBQ0gsV0FBVyxHQUFHO1lBQ25CSSxRQUFRQyxHQUFHLENBQUMsQ0FBQyxvQ0FBb0MsRUFBRSxJQUFJLENBQUNQLE1BQU0sQ0FBQ1EsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUNSLE1BQU0sQ0FBQ1MsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUNULE1BQU0sQ0FBQ1UsUUFBUSxDQUFDLENBQUM7UUFDckgsRUFBRSxPQUFPQyxPQUFPO1lBQ1osTUFBTSxJQUFJQyxNQUFNLENBQUMsaUNBQWlDLEVBQUVELE1BQU0sQ0FBQztRQUMvRDtJQUNKO0lBRUEsTUFBTUUsYUFBNEI7UUFDOUIsSUFBSSxJQUFJLENBQUNYLFdBQVcsRUFBRTtZQUNsQixNQUFNLElBQUksQ0FBQ0MsSUFBSSxDQUFDVyxHQUFHO1lBQ25CLElBQUksQ0FBQ1osV0FBVyxHQUFHO1lBQ25CSSxRQUFRQyxHQUFHLENBQUM7UUFDaEI7SUFDSjtJQUVBLE1BQU1RLFVBQStCO1FBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUNiLFdBQVcsRUFBRTtZQUNuQixNQUFNLElBQUlVLE1BQU07UUFDcEI7UUFFQSxNQUFNLEVBQUVJLFNBQVMsRUFBRUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDakIsTUFBTTtRQUMxQyxNQUFNa0IsZUFBZUQsUUFBUUUsUUFBUSxHQUFHRixRQUFRRSxRQUFRLENBQUNDLElBQUksQ0FBQyxRQUFRO1FBQ3RFLE1BQU1DLGFBQWEsQ0FBQyxFQUFFSixRQUFRSyxFQUFFLENBQUMsUUFBUSxFQUFFTCxRQUFRTSxPQUFPLENBQUMsV0FBVyxFQUFFTCxlQUFlLE9BQU9BLGVBQWUsR0FBRyxDQUFDO1FBRWpILE1BQU1iLFFBQVEsQ0FBQyxPQUFPLEVBQUVnQixXQUFXLE1BQU0sRUFBRUwsVUFBVSxVQUFVLENBQUMsRUFBRSxnQ0FBZ0M7UUFFbEcsSUFBSTtZQUNBLE1BQU1RLE1BQU0sTUFBTSxJQUFJLENBQUNyQixJQUFJLENBQUNFLEtBQUssQ0FBQ0E7WUFFbEMsT0FBT21CLElBQUlDLElBQUksQ0FBQ0MsR0FBRyxDQUFDQyxDQUFBQTtnQkFDaEIsTUFBTVIsV0FBZ0MsQ0FBQztnQkFDdkMsSUFBSUYsUUFBUUUsUUFBUSxFQUFFO29CQUNsQkYsUUFBUUUsUUFBUSxDQUFDUyxPQUFPLENBQUNDLENBQUFBO3dCQUNyQlYsUUFBUSxDQUFDVSxJQUFJLEdBQUdGLEdBQUcsQ0FBQ0UsSUFBSTtvQkFDNUI7Z0JBQ0o7Z0JBQ0FWLFNBQVNXLFdBQVcsR0FBR2Q7Z0JBRXZCLE9BQU87b0JBQ0hNLElBQUksQ0FBQyxHQUFHLEVBQUVOLFVBQVUsQ0FBQyxFQUFFVyxJQUFJTCxFQUFFLENBQUMsQ0FBQztvQkFDL0JDLFNBQVNRLE9BQU9KLElBQUlKLE9BQU87b0JBQzNCSixVQUFVQTtvQkFDVmEsUUFBUSxJQUFJLENBQUMvQixJQUFJO29CQUNqQmdDLFdBQVcsSUFBSUM7Z0JBQ25CO1lBQ0o7UUFDSixFQUFFLE9BQU92QixPQUFPO1lBQ1pMLFFBQVFLLEtBQUssQ0FBQyx3Q0FBd0NBO1lBQ3RELE1BQU1BO1FBQ1Y7SUFDSjtBQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbnZpZGlhLWJvdC8uL3NyYy9yYWcvY29ubmVjdG9ycy9wb3N0Z3Jlcy50cz82MTJjIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdGFTb3VyY2UsIERvY3VtZW50IH0gZnJvbSAnLi4vdHlwZXMnO1xyXG5pbXBvcnQgeyBQb29sLCBQb29sQ29uZmlnIH0gZnJvbSAncGcnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQb3N0Z3Jlc0NvbmZpZyBleHRlbmRzIFBvb2xDb25maWcge1xyXG4gICAgdGFibGVOYW1lOiBzdHJpbmc7XHJcbiAgICBjb2x1bW5zOiB7XHJcbiAgICAgICAgaWQ6IHN0cmluZztcclxuICAgICAgICBjb250ZW50OiBzdHJpbmc7IC8vIFRoZSBjb2x1bW4gdG8gYWxsb3cgc2ltcGxlIGZ1bGwtdGV4dCBzZWFyY2ggb3IganVzdCByZXRyaWV2YWxcclxuICAgICAgICBtZXRhZGF0YT86IHN0cmluZ1tdOyAvLyBDb2x1bW5zIHRvIHN0b3JlIGFzIG1ldGFkYXRhXHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUG9zdGdyZXNEYXRhU291cmNlIGltcGxlbWVudHMgRGF0YVNvdXJjZSB7XHJcbiAgICBuYW1lID0gJ1Bvc3RncmVTUUwgRGF0YWJhc2UnO1xyXG4gICAgcHJpdmF0ZSBwb29sOiBQb29sO1xyXG4gICAgcHJpdmF0ZSBjb25maWc6IFBvc3RncmVzQ29uZmlnO1xyXG4gICAgcHJpdmF0ZSBpc0Nvbm5lY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZzogUG9zdGdyZXNDb25maWcpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLnBvb2wgPSBuZXcgUG9vbChjb25maWcpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGNvbm5lY3QoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5wb29sLnF1ZXJ5KCdTRUxFQ1QgTk9XKCknKTtcclxuICAgICAgICAgICAgdGhpcy5pc0Nvbm5lY3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBDb25uZWN0ZWQgdG8gUG9zdGdyZVNRTCBEYXRhYmFzZSBhdCAke3RoaXMuY29uZmlnLmhvc3R9OiR7dGhpcy5jb25maWcucG9ydH0vJHt0aGlzLmNvbmZpZy5kYXRhYmFzZX1gKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBjb25uZWN0IHRvIFBvc3RncmVTUUw6ICR7ZXJyb3J9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGRpc2Nvbm5lY3QoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNDb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5wb29sLmVuZCgpO1xyXG4gICAgICAgICAgICB0aGlzLmlzQ29ubmVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdEaXNjb25uZWN0ZWQgZnJvbSBQb3N0Z3JlU1FMIERhdGFiYXNlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGdldERhdGEoKTogUHJvbWlzZTxEb2N1bWVudFtdPiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzQ29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGNvbm5lY3RlZCB0byBkYXRhYmFzZScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgeyB0YWJsZU5hbWUsIGNvbHVtbnMgfSA9IHRoaXMuY29uZmlnO1xyXG4gICAgICAgIGNvbnN0IG1ldGFkYXRhQ29scyA9IGNvbHVtbnMubWV0YWRhdGEgPyBjb2x1bW5zLm1ldGFkYXRhLmpvaW4oJywgJykgOiAnJztcclxuICAgICAgICBjb25zdCBzZWxlY3RDb2xzID0gYCR7Y29sdW1ucy5pZH0gYXMgaWQsICR7Y29sdW1ucy5jb250ZW50fSBhcyBjb250ZW50JHttZXRhZGF0YUNvbHMgPyAnLCAnICsgbWV0YWRhdGFDb2xzIDogJyd9YDtcclxuXHJcbiAgICAgICAgY29uc3QgcXVlcnkgPSBgU0VMRUNUICR7c2VsZWN0Q29sc30gRlJPTSAke3RhYmxlTmFtZX0gTElNSVQgMTAwYDsgLy8gTGltaXQgZm9yIHNhZmV0eSBpbiB0aGlzIGRlbW9cclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5wb29sLnF1ZXJ5KHF1ZXJ5KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXMucm93cy5tYXAocm93ID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1ldGFkYXRhOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge307XHJcbiAgICAgICAgICAgICAgICBpZiAoY29sdW1ucy5tZXRhZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnMubWV0YWRhdGEuZm9yRWFjaChjb2wgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRhZGF0YVtjb2xdID0gcm93W2NvbF07XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBtZXRhZGF0YS5zb3VyY2VUYWJsZSA9IHRhYmxlTmFtZTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBgcGctJHt0YWJsZU5hbWV9LSR7cm93LmlkfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogU3RyaW5nKHJvdy5jb250ZW50KSxcclxuICAgICAgICAgICAgICAgICAgICBtZXRhZGF0YTogbWV0YWRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlOiB0aGlzLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBkYXRhIGZyb20gUG9zdGdyZVNRTDonLCBlcnJvcik7XHJcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXSwibmFtZXMiOlsiUG9vbCIsIlBvc3RncmVzRGF0YVNvdXJjZSIsImNvbnN0cnVjdG9yIiwiY29uZmlnIiwibmFtZSIsImlzQ29ubmVjdGVkIiwicG9vbCIsImNvbm5lY3QiLCJxdWVyeSIsImNvbnNvbGUiLCJsb2ciLCJob3N0IiwicG9ydCIsImRhdGFiYXNlIiwiZXJyb3IiLCJFcnJvciIsImRpc2Nvbm5lY3QiLCJlbmQiLCJnZXREYXRhIiwidGFibGVOYW1lIiwiY29sdW1ucyIsIm1ldGFkYXRhQ29scyIsIm1ldGFkYXRhIiwiam9pbiIsInNlbGVjdENvbHMiLCJpZCIsImNvbnRlbnQiLCJyZXMiLCJyb3dzIiwibWFwIiwicm93IiwiZm9yRWFjaCIsImNvbCIsInNvdXJjZVRhYmxlIiwiU3RyaW5nIiwic291cmNlIiwiY3JlYXRlZEF0IiwiRGF0ZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/rag/connectors/postgres.ts\n");

/***/ }),

/***/ "(rsc)/./src/rag/connectors/raw-text.ts":
/*!****************************************!*\
  !*** ./src/rag/connectors/raw-text.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   RawTextDataSource: () => (/* binding */ RawTextDataSource)\n/* harmony export */ });\nclass RawTextDataSource {\n    constructor(text, title){\n        this.name = \"Raw Text\";\n        this.text = text;\n        this.title = title || \"Untitled Text Snippet\";\n    }\n    async connect() {}\n    async disconnect() {}\n    async getData() {\n        return [\n            {\n                id: `text-${Date.now()}`,\n                content: this.text,\n                metadata: {\n                    title: this.title,\n                    sourceType: \"raw-text\"\n                },\n                source: \"raw-text\",\n                createdAt: new Date()\n            }\n        ];\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvcmFnL2Nvbm5lY3RvcnMvcmF3LXRleHQudHMiLCJtYXBwaW5ncyI6Ijs7OztBQUdPLE1BQU1BO0lBS1RDLFlBQVlDLElBQVksRUFBRUMsS0FBYyxDQUFFO2FBSjFDQyxPQUFPO1FBS0gsSUFBSSxDQUFDRixJQUFJLEdBQUdBO1FBQ1osSUFBSSxDQUFDQyxLQUFLLEdBQUdBLFNBQVM7SUFDMUI7SUFFQSxNQUFNRSxVQUF5QixDQUFFO0lBQ2pDLE1BQU1DLGFBQTRCLENBQUU7SUFFcEMsTUFBTUMsVUFBK0I7UUFDakMsT0FBTztZQUFDO2dCQUNKQyxJQUFJLENBQUMsS0FBSyxFQUFFQyxLQUFLQyxHQUFHLEdBQUcsQ0FBQztnQkFDeEJDLFNBQVMsSUFBSSxDQUFDVCxJQUFJO2dCQUNsQlUsVUFBVTtvQkFDTlQsT0FBTyxJQUFJLENBQUNBLEtBQUs7b0JBQ2pCVSxZQUFZO2dCQUNoQjtnQkFDQUMsUUFBUTtnQkFDUkMsV0FBVyxJQUFJTjtZQUNuQjtTQUFFO0lBQ047QUFDSiIsInNvdXJjZXMiOlsid2VicGFjazovL252aWRpYS1ib3QvLi9zcmMvcmFnL2Nvbm5lY3RvcnMvcmF3LXRleHQudHM/MjFlMyJdLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgRGF0YVNvdXJjZSwgRG9jdW1lbnQgfSBmcm9tICcuLi90eXBlcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgUmF3VGV4dERhdGFTb3VyY2UgaW1wbGVtZW50cyBEYXRhU291cmNlIHtcclxuICAgIG5hbWUgPSAnUmF3IFRleHQnO1xyXG4gICAgcHJpdmF0ZSB0ZXh0OiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHRpdGxlOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IodGV4dDogc3RyaW5nLCB0aXRsZT86IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMudGV4dCA9IHRleHQ7XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlIHx8ICdVbnRpdGxlZCBUZXh0IFNuaXBwZXQnO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGNvbm5lY3QoKTogUHJvbWlzZTx2b2lkPiB7IH1cclxuICAgIGFzeW5jIGRpc2Nvbm5lY3QoKTogUHJvbWlzZTx2b2lkPiB7IH1cclxuXHJcbiAgICBhc3luYyBnZXREYXRhKCk6IFByb21pc2U8RG9jdW1lbnRbXT4ge1xyXG4gICAgICAgIHJldHVybiBbe1xyXG4gICAgICAgICAgICBpZDogYHRleHQtJHtEYXRlLm5vdygpfWAsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMudGV4dCxcclxuICAgICAgICAgICAgbWV0YWRhdGE6IHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgc291cmNlVHlwZTogJ3Jhdy10ZXh0J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzb3VyY2U6ICdyYXctdGV4dCcsXHJcbiAgICAgICAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKVxyXG4gICAgICAgIH1dO1xyXG4gICAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJSYXdUZXh0RGF0YVNvdXJjZSIsImNvbnN0cnVjdG9yIiwidGV4dCIsInRpdGxlIiwibmFtZSIsImNvbm5lY3QiLCJkaXNjb25uZWN0IiwiZ2V0RGF0YSIsImlkIiwiRGF0ZSIsIm5vdyIsImNvbnRlbnQiLCJtZXRhZGF0YSIsInNvdXJjZVR5cGUiLCJzb3VyY2UiLCJjcmVhdGVkQXQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/rag/connectors/raw-text.ts\n");

/***/ }),

/***/ "(rsc)/./src/rag/connectors/web.ts":
/*!***********************************!*\
  !*** ./src/rag/connectors/web.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   WebDataSource: () => (/* binding */ WebDataSource)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"(rsc)/./node_modules/axios/lib/axios.js\");\n/* harmony import */ var cheerio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheerio */ \"(rsc)/./node_modules/cheerio/dist/esm/index.js\");\n\n\nclass WebDataSource {\n    constructor(url){\n        this.name = \"Web\";\n        this.url = url;\n        this.name = `Web (${url})`;\n    }\n    async connect() {\n    // No persistent connection needed for HTTP\n    }\n    async disconnect() {\n    // No disconnection needed\n    }\n    async getData() {\n        console.log(`WebDataSource: Fetching ${this.url}`);\n        try {\n            const response = await axios__WEBPACK_IMPORTED_MODULE_1__[\"default\"].get(this.url, {\n                headers: {\n                    \"User-Agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36\"\n                },\n                timeout: 10000\n            });\n            const html = response.data;\n            const $ = cheerio__WEBPACK_IMPORTED_MODULE_0__.load(html);\n            // Remove script and style elements\n            $(\"script\").remove();\n            $(\"style\").remove();\n            $(\"noscript\").remove();\n            $(\"nav\").remove();\n            $(\"footer\").remove();\n            $(\"iframe\").remove();\n            // Extract title\n            const title = $(\"title\").text().trim() || this.url;\n            // Extract main content - simplistic approach\n            // Try to find main content containers if possible, otherwise body\n            let content = \"\";\n            const main = $(\"main\");\n            const article = $(\"article\");\n            const contentDiv = $(\"#content, .content, #main, .main\");\n            if (main.length > 0) {\n                content = main.text();\n            } else if (article.length > 0) {\n                content = article.text();\n            } else if (contentDiv.length > 0) {\n                content = contentDiv.text();\n            } else {\n                content = $(\"body\").text();\n            }\n            // Cleanup whitespace\n            content = content.replace(/\\s+/g, \" \").trim();\n            if (!content) {\n                console.warn(`WebDataSource: No content found for ${this.url}`);\n            }\n            const doc = {\n                id: this.url,\n                content: content,\n                metadata: {\n                    title: title,\n                    url: this.url,\n                    sourceType: \"web\",\n                    dateFetched: new Date().toISOString()\n                },\n                source: \"web\",\n                createdAt: new Date()\n            };\n            return [\n                doc\n            ];\n        } catch (error) {\n            console.error(`Failed to fetch URL ${this.url}:`, error.message);\n            throw new Error(`Failed to fetch URL ${this.url}: ${error.message}`);\n        }\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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InNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xyXG5pbXBvcnQgKiBhcyBjaGVlcmlvIGZyb20gJ2NoZWVyaW8nO1xyXG5pbXBvcnQgeyBEYXRhU291cmNlLCBEb2N1bWVudCB9IGZyb20gJy4uL3R5cGVzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBXZWJEYXRhU291cmNlIGltcGxlbWVudHMgRGF0YVNvdXJjZSB7XHJcbiAgICBuYW1lID0gJ1dlYic7XHJcbiAgICBwcml2YXRlIHVybDogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHVybDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gYFdlYiAoJHt1cmx9KWA7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgY29ubmVjdCgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICAvLyBObyBwZXJzaXN0ZW50IGNvbm5lY3Rpb24gbmVlZGVkIGZvciBIVFRQXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZGlzY29ubmVjdCgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICAvLyBObyBkaXNjb25uZWN0aW9uIG5lZWRlZFxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGdldERhdGEoKTogUHJvbWlzZTxEb2N1bWVudFtdPiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYFdlYkRhdGFTb3VyY2U6IEZldGNoaW5nICR7dGhpcy51cmx9YCk7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5nZXQodGhpcy51cmwsIHtcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAnVXNlci1BZ2VudCc6ICdNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvOTEuMC40NDcyLjEyNCBTYWZhcmkvNTM3LjM2J1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHRpbWVvdXQ6IDEwMDAwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zdCBodG1sID0gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgICAgICAgY29uc3QgJCA9IGNoZWVyaW8ubG9hZChodG1sKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlbW92ZSBzY3JpcHQgYW5kIHN0eWxlIGVsZW1lbnRzXHJcbiAgICAgICAgICAgICQoJ3NjcmlwdCcpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAkKCdzdHlsZScpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAkKCdub3NjcmlwdCcpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAkKCduYXYnKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgJCgnZm9vdGVyJykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICQoJ2lmcmFtZScpLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gRXh0cmFjdCB0aXRsZVxyXG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9ICQoJ3RpdGxlJykudGV4dCgpLnRyaW0oKSB8fCB0aGlzLnVybDtcclxuXHJcbiAgICAgICAgICAgIC8vIEV4dHJhY3QgbWFpbiBjb250ZW50IC0gc2ltcGxpc3RpYyBhcHByb2FjaFxyXG4gICAgICAgICAgICAvLyBUcnkgdG8gZmluZCBtYWluIGNvbnRlbnQgY29udGFpbmVycyBpZiBwb3NzaWJsZSwgb3RoZXJ3aXNlIGJvZHlcclxuICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSAnJztcclxuICAgICAgICAgICAgY29uc3QgbWFpbiA9ICQoJ21haW4nKTtcclxuICAgICAgICAgICAgY29uc3QgYXJ0aWNsZSA9ICQoJ2FydGljbGUnKTtcclxuICAgICAgICAgICAgY29uc3QgY29udGVudERpdiA9ICQoJyNjb250ZW50LCAuY29udGVudCwgI21haW4sIC5tYWluJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAobWFpbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50ID0gbWFpbi50ZXh0KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYXJ0aWNsZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50ID0gYXJ0aWNsZS50ZXh0KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY29udGVudERpdi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50ID0gY29udGVudERpdi50ZXh0KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50ID0gJCgnYm9keScpLnRleHQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQ2xlYW51cCB3aGl0ZXNwYWNlXHJcbiAgICAgICAgICAgIGNvbnRlbnQgPSBjb250ZW50LnJlcGxhY2UoL1xccysvZywgJyAnKS50cmltKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWNvbnRlbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgV2ViRGF0YVNvdXJjZTogTm8gY29udGVudCBmb3VuZCBmb3IgJHt0aGlzLnVybH1gKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgZG9jOiBEb2N1bWVudCA9IHtcclxuICAgICAgICAgICAgICAgIGlkOiB0aGlzLnVybCxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGNvbnRlbnQsXHJcbiAgICAgICAgICAgICAgICBtZXRhZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IHRoaXMudXJsLFxyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZVR5cGU6ICd3ZWInLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGVGZXRjaGVkOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKClcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzb3VyY2U6ICd3ZWInLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gW2RvY107XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gZmV0Y2ggVVJMICR7dGhpcy51cmx9OmAsIGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBmZXRjaCBVUkwgJHt0aGlzLnVybH06ICR7ZXJyb3IubWVzc2FnZX1gKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbImF4aW9zIiwiY2hlZXJpbyIsIldlYkRhdGFTb3VyY2UiLCJjb25zdHJ1Y3RvciIsInVybCIsIm5hbWUiLCJjb25uZWN0IiwiZGlzY29ubmVjdCIsImdldERhdGEiLCJjb25zb2xlIiwibG9nIiwicmVzcG9uc2UiLCJnZXQiLCJoZWFkZXJzIiwidGltZW91dCIsImh0bWwiLCJkYXRhIiwiJCIsImxvYWQiLCJyZW1vdmUiLCJ0aXRsZSIsInRleHQiLCJ0cmltIiwiY29udGVudCIsIm1haW4iLCJhcnRpY2xlIiwiY29udGVudERpdiIsImxlbmd0aCIsInJlcGxhY2UiLCJ3YXJuIiwiZG9jIiwiaWQiLCJtZXRhZGF0YSIsInNvdXJjZVR5cGUiLCJkYXRlRmV0Y2hlZCIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsInNvdXJjZSIsImNyZWF0ZWRBdCIsImVycm9yIiwibWVzc2FnZSIsIkVycm9yIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/rag/connectors/web.ts\n");

/***/ }),

/***/ "(rsc)/./src/rag/pinecone-store.ts":
/*!***********************************!*\
  !*** ./src/rag/pinecone-store.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PineconeVectorStore: () => (/* binding */ PineconeVectorStore)\n/* harmony export */ });\n/* harmony import */ var _pinecone_database_pinecone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pinecone-database/pinecone */ \"(rsc)/./node_modules/@pinecone-database/pinecone/dist/index.js\");\n/* harmony import */ var _pinecone_database_pinecone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_pinecone_database_pinecone__WEBPACK_IMPORTED_MODULE_0__);\n\nclass PineconeVectorStore {\n    constructor(apiKey, indexName){\n        this.client = new _pinecone_database_pinecone__WEBPACK_IMPORTED_MODULE_0__.Pinecone({\n            apiKey: apiKey\n        });\n        this.indexName = indexName;\n    }\n    async addDocuments(documents) {\n        console.log(`Adding ${documents.length} documents to Pinecone Index: ${this.indexName}`);\n        const index = this.client.index(this.indexName);\n        // Convert documents to Pinecone records\n        // Note: In a real app, we need an embedding model (like OpenAI or NVIDIAs) to generate vectors.\n        // For this plumbing demo, we will generate \"dummy\" random vectors to satisfy the API check if needed,\n        // OR warn that embeddings are missing.\n        // Pinecone REQUIRES vectors. \n        console.log(\"NOTE: Real embeddings are required for Pinecone. Using mock random vectors for demonstration.\");\n        // Assuming 1536 dimensions (common for OpenAI text-embedding-ada-002)\n        const records = documents.map((doc)=>({\n                id: doc.id,\n                values: Array.from({\n                    length: 1536\n                }, ()=>Math.random()),\n                metadata: {\n                    ...doc.metadata,\n                    content: doc.content,\n                    source: doc.source\n                }\n            }));\n        // Batch upload (Pinecone limits batch sizes, usually 100-200 is safe)\n        const batchSize = 100;\n        for(let i = 0; i < records.length; i += batchSize){\n            const batch = records.slice(i, i + batchSize);\n            await index.upsert({\n                records: batch\n            });\n        }\n        console.log(`Successfully added documents to Pinecone.`);\n    }\n    async search(query, limit = 5) {\n        console.log(`Searching Pinecone for: \"${query}\"`);\n        const index = this.client.index(this.indexName);\n        // Again, we need a query vector.\n        console.log(\"NOTE: Using mock query vector.\");\n        const queryVector = Array.from({\n            length: 1536\n        }, ()=>Math.random());\n        const results = await index.query({\n            vector: queryVector,\n            topK: limit,\n            includeMetadata: true\n        });\n        return results.matches.map((match)=>{\n            const metadata = match.metadata;\n            return {\n                id: match.id,\n                content: metadata.content || \"\",\n                metadata: metadata,\n                source: metadata.source || \"pinecone\",\n                createdAt: new Date() // Metadata usually doesn't store dates as objects\n            };\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvcmFnL3BpbmVjb25lLXN0b3JlLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUN1RDtBQUVoRCxNQUFNQztJQUlUQyxZQUFZQyxNQUFjLEVBQUVDLFNBQWlCLENBQUU7UUFDM0MsSUFBSSxDQUFDQyxNQUFNLEdBQUcsSUFBSUwsaUVBQVFBLENBQUM7WUFDdkJHLFFBQVFBO1FBQ1o7UUFDQSxJQUFJLENBQUNDLFNBQVMsR0FBR0E7SUFDckI7SUFFQSxNQUFNRSxhQUFhQyxTQUFxQixFQUFpQjtRQUNyREMsUUFBUUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFRixVQUFVRyxNQUFNLENBQUMsOEJBQThCLEVBQUUsSUFBSSxDQUFDTixTQUFTLENBQUMsQ0FBQztRQUV2RixNQUFNTyxRQUFRLElBQUksQ0FBQ04sTUFBTSxDQUFDTSxLQUFLLENBQUMsSUFBSSxDQUFDUCxTQUFTO1FBRTlDLHdDQUF3QztRQUN4QyxnR0FBZ0c7UUFDaEcsc0dBQXNHO1FBQ3RHLHVDQUF1QztRQUN2Qyw4QkFBOEI7UUFFOUJJLFFBQVFDLEdBQUcsQ0FBQztRQUVaLHNFQUFzRTtRQUN0RSxNQUFNRyxVQUFVTCxVQUFVTSxHQUFHLENBQUNDLENBQUFBLE1BQVE7Z0JBQ2xDQyxJQUFJRCxJQUFJQyxFQUFFO2dCQUNWQyxRQUFRQyxNQUFNQyxJQUFJLENBQUM7b0JBQUVSLFFBQVE7Z0JBQUssR0FBRyxJQUFNUyxLQUFLQyxNQUFNO2dCQUN0REMsVUFBVTtvQkFDTixHQUFHUCxJQUFJTyxRQUFRO29CQUNmQyxTQUFTUixJQUFJUSxPQUFPO29CQUNwQkMsUUFBUVQsSUFBSVMsTUFBTTtnQkFDdEI7WUFDSjtRQUVBLHNFQUFzRTtRQUN0RSxNQUFNQyxZQUFZO1FBQ2xCLElBQUssSUFBSUMsSUFBSSxHQUFHQSxJQUFJYixRQUFRRixNQUFNLEVBQUVlLEtBQUtELFVBQVc7WUFDaEQsTUFBTUUsUUFBUWQsUUFBUWUsS0FBSyxDQUFDRixHQUFHQSxJQUFJRDtZQUNuQyxNQUFNYixNQUFNaUIsTUFBTSxDQUFDO2dCQUFFaEIsU0FBU2M7WUFBTTtRQUN4QztRQUVBbEIsUUFBUUMsR0FBRyxDQUFDLENBQUMseUNBQXlDLENBQUM7SUFDM0Q7SUFFQSxNQUFNb0IsT0FBT0MsS0FBYSxFQUFFQyxRQUFnQixDQUFDLEVBQXVCO1FBQ2hFdkIsUUFBUUMsR0FBRyxDQUFDLENBQUMseUJBQXlCLEVBQUVxQixNQUFNLENBQUMsQ0FBQztRQUNoRCxNQUFNbkIsUUFBUSxJQUFJLENBQUNOLE1BQU0sQ0FBQ00sS0FBSyxDQUFDLElBQUksQ0FBQ1AsU0FBUztRQUU5QyxpQ0FBaUM7UUFDakNJLFFBQVFDLEdBQUcsQ0FBQztRQUNaLE1BQU11QixjQUFjZixNQUFNQyxJQUFJLENBQUM7WUFBRVIsUUFBUTtRQUFLLEdBQUcsSUFBTVMsS0FBS0MsTUFBTTtRQUVsRSxNQUFNYSxVQUFVLE1BQU10QixNQUFNbUIsS0FBSyxDQUFDO1lBQzlCSSxRQUFRRjtZQUNSRyxNQUFNSjtZQUNOSyxpQkFBaUI7UUFDckI7UUFFQSxPQUFPSCxRQUFRSSxPQUFPLENBQUN4QixHQUFHLENBQUN5QixDQUFBQTtZQUN2QixNQUFNakIsV0FBV2lCLE1BQU1qQixRQUFRO1lBQy9CLE9BQU87Z0JBQ0hOLElBQUl1QixNQUFNdkIsRUFBRTtnQkFDWk8sU0FBU0QsU0FBU0MsT0FBTyxJQUFJO2dCQUM3QkQsVUFBVUE7Z0JBQ1ZFLFFBQVFGLFNBQVNFLE1BQU0sSUFBSTtnQkFDM0JnQixXQUFXLElBQUlDLE9BQU8sa0RBQWtEO1lBQzVFO1FBQ0o7SUFDSjtBQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbnZpZGlhLWJvdC8uL3NyYy9yYWcvcGluZWNvbmUtc3RvcmUudHM/YzZjNyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWZWN0b3JTdG9yZSwgRG9jdW1lbnQgfSBmcm9tICcuL3R5cGVzJztcclxuaW1wb3J0IHsgUGluZWNvbmUgfSBmcm9tICdAcGluZWNvbmUtZGF0YWJhc2UvcGluZWNvbmUnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBpbmVjb25lVmVjdG9yU3RvcmUgaW1wbGVtZW50cyBWZWN0b3JTdG9yZSB7XHJcbiAgICBwcml2YXRlIGNsaWVudDogUGluZWNvbmU7XHJcbiAgICBwcml2YXRlIGluZGV4TmFtZTogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGFwaUtleTogc3RyaW5nLCBpbmRleE5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuY2xpZW50ID0gbmV3IFBpbmVjb25lKHtcclxuICAgICAgICAgICAgYXBpS2V5OiBhcGlLZXlcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmluZGV4TmFtZSA9IGluZGV4TmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBhZGREb2N1bWVudHMoZG9jdW1lbnRzOiBEb2N1bWVudFtdKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYEFkZGluZyAke2RvY3VtZW50cy5sZW5ndGh9IGRvY3VtZW50cyB0byBQaW5lY29uZSBJbmRleDogJHt0aGlzLmluZGV4TmFtZX1gKTtcclxuXHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmNsaWVudC5pbmRleCh0aGlzLmluZGV4TmFtZSk7XHJcblxyXG4gICAgICAgIC8vIENvbnZlcnQgZG9jdW1lbnRzIHRvIFBpbmVjb25lIHJlY29yZHNcclxuICAgICAgICAvLyBOb3RlOiBJbiBhIHJlYWwgYXBwLCB3ZSBuZWVkIGFuIGVtYmVkZGluZyBtb2RlbCAobGlrZSBPcGVuQUkgb3IgTlZJRElBcykgdG8gZ2VuZXJhdGUgdmVjdG9ycy5cclxuICAgICAgICAvLyBGb3IgdGhpcyBwbHVtYmluZyBkZW1vLCB3ZSB3aWxsIGdlbmVyYXRlIFwiZHVtbXlcIiByYW5kb20gdmVjdG9ycyB0byBzYXRpc2Z5IHRoZSBBUEkgY2hlY2sgaWYgbmVlZGVkLFxyXG4gICAgICAgIC8vIE9SIHdhcm4gdGhhdCBlbWJlZGRpbmdzIGFyZSBtaXNzaW5nLlxyXG4gICAgICAgIC8vIFBpbmVjb25lIFJFUVVJUkVTIHZlY3RvcnMuIFxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIk5PVEU6IFJlYWwgZW1iZWRkaW5ncyBhcmUgcmVxdWlyZWQgZm9yIFBpbmVjb25lLiBVc2luZyBtb2NrIHJhbmRvbSB2ZWN0b3JzIGZvciBkZW1vbnN0cmF0aW9uLlwiKTtcclxuXHJcbiAgICAgICAgLy8gQXNzdW1pbmcgMTUzNiBkaW1lbnNpb25zIChjb21tb24gZm9yIE9wZW5BSSB0ZXh0LWVtYmVkZGluZy1hZGEtMDAyKVxyXG4gICAgICAgIGNvbnN0IHJlY29yZHMgPSBkb2N1bWVudHMubWFwKGRvYyA9PiAoe1xyXG4gICAgICAgICAgICBpZDogZG9jLmlkLFxyXG4gICAgICAgICAgICB2YWx1ZXM6IEFycmF5LmZyb20oeyBsZW5ndGg6IDE1MzYgfSwgKCkgPT4gTWF0aC5yYW5kb20oKSksIC8vIE1PQ0sgVkVDVE9SU1xyXG4gICAgICAgICAgICBtZXRhZGF0YToge1xyXG4gICAgICAgICAgICAgICAgLi4uZG9jLm1ldGFkYXRhLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogZG9jLmNvbnRlbnQsIC8vIHN0b3JpbmcgY29udGVudCBpbiBtZXRhZGF0YSBmb3IgcmV0cmlldmFsXHJcbiAgICAgICAgICAgICAgICBzb3VyY2U6IGRvYy5zb3VyY2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgLy8gQmF0Y2ggdXBsb2FkIChQaW5lY29uZSBsaW1pdHMgYmF0Y2ggc2l6ZXMsIHVzdWFsbHkgMTAwLTIwMCBpcyBzYWZlKVxyXG4gICAgICAgIGNvbnN0IGJhdGNoU2l6ZSA9IDEwMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlY29yZHMubGVuZ3RoOyBpICs9IGJhdGNoU2l6ZSkge1xyXG4gICAgICAgICAgICBjb25zdCBiYXRjaCA9IHJlY29yZHMuc2xpY2UoaSwgaSArIGJhdGNoU2l6ZSk7XHJcbiAgICAgICAgICAgIGF3YWl0IGluZGV4LnVwc2VydCh7IHJlY29yZHM6IGJhdGNoIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coYFN1Y2Nlc3NmdWxseSBhZGRlZCBkb2N1bWVudHMgdG8gUGluZWNvbmUuYCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgc2VhcmNoKHF1ZXJ5OiBzdHJpbmcsIGxpbWl0OiBudW1iZXIgPSA1KTogUHJvbWlzZTxEb2N1bWVudFtdPiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYFNlYXJjaGluZyBQaW5lY29uZSBmb3I6IFwiJHtxdWVyeX1cImApO1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jbGllbnQuaW5kZXgodGhpcy5pbmRleE5hbWUpO1xyXG5cclxuICAgICAgICAvLyBBZ2Fpbiwgd2UgbmVlZCBhIHF1ZXJ5IHZlY3Rvci5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIk5PVEU6IFVzaW5nIG1vY2sgcXVlcnkgdmVjdG9yLlwiKTtcclxuICAgICAgICBjb25zdCBxdWVyeVZlY3RvciA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDE1MzYgfSwgKCkgPT4gTWF0aC5yYW5kb20oKSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCBpbmRleC5xdWVyeSh7XHJcbiAgICAgICAgICAgIHZlY3RvcjogcXVlcnlWZWN0b3IsXHJcbiAgICAgICAgICAgIHRvcEs6IGxpbWl0LFxyXG4gICAgICAgICAgICBpbmNsdWRlTWV0YWRhdGE6IHRydWVcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdHMubWF0Y2hlcy5tYXAobWF0Y2ggPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBtZXRhZGF0YSA9IG1hdGNoLm1ldGFkYXRhIGFzIFJlY29yZDxzdHJpbmcsIGFueT47XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBpZDogbWF0Y2guaWQsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiBtZXRhZGF0YS5jb250ZW50IHx8ICcnLFxyXG4gICAgICAgICAgICAgICAgbWV0YWRhdGE6IG1ldGFkYXRhLFxyXG4gICAgICAgICAgICAgICAgc291cmNlOiBtZXRhZGF0YS5zb3VyY2UgfHwgJ3BpbmVjb25lJyxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKSAvLyBNZXRhZGF0YSB1c3VhbGx5IGRvZXNuJ3Qgc3RvcmUgZGF0ZXMgYXMgb2JqZWN0c1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJQaW5lY29uZSIsIlBpbmVjb25lVmVjdG9yU3RvcmUiLCJjb25zdHJ1Y3RvciIsImFwaUtleSIsImluZGV4TmFtZSIsImNsaWVudCIsImFkZERvY3VtZW50cyIsImRvY3VtZW50cyIsImNvbnNvbGUiLCJsb2ciLCJsZW5ndGgiLCJpbmRleCIsInJlY29yZHMiLCJtYXAiLCJkb2MiLCJpZCIsInZhbHVlcyIsIkFycmF5IiwiZnJvbSIsIk1hdGgiLCJyYW5kb20iLCJtZXRhZGF0YSIsImNvbnRlbnQiLCJzb3VyY2UiLCJiYXRjaFNpemUiLCJpIiwiYmF0Y2giLCJzbGljZSIsInVwc2VydCIsInNlYXJjaCIsInF1ZXJ5IiwibGltaXQiLCJxdWVyeVZlY3RvciIsInJlc3VsdHMiLCJ2ZWN0b3IiLCJ0b3BLIiwiaW5jbHVkZU1ldGFkYXRhIiwibWF0Y2hlcyIsIm1hdGNoIiwiY3JlYXRlZEF0IiwiRGF0ZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/rag/pinecone-store.ts\n");

/***/ }),

/***/ "(rsc)/./src/rag/rag-manager.ts":
/*!********************************!*\
  !*** ./src/rag/rag-manager.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   RAGManager: () => (/* binding */ RAGManager)\n/* harmony export */ });\nclass RAGManager {\n    constructor(vectorStore){\n        this.sources = [];\n        this.vectorStore = vectorStore;\n    }\n    registerSource(source) {\n        this.sources.push(source);\n        console.log(`Registered Data Source: ${source.name}`);\n    }\n    async ingestAll() {\n        console.log(\"Starting ingestion from all sources...\");\n        for (const source of this.sources){\n            try {\n                await source.connect();\n                console.log(`Fetching data from ${source.name}...`);\n                const documents = await source.getData();\n                console.log(`Retrieved ${documents.length} documents from ${source.name}.`);\n                await this.vectorStore.addDocuments(documents);\n                await source.disconnect();\n            } catch (error) {\n                console.error(`Error ingesting from ${source.name}:`, error);\n            }\n        }\n        console.log(\"Ingestion complete.\");\n    }\n    async retrieve(query) {\n        return this.vectorStore.search(query);\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvcmFnL3JhZy1tYW5hZ2VyLnRzIiwibWFwcGluZ3MiOiI7Ozs7QUFFTyxNQUFNQTtJQUlUQyxZQUFZQyxXQUF3QixDQUFFO2FBSDlCQyxVQUF3QixFQUFFO1FBSTlCLElBQUksQ0FBQ0QsV0FBVyxHQUFHQTtJQUN2QjtJQUVBRSxlQUFlQyxNQUFrQixFQUFFO1FBQy9CLElBQUksQ0FBQ0YsT0FBTyxDQUFDRyxJQUFJLENBQUNEO1FBQ2xCRSxRQUFRQyxHQUFHLENBQUMsQ0FBQyx3QkFBd0IsRUFBRUgsT0FBT0ksSUFBSSxDQUFDLENBQUM7SUFDeEQ7SUFFQSxNQUFNQyxZQUEyQjtRQUM3QkgsUUFBUUMsR0FBRyxDQUFDO1FBQ1osS0FBSyxNQUFNSCxVQUFVLElBQUksQ0FBQ0YsT0FBTyxDQUFFO1lBQy9CLElBQUk7Z0JBQ0EsTUFBTUUsT0FBT00sT0FBTztnQkFDcEJKLFFBQVFDLEdBQUcsQ0FBQyxDQUFDLG1CQUFtQixFQUFFSCxPQUFPSSxJQUFJLENBQUMsR0FBRyxDQUFDO2dCQUNsRCxNQUFNRyxZQUFZLE1BQU1QLE9BQU9RLE9BQU87Z0JBQ3RDTixRQUFRQyxHQUFHLENBQUMsQ0FBQyxVQUFVLEVBQUVJLFVBQVVFLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRVQsT0FBT0ksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFFMUUsTUFBTSxJQUFJLENBQUNQLFdBQVcsQ0FBQ2EsWUFBWSxDQUFDSDtnQkFDcEMsTUFBTVAsT0FBT1csVUFBVTtZQUMzQixFQUFFLE9BQU9DLE9BQU87Z0JBQ1pWLFFBQVFVLEtBQUssQ0FBQyxDQUFDLHFCQUFxQixFQUFFWixPQUFPSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUVRO1lBQzFEO1FBQ0o7UUFDQVYsUUFBUUMsR0FBRyxDQUFDO0lBQ2hCO0lBRUEsTUFBTVUsU0FBU0MsS0FBYSxFQUF1QjtRQUMvQyxPQUFPLElBQUksQ0FBQ2pCLFdBQVcsQ0FBQ2tCLE1BQU0sQ0FBQ0Q7SUFDbkM7QUFDSiIsInNvdXJjZXMiOlsid2VicGFjazovL252aWRpYS1ib3QvLi9zcmMvcmFnL3JhZy1tYW5hZ2VyLnRzPzQ3NzAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0YVNvdXJjZSwgVmVjdG9yU3RvcmUsIERvY3VtZW50IH0gZnJvbSAnLi90eXBlcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgUkFHTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHNvdXJjZXM6IERhdGFTb3VyY2VbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSB2ZWN0b3JTdG9yZTogVmVjdG9yU3RvcmU7XHJcblxyXG4gICAgY29uc3RydWN0b3IodmVjdG9yU3RvcmU6IFZlY3RvclN0b3JlKSB7XHJcbiAgICAgICAgdGhpcy52ZWN0b3JTdG9yZSA9IHZlY3RvclN0b3JlO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyU291cmNlKHNvdXJjZTogRGF0YVNvdXJjZSkge1xyXG4gICAgICAgIHRoaXMuc291cmNlcy5wdXNoKHNvdXJjZSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coYFJlZ2lzdGVyZWQgRGF0YSBTb3VyY2U6ICR7c291cmNlLm5hbWV9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgaW5nZXN0QWxsKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdTdGFydGluZyBpbmdlc3Rpb24gZnJvbSBhbGwgc291cmNlcy4uLicpO1xyXG4gICAgICAgIGZvciAoY29uc3Qgc291cmNlIG9mIHRoaXMuc291cmNlcykge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgc291cmNlLmNvbm5lY3QoKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBGZXRjaGluZyBkYXRhIGZyb20gJHtzb3VyY2UubmFtZX0uLi5gKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRvY3VtZW50cyA9IGF3YWl0IHNvdXJjZS5nZXREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgUmV0cmlldmVkICR7ZG9jdW1lbnRzLmxlbmd0aH0gZG9jdW1lbnRzIGZyb20gJHtzb3VyY2UubmFtZX0uYCk7XHJcblxyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy52ZWN0b3JTdG9yZS5hZGREb2N1bWVudHMoZG9jdW1lbnRzKTtcclxuICAgICAgICAgICAgICAgIGF3YWl0IHNvdXJjZS5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBpbmdlc3RpbmcgZnJvbSAke3NvdXJjZS5uYW1lfTpgLCBlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0luZ2VzdGlvbiBjb21wbGV0ZS4nKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyByZXRyaWV2ZShxdWVyeTogc3RyaW5nKTogUHJvbWlzZTxEb2N1bWVudFtdPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmVjdG9yU3RvcmUuc2VhcmNoKHF1ZXJ5KTtcclxuICAgIH1cclxufVxyXG4iXSwibmFtZXMiOlsiUkFHTWFuYWdlciIsImNvbnN0cnVjdG9yIiwidmVjdG9yU3RvcmUiLCJzb3VyY2VzIiwicmVnaXN0ZXJTb3VyY2UiLCJzb3VyY2UiLCJwdXNoIiwiY29uc29sZSIsImxvZyIsIm5hbWUiLCJpbmdlc3RBbGwiLCJjb25uZWN0IiwiZG9jdW1lbnRzIiwiZ2V0RGF0YSIsImxlbmd0aCIsImFkZERvY3VtZW50cyIsImRpc2Nvbm5lY3QiLCJlcnJvciIsInJldHJpZXZlIiwicXVlcnkiLCJzZWFyY2giXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/rag/rag-manager.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@pinecone-database","vendor-chunks/ms","vendor-chunks/undici","vendor-chunks/axios","vendor-chunks/iconv-lite","vendor-chunks/parse5","vendor-chunks/cheerio","vendor-chunks/css-select","vendor-chunks/asynckit","vendor-chunks/htmlparser2","vendor-chunks/entities","vendor-chunks/domutils","vendor-chunks/math-intrinsics","vendor-chunks/es-errors","vendor-chunks/whatwg-mimetype","vendor-chunks/call-bind-apply-helpers","vendor-chunks/debug","vendor-chunks/nth-check","vendor-chunks/cheerio-select","vendor-chunks/whatwg-encoding","vendor-chunks/get-proto","vendor-chunks/encoding-sniffer","vendor-chunks/domhandler","vendor-chunks/dom-serializer","vendor-chunks/mime-db","vendor-chunks/has-symbols","vendor-chunks/gopd","vendor-chunks/function-bind","vendor-chunks/form-data","vendor-chunks/follow-redirects","vendor-chunks/css-what","vendor-chunks/parse5-parser-stream","vendor-chunks/parse5-htmlparser2-tree-adapter","vendor-chunks/domelementtype","vendor-chunks/supports-color","vendor-chunks/safer-buffer","vendor-chunks/proxy-from-env","vendor-chunks/mime-types","vendor-chunks/hasown","vendor-chunks/has-tostringtag","vendor-chunks/has-flag","vendor-chunks/get-intrinsic","vendor-chunks/es-set-tostringtag","vendor-chunks/es-object-atoms","vendor-chunks/es-define-property","vendor-chunks/dunder-proto","vendor-chunks/delayed-stream","vendor-chunks/combined-stream","vendor-chunks/boolbase"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Frag%2Fingest%2Froute&page=%2Fapi%2Frag%2Fingest%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Frag%2Fingest%2Froute.ts&appDir=C%3A%5CUsers%5CAdministrator%5CDesktop%5Cnvidia-bot%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CAdministrator%5CDesktop%5Cnvidia-bot&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();