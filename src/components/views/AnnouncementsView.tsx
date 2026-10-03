"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Bell, AlertTriangle, Calendar, User, CheckCircle2, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function AnnouncementsView() {
  const { announcements, t } = useApp();
  const [filterPriority, setFilterPriority] = useState<string>("all");

  const filteredAnnouncements = announcements.filter((a) => {
    if (filterPriority === "all") return true;
    return a.priority === filterPriority;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e6ece8]">
        <div>
          <h1 className="text-2xl font-black text-[#0d2b26]">{t.nav.announcements}</h1>
          <p className="text-xs text-slate-500 mt-1">
            Official circulars, academic notices, examination timetables, and athletic announcements.
          </p>
        </div>

        {/* Priority Filter */}
        <div className="flex items-center bg-white border border-[#e6ece8] rounded-xl p-1 shrink-0 shadow-2xs">
          <button
            onClick={() => setFilterPriority("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterPriority === "all"
                ? "bg-[#0d5c4d] text-white shadow-xs"
                : "text-slate-600 hover:text-[#0d5c4d]"
            }`}
          >
            All Notices
          </button>
          <button
            onClick={() => setFilterPriority("high")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterPriority === "high"
                ? "bg-[#f3b738] text-slate-950 shadow-xs"
                : "text-slate-600 hover:text-[#0d5c4d]"
            }`}
          >
            High Priority
          </button>
        </div>
      </div>

      {/* Announcements Feed */}
      <div className="space-y-4 max-w-4xl">
        {filteredAnnouncements.map((ann) => (
          <Card key={ann.id} className="border-[#e6ece8] bg-white shadow-xs overflow-hidden">
            <CardHeader className="p-6 pb-3 border-b border-[#f0f4f1]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge
                    variant={ann.priority === "high" ? "warning" : "success"}
                    className="text-[10px] uppercase font-bold"
                  >
                    {ann.priority === "high" ? "Urgent / Important" : "Official Notice"}
                  </Badge>
                  <span className="text-xs text-slate-500">• {ann.targetAudience}</span>
                </div>
                <span className="text-xs font-mono font-semibold text-slate-400">
                  {ann.publishedAt}
                </span>
              </div>
              <CardTitle className="text-lg font-black text-[#0d2b26] mt-2">
                {ann.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="p-6 space-y-4">
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                {ann.message}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-[#f0f4f1] text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-[#ecf8f5] text-[#0d5c4d] font-bold text-[10px] flex items-center justify-center">
                    {ann.authorName.charAt(0)}
                  </div>
                  <span className="font-semibold text-slate-700">{ann.authorName}</span>
                  <span className="text-[11px] text-slate-400">({ann.authorRole})</span>
                </div>
                <span className="text-[11px] text-[#0d5c4d] font-bold flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Verified Official Circular
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
