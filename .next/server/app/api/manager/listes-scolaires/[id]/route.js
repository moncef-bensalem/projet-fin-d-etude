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
exports.id = "app/api/manager/listes-scolaires/[id]/route";
exports.ids = ["app/api/manager/listes-scolaires/[id]/route"];
exports.modules = {

/***/ "(rsc)/./app/api/manager/listes-scolaires/[id]/route.js":
/*!********************************************************!*\
  !*** ./app/api/manager/listes-scolaires/[id]/route.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DELETE: () => (/* binding */ DELETE),\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   PUT: () => (/* binding */ PUT)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.js\");\n\n\n\n\n// GET - Récupérer une liste scolaire spécifique\nasync function GET(request, { params }) {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n        if (!session || session.user.role !== \"MANAGER\") {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Non autorisé\"\n            }, {\n                status: 401\n            });\n        }\n        const { id } = params;\n        const listeScolaire = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__[\"default\"].listeScolaire.findUnique({\n            where: {\n                id\n            },\n            include: {\n                besoins: true\n            }\n        });\n        if (!listeScolaire) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Liste scolaire non trouvée\"\n            }, {\n                status: 404\n            });\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(listeScolaire);\n    } catch (error) {\n        console.error(\"Erreur lors de la récupération de la liste scolaire:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Erreur serveur\"\n        }, {\n            status: 500\n        });\n    }\n}\n// PUT - Mettre à jour une liste scolaire\nasync function PUT(request, { params }) {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n        if (!session || session.user.role !== \"MANAGER\") {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Non autorisé\"\n            }, {\n                status: 401\n            });\n        }\n        const { id } = params;\n        const body = await request.json();\n        // Vérification de l'existence de la liste\n        const listeScolaire = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__[\"default\"].listeScolaire.findUnique({\n            where: {\n                id\n            },\n            include: {\n                besoins: true\n            }\n        });\n        if (!listeScolaire) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Liste scolaire non trouvée\"\n            }, {\n                status: 404\n            });\n        }\n        // Validation de base\n        if (!body.titre || !body.classe || !body.besoins || !Array.isArray(body.besoins)) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Données invalides\"\n            }, {\n                status: 400\n            });\n        }\n        // Mise à jour de la liste scolaire\n        const updatedListe = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__[\"default\"].$transaction(async (tx)=>{\n            // 1. Mettre à jour les informations de base\n            const updated = await tx.listeScolaire.update({\n                where: {\n                    id\n                },\n                data: {\n                    titre: body.titre,\n                    description: body.description || \"\",\n                    classe: body.classe\n                }\n            });\n            // 2. Supprimer les besoins existants\n            await tx.besoin.deleteMany({\n                where: {\n                    listeId: id\n                }\n            });\n            // 3. Créer les nouveaux besoins\n            const newBesoins = [];\n            for (const besoin of body.besoins){\n                const newBesoin = await tx.besoin.create({\n                    data: {\n                        listeId: id,\n                        nomProduit: besoin.nomProduit,\n                        quantite: parseInt(besoin.quantite),\n                        details: besoin.details || \"\",\n                        statut: \"NON_COUVERT\"\n                    }\n                });\n                newBesoins.push(newBesoin);\n            }\n            // 4. Récupérer la liste mise à jour avec ses nouveaux besoins\n            return await tx.listeScolaire.findUnique({\n                where: {\n                    id\n                },\n                include: {\n                    besoins: true\n                }\n            });\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(updatedListe);\n    } catch (error) {\n        console.error(\"Erreur lors de la mise à jour de la liste scolaire:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Erreur serveur\"\n        }, {\n            status: 500\n        });\n    }\n}\n// DELETE - Supprimer une liste scolaire\nasync function DELETE(request, { params }) {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n        if (!session || session.user.role !== \"MANAGER\") {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Non autorisé\"\n            }, {\n                status: 401\n            });\n        }\n        const { id } = params;\n        // Vérifier si la liste existe\n        const listeScolaire = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__[\"default\"].listeScolaire.findUnique({\n            where: {\n                id\n            }\n        });\n        if (!listeScolaire) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Liste scolaire non trouvée\"\n            }, {\n                status: 404\n            });\n        }\n        // Supprimer d'abord les besoins associés, puis la liste elle-même\n        await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__[\"default\"].$transaction([\n            _lib_prisma__WEBPACK_IMPORTED_MODULE_3__[\"default\"].besoin.deleteMany({\n                where: {\n                    listeId: id\n                }\n            }),\n            _lib_prisma__WEBPACK_IMPORTED_MODULE_3__[\"default\"].listeScolaire.delete({\n                where: {\n                    id\n                }\n            })\n        ]);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: \"Liste scolaire supprimée avec succès\"\n        }, {\n            status: 200\n        });\n    } catch (error) {\n        console.error(\"Erreur lors de la suppression de la liste scolaire:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Erreur serveur\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL21hbmFnZXIvbGlzdGVzLXNjb2xhaXJlcy9baWRdL3JvdXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQTJDO0FBQ0U7QUFDSjtBQUNQO0FBRWxDLGdEQUFnRDtBQUN6QyxlQUFlSSxJQUFJQyxPQUFPLEVBQUUsRUFBRUMsTUFBTSxFQUFFO0lBQzNDLElBQUk7UUFDRixNQUFNQyxVQUFVLE1BQU1OLDJEQUFnQkEsQ0FBQ0Msa0RBQVdBO1FBRWxELElBQUksQ0FBQ0ssV0FBV0EsUUFBUUMsSUFBSSxDQUFDQyxJQUFJLEtBQUssV0FBVztZQUMvQyxPQUFPVCxxREFBWUEsQ0FBQ1UsSUFBSSxDQUN0QjtnQkFBRUMsT0FBTztZQUFlLEdBQ3hCO2dCQUFFQyxRQUFRO1lBQUk7UUFFbEI7UUFFQSxNQUFNLEVBQUVDLEVBQUUsRUFBRSxHQUFHUDtRQUVmLE1BQU1RLGdCQUFnQixNQUFNWCxtREFBTUEsQ0FBQ1csYUFBYSxDQUFDQyxVQUFVLENBQUM7WUFDMURDLE9BQU87Z0JBQ0xIO1lBQ0Y7WUFDQUksU0FBUztnQkFDUEMsU0FBUztZQUNYO1FBQ0Y7UUFFQSxJQUFJLENBQUNKLGVBQWU7WUFDbEIsT0FBT2QscURBQVlBLENBQUNVLElBQUksQ0FDdEI7Z0JBQUVDLE9BQU87WUFBNkIsR0FDdEM7Z0JBQUVDLFFBQVE7WUFBSTtRQUVsQjtRQUVBLE9BQU9aLHFEQUFZQSxDQUFDVSxJQUFJLENBQUNJO0lBQzNCLEVBQUUsT0FBT0gsT0FBTztRQUNkUSxRQUFRUixLQUFLLENBQUMsd0RBQXdEQTtRQUN0RSxPQUFPWCxxREFBWUEsQ0FBQ1UsSUFBSSxDQUN0QjtZQUFFQyxPQUFPO1FBQWlCLEdBQzFCO1lBQUVDLFFBQVE7UUFBSTtJQUVsQjtBQUNGO0FBRUEseUNBQXlDO0FBQ2xDLGVBQWVRLElBQUlmLE9BQU8sRUFBRSxFQUFFQyxNQUFNLEVBQUU7SUFDM0MsSUFBSTtRQUNGLE1BQU1DLFVBQVUsTUFBTU4sMkRBQWdCQSxDQUFDQyxrREFBV0E7UUFFbEQsSUFBSSxDQUFDSyxXQUFXQSxRQUFRQyxJQUFJLENBQUNDLElBQUksS0FBSyxXQUFXO1lBQy9DLE9BQU9ULHFEQUFZQSxDQUFDVSxJQUFJLENBQ3RCO2dCQUFFQyxPQUFPO1lBQWUsR0FDeEI7Z0JBQUVDLFFBQVE7WUFBSTtRQUVsQjtRQUVBLE1BQU0sRUFBRUMsRUFBRSxFQUFFLEdBQUdQO1FBQ2YsTUFBTWUsT0FBTyxNQUFNaEIsUUFBUUssSUFBSTtRQUUvQiwwQ0FBMEM7UUFDMUMsTUFBTUksZ0JBQWdCLE1BQU1YLG1EQUFNQSxDQUFDVyxhQUFhLENBQUNDLFVBQVUsQ0FBQztZQUMxREMsT0FBTztnQkFBRUg7WUFBRztZQUNaSSxTQUFTO2dCQUFFQyxTQUFTO1lBQUs7UUFDM0I7UUFFQSxJQUFJLENBQUNKLGVBQWU7WUFDbEIsT0FBT2QscURBQVlBLENBQUNVLElBQUksQ0FDdEI7Z0JBQUVDLE9BQU87WUFBNkIsR0FDdEM7Z0JBQUVDLFFBQVE7WUFBSTtRQUVsQjtRQUVBLHFCQUFxQjtRQUNyQixJQUFJLENBQUNTLEtBQUtDLEtBQUssSUFBSSxDQUFDRCxLQUFLRSxNQUFNLElBQUksQ0FBQ0YsS0FBS0gsT0FBTyxJQUFJLENBQUNNLE1BQU1DLE9BQU8sQ0FBQ0osS0FBS0gsT0FBTyxHQUFHO1lBQ2hGLE9BQU9sQixxREFBWUEsQ0FBQ1UsSUFBSSxDQUN0QjtnQkFBRUMsT0FBTztZQUFvQixHQUM3QjtnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO1FBRUEsbUNBQW1DO1FBQ25DLE1BQU1jLGVBQWUsTUFBTXZCLG1EQUFNQSxDQUFDd0IsWUFBWSxDQUFDLE9BQU9DO1lBQ3BELDRDQUE0QztZQUM1QyxNQUFNQyxVQUFVLE1BQU1ELEdBQUdkLGFBQWEsQ0FBQ2dCLE1BQU0sQ0FBQztnQkFDNUNkLE9BQU87b0JBQUVIO2dCQUFHO2dCQUNaa0IsTUFBTTtvQkFDSlQsT0FBT0QsS0FBS0MsS0FBSztvQkFDakJVLGFBQWFYLEtBQUtXLFdBQVcsSUFBSTtvQkFDakNULFFBQVFGLEtBQUtFLE1BQU07Z0JBQ3JCO1lBQ0Y7WUFFQSxxQ0FBcUM7WUFDckMsTUFBTUssR0FBR0ssTUFBTSxDQUFDQyxVQUFVLENBQUM7Z0JBQ3pCbEIsT0FBTztvQkFBRW1CLFNBQVN0QjtnQkFBRztZQUN2QjtZQUVBLGdDQUFnQztZQUNoQyxNQUFNdUIsYUFBYSxFQUFFO1lBQ3JCLEtBQUssTUFBTUgsVUFBVVosS0FBS0gsT0FBTyxDQUFFO2dCQUNqQyxNQUFNbUIsWUFBWSxNQUFNVCxHQUFHSyxNQUFNLENBQUNLLE1BQU0sQ0FBQztvQkFDdkNQLE1BQU07d0JBQ0pJLFNBQVN0Qjt3QkFDVDBCLFlBQVlOLE9BQU9NLFVBQVU7d0JBQzdCQyxVQUFVQyxTQUFTUixPQUFPTyxRQUFRO3dCQUNsQ0UsU0FBU1QsT0FBT1MsT0FBTyxJQUFJO3dCQUMzQkMsUUFBUTtvQkFDVjtnQkFDRjtnQkFDQVAsV0FBV1EsSUFBSSxDQUFDUDtZQUNsQjtZQUVBLDhEQUE4RDtZQUM5RCxPQUFPLE1BQU1ULEdBQUdkLGFBQWEsQ0FBQ0MsVUFBVSxDQUFDO2dCQUN2Q0MsT0FBTztvQkFBRUg7Z0JBQUc7Z0JBQ1pJLFNBQVM7b0JBQUVDLFNBQVM7Z0JBQUs7WUFDM0I7UUFDRjtRQUVBLE9BQU9sQixxREFBWUEsQ0FBQ1UsSUFBSSxDQUFDZ0I7SUFDM0IsRUFBRSxPQUFPZixPQUFPO1FBQ2RRLFFBQVFSLEtBQUssQ0FBQyx1REFBdURBO1FBQ3JFLE9BQU9YLHFEQUFZQSxDQUFDVSxJQUFJLENBQ3RCO1lBQUVDLE9BQU87UUFBaUIsR0FDMUI7WUFBRUMsUUFBUTtRQUFJO0lBRWxCO0FBQ0Y7QUFFQSx3Q0FBd0M7QUFDakMsZUFBZWlDLE9BQU94QyxPQUFPLEVBQUUsRUFBRUMsTUFBTSxFQUFFO0lBQzlDLElBQUk7UUFDRixNQUFNQyxVQUFVLE1BQU1OLDJEQUFnQkEsQ0FBQ0Msa0RBQVdBO1FBRWxELElBQUksQ0FBQ0ssV0FBV0EsUUFBUUMsSUFBSSxDQUFDQyxJQUFJLEtBQUssV0FBVztZQUMvQyxPQUFPVCxxREFBWUEsQ0FBQ1UsSUFBSSxDQUN0QjtnQkFBRUMsT0FBTztZQUFlLEdBQ3hCO2dCQUFFQyxRQUFRO1lBQUk7UUFFbEI7UUFFQSxNQUFNLEVBQUVDLEVBQUUsRUFBRSxHQUFHUDtRQUVmLDhCQUE4QjtRQUM5QixNQUFNUSxnQkFBZ0IsTUFBTVgsbURBQU1BLENBQUNXLGFBQWEsQ0FBQ0MsVUFBVSxDQUFDO1lBQzFEQyxPQUFPO2dCQUFFSDtZQUFHO1FBQ2Q7UUFFQSxJQUFJLENBQUNDLGVBQWU7WUFDbEIsT0FBT2QscURBQVlBLENBQUNVLElBQUksQ0FDdEI7Z0JBQUVDLE9BQU87WUFBNkIsR0FDdEM7Z0JBQUVDLFFBQVE7WUFBSTtRQUVsQjtRQUVBLGtFQUFrRTtRQUNsRSxNQUFNVCxtREFBTUEsQ0FBQ3dCLFlBQVksQ0FBQztZQUN4QnhCLG1EQUFNQSxDQUFDOEIsTUFBTSxDQUFDQyxVQUFVLENBQUM7Z0JBQ3ZCbEIsT0FBTztvQkFBRW1CLFNBQVN0QjtnQkFBRztZQUN2QjtZQUNBVixtREFBTUEsQ0FBQ1csYUFBYSxDQUFDZ0MsTUFBTSxDQUFDO2dCQUMxQjlCLE9BQU87b0JBQUVIO2dCQUFHO1lBQ2Q7U0FDRDtRQUVELE9BQU9iLHFEQUFZQSxDQUFDVSxJQUFJLENBQ3RCO1lBQUVxQyxTQUFTO1FBQXVDLEdBQ2xEO1lBQUVuQyxRQUFRO1FBQUk7SUFFbEIsRUFBRSxPQUFPRCxPQUFPO1FBQ2RRLFFBQVFSLEtBQUssQ0FBQyx1REFBdURBO1FBQ3JFLE9BQU9YLHFEQUFZQSxDQUFDVSxJQUFJLENBQ3RCO1lBQUVDLE9BQU87UUFBaUIsR0FDMUI7WUFBRUMsUUFBUTtRQUFJO0lBRWxCO0FBQ0YiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcU3RvdWZhXFxEZXNrdG9wXFxwZmVcXFBmZVxcYXBwXFxhcGlcXG1hbmFnZXJcXGxpc3Rlcy1zY29sYWlyZXNcXFtpZF1cXHJvdXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xyXG5pbXBvcnQgeyBnZXRTZXJ2ZXJTZXNzaW9uIH0gZnJvbSBcIm5leHQtYXV0aFwiO1xyXG5pbXBvcnQgeyBhdXRoT3B0aW9ucyB9IGZyb20gXCJAL2xpYi9hdXRoXCI7XHJcbmltcG9ydCBwcmlzbWEgZnJvbSBcIkAvbGliL3ByaXNtYVwiO1xyXG5cclxuLy8gR0VUIC0gUsOpY3Vww6lyZXIgdW5lIGxpc3RlIHNjb2xhaXJlIHNww6ljaWZpcXVlXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQocmVxdWVzdCwgeyBwYXJhbXMgfSkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2VydmVyU2Vzc2lvbihhdXRoT3B0aW9ucyk7XHJcbiAgICBcclxuICAgIGlmICghc2Vzc2lvbiB8fCBzZXNzaW9uLnVzZXIucm9sZSAhPT0gXCJNQU5BR0VSXCIpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgZXJyb3I6IFwiTm9uIGF1dG9yaXPDqVwiIH0sXHJcbiAgICAgICAgeyBzdGF0dXM6IDQwMSB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgeyBpZCB9ID0gcGFyYW1zO1xyXG4gICAgXHJcbiAgICBjb25zdCBsaXN0ZVNjb2xhaXJlID0gYXdhaXQgcHJpc21hLmxpc3RlU2NvbGFpcmUuZmluZFVuaXF1ZSh7XHJcbiAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgaWQsXHJcbiAgICAgIH0sXHJcbiAgICAgIGluY2x1ZGU6IHtcclxuICAgICAgICBiZXNvaW5zOiB0cnVlLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKCFsaXN0ZVNjb2xhaXJlKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgICB7IGVycm9yOiBcIkxpc3RlIHNjb2xhaXJlIG5vbiB0cm91dsOpZVwiIH0sXHJcbiAgICAgICAgeyBzdGF0dXM6IDQwNCB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKGxpc3RlU2NvbGFpcmUpO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyZXVyIGxvcnMgZGUgbGEgcsOpY3Vww6lyYXRpb24gZGUgbGEgbGlzdGUgc2NvbGFpcmU6XCIsIGVycm9yKTtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgeyBlcnJvcjogXCJFcnJldXIgc2VydmV1clwiIH0sXHJcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbi8vIFBVVCAtIE1ldHRyZSDDoCBqb3VyIHVuZSBsaXN0ZSBzY29sYWlyZVxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUFVUKHJlcXVlc3QsIHsgcGFyYW1zIH0pIHtcclxuICB0cnkge1xyXG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlcnZlclNlc3Npb24oYXV0aE9wdGlvbnMpO1xyXG4gICAgXHJcbiAgICBpZiAoIXNlc3Npb24gfHwgc2Vzc2lvbi51c2VyLnJvbGUgIT09IFwiTUFOQUdFUlwiKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgICB7IGVycm9yOiBcIk5vbiBhdXRvcmlzw6lcIiB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiA0MDEgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHsgaWQgfSA9IHBhcmFtcztcclxuICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXF1ZXN0Lmpzb24oKTtcclxuICAgIFxyXG4gICAgLy8gVsOpcmlmaWNhdGlvbiBkZSBsJ2V4aXN0ZW5jZSBkZSBsYSBsaXN0ZVxyXG4gICAgY29uc3QgbGlzdGVTY29sYWlyZSA9IGF3YWl0IHByaXNtYS5saXN0ZVNjb2xhaXJlLmZpbmRVbmlxdWUoe1xyXG4gICAgICB3aGVyZTogeyBpZCB9LFxyXG4gICAgICBpbmNsdWRlOiB7IGJlc29pbnM6IHRydWUgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICghbGlzdGVTY29sYWlyZSkge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgeyBlcnJvcjogXCJMaXN0ZSBzY29sYWlyZSBub24gdHJvdXbDqWVcIiB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiA0MDQgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFZhbGlkYXRpb24gZGUgYmFzZVxyXG4gICAgaWYgKCFib2R5LnRpdHJlIHx8ICFib2R5LmNsYXNzZSB8fCAhYm9keS5iZXNvaW5zIHx8ICFBcnJheS5pc0FycmF5KGJvZHkuYmVzb2lucykpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgZXJyb3I6IFwiRG9ubsOpZXMgaW52YWxpZGVzXCIgfSxcclxuICAgICAgICB7IHN0YXR1czogNDAwIH1cclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBNaXNlIMOgIGpvdXIgZGUgbGEgbGlzdGUgc2NvbGFpcmVcclxuICAgIGNvbnN0IHVwZGF0ZWRMaXN0ZSA9IGF3YWl0IHByaXNtYS4kdHJhbnNhY3Rpb24oYXN5bmMgKHR4KSA9PiB7XHJcbiAgICAgIC8vIDEuIE1ldHRyZSDDoCBqb3VyIGxlcyBpbmZvcm1hdGlvbnMgZGUgYmFzZVxyXG4gICAgICBjb25zdCB1cGRhdGVkID0gYXdhaXQgdHgubGlzdGVTY29sYWlyZS51cGRhdGUoe1xyXG4gICAgICAgIHdoZXJlOiB7IGlkIH0sXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgdGl0cmU6IGJvZHkudGl0cmUsXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbjogYm9keS5kZXNjcmlwdGlvbiB8fCBcIlwiLFxyXG4gICAgICAgICAgY2xhc3NlOiBib2R5LmNsYXNzZSxcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIDIuIFN1cHByaW1lciBsZXMgYmVzb2lucyBleGlzdGFudHNcclxuICAgICAgYXdhaXQgdHguYmVzb2luLmRlbGV0ZU1hbnkoe1xyXG4gICAgICAgIHdoZXJlOiB7IGxpc3RlSWQ6IGlkIH0sXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gMy4gQ3LDqWVyIGxlcyBub3V2ZWF1eCBiZXNvaW5zXHJcbiAgICAgIGNvbnN0IG5ld0Jlc29pbnMgPSBbXTtcclxuICAgICAgZm9yIChjb25zdCBiZXNvaW4gb2YgYm9keS5iZXNvaW5zKSB7XHJcbiAgICAgICAgY29uc3QgbmV3QmVzb2luID0gYXdhaXQgdHguYmVzb2luLmNyZWF0ZSh7XHJcbiAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIGxpc3RlSWQ6IGlkLFxyXG4gICAgICAgICAgICBub21Qcm9kdWl0OiBiZXNvaW4ubm9tUHJvZHVpdCxcclxuICAgICAgICAgICAgcXVhbnRpdGU6IHBhcnNlSW50KGJlc29pbi5xdWFudGl0ZSksXHJcbiAgICAgICAgICAgIGRldGFpbHM6IGJlc29pbi5kZXRhaWxzIHx8IFwiXCIsXHJcbiAgICAgICAgICAgIHN0YXR1dDogXCJOT05fQ09VVkVSVFwiXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG5ld0Jlc29pbnMucHVzaChuZXdCZXNvaW4pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyA0LiBSw6ljdXDDqXJlciBsYSBsaXN0ZSBtaXNlIMOgIGpvdXIgYXZlYyBzZXMgbm91dmVhdXggYmVzb2luc1xyXG4gICAgICByZXR1cm4gYXdhaXQgdHgubGlzdGVTY29sYWlyZS5maW5kVW5pcXVlKHtcclxuICAgICAgICB3aGVyZTogeyBpZCB9LFxyXG4gICAgICAgIGluY2x1ZGU6IHsgYmVzb2luczogdHJ1ZSB9LFxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih1cGRhdGVkTGlzdGUpO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyZXVyIGxvcnMgZGUgbGEgbWlzZSDDoCBqb3VyIGRlIGxhIGxpc3RlIHNjb2xhaXJlOlwiLCBlcnJvcik7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgIHsgZXJyb3I6IFwiRXJyZXVyIHNlcnZldXJcIiB9LFxyXG4gICAgICB7IHN0YXR1czogNTAwIH1cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBERUxFVEUgLSBTdXBwcmltZXIgdW5lIGxpc3RlIHNjb2xhaXJlXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBERUxFVEUocmVxdWVzdCwgeyBwYXJhbXMgfSkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2VydmVyU2Vzc2lvbihhdXRoT3B0aW9ucyk7XHJcbiAgICBcclxuICAgIGlmICghc2Vzc2lvbiB8fCBzZXNzaW9uLnVzZXIucm9sZSAhPT0gXCJNQU5BR0VSXCIpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgZXJyb3I6IFwiTm9uIGF1dG9yaXPDqVwiIH0sXHJcbiAgICAgICAgeyBzdGF0dXM6IDQwMSB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgeyBpZCB9ID0gcGFyYW1zO1xyXG4gICAgXHJcbiAgICAvLyBWw6lyaWZpZXIgc2kgbGEgbGlzdGUgZXhpc3RlXHJcbiAgICBjb25zdCBsaXN0ZVNjb2xhaXJlID0gYXdhaXQgcHJpc21hLmxpc3RlU2NvbGFpcmUuZmluZFVuaXF1ZSh7XHJcbiAgICAgIHdoZXJlOiB7IGlkIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoIWxpc3RlU2NvbGFpcmUpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgZXJyb3I6IFwiTGlzdGUgc2NvbGFpcmUgbm9uIHRyb3V2w6llXCIgfSxcclxuICAgICAgICB7IHN0YXR1czogNDA0IH1cclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTdXBwcmltZXIgZCdhYm9yZCBsZXMgYmVzb2lucyBhc3NvY2nDqXMsIHB1aXMgbGEgbGlzdGUgZWxsZS1tw6ptZVxyXG4gICAgYXdhaXQgcHJpc21hLiR0cmFuc2FjdGlvbihbXHJcbiAgICAgIHByaXNtYS5iZXNvaW4uZGVsZXRlTWFueSh7XHJcbiAgICAgICAgd2hlcmU6IHsgbGlzdGVJZDogaWQgfSxcclxuICAgICAgfSksXHJcbiAgICAgIHByaXNtYS5saXN0ZVNjb2xhaXJlLmRlbGV0ZSh7XHJcbiAgICAgICAgd2hlcmU6IHsgaWQgfSxcclxuICAgICAgfSksXHJcbiAgICBdKTtcclxuXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgIHsgbWVzc2FnZTogXCJMaXN0ZSBzY29sYWlyZSBzdXBwcmltw6llIGF2ZWMgc3VjY8Ooc1wiIH0sXHJcbiAgICAgIHsgc3RhdHVzOiAyMDAgfVxyXG4gICAgKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihcIkVycmV1ciBsb3JzIGRlIGxhIHN1cHByZXNzaW9uIGRlIGxhIGxpc3RlIHNjb2xhaXJlOlwiLCBlcnJvcik7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgIHsgZXJyb3I6IFwiRXJyZXVyIHNlcnZldXJcIiB9LFxyXG4gICAgICB7IHN0YXR1czogNTAwIH1cclxuICAgICk7XHJcbiAgfVxyXG59ICJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJnZXRTZXJ2ZXJTZXNzaW9uIiwiYXV0aE9wdGlvbnMiLCJwcmlzbWEiLCJHRVQiLCJyZXF1ZXN0IiwicGFyYW1zIiwic2Vzc2lvbiIsInVzZXIiLCJyb2xlIiwianNvbiIsImVycm9yIiwic3RhdHVzIiwiaWQiLCJsaXN0ZVNjb2xhaXJlIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwiaW5jbHVkZSIsImJlc29pbnMiLCJjb25zb2xlIiwiUFVUIiwiYm9keSIsInRpdHJlIiwiY2xhc3NlIiwiQXJyYXkiLCJpc0FycmF5IiwidXBkYXRlZExpc3RlIiwiJHRyYW5zYWN0aW9uIiwidHgiLCJ1cGRhdGVkIiwidXBkYXRlIiwiZGF0YSIsImRlc2NyaXB0aW9uIiwiYmVzb2luIiwiZGVsZXRlTWFueSIsImxpc3RlSWQiLCJuZXdCZXNvaW5zIiwibmV3QmVzb2luIiwiY3JlYXRlIiwibm9tUHJvZHVpdCIsInF1YW50aXRlIiwicGFyc2VJbnQiLCJkZXRhaWxzIiwic3RhdHV0IiwicHVzaCIsIkRFTEVURSIsImRlbGV0ZSIsIm1lc3NhZ2UiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/manager/listes-scolaires/[id]/route.js\n");

