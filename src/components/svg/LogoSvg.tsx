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
      <g filter="url(#filter0_d_2007_2)">
        <path
          d="M58 58L70.5926 158L95.7778 95.5L120.963 158L133.556 58"
          stroke="white"
          strokeWidth="15"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M58 58L70.5926 158L95.7778 95.5L120.963 158L133.556 58"
          stroke="url(#paint0_linear_2007_2)"
          strokeOpacity="0.8"
          strokeWidth="15"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_2007_2"
          x="0.499207"
          y="0.499207"
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
            result="effect1_dropShadow_2007_2"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2007_2"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_2007_2"
          x1="58"
          y1="108"
          x2="134"
          y2="108"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#001AFF" />
          <stop offset="0.524238" stopColor="white" />
          <stop offset="1" stopColor="#FF0000" />
        </linearGradient>
      </defs>
    </svg>
  );
};
