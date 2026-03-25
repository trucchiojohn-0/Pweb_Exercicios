const { closeConnection } = require('./db');
const prompt= require('prompt-sync')();
const { getAll, getById, insert, update, remove } = require('./cursoModel');

const cursoMain = async () => {
    let continuar = true;

    while (continuar) {
        console.log('\n--- SISTEMA DE CURSOS ---');
        console.log('1. Listar');
        console.log('2. Inserir');
        console.log('3. Buscar');
        console.log('4. Atualizar');
        console.log('5. Remover');
        console.log('0. Sair');

        const opcao = prompt('Operação: ');

        switch (opcao) {
            case '1':
                const lista = await getAll();
                console.table(lista);
                break;

            case '2':
                const nome = prompt('Nome: ');
                const descricao = prompt('Descrição: ');
                await insert({ nome, descricao });
                console.log('Inserido.');
                break;

            case '3':
                const idB = prompt('ID: ');
                const encontrado = await getById(idB);
                console.log(encontrado);
                break;

            case '4':
                const idA = prompt('ID para alterar: ');
                const novoNome = prompt('Novo nome: ');
                const novaDesc = prompt('Nova descrição: ');
                await update({ id: idA, nome: novoNome, descricao: novaDesc });
                console.log('Atualizado.');
                break;

            case '5':
                const idR = prompt('ID para remover: ');
                await remove(idR);
                console.log('Removido.');
                break;

            case '0':
                await closeConnection();
                continuar = false;
                break;

            default:
                console.log('Inválido.');
        }
    }
};

cursoMain();