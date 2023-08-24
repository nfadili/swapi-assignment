import { useEffect, useState } from 'react';
import axios from 'axios';

type CostAggregate = { x: string; y: number };

interface IState {
    loading: boolean;
    error: string | null;
    data: CostAggregate[] | null;
}

const API_BASE_URL = 'http://localhost:3001/api';

export const useCostAggregate = () => {
    const [results, setResults] = useState<IState>({
        loading: false,
        error: null,
        data: null
    });
    useEffect(() => {
        setResults({ loading: true, error: null, data: null });
        async function fetchData() {
            const { data } = await axios.get<CostAggregate[]>(
                `${API_BASE_URL}/costs/aggregate`
            );
            return data;
        }
        fetchData()
            .then((data) => {
                setResults({ loading: false, error: null, data });
            })
            .catch((error) => {
                console.error(error);
                setResults({
                    loading: false,
                    error: 'Failed to fetch cost data',
                    data: null
                });
            });
    }, []);

    return {
        loading: results.loading,
        error: results.error,
        data: results.data
    };
};
