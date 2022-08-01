angular.module("eParts").factory("jogadorAPI", ($http, config)=>{
    const _get = function(){
        return $http({
            url: config.baseUrl + '/jogadores',
            method: 'GET'
        })
    }
    const _post = function(jogador){
        return $http.post(config.baseUrl + "/jogadores", jogador)
    }
    const _delete = function(jogadorID){
        return $http.delete(config.baseUrl + "/jogadores/" + jogadorID)
    }
    const _put = function(jogadorID, update){
        return $http.put(config.baseUrl + "/jogadores/" + jogadorID, update)
    }
    return {
        readJogador : _get,
        createJogador : _post,
        deleteJogador : _delete,
        updateJogador : _put
    }
})
