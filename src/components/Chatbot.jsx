
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "¡Hola! Soy el asistente virtual de JoSoftSolution. ¿En qué puedo ayudarte hoy?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const { toast } = useToast();

  const predefinedResponses = {
    'servicios': 'Ofrecemos desarrollo web, aplicaciones móviles, consultoría IT y soluciones en la nube. ¿Te interesa algún servicio en particular?',
    'precios': 'Nuestros precios varían según el proyecto. El desarrollo web desde $2,500, apps móviles desde $5,000, y consultoría desde $150/hora. ¿Quieres una cotización personalizada?',
    'contacto': 'Puedes contactarnos en josoftsolutiom@gmail.com o al +1 (555) 123-4567. También puedes llenar el formulario de contacto en nuestra página.',
    'empleo': 'Estamos siempre buscando talento. Puedes aplicar usando el botón "Trabajar con nosotros" en nuestra página principal.',
    'pasantia': 'Ofrecemos pasantías para estudiantes. Usa el botón "Pasantías" para enviar tu solicitud.',
    'ubicacion': 'Estamos ubicados en Av. Tecnología 123, Ciudad Digital.',
    'horarios': 'Nuestros horarios son: Lunes a Viernes 9:00 AM - 6:00 PM, Sábados 10:00 AM - 2:00 PM.',
    'default': 'Gracias por tu mensaje. Para consultas específicas, te recomiendo contactar directamente a nuestro equipo usando el formulario de contacto.'
  };

  const getResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('servicio') || lowerMessage.includes('que hacen')) {
      return predefinedResponses.servicios;
    }
    if (lowerMessage.includes('precio') || lowerMessage.includes('costo') || lowerMessage.includes('cuanto')) {
      return predefinedResponses.precios;
    }
    if (lowerMessage.includes('contacto') || lowerMessage.includes('telefono') || lowerMessage.includes('email')) {
      return predefinedResponses.contacto;
    }
    if (lowerMessage.includes('empleo') || lowerMessage.includes('trabajo') || lowerMessage.includes('vacante')) {
      return predefinedResponses.empleo;
    }
    if (lowerMessage.includes('pasantia') || lowerMessage.includes('practica') || lowerMessage.includes('internship')) {
      return predefinedResponses.pasantia;
    }
    if (lowerMessage.includes('ubicacion') || lowerMessage.includes('direccion') || lowerMessage.includes('donde')) {
      return predefinedResponses.ubicacion;
    }
    if (lowerMessage.includes('horario') || lowerMessage.includes('hora') || lowerMessage.includes('cuando')) {
      return predefinedResponses.horarios;
    }
    
    return predefinedResponses.default;
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simular respuesta del bot
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getResponse(inputMessage),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.div
        className="chatbot-bubble"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg pulse-glow"
        >
          <MessageCircle className="w-8 h-8" />
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] glass-effect rounded-2xl border border-gray-600 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-600">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Asistente Virtual</h3>
                  <p className="text-sm text-green-400">En línea</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.isBot ? 'bg-blue-600' : 'bg-purple-600'}`}>
                      {message.isBot ? <Bot className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-white" />}
                    </div>
                    <div className={`p-3 rounded-2xl ${message.isBot ? 'bg-gray-700 text-white' : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'}`}>
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-600">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escribe tu mensaje..."
                  className="bg-gray-800/50 border-gray-600 text-white"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
