export default class FiltroHandler {
    selectedIndex = 0;
    listaOpciones = [];

    constructor(listaOpciones){
        this.listaOpciones = listaOpciones;
    };

    setListaOpciones(nuevaLista){
        this.listaOpciones = nuevaLista;
    }

    setSelectedIndex(indice){
        this.selectedIndex = indice;
    }

    cambiarAopcionSig(){
        if(this.selectedIndex >= this.listaOpciones.length - 1){
            this.selectedIndex = 0;
        } else{
            this.selectedIndex++;
        }
    }

    cambiarAopcionAnt(){
        if(this.selectedIndex <= 0){
            this.selectedIndex = this.listaOpciones.length - 1;
        } else{
            this.selectedIndex--;
        }
    }

    getSelectedIndex(){
        return this.selectedIndex;
    }

    getOpcionSeleccionada(){
        return this.listaOpciones[this.selectedIndex];
    }
}