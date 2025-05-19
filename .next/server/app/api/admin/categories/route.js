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
exports.id = "app/api/admin/categories/route";
exports.ids = ["app/api/admin/categories/route"];
exports.modules = {

/***/ "(rsc)/./app/api/admin/categories/route.js":
/*!*******************************************!*\
  !*** ./app/api/admin/categories/route.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_auth_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/next */ \"(rsc)/./node_modules/next-auth/next/index.js\");\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.js\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_3__.PrismaClient();\n/**\n * Route pour récupérer toutes les catégories avec des informations détaillées pour l'administrateur\n * Inclut les informations sur les vendeurs et les produits associés à chaque catégorie\n */ async function GET() {\n    try {\n        console.log('[ADMIN_CATEGORIES_GET] Vérification de l\\'authentification admin...');\n        const session = await (0,next_auth_next__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n        // Vérifier si l'utilisateur est connecté et est un administrateur\n        if (!session?.user || session.user.role !== 'ADMIN') {\n            console.log('[ADMIN_CATEGORIES_GET] Non autorisé: rôle administrateur requis');\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Non autorisé'\n            }, {\n                status: 403\n            });\n        }\n        console.log('[ADMIN_CATEGORIES_GET] Récupération de toutes les catégories...');\n        // Récupérer toutes les catégories avec les relations\n        const rawCategories = await prisma.category.findMany({\n            include: {\n                store: true,\n                products: {\n                    select: {\n                        id: true\n                    }\n                }\n            },\n            orderBy: {\n                createdAt: 'desc'\n            }\n        });\n        // Transformer les catégories pour éviter les références circulaires\n        const categories = rawCategories.map((category)=>({\n                id: category.id,\n                name: category.name,\n                description: category.description,\n                image: category.image,\n                createdAt: category.createdAt,\n                updatedAt: category.updatedAt,\n                productsCount: category.products.length,\n                store: category.store ? {\n                    id: category.store.id,\n                    name: category.store.name,\n                    logo: category.store.logo\n                } : null\n            }));\n        console.log(`[ADMIN_CATEGORIES_GET] ${categories.length} catégories récupérées avec succès`);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            categories\n        });\n    } catch (error) {\n        console.error('[ADMIN_CATEGORIES_GET] Erreur:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: `Erreur lors de la récupération des catégories: ${error.message}`\n        }, {\n            status: 500\n        });\n    }\n}\n/**\n * Route pour créer une nouvelle catégorie (admin uniquement)\n */ async function POST(request) {\n    try {\n        console.log('[ADMIN_CATEGORIES_POST] Vérification de l\\'authentification admin...');\n        const session = await (0,next_auth_next__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n        // Vérifier si l'utilisateur est connecté et est un administrateur\n        if (!session?.user || session.user.role !== 'ADMIN') {\n            console.log('[ADMIN_CATEGORIES_POST] Non autorisé: rôle administrateur requis');\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Non autorisé'\n            }, {\n                status: 403\n            });\n        }\n        const body = await request.json();\n        console.log('[ADMIN_CATEGORIES_POST] Données reçues:', body);\n        const { name, description, image, storeId } = body;\n        if (!name || !description || !storeId) {\n            console.log('[ADMIN_CATEGORIES_POST] Validation échouée: champs requis manquants');\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Le nom, la description et l\\'ID du magasin sont requis'\n            }, {\n                status: 400\n            });\n        }\n        // Vérifier que le magasin existe\n        const store = await prisma.store.findUnique({\n            where: {\n                id: storeId\n            }\n        });\n        if (!store) {\n            console.log(`[ADMIN_CATEGORIES_POST] Magasin avec l'ID ${storeId} non trouvé`);\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Magasin non trouvé'\n            }, {\n                status: 404\n            });\n        }\n        console.log('[ADMIN_CATEGORIES_POST] Création de la catégorie...');\n        const category = await prisma.category.create({\n            data: {\n                name,\n                description,\n                image: image || null,\n                storeId,\n                createdAt: new Date(),\n                updatedAt: new Date()\n            }\n        });\n        console.log('[ADMIN_CATEGORIES_POST] Catégorie créée avec succès:', category);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(category, {\n            status: 201\n        });\n    } catch (error) {\n        console.error('[ADMIN_CATEGORIES_POST] Erreur:', error);\n        // Gestion spécifique des erreurs Prisma\n        if (error.code === 'P2002') {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Une catégorie avec ce nom existe déjà dans ce magasin'\n            }, {\n                status: 400\n            });\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: `Erreur lors de la création de la catégorie: ${error.message}`\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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IkM6XFxVc2Vyc1xcU3RvdWZhXFxEZXNrdG9wXFxwZmVcXFBmZVxcYXBwXFxhcGlcXGFkbWluXFxjYXRlZ29yaWVzXFxyb3V0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XG5pbXBvcnQgeyBnZXRTZXJ2ZXJTZXNzaW9uIH0gZnJvbSAnbmV4dC1hdXRoL25leHQnO1xuaW1wb3J0IHsgYXV0aE9wdGlvbnMgfSBmcm9tICdAL2xpYi9hdXRoJztcbmltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gJ0BwcmlzbWEvY2xpZW50JztcblxuY29uc3QgcHJpc21hID0gbmV3IFByaXNtYUNsaWVudCgpO1xuXG4vKipcbiAqIFJvdXRlIHBvdXIgcsOpY3Vww6lyZXIgdG91dGVzIGxlcyBjYXTDqWdvcmllcyBhdmVjIGRlcyBpbmZvcm1hdGlvbnMgZMOpdGFpbGzDqWVzIHBvdXIgbCdhZG1pbmlzdHJhdGV1clxuICogSW5jbHV0IGxlcyBpbmZvcm1hdGlvbnMgc3VyIGxlcyB2ZW5kZXVycyBldCBsZXMgcHJvZHVpdHMgYXNzb2Npw6lzIMOgIGNoYXF1ZSBjYXTDqWdvcmllXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQoKSB7XG4gIHRyeSB7XG4gICAgY29uc29sZS5sb2coJ1tBRE1JTl9DQVRFR09SSUVTX0dFVF0gVsOpcmlmaWNhdGlvbiBkZSBsXFwnYXV0aGVudGlmaWNhdGlvbiBhZG1pbi4uLicpO1xuICAgIFxuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRTZXJ2ZXJTZXNzaW9uKGF1dGhPcHRpb25zKTtcbiAgICBcbiAgICAvLyBWw6lyaWZpZXIgc2kgbCd1dGlsaXNhdGV1ciBlc3QgY29ubmVjdMOpIGV0IGVzdCB1biBhZG1pbmlzdHJhdGV1clxuICAgIGlmICghc2Vzc2lvbj8udXNlciB8fCBzZXNzaW9uLnVzZXIucm9sZSAhPT0gJ0FETUlOJykge1xuICAgICAgY29uc29sZS5sb2coJ1tBRE1JTl9DQVRFR09SSUVTX0dFVF0gTm9uIGF1dG9yaXPDqTogcsO0bGUgYWRtaW5pc3RyYXRldXIgcmVxdWlzJyk7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ05vbiBhdXRvcmlzw6knIH0sIHsgc3RhdHVzOiA0MDMgfSk7XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coJ1tBRE1JTl9DQVRFR09SSUVTX0dFVF0gUsOpY3Vww6lyYXRpb24gZGUgdG91dGVzIGxlcyBjYXTDqWdvcmllcy4uLicpO1xuICAgIFxuICAgIC8vIFLDqWN1cMOpcmVyIHRvdXRlcyBsZXMgY2F0w6lnb3JpZXMgYXZlYyBsZXMgcmVsYXRpb25zXG4gICAgY29uc3QgcmF3Q2F0ZWdvcmllcyA9IGF3YWl0IHByaXNtYS5jYXRlZ29yeS5maW5kTWFueSh7XG4gICAgICBpbmNsdWRlOiB7XG4gICAgICAgIHN0b3JlOiB0cnVlLFxuICAgICAgICBwcm9kdWN0czoge1xuICAgICAgICAgIHNlbGVjdDoge1xuICAgICAgICAgICAgaWQ6IHRydWUsXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgb3JkZXJCeToge1xuICAgICAgICBjcmVhdGVkQXQ6ICdkZXNjJ1xuICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIC8vIFRyYW5zZm9ybWVyIGxlcyBjYXTDqWdvcmllcyBwb3VyIMOpdml0ZXIgbGVzIHLDqWbDqXJlbmNlcyBjaXJjdWxhaXJlc1xuICAgIGNvbnN0IGNhdGVnb3JpZXMgPSByYXdDYXRlZ29yaWVzLm1hcChjYXRlZ29yeSA9PiAoe1xuICAgICAgaWQ6IGNhdGVnb3J5LmlkLFxuICAgICAgbmFtZTogY2F0ZWdvcnkubmFtZSxcbiAgICAgIGRlc2NyaXB0aW9uOiBjYXRlZ29yeS5kZXNjcmlwdGlvbixcbiAgICAgIGltYWdlOiBjYXRlZ29yeS5pbWFnZSxcbiAgICAgIGNyZWF0ZWRBdDogY2F0ZWdvcnkuY3JlYXRlZEF0LFxuICAgICAgdXBkYXRlZEF0OiBjYXRlZ29yeS51cGRhdGVkQXQsXG4gICAgICBwcm9kdWN0c0NvdW50OiBjYXRlZ29yeS5wcm9kdWN0cy5sZW5ndGgsXG4gICAgICBzdG9yZTogY2F0ZWdvcnkuc3RvcmUgPyB7XG4gICAgICAgIGlkOiBjYXRlZ29yeS5zdG9yZS5pZCxcbiAgICAgICAgbmFtZTogY2F0ZWdvcnkuc3RvcmUubmFtZSxcbiAgICAgICAgbG9nbzogY2F0ZWdvcnkuc3RvcmUubG9nb1xuICAgICAgfSA6IG51bGxcbiAgICB9KSk7XG5cbiAgICBjb25zb2xlLmxvZyhgW0FETUlOX0NBVEVHT1JJRVNfR0VUXSAke2NhdGVnb3JpZXMubGVuZ3RofSBjYXTDqWdvcmllcyByw6ljdXDDqXLDqWVzIGF2ZWMgc3VjY8Ooc2ApO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGNhdGVnb3JpZXMgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignW0FETUlOX0NBVEVHT1JJRVNfR0VUXSBFcnJldXI6JywgZXJyb3IpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgIHsgZXJyb3I6IGBFcnJldXIgbG9ycyBkZSBsYSByw6ljdXDDqXJhdGlvbiBkZXMgY2F0w6lnb3JpZXM6ICR7ZXJyb3IubWVzc2FnZX1gIH0sXG4gICAgICB7IHN0YXR1czogNTAwIH1cbiAgICApO1xuICB9XG59XG5cbi8qKlxuICogUm91dGUgcG91ciBjcsOpZXIgdW5lIG5vdXZlbGxlIGNhdMOpZ29yaWUgKGFkbWluIHVuaXF1ZW1lbnQpXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcXVlc3QpIHtcbiAgdHJ5IHtcbiAgICBjb25zb2xlLmxvZygnW0FETUlOX0NBVEVHT1JJRVNfUE9TVF0gVsOpcmlmaWNhdGlvbiBkZSBsXFwnYXV0aGVudGlmaWNhdGlvbiBhZG1pbi4uLicpO1xuICAgIFxuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRTZXJ2ZXJTZXNzaW9uKGF1dGhPcHRpb25zKTtcbiAgICBcbiAgICAvLyBWw6lyaWZpZXIgc2kgbCd1dGlsaXNhdGV1ciBlc3QgY29ubmVjdMOpIGV0IGVzdCB1biBhZG1pbmlzdHJhdGV1clxuICAgIGlmICghc2Vzc2lvbj8udXNlciB8fCBzZXNzaW9uLnVzZXIucm9sZSAhPT0gJ0FETUlOJykge1xuICAgICAgY29uc29sZS5sb2coJ1tBRE1JTl9DQVRFR09SSUVTX1BPU1RdIE5vbiBhdXRvcmlzw6k6IHLDtGxlIGFkbWluaXN0cmF0ZXVyIHJlcXVpcycpO1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdOb24gYXV0b3Jpc8OpJyB9LCB7IHN0YXR1czogNDAzIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXF1ZXN0Lmpzb24oKTtcbiAgICBjb25zb2xlLmxvZygnW0FETUlOX0NBVEVHT1JJRVNfUE9TVF0gRG9ubsOpZXMgcmXDp3VlczonLCBib2R5KTtcbiAgICBcbiAgICBjb25zdCB7IG5hbWUsIGRlc2NyaXB0aW9uLCBpbWFnZSwgc3RvcmVJZCB9ID0gYm9keTtcbiAgICBcbiAgICBpZiAoIW5hbWUgfHwgIWRlc2NyaXB0aW9uIHx8ICFzdG9yZUlkKSB7XG4gICAgICBjb25zb2xlLmxvZygnW0FETUlOX0NBVEVHT1JJRVNfUE9TVF0gVmFsaWRhdGlvbiDDqWNob3XDqWU6IGNoYW1wcyByZXF1aXMgbWFucXVhbnRzJyk7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBcbiAgICAgICAgZXJyb3I6ICdMZSBub20sIGxhIGRlc2NyaXB0aW9uIGV0IGxcXCdJRCBkdSBtYWdhc2luIHNvbnQgcmVxdWlzJyBcbiAgICAgIH0sIHsgc3RhdHVzOiA0MDAgfSk7XG4gICAgfVxuXG4gICAgLy8gVsOpcmlmaWVyIHF1ZSBsZSBtYWdhc2luIGV4aXN0ZVxuICAgIGNvbnN0IHN0b3JlID0gYXdhaXQgcHJpc21hLnN0b3JlLmZpbmRVbmlxdWUoe1xuICAgICAgd2hlcmU6IHsgaWQ6IHN0b3JlSWQgfVxuICAgIH0pO1xuICAgIFxuICAgIGlmICghc3RvcmUpIHtcbiAgICAgIGNvbnNvbGUubG9nKGBbQURNSU5fQ0FURUdPUklFU19QT1NUXSBNYWdhc2luIGF2ZWMgbCdJRCAke3N0b3JlSWR9IG5vbiB0cm91dsOpYCk7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ01hZ2FzaW4gbm9uIHRyb3V2w6knIH0sIHsgc3RhdHVzOiA0MDQgfSk7XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coJ1tBRE1JTl9DQVRFR09SSUVTX1BPU1RdIENyw6lhdGlvbiBkZSBsYSBjYXTDqWdvcmllLi4uJyk7XG4gICAgXG4gICAgY29uc3QgY2F0ZWdvcnkgPSBhd2FpdCBwcmlzbWEuY2F0ZWdvcnkuY3JlYXRlKHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgIGltYWdlOiBpbWFnZSB8fCBudWxsLFxuICAgICAgICBzdG9yZUlkLFxuICAgICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKCksXG4gICAgICAgIHVwZGF0ZWRBdDogbmV3IERhdGUoKVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc29sZS5sb2coJ1tBRE1JTl9DQVRFR09SSUVTX1BPU1RdIENhdMOpZ29yaWUgY3LDqcOpZSBhdmVjIHN1Y2PDqHM6JywgY2F0ZWdvcnkpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihjYXRlZ29yeSwgeyBzdGF0dXM6IDIwMSB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdbQURNSU5fQ0FURUdPUklFU19QT1NUXSBFcnJldXI6JywgZXJyb3IpO1xuICAgIFxuICAgIC8vIEdlc3Rpb24gc3DDqWNpZmlxdWUgZGVzIGVycmV1cnMgUHJpc21hXG4gICAgaWYgKGVycm9yLmNvZGUgPT09ICdQMjAwMicpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IFxuICAgICAgICBlcnJvcjogJ1VuZSBjYXTDqWdvcmllIGF2ZWMgY2Ugbm9tIGV4aXN0ZSBkw6lqw6AgZGFucyBjZSBtYWdhc2luJyBcbiAgICAgIH0sIHsgc3RhdHVzOiA0MDAgfSk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IFxuICAgICAgZXJyb3I6IGBFcnJldXIgbG9ycyBkZSBsYSBjcsOpYXRpb24gZGUgbGEgY2F0w6lnb3JpZTogJHtlcnJvci5tZXNzYWdlfWAgXG4gICAgfSwgeyBzdGF0dXM6IDUwMCB9KTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImdldFNlcnZlclNlc3Npb24iLCJhdXRoT3B0aW9ucyIsIlByaXNtYUNsaWVudCIsInByaXNtYSIsIkdFVCIsImNvbnNvbGUiLCJsb2ciLCJzZXNzaW9uIiwidXNlciIsInJvbGUiLCJqc29uIiwiZXJyb3IiLCJzdGF0dXMiLCJyYXdDYXRlZ29yaWVzIiwiY2F0ZWdvcnkiLCJmaW5kTWFueSIsImluY2x1ZGUiLCJzdG9yZSIsInByb2R1Y3RzIiwic2VsZWN0IiwiaWQiLCJvcmRlckJ5IiwiY3JlYXRlZEF0IiwiY2F0ZWdvcmllcyIsIm1hcCIsIm5hbWUiLCJkZXNjcmlwdGlvbiIsImltYWdlIiwidXBkYXRlZEF0IiwicHJvZHVjdHNDb3VudCIsImxlbmd0aCIsImxvZ28iLCJtZXNzYWdlIiwiUE9TVCIsInJlcXVlc3QiLCJib2R5Iiwic3RvcmVJZCIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsImNyZWF0ZSIsImRhdGEiLCJEYXRlIiwiY29kZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/admin/categories/route.js\n");

