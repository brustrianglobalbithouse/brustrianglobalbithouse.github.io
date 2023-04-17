var mixins = {
    created(){
        let firstInfo = false
        //estados: inicio - comprobado
        for(let i = 0; i < this.layers; i++){
            if(this.infoLayers.indexOf(i) === -1){
                let aux_lf = (this.intentosLayers !== undefined && this.intentosLayers[i] !== undefined ? this.intentosLayers[i] : 3)
                aux_lf = (aux_lf <= 0 ? 1 : aux_lf)
                aux_lf = (aux_lf > 3 ? 3 : aux_lf)

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
                    lifes: aux_lf,
                    auxLifes: aux_lf,
                    disabled: disabledAux,
                    canRestart: true
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
        document.getElementById("preload").style.display = "none"
        window.addEventListener("orientationchange", function(e){
            setTimeout(()=>{
                document.getElementById("focus-button").focus();
            }, 250)
        })
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
                    let exist = true
                    let count = 1
                    let empty = false
                    while(exist && !empty){
                        let str_test = `layer${this.layer}_seleccion${count}`
                        if(this[str_test] != undefined){
                            if(this[str_test].valor === undefined || this[str_test].valor === null){
                                empty = true
                            }
                            count++
                        }else{
                            exist = false
                        }
                    }
                    return empty
                }else{
                    return false
                }
            }else{
                return false
            }
        }
    },
    methods: {
        isOk(val){
            if(this.isComprobado() && this[val.respuesta] !== undefined){
                return this[val.respuesta] === val.valor
            }else{
                return false
            }
        },
        isBad(val){
            if(this.isComprobado() && this[val.respuesta] !== undefined){
                return this[val.respuesta] !== val.valor
            }else{
                return false
            }
        },
        changeStatus(){
            this.layersController[this.layer].estado = "comprobado"
            // EVALUAR LAYER ACTUAL
            let exist = true
            let count = 1
            let bad = false;
            while(exist){
                let str_test = `layer${this.layer}_seleccion${count}`
                if(this[str_test] != undefined){
                    if(this[str_test].valor !== this[this[str_test].respuesta]){
                        bad = true
                    }
                    count++
                }else{
                    exist = false
                }
            }

            this.layersController[this.layer].correct = !bad
            if(bad){
                this.layersController[this.layer].lifes -= 1
                if(this.layersController[this.layer].lifes == 0){
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
                //CALCULAR PUNTOS
                let total = 0
                let totalActs = this.layersController.reduce((val, el) => {
                    if(el.tipo === 'actividad'){
                        return val + 1
                    }else{
                        return val
                    }
                }, 0)
                
                let layerVal = 100 / totalActs
                for(let i = 0; i < this.layersController.length; i++){
                    let thisLayer = this.layersController[i]
                    if(thisLayer.tipo === 'actividad'){
                        if(thisLayer.lifes == thisLayer.auxLifes && thisLayer.lifes != 0){
                            total += layerVal
                        }else if(thisLayer.lifes == thisLayer.auxLifes - 1 && thisLayer.lifes != 0){
                            total += layerVal * 0.5
                        }else if(thisLayer.lifes == thisLayer.auxLifes - 2 && thisLayer.lifes != 0){
                            total += layerVal * 0.25
                        }
                    }
                }
                let finalScore = Math.trunc(total)
                parent.postMessage(finalScore, "*")
            }
        },
        restartStatus(){
            this.layersController[this.layer].estado = "inicio"
            
            let exist = true
            let count = 1
            while(exist){
                let str_test = `layer${this.layer}_seleccion${count}`
                if(this[str_test] != undefined){
                    this[str_test].valor = null
                    count++
                }else{
                    exist = false
                }
            }
            
            if (typeof this[`layer${this.layer}_restart`] !== "undefined") {
                this[`layer${this.layer}_restart`]()
            }
            this.clickSound()
        },
        isComprobado(){
            return this.layersController[this.layer].estado === "comprobado"
        },
        clickSound(){
            createjs.Sound.play('clic')
        }
    },
    watch: {
        layer(){
            if(this.layersController[this.layer + 1] !== undefined && this.layersController[this.layer].tipo === 'info'){
                this.layersController[this.layer + 1].disabled = false
            }
        }
    }
}