import React from 'react';
import { Helmet } from 'react-helmet';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Header from '@/components/Header';
import AssetPanel from '@/components/AssetPanel';
import Scene from '@/components/Scene';
import PropertiesPanel from '@/components/PropertiesPanel';
import { Toaster } from '@/components/ui/toaster';
import { GameStateProvider } from '@/contexts/GameStateContext';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <GameStateProvider>
        <Helmet>
          <title>Motor de Juegos 2D - Crea tu Juego</title>
          <meta name="description" content="Un motor de juegos 2D sencillo para crear videojuegos directamente desde la web con funcionalidad de arrastrar y soltar." />
        </Helmet>
        <div className="flex flex-col h-screen bg-gray-800 text-white font-sans">
          <Header />
          <main className="flex flex-1 overflow-hidden">
            <AssetPanel />
            <div className="flex-1 flex items-center justify-center p-4 bg-gray-900">
              <Scene />
            </div>
            <PropertiesPanel />
          </main>
          <Toaster />
        </div>
      </GameStateProvider>
    </DndProvider>
  );
}

export default App;