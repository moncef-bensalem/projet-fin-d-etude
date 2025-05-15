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
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "(rsc)/./app/api/auth/[...nextauth]/route.js":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextauth]/route.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler),\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/google */ \"(rsc)/./node_modules/next-auth/providers/google.js\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var _auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @auth/prisma-adapter */ \"(rsc)/./node_modules/@auth/prisma-adapter/index.js\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var next_auth_next__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next-auth/next */ \"(rsc)/./node_modules/next-auth/next/index.js\");\n\n\n\n\n\n\n\n// Use Prisma as a singleton to avoid connection issues\nconst globalForPrisma = global;\nglobalForPrisma.prisma = globalForPrisma.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_4__.PrismaClient();\nconst prisma = globalForPrisma.prisma;\nconst authOptions = {\n    adapter: (0,_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_3__.PrismaAdapter)(prisma),\n    providers: [\n        (0,next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            clientId: process.env.GOOGLE_CLIENT_ID,\n            clientSecret: process.env.GOOGLE_CLIENT_SECRET,\n            authorization: {\n                params: {\n                    prompt: \"select_account\",\n                    access_type: \"offline\",\n                    response_type: \"code\"\n                }\n            },\n            allowDangerousEmailAccountLinking: true,\n            profile (profile) {\n                return {\n                    id: profile.sub,\n                    name: profile.name || `${profile.given_name} ${profile.family_name}`,\n                    email: profile.email,\n                    image: profile.picture,\n                    role: \"CUSTOMER\" // Par défaut, les utilisateurs Google sont des clients\n                };\n            }\n        }),\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_2__[\"default\"])({\n            name: \"credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) {\n                    throw new Error(\"Email et mot de passe requis\");\n                }\n                try {\n                    const user = await prisma.user.findUnique({\n                        where: {\n                            email: credentials.email\n                        }\n                    });\n                    if (!user || !user.password) {\n                        throw new Error(\"Email ou mot de passe incorrect\");\n                    }\n                    const isPasswordValid = await bcrypt__WEBPACK_IMPORTED_MODULE_5___default().compare(credentials.password, user.password);\n                    if (!isPasswordValid) {\n                        throw new Error(\"Email ou mot de passe incorrect\");\n                    }\n                    return {\n                        id: user.id,\n                        email: user.email,\n                        name: user.name,\n                        role: user.role,\n                        image: user.image\n                    };\n                } catch (error) {\n                    console.error(\"Auth error:\", error);\n                    throw error;\n                }\n            }\n        })\n    ],\n    callbacks: {\n        async signIn ({ user, account, profile, credentials }) {\n            if (account?.provider === \"google\") {\n                try {\n                    console.log(\"Google auth attempt for:\", user.email);\n                    // Récupérer le paramètre role de la query string s'il existe\n                    // Ce paramètre sera ajouté lors de l'appel à signIn dans les pages d'inscription\n                    let requestedRole = \"CUSTOMER\"; // Rôle par défaut\n                    if (credentials?.callbackUrl) {\n                        const url = new URL(credentials.callbackUrl);\n                        const role = url.searchParams.get(\"role\");\n                        if (role && [\n                            \"CUSTOMER\",\n                            \"SELLER\"\n                        ].includes(role)) {\n                            requestedRole = role;\n                            console.log(\"Role requested in callback URL:\", requestedRole);\n                        }\n                    }\n                    const existingUser = await prisma.user.findUnique({\n                        where: {\n                            email: user.email\n                        }\n                    });\n                    if (!existingUser) {\n                        console.log(`Creating new ${requestedRole} user for Google auth:`, user.email);\n                        const newUser = await prisma.user.create({\n                            data: {\n                                email: user.email,\n                                name: user.name,\n                                role: requestedRole,\n                                emailVerified: new Date(),\n                                image: user.image\n                            }\n                        });\n                        // Si c'est un vendeur, créer une boutique\n                        if (requestedRole === \"SELLER\") {\n                            console.log(\"Creating store for new Google user:\", user.email);\n                            await prisma.store.create({\n                                data: {\n                                    name: `${user.name}'s Store`,\n                                    description: \"Description de la boutique\",\n                                    ownerId: newUser.id\n                                }\n                            });\n                        }\n                        user.role = requestedRole;\n                        user.id = newUser.id;\n                        console.log(`Google auth successful for new ${requestedRole}:`, user.email);\n                    } else {\n                        console.log(\"Google auth for existing user:\", user.email);\n                        user.role = existingUser.role;\n                        user.id = existingUser.id;\n                    }\n                    return true;\n                } catch (error) {\n                    console.error(\"Error in Google signIn callback:\", error);\n                    return `/auth/error?error=${encodeURIComponent(error.message)}`;\n                }\n            }\n            return true;\n        },\n        async jwt ({ token, user }) {\n            if (user) {\n                token.role = user.role;\n                token.id = user.id;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session?.user) {\n                session.user.role = token.role;\n                session.user.id = token.id;\n            }\n            return session;\n        },\n        redirect: async ({ url, baseUrl, token })=>{\n            if (url.includes('/login') || url === baseUrl) {\n                if (token?.role === 'SELLER') {\n                    return '/seller/dashboard';\n                }\n                return '/dashboard';\n            }\n            return url;\n        }\n    },\n    pages: {\n        signIn: \"/login\",\n        error: \"/auth/error\",\n        signOut: \"/\"\n    },\n    session: {\n        strategy: \"jwt\",\n        maxAge: 30 * 24 * 60 * 60,\n        updateAge: 24 * 60 * 60\n    },\n    cookies: {\n        sessionToken: {\n            name: `next-auth.session-token`,\n            options: {\n                httpOnly: true,\n                sameSite: \"lax\",\n                path: \"/\",\n                secure: \"development\" === \"production\"\n            }\n        }\n    },\n    debug: \"development\" === \"development\",\n    logger: {\n        error (code, metadata) {\n            console.error(`Auth error: ${code}`, metadata);\n        },\n        warn (code) {\n            console.warn(`Auth warning: ${code}`);\n        },\n        debug (code, metadata) {\n            console.log(`Auth debug: ${code}`, metadata);\n        }\n    },\n    secret: process.env.NEXTAUTH_SECRET\n};\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQWlDO0FBQ3VCO0FBQ1U7QUFDYjtBQUNQO0FBQ2xCO0FBQ3NCO0FBRWxELHVEQUF1RDtBQUN2RCxNQUFNTyxrQkFBa0JDO0FBQ3hCRCxnQkFBZ0JFLE1BQU0sR0FBR0YsZ0JBQWdCRSxNQUFNLElBQUksSUFBSUwsd0RBQVlBO0FBQ25FLE1BQU1LLFNBQVNGLGdCQUFnQkUsTUFBTTtBQUU5QixNQUFNQyxjQUFjO0lBQ3pCQyxTQUFTUixtRUFBYUEsQ0FBQ007SUFDdkJHLFdBQVc7UUFDVFgsc0VBQWNBLENBQUM7WUFDYlksVUFBVUMsUUFBUUMsR0FBRyxDQUFDQyxnQkFBZ0I7WUFDdENDLGNBQWNILFFBQVFDLEdBQUcsQ0FBQ0csb0JBQW9CO1lBQzlDQyxlQUFlO2dCQUNiQyxRQUFRO29CQUNOQyxRQUFRO29CQUNSQyxhQUFhO29CQUNiQyxlQUFlO2dCQUNqQjtZQUNGO1lBQ0FDLG1DQUFtQztZQUNuQ0MsU0FBUUEsT0FBTztnQkFDYixPQUFPO29CQUNMQyxJQUFJRCxRQUFRRSxHQUFHO29CQUNmQyxNQUFNSCxRQUFRRyxJQUFJLElBQUksR0FBR0gsUUFBUUksVUFBVSxDQUFDLENBQUMsRUFBRUosUUFBUUssV0FBVyxFQUFFO29CQUNwRUMsT0FBT04sUUFBUU0sS0FBSztvQkFDcEJDLE9BQU9QLFFBQVFRLE9BQU87b0JBQ3RCQyxNQUFNLFdBQVcsdURBQXVEO2dCQUMxRTtZQUNGO1FBQ0Y7UUFDQWhDLDJFQUFtQkEsQ0FBQztZQUNsQjBCLE1BQU07WUFDTk8sYUFBYTtnQkFDWEosT0FBTztvQkFBRUssT0FBTztvQkFBU0MsTUFBTTtnQkFBUTtnQkFDdkNDLFVBQVU7b0JBQUVGLE9BQU87b0JBQVlDLE1BQU07Z0JBQVc7WUFDbEQ7WUFDQSxNQUFNRSxXQUFVSixXQUFXO2dCQUN6QixJQUFJLENBQUNBLGFBQWFKLFNBQVMsQ0FBQ0ksYUFBYUcsVUFBVTtvQkFDakQsTUFBTSxJQUFJRSxNQUFNO2dCQUNsQjtnQkFFQSxJQUFJO29CQUNGLE1BQU1DLE9BQU8sTUFBTWhDLE9BQU9nQyxJQUFJLENBQUNDLFVBQVUsQ0FBQzt3QkFDeENDLE9BQU87NEJBQUVaLE9BQU9JLFlBQVlKLEtBQUs7d0JBQUM7b0JBQ3BDO29CQUVBLElBQUksQ0FBQ1UsUUFBUSxDQUFDQSxLQUFLSCxRQUFRLEVBQUU7d0JBQzNCLE1BQU0sSUFBSUUsTUFBTTtvQkFDbEI7b0JBRUEsTUFBTUksa0JBQWtCLE1BQU12QyxxREFBYyxDQUMxQzhCLFlBQVlHLFFBQVEsRUFDcEJHLEtBQUtILFFBQVE7b0JBR2YsSUFBSSxDQUFDTSxpQkFBaUI7d0JBQ3BCLE1BQU0sSUFBSUosTUFBTTtvQkFDbEI7b0JBRUEsT0FBTzt3QkFDTGQsSUFBSWUsS0FBS2YsRUFBRTt3QkFDWEssT0FBT1UsS0FBS1YsS0FBSzt3QkFDakJILE1BQU1hLEtBQUtiLElBQUk7d0JBQ2ZNLE1BQU1PLEtBQUtQLElBQUk7d0JBQ2ZGLE9BQU9TLEtBQUtULEtBQUs7b0JBQ25CO2dCQUNGLEVBQUUsT0FBT2MsT0FBTztvQkFDZEMsUUFBUUQsS0FBSyxDQUFDLGVBQWVBO29CQUM3QixNQUFNQTtnQkFDUjtZQUNGO1FBQ0Y7S0FDRDtJQUNERSxXQUFXO1FBQ1QsTUFBTUMsUUFBTyxFQUFFUixJQUFJLEVBQUVTLE9BQU8sRUFBRXpCLE9BQU8sRUFBRVUsV0FBVyxFQUFFO1lBQ2xELElBQUllLFNBQVNDLGFBQWEsVUFBVTtnQkFDbEMsSUFBSTtvQkFDRkosUUFBUUssR0FBRyxDQUFDLDRCQUE0QlgsS0FBS1YsS0FBSztvQkFFbEQsNkRBQTZEO29CQUM3RCxpRkFBaUY7b0JBQ2pGLElBQUlzQixnQkFBZ0IsWUFBYSxrQkFBa0I7b0JBRW5ELElBQUlsQixhQUFhbUIsYUFBYTt3QkFDNUIsTUFBTUMsTUFBTSxJQUFJQyxJQUFJckIsWUFBWW1CLFdBQVc7d0JBQzNDLE1BQU1wQixPQUFPcUIsSUFBSUUsWUFBWSxDQUFDQyxHQUFHLENBQUM7d0JBQ2xDLElBQUl4QixRQUFROzRCQUFDOzRCQUFZO3lCQUFTLENBQUN5QixRQUFRLENBQUN6QixPQUFPOzRCQUNqRG1CLGdCQUFnQm5COzRCQUNoQmEsUUFBUUssR0FBRyxDQUFDLG1DQUFtQ0M7d0JBQ2pEO29CQUNGO29CQUVBLE1BQU1PLGVBQWUsTUFBTW5ELE9BQU9nQyxJQUFJLENBQUNDLFVBQVUsQ0FBQzt3QkFDaERDLE9BQU87NEJBQUVaLE9BQU9VLEtBQUtWLEtBQUs7d0JBQUM7b0JBQzdCO29CQUVBLElBQUksQ0FBQzZCLGNBQWM7d0JBQ2pCYixRQUFRSyxHQUFHLENBQUMsQ0FBQyxhQUFhLEVBQUVDLGNBQWMsc0JBQXNCLENBQUMsRUFBRVosS0FBS1YsS0FBSzt3QkFDN0UsTUFBTThCLFVBQVUsTUFBTXBELE9BQU9nQyxJQUFJLENBQUNxQixNQUFNLENBQUM7NEJBQ3ZDQyxNQUFNO2dDQUNKaEMsT0FBT1UsS0FBS1YsS0FBSztnQ0FDakJILE1BQU1hLEtBQUtiLElBQUk7Z0NBQ2ZNLE1BQU1tQjtnQ0FDTlcsZUFBZSxJQUFJQztnQ0FDbkJqQyxPQUFPUyxLQUFLVCxLQUFLOzRCQUNuQjt3QkFDRjt3QkFFQSwwQ0FBMEM7d0JBQzFDLElBQUlxQixrQkFBa0IsVUFBVTs0QkFDOUJOLFFBQVFLLEdBQUcsQ0FBQyx1Q0FBdUNYLEtBQUtWLEtBQUs7NEJBQzdELE1BQU10QixPQUFPeUQsS0FBSyxDQUFDSixNQUFNLENBQUM7Z0NBQ3hCQyxNQUFNO29DQUNKbkMsTUFBTSxHQUFHYSxLQUFLYixJQUFJLENBQUMsUUFBUSxDQUFDO29DQUM1QnVDLGFBQWE7b0NBQ2JDLFNBQVNQLFFBQVFuQyxFQUFFO2dDQUNyQjs0QkFDRjt3QkFDRjt3QkFFQWUsS0FBS1AsSUFBSSxHQUFHbUI7d0JBQ1paLEtBQUtmLEVBQUUsR0FBR21DLFFBQVFuQyxFQUFFO3dCQUNwQnFCLFFBQVFLLEdBQUcsQ0FBQyxDQUFDLCtCQUErQixFQUFFQyxjQUFjLENBQUMsQ0FBQyxFQUFFWixLQUFLVixLQUFLO29CQUM1RSxPQUFPO3dCQUNMZ0IsUUFBUUssR0FBRyxDQUFDLGtDQUFrQ1gsS0FBS1YsS0FBSzt3QkFDeERVLEtBQUtQLElBQUksR0FBRzBCLGFBQWExQixJQUFJO3dCQUM3Qk8sS0FBS2YsRUFBRSxHQUFHa0MsYUFBYWxDLEVBQUU7b0JBQzNCO29CQUNBLE9BQU87Z0JBQ1QsRUFBRSxPQUFPb0IsT0FBTztvQkFDZEMsUUFBUUQsS0FBSyxDQUFDLG9DQUFvQ0E7b0JBQ2xELE9BQU8sQ0FBQyxrQkFBa0IsRUFBRXVCLG1CQUFtQnZCLE1BQU13QixPQUFPLEdBQUc7Z0JBQ2pFO1lBQ0Y7WUFDQSxPQUFPO1FBQ1Q7UUFDQSxNQUFNQyxLQUFJLEVBQUVDLEtBQUssRUFBRS9CLElBQUksRUFBRTtZQUN2QixJQUFJQSxNQUFNO2dCQUNSK0IsTUFBTXRDLElBQUksR0FBR08sS0FBS1AsSUFBSTtnQkFDdEJzQyxNQUFNOUMsRUFBRSxHQUFHZSxLQUFLZixFQUFFO1lBQ3BCO1lBQ0EsT0FBTzhDO1FBQ1Q7UUFDQSxNQUFNQyxTQUFRLEVBQUVBLE9BQU8sRUFBRUQsS0FBSyxFQUFFO1lBQzlCLElBQUlDLFNBQVNoQyxNQUFNO2dCQUNqQmdDLFFBQVFoQyxJQUFJLENBQUNQLElBQUksR0FBR3NDLE1BQU10QyxJQUFJO2dCQUM5QnVDLFFBQVFoQyxJQUFJLENBQUNmLEVBQUUsR0FBRzhDLE1BQU05QyxFQUFFO1lBQzVCO1lBQ0EsT0FBTytDO1FBQ1Q7UUFDQUMsVUFBVSxPQUFPLEVBQUVuQixHQUFHLEVBQUVvQixPQUFPLEVBQUVILEtBQUssRUFBRTtZQUN0QyxJQUFJakIsSUFBSUksUUFBUSxDQUFDLGFBQWFKLFFBQVFvQixTQUFTO2dCQUM3QyxJQUFJSCxPQUFPdEMsU0FBUyxVQUFVO29CQUM1QixPQUFPO2dCQUNUO2dCQUNBLE9BQU87WUFDVDtZQUNBLE9BQU9xQjtRQUNUO0lBQ0Y7SUFDQXFCLE9BQU87UUFDTDNCLFFBQVE7UUFDUkgsT0FBTztRQUNQK0IsU0FBUztJQUNYO0lBQ0FKLFNBQVM7UUFDUEssVUFBVTtRQUNWQyxRQUFRLEtBQUssS0FBSyxLQUFLO1FBQ3ZCQyxXQUFXLEtBQUssS0FBSztJQUN2QjtJQUNBQyxTQUFTO1FBQ1BDLGNBQWM7WUFDWnRELE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQztZQUMvQnVELFNBQVM7Z0JBQ1BDLFVBQVU7Z0JBQ1ZDLFVBQVU7Z0JBQ1ZDLE1BQU07Z0JBQ05DLFFBQVF6RSxrQkFBeUI7WUFDbkM7UUFDRjtJQUNGO0lBQ0EwRSxPQUFPMUUsa0JBQXlCO0lBQ2hDMkUsUUFBUTtRQUNOM0MsT0FBTTRDLElBQUksRUFBRUMsUUFBUTtZQUNsQjVDLFFBQVFELEtBQUssQ0FBQyxDQUFDLFlBQVksRUFBRTRDLE1BQU0sRUFBRUM7UUFDdkM7UUFDQUMsTUFBS0YsSUFBSTtZQUNQM0MsUUFBUTZDLElBQUksQ0FBQyxDQUFDLGNBQWMsRUFBRUYsTUFBTTtRQUN0QztRQUNBRixPQUFNRSxJQUFJLEVBQUVDLFFBQVE7WUFDbEI1QyxRQUFRSyxHQUFHLENBQUMsQ0FBQyxZQUFZLEVBQUVzQyxNQUFNLEVBQUVDO1FBQ3JDO0lBQ0Y7SUFDQUUsUUFBUS9FLFFBQVFDLEdBQUcsQ0FBQytFLGVBQWU7QUFDckMsRUFBRTtBQUVGLE1BQU1DLFVBQVUvRixnREFBUUEsQ0FBQ1U7QUFDa0IiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcU3RvdWZhXFxEZXNrdG9wXFxQRkVfZ2l0aHViXFxhcHBcXGFwaVxcYXV0aFxcWy4uLm5leHRhdXRoXVxccm91dGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5leHRBdXRoIGZyb20gXCJuZXh0LWF1dGhcIjtcbmltcG9ydCBHb29nbGVQcm92aWRlciBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVycy9nb29nbGVcIjtcbmltcG9ydCBDcmVkZW50aWFsc1Byb3ZpZGVyIGZyb20gXCJuZXh0LWF1dGgvcHJvdmlkZXJzL2NyZWRlbnRpYWxzXCI7XG5pbXBvcnQgeyBQcmlzbWFBZGFwdGVyIH0gZnJvbSBcIkBhdXRoL3ByaXNtYS1hZGFwdGVyXCI7XG5pbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tIFwiQHByaXNtYS9jbGllbnRcIjtcbmltcG9ydCBiY3J5cHQgZnJvbSBcImJjcnlwdFwiO1xuaW1wb3J0IHsgZ2V0U2VydmVyU2Vzc2lvbiB9IGZyb20gXCJuZXh0LWF1dGgvbmV4dFwiO1xuXG4vLyBVc2UgUHJpc21hIGFzIGEgc2luZ2xldG9uIHRvIGF2b2lkIGNvbm5lY3Rpb24gaXNzdWVzXG5jb25zdCBnbG9iYWxGb3JQcmlzbWEgPSBnbG9iYWw7XG5nbG9iYWxGb3JQcmlzbWEucHJpc21hID0gZ2xvYmFsRm9yUHJpc21hLnByaXNtYSB8fCBuZXcgUHJpc21hQ2xpZW50KCk7XG5jb25zdCBwcmlzbWEgPSBnbG9iYWxGb3JQcmlzbWEucHJpc21hO1xuXG5leHBvcnQgY29uc3QgYXV0aE9wdGlvbnMgPSB7XG4gIGFkYXB0ZXI6IFByaXNtYUFkYXB0ZXIocHJpc21hKSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgR29vZ2xlUHJvdmlkZXIoe1xuICAgICAgY2xpZW50SWQ6IHByb2Nlc3MuZW52LkdPT0dMRV9DTElFTlRfSUQsXG4gICAgICBjbGllbnRTZWNyZXQ6IHByb2Nlc3MuZW52LkdPT0dMRV9DTElFTlRfU0VDUkVULFxuICAgICAgYXV0aG9yaXphdGlvbjoge1xuICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICBwcm9tcHQ6IFwic2VsZWN0X2FjY291bnRcIixcbiAgICAgICAgICBhY2Nlc3NfdHlwZTogXCJvZmZsaW5lXCIsXG4gICAgICAgICAgcmVzcG9uc2VfdHlwZTogXCJjb2RlXCJcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGFsbG93RGFuZ2Vyb3VzRW1haWxBY2NvdW50TGlua2luZzogdHJ1ZSxcbiAgICAgIHByb2ZpbGUocHJvZmlsZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGlkOiBwcm9maWxlLnN1YixcbiAgICAgICAgICBuYW1lOiBwcm9maWxlLm5hbWUgfHwgYCR7cHJvZmlsZS5naXZlbl9uYW1lfSAke3Byb2ZpbGUuZmFtaWx5X25hbWV9YCxcbiAgICAgICAgICBlbWFpbDogcHJvZmlsZS5lbWFpbCxcbiAgICAgICAgICBpbWFnZTogcHJvZmlsZS5waWN0dXJlLFxuICAgICAgICAgIHJvbGU6IFwiQ1VTVE9NRVJcIiAvLyBQYXIgZMOpZmF1dCwgbGVzIHV0aWxpc2F0ZXVycyBHb29nbGUgc29udCBkZXMgY2xpZW50c1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0pLFxuICAgIENyZWRlbnRpYWxzUHJvdmlkZXIoe1xuICAgICAgbmFtZTogXCJjcmVkZW50aWFsc1wiLFxuICAgICAgY3JlZGVudGlhbHM6IHtcbiAgICAgICAgZW1haWw6IHsgbGFiZWw6IFwiRW1haWxcIiwgdHlwZTogXCJlbWFpbFwiIH0sXG4gICAgICAgIHBhc3N3b3JkOiB7IGxhYmVsOiBcIlBhc3N3b3JkXCIsIHR5cGU6IFwicGFzc3dvcmRcIiB9LFxuICAgICAgfSxcbiAgICAgIGFzeW5jIGF1dGhvcml6ZShjcmVkZW50aWFscykge1xuICAgICAgICBpZiAoIWNyZWRlbnRpYWxzPy5lbWFpbCB8fCAhY3JlZGVudGlhbHM/LnBhc3N3b3JkKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRW1haWwgZXQgbW90IGRlIHBhc3NlIHJlcXVpc1wiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgd2hlcmU6IHsgZW1haWw6IGNyZWRlbnRpYWxzLmVtYWlsIH0sXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAoIXVzZXIgfHwgIXVzZXIucGFzc3dvcmQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVtYWlsIG91IG1vdCBkZSBwYXNzZSBpbmNvcnJlY3RcIik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgaXNQYXNzd29yZFZhbGlkID0gYXdhaXQgYmNyeXB0LmNvbXBhcmUoXG4gICAgICAgICAgICBjcmVkZW50aWFscy5wYXNzd29yZCxcbiAgICAgICAgICAgIHVzZXIucGFzc3dvcmRcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgaWYgKCFpc1Bhc3N3b3JkVmFsaWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVtYWlsIG91IG1vdCBkZSBwYXNzZSBpbmNvcnJlY3RcIik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlkOiB1c2VyLmlkLFxuICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgICAgICAgICBuYW1lOiB1c2VyLm5hbWUsXG4gICAgICAgICAgICByb2xlOiB1c2VyLnJvbGUsXG4gICAgICAgICAgICBpbWFnZTogdXNlci5pbWFnZSxcbiAgICAgICAgICB9O1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJBdXRoIGVycm9yOlwiLCBlcnJvcik7XG4gICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGNhbGxiYWNrczoge1xuICAgIGFzeW5jIHNpZ25Jbih7IHVzZXIsIGFjY291bnQsIHByb2ZpbGUsIGNyZWRlbnRpYWxzIH0pIHtcbiAgICAgIGlmIChhY2NvdW50Py5wcm92aWRlciA9PT0gXCJnb29nbGVcIikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiR29vZ2xlIGF1dGggYXR0ZW1wdCBmb3I6XCIsIHVzZXIuZW1haWwpO1xuXG4gICAgICAgICAgLy8gUsOpY3Vww6lyZXIgbGUgcGFyYW3DqHRyZSByb2xlIGRlIGxhIHF1ZXJ5IHN0cmluZyBzJ2lsIGV4aXN0ZVxuICAgICAgICAgIC8vIENlIHBhcmFtw6h0cmUgc2VyYSBham91dMOpIGxvcnMgZGUgbCdhcHBlbCDDoCBzaWduSW4gZGFucyBsZXMgcGFnZXMgZCdpbnNjcmlwdGlvblxuICAgICAgICAgIGxldCByZXF1ZXN0ZWRSb2xlID0gXCJDVVNUT01FUlwiOyAgLy8gUsO0bGUgcGFyIGTDqWZhdXRcbiAgICAgICAgICBcbiAgICAgICAgICBpZiAoY3JlZGVudGlhbHM/LmNhbGxiYWNrVXJsKSB7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKGNyZWRlbnRpYWxzLmNhbGxiYWNrVXJsKTtcbiAgICAgICAgICAgIGNvbnN0IHJvbGUgPSB1cmwuc2VhcmNoUGFyYW1zLmdldChcInJvbGVcIik7XG4gICAgICAgICAgICBpZiAocm9sZSAmJiBbXCJDVVNUT01FUlwiLCBcIlNFTExFUlwiXS5pbmNsdWRlcyhyb2xlKSkge1xuICAgICAgICAgICAgICByZXF1ZXN0ZWRSb2xlID0gcm9sZTtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJSb2xlIHJlcXVlc3RlZCBpbiBjYWxsYmFjayBVUkw6XCIsIHJlcXVlc3RlZFJvbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGV4aXN0aW5nVXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgd2hlcmU6IHsgZW1haWw6IHVzZXIuZW1haWwgfSxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGlmICghZXhpc3RpbmdVc2VyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgQ3JlYXRpbmcgbmV3ICR7cmVxdWVzdGVkUm9sZX0gdXNlciBmb3IgR29vZ2xlIGF1dGg6YCwgdXNlci5lbWFpbCk7XG4gICAgICAgICAgICBjb25zdCBuZXdVc2VyID0gYXdhaXQgcHJpc21hLnVzZXIuY3JlYXRlKHtcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcbiAgICAgICAgICAgICAgICByb2xlOiByZXF1ZXN0ZWRSb2xlLFxuICAgICAgICAgICAgICAgIGVtYWlsVmVyaWZpZWQ6IG5ldyBEYXRlKCksXG4gICAgICAgICAgICAgICAgaW1hZ2U6IHVzZXIuaW1hZ2UsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gU2kgYydlc3QgdW4gdmVuZGV1ciwgY3LDqWVyIHVuZSBib3V0aXF1ZVxuICAgICAgICAgICAgaWYgKHJlcXVlc3RlZFJvbGUgPT09IFwiU0VMTEVSXCIpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDcmVhdGluZyBzdG9yZSBmb3IgbmV3IEdvb2dsZSB1c2VyOlwiLCB1c2VyLmVtYWlsKTtcbiAgICAgICAgICAgICAgYXdhaXQgcHJpc21hLnN0b3JlLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgbmFtZTogYCR7dXNlci5uYW1lfSdzIFN0b3JlYCxcbiAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkRlc2NyaXB0aW9uIGRlIGxhIGJvdXRpcXVlXCIsXG4gICAgICAgICAgICAgICAgICBvd25lcklkOiBuZXdVc2VyLmlkLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB1c2VyLnJvbGUgPSByZXF1ZXN0ZWRSb2xlO1xuICAgICAgICAgICAgdXNlci5pZCA9IG5ld1VzZXIuaWQ7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgR29vZ2xlIGF1dGggc3VjY2Vzc2Z1bCBmb3IgbmV3ICR7cmVxdWVzdGVkUm9sZX06YCwgdXNlci5lbWFpbCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR29vZ2xlIGF1dGggZm9yIGV4aXN0aW5nIHVzZXI6XCIsIHVzZXIuZW1haWwpO1xuICAgICAgICAgICAgdXNlci5yb2xlID0gZXhpc3RpbmdVc2VyLnJvbGU7XG4gICAgICAgICAgICB1c2VyLmlkID0gZXhpc3RpbmdVc2VyLmlkO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgaW4gR29vZ2xlIHNpZ25JbiBjYWxsYmFjazpcIiwgZXJyb3IpO1xuICAgICAgICAgIHJldHVybiBgL2F1dGgvZXJyb3I/ZXJyb3I9JHtlbmNvZGVVUklDb21wb25lbnQoZXJyb3IubWVzc2FnZSl9YDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgICBhc3luYyBqd3QoeyB0b2tlbiwgdXNlciB9KSB7XG4gICAgICBpZiAodXNlcikge1xuICAgICAgICB0b2tlbi5yb2xlID0gdXNlci5yb2xlO1xuICAgICAgICB0b2tlbi5pZCA9IHVzZXIuaWQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gdG9rZW47XG4gICAgfSxcbiAgICBhc3luYyBzZXNzaW9uKHsgc2Vzc2lvbiwgdG9rZW4gfSkge1xuICAgICAgaWYgKHNlc3Npb24/LnVzZXIpIHtcbiAgICAgICAgc2Vzc2lvbi51c2VyLnJvbGUgPSB0b2tlbi5yb2xlO1xuICAgICAgICBzZXNzaW9uLnVzZXIuaWQgPSB0b2tlbi5pZDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzZXNzaW9uO1xuICAgIH0sXG4gICAgcmVkaXJlY3Q6IGFzeW5jICh7IHVybCwgYmFzZVVybCwgdG9rZW4gfSkgPT4ge1xuICAgICAgaWYgKHVybC5pbmNsdWRlcygnL2xvZ2luJykgfHwgdXJsID09PSBiYXNlVXJsKSB7XG4gICAgICAgIGlmICh0b2tlbj8ucm9sZSA9PT0gJ1NFTExFUicpIHtcbiAgICAgICAgICByZXR1cm4gJy9zZWxsZXIvZGFzaGJvYXJkJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJy9kYXNoYm9hcmQnO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHVybDtcbiAgICB9LFxuICB9LFxuICBwYWdlczoge1xuICAgIHNpZ25JbjogXCIvbG9naW5cIixcbiAgICBlcnJvcjogXCIvYXV0aC9lcnJvclwiLFxuICAgIHNpZ25PdXQ6IFwiL1wiLFxuICB9LFxuICBzZXNzaW9uOiB7XG4gICAgc3RyYXRlZ3k6IFwiand0XCIsXG4gICAgbWF4QWdlOiAzMCAqIDI0ICogNjAgKiA2MCwgLy8gMzAgam91cnNcbiAgICB1cGRhdGVBZ2U6IDI0ICogNjAgKiA2MCwgLy8gTWlzZSDDoCBqb3VyIHRvdXRlcyBsZXMgMjQgaGV1cmVzXG4gIH0sXG4gIGNvb2tpZXM6IHtcbiAgICBzZXNzaW9uVG9rZW46IHtcbiAgICAgIG5hbWU6IGBuZXh0LWF1dGguc2Vzc2lvbi10b2tlbmAsXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIGh0dHBPbmx5OiB0cnVlLFxuICAgICAgICBzYW1lU2l0ZTogXCJsYXhcIixcbiAgICAgICAgcGF0aDogXCIvXCIsXG4gICAgICAgIHNlY3VyZTogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICBkZWJ1ZzogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwiZGV2ZWxvcG1lbnRcIixcbiAgbG9nZ2VyOiB7XG4gICAgZXJyb3IoY29kZSwgbWV0YWRhdGEpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYEF1dGggZXJyb3I6ICR7Y29kZX1gLCBtZXRhZGF0YSk7XG4gICAgfSxcbiAgICB3YXJuKGNvZGUpIHtcbiAgICAgIGNvbnNvbGUud2FybihgQXV0aCB3YXJuaW5nOiAke2NvZGV9YCk7XG4gICAgfSxcbiAgICBkZWJ1Zyhjb2RlLCBtZXRhZGF0YSkge1xuICAgICAgY29uc29sZS5sb2coYEF1dGggZGVidWc6ICR7Y29kZX1gLCBtZXRhZGF0YSk7XG4gICAgfVxuICB9LFxuICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk5FWFRBVVRIX1NFQ1JFVCxcbn07XG5cbmNvbnN0IGhhbmRsZXIgPSBOZXh0QXV0aChhdXRoT3B0aW9ucyk7XG5leHBvcnQgeyBoYW5kbGVyIGFzIEdFVCwgaGFuZGxlciBhcyBQT1NUIH07XG4iXSwibmFtZXMiOlsiTmV4dEF1dGgiLCJHb29nbGVQcm92aWRlciIsIkNyZWRlbnRpYWxzUHJvdmlkZXIiLCJQcmlzbWFBZGFwdGVyIiwiUHJpc21hQ2xpZW50IiwiYmNyeXB0IiwiZ2V0U2VydmVyU2Vzc2lvbiIsImdsb2JhbEZvclByaXNtYSIsImdsb2JhbCIsInByaXNtYSIsImF1dGhPcHRpb25zIiwiYWRhcHRlciIsInByb3ZpZGVycyIsImNsaWVudElkIiwicHJvY2VzcyIsImVudiIsIkdPT0dMRV9DTElFTlRfSUQiLCJjbGllbnRTZWNyZXQiLCJHT09HTEVfQ0xJRU5UX1NFQ1JFVCIsImF1dGhvcml6YXRpb24iLCJwYXJhbXMiLCJwcm9tcHQiLCJhY2Nlc3NfdHlwZSIsInJlc3BvbnNlX3R5cGUiLCJhbGxvd0Rhbmdlcm91c0VtYWlsQWNjb3VudExpbmtpbmciLCJwcm9maWxlIiwiaWQiLCJzdWIiLCJuYW1lIiwiZ2l2ZW5fbmFtZSIsImZhbWlseV9uYW1lIiwiZW1haWwiLCJpbWFnZSIsInBpY3R1cmUiLCJyb2xlIiwiY3JlZGVudGlhbHMiLCJsYWJlbCIsInR5cGUiLCJwYXNzd29yZCIsImF1dGhvcml6ZSIsIkVycm9yIiwidXNlciIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsImlzUGFzc3dvcmRWYWxpZCIsImNvbXBhcmUiLCJlcnJvciIsImNvbnNvbGUiLCJjYWxsYmFja3MiLCJzaWduSW4iLCJhY2NvdW50IiwicHJvdmlkZXIiLCJsb2ciLCJyZXF1ZXN0ZWRSb2xlIiwiY2FsbGJhY2tVcmwiLCJ1cmwiLCJVUkwiLCJzZWFyY2hQYXJhbXMiLCJnZXQiLCJpbmNsdWRlcyIsImV4aXN0aW5nVXNlciIsIm5ld1VzZXIiLCJjcmVhdGUiLCJkYXRhIiwiZW1haWxWZXJpZmllZCIsIkRhdGUiLCJzdG9yZSIsImRlc2NyaXB0aW9uIiwib3duZXJJZCIsImVuY29kZVVSSUNvbXBvbmVudCIsIm1lc3NhZ2UiLCJqd3QiLCJ0b2tlbiIsInNlc3Npb24iLCJyZWRpcmVjdCIsImJhc2VVcmwiLCJwYWdlcyIsInNpZ25PdXQiLCJzdHJhdGVneSIsIm1heEFnZSIsInVwZGF0ZUFnZSIsImNvb2tpZXMiLCJzZXNzaW9uVG9rZW4iLCJvcHRpb25zIiwiaHR0cE9ubHkiLCJzYW1lU2l0ZSIsInBhdGgiLCJzZWN1cmUiLCJkZWJ1ZyIsImxvZ2dlciIsImNvZGUiLCJtZXRhZGF0YSIsIndhcm4iLCJzZWNyZXQiLCJORVhUQVVUSF9TRUNSRVQiLCJoYW5kbGVyIiwiR0VUIiwiUE9TVCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5CPFE_github%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5CPFE_github&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5CPFE_github%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5CPFE_github&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Stoufa_Desktop_PFE_github_app_api_auth_nextauth_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/[...nextauth]/route.js */ \"(rsc)/./app/api/auth/[...nextauth]/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Stoufa\\\\Desktop\\\\PFE_github\\\\app\\\\api\\\\auth\\\\[...nextauth]\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_Stoufa_Desktop_PFE_github_app_api_auth_nextauth_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNTdG91ZmElNUNEZXNrdG9wJTVDUEZFX2dpdGh1YiU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDU3RvdWZhJTVDRGVza3RvcCU1Q1BGRV9naXRodWImaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQytCO0FBQzVHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxTdG91ZmFcXFxcRGVza3RvcFxcXFxQRkVfZ2l0aHViXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxbLi4ubmV4dGF1dGhdXFxcXHJvdXRlLmpzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hdXRoL1suLi5uZXh0YXV0aF1cIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXFN0b3VmYVxcXFxEZXNrdG9wXFxcXFBGRV9naXRodWJcXFxcYXBwXFxcXGFwaVxcXFxhdXRoXFxcXFsuLi5uZXh0YXV0aF1cXFxccm91dGUuanNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5CPFE_github%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5CPFE_github&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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

/***/ "@prisma/client/runtime/library":
/*!*************************************************!*\
  !*** external "@prisma/client/runtime/library" ***!
  \*************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client/runtime/library");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/oauth","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva","vendor-chunks/@auth"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5CPFE_github%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5CPFE_github&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();