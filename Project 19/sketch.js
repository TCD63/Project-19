var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var doodle, doodleImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("new tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  doodleImg = loadImage("normal.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  doodle = createSprite(200,200,50,50);
  doodle.scale = 0.3;
  doodle.addImage("doodle", doodleImg);
  
}

function draw() {
  background(0);
  if (gameState === "play") {
    if(keyDown("left_arrow")){
      doodle.x = doodle.x - 3;
    }
    
    if(keyDown("right_arrow")){
      doodle.x = doodle.x + 3;
    }
    
    if(keyDown("space")){
      doodle.velocityY = -10;
    }

    if(keyDown("up_arrow")){
      doodle.velocityY = -10;
    }
    
    doodle.velocityY = doodle.velocityY + 0.8
    
    if(tower.y > 400){
      tower.y = 300
    }
    spawnDoors();

    
    climbersGroup.collide(doodle);
    if(climbersGroup.isTouching(doodle)){
      doodle.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(doodle) || doodle.y > 600){
      doodle.destroy();
      gameState = "end"
    }
    
    drawSprites();
  }
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)

  }
  doodle.scale = 0.12;
  
  }
  
  function spawnDoors() {
    if (frameCount % 240 === 0) {
      var door = createSprite(200, -50);
      var climber = createSprite(200,10);
      var invisibleBlock = createSprite(200,15);
      invisibleBlock.width = climber.width;
      invisibleBlock.height = 2;
      
      door.x = Math.round(random(120,400));
      climber.x = door.x;
      invisibleBlock.x = door.x;
      
      door.addImage(doorImg);
      climber.addImage(climberImg);
      
      door.velocityY = 1;
      climber.velocityY = 1;
      invisibleBlock.velocityY = 1;
      
      doodle.depth = door.depth;
      doodle.depth +=1;
     
     
      door.lifetime = 800;
      climber.lifetime = 800;
      invisibleBlock.lifetime = 800;
  
      
      doorsGroup.add(door);
      invisibleBlock.debug = true;
      climbersGroup.add(climber);
      invisibleBlockGroup.add(invisibleBlock);
    }
  }

