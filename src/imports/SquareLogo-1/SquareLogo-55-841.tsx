import squareLogo from '../../assets/logos/square.png';

export default function SquareLogo() {
  return (
    <div className="relative flex items-center justify-center" data-name="square_logo">
      <img
        alt="Square"
        className="pointer-events-none h-[50px] w-auto object-contain"
        src={squareLogo}
      />
    </div>
  );
}
