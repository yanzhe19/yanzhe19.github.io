/// <reference path="../managers/playerasset.ts" />
// spell Class
/*Source  file  name: spell.ts, Author's  name: Andrew Mackle (300603655),
Program description： This is to crate the spell object for the player to cast*/

module objects {
    export class Spell extends createjs.Sprite {
        //define propereties of the spell
        width: number;
        height: number;
        castingStartTime: number;
        spell: Spell;
        spellCastNoise: createjs.SoundInstance;
        player: Player;
        count: number;

        //the constructor of spell class
        constructor(x, y, player) {
            super(managers.PlayerAssets.playerAtlas);
            this.castingStartTime = Date.now();
            this.gotoAndPlay("spell");
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
            if (Math.random() < 0.5) {
                this.spellCastNoise = createjs.Sound.play('spellCastNoise');
                console.log("1");
            } else {
                this.spellCastNoise = createjs.Sound.play('spellCast');
                console.log("2");
            }
            this.y = y;
            this.x = x;
            this.count = 0;
            this.player = player;
            game.addChild(this);
        }

        //Public methods
        public update() {
            this.x += constants.BACKGROUND_MOVING_SPEED;
        }

        //method to destory the spell
        public destroy() {
            this.spellCastNoise.stop();
            this.player.spells.splice(this.player.spells.indexOf(this), 1);
            game.removeChild(this);
        }
    }
}