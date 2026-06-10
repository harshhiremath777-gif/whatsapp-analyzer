import { Calendar, Clock, User, Smile, FolderHeart, MessageSquare, Lock } from 'lucide-react';

export default function HeroStats({ stats }) {
  const data = stats || {};
  const totalMessages = data.totalMessages || data.count || 0;
  const mostActiveParticipant = data.mostActiveParticipant || "N/A";
  const totalEmojis = data.totalEmojis || 0;
  const totalMedia = data.totalMedia || 0;

  const cardData = [
    {
      label: "Total Messages",
      value: totalMessages.toLocaleString(),
      isLocked: false,
      icon: MessageSquare,
      color: "bg-blue-100 text-blue-700"
    },
    {
      label: "First Message",
      value: "Pro Required",
      isLocked: true,
      icon: Calendar,
      color: "bg-emerald-100 text-emerald-700"
    },
    {
      label: "Most Recent",
      value: "Pro Required",
      isLocked: true,
      icon: Clock,
      color: "bg-amber-100 text-amber-700"
    },
    {
      label: "Most Active",
      value: mostActiveParticipant,
      isLocked: false,
      icon: User,
      color: "bg-violet-100 text-violet-700"
    },
    {
      label: "Total Emojis",
      value: totalEmojis.toLocaleString(),
      isLocked: false,
      icon: Smile,
      color: "bg-pink-100 text-pink-700"
    },
    {
      label: "Media Shared",
      value: totalMedia.toLocaleString(),
      isLocked: false,
      icon: FolderHeart,
      color: "bg-indigo-100 text-indigo-700"
    }
  ];

  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {cardData.map((card, index) => {
        const IconComponent = card.icon;
        return (
          <div 
            key={index} 
            className="bg-white/40 border border-white/60 rounded-2xl p-4 flex flex-col justify-between transition-all duration-200 hover:translate-y-[-2px] hover:bg-white/60 min-w-0 group"
          >
            <div className="flex justify-between items-start mb-3 gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D1B69]/50 block break-words leading-tight">
                {card.label}
              </span>
              <div className={`p-1.5 rounded-lg shrink-0 ${card.color}`}>
                <IconComponent className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
            </div>
            
            {card.isLocked ? (
              <div className="flex items-center gap-1 text-violet-600/80 font-black text-xs uppercase tracking-wider bg-violet-100/50 py-1.5 px-2.5 rounded-xl border border-violet-200/40 w-fit select-none">
                <Lock className="w-3 h-3 stroke-[3]" /> Pro
              </div>
            ) : (
              <div className={`font-black text-[#2D1B69] tracking-tight break-words leading-tight ${card.value.length > 10 ? 'text-sm' : 'text-lg'}`}>
                {card.value}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}