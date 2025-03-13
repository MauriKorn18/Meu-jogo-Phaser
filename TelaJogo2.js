class GameScene2 extends Phaser.Scene {
    constructor() {
        super("GameScene2"); // Inicializa a cena
    }

    init() { // Inicializa as variáveis
        this.player = null;
        this.teclado = null;
        this.fogo = null;
        this.plataforma = null;
        this.plataforma2 = null;
        this.moeda = null;
        this.pontuacao = 0;
        this.placar = null;
    }


    preload() { // Carrega os assets necessários
        this.load.image('background', 'assets/background_game2.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('turbo_nave', 'assets/turbo.png');
        this.load.image('plataforma_tijolo', 'assets/tijolos.png');
        this.load.image('moeda', 'assets/key.png');
        this.load.image('enemy', 'assets/enemy.png');
    }

    create() {
        // Configurações do jogo 
        const larguraJogo = this.scale.width;
        const alturaJogo = this.scale.height;

        // Criando o background
        this.add.image(larguraJogo / 2, alturaJogo / 2, 'background').setScale(2.65);

        // Criando "foguinho" do modo turbo
        this.fogo = this.add.sprite(0, 0, 'turbo_nave').setScale(1.5);
        this.fogo.setVisible(false);

        // Criando o player
        this.player = this.physics.add.sprite(larguraJogo / 2, 1000, 'player').setScale(1.5);
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(1);

        this.teclado = this.input.keyboard.createCursorKeys();

        // Criando plataformas corretamente
        this.plataforma = this.physics.add.staticImage(larguraJogo / 2, alturaJogo / 2, 'plataforma_tijolo').setScale(1.5);
        this.plataforma2 = this.physics.add.staticImage(larguraJogo / 1.2, alturaJogo / 1.5, 'plataforma_tijolo').setScale(1.5);
        this.plataforma3 = this.physics.add.staticImage(larguraJogo, alturaJogo/3, 'plataforma_tijolo').setScale(1.5);
        this.plataforma4 = this.physics.add.staticImage(larguraJogo/3, alturaJogo/4, 'plataforma_tijolo').setScale(1.5);
        this.plataforma5 = this.physics.add.staticImage(larguraJogo/4, alturaJogo/4, 'plataforma_tijolo').setScale(1.5);
        this.plataforma6 = this.physics.add.staticImage(larguraJogo/5, alturaJogo/1.3, 'plataforma_tijolo').setScale(1.5);

        // Adicionando colisão entre o player e as plataformas
        this.physics.add.collider(this.player, this.plataforma);
        this.physics.add.collider(this.player, this.plataforma2);
        this.physics.add.collider(this.player, this.plataforma3);
        this.physics.add.collider(this.player, this.plataforma4);
        this.physics.add.collider(this.player, this.plataforma5);
        this.physics.add.collider(this.player, this.plataforma6);

        // Criando moeda
        this.moeda = this.physics.add.sprite(larguraJogo / 2, 0, 'moeda');
        this.moeda.setCollideWorldBounds(true);
        this.moeda.setBounce(0.7);

        // Criando inimigo
        this.enemy = this.physics.add.sprite(400, 200, 'enemy').setScale(1.5);
        this.enemy.setVelocity(100, 100);
        this.enemy.setBounce(1, 1);
        this.enemy.setCollideWorldBounds(true);

        // Adicionando colisão entre o inimigo e as plataformas
        this.physics.add.collider(this.enemy, this.plataforma);
        this.physics.add.collider(this.enemy, this.plataforma2);
        this.physics.add.collider(this.enemy, this.plataforma3);
        this.physics.add.collider(this.enemy, this.plataforma4);
        this.physics.add.collider(this.enemy, this.plataforma5);
        this.physics.add.collider(this.enemy, this.plataforma6);

        // Adicionando colisão entre o player e o inimigo
        this.physics.add.overlap(this.player, this.moeda, this.collectKey, null, this);
        this.physics.add.overlap(this.player, this.enemy, () => {
        this.scene.start('GameOverScene');
        });

        // Adicionando colisão entre a moeda e as plataformas
        this.physics.add.collider(this.moeda, this.plataforma);
        this.physics.add.collider(this.moeda, this.plataforma2);
        this.physics.add.collider(this.moeda, this.plataforma3);
        this.physics.add.collider(this.moeda, this.plataforma4);
        this.physics.add.collider(this.moeda, this.plataforma5);
        this.physics.add.collider(this.moeda, this.plataforma6);

        // Criando placar
        this.placar = this.add.text(16, 16, 'Placar: ' + this.pontuacao + '/10', {
            fontSize: '32px',
            fill: '#fff'
        });

        // Quando o player encostar na moeda
        this.physics.add.overlap(this.player, this.moeda, () => {
            this.moeda.setVisible(false);

            const posicaoMoeda_X = Phaser.Math.RND.between(50, this.scale.width - 50);
            const posicaoMoeda_Y = Phaser.Math.RND.between(50, this.scale.height - 50);
            this.moeda.setPosition(posicaoMoeda_X, posicaoMoeda_Y);

            this.pontuacao += 1;
            this.placar.setText('Placar: ' + this.pontuacao + '/10');

            this.moeda.setVisible(true);

        // Verifica se a pontuação chegou a 10 e muda para a cena TelaWin
        if (this.pontuacao >= 10) {
            this.scene.start('WinScene');
        }
        });
    }

    update() {
        // Movimento horizontal
        if (this.teclado.left.isDown) {
            this.player.setVelocityX(-350);
        } else if (this.teclado.right.isDown) {
            this.player.setVelocityX(350);
        } else {
            this.player.setVelocityX(0);
        }

        // Movimento vertical
        if (this.teclado.up.isDown) {
            this.player.setVelocityY(-350);
            this.ativarTurbo();
        } else {
            this.semTurbo();
        }

        // Atualiza a posição do "foguinho"
        this.fogo.setPosition(this.player.x, this.player.y + this.player.height);
    }

    ativarTurbo() { // Função que ativa o "foguinho" do modo turbo
        this.fogo.setVisible(true);
    }

    semTurbo() { // Função que desativa o "foguinho" do modo turbo
        this.fogo.setVisible(false);
    }
}