export const gameConfig = {
    type: Phaser.AUTO,
    backgroundColor: '#ffffff',
    scale: {
        parent: 'phaser-game',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { x: 0, y: 0 }
        }
    },
    plugins: {
        scene: [
            // @ts-ignore
            { key: "SpinePlugin", plugin: window.SpinePlugin, mapping: "spine" }
        ]
    }
}