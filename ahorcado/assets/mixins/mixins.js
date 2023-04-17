var mixins = {
    created(){

        //OBTENER Y CARGAR ALFABETO
        this.alfabeto_controller = this.alfabeto.split(this.separadorDeLetras).map((el, index) => {
            return {
                id: index + 1,
                letra: el,
                disabled: false
            }
        })

        //OBTENER TOTAL DE PALABRAS, ORDENAR SUS LETRAS Y ESTABLECER LAS RESPUESTAS CORECTAS
        let wordCount = 0
        let aux_pregunta = `palabra${wordCount + 1}`
        while(this.isValidWord(this[aux_pregunta], wordCount)){
            wordCount++

            let caracteres = this[aux_pregunta].termino.split(this.separadorDeLetras).map(el => {
                return {
                    letra: el,
                    correct: false
                }
            })

            let no_duplicates = this[aux_pregunta].termino.split(this.separadorDeLetras).filter((c, index, chars) => {
                return chars.indexOf(c) === index
            })
            
            
            this.$set(this[aux_pregunta], 'caracteres', caracteres)
            this.$set(this[aux_pregunta], 'no_duplicates', no_duplicates)

            aux_pregunta = `palabra${wordCount + 1}`
        }

        this.totalPalabras = wordCount

        this.iniciarJuego()

        createjs.Sound.registerSound("audios/clic.mp3", "clic")
        createjs.Sound.registerSound("audios/acierto.mp3", "acierto")
        createjs.Sound.registerSound("audios/fallo.mp3", "fallo")
        createjs.Sound.registerSound("audios/aplauso.mp3", "aplauso")
    },
    mounted(){
        setTimeout(() => {
            const cssproperties = getComputedStyle(document.documentElement)
            this.anchoContenedor = parseInt(cssproperties.getPropertyValue('--widthCaja').replace("px",""))
            this.paddingContenedor = parseInt(cssproperties.getPropertyValue('--paddingCaja').replace("px",""))
        }, 500)
    },
    data(){
        return {
            layer: 0,
            layersController: [],
            layersRandom: [],

            alfabeto_controller: [],
            
            puntosPorPregunta: 0,
            puntosMaximos: 10,
            estrellasPorPregunta: 10,
            totalPuntos: 0,
            fromPista: false,
            openDialog: false,
            openDialogPista: false,

            totalPalabras: 0,
            anchoContenedor: 0,
            paddingContenedor: 0,

            mostrarPantallaFinal: false,
            mensajeFinal: '',

            mostrarCopyright: false,
            onFullScreen: false
        }
    },
    computed: {
        totalPalabrasAMostrar(){
            return (this.totalPalabras < this.palabrasAMostrar ? this.totalPalabras : this.palabrasAMostrar)
        },
        actualWidth(){
            let aux_palabra = this[`palabra${this.layersRandom[this.layer]}`]
            if(aux_palabra) return `width: ${(this.anchoContenedor - this.paddingContenedor * aux_palabra.caracteres.length) / aux_palabra.caracteres.length}px`
            return 'width: 100%'
        },
        layerActual(){
            return `${this.layer + 1} / ${this.totalPalabrasAMostrar}`
        }
    },
    methods: {
        cleanAlfabeto(){
            this.alfabeto_controller.forEach(el => {
                el.disabled = false
            })
        },
        iniciarJuego(){
            // REINICIAR CONTADORES Y REVOLVER PALABRAS SI SE ELEGIÓ LA OPCIÓN "aleatorio" Y REVOLVER LAS LETRAS DE CADA PALABRA (obligatorio)
            this.layersRandom = new Array(this.totalPalabras).fill().map((a, i) => a = i + 1)
            if(this.aleatorio === true) this.layersRandom.sort(() => Math.random() - 0.5)
            this.layersRandom = this.layersRandom.slice(0, this.totalPalabrasAMostrar)
            this.layer = 0
            this.puntosPorPregunta = this.puntosMaximos / this.totalPalabrasAMostrar

            for(let i = 1; i <= this.totalPalabrasAMostrar; i++){
                let new_layerController = {
                    estado: "inicio", // enjuego (primera interacción realizada) - comprobado (palabra resuelta o se queda sin estrellas)
                    correct: false, // correct (true) palabra resuelta
                    estrellasPerdidas: 0,
                    pistasUtilizadas: 0
                }
                this.$set(this.layersController, i - 1, new_layerController)

                let actual_palabra = `palabra${this.layersRandom[i - 1]}`

                let aux_items = this[actual_palabra].caracteres.map(el => {
                    return {
                        letra: el.letra,
                        correct: false
                    }
                })

                this.$set(this[actual_palabra], 'caracteres', aux_items)
            }
            this.cleanAlfabeto()
        },
        isValidWord(val, index){
            if(val){
                if(typeof val.termino === "string" && typeof val.enunciado === "string" && (typeof val.pista === "number" || val.pista === false)){
                    return true
                }
                console.error(`La palabra #${index + 1} no coincide con el formato definido en TextosGlobales.js`)
            }
            return false
        },
        chooseLetra(letra, notsound = false){
            let founded = false
            this[`palabra${this.layersRandom[this.layer]}`].caracteres.forEach(el => {
                if(el.letra === letra.letra){
                    el.correct = true
                    founded = true
                }
            })
            if(founded){
                if(!notsound){
                    createjs.Sound.stop()
                    createjs.Sound.play('acierto')
                }
            }else{
                this.layersController[this.layer].estrellasPerdidas = this.layersController[this.layer].estrellasPerdidas + 1
                if(!notsound){
                    createjs.Sound.stop()
                    createjs.Sound.play('fallo')
                }
            }
            letra.disabled = true
            this.layersController[this.layer].estado = "enjuego"

            this.checkWord()
        },
        addPista(){
            if(!this.isComprobado()){
                let founded = false
                let aux_array = JSON.parse(JSON.stringify(this[`palabra${this.layersRandom[this.layer]}`].no_duplicates))
                while(!founded){ 
                    let randomIndex = Math.floor(Math.random() * aux_array.length)
                    let caracterFound = this[`palabra${this.layersRandom[this.layer]}`].caracteres.find(el => el.letra === aux_array[randomIndex] && el.correct === false)
                    if(caracterFound){
                        founded = true
                        this.layersController[this.layer].estrellasPerdidas = this.layersController[this.layer].estrellasPerdidas + this.penalizacionPorPista
                        this.layersController[this.layer].pistasUtilizadas = this.layersController[this.layer].pistasUtilizadas + 1
                        this.fromPista = true
                        let letterFound = this.alfabeto_controller.find(el => el.letra === caracterFound.letra)
                        this.clickSound()
                        this.chooseLetra(letterFound, true)
                    }
                }
            }
        },
        checkWord(){
            //VERIFICAR SI YA SE CONTESTÓ LA PALABRA O SI SE ACABARON LAS ESTRELLAS
            if(this.layersController[this.layer].estrellasPerdidas >= this.estrellasPorPregunta && !this.fromPista){
                this.layersController[this.layer].estado = "comprobado"
                //MOSTRAR RESPUESTA CORRECTA
                this.showPalabraCorrecta()
            }else{
                let founded = this[`palabra${this.layersRandom[this.layer]}`].caracteres.findIndex(el => el.correct === false)
                if(founded === -1){
                    this.layersController[this.layer].correct = true
                    this.layersController[this.layer].estado = "comprobado"
                }else if(this.fromPista && this.layersController[this.layer].estrellasPerdidas >= this.estrellasPorPregunta){
                    this.layersController[this.layer].estado = "comprobado"
                    //MOSTRAR RESPUESTA CORRECTA
                    this.showPalabraCorrecta()
                }
            }
            this.fromPista = false
        },
        showPalabraCorrecta(){
            this[`palabra${this.layersRandom[this.layer]}`].caracteres.forEach(el => {
                el.correct = true
            })
        },
        /*solveActualLayer(){
            let str_parent = `palabra${this.layersRandom[this.layer]}`
            if(this[str_parent] != undefined){
                this[str_parent].valor = JSON.parse(JSON.stringify(this[str_parent].empty_valor))
                this.layersController[this.layer].items.forEach(el => {
                    for(let i = 0; i < el.respuesta.length; i++){
                        if(this[str_parent].valor[el.respuesta[i] - 1].length == 0){
                            this[str_parent].valor[el.respuesta[i] - 1].push(el)
                            break
                        }
                    }
                })
                this[str_parent].items = []
                this.changeStatus()
            }
        },*/
        checkDialog(){
            if(this.isComprobado()){
                this.checkSiguiente()
            }else{
                this.openDialog = true
            }
        },
        checkDialogPista(){
            if(this.estrellasPorPregunta - this.layersController[this.layer].estrellasPerdidas - this.penalizacionPorPista <= 0){
                this.openDialogPista = true
            }else{
                this.addPista()
            }
        },
        dialogYes(){
            this.layersController[this.layer].estado = "comprobado"
            this.checkSiguiente()
        },
        checkSiguiente(){
            this.openDialog = false
            if(this.layersRandom[this.layer + 1] != undefined){
                this.cleanAlfabeto()
                this.layer += 1
            }else{
                //TERMINAR JUEGO - CALCULAR PUNTOS
                let punteoMaximo = true
                let finalScore = Math.trunc(this.layersController.reduce((acum, el) => {
                    if(!el.correct){
                        punteoMaximo = false
                    }
                    return acum += (el.correct ?  this.puntosPorPregunta : 0)
                }, 0))
                
                this.totalPuntos = (finalScore < 9 ? Math.ceil(finalScore) : Math.floor(finalScore))
                if(this.totalPuntos < this.puntosMaximos * 0.3){
                    this.mensajeFinal = this.mensajeFinal_0
                }else if(this.totalPuntos < this.puntosMaximos * 0.5){
                    this.mensajeFinal = this.mensajeFinal_30
                }else if(this.totalPuntos < this.puntosMaximos * 0.8){
                    this.mensajeFinal = this.mensajeFinal_50
                }else if(this.totalPuntos < this.puntosMaximos){
                    this.mensajeFinal = this.mensajeFinal_80
                }else{
                    this.mensajeFinal = this.mensajeFinal_100
                }
                console.log(this.totalPuntos)
                this.mostrarPantallaFinal = true
            }
            this.clickSound()
        },
        repetirJuego(){
            this.iniciarJuego()

            this.mostrarPantallaFinal = false
            setTimeout(() => {
                this.totalPuntos = 0
            }, 500)
        },
        isComprobado(){
            return this.layersController[this.layer].estado === "comprobado"
        },
        clickSound(){
            createjs.Sound.play('clic')
        },
        toggleCopyright(){
            this.mostrarCopyright = !this.mostrarCopyright
            createjs.Sound.play('clic')
        },
        goFullScreen(){
            parent.postMessage("fullscreen", "*")
            createjs.Sound.play('clic')
            this.onFullScreen = !this.onFullScreen
        }
    }
}