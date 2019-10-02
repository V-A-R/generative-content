import { parametersPanelManager } from "Modules/ParametersPanelManager.js";
import { configuration } from "./configuration.js"

export { setup, draw };

let vec, c1, c2;
let increment = 0;
let nbAgents = 200;
let agents = [];



function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(230);
  stroke(40);
  frameRate(30);
  parametersPanelManager.setup(false);

  for (let i = 0; i < nbAgents; i++) {
    agents.push(createVector(random(360), random(360)));
  }
}

function draw() {
  background(configuration.bgColor);

  // camera setup
  createCamera();

  let radius = 300;

  for (let i = 0; i < nbAgents - 1; i++) {
    agents[i].x += noise(increment);
    agents[i].y += noise(increment + 100);
    c1 = spherePoint(radius, agents[i].x, agents[i].y);
    for (let j = 0; j < nbAgents; j++) {
      c2 = spherePoint(radius, agents[j].x, agents[i].y);
      if (dist(c1.x, c1.y, c1.z, c2.x, c2.y, c2.z) < 60 && i != j) {
        strokeWeight(1);
        stroke(50, 50);
        line(c1.x, c1.y, c1.z, c2.x, c2.y, c2.z);
      }
    }
    strokeWeight(4);
    stroke(50);
    point(c1.x, c1.y, c1.z);
  }
  increment += 0.01;
}

function spherePoint(radius, u, v) {
  vec = createVector();
  u = radians(u);
  v = radians(v);
  vec.x = radius * cos(u) * cos(v);
  vec.y = radius * sin(u) * cos(v);
  vec.z = radius * sin(v);
  return vec;
}

