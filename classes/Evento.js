export default class Evento{
    constructor(id, nombre, centroCultural, fechaHora, descripcion, img, tipoEvento, estado){
        this.id = id;
        this.nombre = nombre;
        this.centroCultural = centroCultural;
        this.fechaHora = fechaHora;
        this.descripcion = descripcion;
        this.img = img;
        this.tipoEvento = tipoEvento;
        this.estado = estado;
    }
}