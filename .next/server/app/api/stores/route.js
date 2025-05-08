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
exports.id = "app/api/stores/route";
exports.ids = ["app/api/stores/route"];
exports.modules = {

/***/ "(rsc)/./app/api/stores/route.js":
/*!*********************************!*\
  !*** ./app/api/stores/route.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.js\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst prismaClient = new _prisma_client__WEBPACK_IMPORTED_MODULE_2__.PrismaClient();\nasync function POST(request) {\n    try {\n        const { name, description, logo, ownerId } = await request.json();\n        if (!name || !description || !ownerId) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Le nom, la description et l'ID du propriétaire sont requis\"\n            }, {\n                status: 400\n            });\n        }\n        // Vérifier que l'utilisateur existe\n        const owner = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].user.findUnique({\n            where: {\n                id: ownerId\n            }\n        });\n        if (!owner) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Utilisateur non trouvé\"\n            }, {\n                status: 404\n            });\n        }\n        // Vérifier si l'utilisateur a déjà un magasin\n        const existingStore = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].store.findUnique({\n            where: {\n                ownerId\n            }\n        });\n        if (existingStore) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(existingStore);\n        }\n        // Créer le magasin\n        const store = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].store.create({\n            data: {\n                name,\n                description,\n                logo,\n                ownerId\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(store);\n    } catch (error) {\n        console.error('[STORES_POST]', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Erreur lors de la création du magasin\"\n        }, {\n            status: 500\n        });\n    }\n}\nasync function GET() {\n    try {\n        console.log(\"[STORES_GET] Récupération des magasins...\");\n        // Récupérer tous les magasins approuvés\n        const stores = await prismaClient.store.findMany({\n            where: {\n                isApproved: true\n            },\n            select: {\n                id: true,\n                name: true,\n                description: true,\n                logo: true,\n                banner: true,\n                isApproved: true\n            },\n            orderBy: {\n                updatedAt: 'desc'\n            }\n        });\n        console.log(`[STORES_GET] ${stores.length} magasins trouvés`);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            stores\n        });\n    } catch (error) {\n        console.error(\"[STORES_GET] Erreur:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Erreur lors de la récupération des magasins\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3N0b3Jlcy9yb3V0ZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBMkM7QUFDVDtBQUNZO0FBRTlDLE1BQU1HLGVBQWUsSUFBSUQsd0RBQVlBO0FBRTlCLGVBQWVFLEtBQUtDLE9BQU87SUFDaEMsSUFBSTtRQUNGLE1BQU0sRUFBRUMsSUFBSSxFQUFFQyxXQUFXLEVBQUVDLElBQUksRUFBRUMsT0FBTyxFQUFFLEdBQUcsTUFBTUosUUFBUUssSUFBSTtRQUUvRCxJQUFJLENBQUNKLFFBQVEsQ0FBQ0MsZUFBZSxDQUFDRSxTQUFTO1lBQ3JDLE9BQU9ULHFEQUFZQSxDQUFDVSxJQUFJLENBQ3RCO2dCQUFFQyxPQUFPO1lBQTZELEdBQ3RFO2dCQUFFQyxRQUFRO1lBQUk7UUFFbEI7UUFFQSxvQ0FBb0M7UUFDcEMsTUFBTUMsUUFBUSxNQUFNWixtREFBTUEsQ0FBQ2EsSUFBSSxDQUFDQyxVQUFVLENBQUM7WUFDekNDLE9BQU87Z0JBQUVDLElBQUlSO1lBQVE7UUFDdkI7UUFFQSxJQUFJLENBQUNJLE9BQU87WUFDVixPQUFPYixxREFBWUEsQ0FBQ1UsSUFBSSxDQUN0QjtnQkFBRUMsT0FBTztZQUF5QixHQUNsQztnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO1FBRUEsOENBQThDO1FBQzlDLE1BQU1NLGdCQUFnQixNQUFNakIsbURBQU1BLENBQUNrQixLQUFLLENBQUNKLFVBQVUsQ0FBQztZQUNsREMsT0FBTztnQkFBRVA7WUFBUTtRQUNuQjtRQUVBLElBQUlTLGVBQWU7WUFDakIsT0FBT2xCLHFEQUFZQSxDQUFDVSxJQUFJLENBQUNRO1FBQzNCO1FBRUEsbUJBQW1CO1FBQ25CLE1BQU1DLFFBQVEsTUFBTWxCLG1EQUFNQSxDQUFDa0IsS0FBSyxDQUFDQyxNQUFNLENBQUM7WUFDdENDLE1BQU07Z0JBQ0pmO2dCQUNBQztnQkFDQUM7Z0JBQ0FDO1lBQ0Y7UUFDRjtRQUVBLE9BQU9ULHFEQUFZQSxDQUFDVSxJQUFJLENBQUNTO0lBQzNCLEVBQUUsT0FBT1IsT0FBTztRQUNkVyxRQUFRWCxLQUFLLENBQUMsaUJBQWlCQTtRQUMvQixPQUFPWCxxREFBWUEsQ0FBQ1UsSUFBSSxDQUN0QjtZQUFFQyxPQUFPO1FBQXdDLEdBQ2pEO1lBQUVDLFFBQVE7UUFBSTtJQUVsQjtBQUNGO0FBRU8sZUFBZVc7SUFDcEIsSUFBSTtRQUNGRCxRQUFRRSxHQUFHLENBQUM7UUFFWix3Q0FBd0M7UUFDeEMsTUFBTUMsU0FBUyxNQUFNdEIsYUFBYWdCLEtBQUssQ0FBQ08sUUFBUSxDQUFDO1lBQy9DVixPQUFPO2dCQUNMVyxZQUFZO1lBQ2Q7WUFDQUMsUUFBUTtnQkFDTlgsSUFBSTtnQkFDSlgsTUFBTTtnQkFDTkMsYUFBYTtnQkFDYkMsTUFBTTtnQkFDTnFCLFFBQVE7Z0JBQ1JGLFlBQVk7WUFDZDtZQUNBRyxTQUFTO2dCQUNQQyxXQUFXO1lBQ2I7UUFDRjtRQUVBVCxRQUFRRSxHQUFHLENBQUMsQ0FBQyxhQUFhLEVBQUVDLE9BQU9PLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQztRQUU1RCxPQUFPaEMscURBQVlBLENBQUNVLElBQUksQ0FBQztZQUFFZTtRQUFPO0lBQ3BDLEVBQUUsT0FBT2QsT0FBTztRQUNkVyxRQUFRWCxLQUFLLENBQUMsd0JBQXdCQTtRQUN0QyxPQUFPWCxxREFBWUEsQ0FBQ1UsSUFBSSxDQUN0QjtZQUFFQyxPQUFPO1FBQThDLEdBQ3ZEO1lBQUVDLFFBQVE7UUFBSTtJQUVsQjtBQUNGIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXFN0b3VmYVxcRGVza3RvcFxccGZlXFxQZmVcXGFwcFxcYXBpXFxzdG9yZXNcXHJvdXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xuaW1wb3J0IHByaXNtYSBmcm9tIFwiQC9saWIvcHJpc21hXCI7XG5pbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tIFwiQHByaXNtYS9jbGllbnRcIjtcblxuY29uc3QgcHJpc21hQ2xpZW50ID0gbmV3IFByaXNtYUNsaWVudCgpO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBuYW1lLCBkZXNjcmlwdGlvbiwgbG9nbywgb3duZXJJZCB9ID0gYXdhaXQgcmVxdWVzdC5qc29uKCk7XG4gICAgXG4gICAgaWYgKCFuYW1lIHx8ICFkZXNjcmlwdGlvbiB8fCAhb3duZXJJZCkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICB7IGVycm9yOiBcIkxlIG5vbSwgbGEgZGVzY3JpcHRpb24gZXQgbCdJRCBkdSBwcm9wcmnDqXRhaXJlIHNvbnQgcmVxdWlzXCIgfSxcbiAgICAgICAgeyBzdGF0dXM6IDQwMCB9XG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIFbDqXJpZmllciBxdWUgbCd1dGlsaXNhdGV1ciBleGlzdGVcbiAgICBjb25zdCBvd25lciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xuICAgICAgd2hlcmU6IHsgaWQ6IG93bmVySWQgfVxuICAgIH0pO1xuXG4gICAgaWYgKCFvd25lcikge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICB7IGVycm9yOiBcIlV0aWxpc2F0ZXVyIG5vbiB0cm91dsOpXCIgfSxcbiAgICAgICAgeyBzdGF0dXM6IDQwNCB9XG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIFbDqXJpZmllciBzaSBsJ3V0aWxpc2F0ZXVyIGEgZMOpasOgIHVuIG1hZ2FzaW5cbiAgICBjb25zdCBleGlzdGluZ1N0b3JlID0gYXdhaXQgcHJpc21hLnN0b3JlLmZpbmRVbmlxdWUoe1xuICAgICAgd2hlcmU6IHsgb3duZXJJZCB9XG4gICAgfSk7XG5cbiAgICBpZiAoZXhpc3RpbmdTdG9yZSkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKGV4aXN0aW5nU3RvcmUpO1xuICAgIH1cblxuICAgIC8vIENyw6llciBsZSBtYWdhc2luXG4gICAgY29uc3Qgc3RvcmUgPSBhd2FpdCBwcmlzbWEuc3RvcmUuY3JlYXRlKHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgIGxvZ28sXG4gICAgICAgIG93bmVySWRcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihzdG9yZSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignW1NUT1JFU19QT1NUXScsIGVycm9yKTtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICB7IGVycm9yOiBcIkVycmV1ciBsb3JzIGRlIGxhIGNyw6lhdGlvbiBkdSBtYWdhc2luXCIgfSxcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVCgpIHtcbiAgdHJ5IHtcbiAgICBjb25zb2xlLmxvZyhcIltTVE9SRVNfR0VUXSBSw6ljdXDDqXJhdGlvbiBkZXMgbWFnYXNpbnMuLi5cIik7XG4gICAgXG4gICAgLy8gUsOpY3Vww6lyZXIgdG91cyBsZXMgbWFnYXNpbnMgYXBwcm91dsOpc1xuICAgIGNvbnN0IHN0b3JlcyA9IGF3YWl0IHByaXNtYUNsaWVudC5zdG9yZS5maW5kTWFueSh7XG4gICAgICB3aGVyZToge1xuICAgICAgICBpc0FwcHJvdmVkOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIHNlbGVjdDoge1xuICAgICAgICBpZDogdHJ1ZSxcbiAgICAgICAgbmFtZTogdHJ1ZSxcbiAgICAgICAgZGVzY3JpcHRpb246IHRydWUsXG4gICAgICAgIGxvZ286IHRydWUsXG4gICAgICAgIGJhbm5lcjogdHJ1ZSxcbiAgICAgICAgaXNBcHByb3ZlZDogdHJ1ZVxuICAgICAgfSxcbiAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgdXBkYXRlZEF0OiAnZGVzYydcbiAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICBjb25zb2xlLmxvZyhgW1NUT1JFU19HRVRdICR7c3RvcmVzLmxlbmd0aH0gbWFnYXNpbnMgdHJvdXbDqXNgKTtcbiAgICBcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBzdG9yZXMgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIltTVE9SRVNfR0VUXSBFcnJldXI6XCIsIGVycm9yKTtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICB7IGVycm9yOiBcIkVycmV1ciBsb3JzIGRlIGxhIHLDqWN1cMOpcmF0aW9uIGRlcyBtYWdhc2luc1wiIH0sXG4gICAgICB7IHN0YXR1czogNTAwIH1cbiAgICApO1xuICB9XG59Il0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsInByaXNtYSIsIlByaXNtYUNsaWVudCIsInByaXNtYUNsaWVudCIsIlBPU1QiLCJyZXF1ZXN0IiwibmFtZSIsImRlc2NyaXB0aW9uIiwibG9nbyIsIm93bmVySWQiLCJqc29uIiwiZXJyb3IiLCJzdGF0dXMiLCJvd25lciIsInVzZXIiLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJpZCIsImV4aXN0aW5nU3RvcmUiLCJzdG9yZSIsImNyZWF0ZSIsImRhdGEiLCJjb25zb2xlIiwiR0VUIiwibG9nIiwic3RvcmVzIiwiZmluZE1hbnkiLCJpc0FwcHJvdmVkIiwic2VsZWN0IiwiYmFubmVyIiwib3JkZXJCeSIsInVwZGF0ZWRBdCIsImxlbmd0aCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/stores/route.js\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.js":
/*!***********************!*\
  !*** ./lib/prisma.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst prismaClientSingleton = ()=>{\n    return new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\n};\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? prismaClientSingleton();\nif (true) {\n    globalForPrisma.prisma = prisma;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE4QztBQUU5QyxNQUFNQyx3QkFBd0I7SUFDNUIsT0FBTyxJQUFJRCx3REFBWUE7QUFDekI7QUFFQSxNQUFNRSxrQkFBa0JDO0FBRXhCLE1BQU1DLFNBQVNGLGdCQUFnQkUsTUFBTSxJQUFJSDtBQUV6QyxJQUFJSSxJQUFxQyxFQUFFO0lBQ3pDSCxnQkFBZ0JFLE1BQU0sR0FBR0E7QUFDM0I7QUFFQSxpRUFBZUEsTUFBTUEsRUFBQyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxTdG91ZmFcXERlc2t0b3BcXHBmZVxcUGZlXFxsaWJcXHByaXNtYS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCc7XG5cbmNvbnN0IHByaXNtYUNsaWVudFNpbmdsZXRvbiA9ICgpID0+IHtcbiAgcmV0dXJuIG5ldyBQcmlzbWFDbGllbnQoKTtcbn07XG5cbmNvbnN0IGdsb2JhbEZvclByaXNtYSA9IGdsb2JhbFRoaXM7XG5cbmNvbnN0IHByaXNtYSA9IGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPz8gcHJpc21hQ2xpZW50U2luZ2xldG9uKCk7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPSBwcmlzbWE7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHByaXNtYTtcbiJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJwcmlzbWFDbGllbnRTaW5nbGV0b24iLCJnbG9iYWxGb3JQcmlzbWEiLCJnbG9iYWxUaGlzIiwicHJpc21hIiwicHJvY2VzcyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fstores%2Froute&page=%2Fapi%2Fstores%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstores%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fstores%2Froute&page=%2Fapi%2Fstores%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstores%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Stoufa_Desktop_pfe_Pfe_app_api_stores_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/stores/route.js */ \"(rsc)/./app/api/stores/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/stores/route\",\n        pathname: \"/api/stores\",\n        filename: \"route\",\n        bundlePath: \"app/api/stores/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Stoufa\\\\Desktop\\\\pfe\\\\Pfe\\\\app\\\\api\\\\stores\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_Stoufa_Desktop_pfe_Pfe_app_api_stores_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZzdG9yZXMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnN0b3JlcyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnN0b3JlcyUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNTdG91ZmElNUNEZXNrdG9wJTVDcGZlJTVDUGZlJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNTdG91ZmElNUNEZXNrdG9wJTVDcGZlJTVDUGZlJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNnQjtBQUM3RjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcU3RvdWZhXFxcXERlc2t0b3BcXFxccGZlXFxcXFBmZVxcXFxhcHBcXFxcYXBpXFxcXHN0b3Jlc1xcXFxyb3V0ZS5qc1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvc3RvcmVzL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvc3RvcmVzXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9zdG9yZXMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxTdG91ZmFcXFxcRGVza3RvcFxcXFxwZmVcXFxcUGZlXFxcXGFwcFxcXFxhcGlcXFxcc3RvcmVzXFxcXHJvdXRlLmpzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fstores%2Froute&page=%2Fapi%2Fstores%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstores%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fstores%2Froute&page=%2Fapi%2Fstores%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstores%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();