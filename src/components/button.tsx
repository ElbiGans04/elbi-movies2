export default function Button({
  onClick,
  disabled,
  children,
}: {
  disabled: boolean | undefined;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      className={`bg-brand-700 p-[16px] text-white shadow ${
        !disabled
          ? `hover:opacity-[0.8] active:scale-[0.8] active:opacity-[0.5]`
          : `opacity-[0.5]`
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
