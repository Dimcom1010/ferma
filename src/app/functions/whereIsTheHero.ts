export const whereIsTheHero=(pologons:any,turn:string, delHero:boolean=false,xNew:number=-1,yNew:number=-1):number[]=> {
    let xHero:number=0
    let yHero:number=0

    let searchPositionX = 0; 
    let searchPositionY = 0;
    pologons.forEach((y: any[]) => {
      searchPositionX = 0; 
      searchPositionY++; 
      y.forEach((x) => {
        ++searchPositionX;

        if (turn == x.hero) {
          xHero=searchPositionX
          yHero=searchPositionY
          delHero?x.hero='':turn
        }
        if (searchPositionX === xNew && searchPositionY === yNew) {
          x.hero = turn
        }
      });
    });
    return [xHero,yHero]
  }