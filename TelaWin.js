
class WinScene extends Phaser.Scene {
    constructor() {
        super("WinScene"); // Inicializa a cena
    }

    preload() {
        this.load.image('backgroundWin', 'assets/background_win.png');
    }

    create() {
        this.add.image(400, 300, 'backgroundWin').setScale(2.65);
        this.input.on('pointerdown', () => { // Adiciona um evento de clique
            this.scene.start('MenuScene'); // Após o clique, inicia a cena MenuScene
        });
    }
}
