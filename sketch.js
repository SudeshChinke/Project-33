const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine,world;
var bg,groundImg,runnerImg;
var ground,runner;
var ice=[];
var maxSnow=50;

function preload() {
  bg = loadImage("snowbg.jpg");
  groundImg = loadImage("ground.png");
  runnerImg = loadAnimation("1.png","2.png","3.png","4.png");
}


function setup() {
  createCanvas(1300,600);
  engine = Engine.create();
  world = engine.world;

  ground=createSprite(200,650);
  ground.addImage(groundImg);
  ground.scale=3.2;
  ground.velocityX=-10;

  runner=createSprite(100,450);
  runner.addAnimation("runner",runnerImg)
  runner.scale=0.6;
  runner.velocityX=3;
  runner.setCollider("rectangle",15,-20,100,180);

  if(frameCount%350 === 0){
    for(var i=0 ; i < maxSnow ; i++){
      ice.push(new Snow(random(-20,1320), random(-50)));
    }
  }
   
}


function draw() {
  background(bg);  
  Engine.update(engine);
  runner.collide(ground);
  if(ground.x < 530){
    ground.x=600;
  }
  if(runner.x > 1200){
    runner.x=150;
  }
  
  if(keyWentDown("space")&& runner.y >= 480) {
    runner.velocityY = -15;
  }

  runner.velocityY = runner.velocityY + 0.8;

  for(var i = 0;i < maxSnow; i++){
    
    ice[i].changePosition();
    ice[i].display();
  }    
    
  ground.display();

  drawSprites();
}
