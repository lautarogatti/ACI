import CentroCultural from "./classes/CentroCultural.js";
import {adrogue,temperley,banfield,avellaneda} from "./scripts/localidades.js"
import zonaSur from "./scripts/zonas.js"
const laMadriguera = new CentroCultural(1, "la madriguera", "sta maría de oro 8", temperley, zonaSur, "https://maps.app.goo.gl/tisBRXgxarxK51BS7");
const barMutar = new CentroCultural(2, "bar mutar", "982 1er piso, av. bartolomé mitre", avellaneda, zonaSur, "https://maps.app.goo.gl/5tAEWnQJwoxMvH5x9");
const artesResistir = new CentroCultural (3, "artes resistir", "vieytes 307", banfield, zonaSur, "https://maps.app.goo.gl/h5hAAVHmG2YxueJ86");
const elPasaje = new CentroCultural(4, "el pasaje", "pasaje estrada 435", adrogue, zonaSur, "https://maps.app.goo.gl/Smt792mTRG19c6adA");
export {laMadriguera, barMutar, artesResistir, elPasaje};