export function TravelButton({ accentColor, onClick }: { accentColor: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ backgroundColor: accentColor, boxShadow: `0 0 32px ${accentColor}55` }}
      className="w-full rounded-xl py-4 font-serif text-lg font-semibold tracking-wide text-zinc-950 hover:brightness-110"
    >
      TRAVEL
    </button>
  );
}
