import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Code, Smartphone, Users, Cloud, PenTool, ShoppingCart, TrendingUp, Wrench } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useCompany } from '@/contexts/CompanyContext';

const iconOptions = [
  { value: 'Code', label: 'Código', icon: Code },
  { value: 'Smartphone', label: 'Smartphone', icon: Smartphone },
  { value: 'Users', label: 'Usuarios', icon: Users },
  { value: 'Cloud', label: 'Nube', icon: Cloud },
  { value: 'PenTool', label: 'Diseño UI/UX', icon: PenTool },
  { value: 'ShoppingCart', label: 'E-commerce', icon: ShoppingCart },
  { value: 'TrendingUp', label: 'SEO', icon: TrendingUp },
  { value: 'Wrench', label: 'Mantenimiento', icon: Wrench }
];

const ServicesManager = () => {
  const { companyData, addService, updateService, deleteService } = useCompany();
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'Code',
    price: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingService) {
      updateService(editingService.id, formData);
      toast({
        title: "¡Servicio actualizado!",
        description: "El servicio ha sido actualizado exitosamente.",
      });
    } else {
      addService(formData);
      toast({
        title: "¡Servicio agregado!",
        description: "El nuevo servicio ha sido agregado exitosamente.",
      });
    }
    
    resetForm();
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon,
      price: service.price
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    deleteService(id);
    toast({
      title: "Servicio eliminado",
      description: "El servicio ha sido eliminado exitosamente.",
    });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      icon: 'Code',
      price: ''
    });
    setEditingService(null);
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Gestión de Servicios</h3>
          <p className="text-gray-400">Administra los servicios que ofrece tu empresa</p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Agregar Servicio
        </Button>
      </div>

      <div className="admin-grid">
        {companyData.services.map((service) => {
          const IconComponent = iconOptions.find(opt => opt.value === service.icon)?.icon || Code;
          
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-effect rounded-lg p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(service)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(service.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <h4 className="text-lg font-semibold text-white mb-2">{service.title}</h4>
              <p className="text-gray-300 mb-4 text-sm">{service.description}</p>
              <p className="text-blue-400 font-semibold">{service.price}</p>
            </motion.div>
          );
        })}
      </div>

      <Dialog open={isModalOpen} onOpenChange={resetForm}>
        <DialogContent className="glass-effect border-gray-600">
          <DialogHeader>
            <DialogTitle className="text-white">
              {editingService ? 'Editar Servicio' : 'Agregar Nuevo Servicio'}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="title" className="text-white">Título del Servicio</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="mt-2 bg-gray-800/50 border-gray-600 text-white"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-white">Descripción</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
                className="mt-2 bg-gray-800/50 border-gray-600 text-white"
              />
            </div>

            <div>
              <Label htmlFor="icon" className="text-white">Icono</Label>
              <select
                id="icon"
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                className="mt-2 w-full p-2 bg-gray-800/50 border border-gray-600 rounded-md text-white"
              >
                {iconOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="price" className="text-white">Precio</Label>
              <Input
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="mt-2 bg-gray-800/50 border-gray-600 text-white"
                placeholder="Ej: Desde $2,500"
              />
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {editingService ? 'Actualizar' : 'Agregar'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default ServicesManager;