/***/ }),

/***/ "(rsc)/./lib/auth.js":
/*!*********************!*\
  !*** ./lib/auth.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   auth: () => (/* binding */ auth),\n/* harmony export */   authOptions: () => (/* binding */ authOptions),\n/* harmony export */   getCurrentUser: () => (/* binding */ getCurrentUser),\n/* harmony export */   signIn: () => (/* binding */ signIn),\n/* harmony export */   signOut: () => (/* binding */ signOut)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n\n\n\n\n// Use Prisma as a singleton to avoid connection issues\nconst globalForPrisma = global;\nglobalForPrisma.prisma = globalForPrisma.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nconst prisma = globalForPrisma.prisma;\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_3__[\"default\"])({\n            name: \"credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) {\n                    throw new Error(\"Email et mot de passe requis\");\n                }\n                const user = await prisma.user.findUnique({\n                    where: {\n                        email: credentials.email\n                    }\n                });\n                if (!user) {\n                    throw new Error(\"Utilisateur non trouvé\");\n                }\n                const isPasswordValid = await bcrypt__WEBPACK_IMPORTED_MODULE_1___default().compare(credentials.password, user.password);\n                if (!isPasswordValid) {\n                    throw new Error(\"Mot de passe incorrect\");\n                }\n                return {\n                    id: user.id,\n                    email: user.email,\n                    name: user.name,\n                    role: user.role\n                };\n            }\n        })\n    ],\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.role = user.role;\n                token.id = user.id;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session?.user) {\n                session.user.role = token.role;\n                session.user.id = token.id;\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/login\",\n        error: \"/login\"\n    },\n    session: {\n        strategy: \"jwt\"\n    },\n    secret: process.env.NEXTAUTH_SECRET\n};\nconst { auth, signIn, signOut } = next_auth__WEBPACK_IMPORTED_MODULE_2___default()(authOptions);\n/**\r\n * Get the current user from a user ID\r\n * @param {string} userId - The user ID to get\r\n * @returns {Promise<Object|null>} The user object or null if not found\r\n */ async function getCurrentUser(userId) {\n    if (!userId) return null;\n    try {\n        const user = await prisma.user.findUnique({\n            where: {\n                id: userId\n            },\n            select: {\n                id: true,\n                name: true,\n                email: true,\n                role: true,\n                image: true\n            }\n        });\n        return user;\n    } catch (error) {\n        console.error(\"Error in getCurrentUser:\", error);\n        return null;\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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InNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gXCJAcHJpc21hL2NsaWVudFwiO1xyXG5pbXBvcnQgYmNyeXB0IGZyb20gXCJiY3J5cHRcIjtcclxuaW1wb3J0IE5leHRBdXRoIGZyb20gXCJuZXh0LWF1dGhcIjtcclxuaW1wb3J0IENyZWRlbnRpYWxzUHJvdmlkZXIgZnJvbSBcIm5leHQtYXV0aC9wcm92aWRlcnMvY3JlZGVudGlhbHNcIjtcclxuXHJcbi8vIFVzZSBQcmlzbWEgYXMgYSBzaW5nbGV0b24gdG8gYXZvaWQgY29ubmVjdGlvbiBpc3N1ZXNcclxuY29uc3QgZ2xvYmFsRm9yUHJpc21hID0gZ2xvYmFsO1xyXG5nbG9iYWxGb3JQcmlzbWEucHJpc21hID0gZ2xvYmFsRm9yUHJpc21hLnByaXNtYSB8fCBuZXcgUHJpc21hQ2xpZW50KCk7XHJcbmNvbnN0IHByaXNtYSA9IGdsb2JhbEZvclByaXNtYS5wcmlzbWE7XHJcblxyXG5leHBvcnQgY29uc3QgYXV0aE9wdGlvbnMgPSB7XHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBDcmVkZW50aWFsc1Byb3ZpZGVyKHtcclxuICAgICAgbmFtZTogXCJjcmVkZW50aWFsc1wiLFxyXG4gICAgICBjcmVkZW50aWFsczoge1xyXG4gICAgICAgIGVtYWlsOiB7IGxhYmVsOiBcIkVtYWlsXCIsIHR5cGU6IFwiZW1haWxcIiB9LFxyXG4gICAgICAgIHBhc3N3b3JkOiB7IGxhYmVsOiBcIlBhc3N3b3JkXCIsIHR5cGU6IFwicGFzc3dvcmRcIiB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGFzeW5jIGF1dGhvcml6ZShjcmVkZW50aWFscykge1xyXG4gICAgICAgIGlmICghY3JlZGVudGlhbHM/LmVtYWlsIHx8ICFjcmVkZW50aWFscz8ucGFzc3dvcmQpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVtYWlsIGV0IG1vdCBkZSBwYXNzZSByZXF1aXNcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7XHJcbiAgICAgICAgICB3aGVyZTogeyBlbWFpbDogY3JlZGVudGlhbHMuZW1haWwgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoIXVzZXIpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlV0aWxpc2F0ZXVyIG5vbiB0cm91dsOpXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgaXNQYXNzd29yZFZhbGlkID0gYXdhaXQgYmNyeXB0LmNvbXBhcmUoXHJcbiAgICAgICAgICBjcmVkZW50aWFscy5wYXNzd29yZCxcclxuICAgICAgICAgIHVzZXIucGFzc3dvcmRcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBpZiAoIWlzUGFzc3dvcmRWYWxpZCkge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTW90IGRlIHBhc3NlIGluY29ycmVjdFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBpZDogdXNlci5pZCxcclxuICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxyXG4gICAgICAgICAgbmFtZTogdXNlci5uYW1lLFxyXG4gICAgICAgICAgcm9sZTogdXNlci5yb2xlXHJcbiAgICAgICAgfTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICBdLFxyXG4gIGNhbGxiYWNrczoge1xyXG4gICAgYXN5bmMgand0KHsgdG9rZW4sIHVzZXIgfSkge1xyXG4gICAgICBpZiAodXNlcikge1xyXG4gICAgICAgIHRva2VuLnJvbGUgPSB1c2VyLnJvbGU7XHJcbiAgICAgICAgdG9rZW4uaWQgPSB1c2VyLmlkO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0b2tlbjtcclxuICAgIH0sXHJcbiAgICBhc3luYyBzZXNzaW9uKHsgc2Vzc2lvbiwgdG9rZW4gfSkge1xyXG4gICAgICBpZiAoc2Vzc2lvbj8udXNlcikge1xyXG4gICAgICAgIHNlc3Npb24udXNlci5yb2xlID0gdG9rZW4ucm9sZTtcclxuICAgICAgICBzZXNzaW9uLnVzZXIuaWQgPSB0b2tlbi5pZDtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gc2Vzc2lvbjtcclxuICAgIH1cclxuICB9LFxyXG4gIHBhZ2VzOiB7XHJcbiAgICBzaWduSW46IFwiL2xvZ2luXCIsXHJcbiAgICBlcnJvcjogXCIvbG9naW5cIlxyXG4gIH0sXHJcbiAgc2Vzc2lvbjoge1xyXG4gICAgc3RyYXRlZ3k6IFwiand0XCJcclxuICB9LFxyXG4gIHNlY3JldDogcHJvY2Vzcy5lbnYuTkVYVEFVVEhfU0VDUkVUXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgeyBhdXRoLCBzaWduSW4sIHNpZ25PdXQgfSA9IE5leHRBdXRoKGF1dGhPcHRpb25zKTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIGN1cnJlbnQgdXNlciBmcm9tIGEgdXNlciBJRFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdXNlcklkIC0gVGhlIHVzZXIgSUQgdG8gZ2V0XHJcbiAqIEByZXR1cm5zIHtQcm9taXNlPE9iamVjdHxudWxsPn0gVGhlIHVzZXIgb2JqZWN0IG9yIG51bGwgaWYgbm90IGZvdW5kXHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Q3VycmVudFVzZXIodXNlcklkKSB7XHJcbiAgaWYgKCF1c2VySWQpIHJldHVybiBudWxsO1xyXG5cclxuICB0cnkge1xyXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xyXG4gICAgICB3aGVyZTogeyBpZDogdXNlcklkIH0sXHJcbiAgICAgIHNlbGVjdDoge1xyXG4gICAgICAgIGlkOiB0cnVlLFxyXG4gICAgICAgIG5hbWU6IHRydWUsXHJcbiAgICAgICAgZW1haWw6IHRydWUsXHJcbiAgICAgICAgcm9sZTogdHJ1ZSxcclxuICAgICAgICBpbWFnZTogdHJ1ZVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gdXNlcjtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGluIGdldEN1cnJlbnRVc2VyOlwiLCBlcnJvcik7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbn0gIl0sIm5hbWVzIjpbIlByaXNtYUNsaWVudCIsImJjcnlwdCIsIk5leHRBdXRoIiwiQ3JlZGVudGlhbHNQcm92aWRlciIsImdsb2JhbEZvclByaXNtYSIsImdsb2JhbCIsInByaXNtYSIsImF1dGhPcHRpb25zIiwicHJvdmlkZXJzIiwibmFtZSIsImNyZWRlbnRpYWxzIiwiZW1haWwiLCJsYWJlbCIsInR5cGUiLCJwYXNzd29yZCIsImF1dGhvcml6ZSIsIkVycm9yIiwidXNlciIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsImlzUGFzc3dvcmRWYWxpZCIsImNvbXBhcmUiLCJpZCIsInJvbGUiLCJjYWxsYmFja3MiLCJqd3QiLCJ0b2tlbiIsInNlc3Npb24iLCJwYWdlcyIsInNpZ25JbiIsImVycm9yIiwic3RyYXRlZ3kiLCJzZWNyZXQiLCJwcm9jZXNzIiwiZW52IiwiTkVYVEFVVEhfU0VDUkVUIiwiYXV0aCIsInNpZ25PdXQiLCJnZXRDdXJyZW50VXNlciIsInVzZXJJZCIsInNlbGVjdCIsImltYWdlIiwiY29uc29sZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fcategories%2Froute&page=%2Fapi%2Fadmin%2Fcategories%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fcategories%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fcategories%2Froute&page=%2Fapi%2Fadmin%2Fcategories%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fcategories%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Stoufa_Desktop_pfe_Pfe_app_api_admin_categories_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/admin/categories/route.js */ \"(rsc)/./app/api/admin/categories/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/admin/categories/route\",\n        pathname: \"/api/admin/categories\",\n        filename: \"route\",\n        bundlePath: \"app/api/admin/categories/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Stoufa\\\\Desktop\\\\pfe\\\\Pfe\\\\app\\\\api\\\\admin\\\\categories\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_Stoufa_Desktop_pfe_Pfe_app_api_admin_categories_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhZG1pbiUyRmNhdGVnb3JpZXMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmFkbWluJTJGY2F0ZWdvcmllcyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmFkbWluJTJGY2F0ZWdvcmllcyUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNTdG91ZmElNUNEZXNrdG9wJTVDcGZlJTVDUGZlJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNTdG91ZmElNUNEZXNrdG9wJTVDcGZlJTVDUGZlJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUMyQjtBQUN4RztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcU3RvdWZhXFxcXERlc2t0b3BcXFxccGZlXFxcXFBmZVxcXFxhcHBcXFxcYXBpXFxcXGFkbWluXFxcXGNhdGVnb3JpZXNcXFxccm91dGUuanNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2FkbWluL2NhdGVnb3JpZXMvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hZG1pbi9jYXRlZ29yaWVzXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9hZG1pbi9jYXRlZ29yaWVzL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcU3RvdWZhXFxcXERlc2t0b3BcXFxccGZlXFxcXFBmZVxcXFxhcHBcXFxcYXBpXFxcXGFkbWluXFxcXGNhdGVnb3JpZXNcXFxccm91dGUuanNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fcategories%2Froute&page=%2Fapi%2Fadmin%2Fcategories%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fcategories%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("bcrypt");

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

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

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

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

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

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/oauth","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fcategories%2Froute&page=%2Fapi%2Fadmin%2Fcategories%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fcategories%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();