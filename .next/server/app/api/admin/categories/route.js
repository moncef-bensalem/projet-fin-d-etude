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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_auth_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/next */ \"(rsc)/./node_modules/next-auth/next/index.js\");\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.js\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_3__.PrismaClient();\n/**\n * Route pour récupérer toutes les catégories avec des informations détaillées pour l'administrateur\n * Inclut les informations sur les vendeurs et les produits associés à chaque catégorie\n */ async function GET() {\n    try {\n        console.log('[ADMIN_CATEGORIES_GET] Vérification de l\\'authentification admin...');\n        const session = await (0,next_auth_next__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n        // Vérifier si l'utilisateur est connecté et est un administrateur\n        if (!session?.user || session.user.role !== 'ADMIN') {\n            console.log('[ADMIN_CATEGORIES_GET] Non autorisé: rôle administrateur requis');\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Non autorisé'\n            }, {\n                status: 403\n            });\n        }\n        console.log('[ADMIN_CATEGORIES_GET] Récupération de toutes les catégories...');\n        // Récupérer toutes les catégories avec les relations\n        const rawCategories = await prisma.category.findMany({\n            include: {\n                store: true,\n                products: {\n                    select: {\n                        id: true\n                    }\n                }\n            },\n            orderBy: {\n                createdAt: 'desc'\n            }\n        });\n        // Transformer les catégories pour éviter les références circulaires\n        const categories = rawCategories.map((category)=>({\n                id: category.id,\n                name: category.name,\n                description: category.description,\n                image: category.image,\n                createdAt: category.createdAt,\n                updatedAt: category.updatedAt,\n                productsCount: category.products.length,\n                store: category.store ? {\n                    id: category.store.id,\n                    name: category.store.name,\n                    logo: category.store.logo\n                } : null\n            }));\n        console.log(`[ADMIN_CATEGORIES_GET] ${categories.length} catégories récupérées avec succès`);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            categories\n        });\n    } catch (error) {\n        console.error('[ADMIN_CATEGORIES_GET] Erreur:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: `Erreur lors de la récupération des catégories: ${error.message}`\n        }, {\n            status: 500\n        });\n    }\n}\n/**\n * Route pour créer une nouvelle catégorie (admin uniquement)\n */ async function POST(request) {\n    try {\n        console.log('[ADMIN_CATEGORIES_POST] Vérification de l\\'authentification admin...');\n        const session = await (0,next_auth_next__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n        // Vérifier si l'utilisateur est connecté et est un administrateur\n        if (!session?.user || session.user.role !== 'ADMIN') {\n            console.log('[ADMIN_CATEGORIES_POST] Non autorisé: rôle administrateur requis');\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Non autorisé'\n            }, {\n                status: 403\n            });\n        }\n        const body = await request.json();\n        console.log('[ADMIN_CATEGORIES_POST] Données reçues:', body);\n        const { name, description, image, storeId } = body;\n        if (!name || !description || !storeId) {\n            console.log('[ADMIN_CATEGORIES_POST] Validation échouée: champs requis manquants');\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Le nom, la description et l\\'ID du magasin sont requis'\n            }, {\n                status: 400\n            });\n        }\n        // Vérifier que le magasin existe\n        const store = await prisma.store.findUnique({\n            where: {\n                id: storeId\n            }\n        });\n        if (!store) {\n            console.log(`[ADMIN_CATEGORIES_POST] Magasin avec l'ID ${storeId} non trouvé`);\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Magasin non trouvé'\n            }, {\n                status: 404\n            });\n        }\n        console.log('[ADMIN_CATEGORIES_POST] Création de la catégorie...');\n        const category = await prisma.category.create({\n            data: {\n                name,\n                description,\n                image: image || null,\n                storeId,\n                createdAt: new Date(),\n                updatedAt: new Date()\n            }\n        });\n        console.log('[ADMIN_CATEGORIES_POST] Catégorie créée avec succès:', category);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(category, {\n            status: 201\n        });\n    } catch (error) {\n        console.error('[ADMIN_CATEGORIES_POST] Erreur:', error);\n        // Gestion spécifique des erreurs Prisma\n        if (error.code === 'P2002') {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Une catégorie avec ce nom existe déjà dans ce magasin'\n            }, {\n                status: 400\n            });\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: `Erreur lors de la création de la catégorie: ${error.message}`\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2FkbWluL2NhdGVnb3JpZXMvcm91dGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUEyQztBQUNPO0FBQ1Q7QUFDSztBQUU5QyxNQUFNSSxTQUFTLElBQUlELHdEQUFZQTtBQUUvQjs7O0NBR0MsR0FDTSxlQUFlRTtJQUNwQixJQUFJO1FBQ0ZDLFFBQVFDLEdBQUcsQ0FBQztRQUVaLE1BQU1DLFVBQVUsTUFBTVAsZ0VBQWdCQSxDQUFDQyxrREFBV0E7UUFFbEQsa0VBQWtFO1FBQ2xFLElBQUksQ0FBQ00sU0FBU0MsUUFBUUQsUUFBUUMsSUFBSSxDQUFDQyxJQUFJLEtBQUssU0FBUztZQUNuREosUUFBUUMsR0FBRyxDQUFDO1lBQ1osT0FBT1AscURBQVlBLENBQUNXLElBQUksQ0FBQztnQkFBRUMsT0FBTztZQUFlLEdBQUc7Z0JBQUVDLFFBQVE7WUFBSTtRQUNwRTtRQUVBUCxRQUFRQyxHQUFHLENBQUM7UUFFWixxREFBcUQ7UUFDckQsTUFBTU8sZ0JBQWdCLE1BQU1WLE9BQU9XLFFBQVEsQ0FBQ0MsUUFBUSxDQUFDO1lBQ25EQyxTQUFTO2dCQUNQQyxPQUFPO2dCQUNQQyxVQUFVO29CQUNSQyxRQUFRO3dCQUNOQyxJQUFJO29CQUNOO2dCQUNGO1lBQ0Y7WUFDQUMsU0FBUztnQkFDUEMsV0FBVztZQUNiO1FBQ0Y7UUFFQSxvRUFBb0U7UUFDcEUsTUFBTUMsYUFBYVYsY0FBY1csR0FBRyxDQUFDVixDQUFBQSxXQUFhO2dCQUNoRE0sSUFBSU4sU0FBU00sRUFBRTtnQkFDZkssTUFBTVgsU0FBU1csSUFBSTtnQkFDbkJDLGFBQWFaLFNBQVNZLFdBQVc7Z0JBQ2pDQyxPQUFPYixTQUFTYSxLQUFLO2dCQUNyQkwsV0FBV1IsU0FBU1EsU0FBUztnQkFDN0JNLFdBQVdkLFNBQVNjLFNBQVM7Z0JBQzdCQyxlQUFlZixTQUFTSSxRQUFRLENBQUNZLE1BQU07Z0JBQ3ZDYixPQUFPSCxTQUFTRyxLQUFLLEdBQUc7b0JBQ3RCRyxJQUFJTixTQUFTRyxLQUFLLENBQUNHLEVBQUU7b0JBQ3JCSyxNQUFNWCxTQUFTRyxLQUFLLENBQUNRLElBQUk7b0JBQ3pCTSxNQUFNakIsU0FBU0csS0FBSyxDQUFDYyxJQUFJO2dCQUMzQixJQUFJO1lBQ047UUFFQTFCLFFBQVFDLEdBQUcsQ0FBQyxDQUFDLHVCQUF1QixFQUFFaUIsV0FBV08sTUFBTSxDQUFDLGtDQUFrQyxDQUFDO1FBQzNGLE9BQU8vQixxREFBWUEsQ0FBQ1csSUFBSSxDQUFDO1lBQUVhO1FBQVc7SUFDeEMsRUFBRSxPQUFPWixPQUFPO1FBQ2ROLFFBQVFNLEtBQUssQ0FBQyxrQ0FBa0NBO1FBQ2hELE9BQU9aLHFEQUFZQSxDQUFDVyxJQUFJLENBQ3RCO1lBQUVDLE9BQU8sQ0FBQywrQ0FBK0MsRUFBRUEsTUFBTXFCLE9BQU8sRUFBRTtRQUFDLEdBQzNFO1lBQUVwQixRQUFRO1FBQUk7SUFFbEI7QUFDRjtBQUVBOztDQUVDLEdBQ00sZUFBZXFCLEtBQUtDLE9BQU87SUFDaEMsSUFBSTtRQUNGN0IsUUFBUUMsR0FBRyxDQUFDO1FBRVosTUFBTUMsVUFBVSxNQUFNUCxnRUFBZ0JBLENBQUNDLGtEQUFXQTtRQUVsRCxrRUFBa0U7UUFDbEUsSUFBSSxDQUFDTSxTQUFTQyxRQUFRRCxRQUFRQyxJQUFJLENBQUNDLElBQUksS0FBSyxTQUFTO1lBQ25ESixRQUFRQyxHQUFHLENBQUM7WUFDWixPQUFPUCxxREFBWUEsQ0FBQ1csSUFBSSxDQUFDO2dCQUFFQyxPQUFPO1lBQWUsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQ3BFO1FBRUEsTUFBTXVCLE9BQU8sTUFBTUQsUUFBUXhCLElBQUk7UUFDL0JMLFFBQVFDLEdBQUcsQ0FBQywyQ0FBMkM2QjtRQUV2RCxNQUFNLEVBQUVWLElBQUksRUFBRUMsV0FBVyxFQUFFQyxLQUFLLEVBQUVTLE9BQU8sRUFBRSxHQUFHRDtRQUU5QyxJQUFJLENBQUNWLFFBQVEsQ0FBQ0MsZUFBZSxDQUFDVSxTQUFTO1lBQ3JDL0IsUUFBUUMsR0FBRyxDQUFDO1lBQ1osT0FBT1AscURBQVlBLENBQUNXLElBQUksQ0FBQztnQkFDdkJDLE9BQU87WUFDVCxHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDbkI7UUFFQSxpQ0FBaUM7UUFDakMsTUFBTUssUUFBUSxNQUFNZCxPQUFPYyxLQUFLLENBQUNvQixVQUFVLENBQUM7WUFDMUNDLE9BQU87Z0JBQUVsQixJQUFJZ0I7WUFBUTtRQUN2QjtRQUVBLElBQUksQ0FBQ25CLE9BQU87WUFDVlosUUFBUUMsR0FBRyxDQUFDLENBQUMsMENBQTBDLEVBQUU4QixRQUFRLFdBQVcsQ0FBQztZQUM3RSxPQUFPckMscURBQVlBLENBQUNXLElBQUksQ0FBQztnQkFBRUMsT0FBTztZQUFxQixHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDMUU7UUFFQVAsUUFBUUMsR0FBRyxDQUFDO1FBRVosTUFBTVEsV0FBVyxNQUFNWCxPQUFPVyxRQUFRLENBQUN5QixNQUFNLENBQUM7WUFDNUNDLE1BQU07Z0JBQ0pmO2dCQUNBQztnQkFDQUMsT0FBT0EsU0FBUztnQkFDaEJTO2dCQUNBZCxXQUFXLElBQUltQjtnQkFDZmIsV0FBVyxJQUFJYTtZQUNqQjtRQUNGO1FBRUFwQyxRQUFRQyxHQUFHLENBQUMsd0RBQXdEUTtRQUNwRSxPQUFPZixxREFBWUEsQ0FBQ1csSUFBSSxDQUFDSSxVQUFVO1lBQUVGLFFBQVE7UUFBSTtJQUNuRCxFQUFFLE9BQU9ELE9BQU87UUFDZE4sUUFBUU0sS0FBSyxDQUFDLG1DQUFtQ0E7UUFFakQsd0NBQXdDO1FBQ3hDLElBQUlBLE1BQU0rQixJQUFJLEtBQUssU0FBUztZQUMxQixPQUFPM0MscURBQVlBLENBQUNXLElBQUksQ0FBQztnQkFDdkJDLE9BQU87WUFDVCxHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDbkI7UUFFQSxPQUFPYixxREFBWUEsQ0FBQ1csSUFBSSxDQUFDO1lBQ3ZCQyxPQUFPLENBQUMsNENBQTRDLEVBQUVBLE1BQU1xQixPQUFPLEVBQUU7UUFDdkUsR0FBRztZQUFFcEIsUUFBUTtRQUFJO0lBQ25CO0FBQ0YiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcU3RvdWZhXFxEZXNrdG9wXFxQRkVfZ2l0aHViXFxhcHBcXGFwaVxcYWRtaW5cXGNhdGVnb3JpZXNcXHJvdXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcbmltcG9ydCB7IGdldFNlcnZlclNlc3Npb24gfSBmcm9tICduZXh0LWF1dGgvbmV4dCc7XG5pbXBvcnQgeyBhdXRoT3B0aW9ucyB9IGZyb20gJ0AvbGliL2F1dGgnO1xuaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSAnQHByaXNtYS9jbGllbnQnO1xuXG5jb25zdCBwcmlzbWEgPSBuZXcgUHJpc21hQ2xpZW50KCk7XG5cbi8qKlxuICogUm91dGUgcG91ciByw6ljdXDDqXJlciB0b3V0ZXMgbGVzIGNhdMOpZ29yaWVzIGF2ZWMgZGVzIGluZm9ybWF0aW9ucyBkw6l0YWlsbMOpZXMgcG91ciBsJ2FkbWluaXN0cmF0ZXVyXG4gKiBJbmNsdXQgbGVzIGluZm9ybWF0aW9ucyBzdXIgbGVzIHZlbmRldXJzIGV0IGxlcyBwcm9kdWl0cyBhc3NvY2nDqXMgw6AgY2hhcXVlIGNhdMOpZ29yaWVcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVCgpIHtcbiAgdHJ5IHtcbiAgICBjb25zb2xlLmxvZygnW0FETUlOX0NBVEVHT1JJRVNfR0VUXSBWw6lyaWZpY2F0aW9uIGRlIGxcXCdhdXRoZW50aWZpY2F0aW9uIGFkbWluLi4uJyk7XG4gICAgXG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlcnZlclNlc3Npb24oYXV0aE9wdGlvbnMpO1xuICAgIFxuICAgIC8vIFbDqXJpZmllciBzaSBsJ3V0aWxpc2F0ZXVyIGVzdCBjb25uZWN0w6kgZXQgZXN0IHVuIGFkbWluaXN0cmF0ZXVyXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyIHx8IHNlc3Npb24udXNlci5yb2xlICE9PSAnQURNSU4nKSB7XG4gICAgICBjb25zb2xlLmxvZygnW0FETUlOX0NBVEVHT1JJRVNfR0VUXSBOb24gYXV0b3Jpc8OpOiByw7RsZSBhZG1pbmlzdHJhdGV1ciByZXF1aXMnKTtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnTm9uIGF1dG9yaXPDqScgfSwgeyBzdGF0dXM6IDQwMyB9KTtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZygnW0FETUlOX0NBVEVHT1JJRVNfR0VUXSBSw6ljdXDDqXJhdGlvbiBkZSB0b3V0ZXMgbGVzIGNhdMOpZ29yaWVzLi4uJyk7XG4gICAgXG4gICAgLy8gUsOpY3Vww6lyZXIgdG91dGVzIGxlcyBjYXTDqWdvcmllcyBhdmVjIGxlcyByZWxhdGlvbnNcbiAgICBjb25zdCByYXdDYXRlZ29yaWVzID0gYXdhaXQgcHJpc21hLmNhdGVnb3J5LmZpbmRNYW55KHtcbiAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgc3RvcmU6IHRydWUsXG4gICAgICAgIHByb2R1Y3RzOiB7XG4gICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICBpZDogdHJ1ZSxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBvcmRlckJ5OiB7XG4gICAgICAgIGNyZWF0ZWRBdDogJ2Rlc2MnXG4gICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgLy8gVHJhbnNmb3JtZXIgbGVzIGNhdMOpZ29yaWVzIHBvdXIgw6l2aXRlciBsZXMgcsOpZsOpcmVuY2VzIGNpcmN1bGFpcmVzXG4gICAgY29uc3QgY2F0ZWdvcmllcyA9IHJhd0NhdGVnb3JpZXMubWFwKGNhdGVnb3J5ID0+ICh7XG4gICAgICBpZDogY2F0ZWdvcnkuaWQsXG4gICAgICBuYW1lOiBjYXRlZ29yeS5uYW1lLFxuICAgICAgZGVzY3JpcHRpb246IGNhdGVnb3J5LmRlc2NyaXB0aW9uLFxuICAgICAgaW1hZ2U6IGNhdGVnb3J5LmltYWdlLFxuICAgICAgY3JlYXRlZEF0OiBjYXRlZ29yeS5jcmVhdGVkQXQsXG4gICAgICB1cGRhdGVkQXQ6IGNhdGVnb3J5LnVwZGF0ZWRBdCxcbiAgICAgIHByb2R1Y3RzQ291bnQ6IGNhdGVnb3J5LnByb2R1Y3RzLmxlbmd0aCxcbiAgICAgIHN0b3JlOiBjYXRlZ29yeS5zdG9yZSA/IHtcbiAgICAgICAgaWQ6IGNhdGVnb3J5LnN0b3JlLmlkLFxuICAgICAgICBuYW1lOiBjYXRlZ29yeS5zdG9yZS5uYW1lLFxuICAgICAgICBsb2dvOiBjYXRlZ29yeS5zdG9yZS5sb2dvXG4gICAgICB9IDogbnVsbFxuICAgIH0pKTtcblxuICAgIGNvbnNvbGUubG9nKGBbQURNSU5fQ0FURUdPUklFU19HRVRdICR7Y2F0ZWdvcmllcy5sZW5ndGh9IGNhdMOpZ29yaWVzIHLDqWN1cMOpcsOpZXMgYXZlYyBzdWNjw6hzYCk7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgY2F0ZWdvcmllcyB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdbQURNSU5fQ0FURUdPUklFU19HRVRdIEVycmV1cjonLCBlcnJvcik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgeyBlcnJvcjogYEVycmV1ciBsb3JzIGRlIGxhIHLDqWN1cMOpcmF0aW9uIGRlcyBjYXTDqWdvcmllczogJHtlcnJvci5tZXNzYWdlfWAgfSxcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxuICAgICk7XG4gIH1cbn1cblxuLyoqXG4gKiBSb3V0ZSBwb3VyIGNyw6llciB1bmUgbm91dmVsbGUgY2F0w6lnb3JpZSAoYWRtaW4gdW5pcXVlbWVudClcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdCkge1xuICB0cnkge1xuICAgIGNvbnNvbGUubG9nKCdbQURNSU5fQ0FURUdPUklFU19QT1NUXSBWw6lyaWZpY2F0aW9uIGRlIGxcXCdhdXRoZW50aWZpY2F0aW9uIGFkbWluLi4uJyk7XG4gICAgXG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlcnZlclNlc3Npb24oYXV0aE9wdGlvbnMpO1xuICAgIFxuICAgIC8vIFbDqXJpZmllciBzaSBsJ3V0aWxpc2F0ZXVyIGVzdCBjb25uZWN0w6kgZXQgZXN0IHVuIGFkbWluaXN0cmF0ZXVyXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyIHx8IHNlc3Npb24udXNlci5yb2xlICE9PSAnQURNSU4nKSB7XG4gICAgICBjb25zb2xlLmxvZygnW0FETUlOX0NBVEVHT1JJRVNfUE9TVF0gTm9uIGF1dG9yaXPDqTogcsO0bGUgYWRtaW5pc3RyYXRldXIgcmVxdWlzJyk7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ05vbiBhdXRvcmlzw6knIH0sIHsgc3RhdHVzOiA0MDMgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgYm9keSA9IGF3YWl0IHJlcXVlc3QuanNvbigpO1xuICAgIGNvbnNvbGUubG9nKCdbQURNSU5fQ0FURUdPUklFU19QT1NUXSBEb25uw6llcyByZcOndWVzOicsIGJvZHkpO1xuICAgIFxuICAgIGNvbnN0IHsgbmFtZSwgZGVzY3JpcHRpb24sIGltYWdlLCBzdG9yZUlkIH0gPSBib2R5O1xuICAgIFxuICAgIGlmICghbmFtZSB8fCAhZGVzY3JpcHRpb24gfHwgIXN0b3JlSWQpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdbQURNSU5fQ0FURUdPUklFU19QT1NUXSBWYWxpZGF0aW9uIMOpY2hvdcOpZTogY2hhbXBzIHJlcXVpcyBtYW5xdWFudHMnKTtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IFxuICAgICAgICBlcnJvcjogJ0xlIG5vbSwgbGEgZGVzY3JpcHRpb24gZXQgbFxcJ0lEIGR1IG1hZ2FzaW4gc29udCByZXF1aXMnIFxuICAgICAgfSwgeyBzdGF0dXM6IDQwMCB9KTtcbiAgICB9XG5cbiAgICAvLyBWw6lyaWZpZXIgcXVlIGxlIG1hZ2FzaW4gZXhpc3RlXG4gICAgY29uc3Qgc3RvcmUgPSBhd2FpdCBwcmlzbWEuc3RvcmUuZmluZFVuaXF1ZSh7XG4gICAgICB3aGVyZTogeyBpZDogc3RvcmVJZCB9XG4gICAgfSk7XG4gICAgXG4gICAgaWYgKCFzdG9yZSkge1xuICAgICAgY29uc29sZS5sb2coYFtBRE1JTl9DQVRFR09SSUVTX1BPU1RdIE1hZ2FzaW4gYXZlYyBsJ0lEICR7c3RvcmVJZH0gbm9uIHRyb3V2w6lgKTtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnTWFnYXNpbiBub24gdHJvdXbDqScgfSwgeyBzdGF0dXM6IDQwNCB9KTtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZygnW0FETUlOX0NBVEVHT1JJRVNfUE9TVF0gQ3LDqWF0aW9uIGRlIGxhIGNhdMOpZ29yaWUuLi4nKTtcbiAgICBcbiAgICBjb25zdCBjYXRlZ29yeSA9IGF3YWl0IHByaXNtYS5jYXRlZ29yeS5jcmVhdGUoe1xuICAgICAgZGF0YToge1xuICAgICAgICBuYW1lLFxuICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgaW1hZ2U6IGltYWdlIHx8IG51bGwsXG4gICAgICAgIHN0b3JlSWQsXG4gICAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKSxcbiAgICAgICAgdXBkYXRlZEF0OiBuZXcgRGF0ZSgpXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zb2xlLmxvZygnW0FETUlOX0NBVEVHT1JJRVNfUE9TVF0gQ2F0w6lnb3JpZSBjcsOpw6llIGF2ZWMgc3VjY8OoczonLCBjYXRlZ29yeSk7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKGNhdGVnb3J5LCB7IHN0YXR1czogMjAxIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1tBRE1JTl9DQVRFR09SSUVTX1BPU1RdIEVycmV1cjonLCBlcnJvcik7XG4gICAgXG4gICAgLy8gR2VzdGlvbiBzcMOpY2lmaXF1ZSBkZXMgZXJyZXVycyBQcmlzbWFcbiAgICBpZiAoZXJyb3IuY29kZSA9PT0gJ1AyMDAyJykge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgXG4gICAgICAgIGVycm9yOiAnVW5lIGNhdMOpZ29yaWUgYXZlYyBjZSBub20gZXhpc3RlIGTDqWrDoCBkYW5zIGNlIG1hZ2FzaW4nIFxuICAgICAgfSwgeyBzdGF0dXM6IDQwMCB9KTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgXG4gICAgICBlcnJvcjogYEVycmV1ciBsb3JzIGRlIGxhIGNyw6lhdGlvbiBkZSBsYSBjYXTDqWdvcmllOiAke2Vycm9yLm1lc3NhZ2V9YCBcbiAgICB9LCB7IHN0YXR1czogNTAwIH0pO1xuICB9XG59XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiZ2V0U2VydmVyU2Vzc2lvbiIsImF1dGhPcHRpb25zIiwiUHJpc21hQ2xpZW50IiwicHJpc21hIiwiR0VUIiwiY29uc29sZSIsImxvZyIsInNlc3Npb24iLCJ1c2VyIiwicm9sZSIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsInJhd0NhdGVnb3JpZXMiLCJjYXRlZ29yeSIsImZpbmRNYW55IiwiaW5jbHVkZSIsInN0b3JlIiwicHJvZHVjdHMiLCJzZWxlY3QiLCJpZCIsIm9yZGVyQnkiLCJjcmVhdGVkQXQiLCJjYXRlZ29yaWVzIiwibWFwIiwibmFtZSIsImRlc2NyaXB0aW9uIiwiaW1hZ2UiLCJ1cGRhdGVkQXQiLCJwcm9kdWN0c0NvdW50IiwibGVuZ3RoIiwibG9nbyIsIm1lc3NhZ2UiLCJQT1NUIiwicmVxdWVzdCIsImJvZHkiLCJzdG9yZUlkIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwiY3JlYXRlIiwiZGF0YSIsIkRhdGUiLCJjb2RlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/admin/categories/route.js\n");

