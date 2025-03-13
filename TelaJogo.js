
class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene"); // Inicializa a cena
        this.score = 0; // Inicializa a variável de pontuação
        this.hasKey = false; // Inicializa a variável que verifica se o jogador tem a chave
    }

    preload() {
        this.load.image('player', 'assets/player.png');
        this.load.image('key', 'assets/key.png');
        this.load.image('enemy', 'assets/enemy.png');
        this.load.image('door', 'assets/door.png');
        this.load.tilemapTiledJSON('map', 'assets/map.json');
        this.load.image('tiles', 'assets/tileset.png');
        this.load.image('backgroundGame', 'assets/background_game.png');
    }

    create() {
        this.add.image(400, 300, 'backgroundGame').setScale(2.65);
        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage("tileset", "tiles");
        map.createLayer("Ground", tileset, 0, 0);
        
        this.player = this.physics.add.sprite(100, 100, 'player').setScale(1.5);
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0.2);
        
        this.spawnKey();
        this.door = this.physics.add.sprite(1370, 900, 'door').setScale(2);
        this.physics.add.overlap(this.player, this.door, this.enterDoor, null, this); // Adiciona a colisão com a porta
        
        this.enemy = this.physics.add.sprite(400, 200, 'enemy').setScale(1.5);
        this.enemy.setVelocity(100, 100);
        this.enemy.setBounce(1, 1);
        this.enemy.setCollideWorldBounds(true);

        this.scoreText = this.add.text(16, 16, 'Placar: 0', { fontSize: '32px', fill: '#fff' });

        this.physics.add.overlap(this.player, this.keyItem, this.collectKey, null, this);
        this.physics.add.overlap(this.player, this.enemy, () => {
            this.scene.start('GameOverScene');
        });

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        this.player.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-350);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(350);
        }

        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-350);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(350);
        }
    }

    spawnKey() {
        if (this.keyItem) { 
            this.keyItem.destroy(); // Destroi a chave anterior
        } 
        // Gera uma nova posição para a chave
        let x = Phaser.Math.Between(50, 750);
        let y = Phaser.Math.Between(50, 550);
        this.keyItem = this.physics.add.sprite(x, y, 'key').setScale(1.7); // Adiciona a chave
        this.physics.add.overlap(this.player, this.keyItem, this.collectKey, null, this); // Adiciona a colisão com a chave
        this.hasKey = false; // Reseta a variável que verifica se o jogador tem a chave
    }

    collectKey(player, key) { // Função que é chamada quando o jogador pega a chave
        this.score += 10;
        this.scoreText.setText('Placar: ' + this.score);
        key.destroy();
        this.hasKey = true;
    }

    enterDoor(player, door) { // Função que é chamada quando o jogador entra na porta 
        if (this.hasKey) {
            this.scene.start('GameScene2'); // Inicia a próxima fase
        }
    }
}
