import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useCompany } from '@/contexts/CompanyContext';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Building2, Users, Briefcase, GraduationCap, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import CompanySettings from '@/components/admin/CompanySettings.jsx';
import ServicesManager from '@/components/admin/ServicesManager.jsx';
import TeamManager from '@/components/admin/TeamManager.jsx';
import ApplicationsManager from '@/components/admin/ApplicationsManager.jsx';
import InternshipsManager from '@/components/admin/InternshipsManager.jsx';

const AdminPage = () => {
  const { companyData, applications, internships } = useCompany();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <Helmet>
        <title>Panel de Administración - JoSoftSolution</title>
        <meta name="description" content="Panel de administración para gestionar la información de la empresa, servicios, equipo y solicitudes." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold gradient-text mb-2">
                  Panel de Administración
                </h1>
                <p className="text-gray-400">
                  Gestiona la información de {companyData.name}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Link to="/">
                  <Button variant="outline" className="glass-effect">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver al sitio
                  </Button>
                </Link>
                <Button variant="destructive" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Cerrar Sesión
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <motion.div 
                className="glass-effect rounded-lg p-6 text-center"
                whileHover={{ scale: 1.05 }}
              >
                <Building2 className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                <h3 className="text-lg font-semibold">Servicios</h3>
                <p className="text-2xl font-bold text-blue-400">{companyData.services.length}</p>
              </motion.div>
              
              <motion.div 
                className="glass-effect rounded-lg p-6 text-center"
                whileHover={{ scale: 1.05 }}
              >
                <Users className="w-8 h-8 mx-auto mb-2 text-green-400" />
                <h3 className="text-lg font-semibold">Equipo</h3>
                <p className="text-2xl font-bold text-green-400">{companyData.team.length}</p>
              </motion.div>
              
              <motion.div 
                className="glass-effect rounded-lg p-6 text-center"
                whileHover={{ scale: 1.05 }}
              >
                <Briefcase className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                <h3 className="text-lg font-semibold">Solicitudes de Empleo</h3>
                <p className="text-2xl font-bold text-purple-400">{applications.length}</p>
              </motion.div>
              
              <motion.div 
                className="glass-effect rounded-lg p-6 text-center"
                whileHover={{ scale: 1.05 }}
              >
                <GraduationCap className="w-8 h-8 mx-auto mb-2 text-orange-400" />
                <h3 className="text-lg font-semibold">Solicitudes de Pasantía</h3>
                <p className="text-2xl font-bold text-orange-400">{internships.length}</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-effect rounded-lg p-6"
          >
            <Tabs defaultValue="company" className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-6">
                <TabsTrigger value="company">Empresa</TabsTrigger>
                <TabsTrigger value="services">Servicios</TabsTrigger>
                <TabsTrigger value="team">Equipo</TabsTrigger>
                <TabsTrigger value="applications">Empleos</TabsTrigger>
                <TabsTrigger value="internships">Pasantías</TabsTrigger>
              </TabsList>
              
              <TabsContent value="company">
                <CompanySettings />
              </TabsContent>
              
              <TabsContent value="services">
                <ServicesManager />
              </TabsContent>
              
              <TabsContent value="team">
                <TeamManager />
              </TabsContent>
              
              <TabsContent value="applications">
                <ApplicationsManager />
              </TabsContent>
              
              <TabsContent value="internships">
                <InternshipsManager />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;