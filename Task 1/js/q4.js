"use strict";

let rect_1_x;
let rect_1_y;

let rect_2_x;
let rect_2_y;

let rect_3_x;
let rect_3_y;

let rect_1_color;
let rect_2_color;
let rect_3_color;


let h;
let w;

function setup() {
    createCanvas(windowWidth, windowHeight)
    background(0, 0, 0)
    // background(255,255,255)

    rect_1_color = {
        r: 0,
        g: 100,
        b: 200
    };
    rect_2_color = {
        r: 10,
        g: 150,
        b: 180
    };
    rect_3_color = {
        r: 50,
        g: 50,
        b: 100
    };

    h = height
    w = width / 3


    rect_1_x = 0
    rect_1_y = 0

    rect_2_x = (width / 3)
    rect_2_y = 0

    rect_3_x = (width / 3) * 2
    rect_3_y = 0

    // r = 100
    // g = 200
    // b = 0




}

function draw() {
    background(0, 0, 0)

    if (mouseX < width / 3) {
        rect_1_color = { r: 255, g: 255, b: 255 }
    } else {
        rect_1_color = {
            r: 0,
            g: 100,
            b: 200
        };
    }

    if (mouseX > (width / 3) && mouseX < (width / 3) * 2) {
        rect_2_color = { r: 255, g: 255, b: 255 }
    } else {
        rect_2_color = {
            r: 10,
            g: 150,
            b: 180
        };
    }

    if (mouseX > (width / 3) * 2) {
        rect_3_color = { r: 255, g: 255, b: 255 }
    } else {
        rect_3_color = {
            r: 50,
            g: 50,
            b: 100
        };
    }

    drawRect(rect_1_x, rect_1_y, w, h,
        rect_1_color.r,
        rect_1_color.b,
        rect_1_color.b)
    drawRect(rect_2_x, rect_2_y, w, h,
        rect_2_color.r,
        rect_2_color.b,
        rect_2_color.b)
    drawRect(rect_3_x, rect_3_y, w, h,
        rect_3_color.r,
        rect_3_color.b,
        rect_3_color.b)
    // drawRect(rect_2_x, rect_2_y, w, h, r, g, b)
    // drawRect(rect_3_x, rect_3_y, w, h, r, g, b)
}

function drawRect(x, y, w, h, r, g, b) {

    fill(r, g, b)
    rect(x, y, w, h)


}

