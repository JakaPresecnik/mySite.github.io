/*
* @description: Represent enemy objects.
* @constructor
* @param: {number} x - place the enemy object on a random position on x-axis.
* @param: {number} y - place the enemy position on y axis. Must be entered on object call.
* @param: {number} speed - defines the enemy speed. MUst be entered on object call.
* @param: {string} sprite - contains an URL for an enemy image.
* @method: update - takes 'dt' as an arguement and it multiplies it with the speed property.
*                 - checks the level of a player and updates enemies going right and left after level 7,
*                   according to canvas width.
*                 - calls a 'checkCollision' method.
* @method: render - it is responsible for drawing the image on canvas.
* @method: checkCollision - checks if the player is on the same position as the enemy object
*                           and takes away players checkHealth,
*                         - calls player's checkHealth method,
*                         - and resets player on the starting position, depending on where player is moving.
*/
var Enemy = function(y, speed) {
    this.x = Math.floor(Math.random() * 699);
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if(player.level === 7) {
      if (this.x > 575) {
        this.speed = - this.speed;
      }else if (this.x < -70) {
        this.speed = - this.speed;
      }
    } else if(player.level === 8 || player.level === 9) {
      if (this.x > 373) {
        this.speed = - this.speed;
      }else if (this.x < -70) {
        this.speed = - this.speed;
      }
    }else if(this.x > 700) {
      this.x = -100;
    }
    this.checkCollisions();
};
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Enemy.prototype.checkCollisions = function() {
  if(this.x > player.x - 65 && this.x < player.x + 65) {
    if(this.y > player.y - 50 && this.y < player.y + 50){
      if(player.direction === 'up'){
        player.health -= 1;
        player.checkHealth();
        player.y = 383;
        player.x = 202;
      }else {
        player.health -= 1;
        player.checkHealth();
        player.x = 202;
        player.y = 55;
      }
    }
  }
}

