import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Upload, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Header = () => {
  const { toast } = useToast();

  const handleAction = () => {
    toast({
      title: "🚧 ¡Función en desarrollo!",
      description: "Esta característica aún no está implementada, ¡pero podrás solicitarla pronto! 🚀",
    });
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-gray-900 border-b border-gray-700 px-4 py-2 flex items-center justify-between"
    >
      <div className="flex items-center space-x-2">
        <Gamepad2 className="text-blue-400 w-8 h-8" />
        <h1 className="text-xl font-bold">Motor de Juegos 2D</h1>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={handleAction}>
          <Upload className="w-4 h-4 mr-2" />
          Importar Proyecto
        </Button>
        <Button variant="outline" size="sm" onClick={handleAction}>
          <Download className="w-4 h-4 mr-2" />
          Exportar Proyecto
        </Button>
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={handleAction}>
          ▶️ Jugar
        </Button>
      </div>
    </motion.header>
  );
};

export default Header;