/***/ }),

/***/ "(rsc)/./lib/auth.js":
/*!*********************!*\
  !*** ./lib/auth.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   auth: () => (/* binding */ auth),\n/* harmony export */   authOptions: () => (/* binding */ authOptions),\n/* harmony export */   getCurrentUser: () => (/* binding */ getCurrentUser),\n/* harmony export */   signIn: () => (/* binding */ signIn),\n/* harmony export */   signOut: () => (/* binding */ signOut)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n\n\n\n\n// Use Prisma as a singleton to avoid connection issues\nconst globalForPrisma = global;\nglobalForPrisma.prisma = globalForPrisma.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nconst prisma = globalForPrisma.prisma;\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_3__[\"default\"])({\n            name: \"credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) {\n                    throw new Error(\"Email et mot de passe requis\");\n                }\n                const user = await prisma.user.findUnique({\n                    where: {\n                        email: credentials.email\n                    }\n                });\n                if (!user) {\n                    throw new Error(\"Utilisateur non trouvé\");\n                }\n                const isPasswordValid = await bcrypt__WEBPACK_IMPORTED_MODULE_1___default().compare(credentials.password, user.password);\n                if (!isPasswordValid) {\n                    throw new Error(\"Mot de passe incorrect\");\n                }\n                return {\n                    id: user.id,\n                    email: user.email,\n                    name: user.name,\n                    role: user.role\n                };\n            }\n        })\n    ],\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.role = user.role;\n                token.id = user.id;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session?.user) {\n                session.user.role = token.role;\n                session.user.id = token.id;\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/login\",\n        error: \"/login\"\n    },\n    session: {\n        strategy: \"jwt\"\n    },\n    secret: process.env.NEXTAUTH_SECRET\n};\nconst { auth, signIn, signOut } = next_auth__WEBPACK_IMPORTED_MODULE_2___default()(authOptions);\n/**\r\n * Get the current user from a user ID\r\n * @param {string} userId - The user ID to get\r\n * @returns {Promise<Object|null>} The user object or null if not found\r\n */ async function getCurrentUser(userId) {\n    if (!userId) return null;\n    try {\n        const user = await prisma.user.findUnique({\n            where: {\n                id: userId\n            },\n            select: {\n                id: true,\n                name: true,\n                email: true,\n                role: true,\n                image: true\n            }\n        });\n        return user;\n    } catch (error) {\n        console.error(\"Error in getCurrentUser:\", error);\n        return null;\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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XSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSBcIkBwcmlzbWEvY2xpZW50XCI7XHJcbmltcG9ydCBiY3J5cHQgZnJvbSBcImJjcnlwdFwiO1xyXG5pbXBvcnQgTmV4dEF1dGggZnJvbSBcIm5leHQtYXV0aFwiO1xyXG5pbXBvcnQgQ3JlZGVudGlhbHNQcm92aWRlciBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVycy9jcmVkZW50aWFsc1wiO1xyXG5cclxuLy8gVXNlIFByaXNtYSBhcyBhIHNpbmdsZXRvbiB0byBhdm9pZCBjb25uZWN0aW9uIGlzc3Vlc1xyXG5jb25zdCBnbG9iYWxGb3JQcmlzbWEgPSBnbG9iYWw7XHJcbmdsb2JhbEZvclByaXNtYS5wcmlzbWEgPSBnbG9iYWxGb3JQcmlzbWEucHJpc21hIHx8IG5ldyBQcmlzbWFDbGllbnQoKTtcclxuY29uc3QgcHJpc21hID0gZ2xvYmFsRm9yUHJpc21hLnByaXNtYTtcclxuXHJcbmV4cG9ydCBjb25zdCBhdXRoT3B0aW9ucyA9IHtcclxuICBwcm92aWRlcnM6IFtcclxuICAgIENyZWRlbnRpYWxzUHJvdmlkZXIoe1xyXG4gICAgICBuYW1lOiBcImNyZWRlbnRpYWxzXCIsXHJcbiAgICAgIGNyZWRlbnRpYWxzOiB7XHJcbiAgICAgICAgZW1haWw6IHsgbGFiZWw6IFwiRW1haWxcIiwgdHlwZTogXCJlbWFpbFwiIH0sXHJcbiAgICAgICAgcGFzc3dvcmQ6IHsgbGFiZWw6IFwiUGFzc3dvcmRcIiwgdHlwZTogXCJwYXNzd29yZFwiIH1cclxuICAgICAgfSxcclxuICAgICAgYXN5bmMgYXV0aG9yaXplKGNyZWRlbnRpYWxzKSB7XHJcbiAgICAgICAgaWYgKCFjcmVkZW50aWFscz8uZW1haWwgfHwgIWNyZWRlbnRpYWxzPy5wYXNzd29yZCkge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRW1haWwgZXQgbW90IGRlIHBhc3NlIHJlcXVpc1wiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcclxuICAgICAgICAgIHdoZXJlOiB7IGVtYWlsOiBjcmVkZW50aWFscy5lbWFpbCB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICghdXNlcikge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVXRpbGlzYXRldXIgbm9uIHRyb3V2w6lcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBpc1Bhc3N3b3JkVmFsaWQgPSBhd2FpdCBiY3J5cHQuY29tcGFyZShcclxuICAgICAgICAgIGNyZWRlbnRpYWxzLnBhc3N3b3JkLFxyXG4gICAgICAgICAgdXNlci5wYXNzd29yZFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGlmICghaXNQYXNzd29yZFZhbGlkKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNb3QgZGUgcGFzc2UgaW5jb3JyZWN0XCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGlkOiB1c2VyLmlkLFxyXG4gICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXHJcbiAgICAgICAgICBuYW1lOiB1c2VyLm5hbWUsXHJcbiAgICAgICAgICByb2xlOiB1c2VyLnJvbGVcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIF0sXHJcbiAgY2FsbGJhY2tzOiB7XHJcbiAgICBhc3luYyBqd3QoeyB0b2tlbiwgdXNlciB9KSB7XHJcbiAgICAgIGlmICh1c2VyKSB7XHJcbiAgICAgICAgdG9rZW4ucm9sZSA9IHVzZXIucm9sZTtcclxuICAgICAgICB0b2tlbi5pZCA9IHVzZXIuaWQ7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRva2VuO1xyXG4gICAgfSxcclxuICAgIGFzeW5jIHNlc3Npb24oeyBzZXNzaW9uLCB0b2tlbiB9KSB7XHJcbiAgICAgIGlmIChzZXNzaW9uPy51c2VyKSB7XHJcbiAgICAgICAgc2Vzc2lvbi51c2VyLnJvbGUgPSB0b2tlbi5yb2xlO1xyXG4gICAgICAgIHNlc3Npb24udXNlci5pZCA9IHRva2VuLmlkO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBzZXNzaW9uO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgcGFnZXM6IHtcclxuICAgIHNpZ25JbjogXCIvbG9naW5cIixcclxuICAgIGVycm9yOiBcIi9sb2dpblwiXHJcbiAgfSxcclxuICBzZXNzaW9uOiB7XHJcbiAgICBzdHJhdGVneTogXCJqd3RcIlxyXG4gIH0sXHJcbiAgc2VjcmV0OiBwcm9jZXNzLmVudi5ORVhUQVVUSF9TRUNSRVRcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCB7IGF1dGgsIHNpZ25Jbiwgc2lnbk91dCB9ID0gTmV4dEF1dGgoYXV0aE9wdGlvbnMpO1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgY3VycmVudCB1c2VyIGZyb20gYSB1c2VyIElEXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySWQgLSBUaGUgdXNlciBJRCB0byBnZXRcclxuICogQHJldHVybnMge1Byb21pc2U8T2JqZWN0fG51bGw+fSBUaGUgdXNlciBvYmplY3Qgb3IgbnVsbCBpZiBub3QgZm91bmRcclxuICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDdXJyZW50VXNlcih1c2VySWQpIHtcclxuICBpZiAoIXVzZXJJZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7XHJcbiAgICAgIHdoZXJlOiB7IGlkOiB1c2VySWQgfSxcclxuICAgICAgc2VsZWN0OiB7XHJcbiAgICAgICAgaWQ6IHRydWUsXHJcbiAgICAgICAgbmFtZTogdHJ1ZSxcclxuICAgICAgICBlbWFpbDogdHJ1ZSxcclxuICAgICAgICByb2xlOiB0cnVlLFxyXG4gICAgICAgIGltYWdlOiB0cnVlXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB1c2VyO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgaW4gZ2V0Q3VycmVudFVzZXI6XCIsIGVycm9yKTtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufSAiXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiYmNyeXB0IiwiTmV4dEF1dGgiLCJDcmVkZW50aWFsc1Byb3ZpZGVyIiwiZ2xvYmFsRm9yUHJpc21hIiwiZ2xvYmFsIiwicHJpc21hIiwiYXV0aE9wdGlvbnMiLCJwcm92aWRlcnMiLCJuYW1lIiwiY3JlZGVudGlhbHMiLCJlbWFpbCIsImxhYmVsIiwidHlwZSIsInBhc3N3b3JkIiwiYXV0aG9yaXplIiwiRXJyb3IiLCJ1c2VyIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwiaXNQYXNzd29yZFZhbGlkIiwiY29tcGFyZSIsImlkIiwicm9sZSIsImNhbGxiYWNrcyIsImp3dCIsInRva2VuIiwic2Vzc2lvbiIsInBhZ2VzIiwic2lnbkluIiwiZXJyb3IiLCJzdHJhdGVneSIsInNlY3JldCIsInByb2Nlc3MiLCJlbnYiLCJORVhUQVVUSF9TRUNSRVQiLCJhdXRoIiwic2lnbk91dCIsImdldEN1cnJlbnRVc2VyIiwidXNlcklkIiwic2VsZWN0IiwiaW1hZ2UiLCJjb25zb2xlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fcategories%2Froute&page=%2Fapi%2Fadmin%2Fcategories%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fcategories%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5CPFE_github%5Capp&pageExtensions=js&pageExtensions=jsx&pageExtensions=ts&pageExtensions=tsx&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5CPFE_github&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fcategories%2Froute&page=%2Fapi%2Fadmin%2Fcategories%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fcategories%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5CPFE_github%5Capp&pageExtensions=js&pageExtensions=jsx&pageExtensions=ts&pageExtensions=tsx&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5CPFE_github&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Stoufa_Desktop_PFE_github_app_api_admin_categories_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/admin/categories/route.js */ \"(rsc)/./app/api/admin/categories/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/admin/categories/route\",\n        pathname: \"/api/admin/categories\",\n        filename: \"route\",\n        bundlePath: \"app/api/admin/categories/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Stoufa\\\\Desktop\\\\PFE_github\\\\app\\\\api\\\\admin\\\\categories\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_Stoufa_Desktop_PFE_github_app_api_admin_categories_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhZG1pbiUyRmNhdGVnb3JpZXMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmFkbWluJTJGY2F0ZWdvcmllcyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmFkbWluJTJGY2F0ZWdvcmllcyUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNTdG91ZmElNUNEZXNrdG9wJTVDUEZFX2dpdGh1YiU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz1qcyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9dHN4JnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDU3RvdWZhJTVDRGVza3RvcCU1Q1BGRV9naXRodWImaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQzZCO0FBQzFHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxTdG91ZmFcXFxcRGVza3RvcFxcXFxQRkVfZ2l0aHViXFxcXGFwcFxcXFxhcGlcXFxcYWRtaW5cXFxcY2F0ZWdvcmllc1xcXFxyb3V0ZS5qc1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYWRtaW4vY2F0ZWdvcmllcy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2FkbWluL2NhdGVnb3JpZXNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2FkbWluL2NhdGVnb3JpZXMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxTdG91ZmFcXFxcRGVza3RvcFxcXFxQRkVfZ2l0aHViXFxcXGFwcFxcXFxhcGlcXFxcYWRtaW5cXFxcY2F0ZWdvcmllc1xcXFxyb3V0ZS5qc1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fcategories%2Froute&page=%2Fapi%2Fadmin%2Fcategories%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fcategories%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5CPFE_github%5Capp&pageExtensions=js&pageExtensions=jsx&pageExtensions=ts&pageExtensions=tsx&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5CPFE_github&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/next-auth","vendor-chunks/oauth","vendor-chunks/@babel","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fcategories%2Froute&page=%2Fapi%2Fadmin%2Fcategories%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fcategories%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5CPFE_github%5Capp&pageExtensions=js&pageExtensions=jsx&pageExtensions=ts&pageExtensions=tsx&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5CPFE_github&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();