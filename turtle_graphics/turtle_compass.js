class turtle{
    constructor(x,y){
        this.start =[x,y];
        this.x = x
        this.y = y
        this.currentDir= 90;
        this.path=[];
        this.path.push(this.start)
    }
   
 forward(num){
    
 for (let i = 0; i < num; i++) {
    if (this.currentDir / 90 === 1 || this.currentDir / 90 === -1) {
        this.x += 1;
    } 
    else if(this.currentDir / 270 === 1 || this.currentDir / 270 === -1) {
        this.x -= 1;
    }
    else if(this.currentDir / 360 === 1 || this.currentDir === 0) {
        this.y -= 1;
     }
    else if(this.currentDir / 180 === 1 || this.currentDir / 180 === -1) {
        this.y += 1;
     }
        this.path.push([this.x,this.y])
    }
    return this
}

right(){
 this.currentDir += 90;
}

left(){
this.currentDir -= 90;
}

print(){
    //console.log(this.path)
    let maxX = 0;
    let maxY = 0;
    let final =[]
    
    let st = this.path.flat()
    //console.log(st);
    let n = st.length;
   // console.log(n)
    for (let i = 0; i < n; i+=2) {
        if(st[i] > maxX){
            maxX = st[i]
        }
        else{
            continue
        }  
    }
    //console.log(maxX)
    for (let i = 1; i < n; i+=2) {
        if(st[i] > maxY){
            maxY = st[i]
        }
        else{
            continue
        }
    }
    //console.log(maxY)
   
    for (let i=0 ; i<=maxY +1; i++){ /
        const x = [] // how to get rid of initial space 
        for(let j=0; j<=maxX +1; j++){
          const test = this.path.find((item)=>{ 
            // console.log(item.join(","), `${i},${j}`)
            return item.join(",")===`${j},${i}` 
          })
          // console.log(test)
          if(test){ 
            x.push("■")}
          else {
            x.push("□")}
        }
      
        final.push(x.join(" ") + " \n ")
      }
      return (" --BEGIN LOG \n " + final.join("") + "--END LOG");
    }
 
allPoints(){
    console.log(this.path) // why returning undefined?
}
}
    


const tortimer = new turtle(1,1);
tortimer.forward(3);
tortimer.right();
//console.log(tortimer.currentDir)
tortimer.forward(2)
tortimer.left();
tortimer.forward(3);
console.log(tortimer.print());
//console.log(tortimer.allPoints())
//console.log(tortimer.path);
//1