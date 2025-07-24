
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Save, Share2, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const DocumentPage = () => {
  const { id: documentId } = useParams();
  const [title, setTitle] = useState('Documento sin título');
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const loadDocument = useCallback(() => {
    const savedDocument = localStorage.getItem(`doc-${documentId}`);
    if (savedDocument) {
      const { title: savedTitle, content: savedContent } = JSON.parse(savedDocument);
      setTitle(savedTitle);
      setContent(savedContent);
    }
  }, [documentId]);

  const saveDocument = useCallback(() => {
    setIsSaving(true);
    const documentData = JSON.stringify({ title, content });
    localStorage.setItem(`doc-${documentId}`, documentData);
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "¡Guardado!",
        description: "Tu documento ha sido guardado exitosamente.",
      });
    }, 1000);
  }, [documentId, title, content, toast]);

  useEffect(() => {
    loadDocument();
  }, [loadDocument]);

  useEffect(() => {
    const interval = setInterval(() => {
      saveDocument();
    }, 30000); // Auto-save every 30 seconds
    return () => clearInterval(interval);
  }, [saveDocument]);

  const quillModules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image', 'video'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        ['clean']
      ],
    },
    clipboard: {
      matchVisual: false,
    },
  }), []);

  const quillFormats = [
    'header', 'font',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'color', 'background', 'align'
  ];

  return (
    <>
      <Helmet>
        <title>{`${title} - Editor de Documentos`}</title>
        <meta name="description" content="Editor de documentos colaborativo en tiempo real." />
      </Helmet>
      <div className="min-h-screen bg-gray-100 dark:bg-slate-900 flex flex-col">
        <header className="bg-white dark:bg-slate-800/50 dark:border-b dark:border-slate-700 shadow-sm sticky top-0 z-20">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300">
                  <Home className="w-5 h-5" />
                </Button>
              </Link>
              <Input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg font-semibold border-none focus:ring-0 bg-transparent text-gray-800 dark:text-white"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" className="text-gray-600 dark:text-gray-300">
                <Share2 className="w-4 h-4 mr-2" />
                Compartir
              </Button>
              <Button onClick={saveDocument} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Guardando...' : 'Guardar'}
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-grow container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-2"
          >
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={quillModules}
              formats={quillFormats}
              className="document-editor"
            />
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default DocumentPage;