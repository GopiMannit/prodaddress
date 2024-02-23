import React, { useEffect, useState } from 'react';
import randomColor from 'randomcolor';


  const [backgroundColor, setBackgroundColor] = useState('');

  useEffect(() => {
    const color = randomColor(); // Generate a random color
    setBackgroundColor(color); // Set the background color
  }, []);
