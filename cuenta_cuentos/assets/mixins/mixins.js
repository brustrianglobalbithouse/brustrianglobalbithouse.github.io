var mixins = {
    created(){

        this.actualAudio = this.soundButtons[Math.ceil(this.actualPage / 2) - 1]

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
            actualPage: 1,
            actualAudio: null,
            actualSound: null,
            whatSound: null,
            audioFinished: true,
            toggleAudio: true,

            // AUDIO LINEAL
            sliderModel: 0,
            backColor: "#e6e6e6",
            paused: true,
            stopped: true,
            totalDuration: 0,
            audioObject: null,
            initStop: false,
            mouseUp: false,
            lastState: false,
            completed: false,
            lastPage: null
            // AUDIO LINEAL
        }
    },
    computed: {
        mutedAudioLeft(){
            if(this.whatSound === 'actualAudioLeft'){
                return this.toggleAudio
            }else{
                return false
            }
        },
        mutedAudioRight(){
            if(this.whatSound === 'actualAudioRight'){
                return this.toggleAudio
            }else{
                return false
            }
        }
    },
    methods: {
        onFlipStart(){
            this.stopAudio()
            this.sliderModel = 0
            this.audioObject = null
        },
        onFlipLeft(){
            this.actualPage -= 2
            this.changeActualAudio()
        },
        onFlipRight(){
            this.actualPage += 2
            this.changeActualAudio()
        },
        changeActualAudio(){
            this.actualAudio = this.soundButtons[Math.ceil(this.actualPage / 2) - 1]
            this.clickAudio()
        },

        clickAudio(){
            if(this.actualAudio != null && this.paused){
                //START AUDIO
                
                if(this.audioObject == null) {
                    this.audioObject = createjs.Sound.play(this.actualAudio, {loop: 0})
                    this.audioObject.on("complete", this.completeAudio, this)
                }

                this.resumeAudio()
            }else{
                //PAUSE AUDIO
                this.pauseAudio()
            }
        },
        pauseAudio(){
            if(this.audioObject !== null){
                this.audioObject.paused = true
                this.paused = true
                createjs.Ticker.removeEventListener("tick", this.handleTick)
            }
        },
        resumeAudio(){
            if(this.audioObject !== null){
                //OBTENER VALOR ACTUAL DE SLIDER
                if(this.sliderModel <= 100){
                    let newPos = (this.sliderModel * this.audioObject.duration) / 100
                    this.audioObject.position = newPos
                }

                if(this.completed){
                    this.sliderModel = 0
                    this.audioObject.position = 0
                    this.completed = false
                }

                createjs.Ticker.addEventListener("tick", this.handleTick)

                if(this.stopped){
                    this.audioObject.play()
                    this.stopped = false
                }

                this.audioObject.paused = false
                this.paused = false
            }
        },
        completeAudio(){
            this.completed = true
            this.stopAudio()
        },
        stopAudio(){
            if(this.audioObject !== null) this.audioObject.stop()
            this.stopped = true
            this.paused = true
            createjs.Ticker.removeEventListener("tick", this.handleTick)
        },
        endSlider(){
            this.clickSound()
            this.completed = false
            if(!this.lastState) this.resumeAudio()
        },
        inputSlider(){
            if(this.mouseUp){
                this.mouseUp = false
                this.completed = false
                this.clickSound()
                if(!this.lastState){
                    this.resumeAudio()
                }
            }
        },
        mouseUpSlider(){
            this.mouseUp = true
        },
        mouseDownSlider(){
            this.lastState = JSON.parse(JSON.stringify(this.paused))
            this.pauseAudio()
        },
        handleTick(event){
            this.sliderModel = (this.audioObject.position / this.audioObject.duration) * 100
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