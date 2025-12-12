//imports
import eventos from "./scripts/eventos.js";
import {tEexpoArte, tEferia, tEfiesta, tEgastro, tEludico, tEmusica, tEtaller, tEteatro} from "./scripts/tiposDeEventos.js";
import {adrogue,temperley,banfield,avellaneda} from "./scripts/localidades.js"
import FiltroHandler from "./classes/FiltroHandler.js";
//elementos del dom
const fechasContainer = document.getElementById("fechasContainer");
const lblFiltroEventos = document.getElementById("lblFiltroEventos");
const btnIzqFiltroEventos = document.getElementById("btnIzqFiltroEventos");
const btnDerFiltroEventos = document.getElementById("btnDerFiltroEventos");
const lblFiltroLugares = document.getElementById("lblFiltroLugares");
const btnIzqFiltroLugares = document.getElementById("btnIzqFiltroLugares");
const btnDerFiltroLugares = document.getElementById("btnDerFiltroLugares");
const contenedorTf = document.getElementById("contenedorTf");
const contenedorSectionTitle = document.getElementById("sectionTitle");
const contenedorSectionFiltros = document.getElementById("sectionFiltros");
const contenedorMl = document.getElementById("contenedorMl");
const contenedorMain =document.getElementById("mainContainer");
const contenedorMes = document.getElementById("contenedorMes");
const envolturaMl = document.getElementById("envolturaMl");
const envolturaMain = document.getElementById("envolturaMain");
//constantes
//fechas del mes
let fechas = [];
//opciones pertenecientes al filtro tipo de evento
const opcFiltroEventos = ["eventos", tEmusica.nombre, tEteatro.nombre, tEfiesta.nombre, tEferia.nombre, tEludico.nombre, tEgastro.nombre, tEexpoArte.nombre, tEtaller.nombre];
//opciones pertenecientes al filtro lugar
const opcFiltroLugares = ["zona sur", adrogue.nombre, temperley.nombre, banfield.nombre, avellaneda.nombre];
//handler filtro tipo eventos
const filtroEventos = new FiltroHandler(opcFiltroEventos);
//handler filtro lugares
const filtroLugares = new FiltroHandler(opcFiltroLugares);
//lista de eventos filtrada en base a las opciones elegidas en los filtros
let listaEventosFiltrada = [];

let estadoActivo = "";

const listaContenedores = [envolturaMain, contenedorTf, contenedorSectionTitle, contenedorSectionFiltros, contenedorMl, contenedorMes, fechasContainer];

//eventos
//boton izq filtro tipo de evento
btnIzqFiltroEventos.addEventListener("click", () =>{
    filtroEventos.cambiarAopcionAnt();
    lblFiltroEventos.innerText = filtroEventos.getOpcionSeleccionada();
    listaEventosFiltrada = filtrarListaEventos(eventos);
    fechas = generarListaDeFechas(listaEventosFiltrada);
    mostrarEventos(listaEventosFiltrada, fechas);
});
//boton der filtro tipo de evento
btnDerFiltroEventos.addEventListener("click", () =>{
    filtroEventos.cambiarAopcionSig();
    lblFiltroEventos.innerText = filtroEventos.getOpcionSeleccionada();
    listaEventosFiltrada = filtrarListaEventos(eventos);
    fechas = generarListaDeFechas(listaEventosFiltrada);
    mostrarEventos(listaEventosFiltrada, fechas);
});
//boton izq filtro lugar
btnIzqFiltroLugares.addEventListener("click", () =>{
    filtroLugares.cambiarAopcionAnt();
    lblFiltroLugares.innerText = "en " + filtroLugares.getOpcionSeleccionada();
    listaEventosFiltrada = filtrarListaEventos(eventos);
    fechas = generarListaDeFechas(listaEventosFiltrada);
    mostrarEventos(listaEventosFiltrada, fechas);
});
//boton der filtro lugar
btnDerFiltroLugares.addEventListener("click", () =>{
    filtroLugares.cambiarAopcionSig();
    lblFiltroLugares.innerText = "en " + filtroLugares.getOpcionSeleccionada();
    listaEventosFiltrada = filtrarListaEventos(eventos);
    fechas = generarListaDeFechas(listaEventosFiltrada);
    mostrarEventos(listaEventosFiltrada, fechas);
});

