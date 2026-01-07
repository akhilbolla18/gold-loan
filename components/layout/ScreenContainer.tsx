export default function ScreenContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-4 py-4 flex flex-col gap-4">
      {children}
    </div>
  );
}
