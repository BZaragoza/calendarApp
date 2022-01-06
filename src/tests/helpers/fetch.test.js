import { fetchWithoutToken, fetchWithToken } from '../../helpers/fetch';

describe('Tests on fetch helper', () => {

  let token = ''; 

  test('fetchWithoutToken should work', async () => {
    const res = await fetchWithoutToken('auth', {email: 'brian@zaragoza.com', password: '123456'}, 'POST');
    const body = await res.json();

    expect(res instanceof Response).toBe(true);
    expect(body.ok).toBe(true);
    
    token = body.token;
  });
  
  test('fetchWithToken should work', async () => {
    localStorage.setItem('token', token);
    
    const res = await fetchWithToken('events')
    const body = await res.json();
    
    expect(res instanceof Response).toBe(true);
    expect(body.ok).toBe(true);
  })
  
  
})