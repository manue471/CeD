import { toast } from "vue3-toastify";

export type User = {
  role?: string;
  registryType?: string;
  registryNumber?: string;
  uf?: string;
  specialty?: string;
  cpf: string;
  password: string;
}


export const useAuthService = () => {
    const url = 'http://localhost:3000/auth'
    const userUrl = 'http://localhost:3000/users';

    const login = async (cpf: string, password: string) => {
        try {
            const response = await fetch(`${url}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cpf, password }),
            });
            return response.json();
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            throw error;
        }
    };

     const register = async (user: User) => {
        try {
            const response = await fetch(userUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            const data = await response.json();

            console.log('Usuário cadastrado com sucesso:', data);
            if (!response.ok) {
                throw new Error(data.message || 'Erro ao cadastrar usuário');
            }

            toast.success('Usuário cadastrado com sucesso!');
            return data;
        } catch (error) {
            toast.error(error.message || 'Erro ao cadastrar usuário');
            throw error;
        }
    };

    const getUSerByCpf = async (cpf: string) => {
        try {
            const response = await fetch(`${userUrl}/${cpf}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Usuário não encontrado');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            throw error;
        }
    };

    return {
        login,
        register,
        getUSerByCpf
    }
}