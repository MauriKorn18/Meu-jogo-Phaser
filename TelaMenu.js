class MenuScene extends Phaser.Scene {
    constructor() {
        super("MenuScene"); // Inicializa a cena
    }

    preload() {
        this.load.image('startButton', 'assets/start.png');
        this.load.image('backgroundMenu', 'assets/background_menu.png');
    }

    create() {
        this.add.image(400, 300, 'backgroundMenu').setScale(2.65);
        let startButton = this.add.image(700, 500, 'startButton').setInteractive().setScale(2.5);
        startButton.on('pointerdown', () => { // Adiciona um evento de clique
            this.scene.start('GameScene'); // Após o clique, inicia a cena GameScene
        });
    }
}
