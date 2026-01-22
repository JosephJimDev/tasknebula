import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { BackgroundOrbs } from "@/components/BackgroundOrbs";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <BackgroundOrbs />
      <Card className="w-full max-w-md glass-panel border-white/10">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold font-display">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            The page you are looking for does not exist.
          </p>

          <Link href="/">
            <Button className="w-full mt-6 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/20">
              Return Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
