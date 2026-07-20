import etsyLogo from '../../assets/logos/etsy.png';

export default function EtsyLogo() {
  return (
    <div className="relative flex items-center justify-center" data-name="EtsyLogo">
      <img
        alt="Etsy"
        src={etsyLogo}
        className="pointer-events-none h-[50px] w-auto object-contain"
      />
    </div>
  );
}
