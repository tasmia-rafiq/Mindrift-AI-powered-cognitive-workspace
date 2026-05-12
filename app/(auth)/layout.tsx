import NavBar from "@/components/NavBar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-(--bg-900) text-white">
      <NavBar />

      {/* ambient lights */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] h-125 w-125 rounded-full bg-violet-500/5 blur-[140px]" />

        <div className="absolute bottom-[-20%] right-[-10%] h-125 w-125 rounded-full bg-cyan-400/5 blur-[140px]" />
      </div>

      {/* grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.25) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* center */}
      <div className="relative z-10 flex mt-20 items-center justify-center p-6">
        {children}
      </div>
    </div>
  );
}