export default function MobileContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex justify-center bg-slate-200 bg-red">
      {/* Mobile frame */}
      <div className="w-[360px] min-h-screen bg-bg">
        {children}
      </div>
    </div>
  );
}
