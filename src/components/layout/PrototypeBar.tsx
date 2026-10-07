"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { UserRole, LocaleCode } from "@/types/lms";
import { Sun, Moon, Globe, Shield, GraduationCap, School } from "lucide-react";

export function PrototypeBar() {
  const {
    currentRole,
    setCurrentRole,
    locale,
    setLocale,
    theme,
    setTheme,
    t
  } = useApp();

  return (
    <div className="bg-[#082a24] text-slate-200 border-b border-[#0f443b] px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-3 sticky top-0 z-50">
      {/* Brand & Prototype indicator */}
      <div className="flex items-center gap-2 font-bold text-white tracking-wide">
        <span className="flex h-2.5 w-2.5 rounded-full bg-[#f3b738] shadow-[0_0_8px_#f3b738]" />
        <span className="font-extrabold tracking-tight text-white text-sm">
          nawana
        </span>
        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#0d5c4d] text-emerald-200 border border-[#167866]">
          Interactive System
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Tenant Simulator Selector */}
        <div className="flex items-center gap-1.5 bg-[#051c18] border border-[#14473e] rounded-xl px-2 py-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Client:</span>
          <select
            value={useApp().activeTenantId}
            onChange={(e) => useApp().setActiveTenantId(e.target.value)}
            className="bg-transparent text-[11px] font-bold text-emerald-300 focus:outline-hidden cursor-pointer"
          >
            {useApp().tenants.map((tenant) => (
              <option key={tenant.id} value={tenant.id} className="bg-[#082a24] text-white">
                {tenant.type === "school" ? "🏫" : tenant.type === "tuition_center" ? "🏛️" : "👨‍🏫"} {tenant.name}
              </option>
            ))}
          </select>
        </div>

        {/* Role Switcher */}
        <div className="flex items-center bg-[#051c18] border border-[#14473e] rounded-xl p-0.5">
          <button
            onClick={() => setCurrentRole("student")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition-all ${
              currentRole === "student"
                ? "bg-[#0d5c4d] text-white shadow-sm"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <GraduationCap className="h-3.5 w-3.5 text-emerald-300" />
            <span>{t.roleStudent}</span>
          </button>
          <button
            onClick={() => setCurrentRole("teacher")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition-all ${
              currentRole === "teacher"
                ? "bg-[#f3b738] text-slate-950 shadow-sm"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <School className="h-3.5 w-3.5 text-slate-900" />
            <span>{t.roleTeacher}</span>
          </button>
          <button
            onClick={() => setCurrentRole("admin")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition-all ${
              currentRole === "admin"
                ? "bg-slate-200 text-slate-950 shadow-sm"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <Shield className="h-3.5 w-3.5 text-slate-900" />
            <span>{t.roleAdmin}</span>
          </button>
          <button
            onClick={() => setCurrentRole("super_admin")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition-all ${
              currentRole === "super_admin"
                ? "bg-[#f3b738] text-slate-950 shadow-sm font-black"
                : "text-amber-300 hover:text-amber-100"
            }`}
            title="Master Platform Management Portal"
          >
            <span className="text-xs">👑</span>
            <span>Super Admin</span>
          </button>
        </div>

        {/* Tri-lingual Language Switcher (Section 15 Principle) */}
        <div className="flex items-center bg-[#051c18] border border-[#14473e] rounded-xl p-0.5">
          <Globe className="h-3.5 w-3.5 ml-2 mr-1 text-slate-400" />
          <button
            onClick={() => setLocale("en")}
            className={`px-2 py-1 rounded-md transition-all text-[11px] ${
              locale === "en" ? "bg-[#0d5c4d] text-white font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLocale("ta")}
            className={`px-2 py-1 rounded-md transition-all text-[11px] ${
              locale === "ta" ? "bg-[#0d5c4d] text-white font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            தமிழ்
          </button>
          <button
            onClick={() => setLocale("si")}
            className={`px-2 py-1 rounded-md transition-all text-[11px] ${
              locale === "si" ? "bg-[#0d5c4d] text-white font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            සිංහල
          </button>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-1.5 rounded-lg bg-[#051c18] border border-[#14473e] text-slate-300 hover:text-white transition-colors"
          title="Toggle Dark / Light Theme"
        >
          {theme === "dark" ? <Sun className="h-3.5 w-3.5 text-[#f3b738]" /> : <Moon className="h-3.5 w-3.5" />}
        </button>
      </div>
    </div>
  );
}
