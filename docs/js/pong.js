class Ball {
    constructor(x, y, r) {
        this.position = new p5.Vector(x, y);
        this.velocity = p5.Vector.random2D();
        this.velocity.mult(3);
        this.r = r;
        this.m = r * 0.1;
    }
    update() {
        this.position.add(this.velocity);
    }
  
    checkBoundaryCollision() {
        if (this.position.x > width - this.r) {
            this.position.x = width - this.r;
            this.velocity.x *= -1;
        } else if (this.position.x < this.r) {
            this.position.x = this.r;
            this.velocity.x *= -1;
        } else if (this.position.y > height - this.r) {
            this.position.y = height - this.r;
            this.velocity.y *= -1;
        } else if (this.position.y < this.r) {
            this.position.y = this.r;
            this.velocity.y *= -1;
        }
    }

    checkPlayerCollision(playerX, playerY, playerWidth, playerHeight) {
        if ((this.position.y > playerY - this.r) && (this.position.x >= playerX) && (this.position.x <= playerX+playerWidth)) {
            this.position.y = playerY - this.r;
            this.velocity.y *= -1;
        }
    }

    checkTargetCollision(target) {
        if (target.show && (this.position.y - this.r < (target.position.y + target.h)) && (this.position.x >= target.position.x) && (this.position.x <= target.position.x+target.w)) {
            this.position.y = target.position.y + target.h + this.r;
            this.velocity.y *= -1;
            target.show = false;
        }
    }
  
    display() {
        noStroke();
        fill(255);
        ellipse(this.position.x, this.position.y, this.r * 2, this.r * 2);
    }
}

class Target {
    constructor(x, y, w, h) {
        this.position = new p5.Vector(x, y);
        this.w = w;
        this.h = h;
        this.show = true;
    }

    windowResized(x, y, w, h) {
        this.position.x = x;
        this.position.y = y;
        this.w = w;
        this.h = h;
    }
    
    display() {
        //stroke(255);
        if(this.show) {
            noStroke();
            fill(255);
            rect(this.position.x, this.position.y, this.w, this.h);
        }
    }
}

/* PONG */
var i;
var parent;
var canvas;
let playerX = 0;
let playerWidth = 100;
let playerHeight = 20;

if (window.matchMedia("(max-width: 790px)").matches) {
    parent = document.getElementById("innerMiniGameMobile");
} else {
    parent = document.getElementById("innerMiniGame");
}
let spacerSize = 20;
let targetWidth = (parent.clientWidth-(5*spacerSize))/4;
let targetHeight = 40;

let ball = new Ball(100, 400, 20);
let targets = [
    new Target(spacerSize, spacerSize, targetWidth, targetHeight), 
    new Target(targetWidth+spacerSize*2, spacerSize, targetWidth, targetHeight),
    new Target(2*targetWidth+spacerSize*3, spacerSize, targetWidth, targetHeight),
    new Target(3*targetWidth+spacerSize*4, spacerSize, targetWidth, targetHeight),
    new Target(spacerSize, targetHeight+spacerSize*2, targetWidth, targetHeight), 
    new Target(targetWidth+spacerSize*2, targetHeight+spacerSize*2, targetWidth, targetHeight),
    new Target(2*targetWidth+spacerSize*3, targetHeight+spacerSize*2, targetWidth, targetHeight),
    new Target(3*targetWidth+spacerSize*4, targetHeight+spacerSize*2, targetWidth, targetHeight)];

function setup() {
    canvas = createCanvas(parent.clientWidth, parent.clientHeight);
    canvas.parent(parent.id);
    //canvas.style('z-index', '0');

    playerWidth = parent.clientWidth/5;
    noStroke();
    fill(255);
}

function draw() {
    background('#0827F5');
    if(mouseX<0) playerX = 0
    else if (mouseX>(parent.clientWidth-playerWidth)) playerX = parent.clientWidth-playerWidth
    else {
        playerX = mouseX;
    }
    rect(playerX, parent.clientHeight-30, playerWidth, playerHeight);

    ball.update();
    ball.display();
    ball.checkBoundaryCollision();
    ball.checkPlayerCollision(playerX, parent.clientHeight-30, playerWidth, playerHeight)
    for(i=0; i<targets.length; i++) {
        ball.checkTargetCollision(targets[i]);
        targets[i].display();
    }
}

function windowResized() {
    resizeCanvas(parent.clientWidth, parent.clientHeight);
    playerWidth = parent.clientWidth/5;
    
    targetWidth = (parent.clientWidth-(5*spacerSize))/4;
    if(targets[0].show) targets[0].windowResized(spacerSize, spacerSize, targetWidth, targetHeight);
    if(targets[1].show) targets[1].windowResized(targetWidth+spacerSize*2, spacerSize, targetWidth, targetHeight);
    if(targets[2].show) targets[2].windowResized(2*targetWidth+spacerSize*3, spacerSize, targetWidth, targetHeight);
    if(targets[3].show) targets[3].windowResized(3*targetWidth+spacerSize*4, spacerSize, targetWidth, targetHeight);
    if(targets[4].show) targets[4].windowResized(spacerSize, targetHeight+spacerSize*2, targetWidth, targetHeight);
    if(targets[5].show) targets[5].windowResized(targetWidth+spacerSize*2, targetHeight+spacerSize*2, targetWidth, targetHeight);
    if(targets[6].show) targets[6].windowResized(2*targetWidth+spacerSize*3, targetHeight+spacerSize*2, targetWidth, targetHeight);
    if(targets[7].show) targets[7].windowResized(3*targetWidth+spacerSize*4, targetHeight+spacerSize*2, targetWidth, targetHeight);
}

function touchMoved() {
    return touchScrollEnabled;
}