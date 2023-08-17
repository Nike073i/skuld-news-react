import React, { ReactNode, Suspense } from 'react';
import { ErrorHandler } from '@/widgets/ErrorHandler';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // eslint-disable-next-line no-console
        console.error(error, errorInfo);
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true };
    }

    render() {
        const { hasError } = this.state;
        const { children } = this.props;
        if (hasError) {
            return (
                <Suspense fallback="">
                    <ErrorHandler />
                </Suspense>
            );
        }
        return children;
    }
}

export default ErrorBoundary;
