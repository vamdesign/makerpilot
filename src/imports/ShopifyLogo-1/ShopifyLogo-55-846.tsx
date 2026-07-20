import shopifyLogo from '../../assets/logos/shopify.png';

export default function ShopifyLogo() {
  return (
    <div className="relative flex items-center justify-center" data-name="shopify_logo">
      <img
        alt="Shopify"
        className="pointer-events-none h-[50px] w-auto object-contain"
        src={shopifyLogo}
      />
    </div>
  );
}
