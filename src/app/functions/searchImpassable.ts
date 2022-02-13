export const searchImpassable=(obstacle: string,pologons:any=[]):[number[]]=> {
    const impassable: [number[]] = [[0, 0]];
    let searchPositionY = 0;
    pologons.forEach((y: any[]) => {
      let searchPositionX = 0;
       //обнуление порядкового номера x при новой горизонтальной проходке
      searchPositionY++; //следующая строка
      impassable.push([searchPositionX, searchPositionY]); // запись препятствий периметри
      y.forEach((x: { texture: string; }) => {
        //следующий столбец
        ++searchPositionX;
        if (obstacle == x.texture) {
          // поиск препятствий
          impassable.push([searchPositionX, searchPositionY]); // запись препятствий
        }
        if (searchPositionY == 1) {
          impassable.push([searchPositionX, 0]);
        }
      });
    });
    let xMax:number=0;
    let yMax:number=0;
    let xAr:number[]=[]
    let yAr:number[]=[]
    impassable.forEach(e=>xAr.push(e[0]))
    xMax=Math.max(...xAr)
    impassable.forEach(e=>yAr.push(e[1]))
    yMax=Math.max(...yAr)
    for (let x=0; x<=xMax+1;x++){ // добавление нижнего запретного контура поля
      impassable.push([x,yMax+1])
    }
    for (let y=0; y<=yMax;y++){ // добавление правого запретного контура поля
      impassable.push([xMax+1,y])
    }
    return impassable
  }