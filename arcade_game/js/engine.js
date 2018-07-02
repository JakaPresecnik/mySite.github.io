/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine makes the canvas' context (ctx) object globally available to make
 * writing app.js a little simpler to work with.
 */

var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    var game = 'start';

    canvas.width = 606;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */         // remove coment on update!!
        update(dt);
        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
      reset();
      lastTime = Date.now();
      main();
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    function update(dt) {
        updateEntities(dt);
        // checkCollisions();
    }

    /* This is called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        obstacles.forEach(function(obstacle) {
            obstacle.update();
        });
        player.update();

        gems.forEach(function(gem) {
            gem.update();
        });
        items.forEach(function(item) {
            item.update();
        });
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
**     I added some functionality and changed the layout a bit.
     */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        var rowImages = [
                'images/grass-block.png',   // Changed TO Grass!
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 6,
            row, col;

            // Added a switch statement for different levels
            switch (player.level) {
              case 3:
                rowImages[4] = 'images/stone-block.png';
                break;
              case 4:
                rowImages[4] = 'images/stone-block.png';
                rowImages[0] = 'images/water-block.png';
                break;
              case 5:
                for (var i = 0; i < rowImages.length; i++) {
                  rowImages[i] = 'images/water-block.png';
                };
                break;
              case 6:
                rowImages[0] = 'images/sand-block.png';
                for (var i = 1; i < rowImages.length; i++) {
                  rowImages[i] = 'images/water-block.png';
                };
                break;
              case 7:
                canvas.width = 606;
                numCols = 6;
                rowImages[0] = 'images/cliff.png';
                for (var i = 1; i < rowImages.length; i++) {
                  rowImages[i] = 'images/sand-block.png';
                };
                break;
              case 8:
              case 9:
              canvas.width = 404;
              numCols = 4;
              rowImages[0] = 'images/cliff-dark.png'
              for (var i = 1; i < rowImages.length; i++) {
                rowImages[i] = 'images/sand-block-dark.png';
              };
              case 10:
              canvas.width = 404;
              numCols = 4;
              rowImages[0] = 'images/cliff-dark.png'
              for (var i = 1; i < rowImages.length; i++) {
                rowImages[i] = 'images/sand-block-dark.png';
              };

            }

        // Before drawing, clear existing canvas
        ctx.clearRect(0,0,canvas.width,canvas.height)

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();

    }

    /* This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
         gems.forEach(function(gem){
           gem.render()
         });
         items.forEach(function(item) {
              item.render();
         });
        obstacles.forEach(function(obstacle){
           obstacle.render()
         });

        allEnemies.forEach(function(enemy) {
            enemy.render();
        });
        player.render();
        messages.forEach(function(message) {
            message.render();
        });

        health.render(player.health);
        chestKey.render(player.chestKey);
        gateKey.render(player.gateKey);

        ctx.textAlign = "right";
        ctx.font = '30px Arial';
        ctx.strokeStyle = '#444';
        ctx.strokeText('POINTS: ' + player.points, canvas.width, 25);
        ctx.fillText('POINTS: ' + player.points, canvas.width, 25);
        ctx.textAlign = "left";
        ctx.fillText('LEVEL: ' + player.level, 0, 25);
        ctx.strokeText('LEVEL: ' + player.level, 0, 25);

    }

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    function reset() {
        // noop

    }

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/sand-block.png',
        'images/sand-block-dark.png',
        'images/cliff.png',
        'images/cliff-dark.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/Rock.png',
        'images/Rock-dark.png',
        'images/shark-fin.png',
        'images/enemy-crab.png',
        'images/palm-tree.png',
        'images/bench.png',
        'images/signal-buoy.png',
        'images/sea-rock.png',
        'images/GemBlue.png',
        'images/GemGreen.png',
        'images/GemOrange.png',
        'images/Heart.png',
        'images/treasure-chest.png',
        'images/cliff-hole.png',
        'images/cliff-hole-bars.png',
        'images/gate-key.png',
        'images/way-out.png',
        'images/enemy-bat.png',
        'images/chest-key.png',
        'images/message-key.png',
        'dash-img/dash-chest-key.png',
        'dash-img/dash-gate-key.png',
        'dash-img/dash-health.png',
        'images/treasure-two.png',
        'images/treasure-one.png',
        'images/treasure-three.png',
        'images/winning-message.png',
        'images/game-over-message.png'
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);
