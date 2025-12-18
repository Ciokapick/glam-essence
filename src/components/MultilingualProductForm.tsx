import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import ProductServiceHybrid from '@/services/ProductServiceHybrid';
import { useToast } from '@/components/ui/use-toast';

interface MultilingualProductFormProps {
  product?: any;
  onSave?: (product: any) => void;
  onCancel?: () => void;
}

const MultilingualProductForm: React.FC<MultilingualProductFormProps> = ({
  product,
  onSave,
  onCancel
}) => {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  
  // Form state with multilingual support
  const [formData, setFormData] = useState({
    // English content
    name_en: product?.name?.en || '',
    description_en: product?.description?.en || '',
    details_en: product?.details?.en || '',
    features_en: product?.features?.en?.join('\n') || '',
    metaTitle_en: product?.metaTitle?.en || '',
    metaDescription_en: product?.metaDescription?.en || '',
    
    // Romanian content
    name_ro: product?.name?.ro || '',
    description_ro: product?.description?.ro || '',
    details_ro: product?.details?.ro || '',
    features_ro: product?.features?.ro?.join('\n') || '',
    metaTitle_ro: product?.metaTitle?.ro || '',
    metaDescription_ro: product?.metaDescription?.ro || '',
    
    // Common fields
    price: product?.price || 0,
    stock: product?.stock || 0,
    category: product?.category || '',
    image: product?.image || '',
    isActive: product?.isActive ?? true,
    isFeatured: product?.isFeatured ?? false,
    tags: product?.tags?.join(', ') || ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare multilingual product data
      const productData = {
        name: {
          en: formData.name_en,
          ro: formData.name_ro
        },
        description: {
          en: formData.description_en,
          ro: formData.description_ro
        },
        details: {
          en: formData.details_en,
          ro: formData.details_ro
        },
        features: {
          en: formData.features_en.split('\n').filter(f => f.trim()),
          ro: formData.features_ro.split('\n').filter(f => f.trim())
        },
        metaTitle: {
          en: formData.metaTitle_en,
          ro: formData.metaTitle_ro
        },
        metaDescription: {
          en: formData.metaDescription_en,
          ro: formData.metaDescription_ro
        },
        price: Number(formData.price),
        stock: Number(formData.stock),
        category: formData.category,
        image: formData.image,
        isActive: formData.isActive,
        isFeatured: formData.isFeatured,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      let savedProduct;
      if (product?.id) {
        // Update existing product
        savedProduct = await ProductServiceHybrid.createProduct({
          ...productData,
          id: product.id
        });
        toast({
          title: t('admin.products.success'),
          description: t('admin.products.updated_success'),
        });
      } else {
        // Create new product
        savedProduct = await ProductServiceHybrid.createProduct(productData);
        toast({
          title: t('admin.products.success'),
          description: t('admin.products.added_success'),
        });
      }

      onSave?.(savedProduct);
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: t('admin.products.error'),
        description: 'Failed to save product. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>
          {product ? t('admin.products.edit_product') : t('admin.products.add_new_product')}
        </CardTitle>
        <CardDescription>
          {product 
            ? 'Update product information in multiple languages'
            : 'Create a new product with multilingual support'
          }
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Common Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">{t('admin.products.price')}</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="stock">{t('admin.products.stock')}</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) => handleInputChange('stock', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">{t('admin.products.category')}</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                placeholder="e.g., perfumes, creams, skincare"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">{t('admin.products.image_url')}</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => handleInputChange('tags', e.target.value)}
                placeholder="luxury, women, long-lasting"
              />
            </div>
          </div>

          {/* Multilingual Tabs */}
          <Tabs defaultValue={language} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="en">🇬🇧 English</TabsTrigger>
              <TabsTrigger value="ro">🇷🇴 Română</TabsTrigger>
            </TabsList>
            
            {/* English Tab */}
            <TabsContent value="en" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name_en">Product Name (English)</Label>
                  <Input
                    id="name_en"
                    value={formData.name_en}
                    onChange={(e) => handleInputChange('name_en', e.target.value)}
                    placeholder="Enter product name in English"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description_en">Description (English)</Label>
                  <Textarea
                    id="description_en"
                    value={formData.description_en}
                    onChange={(e) => handleInputChange('description_en', e.target.value)}
                    placeholder="Enter product description in English"
                    rows={3}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="details_en">Details (English)</Label>
                  <Textarea
                    id="details_en"
                    value={formData.details_en}
                    onChange={(e) => handleInputChange('details_en', e.target.value)}
                    placeholder="Enter detailed product information in English"
                    rows={4}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="features_en">Features (English) - One per line</Label>
                  <Textarea
                    id="features_en"
                    value={formData.features_en}
                    onChange={(e) => handleInputChange('features_en', e.target.value)}
                    placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="metaTitle_en">SEO Title (English)</Label>
                  <Input
                    id="metaTitle_en"
                    value={formData.metaTitle_en}
                    onChange={(e) => handleInputChange('metaTitle_en', e.target.value)}
                    placeholder="SEO optimized title for English"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="metaDescription_en">SEO Description (English)</Label>
                  <Textarea
                    id="metaDescription_en"
                    value={formData.metaDescription_en}
                    onChange={(e) => handleInputChange('metaDescription_en', e.target.value)}
                    placeholder="SEO meta description for English"
                    rows={2}
                  />
                </div>
              </div>
            </TabsContent>
            
            {/* Romanian Tab */}
            <TabsContent value="ro" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name_ro">Nume Produs (Română)</Label>
                  <Input
                    id="name_ro"
                    value={formData.name_ro}
                    onChange={(e) => handleInputChange('name_ro', e.target.value)}
                    placeholder="Introduceți numele produsului în română"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description_ro">Descriere (Română)</Label>
                  <Textarea
                    id="description_ro"
                    value={formData.description_ro}
                    onChange={(e) => handleInputChange('description_ro', e.target.value)}
                    placeholder="Introduceți descrierea produsului în română"
                    rows={3}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="details_ro">Detalii (Română)</Label>
                  <Textarea
                    id="details_ro"
                    value={formData.details_ro}
                    onChange={(e) => handleInputChange('details_ro', e.target.value)}
                    placeholder="Introduceți informațiile detaliate ale produsului în română"
                    rows={4}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="features_ro">Caracteristici (Română) - Una pe linie</Label>
                  <Textarea
                    id="features_ro"
                    value={formData.features_ro}
                    onChange={(e) => handleInputChange('features_ro', e.target.value)}
                    placeholder="Caracteristica 1&#10;Caracteristica 2&#10;Caracteristica 3"
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="metaTitle_ro">Titlu SEO (Română)</Label>
                  <Input
                    id="metaTitle_ro"
                    value={formData.metaTitle_ro}
                    onChange={(e) => handleInputChange('metaTitle_ro', e.target.value)}
                    placeholder="Titlu optimizat SEO pentru română"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="metaDescription_ro">Descriere SEO (Română)</Label>
                  <Textarea
                    id="metaDescription_ro"
                    value={formData.metaDescription_ro}
                    onChange={(e) => handleInputChange('metaDescription_ro', e.target.value)}
                    placeholder="Descrierea meta SEO pentru română"
                    rows={2}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              {t('admin.products.cancel')}
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-beauty-magenta hover:bg-beauty-magenta/90"
            >
              {isSubmitting 
                ? (language === 'en' ? 'Saving...' : 'Se salvează...')
                : (product ? t('admin.products.save') : t('admin.products.add'))
              }
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default MultilingualProductForm;