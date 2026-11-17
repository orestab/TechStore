import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-4 animate-pulse">
      <div className="w-full h-48 bg-zinc-800 rounded-xl mb-4" />
      <div className="h-4 bg-zinc-800 rounded w-1/3 mb-2" />
      <div className="h-5 bg-zinc-800 rounded w-3/4 mb-4" />
      <div className="flex justify-between items-center pt-2">
        <div className="h-6 bg-zinc-800 rounded w-1/4" />
        <div className="h-9 bg-zinc-800 rounded-xl w-24" />
      </div>
    </div>
  );
}