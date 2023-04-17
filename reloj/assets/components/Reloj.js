var Reloj = {
    name: 'reloj',
    mixins: [TextosGlobales],
    model: {
        prop: 'modelValue',
        event: 'change'
    },
    props: ['modelValue'],
    template: `
    <div class="reloj-container">
        <slot name="reloj"></slot>
        <div class="agujas-container" ref="agujasContainer">
            <div class="aguja-hora">
                <div class="transform-aguja-hora" :class="{'aguja-hora-disabled' : !this.agujaEnHora, 'd-none' : modelValue.mostrarAgujaHoras}" :style="getRotateHora">
                    <slot name="hora"></slot>
                </div>
            </div>
            <div class="aguja-minuto">
                <div class="transform-aguja-minuto" :class="{'aguja-minuto-disabled' : this.agujaEnHora, 'd-none' : modelValue.mostrarAgujaMinutos}" :style="getRotateMinuto">
                    <slot name="minuto"></slot>
                </div>
            </div>
        </div>
        <div class="agujas-toggle-container">
            <slot name="estado" :agujaHora="agujaEnHora" :toggle="toggleEnHora"></slot>
        </div>
    </div>
    `,
    data(){
        return {
            down: false,
            rotationHora: 0,
            rotationMinuto: 0,

            numHora: 0,
            numMinuto: 0,

            agujaEnHora: true,
            valorInicial: '12:00',

            checkClick: false,
            checkClickTimeout: null
        }
    },
    created(){
        let valor_inicial = this.modelValue.valorInicial
        if(this[valor_inicial]) this.valorInicial = this[valor_inicial]
        this.horaARotate(this.valorInicial)
        this.agujaEnHora = (this.modelValue.agujaActual == 'minuto' ? false : true)
    },
    mounted(){  
        this.$refs.agujasContainer.addEventListener("mousedown", this.onMouseDown, { passive: false })
        this.$refs.agujasContainer.addEventListener("mousemove", this.onMouseMove)
        this.$refs.agujasContainer.addEventListener("mouseup", this.onMouseUp, { passive: false })
        this.$refs.agujasContainer.addEventListener("mouseleave", this.onMouseLeave, { passive: false })

        this.$refs.agujasContainer.addEventListener("touchstart", this.onTouchDown, { passive: false })
        this.$refs.agujasContainer.addEventListener("touchmove", this.onTouchMove)
        this.$refs.agujasContainer.addEventListener("touchend", this.onTouchUp, { passive: false })
        this.$refs.agujasContainer.addEventListener("touchcancel", this.onTouchLeave, { passive: false })
    },
    computed: {
        getTransformOrigin(){
            return `transform-origin: 50% calc(100% - ${this.modelValue.offset}px)`
        },
        getRotateHora(){
            return `transform: rotate(${this.rotationHora}deg)`
        },
        getRotateMinuto(){
            return `transform: rotate(${this.rotationMinuto}deg)`
        }
    },
    methods: {
        offset(el) {
            let rect = el.getBoundingClientRect()
            return rect
        },
        toggleEnHora(){
            this.agujaEnHora = !this.agujaEnHora
        },
        horaARotate(hora){
            let vals = (hora == null ? this.valorInicial : hora).split(":").map(el => {
                return parseInt(el)
            })

            try {
                if (vals.length != 2 || (vals[0] < 1 || vals[0] > 12) || (vals[1] < 0 || vals[1] > 59)){
                    throw new Error('El valor ' + hora + ' no corresponde al formato de hora HH:mm.')
                }
                
                this.rotationHora = vals[0] * 360 / 12
                this.rotationMinuto  = vals[1] * 360 / 60

                this.numHora = vals[0]
                this.numMinuto = vals[1]

            } catch (err) {
                console.log(`DEBUG: ${err.message}`)
                this.horaARotate('12:00')
            }
        },
        saveHora(){
            let hora_correct = `${(this.numHora < 10 ? '0' : '')}${this.numHora}:${(this.numMinuto < 10 ? '0' : '')}${this.numMinuto}`
            let aux_model = JSON.parse(JSON.stringify(this.modelValue))
            aux_model.valor = hora_correct
            this.$emit('change', aux_model)
        },
        getTouches(e) {
            return e.touches ? e.touches[0] : e;
        },
        onTouchDown(e){
            e.preventDefault()
            let aux_touch = this.getTouches(e)
            this.mouseDown(aux_touch.clientX, aux_touch.clientY)
        },
        onTouchMove(e){
            e.preventDefault()
            if(this.down){
                let aux_touch = this.getTouches(e)
                this.getAngle(aux_touch.clientX, aux_touch.clientY)
            }
        },
        onTouchUp(e){
            this.mouseUp()
        },
        onTouchLeave(e){
            this.mouseLeave()
        },
        onMouseDown(e){
            e.preventDefault()
            this.mouseDown(e.clientX, e.clientY)
        },
        onMouseMove(e){
            e.preventDefault()
            if(this.down){
                this.getAngle(e.clientX, e.clientY)
            }
        },
        onMouseUp(e){
            this.mouseUp()
        },
        onMouseLeave(e){
            this.mouseLeave()
        },
        mouseDown(posx, posy){
            this.down = true
            createjs.Sound.play("clic")
            this.getAngle(posx, posy)

            clearTimeout(this.checkClickTimeout)
            this.checkClick = false
            this.checkClickTimeout = setTimeout(() => {
                this.checkClick = true
            }, 300)
        },
        getAngle(posx, posy){
            let offset = this.offset(this.$refs.agujasContainer)
            let offsetX = offset.left + offset.width / 2
            let offsetY = offset.top + offset.height / 2

            let ancho = Math.abs(posx - offsetX)
            let alto = Math.abs(posy - offsetY)

            let auxAngle = 0
            if(offsetX <= posx && offsetY >= posy){
                //cuadrante I
                auxAngle = Math.atan(ancho / alto)
            }else if(offsetX <= posx && offsetY < posy){
                //cuadrante II
                auxAngle = Math.atan(alto / ancho) + Math.PI / 2
            }else if(offsetX > posx && offsetY < posy){
                //cuadrante III
                auxAngle = Math.atan(ancho / alto) + Math.PI
            }else if(offsetX > posx && offsetY >= posy){
                //cuadrante IV
                auxAngle = Math.atan(alto / ancho) + 3 * (Math.PI / 2)
            }
            let aux_rotate = auxAngle * (180 / Math.PI)
            if(this.agujaEnHora){
                let aux_num = (aux_rotate * 12) / 360
                let diff1 = aux_num - Math.floor(aux_num)
                let diff2 = Math.ceil(aux_num) - aux_num
                aux_num = (diff1 < diff2 ? Math.floor(aux_num) : Math.ceil(aux_num))
                this.numHora = (aux_num <= 0 ? 12 : aux_num)
            }else{
                let aux_num = (aux_rotate * (this.modelValue.minutosValen5 ? 12 : 60)) / 360
                let diff1 = aux_num - Math.floor(aux_num)
                let diff2 = Math.ceil(aux_num) - aux_num
                aux_num = (diff1 < diff2 ? Math.floor(aux_num) : Math.ceil(aux_num)) * (this.modelValue.minutosValen5 ? 5 : 1)
                this.numMinuto = (aux_num > 59 ? 0 : aux_num)
            }
            this.saveHora()
        },
        mouseUp(){
            if(this.down){
                this.down = false
                if(this.checkClick){
                    createjs.Sound.play("clic")
                }
            }
        },
        mouseLeave(){
            this.down = false
        }
    },
    watch: {
        modelValue: {
            deep: true,
            handler(){
                if(this.modelValue.valor === null){
                    this.agujaEnHora = (this.modelValue.agujaActual == 'minuto' ? false : true)
                }
                this.horaARotate(this.modelValue.valor)
            }
        }
    }
}