#!/usr/bin/env node

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
   
    for (let i=0 ; i<=maxY +1; i++){ 
        const x = [] 
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
    console.log(this.path) 
}
}

// script code 
let args = process.argv.slice(2);
//console.log(args)
if(args !== null){
    let arr = args.toString().split('-');
   //console.log(arr)
   let t  
    if(arr[0].includes("t")){

    t += new turtle(arr[0].slice(1))
    }
    else{
    t += new turtle(0,0)}

    for (let i = 0; i < arr.length; i++) {
   
    if(arr[i] == "r"){
        t += t.right()
    }
    else if(arr[i] == "l"){
        t += t.left()
    }
    else if(arr[i].includes("f")){
       let n = parseInt(arr[i].slice(1));
        t += t.forward(n);
    }
}
t += t.print();
console.log(t);
}


/* const tortimer = new turtle(1,1);
tortimer.forward(3);
tortimer.right();
//console.log(tortimer.currentDir)
tortimer.forward(2)
tortimer.left();
tortimer.forward(3);
console.log(tortimer.print());
console.log(tortimer.allPoints())
//console.log(tortimer.path); 
*/