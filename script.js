function Gameboard(){
    const rows=3;
    const columns=3;
    const board=[];
    let turn=0;
    let res=0;
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }
    function setState(x,y,player){
        board[y][x].setState(player);
    }
    function getState(x,y){
        return board[y][x].getState();
    }
    function getTurn(){
        return turn;
    }
    function Cell(){
        let state=0;
        function setState(player){
            state=player;  
        }
        function getState(){
            return state;   
        }
        return {setState,getState};
    }
    function makeMove(x,y){
        if(res!=0){
            return;
        }
        if(board[y][x].getState()==0){
            if(turn%2==0){
                board[y][x].setState(1);
            }else{
                board[y][x].setState(2);
            }
            turn+=1;
        }
        return checkResult();
    }
    function checkResult(){
        for(let i=0;i<rows;i++){
            let x=getState(i,0);
            for(let j=0;j<columns;j++){
                if(getState(i,j)!=x){
                    x=0;
                }
            }
            if(x!=0){
                res=x;
            }
        }
        for(let i=0;i<columns;i++){
            let x=getState(0,i);
            for(let j=0;j<rows;j++){
                if(getState(j,i)!=x){
                    x=0;
                }
            }
            if(x!=0){
                res=x;
            }
        }
        let x=getState(0,0);
        for(let i=0;i<columns;i++){
            if(getState(i,i)!=x){
                x=0;
            }
        }
        if(x!=0){
            res=x;
        }
        x=getState(rows-1,0);
        for(let i=0;i<columns;i++){
            if(getState(rows-1-i,i)!=x){
                x=0;
            }
        }
        if(x!=0){
            res=x;
        }
        return res;
    }
    return {setState,getState,rows,columns,makeMove};
}
function displayGameboard(gameboard){
    const container=document.querySelector(".container");
    for(let i=0;i<gameboard.rows;i++){
        for(let j=0;j<gameboard.columns;j++){
            const button=document.createElement("button");
            button.addEventListener("click",(event)=>{
                const res=gameboard.makeMove(j,i);
                if(res!=0){
                    displayResult(res);
                }
                while(container.firstChild){
                    container.removeChild(container.firstChild);
                }
                displayGameboard(gameboard);
            });
            container.appendChild(button);
            if(gameboard.getState(j,i)==1){
                button.textContent="X";
            }else if(gameboard.getState(j,i)==2){
                button.textContent="O";
            }
        }
    }
}
const resetButton=document.querySelector("#reset");
resetButton.addEventListener("click",(event)=>{
    const result=document.querySelector("h2");
    result.textContent="";
    reset();
});
function displayResult(result){
    const display=document.querySelector("h2");
    const name1=document.querySelector("#player1");
    const name2=document.querySelector("#player2");
    if(result==1){
        display.textContent=name1.value+" won";
    }else{
        display.textContent=name2.value+" won";
    }
}
var gameboard=new Gameboard();
displayGameboard(gameboard);
function reset(){
    const container=document.querySelector(".container");
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
    gameboard=new Gameboard();
    displayGameboard(gameboard);
}