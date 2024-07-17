  // Task.jsx
  import { useSortable } from "@dnd-kit/sortable";
  import { CSS } from "@dnd-kit/utilities";


  const Task = ({ id, component }) => {

    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id });

    const style = {
      transition,
      transform: CSS.Transform.toString(transform),
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="task"
      >
        {component}
      </div>
    );
  };

  export default Task;