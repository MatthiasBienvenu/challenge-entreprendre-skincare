import { ExternalLink, Tag } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductItem } from '@/types/api';

interface ProductCardProps {
  product: ProductItem;
  currency?: string;
}

export const ProductCard = ({ product, currency = 'EUR' }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] animate-fade-in">
      {product.image && (
        <div className="aspect-video w-full overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
        {product.price !== undefined && (
          <p className="text-2xl font-bold text-primary">{formatPrice(product.price)}</p>
        )}
      </CardHeader>
      {product.tags && product.tags.length > 0 && (
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="gap-1">
                <Tag className="w-3 h-3" />
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      )}
      <CardFooter>
        <Button
          variant="default"
          className="w-full gap-2"
          asChild
        >
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Voir le produit
            <ExternalLink className="w-4 h-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};
