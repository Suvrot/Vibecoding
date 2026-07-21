"use client";

import * as React from "react";
import { reportError } from "@/lib/report-error";

type Props = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

type State = { hasError: boolean };

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    reportError(error, info.componentStack ?? undefined, "fatal");
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-lg font-semibold mb-2">Что-то пошло не так</p>
            <p className="text-sm text-muted-foreground mb-4">
              Попробуй обновить страницу или вернуться позже.
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="text-sm text-emerald-400 hover:underline"
            >
              Попробовать снова
            </button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
