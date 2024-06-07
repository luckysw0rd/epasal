import React, { Component, useEffect, useState } from "react";
import { StoreProvider, useStore } from "./T1Context";
import T1Navbar from "./T1Navbar";
import AboutPage from "./T1HeroSection";
import ColorPicker from "./ColorPicker";
import StoreHeader from "./StoreHeader";
import CategorySelector from "./T1Category";
import { useMediaQuery } from "react-responsive";
import SecondaryBanner from "./T1SecondaryBanner";
import OfferBanner from "./T1OfferBanner";
import Footer from "./Footer/T1Footer";
import SaveStoreButton from "./SaveButton/SaveStoreButton";
import Loading from "./Loading/Loading";
import Task from "./Task/Task";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import T1SubProduct from "./SubProduct/T1SubProduct";
import T1ProductList from './T1ProductList';
import Editor from "../../Components/Editor/Editor";

const EStore = ({ Passedstore }) => {
  const [tasks, setTasks] = useState([
    // { id: 1, component: <StoreHeader /> },
    { id: 2, component: <T1Navbar /> },
    { id: 3, component: <AboutPage /> },
    { id: 4, component: <Editor /> },
    { id: 5, component: <T1SubProduct /> },
    { id: 6, component: <SecondaryBanner /> },
    { id: 7, component: <T1ProductList /> },
    { id: 8, component: <OfferBanner /> },
    { id: 9, component: <Footer /> },
  ]);

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
    console.log({ event });
    if (active.id === over.id) return;

    setTasks((tasks) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(tasks, originalPos, newPos);
    });
  };

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);
  const { store } = useStore();
  const { previewMode } = store;
  const { fetchedFromBackend } = store;
  // Ensure useState and useMediaQuery are called unconditionally
  const [showColorPicker, setShowColorPicker] = useState(true);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  if (
    window.location.pathname.includes("/store/") &&
    !store.fetchedFromBackend
  ) {
    return (
      <div className=" w-screen">
        <Loading></Loading>
      </div>
    );
  } else
    return (
      store && (
        <div
          className=" h-full overflow-auto"
          style={{ backgroundColor: store.color.backgroundThemeColor }}
        >
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              disabled={true}
              items={tasks}
              strategy={horizontalListSortingStrategy}
            >
              {/* <Task id={tasks[0].id} component={<Comp1 />} />
          <Task id={tasks[1].id} component={<Comp2 />} />
          <Task id={tasks[2].id} component={<Comp3 />} /> */}
              {tasks.map((item, index) => {
                return (
                  <div key={index} style={{ width: "100%" }}>
                    <Task
                      id={tasks[index].id}
                      component={tasks[index].component}
                    />
                  </div>
                );
              })}
            </SortableContext>
          </DndContext>
          <SaveStoreButton></SaveStoreButton>
        </div>
      )
    );
};

const EStoreWithStoreProvider = (passedStore = { passedStore }) => {
  useEffect(() => {
    console.log(passedStore);
  }, [passedStore]);
  return (
    <StoreProvider passedStore={passedStore}>
      <EStore />
    </StoreProvider>
  );
};

export default EStoreWithStoreProvider;
