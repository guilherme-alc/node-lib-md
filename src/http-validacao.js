function separaLinks(arrLinks) { //recebe o resultado de links e nomes
    return arrLinks.map((objetoLink) => Object.values(objetoLink).join())
}

function trataErro(erro) {
    if (erro.cause.code === 'ENOTFOUND') {
        return 'link não encontrado';
    } else {
        return 'ocorreu algum erro';
    }
}

async function checaStatus (arrUrl) {
    const arrStatus = Promise.all(
        arrUrl.map(async(url) =>{
            try {
                const response = await fetch(url, {method: 'HEAD'})
                return response.status
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
    return listaDeLinks.map((objLink, i) => ({
        ...objLink, 
        status: status[i]
    }))
}

export default listaValidada