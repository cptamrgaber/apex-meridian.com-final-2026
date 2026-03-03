import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreatorAnalytics() {
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Creator Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Analytics dashboard for content creators.</p>
        </CardContent>
      </Card>
    </div>
  );
}
