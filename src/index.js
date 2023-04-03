import fs from 'fs'; // lib usada para trabalhar com arquivos do computador ex: ler arquivos
import chalk from 'chalk';

function trataErro(erro) {
    throw new Error(chalk.red(erro.code, 'não há arquivos no diretório'));
    // criando um novo objeto do tipo erro
}

function extraiLinks (texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)];
    const formataCaptura = capturas.map((resultado) => ({
        [resultado[1]]: resultado[2]
    }))
    return formataCaptura.length !== 0 ? formataCaptura : 'não há link no arquivo';
}

async function pegaArquivo(caminhoDoArquivo) {
    try {
        const encoding = 'utf-8';
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
        return extraiLinks(texto);
    } catch (erro) {
        trataErro(erro);
    }
}

export default pegaArquivo;