/***/ }),

/***/ "(rsc)/./lib/auth.js":
/*!*********************!*\
  !*** ./lib/auth.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   auth: () => (/* binding */ auth),\n/* harmony export */   authOptions: () => (/* binding */ authOptions),\n/* harmony export */   getCurrentUser: () => (/* binding */ getCurrentUser),\n/* harmony export */   signIn: () => (/* binding */ signIn),\n/* harmony export */   signOut: () => (/* binding */ signOut)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n\n\n\n\n// Use Prisma as a singleton to avoid connection issues\nconst globalForPrisma = global;\nglobalForPrisma.prisma = globalForPrisma.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nconst prisma = globalForPrisma.prisma;\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_3__[\"default\"])({\n            name: \"credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) {\n                    throw new Error(\"Email et mot de passe requis\");\n                }\n                const user = await prisma.user.findUnique({\n                    where: {\n                        email: credentials.email\n                    }\n                });\n                if (!user) {\n                    throw new Error(\"Utilisateur non trouvé\");\n                }\n                const isPasswordValid = await bcrypt__WEBPACK_IMPORTED_MODULE_1___default().compare(credentials.password, user.password);\n                if (!isPasswordValid) {\n                    throw new Error(\"Mot de passe incorrect\");\n                }\n                return {\n                    id: user.id,\n                    email: user.email,\n                    name: user.name,\n                    role: user.role\n                };\n            }\n        })\n    ],\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.role = user.role;\n                token.id = user.id;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session?.user) {\n                session.user.role = token.role;\n                session.user.id = token.id;\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/login\",\n        error: \"/login\"\n    },\n    session: {\n        strategy: \"jwt\"\n    },\n    secret: process.env.NEXTAUTH_SECRET\n};\nconst { auth, signIn, signOut } = next_auth__WEBPACK_IMPORTED_MODULE_2___default()(authOptions);\n/**\r\n * Get the current user from a user ID\r\n * @param {string} userId - The user ID to get\r\n * @returns {Promise<Object|null>} The user object or null if not found\r\n */ async function getCurrentUser(userId) {\n    if (!userId) return null;\n    try {\n        const user = await prisma.user.findUnique({\n            where: {\n                id: userId\n            },\n            select: {\n                id: true,\n                name: true,\n                email: true,\n                role: true,\n                image: true\n            }\n        });\n        return user;\n    } catch (error) {\n        console.error(\"Error in getCurrentUser:\", error);\n        return null;\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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InNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gXCJAcHJpc21hL2NsaWVudFwiO1xyXG5pbXBvcnQgYmNyeXB0IGZyb20gXCJiY3J5cHRcIjtcclxuaW1wb3J0IE5leHRBdXRoIGZyb20gXCJuZXh0LWF1dGhcIjtcclxuaW1wb3J0IENyZWRlbnRpYWxzUHJvdmlkZXIgZnJvbSBcIm5leHQtYXV0aC9wcm92aWRlcnMvY3JlZGVudGlhbHNcIjtcclxuXHJcbi8vIFVzZSBQcmlzbWEgYXMgYSBzaW5nbGV0b24gdG8gYXZvaWQgY29ubmVjdGlvbiBpc3N1ZXNcclxuY29uc3QgZ2xvYmFsRm9yUHJpc21hID0gZ2xvYmFsO1xyXG5nbG9iYWxGb3JQcmlzbWEucHJpc21hID0gZ2xvYmFsRm9yUHJpc21hLnByaXNtYSB8fCBuZXcgUHJpc21hQ2xpZW50KCk7XHJcbmNvbnN0IHByaXNtYSA9IGdsb2JhbEZvclByaXNtYS5wcmlzbWE7XHJcblxyXG5leHBvcnQgY29uc3QgYXV0aE9wdGlvbnMgPSB7XHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBDcmVkZW50aWFsc1Byb3ZpZGVyKHtcclxuICAgICAgbmFtZTogXCJjcmVkZW50aWFsc1wiLFxyXG4gICAgICBjcmVkZW50aWFsczoge1xyXG4gICAgICAgIGVtYWlsOiB7IGxhYmVsOiBcIkVtYWlsXCIsIHR5cGU6IFwiZW1haWxcIiB9LFxyXG4gICAgICAgIHBhc3N3b3JkOiB7IGxhYmVsOiBcIlBhc3N3b3JkXCIsIHR5cGU6IFwicGFzc3dvcmRcIiB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGFzeW5jIGF1dGhvcml6ZShjcmVkZW50aWFscykge1xyXG4gICAgICAgIGlmICghY3JlZGVudGlhbHM/LmVtYWlsIHx8ICFjcmVkZW50aWFscz8ucGFzc3dvcmQpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVtYWlsIGV0IG1vdCBkZSBwYXNzZSByZXF1aXNcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7XHJcbiAgICAgICAgICB3aGVyZTogeyBlbWFpbDogY3JlZGVudGlhbHMuZW1haWwgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoIXVzZXIpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlV0aWxpc2F0ZXVyIG5vbiB0cm91dsOpXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgaXNQYXNzd29yZFZhbGlkID0gYXdhaXQgYmNyeXB0LmNvbXBhcmUoXHJcbiAgICAgICAgICBjcmVkZW50aWFscy5wYXNzd29yZCxcclxuICAgICAgICAgIHVzZXIucGFzc3dvcmRcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBpZiAoIWlzUGFzc3dvcmRWYWxpZCkge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTW90IGRlIHBhc3NlIGluY29ycmVjdFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBpZDogdXNlci5pZCxcclxuICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxyXG4gICAgICAgICAgbmFtZTogdXNlci5uYW1lLFxyXG4gICAgICAgICAgcm9sZTogdXNlci5yb2xlXHJcbiAgICAgICAgfTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICBdLFxyXG4gIGNhbGxiYWNrczoge1xyXG4gICAgYXN5bmMgand0KHsgdG9rZW4sIHVzZXIgfSkge1xyXG4gICAgICBpZiAodXNlcikge1xyXG4gICAgICAgIHRva2VuLnJvbGUgPSB1c2VyLnJvbGU7XHJcbiAgICAgICAgdG9rZW4uaWQgPSB1c2VyLmlkO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0b2tlbjtcclxuICAgIH0sXHJcbiAgICBhc3luYyBzZXNzaW9uKHsgc2Vzc2lvbiwgdG9rZW4gfSkge1xyXG4gICAgICBpZiAoc2Vzc2lvbj8udXNlcikge1xyXG4gICAgICAgIHNlc3Npb24udXNlci5yb2xlID0gdG9rZW4ucm9sZTtcclxuICAgICAgICBzZXNzaW9uLnVzZXIuaWQgPSB0b2tlbi5pZDtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gc2Vzc2lvbjtcclxuICAgIH1cclxuICB9LFxyXG4gIHBhZ2VzOiB7XHJcbiAgICBzaWduSW46IFwiL2xvZ2luXCIsXHJcbiAgICBlcnJvcjogXCIvbG9naW5cIlxyXG4gIH0sXHJcbiAgc2Vzc2lvbjoge1xyXG4gICAgc3RyYXRlZ3k6IFwiand0XCJcclxuICB9LFxyXG4gIHNlY3JldDogcHJvY2Vzcy5lbnYuTkVYVEFVVEhfU0VDUkVUXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgeyBhdXRoLCBzaWduSW4sIHNpZ25PdXQgfSA9IE5leHRBdXRoKGF1dGhPcHRpb25zKTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIGN1cnJlbnQgdXNlciBmcm9tIGEgdXNlciBJRFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdXNlcklkIC0gVGhlIHVzZXIgSUQgdG8gZ2V0XHJcbiAqIEByZXR1cm5zIHtQcm9taXNlPE9iamVjdHxudWxsPn0gVGhlIHVzZXIgb2JqZWN0IG9yIG51bGwgaWYgbm90IGZvdW5kXHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Q3VycmVudFVzZXIodXNlcklkKSB7XHJcbiAgaWYgKCF1c2VySWQpIHJldHVybiBudWxsO1xyXG5cclxuICB0cnkge1xyXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xyXG4gICAgICB3aGVyZTogeyBpZDogdXNlcklkIH0sXHJcbiAgICAgIHNlbGVjdDoge1xyXG4gICAgICAgIGlkOiB0cnVlLFxyXG4gICAgICAgIG5hbWU6IHRydWUsXHJcbiAgICAgICAgZW1haWw6IHRydWUsXHJcbiAgICAgICAgcm9sZTogdHJ1ZSxcclxuICAgICAgICBpbWFnZTogdHJ1ZVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gdXNlcjtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGluIGdldEN1cnJlbnRVc2VyOlwiLCBlcnJvcik7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbn0gIl0sIm5hbWVzIjpbIlByaXNtYUNsaWVudCIsImJjcnlwdCIsIk5leHRBdXRoIiwiQ3JlZGVudGlhbHNQcm92aWRlciIsImdsb2JhbEZvclByaXNtYSIsImdsb2JhbCIsInByaXNtYSIsImF1dGhPcHRpb25zIiwicHJvdmlkZXJzIiwibmFtZSIsImNyZWRlbnRpYWxzIiwiZW1haWwiLCJsYWJlbCIsInR5cGUiLCJwYXNzd29yZCIsImF1dGhvcml6ZSIsIkVycm9yIiwidXNlciIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsImlzUGFzc3dvcmRWYWxpZCIsImNvbXBhcmUiLCJpZCIsInJvbGUiLCJjYWxsYmFja3MiLCJqd3QiLCJ0b2tlbiIsInNlc3Npb24iLCJwYWdlcyIsInNpZ25JbiIsImVycm9yIiwic3RyYXRlZ3kiLCJzZWNyZXQiLCJwcm9jZXNzIiwiZW52IiwiTkVYVEFVVEhfU0VDUkVUIiwiYXV0aCIsInNpZ25PdXQiLCJnZXRDdXJyZW50VXNlciIsInVzZXJJZCIsInNlbGVjdCIsImltYWdlIiwiY29uc29sZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.js\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.js":
