import { Button } from '@/registry/hairline/ui/button';

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-s5">
      <Button tone="solid">Record it</Button>
      <Button tone="quiet">Move to April</Button>
      <Button tone="ghost">Skip this month</Button>
      <Button tone="danger">Delete account</Button>
      <Button tone="solid" disabled>
        Locked until 22 March
      </Button>
    </div>
  );
}
