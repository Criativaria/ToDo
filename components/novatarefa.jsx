import styled from 'styled-components/native'
import { useEffect, useId, useState } from 'react';
import NovaCategoria from './novacategoria';
import { FlatList, Pressable, Modal } from 'react-native';
import useStorage from '../hooks/usestorage';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function NovaTarefa({ closeModal }) {
    const id = useId();
    const { getCategorias, deleteCategorias, saveTarefas } = useStorage()

    const [openModal, setOpenModal] = useState(false);
    const [dataCateg, setDataCateg] = useState([]);
    const [newCateg, setNewCateg] = useState({})

    const [corCateg, setCorCateg] = useState("")
    const [nomeCateg, setNomeCateg] = useState("")
    const [nomeTarefa, setNomeTarefa] = useState("")


    //categorias

    const GetClass = async () => {
        const dataClass = await getCategorias("Categ")
        setDataCateg(dataClass)
    }
    useEffect(() => {
        GetClass();
    }, [])

    const HandleComponent = async () => {
        setOpenModal(false)
        GetClass();
    }
    const OpenCateg = async () => {
        setOpenModal(true)
        console.log(openModal)
    }
    async function Delete(value) {
        const newDados = await deleteCategorias("Categ", value);
        console.log(newDados)
        setTimeout(() => {
            setDataCateg(newDados)
        }, 0)
    }

    //tarefas

    const NewTarefa = () => {

        if (corCateg && nomeCateg && nomeTarefa) {
            closeModal();

            saveTarefas("Tarefas", {
                cor: corCateg,
                categoria: nomeCateg,
                nome: nomeTarefa,
                id: id
            })

        }
    }


    return (
        <Wrapper>
            <Main>
                <Modal visible={openModal} transparent={true}>
                    <NovaCategoria closeModal={HandleComponent} setNewCateg={setNewCateg} />
                </Modal>
                <Title>Nova Tarefa</Title>
                <DivInput>
                    <Input placeholder='Nome' onChangeText={value => setNomeTarefa(value)} value={nomeTarefa} />
                    <Linha style={{ backgroundColor: `${corCateg || "#000000"}`, transition: '0.5s' }} />
                </DivInput>
                <DivSubTitle>
                    <SubTitle>categoria</SubTitle>
                    <Pressable onPress={OpenCateg}>
                        <Ionicons name="add-circle-outline" size={46} />
                    </Pressable>
                </DivSubTitle>
                <DivCategorias>
                    <FlatList
                        style={{ flex: 1 }}
                        data={dataCateg}
                        renderItem={({ item }) => {
                            return <Categoria key={item.nome} style={{ backgroundColor: item.cor }} onPress={() => {
                                setCorCateg(item.cor)
                                setNomeCateg(item.nome)
                            }}>
                                <Nome>{item.nome}</Nome>
                                <Pressable onPress={() => Delete(item)}>
                                    <Ionicons name="close" size={45} />
                                </Pressable>
                            </Categoria>

                        }}
                    />
                </DivCategorias>
                <DivButtons>
                    <Salvar onPress={NewTarefa}>
                        <Nome>Salvar</Nome>
                    </Salvar>
                    <Apertavel onPress={closeModal}>
                        <Ionicons name="close" size={36} />
                    </Apertavel>
                </DivButtons>
            </Main >
        </Wrapper >
    )

}
const Apertavel = styled.Pressable`
        position: relative;
    .x{
        position: absolute;
        right: 16px;
        bottom: 16px;
    }
`
const Salvar = styled.Pressable`
    width: 192px;
    height: 64px;
    background-color: white;
    border-radius: 48px;
    align-items: center;
    justify-content: center;
`
const DivButtons = styled.View`
    flex-direction: row;
    width: 320px;
    margin-top: 32px;
    justify-content: space-between;
    align-items: center;
`
const Nome = styled.Text`
    font-size: 25px;
`
const Categoria = styled.Pressable`
    padding-inline: 32px;
    width: 272px;
    height: 48px;
    justify-content: space-between;
    align-items: center;
    border-radius: 32px;
    flex-direction: row;
    transition: 0.5s;
    margin-block: 8px;
`
const DivCategorias = styled.View`
    flex-direction: column;
    gap: 16px;
    padding-top: 20px;
    flex: 1;
`
const DivInput = styled.View`
    padding-top: 30px;
`
const DivSubTitle = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 272px;
    padding-top: 50px;
`
const SubTitle = styled.Text`
    font-size: 30px;
`
const Linha = styled.View`
    width: 272px;
    height: 5px;
    border-radius: 5px;
`
const Input = styled.TextInput`
   width: 272px;
   height: 32px;
   font-size: 30px;
`
const Title = styled.Text`
    font-size: 50px;
    padding-top: 20px;
`
const Main = styled.View`
    background-color: #C6D1E6;
    width: 95%;
    height: 85%;
    border-radius: 48px 48px 0 0;
    align-items: center;
    padding-bottom: 30px;
`
const Wrapper = styled.View`
    flex: 1;
    justify-content: flex-end;
    align-items: center;
`
