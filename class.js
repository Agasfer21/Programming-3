class Grass {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.multiply = 0
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(char) {

        let found = []

        for (var i in this.directions) {
            var x = this.directions[i][0]
            var y = this.directions[i][1]

            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == char) {
                    found.push(this.directions[i])
                }
            }
        }

        return found;
    }


    mul() {

        this.multiply++
        var emptyCells = this.chooseCell(0)
        var newCell = random(emptyCells)
        // console.log(newCell);
        if (newCell && this.multiply >= 8) {

            var newX = newCell[0]
            var newY = newCell[1]

            var gr = new Grass(newX, newY)
            grassArr.push(gr)

            matrix[newY][newX] = 1

            this.multiply = 0
        }


    }
}


class GrassEater {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.multiply = 0
        this.energy = 8
        this.directions = []
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }


    chooseCell(char) {
        this.getNewCoordinates()
        let found = []

        for (var i in this.directions) {
            var x = this.directions[i][0]
            var y = this.directions[i][1]

            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == char) {
                    found.push(this.directions[i])
                }
            }
        }

        return found;
    }


    mul() {
        this.multiply++
        var emptyCells = this.chooseCell(0)
        var newCell = random(emptyCells)

        if (newCell && this.multiply >= 12) {

            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = 2
            var grEat = new GrassEater(newX, newY)
            grassEaterArr.push(grEat)


            this.multiply = 0
        }


    }


    move() {
        this.energy--
        var emptyCells = this.chooseCell(0)
        var newCell = random(emptyCells)

        if (newCell && this.energy >= 0) {

            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]

            matrix[this.y][this.x] = 0


            this.x = newX
            this.y = newY
        } else {
            if (this.energy < 0) {
                this.die()
            }
        }
    }


    eat() {
        var emptyCells = this.chooseCell(1)
        var newCell = random(emptyCells)

        if (newCell) {
            this.energy++

            var newX = newCell[0]
            var newY = newCell[1]
            
            matrix[newY][newX] = matrix[this.y][this.x]

            matrix[this.y][this.x] = 0


            this.x = newX
            this.y = newY

            for(var i in grassArr){
                // console.log(grassArr);
                if (newX == grassArr[i].x  && newY == grassArr[i].y ) {
                            grassArr.splice(i, 1)
                               break
                }
            }


        }else{
            this.move()
        }
    }

    die(){
        matrix[this.y][this.x]  =  0

           for(var i in grassEaterArr){
                    if(this.x ==  grassEaterArr[i].x &&  this.y == grassEaterArr[i].y){

                             grassEaterArr.splice(i,1)
                             break
                    }
           }
    }


}




class Predator{
    constructor(x, y) {
        this.x = x
        this.y = y
        this.multiply = 0
        this.energy = 10
        this.directions = []
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }



//choosecell find 2 arg.
    chooseCell(char,char1) {
        this.getNewCoordinates()
        let found = []

        for (var i in this.directions) {
            var x = this.directions[i][0]
            var y = this.directions[i][1]

            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == char) {
                    found.push(this.directions[i])
                }
            }
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == char1) {
                    found.push(this.directions[i])
                }
            }
        }

        return found;
    }


    mul() {
        this.multiply++
        var emptyCells = this.chooseCell(0)
        var newCell = random(emptyCells)

        if (newCell && this.multiply >= 15) {

            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = 3
            var pre = new Predator(newX, newY)
            predatorArr.push(pre)


            this.multiply = 0
        }


    }

    move() {
        this.energy--
        var emptyCells = this.chooseCell(0)
        var newCell = random(emptyCells)

        if (newCell && this.energy >= 0) {

            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]

            matrix[this.y][this.x] = 0


            this.x = newX
            this.y = newY
        } else {
            if (this.energy < 0) {
                this.die()
            }
        }
    }


    

    eat() {
        var emptyCells = this.chooseCell(1,2)// արդեն մեր chooseCell-Ը կարող է փնտրել 2 կերպար
        var newCell = random(emptyCells)

        if (newCell) {
            this.energy++

            var newX = newCell[0]
            var newY = newCell[1]
            
            matrix[newY][newX] = matrix[this.y][this.x]

            matrix[this.y][this.x] = 0


            this.x = newX
            this.y = newY
// delete grass and predator
            for(var i in grassArr){
                console.log(grassArr);
                if (newX == grassArr[i].x  && newY == grassArr[i].y ) {
                            grassArr.splice(i, 1)
                               break
                }
            }

            for(var i in grassEaterArr){
                if (newX == grassEaterArr[i].x  && newY == grassEaterArr[i].y ) {
                            grassEaterArr.splice(i, 1)
                               break
                }
            }

        }else{
            this.move()
        }
    }
    

    die(){
        matrix[this.y][this.x]  =  0

           for(var i in predatorArr){
                    if(this.x ==  predatorArr[i].x &&  this.y == predatorArr[i].y){

                            predatorArr.splice(i,1)
                             break
                    }
           }
    }

}



class Npc{
    constructor(x, y) {
        this.x = x
        this.y = y
        this.multiply = 0
        this.energy = 100
        this.directions = []
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }



    chooseCell(char,char1) {
        this.getNewCoordinates()
        let found = []

        for (var i in this.directions) {
            var x = this.directions[i][0]
            var y = this.directions[i][1]

            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == char) {
                    found.push(this.directions[i])
                }
            }
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == char1) {
                    found.push(this.directions[i])
                }
            }
        }

        return found;
    }



    move() {
        this.energy--
        var emptyCells = this.chooseCell(0)
        var newCell = random(emptyCells)

        if (newCell && this.energy >= 0) {

            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]

            matrix[this.y][this.x] = 0


            this.x = newX
            this.y = newY
        } else {
            if (this.energy < 0) {
                this.die()
            }
        }
    }


    


    die(){
        matrix[this.y][this.x]  =  0

           for(var i in npcArr){
                    if(this.x ==  npcArr[i].x &&  this.y == npcArr[i].y){

                        npcArr.splice(i,1)
                             break
                    }
           }
    }

}

