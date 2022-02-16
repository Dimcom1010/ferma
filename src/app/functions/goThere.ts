import { User } from '../class/user';
import { ban } from './ban';
import { whereIsTheHero } from './whereIsTheHero';

export const goThere = (
  key: string,
  pologons: any,
  impassable: any,
  turn: User,
  steps: number
): number[] | null => {
  let coordinatsHero = whereIsTheHero(pologons, turn.heroName);
  let x = coordinatsHero[0];
  let y = coordinatsHero[1];
  4;
  if (key == '2' && steps !== 0) {
    let v = ban(x, y + 1, impassable);
    if (v) {
      turn.moveDown();
    }
    return v ? [x, y + 1] : null;
  }

  if (key == '4' && steps !== 0) {
    let v = ban(x - 1, y, impassable);
    if (v) {
      turn.moveLeft();
    }
    return v ? [x - 1, y] : null;
  }

  if (key == '8' && steps !== 0) {
    let v = ban(x, y - 1, impassable);
    if (v) {
      turn.moveUp();
    }
    return v ? [x, y - 1] : null;
  }

  if (key == '6' && steps !== 0) {
    let v = ban(x + 1, y, impassable);
    if (v) {
      turn.moveRight();
    }
    return v ? [x + 1, y] : null;
  }
  return null;
};
