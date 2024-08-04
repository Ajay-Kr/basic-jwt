import { verify, sign } from '../src';

describe('verify', () => { 
  it('shoudl verify and decode a valid token', () => {
    const secret = 'shhhh';

    const token = sign({ payload: { name: 'AjayDoesTech' }, secret });

    const verified = verify({ token, secret });

    expect(verified.name).toBe('AjayDoesTech');
  });

  it('should throw if the signature is invalid', () => {
    const secretOne = 'shhhh';
    const secretTwo = 'secretTwo';
    const token = sign({ payload: { name: 'Ajay'}, secret: secretOne});

    expect(() => verify({ token, secret: secretTwo }).toThrow('Invalid signature'))
    // try {
    //   verify({ token, secret: secretTwo });
    // } catch (e: any) {
    //   expect(e.message).toBe('Invalid signature');
    // }
  });

  it('should throw if the token has expired', () => {
    const secret = 'shhhh';
    const token = sign({
      payload: { name: 'AjayDoesTect' }, 
      secret, 
      options: {
        expiresIn: -8.64e7
      }
    });

    try {
      verify({ token, secret })
    } catch (e: any) {
      expect(e.message).toBe('Token has expired');
    }
  })
 })