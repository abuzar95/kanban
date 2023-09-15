import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';
import supabase from '@/config/supabase';

export default function KanbanBoard() {
  const [completed, setCompleted] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const fetchData = async () => {
    let { data, error } = await supabase.from('kanban').select('*');

    if (error) {
      alert('Error');
      console.log(error);
      setCompleted([]);
      setIncomplete([]);
      return;
    }
    console.log(data);
    setCompleted(data.filter((task) => task.completed));
    setIncomplete(data.filter((task) => !task.completed));
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (source.droppableId == destination.droppableId) return;

    if (source.droppableId == 2) {
      // let { error } = await supabase
      //   .from('kanban')
      //   .delete()
      //   .eq('id', draggableId);
      // if (!error)
      setCompleted(removeItemById(draggableId, completed));
    } else {
      // let { error } = await supabase
      //   .from('kanban')
      //   .delete()
      //   .eq('id', draggableId);
      // if (!error)
      setIncomplete(removeItemById(draggableId, incomplete));
    }

    const task = findItemById(draggableId, [...incomplete, ...completed]);

    if (destination.droppableId == 2) {
      setCompleted([{ ...task, completed: !task.completed }, ...completed]);
      const temp = completed;
      let { error } = await supabase
        .from('kanban')
        .update({ completed: !task.completed })
        .eq('id', task?.id);
      if (error) setCompleted([...temp]);
      if (!error) fetchData();
    } else {
      setIncomplete([{ ...task, completed: !task.completed }, ...incomplete]);
      const temp = incomplete;
      let { error } = await supabase
        .from('kanban')
        .update({ completed: !task.completed })
        .eq('id', task?.id);
      if (!error) setIncomplete([...temp]);
      if (!error) fetchData();
    }
  };

  function findItemById(id, array) {
    return array.find((item) => item.id == id);
  }

  function removeItemById(id, array) {
    return array.filter((item) => item.id != id);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <h2 style={{ textAlign: 'center' }}>PROGRESS BOARD</h2>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <Column title={'TO DO'} tasks={incomplete} id={'1'} />
        <Column title={'DONE'} tasks={completed} id={'2'} />
        {/* <Column title={'DELETE'} tasks={[]} id={'3'} /> */}
      </div>
    </DragDropContext>
  );
}
