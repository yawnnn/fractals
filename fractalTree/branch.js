class Branch {

  constructor(begin, end, max=10) {
    this.begin = begin;
    this.end = end;
    this.children = [];
    this.parent = null;
  }

  show() {
    stroke(255);
    line(this.begin.x, this.begin.y, this.end.x, this.end.y);
  }

  branch(angle=PI/4) {
    //get direction of current branch
    let direction = p5.Vector.sub(this.end, this.begin);
    direction.rotate(angle);
    //make new branch shorter
    direction.mult(0.67);
    let newEnd1 = p5.Vector.add(this.end, direction);
    direction.rotate(angle * -2);
    let newEnd2 = p5.Vector.add(this.end, direction);

    this.children[0] = new Branch(this.end, newEnd1);
    this.children[1] = new Branch(this.end, newEnd2);

    this.giveParents();

    return this.children;
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

  giveParents() {
    this.children[0].addParent(this);
    this.children[1].addParent(this);
  }

  addParent(parent) {
    this.parent = parent;
  }

  //These functions aren't really used... yet

  rotate() {
    let direction = p5.Vector.sub(this.end, this.begin);

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
