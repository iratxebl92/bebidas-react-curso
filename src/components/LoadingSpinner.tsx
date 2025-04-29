export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-transparent" data-testid="main-spinner-container">
      <div className="relative h-20 w-20" role="progressbar" data-testid="spinner-container">
        <div className="absolute inset-0 border-4 border-t-transparent border-blue-500 rounded-full animate-spin" role="progressbar" data-testid="inner-circle-1"></div>
        <div className="absolute inset-2 border-4 border-b-transparent border-blue-300 rounded-full animate-spin-slow" role="progressbar" data-testid="inner-circle-2"></div>
        <div className="absolute inset-4 bg-blue-100 rounded-full" data-testid="inner-circle-3"></div>
      </div>
    </div>
  );
};