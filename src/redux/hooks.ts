import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { type RootState, type AppDispatch } from './store';

// NOTE: Use throughout the app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
