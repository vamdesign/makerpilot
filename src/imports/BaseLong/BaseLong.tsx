import cloudsBkgLong from '../../assets/clouds-bkg-long.png';

export default function BaseLong() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" data-name="BaseLong">
      <img
        src={cloudsBkgLong}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
    </div>
  );
}
