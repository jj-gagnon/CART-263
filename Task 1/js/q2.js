"use strict";



function setup() {
    createCanvas(windowWidth, windowHeight)
    background(0, 0, 0)
    
    

    let x = 40
    let y = 40

    let r = 255
    let g = 0
    let b = 255

    let h = 40
    let w = 40
    drawEllipse(x,y,w,h,r,g,b)

    

    x = 80
    y = 80

    r = 255
    g = 0
    b = 200

    w = 60
    h = 60

    drawEllipse(x,y,w,h,r,g,b)

    x = 150
    y = 150
    
    r = 200
    g = 0
    b = 255

    w = 120
    h = 120
    drawEllipse(x,y,w,h,r,g,b)

}

function draw() {

}

function drawEllipse(x,y,w,h,r,g,b){

    fill(r, g, b)
    ellipse(x, y, w, h)

}