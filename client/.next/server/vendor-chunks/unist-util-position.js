"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/unist-util-position";
exports.ids = ["vendor-chunks/unist-util-position"];
exports.modules = {

/***/ "(rsc)/./node_modules/unist-util-position/lib/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/unist-util-position/lib/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   pointEnd: () => (/* binding */ pointEnd),\n/* harmony export */   pointStart: () => (/* binding */ pointStart),\n/* harmony export */   position: () => (/* binding */ position)\n/* harmony export */ });\n/**\n * @typedef {import('unist').Node} Node\n * @typedef {import('unist').Point} Point\n * @typedef {import('unist').Position} Position\n */ /**\n * @typedef NodeLike\n * @property {string} type\n * @property {PositionLike | null | undefined} [position]\n *\n * @typedef PositionLike\n * @property {PointLike | null | undefined} [start]\n * @property {PointLike | null | undefined} [end]\n *\n * @typedef PointLike\n * @property {number | null | undefined} [line]\n * @property {number | null | undefined} [column]\n * @property {number | null | undefined} [offset]\n */ /**\n * Get the ending point of `node`.\n *\n * @param node\n *   Node.\n * @returns\n *   Point.\n */ const pointEnd = point(\"end\");\n/**\n * Get the starting point of `node`.\n *\n * @param node\n *   Node.\n * @returns\n *   Point.\n */ const pointStart = point(\"start\");\n/**\n * Get the positional info of `node`.\n *\n * @param {'end' | 'start'} type\n *   Side.\n * @returns\n *   Getter.\n */ function point(type) {\n    return point;\n    /**\n   * Get the point info of `node` at a bound side.\n   *\n   * @param {Node | NodeLike | null | undefined} [node]\n   * @returns {Point | undefined}\n   */ function point(node) {\n        const point = node && node.position && node.position[type] || {};\n        if (typeof point.line === \"number\" && point.line > 0 && typeof point.column === \"number\" && point.column > 0) {\n            return {\n                line: point.line,\n                column: point.column,\n                offset: typeof point.offset === \"number\" && point.offset > -1 ? point.offset : undefined\n            };\n        }\n    }\n}\n/**\n * Get the positional info of `node`.\n *\n * @param {Node | NodeLike | null | undefined} [node]\n *   Node.\n * @returns {Position | undefined}\n *   Position.\n */ function position(node) {\n    const start = pointStart(node);\n    const end = pointEnd(node);\n    if (start && end) {\n        return {\n            start,\n            end\n        };\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvdW5pc3QtdXRpbC1wb3NpdGlvbi9saWIvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7Q0FJQyxHQUVEOzs7Ozs7Ozs7Ozs7O0NBYUMsR0FFRDs7Ozs7OztDQU9DLEdBQ00sTUFBTUEsV0FBV0MsTUFBTSxPQUFNO0FBRXBDOzs7Ozs7O0NBT0MsR0FDTSxNQUFNQyxhQUFhRCxNQUFNLFNBQVE7QUFFeEM7Ozs7Ozs7Q0FPQyxHQUNELFNBQVNBLE1BQU1FLElBQUk7SUFDakIsT0FBT0Y7SUFFUDs7Ozs7R0FLQyxHQUNELFNBQVNBLE1BQU1HLElBQUk7UUFDakIsTUFBTUgsUUFBUSxRQUFTRyxLQUFLQyxRQUFRLElBQUlELEtBQUtDLFFBQVEsQ0FBQ0YsS0FBSyxJQUFLLENBQUM7UUFFakUsSUFDRSxPQUFPRixNQUFNSyxJQUFJLEtBQUssWUFDdEJMLE1BQU1LLElBQUksR0FBRyxLQUNiLE9BQU9MLE1BQU1NLE1BQU0sS0FBSyxZQUN4Qk4sTUFBTU0sTUFBTSxHQUFHLEdBQ2Y7WUFDQSxPQUFPO2dCQUNMRCxNQUFNTCxNQUFNSyxJQUFJO2dCQUNoQkMsUUFBUU4sTUFBTU0sTUFBTTtnQkFDcEJDLFFBQ0UsT0FBT1AsTUFBTU8sTUFBTSxLQUFLLFlBQVlQLE1BQU1PLE1BQU0sR0FBRyxDQUFDLElBQ2hEUCxNQUFNTyxNQUFNLEdBQ1pDO1lBQ1I7UUFDRjtJQUNGO0FBQ0Y7QUFFQTs7Ozs7OztDQU9DLEdBQ00sU0FBU0osU0FBU0QsSUFBSTtJQUMzQixNQUFNTSxRQUFRUixXQUFXRTtJQUN6QixNQUFNTyxNQUFNWCxTQUFTSTtJQUVyQixJQUFJTSxTQUFTQyxLQUFLO1FBQ2hCLE9BQU87WUFBQ0Q7WUFBT0M7UUFBRztJQUNwQjtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3VuaXN0LXV0aWwtcG9zaXRpb24vbGliL2luZGV4LmpzP2JhNWEiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCd1bmlzdCcpLk5vZGV9IE5vZGVcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ3VuaXN0JykuUG9pbnR9IFBvaW50XG4gKiBAdHlwZWRlZiB7aW1wb3J0KCd1bmlzdCcpLlBvc2l0aW9ufSBQb3NpdGlvblxuICovXG5cbi8qKlxuICogQHR5cGVkZWYgTm9kZUxpa2VcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB0eXBlXG4gKiBAcHJvcGVydHkge1Bvc2l0aW9uTGlrZSB8IG51bGwgfCB1bmRlZmluZWR9IFtwb3NpdGlvbl1cbiAqXG4gKiBAdHlwZWRlZiBQb3NpdGlvbkxpa2VcbiAqIEBwcm9wZXJ0eSB7UG9pbnRMaWtlIHwgbnVsbCB8IHVuZGVmaW5lZH0gW3N0YXJ0XVxuICogQHByb3BlcnR5IHtQb2ludExpa2UgfCBudWxsIHwgdW5kZWZpbmVkfSBbZW5kXVxuICpcbiAqIEB0eXBlZGVmIFBvaW50TGlrZVxuICogQHByb3BlcnR5IHtudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkfSBbbGluZV1cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZH0gW2NvbHVtbl1cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZH0gW29mZnNldF1cbiAqL1xuXG4vKipcbiAqIEdldCB0aGUgZW5kaW5nIHBvaW50IG9mIGBub2RlYC5cbiAqXG4gKiBAcGFyYW0gbm9kZVxuICogICBOb2RlLlxuICogQHJldHVybnNcbiAqICAgUG9pbnQuXG4gKi9cbmV4cG9ydCBjb25zdCBwb2ludEVuZCA9IHBvaW50KCdlbmQnKVxuXG4vKipcbiAqIEdldCB0aGUgc3RhcnRpbmcgcG9pbnQgb2YgYG5vZGVgLlxuICpcbiAqIEBwYXJhbSBub2RlXG4gKiAgIE5vZGUuXG4gKiBAcmV0dXJuc1xuICogICBQb2ludC5cbiAqL1xuZXhwb3J0IGNvbnN0IHBvaW50U3RhcnQgPSBwb2ludCgnc3RhcnQnKVxuXG4vKipcbiAqIEdldCB0aGUgcG9zaXRpb25hbCBpbmZvIG9mIGBub2RlYC5cbiAqXG4gKiBAcGFyYW0geydlbmQnIHwgJ3N0YXJ0J30gdHlwZVxuICogICBTaWRlLlxuICogQHJldHVybnNcbiAqICAgR2V0dGVyLlxuICovXG5mdW5jdGlvbiBwb2ludCh0eXBlKSB7XG4gIHJldHVybiBwb2ludFxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHBvaW50IGluZm8gb2YgYG5vZGVgIGF0IGEgYm91bmQgc2lkZS5cbiAgICpcbiAgICogQHBhcmFtIHtOb2RlIHwgTm9kZUxpa2UgfCBudWxsIHwgdW5kZWZpbmVkfSBbbm9kZV1cbiAgICogQHJldHVybnMge1BvaW50IHwgdW5kZWZpbmVkfVxuICAgKi9cbiAgZnVuY3Rpb24gcG9pbnQobm9kZSkge1xuICAgIGNvbnN0IHBvaW50ID0gKG5vZGUgJiYgbm9kZS5wb3NpdGlvbiAmJiBub2RlLnBvc2l0aW9uW3R5cGVdKSB8fCB7fVxuXG4gICAgaWYgKFxuICAgICAgdHlwZW9mIHBvaW50LmxpbmUgPT09ICdudW1iZXInICYmXG4gICAgICBwb2ludC5saW5lID4gMCAmJlxuICAgICAgdHlwZW9mIHBvaW50LmNvbHVtbiA9PT0gJ251bWJlcicgJiZcbiAgICAgIHBvaW50LmNvbHVtbiA+IDBcbiAgICApIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxpbmU6IHBvaW50LmxpbmUsXG4gICAgICAgIGNvbHVtbjogcG9pbnQuY29sdW1uLFxuICAgICAgICBvZmZzZXQ6XG4gICAgICAgICAgdHlwZW9mIHBvaW50Lm9mZnNldCA9PT0gJ251bWJlcicgJiYgcG9pbnQub2Zmc2V0ID4gLTFcbiAgICAgICAgICAgID8gcG9pbnQub2Zmc2V0XG4gICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEdldCB0aGUgcG9zaXRpb25hbCBpbmZvIG9mIGBub2RlYC5cbiAqXG4gKiBAcGFyYW0ge05vZGUgfCBOb2RlTGlrZSB8IG51bGwgfCB1bmRlZmluZWR9IFtub2RlXVxuICogICBOb2RlLlxuICogQHJldHVybnMge1Bvc2l0aW9uIHwgdW5kZWZpbmVkfVxuICogICBQb3NpdGlvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBvc2l0aW9uKG5vZGUpIHtcbiAgY29uc3Qgc3RhcnQgPSBwb2ludFN0YXJ0KG5vZGUpXG4gIGNvbnN0IGVuZCA9IHBvaW50RW5kKG5vZGUpXG5cbiAgaWYgKHN0YXJ0ICYmIGVuZCkge1xuICAgIHJldHVybiB7c3RhcnQsIGVuZH1cbiAgfVxufVxuIl0sIm5hbWVzIjpbInBvaW50RW5kIiwicG9pbnQiLCJwb2ludFN0YXJ0IiwidHlwZSIsIm5vZGUiLCJwb3NpdGlvbiIsImxpbmUiLCJjb2x1bW4iLCJvZmZzZXQiLCJ1bmRlZmluZWQiLCJzdGFydCIsImVuZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/unist-util-position/lib/index.js\n");

/***/ })

};
;