/*
* @description - Represents player object
* @constructor
* @param {number} x - player's position on x-axis.
* @param {number} y - player's position on y axis.
* @param {string} sprite - URL of player's image.
* @param {number} level - number of player's level that changes when reached the upper blocks.
* @param {number} health - number of lives the player has, that changes when player collect hearths.
* @param {number} points - number of points player has, changes on level-up and collecting gems.
* @param {string} direction - direction the player is going that changes on higher level.
* @param {number} chestKey - contains information if the player has a chest key.
* @param {number} gateKey - contains information if the player has a gate key.
* @method: render - it is responsible for drawing the image on canvas.
* @method: handleInput - @param {string} key - is passed from addEventListener
*                      - method checks what key is pressed and moves the player according to key pressed.
*                      - it also checks where player is on canvas so it doesn't move off screen.
* @method: update - checks if player has reached the final line
*                   (0 up to level 7, both x and y positions on level 8 and 9)
*                 - adds points to player
*                 - adds a level (subtracts)
*                 - places a player on starting y position for next (previous) level.
*                 - randomize enemy object so it appears the enviroment has changed fully.
*                 - resets the direction
*                 - calls onLevelUp method
*                 - it also checks if player is at the gates on level 7, calling keyCheck method
* @method: onLevelUp - a switch statement that is responsible to make every level unique.
*                    - this method adds enemies, obstacles, gems, other items, increases speed of enemies.
*                    - it also changes the enemies according to player level.
*                    - from level 8 on it checks if player doesn't have a certain key and adds it to canvas, as well as locking the gates.
*                    - on level 10 displays a winning message.
* @method: keyCheck - the first if statement checks if the player is where the gates are,
*                     and removes the bars if key is not 0, adds a message if it is.
*                   - if else checks if the player is where the treasure is
*                     and adds points, remove chest key and treasure if it is not 0
*                     and dissplays a message with an else if statement is it is. (reason is that else the message appears even if there is no treasure there)
*                     it also make it availible for a player to farm points if he is good at this game.
*                   - and finally if the player moves out of the keyCheck area it removes the message if it showed up.
* @method: checkHealth - is responsible for displaying 'game over' message if player ends up with 0 health
*                      - it also freezes the screen
*                      - and alighn the message according to player level.
*/
var Player = function (x, y) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/char-boy.png';
  this.level = 1;
  this.health = 2;
  this.points = 0;
  this.direction = 'up';
  this.chestKey = 0;
  this.gateKey = 0;
}
Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function (key) {
  if (key === 'left' && this.x > 0) {
    this.x -= 101;
  }else if (key === 'right' && this.x < 505) {
    this.x += 101;
  }else if (key === 'up' && this.y > 0) {
    this.y -= 83;
  }else if (key === 'down' && this.y < 383) {
    this.y += 83;
  }
}   //DONE!
Player.prototype.update = function () {
  if (this.y <= 0) {
    this.points += 250;
    this.level += 1;
    this.y = 383;
    allEnemies.forEach(function(enemy) {
      enemy.x = Math.floor(Math.random() * 699);
    });
    this.direction = 'up';
    this.onLevelUp();
  } else if (this.level === 7) {
    if(obstacles [8] != undefined) {
      this.keyCheck();
    }else {
      this.points += 20000;
      this.level += 3;
      this.y = 383;
      this.x = 202;
      this.onLevelUp();
    }
  } else if (this.level === 8 || this.level === 9){
        if(this.x === 101 && this.y >= 380) {
          this.direction = 'down';
          this.level -= 1;
          this.x = 202;
          this.y = 55;
          this.onLevelUp();
        }
    }
};
Player.prototype.onLevelUp = function() {
  switch (this.level) {
    case 2:
      gems = [new Gems(303, 89, 1)];
      obstacles = [new Obstacle(404, 55, 0), new Obstacle(202, 0, 1), new Obstacle(303, 330, 1)];
      allEnemies.push(new Enemy(220, 200));
      break;
    case 3:
      gems = [new Gems(101, 170, 1), new Gems(505, 84, 0)];
      obstacles = [new Obstacle(303, 140, 0), new Obstacle(505, 220, 0), new Obstacle(101, 0, 1), new Obstacle(404, 0, 1)];
      allEnemies.push(new Enemy(300, 190));
      break;
    case 4:
      gems = [new Gems(0, 160, 2), new Gems(404, 89, 0)];
      obstacles = [new Obstacle(101, 55, 0), new Obstacle(505, 290, 0), new Obstacle(303, 55, 0), new Obstacle(101, 290, 0), new Obstacle(404, 0, 2)]
      allEnemies.forEach(function(enemy) {
        enemy.speed += 20;
      });
      allEnemies.push(new Enemy(140, 220));
      break;
    // SEA
    case 5:
      gems = [new Gems(101, 170, 0), new Gems(303, 248, 3), new Gems(505, 170, 1)];
      obstacles = [new Obstacle(0, 83, 2), new Obstacle(202, 249, 2), new Obstacle(303, 332, 2), new Obstacle(505, 83, 4), new Obstacle(404, 249, 4), new Obstacle(303, 0, 4)];
      allEnemies.push(new Enemy(300, 160));
      allEnemies.forEach(function(enemy) {
        enemy.speed += 20;
        enemy.sprite = 'images/shark-fin.png';
      });
      break;
    case 6:
      gems = [new Gems(0, 165, 3), new Gems(303, 254, 1), new Gems(404, 80, 2)];
      obstacles = [new Obstacle(0, 83, 4), new Obstacle(505, -20, 0), new Obstacle(101, 166, 4), new Obstacle(101, 332, 2), new Obstacle(202, 332, 2), new Obstacle(404, -20, 0), new Obstacle(303, 83, 2)]
      allEnemies.splice(0, 2, new Enemy(300, 180));
      allEnemies.forEach(function(enemy) {
        enemy.sprite = 'images/shark-fin.png';
        enemy.speed += 15;
      });
      break;
    // BEACH
    case 7:
      gems = [new Gems(101, 170, 0), new Gems(0, 252, 1), new Gems(505, 248, 2)];
      items = [new Item(404, 0, 1), new Item(202, 0, 1), new Item(508, 165, 0)];
      allEnemies.push(new Enemy(140, 240), new Enemy(220, 300) );
      obstacles = [
        new Obstacle(0, 55, 3), //PALM TREE
        new Obstacle(101, 55, 0), //ROCK
        new Obstacle(303, 55, 3), //PALM TREE
        new Obstacle(505, 55, 3), //PALM TREE
        new Obstacle(303, 140, 0), //ROCK
        new Obstacle(0, 140, 3), //PALM TREE
        new Obstacle(505, 300, 0), //ROCK
        new Obstacle(505, 380, 3), //PALM TREE
        new Obstacle(404, 0, 5)]  //CLOSED GATES
      allEnemies.forEach(function(enemy) {
      enemy.sprite = 'images/enemy-crab.png';
      });
      break;
    //CAVE 1st ENTERANCE
    case 8:
      gems = [new Gems(0, 320, 3)];
      items = [new Item(202, 0, 1), new Item(101, 415, 2)];
      if(this.gateKey === 0) {
        items.push(new Item(303, 170, 3))
      }
      obstacles = [new Obstacle(101, 55, 6),
        new Obstacle(0, 55, 6),
        new Obstacle(303, 55, 6),
        new Obstacle(101, 290, 6),
        new Obstacle(0, 380, 6),
        new Obstacle(303, 220, 6),
        new Obstacle(404, 170, 6),
        new Obstacle(404, 270, 6),
        new Obstacle(303, 380, 6)
      ];
      allEnemies.forEach(function(enemy) {
      enemy.sprite = 'images/enemy-bat.png';
      });
      break;
    case 9:
      gems = [new Gems(0, 330, 2),  new Gems(0, 410, 3)];
      items = [new Item(101, 415, 2)];
      if(this.chestKey === 0) {
        items.push(new Item(0, 170, 4))
      }
      obstacles = [new Obstacle(101, 55, 6),
      new Obstacle(202, 55, 6),
      new Obstacle(303, 55, 6),
      new Obstacle(0, 55, 6),
      new Obstacle(101, 305, 6),
      new Obstacle(303, 220, 6),
      new Obstacle(404, 170, 6),
      new Obstacle(404, 270, 6),
      new Obstacle(303, 380, 6)
    ];
      break;
      case 10:
        allEnemies = [];
        gems = [];
        messages = [new Message(0, 20, 6)];
        obstacles = [new Obstacle(220, 320, 9), new Obstacle(120, 300, 7), new Obstacle(303, 320, 8), new Obstacle(0, 300, 7), new Obstacle(0, 400, 9), new Obstacle(101, 400, 8), new Obstacle(303, 383, 8)]
        break;
  }
};
Player.prototype.keyCheck = function() {
  if(this.x === 404 && this.y <= 55) {
    if(this.gateKey != 0) {
      obstacles.pop();
    }else{
      items.push(new Item(200, 300, 5));
    }
  }else if(this.x === 505 && this.y <= 140) {
    if(this.chestKey != 0) {
      this.points += 5000;
      this.chestKey = 0;
      items.pop();
    }else if (items.length > 2){
      items.push(new Item(200, 300, 5));
    }
  }else if(items.length > 3){
      items.pop();
  }
}
Player.prototype.checkHealth = function() {
  if(this.health === 0) {
    Object.freeze(this);
    allEnemies.forEach(function(enemy){
      Object.freeze(enemy);
    });
    if(this.level < 8) {
      messages = [new Message(101, 20, 7)];
    }else {
      messages = [new Message(0, 20, 7)];
    }

  }
}

