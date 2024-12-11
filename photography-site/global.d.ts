export {};

declare global {
  interface Window {
    _HB_?: {
      pid?: string;
      ctrlLoaded?: boolean;
    };
  }
}
