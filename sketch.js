
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,candy,ground;
var candy_con;
var candy_con_2;
var candy_con_3;
var rope3;

var food;
var bg_img;

var button,button2,button3;
var beast;
var blink,eat,sad;
var mute_btn;

var fr;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
var canW;
var canH;

var star;
var star_img;

function preload()
{
  bg_img = loadImage('backgroundimage.jpg');
  food = loadImage('candy.png');
  beast = loadImage('eating_image.png')
  star_img = loadImage('star.png');
  
  sad = loadImage("sad_1.png","sad_2.png");
  blink = loadImage("happy_image.png","happyimage_2.png","happyimage_3.png");
  eat = loadImage("eatingimage.gif");
  
  cut_sound = loadSound('rope_cut.mp3');
  sad_sound = loadSound("sad.wav")
  bk_song = loadSound('sound1.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');
  
  empty_star = loadImage("empty.png");
  one_star = loadImage("one_star.png");
  two_star = loadImage("stars.png");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}



function setup() {
  createCanvas(600,700);
  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(100,90);
  button.size(50,50);
  button.mouseClicked(drop);

   button2 = createImg('cut_btn.png');
   button2.position(450,90);
   button2.size(50,50);
   button2.mouseClicked(drop2);
 
   rope = new Rope(7,{x:120,y:90});
   rope2 = new Rope(7,{x:490,y:90});

   mute_btn = createImg('mute.png');
  mute_btn.position(width-50,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);

  ground = new Ground(200,canH,600,20);
  blink.frameDelay = 20;
  eat.frameDelay = 20;

  alien = createSprite(170,canH-80,100,100);
  alien.scale = 0.2;


  alien.addAnimation('blinking',blink);
  alien.addAnimation('eating',eat);
  alien.addAnimation('crying',sad);
  alien.changeAnimation('blinking');

  star_display = createSprite(50,20,30,30);
  star_display.scale = 0.2;
  star_display.addAnimation('empty',empty_star);
  star_display.addAnimation('one',one_star);
  star_display.addAnimation('two',two_star);
  star_display.changeAnimation('empty');

  star = createSprite(320,50,20,20);
  star.addImage(star_img);
  star.scale=0.02;

  star2 = createSprite(50,330,20,20);
  star2.addImage(star_img);
  star2.scale=0.02;

  
  candy = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,candy);

  candy_con = new Link(rope,candy);
  candy_con_2 = new Link(rope2,candy);

  blower = createImg('baloon2.png');
  blower.position(260,370);
  blower.size(120,120);
  blower.mouseClicked(airblow);
  
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}


function draw() 
{
  background(58);
  image(bg_img,0,0,width,height);

  push();
  imageMode(CENTER);
  if(candy!=null){
    image(food,candy.position.x,candy.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(candy,alien)==true)
  {
    alien.changeAnimation('eating');
    eating_sound.play();
  }

  if(candy!=null && candy.position.y>=650)
  {
    alien.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    candy=null;
     
   }
   
}

function drop()
{
  cut_sound.play();
  rope.break();
  candy_con.detach();
  candy_con = null; 
}

function drop2()
{
  cut_sound.play();
  rope2.break();
  candy_con_2.detach();
  candy_con_2 = null;
}

function keyPressed()
{
  if(keyCode==LEFT_ARROW)
  {
    airblow();
  }
}


function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,candy);
               candy = null;
               return true; 
            }
            else{
              return false;
            }
         }
}

function airblow()
{
  Matter.Body.applyForce(candy,{x:0,y:0},{x:0.01,y:0});
  air.play();
}

function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}
  


