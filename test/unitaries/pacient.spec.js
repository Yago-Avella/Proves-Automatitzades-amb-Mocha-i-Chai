import { expect } from 'chai';
import { Pacient } from '../../src/pacient.js';
import sinon from 'sinon';

describe('Pacient — proves unitàries', function () {
  let pacient;

  beforeEach(function () {
    pacient = new Pacient('Laia', 'Ferrer Soler', '16/03/1988');
  });

  it('saludar() retorna «Hola, soc Laia Ferrer Soler»', function () {
    expect(pacient.saludar()).to.equal('Hola, soc Laia Ferrer Soler');
  });

  it('obtenirNom() i modificarNom()', function () {
    expect(pacient.obtenirNom()).to.equal('Laia');
    pacient.modificarNom('Marta');
    expect(pacient.obtenirNom()).to.equal('Marta');
  });

  it('obtenirCognoms() i modificarCognoms()', function () {
    pacient.modificarCognoms('Ribes Mas');
    expect(pacient.obtenirCognoms()).to.equal('Ribes Mas');
  });

  it('accepta la data com a text dd/mm/aaaa', function () {
    const d = pacient.obtenirDataNaixement();
    expect(d).to.be.instanceOf(Date);
    expect([d.getDate(), d.getMonth() + 1, d.getFullYear()])
      .to.deep.equal([16, 3, 1988]);
  });

  describe('obtenirEdat() amb data de referència fixa', function () {
    it('el dia abans de l\'aniversari encara té 37 anys', function () {
      expect(pacient.obtenirEdat(new Date(2026, 2, 15))).to.equal(37);
    });

    it('el dia de l\'aniversari ja en té 38', function () {
      expect(pacient.obtenirEdat(new Date(2026, 2, 16))).to.equal(38);
    });

    it('després de modificar la data de naixement', function () {
      pacient.modificarDataNaixement('29/02/2000');
      expect(pacient.obtenirEdat(new Date(2026, 9, 5))).to.equal(26);
    });
  });

  it('té una bàscula associada per defecte', function () {
    expect(pacient.obtenirBascula()).to.exist;
    expect(pacient.calcularIMC()).to.equal(0);
  });
});

//Anyadits que he fet:

it('accepta la data de naixement com a objecte Date', function () {
  const data = new Date(1988, 2, 16);
  const pacientAmbData = new Pacient('Laia', 'Ferrer Soler', data);

  expect(pacientAmbData.obtenirDataNaixement()).to.equal(data);
});

it('modificarDataNaixement() accepta un objecte Date', function () {
  
  const data = new Date(2000, 1, 29);
  const pacient = new Pacient('Laia', 'Ferrer Soler', '16/03/1988');
  pacient.modificarDataNaixement(data);

  expect(pacient.obtenirDataNaixement()).to.equal(data);
});

//Anyadits activitat 5:

it('obtenirEdat() calcula la edat amb la data actual del sistema', () => {
  const rellotge = sinon.useFakeTimers(new Date(2030, 0, 1));

  const pacient = new Pacient(
    'Pedro',
    'Ruiz del Castillo',
    '16/03/1983'
  );

  expect(pacient.obtenirEdat()).to.equal(46);

  rellotge.restore();
});

// Anyadits en la activitat 6:

it('llança un error si el nom està buit', () => {
  expect(() => new Pacient('', 'Ferrer Soler', '16/03/1992'))
    .to.throw();
});

it('llança un error si la data de naixement és posterior a hui', () => {
  const dema = new Date();
  dema.setDate(dema.getDate() + 1);

  expect(() => new Pacient('Laia', 'Ferrer Soler', dema))
    .to.throw();
});
