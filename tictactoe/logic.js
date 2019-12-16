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
        if(isBoardFull)
            return {isGameEnded: true, whoWon: "D"};
        
        let whoWon = null;
        if(isEqual(0,0,0,1,0,2)) whoWon=this.rows[0][0]; 
        if(isEqual(1,0,1,1,1,2)) whoWon=this.rows[1][0]; 
        if(isEqual(2,0,2,1,2,2)) whoWon=this.rows[2][0]; 
        if(isEqual(0,0,1,2,2,0)) whoWon=this.rows[0][0]; 
        if(isEqual(0,1,1,1,2,1)) whoWon=this.rows[0][1]; 
        if(isEqual(0,2,1,2,2,2)) whoWon=this.rows[0][2]; 
        if(isEqual(0,0,1,1,2,2)) whoWon=this.rows[0][0]; 
        if(isEqual(0,2,1,1,2,0)) whoWon=this.rows[0][2]; 

        if(whoWon)
            return {isGameEnded: true, whoWon: whoWon};
        else
            return {isGameEnded: false, whoWon:null};
    }
}
Board.prototype.getCellLocationByCellNumber = (cellNumber) => {return {row: Math.floor(cellNumber/3), column: cellNumber%3};}