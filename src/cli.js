import chalk from 'chalk';
import fs from 'fs'
import pegaArquivo from './index.js';

const caminho = process.argv;
//passando caminho do arquivo via terminal como parâmetro pra função pegaArquivo

function imprimeLista(resultado, identificador = '') {
    console.log(
        chalk.yellow(`lista de links`),
        chalk.black.bgGreen(identificador),
        resultado);
}

async function processaTexto(argumentos) {
    const caminho = argumentos[2]
    try {
        fs.lstatSync(caminho)
    } catch (erro) {
        if(erro.code === 'ENOENT') {
            console.log('arquivo ou diretório não existe')
            return
        }
    }
    // verificação se o caminho é referente a um arquivo ou diretório
    if (fs.lstatSync(caminho).isFile()) { //retorna true se o caminho for um arquivo
        const resultado = await pegaArquivo(caminho);
        imprimeLista(resultado)
    } else if (fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho) //método para ler diretório
        arquivos.forEach(async (arquivo) => {
            const lista = await pegaArquivo(`${caminho}/${arquivo}`)
            imprimeLista(lista, arquivo)
        })
    }
}

processaTexto(caminho);