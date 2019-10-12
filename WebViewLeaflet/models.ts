export interface Window {
  ReactNativeWebView?: any;
}

export let window: Window;

if (window.ReactNativeWebView !== undefined) {
  console.log(window.ReactNativeWebView);
}

export interface WebviewLeafletMessage {
  msg: string;
}
