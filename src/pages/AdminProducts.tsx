import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Edit, Plus, Search, Trash2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { getFromDb, saveToDb, updateProductStock } from '@/utils/jsonDb';

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  image: string;
};

const AdminProducts = () => {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    category: '',
    stock: 0,
    image: ''
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  const { toast } = useToast();

  useEffect(() => {
    const loadProducts = async () => {
      let storedProducts = getFromDb<Record<string, any>>('products', {});
      
      if (Object.keys(storedProducts).length === 0) {
        const { products } = await import('@/data/products');
        storedProducts = products;
        saveToDb('products', products);
      }
      
      const productsArray = Object.entries(storedProducts).map(([slug, product]) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        stock: product.stock || 0,
        image: product.image
      }));
      
      setProductsList(productsArray);
    };
    
    loadProducts();
  }, []);

  const filteredProducts = productsList.filter(
    product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category || newProduct.stock === undefined) {
      toast({
        title: "Eroare",
        description: "Toate câmpurile sunt obligatorii.",
        variant: "destructive",
      });
      return;
    }

    const newId = `product-${Date.now()}`;
    const productToAdd = {
      id: newId,
      name: newProduct.name,
      price: Number(newProduct.price),
      category: newProduct.category,
      stock: Number(newProduct.stock),
      image: newProduct.image || 'https://placehold.co/400x400/png'
    };

    setProductsList([...productsList, productToAdd]);
    
    import('@/data/products').then(({ products }) => {
      const productsCopy = { ...products };
      const newSlug = newProduct.name.toLowerCase().replace(/\s+/g, '-');
      
      productsCopy[newSlug] = {
        id: newId,
        slug: newSlug,
        name: newProduct.name,
        price: Number(newProduct.price),
        image: newProduct.image || 'https://placehold.co/400x400/png',
        gallery: [newProduct.image || 'https://placehold.co/400x400/png'],
        category: newProduct.category,
        rating: 0,
        reviewCount: 0,
        description: "Un produs nou adăugat în catalog.",
        details: "Detalii despre acest produs vor fi adăugate în curând.",
        features: ["Caracteristică 1", "Caracteristică 2"],
        sku: `SKU-${newId}`,
        stock: Number(newProduct.stock)
      };
      
      saveToDb('products', productsCopy);
    });
    
    setNewProduct({
      name: '',
      price: 0,
      category: '',
      stock: 0,
      image: ''
    });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Succes",
      description: "Produsul a fost adăugat cu succes.",
    });
  };

  const handleEditProduct = () => {
    if (!editingProduct) return;
    
    const updatedProducts = productsList.map(product => 
      product.id === editingProduct.id ? editingProduct : product
    );
    
    setProductsList(updatedProducts);
    
    import('@/data/products').then(async () => {
      const storedProducts = getFromDb<Record<string, any>>('products', {});
      
      const productKey = Object.keys(storedProducts).find(
        key => storedProducts[key].id === editingProduct.id
      );
      
      if (productKey) {
        storedProducts[productKey].name = editingProduct.name;
        storedProducts[productKey].price = editingProduct.price;
        storedProducts[productKey].category = editingProduct.category;
        storedProducts[productKey].stock = editingProduct.stock;
        storedProducts[productKey].image = editingProduct.image;
        
        saveToDb('products', storedProducts);
      }
    });
    
    setIsEditDialogOpen(false);
    
    toast({
      title: "Succes",
      description: "Produsul a fost actualizat cu succes.",
    });
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Ești sigur că vrei să ștergi acest produs?')) {
      const updatedProducts = productsList.filter(product => product.id !== id);
      setProductsList(updatedProducts);
      
      import('@/data/products').then(async () => {
        const storedProducts = getFromDb<Record<string, any>>('products', {});
        
        const productKey = Object.keys(storedProducts).find(
          key => storedProducts[key].id === id
        );
        
        if (productKey) {
          delete storedProducts[productKey];
          
          saveToDb('products', storedProducts);
        }
      });
      
      toast({
        title: "Succes",
        description: "Produsul a fost șters cu succes.",
      });
    }
  };

  const handleUpdateStock = (id: string, newStock: number) => {
    const updatedProducts = productsList.map(product => 
      product.id === id ? { ...product, stock: newStock } : product
    );
    
    setProductsList(updatedProducts);
    
    updateProductStock(id, newStock);
    
    toast({
      title: "Stoc actualizat",
      description: `Stocul a fost actualizat la ${newStock} unități.`,
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Produse</h1>
            <p className="text-gray-500 mt-1">Gestionează produsele din magazinul tău</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-beauty-magenta hover:bg-beauty-magenta/90 text-white">
                <Plus className="mr-2 h-4 w-4" /> Adaugă produs
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adaugă produs nou</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nume produs</Label>
                  <Input 
                    id="name" 
                    value={newProduct.name} 
                    onChange={e => setNewProduct({...newProduct, name: e.target.value})} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Preț (lei)</Label>
                  <Input 
                    id="price" 
                    type="number" 
                    value={newProduct.price || ''} 
                    onChange={e => setNewProduct({...newProduct, price: parseFloat(e.target.value)})} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Categorie</Label>
                  <Input 
                    id="category" 
                    value={newProduct.category} 
                    onChange={e => setNewProduct({...newProduct, category: e.target.value})} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stoc</Label>
                  <Input 
                    id="stock" 
                    type="number" 
                    value={newProduct.stock || ''} 
                    onChange={e => setNewProduct({...newProduct, stock: parseInt(e.target.value)})} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">URL Imagine</Label>
                  <Input 
                    id="image" 
                    value={newProduct.image || ''} 
                    onChange={e => setNewProduct({...newProduct, image: e.target.value})} 
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Anulează</Button>
                  <Button 
                    className="bg-beauty-magenta hover:bg-beauty-magenta/90 text-white" 
                    onClick={handleAddProduct}
                  >
                    Adaugă
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Caută produse..." 
                className="pl-10" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Imagine</TableHead>
                    <TableHead>Nume Produs</TableHead>
                    <TableHead>Categorie</TableHead>
                    <TableHead className="text-right">Preț</TableHead>
                    <TableHead className="text-center">Stoc</TableHead>
                    <TableHead className="text-right">Acțiuni</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="h-10 w-10 rounded-md object-cover" 
                        />
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell className="text-right">{product.price.toFixed(2)} lei</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={() => handleUpdateStock(product.id, Math.max(0, product.stock - 1))}
                            disabled={product.stock <= 0}
                          >
                            -
                          </Button>
                          <span className="w-12 text-center">{product.stock}</span>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={() => handleUpdateStock(product.id, product.stock + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setEditingProduct(product)}
                              >
                                <Edit size={16} />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Editează produs</DialogTitle>
                              </DialogHeader>
                              {editingProduct && (
                                <div className="space-y-4 py-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-name">Nume produs</Label>
                                    <Input 
                                      id="edit-name" 
                                      value={editingProduct.name} 
                                      onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} 
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-price">Preț (lei)</Label>
                                    <Input 
                                      id="edit-price" 
                                      type="number" 
                                      value={editingProduct.price} 
                                      onChange={e => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})} 
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-category">Categorie</Label>
                                    <Input 
                                      id="edit-category" 
                                      value={editingProduct.category} 
                                      onChange={e => setEditingProduct({...editingProduct, category: e.target.value})} 
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-stock">Stoc</Label>
                                    <Input 
                                      id="edit-stock" 
                                      type="number" 
                                      value={editingProduct.stock} 
                                      onChange={e => setEditingProduct({...editingProduct, stock: parseInt(e.target.value)})} 
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-image">URL Imagine</Label>
                                    <Input 
                                      id="edit-image" 
                                      value={editingProduct.image} 
                                      onChange={e => setEditingProduct({...editingProduct, image: e.target.value})} 
                                    />
                                  </div>
                                  <div className="flex justify-end space-x-2 pt-4">
                                    <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Anulează</Button>
                                    <Button 
                                      className="bg-beauty-magenta hover:bg-beauty-magenta/90 text-white" 
                                      onClick={handleEditProduct}
                                    >
                                      Salvează
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;
