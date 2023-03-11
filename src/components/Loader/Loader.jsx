import React from 'react';
import css from './Loader.module.css';
import { InfinitySpin } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <div className={css.wrapper}>
      <InfinitySpin width="200" color="#3f51b5" />
    </div>
  );
};
