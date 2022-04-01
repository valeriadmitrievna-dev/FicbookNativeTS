import React from "react";

export const usePromise = <T = unknown>(
  promiseOrFunction: Promise<any> | Function | undefined,
  defaultValue?: any,
  deps?: any
) => {
  type HookState = {
    value: T;
    error: any;
    isPending: boolean;
  };
  const [state, setState] = React.useState<HookState>({
    value: defaultValue,
    error: null,
    isPending: true,
  });

  React.useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed && !state.isPending) {
      setState(prev => ({
        ...prev,
        isPending: true,
      }));
    }

    if (!!promiseOrFunction) {
      const promise =
        typeof promiseOrFunction === "function"
          ? promiseOrFunction()
          : promiseOrFunction;
      promise
        .then((value: any) =>
          isSubscribed
            ? setState({ value, error: null, isPending: false })
            : null
        )
        .catch((error: any) =>
          isSubscribed
            ? setState({ value: defaultValue, error: error, isPending: false })
            : null
        );
    }

    return () => {
      isSubscribed = false;
    };
  }, deps);

  const { value, error, isPending } = state;
  return [value, error, isPending];
};
