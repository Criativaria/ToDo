import styled from 'styled-components/native'
import NovaTarefa from '../components/novatarefa';
import { useEffect, useState } from 'react';
import { FlatList, Modal, Pressable } from 'react-native';
import usestorage from '../hooks/usestorage';
import Ionicons from '@expo/vector-icons/Ionicons';

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

    const HandleComponent = async () => {
        setOpenModal(false)
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
                                <Ionicons name="checkmark" size={36} />
                            </Pressable>
                        </Tarefa>
                    }}>

                </FlatList>
            </DivTarefas>


            <DivPlus onPress={() => setOpenModal(true)}>
                <Ionicons name="add-circle-outline" size={96} />
            </DivPlus>
        </Wrapper >
    )

}
const DivPlus = styled.Pressable`
    position: absolute;
    bottom: 0;
    right: 0;
`

const DivNome = styled.View`
    flex-direction: column;
    padding-inline: 20px;
    width: 224px;
    
`
const Categoria = styled.Text`
    font-size: 24px;
    margin-top: 10px;
`
const P = styled.Text`
    font-size: 32px;
`
const Tarefa = styled.View`
    width: 320px;
    min-height: 80px;
    height: fit-content;
    border-radius: 48px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-inline: 32px;
    margin-block: 8px;
    `
const DivTarefas = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 640px;
`
const Wrapper = styled.View`
    flex: 1;
`
const Titulo = styled.Text`
    font-size: 100px;
    margin-inline: 32px;
`