class Prison {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.energy = 10
        this.multiply = 0
        this.directions = []
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            
            
            
           
        ]
    }
    chooseCell(char1, char2, char3) {
        this.getNewCoordinates()
        let found = []

        for (let i = 0; i < this.directions.length; i++) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];

            if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
                if (matrix[y][x] == char1) {
                    found.push(this.directions[i]);
                }
            }
            if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
                if (matrix[y][x] == char2) {
                    found.push(this.directions[i]);
                }
            }
            if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
                if (matrix[y][x] == char3) {
                    found.push(this.directions[i]);
                }
            }

        }

        return found;
    }
    mul() {
        this.multiply++
        var emptyCell = this.chooseCell(0)
        var newCell = random(emptyCell)
        if (newCell && this.multiply >= 15) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = 4
            var pr = new Prison(newX, newY)
           prisonArr.push(pr)
            this.multiply = 0
        }
    }
    move() {
        this.energy--
        var emptyCells = this.chooseCell(0)
        var newCell = random(emptyCells)
        if (newCell && this.energy >= 0) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        } else {
            this.energy--
            if (this.energy < 0) {
                this.die()
            }
        }
    }
    eat() {
        var emptyCells = this.chooseCell(1, 2, 3)
        var newCell = random(emptyCells)
        if (newCell) {
            this.energy++
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (let i = 0; i < grassArr.length; i++) {
                if (grassArr[i].x == this.x && grassArr[i].y == this.y) {
                    grassArr.splice(i, 1)
                }
            }
            for (let i = 0; i < grassEaterArr.length; i++) {
                if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                    grassEaterArr.splice(i, 1)
                }
            }
            for (let i = 0; i < predatorArr.length; i++) {
                if (predatorArr[i].x == this.x && predatorArr[i].y == this.y) {
                    predatorArr.splice(i, 1)
                }
            }
        }
        else {
            this.move()
        }
    }
    die() {
        matrix[this.y][this.x] = 0
        for (var i in prisonArr) {
            if (this.x == prisonArr[i].x && this.y == prisonArr[i].y) {
                prisonArr.splice(i, 1)
                break
            }
        }
    }
}

class Angular{
    constructor(x,y){
            this.x = x
            this.y = y
            this.energy = 200
            this.multiply = 0
            this.directions = []
        }
        getNewCoordinates() {
            this.directions = [
                [this.x + 1, this.y - 1],
                [this.x +1, this.y - 1],
                [this.x + 1, this.y - 1],
                [this.x + 1, this.y - 1],
                [this.x + 1, this.y - 1],
                [this.x + 1, this.y - 1],
                [this.x + 1 ,this.y - 1],
                [this.x + 1, this.y - 1],
                
    
                
               
            ]
        }
        chooseCell(char1, char2, char3) {
            this.getNewCoordinates()
            let found = []
    
            for (let i = 0; i < this.directions.length; i++) {
                let x = this.directions[i][0];
                let y = this.directions[i][1];
    
                if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
                    if (matrix[y][x] == char1) {
                        found.push(this.directions[i]);
                    }
                }
                if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
                    if (matrix[y][x] == char2) {
                        found.push(this.directions[i]);
                    }
                }
                if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
                    if (matrix[y][x] == char3) {
                        found.push(this.directions[i]);
                    }
                }
    
            }
    
            return found;
        }
        mul() {
            this.multiply++
            var emptyCell = this.chooseCell(0)
            var newCell = random(emptyCell)
            if (newCell && this.multiply >= 15) {
                var newX = newCell[0]
                var newY = newCell[1]
                matrix[newY][newX] = 4
                var ang = new Angular(newX, newY)
               angularArr.push(ang)
                this.multiply = 0
            }
        }
        move() {
            this.energy--
            var emptyCells = this.chooseCell(0)
            var newCell = random(emptyCells)
            if (newCell && this.energy >= 0) {
                var newX = newCell[0]
                var newY = newCell[1]
                matrix[newY][newX] = matrix[this.y][this.x]
                matrix[this.y][this.x] = 0
                this.x = newX
                this.y = newY
            } else {
                this.energy--
                if (this.energy < 0) {
                    this.die()
                }
            }
        }
        eat() {
            var emptyCells = this.chooseCell(1, 2, 3)
            var newCell = random(emptyCells)
            if (newCell) {
                this.energy++
                var newX = newCell[0]
                var newY = newCell[1]
                matrix[newY][newX] = matrix[this.y][this.x]
                matrix[this.y][this.x] = 0
                this.x = newX
                this.y = newY
                for (let i = 0; i < grassArr.length; i++) {
                    if (grassArr[i].x == this.x && grassArr[i].y == this.y) {
                        grassArr.splice(i, 1)
                    }
                }
                for (let i = 0; i < grassEaterArr.length; i++) {
                    if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                        grassEaterArr.splice(i, 1)
                    }
                }
                for (let i = 0; i < predatorArr.length; i++) {
                    if (predatorArr[i].x == this.x && predatorArr[i].y == this.y) {
                        predatorArr.splice(i, 1)
                    }
                }
            }
            else {
                this.move()
            }
        }
        die() {
            matrix[this.y][this.x] = 0
            for (var i in angularArr) {
                if (this.x == angularArr[i].x && this.y == angularArr[i].y) {
                    angularArr.splice(i, 1)
                    break
                }
            }
        }
    }
