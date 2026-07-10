export function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-(--ruge-black)/90 z-50">
      <div className="relative font-bold uppercase">
        <span className="absolute text-transparent -translate-x-1/2 -translate-y-1/2 text-[38px] tracking-[5px] [-webkit-text-stroke:1px_var(--primary-color)] font-sans">
          Cybertech
        </span>
        <span className="absolute text-(--medium-slate-blue) -translate-x-1/2 -translate-y-1/2 text-[38px] tracking-[5px] [-webkit-text-stroke:2px_var(--medium-slate-blue)] font-sans animate-[wave_1.5s_ease-in-out_infinite]">
          Cybertech
        </span>
      </div>
    </div>
  );
}
