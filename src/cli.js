import chalk from 'chalk';
import fs from 'fs';
import pegaArquivo from './index.js';
import listaValidada from './http-validacao.js';

const caminhoCli = process.argv;
//passando caminho do arquivo via terminal como parâmetro pra função pegaArquivo

async function imprimeLista(valida, resultado, identificador = '') {
    if(valida) {
        console.log(
            chalk.yellow(`lista validada`),
            chalk.black.bgGreen(identificador),
            await listaValidada(resultado));
    } else {
        console.log(
            chalk.yellow(`lista de links`),
            chalk.black.bgGreen(identificador),
            resultado);
    }
    // teste que verifica se na chamada da fun imprimeLista foi passado o comando referente a validação de links
}

async function processaTexto(argumentos) {
    const caminho = argumentos[2];
    const valida = argumentos[3] === '--valida'; // se argumentos no indice 3 for = a "--valida", retorna true, se não, false
    try {
        fs.lstatSync(caminho);
    } catch (erro) {
        if(erro.code === 'ENOENT') {
            console.log('arquivo ou diretório não existe');
            return;
        }
    }
    // verificação se o caminho é referente a um arquivo ou diretório
    if (fs.lstatSync(caminho).isFile()) { //retorna true se o caminho for um arquivo
        const resultado = await pegaArquivo(caminho);
        imprimeLista(valida, resultado);
    } else if (fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho); //método para ler diretório
        arquivos.forEach(async (arquivo) => { //loop para interar cada arquivo do diretório e extrair os links
            const lista = await pegaArquivo(`${caminho}/${arquivo}`);
            imprimeLista(valida, lista, arquivo);
        })
    }
}

processaTexto(caminhoCli);