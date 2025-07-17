import { Test } from '@/app/test/Test';
import { FC } from 'react';

async function getServerTime() {
  return new Date().toString() + ' server';
}

export const TestPage: FC = async () => {
  const serverTime = await getServerTime();

  return <Test serverTime={serverTime}></Test>;
};

export default TestPage;
