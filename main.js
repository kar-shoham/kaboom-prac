import kaboom from "./libs/kaboom.mjs";

kaboom();

loadSprite("programmer", "assets/programmer.png");
loadSprite("bug", "assets/bug.jpg");
loadSprite("coffee", "assets/coffee.jpg");

const PLAYER_SPEED = 600;
let BUG_SPEED = 2;
let score = 0;
let scoreCard

let player = add([sprite("programmer"), pos(10, 10), scale(0.05), area()]);


let showScore = () => {
  if(scoreCard) destroy(scoreCard)
  scoreCard = add([
    text(`Score: ${score}`),
    pos(width() - 200, 20)
  ])
}

loop(4, () => {
  for (let i = 0; i < 4; i++) {
    let x = rand(0, width());
    let y = height();
    let b = add([sprite("bug"), pos(x, y), scale(0.1), area(), "bug"]);
    b.onUpdate(() => {
      b.moveTo(b.pos.x, b.pos.y - BUG_SPEED);
    });
  }

  let x = rand(0, width());
  let y = height() + 50;
  let c = add([sprite("coffee"), pos(x, y), scale(0.04), area(), "coffee"]);
  c.onUpdate(() => {
    c.moveTo(c.pos.x, c.pos.y - BUG_SPEED);
  });
  // if (BUG_SPEED < 12) BUG_SPEED++;
});

onKeyDown("left", () => {
  player.move(-PLAYER_SPEED, 0);
});

onKeyDown("right", () => {
  player.move(PLAYER_SPEED, 0);
});

onKeyDown("up", () => {
  player.move(0, -PLAYER_SPEED);
});

onKeyDown("down", () => {
  player.move(0, PLAYER_SPEED);
});

player.onCollide("bug", () => {
  destroy(player);
  let gameOver = add([
    text("Game Over"),
    pos(10, 10)
  ])
});

player.onCollide("coffee", (coffee) => {
  destroy(coffee);
  score++;
  showScore()
});


showScore()