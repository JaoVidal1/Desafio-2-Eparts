require('angular');
require('angular-mocks');
require('../app');
require('./jogadorController');

describe('Jogador Controller', function () {
  beforeEach(function () {
    angular.mock.module('Eparts');
  });

  const fakePromise = () => new Promise((resolve) => resolve);

  const _JogadorApi = {
    readJogador: fakePromise,
    createJogador: fakePromise,
    userJogador: fakePromise,
    updateJogador: fakePromise,
  };

  let controller;
  let rootScope;

  beforeEach(inject(($controller, $rootScope) => {
    rootScope = $rootScope;
    controller = $controller;
  }));

  describe('Modal controller', function () {
    let spy;
    let mockElement;
    beforeAll(() => {
      spy = jest.spyOn(document, 'getElementById');
    });
    beforeAll(() => {
      mockElement = document.createElement('btnSave');
      spy.mockReturnValue(mockElement);
    });
  });
  
  describe('Order controller', function () {
    it('retornar os critérios de ordenação do nome', function () {
      const vm = newControllerInstance();
      vm.orderBy('A-Z');

      expect(vm.orderCriterion).toEqual('name');
      expect(vm.orderDirection).toEqual(false);
    });

    it('retornar os critérios de ordenação da quantidade de moedas', function () {
      const vm = newControllerInstance();
      vm.orderBy('Mais moedas');

      expect(vm.orderCriterion).toEqual('coins');
      expect(vm.orderDirection).toEqual(true);
    });
  });
  describe('other functions', function () {
    it('verifica a seleção do jogador', function () {
        const vm = newControllerInstance();
        const data = [
          { name: 'João', coins: 23, selecionado: false },
          { name: 'Caio', coins: 6, selecionado: true },
        ];
        var res = vm.isSelecionado(data);

        expect(res).toEqual(true);
      });      
        it('iniciar com as infomações padrão', function () {
            const vm = newControllerInstance();
      
            expect(vm.jogadores).toEqual([]);
            expect(vm.insert).toEqual(false);
          });
          describe('Other function', () => {
            it('should initialize with the default informations', function () {
              const vm = newControllerInstance();
        
              expect(vm.jogadores).toEqual([]);
              expect(vm.novoJogador).toEqual(false);
            });
          });
          function newControllerInstance() {
            const scope = rootScope.$new();
            controller('mainUserController', {
              $scope: scope,
              jogadorApi: _jogadorApi,
            });
        
            return scope;
          }
        });
    });