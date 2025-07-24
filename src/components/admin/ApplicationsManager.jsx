
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useCompany } from '@/contexts/CompanyContext';

const ApplicationsManager = () => {
  const { applications, updateApplicationStatus, deleteApplication } = useCompany();
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
    updateApplicationStatus(id, status);
    toast({
      title: "Estado actualizado",
      description: `La solicitud ha sido marcada como ${status === 'approved' ? 'aprobada' : 'rechazada'}.`,
    });
  };

  const handleDelete = (id) => {
    deleteApplication(id);
    toast({
      title: "Solicitud eliminada",
      description: "La solicitud de empleo ha sido eliminada exitosamente.",
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
        <h3 className="text-2xl font-bold text-white mb-2">Solicitudes de Empleo</h3>
        <p className="text-gray-400">Gestiona las solicitudes de trabajo recibidas</p>
      </div>

      {applications.length === 0 ? (
        <div className="glass-effect rounded-lg p-8 text-center">
          <p className="text-gray-400 text-lg">No hay solicitudes de empleo pendientes</p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((application) => (
            <motion.div
              key={application.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-effect rounded-lg p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">{application.name}</h4>
                  <p className="text-blue-400 mb-2">{application.position}</p>
                  <p className="text-gray-400 text-sm">Enviado el {formatDate(application.date)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(application.status)}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-300"><strong>Email:</strong> {application.email}</p>
                  <p className="text-gray-300"><strong>Teléfono:</strong> {application.phone}</p>
                </div>
                <div>
                  <p className="text-gray-300"><strong>Experiencia:</strong></p>
                  <p className="text-gray-400 text-sm">{application.experience.substring(0, 100)}...</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-300 mb-2"><strong>Habilidades:</strong></p>
                <p className="text-gray-400 text-sm">{application.skills}</p>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  {application.status === 'pending' && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleStatusChange(application.id, 'approved')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Aprobar
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleStatusChange(application.id, 'rejected')}
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
                  onClick={() => handleDelete(application.id)}
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

export default ApplicationsManager;
