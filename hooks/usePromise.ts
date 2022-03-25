import React from "react";

export const usePromise = <T = unknown>(
  promiseOrFunction: Promise<any> | Function,
  defaultValue?: any,
  deps?: any,
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
    const promise =
      typeof promiseOrFunction === "function"
        ? promiseOrFunction()
        : promiseOrFunction;
    let isSubscribed = true;
    promise
      .then((value: any) =>
        isSubscribed ? setState({ value, error: null, isPending: false }) : null
      )
      .catch((error: any) =>
        isSubscribed
          ? setState({ value: defaultValue, error: error, isPending: false })
          : null
      );

    return () => {
      isSubscribed = false;
    };
  }, deps);

  const { value, error, isPending } = state;
  return [value, error, isPending];
};