/*
* @description - Represents obstacles.
* @constructor
* @param {number} x - obstacle position on x-axis.
* @param {number} y - obstacle position on y axis.
* @param {string} sprite - URL of obstacle image.
* @method: render - it is responsible for drawing the image on canvas.
* @method: update - @param {string} key - is passed from addEventListener
*                 - this method blocks the player from moving to where the obstacle is.
*/
var Obstacle = function(x, y, i) {
  this.x = x;
  this.y = y;
  this.sprite = obstacleImages[i];
};
Obstacle.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Obstacle.prototype.update = function(key){
    if(this.x > player.x - 50 && this.x < player.x + 50) {
      if(this.y > player.y - 40 && this.y < player.y + 40){
        switch (key) {
          case 'left':
            player.x += 101;
            break;
          case 'right':
            player.x -= 101;
            break;
          case 'up':
            player.y += 83;
            break;
          case 'down':
            player.y -= 83;
        }
      }
  }

}

/*
* @description - Represents gems.
* @constructor
* @param {number} x - gem position on x-axis.
* @param {number} y - gem position on y axis.
* @param {string} sprite - URL of gem image.
* @method: render - it is responsible for drawing the image on canvas.
* @method: update - it checks if the player is on position the gem is
*                 - it updates player health or points depending what item player picks up
*/
var Gems = function(x, y, i) {
  this.x = x;
  this.y = y;
  this.sprite = gemsImages[i];
};
Gems.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Gems.prototype.update = function() {
  if(this.x > player.x - 40 && this.x < player.x + 40) {
    if(this.y > player.y - 40 && this.y < player.y + 40){
      switch (this.sprite) {
        case gemsImages[0]:
          player.health += 1;
          break;
        case gemsImages[1]:
          player.points += 100;
          break;
        case gemsImages[2]:
          player.points += 250;
          break;
        case gemsImages[3]:
          player.points += 500;
          break;
      }
      gems.splice(gems.indexOf(this), gems.indexOf(this) + 1);
    }
  }
}

