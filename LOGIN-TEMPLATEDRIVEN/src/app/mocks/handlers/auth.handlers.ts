import { mockUsers } from '../data/mock-users';

export function mockLogin(username: string, password: string) {
  const user = mockUsers.find(u => u.username === username && u.password === password);
  if (user) {
    return {
      success: true,
      token: 'fake-jwt-token',
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
    };
  }

  return { success: false, message: 'Credenciais inválidas' };
}
