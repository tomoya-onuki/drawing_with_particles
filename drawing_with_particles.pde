int NUM = 3000;//ここを変えると粒子群の数が変わります。
Ball[] ball = new Ball[NUM];

void setup() {
  size(800, 800);
  for(int i = 0; i < NUM; i++){
    ball[i] = new Ball();
  }
}

void draw() {
  //背景の更新
  fill(0, 50); stroke(0, 50);
  rect(0, 0, width, height);

  for(int i = 0; i < NUM; i++){
    ball[i].update();
  }
  //saveFrame("mov/######.tif");
}

void mouseDragged() {
  for(int i = 0; i < NUM; i++){
    ball[i].mouse();
  }
}

void mousePressed() {
  if(mouseButton == LEFT) {
    for(int i = 0; i < NUM; i++){
      ball[i].mouse();
    }
  }
}


class Ball{
  float vx, vy;//方向
  float speed;//速さ
  float x, y;//座標
  float pre_x, pre_y;//前の座標
  float size;//方向ベクトルのサイズ
  float easing = random(0.1, 0.4);
  float R = width;

  Ball(){
    speed = 30;
    x = random(-width/2, width*3/2);
    y = random(-height/2, height*3/2);
    pre_x = x; pre_y = y;
    //方向の初期化:中心に集まる
    size = sqrt(sq(width/2 - x) + sq(height/2 - y));
    vx = (width/2 - x) / size;
    vy = (height/2 - y) / size;
  }

  void update() {
    x += vx * speed * easing;
    y += vy * speed * easing;

    //表示
    stroke(255);
    line(x, y, pre_x, pre_y);

    pre_x = x;
    pre_y = y;

    size = sqrt(sq(width/2 - x) + sq(height/2 - y));
    if(size > R){
      vx = (width/2 - x) / size;
      vy = (height/2 - y) / size;
    }
  }

  //マウスドラッグorクリックでマウスの座標に方向転換
  void mouse(){
    size = sqrt(sq(mouseX - x) + sq(mouseY - y));
    vx = (mouseX - x) / size;
    vy = (mouseY - y) / size;
  }
}
