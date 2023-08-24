import { Box, Container, LinearProgress, Typography } from '@mui/material';
import { CostChart } from './components/CostChart';
import { useCostAggregate } from './hooks/useCostAggregate';

function App() {
    const { loading, error, data } = useCostAggregate();
    return (
        <Container sx={{ mt: 4 }}>
            <Box sx={{ mb: 2 }}>
                <Typography variant="h3">Starship Costs</Typography>
            </Box>
            <Box>
                {error && <Typography>{error}</Typography>}
                {loading || data === null ? (
                    <LinearProgress />
                ) : (
                    <CostChart
                        data={[
                            {
                                id: 'Starship Cost by Film',
                                color: '#b63d42',
                                data:
                                    data?.map((d) => ({
                                        x: d.x,
                                        y: d.y
                                    })) ?? []
                            }
                        ]}
                    />
                )}
            </Box>
        </Container>
    );
}

export default App;
