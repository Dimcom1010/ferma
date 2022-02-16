export class User {
  heroName: string;
  hero1X: number;
  hero1Y: number;

  constructor(hero1X: number, hero1Y: number, heroName: string) {
    this.heroName = heroName;
    this.hero1X = hero1X;
    this.hero1Y = hero1Y;
  }
  moveLeft() {
    console.log('this moveLeft');
    console.log(this);
    this.hero1X -= 102;
  }
  moveRight() {
    console.log('this moveLeft');
    console.log(this);
    this.hero1X += 102;
  }
  moveUp() {
    this.hero1Y -= 102;
  }
  moveDown() {
    this.hero1Y += 102;
    console.log(this);
  }
}
