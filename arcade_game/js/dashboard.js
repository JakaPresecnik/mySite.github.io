var dashImages = [
  'dash-img/dash-chest-key.png',
  'dash-img/dash-gate-key.png',
  'dash-img/dash-health.png'
]

var DashInfo = function(x, i) {
  this.x = x;
  this.y = 545;
  this.sprite = dashImages[i];
}
DashInfo.prototype.render = function (numberOf) {
  for(var i = 0; i < numberOf; i++){
    ctx.drawImage(Resources.get(this.sprite), this.x + i * 25, this.y);
  }
};

var health = new DashInfo(10, 2);
var chestKey = new DashInfo(370, 0);
var gateKey = new DashInfo(350, 1);

var pointInfo = {
  x: 202,
  y: 545,
}

var retryButton = function() {
  if(player.health === 0) {
    ctx.textAlign = "center";
    ctx.font = '30px Arial';
    ctx.strokeStyle = '#444';
    ctx.strokeText('RETRY?',canvas.width, 300);
  }
}
