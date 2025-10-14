import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { type GalleryImage } from "@shared/schema";

const defaultImages = [
  { id: "default-1", url: "/images/gallery-1.png", filename: "Store Interior 1" },
  { id: "default-2", url: "/images/gallery-2.png", filename: "Store Interior 2" },
  { id: "default-3", url: "/images/gallery-3.png", filename: "Store View" },
];

export function Gallery3D() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: uploadedImages = [] } = useQuery<GalleryImage[]>({
    queryKey: ["/api/gallery"],
  });

  const allImages = [...defaultImages, ...uploadedImages];

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/gallery/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      
      if (!response.ok) {
        throw new Error("Delete failed");
      }
      
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      toast({
        title: "Bild gelöscht",
        description: "Das Bild wurde aus der Galerie entfernt.",
      });
    },
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const offset = e.clientX - dragStart;
    setDragOffset(offset);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 50;
    if (dragOffset > threshold) {
      setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    } else if (dragOffset < -threshold) {
      setCurrentIndex((prev) => (prev + 1) % allImages.length);
    }
    
    setDragOffset(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  const getImageStyle = (index: number) => {
    const diff = index - currentIndex;
    const totalImages = allImages.length;
    
    let adjustedDiff = diff;
    if (diff > totalImages / 2) {
      adjustedDiff = diff - totalImages;
    } else if (diff < -totalImages / 2) {
      adjustedDiff = diff + totalImages;
    }

    const isCenter = adjustedDiff === 0;
    const absAdjustedDiff = Math.abs(adjustedDiff);
    
    const dragOffsetPercent = isDragging ? (dragOffset / window.innerWidth) * 100 : 0;
    
    return {
      transform: `
        translateX(${adjustedDiff * 85 + dragOffsetPercent}%) 
        translateZ(${isCenter ? 0 : -absAdjustedDiff * 200}px) 
        rotateY(${adjustedDiff * -15}deg)
        scale(${isCenter ? 1 : 1 - absAdjustedDiff * 0.2})
      `,
      opacity: absAdjustedDiff > 2 ? 0 : 1 - absAdjustedDiff * 0.3,
      zIndex: 10 - absAdjustedDiff,
    };
  };

  return (
    <div className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-6">
        <h2 className="font-poppins text-3xl md:text-4xl font-bold text-ocean mb-4 text-center" data-testid="text-gallery-title">
          Unsere Galerie
        </h2>
        <p className="text-center text-muted-foreground mb-12 font-lato" data-testid="text-gallery-subtitle">
          Entdecken Sie unseren einladenden Raum
        </p>

        {/* 3D Carousel */}
        <div className="relative mb-16">
          <div 
            className="perspective-1000 h-[400px] md:h-[500px] relative overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            <div className="absolute inset-0 flex items-center justify-center preserve-3d select-none">
              {allImages.map((image, index) => (
                <div
                  key={image.id}
                  className="absolute w-[280px] md:w-[400px] h-[200px] md:h-[300px] transition-all duration-700 ease-out"
                  style={getImageStyle(index)}
                  data-testid={`gallery-image-${index}`}
                >
                  <Card className="w-full h-full overflow-hidden relative group">
                    <img
                      src={image.url}
                      alt={image.filename}
                      className="w-full h-full object-cover"
                    />
                    {!image.id.startsWith('default-') && (
                      <button
                        onClick={() => deleteMutation.mutate(image.id)}
                        className="absolute top-2 right-2 bg-destructive text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        data-testid={`button-delete-${image.id}`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
}
