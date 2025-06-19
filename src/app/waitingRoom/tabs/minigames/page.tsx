"use client";
import Image from "next/image";
import Link from "next/link";
import retroGames from "@/Data/Games";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MiniGamesSection = () => {
  const user = useAppSelector((state) => state.user.user);
  const [userLimit, setUserLimit] = useState(2);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/signin");
      return;
    }
    if (user.isPermium === true) {
      setUserLimit(retroGames.length);
    } else {
      setUserLimit(2);
    }
  }, [user, router]);
  console.log(userLimit);
  return (
    <div className="flex mt-12 flex-col md:mt-28 justify-start w-full bg-white overflow-hidden px-4 sm:px-6 lg:px-8 py-8">
      {/* Featured Games Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Featured Games
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {retroGames.slice(0, userLimit).map((game) => (
            <div
              key={game.name}
              className="border border-black rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <Link href={`/waitingRoom/tabs/minigames/games?game=${game.id}`}>
                <div className="relative h-60 w-full">
                  <Image
                    src={game.imgUrl}
                    alt={game.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Games Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Trending Games
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {retroGames
            .slice(userLimit === 2 ? 0 : Math.floor(userLimit / 2))
            .slice(0, userLimit === 2 ? 2 : undefined)
            .map((game) => (
              <div
                key={game.name}
                className="border border-black rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Link
                  href={`/waitingRoom/tabs/minigames/games?game=${game.id}`}
                >
                  <div className="relative h-60 w-full">
                    <Image
                      src={game.imgUrl}
                      alt={game.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      unoptimized
                    />
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MiniGamesSection;
