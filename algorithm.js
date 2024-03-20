const scene = document.getElementById('scene');
const numBoxes = 5;

function creator(imagePath) {
    const box1 = document.createElement('div');
    box1.style.position = 'absolute';
    box1.style.height = '50px';
    box1.style.width = '50px';
    box1.style.backgroundImage = `url('${imagePath}')`;
    box1.style.backgroundSize = 'cover';

    var newX = Math.floor(Math.random() * window.innerWidth);
    var newY = Math.floor(Math.random() * window.innerHeight);
    box1.style.left = `${newX}px`;
    box1.style.top = `${newY}px`;

    scene.appendChild(box1);
    var rightR = true;
    var leftL = true;

    if (newX % 2 == 0)
        rightR = false;
    if (newY % 2 == 0)
        leftL = false;

    function movement() {
        var position = box1.getBoundingClientRect();
        var x = position.left;
        var y = position.top;

        if (x >= window.innerWidth || x <= 0)
            rightR = !rightR;
        if (y >= window.innerHeight || y <= 0)
            leftL = !leftL;

        if (rightR)
            newX += 2;
        else
            newX -= 2;
        if (leftL)
            newY += 2;
        else
            newY -= 2;
        box1.style.left = `${newX}px`;
        box1.style.top = `${newY}px`;
    }

    setInterval(movement, 1);
    return box1;
}

const boxes = [];

for (let i = 0; i < numBoxes; i++) {
    const box = new creator("rock.png", false, true);
    boxes.push(box);
}

for (let i = 0; i < numBoxes; i++) {
    const box = creator("paper.png");
    boxes.push(box);
}
for (let i = 0; i < numBoxes; i++) {
    const box = creator("scissor.png");
    boxes.push(box);
}
console.log(boxes[0].style.backgroundImage)
function collider() {
    for (let i = 0; i < boxes.length; i++) {
        for (let j = 0; j < boxes.length; j++) {
            if (i !== j) {
                const box1 = boxes[i];
                const box2 = boxes[j];

                const rect1 = box1.getBoundingClientRect();
                const rect2 = box2.getBoundingClientRect();

                if (!(rect1.right < rect2.left ||
                    rect1.left > rect2.right ||
                    rect1.bottom < rect2.top ||
                    rect1.top > rect2.bottom)) {

                    if (box1.style.backgroundImage == `url("rock.png")` && box2.style.backgroundImage == `url("paper.png")`) {
                        box1.style.backgroundImage = `url("paper.png")`;
                    }
                    if (box1.style.backgroundImage == `url("paper.png")` && box2.style.backgroundImage == `url("rock.png")`) {
                        box2.style.backgroundImage = `url("paper.png")`;
                    }
                    if (box1.style.backgroundImage == `url("rock.png")` && box2.style.backgroundImage == `url("scissor.png")`) {
                        box2.style.backgroundImage = `url("rock.png")`;
                    }
                    if (box1.style.backgroundImage == `url("scissor.png")` && box2.style.backgroundImage == `url("rock.png")`) {
                        box1.style.backgroundImage = `url("rock.png")`;
                    }
                    if (box1.style.backgroundImage == `url("paper.png")` && box2.style.backgroundImage == `url("scissor.png")`) {
                        box1.style.backgroundImage = `url("paper.png")`;
                    }
                    if (box1.style.backgroundImage == `url("scissor.png")` && box2.style.backgroundImage == `url("paper.png")`) {
                        box2.style.backgroundImage = `url("scissor.png")`;
                    }
                }
            }
        }
    }
}
setInterval(collider, 100)

