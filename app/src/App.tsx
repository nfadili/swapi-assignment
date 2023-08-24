import { Box, Container, Typography } from '@mui/material';
import { CostChart } from './components/CostChart';

const aggregate_data = [
    {
        id: 'All Starships',
        color: '#b63d42',
        data: [
            {
                x: '1',
                y: 171
            },
            {
                x: '2',
                y: 202
            },
            {
                x: '3',
                y: 255
            },
            {
                x: '4',
                y: 70
            },
            {
                x: '5',
                y: 73
            },
            {
                x: '6',
                y: 115
            },
            {
                x: '7',
                y: 58
            }
        ]
    }
];

function App() {
    return (
        <Container>
            <Box>
                <Typography variant="h3">Starship Costs</Typography>
            </Box>
            <Box>
                <CostChart data={aggregate_data} />
            </Box>
        </Container>
    );
}

export default App;
