var Enemy = function(name, color, position, direction) {

  this.name = name;
  this.position = position;
  this.life = 1;
  this.bullets = [];
  this.direction = direction;
  this.speed = 0;

  this.material = new THREE.MeshLambertMaterial({
    color: color,
  });

  var singleGeometry = new THREE.Geometry();

  vehiculeMesh = new THREE.TorusKnotGeometry(10, 3, 100, 16);
  this.graphic = new THREE.Mesh(vehiculeMesh, this.material);
  this.graphic.position.z = 6;

  this.graphic.rotateOnAxis(new THREE.Vector3(0,0,1), this.direction+(3*Math.PI/2));
};

Enemy.prototype.dead = function () {
  scene.remove(this.graphic);
}

Enemy.prototype.accelerate = function (distance) {
  var max = 2;

  this.speed += distance / 4;
  if (this.speed >= max) {
    this.speed = max;
  }
};

Enemy.prototype.decelerate = function (distance) {
  var min = -1;

  this.speed -= distance / 16;
  if (this.speed <= min) {
    this.speed = min;
  }
};

Enemy.prototype.displayInfo = function () {
  jQuery('#'+this.name+' >.life').text(this.life);
}

Enemy.prototype.turn = function () {
  this.direction += Math.PI;
  this.graphic.rotateOnAxis(new THREE.Vector3(0,0,1), Math.PI);
}

Enemy.prototype.move = function () {
  var moveTo = new THREE.Vector3(
    this.speed * Math.cos(this.direction) + this.graphic.position.x,
    this.speed * Math.sin(this.direction) + this.graphic.position.y,
    this.graphic.position.z
  );

  this.position = moveTo;

  if (this.speed > 0) {
    this.speed = this.speed - 0.04;
  }
  else if (this.speed < 0) {
    this.speed = this.speed + 0.04;
  }

  this.graphic.position.x = this.position.x;
  this.graphic.position.y = this.position.y;
};
