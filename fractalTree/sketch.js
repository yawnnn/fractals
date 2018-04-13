let root;
let lastBranch;
let slider;
let variation = 0.1;

//keep this thing just in case i wanna mess with it a little and because it's pretty

function setup() {
  createCanvas(1920, 1080);

  let len = height/5;
  slider = createSlider(0, PI, PI / 4, 0.01);
  slider.style('width', '200px');

  let begin = createVector(width/2, height);
  let end = createVector(width/2, height - len);
  root = new Branch(begin, end);
  lastBranch = [root];

  //plus and minus are used to be more precise with the slider
  let plus = createButton('+');
  let minus = createButton('-');
  let addBranch = createButton('add branch');
  let reset = createButton('reset');

  plus.mousePressed(function() {
    slider.value(slider.value() + variation);
  });

  minus.mousePressed(function() {
    slider.value(slider.value() - variation);
  });

  addBranch.mousePressed(function() {
    let temp = [];
    for (let i = 0; i < lastBranch.length; i++) {
      temp = temp.concat(lastBranch[i].branch(slider.value()));
    }
    lastBranch = temp;
  });

  reset.mousePressed(function() {
    root.reset();
    lastBranch = [root];
  });

  //console.log(plus.position(), minus.position(), addBranch.position(), reset.position(), test.position());

  //tell slider value every 2sec
  setInterval(logSliderValue, 2000);
}

function draw() {
  background(51);

  let tree = root.getTree();
  for (let i = 0; i < tree.length; i++) {
    tree[i].show();
  }
}

function logSliderValue() {
  console.log(slider.value());
}