//funciones
//recibe una lista de eventos y  retorna una lista filtrada de eventos que cumplan con los requisitos seleccionados en los dos tipos de filtro disponibles
function filtrarListaEventos(listaEventos){
    let listaFiltrada = [];
    let flagPrimerFiltroVacío = false;
    if(filtroEventos.getSelectedIndex() != 0){
        listaFiltrada = filtrarListaPorTipoDeEvento(listaEventos);
    } else {
        flagPrimerFiltroVacío = true;
    }
    if(filtroLugares.getSelectedIndex() != 0){
        if(flagPrimerFiltroVacío){
            listaFiltrada = filtrarListaPorLugar(listaEventos);
        } else {
            listaFiltrada = filtrarListaPorLugar(listaFiltrada);
        }
    } else {
        if(flagPrimerFiltroVacío){
            listaFiltrada = listaEventos;
        }
    }
    return listaFiltrada; 
}
function generarListaDeFechas(listaEventos){
    return ordenarDeMenorAmayor(obtenerFechas(listaEventos));
}
//recibe una lista de eventos y retorna una lista filtrada de eventos que pertenezcan a el tipo de evento seleccionado en el filtro
function filtrarListaPorTipoDeEvento(lista){
    let listaFiltrada = [];
    lista.forEach(evento => {
        if(evento.tipoEvento.nombre === filtroEventos.getOpcionSeleccionada()){
            listaFiltrada.push(evento);
        }
    });
    return listaFiltrada;
}
//recibe una lista de eventos y retorna una lista filtrada de eventos que pertenezcan a el lugar seleccionado en el filtro
function filtrarListaPorLugar(lista){
    let listaFiltrada = [];
    lista.forEach(evento => {
        if(evento.centroCultural.localidad.nombre === filtroLugares.getOpcionSeleccionada()){
            listaFiltrada.push(evento);
        }
    });
    return listaFiltrada;
}
//recibe una lista de eventos  y retorna una lista contenedora de las fechas en las cuales hay minimo un evento disponible
function obtenerFechas(listaEventos){
    let fechass = [];
    let flagPrimero = true;
    listaEventos.forEach(evento => {
        let fecha = evento.fechaHora.getDate();
        if(flagPrimero){
            fechass.push(fecha);
            flagPrimero = false; 
        } else {
            if(!fechass.includes(fecha)){
                fechass.push(fecha);
            }
        }
    });
    return fechass;
}
//recibe una lista de numeros y retorna una nueva contenedora de los mismos numeros pero ordenados de manera ascendente
function ordenarDeMenorAmayor(listaDeNumeros){
    let listaOrdenadaDeNumeros = [];
    let listaDeNumerosCopia = listaDeNumeros.slice();
    for (let i = 0; i< listaDeNumeros.length; i++) {
        let firstFlag = true;
        let menor = 0;
        listaDeNumerosCopia.forEach(numero => {
            if(firstFlag){
                menor = numero;
                firstFlag = false;
            }else{
                if(numero < menor){
                    menor = numero;
                }
            }
        });
        listaOrdenadaDeNumeros.push(menor);
        listaDeNumerosCopia.splice(listaDeNumerosCopia.indexOf(menor),1)
    }
    return listaOrdenadaDeNumeros;
}

