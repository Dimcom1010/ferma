
export const ban = (whereToGoX:number,whereToGoY:number,impassable:any):boolean=>{
    let ban= impassable.find((e: number[])=>e[0]===whereToGoX && e[1]===whereToGoY)
    if (!ban){
      return true
    }else {
      return false
    }
  }