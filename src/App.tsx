import { useState } from 'react';

export function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='flex justify-center items-center'>
      <button type='button' onClick={() => setCount(prev => prev + 1)}>
        {count}
      </button>
    </div>
  );
}
