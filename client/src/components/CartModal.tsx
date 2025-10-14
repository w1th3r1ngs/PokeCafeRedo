import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cartStore";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, updateQuantity, removeItem, clearCart, getTotal } = useCartStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        data-testid="backdrop-cart-modal"
      />

      {/* Modal */}
      <div className="relative bg-background rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="font-poppins text-2xl md:text-3xl font-bold text-ocean flex items-center gap-2" data-testid="text-cart-title">
            <ShoppingBag className="w-7 h-7" />
            Ihr Warenkorb
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-full transition-colors"
            data-testid="button-close-cart"
            aria-label="Close cart"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12" data-testid="empty-cart">
              <ShoppingBag className="w-20 h-20 mx-auto mb-4 text-muted-foreground/30" />
              <p className="font-poppins text-xl text-muted-foreground mb-2">
                Dein Warenkorb ist leer
              </p>
              <p className="font-lato text-sm text-muted-foreground">
                Füge leckere Poke Bowls hinzu!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-card rounded-lg border border-card-border"
                  data-testid={`cart-item-${item.id}`}
                >
                  <img
                    src={item.image}
                    alt={item.nameDE}
                    className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                    data-testid={`img-cart-item-${item.id}`}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-poppins font-bold text-foreground mb-1" data-testid={`text-cart-item-name-${item.id}`}>
                      {item.nameDE}
                    </h3>
                    {item.size && (
                      <p className="font-lato text-xs text-muted-foreground mb-1" data-testid={`text-cart-item-size-${item.id}`}>
                        Größe: {item.size === "klein" ? "Klein" : "Standard"}
                      </p>
                    )}
                    <p className="font-poppins text-lg font-bold text-ocean" data-testid={`text-cart-item-price-${item.id}`}>
                      €{item.price}
                    </p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 hover:bg-destructive/10 text-destructive rounded transition-colors"
                      data-testid={`button-remove-${item.id}`}
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="p-1 hover:bg-accent rounded transition-colors"
                        data-testid={`button-decrease-${item.id}`}
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-bold w-8 text-center" data-testid={`text-quantity-${item.id}`}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-accent rounded transition-colors"
                        data-testid={`button-increase-${item.id}`}
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-poppins text-xl font-bold text-foreground">Gesamt:</span>
              <span className="font-poppins text-2xl font-bold text-ocean" data-testid="text-cart-total">
                €{getTotal().toFixed(2)}
              </span>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={clearCart}
                variant="outline"
                className="flex-1 font-poppins font-bold"
                data-testid="button-clear-cart"
              >
                Warenkorb leeren
              </Button>
              <Button
                onClick={onClose}
                className="flex-1 bg-sunset hover:bg-sunset-dark text-white font-poppins font-bold"
                data-testid="button-continue-shopping"
              >
                Weiter einkaufen
              </Button>
            </div>
            <p className="text-center text-sm text-muted-foreground font-lato">
              Bestellung per Telefon oder bei Abholung abschließen
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