/*!***********************!*\
  !*** ./lib/prisma.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst prismaClientSingleton = ()=>{\n    return new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\n};\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? prismaClientSingleton();\nif (true) {\n    globalForPrisma.prisma = prisma;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE4QztBQUU5QyxNQUFNQyx3QkFBd0I7SUFDNUIsT0FBTyxJQUFJRCx3REFBWUE7QUFDekI7QUFFQSxNQUFNRSxrQkFBa0JDO0FBRXhCLE1BQU1DLFNBQVNGLGdCQUFnQkUsTUFBTSxJQUFJSDtBQUV6QyxJQUFJSSxJQUFxQyxFQUFFO0lBQ3pDSCxnQkFBZ0JFLE1BQU0sR0FBR0E7QUFDM0I7QUFFQSxpRUFBZUEsTUFBTUEsRUFBQyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxTdG91ZmFcXERlc2t0b3BcXHBmZVxcUGZlXFxsaWJcXHByaXNtYS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCc7XG5cbmNvbnN0IHByaXNtYUNsaWVudFNpbmdsZXRvbiA9ICgpID0+IHtcbiAgcmV0dXJuIG5ldyBQcmlzbWFDbGllbnQoKTtcbn07XG5cbmNvbnN0IGdsb2JhbEZvclByaXNtYSA9IGdsb2JhbFRoaXM7XG5cbmNvbnN0IHByaXNtYSA9IGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPz8gcHJpc21hQ2xpZW50U2luZ2xldG9uKCk7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPSBwcmlzbWE7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHByaXNtYTtcbiJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJwcmlzbWFDbGllbnRTaW5nbGV0b24iLCJnbG9iYWxGb3JQcmlzbWEiLCJnbG9iYWxUaGlzIiwicHJpc21hIiwicHJvY2VzcyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fmanager%2Flistes-scolaires%2F%5Bid%5D%2Froute&page=%2Fapi%2Fmanager%2Flistes-scolaires%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fmanager%2Flistes-scolaires%2F%5Bid%5D%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fmanager%2Flistes-scolaires%2F%5Bid%5D%2Froute&page=%2Fapi%2Fmanager%2Flistes-scolaires%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fmanager%2Flistes-scolaires%2F%5Bid%5D%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Stoufa_Desktop_pfe_Pfe_app_api_manager_listes_scolaires_id_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/manager/listes-scolaires/[id]/route.js */ \"(rsc)/./app/api/manager/listes-scolaires/[id]/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/manager/listes-scolaires/[id]/route\",\n        pathname: \"/api/manager/listes-scolaires/[id]\",\n        filename: \"route\",\n        bundlePath: \"app/api/manager/listes-scolaires/[id]/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Stoufa\\\\Desktop\\\\pfe\\\\Pfe\\\\app\\\\api\\\\manager\\\\listes-scolaires\\\\[id]\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_Stoufa_Desktop_pfe_Pfe_app_api_manager_listes_scolaires_id_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZtYW5hZ2VyJTJGbGlzdGVzLXNjb2xhaXJlcyUyRiU1QmlkJTVEJTJGcm91dGUmcGFnZT0lMkZhcGklMkZtYW5hZ2VyJTJGbGlzdGVzLXNjb2xhaXJlcyUyRiU1QmlkJTVEJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGbWFuYWdlciUyRmxpc3Rlcy1zY29sYWlyZXMlMkYlNUJpZCU1RCUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNTdG91ZmElNUNEZXNrdG9wJTVDcGZlJTVDUGZlJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNTdG91ZmElNUNEZXNrdG9wJTVDcGZlJTVDUGZlJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUN5QztBQUN0SDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcU3RvdWZhXFxcXERlc2t0b3BcXFxccGZlXFxcXFBmZVxcXFxhcHBcXFxcYXBpXFxcXG1hbmFnZXJcXFxcbGlzdGVzLXNjb2xhaXJlc1xcXFxbaWRdXFxcXHJvdXRlLmpzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9tYW5hZ2VyL2xpc3Rlcy1zY29sYWlyZXMvW2lkXS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL21hbmFnZXIvbGlzdGVzLXNjb2xhaXJlcy9baWRdXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9tYW5hZ2VyL2xpc3Rlcy1zY29sYWlyZXMvW2lkXS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXFN0b3VmYVxcXFxEZXNrdG9wXFxcXHBmZVxcXFxQZmVcXFxcYXBwXFxcXGFwaVxcXFxtYW5hZ2VyXFxcXGxpc3Rlcy1zY29sYWlyZXNcXFxcW2lkXVxcXFxyb3V0ZS5qc1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fmanager%2Flistes-scolaires%2F%5Bid%5D%2Froute&page=%2Fapi%2Fmanager%2Flistes-scolaires%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fmanager%2Flistes-scolaires%2F%5Bid%5D%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_require__ = require("../../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/oauth","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fmanager%2Flistes-scolaires%2F%5Bid%5D%2Froute&page=%2Fapi%2Fmanager%2Flistes-scolaires%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fmanager%2Flistes-scolaires%2F%5Bid%5D%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();