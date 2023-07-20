import { atom } from "recoil";
import { IEvento } from "../interfaces/IEvento";
import { IFiltroEvento } from "../interfaces/IFiltroEvento";
import { listaEventosAsync } from "../seletores";

export const listaDeEventosState = atom<IEvento[]>({
    key: 'listaDeEventosState',
    default: listaEventosAsync
}); 

export const filtroEventosState = atom<IFiltroEvento>({
    key: 'filtroEventosState',
    default: {}
});