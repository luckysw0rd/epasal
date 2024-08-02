import React, { useState, useEffect } from "react";
import { StoreProvider, useStore } from "./T1Context";
import T1Navbar from "./T1Navbar";
import AboutPage from "./T1HeroSection";
import ColorPicker from "./ColorPicker";
import StoreHeader from "./StoreHeader";
import CategorySelector from "./T1Category";
import { useMediaQuery } from "react-responsive";
import OfferBanner from "./T1OfferBanner";
import Footer from "./Footer/T1Footer";
import SaveStoreButton from "./SaveButton/SaveStoreButton";
import Loading from "../../Components/Loading/Loading";
import Task from "./Task/Task";
import ModernReactPlayer from "./AudioPlayer/ModernReactPlayer";
import { DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors, closestCorners } from "@dnd-kit/core";
import { arrayMove, horizontalListSortingStrategy, SortableContext, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import T1SubProduct from "./SubProduct/T1SubProduct";
import T1ProductList from './T1ProductList';
import Editor from "../../Components/Editor/Editor";
import T1ThirdBanner from "./T1ThirdBanner";
import T1NewProducts from "./T1NewProducts";
import T1SecondaryBanner from "./T1SecondaryBanner";

const EStore = ({ Passedstore }) => {
  const [tasks, setTasks] = useState([
    { id: 2, component: <T1Navbar /> },
    { id: 3, component: <AboutPage /> },
    { id: 4, component: null },
    { id: 5, component: <T1SubProduct /> },
    { id: 6, component: <T1ThirdBanner /> },
    { id: 7, component: <T1NewProducts /> },
    { id: 8, component: <T1SecondaryBanner /> },
    { id: 9, component: <T1ProductList /> },
    { id: 10, component: <OfferBanner /> },
    { id: 11, component: <Footer /> },
    { id: 12, component: <ModernReactPlayer /> },
  ]);

  const [currentStep, setCurrentStep] = useState(0);
  const [isOverlayActive, setIsOverlayActive] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);
  const [instructionsCompleted, setInstructionsCompleted] = useState(false);

  const addTask = (component) => {
    setTasks((tasks) => [...tasks, { id: tasks.length + 1, component }]);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getTaskPos = (id) => tasks.findIndex((task) => task.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id === over.id) return;

    setTasks((tasks) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);
      return arrayMove(tasks, originalPos, newPos);
    });
  };

  const { store, isLoading } = useStore();
  const { previewMode } = store;
  const { fetchedFromBackend } = store;

  const [showColorPicker, setShowColorPicker] = useState(true);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  useEffect(() => {
    // Check if instructions have been completed
    const completedInstructions = localStorage.getItem('instructionsCompleted');
    if (completedInstructions === 'true') {
      setInstructionsCompleted(true);
      setIsOverlayActive(false);
    }

    // Check if the current path includes "/buildstore"
    setShowOverlay(window.location.pathname.includes("/buildstore"));
  }, []);

  useEffect(() => {
    // Update local storage whenever instructionsCompleted changes
    localStorage.setItem('instructionsCompleted', instructionsCompleted.toString());
  }, [instructionsCompleted]);

  useEffect(() => {}, [tasks]);

  const handleOverlayClick = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      completeInstructions();
    }
  };

  const handleSkip = () => {
    completeInstructions();
  };

  const completeInstructions = () => {
    setCurrentStep(tasks.length);
    setIsOverlayActive(false);
    setInstructionsCompleted(true);
  };

  const handleDesignClick = () => {
    setCurrentStep(2);
    setIsOverlayActive(true);
  };

  const handleContentClick = () => {
    setCurrentStep(3);
    completeInstructions();
  };

  useEffect(() => {
    const previewButton = document.getElementById('navbarButtonId');
    const designButton = document.getElementById('designButtonId');
    const contentButton = document.getElementById('contentButtonId');

    const handlePreviewClick = () => {
      setCurrentStep(1);
      setIsOverlayActive(true);
    };

    if (previewButton) {
      previewButton.addEventListener('click', handlePreviewClick);
    }

    if (designButton) {
      designButton.addEventListener('click', handleDesignClick);
    }

    if (contentButton) {
      contentButton.addEventListener('click', handleContentClick);
    }

    return () => {
      if (previewButton) {
        previewButton.removeEventListener('click', handlePreviewClick);
      }

      if (designButton) {
        designButton.removeEventListener('click', handleDesignClick);
      }

      if (contentButton) {
        contentButton.removeEventListener('click', handleContentClick);
      }
    };
  }, []);

  useEffect(() => {
    setTasks(prevTasks => {
      return prevTasks.map(task => {
        if (task.id === 4) {
          return { 
            ...task, 
            component: <Editor 
              handleDesignClick={handleDesignClick} 
              handleContentClick={handleContentClick}
              currentStep={currentStep}
            /> 
          };
        }
        return task;
      });
    });
  }, [currentStep]);

  const renderOverlay = () => {
    if (!showOverlay || instructionsCompleted) return null;
  
    if (currentStep === 0) {
      return (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-75 z-40 mt-20"></div>
          <div className="fixed inset-0 flex flex-col items-center justify-center mt-20 z-50 text-white text-xl px-4 text-center sm:text-left">
            <div>
              Click on the <strong className="text-blue-500">Preview Mode</strong> button to start building
              <div className="text-lg mt-2">
                This will open up the editor for your webpage where you can change almost everything about the webpage.
              </div>
            </div>
            <button
              onClick={handleSkip}
              className="absolute bottom-4 left-4 px-4 py-2 bg-red-500 hover:bg-red-700 text-white font-bold rounded"
            >
              Skip
            </button>
          </div>
        </>
      );
    } else if (currentStep === 1) {
      return (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-75 z-40 mr-80"></div>
          <div className="fixed inset-0 flex flex-col items-center justify-center mr-80 z-50 text-white text-xl px-4 text-center sm:text-left">
            <div>
              Click on the <strong>Design</strong> button to start adding design to your page
              <div className="hidden sm:block text-lg mt-2">
                This is where you add the design to your page.
              </div>
            </div>
            <button
              onClick={handleSkip}
              className="absolute bottom-4 left-4 px-4 py-2 bg-red-500 hover:bg-red-700 text-white font-bold rounded"
            >
              Skip
            </button>
          </div>
        </>
      );
    } else if (currentStep === 2) {
      return (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-75 z-40 mr-80"></div>
          <div className="fixed inset-0 flex flex-col items-center justify-center mr-80 z-50 text-white text-xl px-4 text-center sm:text-left">
            <div>
              Click on the <strong>Content</strong> button to add content to your page
              <div className="hidden sm:block text-lg mt-2">
                This is where you add the content to your page.
              </div>
            </div>
            <button
              onClick={handleSkip}
              className="absolute bottom-4 left-4 px-4 py-2 bg-red-500 hover:bg-red-700 text-white font-bold rounded"
            >
              Skip
            </button>
          </div>
        </>
      );
    } else {
      return null;
    }
  };
  
    

  if (window.location.pathname.includes("/store/") && !store.fetchedFromBackend) {
    return (
      <div className="w-screen">
        <Loading />
      </div>
    );
  } else {
    return (
      store && (
        <div className="h-full overflow-auto" style={{ backgroundColor: store.color.backgroundThemeColor }}>
          {isOverlayActive && !instructionsCompleted && renderOverlay()}
          <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
            <SortableContext disabled={true} items={tasks} strategy={horizontalListSortingStrategy}>
              {tasks.map((item, index) => (
                <div key={index} className="" style={{ width: "100%" }}>
                  <Task id={tasks[index].id} component={tasks[index].component} />
                </div>
              ))}
            </SortableContext>
          </DndContext>
          
          <SaveStoreButton />
        </div>
      )
    );
  }
};

const EStoreWithStoreProvider = (passedStore = { passedStore }) => {
  useEffect(() => {}, [passedStore]);
  return (
    <StoreProvider passedStore={passedStore}>
      <EStore />
    </StoreProvider>
  );
};

export default EStoreWithStoreProvider;