import styled from 'styled-components/native'
import { Pressable } from 'react-native';
import { useId, useState } from 'react';
import useStorage from '../hooks/usestorage';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function NovaCategoria({ closeModal, setNewCateg }) {

    const [texto, setTexto] = useState('');
    const [cor, setCor] = useState('');
    const { saveCategorias, getCategorias } = useStorage();
    const id = useId();

    const cores = [
        "#F89CDF", "#A0D3EE", "#A479C6", "#FED468", "#B1CD5E"
    ]

    const CriarCateg = () => {
        closeModal()

        saveCategorias("Categ", {
            nome: texto,
            cor: cor,
            id: id
        });

        setNewCateg({
            nome: texto,
            cor: cor,
            id: id
        })
    }

    return (
        <Wrapper>
            <Main>
                <Title>Nova Categoria</Title>
                <DivInput>
                    <Input placeholder='Nome' onChangeText={value => setTexto(value)} value={texto} />
                    <Linha style={{ backgroundColor: `${cor || "#000000"}`, transition: '0.5s' }} />
                </DivInput>
                <DivCores>
                    {
                        cores.map((cor) =>
                            <Cores key={cor} style={{ backgroundColor: cor }} onPress={() => setCor(cor)} />
                        )
                    }
                </DivCores>
                <DivButtons>
                    <Salvar onPress={CriarCateg}>
                        <Nome>Salvar</Nome>
                    </Salvar>
                    <Pressable onPress={closeModal}>
                        <Ionicons name="close" size={36} />
                    </Pressable>
                </DivButtons>
            </Main >
        </Wrapper >
    )

}
const DivCores = styled.View`
    flex-direction: row;
    padding-top: 10px;
    gap: 16px;
`
const Cores = styled.Pressable`
    width: 32px;
    height: 32px;
    border-radius: 32px;
`
const Salvar = styled.Pressable`
    width: 192px;
    height: 64px;
    border-radius: 48px;
    background-color: white;
    align-items: center;
    justify-content: center;
`
const DivButtons = styled.View`
    flex-direction: row;
    width: 320px;
    margin-top: 48px;
    justify-content: space-between;
`
const Nome = styled.Text`
    font-size: 25px;
`

const DivInput = styled.View`
    padding-top: 30px;
`
const Linha = styled.View`
    width: 272px;
    height: 5px;
    background-color: black;
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
    height: 55%;
    border-radius: 60px;
    align-items: center;
    position: absolute;
    justify-content: space-evenly;
    `
const Wrapper = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #00000040;
    z-index: 100;
`
