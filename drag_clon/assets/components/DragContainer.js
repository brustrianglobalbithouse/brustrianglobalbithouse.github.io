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
        :behaviour="(modelValue.tipo == 'clon' ? 'copy' : 'move')"
        :get-child-payload="index => dragActual(index)"
        :should-accept-drop="(src, payload) => aceptaDrag(src, payload)"
        :should-animate-drop="(src, payload) => animarDrop(src, payload)"
        @drag-start="iniciaDrag"
        @[dropEvent]="hacerDrop($event)"
        :remove-on-drop-out="true"
    >
        <slot></slot>
    </Container>
    `,
    computed: {
        dropEvent(){
            return (this.modelValue.tipo == 'clon' ? null : 'drop')
        }
    },
    methods: {
        applyDrag (arr, dragResult) {
            arr = JSON.parse(JSON.stringify(arr))
            dragResult = JSON.parse(JSON.stringify(dragResult))
            const { removedIndex, addedIndex, payload } = dragResult
            if (removedIndex === null && addedIndex === null) return arr
            const result = [...arr]
            let itemToAdd = payload
            if (removedIndex !== null) {
              itemToAdd = result.splice(removedIndex, 1)[0]
            }
            
            if (addedIndex !== null) {
                itemToAdd.parent = this.modelValue.nombre
                result.splice(addedIndex, 0, itemToAdd)
                createjs.Sound.play("clic")
            }
            return result
        },
        dragActual(index){
            console.log(this.modelValue.items[index])
            return this.modelValue.items[index]
        },
        aceptaDrag(sourceContainerOptions, payload) {
            if(this.modelValue.tipo !== 'clon'){
                if(payload.parent === this.modelValue.nombre && sourceContainerOptions.behaviour !== 'copy'){
                    return true
                }else{
                    return this.modelValue.items.length < this.modelValue.cantidad
                }
            }else{
                return false
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