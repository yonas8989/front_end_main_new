// types.d.ts
declare module './components/SongActions' {
  import { FC } from 'react';
  interface SongActionsProps {
    onEdit: () => void;
    onDelete: () => void;
    onView: () => void;
  }
  export const SongActions: FC<SongActionsProps>;
}