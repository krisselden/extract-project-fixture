/**
 * Walk tree following links
 * @param {import('../types').TreeNode} root
 */
export default function* walkTree(root) {
  const queue = [root];
  while (true) {
    const node = queue.pop();
    if (node === undefined) break;
    // queue is first in last out so we reverse children
    // and push link targets after
    const children = [...node.children.values()].reverse();
    for (const child of children) {
      queue.push(child);
      if (child.isLink) {
        queue.push(child.target);
      }
    }
    yield node;
  }
}
