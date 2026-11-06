/** Placeholders shaped like each of the three cards while results load. */

const Bar = ({ className }: { className: string }) => <div className={`skeleton rounded-md ${className}`} />;

export function CardSkeletons() {
  return (
    <div className="flex flex-col gap-3" aria-busy="true" aria-label="Loading your trip" data-testid="skeletons">
      {/* stay: banner + name + price box + button */}
      <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-black/5">
        <div className="skeleton aspect-[16/9] w-full" />
        <div className="flex gap-3 p-4">
          <div className="flex-1 space-y-2">
            <Bar className="h-5 w-4/5" />
            <Bar className="h-3.5 w-1/2" />
            <Bar className="h-3.5 w-2/3" />
          </div>
          <div className="skeleton h-[68px] w-[84px] rounded-xl" />
        </div>
        <div className="px-4 pb-4">
          <div className="skeleton h-11 w-full rounded-xl" />
        </div>
      </div>
      {/* experience: inset image + location row + two buttons */}
      <div className="rounded-[22px] border border-hairline bg-[#FAFAF7] p-3">
        <div className="skeleton aspect-[16/10] w-full rounded-2xl" />
        <div className="space-y-2 px-1 pt-3">
          <Bar className="h-5 w-3/4" />
          <Bar className="h-3.5 w-2/3" />
        </div>
        <div className="skeleton mt-3 h-[60px] w-full rounded-xl" />
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="skeleton h-11 rounded-xl" />
          <div className="skeleton h-11 rounded-xl" />
        </div>
      </div>
      {/* food: square thumb + chips + dish row */}
      <div className="rounded-2xl bg-white p-4 ring-1 ring-black/5">
        <div className="flex gap-3">
          <div className="skeleton size-[76px] rounded-xl" />
          <div className="flex-1 space-y-2 pt-1">
            <Bar className="h-3 w-1/3" />
            <Bar className="h-5 w-2/3" />
            <Bar className="h-3 w-1/2" />
          </div>
        </div>
        <div className="mt-3 flex gap-1.5">
          {[60, 52, 58].map((w) => (
            <div key={w} className="skeleton h-6 rounded-full" style={{ width: w }} />
          ))}
        </div>
        <div className="mt-3 flex gap-3 overflow-hidden">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="skeleton size-[96px] shrink-0 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
