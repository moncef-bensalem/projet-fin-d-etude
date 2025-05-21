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
exports.id = "app/api/admin/dashboard/recent-orders/route";
exports.ids = ["app/api/admin/dashboard/recent-orders/route"];
exports.modules = {

/***/ "(rsc)/./app/api/admin/dashboard/recent-orders/route.js":
/*!********************************************************!*\
  !*** ./app/api/admin/dashboard/recent-orders/route.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_auth_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/next */ \"(rsc)/./node_modules/next-auth/next/index.js\");\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.js\");\n\n\n\n\n// Fonction pour gérer la sérialisation des BigInt\nfunction handleBigInt(data) {\n    return JSON.parse(JSON.stringify(data, (key, value)=>typeof value === 'bigint' ? value.toString() : value));\n}\nasync function GET(request) {\n    try {\n        console.log('[API] Fetching recent orders data for admin dashboard');\n        // Extract limit from query params (default to 10)\n        const { searchParams } = new URL(request.url);\n        const limit1 = parseInt(searchParams.get('limit') || '10', 10);\n        const page1 = parseInt(searchParams.get('page') || '1', 10);\n        const skip = (page1 - 1) * limit1;\n        // Check authentication\n        const session = await (0,next_auth_next__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n        if (!session || !session.user) {\n            console.warn('[API] Unauthorized access attempt to recent orders data');\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Non autorisé'\n            }, {\n                status: 401\n            });\n        }\n        // Check user role\n        const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__[\"default\"].user.findUnique({\n            where: {\n                id: session.user.id\n            },\n            select: {\n                role: true\n            }\n        });\n        if (!user || user.role !== 'ADMIN' && user.role !== 'MANAGER') {\n            console.warn(`[API] User ${session.user.email} tried to access recent orders without permission`);\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Accès restreint aux administrateurs et managers'\n            }, {\n                status: 403\n            });\n        }\n        // Get total count for pagination\n        const totalCount = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__[\"default\"].order.count();\n        // Get recent orders\n        const recentOrders = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__[\"default\"].order.findMany({\n            skip,\n            take: limit1,\n            orderBy: {\n                createdAt: 'desc'\n            },\n            include: {\n                customer: {\n                    select: {\n                        name: true,\n                        email: true,\n                        image: true\n                    }\n                }\n            }\n        });\n        // Format the orders for the data table\n        const formattedOrders = recentOrders.map((order)=>({\n                id: order.id,\n                number: order.number,\n                date: order.createdAt,\n                status: order.status,\n                paymentStatus: order.paymentStatus,\n                total: order.total,\n                customer_name: order.customer?.name || 'Client inconnu',\n                customer_email: order.customer?.email || '-'\n            }));\n        console.log(`[API] Successfully retrieved ${formattedOrders.length} recent orders for page ${page1}`);\n        // Sérialiser les données pour éviter les problèmes avec BigInt\n        const responseData = handleBigInt({\n            data: formattedOrders,\n            total: totalCount,\n            page: page1,\n            limit: limit1,\n            totalPages: Math.ceil(totalCount / limit1)\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(responseData);\n    } catch (error) {\n        console.error(`[API] Error fetching recent orders data: ${error.message}`);\n        // In development, return demo data if DB error occurs\n        if (true) {\n            console.log('[API] Returning demo orders data');\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                data: generateDemoOrders(limit),\n                total: 30,\n                page,\n                limit,\n                totalPages: 3\n            });\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Erreur lors de la récupération des commandes récentes'\n        }, {\n            status: 500\n        });\n    }\n}\n// Helper function to generate demo orders for development\nfunction generateDemoOrders(count = 10) {\n    const statuses = [\n        'PENDING',\n        'PROCESSING',\n        'SHIPPED',\n        'DELIVERED',\n        'CANCELLED'\n    ];\n    const paymentStatuses = [\n        'PAID',\n        'PENDING',\n        'FAILED',\n        'REFUNDED'\n    ];\n    return Array.from({\n        length: count\n    }, (_, i)=>{\n        const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;\n        const orderDate = new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000);\n        const total = Math.floor(50 + Math.random() * 950);\n        const status = statuses[Math.floor(Math.random() * statuses.length)];\n        const paymentStatus = paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)];\n        return {\n            id: `demo-${i}`,\n            number: orderNumber,\n            date: orderDate,\n            status: status,\n            paymentStatus: paymentStatus,\n            total: total,\n            customer_name: `Client Demo ${i + 1}`,\n            customer_email: `client${i + 1}@example.com`\n        };\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2FkbWluL2Rhc2hib2FyZC9yZWNlbnQtb3JkZXJzL3JvdXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQTJDO0FBQ087QUFDVDtBQUNQO0FBRWxDLGtEQUFrRDtBQUNsRCxTQUFTSSxhQUFhQyxJQUFJO0lBQ3hCLE9BQU9DLEtBQUtDLEtBQUssQ0FDZkQsS0FBS0UsU0FBUyxDQUFDSCxNQUFNLENBQUNJLEtBQUtDLFFBQ3pCLE9BQU9BLFVBQVUsV0FBV0EsTUFBTUMsUUFBUSxLQUFLRDtBQUdyRDtBQUVPLGVBQWVFLElBQUlDLE9BQU87SUFDL0IsSUFBSTtRQUNGQyxRQUFRQyxHQUFHLENBQUM7UUFFWixrREFBa0Q7UUFDbEQsTUFBTSxFQUFFQyxZQUFZLEVBQUUsR0FBRyxJQUFJQyxJQUFJSixRQUFRSyxHQUFHO1FBQzVDLE1BQU1DLFNBQVFDLFNBQVNKLGFBQWFLLEdBQUcsQ0FBQyxZQUFZLE1BQU07UUFDMUQsTUFBTUMsUUFBT0YsU0FBU0osYUFBYUssR0FBRyxDQUFDLFdBQVcsS0FBSztRQUN2RCxNQUFNRSxPQUFPLENBQUNELFFBQU8sS0FBS0g7UUFFMUIsdUJBQXVCO1FBQ3ZCLE1BQU1LLFVBQVUsTUFBTXZCLGdFQUFnQkEsQ0FBQ0Msa0RBQVdBO1FBQ2xELElBQUksQ0FBQ3NCLFdBQVcsQ0FBQ0EsUUFBUUMsSUFBSSxFQUFFO1lBQzdCWCxRQUFRWSxJQUFJLENBQUM7WUFDYixPQUFPMUIscURBQVlBLENBQUMyQixJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBZSxHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDcEU7UUFFQSxrQkFBa0I7UUFDbEIsTUFBTUosT0FBTyxNQUFNdEIsbURBQU1BLENBQUNzQixJQUFJLENBQUNLLFVBQVUsQ0FBQztZQUN4Q0MsT0FBTztnQkFBRUMsSUFBSVIsUUFBUUMsSUFBSSxDQUFDTyxFQUFFO1lBQUM7WUFDN0JDLFFBQVE7Z0JBQUVDLE1BQU07WUFBSztRQUN2QjtRQUVBLElBQUksQ0FBQ1Qs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QUFNLEtBQUs7UUFDOUMsTUFBTTNDLFNBQVNtQyxRQUFRLENBQUNMLEtBQUtZLEtBQUssQ0FBQ1osS0FBS2EsTUFBTSxLQUFLUixTQUFTUixNQUFNLEVBQUU7UUFDcEUsTUFBTUosZ0JBQWdCYSxlQUFlLENBQUNOLEtBQUtZLEtBQUssQ0FBQ1osS0FBS2EsTUFBTSxLQUFLUCxnQkFBZ0JULE1BQU0sRUFBRTtRQUV6RixPQUFPO1lBQ0x4QixJQUFJLENBQUMsS0FBSyxFQUFFcUMsR0FBRztZQUNmbkIsUUFBUW9CO1lBQ1JuQixNQUFNc0I7WUFDTjVDLFFBQVFBO1lBQ1J1QixlQUFlQTtZQUNmQyxPQUFPQTtZQUNQQyxlQUFlLENBQUMsWUFBWSxFQUFFZSxJQUFFLEdBQUc7WUFDbkNkLGdCQUFnQixDQUFDLE1BQU0sRUFBRWMsSUFBRSxFQUFFLFlBQVksQ0FBQztRQUM1QztJQUNGO0FBQ0YiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcU3RvdWZhXFxEZXNrdG9wXFxQRkVfZ2l0aHViXFxhcHBcXGFwaVxcYWRtaW5cXGRhc2hib2FyZFxccmVjZW50LW9yZGVyc1xccm91dGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xyXG5pbXBvcnQgeyBnZXRTZXJ2ZXJTZXNzaW9uIH0gZnJvbSAnbmV4dC1hdXRoL25leHQnO1xyXG5pbXBvcnQgeyBhdXRoT3B0aW9ucyB9IGZyb20gJ0AvbGliL2F1dGgnO1xyXG5pbXBvcnQgcHJpc21hIGZyb20gJ0AvbGliL3ByaXNtYSc7XHJcblxyXG4vLyBGb25jdGlvbiBwb3VyIGfDqXJlciBsYSBzw6lyaWFsaXNhdGlvbiBkZXMgQmlnSW50XHJcbmZ1bmN0aW9uIGhhbmRsZUJpZ0ludChkYXRhKSB7XHJcbiAgcmV0dXJuIEpTT04ucGFyc2UoXHJcbiAgICBKU09OLnN0cmluZ2lmeShkYXRhLCAoa2V5LCB2YWx1ZSkgPT5cclxuICAgICAgdHlwZW9mIHZhbHVlID09PSAnYmlnaW50JyA/IHZhbHVlLnRvU3RyaW5nKCkgOiB2YWx1ZVxyXG4gICAgKVxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQocmVxdWVzdCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zb2xlLmxvZygnW0FQSV0gRmV0Y2hpbmcgcmVjZW50IG9yZGVycyBkYXRhIGZvciBhZG1pbiBkYXNoYm9hcmQnKTtcclxuICAgIFxyXG4gICAgLy8gRXh0cmFjdCBsaW1pdCBmcm9tIHF1ZXJ5IHBhcmFtcyAoZGVmYXVsdCB0byAxMClcclxuICAgIGNvbnN0IHsgc2VhcmNoUGFyYW1zIH0gPSBuZXcgVVJMKHJlcXVlc3QudXJsKTtcclxuICAgIGNvbnN0IGxpbWl0ID0gcGFyc2VJbnQoc2VhcmNoUGFyYW1zLmdldCgnbGltaXQnKSB8fCAnMTAnLCAxMCk7XHJcbiAgICBjb25zdCBwYWdlID0gcGFyc2VJbnQoc2VhcmNoUGFyYW1zLmdldCgncGFnZScpIHx8ICcxJywgMTApO1xyXG4gICAgY29uc3Qgc2tpcCA9IChwYWdlIC0gMSkgKiBsaW1pdDtcclxuICAgIFxyXG4gICAgLy8gQ2hlY2sgYXV0aGVudGljYXRpb25cclxuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRTZXJ2ZXJTZXNzaW9uKGF1dGhPcHRpb25zKTtcclxuICAgIGlmICghc2Vzc2lvbiB8fCAhc2Vzc2lvbi51c2VyKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybignW0FQSV0gVW5hdXRob3JpemVkIGFjY2VzcyBhdHRlbXB0IHRvIHJlY2VudCBvcmRlcnMgZGF0YScpO1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ05vbiBhdXRvcmlzw6knIH0sIHsgc3RhdHVzOiA0MDEgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIENoZWNrIHVzZXIgcm9sZVxyXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xyXG4gICAgICB3aGVyZTogeyBpZDogc2Vzc2lvbi51c2VyLmlkIH0sXHJcbiAgICAgIHNlbGVjdDogeyByb2xlOiB0cnVlIH1cclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICBpZiAoIXVzZXIgfHwgKHVzZXIucm9sZSAhPT0gJ0FETUlOJyAmJiB1c2VyLnJvbGUgIT09ICdNQU5BR0VSJykpIHtcclxuICAgICAgY29uc29sZS53YXJuKGBbQVBJXSBVc2VyICR7c2Vzc2lvbi51c2VyLmVtYWlsfSB0cmllZCB0byBhY2Nlc3MgcmVjZW50IG9yZGVycyB3aXRob3V0IHBlcm1pc3Npb25gKTtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdBY2PDqHMgcmVzdHJlaW50IGF1eCBhZG1pbmlzdHJhdGV1cnMgZXQgbWFuYWdlcnMnIH0sIHsgc3RhdHVzOiA0MDMgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gR2V0IHRvdGFsIGNvdW50IGZvciBwYWdpbmF0aW9uXHJcbiAgICBjb25zdCB0b3RhbENvdW50ID0gYXdhaXQgcHJpc21hLm9yZGVyLmNvdW50KCk7XHJcbiAgICBcclxuICAgIC8vIEdldCByZWNlbnQgb3JkZXJzXHJcbiAgICBjb25zdCByZWNlbnRPcmRlcnMgPSBhd2FpdCBwcmlzbWEub3JkZXIuZmluZE1hbnkoe1xyXG4gICAgICBza2lwLFxyXG4gICAgICB0YWtlOiBsaW1pdCxcclxuICAgICAgb3JkZXJCeTogeyBjcmVhdGVkQXQ6ICdkZXNjJyB9LFxyXG4gICAgICBpbmNsdWRlOiB7XHJcbiAgICAgICAgY3VzdG9tZXI6IHtcclxuICAgICAgICAgIHNlbGVjdDoge1xyXG4gICAgICAgICAgICBuYW1lOiB0cnVlLFxyXG4gICAgICAgICAgICBlbWFpbDogdHJ1ZSxcclxuICAgICAgICAgICAgaW1hZ2U6IHRydWVcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAvLyBGb3JtYXQgdGhlIG9yZGVycyBmb3IgdGhlIGRhdGEgdGFibGVcclxuICAgIGNvbnN0IGZvcm1hdHRlZE9yZGVycyA9IHJlY2VudE9yZGVycy5tYXAob3JkZXIgPT4gKHtcclxuICAgICAgaWQ6IG9yZGVyLmlkLFxyXG4gICAgICBudW1iZXI6IG9yZGVyLm51bWJlcixcclxuICAgICAgZGF0ZTogb3JkZXIuY3JlYXRlZEF0LFxyXG4gICAgICBzdGF0dXM6IG9yZGVyLnN0YXR1cyxcclxuICAgICAgcGF5bWVudFN0YXR1czogb3JkZXIucGF5bWVudFN0YXR1cyxcclxuICAgICAgdG90YWw6IG9yZGVyLnRvdGFsLFxyXG4gICAgICBjdXN0b21lcl9uYW1lOiBvcmRlci5jdXN0b21lcj8ubmFtZSB8fCAnQ2xpZW50IGluY29ubnUnLFxyXG4gICAgICBjdXN0b21lcl9lbWFpbDogb3JkZXIuY3VzdG9tZXI/LmVtYWlsIHx8ICctJ1xyXG4gICAgfSkpO1xyXG4gICAgXHJcbiAgICBjb25zb2xlLmxvZyhgW0FQSV0gU3VjY2Vzc2Z1bGx5IHJldHJpZXZlZCAke2Zvcm1hdHRlZE9yZGVycy5sZW5ndGh9IHJlY2VudCBvcmRlcnMgZm9yIHBhZ2UgJHtwYWdlfWApO1xyXG4gICAgXHJcbiAgICAvLyBTw6lyaWFsaXNlciBsZXMgZG9ubsOpZXMgcG91ciDDqXZpdGVyIGxlcyBwcm9ibMOobWVzIGF2ZWMgQmlnSW50XHJcbiAgICBjb25zdCByZXNwb25zZURhdGEgPSBoYW5kbGVCaWdJbnQoe1xyXG4gICAgICBkYXRhOiBmb3JtYXR0ZWRPcmRlcnMsXHJcbiAgICAgIHRvdGFsOiB0b3RhbENvdW50LFxyXG4gICAgICBwYWdlLFxyXG4gICAgICBsaW1pdCxcclxuICAgICAgdG90YWxQYWdlczogTWF0aC5jZWlsKHRvdGFsQ291bnQgLyBsaW1pdClcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24ocmVzcG9uc2VEYXRhKTtcclxuICAgIFxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKGBbQVBJXSBFcnJvciBmZXRjaGluZyByZWNlbnQgb3JkZXJzIGRhdGE6ICR7ZXJyb3IubWVzc2FnZX1gKTtcclxuICAgIFxyXG4gICAgLy8gSW4gZGV2ZWxvcG1lbnQsIHJldHVybiBkZW1vIGRhdGEgaWYgREIgZXJyb3Igb2NjdXJzXHJcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgICAgY29uc29sZS5sb2coJ1tBUEldIFJldHVybmluZyBkZW1vIG9yZGVycyBkYXRhJyk7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7XHJcbiAgICAgICAgZGF0YTogZ2VuZXJhdGVEZW1vT3JkZXJzKGxpbWl0KSxcclxuICAgICAgICB0b3RhbDogMzAsXHJcbiAgICAgICAgcGFnZSxcclxuICAgICAgICBsaW1pdCxcclxuICAgICAgICB0b3RhbFBhZ2VzOiAzXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ0VycmV1ciBsb3JzIGRlIGxhIHLDqWN1cMOpcmF0aW9uIGRlcyBjb21tYW5kZXMgcsOpY2VudGVzJyB9LCB7IHN0YXR1czogNTAwIH0pO1xyXG4gIH1cclxufVxyXG5cclxuLy8gSGVscGVyIGZ1bmN0aW9uIHRvIGdlbmVyYXRlIGRlbW8gb3JkZXJzIGZvciBkZXZlbG9wbWVudFxyXG5mdW5jdGlvbiBnZW5lcmF0ZURlbW9PcmRlcnMoY291bnQgPSAxMCkge1xyXG4gIGNvbnN0IHN0YXR1c2VzID0gWydQRU5ESU5HJywgJ1BST0NFU1NJTkcnLCAnU0hJUFBFRCcsICdERUxJVkVSRUQnLCAnQ0FOQ0VMTEVEJ107XHJcbiAgY29uc3QgcGF5bWVudFN0YXR1c2VzID0gWydQQUlEJywgJ1BFTkRJTkcnLCAnRkFJTEVEJywgJ1JFRlVOREVEJ107XHJcbiAgXHJcbiAgcmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGg6IGNvdW50IH0sIChfLCBpKSA9PiB7XHJcbiAgICBjb25zdCBvcmRlck51bWJlciA9IGBPUkQtJHtNYXRoLmZsb29yKDEwMDAwMCArIE1hdGgucmFuZG9tKCkgKiA5MDAwMDApfWA7XHJcbiAgICBjb25zdCBvcmRlckRhdGUgPSBuZXcgRGF0ZShEYXRlLm5vdygpIC0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMzApICogMjQgKiA2MCAqIDYwICogMTAwMCk7XHJcbiAgICBjb25zdCB0b3RhbCA9IE1hdGguZmxvb3IoNTAgKyBNYXRoLnJhbmRvbSgpICogOTUwKTtcclxuICAgIGNvbnN0IHN0YXR1cyA9IHN0YXR1c2VzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHN0YXR1c2VzLmxlbmd0aCldO1xyXG4gICAgY29uc3QgcGF5bWVudFN0YXR1cyA9IHBheW1lbnRTdGF0dXNlc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwYXltZW50U3RhdHVzZXMubGVuZ3RoKV07XHJcbiAgICBcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGlkOiBgZGVtby0ke2l9YCxcclxuICAgICAgbnVtYmVyOiBvcmRlck51bWJlcixcclxuICAgICAgZGF0ZTogb3JkZXJEYXRlLFxyXG4gICAgICBzdGF0dXM6IHN0YXR1cyxcclxuICAgICAgcGF5bWVudFN0YXR1czogcGF5bWVudFN0YXR1cyxcclxuICAgICAgdG90YWw6IHRvdGFsLFxyXG4gICAgICBjdXN0b21lcl9uYW1lOiBgQ2xpZW50IERlbW8gJHtpKzF9YCxcclxuICAgICAgY3VzdG9tZXJfZW1haWw6IGBjbGllbnQke2krMX1AZXhhbXBsZS5jb21gXHJcbiAgICB9O1xyXG4gIH0pO1xyXG59ICJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJnZXRTZXJ2ZXJTZXNzaW9uIiwiYXV0aE9wdGlvbnMiLCJwcmlzbWEiLCJoYW5kbGVCaWdJbnQiLCJkYXRhIiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5Iiwia2V5IiwidmFsdWUiLCJ0b1N0cmluZyIsIkdFVCIsInJlcXVlc3QiLCJjb25zb2xlIiwibG9nIiwic2VhcmNoUGFyYW1zIiwiVVJMIiwidXJsIiwibGltaXQiLCJwYXJzZUludCIsImdldCIsInBhZ2UiLCJza2lwIiwic2Vzc2lvbiIsInVzZXIiLCJ3YXJuIiwianNvbiIsImVycm9yIiwic3RhdHVzIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwiaWQiLCJzZWxlY3QiLCJyb2xlIiwiZW1haWwiLCJ0b3RhbENvdW50Iiwib3JkZXIiLCJjb3VudCIsInJlY2VudE9yZGVycyIsImZpbmRNYW55IiwidGFrZSIsIm9yZGVyQnkiLCJjcmVhdGVkQXQiLCJpbmNsdWRlIiwiY3VzdG9tZXIiLCJuYW1lIiwiaW1hZ2UiLCJmb3JtYXR0ZWRPcmRlcnMiLCJtYXAiLCJudW1iZXIiLCJkYXRlIiwicGF5bWVudFN0YXR1cyIsInRvdGFsIiwiY3VzdG9tZXJfbmFtZSIsImN1c3RvbWVyX2VtYWlsIiwibGVuZ3RoIiwicmVzcG9uc2VEYXRhIiwidG90YWxQYWdlcyIsIk1hdGgiLCJjZWlsIiwibWVzc2FnZSIsInByb2Nlc3MiLCJnZW5lcmF0ZURlbW9PcmRlcnMiLCJzdGF0dXNlcyIsInBheW1lbnRTdGF0dXNlcyIsIkFycmF5IiwiZnJvbSIsIl8iLCJpIiwib3JkZXJOdW1iZXIiLCJmbG9vciIsInJhbmRvbSIsIm9yZGVyRGF0ZSIsIkRhdGUiLCJub3ciXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/admin/dashboard/recent-orders/route.js\n");

