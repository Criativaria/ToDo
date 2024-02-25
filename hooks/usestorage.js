import AsyncStorage from '@react-native-async-storage/async-storage';

export default function usestorage() {

    //categorias

    const getCategorias = async (key) => {
        try {

            let categ = await AsyncStorage.getItem(key)
            return JSON.parse(categ) || [];

        } catch (error) {
            console.log(error);
        }
    }

    const saveCategorias = async (key, value) => {
        try {
            let savecateg = await getCategorias(key);
            savecateg.push(value);
            await AsyncStorage.setItem(key, JSON.stringify(savecateg));

        } catch (error) {
            console.log(error)
        }

    }

    const deleteCategorias = async (key, value) => {
        try {
            let deletcateg = await getCategorias(key);
            let categ = deletcateg.filter((item) => item.id != value.id)
            await AsyncStorage.setItem(key, JSON.stringify(categ))
            return categ
        } catch (error) {
            console.log(error);
        }
    }

    //tarefas


    const getTarefas = async (key) => {
        try {
            let tarefa = await AsyncStorage.getItem(key)
            return JSON.parse(tarefa) || [];
        } catch (error) {
            console.log(error);
        }
    }
    const saveTarefas = async (key, value) => {
        try {
            console.log(value)
            let saveTarefas = await getTarefas(key);
            saveTarefas.push(value);
            await AsyncStorage.setItem(key, JSON.stringify(saveTarefas))
        } catch (error) {
            console.log(error);
        }
    }
    const deleteTarefas = async (key, value) => {
        try {
            let deleteTarefa = await getTarefas(key);
            let tarefa = deleteTarefa.filter((item) => item.id !== value.id)
            await AsyncStorage.setItem(key, JSON.stringify(tarefa))
            return tarefa;
        } catch (error) {
            console.log(error);
        }
    }



    return {
        getCategorias,
        saveCategorias,
        deleteCategorias,

        getTarefas,
        saveTarefas,
        deleteTarefas
    }



}