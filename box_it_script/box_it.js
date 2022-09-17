#!/home/nimbus-user/.nvm/versions/node/v17.6.0/bin/node
function drawLine(num){
    let final =''
    for (let i = 0; i < num; i++){  
        final = final + '━';
    }
    return final;
}

function drawTopBorder(num){
    let len = drawLine(num)
    let final ='┏' + len + '┓'
    return final;
}
function drawMiddleBorder(num){
    let len = drawLine(num)
    let final ='┣' + len + '┫'
    return final;
}
function drawBottomBorder(num){
    let len = drawLine(num)
    let final ='┗' + len + '┛'
    return final;
}

function drawBarsAround(string){
    let final ='┃' + string + '┃'
    return final;
}

function boxIt(arr){
    let final =''
    let br ='\n'
    let longest =0
for (let i = 0; i < arr.length; i++) {
    if(arr[i].length > longest){
        longest = arr[i].length; 
    }
}

for (let i = 0; i < arr.length; i++) {
    let space = ' '
    let spacer = space.repeat([longest - arr[i].length])
    if(arr.length == 1){
    let top =  drawTopBorder(longest)
    let word = drawBarsAround(arr[i])
    let bottom =drawBottomBorder(longest)
    final = top + br + word + br + bottom
    }
    else if(i == 0){
        let top =  drawTopBorder(longest)
        let word = drawBarsAround((arr[i]+(spacer)))
        let mid = drawMiddleBorder(longest)
        final = top + br + word + br + mid +br
    }
    else if(i > 0 && 1< arr.length-1){
        let word = drawBarsAround((arr[i]+(spacer)))
        let mid = drawMiddleBorder(longest)
        final += word + br + mid +br
    }
    else if (i = arr.length-1){
    let word = drawBarsAround((arr[i]+(spacer)))
    let bottom =drawBottomBorder(longest)
    final += word + br + bottom
    }
}
return final
}

console.log(boxIt(['Jon Snow', 'Cersei Lannister']))
console.log(boxIt(['Jon Snow']))

