/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */
var ListNode = /** @class */ (function () {
    function ListNode(val, next) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
    return ListNode;
}());
function removeNthFromEnd(head, n) {
    var totalNumbers = 0;
    var findTotal = function (node, index) {
        if (node === null || node === void 0 ? void 0 : node.next) {
            var lastNode = findTotal(node.next, index + 1);
            if (lastNode && lastNode.next === null) {
                totalNumbers = index + 1;
            }
        }
        return node;
    };
    findTotal(head, 1);
    var iterateNote = function (node, index) {
        var _a, _b, _c;
        if (index === void 0) { index = totalNumbers; }
        if (node && n === totalNumbers) {
            head = (_a = node.next) !== null && _a !== void 0 ? _a : null;
        }
        else if (node && index - 1 === n) {
            node.next = (_c = (_b = node.next) === null || _b === void 0 ? void 0 : _b.next) !== null && _c !== void 0 ? _c : null;
        }
        else {
            if (node === null || node === void 0 ? void 0 : node.next) {
                return iterateNote(node.next, index - 1);
            }
            else {
                return node;
            }
        }
    };
    iterateNote(head);
    return head;
}
console.log(JSON.stringify(removeNthFromEnd({
    val: 1,
    next: {
        val: 2,
        next: { val: 3, next: { val: 4, next: { val: 5, next: null } } },
    },
}, 2)));
console.log(JSON.stringify(removeNthFromEnd({
    val: 1,
}, 1)));
console.log(JSON.stringify(removeNthFromEnd({
    val: 1,
    next: {
        val: 2,
        next: null,
    },
}, 1)));
