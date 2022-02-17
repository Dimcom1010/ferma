import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { searchImpassable } from '../../functions/searchImpassable';
import { goThere } from '../../functions/goThere';
import { whereIsTheHero } from '../../functions/whereIsTheHero';
import { User } from '../../class/user';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css'],
})
export class MatrixComponent implements OnInit {
  @HostListener('document:keypress', ['$event']) // отслеживание клавиш
  handleKeyboardEvent(event: KeyboardEvent) {
    let xy = goThere(
      event.key,
      this.pologons,
      this.impassable,
      this.turn,
      this.steps
    );
    if (xy && this.steps > 0) {
      this.steps = this.steps - 1;
      whereIsTheHero(this.pologons, this.turn.heroName, this, true);
      whereIsTheHero(
        this.pologons,
        this.turn.heroName,
        this,
        false,
        xy[0],
        xy[1]
      );
      this.hero1X = this.superHero1.hero1X;
      this.hero1Y = this.superHero1.hero1Y;
      this.hero2X = this.superHero2.hero1X;
      this.hero2Y = this.superHero2.hero1Y;
    }
  }

  @ViewChild('heroId1') public heroId1: ElementRef | undefined;
  @ViewChild('heroId2') public heroId2: ElementRef | undefined;

  public superHero1: User;
  public superHero2: User;

  public hero1: string; // Имя I игрока
  public hero2: string; // Имя II игрока

  public hero1X: number;
  public hero1Y: number;
  public hero2X: number;
  public hero2Y: number;

  public steps: number = 6;
  public turn: User; // чья очередь
  public gameover: boolean = false;

  public pologons = [
    [
      { texture: 'grass', thing: '', hero: 'FIRST' },
      { texture: 'grass', thing: '', hero: '' },
      { texture: 'grass', thing: '', hero: '' },
      { texture: 'grass', thing: '', hero: '' },
    ],
    [
      { texture: 'grass', thing: '', hero: '' },
      { texture: 'water', thing: '', hero: '' },
      { texture: 'water', thing: '', hero: '' },
      { texture: 'grass', thing: '', hero: '' },
    ],
    [
      { texture: 'grass', thing: 'dreams', hero: '' },
      { texture: 'grass', thing: '', hero: '' },
      { texture: 'grass', thing: '', hero: '' },
      { texture: 'grass', thing: '', hero: '' },
    ],
    [
      { texture: 'water', thing: '', hero: '' },
      { texture: 'grass', thing: '', hero: '' },
      { texture: 'grass', thing: '', hero: '' },
      { texture: 'water', thing: '', hero: '' },
    ],
    [
      { texture: 'grass', thing: 'dreams', hero: '' },
      { texture: 'grass', thing: '', hero: '' },
      { texture: 'grass', thing: '', hero: '' },
      { texture: 'grass', thing: '', hero: 'SEKOND' },
    ],
  ];

  impassable: [number[]] | [] = []; // карты препядствий

  constructor() {
    this.superHero1 = new User(2, 2, 'FIRST');
    this.superHero2 = new User(314, 418, 'SEKOND');
    this.hero1 = this.superHero1.heroName;
    this.hero2 = this.superHero2.heroName;
    this.hero1X = this.superHero1.hero1X;
    this.hero1Y = this.superHero1.hero1Y;
    this.hero2X = this.superHero2.hero1X;
    this.hero2Y = this.superHero2.hero1Y;
    this.turn = this.superHero1;
  }

  ngOnInit(): void {
    this.impassable = searchImpassable('water', this.pologons); //постройка карты препядствий
    // this.mapgen();
    this.saper([
      [1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1],
    ]);
    // this.mapgen(this.mapGen(10, 10));
    // this.makeWay(this.mapGen());
  }
  checker(): void {
    this.turn === this.superHero1
      ? (this.turn = this.superHero2)
      : (this.turn = this.superHero1);
    console.log('this checker');
    console.log(this);
    this.steps = 6;
  }

