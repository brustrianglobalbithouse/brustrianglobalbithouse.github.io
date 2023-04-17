/*version 08/05/2022*/
var AudioLineal = {
    model: {
        prop: 'modelValue',
        event: 'change'
    },
    props: {
        modelValue: Boolean,
        width: {
            type: String,
            default: '368px'
        },
        horizontal: {
            type: String,
            default: 'center'
        },
        vertical: {
            type: String,
            default: 'top'
        },
        color: {
            type: String,
            default: '#9991f5'
        }
    },
    template: `
    <div class="d-flex flex-column" ref="audioDiv" :class="[posHorizontal]" :style="'width: ' + width">
        <v-btn depressed class="btn-sound bg-shadow bg-button mb-5 mt-2" :class="[posVertical]" @click="clickAudio">
            <div class="d-flex justify-space-around align-center flex-row">
                <img height="25px" v-if="paused" src="images/sound-icon.svg">
                <svg height="25px" v-else viewBox="0 0 36 29">
                    <path fill="#FFFFFF" d="M12,26.5L12,26.5c-1.3,0-2.3-1-2.3-2.3V4.8c0-1.3,1-2.3,2.3-2.3h0c1.3,0,2.3,1,2.3,2.3v19.3
                        C14.3,25.5,13.3,26.5,12,26.5z"/>
                    <path fill="#FFFFFF" d="M24,26.5L24,26.5c-1.3,0-2.3-1-2.3-2.3V4.8c0-1.3,1-2.3,2.3-2.3h0c1.3,0,2.3,1,2.3,2.3v19.3
                            C26.3,25.5,25.3,26.5,24,26.5z"/>
                </svg>
            </div>
        </v-btn>
        <v-slider style="width: 100%" hide-details v-model="sliderModel" @mousedown="mouseDownSlider" @mouseup="mouseUpSlider" @input="inputSlider" @end="endSlider" :color="backColor" :track-color="backColor" :thumb-color="color" class="audio-track" :class="[posVertical2]"></v-slider>
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
            completed: false
        }
    },
    created(){
        createjs.Sound.registerSound(this.modelValue.ruta, this.modelValue.id_audio)
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
                createjs.Ticker.paused = false
            }
        },
        completeAudio(){
            this.completed = true
            this.stopAudio()
        },
        stopAudio(){
            console.log("completed!")
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
                this.sliderModel = (this.audioObject.position / this.audioObject.duration) * 100
            }
        }
    },
    computed: {
        posHorizontal(){
            if(this.horizontal === 'center'){
                return 'align-center'
            }else if(this.horizontal === 'right'){
                return 'align-end'
            }else{
                return 'align-start'
            }
        },
        posVertical(){
            if(this.vertical === 'bottom'){
                return 'order-2'
            }else{
                return 'order-1'
            }
        },
        posVertical2(){
            if(this.vertical === 'bottom'){
                return 'order-1'
            }else{
                return 'order-2'
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