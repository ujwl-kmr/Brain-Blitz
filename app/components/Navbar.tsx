import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-cyan-300 p-4 flex justify-between">
      <div className="text-black text-3xl font-bold ml-8">Brain Blitz</div>
      <div className="space-x-8">
        <Link
          href="/"
          className="text-black text-xl font-semibold hover:text-white"
        >
          Take Quiz
        </Link>
        <Link
          href="/createquiz"
          className="text-black text-xl font-semibold hover:text-white"
        >
          Create Quiz
        </Link>
        <Link
          href="/createdquiz"
          className="text-black text-xl font-semibold hover:text-white"
        >
          Created Quiz
        </Link>
        <button className="text-black text-xl font-semibold  hover:text-white">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