/***/ }),

/***/ "(rsc)/./lib/auth.js":
/*!*********************!*\
  !*** ./lib/auth.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   auth: () => (/* binding */ auth),\n/* harmony export */   authOptions: () => (/* binding */ authOptions),\n/* harmony export */   getCurrentUser: () => (/* binding */ getCurrentUser),\n/* harmony export */   signIn: () => (/* binding */ signIn),\n/* harmony export */   signOut: () => (/* binding */ signOut)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n\n\n\n\n// Use Prisma as a singleton to avoid connection issues\nconst globalForPrisma = global;\nglobalForPrisma.prisma = globalForPrisma.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nconst prisma = globalForPrisma.prisma;\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_3__[\"default\"])({\n            name: \"credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) {\n                    throw new Error(\"Email et mot de passe requis\");\n                }\n                const user = await prisma.user.findUnique({\n                    where: {\n                        email: credentials.email\n                    }\n                });\n                if (!user) {\n                    throw new Error(\"Utilisateur non trouvé\");\n                }\n                const isPasswordValid = await bcrypt__WEBPACK_IMPORTED_MODULE_1___default().compare(credentials.password, user.password);\n                if (!isPasswordValid) {\n                    throw new Error(\"Mot de passe incorrect\");\n                }\n                return {\n                    id: user.id,\n                    email: user.email,\n                    name: user.name,\n                    role: user.role\n                };\n            }\n        })\n    ],\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.role = user.role;\n                token.id = user.id;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session?.user) {\n                session.user.role = token.role;\n                session.user.id = token.id;\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/login\",\n        error: \"/login\"\n    },\n    session: {\n        strategy: \"jwt\"\n    },\n    secret: process.env.NEXTAUTH_SECRET\n};\nconst { auth, signIn, signOut } = next_auth__WEBPACK_IMPORTED_MODULE_2___default()(authOptions);\n/**\r\n * Get the current user from a user ID\r\n * @param {string} userId - The user ID to get\r\n * @returns {Promise<Object|null>} The user object or null if not found\r\n */ async function getCurrentUser(userId) {\n    if (!userId) return null;\n    try {\n        const user = await prisma.user.findUnique({\n            where: {\n                id: userId\n            },\n            select: {\n                id: true,\n                name: true,\n                email: true,\n                role: true,\n                image: true\n            }\n        });\n        return user;\n    } catch (error) {\n        console.error(\"Error in getCurrentUser:\", error);\n        return null;\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBOEM7QUFDbEI7QUFDSztBQUNpQztBQUVsRSx1REFBdUQ7QUFDdkQsTUFBTUksa0JBQWtCQztBQUN4QkQsZ0JBQWdCRSxNQUFNLEdBQUdGLGdCQUFnQkUsTUFBTSxJQUFJLElBQUlOLHdEQUFZQTtBQUNuRSxNQUFNTSxTQUFTRixnQkFBZ0JFLE1BQU07QUFFOUIsTUFBTUMsY0FBYztJQUN6QkMsV0FBVztRQUNUTCwyRUFBbUJBLENBQUM7WUFDbEJNLE1BQU07WUFDTkMsYUFBYTtnQkFDWEMsT0FBTztvQkFBRUMsT0FBTztvQkFBU0MsTUFBTTtnQkFBUTtnQkFDdkNDLFVBQVU7b0JBQUVGLE9BQU87b0JBQVlDLE1BQU07Z0JBQVc7WUFDbEQ7WUFDQSxNQUFNRSxXQUFVTCxXQUFXO2dCQUN6QixJQUFJLENBQUNBLGFBQWFDLFNBQVMsQ0FBQ0QsYUFBYUksVUFBVTtvQkFDakQsTUFBTSxJQUFJRSxNQUFNO2dCQUNsQjtnQkFFQSxNQUFNQyxPQUFPLE1BQU1YLE9BQU9XLElBQUksQ0FBQ0MsVUFBVSxDQUFDO29CQUN4Q0MsT0FBTzt3QkFBRVIsT0FBT0QsWUFBWUMsS0FBSztvQkFBQztnQkFDcEM7Z0JBRUEsSUFBSSxDQUFDTSxNQUFNO29CQUNULE1BQU0sSUFBSUQsTUFBTTtnQkFDbEI7Z0JBRUEsTUFBTUksa0JBQWtCLE1BQU1uQixxREFBYyxDQUMxQ1MsWUFBWUksUUFBUSxFQUNwQkcsS0FBS0gsUUFBUTtnQkFHZixJQUFJLENBQUNNLGlCQUFpQjtvQkFDcEIsTUFBTSxJQUFJSixNQUFNO2dCQUNsQjtnQkFFQSxPQUFPO29CQUNMTSxJQUFJTCxLQUFLSyxFQUFFO29CQUNYWCxPQUFPTSxLQUFLTixLQUFLO29CQUNqQkYsTUFBTVEsS0FBS1IsSUFBSTtvQkFDZmMsTUFBTU4sS0FBS00sSUFBSTtnQkFDakI7WUFDRjtRQUNGO0tBQ0Q7SUFDREMsV0FBVztRQUNULE1BQU1DLEtBQUksRUFBRUMsS0FBSyxFQUFFVCxJQUFJLEVBQUU7WUFDdkIsSUFBSUEsTUFBTTtnQkFDUlMsTUFBTUgsSUFBSSxHQUFHTixLQUFLTSxJQUFJO2dCQUN0QkcsTUFBTUosRUFBRSxHQUFHTCxLQUFLSyxFQUFFO1lBQ3BCO1lBQ0EsT0FBT0k7UUFDVDtRQUNBLE1BQU1DLFNBQVEsRUFBRUEsT0FBTyxFQUFFRCxLQUFLLEVBQUU7WUFDOUIsSUFBSUMsU0FBU1YsTUFBTTtnQkFDakJVLFFBQVFWLElBQUksQ0FBQ00sSUFBSSxHQUFHRyxNQUFNSCxJQUFJO2dCQUM5QkksUUFBUVYsSUFBSSxDQUFDSyxFQUFFLEdBQUdJLE1BQU1KLEVBQUU7WUFDNUI7WUFDQSxPQUFPSztRQUNUO0lBQ0Y7SUFDQUMsT0FBTztRQUNMQyxRQUFRO1FBQ1JDLE9BQU87SUFDVDtJQUNBSCxTQUFTO1FBQ1BJLFVBQVU7SUFDWjtJQUNBQyxRQUFRQyxRQUFRQyxHQUFHLENBQUNDLGVBQWU7QUFDckMsRUFBRTtBQUVLLE1BQU0sRUFBRUMsSUFBSSxFQUFFUCxNQUFNLEVBQUVRLE9BQU8sRUFBRSxHQUFHbkMsZ0RBQVFBLENBQUNLLGFBQWE7QUFFL0Q7Ozs7Q0FJQyxHQUNNLGVBQWUrQixlQUFlQyxNQUFNO0lBQ3pDLElBQUksQ0FBQ0EsUUFBUSxPQUFPO0lBRXBCLElBQUk7UUFDRixNQUFNdEIsT0FBTyxNQUFNWCxPQUFPVyxJQUFJLENBQUNDLFVBQVUsQ0FBQztZQUN4Q0MsT0FBTztnQkFBRUcsSUFBSWlCO1lBQU87WUFDcEJDLFFBQVE7Z0JBQ05sQixJQUFJO2dCQUNKYixNQUFNO2dCQUNORSxPQUFPO2dCQUNQWSxNQUFNO2dCQUNOa0IsT0FBTztZQUNUO1FBQ0Y7UUFFQSxPQUFPeEI7SUFDVCxFQUFFLE9BQU9hLE9BQU87UUFDZFksUUFBUVosS0FBSyxDQUFDLDRCQUE0QkE7UUFDMUMsT0FBTztJQUNUO0FBQ0YiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcU3RvdWZhXFxEZXNrdG9wXFxQRkVfZ2l0aHViXFxsaWJcXGF1dGguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSBcIkBwcmlzbWEvY2xpZW50XCI7XHJcbmltcG9ydCBiY3J5cHQgZnJvbSBcImJjcnlwdFwiO1xyXG5pbXBvcnQgTmV4dEF1dGggZnJvbSBcIm5leHQtYXV0aFwiO1xyXG5pbXBvcnQgQ3JlZGVudGlhbHNQcm92aWRlciBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVycy9jcmVkZW50aWFsc1wiO1xyXG5cclxuLy8gVXNlIFByaXNtYSBhcyBhIHNpbmdsZXRvbiB0byBhdm9pZCBjb25uZWN0aW9uIGlzc3Vlc1xyXG5jb25zdCBnbG9iYWxGb3JQcmlzbWEgPSBnbG9iYWw7XHJcbmdsb2JhbEZvclByaXNtYS5wcmlzbWEgPSBnbG9iYWxGb3JQcmlzbWEucHJpc21hIHx8IG5ldyBQcmlzbWFDbGllbnQoKTtcclxuY29uc3QgcHJpc21hID0gZ2xvYmFsRm9yUHJpc21hLnByaXNtYTtcclxuXHJcbmV4cG9ydCBjb25zdCBhdXRoT3B0aW9ucyA9IHtcclxuICBwcm92aWRlcnM6IFtcclxuICAgIENyZWRlbnRpYWxzUHJvdmlkZXIoe1xyXG4gICAgICBuYW1lOiBcImNyZWRlbnRpYWxzXCIsXHJcbiAgICAgIGNyZWRlbnRpYWxzOiB7XHJcbiAgICAgICAgZW1haWw6IHsgbGFiZWw6IFwiRW1haWxcIiwgdHlwZTogXCJlbWFpbFwiIH0sXHJcbiAgICAgICAgcGFzc3dvcmQ6IHsgbGFiZWw6IFwiUGFzc3dvcmRcIiwgdHlwZTogXCJwYXNzd29yZFwiIH1cclxuICAgICAgfSxcclxuICAgICAgYXN5bmMgYXV0aG9yaXplKGNyZWRlbnRpYWxzKSB7XHJcbiAgICAgICAgaWYgKCFjcmVkZW50aWFscz8uZW1haWwgfHwgIWNyZWRlbnRpYWxzPy5wYXNzd29yZCkge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRW1haWwgZXQgbW90IGRlIHBhc3NlIHJlcXVpc1wiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcclxuICAgICAgICAgIHdoZXJlOiB7IGVtYWlsOiBjcmVkZW50aWFscy5lbWFpbCB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICghdXNlcikge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVXRpbGlzYXRldXIgbm9uIHRyb3V2w6lcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBpc1Bhc3N3b3JkVmFsaWQgPSBhd2FpdCBiY3J5cHQuY29tcGFyZShcclxuICAgICAgICAgIGNyZWRlbnRpYWxzLnBhc3N3b3JkLFxyXG4gICAgICAgICAgdXNlci5wYXNzd29yZFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGlmICghaXNQYXNzd29yZFZhbGlkKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNb3QgZGUgcGFzc2UgaW5jb3JyZWN0XCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGlkOiB1c2VyLmlkLFxyXG4gICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXHJcbiAgICAgICAgICBuYW1lOiB1c2VyLm5hbWUsXHJcbiAgICAgICAgICByb2xlOiB1c2VyLnJvbGVcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIF0sXHJcbiAgY2FsbGJhY2tzOiB7XHJcbiAgICBhc3luYyBqd3QoeyB0b2tlbiwgdXNlciB9KSB7XHJcbiAgICAgIGlmICh1c2VyKSB7XHJcbiAgICAgICAgdG9rZW4ucm9sZSA9IHVzZXIucm9sZTtcclxuICAgICAgICB0b2tlbi5pZCA9IHVzZXIuaWQ7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRva2VuO1xyXG4gICAgfSxcclxuICAgIGFzeW5jIHNlc3Npb24oeyBzZXNzaW9uLCB0b2tlbiB9KSB7XHJcbiAgICAgIGlmIChzZXNzaW9uPy51c2VyKSB7XHJcbiAgICAgICAgc2Vzc2lvbi51c2VyLnJvbGUgPSB0b2tlbi5yb2xlO1xyXG4gICAgICAgIHNlc3Npb24udXNlci5pZCA9IHRva2VuLmlkO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBzZXNzaW9uO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgcGFnZXM6IHtcclxuICAgIHNpZ25JbjogXCIvbG9naW5cIixcclxuICAgIGVycm9yOiBcIi9sb2dpblwiXHJcbiAgfSxcclxuICBzZXNzaW9uOiB7XHJcbiAgICBzdHJhdGVneTogXCJqd3RcIlxyXG4gIH0sXHJcbiAgc2VjcmV0OiBwcm9jZXNzLmVudi5ORVhUQVVUSF9TRUNSRVRcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCB7IGF1dGgsIHNpZ25Jbiwgc2lnbk91dCB9ID0gTmV4dEF1dGgoYXV0aE9wdGlvbnMpO1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgY3VycmVudCB1c2VyIGZyb20gYSB1c2VyIElEXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySWQgLSBUaGUgdXNlciBJRCB0byBnZXRcclxuICogQHJldHVybnMge1Byb21pc2U8T2JqZWN0fG51bGw+fSBUaGUgdXNlciBvYmplY3Qgb3IgbnVsbCBpZiBub3QgZm91bmRcclxuICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDdXJyZW50VXNlcih1c2VySWQpIHtcclxuICBpZiAoIXVzZXJJZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7XHJcbiAgICAgIHdoZXJlOiB7IGlkOiB1c2VySWQgfSxcclxuICAgICAgc2VsZWN0OiB7XHJcbiAgICAgICAgaWQ6IHRydWUsXHJcbiAgICAgICAgbmFtZTogdHJ1ZSxcclxuICAgICAgICBlbWFpbDogdHJ1ZSxcclxuICAgICAgICByb2xlOiB0cnVlLFxyXG4gICAgICAgIGltYWdlOiB0cnVlXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB1c2VyO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgaW4gZ2V0Q3VycmVudFVzZXI6XCIsIGVycm9yKTtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufSAiXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiYmNyeXB0IiwiTmV4dEF1dGgiLCJDcmVkZW50aWFsc1Byb3ZpZGVyIiwiZ2xvYmFsRm9yUHJpc21hIiwiZ2xvYmFsIiwicHJpc21hIiwiYXV0aE9wdGlvbnMiLCJwcm92aWRlcnMiLCJuYW1lIiwiY3JlZGVudGlhbHMiLCJlbWFpbCIsImxhYmVsIiwidHlwZSIsInBhc3N3b3JkIiwiYXV0aG9yaXplIiwiRXJyb3IiLCJ1c2VyIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwiaXNQYXNzd29yZFZhbGlkIiwiY29tcGFyZSIsImlkIiwicm9sZSIsImNhbGxiYWNrcyIsImp3dCIsInRva2VuIiwic2Vzc2lvbiIsInBhZ2VzIiwic2lnbkluIiwiZXJyb3IiLCJzdHJhdGVneSIsInNlY3JldCIsInByb2Nlc3MiLCJlbnYiLCJORVhUQVVUSF9TRUNSRVQiLCJhdXRoIiwic2lnbk91dCIsImdldEN1cnJlbnRVc2VyIiwidXNlcklkIiwic2VsZWN0IiwiaW1hZ2UiLCJjb25zb2xlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.js\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.js":
