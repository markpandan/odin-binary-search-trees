class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.array = this.#configureArray(array);
    this.root = this.#buildTree(this.array);
  }

  // Configures the array to be sorted, and without any duplicates
  #configureArray(array) {
    return array
      .filter((value, index) => array.indexOf(value) === index)
      .sort((a, b) => {
        return a - b;
      });
  }

  #buildTree(array) {
    if (array.length == 0) return null;
    const mid = Math.floor((array.length - 1) / 2);

    const root = new Node(array[mid]);
    root.left = this.#buildTree(array.slice(0, mid));
    root.right = this.#buildTree(array.slice(mid + 1, array.length));

    return root;
  }

  #breadthfirst() {
    if (this.root === null) return;

    let queue = [];

    queue.push(this.root);

    for (let i = 0; i <= queue.length; i++) {
      let current = queue[index];

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }

    return queue;
  }

  #checkCallback(callback) {
    if (!callback)
      throw new Error("This function requires the callback parameter");
  }

  #rootToLeaf(root, height = -1) {
    if (!root) return height;

    const left = this.#rootToLeaf(root.left, height++);
    const right = this.#rootToLeaf(root.right, height++);

    return Math.max(left, right);
  }

  insert(value, root = this.root) {
    if (root === null) return new Node(value);

    if (root.data < value) root.right = this.insert(value, root.right);
    else if (root.data > value) root.left = this.insert(value, root.left);
    else
      throw new Error(
        "No duplicates allowed when inserting a new value into the tree."
      );

    return root;
  }

  deleteItem(value, root = this.root) {
    if (root === null) return;

    if (root.data < value) root.right = this.deleteItem(value, root.right);
    else if (root.data > value) root.left = this.deleteItem(value, root.left);
    else {
      if (root.left === null) return root.right;
      if (root.right === null) return root.left;

      let curr = root.right;
      while (curr !== null && curr.left !== null) {
        curr = curr.left;
      }

      root.data = curr.data;
      root.right = this.deleteItem(curr.data, root.right);
    }

    return root;
  }

  find(value) {
    let root = this.root;

    while (root != null) {
      if (root.data < value) root = root.right;
      else if (root.data > value) root = root.left;
      else return root;
    }

    return null;
  }

  levelOrder(callback) {
    this.#checkCallback(callback);

    let queue = this.#breadthfirst();

    for (let node of queue) {
      callback(node);
    }
  }

  inOrder(callback, root = this.root) {
    if (!root) return;
    this.#checkCallback;

    this.inOrder(callback, root.left);
    callback(root);
    this.inOrder(callback, root.right);
  }

  preOrder(callback, root = this.root) {
    if (!root) return;
    this.#checkCallback;

    callback(root);
    this.preOrder(callback, root.left);
    this.preOrder(callback, root.right);
  }

  postOrder(callback, root = this.root) {
    if (!root) return;
    this.#checkCallback;

    this.inOrder(callback, root.left);
    this.inOrder(callback, root.right);
    callback(root);
  }

  height(value) {
    let root = this.find(value);
    if (!root) return;

    return rootToLeaf(root);
  }

  depth(value) {
    let root = this.root;
    let depthValue = 0;

    while (root != null) {
      if (root.data < value) root = root.right;
      else if (root.data > value) root = root.left;
      else return depthValue;

      depthValue++;
    }

    return null;
  }

  isBalanced() {
    let left = this.#rootToLeaf(this.root.left, 1);
    let right = this.#rootToLeaf(this.root.right, 1);

    return Math.abs(left - right) <= 1;
  }

  rebalance() {}
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

// Sorted Array: [ 1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345 ]
let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(array);
console.log(tree.isBalanced());
prettyPrint(tree.root);
