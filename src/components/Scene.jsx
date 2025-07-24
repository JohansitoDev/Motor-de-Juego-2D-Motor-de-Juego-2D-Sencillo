import React, { useRef, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { Stage, Layer, Image as KonvaImage, Transformer } from 'react-konva';
import { useGameState } from '@/contexts/GameStateContext';
import useImage from 'use-image';

const GameObject = ({ object, onSelect, isSelected, onDragEnd, onTransformEnd }) => {
  const [image] = useImage(object.src, 'anonymous');
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);
  
  const handleDragEnd = (e) => {
    onDragEnd(object.id, { x: e.target.x(), y: e.target.y() });
  };
  
  const handleTransformEnd = () => {
    const node = shapeRef.current;
    if (node) {
      const scaleX = node.scaleX();
      const scaleY = node.scaleY();
      node.scaleX(1);
      node.scaleY(1);

      onTransformEnd(object.id, {
        x: node.x(),
        y: node.y(),
        width: Math.max(5, node.width() * scaleX),
        height: Math.max(5, node.height() * scaleY),
        rotation: node.rotation(),
      });
    }
  };

  return (
    <>
      <KonvaImage
        onClick={() => onSelect(object.id)}
        onTap={() => onSelect(object.id)}
        ref={shapeRef}
        image={image}
        x={object.x}
        y={object.y}
        width={object.width}
        height={object.height}
        rotation={object.rotation}
        draggable
        onDragEnd={handleDragEnd}
        onTransformEnd={handleTransformEnd}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};


const Scene = () => {
    const { 
      assets, 
      gameObjects, 
      addGameObject, 
      selectedObjectId, 
      selectObject, 
      deselectObject,
      updateGameObject 
    } = useGameState();
    const stageRef = useRef();

    const [, drop] = useDrop(() => ({
        accept: 'asset',
        drop: (item, monitor) => {
            const stage = stageRef.current;
            if (!stage) return;
            const stagePos = stage.getPointerPosition() ?? { x: 100, y: 100 };
            const asset = assets.find(a => a.id === item.id);
            if (asset) {
                const newObj = addGameObject(asset.id, stagePos);
                selectObject(newObj.id);
            }
        },
    }));

    const handleDragEnd = (id, position) => {
        updateGameObject(id, { x: position.x, y: position.y });
    };

    const handleTransformEnd = (id, properties) => {
        updateGameObject(id, properties);
    };

    const checkDeselect = (e) => {
      const clickedOnEmpty = e.target === e.target.getStage();
      if (clickedOnEmpty) {
        deselectObject();
      }
    };
    
    const objectsWithSrc = gameObjects.map(obj => {
        const asset = assets.find(a => a.id === obj.assetId);
        return { ...obj, src: asset?.src };
    }).filter(obj => obj.src);

    return (
        <div ref={drop} className="w-full h-full bg-gray-700 rounded-lg overflow-hidden shadow-inner">
            <Stage
                width={window.innerWidth * 0.5} 
                height={window.innerHeight * 0.7}
                ref={stageRef}
                onMouseDown={checkDeselect}
                onTouchStart={checkDeselect}
            >
                <Layer>
                    {objectsWithSrc.map(obj => (
                        <GameObject
                            key={obj.id}
                            object={obj}
                            onSelect={selectObject}
                            isSelected={selectedObjectId === obj.id}
                            onDragEnd={handleDragEnd}
                            onTransformEnd={handleTransformEnd}
                        />
                    ))}
                </Layer>
            </Stage>
        </div>
    );
};

export default Scene;