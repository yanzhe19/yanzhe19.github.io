/*Source  file  name: playerAsset.ts, Author's  name: Andrew Mackle (300603655), 
description： This is the player asset manager file which controls all the assets associated with the player(image,audio,sprite sheet and so on) used in the game*/

//player asset manager
module managers {
    // Image and Sound Manifest;
    var playerManifest = [
        { id: "backgroundSound", src: "assets/sounds/Plastic3_-_Epic_Dramatic_Loop.mp3" },
        { id: "spellCastNoise", src: "assets/sounds/spellCastNoise.mp3" },
        { id: "spellCast", src: "assets/sounds/spellCast.mp3" }
    ];

    // SpriteSheet Data Object for the player object
    var playerSpriteSheetData = {
        "images": ["assets/images/playerSpriteSheet.png"],
        "frames": [

            [0, 0, 54, 72],
            [54, 0, 54, 72],
            [108, 0, 54, 72],
            [162, 0, 54, 72],
            [0, 79, 54, 72],
            [57, 80, 54, 72],
            [110, 80, 54, 72],
            [0, 170, 54, 72],
            [54, 170, 54, 72],
            [108, 170, 54, 72],
            [162, 170, 54, 72],
            [410, 2, 54, 73],
            [480, 13, 68, 62],
            [547, 0, 108, 107]

        ],
        "animations": {

            "run": {
                "frames": [0, 1, 2, 3],
                "speed": 0.2
            },
            "walk": {
                "frames": [0, 1, 2, 3],
                "speed": 0.2
            },
            "sprint": {
                "frames": [0, 1, 2, 3],
                "speed": 0.4
            },
            "idle": {
                "frames": [4, 5, 6, 5],
                "speed": 0.05
            },
            "battle ready": {
                "frames": [7, 8, 9, 10],
                "speed": 0.05
            },
            "jump": {
                "frames": [11],
                "speed": 0.05
            },
            "land": {
                "frames": [12]
            },
            "spell": {
                "frames": [13]
            }
        }
    }

    // Asset Manager Class
    export class PlayerAssets {
        public static manifest;
        public static data;

        public static loader;
        public static playerAtlas: createjs.SpriteSheet;

        //load the assets
        public static init() {
            createjs.Sound.initializeDefaultPlugins();
            this.loader = new createjs.LoadQueue();
            this.loader.installPlugin(createjs.Sound);
            this.loader.loadManifest(playerManifest);
            //atlas for the player
            this.playerAtlas = new createjs.SpriteSheet(playerSpriteSheetData);
        }

    }
} 