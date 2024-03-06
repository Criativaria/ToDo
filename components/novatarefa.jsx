import styled from 'styled-components/native'
import { useEffect, useId, useState } from 'react';
import { Modal } from 'react-native-web';
import NovaCategoria from './novacategoria';
import { FlatList, Pressable } from 'react-native';
import useStorage from '../hooks/usestorage';

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

    function HandleComponent() {
        setOpenModal(false)
        setTimeout(() => {
            GetClass();
        }, 0)
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
                    <Pressable onPress={() => setOpenModal(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-circle"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /><path d="M12 8v8" /></svg>
                    </Pressable>
                </DivSubTitle>
                <DivCategorias>
                    <FlatList
                        style={{ flex: 1 }}
                        data={dataCateg}
                        renderItem={({ item }) => {
                            return <Categoria style={{ backgroundColor: `${item.cor}` }} key={item.nome} onPress={() => {
                                setCorCateg(item.cor)
                                setNomeCateg(item.nome)
                            }}>
                                <Nome>{item.nome}</Nome>
                                <Pressable onPress={() => Delete(item)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
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
                        <svg className='x' xmlns="http://www.w3.org/2000/svg" width="98" height="98" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-circle"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>
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
        right: 1rem;
        bottom: 1rem;
    }
`
const Salvar = styled.Pressable`
    width: 12rem;
    height: 4rem;
    background-color: white;
    border-radius: 3rem;
    align-items: center;
    justify-content: center;
`
const DivButtons = styled.View`
    flex-direction: row;
    width: 20rem;
    margin-top: 2rem;
    justify-content: space-between;
    align-items: center;
`
const Nome = styled.Text`
    font-family: GochiHand_400Regular;
    font-size: 25px;
`
const Categoria = styled.Pressable`
    padding-inline: 2rem;
    width: 17rem;
    height: 3rem;
    justify-content: space-between;
    align-items: center;
    border-radius: 2rem;
    flex-direction: row;
    transition: 0.5s;
    margin-block: 0.5rem;
`
const DivCategorias = styled.View`
    flex-direction: column;
    gap: 1rem;
    padding-top: 20px;
    flex: 1;
`
const DivInput = styled.View`
    padding-top: 30px;
`
const DivSubTitle = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 17rem;
    padding-top: 50px;
`
const SubTitle = styled.Text`
    font-size: 30px;
    font-family: GochiHand_400Regular;
`
const Linha = styled.View`
    width: 17rem;
    height: 5px;
    border-radius: 5px;
`
const Input = styled.TextInput`
   outline: none;
   width: 17rem;
   height: 2rem;
   font-family: GochiHand_400Regular;
   font-size: 30px;
`
const Title = styled.Text`
    font-size: 50px;
    font-family: GochiHand_400Regular;
    padding-top: 20px;
`
const Main = styled.View`
    background-color: #C6D1E6;
    width: 95%;
    height: 85%;
    border-radius: 3rem 3rem 0 0;
    align-items: center;
    padding-bottom: 30px;
`
const Wrapper = styled.View`
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    
`
