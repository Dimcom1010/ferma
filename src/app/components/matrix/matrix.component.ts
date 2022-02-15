import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { searchImpassable } from '../../functions/searchImpassable'
import { goThere } from '../../functions/goThere'
import { whereIsTheHero } from '../../functions/whereIsTheHero'
import {User} from '../../class/user'

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
      whereIsTheHero(this.pologons, this.turn.heroName, true)
      whereIsTheHero(this.pologons, this.turn.heroName, false, xy[0], xy[1])

    }
  }

  @ViewChild('heroId1') public heroId1: ElementRef | undefined
  @ViewChild('heroId2') public heroId2: ElementRef | undefined

  public superHero1:User
  public superHero2:User

  public hero1: string    // Имя I игрока
  public hero2: string      // Имя II игрока

  public hero1X: number
  public hero1Y: number
  public hero2X: number
  public hero2Y: number

  public steps: number = 6
  public turn: User // чья очередь
  public gameover: boolean = false

  public pologons = [
    [
      { texture: 'grass', thing: '', hero: 'FIRST'},
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
      { texture: 'grass', thing: '', hero: 'SEKOND'},
    ],

  ];

  impassable: [number[]] | [] = []; // карты препядствий

  constructor() {
    this.superHero1 = new User (0,0,'FIRST')
    this.superHero2 = new User (400,500,'SEKOND')
    this.hero1 =  this.superHero1.heroName
    this.hero2 = this.superHero2.heroName
    this.hero1X = this.superHero1.hero1X
    this.hero1Y = this.superHero1.hero1Y
    this.hero2X = this.superHero2.hero1X
    this.hero2Y = this.superHero2.hero1Y
    this.turn = this.superHero1
   }

  ngOnInit(): void {
    this.impassable = searchImpassable('water', this.pologons); //постройка карты препядствий
  }
  checker() {
    
    (this.turn === this.superHero1) ? this.turn = this.superHero2 : this.turn = this.superHero1
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
    if (turn === this.turn.heroName) {
      this.hero1X = x * 102;
      this.hero1Y = y * 102;
      console.log('перемещаю 1')
      console.log(this.hero1X,this.hero1Y)
    }
    
    if (turn === this.turn.heroName) {
      console.log(this.hero2X,this.hero2Y)
      this.hero2X = x * 102;
      this.hero2Y = y * 102;
      console.log('перемещаю 2')
      console.log(this.hero2X,this.hero2Y)
    }
    
  }

}


