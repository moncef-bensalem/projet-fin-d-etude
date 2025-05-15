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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.js\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst prismaClient = new _prisma_client__WEBPACK_IMPORTED_MODULE_2__.PrismaClient();\nasync function POST(request) {\n    try {\n        const { name, description, logo, ownerId } = await request.json();\n        if (!name || !description || !ownerId) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Le nom, la description et l'ID du propriétaire sont requis\"\n            }, {\n                status: 400\n            });\n        }\n        // Vérifier que l'utilisateur existe\n        const owner = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].user.findUnique({\n            where: {\n                id: ownerId\n            }\n        });\n        if (!owner) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Utilisateur non trouvé\"\n            }, {\n                status: 404\n            });\n        }\n        // Vérifier si l'utilisateur a déjà un magasin\n        const existingStore = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].store.findUnique({\n            where: {\n                ownerId\n            }\n        });\n        if (existingStore) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(existingStore);\n        }\n        // Créer le magasin\n        const store = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].store.create({\n            data: {\n                name,\n                description,\n                logo,\n                ownerId\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(store);\n    } catch (error) {\n        console.error('[STORES_POST]', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Erreur lors de la création du magasin\"\n        }, {\n            status: 500\n        });\n    }\n}\nasync function GET() {\n    try {\n        console.log(\"[STORES_GET] Récupération des magasins...\");\n        // Récupérer tous les magasins approuvés\n        const stores = await prismaClient.store.findMany({\n            where: {\n                isApproved: true\n            },\n            select: {\n                id: true,\n                name: true,\n                description: true,\n                logo: true,\n                banner: true,\n                isApproved: true\n            },\n            orderBy: {\n                updatedAt: 'desc'\n            }\n        });\n        console.log(`[STORES_GET] ${stores.length} magasins trouvés`);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            stores\n        });\n    } catch (error) {\n        console.error(\"[STORES_GET] Erreur:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Erreur lors de la récupération des magasins\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3N0b3Jlcy9yb3V0ZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBMkM7QUFDVDtBQUNZO0FBRTlDLE1BQU1HLGVBQWUsSUFBSUQsd0RBQVlBO0FBRTlCLGVBQWVFLEtBQUtDLE9BQU87SUFDaEMsSUFBSTtRQUNGLE1BQU0sRUFBRUMsSUFBSSxFQUFFQyxXQUFXLEVBQUVDLElBQUksRUFBRUMsT0FBTyxFQUFFLEdBQUcsTUFBTUosUUFBUUssSUFBSTtRQUUvRCxJQUFJLENBQUNKLFFBQVEsQ0FBQ0MsZUFBZSxDQUFDRSxTQUFTO1lBQ3JDLE9BQU9ULHFEQUFZQSxDQUFDVSxJQUFJLENBQ3RCO2dCQUFFQyxPQUFPO1lBQTZELEdBQ3RFO2dCQUFFQyxRQUFRO1lBQUk7UUFFbEI7UUFFQSxvQ0FBb0M7UUFDcEMsTUFBTUMsUUFBUSxNQUFNWixtREFBTUEsQ0FBQ2EsSUFBSSxDQUFDQyxVQUFVLENBQUM7WUFDekNDLE9BQU87Z0JBQUVDLElBQUlSO1lBQVE7UUFDdkI7UUFFQSxJQUFJLENBQUNJLE9BQU87WUFDVixPQUFPYixxREFBWUEsQ0FBQ1UsSUFBSSxDQUN0QjtnQkFBRUMsT0FBTztZQUF5QixHQUNsQztnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO1FBRUEsOENBQThDO1FBQzlDLE1BQU1NLGdCQUFnQixNQUFNakIsbURBQU1BLENBQUNrQixLQUFLLENBQUNKLFVBQVUsQ0FBQztZQUNsREMsT0FBTztnQkFBRVA7WUFBUTtRQUNuQjtRQUVBLElBQUlTLGVBQWU7WUFDakIsT0FBT2xCLHFEQUFZQSxDQUFDVSxJQUFJLENBQUNRO1FBQzNCO1FBRUEsbUJBQW1CO1FBQ25CLE1BQU1DLFFBQVEsTUFBTWxCLG1EQUFNQSxDQUFDa0IsS0FBSyxDQUFDQyxNQUFNLENBQUM7WUFDdENDLE1BQU07Z0JBQ0pmO2dCQUNBQztnQkFDQUM7Z0JBQ0FDO1lBQ0Y7UUFDRjtRQUVBLE9BQU9ULHFEQUFZQSxDQUFDVSxJQUFJLENBQUNTO0lBQzNCLEVBQUUsT0FBT1IsT0FBTztRQUNkVyxRQUFRWCxLQUFLLENBQUMsaUJBQWlCQTtRQUMvQixPQUFPWCxxREFBWUEsQ0FBQ1UsSUFBSSxDQUN0QjtZQUFFQyxPQUFPO1FBQXdDLEdBQ2pEO1lBQUVDLFFBQVE7UUFBSTtJQUVsQjtBQUNGO0FBRU8sZUFBZVc7SUFDcEIsSUFBSTtRQUNGRCxRQUFRRSxHQUFHLENBQUM7UUFFWix3Q0FBd0M7UUFDeEMsTUFBTUMsU0FBUyxNQUFNdEIsYUFBYWdCLEtBQUssQ0FBQ08sUUFBUSxDQUFDO1lBQy9DVixPQUFPO2dCQUNMVyxZQUFZO1lBQ2Q7WUFDQUMsUUFBUTtnQkFDTlgsSUFBSTtnQkFDSlgsTUFBTTtnQkFDTkMsYUFBYTtnQkFDYkMsTUFBTTtnQkFDTnFCLFFBQVE7Z0JBQ1JGLFlBQVk7WUFDZDtZQUNBRyxTQUFTO2dCQUNQQyxXQUFXO1lBQ2I7UUFDRjtRQUVBVCxRQUFRRSxHQUFHLENBQUMsQ0FBQyxhQUFhLEVBQUVDLE9BQU9PLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQztRQUU1RCxPQUFPaEMscURBQVlBLENBQUNVLElBQUksQ0FBQztZQUFFZTtRQUFPO0lBQ3BDLEVBQUUsT0FBT2QsT0FBTztRQUNkVyxRQUFRWCxLQUFLLENBQUMsd0JBQXdCQTtRQUN0QyxPQUFPWCxxREFBWUEsQ0FBQ1UsSUFBSSxDQUN0QjtZQUFFQyxPQUFPO1FBQThDLEdBQ3ZEO1lBQUVDLFFBQVE7UUFBSTtJQUVsQjtBQUNGIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXFN0b3VmYVxcRGVza3RvcFxcUEZFX2dpdGh1YlxcYXBwXFxhcGlcXHN0b3Jlc1xccm91dGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XG5pbXBvcnQgcHJpc21hIGZyb20gXCJAL2xpYi9wcmlzbWFcIjtcbmltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gXCJAcHJpc21hL2NsaWVudFwiO1xuXG5jb25zdCBwcmlzbWFDbGllbnQgPSBuZXcgUHJpc21hQ2xpZW50KCk7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcXVlc3QpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IG5hbWUsIGRlc2NyaXB0aW9uLCBsb2dvLCBvd25lcklkIH0gPSBhd2FpdCByZXF1ZXN0Lmpzb24oKTtcbiAgICBcbiAgICBpZiAoIW5hbWUgfHwgIWRlc2NyaXB0aW9uIHx8ICFvd25lcklkKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgIHsgZXJyb3I6IFwiTGUgbm9tLCBsYSBkZXNjcmlwdGlvbiBldCBsJ0lEIGR1IHByb3ByacOpdGFpcmUgc29udCByZXF1aXNcIiB9LFxuICAgICAgICB7IHN0YXR1czogNDAwIH1cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gVsOpcmlmaWVyIHF1ZSBsJ3V0aWxpc2F0ZXVyIGV4aXN0ZVxuICAgIGNvbnN0IG93bmVyID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7XG4gICAgICB3aGVyZTogeyBpZDogb3duZXJJZCB9XG4gICAgfSk7XG5cbiAgICBpZiAoIW93bmVyKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgIHsgZXJyb3I6IFwiVXRpbGlzYXRldXIgbm9uIHRyb3V2w6lcIiB9LFxuICAgICAgICB7IHN0YXR1czogNDA0IH1cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gVsOpcmlmaWVyIHNpIGwndXRpbGlzYXRldXIgYSBkw6lqw6AgdW4gbWFnYXNpblxuICAgIGNvbnN0IGV4aXN0aW5nU3RvcmUgPSBhd2FpdCBwcmlzbWEuc3RvcmUuZmluZFVuaXF1ZSh7XG4gICAgICB3aGVyZTogeyBvd25lcklkIH1cbiAgICB9KTtcblxuICAgIGlmIChleGlzdGluZ1N0b3JlKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oZXhpc3RpbmdTdG9yZSk7XG4gICAgfVxuXG4gICAgLy8gQ3LDqWVyIGxlIG1hZ2FzaW5cbiAgICBjb25zdCBzdG9yZSA9IGF3YWl0IHByaXNtYS5zdG9yZS5jcmVhdGUoe1xuICAgICAgZGF0YToge1xuICAgICAgICBuYW1lLFxuICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgbG9nbyxcbiAgICAgICAgb3duZXJJZFxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHN0b3JlKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdbU1RPUkVTX1BPU1RdJywgZXJyb3IpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgIHsgZXJyb3I6IFwiRXJyZXVyIGxvcnMgZGUgbGEgY3LDqWF0aW9uIGR1IG1hZ2FzaW5cIiB9LFxuICAgICAgeyBzdGF0dXM6IDUwMCB9XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKCkge1xuICB0cnkge1xuICAgIGNvbnNvbGUubG9nKFwiW1NUT1JFU19HRVRdIFLDqWN1cMOpcmF0aW9uIGRlcyBtYWdhc2lucy4uLlwiKTtcbiAgICBcbiAgICAvLyBSw6ljdXDDqXJlciB0b3VzIGxlcyBtYWdhc2lucyBhcHByb3V2w6lzXG4gICAgY29uc3Qgc3RvcmVzID0gYXdhaXQgcHJpc21hQ2xpZW50LnN0b3JlLmZpbmRNYW55KHtcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIGlzQXBwcm92ZWQ6IHRydWUsXG4gICAgICB9LFxuICAgICAgc2VsZWN0OiB7XG4gICAgICAgIGlkOiB0cnVlLFxuICAgICAgICBuYW1lOiB0cnVlLFxuICAgICAgICBkZXNjcmlwdGlvbjogdHJ1ZSxcbiAgICAgICAgbG9nbzogdHJ1ZSxcbiAgICAgICAgYmFubmVyOiB0cnVlLFxuICAgICAgICBpc0FwcHJvdmVkOiB0cnVlXG4gICAgICB9LFxuICAgICAgb3JkZXJCeToge1xuICAgICAgICB1cGRhdGVkQXQ6ICdkZXNjJ1xuICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIGNvbnNvbGUubG9nKGBbU1RPUkVTX0dFVF0gJHtzdG9yZXMubGVuZ3RofSBtYWdhc2lucyB0cm91dsOpc2ApO1xuICAgIFxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IHN0b3JlcyB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiW1NUT1JFU19HRVRdIEVycmV1cjpcIiwgZXJyb3IpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgIHsgZXJyb3I6IFwiRXJyZXVyIGxvcnMgZGUgbGEgcsOpY3Vww6lyYXRpb24gZGVzIG1hZ2FzaW5zXCIgfSxcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxuICAgICk7XG4gIH1cbn0iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwicHJpc21hIiwiUHJpc21hQ2xpZW50IiwicHJpc21hQ2xpZW50IiwiUE9TVCIsInJlcXVlc3QiLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJsb2dvIiwib3duZXJJZCIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsIm93bmVyIiwidXNlciIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsImlkIiwiZXhpc3RpbmdTdG9yZSIsInN0b3JlIiwiY3JlYXRlIiwiZGF0YSIsImNvbnNvbGUiLCJHRVQiLCJsb2ciLCJzdG9yZXMiLCJmaW5kTWFueSIsImlzQXBwcm92ZWQiLCJzZWxlY3QiLCJiYW5uZXIiLCJvcmRlckJ5IiwidXBkYXRlZEF0IiwibGVuZ3RoIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/stores/route.js\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.js":
/*!***********************!*\
  !*** ./lib/prisma.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst prismaClientSingleton = ()=>{\n    return new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\n};\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? prismaClientSingleton();\nif (true) {\n    globalForPrisma.prisma = prisma;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE4QztBQUU5QyxNQUFNQyx3QkFBd0I7SUFDNUIsT0FBTyxJQUFJRCx3REFBWUE7QUFDekI7QUFFQSxNQUFNRSxrQkFBa0JDO0FBRXhCLE1BQU1DLFNBQVNGLGdCQUFnQkUsTUFBTSxJQUFJSDtBQUV6QyxJQUFJSSxJQUFxQyxFQUFFO0lBQ3pDSCxnQkFBZ0JFLE1BQU0sR0FBR0E7QUFDM0I7QUFFQSxpRUFBZUEsTUFBTUEsRUFBQyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxTdG91ZmFcXERlc2t0b3BcXFBGRV9naXRodWJcXGxpYlxccHJpc21hLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gJ0BwcmlzbWEvY2xpZW50JztcblxuY29uc3QgcHJpc21hQ2xpZW50U2luZ2xldG9uID0gKCkgPT4ge1xuICByZXR1cm4gbmV3IFByaXNtYUNsaWVudCgpO1xufTtcblxuY29uc3QgZ2xvYmFsRm9yUHJpc21hID0gZ2xvYmFsVGhpcztcblxuY29uc3QgcHJpc21hID0gZ2xvYmFsRm9yUHJpc21hLnByaXNtYSA/PyBwcmlzbWFDbGllbnRTaW5nbGV0b24oKTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgZ2xvYmFsRm9yUHJpc21hLnByaXNtYSA9IHByaXNtYTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgcHJpc21hO1xuIl0sIm5hbWVzIjpbIlByaXNtYUNsaWVudCIsInByaXNtYUNsaWVudFNpbmdsZXRvbiIsImdsb2JhbEZvclByaXNtYSIsImdsb2JhbFRoaXMiLCJwcmlzbWEiLCJwcm9jZXNzIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fstores%2Froute&page=%2Fapi%2Fstores%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstores%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5CPFE_github%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5CPFE_github&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fstores%2Froute&page=%2Fapi%2Fstores%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstores%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5CPFE_github%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5CPFE_github&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Stoufa_Desktop_PFE_github_app_api_stores_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/stores/route.js */ \"(rsc)/./app/api/stores/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/stores/route\",\n        pathname: \"/api/stores\",\n        filename: \"route\",\n        bundlePath: \"app/api/stores/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Stoufa\\\\Desktop\\\\PFE_github\\\\app\\\\api\\\\stores\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_Stoufa_Desktop_PFE_github_app_api_stores_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZzdG9yZXMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnN0b3JlcyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnN0b3JlcyUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNTdG91ZmElNUNEZXNrdG9wJTVDUEZFX2dpdGh1YiU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDU3RvdWZhJTVDRGVza3RvcCU1Q1BGRV9naXRodWImaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ2tCO0FBQy9GO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxTdG91ZmFcXFxcRGVza3RvcFxcXFxQRkVfZ2l0aHViXFxcXGFwcFxcXFxhcGlcXFxcc3RvcmVzXFxcXHJvdXRlLmpzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9zdG9yZXMvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9zdG9yZXNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3N0b3Jlcy9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXFN0b3VmYVxcXFxEZXNrdG9wXFxcXFBGRV9naXRodWJcXFxcYXBwXFxcXGFwaVxcXFxzdG9yZXNcXFxccm91dGUuanNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fstores%2Froute&page=%2Fapi%2Fstores%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstores%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5CPFE_github%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5CPFE_github&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fstores%2Froute&page=%2Fapi%2Fstores%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstores%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5CPFE_github%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5CPFE_github&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();