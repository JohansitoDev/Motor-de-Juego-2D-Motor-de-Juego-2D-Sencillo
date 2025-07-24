import React, { createContext, useContext, useState, useEffect } from 'react';

const CompanyContext = createContext();

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompany debe ser usado dentro de CompanyProvider');
  }
  return context;
};

export const CompanyProvider = ({ children }) => {
  const [companyData, setCompanyData] = useState(() => {
    const saved = localStorage.getItem('josoftCompanyData');
    return saved ? JSON.parse(saved) : {
      name: 'JoSoftSolution',
      description: 'Transformamos ideas en soluciones tecnológicas innovadoras',
      email: 'josoftsolutiom@gmail.com',
      phone: '+1 (555) 123-4567',
      address: 'Av. Tecnología 123, Ciudad Digital',
      services: [
        {
          id: 1,
          title: 'Desarrollo Web',
          description: 'Creamos sitios web modernos y aplicaciones web responsivas',
          icon: 'Code',
          price: 'Desde $2,500'
        },
        {
          id: 2,
          title: 'Aplicaciones Móviles',
          description: 'Desarrollo de apps nativas e híbridas para iOS y Android',
          icon: 'Smartphone',
          price: 'Desde $5,000'
        },
        {
          id: 3,
          title: 'Consultoría IT',
          description: 'Asesoramiento tecnológico para optimizar tu negocio',
          icon: 'Users',
          price: 'Desde $150/hora'
        },
        {
          id: 4,
          title: 'Cloud Solutions',
          description: 'Migración y gestión de infraestructura en la nube',
          icon: 'Cloud',
          price: 'Desde $1,200'
        },
        {
          id: 5,
          title: 'Diseño UI/UX',
          description: 'Diseño de interfaces intuitivas y experiencias de usuario memorables.',
          icon: 'PenTool',
          price: 'Desde $1,800'
        },
        {
          id: 6,
          title: 'Soluciones E-commerce',
          description: 'Creamos tiendas online potentes y seguras para tu negocio.',
          icon: 'ShoppingCart',
          price: 'Desde $3,500'
        },
        {
          id: 7,
          title: 'SEO y Marketing Digital',
          description: 'Posicionamos tu marca en internet para que llegues a más clientes.',
          icon: 'TrendingUp',
          price: 'Desde $800/mes'
        },
        {
          id: 8,
          title: 'Mantenimiento y Soporte',
          description: 'Aseguramos el funcionamiento óptimo de tus sistemas 24/7.',
          icon: 'Wrench',
          price: 'Desde $300/mes'
        }
      ],
      team: [
        {
          id: 1,
          name: 'Johan Mancebo',
          position: 'CEO & Fundador',
          image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400'
        },
        {
          id: 2,
          name: 'Carlos Rodríguez',
          position: 'CTO',
          image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'
        },
        {
          id: 3,
          name: 'María López',
          position: 'Lead Developer',
          image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400'
        }
      ]
    };
  });

  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('josoftApplications');
    return saved ? JSON.parse(saved) : [];
  });

  const [internships, setInternships] = useState(() => {
    const saved = localStorage.getItem('josoftInternships');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('josoftCompanyData', JSON.stringify(companyData));
  }, [companyData]);

  useEffect(() => {
    localStorage.setItem('josoftApplications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('josoftInternships', JSON.stringify(internships));
  }, [internships]);

  const updateCompanyData = (newData) => {
    setCompanyData(prev => ({ ...prev, ...newData }));
  };

  const addService = (service) => {
    const newService = {
      ...service,
      id: Date.now()
    };
    setCompanyData(prev => ({
      ...prev,
      services: [...prev.services, newService]
    }));
  };

  const updateService = (id, updatedService) => {
    setCompanyData(prev => ({
      ...prev,
      services: prev.services.map(service => 
        service.id === id ? { ...service, ...updatedService } : service
      )
    }));
  };

  const deleteService = (id) => {
    setCompanyData(prev => ({
      ...prev,
      services: prev.services.filter(service => service.id !== id)
    }));
  };

  const addTeamMember = (member) => {
    const newMember = {
      ...member,
      id: Date.now()
    };
    setCompanyData(prev => ({
      ...prev,
      team: [...prev.team, newMember]
    }));
  };

  const updateTeamMember = (id, updatedMember) => {
    setCompanyData(prev => ({
      ...prev,
      team: prev.team.map(member => 
        member.id === id ? { ...member, ...updatedMember } : member
      )
    }));
  };

  const deleteTeamMember = (id) => {
    setCompanyData(prev => ({
      ...prev,
      team: prev.team.filter(member => member.id !== id)
    }));
  };

  const addApplication = (application) => {
    const newApplication = {
      ...application,
      id: Date.now(),
      date: new Date().toISOString(),
      status: 'pending'
    };
    setApplications(prev => [newApplication, ...prev]);
  };

  const addInternship = (internship) => {
    const newInternship = {
      ...internship,
      id: Date.now(),
      date: new Date().toISOString(),
      status: 'pending'
    };
    setInternships(prev => [newInternship, ...prev]);
  };

  const updateApplicationStatus = (id, status) => {
    setApplications(prev => 
      prev.map(app => app.id === id ? { ...app, status } : app)
    );
  };

  const updateInternshipStatus = (id, status) => {
    setInternships(prev => 
      prev.map(intern => intern.id === id ? { ...intern, status } : intern)
    );
  };

  const deleteApplication = (id) => {
    setApplications(prev => prev.filter(app => app.id !== id));
  };

  const deleteInternship = (id) => {
    setInternships(prev => prev.filter(intern => intern.id !== id));
  };

  const value = {
    companyData,
    applications,
    internships,
    updateCompanyData,
    addService,
    updateService,
    deleteService,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    addApplication,
    addInternship,
    updateApplicationStatus,
    updateInternshipStatus,
    deleteApplication,
    deleteInternship
  };

  return (
    <CompanyContext.Provider value={value}>
      {children}
    </CompanyContext.Provider>
  );
};