import styled from 'styled-components/native'
import { Pressable } from 'react-native';
import { useId, useState } from 'react';
import useStorage from '../hooks/usestorage';

export default function NovaCategoria({ closeModal, setNewCateg }) {


    const [texto, setTexto] = useState('');
    const [cor, setCor] = useState('');
    const { saveCategorias } = useStorage();
    const id = useId()

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
                        <svg className='x' xmlns="http://www.w3.org/2000/svg" width="68" height="68" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-circle"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>
                    </Pressable>
                </DivButtons>
            </Main >
        </Wrapper >
    )

}
const DivCores = styled.View`
    flex-direction: row;
    padding-top: 10px;
    gap: 1rem;
`
const Cores = styled.Pressable`
    width: 2rem;
    height: 2rem;
    border-radius: 2rem;
`
const Salvar = styled.Pressable`
    width: 12rem;
    height: 4rem;
    border-radius: 3rem;
    background-color: white;
    align-items: center;
    justify-content: center;
`
const DivButtons = styled.View`
    flex-direction: row;
    width: 20rem;
    margin-top: 3rem;
    justify-content: space-between;
`
const Nome = styled.Text`
    font-family: GochiHand_400Regular;
    font-size: 25px;
`

const DivInput = styled.View`
    padding-top: 30px;
`
const Linha = styled.View`
    width: 17rem;
    height: 5px;
    background-color: black;
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
`
