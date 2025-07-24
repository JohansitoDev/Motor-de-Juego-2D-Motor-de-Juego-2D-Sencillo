
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Target, Lightbulb, Heart } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Target,
      title: 'Enfoque en Resultados',
      description: 'Nos comprometemos a entregar soluciones que generen valor real para tu negocio'
    },
    {
      icon: Lightbulb,
      title: 'Innovación Constante',
      description: 'Utilizamos las últimas tecnologías y metodologías para mantenerte a la vanguardia'
    },
    {
      icon: Heart,
      title: 'Pasión por la Calidad',
      description: 'Cada proyecto es tratado con dedicación y atención al detalle'
    }
  ];

  return (
    <section id="nosotros" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
                Sobre Nosotros
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Somos un equipo apasionado de desarrolladores y consultores tecnológicos 
                dedicados a transformar ideas en soluciones digitales innovadoras. Con años 
                de experiencia en el sector, hemos ayudado a empresas de todos los tamaños 
                a alcanzar sus objetivos tecnológicos.
              </p>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="glass-effect rounded-2xl p-6"
            >
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold gradient-text mb-2">50+</div>
                  <div className="text-gray-300">Proyectos Completados</div>
                </div>
                <div>
                  <div className="text-3xl font-bold gradient-text mb-2">98%</div>
                  <div className="text-gray-300">Satisfacción del Cliente</div>
                </div>
                <div>
                  <div className="text-3xl font-bold gradient-text mb-2">5+</div>
                  <div className="text-gray-300">Años de Experiencia</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative">
              <img  
                className="rounded-2xl shadow-2xl w-full"
                alt="Oficina moderna de JoSoftSolution con equipo trabajando"
               src="https://images.unsplash.com/photo-1651009188116-bb5f80eaf6aa" />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-6 -right-6 glass-effect rounded-2xl p-6 max-w-xs"
              >
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                  <div>
                    <div className="font-semibold text-white">Certificados</div>
                    <div className="text-sm text-gray-300">ISO 9001 & CMMI</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
