import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const ConfettiComponent = () => {
  const { width, height } = useWindowSize();
  return (
    <Confetti
      width={width}
      height={height}
      style={{ zIndex: 1000 }}
      numberOfPieces={300}
      wind={0.02}
      gravity={0.1}
      run={true}
      drawShape={(ctx) => {
        ctx.beginPath();
        for (let i = 0; i < 22; i++) {
          const angle = 0.35 * i;
          const x = (0.2 + 1.5 * angle) * Math.cos(angle);
          const y = (0.2 + 1.5 * angle) * Math.sin(angle);
          ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.closePath();
      }}
    />
  );
};

export default ConfettiComponent;
