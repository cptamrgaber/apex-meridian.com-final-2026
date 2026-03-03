import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GroupDetail() {
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Group Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p>View group details and members.</p>
        </CardContent>
      </Card>
    </div>
  );
}
