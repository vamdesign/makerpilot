import squareLogo from '../../assets/logos/square.png';

export default function SquareLogo() {
  return (
    <div className="relative flex items-center justify-center" data-name="SquareLogo">
      <img
        alt="Square"
        src={squareLogo}
        className="pointer-events-none h-[50px] w-auto object-contain"
      />
    </div>
  );
}
