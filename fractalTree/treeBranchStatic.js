class TreeBranchStatic extends Branch {

  constructor(begin, end, max=10) {
    super(begin, end, max);
  }

  show() {
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

    this.children[0] = new TreeBranchStatic(this.end, newEnd1);
    this.children[1] = new TreeBranchStatic(this.end, newEnd2);

    this.giveParents();

    return this.children;
  }
}
