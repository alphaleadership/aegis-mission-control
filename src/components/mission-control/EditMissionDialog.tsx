import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';
import { api } from '@/lib/api-client';
import { Launch } from '@shared/types';
import { format } from 'date-fns';
interface EditMissionDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onMissionUpdated: () => void;
  mission: Launch | null;
}
export function EditMissionDialog({ isOpen, onOpenChange, onMissionUpdated, mission }: EditMissionDialogProps) {
  const [missionName, setMissionName] = useState('');
  const [payload, setPayload] = useState('');
  const [rocketName, setRocketName] = useState('');
  const [destinationOrbit, setDestinationOrbit] = useState('');
  const [launchDate, setLaunchDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (mission) {
      setMissionName(mission.missionName);
      setPayload(mission.payload);
      setRocketName(mission.rocket.name);
      setDestinationOrbit(mission.destinationOrbit);
      setLaunchDate(format(new Date(mission.launchDate), "yyyy-MM-dd'T'HH:mm"));
    }
  }, [mission]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mission) return;
    if (!missionName || !payload || !rocketName || !destinationOrbit || !launchDate) {
      toast.error('Please fill out all required fields.');
      return;
    }
    setIsSubmitting(true);
    try {
      const updatedMissionData: Partial<Launch> = {
        missionName,
        payload,
        destinationOrbit,
        launchDate: new Date(launchDate).toISOString(),
        rocket: {
          ...mission.rocket,
          name: rocketName,
        },
      };
      await api<Launch>(`/api/launches/${mission.id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedMissionData),
      });
      toast.success('Mission updated successfully!');
      onMissionUpdated();
      onOpenChange(false);
    } catch (error) {
      toast.error('Failed to update mission.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-800 text-slate-50">
        <DialogHeader>
          <DialogTitle className="text-cyan-400">Edit Mission</DialogTitle>
          <DialogDescription>Update the details for this launch mission.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="missionName" className="text-right">
                Mission Name
              </Label>
              <Input id="missionName" value={missionName} onChange={(e) => setMissionName(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="payload" className="text-right">
                Payload
              </Label>
              <Input id="payload" value={payload} onChange={(e) => setPayload(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rocketName" className="text-right">
                Rocket
              </Label>
              <Input id="rocketName" value={rocketName} onChange={(e) => setRocketName(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="destinationOrbit" className="text-right">
                Orbit
              </Label>
              <Input id="destinationOrbit" value={destinationOrbit} onChange={(e) => setDestinationOrbit(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="launchDate" className="text-right">
                Launch Date
              </Label>
              <Input id="launchDate" type="datetime-local" value={launchDate} onChange={(e) => setLaunchDate(e.target.value)} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting} className="bg-cyan-600 hover:bg-cyan-700">
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}