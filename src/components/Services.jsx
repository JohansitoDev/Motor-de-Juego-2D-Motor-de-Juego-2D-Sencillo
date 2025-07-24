import React from 'react';
import { motion } from 'framer-motion';
import { Code, Smartphone, Users, Cloud, ArrowRight, PenTool, ShoppingCart, TrendingUp, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCompany } from '@/contexts/CompanyContext';

const iconMap = {
  Code,
  Smartphone,
  Users,
  Cloud,
  PenTool,
  ShoppingCart,
  TrendingUp,
  Wrench
};

const Services = () => {
  const { companyData } = useCompany();

  return (
    <section id="servicios" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Nuestros Servicios
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ofrecemos soluciones tecnológicas completas para impulsar tu negocio hacia el futuro digital
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {companyData.services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Code;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass-effect rounded-2xl p-8 text-center group hover:neon-glow transition-all duration-300"
              >
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-white">
                  {service.title}
                </h3>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="mb-6">
                  <span className="text-2xl font-bold gradient-text">
                    {service.price}
                  </span>
                </div>
                
                <Button
                  variant="outline"
                  className="w-full glass-effect group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:border-transparent transition-all duration-300"
                  onClick={() => {
                    const element = document.getElementById('contacto');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Solicitar Cotización
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;