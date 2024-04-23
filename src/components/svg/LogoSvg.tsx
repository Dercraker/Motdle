import { ComponentPropsWithoutRef } from "react";

export type LogoSvgProps = ComponentPropsWithoutRef<"svg"> & { size?: number };

export const LogoSvg = ({ size = 24, ...props }: LogoSvgProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 192 216"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_d_2009_12)">
        <path
          d="M133.556 158L120.963 58L95.7778 120.5L70.5926 58L58 158"
          stroke="white"
          strokeWidth="15"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M133.556 158L120.963 58L95.7778 120.5L70.5926 58L58 158"
          stroke="url(#paint0_linear_2009_12)"
          strokeOpacity="0.8"
          strokeWidth="15"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_2009_12"
          x="0.499207"
          y="0.499634"
          width="190.557"
          height="215.001"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="25" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 1 0 0 0 0 0.0327869 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2009_12"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2009_12"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_2009_12"
          x1="133.556"
          y1="108"
          x2="57.5555"
          y2="108"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF0000" />
          <stop offset="0.524238" stopColor="white" />
          <stop offset="0.975" stopColor="#001AFF" />
        </linearGradient>
      </defs>
    </svg>
  );
};
