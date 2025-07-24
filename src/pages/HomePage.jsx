import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header.jsx';
import Hero from '@/components/Hero.jsx';
import Services from '@/components/Services.jsx';
import About from '@/components/About.jsx';
import Team from '@/components/Team.jsx';
import Contact from '@/components/Contact.jsx';
import Footer from '@/components/Footer.jsx';
import JobApplicationModal from '@/components/JobApplicationModal.jsx';
import InternshipModal from '@/components/InternshipModal.jsx';
import Chatbot from '@/components/Chatbot.jsx';

const HomePage = () => {
  const [showJobModal, setShowJobModal] = useState(false);
  const [showInternshipModal, setShowInternshipModal] = useState(false);

  return (
    <>
      <Helmet>
        <title>JoSoftSolution - Soluciones Tecnológicas Innovadoras</title>
        <meta name="description" content="JoSoftSolution ofrece servicios de desarrollo de software, consultoría tecnológica y soluciones digitales innovadoras. Únete a nuestro equipo o solicita una pasantía." />
      </Helmet>
      
      <div className="min-h-screen">
        <Header 
          onJobClick={() => setShowJobModal(true)}
          onInternshipClick={() => setShowInternshipModal(true)}
        />
        
        <main>
          <Hero />
          <Services />
          <About />
          <Team />
          <Contact />
        </main>
        
        <Footer />
        
        <JobApplicationModal 
          isOpen={showJobModal}
          onClose={() => setShowJobModal(false)}
        />
        
        <InternshipModal 
          isOpen={showInternshipModal}
          onClose={() => setShowInternshipModal(false)}
        />
        
        <Chatbot />
      </div>
    </>
  );
};

export default HomePage;