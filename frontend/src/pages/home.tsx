import { Box, Container,  } from '@mui/material';
import ProductTable from '../components/ProductTable';

const Home = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
      </Box>
      <ProductTable />
    </Container>
  );
};

export default Home;

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
}