  newGame(): void {
    this.gameover = false;
    this.steps = 6;
  }
  isgameOver(): void {
    this.gameover = true;
  }
  mapGen(w: number = 3, h: number = 3): [number[]] {
    const newMap: any = [];
    for (let e = 0; e < w; e++) {
      newMap.push([]);
    }
    for (let y = 0; y < w; y++) {
      for (let x = 0; x < h; x++) {
        if (x === 0 && y === 0) {
          newMap[y][x] = 2;
        } else if (x == 0 && y !== 0) {
          newMap[y][x] = 2;
        } else if (x !== 0 && y == 0) {
          newMap[y][x] = 2;
        } else if (x == w - 1 && y == h - 1) {
          newMap[y][x] = 2;
        } else if (x == w - 1 && y !== h - 1) {
          newMap[y][x] = 2;
        } else if (x !== w - 1 && y == h - 1) {
          newMap[y][x] = 2;
        } else if (x == 1 && y == 1) {
          newMap[y][x] = 1;
          console.log('x,y');
          console.log(x, y);
        } else if (y == w - 2 && x == h - 2) {
          newMap[y][x] = 1;
          console.log('x,y');
          console.log(x, y);
        } else {
          newMap[y][x] = Math.round(Math.random());
        }
      }
    }
    console.log('newMap');
    console.log(newMap);
    return newMap;
  }
  makeWay(arr: [number[]]): [number[]] {
    let x: number = 0;
    let y: number = 0;
    debugger;
    while (y < arr.length - 1 && x < arr[0].length - 1) {
      if (y < arr.length) {
        if (arr[y][x] === 1) {
          x++;
        } else {
          y++;
          x--;
          arr[y][x] = 1;
        }
      } else {
        arr[y][x] = 1;
        x++;
      }
    }
    // for (let y = 0; y < arr.length; y++) {
    //   for (let x = 0; x < arr[0].length; x++) {

    //   }
    // }
    console.log('arr');
    console.log(arr);
    return arr;
  }
  mapgen(arr: number[][]): number[][] {
    const arrW: number[][] = [];
    arr.forEach((e) => arrW.push(e.map((num) => (num !== 0 ? 1 : 0))));
    console.log('arrW');
    console.log(arrW);
    return arrW;
  }

  saper(arr: number[][]): number[][] {
    // const arrSaper: number[][] = [];
    // const arrMin: number[] = [];
    // for (let m = 0; m < arr[0].length; m++) {
    //   arrMin.push(1);
    // }
    // for (let e = 0; e < arr.length; e++) {
    //   arrSaper.push(arrMin);
    // }
    console.log('arrSaper saper');
    console.log(arr);
    debugger;
    for (let y = 1; y < arr.length - 1; y++) {
      for (let x = 1; x < arr[0].length - 1; x++) {
        let d = this.raner(x, y, arr);
        arr[y][x] = d;
        console.log('this.raner', x, y);
        console.log(d);
        console.log(arr);
      }
    }
    console.log('arrSaper saper');
    console.log(arr);
    return arr;
  }
  raner(x: number, y: number, arr: number[][]): number {
    let summ: number = 4;

    // if (x - 1 >= 0 && y - 1 >= 0) {
    //   arr[y - 1][x - 1] == 1 ? summ++ : summ;
    // } if (y - 1 >= 0){
    //   arr[y - 1][x] == 1 ? summ++ : summ;
    // }
    // if (y - 1 >= 0 && y - 1 >= 0 && arr[y - 1][x - 1] === 1) {
    //   summ += 1;
    // }
    // if (y - 1 >= 0 && arr[y - 1][x] === 1) {
    //   summ += 1;
    // }
    // if (y - 1 >= 0 && x + 1 < 3 && arr[y - 1][x + 1] === 1) {
    //   summ += 1;
    // }
    // if (y - 1 >= 0 && arr[y][x - 1] === 1) {
    //   summ += 1;
    // }
    // if (x + 1 < 3 && arr[y][x + 1] === 1) {
    //   summ += 1;
    // }
    // if (x - 1 >= 0 && arr[y + 1][x - 1] === 1) {
    //   summ += 1;
    // }
    // if (arr[y + 1][x] === 1) {
    //   summ += 1;
    // }
    // if (x + 1 < 3 && arr[y + 1][x + 1] === 1) {
    //   summ += 1;
    // }
    return summ;
  }
}
