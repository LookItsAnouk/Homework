const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
    //check if prompt is necessary?
});

let toDo = {
    list: [],
    count: 0,
    init: function(){
        console.log('Welcome to ToDo CLI!\n ----------');
        this.question();
    },
    question: function () {
        rl.question('(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit \n>',
         (answer)=> {
            if (answer === "v") {
                this.view()
            }
            else if(answer === "n"){
                this.new()
             }
            else if(answer.includes("c")){
                this.complete(answer)
            }
            else if(answer.includes("d")){
                this.delete(answer)
            }
            else if(answer === "q"){
                this.quit()
            }
            else{
                console.log("Please enter a valid function\n")
                this.question();
            }
        })
    },

    view: function (){
        if(this.list.length == 0){
            console.log('The list is empty \n')
            this.question();
        }
        else{
        console.log(this.list.join(' \n'))
        this.question();
        }
    },
    new: function (){
        rl.question('Add a new Task and press enter: \n>',(answer)=> {
            this.list.push(`${this.count} [] ${answer}`)
            this.count +=1;
            this.question();
        })
    },
    complete: function (ans){
        let check = "✓"
        for (let i = 0; i < this.list.length; i++) {
            let num= ans.slice(1);
             if(i == num){
                 let temp = this.list[i]
                 this.list[i] = temp.substring(0, 3) + check + temp.substring(3);
                 console.log(`"${this.list[i].substring(6)}" marked as completed\n`)
             }
         }
        this.question();
    },
    delete: function (ans){
        for (let i = 0; i < this.list.length; i++) {
           let num= ans.slice(1);
            if(i == num){
                console.log(`"${this.list[i].substring(6)}" was deleted \n`)
                this.list.splice(i, i+1)
            }
        }
       this.count -= 1;
       this.question();
    },
    quit: function (){
        console.log('See you soon! 😄');
        rl.close();
    },
}

toDo.init()