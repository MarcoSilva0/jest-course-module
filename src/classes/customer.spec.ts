import { IndividualCustomer, EnterpriseCustomer } from './Customer';

const createIndividualCustomer = (
  firstName: string,
  lastName: string,
  cpf: string,
): IndividualCustomer => {
  return new IndividualCustomer(firstName, lastName, cpf);
};

const createEnterpriseCustomer = (name: string, cnpj: string): EnterpriseCustomer => {
  return new EnterpriseCustomer(name, cnpj);
};

afterEach(() => jest.clearAllMocks());

describe('IndividualCustomer', () => {
  it('should have firstname, lastname and cpf', () => {
    const sut = createIndividualCustomer('Marco', 'Silva', '111.111.111-11');

    expect(sut).toHaveProperty('firstName', 'Marco');
    expect(sut).toHaveProperty('lastName', 'Silva');
    expect(sut).toHaveProperty('cpf', '111.111.111-11');
  });

  it('should have method to get name and idn for individual customer', () => {
    const sut = createIndividualCustomer('Marco', 'Silva', '111.111.111-11');

    expect(sut.getName()).toBe('Marco Silva');
    expect(sut.getIDN()).toBe('111.111.111-11');
  });
});

describe('EnterpriseCustomer', () => {
  it('should have name and cnpj', () => {
    const sut = createEnterpriseCustomer('Udemy', '99.999.999/9999-99');

    expect(sut).toHaveProperty('name', 'Udemy');
    expect(sut).toHaveProperty('cnpj', '99.999.999/9999-99');
  });

  it('should have method to get name and idn for enterprise', () => {
    const sut = createEnterpriseCustomer('Udemy', '99.999.999/9999-99');

    expect(sut.getName()).toBe('Udemy');
    expect(sut.getIDN()).toBe('99.999.999/9999-99');
  });
});