//recibe una lista de eventos y rellena la tabla de eventos con cards contenedoras de la informacion de cada uno
function mostrarEventos(listaEventos, listaFechas){
    //vaciamos contenedor
    fechasContainer.innerHTML = "";
    //checkeamos si la lista de fechas esta vacía
    if(listaFechas.length === 0){
        //checkeamos que el contenedor no disponga de la clase
        if(!fechasContainer.classList.contains("justify-content-center")){
            //si no dispone de la clase, se le es otorgada
            fechasContainer.classList.add("justify-content-center");
        }
        //definida constante contenedora del cartel "no hay eventos"
        const cartelNoHayEventos = document.createElement("div");
        //clases del contenedor "no hay eventos"
        cartelNoHayEventos.classList.add("row", "cartelNoHayEventos" ,"text-center")
        //elementos hijos del contenedor "no hay eventos"
        cartelNoHayEventos.innerHTML = `<p class="chakra-petch-regular fs-3">No se encontraron eventos</p>`
        //añadido contenedor "no hay eventos" al contenedor de las fechas
        fechasContainer.appendChild(cartelNoHayEventos);
    }else{
        if(fechasContainer.classList.contains("justify-content-center")){
            fechasContainer.classList.remove("justify-content-center");
        }
        listaFechas.forEach(fecha => {
            const contenedorFecha = document.createElement("div");
            contenedorFecha.id = "contFech" + fecha;
            contenedorFecha.classList.add("row", "border-2", "border-bottom", "border-white", "fs-3");
            contenedorFecha.innerHTML = `<div class="col-2 text-center text-light bg-black d-flex align-items-center justify-content-center"><p>${fecha}</p></div>`;
            fechasContainer.appendChild(contenedorFecha);
            const contenedorEventos = document.createElement("div");
            contenedorEventos.classList.add("col-10");
            contenedorFecha.appendChild(contenedorEventos);
            listaEventos.forEach(evento => {
                if(evento.fechaHora.getDate() === fecha){
                    const eventito = document.createElement("div");
                    eventito.classList.add("ps-2", "border-2", "border-bottom", "border-black", "pt-2", "pb-2")
                    eventito.innerHTML = `<div class="row">
                                        <p class="chakra-petch-bold fs-6 text seleccionable" id="tituloEvento${evento.id}">${evento.nombre.toUpperCase()}</p>
                                    </div>
                                    <div class="row">
                                        <p class="chakra-petch-regular fs-6 text">${evento.centroCultural.nombre} | ${evento.centroCultural.localidad.nombre}</p>
                                    </div>`
                    
                    contenedorEventos.appendChild(eventito);
                    let tituloEvento = document.getElementById(`tituloEvento${evento.id}`);
                    tituloEvento.addEventListener('click', () => {
                        dibujarDataFecha(evento.id);
                    })
                }
            })
        })
    }
}

function setearModoDesktop(){
    vaciarClassList(listaContenedores);
    envolturaMain.classList.add("container-fluid", "row");
    contenedorTf.classList.add("container-fluid", "col-5", "oneScreen", "border-end", "border-black");
    contenedorSectionTitle.classList.add("row", "sectionTitle");
    contenedorSectionFiltros.classList.add("row", "sectionFiltros", "container-fluid", "d-flex", "row-gap-3", "mb-4", "align-content-center");
    contenedorMl.classList.add("container-fluid", "col-7", "overflow-y-auto", "oneScreen");
    contenedorMes.classList.add("row", "container-fluid", "sticky-top");
    fechasContainer.classList.add("container-fluid", "flex-column", "flex-nowrap", "chakra-petch-regular", "align-items-center");
}

function setearModoMobile() {
    vaciarClassList(listaContenedores);
    envolturaMain.classList.add("container-fluid");
    contenedorTf.classList.add("row", "container-fluid");
    contenedorSectionTitle.classList.add("row", "oneScreen", "sectionTitle");
    contenedorSectionFiltros.classList.add("row", "sectionFiltros", "container-fluid", "d-flex", "row-gap-3", "mb-4", "align-content-center");
    contenedorMl.classList.add("row", "container-fluid");
    contenedorMes.classList.add("row", "container-fluid");
    fechasContainer.classList.add("row", "container-fluid", "vh-56", "overflow-y-auto", "flex-column", "flex-nowrap", "chakra-petch-regular")
}

function vaciarClassList(objetos){
    objetos.forEach(objeto => {
        objeto.className = "";
    });
}

