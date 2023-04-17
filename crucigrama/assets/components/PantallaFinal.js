/*version 08/05/2022*/
var PantallaFinal = {
    props: ['controller', 'tipo'],
    mixins: [Config, TextosGlobales],
    template: /*html*/`
    <v-window-item eager>
        <div class="d-flex justify-space-around flex-column align-center py-10" :style="(tipo == 'primaria-baja' ? 'height: 970px' : 'height: 970px')">
            
            <div class="d-flex flex-column align-center justify-center final-box-stars border-button ">
                <h1 class="font1 color-head">{{$data[language].tituloLogros}}</h1>
                <div class="d-flex">
                    <div class="d-flex mx-1" v-for="num in 5" :key="'star_' + num">
                        <svg v-if="totalPuntos < (2 * num - 1)" width="74.8" height="72" viewBox="0 0 74.8 72">
                            <path class="bg-fill" d="M61.2,46.4l10.9-10.7c2.4-2.3,3.2-5.7,2.2-8.8c-1-3.1-3.7-5.4-6.9-5.9l-15.1-2.2c-0.2,0-0.4-0.2-0.5-0.3L45,4.8
                                c-1.5-3-4.4-4.8-7.7-4.8C34,0,31,1.8,29.7,4.8l-6.8,13.7c-0.1,0.2-0.3,0.3-0.5,0.3L7.3,21c-3.3,0.5-5.9,2.7-6.9,5.9
                                c-1,3.1-0.2,6.5,2.2,8.8l10.9,10.7c0.1,0.1,0.2,0.3,0.2,0.5l-2.6,15c-0.4,2.5,0.3,5.1,1.9,7c1.7,2,4.1,3.1,6.6,3.1
                                c1.4,0,2.7-0.3,4-1l13.5-7.1c0.1,0,0.2-0.1,0.3-0.1c0.1,0,0.2,0,0.3,0.1L51.2,71c1.3,0.7,2.6,1,4,1c2.5,0,4.9-1.1,6.6-3.1
                                c1.6-1.9,2.3-4.5,1.9-7l-2.6-15C61,46.7,61,46.5,61.2,46.4z M57.2,47.6l2.6,15c0.5,3-1.9,5.4-4.5,5.4c-0.7,0-1.4-0.2-2.1-0.5
                                l-13.5-7.1c-0.7-0.3-1.3-0.5-2-0.5c-0.7,0-1.3,0.2-2,0.5l-13.5,7.1c-0.7,0.3-1.4,0.5-2.1,0.5c-2.6,0-5-2.4-4.5-5.4l2.6-15
                                c0.3-1.5-0.2-3.1-1.3-4.1l-11-10.6c-2.7-2.7-1.2-7.4,2.6-7.9l14.9-2.2c1.5-0.2,2.8-1.1,3.5-2.5l6.8-13.7C34.5,5,36,4.1,37.5,4v0
                                c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0l0,0c1.5,0.1,3.1,1,3.8,2.6l6.8,13.7c0.7,1.4,2,2.3,3.5,2.5L66.8,25c3.8,0.5,5.3,5.2,2.6,7.9
                                l-11,10.6C57.3,44.5,56.8,46.1,57.2,47.6z"/>
                        </svg>
                        <svg v-if="totalPuntos == (2 * num - 1)" width="74.8" height="72" viewBox="0 0 74.8 72">
                            <path class="bg-fill" d="M72.2,35.7c2.4-2.3,3.2-5.7,2.2-8.8s-3.7-5.4-6.9-5.9l-15.1-2.2c-0.2,0-0.4-0.2-0.5-0.3L45.1,4.8
                            c-1.5-3-4.4-4.8-7.7-4.8s-6.3,1.8-7.7,4.8l-6.8,13.7c-0.1,0.2-0.3,0.3-0.5,0.3L7.4,21c-3.3,0.5-5.9,2.7-6.9,5.9
                            c-1,3.1-0.2,6.5,2.2,8.8l10.9,10.7c0.1,0.1,0.2,0.3,0.2,0.5l-2.6,15c-0.4,2.5,0.3,5.1,1.9,7c1.7,2,4.1,3.1,6.6,3.1
                            c1.4,0,2.7-0.3,4-1l13.5-7.1c0.1,0,0.2-0.1,0.3-0.1s0.2,0,0.3,0.1L51.2,71c1.3,0.7,2.6,1,4,1c2.5,0,4.9-1.1,6.6-3.1
                            c1.6-1.9,2.3-4.5,1.9-7l-2.6-15c0-0.2,0-0.4,0.2-0.5L72.2,35.7z M57.2,47.6l2.6,15c0.5,3-1.9,5.4-4.5,5.4c-0.7,0-1.4-0.2-2.1-0.5
                            l-13.5-7.1c-0.7-0.3-1.4-0.5-2.1-0.5V4c1.6,0,3.3,0.9,4.1,2.6l6.8,13.7c0.7,1.4,2,2.3,3.5,2.5L66.9,25c3.8,0.5,5.3,5.2,2.6,7.9
                            l-11,10.6C57.4,44.5,56.9,46.1,57.2,47.6z"/>
                        </svg>
                        <svg v-if="totalPuntos > (2 * num - 1)" width="74.8" height="72" viewBox="0 0 74.8 72">
                            <path class="bg-fill" d="M37.4,0c-3.3,0-6.3,1.8-7.7,4.8l-6.8,13.7c-0.1,0.2-0.3,0.3-0.5,0.3L7.4,21c-3.3,0.5-5.9,2.7-6.9,5.9
                            c-1,3.1-0.2,6.5,2.2,8.8l10.9,10.7c0.1,0.1,0.2,0.3,0.2,0.5l-2.6,15c-0.4,2.5,0.3,5.1,1.9,7c1.7,2,4.1,3.1,6.6,3.1
                            c1.4,0,2.7-0.3,4-1l13.5-7.1c0.1,0,0.2-0.1,0.3-0.1c0.1,0,0.2,0,0.3,0.1L51.2,71c1.3,0.7,2.6,1,4,1c2.5,0,4.9-1.1,6.6-3.1
                            c1.6-1.9,2.3-4.5,1.9-7l-2.6-15c0-0.2,0-0.4,0.2-0.5l10.9-10.7c2.4-2.3,3.2-5.7,2.2-8.8c-1-3.1-3.7-5.4-6.9-5.9l-15.1-2.2
                            c-0.2,0-0.4-0.2-0.5-0.3L45.1,4.8C43.7,1.8,40.7,0,37.4,0L37.4,0z"/>
                        </svg>
                    </div>
                </div>
            </div>

            <div class="d-flex flex-column align-center justify-center final-box border-button">
                <h1 class="font1 color-head mb-3">{{$data[language].tituloResumen}}</h1>
                <div class="d-flex flex-column resumen-lineas" :class="tipo" style="width: 100%">
                    <div class="d-flex" :class="{'mb-8' : ind < lcontroller.length - 1, 'mb-5' : ind == lcontroller.length - 1 && tipo == 'primaria-baja'}" style="width: 100%" v-for="(ly, ind) in lcontroller" :key="'rs_' + ind">
                        <div class="d-flex align-center justify-center mr-4" style="height: 63px;">
                            <div class="d-flex align-center">
                                <div v-for="item in ly.intentos" :key="'intento-' + item" class="circulo-intento border-button" :class="{'bg-head' : item <= ly.auxIntentos}" style="margin: 0px 6px"></div>
                            </div>
                        </div>
                        <div class="line-fill border-button flex-grow-1"></div>
                        <h2 class="font1 color-head ml-5">{{localStars(ly)}}</h2>
                    </div>
                </div>
                <div v-if="tipo == 'primaria-baja'" class="d-flex justify-center" style="position: absolute; bottom: -27px; width: 100%">
                    <v-btn depressed class="btn-final bg-shadow-normal border-button" @click="$emit('return')">
                        <div class="d-flex justify-center align-center flex-row">
                            <svg viewBox="0 0 31.62 32.37" width="35" height="30">
                                <path class="bg-fill" d="M1.9,17.3l10.4,10.4c0.3,0.3,0.7,0.5,1.1,0.5c0.4,0,0.8-0.2,1.1-0.5l0.9-0.9c0.6-0.6,0.6-1.6,0-2.2l-6-6.1h19.2 c0.9,0,1.5-0.7,1.5-1.5c0,0,0,0,0,0v-1.3c0-0.9-0.7-1.6-1.5-1.6H9.3l6.1-6.1c0.3-0.3,0.5-0.7,0.4-1.1c0-0.4-0.2-0.8-0.4-1.1 l-0.9-0.9c-0.3-0.3-0.7-0.5-1.1-0.5c-0.4,0-0.8,0.2-1.1,0.5L1.9,15.1c-0.3,0.3-0.5,0.7-0.5,1.1C1.4,16.6,1.6,17,1.9,17.3"/>
                            </svg>
                        </div>
                    </v-btn>
                </div>
            </div>

            <div v-if="tipo == 'primaria-alta'" class="d-flex align-center justify-center" style="width: 100%;">
                <div class="d-flex flex-column align-center justify-center final-box-2 border-button">
                    <h1 class="font1 color-head">{{$data[language].result}}</h1>
                    <div class="d-flex align-end justify-center total-box bg-head">
                        <p class="font1 fb1 mr-3">{{totalPuntos}}</p>
                        <p class="font1 fb2 mr-3">/</p>
                        <p class="font1 fb3">10</p>
                    </div>
                    <div class="d-flex justify-center" style="position: absolute; bottom: -27px; width: 100%">
                        <v-btn depressed class="btn-final bg-shadow-normal border-button" @click="$emit('return')">
                            <div class="d-flex justify-center align-center flex-row">
                                <svg viewBox="0 0 31.62 32.37" width="35" height="30">
                                    <path class="bg-fill" d="M1.9,17.3l10.4,10.4c0.3,0.3,0.7,0.5,1.1,0.5c0.4,0,0.8-0.2,1.1-0.5l0.9-0.9c0.6-0.6,0.6-1.6,0-2.2l-6-6.1h19.2 c0.9,0,1.5-0.7,1.5-1.5c0,0,0,0,0,0v-1.3c0-0.9-0.7-1.6-1.5-1.6H9.3l6.1-6.1c0.3-0.3,0.5-0.7,0.4-1.1c0-0.4-0.2-0.8-0.4-1.1 l-0.9-0.9c-0.3-0.3-0.7-0.5-1.1-0.5c-0.4,0-0.8,0.2-1.1,0.5L1.9,15.1c-0.3,0.3-0.5,0.7-0.5,1.1C1.4,16.6,1.6,17,1.9,17.3"/>
                                </svg>
                            </div>
                        </v-btn>
                    </div>
                </div>
            </div>
        </div>

        

    </v-window-item>
    `,
    computed: {
        lcontroller(){
            return this.controller.filter(el => el.tipo === 'actividad')
        },
        totalPuntos(){
            let lg = 0
            let aplicarPenalizacion = this.penalizacion && (this.penalizacion.valor == 'porcentaje' || this.penalizacion.valor == 'valor fijo')
            let auxVal = this.controller.reduce((total, el) => {
                if(el.tipo === 'actividad' && el.correctas != null && el.opciones != null){
                    lg++
                    let sub_result = el.correctas / el.opciones
                    if(aplicarPenalizacion){
                        let intento = this.penalizacion[`intento${el.auxIntentos}`]
                        if(intento){
                            sub_result = (this.penalizacion.valor == 'porcentaje' ? sub_result * intento : sub_result - intento)
                        }
                    }
                    return total += (sub_result < 0 ? 0 : sub_result) * 10
                }else{
                    return total
                }
            }, 0) / lg
            return (auxVal < 9 ? Math.ceil(auxVal) : Math.floor(auxVal))
        }
    },
    methods: {
        localStars(ly){
            //CALCULAR PUNTOS
            return `${ly.correctas}/${ly.opciones}`
        }
    }
}