import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { IFiltroEvento } from '../../interfaces/IFiltroEvento';
import { filtroEventosState } from '../../state/atom';
import style from './Filtro.module.scss';

const Filtro: React.FC = () => {
  
  const [data, setData] = useState('');
  const [estado, setEstado] = useState('');

  const setFiltoEvento = useSetRecoilState<IFiltroEvento>(filtroEventosState);
  
  const submeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const filtro: IFiltroEvento = {};

    if (data) {
      filtro.data = new Date(data);
    } else {
      filtro.data = null;
    }

    if(estado === 'completos') {
      filtro.concluido = true;
    } else if (estado === 'incompletos') {
      filtro.concluido = false;
    } else {
      filtro.concluido = null;
    }

    setFiltoEvento(filtro);
    
  }

  return (<form className={style.Filtro} onSubmit={submeterForm}>
    <h3 className={style.titulo}>Filtrar por data</h3>
    <input 
      type="date" 
      name="data"
      className={style.input}
      onChange={evento => setData(evento.target.value)} 
      placeholder="Por data"
      value={data} />
    
    <select value={estado} onChange={evento => setEstado(evento.target.value)}>
      <option value="todos">Todos</option>
      <option value="completos">Concluídos</option>
      <option value="incompletos">Não concluídos</option>
    </select>

    <button className={style.botao}>
      Filtrar
    </button>

  </form>)
}

export default Filtro