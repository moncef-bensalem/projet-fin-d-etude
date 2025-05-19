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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_auth_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/next */ \"(rsc)/./node_modules/next-auth/next/index.js\");\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.js\");\n\n\n\n\n// Fonction pour gérer la sérialisation des BigInt\nfunction handleBigInt(data) {\n    return JSON.parse(JSON.stringify(data, (key, value)=>typeof value === 'bigint' ? value.toString() : value));\n}\nasync function GET(request) {\n    try {\n        console.log('[API] Fetching recent orders data for admin dashboard');\n        // Extract limit from query params (default to 10)\n        const { searchParams } = new URL(request.url);\n        const limit1 = parseInt(searchParams.get('limit') || '10', 10);\n        const page1 = parseInt(searchParams.get('page') || '1', 10);\n        const skip = (page1 - 1) * limit1;\n        // Check authentication\n        const session = await (0,next_auth_next__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n        if (!session || !session.user) {\n            console.warn('[API] Unauthorized access attempt to recent orders data');\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Non autorisé'\n            }, {\n                status: 401\n            });\n        }\n        // Check user role\n        const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__[\"default\"].user.findUnique({\n            where: {\n                id: session.user.id\n            },\n            select: {\n                role: true\n            }\n        });\n        if (!user || user.role !== 'ADMIN' && user.role !== 'MANAGER') {\n            console.warn(`[API] User ${session.user.email} tried to access recent orders without permission`);\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Accès restreint aux administrateurs et managers'\n            }, {\n                status: 403\n            });\n        }\n        // Get total count for pagination\n        const totalCount = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__[\"default\"].order.count();\n        // Get recent orders\n        const recentOrders = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__[\"default\"].order.findMany({\n            skip,\n            take: limit1,\n            orderBy: {\n                createdAt: 'desc'\n            },\n            include: {\n                customer: {\n                    select: {\n                        name: true,\n                        email: true,\n                        image: true\n                    }\n                }\n            }\n        });\n        // Format the orders for the data table\n        const formattedOrders = recentOrders.map((order)=>({\n                id: order.id,\n                number: order.number,\n                date: order.createdAt,\n                status: order.status,\n                paymentStatus: order.paymentStatus,\n                total: order.total,\n                customer_name: order.customer?.name || 'Client inconnu',\n                customer_email: order.customer?.email || '-'\n            }));\n        console.log(`[API] Successfully retrieved ${formattedOrders.length} recent orders for page ${page1}`);\n        // Sérialiser les données pour éviter les problèmes avec BigInt\n        const responseData = handleBigInt({\n            data: formattedOrders,\n            total: totalCount,\n            page: page1,\n            limit: limit1,\n            totalPages: Math.ceil(totalCount / limit1)\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(responseData);\n    } catch (error) {\n        console.error(`[API] Error fetching recent orders data: ${error.message}`);\n        // In development, return demo data if DB error occurs\n        if (true) {\n            console.log('[API] Returning demo orders data');\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                data: generateDemoOrders(limit),\n                total: 30,\n                page,\n                limit,\n                totalPages: 3\n            });\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Erreur lors de la récupération des commandes récentes'\n        }, {\n            status: 500\n        });\n    }\n}\n// Helper function to generate demo orders for development\nfunction generateDemoOrders(count = 10) {\n    const statuses = [\n        'PENDING',\n        'PROCESSING',\n        'SHIPPED',\n        'DELIVERED',\n        'CANCELLED'\n    ];\n    const paymentStatuses = [\n        'PAID',\n        'PENDING',\n        'FAILED',\n        'REFUNDED'\n    ];\n    return Array.from({\n        length: count\n    }, (_, i)=>{\n        const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;\n        const orderDate = new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000);\n        const total = Math.floor(50 + Math.random() * 950);\n        const status = statuses[Math.floor(Math.random() * statuses.length)];\n        const paymentStatus = paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)];\n        return {\n            id: `demo-${i}`,\n            number: orderNumber,\n            date: orderDate,\n            status: status,\n            paymentStatus: paymentStatus,\n            total: total,\n            customer_name: `Client Demo ${i + 1}`,\n            customer_email: `client${i + 1}@example.com`\n        };\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2FkbWluL2Rhc2hib2FyZC9yZWNlbnQtb3JkZXJzL3JvdXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQTJDO0FBQ087QUFDVDtBQUNQO0FBRWxDLGtEQUFrRDtBQUNsRCxTQUFTSSxhQUFhQyxJQUFJO0lBQ3hCLE9BQU9DLEtBQUtDLEtBQUssQ0FDZkQsS0FBS0UsU0FBUyxDQUFDSCxNQUFNLENBQUNJLEtBQUtDLFFBQ3pCLE9BQU9BLFVBQVUsV0FBV0EsTUFBTUMsUUFBUSxLQUFLRDtBQUdyRDtBQUVPLGVBQWVFLElBQUlDLE9BQU87SUFDL0IsSUFBSTtRQUNGQyxRQUFRQyxHQUFHLENBQUM7UUFFWixrREFBa0Q7UUFDbEQsTUFBTSxFQUFFQyxZQUFZLEVBQUUsR0FBRyxJQUFJQyxJQUFJSixRQUFRSyxHQUFHO1FBQzVDLE1BQU1DLFNBQVFDLFNBQVNKLGFBQWFLLEdBQUcsQ0FBQyxZQUFZLE1BQU07UUFDMUQsTUFBTUMsUUFBT0YsU0FBU0osYUFBYUssR0FBRyxDQUFDLFdBQVcsS0FBSztRQUN2RCxNQUFNRSxPQUFPLENBQUNELFFBQU8sS0FBS0g7UUFFMUIsdUJBQXVCO1FBQ3ZCLE1BQU1LLFVBQVUsTUFBTXZCLGdFQUFnQkEsQ0FBQ0Msa0RBQVdBO1FBQ2xELElBQUksQ0FBQ3NCLFdBQVcsQ0FBQ0EsUUFBUUMsSUFBSSxFQUFFO1lBQzdCWCxRQUFRWSxJQUFJLENBQUM7WUFDYixPQUFPMUIscURBQVlBLENBQUMyQixJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBZSxHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDcEU7UUFFQSxrQkFBa0I7UUFDbEIsTUFBTUosT0FBTyxNQUFNdEIsbURBQU1BLENBQUNzQixJQUFJLENBQUNLLFVBQVUsQ0FBQztZQUN4Q0MsT0FBTztnQkFBRUMsSUFBSVIsUUFBUUMsSUFBSSxDQUFDTyxFQUFFO1lBQUM7WUFDN0JDLFFBQVE7Z0JBQUVDLE1BQU07WUFBSztRQUN2QjtRQUVBLElBQUksQ0FBQ1Qs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QUFNLEtBQUs7UUFDOUMsTUFBTTNDLFNBQVNtQyxRQUFRLENBQUNMLEtBQUtZLEtBQUssQ0FBQ1osS0FBS2EsTUFBTSxLQUFLUixTQUFTUixNQUFNLEVBQUU7UUFDcEUsTUFBTUosZ0JBQWdCYSxlQUFlLENBQUNOLEtBQUtZLEtBQUssQ0FBQ1osS0FBS2EsTUFBTSxLQUFLUCxnQkFBZ0JULE1BQU0sRUFBRTtRQUV6RixPQUFPO1lBQ0x4QixJQUFJLENBQUMsS0FBSyxFQUFFcUMsR0FBRztZQUNmbkIsUUFBUW9CO1lBQ1JuQixNQUFNc0I7WUFDTjVDLFFBQVFBO1lBQ1J1QixlQUFlQTtZQUNmQyxPQUFPQTtZQUNQQyxlQUFlLENBQUMsWUFBWSxFQUFFZSxJQUFFLEdBQUc7WUFDbkNkLGdCQUFnQixDQUFDLE1BQU0sRUFBRWMsSUFBRSxFQUFFLFlBQVksQ0FBQztRQUM1QztJQUNGO0FBQ0YiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcU3RvdWZhXFxEZXNrdG9wXFxwZmVcXFBmZVxcYXBwXFxhcGlcXGFkbWluXFxkYXNoYm9hcmRcXHJlY2VudC1vcmRlcnNcXHJvdXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcclxuaW1wb3J0IHsgZ2V0U2VydmVyU2Vzc2lvbiB9IGZyb20gJ25leHQtYXV0aC9uZXh0JztcclxuaW1wb3J0IHsgYXV0aE9wdGlvbnMgfSBmcm9tICdAL2xpYi9hdXRoJztcclxuaW1wb3J0IHByaXNtYSBmcm9tICdAL2xpYi9wcmlzbWEnO1xyXG5cclxuLy8gRm9uY3Rpb24gcG91ciBnw6lyZXIgbGEgc8OpcmlhbGlzYXRpb24gZGVzIEJpZ0ludFxyXG5mdW5jdGlvbiBoYW5kbGVCaWdJbnQoZGF0YSkge1xyXG4gIHJldHVybiBKU09OLnBhcnNlKFxyXG4gICAgSlNPTi5zdHJpbmdpZnkoZGF0YSwgKGtleSwgdmFsdWUpID0+XHJcbiAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gJ2JpZ2ludCcgPyB2YWx1ZS50b1N0cmluZygpIDogdmFsdWVcclxuICAgIClcclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKHJlcXVlc3QpIHtcclxuICB0cnkge1xyXG4gICAgY29uc29sZS5sb2coJ1tBUEldIEZldGNoaW5nIHJlY2VudCBvcmRlcnMgZGF0YSBmb3IgYWRtaW4gZGFzaGJvYXJkJyk7XHJcbiAgICBcclxuICAgIC8vIEV4dHJhY3QgbGltaXQgZnJvbSBxdWVyeSBwYXJhbXMgKGRlZmF1bHQgdG8gMTApXHJcbiAgICBjb25zdCB7IHNlYXJjaFBhcmFtcyB9ID0gbmV3IFVSTChyZXF1ZXN0LnVybCk7XHJcbiAgICBjb25zdCBsaW1pdCA9IHBhcnNlSW50KHNlYXJjaFBhcmFtcy5nZXQoJ2xpbWl0JykgfHwgJzEwJywgMTApO1xyXG4gICAgY29uc3QgcGFnZSA9IHBhcnNlSW50KHNlYXJjaFBhcmFtcy5nZXQoJ3BhZ2UnKSB8fCAnMScsIDEwKTtcclxuICAgIGNvbnN0IHNraXAgPSAocGFnZSAtIDEpICogbGltaXQ7XHJcbiAgICBcclxuICAgIC8vIENoZWNrIGF1dGhlbnRpY2F0aW9uXHJcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2VydmVyU2Vzc2lvbihhdXRoT3B0aW9ucyk7XHJcbiAgICBpZiAoIXNlc3Npb24gfHwgIXNlc3Npb24udXNlcikge1xyXG4gICAgICBjb25zb2xlLndhcm4oJ1tBUEldIFVuYXV0aG9yaXplZCBhY2Nlc3MgYXR0ZW1wdCB0byByZWNlbnQgb3JkZXJzIGRhdGEnKTtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdOb24gYXV0b3Jpc8OpJyB9LCB7IHN0YXR1czogNDAxIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBDaGVjayB1c2VyIHJvbGVcclxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcclxuICAgICAgd2hlcmU6IHsgaWQ6IHNlc3Npb24udXNlci5pZCB9LFxyXG4gICAgICBzZWxlY3Q6IHsgcm9sZTogdHJ1ZSB9XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgaWYgKCF1c2VyIHx8ICh1c2VyLnJvbGUgIT09ICdBRE1JTicgJiYgdXNlci5yb2xlICE9PSAnTUFOQUdFUicpKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybihgW0FQSV0gVXNlciAke3Nlc3Npb24udXNlci5lbWFpbH0gdHJpZWQgdG8gYWNjZXNzIHJlY2VudCBvcmRlcnMgd2l0aG91dCBwZXJtaXNzaW9uYCk7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnQWNjw6hzIHJlc3RyZWludCBhdXggYWRtaW5pc3RyYXRldXJzIGV0IG1hbmFnZXJzJyB9LCB7IHN0YXR1czogNDAzIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEdldCB0b3RhbCBjb3VudCBmb3IgcGFnaW5hdGlvblxyXG4gICAgY29uc3QgdG90YWxDb3VudCA9IGF3YWl0IHByaXNtYS5vcmRlci5jb3VudCgpO1xyXG4gICAgXHJcbiAgICAvLyBHZXQgcmVjZW50IG9yZGVyc1xyXG4gICAgY29uc3QgcmVjZW50T3JkZXJzID0gYXdhaXQgcHJpc21hLm9yZGVyLmZpbmRNYW55KHtcclxuICAgICAgc2tpcCxcclxuICAgICAgdGFrZTogbGltaXQsXHJcbiAgICAgIG9yZGVyQnk6IHsgY3JlYXRlZEF0OiAnZGVzYycgfSxcclxuICAgICAgaW5jbHVkZToge1xyXG4gICAgICAgIGN1c3RvbWVyOiB7XHJcbiAgICAgICAgICBzZWxlY3Q6IHtcclxuICAgICAgICAgICAgbmFtZTogdHJ1ZSxcclxuICAgICAgICAgICAgZW1haWw6IHRydWUsXHJcbiAgICAgICAgICAgIGltYWdlOiB0cnVlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgLy8gRm9ybWF0IHRoZSBvcmRlcnMgZm9yIHRoZSBkYXRhIHRhYmxlXHJcbiAgICBjb25zdCBmb3JtYXR0ZWRPcmRlcnMgPSByZWNlbnRPcmRlcnMubWFwKG9yZGVyID0+ICh7XHJcbiAgICAgIGlkOiBvcmRlci5pZCxcclxuICAgICAgbnVtYmVyOiBvcmRlci5udW1iZXIsXHJcbiAgICAgIGRhdGU6IG9yZGVyLmNyZWF0ZWRBdCxcclxuICAgICAgc3RhdHVzOiBvcmRlci5zdGF0dXMsXHJcbiAgICAgIHBheW1lbnRTdGF0dXM6IG9yZGVyLnBheW1lbnRTdGF0dXMsXHJcbiAgICAgIHRvdGFsOiBvcmRlci50b3RhbCxcclxuICAgICAgY3VzdG9tZXJfbmFtZTogb3JkZXIuY3VzdG9tZXI/Lm5hbWUgfHwgJ0NsaWVudCBpbmNvbm51JyxcclxuICAgICAgY3VzdG9tZXJfZW1haWw6IG9yZGVyLmN1c3RvbWVyPy5lbWFpbCB8fCAnLSdcclxuICAgIH0pKTtcclxuICAgIFxyXG4gICAgY29uc29sZS5sb2coYFtBUEldIFN1Y2Nlc3NmdWxseSByZXRyaWV2ZWQgJHtmb3JtYXR0ZWRPcmRlcnMubGVuZ3RofSByZWNlbnQgb3JkZXJzIGZvciBwYWdlICR7cGFnZX1gKTtcclxuICAgIFxyXG4gICAgLy8gU8OpcmlhbGlzZXIgbGVzIGRvbm7DqWVzIHBvdXIgw6l2aXRlciBsZXMgcHJvYmzDqG1lcyBhdmVjIEJpZ0ludFxyXG4gICAgY29uc3QgcmVzcG9uc2VEYXRhID0gaGFuZGxlQmlnSW50KHtcclxuICAgICAgZGF0YTogZm9ybWF0dGVkT3JkZXJzLFxyXG4gICAgICB0b3RhbDogdG90YWxDb3VudCxcclxuICAgICAgcGFnZSxcclxuICAgICAgbGltaXQsXHJcbiAgICAgIHRvdGFsUGFnZXM6IE1hdGguY2VpbCh0b3RhbENvdW50IC8gbGltaXQpXHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHJlc3BvbnNlRGF0YSk7XHJcbiAgICBcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihgW0FQSV0gRXJyb3IgZmV0Y2hpbmcgcmVjZW50IG9yZGVycyBkYXRhOiAke2Vycm9yLm1lc3NhZ2V9YCk7XHJcbiAgICBcclxuICAgIC8vIEluIGRldmVsb3BtZW50LCByZXR1cm4gZGVtbyBkYXRhIGlmIERCIGVycm9yIG9jY3Vyc1xyXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdbQVBJXSBSZXR1cm5pbmcgZGVtbyBvcmRlcnMgZGF0YScpO1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xyXG4gICAgICAgIGRhdGE6IGdlbmVyYXRlRGVtb09yZGVycyhsaW1pdCksXHJcbiAgICAgICAgdG90YWw6IDMwLFxyXG4gICAgICAgIHBhZ2UsXHJcbiAgICAgICAgbGltaXQsXHJcbiAgICAgICAgdG90YWxQYWdlczogM1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdFcnJldXIgbG9ycyBkZSBsYSByw6ljdXDDqXJhdGlvbiBkZXMgY29tbWFuZGVzIHLDqWNlbnRlcycgfSwgeyBzdGF0dXM6IDUwMCB9KTtcclxuICB9XHJcbn1cclxuXHJcbi8vIEhlbHBlciBmdW5jdGlvbiB0byBnZW5lcmF0ZSBkZW1vIG9yZGVycyBmb3IgZGV2ZWxvcG1lbnRcclxuZnVuY3Rpb24gZ2VuZXJhdGVEZW1vT3JkZXJzKGNvdW50ID0gMTApIHtcclxuICBjb25zdCBzdGF0dXNlcyA9IFsnUEVORElORycsICdQUk9DRVNTSU5HJywgJ1NISVBQRUQnLCAnREVMSVZFUkVEJywgJ0NBTkNFTExFRCddO1xyXG4gIGNvbnN0IHBheW1lbnRTdGF0dXNlcyA9IFsnUEFJRCcsICdQRU5ESU5HJywgJ0ZBSUxFRCcsICdSRUZVTkRFRCddO1xyXG4gIFxyXG4gIHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiBjb3VudCB9LCAoXywgaSkgPT4ge1xyXG4gICAgY29uc3Qgb3JkZXJOdW1iZXIgPSBgT1JELSR7TWF0aC5mbG9vcigxMDAwMDAgKyBNYXRoLnJhbmRvbSgpICogOTAwMDAwKX1gO1xyXG4gICAgY29uc3Qgb3JkZXJEYXRlID0gbmV3IERhdGUoRGF0ZS5ub3coKSAtIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDMwKSAqIDI0ICogNjAgKiA2MCAqIDEwMDApO1xyXG4gICAgY29uc3QgdG90YWwgPSBNYXRoLmZsb29yKDUwICsgTWF0aC5yYW5kb20oKSAqIDk1MCk7XHJcbiAgICBjb25zdCBzdGF0dXMgPSBzdGF0dXNlc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzdGF0dXNlcy5sZW5ndGgpXTtcclxuICAgIGNvbnN0IHBheW1lbnRTdGF0dXMgPSBwYXltZW50U3RhdHVzZXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcGF5bWVudFN0YXR1c2VzLmxlbmd0aCldO1xyXG4gICAgXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBpZDogYGRlbW8tJHtpfWAsXHJcbiAgICAgIG51bWJlcjogb3JkZXJOdW1iZXIsXHJcbiAgICAgIGRhdGU6IG9yZGVyRGF0ZSxcclxuICAgICAgc3RhdHVzOiBzdGF0dXMsXHJcbiAgICAgIHBheW1lbnRTdGF0dXM6IHBheW1lbnRTdGF0dXMsXHJcbiAgICAgIHRvdGFsOiB0b3RhbCxcclxuICAgICAgY3VzdG9tZXJfbmFtZTogYENsaWVudCBEZW1vICR7aSsxfWAsXHJcbiAgICAgIGN1c3RvbWVyX2VtYWlsOiBgY2xpZW50JHtpKzF9QGV4YW1wbGUuY29tYFxyXG4gICAgfTtcclxuICB9KTtcclxufSAiXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiZ2V0U2VydmVyU2Vzc2lvbiIsImF1dGhPcHRpb25zIiwicHJpc21hIiwiaGFuZGxlQmlnSW50IiwiZGF0YSIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsImtleSIsInZhbHVlIiwidG9TdHJpbmciLCJHRVQiLCJyZXF1ZXN0IiwiY29uc29sZSIsImxvZyIsInNlYXJjaFBhcmFtcyIsIlVSTCIsInVybCIsImxpbWl0IiwicGFyc2VJbnQiLCJnZXQiLCJwYWdlIiwic2tpcCIsInNlc3Npb24iLCJ1c2VyIiwid2FybiIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsImlkIiwic2VsZWN0Iiwicm9sZSIsImVtYWlsIiwidG90YWxDb3VudCIsIm9yZGVyIiwiY291bnQiLCJyZWNlbnRPcmRlcnMiLCJmaW5kTWFueSIsInRha2UiLCJvcmRlckJ5IiwiY3JlYXRlZEF0IiwiaW5jbHVkZSIsImN1c3RvbWVyIiwibmFtZSIsImltYWdlIiwiZm9ybWF0dGVkT3JkZXJzIiwibWFwIiwibnVtYmVyIiwiZGF0ZSIsInBheW1lbnRTdGF0dXMiLCJ0b3RhbCIsImN1c3RvbWVyX25hbWUiLCJjdXN0b21lcl9lbWFpbCIsImxlbmd0aCIsInJlc3BvbnNlRGF0YSIsInRvdGFsUGFnZXMiLCJNYXRoIiwiY2VpbCIsIm1lc3NhZ2UiLCJwcm9jZXNzIiwiZ2VuZXJhdGVEZW1vT3JkZXJzIiwic3RhdHVzZXMiLCJwYXltZW50U3RhdHVzZXMiLCJBcnJheSIsImZyb20iLCJfIiwiaSIsIm9yZGVyTnVtYmVyIiwiZmxvb3IiLCJyYW5kb20iLCJvcmRlckRhdGUiLCJEYXRlIiwibm93Il0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/admin/dashboard/recent-orders/route.js\n");

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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fdashboard%2Frecent-orders%2Froute&page=%2Fapi%2Fadmin%2Fdashboard%2Frecent-orders%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fdashboard%2Frecent-orders%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fdashboard%2Frecent-orders%2Froute&page=%2Fapi%2Fadmin%2Fdashboard%2Frecent-orders%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fdashboard%2Frecent-orders%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Stoufa_Desktop_pfe_Pfe_app_api_admin_dashboard_recent_orders_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/admin/dashboard/recent-orders/route.js */ \"(rsc)/./app/api/admin/dashboard/recent-orders/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/admin/dashboard/recent-orders/route\",\n        pathname: \"/api/admin/dashboard/recent-orders\",\n        filename: \"route\",\n        bundlePath: \"app/api/admin/dashboard/recent-orders/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Stoufa\\\\Desktop\\\\pfe\\\\Pfe\\\\app\\\\api\\\\admin\\\\dashboard\\\\recent-orders\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_Stoufa_Desktop_pfe_Pfe_app_api_admin_dashboard_recent_orders_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhZG1pbiUyRmRhc2hib2FyZCUyRnJlY2VudC1vcmRlcnMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmFkbWluJTJGZGFzaGJvYXJkJTJGcmVjZW50LW9yZGVycyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmFkbWluJTJGZGFzaGJvYXJkJTJGcmVjZW50LW9yZGVycyUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNTdG91ZmElNUNEZXNrdG9wJTVDcGZlJTVDUGZlJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNTdG91ZmElNUNEZXNrdG9wJTVDcGZlJTVDUGZlJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUN5QztBQUN0SDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcU3RvdWZhXFxcXERlc2t0b3BcXFxccGZlXFxcXFBmZVxcXFxhcHBcXFxcYXBpXFxcXGFkbWluXFxcXGRhc2hib2FyZFxcXFxyZWNlbnQtb3JkZXJzXFxcXHJvdXRlLmpzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hZG1pbi9kYXNoYm9hcmQvcmVjZW50LW9yZGVycy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2FkbWluL2Rhc2hib2FyZC9yZWNlbnQtb3JkZXJzXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9hZG1pbi9kYXNoYm9hcmQvcmVjZW50LW9yZGVycy9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXFN0b3VmYVxcXFxEZXNrdG9wXFxcXHBmZVxcXFxQZmVcXFxcYXBwXFxcXGFwaVxcXFxhZG1pblxcXFxkYXNoYm9hcmRcXFxccmVjZW50LW9yZGVyc1xcXFxyb3V0ZS5qc1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fdashboard%2Frecent-orders%2Froute&page=%2Fapi%2Fadmin%2Fdashboard%2Frecent-orders%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fdashboard%2Frecent-orders%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/oauth","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fdashboard%2Frecent-orders%2Froute&page=%2Fapi%2Fadmin%2Fdashboard%2Frecent-orders%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fdashboard%2Frecent-orders%2Froute.js&appDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CStoufa%5CDesktop%5Cpfe%5CPfe&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();