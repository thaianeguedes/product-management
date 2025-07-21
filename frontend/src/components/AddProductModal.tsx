import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';

interface ProductData {
  id?: number;
  name: string;
  description: string;
  price: number;
}

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (product: Omit<ProductData, 'id'>) => void;
  onEdit: (product: ProductData) => void;
  productToEdit: ProductData | null;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  open,
  onClose,
  onAdd,
  onEdit,
  productToEdit,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setDescription(productToEdit.description);
      setPrice(String(productToEdit.price));
    } else {
      setName('');
      setDescription('');
      setPrice('');
    }
  }, [productToEdit]);

  const handleSubmit = () => {
    if (!name.trim() || !description.trim() || !price) return;

    const productPayload = {
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price),
    };

    if (productToEdit && productToEdit.id !== undefined) {
      onEdit({ id: productToEdit.id, ...productPayload });
    } else {
      onAdd(productPayload);
    }

    setName('');
    setDescription('');
    setPrice('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{productToEdit ? 'Editar Produto' : 'Adicionar Produto'}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Nome"
          margin="dense"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
        <TextField
          fullWidth
          label="Descrição"
          margin="dense"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          fullWidth
          label="Preço"
          margin="dense"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          inputProps={{ min: 0, step: 0.01 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductModal;