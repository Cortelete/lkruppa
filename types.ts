

import React from 'react';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface ModalState {
  isOpen: boolean;
  title: string;
  content: React.ReactNode;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string | null; // Allow null to hide the button
  hideActions?: boolean;
  confirmButtonClass?: string;
}