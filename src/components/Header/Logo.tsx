import Link from "next/link";

export default function Logo() {
  return (
    <div className="flex flex-col">
      <div className="text-2xl font-bold text-[#B30738]">
        <Link href="/">BizzSocial</Link>
      </div>
      <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
        Made In
        <img
          src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
          alt="India Flag"
          style={{
            width: "18px",
            height: "12px",
            display: "inline",
            verticalAlign: "middle",
          }}
        />
        For INDIA
      </span>
    </div>
  );
}
