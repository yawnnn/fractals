class Branch {

  constructor(begin, end, max=10) {
    this.begin = begin;
    this.end = end;
    this.children = [];
    this.parent = null;
  }

  show() {
    //prototype
  }

  branch() {
    //prototype
  }

  getTree() {
    let tree = [this];
    if (this.children != 0) {
      for (let i = 0; i < 2; i++) {
        tree = tree.concat(this.children[i].getTree())
      }
    }
    return tree;
  }

  reset() {
    this.children = [];
  }

  addParent(parent) {
    this.parent = parent;
  }

  giveParents() {
    this.children[0].addParent(this);
    this.children[1].addParent(this);
  }

  //These functions aren't really used... yet

  isParent() {
    if (this.children != 0) {
      return true;
    } else {
      return false;
    }
  }

  isRoot() {
    if (this.getParent() == null) {
      return true;
    }
  }

  getParent() {
    return this.parent;
  }

  getDepth(depth=1) {
    if (this.parent) {
      return this.parent.getDepth(depth + 1);
    }
    return depth;
  }

  getTreeDepth(depth=1) {
    if (this.children != 0) {
      return (this.children[0].getTreeDepth(depth + 1));
    }
    return depth;
  }

  getLeaves() {
    let leaves = [];
    if (this.children != 0) {
      for (let i = 0; i < 2; i++) {
        leaves = leaves.concat(this.children[i].getLeaves());
      }
    } else {
      return [this];
    }
    return leaves;
  }
}
