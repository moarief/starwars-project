"use client";

import { store } from "@/lib/redux/store";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";

type ReduxProviderType = {
  children: ReactNode;
};

function Providers({ children }: ReduxProviderType) {
  return <Provider store={store}>{children}</Provider>;
}

export default Providers;
