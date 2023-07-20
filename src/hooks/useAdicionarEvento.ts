import { useRecoilState } from "recoil";
import { IEvento } from "../interfaces/IEvento";
import { listaDeEventosState } from "../state/atom";

export default function useAdicionarEvento() {
    const [listaDeEventos, setListaDeEventos] = useRecoilState(listaDeEventosState);

    const adicionarEvento = (evento: IEvento) => {
        const dataHoje = new Date();

        if (evento.inicio < dataHoje) {
            throw new Error("A data de início não pode ser menor que a data atual");
        }

        evento.id = Math.round((new Date()).getTime() / 1000);
        
        setListaDeEventos([...listaDeEventos, evento]);
    };

    return adicionarEvento;
}