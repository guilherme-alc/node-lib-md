import fs from 'fs'; // lib usada para trabalhar com arquivos do computador ex: ler arquivos
import chalk from 'chalk';

function trataErro(erro) {
    throw new Error(chalk.red(erro.code, 'não há arquivos no diretório'));
    // criando um novo objeto do tipo erro
}

async function pegaArquivo(caminhoDoArquivo) {
    try {
        const encoding = 'utf-8';
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
        console.log(chalk.green(texto));
    } catch (erro) {
        trataErro(erro)
    } finally {
        console.log(chalk.yellow('operação concluída'));
      }
}

pegaArquivo('./arquivos/texto.md');
