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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_1__.PrismaClient();\nasync function GET() {\n    try {\n        // Récupérer tous les produits avec leurs relations\n        const rawProducts = await prisma.product.findMany({\n            include: {\n                category: true,\n                store: {\n                    include: {\n                        owner: {\n                            select: {\n                                id: true,\n                                name: true,\n                                email: true,\n                                image: true\n                            }\n                        }\n                    }\n                }\n            },\n            orderBy: {\n                createdAt: 'desc'\n            }\n        });\n        // Transformer les produits pour éviter les références circulaires\n        const products = rawProducts.map((product)=>({\n                id: product.id,\n                name: product.name,\n                description: product.description,\n                price: product.price,\n                stock: typeof product.stock === 'bigint' ? Number(product.stock) : product.stock,\n                images: product.images,\n                rating: product.rating,\n                createdAt: product.createdAt,\n                updatedAt: product.updatedAt,\n                category: product.category ? {\n                    id: product.category.id,\n                    name: product.category.name,\n                    description: product.category.description,\n                    image: product.category.image\n                } : null,\n                store: product.store ? {\n                    id: product.store.id,\n                    name: product.store.name,\n                    logo: product.store.logo,\n                    rating: product.store.rating,\n                    seller: product.store.owner ? {\n                        id: product.store.owner.id,\n                        name: product.store.owner.name,\n                        email: product.store.owner.email,\n                        image: product.store.owner.image\n                    } : null\n                } : null\n            }));\n        // Sérialiser les produits pour gérer les BigInt\n        const serializedProducts = JSON.parse(JSON.stringify(products, (key, value)=>typeof value === 'bigint' ? Number(value) : value));\n        // Retourner les produits dans un format cohérent\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            products: serializedProducts\n        });\n    } catch (error) {\n        console.error('[ADMIN_PRODUCTS_GET]', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Erreur lors de la récupération des produits\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2FsbC1wcm9kdWN0cy1hZG1pbi9yb3V0ZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQTJDO0FBQ0c7QUFFOUMsTUFBTUUsU0FBUyxJQUFJRCx3REFBWUE7QUFFeEIsZUFBZUU7SUFDcEIsSUFBSTtRQUNGLG1EQUFtRDtRQUNuRCxNQUFNQyxjQUFjLE1BQU1GLE9BQU9HLE9BQU8sQ0FBQ0MsUUFBUSxDQUFDO1lBQ2hEQyxTQUFTO2dCQUNQQyxVQUFVO2dCQUNWQyxPQUFPO29CQUNMRixTQUFTO3dCQUNQRyxPQUFPOzRCQUNMQyxRQUFRO2dDQUNOQyxJQUFJO2dDQUNKQyxNQUFNO2dDQUNOQyxPQUFPO2dDQUNQQyxPQUFPOzRCQUNUO3dCQUNGO29CQUNGO2dCQUNGO1lBQ0Y7WUFDQUMsU0FBUztnQkFDUEMsV0FBVztZQUNiO1FBQ0Y7UUFFQSxrRUFBa0U7UUFDbEUsTUFBTUMsV0FBV2QsWUFBWWUsR0FBRyxDQUFDZCxDQUFBQSxVQUFZO2dCQUMzQ08sSUFBSVAsUUFBUU8sRUFBRTtnQkFDZEMsTUFBTVIsUUFBUVEsSUFBSTtnQkFDbEJPLGFBQWFmLFFBQVFlLFdBQVc7Z0JBQ2hDQyxPQUFPaEIsUUFBUWdCLEtBQUs7Z0JBQ3BCQyxPQUFPLE9BQU9qQixRQUFRaUIsS0FBSyxLQUFLLFdBQVdDLE9BQU9sQixRQUFRaUIsS0FBSyxJQUFJakIsUUFBUWlCLEtBQUs7Z0JBQ2hGRSxRQUFRbkIsUUFBUW1CLE1BQU07Z0JBQ3RCQyxRQUFRcEIsUUFBUW9CLE1BQU07Z0JBQ3RCUixXQUFXWixRQUFRWSxTQUFTO2dCQUM1QlMsV0FBV3JCLFFBQVFxQixTQUFTO2dCQUM1QmxCLFVBQVVILFFBQVFHLFFBQVEsR0FBRztvQkFDM0JJLElBQUlQLFFBQVFHLFFBQVEsQ0FBQ0ksRUFBRTtvQkFDdkJDLE1BQU1SLFFBQVFHLFFBQVEsQ0FBQ0ssSUFBSTtvQkFDM0JPLGFBQWFmLFFBQVFHLFFBQVEsQ0FBQ1ksV0FBVztvQkFDekNMLE9BQU9WLFFBQVFHLFFBQVEsQ0FBQ08sS0FBSztnQkFDL0IsSUFBSTtnQkFDSk4sT0FBT0osUUFBUUksS0FBSyxHQUFHO29CQUNyQkcsSUFBSVAsUUFBUUksS0FBSyxDQUFDRyxFQUFFO29CQUNwQkMsTUFBTVIsUUFBUUksS0FBSyxDQUFDSSxJQUFJO29CQUN4QmMsTUFBTXRCLFFBQVFJLEtBQUssQ0FBQ2tCLElBQUk7b0JBQ3hCRixRQUFRcEIsUUFBUUksS0FBSyxDQUFDZ0IsTUFBTTtvQkFDNUJHLFFBQVF2QixRQUFRSSxLQUFLLENBQUNDLEtBQUssR0FBRzt3QkFDNUJFLElBQUlQLFFBQVFJLEtBQUssQ0FBQ0MsS0FBSyxDQUFDRSxFQUFFO3dCQUMxQkMsTUFBTVIsUUFBUUksS0FBSyxDQUFDQyxLQUFLLENBQUNHLElBQUk7d0JBQzlCQyxPQUFPVCxRQUFRSSxLQUFLLENBQUNDLEtBQUssQ0FBQ0ksS0FBSzt3QkFDaENDLE9BQU9WLFFBQVFJLEtBQUssQ0FBQ0MsS0FBSyxDQUFDSyxLQUFLO29CQUNsQyxJQUFJO2dCQUNOLElBQUk7WUFDTjtRQUVBLGdEQUFnRDtRQUNoRCxNQUFNYyxxQkFBcUJDLEtBQUtDLEtBQUssQ0FDbkNELEtBQUtFLFNBQVMsQ0FBQ2QsVUFBVSxDQUFDZSxLQUFLQyxRQUM3QixPQUFPQSxVQUFVLFdBQVdYLE9BQU9XLFNBQVNBO1FBSWhELGlEQUFpRDtRQUNqRCxPQUFPbEMscURBQVlBLENBQUNtQyxJQUFJLENBQUM7WUFBRWpCLFVBQVVXO1FBQW1CO0lBQzFELEVBQUUsT0FBT08sT0FBTztRQUNkQyxRQUFRRCxLQUFLLENBQUMsd0JBQXdCQTtRQUN0QyxPQUFPcEMscURBQVlBLENBQUNtQyxJQUFJLENBQUM7WUFBRUMsT0FBTztRQUE4QyxHQUFHO1lBQUVFLFFBQVE7UUFBSTtJQUNuRztBQUNGIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXFN0b3VmYVxcRGVza3RvcFxcUEZFX2dpdGh1YlxcYXBwXFxhcGlcXGFsbC1wcm9kdWN0cy1hZG1pblxccm91dGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XHJcbmltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gXCJAcHJpc21hL2NsaWVudFwiO1xyXG5cclxuY29uc3QgcHJpc21hID0gbmV3IFByaXNtYUNsaWVudCgpO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVCgpIHtcclxuICB0cnkge1xyXG4gICAgLy8gUsOpY3Vww6lyZXIgdG91cyBsZXMgcHJvZHVpdHMgYXZlYyBsZXVycyByZWxhdGlvbnNcclxuICAgIGNvbnN0IHJhd1Byb2R1Y3RzID0gYXdhaXQgcHJpc21hLnByb2R1Y3QuZmluZE1hbnkoe1xyXG4gICAgICBpbmNsdWRlOiB7XHJcbiAgICAgICAgY2F0ZWdvcnk6IHRydWUsXHJcbiAgICAgICAgc3RvcmU6IHtcclxuICAgICAgICAgIGluY2x1ZGU6IHtcclxuICAgICAgICAgICAgb3duZXI6IHtcclxuICAgICAgICAgICAgICBzZWxlY3Q6IHtcclxuICAgICAgICAgICAgICAgIGlkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGVtYWlsOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2U6IHRydWVcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIG9yZGVyQnk6IHtcclxuICAgICAgICBjcmVhdGVkQXQ6ICdkZXNjJ1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgLy8gVHJhbnNmb3JtZXIgbGVzIHByb2R1aXRzIHBvdXIgw6l2aXRlciBsZXMgcsOpZsOpcmVuY2VzIGNpcmN1bGFpcmVzXHJcbiAgICBjb25zdCBwcm9kdWN0cyA9IHJhd1Byb2R1Y3RzLm1hcChwcm9kdWN0ID0+ICh7XHJcbiAgICAgIGlkOiBwcm9kdWN0LmlkLFxyXG4gICAgICBuYW1lOiBwcm9kdWN0Lm5hbWUsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiBwcm9kdWN0LmRlc2NyaXB0aW9uLFxyXG4gICAgICBwcmljZTogcHJvZHVjdC5wcmljZSxcclxuICAgICAgc3RvY2s6IHR5cGVvZiBwcm9kdWN0LnN0b2NrID09PSAnYmlnaW50JyA/IE51bWJlcihwcm9kdWN0LnN0b2NrKSA6IHByb2R1Y3Quc3RvY2ssXHJcbiAgICAgIGltYWdlczogcHJvZHVjdC5pbWFnZXMsXHJcbiAgICAgIHJhdGluZzogcHJvZHVjdC5yYXRpbmcsXHJcbiAgICAgIGNyZWF0ZWRBdDogcHJvZHVjdC5jcmVhdGVkQXQsXHJcbiAgICAgIHVwZGF0ZWRBdDogcHJvZHVjdC51cGRhdGVkQXQsXHJcbiAgICAgIGNhdGVnb3J5OiBwcm9kdWN0LmNhdGVnb3J5ID8ge1xyXG4gICAgICAgIGlkOiBwcm9kdWN0LmNhdGVnb3J5LmlkLFxyXG4gICAgICAgIG5hbWU6IHByb2R1Y3QuY2F0ZWdvcnkubmFtZSxcclxuICAgICAgICBkZXNjcmlwdGlvbjogcHJvZHVjdC5jYXRlZ29yeS5kZXNjcmlwdGlvbixcclxuICAgICAgICBpbWFnZTogcHJvZHVjdC5jYXRlZ29yeS5pbWFnZVxyXG4gICAgICB9IDogbnVsbCxcclxuICAgICAgc3RvcmU6IHByb2R1Y3Quc3RvcmUgPyB7XHJcbiAgICAgICAgaWQ6IHByb2R1Y3Quc3RvcmUuaWQsXHJcbiAgICAgICAgbmFtZTogcHJvZHVjdC5zdG9yZS5uYW1lLFxyXG4gICAgICAgIGxvZ286IHByb2R1Y3Quc3RvcmUubG9nbyxcclxuICAgICAgICByYXRpbmc6IHByb2R1Y3Quc3RvcmUucmF0aW5nLFxyXG4gICAgICAgIHNlbGxlcjogcHJvZHVjdC5zdG9yZS5vd25lciA/IHtcclxuICAgICAgICAgIGlkOiBwcm9kdWN0LnN0b3JlLm93bmVyLmlkLFxyXG4gICAgICAgICAgbmFtZTogcHJvZHVjdC5zdG9yZS5vd25lci5uYW1lLFxyXG4gICAgICAgICAgZW1haWw6IHByb2R1Y3Quc3RvcmUub3duZXIuZW1haWwsXHJcbiAgICAgICAgICBpbWFnZTogcHJvZHVjdC5zdG9yZS5vd25lci5pbWFnZVxyXG4gICAgICAgIH0gOiBudWxsXHJcbiAgICAgIH0gOiBudWxsXHJcbiAgICB9KSk7XHJcbiAgICBcclxuICAgIC8vIFPDqXJpYWxpc2VyIGxlcyBwcm9kdWl0cyBwb3VyIGfDqXJlciBsZXMgQmlnSW50XHJcbiAgICBjb25zdCBzZXJpYWxpemVkUHJvZHVjdHMgPSBKU09OLnBhcnNlKFxyXG4gICAgICBKU09OLnN0cmluZ2lmeShwcm9kdWN0cywgKGtleSwgdmFsdWUpID0+IFxyXG4gICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gJ2JpZ2ludCcgPyBOdW1iZXIodmFsdWUpIDogdmFsdWVcclxuICAgICAgKVxyXG4gICAgKTtcclxuICAgIFxyXG4gICAgLy8gUmV0b3VybmVyIGxlcyBwcm9kdWl0cyBkYW5zIHVuIGZvcm1hdCBjb2jDqXJlbnRcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IHByb2R1Y3RzOiBzZXJpYWxpemVkUHJvZHVjdHMgfSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ1tBRE1JTl9QUk9EVUNUU19HRVRdJywgZXJyb3IpO1xyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiRXJyZXVyIGxvcnMgZGUgbGEgcsOpY3Vww6lyYXRpb24gZGVzIHByb2R1aXRzXCIgfSwgeyBzdGF0dXM6IDUwMCB9KTtcclxuICB9XHJcbn0gIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsIlByaXNtYUNsaWVudCIsInByaXNtYSIsIkdFVCIsInJhd1Byb2R1Y3RzIiwicHJvZHVjdCIsImZpbmRNYW55IiwiaW5jbHVkZSIsImNhdGVnb3J5Iiwic3RvcmUiLCJvd25lciIsInNlbGVjdCIsImlkIiwibmFtZSIsImVtYWlsIiwiaW1hZ2UiLCJvcmRlckJ5IiwiY3JlYXRlZEF0IiwicHJvZHVjdHMiLCJtYXAiLCJkZXNjcmlwdGlvbiIsInByaWNlIiwic3RvY2siLCJOdW1iZXIiLCJpbWFnZXMiLCJyYXRpbmciLCJ1cGRhdGVkQXQiLCJsb2dvIiwic2VsbGVyIiwic2VyaWFsaXplZFByb2R1Y3RzIiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5Iiwia2V5IiwidmFsdWUiLCJqc29uIiwiZXJyb3IiLCJjb25zb2xlIiwic3RhdHVzIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/all-products-admin/route.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fall-products-admin%2Froute&page=%2Fapi%2Fall-products-admin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fall-products-admin%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5CPFE_github%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5CPFE_github&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fall-products-admin%2Froute&page=%2Fapi%2Fall-products-admin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fall-products-admin%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5CPFE_github%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5CPFE_github&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Stoufa_Desktop_PFE_github_app_api_all_products_admin_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/all-products-admin/route.js */ \"(rsc)/./app/api/all-products-admin/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/all-products-admin/route\",\n        pathname: \"/api/all-products-admin\",\n        filename: \"route\",\n        bundlePath: \"app/api/all-products-admin/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Stoufa\\\\Desktop\\\\PFE_github\\\\app\\\\api\\\\all-products-admin\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_Stoufa_Desktop_PFE_github_app_api_all_products_admin_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhbGwtcHJvZHVjdHMtYWRtaW4lMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmFsbC1wcm9kdWN0cy1hZG1pbiUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmFsbC1wcm9kdWN0cy1hZG1pbiUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNTdG91ZmElNUNEZXNrdG9wJTVDUEZFX2dpdGh1YiU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDU3RvdWZhJTVDRGVza3RvcCU1Q1BGRV9naXRodWImaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQzhCO0FBQzNHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxTdG91ZmFcXFxcRGVza3RvcFxcXFxQRkVfZ2l0aHViXFxcXGFwcFxcXFxhcGlcXFxcYWxsLXByb2R1Y3RzLWFkbWluXFxcXHJvdXRlLmpzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hbGwtcHJvZHVjdHMtYWRtaW4vcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hbGwtcHJvZHVjdHMtYWRtaW5cIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2FsbC1wcm9kdWN0cy1hZG1pbi9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXFN0b3VmYVxcXFxEZXNrdG9wXFxcXFBGRV9naXRodWJcXFxcYXBwXFxcXGFwaVxcXFxhbGwtcHJvZHVjdHMtYWRtaW5cXFxccm91dGUuanNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fall-products-admin%2Froute&page=%2Fapi%2Fall-products-admin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fall-products-admin%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5CPFE_github%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5CPFE_github&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fall-products-admin%2Froute&page=%2Fapi%2Fall-products-admin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fall-products-admin%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5CPFE_github%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5CPFE_github&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();