import React from 'react';
import { Launch } from '@shared/types';
import { cn } from '@/lib/utils';
import { Rocket, CheckCircle, XCircle, Clock, PlusCircle, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
interface MissionListProps {
  missions: Launch[];
  selectedMissionId: string | null;
  onSelectMission: (id: string) => void;
  onNewMission: () => void;
  onEditMission: (id: string) => void;
  onDeleteMission: (id: string) => void;
}
const statusIcons = {
  'Upcoming': <Clock className="h-4 w-4 text-yellow-400" />,
  'Success': <CheckCircle className="h-4 w-4 text-green-400" />,
  'Failed': <XCircle className="h-4 w-4 text-red-400" />,
  'In-Flight': <Rocket className="h-4 w-4 text-blue-400 animate-pulse" />,
};
export function MissionList({
  missions,
  selectedMissionId,
  onSelectMission,
  onNewMission,
  onEditMission,
  onDeleteMission,
}: MissionListProps) {
  return (
    <div className="h-full bg-slate-950/50 border-r border-slate-800 backdrop-blur-sm flex flex-col">
      <div className="p-4 border-b border-slate-800">
        <h2 className="text-lg font-bold text-slate-50 flex items-center gap-2 mb-4">
          <Rocket className="text-cyan-400" />
          Missions
        </h2>
        <Button onClick={onNewMission} className="w-full bg-cyan-600/20 text-cyan-300 hover:bg-cyan-600/40">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Mission
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="p-2 space-y-1">
          {missions
            .sort((a, b) => new Date(b.launchDate).getTime() - new Date(a.launchDate).getTime())
            .map(mission => (
              <div key={mission.id} className="group relative">
                <button
                  onClick={() => onSelectMission(mission.id)}
                  className={cn(
                    "w-full text-left pl-3 pr-10 py-2 rounded-md text-sm font-medium flex items-center justify-between transition-colors duration-200",
                    selectedMissionId === mission.id
                      ? 'bg-cyan-500/20 text-cyan-300'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-slate-100'
                  )}
                >
                  <div className="flex-1 truncate pr-2">
                    <p className="font-semibold">{mission.missionName}</p>
                    <p className="text-xs text-slate-400">{new Date(mission.launchDate).toLocaleDateString()}</p>
                  </div>
                  <div className="flex-shrink-0" title={mission.status}>
                    {statusIcons[mission.status]}
                  </div>
                </button>
                <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-slate-400 hover:text-cyan-400"
                    onClick={(e) => { e.stopPropagation(); onEditMission(mission.id); }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-slate-400 hover:text-red-500"
                    onClick={(e) => { e.stopPropagation(); onDeleteMission(mission.id); }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
        </nav>
      </div>
      <div className="p-4 border-t border-slate-800 text-center">
        <p className="text-xs text-slate-500">Built with ❤️ at Cloudflare</p>
      </div>
    </div>
  );
}