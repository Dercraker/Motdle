"use client";

import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

export type NotifyDto = {
  title?: string;
  message?: string;
  autoClose?: number;
};

const useNotify = () => {
  const defaultErrorTitle = "Une erreur s'est produite";
  const defaultErrorMessage = "Veuillez réessayer plus tard";
  const defaultAutoClose = 5000;
  const defaultMultipleAutoClose = 7000;

  const ErrorNotify = (error: NotifyDto) => {
    notifications.show({
      title: error.title || defaultErrorTitle,
      message: error.message || defaultErrorMessage,
      color: "red",
      icon: <IconX />,
      autoClose: error.autoClose || defaultAutoClose,
    });
  };
  const SuccessNotify = (success: NotifyDto) => {
    notifications.show({
      title: success.title,
      message: success.message,
      color: "teal",
      icon: <IconCheck />,
      autoClose: success.autoClose || defaultAutoClose,
    });
  };

  const NotifyMultipleSuccess = (successes: NotifyDto[]) => {
    successes.forEach((success, index) => {
      if (success.autoClose || success.autoClose! < defaultMultipleAutoClose)
        success.autoClose = defaultMultipleAutoClose;

      setTimeout(() => {
        SuccessNotify(success);
      }, 200 * index);
    });
  };

  const NotifyMultipleErrors = (errors: NotifyDto[]) => {
    errors.forEach((error, index) => {
      if (error.autoClose || error.autoClose! < defaultMultipleAutoClose)
        error.autoClose = defaultMultipleAutoClose;

      setTimeout(() => {
        ErrorNotify(error);
      }, 200 * index);
    });
  };

  return {
    ErrorNotify,
    SuccessNotify,
    NotifyMultipleErrors,
    NotifyMultipleSuccess,
  };
};

export default useNotify;
