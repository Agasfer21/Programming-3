for (let i = 0; i < prisonCount; i++) {

          let x = Math.floor(Math.random() * matrixSize)
          let y = Math.floor(Math.random() * matrixSize)
          if (matrix[y][x] == 0) {
              matrix[y][x] = 5
          }
     }