/*!***********************!*\
  !*** ./lib/prisma.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst prismaClientSingleton = ()=>{\n    return new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\n};\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? prismaClientSingleton();\nif (true) {\n    globalForPrisma.prisma = prisma;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE4QztBQUU5QyxNQUFNQyx3QkFBd0I7SUFDNUIsT0FBTyxJQUFJRCx3REFBWUE7QUFDekI7QUFFQSxNQUFNRSxrQkFBa0JDO0FBRXhCLE1BQU1DLFNBQVNGLGdCQUFnQkUsTUFBTSxJQUFJSDtBQUV6QyxJQUFJSSxJQUFxQyxFQUFFO0lBQ3pDSCxnQkFBZ0JFLE1BQU0sR0FBR0E7QUFDM0I7QUFFQSxpRUFBZUEsTUFBTUEsRUFBQyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxTdG91ZmFcXERlc2t0b3BcXFBGRV9naXRodWJcXGxpYlxccHJpc21hLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gJ0BwcmlzbWEvY2xpZW50JztcblxuY29uc3QgcHJpc21hQ2xpZW50U2luZ2xldG9uID0gKCkgPT4ge1xuICByZXR1cm4gbmV3IFByaXNtYUNsaWVudCgpO1xufTtcblxuY29uc3QgZ2xvYmFsRm9yUHJpc21hID0gZ2xvYmFsVGhpcztcblxuY29uc3QgcHJpc21hID0gZ2xvYmFsRm9yUHJpc21hLnByaXNtYSA/PyBwcmlzbWFDbGllbnRTaW5nbGV0b24oKTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgZ2xvYmFsRm9yUHJpc21hLnByaXNtYSA9IHByaXNtYTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgcHJpc21hO1xuIl0sIm5hbWVzIjpbIlByaXNtYUNsaWVudCIsInByaXNtYUNsaWVudFNpbmdsZXRvbiIsImdsb2JhbEZvclByaXNtYSIsImdsb2JhbFRoaXMiLCJwcmlzbWEiLCJwcm9jZXNzIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fdashboard%2Frecent-orders%2Froute&page=%2Fapi%2Fadmin%2Fdashboard%2Frecent-orders%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fdashboard%2Frecent-orders%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5CPFE_github%5Capp&pageExtensions=js&pageExtensions=jsx&pageExtensions=ts&pageExtensions=tsx&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5CPFE_github&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fdashboard%2Frecent-orders%2Froute&page=%2Fapi%2Fadmin%2Fdashboard%2Frecent-orders%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fdashboard%2Frecent-orders%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5CPFE_github%5Capp&pageExtensions=js&pageExtensions=jsx&pageExtensions=ts&pageExtensions=tsx&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5CPFE_github&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Stoufa_Desktop_PFE_github_app_api_admin_dashboard_recent_orders_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/admin/dashboard/recent-orders/route.js */ \"(rsc)/./app/api/admin/dashboard/recent-orders/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/admin/dashboard/recent-orders/route\",\n        pathname: \"/api/admin/dashboard/recent-orders\",\n        filename: \"route\",\n        bundlePath: \"app/api/admin/dashboard/recent-orders/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Stoufa\\\\Desktop\\\\PFE_github\\\\app\\\\api\\\\admin\\\\dashboard\\\\recent-orders\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_Stoufa_Desktop_PFE_github_app_api_admin_dashboard_recent_orders_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhZG1pbiUyRmRhc2hib2FyZCUyRnJlY2VudC1vcmRlcnMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmFkbWluJTJGZGFzaGJvYXJkJTJGcmVjZW50LW9yZGVycyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmFkbWluJTJGZGFzaGJvYXJkJTJGcmVjZW50LW9yZGVycyUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNTdG91ZmElNUNEZXNrdG9wJTVDUEZFX2dpdGh1YiU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz1qcyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9dHN4JnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDU3RvdWZhJTVDRGVza3RvcCU1Q1BGRV9naXRodWImaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQzJDO0FBQ3hIO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxTdG91ZmFcXFxcRGVza3RvcFxcXFxQRkVfZ2l0aHViXFxcXGFwcFxcXFxhcGlcXFxcYWRtaW5cXFxcZGFzaGJvYXJkXFxcXHJlY2VudC1vcmRlcnNcXFxccm91dGUuanNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2FkbWluL2Rhc2hib2FyZC9yZWNlbnQtb3JkZXJzL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYWRtaW4vZGFzaGJvYXJkL3JlY2VudC1vcmRlcnNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2FkbWluL2Rhc2hib2FyZC9yZWNlbnQtb3JkZXJzL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcU3RvdWZhXFxcXERlc2t0b3BcXFxcUEZFX2dpdGh1YlxcXFxhcHBcXFxcYXBpXFxcXGFkbWluXFxcXGRhc2hib2FyZFxcXFxyZWNlbnQtb3JkZXJzXFxcXHJvdXRlLmpzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fdashboard%2Frecent-orders%2Froute&page=%2Fapi%2Fadmin%2Fdashboard%2Frecent-orders%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fdashboard%2Frecent-orders%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5CPFE_github%5Capp&pageExtensions=js&pageExtensions=jsx&pageExtensions=ts&pageExtensions=tsx&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5CPFE_github&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/next-auth","vendor-chunks/oauth","vendor-chunks/@babel","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fdashboard%2Frecent-orders%2Froute&page=%2Fapi%2Fadmin%2Fdashboard%2Frecent-orders%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fdashboard%2Frecent-orders%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5CPFE_github%5Capp&pageExtensions=js&pageExtensions=jsx&pageExtensions=ts&pageExtensions=tsx&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5CPFE_github&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();