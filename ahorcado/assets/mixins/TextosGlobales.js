var TextosGlobales = {
    data(){
        return {
            //TEXTOS REQUERIDOS
            titulo: 'Adivinapalabras',
            
            mensajeFinal_0: 'Inténtalo de nuevo,<br>¡seguro que puedes hacerlo mejor!', /* Menos de 30% */
            mensajeFinal_30: '¡Lo ha hecho muy bien! Pero puede hacerlo mejor.<br>¿Quieres repetirlo?', /* 30% - 49% */
            mensajeFinal_50: '¡Lo ha hecho muy bien! Pero puede hacerlo mejor.<br>¿Quieres repetirlo?', /* 50% - 79% */
            mensajeFinal_80: '¡Lo ha hecho muy bien! Pero puede hacerlo mejor.<br>¿Quieres repetirlo?', /* 80% - 99% */
            mensajeFinal_100: 'Has obtenido la puntuación máxima.<br>¡Enhorabuena!', /* 100% */
            mensajeAdvertencia: 'No has adivinado la palabra, si continuas<br>no ganarás ninguna estrella en este reto,<br>¿quieres continuar?',
            mensajeAdvertenciaPista: 'Te vas a queda sin estrellas,<br>¿estás seguro que quieres continuar?',

            alfabeto: 'A-B-C-D-E-F-G-H-I-J-K-L-M-N-Ñ-O-P-Q-R-S-T-U-V-W-X-Y-Z', /* debe separarse cada letra con el carácter definido en config.js. Por defecto se utiliza el guión "-" */
            penalizacionPorPista: 2, /* número de estrellas a restar si se utiliza el botón de Pista */

            palabra1: {
                termino: 'G-A-L-L-I-N-A', /* debe separarse cada letra con el carácter definido en config.js. Por defecto se utiliza el guión "-" */
                enunciado: 'Toca las letras y averigua la palabra escondida, este enunciado tendrá el espacio para 3 líneas.',
                pista: 2 /* false | número de pistas disponibles */
            },
            palabra2: {
                termino: 'T-R-E-N', /* debe separarse cada letra con el carácter definido en config.js. Por defecto se utiliza el guión "-" */
                enunciado: 'Toca las letras y averigua la palabra escondida, este enunciado tendrá el espacio para 3 líneas.',
                pista: 1 /* false | número de pistas disponibles */
            },
            palabra3: {
                termino: 'C-E-B-R-A', /* debe separarse cada letra con el carácter definido en config.js. Por defecto se utiliza el guión "-" */
                enunciado: 'Toca las letras y averigua la palabra escondida.',
                pista: 2 /* false | número de pistas disponibles */
            },
            palabra4: {
                termino: 'P-L-U-M-A', /* debe separarse cada letra con el carácter definido en config.js. Por defecto se utiliza el guión "-" */
                enunciado: 'Toca las letras y averigua la palabra escondida.',
                pista: 3 /* false | número de pistas disponibles */
            },
            palabra5: {
                termino: 'L-I-B-R-O', /* debe separarse cada letra con el carácter definido en config.js. Por defecto se utiliza el guión "-" */
                enunciado: 'Toca las letras y averigua la palabra escondida.',
                pista: false /* false | número de pistas disponibles */
            },
            palabra6: {
                termino: 'B-U-F-A-N-D-A', /* debe separarse cada letra con el carácter definido en config.js. Por defecto se utiliza el guión "-" */
                enunciado: 'Toca las letras y averigua la palabra escondida.',
                pista: false /* false | número de pistas disponibles */
            },
            palabra7: {
                termino: 'A-J-E-D-R-E-Z', /* debe separarse cada letra con el carácter definido en config.js. Por defecto se utiliza el guión "-" */
                enunciado: 'Toca las letras y averigua la palabra escondida.',
                pista: false /* false | número de pistas disponibles */
            },
            palabra8: {
                termino: 'B-U-Z-O', /* debe separarse cada letra con el carácter definido en config.js. Por defecto se utiliza el guión "-" */
                enunciado: 'Toca las letras y averigua la palabra escondida.',
                pista: 1 /* false | número de pistas disponibles */
            },
            palabra9: {
                termino: 'G-U-I-Ñ-O-L', /* debe separarse cada letra con el carácter definido en config.js. Por defecto se utiliza el guión "-" */
                enunciado: 'Toca las letras y averigua la palabra escondida.',
                pista: 2 /* false | número de pistas disponibles */
            },
            palabra10: {
                termino: 'E-S-Q-U-I-M-A-L', /* debe separarse cada letra con el carácter definido en config.js. Por defecto se utiliza el guión "-" */
                enunciado: 'Toca las letras y averigua la palabra escondida.',
                pista: 3 /* false | número de pistas disponibles */
            }
        }
    }
}