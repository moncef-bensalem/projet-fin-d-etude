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
exports.id = "app/api/products/store-counts/route";
exports.ids = ["app/api/products/store-counts/route"];
exports.modules = {

/***/ "(rsc)/./app/api/products/store-counts/route.js":
/*!************************************************!*\
  !*** ./app/api/products/store-counts/route.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.js\");\n\n\nasync function GET() {\n    try {\n        console.log('[PRODUCTS_STORE_COUNTS_GET] Fetching product counts for approved stores...');\n        // 1. D'abord, récupérer les IDs des magasins approuvés\n        const approvedStores = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].store.findMany({\n            where: {\n                isApproved: true\n            },\n            select: {\n                id: true\n            }\n        });\n        const approvedStoreIds = approvedStores.map((store)=>store.id);\n        console.log(`[PRODUCTS_STORE_COUNTS_GET] Found ${approvedStoreIds.length} approved stores`);\n        // 2. Récupérer les comptages de produits uniquement pour les magasins approuvés\n        const storeProducts = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].product.groupBy({\n            by: [\n                'storeId'\n            ],\n            _count: {\n                id: true\n            },\n            where: {\n                storeId: {\n                    in: approvedStoreIds\n                }\n            }\n        });\n        // Formater les résultats en un objet plus facile à utiliser\n        const storeCounts = {};\n        storeProducts.forEach((item)=>{\n            if (item.storeId) {\n                storeCounts[item.storeId] = item._count.id;\n            }\n        });\n        console.log('[PRODUCTS_STORE_COUNTS_GET] Product counts retrieved successfully');\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            storeCounts\n        });\n    } catch (error) {\n        console.error('[PRODUCTS_STORE_COUNTS_GET] Error:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: `Erreur lors de la récupération des comptages de produits par magasin: ${error.message}`,\n            storeCounts: {}\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3Byb2R1Y3RzL3N0b3JlLWNvdW50cy9yb3V0ZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBMkM7QUFDVDtBQUUzQixlQUFlRTtJQUNwQixJQUFJO1FBQ0ZDLFFBQVFDLEdBQUcsQ0FBQztRQUVaLHVEQUF1RDtRQUN2RCxNQUFNQyxpQkFBaUIsTUFBTUosbURBQU1BLENBQUNLLEtBQUssQ0FBQ0MsUUFBUSxDQUFDO1lBQ2pEQyxPQUFPO2dCQUNMQyxZQUFZO1lBQ2Q7WUFDQUMsUUFBUTtnQkFDTkMsSUFBSTtZQUNOO1FBQ0Y7UUFFQSxNQUFNQyxtQkFBbUJQLGVBQWVRLEdBQUcsQ0FBQ1AsQ0FBQUEsUUFBU0EsTUFBTUssRUFBRTtRQUM3RFIsUUFBUUMsR0FBRyxDQUFDLENBQUMsa0NBQWtDLEVBQUVRLGlCQUFpQkUsTUFBTSxDQUFDLGdCQUFnQixDQUFDO1FBRTFGLGdGQUFnRjtRQUNoRixNQUFNQyxnQkFBZ0IsTUFBTWQsbURBQU1BLENBQUNlLE9BQU8sQ0FBQ0MsT0FBTyxDQUFDO1lBQ2pEQyxJQUFJO2dCQUFDO2FBQVU7WUFDZkMsUUFBUTtnQkFDTlIsSUFBSTtZQUNOO1lBQ0FILE9BQU87Z0JBQ0xZLFNBQVM7b0JBQ1BDLElBQUlUO2dCQUNOO1lBQ0Y7UUFDRjtRQUVBLDREQUE0RDtRQUM1RCxNQUFNVSxjQUFjLENBQUM7UUFDckJQLGNBQWNRLE9BQU8sQ0FBQ0MsQ0FBQUE7WUFDcEIsSUFBSUEsS0FBS0osT0FBTyxFQUFFO2dCQUNoQkUsV0FBVyxDQUFDRSxLQUFLSixPQUFPLENBQUMsR0FBR0ksS0FBS0wsTUFBTSxDQUFDUixFQUFFO1lBQzVDO1FBQ0Y7UUFFQVIsUUFBUUMsR0FBRyxDQUFDO1FBQ1osT0FBT0oscURBQVlBLENBQUN5QixJQUFJLENBQUM7WUFDdkJDLFNBQVM7WUFDVEo7UUFDRjtJQUNGLEVBQUUsT0FBT0ssT0FBTztRQUNkeEIsUUFBUXdCLEtBQUssQ0FBQyxzQ0FBc0NBO1FBQ3BELE9BQU8zQixxREFBWUEsQ0FBQ3lCLElBQUksQ0FDdEI7WUFDRUUsT0FBTyxDQUFDLHNFQUFzRSxFQUFFQSxNQUFNQyxPQUFPLEVBQUU7WUFDL0ZOLGFBQWEsQ0FBQztRQUNoQixHQUNBO1lBQUVPLFFBQVE7UUFBSTtJQUVsQjtBQUNGIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXFN0b3VmYVxcRGVza3RvcFxccGZlXFxQZmVcXGFwcFxcYXBpXFxwcm9kdWN0c1xcc3RvcmUtY291bnRzXFxyb3V0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcclxuaW1wb3J0IHByaXNtYSBmcm9tICdAL2xpYi9wcmlzbWEnO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVCgpIHtcclxuICB0cnkge1xyXG4gICAgY29uc29sZS5sb2coJ1tQUk9EVUNUU19TVE9SRV9DT1VOVFNfR0VUXSBGZXRjaGluZyBwcm9kdWN0IGNvdW50cyBmb3IgYXBwcm92ZWQgc3RvcmVzLi4uJyk7XHJcbiAgICBcclxuICAgIC8vIDEuIEQnYWJvcmQsIHLDqWN1cMOpcmVyIGxlcyBJRHMgZGVzIG1hZ2FzaW5zIGFwcHJvdXbDqXNcclxuICAgIGNvbnN0IGFwcHJvdmVkU3RvcmVzID0gYXdhaXQgcHJpc21hLnN0b3JlLmZpbmRNYW55KHtcclxuICAgICAgd2hlcmU6IHtcclxuICAgICAgICBpc0FwcHJvdmVkOiB0cnVlXHJcbiAgICAgIH0sXHJcbiAgICAgIHNlbGVjdDoge1xyXG4gICAgICAgIGlkOiB0cnVlXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICBjb25zdCBhcHByb3ZlZFN0b3JlSWRzID0gYXBwcm92ZWRTdG9yZXMubWFwKHN0b3JlID0+IHN0b3JlLmlkKTtcclxuICAgIGNvbnNvbGUubG9nKGBbUFJPRFVDVFNfU1RPUkVfQ09VTlRTX0dFVF0gRm91bmQgJHthcHByb3ZlZFN0b3JlSWRzLmxlbmd0aH0gYXBwcm92ZWQgc3RvcmVzYCk7XHJcbiAgICBcclxuICAgIC8vIDIuIFLDqWN1cMOpcmVyIGxlcyBjb21wdGFnZXMgZGUgcHJvZHVpdHMgdW5pcXVlbWVudCBwb3VyIGxlcyBtYWdhc2lucyBhcHByb3V2w6lzXHJcbiAgICBjb25zdCBzdG9yZVByb2R1Y3RzID0gYXdhaXQgcHJpc21hLnByb2R1Y3QuZ3JvdXBCeSh7XHJcbiAgICAgIGJ5OiBbJ3N0b3JlSWQnXSxcclxuICAgICAgX2NvdW50OiB7XHJcbiAgICAgICAgaWQ6IHRydWVcclxuICAgICAgfSxcclxuICAgICAgd2hlcmU6IHtcclxuICAgICAgICBzdG9yZUlkOiB7XHJcbiAgICAgICAgICBpbjogYXBwcm92ZWRTdG9yZUlkc1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIC8vIEZvcm1hdGVyIGxlcyByw6lzdWx0YXRzIGVuIHVuIG9iamV0IHBsdXMgZmFjaWxlIMOgIHV0aWxpc2VyXHJcbiAgICBjb25zdCBzdG9yZUNvdW50cyA9IHt9O1xyXG4gICAgc3RvcmVQcm9kdWN0cy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICBpZiAoaXRlbS5zdG9yZUlkKSB7XHJcbiAgICAgICAgc3RvcmVDb3VudHNbaXRlbS5zdG9yZUlkXSA9IGl0ZW0uX2NvdW50LmlkO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgY29uc29sZS5sb2coJ1tQUk9EVUNUU19TVE9SRV9DT1VOVFNfR0VUXSBQcm9kdWN0IGNvdW50cyByZXRyaWV2ZWQgc3VjY2Vzc2Z1bGx5Jyk7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBcclxuICAgICAgc3VjY2VzczogdHJ1ZSwgXHJcbiAgICAgIHN0b3JlQ291bnRzIFxyXG4gICAgfSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ1tQUk9EVUNUU19TVE9SRV9DT1VOVFNfR0VUXSBFcnJvcjonLCBlcnJvcik7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgIHsgXHJcbiAgICAgICAgZXJyb3I6IGBFcnJldXIgbG9ycyBkZSBsYSByw6ljdXDDqXJhdGlvbiBkZXMgY29tcHRhZ2VzIGRlIHByb2R1aXRzIHBhciBtYWdhc2luOiAke2Vycm9yLm1lc3NhZ2V9YCxcclxuICAgICAgICBzdG9yZUNvdW50czoge30gXHJcbiAgICAgIH0sXHJcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxyXG4gICAgKTtcclxuICB9XHJcbn0gIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsInByaXNtYSIsIkdFVCIsImNvbnNvbGUiLCJsb2ciLCJhcHByb3ZlZFN0b3JlcyIsInN0b3JlIiwiZmluZE1hbnkiLCJ3aGVyZSIsImlzQXBwcm92ZWQiLCJzZWxlY3QiLCJpZCIsImFwcHJvdmVkU3RvcmVJZHMiLCJtYXAiLCJsZW5ndGgiLCJzdG9yZVByb2R1Y3RzIiwicHJvZHVjdCIsImdyb3VwQnkiLCJieSIsIl9jb3VudCIsInN0b3JlSWQiLCJpbiIsInN0b3JlQ291bnRzIiwiZm9yRWFjaCIsIml0ZW0iLCJqc29uIiwic3VjY2VzcyIsImVycm9yIiwibWVzc2FnZSIsInN0YXR1cyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/products/store-counts/route.js\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.js":
/*!***********************!*\
  !*** ./lib/prisma.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst prismaClientSingleton = ()=>{\n    return new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\n};\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? prismaClientSingleton();\nif (true) {\n    globalForPrisma.prisma = prisma;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE4QztBQUU5QyxNQUFNQyx3QkFBd0I7SUFDNUIsT0FBTyxJQUFJRCx3REFBWUE7QUFDekI7QUFFQSxNQUFNRSxrQkFBa0JDO0FBRXhCLE1BQU1DLFNBQVNGLGdCQUFnQkUsTUFBTSxJQUFJSDtBQUV6QyxJQUFJSSxJQUFxQyxFQUFFO0lBQ3pDSCxnQkFBZ0JFLE1BQU0sR0FBR0E7QUFDM0I7QUFFQSxpRUFBZUEsTUFBTUEsRUFBQyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxTdG91ZmFcXERlc2t0b3BcXHBmZVxcUGZlXFxsaWJcXHByaXNtYS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCc7XG5cbmNvbnN0IHByaXNtYUNsaWVudFNpbmdsZXRvbiA9ICgpID0+IHtcbiAgcmV0dXJuIG5ldyBQcmlzbWFDbGllbnQoKTtcbn07XG5cbmNvbnN0IGdsb2JhbEZvclByaXNtYSA9IGdsb2JhbFRoaXM7XG5cbmNvbnN0IHByaXNtYSA9IGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPz8gcHJpc21hQ2xpZW50U2luZ2xldG9uKCk7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPSBwcmlzbWE7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHByaXNtYTtcbiJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJwcmlzbWFDbGllbnRTaW5nbGV0b24iLCJnbG9iYWxGb3JQcmlzbWEiLCJnbG9iYWxUaGlzIiwicHJpc21hIiwicHJvY2VzcyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fproducts%2Fstore-counts%2Froute&page=%2Fapi%2Fproducts%2Fstore-counts%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fproducts%2Fstore-counts%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fproducts%2Fstore-counts%2Froute&page=%2Fapi%2Fproducts%2Fstore-counts%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fproducts%2Fstore-counts%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Stoufa_Desktop_pfe_Pfe_app_api_products_store_counts_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/products/store-counts/route.js */ \"(rsc)/./app/api/products/store-counts/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/products/store-counts/route\",\n        pathname: \"/api/products/store-counts\",\n        filename: \"route\",\n        bundlePath: \"app/api/products/store-counts/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Stoufa\\\\Desktop\\\\pfe\\\\Pfe\\\\app\\\\api\\\\products\\\\store-counts\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_Stoufa_Desktop_pfe_Pfe_app_api_products_store_counts_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZwcm9kdWN0cyUyRnN0b3JlLWNvdW50cyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGcHJvZHVjdHMlMkZzdG9yZS1jb3VudHMlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZwcm9kdWN0cyUyRnN0b3JlLWNvdW50cyUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNTdG91ZmElNUNEZXNrdG9wJTVDcGZlJTVDUGZlJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNTdG91ZmElNUNEZXNrdG9wJTVDcGZlJTVDUGZlJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNnQztBQUM3RztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcU3RvdWZhXFxcXERlc2t0b3BcXFxccGZlXFxcXFBmZVxcXFxhcHBcXFxcYXBpXFxcXHByb2R1Y3RzXFxcXHN0b3JlLWNvdW50c1xcXFxyb3V0ZS5qc1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvcHJvZHVjdHMvc3RvcmUtY291bnRzL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvcHJvZHVjdHMvc3RvcmUtY291bnRzXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9wcm9kdWN0cy9zdG9yZS1jb3VudHMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxTdG91ZmFcXFxcRGVza3RvcFxcXFxwZmVcXFxcUGZlXFxcXGFwcFxcXFxhcGlcXFxccHJvZHVjdHNcXFxcc3RvcmUtY291bnRzXFxcXHJvdXRlLmpzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fproducts%2Fstore-counts%2Froute&page=%2Fapi%2Fproducts%2Fstore-counts%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fproducts%2Fstore-counts%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client");

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

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fproducts%2Fstore-counts%2Froute&page=%2Fapi%2Fproducts%2Fstore-counts%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fproducts%2Fstore-counts%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();