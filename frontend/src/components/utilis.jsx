// Import the required dependencies
import { useEffect, useState } from 'react';
import { toast, Toaster } from "sonner"; // Correct import for toast and Toaster
import { Loader2 } from "lucide-react";

// Toast utility function
export const sendToast = (type = 'default', text) => {
    switch (type) {
        case 'success':
            toast.success(text);
            break;
        case 'error':
            toast.error(text);
            break;
        case 'warning':
            toast.warning(text);
            break;
        default:
            toast(text);
    }
};


// Loading component
export const Roller = ({ visible }) => {
    // Use visible prop directly for conditional rendering
    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50">
            <Loader2
                className="h-12 w-12 animate-spin text-primary"
                aria-label="Loading"
            />
        </div>
    );
};

// Toaster Component - Use `Toaster` directly from sonner in your main layout
export const ToastContainer = () => {
    return <Toaster position="top-right" />;
};
