import { useState } from 'react';

const useModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsOpen((state) => !state);
  };

  return { isOpen, toggleModal };
};

export default useModal;
