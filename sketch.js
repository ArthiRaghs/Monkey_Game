// MONKEY GO HAPPY
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  //creating monkey sprite
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  //ground
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  //groups
  FoodGroup=new Group();
  obstacleGroup = new Group();
  score=0;
  var survivaltime=0;

  
}


function draw() {
  background("aqua");
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  //jump if spacebar pressed
  if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
        
    }
  //add gravity
    monkey.velocityY = monkey.velocityY + 0.8;
  // food
  spawnfood();
  spawnObstacles();
  monkey.collide(ground);
  drawSprites();
  
  
  
  if(FoodGroup.isTouching(monkey))
    {
      //FoodGroup.destroyEach();
      stroke("blue");
      textSize(20);
      fill("blue");
      score= score+Math.round(getFrameRate()/60);
      text("Yippee!! I got banana number:"+score,100,100);
    }
  if(obstacleGroup.isTouching(monkey))
    {
      monkey.velocityY=0;
      ground.velocityX=0;
      text("OOPS!!",200,150);
      obstacleGroup.destroyEach();
      FoodGroup.destroyEach();
      obstacleGroup.setLifetimeEach(-1);
      FoodGroup.setLifetimeEach(-1);
    }
  stroke("black");
  textSize(20);
  fill("black");
  survivaltime=Math.ceil(frameCount/frameRate());
  text("Survival time:"+survivaltime,100,50);
  
}

function spawnfood()
{
  if(frameCount%80 ===0)
    {
      var banana=createSprite(600,250,40,10);
      banana.y=Math.round(random(120,200));
      banana.addImage(bananaImage);
      banana.scale=0.05;
      monkey.depth = banana.depth + 1;
      
      banana.velocityX=-5;
      banana.lifetime=120;
      FoodGroup.add(banana);
      
    }
}
function spawnObstacles()
{
  if (frameCount % 300 === 0){
   var obstacle = createSprite(800,320,10,40);
    obstacle.x=random(10,400);
   obstacle.velocityX = -6;
   obstacle.addImage(obstaceImage);
   //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.15;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
 }
  
}



