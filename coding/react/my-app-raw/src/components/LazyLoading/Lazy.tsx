import type React from 'react';
import { lazy, Suspense } from 'react';

const UserProfile = lazy<React.FC>(
  // recibe una promesa que devuelve un objeto donde se define el componente en el default
  () =>
    new Promise<{ default: React.FC }>((res) => {
      setTimeout(() => {
        import('./UserProfile.tsx').then((module) => {
          res({ default: module.UserProfile });
        });
      }, 5000);
    })
);

export const Lazy: React.FC = () => {
  return (
    <Suspense fallback={<>Loading</>}>
      <UserProfile />
    </Suspense>
  );
};
