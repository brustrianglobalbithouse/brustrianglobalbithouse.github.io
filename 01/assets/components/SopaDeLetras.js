/*version 08/05/2022*/
var SopaDeLetras = {
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  mixins: [TextosGlobales],
  props: {
    modelValue: Boolean,
    okClass: {
        type: String,
        default: 'letter-tile-ok'
    },
    badClass: {
        type: String,
        default: 'letter-tile-bad'
    }
  },
  template: `
  <div class="d-flex flex-column justify-center">
      
    <div class="row-tile" v-for="(rowV, row) in modelValue.tamanioTablero" :key="row-1">
      <div class="cell-tile" v-for="(colV, col) in modelValue.tamanioTablero" :key="row + '_' + col">
          
        <div
          :class="letterTileClasses(col, row)"
          :data-x="col"
          :data-y="row"
          @mousedown.prevent="wordSelectStart"
          @mouseup="wordSelectUpdate"
          @mousemove="wordSelectUpdate"
          @touchstart.prevent="wordSelectStart"
          @touchend="wordSelectUpdate"
          @touchmove="wordSelectUpdate"
          @click="deselectWord"
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 32 32"
          >
            <text
              x="50%"
              y="20"
              text-anchor="middle"
            >{{ gridVal(col, row).valor }}</text>
          </svg>
        </div>

      </div>
    </div>
          
  </div>
  `,
  data(){
    return {
      letterGrid: [[]],
      usedWords: [],
      foundWords: [],
      lastFoundWords: null,
      selectedWords: [],
      lastSelectedWords: null,
      foundTiles: [],
      selectedTiles: [],
      guess: [],
      selectedRange: {
      start: undefined,
      end: undefined,
      },
      totalWords: 0,
      comprobado: false,
      showSolucion: false
    }
  },
  created(){
    this.rebuildGrid()
  },
  computed: {
    guessedWord() {
      return this.guess.map(el => this.gridVal(el.x, el.y).valor).join('');
    }
  },
  methods: {
    gridVal(x, y) {
      if (this.letterGrid[y] !== undefined) {
        if (this.letterGrid[y][x] !== undefined) {
          return this.letterGrid[y][x]
        }
      }
      return null
    },
    rebuildGrid() {
      // Init letterGrid...
      this.letterGrid = [...Array(this.modelValue.tamanioTablero)].map(() => Array(this.modelValue.tamanioTablero).fill().map(el => el = {valor: null, correcto: false}))
      this.usedWords = []

      // Ubicar palabras correctas.
      this.modelValue.palabras.forEach((el) => {

        let word = this[el.palabra]

        if (word.length <= 1) {
          console.error('Palabra ' + word + ' no se permite de longitud 1 o menor.')
          return
        }

        if (word.length > this.modelValue.tamanioTablero) {
          console.error('Palabra ' + word + ' no cabe en el tablero.')
          return
        }

        let aux_tiles = []
        let isValid = false
        let x = el.posicionInicial.columna
        let y = el.posicionInicial.fila
        let dx = 0
        let dy = 0

        let direction = el.orientacion
        let invertido = el.invertido

        if (direction == 'horizontal' || direction == 'diagonal-top' || direction == 'diagonal-bottom') {
          dx = (invertido ? -1 : 1)
        }

        if (direction == 'vertical'){
          dy = (invertido ? -1 : 1)
        }else if (direction == 'diagonal-top'){
          dy = -1
        }else if (direction == 'diagonal-bottom'){
          dy = 1
        }
  
        try {
          const endX = x + (dx * (word.length - 1))
          if (endX < 0 || endX > (this.modelValue.tamanioTablero - 1)) {
            throw new Error('La palabra ' + word + ' es mayor que el tamaño del tablero.')
          }
          const endY = y + (dy * (word.length - 1))
          if (endY < 0 || endY > (this.modelValue.tamanioTablero - 1)) {
            throw new Error('La palabra ' + word + ' es mayor que el tamaño del tablero.')
          }
          // La palabra cabe en el tablero
          // Se simulará su ubicación en el tablero para verificar superposición
          for (let cIndex = 0; cIndex < word.length; cIndex += 1) {
            const xCord = x + (cIndex * dx)
            const yCord = y + (cIndex * dy)
            aux_tiles.push({ x: xCord, y: yCord })
            if (this.letterGrid[yCord][xCord].valor !== null) {
              if (this.letterGrid[yCord][xCord].valor !== word[cIndex]) {
                throw new Error('La palabra ' + word + ' no puede ubicarse porque se superpone a otra palabra.')
              }
            }
          }

          isValid = true
        } catch (err) {
          console.log(`DEBUG: ${err.message}`)
          isValid = false
        }
  
        if(isValid){
          // La palabra es válida, se ingresa al tablero
          el.tiles = aux_tiles
          this.usedWords.push(el)
          if(el.esOpcion){
            this.totalWords += 1
          }
          for (let cIndex = 0; cIndex < word.length; cIndex += 1) {
            const xCord = x + (cIndex * dx)
            const yCord = y + (cIndex * dy)
            this.letterGrid[yCord][xCord].valor = word[cIndex]
          }
        }
      })

      // console.log(this.usedWords)

      // Se rellena el resto del tablero
      for (let y = 0; y < this.modelValue.tamanioTablero; y += 1) {
        for (let x = 0; x < this.modelValue.tamanioTablero; x += 1) {
          if (this.letterGrid[y][x].valor === null) {
            this.letterGrid[y][x].valor = this[this.modelValue.alfabeto].charAt(Math.floor(Math.random() * this[this.modelValue.alfabeto].length));
          }
        }
      }
    },
    isTileHighlighted(x, y) {
      if (this.selectedRange.start && this.selectedRange.end) {
        const r = this.selectedRange;

        const minX = Math.min(r.start.x, r.end.x);
        const maxX = Math.max(r.start.x, r.end.x);
        const minY = Math.min(r.start.y, r.end.y);
        const maxY = Math.max(r.start.y, r.end.y);

        if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
          // in range. If X or Y are equal then it's a straight line, otherwise
          // Work out diagonal logic.
          return (
            r.start.x === r.end.x ||
            r.start.y === r.end.y ||
            (Math.abs(r.start.x - x) === Math.abs(r.start.y - y))
          )
        }
      }
      return false
    },
    isTileSelected(x, y) {
      let tileIsSelected = this.selectedWords.findIndex(el => el.tiles.findIndex(tile => tile.x === x && tile.y === y) !== -1)
      return tileIsSelected !== -1
    },
    isTileOk(x, y) {
      let tileIsOk = this.foundWords.findIndex(el => el.tiles.findIndex(tile => tile.x === x && tile.y === y) !== -1)
      return tileIsOk !== -1
    },
    letterTileClasses(x, y) {
      const classes = ['letter-tile']
      let letterObject = this.gridVal(x, y)

      if (this.isTileOk(x, y)){
        classes.push(this.okClass)
      }

      if(this.comprobado){
        if (this.isTileSelected(x, y)){
          classes.push(!this.showSolucion ? this.badClass : 'letter-tile-selected')
        }
        classes.push('pointer-events-none')
      }else{
        if (this.isTileSelected(x, y)) {
          classes.push('letter-tile-selected')
        }else if(this.selectedWords.length + this.foundWords.length === this.totalWords){
          classes.push('pointer-events-none')
        }
        if (this.isTileHighlighted(x, y)) {
          classes.push('letter-tile-highlighted')
        }
      }

      return classes
    },
    wordSelectStart(event) {
      if(this.selectedWords.length + this.foundWords.length < this.totalWords){
        const touchedElement = event.target.closest('div.letter-tile');
        if (touchedElement && touchedElement.dataset && touchedElement.dataset.x) {
          this.selectedRange.start = {
            x: parseInt(touchedElement.dataset.x, 10),
            y: parseInt(touchedElement.dataset.y, 10),
          }
          return true
        }
      }
      return false
    },
    wordSelectUpdate(event) {
      // We never started selecting, bail early.
      if (this.selectedRange.start === undefined) {
        return false;
      }
      let touch = event;

      if (event.type.indexOf('touch') === 0) {
        touch = event.changedTouches.item(0);
      }

      const touchedElement = document.elementFromPoint(touch.clientX, touch.clientY).closest('div.letter-tile');

      if (touchedElement && touchedElement.dataset && touchedElement.dataset.x) {
        const x = parseInt(touchedElement.dataset.x, 10);
        const y = parseInt(touchedElement.dataset.y, 10);

        const dx = Math.abs(x - this.selectedRange.start.x);
        const dy = Math.abs(y - this.selectedRange.start.y);

        // Verify the end is valid.
        // If dy (change in y) or dx (change in x) is zero, then it is horizontal/vertcal == OK.
        // Or if dx === dy, then it is diagonal.
        if ((dy === 0 && dx > 0) ||
            (dx === 0 && dy > 0) ||
            (dx === dy)) {
          this.selectedRange.end = { x, y };

          // If it's mouseup, then we finished the dragging a range
          if (event.type === 'mouseup' || event.type === 'touchend') {
            //console.log(JSON.stringify(this.selectedRange)); // eslint-disable-line no-console

            this.guess = [];
            // Build guess!
            const sx = this.selectedRange.start.x;
            const sy = this.selectedRange.start.y;
            const ex = this.selectedRange.end.x;
            const ey = this.selectedRange.end.y;

            // 0 = up, 1 = up-right, 2 = right, 3 = down-right, 4 = down
            // 5 = down-left, 6 = left, 7 = up-left
            var direction = 0

            if (dx === 0) {
              // Vertical
              const step = ey > sy ? 1 : -1;
              for (let i = sy; step > 0 ? (i <= ey) : (i >= ey); i += step) {
                this.guess.push({ x: sx, y: i });
              }
              direction = step > 0 ? 4 : 0
            } else if (dy === 0) {
              // Horizontal
              const step = ex > sx ? 1 : -1;
              for (let i = sx; step > 0 ? (i <= ex) : (i >= ex); i += step) {
                this.guess.push({ x: i, y: sy });
              }
              direction = step > 0 ? 2 : 7
            } else {
              // Diagonal
              const stepX = ex > sx ? 1 : -1;
              const stepY = ey > sy ? 1 : -1;
              for (
                let iX = sx, iY = sy;
                (stepY > 0 ? (iY <= ey) : (iY >= ey)) || (stepX > 0 ? (iX <= ex) : (iX >= ex));
                iY += stepY, iX += stepX
              ) {
                this.guess.push({ x: iX, y: iY });
              }
              direction = stepX > 0
                ? stepY > 0 ? 3 : 1
                : stepY > 0 ? 5 : 7

            }

            let foundedWord = this.usedWords.find(el => this[el.palabra] === this.guessedWord)
            if ( foundedWord !== undefined && this.foundWords.findIndex(el => this[el.word.palabra] === this.guessedWord) === -1 && this.selectedWords.findIndex(el => this[el.word.palabra] === this.guessedWord) === -1) {
              this.selectedWords.push({word: foundedWord, tiles: [...this.guess]})
              if(this.foundWords.length + this.selectedWords.length === this.totalWords){
                  this.disableComprobar(false)
              }
            }


            // Gesture complete, reset the range.
            this.resetSelectedRange();
          }
        } else if (event.type === 'mouseup' || event.type === 'touchend') {
          // Verify failed, reset range (only if at the end of a gesture)
          this.resetSelectedRange();
        } else {
          this.selectedRange.end = undefined;
        }
      } else if (event.type === 'mouseup' || event.type === 'touchend') {
        // End was "null" or had no x/y. Reset.
        this.resetSelectedRange();
      } else {
        this.selectedRange.end = undefined;
      }
      return true;
    },
    deselectWord(event){
      const touchedElement = event.target.closest('div.letter-tile');
      if (touchedElement && touchedElement.dataset && touchedElement.dataset.x) {
        let posX = parseInt(touchedElement.dataset.x, 10)
        let posY = parseInt(touchedElement.dataset.y, 10)
        let newSelectedWords = []
        this.selectedWords.forEach(el => {
          let founded = false
          el.tiles.forEach(tile => {
            if(tile.x === posX && tile.y === posY){
              founded = true
            }
          })
          if(!founded){
            newSelectedWords.push(el)
          }
        })
        this.selectedWords = JSON.parse(JSON.stringify(newSelectedWords))
        this.disableComprobar(true)
      }
      return false
    },
    resetSelectedRange() {
      this.selectedRange = {
        start: undefined,
        end: undefined
      }
    },
    disableComprobar(val){
      console.log("disableComprobar", val)
      let aux_model = JSON.parse(JSON.stringify(this.modelValue))
      aux_model.disabled = val
      this.$emit('change', aux_model)
    }
  },
  watch: {
    modelValue: {
      deep: true,
      handler(){
          
        if(this.modelValue.comprobado !== undefined && this.modelValue.comprobado === true){

          //CHECK OK - BAD TILES
          let aux_model = JSON.parse(JSON.stringify(this.modelValue))
          let newSelectedWords = []
          this.selectedWords.forEach(el => {
            if(el.word.esOpcion){
              this.foundWords.push(el)
              let indexFound = aux_model.palabras.findIndex(el2 => this[el2.palabra] === this[el.word.palabra])
              if(indexFound != -1) aux_model.palabras[indexFound].correcto = true
            }else{
              newSelectedWords.push(el)
            }
          })
          this.selectedWords = JSON.parse(JSON.stringify(newSelectedWords))

          this.lastFoundWords = JSON.parse(JSON.stringify(this.foundWords))
          this.lastSelectedWords = JSON.parse(JSON.stringify(this.selectedWords))

          this.comprobado = true
          aux_model.comprobado = false
          this.$emit('change', aux_model)
          this.$emit('evaluar')

        }else if(this.modelValue.restart !== undefined && this.modelValue.restart === true){

          //RESETEAR ACTIVIDAD
          this.selectedWords = []
          
          let aux_model = JSON.parse(JSON.stringify(this.modelValue))
          this.comprobado = false
          aux_model.comprobado = false
          aux_model.restart = false
          aux_model.disabled = true
          this.$emit('change', aux_model)

        }else if(this.modelValue.mostrarSolucion === true){

          //MOSTRAR RESPUESTAS
          this.selectedWords = []
          this.foundWords = []
          this.usedWords.forEach(el => {
            if(el.esOpcion){
              this.selectedWords.push({word: el, tiles: el.tiles})
            }
          })
          
          this.showSolucion = true

        }else if(this.modelValue.mostrarSolucion === false){
          //MOSTRAR RESPUESTA ANTERIOR
          this.foundWords = JSON.parse(JSON.stringify(this.lastFoundWords))
          this.selectedWords = JSON.parse(JSON.stringify(this.lastSelectedWords))
          this.showSolucion = false
        }
      }
    }
  }
}