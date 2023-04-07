// a lista de links é uma lista de objetos, essa fun pecorre a lista e extrai os valores de cada objeto para uma nova array
function separaLinks(arrLinks) { //recebe o resultado de links e nomes
    return arrLinks.map((objetoLink) => Object.values(objetoLink).join()) // extraimos apenas os links e guardamos na fun
    //método de objeto que extrai apenas valores de um objeto e joga dentro de um array
    //o join é um método de array que pega o elemento de uma array e converte em string
}

function trataErro(erro) {
    if (erro.cause.code === 'ENOTFOUND') {
        return 'link não encontrado';
    } else {
        return 'ocorreu algum erro';
    }
}

async function checaStatus (arrUrl) { //recebe os links extraídos como parâmetro
    const arrStatus = Promise.all( //o objeto Promise com o método .all vai receber a lista de promessas, resolver todas elas e retornar os resultados
        arrUrl.map(async(url) =>{ //pra cada link chamamos a api fech
            try {
                const response = await fetch(url, {method: 'HEAD'}) //a api fetch vai retornar um json
                return response.status//onde capturamos apenas a propriedade status para checar se o link está funcionando 200 = ok, 400 = erro
            } catch (erro) {
                return trataErro(erro);
            }
        })
    )
    return arrStatus
}

async function listaValidada(listaDeLinks) {
    const links = separaLinks(listaDeLinks)
    const status = await checaStatus(links)
    return listaDeLinks.map((objLink, i) => ({ //montando o objeto da array de links com o status inserido
        ...objLink, 
        status: status[i]
    }))
}

export default listaValidada