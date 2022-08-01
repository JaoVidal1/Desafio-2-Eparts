require('angular');
require('angular-mocks');
require('../app');
require('../values/configValue');
require('./jogadorServices');

describe('Jogador Service', function () {
  beforeEach(function () {
    angular.mock.module('Eparts');
  });
  var _jogadorServices;
  var configs, httpBackend, rootScope;
  beforeEach(inject((jogadorApi, $httpBackend, config, $rootScope) => {
    _jogadorServices = jogadorApi;
    httpBackend = $httpBackend;
    rootScope = $rootScope;
    configs = config;
  }));
  describe('Jogador Service', function () {
    it('receber  os jogadores', async function () {
      httpBackend.whenGET(configs.baseUrl + '/jogadores').respond(200, [
        {
          name: 'João',
          coins: 19,
        },
      ]);

      var res = _jogadorServices.readJogador();
      httpBackend.flush();
      res.then(function (response) {
        const result = response.data;
        expect(result[0].name).toEqual('João');
        expect(result[0].coins).toEqual(19);
      });
    });

    it('verificar  a função post ', async function () {
      httpBackend.whenPOST(configs.baseUrl + '/jogadores').respond(200);

      var res = _jogadoresServices.createJogador();
      httpBackend.flush();
      res.then(function (response) {
        const result = response.data;
        expect(result.status).toEqual(200);
      });
    });
  });
});