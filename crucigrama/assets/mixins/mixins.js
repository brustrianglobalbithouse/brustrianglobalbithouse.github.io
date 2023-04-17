/*version 08/05/2022*/
var mixins = {
    created(){
        let firstInfo = false
        //estados: inicio - comprobado

        let aux_lf = (this.intentosLayers ? this.intentosLayers : 3)
        aux_lf = (aux_lf <= 0 ? 1 : aux_lf)
        aux_lf = (aux_lf > 3 ? 3 : aux_lf)

        for(let i = 0; i < this.layers; i++){
            if(this.infoLayers.indexOf(i) === -1){

                let disabledAux = false
                if(!firstInfo){
                    if(this.layersController[i - 1] !== undefined && this.layersController[i - 1].tipo === 'info'){
                        disabledAux = false
                        firstInfo = true 
                    }else{
                        disabledAux = i != 0
                    }
                }else{
                    disabledAux = i != 0
                }

                this.layersController.push({
                    tipo: 'actividad',
                    estado: 'inicio',
                    correct: true,
                    intentos: aux_lf,
                    auxIntentos: 1,
                    disabled: disabledAux,
                    canRestart: true,
                    canShowSolucion: false,
                    showSolucion: false,
                    firstSolucion: false,
                    opciones: null,
                    correctas: null
                })
            }else{
                this.layersController.push({
                    tipo: 'info',
                    estado: 'inicio',
                    disabled: (!firstInfo ? false : true)
                })
            }
        }

        if(this.mostrarPantallaFinal){
            this.layersController.push({
                tipo: 'final',
                disabled: true
            })
        }

        createjs.Sound.registerSound("audios/clic.mp3", "clic")
        createjs.Sound.registerSound("audios/acierto.mp3", "acierto")
        createjs.Sound.registerSound("audios/fallo.mp3", "fallo")
        createjs.Sound.registerSound("audios/aplauso.mp3", "aplauso")
    },
    mounted(){

    },
    data(){
        return {
            layer: 0,
            canvasStyle: "",
            parentStyle: "",
            layersController: []
        }
    },
    computed: {
        isDisabled(){
            if(this.bloquearComprobar === undefined || this.bloquearComprobar === true){
                if(this.bloquearLayers === undefined || this.bloquearLayers.indexOf(this.layer) != -1){

                    let str_test = `layer${this.layer}`
                    if(this[str_test] !== undefined){
                        if(this[str_test].disabled !== undefined){
                            return this[str_test].disabled
                        }else{
                            return true
                        }
                    }else{
                        return true
                    }

                }else{
                    return false
                }
            }else{
                return false
            }
        },
        isSolucionMostrada(){
            return this.layersController[this.layer].showSolucion
        }
    },
    methods: {
        isOk(val, indexWord){
            if(val !== undefined && val.palabras[indexWord] !== undefined && !this.isSolucionMostrada){
                return val.palabras[indexWord].correcto
            }else{
                return false
            }
        },
        isBad(val, indexWord){
            if(this.isComprobado() && val !== undefined && val.palabras[indexWord] !== undefined && !this.isSolucionMostrada){
                return !val.palabras[indexWord].correcto
            }else{
                return false
            }
        },
        changeStatus(){
            // ENVIAR SIGNAL COMPRADO = true a componente Crucigrama
            let str_test = `layer${this.layer}`
            if(this[str_test] != undefined){
                this[str_test].comprobado = true
            }
        },
        evaluar(){
            this.layersController[this.layer].estado = "comprobado"

            let bad = false
            let opciones = 0
            let correctas = 0
            let str_test = `layer${this.layer}`
            if(this[str_test] != undefined){
                this[str_test].palabras.forEach(el => {
                    opciones++
                    if(!el.correcto){
                        bad = true
                    }else{
                        correctas++
                    }
                })
            }

            //OBTENER OPCIONES Y CORRECTAS ACTUALES
            this.layersController[this.layer].opciones = opciones
            this.layersController[this.layer].correctas = correctas

            this.layersController[this.layer].correct = !bad
            if(bad){
                //PERMITIR VER SOLUCIÓN
                this.layersController[this.layer].canShowSolucion = true
                if(this.layersController[this.layer].auxIntentos == this.layersController[this.layer].intentos){
                    this.checkComplete()
                }
                createjs.Sound.play('fallo')
            }else{
                this.checkComplete()
                createjs.Sound.play('acierto')
            }

            if (typeof this[`layer${this.layer}_comprobado`] !== "undefined") {
                this[`layer${this.layer}_comprobado`](!bad)
            }
        },
        checkComplete(){
            this.layersController[this.layer].canRestart = false
            if(this.layersController[this.layer + 1] !== undefined){
                this.layersController[this.layer + 1].disabled = false
            }

            let finalizeAct = false
            if(this.mostrarPantallaFinal){
                finalizeAct = this.layersController[this.layer + 1] !== undefined && this.layer === this.layersController.length - 2
            }else{
                finalizeAct = this.layersController[this.layer + 1] === undefined && this.layer === this.layersController.length - 1
            }

            if(finalizeAct){
                //CALCULAR PUNTOS - LOS MISMOS QUE PANTALLA FINAL
                let lg = 0
                let aplicarPenalizacion = this.penalizacion && (this.penalizacion.valor == 'porcentaje' || this.penalizacion.valor == 'valor fijo')
                let finalScore = this.layersController.reduce((total, el) => {
                    if(el.tipo === 'actividad'){
                        lg++
                        let sub_result = el.correctas / el.opciones
                        if(aplicarPenalizacion){
                            let intento = this.penalizacion[`intento${el.auxIntentos}`]
                            if(intento){
                                sub_result = (this.penalizacion.valor == 'porcentaje' ? sub_result * intento : sub_result - intento)
                            }
                        }
                        return total += (sub_result < 0 ? 0 : sub_result) * 10
                    }else{
                        return total
                    }
                }, 0) / lg
                finalScore = (finalScore < 9 ? Math.ceil(finalScore) : Math.floor(finalScore))

                console.log("PUNTOS QUE SE ENVIAN A TRAZA: ", finalScore)
                parent.postMessage(finalScore, "*")
            }
        },
        restartStatus(){
            if(this.isComprobado()){
                this.layersController[this.layer].auxIntentos += 1
                this.layersController[this.layer].canShowSolucion = false
            }
            this.layersController[this.layer].estado = "inicio"

            let str_test = `layer${this.layer}`
            if(this[str_test] != undefined){
                this[str_test].restart = true
            }
            
            if (typeof this[`layer${this.layer}_restart`] !== "undefined") {
                this[`layer${this.layer}_restart`]()
            }
            this.clickSound()
        },
        showSolucion(){
            this.layersController[this.layer].showSolucion = !this.layersController[this.layer].showSolucion
            
            let str_test = `layer${this.layer}`
            if(this[str_test] != undefined){
                this[str_test].mostrarSolucion = (this.isSolucionMostrada ? true : false)
            }

            if(!this.layersController[this.layer].firstSolucion && this.layersController[this.layer].canRestart){
                this.layersController[this.layer].firstSolucion = true

                this.layersController[this.layer].estado = "comprobado"
                this.checkComplete()
            }

            if (typeof this[`layer${this.layer}_solucion`] !== "undefined") {
                this[`layer${this.layer}_solucion`](this.isSolucionMostrada)
            }

            this.clickSound()
        },
        isComprobado(){
            return this.layersController[this.layer].estado === "comprobado"
        },
        clickSound(){
            createjs.Sound.play('clic')
        },
        stopAudios(fromWatch = false){
            if(this.audios !== undefined){
                let exist = true
                let count = 1
                while(exist){
                    let str_test = `audio${count}`
                    if(this.audios[str_test] != undefined){
                        this.audios[str_test].valor = true
                        count++
                    }else{
                        exist = false
                    }
                }
            }

            if(!fromWatch || this.stopAudioPrincipal){
                if(this.audioPrincipal !== undefined){
                    this.audioPrincipal.valor = true
                }
            }
        }
    },
    watch: { 
        layer(){
            if(this.layersController[this.layer + 1] !== undefined && this.layersController[this.layer].tipo === 'info'){
                this.layersController[this.layer + 1].disabled = false
            }
            this.stopAudios(true)
        }
    }
}