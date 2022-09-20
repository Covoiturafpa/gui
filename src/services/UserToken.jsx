import { useState } from 'react';
import { createContainer } from 'react-tracked';

const useValue = () => useState({});

export const {
  Provider,
  useTrackedState,
  useUpdate: useSetState
} = createContainer(useValue);