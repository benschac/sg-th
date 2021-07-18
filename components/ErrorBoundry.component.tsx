import React, { ErrorInfo, ReactNode } from "react";

import { Display } from "./Typography.component";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <Display>Something went wrong.</Display>;
    }

    return this.props.children;
  }
}
