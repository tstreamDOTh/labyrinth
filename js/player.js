function newPlayer() {
    return new Player();
}

function Player() {
    this.currentTile = NullTile;
    this.moves = 0;

    // Create inventory instance
    this.inventory = new inventory();
    this.badges = new badges();

    this.enter = function(tile) {
        this.currentTile.playerLeaves(this);
        this.currentTile = tile;
        this.currentTile.playerEnters(this);
    };

    this.canMoveLeft = function() {
        return this.currentTile.canLeaveToTheLeft(this) &&
            this.currentTile.tileToTheLeft().canEnterFromTheRight(this);
    };
    this.canMoveRight = function() {
        return this.currentTile.canLeaveToTheRight(this) &&
            this.currentTile.tileToTheRight().canEnterFromTheLeft(this);
    };
    this.canMoveUp = function() {
        return this.currentTile.canLeaveToTheTop(this) &&
            this.currentTile.tileToTheTop().canEnterFromTheBottom(this);
    };
    this.canMoveDown = function() {
        return this.currentTile.canLeaveToTheBottom(this) &&
            this.currentTile.tileToTheBottom().canEnterFromTheTop(this);
    };
    this.moveRight = function() {
        this.enter(this.currentTile.tileToTheRight());
        this.moves++;
    };
    this.moveLeft = function() {
        this.enter(this.currentTile.tileToTheLeft());
        this.moves++;
    };
    this.moveUp = function() {
        this.enter(this.currentTile.tileToTheTop());
        this.moves++;
    };
    this.moveDown = function() {
        this.enter(this.currentTile.tileToTheBottom());
        this.moves++;
    };
    this.startAt = function(tile) {
        this.addPlayer(tile);
        this.enter(tile);
    };
    this.logPosition = function() {
        console.log("Player position:", this.currentTile.position);
        $("#playerMoves").html(this.moves);
    };
    this.addPlayer = function(tile) {
        var embed = document.createElement("embed");
        embed.id = "player";
        embed.src = "characters/robo.svg";
        embed.type = "image/svg+xml";
        embed.style.width = "55px";
        embed.style.height = "60px";
        embed.classList.add("image");
        embed.style.position = "absolute";
        embed.style.zIndex = "10000";
        var container = document.getElementById("tiles");
        container.appendChild(embed);
    };
    this.setPosition = function(xcordinate, ycordinate) {
        document.getElementById("player").style.left = xcordinate + "px";
        document.getElementById("player").style.top = ycordinate + "px";
    };
    this.changeCharacter = function(character_src) {
        document.getElementById("player").src = character_src;
    };
}
