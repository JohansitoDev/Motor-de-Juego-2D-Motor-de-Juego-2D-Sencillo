import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { LogIn, Shield } from 'lucide-react';

const LoginPage = () => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (login(password)) {
        toast({
          title: "¡Bienvenido!",
          description: "Has iniciado sesión correctamente.",
        });
        navigate('/admin');
      } else {
        toast({
          title: "Error de autenticación",
          description: "La contraseña es incorrecta. Inténtalo de nuevo.",
          variant: "destructive",
        });
        setPassword('');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Login - Administración JoSoftSolution</title>
        <meta name="description" content="Acceso al panel de administración de JoSoftSolution." />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl floating-animation"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl floating-animation" style={{ animationDelay: '2s' }}></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md p-8 space-y-8 glass-effect rounded-2xl shadow-2xl z-10"
        >
          <div className="text-center">
            <Shield className="mx-auto h-12 w-12 text-blue-400" />
            <h1 className="text-3xl font-bold gradient-text mt-4">
              Acceso de Administrador
            </h1>
            <p className="text-gray-400 mt-2">
              Ingresa la contraseña para gestionar el sitio.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-2 bg-gray-800/50 border-gray-600 text-white"
                placeholder="••••••••"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg py-6"
            >
              {isLoading ? (
                "Verificando..."
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  Ingresar
                </>
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default LoginPage;