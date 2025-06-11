import { toast } from "vue3-toastify";

export type Paciente = {
    id: number;
    nome: string;
    sexo: string;
    nascimento: string;
    codigo: string;
}

export const usePatientService = () => {
    const url = 'http://localhost:3000/pacientes'
    const getAll = async () => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Erro ao buscar pacientes');
            }
            return response.json();
        } catch (error) {
            console.error('Erro ao buscar pacientes:', error);
            toast.error('Erro ao buscar pacientes');
            throw error;
        }
    };
    const create = async (patient: Partial<Paciente>) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(patient),
            });
            if (!response.ok) {
                throw new Error('Erro ao criar paciente');
            }
            return response.json();
        } catch (error) {
            console.error('Erro ao criar paciente:', error);
            throw error;
        }
    }

    const getAggregatedData = async () => {
        try {
            const response = await fetch(`${url}/por-mes`);
            if (!response.ok) {
                throw new Error('Erro ao buscar dados agregados');
            }
            return response.json();
        } catch (error) {
            toast.error('Erro ao buscar dados agregados');
            throw error;
        }
    };

    return {
        getAll,
        create,
        getAggregatedData
    }
}