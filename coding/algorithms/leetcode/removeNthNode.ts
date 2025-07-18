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

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  let totalNumbers = 1;
  const findTotal = (node: ListNode | null, index: number) => {
    if (node?.next) {
      const lastNode = findTotal(node.next, index + 1);
      if (lastNode && lastNode.next === null) {
        totalNumbers = index + 1;
      }
    }
    return node;
  };

  findTotal(head, 1);

  const iterateNote = (node: ListNode | null, index: number = totalNumbers) => {
    if (node && n === totalNumbers) {
      head = node.next ?? null;
    } else if (node && index - 1 === n) {
      node.next = node.next?.next ?? null;
    } else {
      if (node?.next) {
        return iterateNote(node.next, index - 1);
      } else {
        return node;
      }
    }
  };

  iterateNote(head);

  return head;
}

console.log(
  JSON.stringify(
    removeNthFromEnd(
      {
        val: 1,
        next: {
          val: 2,
          next: { val: 3, next: { val: 4, next: { val: 5, next: null } } },
        },
      },
      2
    )
  )
);

console.log(
  JSON.stringify(
    removeNthFromEnd(
      {
        val: 1,
      },
      1
    )
  )
);

console.log(
  JSON.stringify(
    removeNthFromEnd(
      {
        val: 1,
        next: {
          val: 2,
          next: null,
        },
      },
      1
    )
  )
);
