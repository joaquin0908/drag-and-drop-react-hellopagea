import { useEffect, useState } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const initialTodos = JSON.parse(localStorage.getItem("todos")) || [
    {id:1, text: "aprender react"},
    {id:2, text: "aprender js"},
    {id:3, text: "aprender vue js"},
 ]
 

const App = () => { 
const [todos,setTodos] = useState(initialTodos);

useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos))
  console.log("prueba")
}, [todos])


const handelDragEnd = results => {
  if(!results.destination) return
  const startIndex = results.source.index
  const endIndex = results.destination.index

  const copyArray = [...todos]
  const [reorderItem] = copyArray.splice(startIndex, 1)

  copyArray.splice(endIndex, 0, reorderItem)
  
  setTodos(copyArray);

  
};

  return (
<DragDropContext onDragEnd={handelDragEnd}>
    <h1>Todo App</h1>
    <Droppable droppableId="todos">
        {(droppableProvider) => (
            <ul
                ref={droppableProvider.innerRef}
                {...droppableProvider.droppableProps}
            >
                {todos.map((todo, index) => (
                    <Draggable
                        key={todo.id}
                        index={index}
                        draggableId={`${todo.id}`}
                    >
                        {(draggableProvider) => (
                            <li
                                ref={draggableProvider.innerRef}
                                {...draggableProvider.draggableProps}
                                {...draggableProvider.dragHandleProps}
                            >
                                {todo.text}
                            </li>
                        )}
                    </Draggable>
                ))}
                {droppableProvider.placeholder}
            </ul>
        )}
    </Droppable>
</DragDropContext>

  );
 };
 export default App