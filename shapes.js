//where is matter deployed
const sectionTag = document.querySelector("section.shapes");

//Matter aliases
// const Engine = Matter.Engine,
// Render = Matter.Render;
// Runner = Matter.Runner,
// Bodies = Matter.Bodies,
// Composite = Matter.Composite;

//shorthand for the above
const {
  Engine,
  Render,
  Composite,
  Bodies,
  Runner,
  MouseConstraint,
  Composites,
} = Matter;

//width and height of window
const h = window.innerHeight;
const w = window.innerWidth;

// create an engine
const engine = Engine.create();

// create a renderer
const render = Render.create({
  element: sectionTag,
  engine: engine,
  options: {
    height: h,
    width: w,
    wireframes: false,
    background: "#000000",
    pixelRatio: window.devicePixelRatio,
  },
});

//ability to create shapes
const createShape = function (x, y) {
  return Bodies.rectangle(x, y, 38, 50, {
    render: {
      sprite: {
        texture: "assets/outline-2x.png",
        xScale: 0.5,
        yScale: 0.5,
      },
    },
  });
};

//add a static white ball

const bigBall = Bodies.circle(w / 2, h / 2, Maht.min(w/4, h/2), {
  isStatic: true,
  render: {
    fillStyle: "cornflowerblue",
    strokeStyle: "cornflowerblue",
  },
});

const wallOptions = {
  isStatic: true,
  render: {
    visible: false,
  },
};

//add a ground
const ground = Bodies.rectangle(w / 2, h + 50, w + 100, 100, wallOptions);
const ceiling = Bodies.rectangle(w / 2, -50, w + 100, 100, wallOptions);
//add walls
const leftWall = Bodies.rectangle(-50, h / 2, 100, h + 100, wallOptions);
const rightWall = Bodies.rectangle(w + 50, h / 2, 100, h + 100, wallOptions);

//add mouse control
const mouseControl = MouseConstraint.create(engine, {
  element: sectionTag,
  constraint: {
    render: {
      visible: false,
    },
  },
});

//create inital shapes
const initialShapes = Composites.stack(50, 50, 15, 10, 80, 40, function (x, y) {
  return createShape(x, y);
});

//add things to the engine's world
Composite.add(engine.world, [
  bigBall,
  ground,
  ceiling,
  leftWall,
  rightWall,
  mouseControl,
  initialShapes,
]);

//add ability to create shape to engine's world
document.addEventListener("click", function (e) {
  let x = e.pageX;
  let y = e.pageY;
  const shape = createShape(x, y);
  Composite.add(engine.world, shape);
});




//add gravity to engine's world

let time = 0

const changeGravity= function (){



time = time + 0.02

// engine.world.gravity.y= Math.cos(time)
engine.world.gravity.y = Math.cos(time)

requestAnimationFrame(changeGravity)

}

// changeGravity();


//adding motion sensitive gravity to mobile

window.addEventListener("deviceorientation", function(event){

  engine.world.gravity.y = event.beta / 30
  engine.world.gravity.x = event.gamma /30
})



// run the engine
Runner.run(engine);

// run the renderer
Render.run(render);
