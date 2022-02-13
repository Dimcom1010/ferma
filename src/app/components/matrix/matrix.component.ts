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

  hero1: string = 'MEO';    // Имя I игрока
  hero2: string = 'NEO'      // Имя II игрока

  steps: number = 6

  turn: string = this.hero1 // чья очередь
  gameover:boolean=false

  pologonsinit = [
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

  pologons = [
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
    this.steps = 6
  }
  isGameOver(){
    this.gameover=false
    this.pologons=this.pologonsinit
    this.steps = 6
  }
  isGameOver1(){
    this.gameover=true
  }



}


