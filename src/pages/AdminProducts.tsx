
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Edit, Plus, Search, Trash2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { getFromDb, saveToDb, updateProductStock, getAllProducts, stockUpdateEmitter } from '@/utils/jsonDb';

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  image: string;
};

const AdminProducts = () => {
  const { t } = useLanguage();
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
    loadProducts();
    
    // Subscribe to stock updates
    const unsubscribe = stockUpdateEmitter.subscribe((productId, newStock) => {
      setProductsList(prevList => 
        prevList.map(product => 
          product.id === productId ? { ...product, stock: newStock } : product
        )
      );
    });
    
    return () => {
      unsubscribe(); // Clean up subscription
    };
  }, []);
  
  const loadProducts = async () => {
    const storedProducts = await getAllProducts();
    
    const productsArray = Object.entries(storedProducts).map(([slug, product]: [string, any]) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      stock: product.stock || 0,
      image: product.image
    }));
    
    setProductsList(productsArray);
    console.log("Admin products loaded:", productsArray);
  };

  const filteredProducts = productsList.filter(
    product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category || newProduct.stock === undefined) {
      toast({
        title: t('admin.products.error'),
        description: t('admin.products.all_fields_required'),
        variant: 'destructive',
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
    
    getAllProducts().then(products => {
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
      
      // Emit stock update
      stockUpdateEmitter.emit(newId, Number(newProduct.stock));
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
      title: t('admin.products.success'),
      description: t('admin.products.added_success'),
    });
  };

  const handleEditProduct = () => {
    if (!editingProduct) return;
    
    const updatedProducts = productsList.map(product => 
      product.id === editingProduct.id ? editingProduct : product
    );
    
    setProductsList(updatedProducts);
    
    getAllProducts().then(storedProducts => {
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
        
        // Emit stock update
        stockUpdateEmitter.emit(editingProduct.id, editingProduct.stock);
      }
    });
    
    setIsEditDialogOpen(false);
    
    toast({
      title: t('admin.products.success'),
      description: t('admin.products.updated_success'),
    });
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm(t('admin.products.confirm_delete'))) {
      const updatedProducts = productsList.filter(product => product.id !== id);
      setProductsList(updatedProducts);
      
      getAllProducts().then(storedProducts => {
        const productKey = Object.keys(storedProducts).find(
          key => storedProducts[key].id === id
        );
        
        if (productKey) {
          delete storedProducts[productKey];
          saveToDb('products', storedProducts);
        }
      });
      
      toast({
        title: t('admin.products.success'),
        description: t('admin.products.deleted_success'),
      });
    }
  };

  const handleUpdateStock = (id: string, newStock: number) => {
    const updatedProducts = productsList.map(product => 
      product.id === id ? { ...product, stock: newStock } : product
    );
    
    setProductsList(updatedProducts);
    
    // Use our centralized stock update function
    updateProductStock(id, newStock);
    
    toast({
      title: t('admin.products.stock_updated'),
      description: t('admin.products.stock_update_message').replace('{stock}', newStock.toString()),
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('admin.products.title')}</h1>
            <p className="text-gray-500 mt-1">{t('admin.products.subtitle')}</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-beauty-magenta hover:bg-beauty-magenta/90 text-white">
                <Plus className="mr-2 h-4 w-4" /> {t('admin.products.add_product')}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t('admin.products.add_new_product')}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('admin.products.product_name')}</Label>
                  <Input 
                    id="name" 
                    value={newProduct.name} 
                    onChange={e => setNewProduct({...newProduct, name: e.target.value})} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">{t('admin.products.price')}</Label>
                  <Input 
                    id="price" 
                    type="number" 
                    value={newProduct.price || ''} 
                    onChange={e => setNewProduct({...newProduct, price: parseFloat(e.target.value)})} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">{t('admin.products.category')}</Label>
                  <Input 
                    id="category" 
                    value={newProduct.category} 
                    onChange={e => setNewProduct({...newProduct, category: e.target.value})} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">{t('admin.products.stock')}</Label>
                  <Input 
                    id="stock" 
                    type="number" 
                    value={newProduct.stock || ''} 
                    onChange={e => setNewProduct({...newProduct, stock: parseInt(e.target.value)})} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">{t('admin.products.image_url')}</Label>
                  <Input 
                    id="image" 
                    value={newProduct.image || ''} 
                    onChange={e => setNewProduct({...newProduct, image: e.target.value})} 
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>{t('admin.products.cancel')}</Button>
                  <Button 
                    className="bg-beauty-magenta hover:bg-beauty-magenta/90 text-white" 
                    onClick={handleAddProduct}
                  >
                    {t('admin.products.add')}
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
                placeholder={t('admin.products.search_products')} 
                className="pl-10" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">{t('admin.products.image')}</TableHead>
                    <TableHead>{t('admin.products.product_name_header')}</TableHead>
                    <TableHead>{t('admin.products.category_header')}</TableHead>
                    <TableHead className="text-right">{t('admin.products.price_header')}</TableHead>
                    <TableHead className="text-center">{t('admin.products.stock_header')}</TableHead>
                    <TableHead className="text-right">{t('admin.products.actions')}</TableHead>
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
                                <DialogTitle>{t('admin.products.edit_product')}</DialogTitle>
                              </DialogHeader>
                              {editingProduct && (
                                <div className="space-y-4 py-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-name">{t('admin.products.product_name')}</Label>
                                    <Input 
                                      id="edit-name" 
                                      value={editingProduct.name} 
                                      onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} 
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-price">{t('admin.products.price')}</Label>
                                    <Input 
                                      id="edit-price" 
                                      type="number" 
                                      value={editingProduct.price} 
                                      onChange={e => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})} 
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-category">{t('admin.products.category')}</Label>
                                    <Input 
                                      id="edit-category" 
                                      value={editingProduct.category} 
                                      onChange={e => setEditingProduct({...editingProduct, category: e.target.value})} 
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-stock">{t('admin.products.stock')}</Label>
                                    <Input 
                                      id="edit-stock" 
                                      type="number" 
                                      value={editingProduct.stock} 
                                      onChange={e => setEditingProduct({...editingProduct, stock: parseInt(e.target.value)})} 
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-image">{t('admin.products.image_url')}</Label>
                                    <Input 
                                      id="edit-image" 
                                      value={editingProduct.image} 
                                      onChange={e => setEditingProduct({...editingProduct, image: e.target.value})} 
                                    />
                                  </div>
                                  <div className="flex justify-end space-x-2 pt-4">
                                    <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>{t('admin.products.cancel')}</Button>
                                    <Button 
                                      className="bg-beauty-magenta hover:bg-beauty-magenta/90 text-white" 
                                      onClick={handleEditProduct}
                                    >
                                      {t('admin.products.save')}
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
