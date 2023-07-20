import { selector } from "recoil";
import { IEvento } from "../interfaces/IEvento";
import { filtroEventosState, listaDeEventosState } from "../state/atom";

export const eventosFiltradosState = selector({
    key: 'eventosFiltradosState',
    get: ({ get }) => {
        const todosEventos = get(listaDeEventosState);
        const filtro = get(filtroEventosState);

        const eventos = todosEventos.filter((evento) => {

            if (!filtro.data 
                && (filtro.concluido === undefined || filtro.concluido === null)) {
                return true;
            }

            if (filtro.data 
                    && (filtro.concluido === undefined || filtro.concluido === null)) { // só data
                return filtro.data!.toISOString().slice(0, 10) === evento.inicio.toISOString().slice(0, 10);
            }

            if (!filtro.data && filtro.concluido !== null) { // só concluido
                return filtro.concluido === evento.completo;
            }

            // data e concluido
            return filtro.concluido === evento.completo && filtro.data!.toISOString().slice(0, 10) === evento.inicio.toISOString().slice(0, 10);

        });

        return eventos;
    }
});

export const listaEventosAsync = selector({
    key: 'listaEventosAsync',
    get: async () => {
        const response = await fetch('http://localhost:8080/eventos');
        const listaEventos: IEvento[] = await response.json();

        return listaEventos.map((evento) => {
            evento.inicio = new Date(evento.inicio);
            evento.fim = new Date(evento.fim);
            return evento;
        });
    }
});