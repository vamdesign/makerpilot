import wixLogo from '../../assets/logos/wix.png';

export default function WixLogo() {
  return (
    <div className="relative flex items-center justify-center" data-name="wix_logo">
      <img
        alt="Wix"
        className="pointer-events-none h-[50px] w-auto object-contain"
        src={wixLogo}
      />
    </div>
  );
}
