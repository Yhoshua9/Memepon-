const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const sectionReiniciar = document.getElementById("reiniciar")
const botonMascotaJugador= document.getElementById("boton-mascota")
const  botonReiniciar = document.getElementById("boton-reiniciar")

const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")
const spanMascotaJugador = document.getElementById("mascota-jugador")

const spanMascotaEnemigo = document.getElementById("mascota-enemigo")

const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")

const sectionMensajes = document.getElementById("resultado")
const ataquesDelJugador = document.getElementById("ataques-del-jugador")
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo")
const contenedorTarjetas = document.getElementById("contenedor-tarjertas")
const contenedorAtaques = document.getElementById("contenedorAtaques")

const sectionVermapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigos = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let inputTilin 
let inputPepe 
let inputSech 
let inputFlanos
let inputProbablemente 
let inputMesi 
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego 
let botonAgua 
let botonTierra 
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = "./assets/barrio.png"
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 500

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}
alturaQueBuscamos = anchoDelMapa * 600/800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, id = null) {
        this.id = id
        this.nombre=nombre
        this.foto=foto
        this.vida=vida
        this.ataques = []
        this.ancho = 60
        this.alto= 60
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0,mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let pepe = new Mokepon("Pepe", "./assets/pepe.png", 3, "./fondoPantalla/elpepe.png")
let tilin = new Mokepon("Tilin", "./assets/tilin.png", 3, "./fondoPantalla/eso.png")
let sech = new Mokepon("Sech", "./assets/sech.png", 3, "./fondoPantalla/ete.png")
let flanos = new Mokepon("Flanos", "./assets/flanos.png", 3, "./fondoPantalla/flan.png")
let probablemente = new Mokepon("Probablemente", "./assets/probablemente.png", 3, "./fondoPantalla/si.png")
let mesi = new Mokepon("Mesi", "./assets/mesi.png", 3, "./fondoPantalla/me.png")

const PEPE_ATAQUES = [
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🌱", id: "boton-tierra" },
]
pepe.ataques.push(...PEPE_ATAQUES)

const TILIN_ATAQUES = [
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🔥", id: "boton-fuego" },
]
tilin.ataques.push(...TILIN_ATAQUES)

const SECH_ATAQUES = [
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🌱", id: "boton-tierra" },
]
sech.ataques.push(...SECH_ATAQUES)

const FLANOS_ATAQUES = [
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🌱", id: "boton-tierra" },
]
flanos.ataques.push(...FLANOS_ATAQUES)

const PROBABLEMENTE_ATAQUES = [
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🌱", id: "boton-tierra" },
]
probablemente.ataques.push(...PROBABLEMENTE_ATAQUES)

const MESI_ATAQUES = [
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🌱", id: "boton-tierra" },
]
mesi.ataques.push(...MESI_ATAQUES)

mokepones.push (pepe, tilin, sech, flanos, probablemente, mesi)

function iniciarjuego() {
    
    sectionSeleccionarAtaque.style.display = "none"
    sectionVermapa.style.display = "none"
    
    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
    contenedorTarjetas.innerHTML += opcionDeMokepones
    
     inputTilin = document.getElementById("Tilin")
     inputPepe = document.getElementById("Pepe")
     inputSech = document.getElementById("Sech")
     inputFlanos = document.getElementById("Flanos")
     inputProbablemente = document.getElementById("Probablemente")
     inputMesi = document.getElementById("Mesi")
    })

    botonMascotaJugador.addEventListener("click" , seleccionarMascotaJugador)

    botonReiniciar.addEventListener("click", reiniciarJuego)

    unirseAlJuego()
}

function unirseAlJuego() {
    fetch("http://192.168.1.75:8080/unirse")
        .then(function(res) {
            if (res.ok) {
                res.text()
                .then (function(respuesta) {
                    console.log(respuesta)
                    jugadorId = respuesta
                }) 
            }
        })
}

function seleccionarMascotaJugador() {
    if (inputTilin.checked) {
        spanMascotaJugador.innerHTML = inputTilin.id
        mascotaJugador = inputTilin.id
    } else if (inputPepe.checked) {
        spanMascotaJugador.innerHTML = inputPepe.id
        mascotaJugador =inputPepe.id
    } else if (inputSech.checked) {
        spanMascotaJugador.innerHTML = inputSech.id
        mascotaJugador = inputSech.id
    } else if (inputFlanos.checked) {
        spanMascotaJugador.innerHTML = inputFlanos.id
        mascotaJugador = inputFlanos.id
    }else if (inputProbablemente.checked) {
        spanMascotaJugador.innerHTML = inputProbablemente.id
        mascotaJugador = inputProbablemente.id
    }else if (inputMesi.checked) {
        spanMascotaJugador.innerHTML = inputMesi.id
        mascotaJugador = inputMesi.id
    }else {
        alert("seleccione una mascota")
        return
    }
    sectionSeleccionarMascota.style.display = "none"

    seleccionarMokepon(mascotaJugador)

    extraerAtaques(mascotaJugador)
    sectionVermapa.style.display = "flex"
    iniciarMapa()
}

