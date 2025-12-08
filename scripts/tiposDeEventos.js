import TipoEvento from "/classes/TipoEvento.js"
const tEmusica = new TipoEvento(1,"música");
const tEteatro = new TipoEvento(2,"teatro");
const tEfiesta = new TipoEvento(3, "fiesta");
const tEferia = new TipoEvento(4, "feria");
const tEludico = new TipoEvento(5, "lúdico");
const tEgastro = new TipoEvento(6, "gastronomía");
const tEexpoArte = new TipoEvento(7, "expo arte");
const tEtaller = new TipoEvento(8, "taller");
export {tEexpoArte, tEferia, tEfiesta, tEgastro, tEludico, tEmusica, tEtaller, tEteatro};