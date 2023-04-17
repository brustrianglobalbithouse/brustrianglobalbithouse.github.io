/*version 08/05/2022*/
var AudioLinealPrincipal = {
    model: {
        prop: 'modelValue',
        event: 'change'
    },
    props: {
        modelValue: Boolean,
        width: {
            type: String,
            default: '640px'
        },
        horizontal: {
            type: String,
            default: 'left'
        },
        vertical: {
            type: String,
            default: 'center'
        },
        trackColor: {
            type: String,
            default: '#6060a8'
        },
        textClass: {
            type: String,
            default: ''
        },
        color: {
            type: String,
            default: '#9991f5'
        },
        hideController: {
            type: Object,
            default: {layer: 0, layersController: [0,0], mostrarPantallaFinal: true}
        }
    },
    template: `
    <div class="d-flex justify-space-between" ref="audioDiv" :class="[posFlex, posHorizontal]" :style="'width: ' + width + ';' + (isHideController ? 'display: none !important' : '')">
        <v-btn depressed class="btn-sound bg-shadow bg-button mb-5 mt-2" :class="[posVertical, marginButton]" @click="clickAudio">
            <div class="d-flex justify-space-around align-center flex-row">
                <svg height="25px" v-if="paused" viewBox="0 0 19 26">
                    <path d="M5.15.9l12.31,9.85a2.88,2.88,0,0,1,0,4.5L5.15,25.1A2.89,2.89,0,0,1,.46,22.85V3.15A2.89,2.89,0,0,1,5.15.9Z" style="fill:#fff"/>
                </svg>
                <svg height="25px" v-else viewBox="0 0 36 29">
                    <path fill="#FFFFFF" d="M12,26.5L12,26.5c-1.3,0-2.3-1-2.3-2.3V4.8c0-1.3,1-2.3,2.3-2.3h0c1.3,0,2.3,1,2.3,2.3v19.3
                        C14.3,25.5,13.3,26.5,12,26.5z"/>
                    <path fill="#FFFFFF" d="M24,26.5L24,26.5c-1.3,0-2.3-1-2.3-2.3V4.8c0-1.3,1-2.3,2.3-2.3h0c1.3,0,2.3,1,2.3,2.3v19.3
                            C26.3,25.5,25.3,26.5,24,26.5z"/>
                </svg>
            </div>
        </v-btn>
        <div class="d-flex align-center" :class="[posVertical2]" style="width: 100%">
            <p class="font1 mb-0 mr-2" :class="[textClass]">{{playbackTime}}</p>
            <v-slider :max="maxSize" hide-details v-model="sliderModel" @mousedown="mouseDownSlider" @mouseup="mouseUpSlider" @input="inputSlider" @end="endSlider" :color="trackColor" :track-color="backColor" :thumb-color="color" class="flex-grow-1 audio-track"></v-slider>
            <p class="font1 mb-0 ml-2" :class="[textClass]">{{totalTime}}</p>
        </div>
    </div>
    `,
    data(){
        return {
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
            maxSize: 300
        }
    },
    created(){
        createjs.Sound.registerSound(this.modelValue.ruta, this.modelValue.id_audio)
        setTimeout(() => {
            let instance = createjs.Sound.play(this.modelValue.id_audio)
            let mod = instance.duration % 1000
            this.totalDuration = Math.floor(instance.duration - mod) + 1000
            instance.stop()
        }, 500)
    },
    methods: {
        clickAudio(){
            if(this.paused){
                //START AUDIO
                
                this.initStop = true
                this.$emit('stop')
                
                if(this.audioObject == null) {
                    this.audioObject = createjs.Sound.play(this.modelValue.id_audio, {loop: 0})
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
                //createjs.Ticker.paused = true
            }
        },
        resumeAudio(){
            if(this.audioObject !== null){
                //OBTENER VALOR ACTUAL DE SLIDER
                if(this.sliderModel <= this.maxSize){
                    let newPos = (this.sliderModel * this.audioObject.duration) / this.maxSize
                    this.audioObject.position = newPos
                }

                if(this.completed){
                    this.sliderModel = 0
                    this.audioObject.position = 0
                    this.completed = false
                }

                createjs.Ticker.addEventListener("tick", this.handleTick)
                createjs.Ticker.interval = 25
                createjs.Ticker.framerate = 40

                if(this.stopped){
                    this.audioObject.play()
                    this.stopped = false
                }

                this.audioObject.paused = false
                this.paused = false
                createjs.Ticker.paused = false
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
        changeModel(val){
            let aux_model = JSON.parse(JSON.stringify(this.modelValue))
            aux_model.valor = val
            this.$emit('change', aux_model)
        },
        endSlider(){
            if(!this.lastState) this.resumeAudio()
        },
        inputSlider(){
            if(this.mouseUp){
                this.mouseUp = false
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
            if(!event.paused){
                this.sliderModel = (this.audioObject.position / this.audioObject.duration) * this.maxSize
            }
        },
        convertTime(miliseconds){
            let aux_seconds = Math.floor(miliseconds / 1000)
            let minutes = Math.floor(aux_seconds / 60)
            let seconds = aux_seconds - (minutes * 60)
            return (minutes < 10 ? `0${minutes}` : minutes) + ":" + (seconds < 10 ? `0${seconds}` : seconds)
        }
    },
    computed: {
        isHideController(){
            return this.hideController.layer == this.hideController.layersController.length - (this.hideController.mostrarPantallaFinal === true ? 1 : 0)
        },
        playbackTime(){
            if(this.audioObject !== null){
                return this.convertTime(this.audioObject.position)
            }else{
                return '00:00'
            }
        },
        totalTime(){
            if(this.totalDuration != 0){
                return this.convertTime(this.totalDuration)
            }else{
                return '--:--'
            }
        },
        posFlex(){
            if(this.vertical == 'center'){
                return 'flex-row'
            }else{
                return 'flex-column'
            }
        },
        posHorizontal(){
            if(this.vertical != 'center'){
                if(this.horizontal === 'center'){
                    return 'align-center'
                }else if(this.horizontal === 'right'){
                    return 'align-end'
                }else{
                    return 'align-start'
                }
            }else{
                return 'align-center'
            }
        },
        posVertical(){
            if(this.vertical === 'bottom' || (this.vertical === 'center' && this.horizontal === 'right')){
                return 'order-2'
            }else{
                return 'order-1'
            }
        },
        posVertical2(){
            if(this.vertical === 'bottom' || (this.vertical === 'center' && this.horizontal === 'right')){
                return 'order-1'
            }else{
                return 'order-2'
            }
        },
        marginButton(){
            if(this.vertical == 'center'){
                if(this.horizontal === 'right'){
                    return 'ml-4'
                }else{
                    return 'mr-4'
                }
            }
        }
    },
    watch: {
        modelValue: {
            deep: true,
            handler(){
                if(this.modelValue.valor === true){
                    if(!this.initStop){
                        this.pauseAudio()
                        //this.stopAudio()
                        //this.sliderModel = 0
                    }
                    this.initStop = false
                    this.changeModel(null)
                }
            }
        }
    }
}