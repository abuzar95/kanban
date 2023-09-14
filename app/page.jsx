'use client';

import Kanbanboard from '@/components/Kanbanboard';
import Task from '@/components/Task';

export default function Page() {
  return (
    <>
      <Kanbanboard />
      {/* <Task task={{ id: 123, title: 'Hi' }} index={1} /> */}
    </>
  );
}
