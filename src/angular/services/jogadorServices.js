angular.module("eParts").factory("jogadorAPI", ($http, config)=>{
    const _get = function(){
        return $http({
            url: config.baseUrl + '/jler',
            method: 'GET'
        })
    }
    
    const _post = function(jogador){
        return $http.post(config.baseUrl + "/jcria", jogador)
    }
    const _delete = function(jogadorID){
        return $http.delete(config.baseUrl + "/jogadores/" + jogadorID)
    }
    const _put = function(jogadorID, update){
        return $http.put(config.baseUrl + "/jogadores/" + jogadorID, update)
    }
    return {
        lerJogador : _get,
        criaJogador : _post,
        excluiJogador : _delete,
        atualizaJogador : _put
    }
})
