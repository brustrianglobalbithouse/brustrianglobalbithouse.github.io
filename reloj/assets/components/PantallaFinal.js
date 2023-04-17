var PantallaFinal = {
    props: ['controller', 'tipo'],
    mixins: [TextosGlobales],
    template: `
    <v-window-item eager>
        <div class="d-flex flex-column align-center justify-center" :style="(tipo == 'primaria-baja' ? 'height: 90vh' : 'height: 650px')">
            <div class="d-flex flex-column align-center justify-center final-box border-button">
                <h1 class="font1 color-head mb-3">{{tituloLogros}}</h1>
                <div class="d-flex" :class="{'mb-8' : ind < lcontroller.length - 1, 'mb-5' : ind == lcontroller.length - 1 && tipo == 'primaria-baja'}" style="width: 100%" v-for="(ly, ind) in lcontroller" :key="'rs_' + ind">
                    <div class="d-flex align-center justify-center mr-4" style="height: 63px;">
                        <svg v-for="item in checkLifes3(ly)" :key="'start-' + item" viewBox="0 0 41.94 39.94" width="52" height="48" style="margin: 0px 6px">
                            <polygon :class="(item <= ly.lifes ? 'bg-fill' : 'star-icon-disabled')" points="27.46 13.16 41.94 15.32 31.41 25.5 33.83 39.94 20.89 33.07 7.91 39.83 10.44 25.41 0 15.15 14.5 13.1 21.03 0 27.46 13.16"/>
                        </svg>
                        <svg v-for="item in checkLifes2(ly)" :key="'start-' + item" viewBox="0 0 65 63" width="65" height="63" style="margin: 0px 2px">
                            <polygon :class="(item <= ly.lifes ? 'bg-fill' : 'star-icon-disabled')" points="32.5 0.15 38.74 20.18 58.28 12.57 46.52 29.93 64.65 40.47 43.74 42.1 46.81 62.85 32.5 47.51 18.19 62.85 21.26 42.1 0.35 40.47 18.48 29.93 6.71 12.57 26.26 20.18 32.5 0.15"/>
                        </svg>
                        <svg v-for="item in checkLifes1(ly)" :key="'start-' + item" viewBox="0 0 84 83" width="84" height="83">
                            <polygon :class="(item <= ly.lifes ? 'bg-fill' : 'star-icon-disabled')" points="42 0.37 47.16 24.79 64.69 7.04 55.83 30.37 80.19 24.91 60.11 39.75 83.55 48.32 58.65 49.95 73.72 69.84 51.89 57.74 53.83 82.63 42 60.65 30.17 82.63 32.11 57.74 10.28 69.84 25.36 49.95 0.45 48.32 23.89 39.75 3.81 24.91 28.17 30.37 19.3 7.04 36.84 24.79 42 0.37"/>
                        </svg>
                    </div>
                    <div class="line-fill border-button flex-grow-1"></div>
                    <h2 class="font1 color-head ml-5">{{localStars(ly)}}</h2>
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

                <svg viewBox="0 0 30.92 48" width="30.92" height="48" class="right-final-box">
                    <polygon class="bg-stroke" points="6.29 52.1 6.29 46.78 28.43 24.97 6.29 1.08 6.29 -3.9 -8.23 -3.9 -8.23 52.1 6.29 52.1"/>
                </svg>

                <div class="d-flex flex-column align-center justify-center float-final-box">
                    <p class="font1 color-head fb1">{{totalStars}}</p>
                    <p class="font1 color-head fb2">{{points}}</p>
                </div>
            </div>
        </div>

        <div v-if="tipo == 'primaria-alta'" class="d-flex align-center justify-center" style="position: absolute; width: 100%; bottom: -100px">
            <div class="d-flex flex-column align-center justify-center final-box-2 border-button">
                <h1 class="font1 color-head">{{result}}</h1>
                <div class="d-flex align-end justify-center total-box bg-head">
                    <p class="font1 fb1 mr-3">{{totalPunteo}}</p>
                    <p class="font1 fb2 mr-3">/</p>
                    <p class="font1 fb3">100</p>
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

    </v-window-item>
    `,
    computed: {
        lcontroller(){
            return this.controller.filter(el => el.tipo === 'actividad')
        },
        totalStars(){
            return this.controller.reduce((total, el) => {
                if(el.tipo === 'actividad'){
                    if(el.lifes == el.auxLifes && el.lifes != 0){
                        return total + 100
                    }else if(el.lifes == el.auxLifes - 1 && el.lifes != 0){
                        return total + 50
                    }else if(el.lifes == el.auxLifes - 2 && el.lifes != 0){
                        return total + 25
                    }else{
                        return total
                    }
                }else{
                    return total
                }
            }, 0)
        },
        totalPunteo(){
            let totalActs = this.controller.reduce((val, el) => {
                if(el.tipo === 'actividad'){
                    return val + 1
                }else{
                    return val
                }
            }, 0)
            let layerVal = 100 / totalActs
            return Math.trunc(this.controller.reduce((total, el) => {
                if(el.tipo === 'actividad'){
                    if(el.lifes == el.auxLifes && el.lifes != 0){
                        return total + layerVal
                    }else if(el.lifes == el.auxLifes - 1 && el.lifes != 0){
                        return total + layerVal * 0.5
                    }else if(el.lifes == el.auxLifes - 2 && el.lifes != 0){
                        return total + layerVal * 0.25
                    }else{
                        return total
                    }
                }else{
                    return total
                }
            }, 0))
        }
    },
    methods: {
        checkLifes3(val){
            return val.auxLifes === 3 ? 3 : []
        },
        checkLifes2(val){
            return val.auxLifes === 2 ? 2 : []
        },
        checkLifes1(val){
            return val.auxLifes === 1 ? 1 : []
        },
        localStars(ly){
            //CALCULAR PUNTOS
            if(ly.lifes == ly.auxLifes && ly.lifes != 0){
                return 100
            }else if(ly.lifes == ly.auxLifes - 1 && ly.lifes != 0){
                return 50
            }else if(ly.lifes == ly.auxLifes - 2 && ly.lifes != 0){
                return 25
            }else{
                return 0
            }
        }
    }
}