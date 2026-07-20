import cloudsBkg from '../../../assets/clouds-bkg.png';
import cloudsBkgLong from '../../../assets/clouds-bkg-long.png';

export default function ScreenBackground({ tall = false }: { tall?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <img
        src={tall ? cloudsBkgLong : cloudsBkg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
    </div>
  );
}
