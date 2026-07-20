import makerLogo from "../../assets/maker-logo.svg";

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={className} style={{ height: '120px' }}>
      <img alt="MakerPilot" className="h-full w-auto object-contain" src={makerLogo} />
    </div>
  );
}
