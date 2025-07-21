import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddProductModal from './AddProductModal';
import {
  Product,
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from '../services/api';

const ProductTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch {
      alert('Erro ao carregar produtos.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenAddModal = () => {
    setProductToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  const handleAddProduct = async (newProduct: Omit<Product, 'id'>) => {
    try {
      await createProduct(newProduct);
      fetchProducts();
      setIsModalOpen(false);
    } catch {
      alert('Erro ao adicionar produto.');
    }
  };

  const handleEditProduct = async (updatedProduct: Product) => {
    try {
      await updateProduct(updatedProduct.id!, updatedProduct);
      fetchProducts();
      setIsModalOpen(false);
      setProductToEdit(null);
    } catch {
      alert('Erro ao editar produto.');
    }
  };

  const handleDeleteProduct = async (id?: number) => {
    if (!id) return;
    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
    } catch {
      alert('Erro ao deletar produto.');
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box
  sx={{
    display: 'flex',
    minHeight: '30vh',
   
    borderRadius: 3,                     // bordas arredondadas (3 = 24px)
    WebkitBackdropFilter: 'blur(10px)', // suporte Safari
    border: '1px solid rgba(255, 255, 255, 0.3)', // borda sutil
   
  }}
>
  {/* conteúdo */}


      {/* Conteúdo principal */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {/* Header fake */}
       <Box
  sx={{
    mb: 4,
    bgcolor: '#1976D2',
    color: '#ffffff',
    borderRadius: 2,
    p: 2,
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
  }}
>
  <DashboardIcon fontSize="large" />
  <Box>
    <Typography variant="h5" fontWeight="bold" color="inherit">
      Painel de Controle
    </Typography>
    <Typography variant="body2" color="inherit">
      Gerencie seus produtos abaixo
    </Typography>
  </Box>
</Box>

        {/* Área da Tabela de Produtos */}
        <Box
          sx={{
            p: 2,
            bgcolor: '#fff',
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          {/* Título e botão */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: isSmDown ? 'column' : 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
              gap: 2,
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Produtos
            </Typography>
            <Button variant="contained" onClick={handleOpenAddModal}>
              Adicionar Produto
            </Button>
          </Box>

          {/* Campo de busca */}
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              label="Pesquisar produtos"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>

          {/* Tabela */}
          <TableContainer component={Paper}>
            <Table aria-label="Tabela de produtos" size={isSmDown ? 'small' : 'medium'}>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Nome</strong></TableCell>
                  {!isSmDown && <TableCell><strong>Descrição</strong></TableCell>}
                  <TableCell><strong>Preço</strong></TableCell>
                  <TableCell align="center"><strong>Ações</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id} hover>
                    <TableCell>{product.name}</TableCell>
                    {!isSmDown && <TableCell>{product.description}</TableCell>}
                    <TableCell>R$ {product.price.toFixed(2)}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="Editar produto"
                        onClick={() => handleOpenEditModal(product)}
                        size="small"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        aria-label="Deletar produto"
                        onClick={() => handleDeleteProduct(product.id)}
                        size="small"
                        sx={{ color: 'error.main' }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredProducts.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                      Nenhum produto encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Modal de adicionar/editar */}
        <AddProductModal
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setProductToEdit(null);
          }}
          onAdd={handleAddProduct}
          onEdit={handleEditProduct}
          productToEdit={productToEdit}
        />
      </Box>
    </Box>
  );
};

export default ProductTable;
