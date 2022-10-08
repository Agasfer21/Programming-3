function matrixGenerator(matrixSize, grassCount,grassEaterCount,predatorCount,npcCount,prisonCount,angularCount) {

     var matrix = []

     for (let i = 0; i < matrixSize; i++) {
          matrix[i] = []
          for (let j = 0; j < matrixSize; j++) {
               matrix[i][j] = 0

          }
     }



     for (let i = 0; i < grassCount; i++) {

          let x = Math.floor(Math.random() * matrixSize)
          let y = Math.floor(Math.random() * matrixSize)

          if (matrix[y][x] == 0) {
               matrix[y][x] = 1
          }
     }

     // npc 
     for(let i = 0; i < npcCount;i++){
        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)

        if(matrix[y][x] == 0){
            matrix[y][x] = 4
        }
     }



     for (let i = 0; i < grassEaterCount; i++) {

          let x = Math.floor(Math.random() * matrixSize)
          let y = Math.floor(Math.random() * matrixSize)

          if (matrix[y][x] == 0) {
               matrix[y][x] = 2
          }
     }

     //prison
     for (let i = 0; i < prisonCount; i++) {

          let x = Math.floor(Math.random() * matrixSize)
          let y = Math.floor(Math.random() * matrixSize)
          if (matrix[y][x] == 0) {
              matrix[y][x] = 5
          }
     }
              //angular 
     for(let i = 0; i < angularCount; i++){

          let x = 0
          let y = 0

          if (matrix[y][x] == 0) {
              matrix[y][x] = 6
          }
     }




     for (let i = 0; i < predatorCount; i++) {

          let x = Math.floor(Math.random() * matrixSize)
          let y = Math.floor(Math.random() * matrixSize)

          if (matrix[y][x] == 0) {
               matrix[y][x] = 3
          }
     }

     return matrix
}


let matrix = matrixGenerator(15, 350, 10, 6, 8, 7,10)

console.log(matrix);

var side = 40


var grassArr = []
var grassEaterArr = []
var predatorArr = []
var npcArr = []
var prisonArr = []
var angularArr = []


function setup() {
     createCanvas(matrix[0].length * side, matrix.length * side)
     frameRate(10)
     for (var y = 0; y < matrix.length; y++) {
          for (var x = 0; x < matrix[y].length; x++) {
               if (matrix[y][x] == 1) {
                    var gr = new Grass(x, y);
                    grassArr.push(gr);
               }
               else if (matrix[y][x] == 2) {

                    var grEat = new GrassEater(x, y);
                    grassEaterArr.push(grEat);
               } else if (matrix[y][x] == 3) {

                    var pre = new Predator(x, y);
                    predatorArr.push(pre);
               }else if(matrix[y][x] == 4){
                   var np = new Npc(x,y)
                   npcArr.push(np);
               }else if (matrix[y][x] == 5) {
                    var pris = new Prison(x, y)
                   prisonArr.push(pris)
          }else if(matrix[y][x] == 6){
               var ang = new Angular(x,y)
               angularArr.push(ang)
          }
     }
}
}


function draw() {
     for (var y = 0; y < matrix.length; y++) {
          for (var x = 0; x < matrix[y].length; x++) {

               
               if (matrix[y][x] == 1) {
                    fill("green")
               }else  if (matrix[y][x] == 2) {
                    fill("yellow")
               }else  if (matrix[y][x] == 3) {
                    fill("red")
               }else if (matrix[y][x] == 4){
                   fill("purple")
               }else if(matrix[y][x] == 5){
                    fill('blue')
               }else if(matrix[y][x] == 6 ){
                   
               }
                else {
                    fill("gray")
               }

               rect(x * side, y * side, side, side)
          }
     }


     for( var i in grassArr){
          grassArr[i].mul()
     }

     for(let i in grassEaterArr){
          grassEaterArr[i].mul()
          grassEaterArr[i].eat()
     }

     for(let j in predatorArr){
          predatorArr[j].mul()
          predatorArr[j].eat()
    for(let i in npcArr){
        npcArr[i].move()
    }     
     } 
     for(let i in angularArr){
          angularArr[i].move()
     }
//pr!!
 for (let i in prisonArr) {
     prisonArr[i].eat()
     if(npcArr != 0 && prisonArr != 0 && grassArr !=0 && predatorArr == 0 && grassEaterArr == 0){
         prisonArr[i].mul()
     }
 
     }
 
 }
 
 if (matrix[0][0] == 5 && prisonArr == 0 && grassEaterArr == 0) {
         let x = 0
     let y = 0
        grassArr.push(new Grass(x, y))
 }
 if(grassArr != 0 && npcArr != 0 && prisonArr == 0 && predatorArr == 0 && grassEaterArr == 0){
     let x = 10
          let y = 10
     for(var i = 0; i < 3; i++){
          grassEaterArr.push(new GrassEater(x,y))
          predatorArr.push(new Predator(x+7,y+7))
     }


 }




