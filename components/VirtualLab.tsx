import React, { useState, useRef, useEffect } from 'react';
import { Level } from '../types';

interface Component {
  id: string;
  name: string;
  type: 'cpu' | 'ram' | 'motherboard' | 'gpu' | 'storage' | 'psu' | 'case';
  image: string;
  description: string;
  position?: { x: number; y: number };
  isPlaced: boolean;
}

interface LabType {
  id: string;
  title: string;
  description: string;
  components: Component[];
  instructions: string[];
  validationRules: {
    requiredComponents: string[];
    connections: string[];
  };
}

const LAB_TYPES: LabType[] = [
  {
    id: 'hardware-assembly',
    title: 'Computer Hardware Assembly',
    description: 'Learn to assemble a computer by placing components correctly',
    components: [
      {
        id: 'cpu',
        name: 'CPU (Processor)',
        type: 'cpu',
        image: '🖥️',
        description: 'Central Processing Unit - the brain of the computer',
        isPlaced: false
      },
      {
        id: 'ram',
        name: 'RAM Memory',
        type: 'ram',
        image: '💾',
        description: 'Random Access Memory - temporary storage for running programs',
        isPlaced: false
      },
      {
        id: 'motherboard',
        name: 'Motherboard',
        type: 'motherboard',
        image: '🔧',
        description: 'Main circuit board that connects all components',
        isPlaced: false
      },
      {
        id: 'gpu',
        name: 'Graphics Card',
        type: 'gpu',
        image: '🎮',
        description: 'Graphics Processing Unit - handles video and graphics',
        isPlaced: false
      },
      {
        id: 'storage',
        name: 'Hard Drive/SSD',
        type: 'storage',
        image: '💿',
        description: 'Permanent storage for files and programs',
        isPlaced: false
      },
      {
        id: 'psu',
        name: 'Power Supply',
        type: 'psu',
        image: '⚡',
        description: 'Converts electricity and powers all components',
        isPlaced: false
      },
      {
        id: 'case',
        name: 'Computer Case',
        type: 'case',
        image: '🖼️',
        description: 'Protective housing for all computer components',
        isPlaced: false
      }
    ],
    instructions: [
      '1. Start by placing the motherboard in the case',
      '2. Install the CPU on the motherboard',
      '3. Add RAM modules to the motherboard',
      '4. Install the graphics card if needed',
      '5. Connect storage drives',
      '6. Install the power supply',
      '7. Connect all power cables and data cables'
    ],
    validationRules: {
      requiredComponents: ['motherboard', 'cpu', 'ram', 'storage', 'psu', 'case'],
      connections: []
    }
  }
];

