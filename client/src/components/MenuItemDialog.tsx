import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import type { MenuItem } from "@shared/schema";

interface MenuItemDialogProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItem) => void;
}

export function MenuItemDialog({ item, isOpen, onClose, onAddToCart }: MenuItemDialogProps) {
  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="dialog-menu-item">
        <DialogHeader>
          <DialogTitle className="font-poppins text-2xl" data-testid="text-dialog-title">
            {item.nameDE}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image */}
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <img
              src={item.image}
              alt={item.nameDE}
              className="w-full h-full object-cover"
              data-testid="img-dialog-item"
            />
            {item.popular === 1 && (
              <div className="absolute top-3 right-3 bg-gold text-white text-xs font-poppins font-bold px-3 py-1 rounded-full shadow-lg">
                ⭐ Beliebt
              </div>
            )}
          </div>

          {/* Description */}
          <p className="font-lato text-muted-foreground" data-testid="text-dialog-description">
            {item.descriptionDE}
          </p>

          {/* Protein */}
          {item.protein && (
            <div>
              <h4 className="font-poppins font-semibold text-sm mb-2 text-foreground">Protein</h4>
              <Badge variant="secondary" className="font-lato" data-testid="badge-protein">
                {item.protein}
              </Badge>
            </div>
          )}

          {/* Marinade */}
          {item.marinade && (
            <div>
              <h4 className="font-poppins font-semibold text-sm mb-2 text-foreground">Marinade</h4>
              <p className="font-lato text-sm text-muted-foreground" data-testid="text-marinade">
                {item.marinade}
              </p>
            </div>
          )}

          {/* Ingredients */}
          {item.ingredients && item.ingredients.length > 0 && (
            <div>
              <h4 className="font-poppins font-semibold text-sm mb-2 text-foreground">Frische Zutaten</h4>
              <div className="flex flex-wrap gap-2">
                {item.ingredients.map((ingredient, idx) => (
                  <Badge key={idx} variant="outline" className="font-lato" data-testid={`badge-ingredient-${idx}`}>
                    {ingredient}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Sauce */}
          {item.sauce && (
            <div>
              <h4 className="font-poppins font-semibold text-sm mb-2 text-foreground">Sauce</h4>
              <p className="font-lato text-sm text-muted-foreground" data-testid="text-sauce">
                {item.sauce}
              </p>
            </div>
          )}

          {/* Toppings */}
          {item.toppings && item.toppings.length > 0 && (
            <div>
              <h4 className="font-poppins font-semibold text-sm mb-2 text-foreground">Toppings</h4>
              <div className="flex flex-wrap gap-2">
                {item.toppings.map((topping, idx) => (
                  <Badge key={idx} variant="outline" className="font-lato" data-testid={`badge-topping-${idx}`}>
                    {topping}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Allergens */}
          {item.allergens && item.allergens.length > 0 && (
            <div>
              <h4 className="font-poppins font-semibold text-sm mb-2 text-destructive">Allergene</h4>
              <div className="flex flex-wrap gap-2">
                {item.allergens.map((allergen, idx) => (
                  <Badge key={idx} variant="destructive" className="font-lato" data-testid={`badge-allergen-${idx}`}>
                    {allergen}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Price & Add to Cart */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div>
              <span className="font-poppins text-3xl font-bold text-ocean" data-testid="text-dialog-price">
                €{item.price}
              </span>
              {item.hasSizeOptions === 1 && (
                <p className="text-xs text-muted-foreground mt-1">Klein / Standard-Größe verfügbar</p>
              )}
            </div>
            <Button
              onClick={() => {
                onAddToCart(item);
                onClose();
              }}
              disabled={item.available === 0}
              className="bg-sunset hover:bg-sunset-dark text-white font-poppins font-bold rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="button-dialog-add-to-cart"
            >
              <Plus className="w-5 h-5 mr-2" />
              Hinzufügen
            </Button>
          </div>

          {item.available === 0 && (
            <p className="text-center text-sm text-destructive font-semibold" data-testid="text-dialog-unavailable">
              Derzeit nicht verfügbar
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
