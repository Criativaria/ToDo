import styled from 'styled-components/native'
import NovaTarefa from '../components/novatarefa';
import { useEffect, useId, useState } from 'react';
import { FlatList, Modal, Pressable } from 'react-native';
import usestorage from '../hooks/usestorage';


export default function Home() {
    const [openModal, setOpenModal] = useState(false);
    const { getTarefas, deleteTarefas } = usestorage();
    const [Tasks, setTasks] = useState([])


    const getTasks = async () => {
        const dataTask = await getTarefas("Tarefas");
        setTasks(dataTask);
    }

    useEffect(() => {
        getTasks();
    }, [])

    const HandleComponent = () => {
        setTimeout(() => {
            getTasks()
            setOpenModal(false)
        }, 0)
    }

    const Delete = async (value) => {
        const newTarefas = await deleteTarefas("Tarefas", value);
        setTimeout(() => {
            setTasks(newTarefas)
        }, 0)
    }

    return (
        <Wrapper>
            <Modal visible={openModal} transparent={true}>
                <NovaTarefa closeModal={HandleComponent} />
            </Modal>
            <Titulo>to-do</Titulo>

            <DivTarefas>

                <FlatList
                    style={{ flex: 1 }}
                    data={Tasks}
                    renderItem={({ item, index }) => {
                        return <Tarefa style={{ backgroundColor: `${item.cor}` }} key={index}>
                            <DivNome>
                                <Categoria>{item.categoria}</Categoria>
                                <P>{item.nome}</P>
                            </DivNome>
                            <Pressable onPress={() => Delete(item)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5" /></svg>
                            </Pressable>
                        </Tarefa>
                    }}>

                </FlatList>
            </DivTarefas>


            <DivPlus onPress={() => setOpenModal(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="98" height="98" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-circle"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /><path d="M12 8v8" /></svg>
            </DivPlus>
        </Wrapper >
    )

}
const DivPlus = styled.Pressable`
    position: absolute;
    bottom: 1rem;
    right: 1rem;
`

const DivNome = styled.View`
    flex-direction: column;
    padding-inline: 1.25rem;
    width: 14rem;
    
`
const Categoria = styled.Text`
    font-size: 1.5rem;
    font-family: GochiHand_400Regular;
    margin-top: 10px;
`
const P = styled.Text`
    font-size: 2rem;
    font-family: GochiHand_400Regular;
`
const Tarefa = styled.View`
    width: 20rem;
    min-height: 5rem;
    height: fit-content;
    border-radius: 3rem;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-inline: 2rem;
    margin-block: 0.5rem;
    `
const DivTarefas = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 40rem;
`
const Wrapper = styled.View`
    flex: 1;
`
const Titulo = styled.Text`
    font-family: GochiHand_400Regular;
    font-size: 100px;
    margin-inline: 2rem;
`