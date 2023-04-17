/*version 08/05/2022*/
var Crucigrama = {
    model: {
        prop: 'modelValue',
        event: 'change'
    },
    mixins: [TextosGlobales],
    props: {
        modelValue: Boolean,
        okInputClass: {
            type: String,
            default: 'okInputClass'
        },
        badInputClass: {
            type: String,
            default: 'badInputClass'
        },
        okNumberClass: {
            type: String,
            default: 'okNumberClass'
        },
        badNumberClass: {
            type: String,
            default: 'badNumberClass'
        }
    },
    template: `
    <div class="d-flex flex-column justify-center">
        
        <div class="row-tile" v-for="(rowV, row) in modelValue.tamanioTablero" :key="row-1">
            <div class="cell-tile" v-for="(colV, col) in modelValue.tamanioTablero" :key="row + '_' + col" :class="{'visibility-hidden' : !existTile(col, row)}">
                <div v-if="existTile(col, row)" class="letter-tile">
                    
                    <input type="text" v-model="letterGrid[row][col].model" maxlength="1" tabindex="-1" :data-x="col" :data-y="row" :ref="'input_' + col + '_' + row" @focus="focusInput($event)" @keyup="keyUpInput($event)" @keydown="keyDownInput($event)" class="crucigrama-input" :class="[{'pointer-events-none' : letterGrid[row][col].correcto || comprobado}, renderOkInputClass(row, col), renderBadInputClass(row, col)]"/>

                    <div v-if="letterGrid[row][col].numberLeft !== null" class="crucigrama-number-container d-flex align-center justify-center pos-horizontal">
                        <div class="color-button border-button crucigrama-round-num" :class="[renderOkNumberClass(letterGrid[row][col].numberLeft), renderBadNumberClass(letterGrid[row][col].numberLeft)]" :data-number="letterGrid[row][col].numberLeft"><h1 class="font2 crucigrama-number mt-2">{{letterGrid[row][col].numberLeft}}</h1></div>
                    </div>
                    <div v-if="letterGrid[row][col].numberTop !== null" class="crucigrama-number-container d-flex align-center justify-center pos-vertical">
                        <div class="color-button border-button crucigrama-round-num" :class="[renderOkNumberClass(letterGrid[row][col].numberTop), renderBadNumberClass(letterGrid[row][col].numberTop)]" :data-number="letterGrid[row][col].numberTop"><h1 class="font2 crucigrama-number mt-2">{{letterGrid[row][col].numberTop}}</h1></div>
                    </div>
                    
                </div>
            </div>
        </div>
            
    </div>
    `,
    data(){
        return {
            letterGrid: [[]],
            lastLetterGrid: null,
            usedWords: [],
            usedStaticLetters: {},
            lastDireccion: null,
            actualInput: null,
            actualInputTile: null,
            enableKeyUp: false,
            fromWatch: false,
            comprobado: false,
            showSolucion: false
        }
    },
    created(){
        this.rebuildGrid()
    },
    methods: {
        renderOkInputClass(row, col){
            return (this.letterGrid[row][col].correcto && !this.letterGrid[row][col].static && !this.showSolucion ? this.okInputClass : '')
        },
        renderBadInputClass(row, col){
            return (this.comprobado && !this.letterGrid[row][col].correcto && !this.letterGrid[row][col].static && !this.showSolucion ? this.badInputClass : '')
        },
        renderOkNumberClass(indexWord){
            return (this.usedWords[indexWord - 1] !== undefined && this.usedWords[indexWord - 1].correcto && !this.showSolucion ? this.okNumberClass : '')
        },
        renderBadNumberClass(indexWord){
            return (this.comprobado && this.usedWords[indexWord - 1] !== undefined && !this.usedWords[indexWord - 1].correcto && !this.showSolucion ? this.badNumberClass : '')
        },
        checkAvailability(x, y, next){
            let tile_value = this.gridVal(x, y)
            if (this.existTile(x, y)) {
                
                let aux_or = tile_value.orientacion
                if(aux_or === 'mixto'){
                    if(this.lastDireccion === null){
                        aux_or = 'vertical'
                        if(this.existTile(x + 1, y)){
                            aux_or = 'horizontal'
                        }
                    }else{
                        aux_or = this.lastDireccion
                    }
                }
                
                let newX = x + (aux_or === 'horizontal' ? (next ? 1 : -1) : 0)
                let newY = y + (aux_or === 'vertical' ? (next ? 1 : -1) : 0)
                this.lastDireccion = aux_or

                if(this.existTile(newX, newY)){
                    let next_value = this.gridVal(newX, newY)
                    if(!next_value.correcto){
                        if(this.$refs[`input_${newX}_${newY}`][0] !== undefined){
                            this.$refs[`input_${newX}_${newY}`][0].focus()
                        }
                    }else{
                        this.checkAvailability(newX, newY, next)
                    }
                }
                
            }else{
                this.lastDireccion = null
            }
        },
        keyUpInput(e){
            if(this.enableKeyUp && !this.fromWatch){
                if(e.target.value){
                    if(e.keyCode != 8 && e.keyCode != 9 && e.keyCode != 16 && e.keyCode != 17 && e.keyCode != 18 && e.keyCode != 20 && e.keyCode != 27 && e.keyCode != 37 && e.keyCode != 38 && e.keyCode != 39 && e.keyCode != 40 && e.keyCode != 46){
                        this.checkAvailability(parseInt(e.target.dataset.x, 10), parseInt(e.target.dataset.y, 10), true)
                    }
                }
            }
            this.fromWatch = false
        },
        keyDownInput(e){
            if(!e.target.value){
                if(e.keyCode == 8 || e.keyCode == 46){
                    this.checkAvailability(parseInt(e.target.dataset.x, 10), parseInt(e.target.dataset.y, 10), false)
                }
            }
        },
        focusInput(e){
            this.actualInput = e.target
            this.actualInputTile = {x: parseInt(e.target.dataset.x, 10), y: parseInt(e.target.dataset.y, 10)}
            this.enableKeyUp = (e.target.value ? true : false)
        },
        gridVal(x, y) {
            if (this.letterGrid[y] !== undefined) {
              if (this.letterGrid[y][x] !== undefined) {
                return this.letterGrid[y][x]
              }
            }
            return null
        },
        existTile(x, y) {
            let tile = this.gridVal(x, y)
            return (tile === null || tile.valor === null ? false : true)
        },
        rebuildGrid() {
            // Init letterGrid...
            this.letterGrid = [...Array(this.modelValue.tamanioTablero)].map(() => Array(this.modelValue.tamanioTablero).fill().map(el => el = {valor: null, model: null, correcto: false, orientacion: null, originalOrientacion: null, numberLeft: null, numberTop: null, static: false}))
      
            // Ubicar palabras correctas.
            this.modelValue.palabras.forEach((el, indexWord) => {
  
              let word = this[el.palabra]
  
              if (word.length <= 1) {
                console.error('Palabra ' + word + ' no se permite de longitud 1 o menor.')
                return
              }
              
              if (word.length > this.modelValue.tamanioTablero) {
                console.error('Palabra ' + word + ' no cabe en el tablero.')
                return
              }
              let isValid = false
              let x = el.posicionInicial.columna
              let y = el.posicionInicial.fila
              let dx = 0
              let dy = 0
  
              let direction = el.orientacion
    
              if (direction == 'horizontal') dx = 1
              if (direction == 'vertical') dy = 1
    
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
                  if (this.letterGrid[yCord][xCord].valor !== null) {
                    if (this.letterGrid[yCord][xCord].valor !== word[cIndex]) {
                      throw new Error('La palabra ' + word + ' no puede ubicarse porque se superpone a otra palabra.')
                    }else{
                        this.letterGrid[yCord][xCord].orientacion = 'mixto'
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
                let newWord = []
                let auxLetrasBloqueadas = (el.letrasBloqueadas !== undefined && this[el.letrasBloqueadas] !== undefined ? this[el.letrasBloqueadas] : "")
                for (let cIndex = 0; cIndex < word.length; cIndex += 1) {
                  const xCord = x + (cIndex * dx)
                  const yCord = y + (cIndex * dy)
                  if(cIndex === 0){
                    this.letterGrid[yCord][xCord].originalOrientacion = el.orientacion
                    if(el.orientacion === 'horizontal') this.letterGrid[yCord][xCord].numberLeft = indexWord + 1
                    if(el.orientacion === 'vertical') this.letterGrid[yCord][xCord].numberTop = indexWord + 1
                  }

                  //Verificar que las "letras bloquedas" existan en la palabra y se remueven las ya utilizadas
                  if(auxLetrasBloqueadas[cIndex] != undefined && auxLetrasBloqueadas[cIndex] === "*"){
                    this.letterGrid[yCord][xCord].static = true
                    this.letterGrid[yCord][xCord].correcto = true
                    this.letterGrid[yCord][xCord].model = word[cIndex]
                  }
                  
                  this.letterGrid[yCord][xCord].valor = word[cIndex]
                  if(this.letterGrid[yCord][xCord].orientacion !== 'mixto') this.letterGrid[yCord][xCord].orientacion = el.orientacion

                  newWord.push({x: xCord, y: yCord})
                }
                
                this.usedWords.push({correcto: false, palabra: newWord})

              }
            })
        }
    },
    watch: {
        letterGrid: {
            deep: true,
            handler(){
                
                if(this.actualInput !== null){
                    if(typeof this.actualInput.value == "string" && this.actualInput.value.length > 0){
                        this.enableKeyUp = false
                        this.fromWatch = true
                        this.checkAvailability(this.actualInputTile.x, this.actualInputTile.y, true)
                    }else{
                        this.enableKeyUp = false
                        this.letterGrid[this.actualInputTile.y][this.actualInputTile.x].model = null
                    }
                }

                let empty = false
                this.usedWords.forEach((el, index) => {
                    el.palabra.forEach(el2 => {
                        let aux_tile = this.letterGrid[el2.y][el2.x]
                        if(aux_tile.model === undefined || aux_tile.model === null || aux_tile.model === ""){
                            empty = true
                        }
                    })
                })

                let aux_model = JSON.parse(JSON.stringify(this.modelValue))
                aux_model.disabled = empty
                this.$emit('change', aux_model)
            }
        },
        modelValue: {
            deep: true,
            handler(){
                
                if(this.modelValue.comprobado !== undefined && this.modelValue.comprobado === true){

                    //CHECK OK - BAD TILES
                    let aux_model = JSON.parse(JSON.stringify(this.modelValue))
                    this.usedWords.forEach((el, index) => {
                        if(!el.correcto){
                            let badWord = true
                            let aux_string = ''
                            el.palabra.forEach(el2 => {
                                let aux_tile = this.letterGrid[el2.y][el2.x]
                                if(typeof aux_tile.model === "string"){
                                    aux_string += aux_tile.model.toUpperCase()
                                }
                            })
                            let correctWord = this[this.modelValue.palabras[index].palabra]
                            let optionsWord = this[this.modelValue.palabras[index].opciones]
                            if(aux_string === correctWord || optionsWord.indexOf(aux_string) !== -1){
                                badWord = false
                                el.correcto = true
                                aux_model.palabras[index].correcto = true
                            }

                            el.palabra.forEach((el2, indexWord) => {
                                if(!badWord){
                                    this.letterGrid[el2.y][el2.x].correcto = true
                                    this.letterGrid[el2.y][el2.x].model = correctWord[indexWord]
                                }
                            })
                        }
                    })

                    //GUARDAR RESPUESTAS ACTUALES
                    this.lastLetterGrid = JSON.parse(JSON.stringify(this.letterGrid))

                    this.comprobado = true
                    aux_model.comprobado = false
                    this.$emit('change', aux_model)
                    this.$emit('evaluar')
                }else if(this.modelValue.restart !== undefined && this.modelValue.restart === true){

                    //RESETEAR ACTIVIDAD
                    let aux_model = JSON.parse(JSON.stringify(this.modelValue))
                    this.usedWords.forEach(el => {
                        el.palabra.forEach(el2 => {
                            let aux_tile = this.letterGrid[el2.y][el2.x]
                            if(!aux_tile.correcto){
                                this.letterGrid[el2.y][el2.x].model = ''
                            }
                        })
                    })
                    this.comprobado = false
                    aux_model.comprobado = false
                    aux_model.restart = false
                    this.$emit('change', aux_model)
                }else if(this.modelValue.mostrarSolucion === true){
                    //MOSTRAR RESPUESTAS
                    this.usedWords.forEach((el, index) => {
                        let correctWord = this[this.modelValue.palabras[index].palabra]
                        el.palabra.forEach((el2, indexWord) => {
                            this.letterGrid[el2.y][el2.x].model = correctWord[indexWord]
                        })
                    })
                    this.showSolucion = true

                }else if(this.modelValue.mostrarSolucion === false){
                    //MOSTRAR RESPUESTA ANTERIOR
                    this.usedWords.forEach(el => {
                        el.palabra.forEach(el2 => {
                            this.letterGrid[el2.y][el2.x].model = this.lastLetterGrid[el2.y][el2.x].model
                        })
                    })
                    this.showSolucion = false

                }
            }
        }
    }
}