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
exports.id = "app/api/auth/verify-account/route";
exports.ids = ["app/api/auth/verify-account/route"];
exports.modules = {

/***/ "(rsc)/./app/api/auth/verify-account/route.js":
/*!**********************************************!*\
  !*** ./app/api/auth/verify-account/route.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.js\");\n\n\nasync function POST(request) {\n    try {\n        const body = await request.json();\n        const { email, token } = body;\n        console.log(\"Vérification de compte pour:\", email, \"Code:\", token);\n        if (!email || !token) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: \"Email et code de vérification requis\"\n            }, {\n                status: 400\n            });\n        }\n        // Récupérer l'utilisateur\n        const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].user.findUnique({\n            where: {\n                email\n            }\n        });\n        if (!user) {\n            console.log(\"Utilisateur non trouvé:\", email);\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: \"Utilisateur non trouvé\"\n            }, {\n                status: 404\n            });\n        }\n        // Vérifier que le token existe\n        if (!user.verificationToken) {\n            console.log(\"Pas de token de vérification pour:\", email);\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: \"Aucun code de vérification trouvé pour cet utilisateur\"\n            }, {\n                status: 400\n            });\n        }\n        console.log(\"Token trouvé:\", user.verificationToken);\n        // Vérifier si le code correspond\n        if (user.verificationToken !== token) {\n            console.log(\"Code invalide, attendu:\", user.verificationToken, \"reçu:\", token);\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: \"Code de vérification invalide\"\n            }, {\n                status: 400\n            });\n        }\n        // Activer le compte en mettant à jour emailVerified\n        const updatedUser = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].user.update({\n            where: {\n                id: user.id\n            },\n            data: {\n                emailVerified: new Date(),\n                verificationToken: null\n            }\n        });\n        console.log(\"Compte activé pour:\", email);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: \"Compte activé avec succès\",\n            user: {\n                id: updatedUser.id,\n                name: updatedUser.name,\n                email: updatedUser.email\n            }\n        }, {\n            status: 200\n        });\n    } catch (error) {\n        console.error(\"Erreur lors de la vérification du compte:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: \"Une erreur est survenue lors de la vérification du compte\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvdmVyaWZ5LWFjY291bnQvcm91dGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQTJDO0FBQ1Q7QUFFM0IsZUFBZUUsS0FBS0MsT0FBTztJQUNoQyxJQUFJO1FBQ0YsTUFBTUMsT0FBTyxNQUFNRCxRQUFRRSxJQUFJO1FBQy9CLE1BQU0sRUFBRUMsS0FBSyxFQUFFQyxLQUFLLEVBQUUsR0FBR0g7UUFFekJJLFFBQVFDLEdBQUcsQ0FBQyxnQ0FBZ0NILE9BQU8sU0FBU0M7UUFFNUQsSUFBSSxDQUFDRCxTQUFTLENBQUNDLE9BQU87WUFDcEIsT0FBT1AscURBQVlBLENBQUNLLElBQUksQ0FDdEI7Z0JBQUVLLFNBQVM7WUFBdUMsR0FDbEQ7Z0JBQUVDLFFBQVE7WUFBSTtRQUVsQjtRQUVBLDBCQUEwQjtRQUMxQixNQUFNQyxPQUFPLE1BQU1YLG1EQUFNQSxDQUFDVyxJQUFJLENBQUNDLFVBQVUsQ0FBQztZQUN4Q0MsT0FBTztnQkFBRVI7WUFBTTtRQUNqQjtRQUVBLElBQUksQ0FBQ00sTUFBTTtZQUNUSixRQUFRQyxHQUFHLENBQUMsMkJBQTJCSDtZQUN2QyxPQUFPTixxREFBWUEsQ0FBQ0ssSUFBSSxDQUN0QjtnQkFBRUssU0FBUztZQUF5QixHQUNwQztnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO1FBRUEsK0JBQStCO1FBQy9CLElBQUksQ0FBQ0MsS0FBS0csaUJBQWlCLEVBQUU7WUFDM0JQLFFBQVFDLEdBQUcsQ0FBQyxzQ0FBc0NIO1lBQ2xELE9BQU9OLHFEQUFZQSxDQUFDSyxJQUFJLENBQ3RCO2dCQUFFSyxTQUFTO1lBQXlELEdBQ3BFO2dCQUFFQyxRQUFRO1lBQUk7UUFFbEI7UUFFQUgsUUFBUUMsR0FBRyxDQUFDLGlCQUFpQkcsS0FBS0csaUJBQWlCO1FBRW5ELGlDQUFpQztRQUNqQyxJQUFJSCxLQUFLRyxpQkFBaUIsS0FBS1IsT0FBTztZQUNwQ0MsUUFBUUMsR0FBRyxDQUFDLDJCQUEyQkcsS0FBS0csaUJBQWlCLEVBQUUsU0FBU1I7WUFDeEUsT0FBT1AscURBQVlBLENBQUNLLElBQUksQ0FDdEI7Z0JBQUVLLFNBQVM7WUFBZ0MsR0FDM0M7Z0JBQUVDLFFBQVE7WUFBSTtRQUVsQjtRQUVBLG9EQUFvRDtRQUNwRCxNQUFNSyxjQUFjLE1BQU1mLG1EQUFNQSxDQUFDVyxJQUFJLENBQUNLLE1BQU0sQ0FBQztZQUMzQ0gsT0FBTztnQkFBRUksSUFBSU4sS0FBS00sRUFBRTtZQUFDO1lBQ3JCQyxNQUFNO2dCQUNKQyxlQUFlLElBQUlDO2dCQUNuQk4sbUJBQW1CO1lBQ3JCO1FBQ0Y7UUFFQVAsUUFBUUMsR0FBRyxDQUFDLHVCQUF1Qkg7UUFFbkMsT0FBT04scURBQVlBLENBQUNLLElBQUksQ0FDdEI7WUFDRUssU0FBUztZQUNURSxNQUFNO2dCQUNKTSxJQUFJRixZQUFZRSxFQUFFO2dCQUNsQkksTUFBTU4sWUFBWU0sSUFBSTtnQkFDdEJoQixPQUFPVSxZQUFZVixLQUFLO1lBQzFCO1FBQ0YsR0FDQTtZQUFFSyxRQUFRO1FBQUk7SUFFbEIsRUFBRSxPQUFPWSxPQUFPO1FBQ2RmLFFBQVFlLEtBQUssQ0FBQyw2Q0FBNkNBO1FBRTNELE9BQU92QixxREFBWUEsQ0FBQ0ssSUFBSSxDQUN0QjtZQUFFSyxTQUFTO1FBQTRELEdBQ3ZFO1lBQUVDLFFBQVE7UUFBSTtJQUVsQjtBQUNGIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXFN0b3VmYVxcRGVza3RvcFxccGZlXFxQZmVcXGFwcFxcYXBpXFxhdXRoXFx2ZXJpZnktYWNjb3VudFxccm91dGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XHJcbmltcG9ydCBwcmlzbWEgZnJvbSBcIkAvbGliL3ByaXNtYVwiO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBib2R5ID0gYXdhaXQgcmVxdWVzdC5qc29uKCk7XHJcbiAgICBjb25zdCB7IGVtYWlsLCB0b2tlbiB9ID0gYm9keTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcIlbDqXJpZmljYXRpb24gZGUgY29tcHRlIHBvdXI6XCIsIGVtYWlsLCBcIkNvZGU6XCIsIHRva2VuKTtcclxuXHJcbiAgICBpZiAoIWVtYWlsIHx8ICF0b2tlbikge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgeyBtZXNzYWdlOiBcIkVtYWlsIGV0IGNvZGUgZGUgdsOpcmlmaWNhdGlvbiByZXF1aXNcIiB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiA0MDAgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFLDqWN1cMOpcmVyIGwndXRpbGlzYXRldXJcclxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcclxuICAgICAgd2hlcmU6IHsgZW1haWwgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICghdXNlcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIlV0aWxpc2F0ZXVyIG5vbiB0cm91dsOpOlwiLCBlbWFpbCk7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgICB7IG1lc3NhZ2U6IFwiVXRpbGlzYXRldXIgbm9uIHRyb3V2w6lcIiB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiA0MDQgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFbDqXJpZmllciBxdWUgbGUgdG9rZW4gZXhpc3RlXHJcbiAgICBpZiAoIXVzZXIudmVyaWZpY2F0aW9uVG9rZW4pIHtcclxuICAgICAgY29uc29sZS5sb2coXCJQYXMgZGUgdG9rZW4gZGUgdsOpcmlmaWNhdGlvbiBwb3VyOlwiLCBlbWFpbCk7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgICB7IG1lc3NhZ2U6IFwiQXVjdW4gY29kZSBkZSB2w6lyaWZpY2F0aW9uIHRyb3V2w6kgcG91ciBjZXQgdXRpbGlzYXRldXJcIiB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiA0MDAgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiVG9rZW4gdHJvdXbDqTpcIiwgdXNlci52ZXJpZmljYXRpb25Ub2tlbik7XHJcblxyXG4gICAgLy8gVsOpcmlmaWVyIHNpIGxlIGNvZGUgY29ycmVzcG9uZFxyXG4gICAgaWYgKHVzZXIudmVyaWZpY2F0aW9uVG9rZW4gIT09IHRva2VuKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiQ29kZSBpbnZhbGlkZSwgYXR0ZW5kdTpcIiwgdXNlci52ZXJpZmljYXRpb25Ub2tlbiwgXCJyZcOndTpcIiwgdG9rZW4pO1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgeyBtZXNzYWdlOiBcIkNvZGUgZGUgdsOpcmlmaWNhdGlvbiBpbnZhbGlkZVwiIH0sXHJcbiAgICAgICAgeyBzdGF0dXM6IDQwMCB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQWN0aXZlciBsZSBjb21wdGUgZW4gbWV0dGFudCDDoCBqb3VyIGVtYWlsVmVyaWZpZWRcclxuICAgIGNvbnN0IHVwZGF0ZWRVc2VyID0gYXdhaXQgcHJpc21hLnVzZXIudXBkYXRlKHtcclxuICAgICAgd2hlcmU6IHsgaWQ6IHVzZXIuaWQgfSxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIGVtYWlsVmVyaWZpZWQ6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgdmVyaWZpY2F0aW9uVG9rZW46IG51bGwsIC8vIFN1cHByaW1lciBsZSB0b2tlbiBhcHLDqHMgdXRpbGlzYXRpb25cclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiQ29tcHRlIGFjdGl2w6kgcG91cjpcIiwgZW1haWwpO1xyXG5cclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgeyBcclxuICAgICAgICBtZXNzYWdlOiBcIkNvbXB0ZSBhY3RpdsOpIGF2ZWMgc3VjY8Ooc1wiLCBcclxuICAgICAgICB1c2VyOiB7XHJcbiAgICAgICAgICBpZDogdXBkYXRlZFVzZXIuaWQsXHJcbiAgICAgICAgICBuYW1lOiB1cGRhdGVkVXNlci5uYW1lLFxyXG4gICAgICAgICAgZW1haWw6IHVwZGF0ZWRVc2VyLmVtYWlsXHJcbiAgICAgICAgfSBcclxuICAgICAgfSxcclxuICAgICAgeyBzdGF0dXM6IDIwMCB9XHJcbiAgICApO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyZXVyIGxvcnMgZGUgbGEgdsOpcmlmaWNhdGlvbiBkdSBjb21wdGU6XCIsIGVycm9yKTtcclxuICAgIFxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICB7IG1lc3NhZ2U6IFwiVW5lIGVycmV1ciBlc3Qgc3VydmVudWUgbG9ycyBkZSBsYSB2w6lyaWZpY2F0aW9uIGR1IGNvbXB0ZVwiIH0sXHJcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxyXG4gICAgKTtcclxuICB9XHJcbn0gIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsInByaXNtYSIsIlBPU1QiLCJyZXF1ZXN0IiwiYm9keSIsImpzb24iLCJlbWFpbCIsInRva2VuIiwiY29uc29sZSIsImxvZyIsIm1lc3NhZ2UiLCJzdGF0dXMiLCJ1c2VyIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwidmVyaWZpY2F0aW9uVG9rZW4iLCJ1cGRhdGVkVXNlciIsInVwZGF0ZSIsImlkIiwiZGF0YSIsImVtYWlsVmVyaWZpZWQiLCJEYXRlIiwibmFtZSIsImVycm9yIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/verify-account/route.js\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.js":
/*!***********************!*\
  !*** ./lib/prisma.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst prismaClientSingleton = ()=>{\n    return new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\n};\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? prismaClientSingleton();\nif (true) {\n    globalForPrisma.prisma = prisma;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE4QztBQUU5QyxNQUFNQyx3QkFBd0I7SUFDNUIsT0FBTyxJQUFJRCx3REFBWUE7QUFDekI7QUFFQSxNQUFNRSxrQkFBa0JDO0FBRXhCLE1BQU1DLFNBQVNGLGdCQUFnQkUsTUFBTSxJQUFJSDtBQUV6QyxJQUFJSSxJQUFxQyxFQUFFO0lBQ3pDSCxnQkFBZ0JFLE1BQU0sR0FBR0E7QUFDM0I7QUFFQSxpRUFBZUEsTUFBTUEsRUFBQyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxTdG91ZmFcXERlc2t0b3BcXHBmZVxcUGZlXFxsaWJcXHByaXNtYS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCc7XG5cbmNvbnN0IHByaXNtYUNsaWVudFNpbmdsZXRvbiA9ICgpID0+IHtcbiAgcmV0dXJuIG5ldyBQcmlzbWFDbGllbnQoKTtcbn07XG5cbmNvbnN0IGdsb2JhbEZvclByaXNtYSA9IGdsb2JhbFRoaXM7XG5cbmNvbnN0IHByaXNtYSA9IGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPz8gcHJpc21hQ2xpZW50U2luZ2xldG9uKCk7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPSBwcmlzbWE7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHByaXNtYTtcbiJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJwcmlzbWFDbGllbnRTaW5nbGV0b24iLCJnbG9iYWxGb3JQcmlzbWEiLCJnbG9iYWxUaGlzIiwicHJpc21hIiwicHJvY2VzcyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fverify-account%2Froute&page=%2Fapi%2Fauth%2Fverify-account%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fverify-account%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fverify-account%2Froute&page=%2Fapi%2Fauth%2Fverify-account%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fverify-account%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Stoufa_Desktop_pfe_Pfe_app_api_auth_verify_account_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/verify-account/route.js */ \"(rsc)/./app/api/auth/verify-account/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/verify-account/route\",\n        pathname: \"/api/auth/verify-account\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/verify-account/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Stoufa\\\\Desktop\\\\pfe\\\\Pfe\\\\app\\\\api\\\\auth\\\\verify-account\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_Stoufa_Desktop_pfe_Pfe_app_api_auth_verify_account_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGdmVyaWZ5LWFjY291bnQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkZ2ZXJpZnktYWNjb3VudCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkZ2ZXJpZnktYWNjb3VudCUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNTdG91ZmElNUNEZXNrdG9wJTVDcGZlJTVDUGZlJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNTdG91ZmElNUNEZXNrdG9wJTVDcGZlJTVDUGZlJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUM4QjtBQUMzRztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcU3RvdWZhXFxcXERlc2t0b3BcXFxccGZlXFxcXFBmZVxcXFxhcHBcXFxcYXBpXFxcXGF1dGhcXFxcdmVyaWZ5LWFjY291bnRcXFxccm91dGUuanNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2F1dGgvdmVyaWZ5LWFjY291bnQvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hdXRoL3ZlcmlmeS1hY2NvdW50XCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9hdXRoL3ZlcmlmeS1hY2NvdW50L3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcU3RvdWZhXFxcXERlc2t0b3BcXFxccGZlXFxcXFBmZVxcXFxhcHBcXFxcYXBpXFxcXGF1dGhcXFxcdmVyaWZ5LWFjY291bnRcXFxccm91dGUuanNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fverify-account%2Froute&page=%2Fapi%2Fauth%2Fverify-account%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fverify-account%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fverify-account%2Froute&page=%2Fapi%2Fauth%2Fverify-account%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fverify-account%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();