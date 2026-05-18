import { useState, useEffect } from 'react';

const useDisplayName = () => {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    setName(localStorage.getItem("fname"));
  }, []);

  return name;
};

export default useDisplayName;