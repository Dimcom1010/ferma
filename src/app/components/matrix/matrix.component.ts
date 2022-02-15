import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { searchImpassable } from '../../functions/searchImpassable'
import { goThere } from '../../functions/goThere'
import { whereIsTheHero } from '../../functions/whereIsTheHero'

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css']
})
export class MatrixComponent implements OnInit {


  @HostListener('document:keypress', ['$event'])// отслеживание клавиш
  handleKeyboardEvent(event: KeyboardEvent) {
    let xy = goThere(event.key, this.pologons, this.impassable, this.turn)
    if (xy && this.steps > 0) {
      this.steps = this.steps - 1
      whereIsTheHero(this.pologons, this.turn, true)
      whereIsTheHero(this.pologons, this.turn, false, xy[0], xy[1])
    }
  }

  @ViewChild('heroId1') public heroId1: ElementRef | undefined
  @ViewChild('heroId2') public heroId2: ElementRef | undefined

  public hero1: string = 'MEO';    // Имя I игрока
  public hero2: string = 'NEO'      // Имя II игрока
  public hero1X: number = 0;
  public hero1Y: number = 0;
  public hero2X: number = 400;
  public hero2Y: number = 500;


  public steps: number = 6

  public turn: string = this.hero1 // чья очередь
  public gameover: boolean = false



  public pologons = [
    [
      { texture: 'grass', thing: '', hero: this.hero1 },
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
      { texture: 'grass', thing: '', hero: this.hero2 },
    ],

  ];

  impassable: [number[]] | [] = []; // карты препядствий

  constructor() { }

  ngOnInit(): void {
    this.impassable = searchImpassable('water', this.pologons); //постройка карты препядствий
  }
  checker() {
    
    (this.turn === this.hero1) ? this.turn = this.hero2 : this.turn = this.hero1
    console.log('this checker')
    console.log(this)
    this.steps = 6
  }
  newGame() {
    this.gameover = false
    this.steps = 6
  }
  isgameOver() {
    this.gameover = true
  }

  move(heroId: ElementRef | undefined): number[] {
    let hero = heroId?.nativeElement.getBoundingClientRect()
    return [hero.x, hero.y]
  }
  moveXY(x: number, y: number, turn: string): void {
    console.log('this ')
    console.log(this)
    if (turn === this.turn) {
      this.hero1X = x * 102;
      this.hero1Y = y * 102;
      console.log('перемещаю 1')
      console.log(this.hero1X,this.hero1Y)
    }
    
    if (turn === this.turn) {
      console.log(this.hero2X,this.hero2Y)
      this.hero2X = x * 102;
      this.hero2Y = y * 102;
      console.log('перемещаю 2')
      console.log(this.hero2X,this.hero2Y)
    }
    
  }

}


