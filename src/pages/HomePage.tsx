import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { create } from 'zustand';
import { AnimatePresence, motion } from 'framer-motion';
import { api } from '@/lib/api-client';
import { Launch, Telemetry } from '@shared/types';
import { MissionList } from '@/components/mission-control/MissionList';
import { DataCard } from '@/components/mission-control/DataCard';
import { Countdown } from '@/components/mission-control/Countdown';
import { Skeleton } from '@/components/ui/skeleton';
import { useInterval } from '@/hooks/use-interval';
import { Toaster, toast } from '@/components/ui/sonner';
import { CreateMissionDialog } from '@/components/mission-control/CreateMissionDialog';
import { Globe } from '@/components/mission-control/Globe';
interface MissionStore {
  missions: Launch[];
  selectedMissionId: string | null;
  setMissions: (missions: Launch[]) => void;
  setSelectedMissionId: (id: string) => void;
  addMission: (mission: Launch) => void;
}
const useMissionStore = create<MissionStore>((set) => ({
  missions: [],
  selectedMissionId: null,
  setMissions: (missions) => set({ missions }),
  setSelectedMissionId: (id) => set({ selectedMissionId: id }),
  addMission: (mission) => set(state => ({ missions: [...state.missions, mission] })),
}));
export function HomePage() {
  const missions = useMissionStore(s => s.missions);
  const setMissions = useMissionStore(s => s.setMissions);
  const selectedMissionId = useMissionStore(s => s.selectedMissionId);
  const setSelectedMissionId = useMissionStore(s => s.setSelectedMissionId);
  const [currentLaunch, setCurrentLaunch] = useState<Launch | null>(null);
  const [telemetry, setTelemetry] = useState<Telemetry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateMissionOpen, setCreateMissionOpen] = useState(false);
  const fetchMissions = useCallback(async () => {
    try {
      const fetchedMissions = await api<Launch[]>('/api/launches');
      const sortedMissions = fetchedMissions.sort((a, b) => new Date(b.launchDate).getTime() - new Date(a.launchDate).getTime());
      setMissions(sortedMissions);
      const currentSelectedId = useMissionStore.getState().selectedMissionId;
      if (!currentSelectedId || !sortedMissions.some(m => m.id === currentSelectedId)) {
        const upcoming = sortedMissions.find(m => m.status === 'Upcoming' && new Date(m.launchDate) > new Date());
        if (upcoming) {
          setSelectedMissionId(upcoming.id);
        } else if (sortedMissions.length > 0) {
          setSelectedMissionId(sortedMissions[0].id);
        }
      }
    } catch (error) {
      toast.error('Failed to fetch missions.');
      console.error(error);
    }
  }, [setMissions, setSelectedMissionId]);
  useEffect(() => {
    fetchMissions();
  }, [fetchMissions]);
  useEffect(() => {
    async function fetchLaunchDetails() {
      if (!selectedMissionId) {
        if (missions.length > 0) {
          setIsLoading(false);
        }
        return;
      }
      setIsLoading(true);
      try {
        const launchData = await api<Launch>(`/api/launches/${selectedMissionId}`);
        setCurrentLaunch(launchData);
        setTelemetry(launchData.telemetry);
      } catch (error) {
        toast.error('Failed to fetch launch details.');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchLaunchDetails();
  }, [selectedMissionId, missions.length]);
  useInterval(() => {
    if (currentLaunch?.status === 'In-Flight') {
      setTelemetry(prev => {
        if (!prev) return null;
        return {
          ...prev,
          altitude: prev.altitude + 5 * (Math.random() + 0.5),
          speed: prev.speed + 100 * (Math.random() + 0.5),
          downrange: prev.downrange + 20 * (Math.random() + 0.5),
          signalStrength: Math.max(90, prev.signalStrength - Math.random() * 0.1),
          temperature: prev.temperature + Math.random() * 2,
          fuel: Math.max(0, prev.fuel - Math.random() * 0.2),
          pressure: Math.max(0, prev.pressure - Math.random() * 1),
        };
      });
    }
  }, 1000);
  const renderDashboard = () => {
    if (isLoading || !currentLaunch) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-3 gap-4 p-4 h-full">
          <Skeleton className="lg:col-span-2 lg:row-span-2" />
          <Skeleton className="lg:col-span-2" />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton className="md:col-span-2" />
        </div>
      );
    }
    return (
      <AnimatePresence>
        <motion.div
          key={currentLaunch.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-3 gap-4 p-4 h-full"
        >
          <DataCard title="Mission Status" className="lg:col-span-2 lg:row-span-2 bg-slate-900/80">
            <div className="h-full flex flex-col justify-between">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-50">{currentLaunch.missionName}</h1>
                <p className="text-lg text-cyan-400">{currentLaunch.payload}</p>
              </div>
              <Countdown launchDate={currentLaunch.launchDate} />
            </div>
          </DataCard>
          <DataCard title="Trajectory" className="lg:col-span-2">
            <Globe launchSite={currentLaunch.launchSite.location} destinationOrbit={currentLaunch.destinationOrbit} />
          </DataCard>
          <DataCard title="Altitude" value={telemetry?.altitude.toFixed(2) || 0} unit="km" valueClassName="text-cyan-400" />
          <DataCard title="Speed" value={telemetry?.speed.toFixed(2) || 0} unit="km/h" valueClassName="text-cyan-400" />
          <DataCard title="Downrange" value={telemetry?.downrange.toFixed(2) || 0} unit="km" valueClassName="text-cyan-400" />
          <DataCard title="Signal" value={telemetry?.signalStrength.toFixed(1) || 0} unit="%" />
          <DataCard title="Fuel" value={telemetry?.fuel.toFixed(1) || 0} unit="%" />
          <DataCard title="Pressure" value={telemetry?.pressure.toFixed(2) || 0} unit="kPa" />
          <DataCard title="Temperature" value={telemetry?.temperature.toFixed(1) || 0} unit="°C" />
          <DataCard title="Rocket" className="md:col-span-2">
            <div className="space-y-2 text-slate-200">
              <p><strong>Name:</strong> {currentLaunch.rocket.name}</p>
              <p><strong>Height:</strong> {currentLaunch.rocket.height}</p>
              <p><strong>Mass:</strong> {currentLaunch.rocket.mass}</p>
            </div>
          </DataCard>
        </motion.div>
      </AnimatePresence>
    );
  };
  return (
    <div className="h-screen w-screen bg-slate-950 text-slate-50 flex overflow-hidden font-sans bg-grid">
      <div className="w-64 flex-shrink-0">
        <MissionList
          missions={missions}
          selectedMissionId={selectedMissionId}
          onSelectMission={setSelectedMissionId}
          onNewMission={() => setCreateMissionOpen(true)}
        />
      </div>
      <main className="flex-1 overflow-y-auto">
        {renderDashboard()}
      </main>
      <CreateMissionDialog
        isOpen={isCreateMissionOpen}
        onOpenChange={setCreateMissionOpen}
        onMissionCreated={fetchMissions}
      />
      <Toaster theme="dark" richColors />
    </div>
  );
}