import cloudsBkg from '../../assets/clouds-bkg.png';

export default function Base() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" data-name="Base">
      <img
        src={cloudsBkg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
    </div>
  );
}
