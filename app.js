import colors from 'colors';

import {
    inquirerMenu,
    inquirerPause,
    leerInput,
    listadoTareas,
    confirmar,
    listadoSeleccionado
} from './helpers/inquirer.js';
import Tareas from './models/tareas.js';
import { guardarDB, leerDB } from './helpers/guardarArchivo.js';

const main = async () => {
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();
    if (tareasDB) {
        //si hay tareas
        tareas.cargarTareasFromArray(tareasDB)
    }
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                //crear tarea 
                const desc = await leerInput("Ingresa la descripción de la tarea:".green)
                tareas.crearTarea(desc)
                break;
            case '2':
                //listar tareas
                tareas.listaddoCompleto()
                break
            case '3':
                //listar tareas completadas
                tareas.listarDependiendoEstado(true)
                break
            case '4':
                //listar tareas pendientes
                tareas.listarDependiendoEstado(false)
                break
            case '5':
                //completar tareas
                const ids = await listadoSeleccionado(tareas.listadoArr)
                tareas.toggleStatus(ids)
                break
            case '6':
                const del = await listadoTareas(tareas.listadoArr)
                if (del == '0') break
                const confirmation = await confirmar("Está seguro?")
                if (confirmation) {
                    tareas.borrarTarea(del)
                    console.log("Tarea borrada con exito!")
                }
                break
        }
        guardarDB(tareas.listadoArr);
        await inquirerPause()
    } while (opt != '0')
}

main();