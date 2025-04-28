import React from 'react';
import { useParams, Link } from 'react-router-dom';
// import { useThreatActorDetail } from '../../hooks/useThreatActors';
// Add some icons from react-icons for visual appeal
import {
  FaUserSecret,
  FaTags,
  FaUserEdit,
  FaArrowLeft,
  FaUserFriends,
  FaBolt,
  FaLayerGroup,
  FaLightbulb,
  FaUserAlt,
} from 'react-icons/fa';

export default function ThreatActorDetail() {
  const { id } = useParams<{ id: string }>();
  // const { actor, loading, error } = useThreatActorDetail(id);

  // if (loading) return <div className="text-center py-10 animate-pulse">Loading...</div>;
  // if (error) return <div className="text-red-600 py-10">Error: {error.message}</div>;
  // if (!actor) return <div className="text-center py-10">Not found.</div>;

  // Helper to render array as colored badges
  const renderBadges = (arr?: string[], color = 'bg-blue-100 text-blue-800') =>
    arr?.length ? (
      <div className="flex flex-wrap gap-2">
        {arr.map((item, i) => (
          <span
            key={i}
            className={`px-2 py-1 rounded text-xs font-semibold ${color}`}
          >
            {item}
          </span>
        ))}
      </div>
    ) : (
      <span className="text-zinc-400">None</span>
    );

  return (
    // <div className="flex justify-center items-center min-h-[80vh] bg-gradient-to-br from-zinc-50 via-blue-50 to-zinc-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 transition-colors duration-500">
    //   <div className="w-full max-w-2xl p-8 rounded-2xl shadow-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 animate-fade-in">
    //     <div className="flex items-center gap-4 mb-6">
    //       <div className="bg-blue-600 text-white rounded-full p-3 shadow-lg">
    //         <FaUserSecret size={32} />
    //       </div>
    //       <div>
    //         <h2 className="text-4xl font-extrabold tracking-tight mb-1 flex items-center gap-2">
    //           {actor.name}
    //           <span className="ml-2 text-base font-medium text-blue-500 bg-blue-100 px-2 py-0.5 rounded">{actor.type}</span>
    //         </h2>
    //         <div className="text-zinc-500 dark:text-zinc-400">{actor.description}</div>
    //       </div>
    //     </div>
    //     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
    //       <div>
    //         <div className="flex items-center gap-2 mb-1 text-zinc-700 dark:text-zinc-200 font-semibold">
    //           <FaUserFriends className="text-blue-400" /> Roles
    //         </div>
    //         {renderBadges(actor.roles, "bg-purple-100 text-purple-800")}
    //       </div>
    //       <div>
    //         <div className="flex items-center gap-2 mb-1 text-zinc-700 dark:text-zinc-200 font-semibold">
    //           <FaBolt className="text-yellow-400" /> Sophistication
    //         </div>
    //         <span className="inline-block px-2 py-1 rounded bg-yellow-100 text-yellow-800 text-xs font-semibold">{actor.sophistication || "Unknown"}</span>
    //       </div>
    //       <div>
    //         <div className="flex items-center gap-2 mb-1 text-zinc-700 dark:text-zinc-200 font-semibold">
    //           <FaLayerGroup className="text-green-400" /> Resource Level
    //         </div>
    //         <span className="inline-block px-2 py-1 rounded bg-green-100 text-green-800 text-xs font-semibold">{actor.resource_level || "Unknown"}</span>
    //       </div>
    //       <div>
    //         <div className="flex items-center gap-2 mb-1 text-zinc-700 dark:text-zinc-200 font-semibold">
    //           <FaLightbulb className="text-pink-400" /> Primary Motivation
    //         </div>
    //         <span className="inline-block px-2 py-1 rounded bg-pink-100 text-pink-800 text-xs font-semibold">{actor.primary_motivation || "Unknown"}</span>
    //       </div>
    //       <div>
    //         <div className="flex items-center gap-2 mb-1 text-zinc-700 dark:text-zinc-200 font-semibold">
    //           <FaUserAlt className="text-cyan-400" /> Aliases
    //         </div>
    //         {renderBadges(actor.aliases, "bg-cyan-100 text-cyan-800")}
    //       </div>
    //       <div>
    //         <div className="flex items-center gap-2 mb-1 text-zinc-700 dark:text-zinc-200 font-semibold">
    //           <FaTags className="text-rose-400" /> Labels
    //         </div>
    //         {renderBadges(actor.labels, "bg-rose-100 text-rose-800")}
    //       </div>
    //     </div>
    //     <div className="flex flex-wrap gap-6 mb-8">
    //       <div>
    //         <div className="text-xs text-zinc-400 uppercase font-bold">First Seen</div>
    //         <div className="font-mono text-blue-700 dark:text-blue-300">{actor.first_seen || "?"}</div>
    //       </div>
    //       <div>
    //         <div className="text-xs text-zinc-400 uppercase font-bold">Last Seen</div>
    //         <div className="font-mono text-blue-700 dark:text-blue-300">{actor.last_seen || "?"}</div>
    //       </div>
    //     </div>
    //     <div className="flex gap-4">
    //       <Link to={`/threat-actors/${actor.id}/edit`} className="flex items-center gap-2 btn-primary px-5 py-2 rounded-lg shadow hover:scale-105 transition-transform bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold">
    //         <FaUserEdit /> Edit
    //       </Link>
    //       <Link to="/threat-actors" className="flex items-center gap-2 px-5 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-blue-700 dark:text-blue-300 font-semibold shadow hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
    //         <FaArrowLeft /> Back to list
    //       </Link>
    //     </div>
    //   </div>
    // </div>
    <>Hello there</>
  );
}
