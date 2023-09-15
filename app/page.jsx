'use client';

import Kanbanboard from '@/components/Kanbanboard';
import Modal from '@/components/Modal';
import supabase from '@/config/supabase';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 320px;
  padding: 2rem;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;

const Button = styled.button`
  padding: 10px 14px;
  border: none;
  background: #add8e6;
  border-radius: 5px;
`;

export default function Page() {
  const [showModal, setShowModal] = useState(false);
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

  return (
    <Container>
      <Header>
        <h2 style={{ textAlign: 'center' }}>PROGRESS BOARD</h2>
        <Button className='btn btn-primary' onClick={() => setShowModal(true)}>
          Add Task
        </Button>
      </Header>
      <Kanbanboard
        completed={completed}
        setCompleted={setCompleted}
        incomplete={incomplete}
        setIncomplete={setIncomplete}
        fetchData={fetchData}
      />
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        fetchData={fetchData}
      />
      {/* <Task task={{ id: 123, title: 'Hi' }} index={1} /> */}
    </Container>
  );
}
