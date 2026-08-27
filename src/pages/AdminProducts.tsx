
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Edit, Plus, Search, Trash2, PackageCheck } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { api } from '@/services/api';

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
  }, []);
  
  const loadProducts = async () => {
    const storedProducts = await api.products();
    const productsArray = storedProducts.map((product) => ({
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

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category || newProduct.stock === undefined) {
      toast({
        title: t('admin.products.error'),
        description: t('admin.products.all_fields_required'),
        variant: 'destructive',
      });
      return;
    }

    try {
      const productToAdd = await api.createProduct({
      name: newProduct.name,
      price: Number(newProduct.price),
      category: newProduct.category,
      stock: Number(newProduct.stock),
      image: newProduct.image || 'https://placehold.co/400x400/png'
      });

    setProductsList([...productsList, productToAdd]);
    
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
    } catch (error) {
      toast({ title: t('admin.products.error'), description: error instanceof Error ? error.message : t('common.error'), variant: 'destructive' });
    }
  };

  const handleEditProduct = async () => {
    if (!editingProduct) return;
    
    const updated = await api.updateProduct(editingProduct.id, editingProduct);
    setProductsList(current => current.map(product => product.id === updated.id ? updated : product));
    
    setIsEditDialogOpen(false);
    
    toast({
      title: t('admin.products.success'),
      description: t('admin.products.updated_success'),
    });
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm(t('admin.products.confirm_delete'))) {
      await api.deleteProduct(id);
      setProductsList(current => current.filter(product => product.id !== id));
      
      toast({
        title: t('admin.products.success'),
        description: t('admin.products.deleted_success'),
      });
    }
  };

  const handleUpdateStock = async (id: string, newStock: number) => {
    const product = productsList.find(item => item.id === id);
    if (!product) return;
    const updated = await api.updateProduct(id, { ...product, stock: newStock });
    setProductsList(current => current.map(item => item.id === id ? updated : item));
    
    toast({
      title: t('admin.products.stock_updated'),
      description: t('admin.products.stock_update_message').replace('{stock}', newStock.toString()),
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[.22em] text-[#a04e62]">Collection management</p>
            <h1 className="font-serif text-4xl tracking-[-.03em] text-[#281922] sm:text-5xl">{t('admin.products.title')}</h1>
            <p className="mt-2 text-sm text-[#806d74]">{t('admin.products.subtitle')}</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="h-11 rounded-full bg-[#281922] px-5 text-[10px] font-semibold uppercase tracking-[.14em] text-white hover:bg-[#593044]">
                <Plus className="mr-2 h-4 w-4" /> {t('admin.products.add_product')}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[88vh] overflow-y-auto rounded-[1.25rem] bg-[#fffaf8]">
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
                    className="bg-[#281922] text-white hover:bg-[#593044]"
                    onClick={handleAddProduct}
                  >
                    {t('admin.products.add')}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="rounded-[1.25rem] border-[#281922]/10 bg-[#fffaf8] shadow-[0_12px_35px_rgba(40,25,34,.06)]">
          <CardContent className="p-5 sm:p-7">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:max-w-sm"><Search className="absolute left-3.5 top-3.5 h-4 w-4 text-[#a88f96]" />
              <Input 
                placeholder={t('admin.products.search_products')} 
                className="h-11 rounded-full border-[#281922]/12 bg-white pl-11"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              /></div><div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[.14em] text-[#9c7d87]"><PackageCheck className="h-4 w-4 text-[#a04e62]" /> {filteredProducts.length} products</div>
            </div>

            <div className="overflow-x-auto rounded-[1rem] border border-[#281922]/10">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] bg-[#f8eeec] text-[10px] uppercase tracking-[.14em]">{t('admin.products.image')}</TableHead>
                    <TableHead className="bg-[#f8eeec] text-[10px] uppercase tracking-[.14em]">{t('admin.products.product_name_header')}</TableHead>
                    <TableHead className="bg-[#f8eeec] text-[10px] uppercase tracking-[.14em]">{t('admin.products.category_header')}</TableHead>
                    <TableHead className="bg-[#f8eeec] text-right text-[10px] uppercase tracking-[.14em]">{t('admin.products.price_header')}</TableHead>
                    <TableHead className="bg-[#f8eeec] text-center text-[10px] uppercase tracking-[.14em]">{t('admin.products.stock_header')}</TableHead>
                    <TableHead className="bg-[#f8eeec] text-right text-[10px] uppercase tracking-[.14em]">{t('admin.products.actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id} className="border-[#281922]/10 hover:bg-[#fffaf8]">
                      <TableCell>
                        <img 
                          src={product.image} 
                          alt={product.name} 
                            className="h-12 w-12 rounded-[.7rem] object-cover"
                        />
                      </TableCell>
                      <TableCell className="min-w-[190px] font-medium text-[#281922]">{product.name}</TableCell>
                      <TableCell className="text-[#806d74]">{product.category}</TableCell>
                      <TableCell className="text-right font-medium text-[#281922]">{product.price.toFixed(2)} lei</TableCell>
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
                            <DialogContent className="max-h-[88vh] overflow-y-auto rounded-[1.25rem] bg-[#fffaf8]">
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
                                      className="bg-[#281922] text-white hover:bg-[#593044]"
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