/*
* @description - Represents different items (keys, treasure chest, way out image...)
* @constructor
* @param {number} x - item position on x-axis.
* @param {number} y - item position on y axis.
* @param {string} sprite - URL of item image.
* @method: render - it is responsible for drawing the image on canvas.
* @method: update - it checks if the player already has keys so they don't respawn
*/
var Item = function(x, y, i) {
  this.x = x;
  this.y = y;
  this.sprite = itemImages[i];
}
Item.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Item.prototype.update = function() {
  if(this.x > player.x - 40 && this.x < player.x + 40) {
    if(this.y > player.y - 40 && this.y < player.y + 40){
      switch (this.sprite) {
        case itemImages[3]:
          player.gateKey = 1;
          items.splice(items.indexOf(this), items.indexOf(this) + 1);
          break;
        case itemImages[4]:
          player.chestKey = 1;
          items.splice(items.indexOf(this), items.indexOf(this) + 1);
          break;
      }
    }
  }
}

/*
* @description - It is a 'game Over' scroll
* @constructor
* @param {number} x - position on x-axis.
* @param {number} y - position on y axis.
* @param {string} sprite - URL.
* @method: render - it is responsible for drawing the image on canvas.
*/
var Message = function(x, y, i) {
  this.x = x;
  this.y = y;
  this.sprite = itemImages[i];
}
Message.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Empty gems array
var gems = []
//Array of images for gems
var gemsImages = [
  'images/Heart.png',
  'images/GemOrange.png',
  'images/GemBlue.png',
  'images/GemGreen.png',
]
//Object call for player object
var player = new Player(101, 383);
//Starting enemies array
var allEnemies = [
  new Enemy(60, 150),
  new Enemy(60, 210),
  new Enemy(140, 180),
  new Enemy(220, 150),
];
//Empty obstacles array
var obstacles = [];
//Array of images for obstacles
var obstacleImages = [
  'images/Rock.png',
  'images/bench.png',
  'images/signal-buoy.png',
  'images/palm-tree.png',
  'images/sea-rock.png',
  'images/cliff-hole-bars.png',
  'images/Rock-dark.png',
  'images/treasure-two.png',
  'images/treasure-one.png',
  'images/treasure-three.png'
]
//Empty items array
var items = [];
//Array of images for for items
var itemImages = [
  'images/treasure-chest.png',
  'images/cliff-hole.png',
  'images/way-out.png',
  'images/gate-key.png',
  'images/chest-key.png',
  'images/message-key.png',
  'images/winning-message.png',
  'images/game-over-message.png'
];
//Empty messages array (was planned to have a winning screen also)
var messages = [];

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
    obstacles.forEach(function(obstacle) {
      obstacle.update(allowedKeys[e.keyCode]);
    });
});
