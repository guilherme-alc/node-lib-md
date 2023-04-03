import chalk from 'chalk';
import fs from 'fs'
import pegaArquivo from './index.js';

const caminho = process.argv;
//passando caminho do arquivo via terminal como parâmetro pra função pegaArquivo

async function processaTexto(caminho) {
    const resultado = await pegaArquivo(caminho[2]);
    console.log(chalk.yellow('lista de links'), resultado);
}

processaTexto(caminho);