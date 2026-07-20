import shopifyLogo from '../../assets/logos/shopify.png';

export default function ShopifyLogo() {
  return (
    <div className="relative flex items-center justify-center" data-name="ShopifyLogo">
      <img
        alt="Shopify"
        src={shopifyLogo}
        className="pointer-events-none h-[50px] w-auto object-contain"
      />
    </div>
  );
}
