"use client";
import Image from "next/image";
import Link from "next/link";
import retroGames from "@/Data/Games";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MiniGamesSection = () => {
  const user = useAppSelector((state) => state.user.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/signin");
      return;
    }
  }, [user, router]);


  const regularGames = retroGames.filter(game => !game.isPremium);
  const premiumGames = retroGames.filter(game => game.isPremium);
  console.log(premiumGames.length)
  return (
    <div className="flex mt-12 flex-col md:mt-28 justify-start w-full bg-white overflow-hidden px-4 sm:px-6 lg:px-8 py-8">
      {/* Featured Games Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Trending Featured Games
          </h2>
          <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Free
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularGames.map((game) => (
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

      {/* Premium Games Section - Only visible for premium users */}
      {user?.isPremium && premiumGames.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Premium Games
            </h2>
            <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
              Premium
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {premiumGames.map((game) => (
              <div
                key={game.name}
                className="border-2 border-purple-500 rounded-lg overflow-hidden hover:shadow-lg transition-shadow relative"
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
      )}

      {/* Premium Locked Section - For non-premium users */}
      {!user?.isPremium && premiumGames.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Premium Games
            </h2>
            <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
              Locked
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {premiumGames.map((game) => (
              <div
                key={game.name}
                className="border-2 border-gray-300 rounded-lg overflow-hidden relative"
              >
                <div className="relative h-60 w-full">
                  <Image
                    src={game.imgUrl}
                    alt={game.name}
                    fill
                    className="object-cover opacity-50"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center p-4">
                      <h3 className="text-white text-lg font-bold mb-2">{game.name}</h3>
                      <Link
                        href="/subscription"
                        className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                      >
                        Upgrade to Premium
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MiniGamesSection;