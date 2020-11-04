var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var ground;
var banana , bananaImage , obstacle , obstacleImage;
var FoodGroup , obstacleGroup;
var score;
var survivalTime;



function preload(){
  
monkey_running =           loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
bananaImage = loadImage("banana.png");
obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  monkey = createSprite(50,180,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(200,380,400,40);
  ground.shapeColor = ("green");
  
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey   .height);
  monkey.debug = false;
  
  obstacleGroup = new Group();
  foodGroup = new Group();
  survivalTime = 0;
}



function draw() {
   background("lightBlue");
if(gameState === PLAY){
  if(ground.x > 0)
  {
   ground.x = ground.width / 2;  
  }
  ground.velocityX = -4;
  
  
  if(keyDown("space") && monkey.y >= 329.3)
  {
   monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.6;
    
   food();
   obstacles();
  
  if(obstacleGroup.isTouching(monkey)){
   gameState = END;
   }
  
  survivalTime = survivalTime + Math.ceil(frameCount / 60);
}
  
  
if (gameState === END){
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    monkey.velocityY = 0;
  if(keyDown("space")){
    reset();
  }
  
    textSize(20);
    stroke("red");
    fill("red");
    text("GAME OVER",140,200);
   
    textSize(20);
    stroke("purple");
    fill("purple");
    text("Press SPACE to continue",100,230);
}
  
  
monkey.collide(ground);
   
console.log(monkey.y);
  
stroke("black");
textSize(20);
fill("black");
text("Survival Time:" + survivalTime,200,50);

drawSprites();
  
}



function food(){
   if (frameCount % 80 === 0){
    banana = createSprite(600,100,40,10);
    banana.velocityX = -4;
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.y = Math.round( random(150,250));
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    banana.lifetime = 190;
    foodGroup.add(banana);
}
}



function obstacles(){
  if(frameCount % 300 === 0){
    obstacle = createSprite(400,350,10,40);
    obstacle.velocityX = -4;
    obstacle.addImage("running",obstacleImage);
    obstacle.scale = 0.1;
    obstacle.lifetime = 190;
    obstacleGroup.add(obstacle);
}
}

function reset(){
  gameState = PLAY;
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  survivalTime = 0;
}

