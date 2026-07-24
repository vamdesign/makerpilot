import { useNavigate } from 'react-router';
import welcomeBkg from '../../assets/welcome-bkg.svg';
import makerLogo from '../../assets/maker-logo.svg';

function Button() {
  const navigate = useNavigate();
  return (
    <div className="-translate-x-1/2 absolute contents left-[calc(50%+0.5px)] top-[500px]" data-name="Button">
      <div onClick={() => navigate('/signup')} className="absolute bg-[#1a9e8f] h-[50px] left-[34px] rounded-[12px] top-[500px] w-[326px] shadow-md" />
      <p className="-translate-x-1/2 absolute font-['DM_Sans:SemiBold',sans-serif] leading-[normal] left-[calc(50%+1.11px)] not-italic text-[16px] text-center text-white top-[515px] w-[111.526px] pointer-events-none">Get Started</p>
    </div>
  );
}

function Button1() {
  const navigate = useNavigate();
  return (
    <div className="-translate-x-1/2 absolute contents left-[calc(50%+0.5px)] top-[570px]" data-name="Button">
      <div onClick={() => navigate('/signin')} className="absolute bg-white border border-[#399] border-solid h-[50px] left-[34px] rounded-[12px] top-[570px] w-[326px] shadow-md" />
      <p className="-translate-x-1/2 absolute font-['DM_Sans:SemiBold',sans-serif] leading-[normal] left-[calc(50%+1.11px)] not-italic text-[#399] text-[16px] text-center top-[585px] w-[62.504px] pointer-events-none">Sign In</p>
    </div>
  );
}

export default function Welcome() {
  return (
    <div className="bg-[#E5F0F0] relative size-full" data-name="Welcome" style={{ zIndex: 0 }}>

      {/* Background — edit in Figma, export as welcome_bkg.svg, drop into src/imports */}
      <img src={welcomeBkg} className="absolute inset-0 w-full h-full" alt="" />

      {/* Logo — kept as-is from Figma */}
      <img src={makerLogo} className="absolute left-[62.5px] top-[158px] w-[304.498px] h-[71.238px]" alt="MakerPilot" />

      {/* Tagline */}
      <div className="-translate-x-1/2 absolute left-1/2 top-[276px] w-[309px] text-center whitespace-pre-wrap">
        <p className="font-['DM_Sans:Bold',sans-serif] font-bold text-[22px] leading-tight mb-3 text-[#373737]">
          {`An Inventory tracking app that goes where you go.`}
        </p>
        <p className="font-['DM_Sans:SemiBold',sans-serif] text-[18px] leading-snug text-[#339999]">
          Stay up to date with your current stock, what you sold, and what to make next.
        </p>
      </div>

      <Button />
      <Button1 />
    </div>
  );
}
