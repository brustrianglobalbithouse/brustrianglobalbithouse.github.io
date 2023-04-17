var mixins = {
    created(){

        for(let i = 0; i < this.fichas.length; i++){
            this.fichas[i].texto = this[this.fichas[i].texto]
        }

        for(let i = 0; i < this.fichasIzquierda.length; i++){
            this.fichasIzquierda[i].show = false
            this.dropsIzquierda.push([])
        }
        this.fichasIzquierda[0].show = true
        for(let i = 0; i < this.fichasDerecha.length; i++){
            this.fichasDerecha[i].show = false
            this.dropsDerecha.push([])
        }
        this.fichasDerecha[0].show = true

        this.initInfoNiveles()

        createjs.Sound.registerSound("audios/clic.mp3", "clic")
        createjs.Sound.registerSound("audios/acierto.mp3", "acierto")
        createjs.Sound.registerSound("audios/fallo.mp3", "fallo")
        createjs.Sound.registerSound("audios/aplauso.mp3", "aplauso")
    },
    mounted(){
        document.getElementById("preload").style.display = "none"
    },
    data(){
        return {
            pantallaInicial: true,
            popupIntentos: false,
            popupFinal: false,
            nivelActual: {
                nivel: null,
                bg: 'bg-nivel1.svg',
                errores: 3,
                opciones: 2
            },
            modal_fail: false,
            modal_next: false,
            modal_fin: false,

            mensaje_fail_modal: '',
            mensaje_fin_nivel: '',

            primerFicha: null,
            lastFichaIzquierda: null,
            lastFichaDerecha: null,
            auxFichas: [],

            opciones: [],
            dropsIzquierda: [],
            dropsDerecha: [],

            countFichasIzquierda: 1,
            countFichasDerecha: 1,

            infoNiveles: [],
            totalFallos: 0
        }
    },
    methods: {
        shuffleArray(array){
            for (let i = array.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1))
              const temp = array[i]
              array[i] = array[j]
              array[j] = temp
            }
            return array
        },
        showModalErrores(){
            this.mensaje_fail_modal = this[`mensaje_fail_nivel${this.nivelActual.nivel}`]
            this.modal_fail = true
        },
        escogerNivel(lvl){
            this.nivelActual = {
                nivel: lvl,
                bg: this.bg_niveles[lvl - 1],
                errores: this.errores_niveles[lvl - 1],
                opciones: this.opciones_niveles[lvl - 1]
            }
        },
        initInfoNiveles(){
            this.infoNiveles = []
            for(let i = 0; i < this.opciones_niveles.length; i++){
                this.infoNiveles.push({correcto: false})
            }
        },
        finalizarJuego(){
            this.nivelActual.nivel = null
            this.initInfoNiveles()
            this.pantallaInicial = true
        },
        reiniciarJuego(){
            this.showModalErrores()
            this.empezarJuego()
        },
        empezarJuego(){
            if(this.nivelActual.nivel === null){
                this.mensaje_fail_modal = this.mensaje_fail_nivel
                this.modal_fail = true
            }else{

                //LIMPIAR FICHAS
                this.dropsIzquierda[0] = []
                for(let i = 1; i < this.fichasIzquierda.length; i++){
                    this.fichasIzquierda[i].show = false
                    this.dropsIzquierda[i] = []
                }
                this.dropsDerecha[0] = []
                for(let i = 1; i < this.fichasDerecha.length; i++){
                    this.fichasDerecha[i].show = false
                    this.dropsDerecha[i] = []
                }
                this.opciones = []
                this.auxFichas = JSON.parse(JSON.stringify(this.fichas))

                this.countFichasIzquierda = 1
                this.countFichasDerecha = 1

                this.totalFallos = 0

                //ELEGIR FICHA INICIAL
                let ficha_inicial = Math.round(Math.random()*(this.auxFichas.length - 1))
                this.primerFicha = JSON.parse(JSON.stringify(this.auxFichas[ficha_inicial]))
                this.auxFichas.splice(ficha_inicial, 1)
                this.lastFichaIzquierda = this.primerFicha
                this.lastFichaDerecha = this.primerFicha

                //ESCOGER OPCIONES - DEBE HABER 1 QUE SE PUEDA COLOCAR EN EL TABLERO DE FORMA CORRECTA
                this.addCorrectOptionFromOneDir()
                
                //RELLENAR DE FICHAS RANDOM PARA COMPLETAR OPCIONES
                for(let i = 0; i < this.opciones_niveles[this.nivelActual.nivel - 1] - 1; i++){
                    this.addRandomOption()
                }

                this.pantallaInicial = false

            }
        },
        addCorrectOptionFromOneDir(pre_dir = null){
            let fichaFound = 0
            let dir_inicial = 0
            
            if(pre_dir === null){
                dir_inicial = Math.round(Math.random()*1)
            }else if(pre_dir === 'izquierda'){
                dir_inicial = 0
            }else if(pre_dir === 'derecha'){
                dir_inicial = 1
            }

            if(dir_inicial == 0){
                //IZQUIERDA
                fichaFound = this.auxFichas.findIndex(el => el.id === this.lastFichaIzquierda.correctoIzquierda)
            }else if(dir_inicial == 1){
                //DERECHA
                fichaFound = this.auxFichas.findIndex(el => el.id === this.lastFichaDerecha.correctoDerecha)
            }
            if(fichaFound !== -1){
                this.opciones.push(this.auxFichas[fichaFound])
                this.auxFichas.splice(fichaFound, 1)
            }else{
                this.addRandomOption()
            }
        },
        addRandomOption(){
            let found = false
            let count = 0
            let random_option = 0
            let repetidos = []
            while(!found && count < this.auxFichas.length){
                random_option = Math.round(Math.random()*(this.auxFichas.length - 1))
                if(this.lastFichaIzquierda.correctoIzquierda === this.auxFichas[random_option].id || this.lastFichaDerecha.correctoDerecha === this.auxFichas[random_option].id){
                    if(repetidos.indexOf(random_option) == -1){
                        repetidos.push(random_option)
                        count++
                    }
                }else{
                    found = true
                }
            }

            this.opciones.push(this.auxFichas[random_option])
            this.auxFichas.splice(random_option, 1)
        },
        checkFinishGame(){
            if(this.totalFallos == this.errores_niveles[this.nivelActual.nivel - 1]){
                this.empezarJuego()
            }

            if(this.opciones.length == 0){
                //RETO CONSEGUIDO
                createjs.Sound.play('aplauso')
                this.infoNiveles[this.nivelActual.nivel - 1].correcto = true
                let finish = true
                this.infoNiveles.forEach(el => {
                    if(!el.correcto){
                        finish = false
                    }
                })

                if(finish){
                    //MOSTRAR PANTALLA FINAL
                    this.modal_fin = true
                }else{
                    if(this.infoNiveles[this.nivelActual.nivel] !== undefined){
                        this.mensaje_fin_nivel = this.mensaje_siguiente_nivel
                    }else{
                        this.mensaje_fin_nivel = this.mensaje_falta_nivel
                    }
                    this.modal_next = true
                }
            }
        },
        checkNextOption(){
            if(this.auxFichas.length > 0){
                //AÑADIR NUEVA FICHA A OPCIONES
                let leftFound = this.opciones.findIndex(el => el.id === this.lastFichaIzquierda.correctoIzquierda)
                let rightFound = this.opciones.findIndex(el => el.id === this.lastFichaDerecha.correctoDerecha)
                if((leftFound == -1 && rightFound == -1) || this.countFichasIzquierda == this.fichasIzquierda.length + 1 || this.countFichasDerecha == this.fichasDerecha.length + 1){
                    //AÑADIR OPCIÓN CORRECTA DE ALGUNO DE LOS DOS LADOS
                    if(this.countFichasIzquierda == this.fichasIzquierda.length + 1){
                        this.addCorrectOptionFromOneDir('derecha')
                    }else if(this.countFichasDerecha == this.fichasDerecha.length + 1){
                        this.addCorrectOptionFromOneDir('izquierda')
                    }else{
                        this.addCorrectOptionFromOneDir()
                    }
                }else{
                    //AÑADIR UNA OPCIÓN ALEATORIA QUE NO PUEDA SER COLOCADA EN TABLERO
                    this.addRandomOption()
                }
            }
        },
        onAcierto(ficha, dir){
            if(dir === 'izquierda'){
                this.lastFichaIzquierda = ficha
                if(this.fichasIzquierda[this.countFichasIzquierda] !== undefined) this.fichasIzquierda[this.countFichasIzquierda].show = true
                this.countFichasIzquierda += 1
            }else if(dir === 'derecha'){
                this.lastFichaDerecha = ficha
                if(this.fichasDerecha[this.countFichasDerecha] !== undefined) this.fichasDerecha[this.countFichasDerecha].show = true
                this.countFichasDerecha += 1
            }
            this.checkNextOption()
            createjs.Sound.play('acierto')
        },
        onFallo(ficha){
            this.opciones.push(ficha)
            createjs.Sound.play('fallo')
            this.totalFallos += 1
        },
        clickSound(){
            createjs.Sound.play('clic')
        },
        goFullScreen(){
            parent.postMessage("fullscreen", "*")
            createjs.Sound.play('clic')
        }
    }
}