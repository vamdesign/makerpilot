import MakerPilotLogo from "../../imports/MakerPilotLogo/MakerPilotLogo";

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={className} style={{ height: '120px' }}>
      <MakerPilotLogo />
    </div>
  );
}
