//#region originally from logic.js

class ResponseObj
{
    constructor()
    {
        this.isGameEnded = false;
        this.isSuccesfull = true;
        this.message = null;
        //"X","D","O"
        this.whoWon = null;
    }

}
class Board
{
    constructor()
    {
        this.rows = [["E","E","E"],["E","E","E"],["E","E","E"]];
        this.isXTurn = true;
        this.numOfTurnsPlayed = 0;
    }
    //0-2, 0-2
    getCellValue(row, column)
    {
        if(row>2 || column>2 || row<0 || column<0)
            throw new Error("index out of bounds exception");
        return this.rows[row][column];
    }
    getLegalMoves()
    {
        let moves = [];
        for(let row=0;row<3;row++)
            for(let column=0;column<3;column++)
                if(this.rows[row][column]=="E")
                    moves.push({row, column});
        return moves;
    }
    makeMove(row, column)
    {
        let response = new ResponseObj();
        try{
            if(this.getCellValue(row, column)!="E")
            {
                response.message = "illegal move!";
                response.isSuccesfull = false;
                return response;
            }
        }catch(error){
            response.message = "illegal move!";
            response.isSuccesfull = false;
            return response;
        }
        this.rows[row][column] = this.isXTurn?"X":"O";
        this.isXTurn = !this.isXTurn;
        response.isSuccesfull = true;
        let result = this.getGameResult();
        response.isGameEnded = result.isGameEnded;
        response.whoWon = result.whoWon;
        return response;
    }
    getGameResult()
    {
        let isEqual = (row1, column1, row2, column2, row3, column3) =>
        {
            if(this.rows[row1][column1]!="E" && this.rows[row1][column1] == this.rows[row2][column2] && this.rows[row2][column2] == this.rows[row3][column3])
                return true;
            else
                return false;
        }
        let isBoardFull = true;
        for(let row=0;row<3;row++)
            for(let column=0;column<3;column++)
                if(this.rows[row][column]=="E")
                    isBoardFull = false;
        
        let whoWon = null;
        if(isEqual(0,0,0,1,0,2)) whoWon=this.rows[0][0]; 
        if(isEqual(1,0,1,1,1,2)) whoWon=this.rows[1][0]; 
        if(isEqual(2,0,2,1,2,2)) whoWon=this.rows[2][0]; 
        if(isEqual(0,0,1,0,2,0)) whoWon=this.rows[0][0]; 
        if(isEqual(0,1,1,1,2,1)) whoWon=this.rows[0][1]; 
        if(isEqual(0,2,1,2,2,2)) whoWon=this.rows[0][2]; 
        if(isEqual(0,0,1,1,2,2)) whoWon=this.rows[0][0]; 
        if(isEqual(0,2,1,1,2,0)) whoWon=this.rows[0][2]; 

        if(whoWon)
            return {isGameEnded: true, whoWon: whoWon};
        else if(isBoardFull)
            return {isGameEnded: true, whoWon: "D"};
        else
            return {isGameEnded: false, whoWon:null};
    }
}
Board.prototype.getCellLocationByCellNumber = (cellNumber) => {return {row: Math.floor(cellNumber/3), column: cellNumber%3};}
Board.prototype.getCellNumberByCellLocation = (cellLocation) => {return cellLocation.row*3+cellLocation.column;}

//#endregion

//#region originally from index.js

const imageEmptyUrl = "storage/imageEmpty.png";
const imageXUrl = "storage/imageX.png";
const imageOUrl = "storage/imageO.png";
const COMPUTER_THINKING_TIME_IN_MILISECONDS = 1000;
let isHumanFirst;
let board;

function makeHumanFirst()
{
    isHumanFirst = true;
    document.getElementById("humanFirstButton").disabled = true;
    document.getElementById("computerFirstButton").disabled = false;

}
function makeComputerFirst()
{
    isHumanFirst = false;
    document.getElementById("humanFirstButton").disabled = false;
    document.getElementById("computerFirstButton").disabled = true;
}
function onPageLoad()
{
    makeHumanFirst();
    initBoard();
    let messageP = document.querySelector("#messageP");
}
function initBoard()
{
    board = new Board();
    let cells = document.querySelectorAll("#board tr td");
    for (let i = 0; i < cells.length; i++)
        cells[i].innerHTML = "<img src='" + imageEmptyUrl + "' id=" + i + " onclick='clicked(this);'>";
    if(!isHumanFirst)
    {
        makeComputerWaitThenMove();
    }
}
function clicked(imageTag)
{
    let response = makeHumanMove(imageTag);
    if (response.isSuccesfull && !response.isGameEnded)
    {
        makeComputerWaitThenMove();
    }
}
function freezeBoard()
{
    let cells = document.querySelectorAll("#board tr td img");
    for (let i = 0; i < cells.length; i++)
        cells[i].onclick = null;
    document.getElementById("restartButton").disabled = true;
}
function unfreezeBoard()
{
    let cells = document.querySelectorAll("#board tr td img");
    for (let i = 0; i < cells.length; i++)
        cells[i].setAttribute("onclick","clicked(this);");
    document.getElementById("restartButton").disabled = false;
}
function makeHumanMove(imageTag)
{
    let cellNum = imageTag.id;
    let cords = Board.prototype.getCellLocationByCellNumber(cellNum);
    let row = cords.row;
    let column = cords.column;

    let response = board.makeMove(row, column);
    if (!response.isSuccesfull)
    {
        messageP.innerHTML = response.message;
    }
    else
    {
        messageP.innerHTML = "";
        imageTag.setAttribute("src", board.isXTurn ? imageOUrl : imageXUrl);
        if (response.isGameEnded)
        {
            setTimeout(function ()
            {
                alert(response.whoWon + " won!");
                initBoard();
            }, 0)
            board = new Board();
        }
    }
    return response;
}
function makeComputerMove()
{
    let computerMove = basicComputer(board);
    let response = board.makeMove(computerMove.row, computerMove.column);
    let cellNumber = Board.prototype.getCellNumberByCellLocation(computerMove);
    let imageTag = document.getElementById("" + cellNumber);
    imageTag.setAttribute("src", board.isXTurn ? imageOUrl : imageXUrl);
    if (response.isGameEnded)
    {
        setTimeout(function ()
        {
            alert(response.whoWon + " won!");
            initBoard();
        }, 0)
        board = new Board();
    }
    return response;
}
function makeComputerWaitThenMove()
{
    freezeBoard();
    setTimeout(()=>
    {
        makeComputerMove();
        unfreezeBoard();
    }, COMPUTER_THINKING_TIME_IN_MILISECONDS);
}
//#endregion

//#region computer logic

function basicComputer(board)
{
    return board.getLegalMoves()[0];
}

//#endregion