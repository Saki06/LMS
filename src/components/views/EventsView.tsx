"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  Sparkles,
  Share2,
  Bookmark,
  Bell,
  Search,
  Filter,
  ArrowRight,
  GraduationCap,
  Trophy,
  Activity
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function EventsView() {
  const { events, registerEvent, addToast } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAudience, setSelectedAudience] = useState<string>("all");

  const filteredEvents = events.filter((evt) => {
    if (selectedAudience !== "all" && evt.audience !== selectedAudience) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = evt.title.toLowerCase().includes(q);
      const matchDesc = evt.description.toLowerCase().includes(q);
      const matchVenue = evt.venue.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchVenue) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a2f40] via-[#144759] to-[#0d3441] text-white p-6 sm:p-8 shadow-md">
        <div className="absolute right-0 top-0 translate-x-6 -translate-y-4 opacity-10 pointer-events-none">
          <Calendar className="h-72 w-72 text-white" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-cyan-200">
              <Calendar className="h-3.5 w-3.5 text-[#f3b738]" />
              <span>Campus Calendar & Community Activities</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              School Life → Events
            </h1>
            <p className="text-sm text-cyan-100/80 leading-relaxed">
              Discover annual athletic meets, science & AI exhibitions, academic review summits,
              inter-school debates, and student cultural assemblies.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-xs shrink-0">
            <div className="text-center px-3 border-r border-white/20">
              <p className="text-xl font-extrabold text-white">{events.length}</p>
              <p className="text-[10px] text-cyan-200">Upcoming Events</p>
            </div>
            <div className="text-center px-3">
              <p className="text-xl font-extrabold text-[#f3b738]">
                {events.filter((e) => e.isRegisteredByCurrentUser).length}
              </p>
              <p className="text-[10px] text-cyan-200">Your RSVPs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-[#e6ece8] p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search events by title, description, or venue..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#d6dfd9] text-xs bg-[#fbfcfb] focus:ring-2 focus:ring-[#0d5c4d]/20 focus:border-[#0d5c4d]"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
          <span className="text-xs text-slate-400 font-semibold">Audience:</span>
          <select
            value={selectedAudience}
            onChange={(e) => setSelectedAudience(e.target.value)}
            className="py-2 px-3 rounded-xl border border-[#d6dfd9] text-xs bg-white text-slate-700 font-semibold"
          >
            <option value="all">All Audiences</option>
            <option value="students">Students Only</option>
            <option value="grade_12">Grade 12 Only</option>
            <option value="teachers">Faculty / Teachers</option>
          </select>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((evt) => {
          const capacityPct = Math.min(100, Math.round((evt.registeredCount / evt.capacity) * 100));

          return (
            <Card
              key={evt.id}
              className="border-[#e6ece8] bg-white shadow-xs overflow-hidden flex flex-col justify-between hover:border-[#c4e9e0] hover:shadow-md transition-all"
            >
              <div>
                <div className="p-4 bg-[#fef7e6] border-b border-[#fde4af] flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#b47a16] uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{evt.date}</span>
                  </span>
                  <Badge variant="warning" className="text-[10px] uppercase font-bold">
                    {evt.audience.replace("_", " ")}
                  </Badge>
                </div>

                <CardContent className="p-6 space-y-3.5">
                  <CardTitle className="text-base font-extrabold text-[#0d2b26] leading-snug">
                    {evt.title}
                  </CardTitle>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {evt.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-[#f0f4f1] text-xs text-slate-500">
                    <p className="flex items-center gap-2 font-medium">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      <span>{evt.time}</span>
                    </p>
                    <p className="flex items-center gap-2 font-medium">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      <span className="line-clamp-1">{evt.venue}</span>
                    </p>
                    <p className="flex items-center gap-2 font-medium">
                      <Users className="h-3.5 w-3.5 text-slate-400" />
                      <span>Organized by: {evt.organizer}</span>
                    </p>
                  </div>

                  {/* Capacity progress */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                      <span>Seat Registrations</span>
                      <span>
                        {evt.registeredCount} / {evt.capacity} ({capacityPct}%)
                      </span>
                    </div>
                    <div className="h-2 w-full bg-[#eef3f0] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#0d5c4d] rounded-full transition-all"
                        style={{ width: `${capacityPct}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </div>

              <div className="p-6 pt-0 space-y-2">
                <Button
                  onClick={() => registerEvent(evt.id)}
                  variant={evt.isRegisteredByCurrentUser ? "secondary" : "default"}
                  className={`w-full font-bold text-xs py-2.5 rounded-xl transition-all ${
                    evt.isRegisteredByCurrentUser
                      ? "bg-[#ecf8f5] text-[#0d5c4d] border border-[#c4e9e0]"
                      : "bg-[#0d5c4d] hover:bg-[#083e34] text-white shadow-xs"
                  }`}
                >
                  {evt.isRegisteredByCurrentUser ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-1.5 text-[#0d5c4d]" />
                      <span>RSVP Confirmed (Click to Cancel)</span>
                    </>
                  ) : (
                    <span>Register / RSVP Now</span>
                  )}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
