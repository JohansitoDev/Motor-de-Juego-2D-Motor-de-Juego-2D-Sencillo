import React, { createContext, useState, useContext, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

const GameStateContext = createContext();

export const useGameState = () => useContext(GameStateContext);

export const GameStateProvider = ({ children }) => {
  const [assets, setAssets] = useState([]);
  const [gameObjects, setGameObjects] = useState([]);
  const [selectedObject, setSelectedObject] = useState(null);

  const addAsset = (name, src) => {
    const newAsset = { id: uuidv4(), name, src, type: 'image' };
    setAssets(prevAssets => [...prevAssets, newAsset]);
  };

  const addGameObject = useCallback((asset, position) => {
    const newGameObject = {
      id: uuidv4(),
      assetId: asset.id,
      name: asset.name,
      x: position.x,
      y: position.y,
      width: 100,
      height: 100,
      rotation: 0,
    };
    setGameObjects(prev => [...prev, newGameObject]);
    return newGameObject;
  }, []);

  const updateGameObject = (id, newProps) => {
    setGameObjects(prev =>
      prev.map(obj => (obj.id === id ? { ...obj, ...newProps } : obj))
    );
    if (selectedObject?.id === id) {
      setSelectedObject(prev => ({...prev, ...newProps}));
    }
  };

  const selectObject = (obj) => {
    setSelectedObject(obj);
  };
  
  const deselectObject = () => {
    setSelectedObject(null);
  };

  const value = {
    assets,
    addAsset,
    gameObjects,
    addGameObject,
    updateGameObject,
    selectedObject,
    selectObject,
    deselectObject,
  };

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
};