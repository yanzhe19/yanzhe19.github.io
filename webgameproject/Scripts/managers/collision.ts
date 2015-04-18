/// <reference path="../objects/scoreboard.ts" />

/*Source  file  name: collision.ts, Author's  name: Zhe Yan (300706310),  Last  Modified  by: Zhe Yan,  
Date  last  Modified: 2015_3_18,  Program description： This file check if two objects are collide (fish&submarine, fish&smallFish), if collide, the corresponding action will taken(point or life increase/decrease and game over)
Revision  History : Version 2.0*/

// Collision Manager Class
module managers {
    export class Collision {
        // class variables
        private playerObj: objects.Player;
        private fences = [];
        private ghosts = [];
        private fireballs = [];
        private crystals = [];
        private scoreboard: objects.Scoreboard;

        //constructor
        constructor(playerObj: objects.Player, crystals, fences, ghosts, fireballs, scoreboard: objects.Scoreboard) {
            this.playerObj = playerObj;
            this.fences = fences;
            this.ghosts = ghosts;
            this.fireballs = fireballs;
            this.crystals = crystals;
            this.scoreboard = scoreboard;
        }

        // Utility method - Distance calculation between two points
        private distance(p1: createjs.Point, p2: createjs.Point): number {
            var result: number = 0;
            var xPoints: number = 0;
            var yPoints: number = 0;

            xPoints = p2.x - p1.x;
            xPoints = xPoints * xPoints;

            yPoints = p2.y - p1.y;
            yPoints = yPoints * yPoints;

            result = Math.sqrt(xPoints + yPoints);

            return result;
        }

        // check collision between player and any crystal object
        private playerAndCrystal(crystal: objects.Crystal) {
            var p1: createjs.Point = new createjs.Point();
            var p2: createjs.Point = new createjs.Point();
            p1.x = this.playerObj.x;
            p1.y = this.playerObj.y;
            p2.x = crystal.image.x;
            p2.y = crystal.image.y;
            if (this.distance(p1, p2) < ((this.playerObj.height / 2) + (crystal.height / 2))) {
                createjs.Sound.play("pickup");
                this.scoreboard.score += 100;
                crystal.reset();
            }
        }

        // check collision between player and fence
        private playerAndFence(fence: objects.Fence) {
            var p1: createjs.Point = new createjs.Point();
            var p2: createjs.Point = new createjs.Point();
            p1.x = this.playerObj.x;
            p1.y = this.playerObj.y;
            p2.x = fence.image.x;
            p2.y = fence.image.y;
            if (this.distance(p1, p2) < ((this.playerObj.height / 2) + (fence.height / 2))) {
                createjs.Sound.play("explode"); 
                this.scoreboard.lives -= 1;
                fence.reset();
            }
        }

        // check collision between player and ghost
        private playerAndGhost(ghost: objects.Ghost) {
            var p1: createjs.Point = new createjs.Point();
            var p2: createjs.Point = new createjs.Point();
            p1.x = this.playerObj.x;
            p1.y = this.playerObj.y;
            p2.x = ghost.image.x;
            p2.y = ghost.image.y;
            if (this.distance(p1, p2) < ((this.playerObj.height / 2) + (ghost.height / 2))) {
                createjs.Sound.play("explode");
                this.scoreboard.lives -= 1;
                ghost.reset();
            }
        }

        // check collision between player and fence
        private playerAndFireball(fireball: objects.Fireball) {
            var p1: createjs.Point = new createjs.Point();
            var p2: createjs.Point = new createjs.Point();
            p1.x = this.playerObj.x;
            p1.y = this.playerObj.y;
            p2.x = fireball.image.x;
            p2.y = fireball.image.y;
            if (this.distance(p1, p2) < ((this.playerObj.height / 2) + (fireball.height / 2))) {
                createjs.Sound.play("explode");
                this.scoreboard.lives -= 1;
                fireball.destroy();
            }
        }

        // check collision between spell and ghost
        private spellAndGhost(spell: objects.Spell, ghost: objects.Ghost) {
            var p1: createjs.Point = new createjs.Point();
            var p2: createjs.Point = new createjs.Point();
            p1.x = ghost.image.x;
            p1.y = ghost.image.y;
            p2.x = spell.x;
            p2.y = spell.y;
            if (this.distance(p1, p2) < ((ghost.height / 2) + (spell.height / 2))) {
                createjs.Sound.play("explode");
                ghost.destroy();
                spell.destroy();
            }
        }

        //create spell
        channelSpell(spell: objects.Spell) {
            if ((Date.now() - spell.castingStartTime) >= 5000) {
                this.scoreboard.score -= 1;
                spell.destroy();
            }
            else if ((Date.now() - spell.castingStartTime) >= 4500 && spell.count < 9) {
                this.scoreboard.score -= 1;
                spell.count++;
            }
            else if ((Date.now() - spell.castingStartTime) >= 4000 && spell.count < 8) {
                this.scoreboard.score -= 1;
                spell.count++;
            }
            else if ((Date.now() - spell.castingStartTime) >= 3500 && spell.count < 7) {
                this.scoreboard.score -= 1;
                spell.count++;
            }
            else if ((Date.now() - spell.castingStartTime) >= 3000 && spell.count < 6) {
                this.scoreboard.score -= 1;
                spell.count++;
            }
            else if ((Date.now() - spell.castingStartTime) >= 2500 && spell.count < 5) {
                this.scoreboard.score -= 1;
                spell.count++;
            }
            else if ((Date.now() - spell.castingStartTime) >= 2000 && spell.count < 4) {
                this.scoreboard.score -= 1;
                spell.count++;
            }
            else if ((Date.now() - spell.castingStartTime) >= 1500 && spell.count < 3) {
                this.scoreboard.score -= 1;
                spell.count++;
            }
            else if ((Date.now() - spell.castingStartTime) >= 1000 && spell.count < 2) {
                this.scoreboard.score -= 1;
                spell.count++;
            }
            else if ((Date.now() - spell.castingStartTime) >= 500 && spell.count < 1) {
                this.scoreboard.score -= 1;
                spell.count++;
            }
        }

        // Utility Function to Check Collisions
        update() {
            //check collision for crystal and player avatar
            for (var count = 0; count < this.crystals.length; count++) {
                this.playerAndCrystal(this.crystals[count]);
            }
            //check collision for fence and player avatar
            for (var count = 0; count < this.fences.length; count++) {
                this.playerAndFence(this.fences[count]);
            }
            //check collision for ghost and player avatar
            for (var count = 0; count < this.ghosts.length; count++) {
                this.playerAndGhost(this.ghosts[count]);
            }
            //check collision for fireball and player avatar
            for (var count = 0; count < this.fireballs.length; count++) {
                this.playerAndFireball(this.fireballs[count]);
            }
            //check collision for all spells and all gohost
            for (var count = 0; count < this.playerObj.spells.length; count++) {
                for (var countI = 0; countI < this.ghosts.length; countI++) {
                    this.spellAndGhost(this.playerObj.spells[count], this.ghosts[countI]);
                }
            }
            //channel mana into spells per second
            for (var count = 0; count < this.playerObj.spells.length; count++) {
                if (this.scoreboard.score > 0) {
                    this.channelSpell(this.playerObj.spells[count]);
                } else {
                    this.playerObj.spells[count].destroy();
                }
            }
        }
    }
} 