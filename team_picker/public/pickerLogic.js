
function getTeams(teams,quantity,members){
    const spMem =  members.split(",")
    const shuffledArray = spMem.sort((a, b) => 0.5 - Math.random());
    
    if(teams == "team_count"){
        function manyTeams(names, numOfTeams) {
            let final = [];
            let teamCounter = 0;
        
            for (let i = 0; i < names.length; ++i) {
                if (!final[teamCounter]) {
                    final[teamCounter] = [];
                }
               final[teamCounter].push(names[i]);
                if (++teamCounter == numOfTeams) {
                    teamCounter = 0;
                }
            }
            return final;
        }
        let arr = manyTeams(shuffledArray, quantity)
        console.log(arr)
        return arr;

    }
    else if(teams == "per_team"){
        function cut(names, number) {
            if (names.length <= number) {
              return [names];
            }
            return [names.slice(0, number), ...cut(names.slice(number), number)];
        }
        
        let arr = cut(shuffledArray, quantity);
        console.log(arr)
        return arr;
       
    }
    else{
        console.log('Please select a type of team!')
    }
}

module.exports = {
    getTeams: getTeams
}