const VirtualLab: React.FC = () => {
  const [selectedLab, setSelectedLab] = useState<LabType>(LAB_TYPES[0]);
  const [components, setComponents] = useState<Component[]>(LAB_TYPES[0].components);
  const [draggedComponent, setDraggedComponent] = useState<Component | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [feedback, setFeedback] = useState<string>('');

  const canvasRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (component: Component) => {
    if (component.isPlaced) return;
    setDraggedComponent(component);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedComponent || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Validate placement based on current step
    const isValidPlacement = validatePlacement(draggedComponent, x, y);

    if (isValidPlacement) {
      setComponents(prev => prev.map(comp =>
        comp.id === draggedComponent.id
          ? { ...comp, position: { x, y }, isPlaced: true }
          : comp
      ));

      setScore(prev => prev + 10);
      setCurrentStep(prev => prev + 1);
      setFeedback(`✅ Great! ${draggedComponent.name} placed correctly.`);

      // Check if lab is completed
      const placedComponents = components.filter(c => c.isPlaced).length + 1;
      if (placedComponents >= selectedLab.validationRules.requiredComponents.length) {
        setIsCompleted(true);
        setFeedback('🎉 Congratulations! You have successfully assembled the computer!');
      }
    } else {
      setFeedback(`❌ Try placing ${draggedComponent.name} in a different location.`);
    }

    setDraggedComponent(null);
  };

  const validatePlacement = (component: Component, x: number, y: number): boolean => {
    // Simple validation - in a real implementation, this would be more sophisticated
    // For now, just check if it's within the canvas bounds
    if (!canvasRef.current) return false;
    const rect = canvasRef.current.getBoundingClientRect();
    return x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;
  };

  const resetLab = () => {
    setComponents(selectedLab.components.map(c => ({ ...c, isPlaced: false, position: undefined })));
    setCurrentStep(0);
    setScore(0);
    setIsCompleted(false);
    setFeedback('');
  };

  const getComponentByType = (type: string) => {
    return components.find(c => c.type === type);
  };

  return (
    <div className="flex flex-col h-full max-w-7xl mx-auto px-4 py-4 md:py-8">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col flex-1">

        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div>
            <h1 className="text-xl font-black">{selectedLab.title}</h1>
            <p className="text-slate-400 text-sm myanmar-text">{selectedLab.description}</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">Score</p>
              <p className="text-2xl font-black text-indigo-400">{score}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">Step</p>
              <p className="text-2xl font-black text-green-400">{currentStep}/{selectedLab.instructions.length}</p>
            </div>
            <button
              onClick={resetLab}
              className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-xl text-sm font-bold transition-all"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Main Lab Area */}
        <div className="flex-1 flex flex-col md:flex-row">

          {/* Component Palette */}
          <div className="w-full md:w-80 bg-slate-50 border-r border-slate-200 p-4 md:p-6 flex flex-col">
            <h3 className="font-bold text-slate-900 mb-4 myanmar-text">အစိတ်အပိုင်းများ (Components)</h3>

            <div className="space-y-3 flex-1 overflow-y-auto">
              {components.map((component) => (
                <div
                  key={component.id}
                  draggable={!component.isPlaced}
                  onDragStart={() => handleDragStart(component)}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    component.isPlaced
                      ? 'bg-green-50 border-green-300 opacity-50'
                      : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{component.image}</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 myanmar-text">{component.name}</h4>
                      <p className="text-xs text-slate-500 myanmar-text">{component.description}</p>
                    </div>
                    {component.isPlaced && (
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Assembly Canvas */}
          <div className="flex-1 flex flex-col">
            {/* Instructions */}
            <div className="bg-slate-50 border-b border-slate-200 p-4">
              <h3 className="font-bold text-slate-900 mb-2 myanmar-text">လုပ်ဆောင်နည်းလမ်းများ (Instructions)</h3>
              <div className="text-sm text-slate-600 myanmar-text">
                {selectedLab.instructions[currentStep] || 'All steps completed!'}
              </div>
              {feedback && (
                <div className={`mt-2 p-2 rounded-lg text-sm font-medium ${
                  feedback.startsWith('✅') ? 'bg-green-50 text-green-800' :
                  feedback.startsWith('❌') ? 'bg-red-50 text-red-800' :
                  'bg-blue-50 text-blue-800'
                }`}>
                  {feedback}
                </div>
              )}
            </div>

            {/* Canvas Area */}
            <div
              ref={canvasRef}
              className="flex-1 bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {/* Computer Case Background */}
              <div className="absolute inset-4 bg-slate-800 rounded-2xl shadow-2xl border-4 border-slate-600">
                <div className="absolute inset-2 bg-slate-700 rounded-xl">
                  {/* Motherboard area */}
                  <div className="absolute top-8 left-8 right-8 bottom-8 bg-green-900/20 rounded-lg border-2 border-dashed border-green-400">
                    <div className="absolute top-2 left-2 text-xs text-green-300 font-bold myanmar-text">
                      Motherboard Area
                    </div>
                  </div>
                </div>
              </div>

              {/* Placed Components */}
              {components.filter(c => c.isPlaced && c.position).map((component) => (
                <div
                  key={component.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                  style={{
                    left: component.position!.x,
                    top: component.position!.y,
                  }}
                >
                  <div className="bg-white p-3 rounded-xl shadow-lg border-2 border-indigo-300 animate-in zoom-in duration-300">
                    <div className="text-3xl mb-1">{component.image}</div>
                    <div className="text-xs font-bold text-slate-900 myanmar-text text-center">
                      {component.name}
                    </div>
                  </div>
                </div>
              ))}

              {/* Completion Message */}
              {isCompleted && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                  <div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-md mx-4">
                    <div className="text-6xl mb-4">🎉</div>
                    <h2 className="text-2xl font-black text-slate-900 mb-2 myanmar-text">
                      ဂုဏ်ယူပါတယ်!
                    </h2>
                    <p className="text-slate-600 mb-6 myanmar-text">
                      ကွန်ပျူတာ စုစည်းခြင်းကို အောင်မြင်စွာ ပြီးမြောက်ခဲ့ပါပြီ။
                    </p>
                    <div className="text-3xl font-black text-indigo-600 mb-4">
                      Score: {score}
                    </div>
                    <button
                      onClick={resetLab}
                      className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualLab;
