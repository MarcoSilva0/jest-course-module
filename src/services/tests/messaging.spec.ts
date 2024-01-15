import { Messaging } from '../Messaging';

const createSut = () => {
  return new Messaging();
};

describe('Messaging', () => {
  //Clean all mock after suit test
  afterEach(() => jest.clearAllMocks());

  it('should return undefined', () => {
    //Sytem under testing
    const sut = createSut();
    expect(sut.sendMenssage('Teste')).toBeUndefined();
  });

  it('should call console.log once', () => {
    const sut = createSut();
    const consoleSpy = jest.spyOn(console, 'log');
    sut.sendMenssage('Teste');
    expect(consoleSpy).toHaveBeenCalledTimes(1);
  });

  it('should call console.log with "Mensagem Enviada:" and msg', () => {
    const sut = createSut();
    const consoleSpy = jest.spyOn(console, 'log');
    sut.sendMenssage('Teste');
    expect(consoleSpy).toHaveBeenCalledWith('Mensagem Enviada:', 'Teste');
  });
});
