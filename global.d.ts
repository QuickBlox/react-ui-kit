type Dictionary<T> = Record<string, T>;

declare module "*.svg" {
  import React from "react";
  const content: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  export default content;
}

declare module "*.svg?react" {
  import React from "react";
  const content: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  export default content;
}

interface Window {
  webkitAudioContext: typeof AudioContext;
}
