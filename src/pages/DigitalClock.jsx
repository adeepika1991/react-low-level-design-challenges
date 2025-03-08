import React, { useEffect, useState } from 'react'

const DigitalClock = () => {
  const [ time, setTime ] = useState(new Date());

  useEffect(() => {
    let timeout;
    timeout = setInterval(() => {
      setTime(new Date());
    }, 10);

    return () => {
      clearInterval(timeout)
    }
  }, [time]);

  const hour = time.getHours();
  const minute = time.getMinutes();
  const sec = time.getSeconds();


  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-200 via-orange-200 to-red-200 text-gray-800">
      <h1 className="text-4xl font-bold">Digital Clock</h1>
      <div className='text-2xl font-bold'>
      {hour}:{minute}:{sec} <br />
      </div>
    </div>
  )
}

export default DigitalClock