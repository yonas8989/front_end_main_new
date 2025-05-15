// src/redux/store.d.ts
import { RootState } from './store';

declare module 'redux' {
  interface DefaultRootState extends RootState {}
}