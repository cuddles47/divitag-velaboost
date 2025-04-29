import React from 'react';

interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export const Spinner = ({ size = 'md', className = '' }: SpinnerProps) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12'
    };

    return (
        <div className={`${className} flex items-center justify-center`}>
            <div className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-solid border-gray-300 border-t-blue-600`}></div>
        </div>
    );
};

export default Spinner;