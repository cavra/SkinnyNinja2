{"filter":false,"title":"physics_functions.js","tooltip":"/js/physics_functions.js","undoManager":{"mark":82,"position":82,"stack":[[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":44,"column":2},"action":"remove","lines":["var BasicGame = {};","","BasicGame.Boot = function (game) {","","};","","BasicGame.Boot.prototype = {","","    init: function () {","","        this.cache.destroy();","","        this.input.maxPointers = 1;","","        this.stage.disableVisibilityChange = true;","","        if (this.game.device.desktop)","        {","            this.scale.pageAlignHorizontally = true;","        }","        else","        {","            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;","            //this.scale.setMinMax(480, 260, 800, 600);","            this.scale.forceLandscape = true;","            this.scale.pageAlignHorizontally = true;","            this.scale.setScreenSize(true);","            this.scale.refresh();","        }","","    },","","    preload: function () {","","        this.load.image('preloaderBackground', 'assets/images/logoscreen.png');","        this.load.image('preloaderBar', 'assets/images/loadingbar.png', 100, 10);","    },","","    create: function () {","","        this.state.start('Preloader');","","    }","","};"]},{"start":{"row":0,"column":0},"end":{"row":348,"column":2},"action":"insert","lines":["var player = null;","","var playerHealth = 0;","var playerMana = 0;","var playerHitTimer = 0;","","var katana_0 = null;","","var jump = null;","","var attackKey = null;","","function Hero(game) {","    this.game = game;","","    this.facing = null;","    this.wallClingLeft = null;","    this.wallClingRight = null;","    this.playerJumpTimer = 0;","    ","    this.cursors = this.game.input.keyboard.createCursorKeys();","    ","\tjump = this.game.add.audio('jump');","\t","\tattackKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);","","}","","Hero.prototype.create = function(x, y) {","","    player = this.game.add.sprite(x, y, 'player');","  ","\tthis.game.camera.follow(player);","    this.game.physics.arcade.enable(player);","","    playerHealth = 5;","    playerMana = 100;","    ","    player.body.bounce.y = 0.1;","    player.body.gravity.y = 1000;","    player.body.collideWorldBounds = true;","    player.anchor.set(0.5);","","    player.animations.add('run', [0, 1], 7, true);","    ","//the weapon","","    katana_0 = this.game.add.sprite(null, null, 'swordHeld');","    katana_0.anchor.setTo(0.5, 0.5);","    katana_0.animations.add('float', Phaser.Animation.generateFrameNames('sword_idle', 1, 8, '.png', 2), 10, true);","    katana_0.animations.add('swing', Phaser.Animation.generateFrameNames('sword_active', 1, 3, '.png', 2), 20, true);","    this.game.physics.arcade.enable(katana_0);","    katana_0.body.moves = false;","    ","    player.addChild(katana_0);","    katana_0.x = 20;","    katana_0.y = -20;","    ","    katana_0.exists = false;","  ","};","","Hero.prototype.update = function() {","    ","    if (100 - gameTimer.seconds < 0)","    {","        this.game_over();","    }","    ","    this.player_physics();","    this.player_controls();","};","","Hero.prototype.player_physics = function() {","    ","    this.game.physics.arcade.collide(player, platforms);","","    this.game.physics.arcade.overlap(player, ruby, this.game_win, null, this);","    this.game.physics.arcade.overlap(player, katana_0_item, this.collect_sword, null, this);","    this.game.physics.arcade.overlap(player, ghosts, this.player_hit, null, this);","    ","    if (!hero.cursorsDownIsDown())","    {","        this.game.physics.arcade.overlap(player, ninjas, this.player_hit, null, this);","    }","    ","};","","Hero.prototype.player_controls = function() {","    ","    this.controls_ground();","    this.controls_air();","    //this.control_water();","   ","    this.controls_universal(); //needs to be after for certain things to work (i.e. \"hiding\")","    ","    this.controls_mobile();","    ","};","","Hero.prototype.controls_universal = function() {","    ","    //universal standards","    player.body.maxVelocity.x = 230;","    player.body.allowGravity = true;","","    //check direction player is facing","    if (this.facing == 'right' && player.scale.x < 0)","    {","        player.scale.x = 1;","    }","    if (this.facing == 'left' && player.scale.x > 0)","    {","        player.scale.x = -1;","    }","\t","\t//alpha for invincibility frames","\tif (playerHitTimer.seconds < 1 && playerHitTimer.running)","\t{","\t    player.alpha = 0.5;","\t}","\telse player.alpha = 1;","\t","\t//hide","\tif (this.cursors.down.isDown && !this.wallClingLeft && !this.wallClingRight && playerMana > 0)","\t{","\t    player.body.velocity.x = 0;","\t    player.body.acceleration.x = 0;","\t    player.frame = 2;","        if (playerMana > 0)","        {","            playerMana -= 0.1;","        }","    }","    ","    //weapons","    if (attackKey.isDown) {","        katana_0.animations.play('swing');","        katana_0.x = 35;","        katana_0.y = -20;","    }","    else ","    {","        katana_0.animations.play('float');","        katana_0.x = 30;","        katana_0.y = -20;","    }\t","    ","};","    ","Hero.prototype.controls_ground = function() {","    ","    //walking","    if (this.cursors.left.isDown)","    {","        this.facing = 'left';","        player.body.acceleration.x= -500;","        player.animations.play('run');","    }","    else if (this.cursors.right.isDown)","    {","        this.facing = 'right';","        player.body.acceleration.x= 500;","        player.animations.play('run');","    }","    //slow the player to a stop","\telse ","    {","        player.body.acceleration.x = 0;","        player.body.drag.x = 1200;","    }","    ","    //idle frames","    if (!this.cursors.left.isDown && !this.cursors.right.isDown && !this.wallClingLeft && !this.wallClingRight)","    {","        player.frame = 0;","    }","\t","\tif (player.body.touching.down && !this.cursors.down.isDown && !this.wallClingLeft && !this.wallClingRight && playerMana <100)","    {","        playerMana += 0.025;","    }","    ","\t//jump","\tif (this.cursors.up.isDown && player.body.touching.down && !this.cursors.down.isDown)","\t{","\t    if (this.playerJumpTimer.seconds > 0.7)","\t    {","    \t    this.playerJumpTimer.destroy();","    \t    ","        \tplayer.body.velocity.y = -600;\t","            jump.play();","            ","            this.playerJumpTimer = this.game.time.create(false);","            this.playerJumpTimer.start();","\t    }","\t    else if (!this.playerJumpTimer.running)","\t    {","        \tplayer.body.velocity.y = -600;\t","            jump.play();","            ","            this.playerJumpTimer = this.game.time.create(false);","            this.playerJumpTimer.start();","\t    }","\t}","    ","};","","Hero.prototype.controls_air = function() {","    ","    //check if rising or falling","    if (!player.body.touching.down && !this.wallClingLeft && !this.wallClingRight)","    {","        if (player.body.velocity.y < 0)","    \t{","            player.frame = 3;","    \t}","    \telse if (player.body.velocity.y > 0)","    \t{","            player.frame = 4;","    \t}","    }        ","    ","\t//wall clinging","    if (player.body.velocity.y !== 0 && !player.body.touching.down && player.body.touching.left && this.cursors.left.isDown && playerMana > 0)","    {","        player.body.moves = false; //stick player to wall","        this.wallClingLeft = true;","    }","    else if (player.body.velocity.y !== 0 && !player.body.touching.down && player.body.touching.right && this.cursors.right.isDown && playerMana > 0)","    {","        player.body.moves = false;","        this.wallClingRight = true;","    }","    ","    if (this.wallClingLeft) ","    {","        player.frame = 5;","        this.facing = 'left';","        if (playerMana > 0)","        {","            playerMana -= 0.1;","        }","    }","    if (this.wallClingRight) ","    {","        player.frame = 5;","        this.facing = 'right';","        if (playerMana > 0)","        {","            playerMana -= 0.1;","        }","    }\t","    //wall jumping","    if (this.wallClingLeft && this.cursors.up.isDown || this.wallClingLeft && playerMana <= 0)","\t{","\t    player.body.moves = true;","    \tplayer.body.velocity.x = 10000;\t","    \tplayer.body.velocity.y = -400;\t","        jump.play();","        this.wallClingLeft = false;","\t}","    if (this.wallClingRight && this.cursors.up.isDown || this.wallClingRight && playerMana <= 0)","\t{","\t    player.body.moves = true;","    \tplayer.body.velocity.x = -800;\t","    \tplayer.body.velocity.y = -400;\t","        jump.play();","        this.wallClingRight = false;","\t}","    ","};","    ","Hero.prototype.controls_mobile = function() {","    ","    //mobile controls","    if (this.game.device.mobile && this.input.activePointer.isDown)","    {","       this.physics.arcade.moveToPointer(player, 300, this.input.activePointer, 0);","    ","        if (Phaser.Rectangle.contains(player.body, this.input.x, this.input.y))","        {","        \tplayer.body.velocity.setTo(0, 0);","        }","\t}","    ","};","    ","Hero.prototype.player_hit = function() {","    ","    if (playerHitTimer.seconds > 1)","    {","        playerHitTimer.destroy();","        ","        playerHealth -= 1;","        ","        jump.play();","","        playerHitTimer = this.game.time.create(false);","        playerHitTimer.start();","    }","    else if (!playerHitTimer.running)","    {","        playerHealth -= 1;","        ","        jump.play();","","        playerHitTimer = this.game.time.create(false);","        playerHitTimer.start();","    }","    ","    if (playerHealth === 0)","    {","        this.game_over();","    }","};","","Hero.prototype.collect_sword = function(player, sword) {","","    sword.kill();","    ","    katana_0.exists = true;","    ","\tvar item = this.game.add.audio('item');","    item.play();","};","","Hero.prototype.game_win = function() {","","    this.game.camera.reset();","","    this.game.state.start('level_1');","","};","","Hero.prototype.game_over = function() {","","    this.game.camera.reset();","","    this.game.state.start('main_menu');","","};","","Hero.prototype.cursorsDownIsDown = function() {","    if (this.cursors.down.isDown)","        {","            return true;","        }","};"]}]}],[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":11,"column":0},"action":"remove","lines":["var player = null;","","var playerHealth = 0;","var playerMana = 0;","var playerHitTimer = 0;","","var katana_0 = null;","","var jump = null;","","var attackKey = null;",""]}]}],[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":1,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":2,"column":0},"end":{"row":12,"column":64},"action":"remove","lines":["","    this.facing = null;","    this.wallClingLeft = null;","    this.wallClingRight = null;","    this.playerJumpTimer = 0;","    ","    this.cursors = this.game.input.keyboard.createCursorKeys();","    ","\tjump = this.game.add.audio('jump');","\t","\tattackKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);"]}]}],[{"group":"doc","deltas":[{"start":{"row":1,"column":21},"end":{"row":2,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":7,"column":3},"end":{"row":35,"column":28},"action":"remove","lines":[" player = this.game.add.sprite(x, y, 'player');","  ","\tthis.game.camera.follow(player);","    this.game.physics.arcade.enable(player);","","    playerHealth = 5;","    playerMana = 100;","    ","    player.body.bounce.y = 0.1;","    player.body.gravity.y = 1000;","    player.body.collideWorldBounds = true;","    player.anchor.set(0.5);","","    player.animations.add('run', [0, 1], 7, true);","    ","//the weapon","","    katana_0 = this.game.add.sprite(null, null, 'swordHeld');","    katana_0.anchor.setTo(0.5, 0.5);","    katana_0.animations.add('float', Phaser.Animation.generateFrameNames('sword_idle', 1, 8, '.png', 2), 10, true);","    katana_0.animations.add('swing', Phaser.Animation.generateFrameNames('sword_active', 1, 3, '.png', 2), 20, true);","    this.game.physics.arcade.enable(katana_0);","    katana_0.body.moves = false;","    ","    player.addChild(katana_0);","    katana_0.x = 20;","    katana_0.y = -20;","    ","    katana_0.exists = false;"]}]}],[{"group":"doc","deltas":[{"start":{"row":7,"column":2},"end":{"row":7,"column":3},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":7,"column":1},"end":{"row":7,"column":2},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":7,"column":0},"end":{"row":7,"column":1},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":6,"column":0},"end":{"row":7,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":40},"end":{"row":6,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":10,"column":0},"end":{"row":17,"column":27},"action":"remove","lines":["    ","    if (100 - gameTimer.seconds < 0)","    {","        this.game_over();","    }","    ","    this.player_physics();","    this.player_controls();"]}]}],[{"group":"doc","deltas":[{"start":{"row":9,"column":36},"end":{"row":10,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":9,"column":36},"end":{"row":10,"column":0},"action":"insert","lines":["",""]},{"start":{"row":10,"column":0},"end":{"row":10,"column":4},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":14,"column":0},"end":{"row":25,"column":4},"action":"remove","lines":["    ","    this.game.physics.arcade.collide(player, platforms);","","    this.game.physics.arcade.overlap(player, ruby, this.game_win, null, this);","    this.game.physics.arcade.overlap(player, katana_0_item, this.collect_sword, null, this);","    this.game.physics.arcade.overlap(player, ghosts, this.player_hit, null, this);","    ","    if (!hero.cursorsDownIsDown())","    {","        this.game.physics.arcade.overlap(player, ninjas, this.player_hit, null, this);","    }","    "]}]}],[{"group":"doc","deltas":[{"start":{"row":13,"column":44},"end":{"row":14,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":13,"column":44},"end":{"row":14,"column":0},"action":"insert","lines":["",""]},{"start":{"row":14,"column":0},"end":{"row":14,"column":4},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":4,"column":0},"end":{"row":216,"column":4},"action":"remove","lines":["","Hero.prototype.create = function(x, y) {","  ","};","","Hero.prototype.update = function() {","    ","};","","Hero.prototype.player_physics = function() {","    ","};","","Hero.prototype.player_controls = function() {","    ","    this.controls_ground();","    this.controls_air();","    //this.control_water();","   ","    this.controls_universal(); //needs to be after for certain things to work (i.e. \"hiding\")","    ","    this.controls_mobile();","    ","};","","Hero.prototype.controls_universal = function() {","    ","    //universal standards","    player.body.maxVelocity.x = 230;","    player.body.allowGravity = true;","","    //check direction player is facing","    if (this.facing == 'right' && player.scale.x < 0)","    {","        player.scale.x = 1;","    }","    if (this.facing == 'left' && player.scale.x > 0)","    {","        player.scale.x = -1;","    }","\t","\t//alpha for invincibility frames","\tif (playerHitTimer.seconds < 1 && playerHitTimer.running)","\t{","\t    player.alpha = 0.5;","\t}","\telse player.alpha = 1;","\t","\t//hide","\tif (this.cursors.down.isDown && !this.wallClingLeft && !this.wallClingRight && playerMana > 0)","\t{","\t    player.body.velocity.x = 0;","\t    player.body.acceleration.x = 0;","\t    player.frame = 2;","        if (playerMana > 0)","        {","            playerMana -= 0.1;","        }","    }","    ","    //weapons","    if (attackKey.isDown) {","        katana_0.animations.play('swing');","        katana_0.x = 35;","        katana_0.y = -20;","    }","    else ","    {","        katana_0.animations.play('float');","        katana_0.x = 30;","        katana_0.y = -20;","    }\t","    ","};","    ","Hero.prototype.controls_ground = function() {","    ","    //walking","    if (this.cursors.left.isDown)","    {","        this.facing = 'left';","        player.body.acceleration.x= -500;","        player.animations.play('run');","    }","    else if (this.cursors.right.isDown)","    {","        this.facing = 'right';","        player.body.acceleration.x= 500;","        player.animations.play('run');","    }","    //slow the player to a stop","\telse ","    {","        player.body.acceleration.x = 0;","        player.body.drag.x = 1200;","    }","    ","    //idle frames","    if (!this.cursors.left.isDown && !this.cursors.right.isDown && !this.wallClingLeft && !this.wallClingRight)","    {","        player.frame = 0;","    }","\t","\tif (player.body.touching.down && !this.cursors.down.isDown && !this.wallClingLeft && !this.wallClingRight && playerMana <100)","    {","        playerMana += 0.025;","    }","    ","\t//jump","\tif (this.cursors.up.isDown && player.body.touching.down && !this.cursors.down.isDown)","\t{","\t    if (this.playerJumpTimer.seconds > 0.7)","\t    {","    \t    this.playerJumpTimer.destroy();","    \t    ","        \tplayer.body.velocity.y = -600;\t","            jump.play();","            ","            this.playerJumpTimer = this.game.time.create(false);","            this.playerJumpTimer.start();","\t    }","\t    else if (!this.playerJumpTimer.running)","\t    {","        \tplayer.body.velocity.y = -600;\t","            jump.play();","            ","            this.playerJumpTimer = this.game.time.create(false);","            this.playerJumpTimer.start();","\t    }","\t}","    ","};","","Hero.prototype.controls_air = function() {","    ","    //check if rising or falling","    if (!player.body.touching.down && !this.wallClingLeft && !this.wallClingRight)","    {","        if (player.body.velocity.y < 0)","    \t{","            player.frame = 3;","    \t}","    \telse if (player.body.velocity.y > 0)","    \t{","            player.frame = 4;","    \t}","    }        ","    ","\t//wall clinging","    if (player.body.velocity.y !== 0 && !player.body.touching.down && player.body.touching.left && this.cursors.left.isDown && playerMana > 0)","    {","        player.body.moves = false; //stick player to wall","        this.wallClingLeft = true;","    }","    else if (player.body.velocity.y !== 0 && !player.body.touching.down && player.body.touching.right && this.cursors.right.isDown && playerMana > 0)","    {","        player.body.moves = false;","        this.wallClingRight = true;","    }","    ","    if (this.wallClingLeft) ","    {","        player.frame = 5;","        this.facing = 'left';","        if (playerMana > 0)","        {","            playerMana -= 0.1;","        }","    }","    if (this.wallClingRight) ","    {","        player.frame = 5;","        this.facing = 'right';","        if (playerMana > 0)","        {","            playerMana -= 0.1;","        }","    }\t","    //wall jumping","    if (this.wallClingLeft && this.cursors.up.isDown || this.wallClingLeft && playerMana <= 0)","\t{","\t    player.body.moves = true;","    \tplayer.body.velocity.x = 10000;\t","    \tplayer.body.velocity.y = -400;\t","        jump.play();","        this.wallClingLeft = false;","\t}","    if (this.wallClingRight && this.cursors.up.isDown || this.wallClingRight && playerMana <= 0)","\t{","\t    player.body.moves = true;","    \tplayer.body.velocity.x = -800;\t","    \tplayer.body.velocity.y = -400;\t","        jump.play();","        this.wallClingRight = false;","\t}","    ","};","    ","Hero.prototype.controls_mobile = function() {","    ","    //mobile controls","    if (this.game.device.mobile && this.input.activePointer.isDown)","    {","       this.physics.arcade.moveToPointer(player, 300, this.input.activePointer, 0);","    ","        if (Phaser.Rectangle.contains(player.body, this.input.x, this.input.y))","        {","        \tplayer.body.velocity.setTo(0, 0);","        }","\t}","    ","};","    "]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":0},"end":{"row":5,"column":4},"action":"remove","lines":["Hero"]},{"start":{"row":5,"column":0},"end":{"row":5,"column":1},"action":"insert","lines":["p"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":0},"end":{"row":5,"column":1},"action":"remove","lines":["p"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":0},"end":{"row":5,"column":1},"action":"insert","lines":["P"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":1},"end":{"row":5,"column":2},"action":"insert","lines":["h"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":2},"end":{"row":5,"column":3},"action":"insert","lines":["y"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":3},"end":{"row":5,"column":4},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":4},"end":{"row":5,"column":5},"action":"insert","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":5},"end":{"row":5,"column":6},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":6},"end":{"row":5,"column":7},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":0},"end":{"row":5,"column":7},"action":"remove","lines":["Physics"]},{"start":{"row":5,"column":0},"end":{"row":5,"column":1},"action":"insert","lines":["p"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":0},"end":{"row":5,"column":1},"action":"remove","lines":["p"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":0},"end":{"row":5,"column":1},"action":"insert","lines":["P"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":1},"end":{"row":5,"column":2},"action":"insert","lines":["h"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":2},"end":{"row":5,"column":3},"action":"insert","lines":["y"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":3},"end":{"row":5,"column":4},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":4},"end":{"row":5,"column":5},"action":"insert","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":5},"end":{"row":5,"column":6},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":6},"end":{"row":5,"column":7},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":7},"end":{"row":5,"column":8},"action":"insert","lines":["l"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":7},"end":{"row":5,"column":8},"action":"remove","lines":["l"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":6},"end":{"row":5,"column":7},"action":"remove","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":5},"end":{"row":5,"column":6},"action":"remove","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":4},"end":{"row":5,"column":5},"action":"remove","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":3},"end":{"row":5,"column":4},"action":"remove","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":2},"end":{"row":5,"column":3},"action":"remove","lines":["y"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":1},"end":{"row":5,"column":2},"action":"remove","lines":["h"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":0},"end":{"row":5,"column":1},"action":"remove","lines":["P"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":0},"end":{"row":5,"column":1},"action":"insert","lines":["A"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":0},"end":{"row":5,"column":1},"action":"remove","lines":["A"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":0},"end":{"row":5,"column":1},"action":"insert","lines":["P"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":1},"end":{"row":5,"column":2},"action":"insert","lines":["h"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":2},"end":{"row":5,"column":3},"action":"insert","lines":["y"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":3},"end":{"row":5,"column":4},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":4},"end":{"row":5,"column":5},"action":"insert","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":5},"end":{"row":5,"column":6},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":6},"end":{"row":5,"column":7},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":7},"end":{"row":5,"column":8},"action":"insert","lines":["_"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":8},"end":{"row":5,"column":9},"action":"insert","lines":["E"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":9},"end":{"row":5,"column":10},"action":"insert","lines":["v"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":10},"end":{"row":5,"column":11},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":11},"end":{"row":5,"column":12},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":12},"end":{"row":5,"column":13},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":13},"end":{"row":5,"column":14},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":13},"end":{"row":5,"column":14},"action":"remove","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":12},"end":{"row":5,"column":13},"action":"remove","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":11},"end":{"row":5,"column":12},"action":"remove","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":10},"end":{"row":5,"column":11},"action":"remove","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":9},"end":{"row":5,"column":10},"action":"remove","lines":["v"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":8},"end":{"row":5,"column":9},"action":"remove","lines":["E"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":8},"end":{"row":5,"column":9},"action":"insert","lines":["F"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":9},"end":{"row":5,"column":10},"action":"insert","lines":["u"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":10},"end":{"row":5,"column":11},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":11},"end":{"row":5,"column":12},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":12},"end":{"row":5,"column":13},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":13},"end":{"row":5,"column":14},"action":"insert","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":14},"end":{"row":5,"column":15},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":15},"end":{"row":5,"column":16},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":16},"end":{"row":5,"column":17},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":0,"column":9},"end":{"row":0,"column":13},"action":"remove","lines":["Hero"]},{"start":{"row":0,"column":9},"end":{"row":0,"column":26},"action":"insert","lines":["Physics_Functions"]}]}],[{"group":"doc","deltas":[{"start":{"row":34,"column":0},"end":{"row":34,"column":4},"action":"remove","lines":["Hero"]},{"start":{"row":34,"column":0},"end":{"row":34,"column":17},"action":"insert","lines":["Physics_Functions"]}]}],[{"group":"doc","deltas":[{"start":{"row":44,"column":0},"end":{"row":44,"column":4},"action":"remove","lines":["Hero"]},{"start":{"row":44,"column":0},"end":{"row":44,"column":17},"action":"insert","lines":["Physics_Functions"]}]}],[{"group":"doc","deltas":[{"start":{"row":52,"column":0},"end":{"row":52,"column":4},"action":"remove","lines":["Hero"]},{"start":{"row":52,"column":0},"end":{"row":52,"column":17},"action":"insert","lines":["Physics_Functions"]}]}],[{"group":"doc","deltas":[{"start":{"row":60,"column":0},"end":{"row":60,"column":4},"action":"remove","lines":["Hero"]},{"start":{"row":60,"column":0},"end":{"row":60,"column":17},"action":"insert","lines":["Physics_Functions"]}]}],[{"group":"doc","deltas":[{"start":{"row":59,"column":0},"end":{"row":65,"column":2},"action":"remove","lines":["","Physics_Functions.prototype.cursorsDownIsDown = function() {","    if (this.cursors.down.isDown)","        {","            return true;","        }","};"]}]}],[{"group":"doc","deltas":[{"start":{"row":58,"column":2},"end":{"row":59,"column":0},"action":"remove","lines":["",""]}]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":58,"column":2},"end":{"row":58,"column":2},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1421620032599,"hash":"a0b9f5511829e88c9ab18463c732783cf3197528"}