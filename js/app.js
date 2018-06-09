// Enemies our player must avoid

class Enemy {
    constructor(x, y) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 80;
        this.speed = Math.floor((Math.random() * 200) + 100);
    }

    // Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        if (this.x < 505) {
            this.x = this.x + this.speed * dt;
        } else {
            this.x = -101;
        }
        // handleCollision();
    }

    // Draw the enemy on the screen, required method for game

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Heart {
    constructor(x, y) {
        this.sprite = 'images/Heart.png'
        this.count = 3;
        this.x = x;
        this.y = y;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now write your own player class
class Player {
    constructor(x, y) {
        this.sprite = 'images/char-boy.png';
        this.x = x;
        this.y = y;
        this.initX = x;
        this.initY = y;
        this.height = 40;
        this.width = 40;
        this.score = 0;
        this.level = 0;
        this.tries = 3;
    }

    rest() {
        this.x = this.initX;
        this.y = this.initY;
        this.height = 40;
        this.width = 40;
        this.score = 0;
        this.level = 0;
        this.tries = 3;
    }

    // a handleInput() method.
    changeImg(url) {
        this.sprite = url;
    }

    levleUp() {
        this.level += 1;
    }

    handleInput(movement) {
        // up
        play('moving');
        if (this.y > 0 && movement === 'up') {
            this.y -= 83;
        }
        //down
        if (this.y < 405 && movement === 'down') {
            this.y += 83;
        }
        // left
        if (movement === "left") {
            if (this.x > 0) {
                this.x -= 101;
            } else {
                this.x = 404;
            }
        }

        if (movement === "right") {
            if (this.x < 404)
                this.x += 101;

            else
                this.x = 0;

        }


        if (this.y < 0) {
            play('winning');
            this.levleUp();
            this.resetPositon(202, 405);
            statisticsRunner();
        }
        //right
    }

    // This class requires an update(), render() and
    //  update()
    update(dt) {
        if (dt > 0) {
            this.x *= dt;
            this.y *= dt;
        }
    }

    scoreUp(score) {
        this.score += score;
    }

    resetPositon(x, y) {
        this.x = x;
        this.y = y;
    }

    // render()
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// hart class
class Gem {
    constructor(x, y) {
        // creating random index
        this.index = Math.floor(Math.random() * 3 + 1);
        this.sprite = `images/Gem${this.index}.png`;
        this.x = x;
        this.y = y;
        this.val = this.index * 10;
        console.log(this.index, this.val);
        this.height = 60;
        this.width = 80;
    }


    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

}

const audio = {
    gem: 'gem.mp3',
    httingRock: 'htting_rock.mp3',
    hittingBug: 'htting_bug.mp3',
    moving: 'moving.mp3',
    winning: 'winning.mp3',
};
for (let key in audio) {
    const _audio = document.createElement('audio');
    _audio.id = key;
    console.log(key, audio[key]);
    _audio.src = `audio/${audio[key]}`
    document.querySelector('body').appendChild(_audio)

}

function play(audioId) {
    const audio = document.getElementById(audioId);
    audio.play();
    if (audioId !== 'winning') {
        setTimeout(_ => {
            audio.pause();
            audio.currentTime = 0;
        }, 450)
    } else {
        setTimeout(_ => {
            audio.pause();
            audio.currentTime = 0;
        }, 1200)
    }

}

//audio conrol
const bgAudio = document.createElement('audio');
bgAudio.src='audio/Adventureisland.mp3';
bgAudio.autoplay= true;
bgAudio.loop= true;
document.querySelector('body').appendChild(bgAudio);
bgAudio.volume = .4;


class Rock {
    constructor(x, y) {
        // creating random index
        this.sprite = `images/Rock.png`;
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 170;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const validPostion = {
    // x 0 101 202 303  404 y 239 156 75
    validX: [
        0, 101, 202, 303, 404
    ],
    validY: [
        239, 156, 75
    ]
};
const allEnemies = [new Enemy(-50, 73), new Enemy(0, 145), new Enemy(-200, 145), new Enemy(-100, 228)];
// Place the player object in a variable called player
const player = new Player(202, 405);
const hearts = []

function heartsGenrator() {
    if (hearts.length < player.tries)
        for (let i = player.tries - hearts.length; i > 0; i--) {
            hearts.push(new Heart(101 * hearts.length, 450));
        }
    else
        hearts.splice(-1, 1);

}

const gems = [];
const gemsGenrator = () => {
    const gemInterval = setInterval(function () {
        if (gems.length < player.level + 3) {
            gems.push(new Gem(validPostion.validX[Math.floor(Math.random() * 4 + 0)], validPostion.validY[Math.floor(Math.random() * 2 + 0)]))
        } else {
            gems.splice(1, 1)
        }
    }, 7500);

}

const rocks = [];
const rockGenrator = () => {
    const rocksInterval = setInterval(function () {
        if (rocks.length < player.level) {
            rocks.push(new Rock(validPostion.validX[Math.floor(Math.random() * 4 + 0)], validPostion.validY[Math.floor(Math.random() * 4 + 0)]))
        } else {
            rocks.splice(1, 1)
        }

    }, 7500);

};

const statisticsRunner = () => {
    document.querySelector('#level').innerHTML = player.level;
    document.querySelector('#score').innerHTML = player.score;
}

function genInit() {
    rockGenrator();
    gemsGenrator();
    statisticsRunner();
    heartsGenrator();

}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
Array.from(document.querySelectorAll('.chose li')).forEach(function (el) {
    el.addEventListener('click', function () {
        const url = this.querySelector('img').src;
        Array.from(this.parentNode.children).forEach(_ => _.classList.remove('active'));
        this.classList.add('active');
        player.changeImg(url.slice(url.indexOf('images'), url.length));
    })
})
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

function checkCollisions() {
    // with bugs
    collisionHandeler(player, allEnemies, function () {
        player.resetPositon(202, 405);
        heartsGenrator();
        play('hittingBug');
        player.tries--;
        if (player.tries === 0) {
            document.querySelector('.popUp').classList.add('active');
        }
    });
    //with gems
    collisionHandeler(player, gems, function (_, i) {
        gems.splice(i, 1)
        player.scoreUp(_.val);
        console.log(player.score);
        play('gem');

    });
    collisionHandeler(player, rocks, function (_, i) {
        rocks.splice(i, 1)
        player.scoreUp(-10);
        play('httingRock');
        console.log(player.score);
    });
}

function collisionHandeler(player = player, ojectsArr, handelerFn) {
    ojectsArr.forEach((_, i) => {
        if ((player.x > _.x && player.x < _.x + _.width && player.y > _.y && player.y < _.y + _.height) || (player.x === _.x && player.y === _.y)) {
            handelerFn(_, i);
            statisticsRunner();
        }
    })
}
