

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y + 55;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.step = 101;
    this.boundary = this.step * 5;
    this.resetPos = -this.step;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // If enemy is not passed boundary
    if(this.x < this.boundary) {
        // move forward
        // increment x by speed * dt
        this.x += this.speed * dt;
    }
    else {
        this.x = this.resetPos; //reset pos to start
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//Hero Class
class Hero {
    constructor () {
        this.sprite = 'images/char-boy.png';
        this.step = 101; //set proper pixel range for moving left and right
        this.jump = 83; //set proper pixel range for moving up and down
        this.startX = this.step * 2; //set starting position
        this.startY = (this.jump * 4) + 55;
        this.x = this.startX;
        this.y = this.startY; 
        this.victory = false; //boolean for win condition
    }

    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y); //render the Hero at the start point
    }

    /**
    *
    *@param {string} input - direction to travel 
    */
   handleInput(input) { //switch section for handling keyboard input
       switch (input) {
        case 'left':
            if (this.x > 0) { 
                this.x -= this.step;
            }
            break;
        case 'up':
            if (this.y > this.jump) {
                this.y -= this.jump;
            }
            break;
        case 'right':
            if (this.x < this.step * 4) {
                this.x += this.step;
            }
            break;
        case 'down':
            if (this.y < this.jump * 4) {
            this.y += this.jump;
            }
            break;
       }
   }
   update() {
       for (let enemy of allEnemies) { //check for collisions
           if (this.y === enemy.y && (enemy.x + enemy.step/2 > this.x && enemy.x < this.x + this.step/2) ) {
              this.reset();
            }
       }
       if (this.y === 55) { //check win condition
           this.victory = true;
       }
   }
   reset() { //reset Hero to start
       this.x = this.startX;
       this.y = this.startY;
   }
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


// New Hero Object
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Hero();
const bug1 = new Enemy(-101, 0, 200);
const bug2 = new Enemy(-101, 83, 300);
const bug3 = new Enemy((-101*2.5), 166, 300);
const bug4 = new Enemy(-101, 0, 250);
const bug5 = new Enemy(-101, 83, 400);
const bug6 = new Enemy((-101*3), 166, 350);
const allEnemies = [];
allEnemies.push(bug1,bug2,bug3,bug4,bug5,bug6);

//Init allEnemies Array
// For each Enemy create and push new Enemy Object into above array