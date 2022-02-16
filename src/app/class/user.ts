export class User {
  heroName: string;
  hero1X: number;
  hero1Y: number;
  step: number = 104

  constructor(hero1X: number, hero1Y: number, heroName: string) {
    this.heroName = heroName;
    this.hero1X = hero1X;
    this.hero1Y = hero1Y;
  }
  moveLeft() {
    this.hero1X -= this.step;
  }
  moveRight() {

    this.hero1X += this.step;
  }
  moveUp() {
    this.hero1Y -= this.step;
  }
  moveDown() {
    this.hero1Y += this.step;

  }
}
