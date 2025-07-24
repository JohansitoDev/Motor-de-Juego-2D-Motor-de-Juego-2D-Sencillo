import React from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import { useGameState } from '@/contexts/GameStateContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const PropertyInput = ({ label, value, onChange, type = 'number', ...props }) => (
  <div className="grid grid-cols-2 items-center">
    <Label htmlFor={label.toLowerCase()} className="text-sm text-gray-400">{label}</Label>
    <Input
      id={label.toLowerCase()}
      type={type}
      value={value}
      onChange={onChange}
      className="bg-gray-700 border-gray-600 h-8"
      {...props}
    />
  </div>
);


const PropertiesPanel = () => {
  const { selectedObject, updateGameObject } = useGameState();

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    if (selectedObject) {
      updateGameObject(selectedObject.id, { [name]: parseFloat(value) || 0 });
    }
  };
  
  const handleNameChange = (e) => {
    const { value } = e.target;
    if (selectedObject) {
      updateGameObject(selectedObject.id, { name: value });
    }
  };

  return (
    <aside className="sidebar-panel border-l">
      <header className="sidebar-header">
        <h2 className="text-lg font-semibold">Propiedades</h2>
      </header>
      <div className="sidebar-content">
        {selectedObject ? (
          <motion.div
            key={selectedObject.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <PropertyInput label="Nombre" type="text" value={selectedObject.name} onChange={handleNameChange} name="name" />
            <div className="pt-4 border-t border-gray-700">
              <h3 className="text-md font-semibold mb-2 text-blue-300">Transformación</h3>
              <div className="space-y-2">
                <PropertyInput label="Posición X" value={Math.round(selectedObject.x)} onChange={handleUpdate} name="x" />
                <PropertyInput label="Posición Y" value={Math.round(selectedObject.y)} onChange={handleUpdate} name="y" />
                <PropertyInput label="Ancho" value={Math.round(selectedObject.width)} onChange={handleUpdate} name="width" min="1" />
                <PropertyInput label="Alto" value={Math.round(selectedObject.height)} onChange={handleUpdate} name="height" min="1" />
                <PropertyInput label="Rotación" value={Math.round(selectedObject.rotation)} onChange={handleUpdate} name="rotation" />
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="text-center text-gray-500 p-4">
            <SlidersHorizontal className="mx-auto w-12 h-12 text-gray-600 mb-2" />
            <p>Selecciona un objeto en la escena para ver sus propiedades.</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default PropertiesPanel;