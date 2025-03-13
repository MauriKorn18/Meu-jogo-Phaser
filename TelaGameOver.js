
class GameOverScene extends Phaser.Scene {
    constructor() {
        super("GameOverScene"); // Inicializa a cena
    }

    preload() {
        this.load.image('backgroundGameOver', 'assets/background_gameover.png');
    }

    create() {
        this.add.image(400, 300, 'backgroundGameOver').setScale(2.65);
        this.input.on('pointerdown', () => { // Adiciona um evento de clique
            this.scene.start('MenuScene'); // Após o clique, inicia a cena MenuScene
        });
    }
}
