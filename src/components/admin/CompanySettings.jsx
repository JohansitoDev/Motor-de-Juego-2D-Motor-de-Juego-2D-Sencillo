
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useCompany } from '@/contexts/CompanyContext';

const CompanySettings = () => {
  const { companyData, updateCompanyData } = useCompany();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: companyData.name,
    description: companyData.description,
    email: companyData.email,
    phone: companyData.phone,
    address: companyData.address
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCompanyData(formData);
    toast({
      title: "¡Información actualizada!",
      description: "Los datos de la empresa han sido guardados exitosamente.",
    });
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
      <div>
        <h3 className="text-2xl font-bold text-white mb-2">Información de la Empresa</h3>
        <p className="text-gray-400">Actualiza los datos básicos de tu empresa</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name" className="text-white">Nombre de la Empresa</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
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
            rows={3}
            className="mt-2 bg-gray-800/50 border-gray-600 text-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 bg-gray-800/50 border-gray-600 text-white"
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-white">Teléfono</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-2 bg-gray-800/50 border-gray-600 text-white"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="address" className="text-white">Dirección</Label>
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-2 bg-gray-800/50 border-gray-600 text-white"
          />
        </div>

        <Button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <Save className="w-4 h-4 mr-2" />
          Guardar Cambios
        </Button>
      </form>
    </motion.div>
  );
};

export default CompanySettings;
