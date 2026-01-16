import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Server, MapPin, Calendar, CheckCircle, Clock, AlertCircle } from "lucide-react";

export default function DataCenterRoadmap() {
  const datacenters = [
    {
      id: 1,
      name: "Cairo Primary Data Center",
      location: "New Cairo, Egypt",
      region: "Egypt",
      status: "operational",
      phase: "Phase 1",
      completionDate: "Q4 2025",
      capacity: "5,000 servers",
      features: [
        "Tier III+ certified facility",
        "99.99% uptime SLA",
        "Advanced cooling systems",
        "24/7 security and monitoring",
        "Redundant power systems",
        "Direct fiber connectivity"
      ],
      coordinates: { lat: 30.0444, lng: 31.2357 }
    },
    {
      id: 2,
      name: "Alexandria Backup Center",
      location: "Alexandria, Egypt",
      region: "Egypt",
      status: "under-construction",
      phase: "Phase 2",
      completionDate: "Q2 2026",
      capacity: "3,000 servers",
      features: [
        "Disaster recovery site",
        "Real-time data replication",
        "Coastal connectivity hub",
        "Green energy powered",
        "Automated failover systems"
      ],
      coordinates: { lat: 31.2001, lng: 29.9187 }
    },
    {
      id: 3,
      name: "Casablanca Regional Hub",
      location: "Casablanca, Morocco",
      region: "North Africa",
      status: "planned",
      phase: "Phase 3",
      completionDate: "Q4 2026",
      capacity: "4,000 servers",
      features: [
        "North Africa regional gateway",
        "Multi-language support",
        "European connectivity",
        "Compliance with EU data regulations",
        "Edge computing capabilities"
      ],
      coordinates: { lat: 33.5731, lng: -7.5898 }
    },
    {
      id: 4,
      name: "Dubai Technology Center",
      location: "Dubai, UAE",
      region: "Middle East",
      status: "planned",
      phase: "Phase 4",
      completionDate: "Q2 2027",
      capacity: "6,000 servers",
      features: [
        "Middle East headquarters",
        "AI processing hub",
        "Low-latency trading systems",
        "Financial services compliance",
        "Smart city integration"
      ],
      coordinates: { lat: 25.2048, lng: 55.2708 }
    },
    {
      id: 5,
      name: "Nairobi East Africa Hub",
      location: "Nairobi, Kenya",
      region: "Rest of Africa",
      status: "planned",
      phase: "Phase 5",
      completionDate: "Q4 2027",
      capacity: "3,500 servers",
      features: [
        "East Africa regional center",
        "Mobile-first infrastructure",
        "Renewable energy powered",
        "Cross-border connectivity",
        "Development program support"
      ],
      coordinates: { lat: -1.2921, lng: 36.8219 }
    },
    {
      id: 6,
      name: "Lagos West Africa Center",
      location: "Lagos, Nigeria",
      region: "Rest of Africa",
      status: "planned",
      phase: "Phase 6",
      completionDate: "Q2 2028",
      capacity: "4,500 servers",
      features: [
        "West Africa gateway",
        "High-capacity backbone",
        "Fintech infrastructure",
        "Regional data sovereignty",
        "Subsea cable landing station"
      ],
      coordinates: { lat: 6.5244, lng: 3.3792 }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-500/20 text-green-400 border-green-500/50";
      case "under-construction":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
      case "planned":
        return "bg-blue-500/20 text-blue-400 border-blue-500/50";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-4 w-4" />;
      case "under-construction":
        return <Clock className="h-4 w-4" />;
      case "planned":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <>


      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-950 to-gray-900">
        <Header />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-cyan-500/20 text-cyan-400 border-cyan-500/50">
                <Server className="mr-2 h-4 w-4" />
                Infrastructure Expansion
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                Data Center Roadmap
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Building sovereign, self-hosted AI infrastructure across Egypt, North Africa, Middle East, and Africa.
                Ensuring data residency, low latency, and regional compliance.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline Overview */}
        <section className="py-16 px-4">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-white">
                Expansion Timeline
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <Card className="bg-gray-800/50 border-green-500/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="h-5 w-5" />
                      Operational
                    </CardTitle>
                    <CardDescription>Currently serving customers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-white">1</p>
                    <p className="text-gray-400">Data Center</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-yellow-500/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-yellow-400">
                      <Clock className="h-5 w-5" />
                      Under Construction
                    </CardTitle>
                    <CardDescription>Active development phase</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-white">1</p>
                    <p className="text-gray-400">Data Center</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-blue-500/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-400">
                      <AlertCircle className="h-5 w-5" />
                      Planned
                    </CardTitle>
                    <CardDescription>Future expansion sites</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-white">4</p>
                    <p className="text-gray-400">Data Centers</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Data Centers List */}
        <section className="py-16 px-4">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-white">
                Regional Infrastructure
              </h2>
              <div className="space-y-6">
                {datacenters.map((dc) => (
                  <Card key={dc.id} className="bg-gray-800/50 border-gray-700 hover:border-cyan-500/50 transition-colors">
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <CardTitle className="text-2xl text-white flex items-center gap-3">
                            <Server className="h-6 w-6 text-cyan-400" />
                            {dc.name}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-2">
                            <MapPin className="h-4 w-4" />
                            {dc.location}
                          </CardDescription>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge className={getStatusColor(dc.status)}>
                            {getStatusIcon(dc.status)}
                            <span className="ml-1 capitalize">{dc.status.replace("-", " ")}</span>
                          </Badge>
                          <Badge variant="outline" className="border-purple-500/50 text-purple-400">
                            {dc.phase}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Region</p>
                          <p className="text-white font-semibold">{dc.region}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Completion Date</p>
                          <p className="text-white font-semibold flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-cyan-400" />
                            {dc.completionDate}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Capacity</p>
                          <p className="text-white font-semibold">{dc.capacity}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-3">Key Features</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {dc.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300 text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Strategic Benefits */}
        <section className="py-16 px-4">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-white">
                Strategic Benefits
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border-cyan-500/30">
                  <CardHeader>
                    <CardTitle className="text-cyan-400">Data Sovereignty</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">
                      Complete control over data storage and processing within regional boundaries, ensuring compliance with local regulations and data protection laws.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-500/30">
                  <CardHeader>
                    <CardTitle className="text-blue-400">Low Latency</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">
                      Regional data centers reduce latency by 60-80% compared to overseas hosting, enabling real-time AI applications and seamless user experiences.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="text-purple-400">Cost Efficiency</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">
                      Self-hosted infrastructure eliminates cloud provider markups and data egress fees, reducing operational costs by up to 40% at scale.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-900/20 to-cyan-900/20 border-green-500/30">
                  <CardHeader>
                    <CardTitle className="text-green-400">Regional Expertise</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">
                      Local teams understand regional requirements, languages, and business practices, providing superior support and customization.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-yellow-500/30">
                  <CardHeader>
                    <CardTitle className="text-yellow-400">Disaster Recovery</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">
                      Multi-site redundancy ensures business continuity with automated failover and real-time data replication across facilities.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-red-900/20 to-pink-900/20 border-red-500/30">
                  <CardHeader>
                    <CardTitle className="text-red-400">Economic Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">
                      Infrastructure investment creates local jobs, technology transfer, and economic development in emerging markets.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
