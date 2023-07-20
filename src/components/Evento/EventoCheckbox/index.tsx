import React from 'react';
import { useSetRecoilState } from 'recoil';
import { IEvento } from '../../../interfaces/IEvento';
import { listaDeEventosState } from '../../../state/atom';

const EventoCheckbox: React.FC<{ evento: IEvento }> = ({ evento }) => {

  const listaEventos = useSetRecoilState<IEvento[]>(listaDeEventosState);

  const alterarStatus = () => {
    listaEventos((listaAntiga) => listaAntiga.map((eventoDaLista) => {
      if (eventoDaLista.id === evento.id) {
        return { ...eventoDaLista, completo: !eventoDaLista.completo }
      }
      return eventoDaLista;
    }));
  }
  
  const estilos = [
    'far',
    'fa-2x',
    evento.completo ? 'fa-check-square' : 'fa-square'
  ]

  return (<i className={estilos.join(' ')} onClick={alterarStatus}></i>)
}

export default EventoCheckbox