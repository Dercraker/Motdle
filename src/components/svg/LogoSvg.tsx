import { ComponentPropsWithoutRef } from "react";

export type LogoSvgProps = ComponentPropsWithoutRef<"svg"> & { size?: number };

export const LogoSvg = ({ size = 24, ...props }: LogoSvgProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M75 87.5C75 78.6595 71.4881 70.181 65.2369 63.9298C58.9857 57.6786 50.5073 54.1667 41.6667 54.1667C32.8262 54.1667 24.3477 57.6786 18.0965 63.9298C11.8453 70.181 8.33337 78.6595 8.33337 87.5"
        stroke="white"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M41.6667 54.1667C53.1726 54.1667 62.5 44.8393 62.5 33.3333C62.5 21.8274 53.1726 12.5 41.6667 12.5C30.1608 12.5 20.8334 21.8274 20.8334 33.3333C20.8334 44.8393 30.1608 54.1667 41.6667 54.1667Z"
        stroke="white"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M91.6667 83.3333C91.6667 69.2917 83.3333 56.25 75 50C77.7392 47.9449 79.9296 45.2462 81.3774 42.1428C82.8251 39.0394 83.4855 35.627 83.3001 32.2075C83.1147 28.7881 82.0892 25.467 80.3145 22.5384C78.5397 19.6097 76.0704 17.1636 73.125 15.4167"
        stroke="white"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