function seleccionarMokepon(mascotaJugador) {
    fetch(`http://192.168.1.75:8080/mokepon/${jugadorId}`, {
        method:"post",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
        
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML +=ataquesMokepon
    })
     botonFuego = document.getElementById("boton-fuego")
     botonAgua = document.getElementById("boton-agua")
     botonTierra = document.getElementById("boton-tierra")
     botones = document.querySelectorAll(".BAtaque")

}

function secuenciaAtaques() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === "🔥") {
                ataqueJugador.push("FUEGO")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            } else if (e.target.textContent === "💧") {
                ataqueJugador.push("AGUA")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            } else {
                ataqueJugador.push("TIERRA")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true 
            }
            if (ataqueJugador.length === 5) {
                enviarAtaques()
            }
        })
    })
}

function enviarAtaques() {
    fetch(`http://192.168.1.75:8080/mokepon/${jugadorId}/ataques`, {
        method:"post",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify ({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
    fetch(`http://192.168.1.75:8080/mokepon/${enemigoId}/ataques`)
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function ({ ataques }) {
                        if (ataques.length === 5) {
                            ataqueEnemigo = ataques 
                            combate()
                        }
                    })
            }
        })
}

function seleccionarMascotaEnemigo(enemigo) {
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaques()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1)

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push("FUEGO")
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push("AGUA")
    } else {
        ataqueEnemigo.push("TIERRA")
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
    
}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate ()
    }
}

function indexAmbosOponente(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
    clearInterval(intervalo)
    
    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponente(index, index)
            crearMensaje("EMPATE")
        } else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA') {
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] ==='AGUA' && ataqueEnemigo[index] === 'FUEGO') {
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA') {
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponente(index, index)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }
    revisarVidas()
}

function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("Esto fue un empate")
    }else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("FELICITACIONES! Ganaste")
    } else {
        crearMensajeFinal("PERDISTE 😭💀")
    }
}

function crearMensaje(resultado) { 
    let nuevoAtaqueDelJugador = document.createElement("p")
    let nuevoAtaqueDelEnemigo = document.createElement("p")

    sectionMensajes.innerHTML= resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) { 
    sectionMensajes.innerHTML = resultadoFinal
    sectionReiniciar.style.display = "block"
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max){
    return Math.floor(Math.random() * (max-min+1) + min)
}

function pintarCanvas() {

    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect (0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()

    enviarPosicion (mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

    mokeponesEnemigos.forEach(function (mokepon) {
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })
}

function enviarPosicion(x, y) {
    fetch(`http://192.168.1.75:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify ({
            x,
            y
        })
        
    })
     .then (function(res) {
         if (res.ok) {
            res.json()
                .then(function ({enemigos}) {
                    console.log(enemigos)
                    mokeponesEnemigos = enemigos.map(function (enemigo){
                        let mokeponEnemigo = null
                        const mokeponNombre = enemigo.mokepon.nombre || ""
                        if (mokeponNombre === "Pepe") {
                            mokeponEnemigo = new Mokepon("Pepe", "./assets/pepe.png", 3, "./fondoPantalla/elpepe.png", enemigo.id)
                        } else if (mokeponNombre === "Tilin") {
                            mokeponEnemigo = new Mokepon("Tilin", "./assets/tilin.png", 3, "./fondoPantalla/eso.png", enemigo.id)
                        } else if (mokeponNombre === "Sech") {
                            mokeponEnemigo = new Mokepon("Sech", "./assets/sech.png", 3, "./fondoPantalla/ete.png", enemigo.id)
                        } else if (mokeponNombre === "Flanos") {
                            mokeponEnemigo = new Mokepon("Flanos", "./assets/flanos.png", 3, "./fondoPantalla/flan.png", enemigo.id)
                        } else if (mokeponNombre === "Probablemente") {
                            mokeponEnemigo = new Mokepon("Probablemente", "./assets/probablemente.png", 3, "./fondoPantalla/si.png", enemigo.id)
                        } else if (mokeponNombre === "Mesi") {
                            mokeponEnemigo = new Mokepon("Mesi", "./assets/mesi.png", 3, "./fondoPantalla/me.png", enemigo.id)
                        }
                        mokeponEnemigo.x = enemigo.x
                        mokeponEnemigo.y = enemigo.y

                        return mokeponEnemigo
                    })
                })
         }
     })
}

function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5
}
function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5
}
function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}
function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}
function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0

}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case "w":
            moverArriba()
            break
        case "s":
            moverAbajo()
            break
        case "a": 
            moverIzquierda()
            break
        case "d":
            moverDerecha()
            break
        default:
            break
    }
}
function iniciarMapa() {
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener("keydown", sePresionoUnaTecla)

    window.addEventListener("keyup", detenerMovimiento)
}

function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador === mokepones[i].nombre) {
            return mokepones [i]
        }
        
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x

    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo

    ) {
        return;
    }
    detenerMovimiento()
    clearInterval(intervalo)
    console.log ("se detecto una colision");

    enemigoId = enemigo.id
    sectionSeleccionarAtaque.style.display = "flex"
    sectionVermapa.style.display = "none"
    seleccionarMascotaEnemigo(enemigo)
    //alert("Hay colision con " + enemigo.nombre)
}

window.addEventListener("load", iniciarjuego)
