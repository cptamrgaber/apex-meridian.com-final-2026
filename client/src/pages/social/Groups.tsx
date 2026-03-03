import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Groups() {
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Groups</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Browse and manage your groups.</p>
        </CardContent>
      </Card>
    </div>
  );
}
