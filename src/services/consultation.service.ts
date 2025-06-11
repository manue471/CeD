import { toast } from "vue3-toastify";

export type Consultation = {
    id: number;
    codigoPaciente: string;
    descricao: string;
    data: string;
    horario: string;
}

export const useConsultationService = () => {
    const url = 'http://localhost:3000/consultas'
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
    const create = async (patient: Partial<Consultation>) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(patient),
            });
            if (!response.ok) {
                throw new Error('Erro ao criar consulta');
            }
            return response.json();
        } catch (error) {
            console.error('Erro ao criar consulta:', error);
            throw error;
        }
    }

    const getAggregatedData = async () => {
        try {
            const response = await fetch(`${url}/sintomas-por-mes`);
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