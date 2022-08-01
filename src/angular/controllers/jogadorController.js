angular
  .module('Eparts')
  .controller('mainController', function ($scope, jogador) {
    var changeJogador = '';
    $scope.newUser = {};
    $scope.users = [];
    function loadJogadores() {
      jogador.leituraJogador().then((res) => {
        $scope.users = res.data;
      });
    }
    $scope.modal = function () {
        document.getElementById('nameModal').value = '';
        document.getElementById('coinsModal').value = '';
        document.getElementById('btnSave').disabled = true;
  
        $scope.modalTitle = 'Novo Jogador';
        $scope.newPlayer = true;
      };
      $scope.updateModal = function(jogador){
        document.getElementById('btnSave').disabled = false
        document.getElementById('nameModal').value = jogador.name
        document.getElementById('coinsModal').value = jogador.coins

        changeJogador = jogador
        $scope.modalTitle = "Editar Jogador - " + jogador.name
        $scope.newPlayer = false;
    }
    $scope.saveJogador = function (jogador) {
        var sideToast = new bootstrap.Toast(document.getElementById('sideToast'));
        if ($scope.novoJogador) {
          jogadorApi.criaJogador(jogador).then(() => {
            delete $scope.jogador;
            loadJogadores();
            $scope.toastHeader = 'toast-header mainBlue text-white';
            $scope.toastBody = {
              '--bs-bg-opacity': '.9',
              'background-color': '#6286ea',
            };
            $scope.toastTitle = 'Sucesso!';
            $scope.toastText = 'Jogador criado!';
            $scope.toastIcon = 'bi bi-check-circle-fill';

            sideToast.show();
            $('#mainModal').modal('hide');
          });
        } else {
          jogadorAPI.atualizaJogador(changeJogador._id, jogador).then(() => {
            loadJogadores();
            $scope.toastHeader = 'toast-header mainBlue text-white';
            $scope.toastBody = {
              '--bs-bg-opacity': '.9',
              'background-color': '#6286ea',
            };
            $scope.toastTitle = 'Sucesso!';
            $scope.toastText = 'Jogador Atualizado!';
            $scope.toastIcon = 'bi bi-check-circle-fill';
  
            sideToast.show();
            $('#mainModal').modal('hide');
          });
        }
      };
      $scope.orderBy = function(option){
        if(option == 'Jogador A-Z'){            
            $scope.orderCriterion = 'name'
            $scope.orderDirection = false
        }
        else if(option == 'Jogador Z-A'){            
            $scope.orderCriterion = 'name'
            $scope.orderDirection = true
        }
        else if(option == 'Menos moedas '){            
            $scope.orderCriterion = 'coins'
            $scope.orderDirection = false
        }
        else if(option == 'Mais moedas  '){            
            $scope.orderCriterion = 'coins'
            $scope.orderDirection = true
        }
    };
    
    $scope.delete = function (jogador) {
        changeJogador = jogador;
        $scope.deleteName = jogador.name;
      };
      $scope.excluiJogador = function () {
        var sideToast = new bootstrap.Toast(document.getElementById('sideToast'));
        JogadorApi.excluiJogador(changeJogador._id).then((res) => {
          $scope.jogadores = $scope.jogadores.filter(function (jogador) {
            if (jogador._id !== changeJogador._id) return jogador;
          });
  
          $scope.toastHeader = 'toast-header mainBlue text-white';
          $scope.toastBody = {
            '--bs-bg-opacity': '.9',
            'background-color': '#6286ea',
          };
          $scope.toastTitle = 'Sucesso!';
          $scope.toastText = 'Jogador deletado!';
          $scope.toastIcon = 'bi bi-check-circle-fill';
  
          sideToast.show();
          $('#delete').modal('hide');
        });
      };
      loadJogadores();
    });