import { useRecoilState } from "recoil";
import { listaDeEventosState } from "../state/atom";

export default function useExcluirEvento() {
    const [listaDeEventos, setListaDeEventos] = useRecoilState(listaDeEventosState);
    
    const excluirEvento = (id: number) => {
        setListaDeEventos(listaDeEventos.filter((evento) => evento.id !== id));
    };

    return excluirEvento;
}