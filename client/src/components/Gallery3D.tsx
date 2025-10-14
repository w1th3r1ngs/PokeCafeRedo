import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight, Upload, X } from "lucide-react";
import { type GalleryImage } from "@shared/schema";

const defaultImages = [
  { id: "default-1", url: "/images/gallery-1.png", filename: "Store Interior 1" },
  { id: "default-2", url: "/images/gallery-2.png", filename: "Store Interior 2" },
  { id: "default-3", url: "/images/gallery-3.png", filename: "Store View" },
];

export function Gallery3D() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [uploadUrl, setUploadUrl] = useState("");
  const [uploadFilename, setUploadFilename] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: uploadedImages = [] } = useQuery<GalleryImage[]>({
    queryKey: ["/api/gallery"],
  });

  const allImages = [...defaultImages, ...uploadedImages];

  const uploadMutation = useMutation({
    mutationFn: async (data: { url: string; filename: string }) => {
      return apiRequest("POST", "/api/gallery", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      toast({
        title: "Bild hochgeladen!",
        description: "Das Bild wurde erfolgreich zur Galerie hinzugefügt.",
      });
      setUploadUrl("");
      setUploadFilename("");
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Bild konnte nicht hochgeladen werden. Bitte versuchen Sie es erneut.",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/gallery/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      toast({
        title: "Bild gelöscht",
        description: "Das Bild wurde aus der Galerie entfernt.",
      });
    },
  });

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const handleUpload = () => {
    if (uploadUrl && uploadFilename) {
      uploadMutation.mutate({ url: uploadUrl, filename: uploadFilename });
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
    
    return {
      transform: `
        translateX(${adjustedDiff * 85}%) 
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
          <div className="perspective-1000 h-[400px] md:h-[500px] relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center preserve-3d">
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

          {/* Navigation Buttons */}
          <Button
            onClick={prevSlide}
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full z-20 bg-white/90 hover:bg-white"
            data-testid="button-prev"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            onClick={nextSlide}
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full z-20 bg-white/90 hover:bg-white"
            data-testid="button-next"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>

        {/* Upload Form */}
        <Card className="p-6 md:p-8 max-w-2xl mx-auto">
          <h3 className="font-poppins text-xl md:text-2xl font-bold text-ocean mb-6" data-testid="text-upload-title">
            Bild zur Galerie hinzufügen
          </h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="image-url">Bild URL</Label>
              <Input
                id="image-url"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={uploadUrl}
                onChange={(e) => setUploadUrl(e.target.value)}
                data-testid="input-image-url"
              />
            </div>
            <div>
              <Label htmlFor="image-name">Bildname</Label>
              <Input
                id="image-name"
                type="text"
                placeholder="Beschreibung des Bildes"
                value={uploadFilename}
                onChange={(e) => setUploadFilename(e.target.value)}
                data-testid="input-image-name"
              />
            </div>
            <Button
              onClick={handleUpload}
              disabled={!uploadUrl || !uploadFilename || uploadMutation.isPending}
              className="w-full bg-ocean hover:bg-ocean-dark font-poppins"
              data-testid="button-upload"
            >
              <Upload className="w-4 h-4 mr-2" />
              {uploadMutation.isPending ? "Wird hochgeladen..." : "Bild hochladen"}
            </Button>
          </div>
        </Card>
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
