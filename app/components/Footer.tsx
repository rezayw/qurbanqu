const Footer = () => {
  return (
    <footer className="bg-qgreen text-white text-sm py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center text-center">
        <p>
          © {new Date().getFullYear()} <span className="font-semibold">QurbanQu</span> — Menghubungkan Hati & Ibadah
        </p>
      </div>
    </footer>
  );
};

export default Footer;
