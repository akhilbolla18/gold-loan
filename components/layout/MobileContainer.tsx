export default function MobileContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <div className="">
        {children}
      </div>
    </div>
  );
}
