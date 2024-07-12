export function getBrowserUniqueId() {
  let id = "";

  // Try to get the user agent string
  id += navigator.userAgent;

  // Try to get the screen size
  id += screen.width + "x" + screen.height;

  // Try to get the color depth
  id += screen.colorDepth;

  // Try to get the available storage
  id += navigator.hardwareConcurrency;
  id += navigator.language;
  id += navigator.platform;

  // Try to get the time zone
  id += Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Try to get the device memory
  // @ts-ignore
  id += navigator.deviceMemory;

  // Try to get the browser vendor and version
  id += navigator.vendor;
  id += navigator.vendorSub;

  // Try to get the browser engine and version
  id += navigator.product;
  id += navigator.productSub;

  // Try to get the browser version
  id += navigator.userAgent.replace(/\D+(\d+\.\d+).*/, "$1");

  // Generate a hash from the id string
  return hashCode(id);
}

function hashCode(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash.toString(36);
}
