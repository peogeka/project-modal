import React, { useState } from 'react';
import DailyNormaModal from './DailyNormaModal';

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <DailyNormaModal isOpen={modalOpen} onClose={closeModal} />
    </div>
  );
};

export default App;