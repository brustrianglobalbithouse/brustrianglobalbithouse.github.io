var Drop = {
    model: {
        prop: 'modelValue',
        event: 'change'
    },
    props: {
        modelValue: Boolean,
        ficha: Object,
        lastFicha: Object,
        contentClass: String,
        grupo: String
    },
    components: {
        'Container': VueSmoothDnd.Container,
        'draggable': VueSmoothDnd.Draggable
    },
    template: `
    <div class="full-container opacity-transition" :style="'opacity: '+ (showFicha ? 1 : 0)">
        <slot name="back"></slot>
        <Container
            group-name="dominoe"
            orientation="horizontal"
            :get-child-payload="index => dragActual(index)"
            :should-accept-drop="(src, payload) => aceptaDrag(src, payload)"
            :should-animate-drop="(src, payload) => animarDrop(src, payload)"
            @drop="hacerDrop($event)"
            @drag-start="onDragStart"
            @drag-end="onDragEnd"
            class="d-flex align-center justify-center"
            :class="contentClass"
        >
            <slot name="drag" :item="item"></slot>
        </Container>
    </div>
    `,
    data(){
        return {
            dragStart: false
        }
    },
    computed: {
        item(){
            return (this.modelValue[0] !== undefined ? this.modelValue[0] : null)
        },
        showFicha(){
            if(this.modelValue[0] !== undefined){
                return true
            }else{
                return this.dragStart && this.ficha.show
            }
        }
    },
    methods: {
        applyDrag (arr, dragResult) {
            const { removedIndex, addedIndex, payload } = dragResult
            if (removedIndex === null && addedIndex === null) return arr
            const result = [...arr]
            let itemToAdd = payload
            if (removedIndex !== null) {
              itemToAdd = result.splice(removedIndex, 1)[0]
            }
            if (addedIndex !== null) {
              result.splice(addedIndex, 0, itemToAdd)
              createjs.Sound.play("clic")
            }
            return result
        },
        dragActual(index){
            return this.modelValue[index]
        },
        aceptaDrag(sourceContainerOptions, payload) {
            if(this.modelValue[0] !== undefined){
                return false
            }else{
                return this.ficha.show
            }
        },
        onDragStart(dragResult){
            this.dragStart = true
        },
        onDragEnd(dragResult){
            this.dragStart = false
        },
        hacerDrop(dropResult) {
            const { removedIndex, addedIndex, payload, element } = dropResult
            if(addedIndex !== null){
                let result = this.applyDrag(this.modelValue, dropResult)
                this.$emit('change', result)

                // VERIFICAR SI RESPUESTA ES CORRECTA
                if(this.grupo === 'izquierda'){
                    if(result[0].id === this.lastFicha.correctoIzquierda){
                        //CORRECTO
                        this.onAcierto(payload)
                    }else{
                        //FALLO
                        this.onFallo(payload)
                    }
                }else if(this.grupo === 'derecha'){
                    if(result[0].id === this.lastFicha.correctoDerecha){
                        //CORRECTO
                        this.onAcierto(payload)
                    }else{
                        //FALLO
                        this.onFallo(payload)
                    }
                }
            }
        },
        onAcierto(payload){
            this.$emit('acierto', payload)
        },
        onFallo(payload){
            this.$emit('change', [])
            this.$emit('fallo', payload)
        },
        animarDrop(sourceContainerOptions, payload) {
            return false
        }
    }
}