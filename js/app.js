var Player = function () {
};

Player.prototype.init = function () {
    this.x = 203;
    this.y = 311;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function () {

};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (k) {
    var width = ctx.canvas.width,
        height = ctx.canvas.height;

    if (k === 'left' && this.x > 0)
        this.x -= 98 / 2;
    if (k === 'right' && this.x < width)
        this.x += 98 / 2;
    if (k === 'up' && this.y > 0)
        this.y -= 82;
    if (k === 'down' && this.y < height)
        this.y += 82;

};

// Enemies our player must avoid
var Enemy = function (x,y,sp) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    this.x = x;
    this.y = y;
    this.speed = sp;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

var nextEnemyIsReady = false,
    enemiesY = [62,145,225];
allEnemies = [new Enemy(-300,62,2)],
player = new Player();
player.init();
(function nextEnemy() {
    var ran = Math.random() + 1,
        period = ran * 1000;
    nextEnemyIsReady = true;
    return setTimeout(nextEnemy, period);

})();

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if (nextEnemyIsReady){
        nextEnemyIsReady = false;
        var ran = Math.floor(Math.random() * 3);
        allEnemies.push(new Enemy(-300,enemiesY[ran],2));
    }

    this.x += this.speed;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
