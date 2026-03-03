import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReportsDashboard() {
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Reports Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p>View and generate reports.</p>
        </CardContent>
      </Card>
    </div>
  );
}
