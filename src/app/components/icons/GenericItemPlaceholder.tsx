import genericItem from '../../../assets/generic-item.png';

/** Default thumbnail when a manual item has no photo uploaded. */
export default function GenericItemPlaceholder() {
  return (
    <div className="relative flex size-full items-center justify-center bg-[#F3F4F6]">
      <img
        alt=""
        className="size-[70%] object-contain object-center opacity-90"
        src={genericItem}
      />
    </div>
  );
}
