
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useCompany } from '@/contexts/CompanyContext';

const TeamManager = () => {
  const { companyData, addTeamMember, updateTeamMember, deleteTeamMember } = useCompany();
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    image: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingMember) {
      updateTeamMember(editingMember.id, formData);
      toast({
        title: "¡Miembro actualizado!",
        description: "La información del miembro ha sido actualizada exitosamente.",
      });
    } else {
      addTeamMember(formData);
      toast({
        title: "¡Miembro agregado!",
        description: "El nuevo miembro ha sido agregado al equipo exitosamente.",
      });
    }
    
    resetForm();
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      position: member.position,
      image: member.image
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    deleteTeamMember(id);
    toast({
      title: "Miembro eliminado",
      description: "El miembro ha sido eliminado del equipo exitosamente.",
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      position: '',
      image: ''
    });
    setEditingMember(null);
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
          <h3 className="text-2xl font-bold text-white mb-2">Gestión del Equipo</h3>
          <p className="text-gray-400">Administra los miembros de tu equipo</p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Agregar Miembro
        </Button>
      </div>

      <div className="admin-grid">
        {companyData.team.map((member) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-effect rounded-lg p-6 text-center"
          >
            <div className="relative mb-4">
              <div className="w-20 h-20 mx-auto rounded-full overflow-hidden ring-2 ring-blue-500">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <h4 className="text-lg font-semibold text-white mb-1">{member.name}</h4>
            <p className="text-blue-400 text-sm mb-4">{member.position}</p>
            
            <div className="flex justify-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEdit(member)}
                className="text-blue-400 hover:text-blue-300"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(member.id)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={resetForm}>
        <DialogContent className="glass-effect border-gray-600">
          <DialogHeader>
            <DialogTitle className="text-white">
              {editingMember ? 'Editar Miembro' : 'Agregar Nuevo Miembro'}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="name" className="text-white">Nombre Completo</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-2 bg-gray-800/50 border-gray-600 text-white"
              />
            </div>

            <div>
              <Label htmlFor="position" className="text-white">Posición</Label>
              <Input
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                className="mt-2 bg-gray-800/50 border-gray-600 text-white"
              />
            </div>

            <div>
              <Label htmlFor="image" className="text-white">URL de la Imagen</Label>
              <Input
                id="image"
                name="image"
                type="url"
                value={formData.image}
                onChange={handleChange}
                required
                className="mt-2 bg-gray-800/50 border-gray-600 text-white"
                placeholder="https://ejemplo.com/imagen.jpg"
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
                {editingMember ? 'Actualizar' : 'Agregar'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default TeamManager;
