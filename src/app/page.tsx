import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex gap-4">
      <Button size="sm">Click me</Button>
      <Button variant="destructive" size="sm">
        Click me
      </Button>
      <Button variant="outline" size="sm">
        Click me
      </Button>
      <Button variant="secondary" size="sm">
        Click me
      </Button>
      <Button variant="ghost" size="sm">
        Click me
      </Button>
      <Button variant="muted" size="sm">
        Click me
      </Button>
      <Button variant="teritary" size="sm">
        Click me
      </Button>
    </div>
  );
}
