'use client';

import { FC, useEffect, useState } from 'react';

export const Test: FC<{ serverTime: string }> = ({ serverTime }) => {
  const [clientTime, setClientTime] = useState<string>('');

  useEffect(() => {
    setClientTime(new Date().toString());
  }, []);

  console.log(clientTime);

  return (
    <>
      Test {serverTime} Client {clientTime}
    </>
  );
};