function setearModo(){
    if(window.innerWidth >= 992 && estadoActivo === "mobile"){
        setearModoDesktop();
        estadoActivo = "desktop"
    } else if (window.innerWidth < 992 && estadoActivo === "desktop"){
        setearModoMobile();
        estadoActivo = "mobile"
    }
}
let pantallaDataFecha = document.createElement("div");
function dibujarDataFecha(eventoId){
    let evento = eventos.find(evento => evento.id === eventoId);
    let minutos;
    if(evento.fechaHora.getMinutes() === 0){
        minutos = "00"
    }
    else{
        minutos = evento.fechaHora.getMinutes();
    }
    pantallaDataFecha.innerHTML = "";
    const headerEvento = document.createElement("div");
    headerEvento.classList.add("row", "text-light", "bg-black", "chakra-petch-regular");
    headerEvento.innerHTML = `<div class="container-fluid row" id="barraNavegacion">
                                    <div class="col-6 ps-2" id="contenedorBack">
                                        <img id="btnGetBack" class="rotar180 seleccionable" src="img/whiteArrow.png" alt="imagen flecha señalando hacia la derecha"></div>
                                    <div class="col-6 text-end text-danger pe-3 pt-2" id="contenedorEstado">
                                </div>
                            </div>
                            <div class="text-center chakra-petch-bold fs-4" id="contenedorTitulo"><p>${evento.nombre.toUpperCase()}</p></div>
                            <div class="text-center fs-8" id="contenedorCentroCultural"><p>${evento.centroCultural.nombre} | ${evento.centroCultural.localidad.nombre}</p></div>
                            <div class="container-fluid text-center row">
                                <div class="col-6 fs-7"><p>${evento.centroCultural.direccion}</p></div>
                                <div class="col-6 chakra-petch-bold"><p>${evento.fechaHora.getHours()}:${minutos} hs</p></div>
                            </div>
                            <div class="text-center border-top border-light pt-1 pb-1 seleccionable" id="contenedorMaps"><a class="text-decoration-none text-white" href="${evento.centroCultural.linkDireccion}">como llegar →</a></div>`
    pantallaDataFecha.appendChild(headerEvento);
    const contDescripcion = document.createElement("div");
    contDescripcion.classList.add("row");
    contDescripcion.innerHTML = `<div class="chakra-petch-regular fs-8 ps-5 pe-5 mt-3"><p>${evento.descripcion}</p></div>
                                 <div class="container-fluid d-flex justify-content-center mt-3 mb-3"><img class="flyerEvento" src="${evento.img}" alt="aca va el flyer"></div>
    `
    pantallaDataFecha.appendChild(contDescripcion);
    contenedorMl.classList.add("overflow-y-auto");
    if(estadoActivo === "desktop"){
        contenedorMl.replaceChild(pantallaDataFecha, envolturaMl);
    }
    else{
        contenedorMain.replaceChild(pantallaDataFecha, envolturaMain);
    }
    const contenedorEstado = document.getElementById("contenedorEstado");
    if(evento.estado !== "activo"){
        contenedorEstado.innerHTML = `<p>CANCELADO</P>`;
    }
    const btnGetBack = document.getElementById("btnGetBack");
    btnGetBack.addEventListener('click', () =>{
            if(estadoActivo === "desktop"){
                contenedorMl.replaceChild(envolturaMl, pantallaDataFecha);
            }
            else {
                contenedorMain.replaceChild(envolturaMain, pantallaDataFecha);
                contenedorSectionFiltros.scrollIntoView();
            }
    } )
    headerEvento.scrollIntoView();
}





window.onresize = setearModo;
window.onload = () => {
    if(window.innerWidth >= 992){
        estadoActivo = "desktop"
        setearModoDesktop();
    } else if (window.innerWidth < 992){
        estadoActivo = "mobile"
        setearModoMobile();
    }
}
listaEventosFiltrada = filtrarListaEventos(eventos)
fechas = generarListaDeFechas(eventos);
mostrarEventos(eventos, fechas);