
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Send, Upload } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useCompany } from '@/contexts/CompanyContext';

const JobApplicationModal = ({ isOpen, onClose }) => {
  const { addApplication } = useCompany();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    skills: '',
    motivation: '',
    cv: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simular envío de email
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Agregar solicitud al contexto
      addApplication(formData);
      
      toast({
        title: "¡Solicitud enviada!",
        description: "Tu solicitud de empleo ha sido enviada exitosamente. Te contactaremos pronto.",
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        position: '',
        experience: '',
        skills: '',
        motivation: '',
        cv: null
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      cv: file
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto glass-effect border-gray-600">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text">
            Solicitud de Empleo
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
              <Label htmlFor="position" className="text-white">Posición Deseada *</Label>
              <Input
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                className="mt-2 bg-gray-800/50 border-gray-600 text-white"
                placeholder="Ej: Desarrollador Frontend"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="experience" className="text-white">Experiencia Laboral *</Label>
            <Textarea
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              rows={4}
              className="mt-2 bg-gray-800/50 border-gray-600 text-white"
              placeholder="Describe tu experiencia laboral relevante..."
            />
          </div>

          <div>
            <Label htmlFor="skills" className="text-white">Habilidades Técnicas *</Label>
            <Textarea
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              required
              rows={3}
              className="mt-2 bg-gray-800/50 border-gray-600 text-white"
              placeholder="Ej: JavaScript, React, Node.js, Python..."
            />
          </div>

          <div>
            <Label htmlFor="motivation" className="text-white">¿Por qué quieres trabajar con nosotros? *</Label>
            <Textarea
              id="motivation"
              name="motivation"
              value={formData.motivation}
              onChange={handleChange}
              required
              rows={4}
              className="mt-2 bg-gray-800/50 border-gray-600 text-white"
              placeholder="Cuéntanos qué te motiva a unirte a nuestro equipo..."
            />
          </div>

          <div>
            <Label htmlFor="cv" className="text-white">Curriculum Vitae (PDF)</Label>
            <div className="mt-2 flex items-center space-x-4">
              <Input
                id="cv"
                name="cv"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="bg-gray-800/50 border-gray-600 text-white file:bg-blue-600 file:text-white file:border-0 file:rounded-md file:px-4 file:py-2"
              />
              <Upload className="w-5 h-5 text-gray-400" />
            </div>
            {formData.cv && (
              <p className="text-sm text-green-400 mt-2">
                Archivo seleccionado: {formData.cv.name}
              </p>
            )}
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

export default JobApplicationModal;
