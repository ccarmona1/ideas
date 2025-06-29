
class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    const number1 = BigInt(getNumberFromNode(l1));
    const number2 = BigInt(getNumberFromNode(l2));
    const numberString = String(number1 + number2);

    const newListNode: ListNode = Array.from(numberString).reduce((previousListNode, char) => {
        if (!previousListNode) {
            return new ListNode(char ? Number(char) : undefined)
        } else {
            return new ListNode(char ? Number(char) : undefined, previousListNode)
        }
    }, undefined as unknown as ListNode);

    return newListNode;
};

function getNumberFromNode(listNode: ListNode | null): string {
    if (listNode && listNode.next === null) {
        return listNode && listNode.val > -1 ? String(listNode.val) : '0';
    }
    const stringNumber = getNumberFromNode(listNode?.next ?? null);

    return listNode && listNode.val > -1 ? stringNumber + String(listNode.val) : stringNumber;
}

addTwoNumbers(
    { val: 1, next: { val: 0, next: { val: 0, next: null } } },
    { val: 0, next: { val: 0, next: { val: 1, next: null } } })