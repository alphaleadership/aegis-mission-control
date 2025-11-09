import React, { useState } from 'react';
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
import { addDays, format } from 'date-fns';
interface CreateMissionDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onMissionCreated: () => void;
}
export function CreateMissionDialog({ isOpen, onOpenChange, onMissionCreated }: CreateMissionDialogProps) {
  const [missionName, setMissionName] = useState('');
  const [payload, setPayload] = useState('');
  const [rocketName, setRocketName] = useState('');
  const [destinationOrbit, setDestinationOrbit] = useState('');
  const [launchDate, setLaunchDate] = useState(format(addDays(new Date(), 7), "yyyy-MM-dd'T'HH:mm"));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!missionName || !payload || !rocketName || !destinationOrbit || !launchDate) {
      toast.error('Please fill out all required fields.');
      return;
    }
    setIsSubmitting(true);
    try {
      const newMissionData: Partial<Launch> = {
        missionName,
        payload,
        destinationOrbit,
        launchDate: new Date(launchDate).toISOString(),
        rocket: {
          name: rocketName,
          height: 'N/A',
          diameter: 'N/A',
          mass: 'N/A',
          payloadToLEO: 'N/A',
        },
      };
      await api<Launch>('/api/launches', {
        method: 'POST',
        body: JSON.stringify(newMissionData),
      });
      toast.success('Mission created successfully!');
      onMissionCreated();
      onOpenChange(false);
      // Reset form
      setMissionName('');
      setPayload('');
      setRocketName('');
      setDestinationOrbit('');
      setLaunchDate(format(addDays(new Date(), 7), "yyyy-MM-dd'T'HH:mm"));
    } catch (error) {
      toast.error('Failed to create mission.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-800 text-slate-50">
        <DialogHeader>
          <DialogTitle className="text-cyan-400">Create New Mission</DialogTitle>
          <DialogDescription>Enter the details for the new launch mission.</DialogDescription>
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
              {isSubmitting ? 'Creating...' : 'Create Mission'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}