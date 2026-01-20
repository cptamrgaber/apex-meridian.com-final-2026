import { useState } from "react";
import { Plane, Users, Shield, Clock, CheckCircle, AlertTriangle, Calendar, TrendingUp } from "lucide-react";

export default function AMAVDashboardDemo() {
  const [activeTab, setActiveTab] = useState<"scheduling" | "compliance" | "operations">("scheduling");

  return (
    <div className="bg-gradient-to-br from-blue-950/80 to-cyan-950/80 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/30">
      <div className="mb-8">
        <h3 className="text-3xl font-bold text-white mb-3">Interactive Dashboard Demo</h3>
        <p className="text-gray-300">Explore the AM-AV OCC System interface - click tabs to see different modules</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-2 mb-8 border-b border-cyan-500/20 pb-2">
        <button
          onClick={() => setActiveTab("scheduling")}
          className={`px-6 py-3 rounded-t-lg font-semibold transition-all ${
            activeTab === "scheduling"
              ? "bg-cyan-500/20 text-cyan-400 border-b-2 border-cyan-400"
              : "text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10"
          }`}
        >
          <Users className="h-5 w-5 inline-block mr-2" />
          Crew Scheduling
        </button>
        <button
          onClick={() => setActiveTab("compliance")}
          className={`px-6 py-3 rounded-t-lg font-semibold transition-all ${
            activeTab === "compliance"
              ? "bg-cyan-500/20 text-cyan-400 border-b-2 border-cyan-400"
              : "text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10"
          }`}
        >
          <Shield className="h-5 w-5 inline-block mr-2" />
          Compliance Monitor
        </button>
        <button
          onClick={() => setActiveTab("operations")}
          className={`px-6 py-3 rounded-t-lg font-semibold transition-all ${
            activeTab === "operations"
              ? "bg-cyan-500/20 text-cyan-400 border-b-2 border-cyan-400"
              : "text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10"
          }`}
        >
          <Plane className="h-5 w-5 inline-block mr-2" />
          Live Operations
        </button>
      </div>

      {/* Tab Content */}
      <div className="min-h-[500px]">
        {activeTab === "scheduling" && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-950/50 rounded-lg p-6 border border-cyan-500/10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-semibold">Total Pilots</h4>
                  <Users className="h-8 w-8 text-cyan-400" />
                </div>
                <p className="text-4xl font-bold text-white mb-2">247</p>
                <p className="text-sm text-gray-400">Active crew members</p>
              </div>
              <div className="bg-blue-950/50 rounded-lg p-6 border border-cyan-500/10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-semibold">Scheduled Flights</h4>
                  <Calendar className="h-8 w-8 text-blue-400" />
                </div>
                <p className="text-4xl font-bold text-white mb-2">1,842</p>
                <p className="text-sm text-gray-400">This month</p>
              </div>
              <div className="bg-blue-950/50 rounded-lg p-6 border border-cyan-500/10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-semibold">Avg Satisfaction</h4>
                  <TrendingUp className="h-8 w-8 text-green-400" />
                </div>
                <p className="text-4xl font-bold text-white mb-2">94%</p>
                <p className="text-sm text-gray-400">Crew feedback score</p>
              </div>
            </div>

            <div className="bg-blue-950/50 rounded-lg p-6 border border-cyan-500/10">
              <h4 className="text-white font-semibold mb-4">Monthly Roster - January 2026</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-cyan-500/20">
                      <th className="text-left text-cyan-400 font-semibold py-3 px-4">Pilot ID</th>
                      <th className="text-left text-cyan-400 font-semibold py-3 px-4">Name</th>
                      <th className="text-left text-cyan-400 font-semibold py-3 px-4">Aircraft Type</th>
                      <th className="text-left text-cyan-400 font-semibold py-3 px-4">Flight Hours</th>
                      <th className="text-left text-cyan-400 font-semibold py-3 px-4">Days Off</th>
                      <th className="text-left text-cyan-400 font-semibold py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: "P-1042", name: "Capt. Ahmed M.", aircraft: "A320", hours: 87, daysOff: 8, status: "Active" },
                      { id: "P-1158", name: "F/O Sarah K.", aircraft: "B737", hours: 72, daysOff: 9, status: "Active" },
                      { id: "P-1203", name: "Capt. Mohamed A.", aircraft: "A330", hours: 94, daysOff: 7, status: "Active" },
                      { id: "P-1267", name: "F/O Omar H.", aircraft: "A320", hours: 68, daysOff: 10, status: "On Leave" },
                      { id: "P-1312", name: "Capt. Fatima R.", aircraft: "B787", hours: 91, daysOff: 8, status: "Active" },
                    ].map((pilot) => (
                      <tr key={pilot.id} className="border-b border-cyan-500/10 hover:bg-cyan-500/5 transition-colors">
                        <td className="py-3 px-4 text-gray-300 font-mono">{pilot.id}</td>
                        <td className="py-3 px-4 text-white">{pilot.name}</td>
                        <td className="py-3 px-4 text-gray-300">{pilot.aircraft}</td>
                        <td className="py-3 px-4 text-gray-300">{pilot.hours}h</td>
                        <td className="py-3 px-4 text-gray-300">{pilot.daysOff}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            pilot.status === "Active" 
                              ? "bg-green-500/20 text-green-400" 
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}>
                            {pilot.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg p-6 border border-cyan-500/20">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h5 className="text-white font-semibold mb-2">AI Scheduling Complete</h5>
                  <p className="text-gray-300 text-sm">
                    Monthly roster generated in 4.2 seconds with 100% compliance. All pilot preferences considered, 
                    zero flight time violations detected. Ready for Chief Pilot review.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "compliance" && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-950/30 rounded-lg p-6 border border-green-500/30">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-semibold">Compliance Status</h4>
                  <CheckCircle className="h-10 w-10 text-green-400" />
                </div>
                <p className="text-5xl font-bold text-green-400 mb-2">100%</p>
                <p className="text-sm text-gray-300">All schedules compliant with ICAO regulations</p>
              </div>
              <div className="bg-blue-950/50 rounded-lg p-6 border border-cyan-500/10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-semibold">Violations Prevented</h4>
                  <Shield className="h-10 w-10 text-cyan-400" />
                </div>
                <p className="text-5xl font-bold text-cyan-400 mb-2">847</p>
                <p className="text-sm text-gray-300">Potential violations caught this year</p>
              </div>
            </div>

            <div className="bg-blue-950/50 rounded-lg p-6 border border-cyan-500/10">
              <h4 className="text-white font-semibold mb-4">Real-Time Compliance Checks</h4>
              <div className="space-y-4">
                {[
                  { rule: "Flight Time Limitations (OM-A 7.1.2)", status: "pass", message: "All pilots within 900-hour annual limit" },
                  { rule: "Duty Period Restrictions (OM-A 7.1.3)", status: "pass", message: "Maximum 14-hour duty periods enforced" },
                  { rule: "Rest Requirements (OM-A 7.1.4)", status: "pass", message: "Minimum 12-hour rest between duties" },
                  { rule: "Recency Requirements (OM-A 8.2.1)", status: "pass", message: "All pilots current on aircraft type" },
                  { rule: "Medical Certificate Validity (OM-A 8.1.2)", status: "warning", message: "3 pilots with certificates expiring in 30 days" },
                ].map((check, index) => (
                  <div key={index} className="flex items-start bg-blue-900/30 rounded-lg p-4 border border-cyan-500/10">
                    {check.status === "pass" ? (
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <h5 className="text-white font-semibold text-sm mb-1">{check.rule}</h5>
                      <p className="text-gray-300 text-xs">{check.message}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      check.status === "pass" 
                        ? "bg-green-500/20 text-green-400" 
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}>
                      {check.status === "pass" ? "PASS" : "WARNING"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-950/50 rounded-lg p-6 border border-cyan-500/10">
              <h4 className="text-white font-semibold mb-4">Operations Manual Coverage</h4>
              <div className="grid md:grid-cols-4 gap-4">
                {["OM-A", "OM-B", "OM-C", "OM-D"].map((om) => (
                  <div key={om} className="bg-blue-900/30 rounded-lg p-4 border border-cyan-500/10 text-center">
                    <p className="text-cyan-400 font-bold text-2xl mb-2">{om}</p>
                    <p className="text-gray-300 text-xs mb-3">
                      {om === "OM-A" && "General Policies"}
                      {om === "OM-B" && "Aircraft Operating"}
                      {om === "OM-C" && "Route & Aerodrome"}
                      {om === "OM-D" && "Training"}
                    </p>
                    <div className="flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                      <span className="text-green-400 text-sm font-semibold">Enforced</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "operations" && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-blue-950/50 rounded-lg p-6 border border-cyan-500/10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-semibold text-sm">In Flight</h4>
                  <Plane className="h-8 w-8 text-cyan-400" />
                </div>
                <p className="text-4xl font-bold text-white mb-2">23</p>
                <p className="text-xs text-gray-400">Active aircraft</p>
              </div>
              <div className="bg-blue-950/50 rounded-lg p-6 border border-cyan-500/10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-semibold text-sm">On Duty</h4>
                  <Users className="h-8 w-8 text-blue-400" />
                </div>
                <p className="text-4xl font-bold text-white mb-2">68</p>
                <p className="text-xs text-gray-400">Crew members</p>
              </div>
              <div className="bg-blue-950/50 rounded-lg p-6 border border-cyan-500/10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-semibold text-sm">On Time</h4>
                  <Clock className="h-8 w-8 text-green-400" />
                </div>
                <p className="text-4xl font-bold text-white mb-2">96%</p>
                <p className="text-xs text-gray-400">Performance</p>
              </div>
              <div className="bg-blue-950/50 rounded-lg p-6 border border-cyan-500/10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-semibold text-sm">Alerts</h4>
                  <AlertTriangle className="h-8 w-8 text-yellow-400" />
                </div>
                <p className="text-4xl font-bold text-white mb-2">2</p>
                <p className="text-xs text-gray-400">Active alerts</p>
              </div>
            </div>

            <div className="bg-blue-950/50 rounded-lg p-6 border border-cyan-500/10">
              <h4 className="text-white font-semibold mb-4">Live Flight Tracking</h4>
              <div className="space-y-3">
                {[
                  { flight: "AM-401", route: "CAI → DXB", aircraft: "A320", crew: "Capt. Ahmed M. / F/O Sarah K.", status: "In Flight", eta: "14:25" },
                  { flight: "AM-502", route: "CAI → LHR", aircraft: "B787", crew: "Capt. Fatima R. / F/O Omar H.", status: "In Flight", eta: "16:40" },
                  { flight: "AM-203", route: "CAI → JED", aircraft: "A330", crew: "Capt. Mohamed A. / F/O Ali S.", status: "Boarding", eta: "13:15" },
                  { flight: "AM-108", route: "SSH → CAI", aircraft: "A320", crew: "Capt. Nour K. / F/O Layla M.", status: "Approaching", eta: "12:50" },
                ].map((flight, index) => (
                  <div key={index} className="flex items-center justify-between bg-blue-900/30 rounded-lg p-4 border border-cyan-500/10">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="bg-cyan-500/20 rounded-lg p-3">
                        <Plane className="h-6 w-6 text-cyan-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <p className="text-white font-bold">{flight.flight}</p>
                          <p className="text-gray-400 text-sm">{flight.route}</p>
                          <span className="text-xs text-gray-500">•</span>
                          <p className="text-gray-400 text-sm">{flight.aircraft}</p>
                        </div>
                        <p className="text-gray-400 text-xs">{flight.crew}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-gray-400 text-xs mb-1">ETA</p>
                        <p className="text-white font-semibold">{flight.eta}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        flight.status === "In Flight" ? "bg-green-500/20 text-green-400" :
                        flight.status === "Boarding" ? "bg-blue-500/20 text-blue-400" :
                        "bg-yellow-500/20 text-yellow-400"
                      }`}>
                        {flight.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-yellow-950/30 rounded-lg p-6 border border-yellow-500/30">
                <div className="flex items-start">
                  <AlertTriangle className="h-6 w-6 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="text-white font-semibold mb-2">Weather Alert - DXB</h5>
                    <p className="text-gray-300 text-sm mb-3">
                      Moderate turbulence reported at FL350. AM-401 crew notified, altitude adjustment recommended.
                    </p>
                    <p className="text-xs text-gray-400">12:34 UTC • Auto-notification sent</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-950/50 rounded-lg p-6 border border-cyan-500/10">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="text-white font-semibold mb-2">Crew Swap Approved</h5>
                    <p className="text-gray-300 text-sm mb-3">
                      F/O Sarah K. swap request for AM-502 approved. Replacement crew qualified and duty time compliant.
                    </p>
                    <p className="text-xs text-gray-400">11:58 UTC • Automated approval</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CTA Footer */}
      <div className="mt-8 pt-6 border-t border-cyan-500/20 text-center">
        <p className="text-gray-300 mb-4">Experience the full AM-AV OCC System with your airline's data</p>
        <a href="/contact">
          <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-bold hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg">
            Schedule Live Demo
          </button>
        </a>
      </div>
    </div>
  );
}
