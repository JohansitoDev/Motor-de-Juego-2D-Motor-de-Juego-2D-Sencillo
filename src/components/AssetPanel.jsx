import React, { useCallback, useRef } from 'react';
import { useDrag } from 'react-dnd';
import { motion } from 'framer-motion';
import { UploadCloud, Image as ImageIcon } from 'lucide-react';
import { useGameState } from '@/contexts/GameStateContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Asset = ({ asset }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'asset',
    item: asset,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <motion.div
      ref={drag}
      className={`p-2 rounded-lg flex items-center space-x-3 cursor-grab ${
        isDragging ? 'bg-blue-500/50' : 'bg-gray-700 hover:bg-gray-600'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <img  alt={asset.name} class="w-10 h-10 rounded-md object-cover" src="https://images.unsplash.com/photo-1658204212985-e0126040f88f" />
      <span className="text-sm font-medium truncate">{asset.name}</span>
    </motion.div>
  );
};

const AssetPanel = () => {
  const { assets, addAsset } = useGameState();
  const { toast } = useToast();
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (files) {
      for (const file of files) {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            addAsset(file.name, e.target.result);
          };
          reader.readAsDataURL(file);
        } else {
            toast({
                title: 'Archivo no válido',
                description: `El archivo "${file.name}" no es una imagen y fue ignorado.`,
                variant: 'destructive',
            });
        }
      }
    }
  };

  const onImportClick = () => {
    fileInputRef.current.click();
  };

  return (
    <aside className="sidebar-panel border-r">
      <header className="sidebar-header">
        <h2 className="text-lg font-semibold">Assets</h2>
      </header>
      <div className="sidebar-content space-y-4">
        <Button
          onClick={onImportClick}
          variant="outline"
          className="w-full"
        >
          <UploadCloud className="w-4 h-4 mr-2" />
          Importar Imagen
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          multiple
          accept="image/*"
          className="hidden"
        />
        <div className="space-y-2">
            {assets.length === 0 ? (
                <div className="text-center text-gray-500 p-4 border-2 border-dashed border-gray-600 rounded-lg">
                    <ImageIcon className="mx-auto w-12 h-12 text-gray-600 mb-2"/>
                    <p className="text-sm">No hay assets.</p>
                    <p className="text-xs">Importa imágenes para empezar a crear.</p>
                </div>
            ) : (
                assets.map(asset => <Asset key={asset.id} asset={asset} />)
            )}
        </div>
      </div>
    </aside>
  );
};

export default AssetPanel;