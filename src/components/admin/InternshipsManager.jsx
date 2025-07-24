
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, CheckCircle, XCircle, Clock, GraduationCap } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useCompany } from '@/contexts/CompanyContext';

const InternshipsManager = () => {
  const { internships, updateInternshipStatus, deleteInternship } = useCompany();
  const { toast } = useToast();

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-600"><Clock className="w-3 h-3 mr-1" />Pendiente</Badge>;
      case 'approved':
        return <Badge variant="secondary" className="bg-green-600"><CheckCircle className="w-3 h-3 mr-1" />Aprobado</Badge>;
      case 'rejected':
        return <Badge variant="secondary" className="bg-red-600"><XCircle className="w-3 h-3 mr-1" />Rechazado</Badge>;
      default:
        return <Badge variant="secondary">Desconocido</Badge>;
    }
  };

  const handleStatusChange = (id, status) => {
    updateInternshipStatus(id, status);
    toast({
      title: "Estado actualizado",
      description: `La solicitud de pasantía ha sido marcada como ${status === 'approved' ? 'aprobada' : 'rechazada'}.`,
    });
  };

  const handleDelete = (id) => {
    deleteInternship(id);
    toast({
      title: "Solicitud eliminada",
      description: "La solicitud de pasantía ha sido eliminada exitosamente.",
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-2xl font-bold text-white mb-2">Solicitudes de Pasantía</h3>
        <p className="text-gray-400">Gestiona las solicitudes de pasantía recibidas</p>
      </div>

      {internships.length === 0 ? (
        <div className="glass-effect rounded-lg p-8 text-center">
          <GraduationCap className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-400 text-lg">No hay solicitudes de pasantía pendientes</p>
        </div>
      ) : (
        <div className="space-y-4">
          {internships.map((internship) => (
            <motion.div
              key={internship.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-effect rounded-lg p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">{internship.name}</h4>
                  <p className="text-blue-400 mb-1">{internship.career} - {internship.semester}</p>
                  <p className="text-purple-400 mb-2">{internship.university}</p>
                  <p className="text-gray-400 text-sm">Enviado el {formatDate(internship.date)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(internship.status)}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-300"><strong>Email:</strong> {internship.email}</p>
                  <p className="text-gray-300"><strong>Teléfono:</strong> {internship.phone}</p>
                  <p className="text-gray-300"><strong>Área de interés:</strong> {internship.area}</p>
                </div>
                <div>
                  <p className="text-gray-300"><strong>Duración:</strong> {internship.duration}</p>
                  <p className="text-gray-300"><strong>Disponibilidad:</strong></p>
                  <p className="text-gray-400 text-sm">{internship.availability}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-300 mb-2"><strong>Motivación:</strong></p>
                <p className="text-gray-400 text-sm">{internship.motivation.substring(0, 200)}...</p>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  {internship.status === 'pending' && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleStatusChange(internship.id, 'approved')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Aprobar
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleStatusChange(internship.id, 'rejected')}
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Rechazar
                      </Button>
                    </>
                  )}
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDelete(internship.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default InternshipsManager;
