/*version 08/05/2022*/
var HeaderNav = {
    props: {
        modelValue: Boolean,
        layer: Int8Array,
        layers: Int8Array,
        controller: Array,
        disabledButton: Boolean,
        mostrarPantallaFinal: {
            type: Boolean,
            default: true
        },
        liberarLayers: {
            type: Boolean,
            default: false
        }
    },
    mixins: [Config, TextosGlobales],
    template: /* html */`
    <v-container fluid no-gutters class="pa-0" :class="{'bg-final' : layer == layers}" style="position: relative; height: 100%">
        <v-row no-gutters>
            <v-col cols="12" class="py-2 px-4 d-flex justify-space-between align-center flex-row header-style bg-head">
                <div class="d-flex justify-center align-center flex-row px-4 py-1">
                    <div class="d-flex justify-start align-center logo-header" style="height:100%;" :style=" sello == 'richmond' ? 'width: 340px' : 'width: 174px' " v-html="$data[sello]"></div>
                    <div class="sep-v mx-8"></div>
                    <h2 class="font-titulo white--text">{{titulo}}</h2>     
                </div>
                <div class="d-flex justify-center align-center flex-row">
                    <v-btn class="mr-8 sound-btn" large icon :ripple="false" dark color="white" @click="changeSound(!habilitarSonido)">

                        <svg v-if="habilitarSonido" width="40px" height="40px" viewBox="0 0 67 67" style="overflow:visible;enable-background:new 0 0 67 67;" xml:space="preserve">
                            <path style="fill:#FFFFFF;" d="M33.5,47.8c0,0.8-0.5,1.5-1.2,1.9c-0.3,0.1-0.6,0.2-0.9,0.2c-0.5,0-1-0.2-1.3-0.5L18.7,40h-6.1
                                    c-1.2,0-2.1-0.9-2.1-2.1v-8.3c0-1.2,0.9-2.1,2.1-2.1h6.1L30.1,18c0.6-0.5,1.5-0.6,2.2-0.3c0.7,0.3,1.2,1.1,1.2,1.9L33.5,47.8
                                    L33.5,47.8z M41.5,44.6c-0.1,0-0.1,0-0.2,0c-0.6,0-1.1-0.2-1.5-0.6l-0.3-0.3c-0.7-0.7-0.8-1.9-0.2-2.7c1.6-2.1,2.4-4.6,2.4-7.2
                                    c0-2.8-0.9-5.5-2.7-7.7c-0.7-0.8-0.6-2,0.1-2.8l0.3-0.3c0.4-0.4,1-0.6,1.6-0.6c0.6,0,1.1,0.3,1.5,0.8c2.5,3,3.8,6.7,3.8,10.6
                                    c0,3.6-1.2,7.1-3.3,10C42.7,44.2,42.2,44.5,41.5,44.6z M50.2,51c-0.4,0.4-0.9,0.7-1.5,0.7c0,0-0.1,0-0.1,0c-0.6,0-1.1-0.2-1.5-0.6
                                    l-0.3-0.3c-0.8-0.8-0.8-2-0.1-2.8c3.4-4,5.2-9.1,5.2-14.3c0-5.4-2-10.7-5.6-14.8c-0.7-0.8-0.7-2.1,0.1-2.9l0.3-0.3
                                    c0.4-0.4,0.9-0.6,1.5-0.6c0.6,0,1.1,0.3,1.5,0.7c4.4,4.9,6.8,11.2,6.8,17.8C56.5,40.1,54.3,46.2,50.2,51z"/>
                            <circle style="fill:none;" cx="33.5" cy="33.5" r="33.5"/>
                        </svg>

                        <svg v-if="!habilitarSonido" width="40px" height="40px" viewBox="0 0 46.4 46.4" style="overflow:visible;enable-background:new 0 0 46.4 46.4;" xml:space="preserve">
                            <path style="fill:#FFFFFF;" d="M23.2,33.1c0,0.6-0.3,1.1-0.8,1.3c-0.2,0.1-0.4,0.1-0.6,0.1c-0.3,0-0.7-0.1-0.9-0.3l-7.9-6.6H8.7
                                        c-0.8,0-1.4-0.6-1.4-1.4v-5.8c0-0.8,0.6-1.4,1.4-1.4h4.2l7.9-6.6c0.4-0.4,1-0.4,1.5-0.2c0.5,0.2,0.8,0.7,0.8,1.3L23.2,33.1
                                        L23.2,33.1z M28.8,30.9c0,0-0.1,0-0.1,0c-0.4,0-0.8-0.2-1-0.4l-0.2-0.2c-0.5-0.5-0.6-1.3-0.1-1.9c1.1-1.5,1.7-3.2,1.7-5
                                        c0-2-0.6-3.8-1.9-5.3c-0.5-0.6-0.4-1.4,0.1-1.9l0.2-0.2c0.3-0.3,0.7-0.4,1.1-0.4c0.4,0,0.8,0.2,1,0.5c1.7,2.1,2.6,4.6,2.6,7.3
                                        c0,2.5-0.8,4.9-2.3,6.9C29.6,30.6,29.2,30.8,28.8,30.9z M34.8,35.3c-0.3,0.3-0.6,0.5-1,0.5c0,0,0,0-0.1,0c-0.4,0-0.8-0.2-1-0.4
                                        l-0.2-0.2c-0.5-0.5-0.6-1.4-0.1-2c2.3-2.8,3.6-6.3,3.6-9.9c0-3.8-1.4-7.4-3.9-10.2c-0.5-0.6-0.5-1.4,0.1-2l0.2-0.2
                                        c0.3-0.3,0.6-0.4,1.1-0.4c0.4,0,0.8,0.2,1,0.5c3,3.4,4.7,7.8,4.7,12.3C39.1,27.7,37.6,32,34.8,35.3z"/>
                            <path style="fill:#FFFFFF;" d="M40.8,35c-0.3,0-0.6,0-0.8-0.2L5,14c-0.7-0.4-0.9-1.2-0.5-1.9c0.4-0.7,1.2-0.9,1.9-0.5l35,20.9
                                        c0.7,0.4,0.9,1.2,0.5,1.9C41.6,34.7,41.2,35,40.8,35z"/>
                            <circle style="fill:none;" cx="23.2" cy="23.2" r="23.2"/>
                        </svg>

                    </v-btn>
                    <v-btn class="mr-6 fullscreen-btn" large icon :ripple="false" dark color="white" @click="goFullScreen">
                        <svg width="40px" height="40px" viewBox="0 0 46.4 46.4" style="overflow:visible;enable-background:new 0 0 46.4 46.4;" xml:space="preserve">
                            <path style="fill:#FFFFFF;" d="M18.5,9.8h-8.1c-0.4,0-0.7,0.3-0.7,0.7v8.1c0,0.4,0.3,0.7,0.7,0.7h1.3c0.4,0,0.7-0.3,0.7-0.7v-6h6
                                    c0.4,0,0.7-0.3,0.7-0.7v-1.3C19.2,10.1,18.9,9.8,18.5,9.8z"/>
                            <path style="fill:#FFFFFF;" d="M36,9.8h-8.1c-0.4,0-0.7,0.3-0.7,0.7v1.3c0,0.4,0.3,0.7,0.7,0.7h6v6c0,0.4,0.3,0.7,0.7,0.7H36
                                    c0.4,0,0.7-0.3,0.7-0.7v-8.1C36.6,10.1,36.3,9.8,36,9.8z"/>
                            <path style="fill:#FFFFFF;" d="M36,27.2h-1.3c-0.4,0-0.7,0.3-0.7,0.7v6h-6c-0.4,0-0.7,0.3-0.7,0.7V36c0,0.4,0.3,0.7,0.7,0.7H36
                                    c0.4,0,0.7-0.3,0.7-0.7v-8.1C36.6,27.5,36.3,27.2,36,27.2z"/>
                            <path style="fill:#FFFFFF;" d="M18.5,33.9h-6v-6c0-0.4-0.3-0.7-0.7-0.7h-1.3c-0.4,0-0.7,0.3-0.7,0.7V36c0,0.4,0.3,0.7,0.7,0.7h8.1
                                    c0.4,0,0.7-0.3,0.7-0.7v-1.3C19.2,34.2,18.9,33.9,18.5,33.9z"/>
                            <circle style="fill:none;" cx="23.2" cy="23.2" r="23.2"/>
                        </svg>
                    </v-btn>
                </div>
            </v-col>
        </v-row>
        <slot></slot>
        <v-container fluid class="my-2 check-bar" v-if="layer != layers">
            <v-row no-gutters>
                <v-col cols="2" class="content-attempts" :class="{'visibility-hidden' : controller[layer].tipo === 'info'}">
                    <div class="d-flex justify-center align-center flex-row">
                        <div v-for="item in controller[layer].intentos" :key="'intento-' + item" class="circulo-intento border-button attempt-off" :class="{'bg-head attempt-on' : item <= controller[layer].auxIntentos}" style="margin: 0px 6px"></div>
                    </div>
                    <h1 class="mt-2 font1 color-head" style="font-size:25px;">{{(controller[layer].auxIntentos > 1 ? $data[language].intentosPlural : $data[language].intentosSingular)}}</h1>
                </v-col>
                <v-col cols="8">
                    <div class="d-flex justify-center align-center flex-row">

                        <div v-if="controller[layer].tipo !== 'info'" class="d-inline-flex align-center contenedor-solucion-repetir">
                            <div class="d-flex align-center btn-solucion">
                                <v-btn depressed class="btn-game-act" @click="$emit('call-solucion')" :class="[(controller[layer].showSolucion ? 'bg-button' : 'bg-white'), {'btn-game-act-selected' : controller[layer].showSolucion}]" :disabled="!controller[layer].canShowSolucion">
                                    <div class="d-flex justify-center align-center flex-row">
                                        <svg width="24" height="28" viewBox="0 0 27 31">
                                            <path d="M25.59,30.75H1.41a1,1,0,0,1-1-1V3.87a1,1,0,0,1,1-1h3v6H22.58v-6h3a1,1,0,0,1,1,1V29.75A1,1,0,0,1,25.59,30.75Z" :class="[(controller[layer].showSolucion ? 'white-fill' : 'bg-fill')]"/>
                                            <path d="M21.15,16l-9,9L5.85,18.8,7.7,16.94l4.38,4.39,7.18-7.19Z" :class="{'white-fill' : !controller[layer].showSolucion, 'bg-fill' : controller[layer].showSolucion,'disabled-fill' : !controller[layer].canShowSolucion}"/>
                                            <path d="M16.12,2.87a2.62,2.62,0,0,0-5.24,0H7.44v3H19.56v-3Z" :class="[(controller[layer].showSolucion ? 'white-fill' : 'bg-fill')]"/>
                                        </svg>
                                    </div>
                                </v-btn>
                                <div class="connect connect-solucion-repetir bg-head"></div>
                            </div>
                            <v-btn depressed class="btn-game-act bg-white btn-repetir" @click="$emit('call-restart')" :disabled="!controller[layer].canRestart">
                                <div class="d-flex justify-center align-center flex-row">
                                    
                                    <svg v-if="controller[layer].estado === 'comprobado'" width="28" height="28" viewBox="0 0 27.6 29.6">
                                        <path class="repeat-icon bg-fill" d="M0.1,17.4C0.8,23.7,6,28.8,12.3,29.5c7.4,0.8,13.8-4.1,15.2-11c0.3-1.5-0.8-2.8-2.3-2.8h0
                                        c-1.1,0-2.1,0.8-2.3,1.9c-0.9,4.4-4.8,7.6-9.5,7.4c-4.8-0.2-8.7-4.2-8.9-8.9c-0.1-5.1,3.9-9.4,8.9-9.5v1.3c0,0.4,0.5,0.6,0.8,0.4
                                        l5.1-3.6c0.3-0.2,0.3-0.6,0-0.8l-5.1-3.6c-0.3-0.2-0.8,0-0.8,0.4v1.3C5.5,2-0.9,9,0.1,17.4z"/>
                                    </svg>

                                    <svg v-else width="22" height="28" viewBox="0 0 46 59">
                                        <path class="trash-icon bg-fill" d="M45.88,3.36H34.44L31.17.09H14.83L11.56,3.36H.12V9.89H45.88M3.39,52.38a6.53,6.53,0,0,0,6.54,6.53H36.07a6.53,6.53,0,0,0,6.54-6.53V13.16H3.39Z"/>
                                    </svg>

                                </div>
                            </v-btn>
                        </div>
                        <div v-if="controller[layer].tipo !== 'info'" class="connect bg-head"></div>
                        <div v-if="controller[layer].tipo !== 'info'" class="d-flex justify-center align-center flex-column">
                            
                            <v-btn v-if="controller[layer].estado === 'inicio'" depressed class="btn-game-check bg-shadow bg-button mx-0" @click="$emit('change-estado')" :disabled="disabledButton">
                                <div class="w-100 content-btn-check btn-check-1">
                                    <svg class="check-icon ml-1"   viewBox="0 0 61.1 48" style="enable-background:new 0 0 61.1 48;">
                                        <g>
                                            <path style="fill:#FFFFFF;" d="M25.6,46c-1.3,0-2.6-0.5-3.5-1.5L2.4,24.8c-1.9-1.9-1.9-5.1,0-7.1c1.9-1.9,5.1-1.9,7.1,0l15.9,15.9L51.4,3.7
                                                c1.8-2.1,5-2.3,7-0.5c2.1,1.8,2.3,5,0.5,7L29.3,44.2c-0.9,1-2.2,1.7-3.6,1.7C25.7,46,25.6,46,25.6,46z"/>
                                        </g>
                                    </svg>
                                    <h2 class="font1 mr-1" style="font-size: 28px; color:white;" >{{$data[language].botonComprobar}}</h2>
                                </div>
                            </v-btn>

                            <v-btn v-if="controller[layer].estado === 'comprobado' && controller[layer].correct" depressed class="btn-game-true mx-0" style="pointer-events: none">
                                <div class="w-100 content-btn-check btn-check-2">
                                    <svg class="check-icon" viewBox="0 0 61.1 48" style="enable-background:new 0 0 61.1 48;">
                                        <g>
                                            <path class="check-green" d="M25.6,46c-1.3,0-2.6-0.5-3.5-1.5L2.4,24.8c-1.9-1.9-1.9-5.1,0-7.1c1.9-1.9,5.1-1.9,7.1,0l15.9,15.9l26-29.9
                                                c1.8-2.1,5-2.3,7-0.5c2.1,1.8,2.3,5,0.5,7l-29.6,34C28.4,45.2,27.1,45.9,25.6,46C25.7,46,25.6,46,25.6,46z"/>
                                        </g>
                                    </svg>
                                    <h2 class="font1 mr-4" style="font-size: 28px; color:#13e288;">{{$data[language].botonCorrecto}}</h2>
                                </div>
                            </v-btn>
                            <v-btn v-if="controller[layer].estado === 'comprobado' && !controller[layer].correct" depressed class="btn-game-false mx-0" style="pointer-events: none">
                                <div class="w-100 content-btn-check btn-check-3">
                                    <svg class="check-bad-icon" viewBox="0 0 52.6 52.6" style="enable-background:new 0 0 52.6 52.6;">
                                        <path class="check-red" d="M33.2,26.3L45.6,12c1.9-2.2,1.7-5.4-0.5-7.3C43,2.8,39.7,3,37.8,5.2L26.3,18.4L14.8,5.2C12.9,3,9.6,2.8,7.5,4.7
                                            S5.1,9.9,7,12l12.4,14.3L7,40.6c-1.9,2.2-1.7,5.4,0.5,7.3c1,0.9,2.2,1.3,3.4,1.3c1.5,0,2.9-0.6,3.9-1.8l11.5-13.2l11.5,13.2
                                            c1,1.2,2.5,1.8,3.9,1.8c1.2,0,2.4-0.4,3.4-1.3c2.2-1.9,2.4-5.2,0.5-7.3L33.2,26.3z"/>
                                    </svg>
                                    <h2 class="font1 mr-1" style="font-size: 28px; color:#ff3a70;">{{$data[language].botonIncorrecto}}</h2>
                                </div>
                            </v-btn>

                        </div>
                        <div v-if="controller[layer].tipo !== 'info'" class="connect bg-head" :class="{'visibility-hidden' : allLayers === 1}"></div>

                        <div class="d-inline-flex align-center" :style="(controller[layer].tipo !== 'info' ? 'width: 46px;' : '')">
                            <v-btn v-if="layer != 0" depressed class="btn-game-act bg-white" @click="prevLayer()">
                                <div class="d-flex justify-center align-center flex-row">
                                    <svg viewBox="0 0 31.62 32.37" width="28" height="24">
                                        <path class="arrow-icon bg-fill" d="M1.9,17.3l10.4,10.4c0.3,0.3,0.7,0.5,1.1,0.5c0.4,0,0.8-0.2,1.1-0.5l0.9-0.9c0.6-0.6,0.6-1.6,0-2.2l-6-6.1h19.2 c0.9,0,1.5-0.7,1.5-1.5c0,0,0,0,0,0v-1.3c0-0.9-0.7-1.6-1.5-1.6H9.3l6.1-6.1c0.3-0.3,0.5-0.7,0.4-1.1c0-0.4-0.2-0.8-0.4-1.1 l-0.9-0.9c-0.3-0.3-0.7-0.5-1.1-0.5c-0.4,0-0.8,0.2-1.1,0.5L1.9,15.1c-0.3,0.3-0.5,0.7-0.5,1.1C1.4,16.6,1.6,17,1.9,17.3"/>
                                    </svg>
                                </div>
                            </v-btn>
                            <div v-if="layer != 0 && layer != allLayers - 1" class="connect bg-head connect-left-right"></div>
                            <v-btn v-if="layer != allLayers - 1" depressed class="btn-game-act bg-white" @click="nextLayer()" :disabled="controller[layer + 1].disabled">
                                <div class="d-flex justify-center align-center flex-row">
                                    <svg viewBox="0 0 31.62 32.37" width="28" height="24">
                                        <path class="arrow-icon bg-fill" d="M29.68,15.07,19.33,4.72a1.57,1.57,0,0,0-1.11-.45,1.58,1.58,0,0,0-1.11.45l-.94.94a1.61,1.61,0,0,0,0,2.23l6,6.05H3a1.54,1.54,0,0,0-1.55,1.55v1.32A1.59,1.59,0,0,0,3,18.42H22.28l-6.11,6.09a1.54,1.54,0,0,0-.45,1.1,1.56,1.56,0,0,0,.45,1.1l.94.94a1.58,1.58,0,0,0,1.11.45,1.53,1.53,0,0,0,1.11-.46L29.68,17.3a1.57,1.57,0,0,0,.46-1.12,1.55,1.55,0,0,0-.46-1.11"/>
                                    </svg>
                                </div>
                            </v-btn>
                        </div>

                    </div>
                    
                    <div v-if="layers > 1" class="justify-space-between px-2 mt-4">
                        <v-item-group v-model="getLayer" class="text-center" mandatory>
                            <v-item v-for="item in layers" :key="'bullet-' + item" v-slot="{ active, toggle }" active-class="active-record">
                                <v-btn :input-value="active" icon @click="toggle" depressed :disabled="liberarLayers === false && controller[item - 1].disabled">
                                    <span style="font-size: 70px; line-height: 20px; margin-top: 4px;">•</span>
                                </v-btn>
                            </v-item>
                        </v-item-group>
                    </div>
                </v-col>
                <v-col cols="2"></v-col>
            </v-row>
        </v-container>

        <button style="z-index: -5; position: absolute; top: 0; left: 0;" id="focus-button">focus</button>

    </v-container>
    `,
    data(){
        return {
            habilitarSonido: true
        }
    },
    computed: {
        getLayer: {
            get(){
                return this.layer
            },
            set(val){
                this.$emit('change-layer', val)
            }
        },
        allLayers(){
            return (this.mostrarPantallaFinal ? this.layers + 1 : this.layers)
        },
        checkDisabledNextLayer(){
            if(this.liberarLayers === true && this.mostrarPantallaFinal === true){
                if(this.layer == this.allLayers - 2){
                    let somethingBad = false
                    for(let i = 0; i < this.controller.length; i++){
                        let ly = this.controller[i]
                        if(ly.tipo == 'actividad' && (ly.estado == 'inicio' || (!ly.correct && ly.lifes > 0))){
                            somethingBad = true
                            break
                        }
                    }
                    return somethingBad
                }else{
                    return false
                }
            }else{
                return this.controller[this.layer + 1].disabled
            }
        }
    },
    methods: {
        prevLayer(){
            if(this.layer !== 0){
                this.$emit('change-layer', this.layer - 1)
            }
        },
        nextLayer(){
            if(this.layer !== this.layers){
                this.$emit('change-layer', this.layer + 1)
            }
        },
        changeSound(val){
            if(this.habilitarSonido){
                createjs.Sound.volume = 0
            }else{
                createjs.Sound.volume = 1
            }
            this.habilitarSonido = val
        },
        goFullScreen(){
            parent.postMessage("fullscreen", "*")
            createjs.Sound.play('clic')
        }
    }
}