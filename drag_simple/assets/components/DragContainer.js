var DragContainer = {
    model: {
        prop: 'modelValue',
        event: 'change'
    },
    props: {
        modelValue: Boolean
    },
    components: {
        'Container': VueSmoothDnd.Container
    },
    template: `
    <Container
        :group-name="modelValue.grupo"
        :orientation="modelValue.orientacion"
        :get-child-payload="index => dragActual(index)"
        :should-accept-drop="(src, payload) => aceptaDrag(src, payload)"
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
            return this.modelValue.items[index]
        },
        aceptaDrag(sourceContainerOptions, payload) {
            if(this.modelValue.acepta === undefined){
                let founded = this.modelValue.items.findIndex(el => el.id === payload.id)
                return (this.modelValue.items.length < this.modelValue.cantidad || founded !== -1)
            }else{
                let founded = this.modelValue.acepta.findIndex(el => el === payload.id)
                if(this.modelValue.items.length < this.modelValue.cantidad){
                    return founded !== -1
                }else{
                    let founded2 = this.modelValue.items.findIndex(el => el.id === payload.id)
                    return founded2 !== -1
                }
            }
        },
        hacerDrop(dropResult) {
            let result = this.applyDrag(this.modelValue.items, dropResult)
            let newGroup = JSON.parse(JSON.stringify(this.modelValue))
            newGroup.items = result
            this.$emit('change', newGroup)
            //Vue.set(val, 'items', result)
        },
        animarDrop(sourceContainerOptions, payload) {
            return this.modelValue.animarDrop
        },
        iniciaDrag(dragResult) {
            const { isSource } = dragResult
            if(isSource){
                createjs.Sound.play("clic")
            }
        }
    }
}