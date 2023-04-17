var OpcionesContainer = {
    model: {
        prop: 'modelValue',
        event: 'change'
    },
    props: {
        modelValue: Boolean,
        orientacion: String
    },
    components: {
        'Container': VueSmoothDnd.Container
    },
    template: `
    <Container
        group-name="dominoe"
        :orientation="orientacion"
        :get-child-payload="index => dragActual(index)"
        :should-animate-drop="(src, payload) => animarDrop(src, payload)"
        @drag-start="iniciaDrag"
        @drop="hacerDrop($event)"
    >
        <slot></slot>
    </Container>
    `,
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
        hacerDrop(dropResult) {
            let result = this.applyDrag(this.modelValue, dropResult)
            this.$emit('change', result)
            this.$emit('check')
        },
        animarDrop(sourceContainerOptions, payload) {
            return false
        },
        iniciaDrag(dragResult) {
            const { isSource } = dragResult
            if(isSource){
                createjs.Sound.play("clic")
            }
        }
    }
}