import {ban} from './ban'
import {whereIsTheHero} from './whereIsTheHero'
export const goThere = (key: string,pologons:any,impassable:any,turn:string):number[]|null => {
    let coordinatsHero=whereIsTheHero(pologons,turn)
    let x = coordinatsHero[0]
    let y = coordinatsHero[1]
    4
    if (key == '2') {
      console.log('go down');
      return ban(x,y+1,impassable)?[x,y+1]:null
    }

    if (key == '4') {
      console.log('go left');
      return ban(x-1,y,impassable)?[x-1,y]:null
    }

    if (key == '8') {
      console.log('go up');
      return ban(x,y-1,impassable)?[x,y-1]:null
    }

    if (key == '6') {
      return ban(x+1,y,impassable)?[x+1,y]:null
    }
    return null
  }