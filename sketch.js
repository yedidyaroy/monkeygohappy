var ground;
var END = 0;
var PLAY=1;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup, bananaGroup;
var score;
var gameState = PLAY;
var collide;
function preload()
{
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 collide = loadImage("sprite_0.png")
}

function setup() {
  createCanvas(600, 400);
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;

  ground = createSprite(400,350,1000,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  if (ground.x<0){
      ground.x = ground.width/2;
    }
  score=0;
  bananaGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background("white");
  text("SurvivalTime: "+ score, 250,50);
  score = score + Math.round(getFrameRate()/60);
  if(keyDown("space")&& monkey.y >= 300) {
        monkey.velocityY = -15;
    }
  monkey.velocityY = monkey.velocityY + 0.9;
  
  if (ground.x>0){
      ground.x = ground.width/2;
    }
  if (gameState === END){
     monkey.velocityY = 0;
      ground.velocityX = 0
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0); 
    
  }
  monkey.collide(ground);
  spawnobstacle();
  spawnbananas();
  
  if (monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
  }
  if (monkey.isTouching(obstacleGroup)){
    gameState = END;
    text("The end", 200,200);
  }
  drawSprites();
  
}

function spawnobstacle(){
  if (frameCount % 500===0){
    var obstacle = createSprite(600,308,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);
    obstacle.lifetime = 300;
    obstacle.scale=0.2;
    obstacleGroup.add(obstacle);
  }
}

function spawnbananas(){
  if (frameCount % 80===0){
    var banana = createSprite(600,200,10,40);
    banana.velocityX = -6;
    banana.addImage(bananaImage);
    banana.lifetime = 300;
    banana.scale=0.1;
    bananaGroup.add(banana);
  }
}