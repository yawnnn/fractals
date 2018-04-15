let root;
let lastBranch;
let slider;
let len;
let slider_step = 0.1;

/**
  * mode can be on 0 or 1 (static or dynamic).
  * It's just a quick thing that i wanted to add (the main thing is the static one).
  * By dynamic i mean that the tree's branches will change the angle accordingly to the slider
  * value while you are moving the slider (and the angles will all be the same in every branch level)
  * while in static mode you add every branch manually with the inclination that you want for every level
  * the "dynamic" class is the product of Lay-Z-ness syndrome also called the sleeping rapper syndrome
  * (idk if you get the joke but whatever don't look at that class it's ugly)
  */
let mode = 1;

// This is a little thing for my fun backed up online so don't expect much

function setup() {
  createCanvas(1920, 1080);

  let len = height/5;
  slider = createSlider(0, PI, PI / 6, 0.01);
  slider.style('width', '200px');

  if (mode) {
    root = new TreeBranchDynamic(3.8);
  } else {
    let begin = createVector(width/2, height);
    let end = createVector(width/2, height - len);
    root = new TreeBranchStatic(begin, end);
    lastBranch = [root];
  }

  addButtons();

  //tell slider value every 2sec
  setInterval(logSliderValue, 2000);
}

function draw() {
  background(51);
  stroke(255);

  if (mode) {
    root.show(slider.value(), len);
  } else {
    let tree = root.getTree();
    for (let i = 0; i < tree.length; i++) {
      tree[i].show();
    }
  }
}

function logSliderValue() {
  console.log(slider.value());
}

function addButtons() {
  //plus and minus are used to be more precise with the slider
  let plus = createButton('+');
  let minus = createButton('-');
  let addBranch = createButton('add branch');
  let reset = createButton('reset');

  plus.mousePressed(function() {
    slider.value(slider.value() + slider_step);
  });

  minus.mousePressed(function() {
    slider.value(slider.value() - slider_step);
  });

  addBranch.mousePressed(function() {
    // You might notice that it's not that great the dynamic version
    if (mode) {
      root.min_length -= root.min_length - (root.min_length * 0.67);
    } else {
      let temp = [];
      for (let i = 0; i < lastBranch.length; i++) {
        temp = temp.concat(lastBranch[i].branch(slider.value()));
      }
      lastBranch = temp;
    }
  });

  reset.mousePressed(function() {
    root.reset();
    lastBranch = [root];
  });
}
