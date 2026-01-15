"use strict";

let rect_1_x;
let rect_1_y;

let rect_2_x;
let rect_2_y;

let rect_3_x;
let rect_3_y;

let r;
let g;
let b;

let h;
let w;

function setup() {
    createCanvas(windowWidth, windowHeight)
    background(0, 0, 0)

    rect_1_x = 40
    rect_1_y = 40

    rect_2_x = 200
    rect_2_y = 200

    rect_3_x = 400
    rect_3_y = 400

    r = 100
    g = 200
    b = 0

    h = 100
    w = 75


}

function draw() {
    background(0, 0, 0)


    if (mouseIsPressed) {
        rect_1_y = rect_1_y % height + 10
    }
    
    rect_3_y = rect_3_y % height + 10 

    drawRect(rect_1_x, rect_1_y, w, h, r, g, b)
    drawRect(rect_2_x, rect_2_y, w, h, r, g, b)
    drawRect(rect_3_x, rect_3_y, w, h, r, g, b)
}

function drawRect(x, y, w, h, r, g, b) {

    fill(r, g, b)
    rect(x, y, w, h)


}

function keyPressed() {
    if (key === ' ') {
        rect_2_x = rect_2_x % width + 100
    }
}



