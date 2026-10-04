"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  Home,
  BookOpen,
  FileText,
  HelpCircle,
  Award,
  Trophy,
  Calendar,
  Bell,
  Users,
  User,
  Layers,
  Settings,
  School,
  ClipboardCheck,
  Building2,
  Library,
  GraduationCap,
  TrendingUp,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Flame,
  PanelLeftClose,
  PanelLeftOpen,
  CheckCircle2,
  Bookmark,
  Link2
} from "lucide-react";

interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

interface NavSubItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeVariant?: "warning" | "default" | "gold";
  group?: string;
  children?: NavSubItem[];
}

export function Sidebar({ isMobileOpen, onCloseMobile }: SidebarProps) {
  const { currentRole, currentView, setCurrentView, t, submissions } = useApp();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    my_learning: true,
    school_life: false
  });
  const [selectedStreakDate, setSelectedStreakDate] = useState<number>(2);
  const [miniCalMonth, setMiniCalMonth] = useState<number>(9); // 9 = October
  const [miniCalYear, setMiniCalYear] = useState<number>(2026);

  const pendingSubmissionsCount = submissions.filter(
    (s) => s.status === "submitted"
  ).length;

  const handleNavClick = (view: string) => {
    setCurrentView(view);
    onCloseMobile();
  };

  const toggleGroup = (groupId: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  // Structured Nav with Groups
  const studentNav: NavItem[] = [
    // Core Learning Group
    { id: "dashboard", label: t.nav.dashboard, icon: Home, group: "Core Learning" },
    {
      id: "connect",
      label: "Connect",
      icon: Link2,
      badge: "Classes",
      badgeVariant: "gold",
      group: "Core Learning"
    },
    {
      id: "my_learning",
      label: t.nav.myLearning || "My Learning",
      icon: BookOpen,
      group: "Core Learning",
      children: [
        { id: "courses", label: "Syllabus & Lessons", icon: BookOpen },
        {
          id: "assignments",
          label: t.nav.assignments,
          icon: FileText,
          badge: "2 Active"
        },
        { id: "quizzes", label: t.nav.quizzes, icon: GraduationCap },
        {
          id: "past_papers",
          label: t.nav.pastPapers || "Past Papers",
          icon: Layers,
          badge: "Archive"
        }
      ]
    },
    {
      id: "library",
      label: t.nav.library || "Library",
      icon: Library,
      badge: "Hub",
      badgeVariant: "default",
      group: "Core Learning"
    },

    // Campus Life Group
    {
      id: "school_life",
      label: t.nav.schoolLife || "School Life",
      icon: Trophy,
      group: "Campus Life",
      children: [
        { id: "sports", label: "Sports", icon: Trophy },
        { id: "events", label: "Events", icon: Calendar },
        { id: "announcements", label: "Announcements", icon: Bell }
      ]
    },

    // Account & Profile
    { id: "profile", label: "My Profile", icon: User, group: "Personal Account" }
  ];

  const teacherNav: NavItem[] = [
    { id: "dashboard", label: t.nav.dashboard, icon: Home, group: "Teaching Studio" },
    {
      id: "connect",
      label: "Connect Hub",
      icon: Link2,
      badge: "Subscribers",
      badgeVariant: "gold",
      group: "Teaching Studio"
    },
    { id: "syllabus", label: t.nav.syllabus, icon: Layers, group: "Teaching Studio" },
    { id: "assignments", label: t.nav.assignments, icon: FileText, group: "Assessments & Review" },
    {
      id: "submissions",
      label: t.nav.submissions,
      icon: ClipboardCheck,
      badge: pendingSubmissionsCount > 0 ? `${pendingSubmissionsCount} Pending` : undefined,
      badgeVariant: "warning",
      group: "Assessments & Review"
    },
    {
      id: "library",
      label: "Library Resources",
      icon: Library,
      badge: "Author",
      badgeVariant: "gold",
      group: "Assessments & Review"
    },
    { id: "announcements", label: t.nav.announcements, icon: Bell, group: "Campus Operations" }
  ];

  const adminNav: NavItem[] = [
    { id: "dashboard", label: t.nav.dashboard, icon: Home, group: "Control Center" },
    {
      id: "connect",
      label: "Connect Hub",
      icon: Link2,
      badge: "Classes",
      badgeVariant: "default",
      group: "Institution Setup"
    },
    { id: "schools", label: t.nav.schoolSetup, icon: Building2, group: "Institution Setup" },
    { id: "classes", label: t.nav.classes, icon: School, group: "Institution Setup" },
    { id: "subjects", label: "Curriculum Subjects", icon: BookOpen, group: "Institution Setup" },
    { id: "users", label: t.nav.users, icon: Users, group: "Institution Setup" },
    { id: "library", label: "Library Repository", icon: Library, group: "Institution Setup" },
    { id: "sports_admin", label: "Sports Operations", icon: Trophy, group: "Campus Operations" },
    { id: "events_admin", label: "Event Operations", icon: Calendar, group: "Campus Operations" },
    { id: "announcements", label: t.nav.announcements, icon: Bell, group: "Campus Operations" },
    { id: "profile", label: "Admin Profile", icon: User, group: "System Configuration" },
    { id: "settings", label: t.nav.settings, icon: Settings, group: "System Configuration" }
  ];

  const currentNavItems = {
    student: studentNav,
    teacher: teacherNav,
    admin: adminNav
  }[currentRole];

  // Group items by their section
  const groupedItems = React.useMemo(() => {
    const groups: { [key: string]: NavItem[] } = {};
    currentNavItems.forEach((item) => {
      const g = item.group || "General";
      if (!groups[g]) groups[g] = [];
      groups[g].push(item);
    });
    return groups;
  }, [currentNavItems]);

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 lg:hidden animate-in fade-in duration-200"
          onClick={onCloseMobile}
        />
      )}

      {/* FLOATING GLASS ISLAND ASIDE */}
      <aside
        className={`fixed lg:static top-[121px] bottom-3 left-3 z-40 flex flex-col transition-all duration-300 ease-in-out shrink-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${isCollapsed ? "w-20" : "w-[280px]"} my-0 lg:my-3 lg:ml-3 lg:mr-0 h-[calc(100vh-140px)]`}
      >
        <div className="h-full w-full rounded-3xl bg-white border border-[#e2eae5] shadow-[0_16px_40px_-12px_rgba(13,92,77,0.12),0_2px_8px_rgba(0,0,0,0.04)] ring-1 ring-black/5 flex flex-col overflow-hidden relative transition-all">
          {/* Top Glass Header & Collapse Toggle */}
          <div className="p-3.5 pb-2 border-b border-[#eef4f0] flex items-center justify-between bg-white">
            {!isCollapsed && (
              <div className="flex items-center gap-2 pl-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0d5c4d]/80">
                  {currentRole} Workspace
                </span>
              </div>
            )}

            {/* Collapse / Expand Toggle Button */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`p-1.5 rounded-xl hover:bg-[#ecf8f5] text-slate-400 hover:text-[#0d5c4d] transition-colors ${
                isCollapsed ? "mx-auto" : "ml-auto"
              }`}
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isCollapsed ? (
                <PanelLeftOpen className="h-4 w-4" />
              ) : (
                <PanelLeftClose className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Navigation List Area */}
          <div
            className="flex-1 overflow-y-auto px-2.5 py-3 space-y-4 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {Object.entries(groupedItems).map(([groupTitle, items], gIdx) => (
              <div key={groupTitle} className="space-y-1">
                {/* Section Group Header */}
                {!isCollapsed ? (
                  <div className="px-3 pt-1 pb-1 text-[9.5px] font-bold uppercase tracking-wider text-slate-400/90 flex items-center justify-between">
                    <span>{groupTitle}</span>
                    <span className="h-px flex-1 ml-2 bg-slate-100" />
                  </div>
                ) : gIdx > 0 ? (
                  <div className="h-px w-6 mx-auto my-2 bg-slate-200" />
                ) : null}

                {/* Nav Items in this group */}
                {items.map((item) => {
                  const Icon = item.icon;
                  const hasChildren = item.children && item.children.length > 0;
                  const isChildActive = hasChildren && item.children?.some((c) => c.id === currentView);
                  const isActive = currentView === item.id || isChildActive;
                  const isGroupOpen = openGroups[item.id] ?? true;

                  if (hasChildren && !isCollapsed) {
                    return (
                      <div key={item.id} className="space-y-1 pt-0.5">
                        <button
                          onClick={() => toggleGroup(item.id)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all group ${
                            isChildActive
                              ? "bg-[#ecf8f5]/80 text-[#0d5c4d]"
                              : "text-slate-600 hover:text-[#0d5c4d] hover:bg-[#f6f9f7]"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon
                              className={`h-4 w-4 transition-transform group-hover:scale-110 ${
                                isChildActive ? "text-[#0d5c4d]" : "text-slate-400 group-hover:text-[#0d5c4d]"
                              }`}
                            />
                            <span>{item.label}</span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] text-slate-400 font-semibold px-1.5 py-0.2 rounded-md bg-slate-100">
                              {item.children?.length}
                            </span>
                            {isGroupOpen ? (
                              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                            ) : (
                              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                            )}
                          </div>
                        </button>

                        {/* Sub-items Tree */}
                        {isGroupOpen && (
                          <div className="pl-4 ml-3 border-l-2 border-[#e2eae4] space-y-0.5 pt-0.5">
                            {item.children?.map((child, index) => {
                              const ChildIcon = child.icon;
                              const isSubActive = currentView === child.id;
                              const isLast = index === (item.children?.length ?? 0) - 1;

                              return (
                                <button
                                  key={child.id}
                                  onClick={() => handleNavClick(child.id)}
                                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all relative ${
                                    isSubActive
                                      ? "bg-[#ecf8f5] text-[#0d5c4d] font-bold shadow-xs border border-[#c4e9e0]"
                                      : "text-slate-500 hover:text-[#0d5c4d] hover:bg-[#f6f9f7]"
                                  }`}
                                >
                                  <div className="flex items-center gap-2 truncate">
                                    <span className="text-slate-300 text-[10px] font-mono select-none">
                                      {isLast ? "└──" : "├──"}
                                    </span>
                                    <ChildIcon
                                      className={`h-3.5 w-3.5 transition-colors shrink-0 ${
                                        isSubActive ? "text-[#0d5c4d]" : "text-slate-400"
                                      }`}
                                    />
                                    <span className="truncate">{child.label}</span>
                                  </div>

                                  {child.badge && (
                                    <span className="text-[9.5px] font-bold px-1.5 py-0.2 rounded-full bg-[#fef7e6] text-[#b47a16] border border-[#fde4af] ml-auto shrink-0">
                                      {child.badge}
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  }

                  // Standard Button Item (Expanded or Collapsed)
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center text-left ${
                        isCollapsed ? "justify-center p-2.5" : "justify-between px-2.5 py-2"
                      } rounded-xl text-xs font-bold transition-all group relative ${
                        isActive
                          ? "bg-gradient-to-r from-[#ecf8f5] to-white text-[#0d5c4d] border border-[#b2e5d9] shadow-[0_2px_10px_rgba(13,92,77,0.06)]"
                          : "text-slate-600 hover:text-[#0d5c4d] hover:bg-[#f6f9f7] hover:translate-x-0.5 border border-transparent"
                      }`}
                      title={isCollapsed ? item.label : undefined}
                    >
                      {/* Active Indicator Bar on the Left */}
                      {isActive && (
                        <span className="absolute left-1 top-2 bottom-2 w-1 rounded-full bg-[#0d5c4d] shadow-[0_0_8px_rgba(13,92,77,0.5)]" />
                      )}

                      <div className="flex items-center gap-2.5 min-w-0 text-left">
                        <Icon
                          className={`h-4 w-4 shrink-0 transition-all group-hover:scale-110 ${
                            isActive
                              ? "text-[#0d5c4d]"
                              : "text-slate-400 group-hover:text-[#0d5c4d]"
                          }`}
                        />
                        {!isCollapsed && (
                          <span className="text-left font-bold leading-tight">
                            {item.label}
                          </span>
                        )}
                      </div>

                      {/* Badge if present and not collapsed */}
                      {!isCollapsed && item.badge && (
                        <span
                          className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full shrink-0 ml-1.5 whitespace-nowrap ${
                            item.badgeVariant === "warning"
                              ? "bg-[#fef7e6] text-[#b47a16] border border-[#fde4af]"
                              : item.badgeVariant === "gold"
                              ? "bg-[#fff9e6] text-[#92600b] border border-[#fae59e]"
                              : "bg-[#ecf8f5] text-[#0d5c4d] border border-[#c4e9e0]"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}

                      {/* Mini indicator dot when collapsed and active */}
                      {isCollapsed && isActive && (
                        <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#0d5c4d]" />
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* TRENDING BOTTOM MINI-WIDGET (Student Study Streak / Quick Info) */}
          <div className="p-3 border-t border-[#eef4f0] bg-white">
            {!isCollapsed ? (
              <div className="rounded-2xl p-3 bg-gradient-to-br from-[#f6fbf9] to-[#edf7f4] border border-[#d6ede6] text-[11px] text-slate-600 space-y-2 shadow-xs">
                {currentRole === "student" ? (
                  <>
                    {/* MINI CALENDAR WIDGET */}
                    <div className="space-y-2">
                      {/* Mini Calendar Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-[#0d5c4d]" />
                          <span className="font-extrabold text-[#0d2b26] text-xs">
                            {miniCalMonth === 9 ? "October 2026" : miniCalMonth === 8 ? "September 2026" : "November 2026"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setMiniCalMonth((prev) => (prev > 0 ? prev - 1 : 11));
                            }}
                            className="p-1 rounded-md hover:bg-slate-200/60 text-slate-500 hover:text-slate-800 transition-colors"
                            title="Previous Month"
                          >
                            <ChevronLeft className="h-3 w-3" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setMiniCalMonth((prev) => (prev < 11 ? prev + 1 : 0));
                            }}
                            className="p-1 rounded-md hover:bg-slate-200/60 text-slate-500 hover:text-slate-800 transition-colors"
                            title="Next Month"
                          >
                            <ChevronRight className="h-3 w-3" />
                          </button>
                        </div>
                      </div>

                      {/* Day of Week Headers */}
                      <div className="grid grid-cols-7 gap-1 text-center font-bold text-[9px] text-slate-400 uppercase">
                        <span>Su</span>
                        <span>Mo</span>
                        <span>Tu</span>
                        <span>We</span>
                        <span>Th</span>
                        <span>Fr</span>
                        <span>Sa</span>
                      </div>

                      {/* Date Cells Grid */}
                      <div className="grid grid-cols-7 gap-1 text-center">
                        {/* Days from Sept (Padding: 27, 28, 29, 30) */}
                        {[27, 28, 29, 30].map((d) => (
                          <span key={`prev-${d}`} className="h-5 flex items-center justify-center text-[9px] text-slate-300 select-none">
                            {d}
                          </span>
                        ))}

                        {/* Days 1 to 31 for October */}
                        {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => {
                          const isToday = d === 2; // Today is Oct 2
                          const isSelected = selectedStreakDate === d;
                          const hasStreak = [25, 26, 27, 28, 29, 30, 1].includes(d);
                          const hasEvent = [4, 12, 15, 22].includes(d);

                          return (
                            <button
                              key={`oct-${d}`}
                              type="button"
                              onClick={() => {
                                setSelectedStreakDate(d);
                              }}
                              className={`h-5 w-full rounded-md flex flex-col items-center justify-center text-[9.5px] transition-all relative group cursor-pointer ${
                                isToday
                                  ? "bg-[#0d5c4d] text-white font-black shadow-xs ring-1 ring-[#0d5c4d]/30"
                                  : isSelected
                                  ? "bg-[#d8efe8] text-[#0d5c4d] font-bold"
                                  : hasStreak
                                  ? "bg-[#ecf8f5] text-[#0d5c4d] font-semibold hover:bg-[#def3ed]"
                                  : "text-slate-600 hover:bg-slate-200/50 hover:text-slate-900"
                              }`}
                              title={`October ${d}, 2026 ${isToday ? "(Today)" : ""} ${hasStreak ? "• 2+ Hrs Studied" : ""} ${hasEvent ? "• Event Scheduled" : ""}`}
                            >
                              <span>{d}</span>
                              {hasEvent && !isToday && (
                                <span className="absolute bottom-0.5 h-1 w-1 rounded-full bg-amber-500" />
                              )}
                              {hasStreak && !isToday && !hasEvent && (
                                <span className="absolute bottom-0.5 h-0.5 w-1.5 rounded-full bg-emerald-500/60" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Mini Calendar Footer Info */}
                      <div className="flex items-center justify-between pt-1.5 border-t border-slate-200/60 text-[9.5px]">
                        <span className="font-bold text-[#0d5c4d] flex items-center gap-1">
                          <Flame className="h-3 w-3 text-amber-500 fill-amber-500" />
                          <span>7d Streak Active</span>
                        </span>
                        <span className="text-[9.5px] font-semibold text-slate-400">
                          October 2026
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="font-bold text-[#0d2b26] flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#f3b738]" />
                      Nawana Platform
                    </p>
                    <p className="text-[10px] leading-relaxed text-slate-500">
                      Educating, inspiring, and connecting learners across Sri Lanka.
                    </p>
                  </>
                )}
              </div>
            ) : (
              /* Mini collapsed badge */
              <div
                className="flex items-center justify-center p-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-200"
                title="7-Day Study Streak Active"
              >
                <Flame className="h-4 w-4 fill-current text-amber-500" />
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
