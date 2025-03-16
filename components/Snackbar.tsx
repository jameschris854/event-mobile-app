import useSnackbarStore from '@/hooks/stores/useSnackbarStore';
import React from 'react';
import { Snackbar } from 'react-native-paper';

const GlobalSnackbar = () => {
  const { visible, message, duration, hideSnackbar } = useSnackbarStore();

  return (
    <Snackbar
      visible={visible}
      onDismiss={hideSnackbar}
      duration={duration}
      action={{
        label: 'Dismiss'
    }}
    >
      {message}
    </Snackbar>
  );
};

export default GlobalSnackbar;
