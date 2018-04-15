
/* I tried to implement the thing properly by extending the branch class and everything
 * but i got annoyed and i stopped, so i just took the code from this https://github.com/CodingTrain/website/tree/master/CodingChallenges/CC_14_FractalTree
 * (which was the inspiration for the whole thing) and put it in a class
 */
class TreeBranchDynamic {

  constructor(min_length=3.8) {
    this.min_length = min_length;
  }

  show(angle=PI/4, len=height/5) {
    translate(width/2, height);
    this.branch(angle, len);
  }

  branch(angle, len) {
    if (len > this.min_length) {
      line(0, 0, 0, -len);
      translate(0, -len);
      push();
      rotate(angle);
      this.branch(angle, len * 0.67);
      pop();
      push();
      rotate(-angle);
      this.branch(angle, len * 0.67);
      pop();
    }
  }

  reset() {
    slider.value(PI/6);
    this.min_length = 3.8;
  }
}
