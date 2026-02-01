import Image from 'next/image';

interface LogoProps {
  size?: 'navbar' | 'footer';
}

export default function Logo({ size = 'navbar' }: LogoProps) {
  const sizeConfig = {
    navbar: {
      width: 300,
      height: 300,
      className: 'h-20 w-auto object-contain',
    },
    footer: {
      width: 250,
      height: 250,
      className: 'h-24 w-auto object-contain invert brightness-95 hue-rotate-180 saturate-200 contrast-125',
    },
  };

  const config = sizeConfig[size];

  return (
    <div className="flex items-center">
      <Image
        src="/WhatsApp_Image_2026-01-30_at_11.21.42_PM-removebg-preview.png"
        alt="Globe-Tech Logo"
        width={config.width}
        height={config.height}
        className={config.className}
        priority={size === 'navbar'}
      />
    </div>
  );
}

