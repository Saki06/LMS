"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  Bell,
  Search,
  Menu,
  GraduationCap,
  School,
  Shield,
  Sparkles,
  ChevronDown,
  X,
  CheckCheck
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Navbar({ onToggleMobileSidebar }: { onToggleMobileSidebar: () => void }) {
  const { currentRole, currentUser, t, announcements, setCurrentView } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const roleBadgeColor = {
    student: "bg-[#ecf8f5] text-[#0d5c4d] border-[#c4e9e0]",
    teacher: "bg-[#fef7e6] text-[#b47a16] border-[#fde4af]",
    admin: "bg-slate-100 text-slate-800 border-slate-200"
  }[currentRole];

  const roleIcon = {
    student: <GraduationCap className="h-4 w-4" />,
    teacher: <School className="h-4 w-4" />,
    admin: <Shield className="h-4 w-4" />
  }[currentRole];

  return (
    <header className="h-16 sm:h-20 border-b border-[#e6ece8] bg-white px-4 sm:px-8 flex items-center justify-between shrink-0 z-50 select-none relative">
      <div className="flex items-center gap-4">
        {/* Mobile menu trigger */}
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Nawana Brand */}
        <div
          onClick={() => setCurrentView("dashboard")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          {/* Honey Gold Logo with Bold letter 'n' */}
          <div className="h-10 w-10 rounded-xl bg-[#f3b738] flex items-center justify-center text-slate-950 font-black text-xl shadow-sm group-hover:scale-105 transition-transform font-sans">
            n
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-[#0d2b26] lowercase">
                nawana
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ecf8f5] text-[#0d5c4d] border border-[#c4e9e0] text-[10px] font-bold">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0d5c4d]" />
                Built for Sri Lankan schools
              </span>
            </div>
            <p className="text-[9px] uppercase tracking-widest text-[#0d5c4d]/80 font-bold hidden sm:block">
              LEARN · GROW · LEAD
            </p>
          </div>
        </div>
      </div>

      {/* Center Search */}
      <div className="hidden md:flex items-center max-w-sm w-full mx-6">
        <div className="relative w-full">
          <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={t.common.search}
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-[#f6f9f7] border border-[#e2e8e4] text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0d5c4d] focus:bg-white focus:ring-2 focus:ring-[#0d5c4d]/10 transition-all"
          />
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        {/* Active Role Pill */}
        <div className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${roleBadgeColor}`}>
          {roleIcon}
          <span className="capitalize">{currentRole} Portal</span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative p-2.5 rounded-xl border transition-all cursor-pointer ${
              showNotifications
                ? "bg-[#ecf8f5] text-[#0d5c4d] border-[#c4e9e0]"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-transparent hover:border-slate-200"
            }`}
            title="Notifications & Announcements"
          >
            <Bell className="h-4 w-4" />
            {hasUnread && (
              <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-[#f3b738] ring-2 ring-white animate-pulse" />
            )}
          </button>

          {showNotifications && (
            <>
              {/* Backdrop for click outside */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowNotifications(false)}
              />

              {/* Notification Popover Panel */}
              <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <p className="font-extrabold text-sm text-[#0d2b26]">
                      {t.nav.announcements || "Notifications"}
                    </p>
                    {hasUnread && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold">
                        {announcements.length} New
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {hasUnread && (
                      <button
                        type="button"
                        onClick={() => setHasUnread(false)}
                        className="text-[10px] text-[#0d5c4d] font-bold hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <CheckCheck className="h-3 w-3" />
                        <span>Mark read</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setShowNotifications(false)}
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div className="mt-3 space-y-2.5 max-h-80 overflow-y-auto pr-1">
                  {announcements.map((a) => (
                    <div
                      key={a.id}
                      onClick={() => {
                        setCurrentView("announcements");
                        setShowNotifications(false);
                      }}
                      className="p-3 rounded-xl bg-[#f8faf9] border border-[#e6ece8] hover:bg-[#edf5f2] hover:border-[#b2e5d9] transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-bold text-slate-900 group-hover:text-[#0d5c4d] transition-colors line-clamp-1">
                          {a.title}
                        </p>
                        <span className="text-[10px] text-slate-400 shrink-0">{a.publishedAt}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                        {a.message}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-medium">Click any to view full details</span>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentView("announcements");
                      setShowNotifications(false);
                    }}
                    className="text-xs font-bold text-[#0d5c4d] hover:text-[#083e34] hover:underline cursor-pointer"
                  >
                    View All →
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Card - Clickable to open Profile */}
        <button
          type="button"
          onClick={() => setCurrentView("profile")}
          className="flex items-center gap-2.5 pl-3 border-l border-slate-200 group cursor-pointer text-left focus:outline-none"
          title="View & Edit Profile"
        >
          <div className="h-9 w-9 rounded-xl bg-[#0d5c4d] group-hover:bg-[#0a473b] group-hover:scale-105 flex items-center justify-center font-bold text-xs text-white shadow-sm transition-all ring-2 ring-transparent group-hover:ring-[#0d5c4d]/20">
            {currentUser.name.charAt(0)}
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-xs font-bold text-slate-900 group-hover:text-[#0d5c4d] transition-colors leading-none">
              {currentUser.name}
            </p>
            <p className="text-[10px] text-slate-500 mt-1 leading-none">
              {currentUser.role === "student" ? currentUser.class : currentUser.role} · <span className="text-[#0d5c4d] font-semibold">View Profile</span>
            </p>
          </div>
        </button>
      </div>
    </header>
  );
}
