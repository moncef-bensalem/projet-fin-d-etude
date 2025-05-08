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
exports.id = "app/api/all-products-admin/route";
exports.ids = ["app/api/all-products-admin/route"];
exports.modules = {

/***/ "(rsc)/./app/api/all-products-admin/route.js":
/*!*********************************************!*\
  !*** ./app/api/all-products-admin/route.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_1__.PrismaClient();\nasync function GET() {\n    try {\n        // Récupérer tous les produits avec leurs relations\n        const rawProducts = await prisma.product.findMany({\n            include: {\n                category: true,\n                store: {\n                    include: {\n                        owner: {\n                            select: {\n                                id: true,\n                                name: true,\n                                email: true,\n                                image: true\n                            }\n                        }\n                    }\n                }\n            },\n            orderBy: {\n                createdAt: 'desc'\n            }\n        });\n        // Transformer les produits pour éviter les références circulaires\n        const products = rawProducts.map((product)=>({\n                id: product.id,\n                name: product.name,\n                description: product.description,\n                price: product.price,\n                stock: typeof product.stock === 'bigint' ? Number(product.stock) : product.stock,\n                images: product.images,\n                rating: product.rating,\n                createdAt: product.createdAt,\n                updatedAt: product.updatedAt,\n                category: product.category ? {\n                    id: product.category.id,\n                    name: product.category.name,\n                    description: product.category.description,\n                    image: product.category.image\n                } : null,\n                store: product.store ? {\n                    id: product.store.id,\n                    name: product.store.name,\n                    logo: product.store.logo,\n                    rating: product.store.rating,\n                    seller: product.store.owner ? {\n                        id: product.store.owner.id,\n                        name: product.store.owner.name,\n                        email: product.store.owner.email,\n                        image: product.store.owner.image\n                    } : null\n                } : null\n            }));\n        // Sérialiser les produits pour gérer les BigInt\n        const serializedProducts = JSON.parse(JSON.stringify(products, (key, value)=>typeof value === 'bigint' ? Number(value) : value));\n        // Retourner les produits dans un format cohérent\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            products: serializedProducts\n        });\n    } catch (error) {\n        console.error('[ADMIN_PRODUCTS_GET]', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Erreur lors de la récupération des produits\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2FsbC1wcm9kdWN0cy1hZG1pbi9yb3V0ZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQTJDO0FBQ0c7QUFFOUMsTUFBTUUsU0FBUyxJQUFJRCx3REFBWUE7QUFFeEIsZUFBZUU7SUFDcEIsSUFBSTtRQUNGLG1EQUFtRDtRQUNuRCxNQUFNQyxjQUFjLE1BQU1GLE9BQU9HLE9BQU8sQ0FBQ0MsUUFBUSxDQUFDO1lBQ2hEQyxTQUFTO2dCQUNQQyxVQUFVO2dCQUNWQyxPQUFPO29CQUNMRixTQUFTO3dCQUNQRyxPQUFPOzRCQUNMQyxRQUFRO2dDQUNOQyxJQUFJO2dDQUNKQyxNQUFNO2dDQUNOQyxPQUFPO2dDQUNQQyxPQUFPOzRCQUNUO3dCQUNGO29CQUNGO2dCQUNGO1lBQ0Y7WUFDQUMsU0FBUztnQkFDUEMsV0FBVztZQUNiO1FBQ0Y7UUFFQSxrRUFBa0U7UUFDbEUsTUFBTUMsV0FBV2QsWUFBWWUsR0FBRyxDQUFDZCxDQUFBQSxVQUFZO2dCQUMzQ08sSUFBSVAsUUFBUU8sRUFBRTtnQkFDZEMsTUFBTVIsUUFBUVEsSUFBSTtnQkFDbEJPLGFBQWFmLFFBQVFlLFdBQVc7Z0JBQ2hDQyxPQUFPaEIsUUFBUWdCLEtBQUs7Z0JBQ3BCQyxPQUFPLE9BQU9qQixRQUFRaUIsS0FBSyxLQUFLLFdBQVdDLE9BQU9sQixRQUFRaUIsS0FBSyxJQUFJakIsUUFBUWlCLEtBQUs7Z0JBQ2hGRSxRQUFRbkIsUUFBUW1CLE1BQU07Z0JBQ3RCQyxRQUFRcEIsUUFBUW9CLE1BQU07Z0JBQ3RCUixXQUFXWixRQUFRWSxTQUFTO2dCQUM1QlMsV0FBV3JCLFFBQVFxQixTQUFTO2dCQUM1QmxCLFVBQVVILFFBQVFHLFFBQVEsR0FBRztvQkFDM0JJLElBQUlQLFFBQVFHLFFBQVEsQ0FBQ0ksRUFBRTtvQkFDdkJDLE1BQU1SLFFBQVFHLFFBQVEsQ0FBQ0ssSUFBSTtvQkFDM0JPLGFBQWFmLFFBQVFHLFFBQVEsQ0FBQ1ksV0FBVztvQkFDekNMLE9BQU9WLFFBQVFHLFFBQVEsQ0FBQ08sS0FBSztnQkFDL0IsSUFBSTtnQkFDSk4sT0FBT0osUUFBUUksS0FBSyxHQUFHO29CQUNyQkcsSUFBSVAsUUFBUUksS0FBSyxDQUFDRyxFQUFFO29CQUNwQkMsTUFBTVIsUUFBUUksS0FBSyxDQUFDSSxJQUFJO29CQUN4QmMsTUFBTXRCLFFBQVFJLEtBQUssQ0FBQ2tCLElBQUk7b0JBQ3hCRixRQUFRcEIsUUFBUUksS0FBSyxDQUFDZ0IsTUFBTTtvQkFDNUJHLFFBQVF2QixRQUFRSSxLQUFLLENBQUNDLEtBQUssR0FBRzt3QkFDNUJFLElBQUlQLFFBQVFJLEtBQUssQ0FBQ0MsS0FBSyxDQUFDRSxFQUFFO3dCQUMxQkMsTUFBTVIsUUFBUUksS0FBSyxDQUFDQyxLQUFLLENBQUNHLElBQUk7d0JBQzlCQyxPQUFPVCxRQUFRSSxLQUFLLENBQUNDLEtBQUssQ0FBQ0ksS0FBSzt3QkFDaENDLE9BQU9WLFFBQVFJLEtBQUssQ0FBQ0MsS0FBSyxDQUFDSyxLQUFLO29CQUNsQyxJQUFJO2dCQUNOLElBQUk7WUFDTjtRQUVBLGdEQUFnRDtRQUNoRCxNQUFNYyxxQkFBcUJDLEtBQUtDLEtBQUssQ0FDbkNELEtBQUtFLFNBQVMsQ0FBQ2QsVUFBVSxDQUFDZSxLQUFLQyxRQUM3QixPQUFPQSxVQUFVLFdBQVdYLE9BQU9XLFNBQVNBO1FBSWhELGlEQUFpRDtRQUNqRCxPQUFPbEMscURBQVlBLENBQUNtQyxJQUFJLENBQUM7WUFBRWpCLFVBQVVXO1FBQW1CO0lBQzFELEVBQUUsT0FBT08sT0FBTztRQUNkQyxRQUFRRCxLQUFLLENBQUMsd0JBQXdCQTtRQUN0QyxPQUFPcEMscURBQVlBLENBQUNtQyxJQUFJLENBQUM7WUFBRUMsT0FBTztRQUE4QyxHQUFHO1lBQUVFLFFBQVE7UUFBSTtJQUNuRztBQUNGIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXFN0b3VmYVxcRGVza3RvcFxccGZlXFxQZmVcXGFwcFxcYXBpXFxhbGwtcHJvZHVjdHMtYWRtaW5cXHJvdXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xyXG5pbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tIFwiQHByaXNtYS9jbGllbnRcIjtcclxuXHJcbmNvbnN0IHByaXNtYSA9IG5ldyBQcmlzbWFDbGllbnQoKTtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQoKSB7XHJcbiAgdHJ5IHtcclxuICAgIC8vIFLDqWN1cMOpcmVyIHRvdXMgbGVzIHByb2R1aXRzIGF2ZWMgbGV1cnMgcmVsYXRpb25zXHJcbiAgICBjb25zdCByYXdQcm9kdWN0cyA9IGF3YWl0IHByaXNtYS5wcm9kdWN0LmZpbmRNYW55KHtcclxuICAgICAgaW5jbHVkZToge1xyXG4gICAgICAgIGNhdGVnb3J5OiB0cnVlLFxyXG4gICAgICAgIHN0b3JlOiB7XHJcbiAgICAgICAgICBpbmNsdWRlOiB7XHJcbiAgICAgICAgICAgIG93bmVyOiB7XHJcbiAgICAgICAgICAgICAgc2VsZWN0OiB7XHJcbiAgICAgICAgICAgICAgICBpZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIG5hbWU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBlbWFpbDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGltYWdlOiB0cnVlXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBvcmRlckJ5OiB7XHJcbiAgICAgICAgY3JlYXRlZEF0OiAnZGVzYydcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIC8vIFRyYW5zZm9ybWVyIGxlcyBwcm9kdWl0cyBwb3VyIMOpdml0ZXIgbGVzIHLDqWbDqXJlbmNlcyBjaXJjdWxhaXJlc1xyXG4gICAgY29uc3QgcHJvZHVjdHMgPSByYXdQcm9kdWN0cy5tYXAocHJvZHVjdCA9PiAoe1xyXG4gICAgICBpZDogcHJvZHVjdC5pZCxcclxuICAgICAgbmFtZTogcHJvZHVjdC5uYW1lLFxyXG4gICAgICBkZXNjcmlwdGlvbjogcHJvZHVjdC5kZXNjcmlwdGlvbixcclxuICAgICAgcHJpY2U6IHByb2R1Y3QucHJpY2UsXHJcbiAgICAgIHN0b2NrOiB0eXBlb2YgcHJvZHVjdC5zdG9jayA9PT0gJ2JpZ2ludCcgPyBOdW1iZXIocHJvZHVjdC5zdG9jaykgOiBwcm9kdWN0LnN0b2NrLFxyXG4gICAgICBpbWFnZXM6IHByb2R1Y3QuaW1hZ2VzLFxyXG4gICAgICByYXRpbmc6IHByb2R1Y3QucmF0aW5nLFxyXG4gICAgICBjcmVhdGVkQXQ6IHByb2R1Y3QuY3JlYXRlZEF0LFxyXG4gICAgICB1cGRhdGVkQXQ6IHByb2R1Y3QudXBkYXRlZEF0LFxyXG4gICAgICBjYXRlZ29yeTogcHJvZHVjdC5jYXRlZ29yeSA/IHtcclxuICAgICAgICBpZDogcHJvZHVjdC5jYXRlZ29yeS5pZCxcclxuICAgICAgICBuYW1lOiBwcm9kdWN0LmNhdGVnb3J5Lm5hbWUsXHJcbiAgICAgICAgZGVzY3JpcHRpb246IHByb2R1Y3QuY2F0ZWdvcnkuZGVzY3JpcHRpb24sXHJcbiAgICAgICAgaW1hZ2U6IHByb2R1Y3QuY2F0ZWdvcnkuaW1hZ2VcclxuICAgICAgfSA6IG51bGwsXHJcbiAgICAgIHN0b3JlOiBwcm9kdWN0LnN0b3JlID8ge1xyXG4gICAgICAgIGlkOiBwcm9kdWN0LnN0b3JlLmlkLFxyXG4gICAgICAgIG5hbWU6IHByb2R1Y3Quc3RvcmUubmFtZSxcclxuICAgICAgICBsb2dvOiBwcm9kdWN0LnN0b3JlLmxvZ28sXHJcbiAgICAgICAgcmF0aW5nOiBwcm9kdWN0LnN0b3JlLnJhdGluZyxcclxuICAgICAgICBzZWxsZXI6IHByb2R1Y3Quc3RvcmUub3duZXIgPyB7XHJcbiAgICAgICAgICBpZDogcHJvZHVjdC5zdG9yZS5vd25lci5pZCxcclxuICAgICAgICAgIG5hbWU6IHByb2R1Y3Quc3RvcmUub3duZXIubmFtZSxcclxuICAgICAgICAgIGVtYWlsOiBwcm9kdWN0LnN0b3JlLm93bmVyLmVtYWlsLFxyXG4gICAgICAgICAgaW1hZ2U6IHByb2R1Y3Quc3RvcmUub3duZXIuaW1hZ2VcclxuICAgICAgICB9IDogbnVsbFxyXG4gICAgICB9IDogbnVsbFxyXG4gICAgfSkpO1xyXG4gICAgXHJcbiAgICAvLyBTw6lyaWFsaXNlciBsZXMgcHJvZHVpdHMgcG91ciBnw6lyZXIgbGVzIEJpZ0ludFxyXG4gICAgY29uc3Qgc2VyaWFsaXplZFByb2R1Y3RzID0gSlNPTi5wYXJzZShcclxuICAgICAgSlNPTi5zdHJpbmdpZnkocHJvZHVjdHMsIChrZXksIHZhbHVlKSA9PiBcclxuICAgICAgICB0eXBlb2YgdmFsdWUgPT09ICdiaWdpbnQnID8gTnVtYmVyKHZhbHVlKSA6IHZhbHVlXHJcbiAgICAgIClcclxuICAgICk7XHJcbiAgICBcclxuICAgIC8vIFJldG91cm5lciBsZXMgcHJvZHVpdHMgZGFucyB1biBmb3JtYXQgY29ow6lyZW50XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBwcm9kdWN0czogc2VyaWFsaXplZFByb2R1Y3RzIH0pO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdbQURNSU5fUFJPRFVDVFNfR0VUXScsIGVycm9yKTtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIkVycmV1ciBsb3JzIGRlIGxhIHLDqWN1cMOpcmF0aW9uIGRlcyBwcm9kdWl0c1wiIH0sIHsgc3RhdHVzOiA1MDAgfSk7XHJcbiAgfVxyXG59ICJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJQcmlzbWFDbGllbnQiLCJwcmlzbWEiLCJHRVQiLCJyYXdQcm9kdWN0cyIsInByb2R1Y3QiLCJmaW5kTWFueSIsImluY2x1ZGUiLCJjYXRlZ29yeSIsInN0b3JlIiwib3duZXIiLCJzZWxlY3QiLCJpZCIsIm5hbWUiLCJlbWFpbCIsImltYWdlIiwib3JkZXJCeSIsImNyZWF0ZWRBdCIsInByb2R1Y3RzIiwibWFwIiwiZGVzY3JpcHRpb24iLCJwcmljZSIsInN0b2NrIiwiTnVtYmVyIiwiaW1hZ2VzIiwicmF0aW5nIiwidXBkYXRlZEF0IiwibG9nbyIsInNlbGxlciIsInNlcmlhbGl6ZWRQcm9kdWN0cyIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsImtleSIsInZhbHVlIiwianNvbiIsImVycm9yIiwiY29uc29sZSIsInN0YXR1cyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/all-products-admin/route.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fall-products-admin%2Froute&page=%2Fapi%2Fall-products-admin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fall-products-admin%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fall-products-admin%2Froute&page=%2Fapi%2Fall-products-admin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fall-products-admin%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Stoufa_Desktop_pfe_Pfe_app_api_all_products_admin_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/all-products-admin/route.js */ \"(rsc)/./app/api/all-products-admin/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/all-products-admin/route\",\n        pathname: \"/api/all-products-admin\",\n        filename: \"route\",\n        bundlePath: \"app/api/all-products-admin/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Stoufa\\\\Desktop\\\\pfe\\\\Pfe\\\\app\\\\api\\\\all-products-admin\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_Stoufa_Desktop_pfe_Pfe_app_api_all_products_admin_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhbGwtcHJvZHVjdHMtYWRtaW4lMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmFsbC1wcm9kdWN0cy1hZG1pbiUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmFsbC1wcm9kdWN0cy1hZG1pbiUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNTdG91ZmElNUNEZXNrdG9wJTVDcGZlJTVDUGZlJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNTdG91ZmElNUNEZXNrdG9wJTVDcGZlJTVDUGZlJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUM0QjtBQUN6RztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcU3RvdWZhXFxcXERlc2t0b3BcXFxccGZlXFxcXFBmZVxcXFxhcHBcXFxcYXBpXFxcXGFsbC1wcm9kdWN0cy1hZG1pblxcXFxyb3V0ZS5qc1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYWxsLXByb2R1Y3RzLWFkbWluL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYWxsLXByb2R1Y3RzLWFkbWluXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9hbGwtcHJvZHVjdHMtYWRtaW4vcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxTdG91ZmFcXFxcRGVza3RvcFxcXFxwZmVcXFxcUGZlXFxcXGFwcFxcXFxhcGlcXFxcYWxsLXByb2R1Y3RzLWFkbWluXFxcXHJvdXRlLmpzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fall-products-admin%2Froute&page=%2Fapi%2Fall-products-admin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fall-products-admin%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fall-products-admin%2Froute&page=%2Fapi%2Fall-products-admin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fall-products-admin%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();