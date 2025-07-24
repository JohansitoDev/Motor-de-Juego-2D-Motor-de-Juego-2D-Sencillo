
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Send, GraduationCap } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useCompany } from '@/contexts/CompanyContext';

const InternshipModal = ({ isOpen, onClose }) => {
  const { addInternship } = useCompany();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    university: '',
    career: '',
    semester: '',
    area: '',
    duration: '',
    availability: '',
    motivation: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simular envío de email
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Agregar solicitud al contexto
      addInternship(formData);
      
      toast({
        title: "¡Solicitud enviada!",
        description: "Tu solicitud de pasantía ha sido enviada exitosamente. Te contactaremos pronto.",
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        university: '',
        career: '',
        semester: '',
        area: '',
        duration: '',
        availability: '',
        motivation: ''
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al enviar la solicitud. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto glass-effect border-gray-600">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text flex items-center">
            <GraduationCap className="w-6 h-6 mr-2" />
            Solicitud de Pasantía
          </DialogTitle>
        </DialogHeader>
        
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-6 mt-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-white">Nombre Completo *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-2 bg-gray-800/50 border-gray-600 text-white"
                placeholder="Tu nombre completo"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-white">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-2 bg-gray-800/50 border-gray-600 text-white"
                placeholder="tu@email.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone" className="text-white">Teléfono *</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="mt-2 bg-gray-800/50 border-gray-600 text-white"
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <Label htmlFor="university" className="text-white">Universidad *</Label>
              <Input
                id="university"
                name="university"
                value={formData.university}
                onChange={handleChange}
                required
                className="mt-2 bg-gray-800/50 border-gray-600 text-white"
                placeholder="Nombre de tu universidad"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="career" className="text-white">Carrera *</Label>
              <Input
                id="career"
                name="career"
                value={formData.career}
                onChange={handleChange}
                required
                className="mt-2 bg-gray-800/50 border-gray-600 text-white"
                placeholder="Ej: Ingeniería en Sistemas"
              />
            </div>
            <div>
              <Label htmlFor="semester" className="text-white">Semestre Actual *</Label>
              <Input
                id="semester"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                required
                className="mt-2 bg-gray-800/50 border-gray-600 text-white"
                placeholder="Ej: 6to semestre"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="area" className="text-white">Área de Interés *</Label>
              <Input
                id="area"
                name="area"
                value={formData.area}
                onChange={handleChange}
                required
                className="mt-2 bg-gray-800/50 border-gray-600 text-white"
                placeholder="Ej: Desarrollo Web, Mobile, etc."
              />
            </div>
            <div>
              <Label htmlFor="duration" className="text-white">Duración Deseada *</Label>
              <Input
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
                className="mt-2 bg-gray-800/50 border-gray-600 text-white"
                placeholder="Ej: 3 meses, 6 meses"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="availability" className="text-white">Disponibilidad Horaria *</Label>
            <Textarea
              id="availability"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              required
              rows={3}
              className="mt-2 bg-gray-800/50 border-gray-600 text-white"
              placeholder="Describe tu disponibilidad de horarios (días y horas)..."
            />
          </div>

          <div>
            <Label htmlFor="motivation" className="text-white">¿Por qué quieres hacer tu pasantía con nosotros? *</Label>
            <Textarea
              id="motivation"
              name="motivation"
              value={formData.motivation}
              onChange={handleChange}
              required
              rows={4}
              className="mt-2 bg-gray-800/50 border-gray-600 text-white"
              placeholder="Cuéntanos qué te motiva a hacer tu pasantía en JoSoftSolution..."
            />
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="glass-effect"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isSubmitting ? (
                "Enviando..."
              ) : (
                <>
                  Enviar Solicitud
                  <Send className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </motion.form>
      </DialogContent>
    </Dialog>
  );
};

export default InternshipModal;
