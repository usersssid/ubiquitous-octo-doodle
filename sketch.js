let snake;
let rez = 20;
let food;
let flipvideo;
let w;
let h;
let video;
let label;
let classifier;

function setup() {

  video = createCapture(VIDEO);
  video.hide();
  flipvideo = ml5.flipImage(video);
  classifyvideo();
  createCanvas(640, 480);
  w = floor(width / rez)
  h = floor(height / rez);
  frameRate(5);
  snake = new Snake();
  foodlocation();
}

function foodlocation() {
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x, y);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    snake.setDir(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    snake.setDir(1, 0);
  } else if (keyCode === DOWN_ARROW) {
    snake.setDir(0, 1);
  } else if (keyCode === UP_ARROW) {
    snake.setDir(0, -1);
  } else if (key == ' ') {
    snake.grow();
  }
}

function draw() {
  background(220);
  image(flipvideo, 0, 0);
  text(label, 10, 50)
  textSize(32);
fill(255)
  scale(rez);
  if (snake.eat(food)) {
    foodlocation();
  }
  snake.update();
  snake.show();
  if (snake.endgame()) {
    print('end game');
    background(255, 0, 0);
    noLoop();
  }
  noStroke();
  fill(255, 0, 0);
  rect(food.x, food.y, 1, 1);
}

function classifyvideo() {
  flipvideo = ml5.flipImage(video)
  classifier.classify(flipvideo, gotResults);
}

function preload() {
  classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/rbWY5cS_p/model.json');
}

function gotResults(results, error) {
  if (error) {
    console.log(error);
    return true;
  } else {
    label = results[0].label;
    classifyvideo();
  }
}