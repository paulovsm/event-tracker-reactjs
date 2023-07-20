
import React from 'react'
import style from './Calendario.module.scss';
import ptBR from './localizacao/ptBR.json'
import Kalend, { CalendarEvent, CalendarView } from 'kalend'
import 'kalend/dist/styles/index.css';
import { useSetRecoilState } from 'recoil';
import { listaDeEventosState } from '../../state/atom';
import { IEvento } from '../../interfaces/IEvento';
import useListaEventos from '../../hooks/useLIstaEventos';

interface IKalendEvento {
  id?: number
  startAt: string
  endAt: string
  summary: string
  color: string
}

const Calendario: React.FC = () => {

  const eventosKalend = new Map<string, IKalendEvento[]>();
  const eventos = useListaEventos();
  const listaEventos = useSetRecoilState<IEvento[]>(listaDeEventosState);

  eventos.forEach(evento => {
    const chave = evento.inicio.toISOString().slice(0, 10)
    if (!eventosKalend.has(chave)) {
      eventosKalend.set(chave, [])
    }
    eventosKalend.get(chave)?.push({
      id: evento.id,
      startAt: evento.inicio.toISOString(),
      endAt: evento.fim.toISOString(),
      summary: evento.descricao,
      color: 'blue'
    })
  })

  const onEventDragFinish = (eventoAnterior: CalendarEvent, eventoAlterado: CalendarEvent) => {
    listaEventos((listaAntiga) => listaAntiga.map((eventoDaLista) => {
      if (eventoDaLista.id === eventoAnterior.id) {
        return { ...eventoDaLista, inicio: new Date(eventoAlterado.startAt), fim: new Date(eventoAlterado.endAt) }
      }
      return eventoDaLista;
    }));
  }

  return (
    <div className={style.Container}>
      <Kalend
        events={Object.fromEntries(eventosKalend)}
        initialDate={new Date().toISOString()}
        hourHeight={60}
        initialView={CalendarView.WEEK}
        timeFormat={'24'}
        weekDayStart={'Monday'}
        calendarIDsHidden={['work']}
        language={'customLanguage'}
        customLanguage={ptBR}
        onEventDragFinish={onEventDragFinish}
      />
    </div>
  );
}

export default Calendario