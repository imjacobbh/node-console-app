import { Tarea } from "./tarea.js";

class Tareas {
    _listado = {};

    constructor() {
        this._listado = {};
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach((it) => {
            this._listado[it.id] = it
        })
    }

    get listadoArr() {
        const listado = [];

        Object.keys(this._listado).forEach(
            key => {
                const tarea = this._listado[key];
                listado.push(tarea)
            }
        )

        return listado;
    }

    listaddoCompleto() {
        this.listadoArr.forEach((it, i) => {
            const idx = `${i + 1}.`.green
            const descx = (!it.completadoEn) ? `${it.desc} :: ${"Pendiente".yellow}` : ` ${it.desc} :: ${"Finalizada".green} `
            console.log(idx, descx)
        })
    }

    listarDependiendoEstado(completadas = true) {
        if (completadas) {
            this.listadoArr.filter((it) => it.completadoEn != null).forEach((tarea, i) => {
                const idx = `${i + 1}.`.green;
                const descx = ` ${tarea.desc} :: ${tarea.completadoEn.green} `;
                console.log(idx, descx);
            });
        } else {
            this.listadoArr.filter((it) => it.completadoEn == null).forEach((tarea, i) => {
                const idx = `${i + 1}.`.green;
                const descx = `${tarea.desc} :: ${"Pendiente".yellow} `;
                console.log(idx, descx);
            });
        }
    }

    crearTarea(desc = "") {
        const tarea = new Tarea(desc)
        this._listado[tarea.id] = tarea
    }

    borrarTarea(id = "") {
        if (this._listado[id]) {
            delete this._listado[id]
        }
    }

    toggleStatus(ids = []) {
        ids.forEach((id) => {
            const tarea = this._listado[id]
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString()
            }
        })
        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                tarea.completadoEn = null
            }
        })
    }
}

export default Tareas;