function Navbar({ onOpenSettings }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg border-b border-white/20 px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-semibold tracking-wide">SafeRoute</h1>
      <button
        onClick={onOpenSettings}
        className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition"
      >
        ⚙
      </button>
    </div>
  );
}

export default Navbar;
