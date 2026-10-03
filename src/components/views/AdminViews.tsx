"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import {
  Building2,
  Users,
  School,
  Plus,
  BookOpen,
  LayoutDashboard,
  TrendingUp,
  Shield,
  Settings,
  Bell,
  Search,
  Edit,
  Trash2,
  Eye,
  ChevronRight,
  GraduationCap,
  UserCheck,
  UserPlus,
  Globe,
  Calendar,
  Activity,
  BarChart3,
  Database
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from "recharts";

interface AdminViewsProps {
  initialTab?: "overview" | "schools" | "classes" | "subjects" | "users" | "settings";
}

export function AdminViews({ initialTab = "overview" }: AdminViewsProps) {
  const {
    schools,
    grades,
    classes,
    subjects,
    courses,
    assignments,
    submissions,
    events,
    announcements,
    teams,
    currentView,
    createSchool,
    createClass,
    createSubject,
    createEvent,
    t
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<
    "overview" | "schools" | "classes" | "subjects" | "users" | "settings"
  >(initialTab);

  // Sync tab when sidebar click changes currentView
  useEffect(() => {
    if (currentView === "schools") setActiveAdminTab("schools");
    else if (currentView === "classes") setActiveAdminTab("classes");
    else if (currentView === "users") setActiveAdminTab("users");
    else if (currentView === "settings") setActiveAdminTab("settings");
    else if (currentView === "dashboard") setActiveAdminTab("overview");
  }, [currentView]);

  // School modal state
  const [isSchoolModalOpen, setIsSchoolModalOpen] = useState(false);
  const [schoolName, setSchoolName] = useState("");
  const [schoolCode, setSchoolCode] = useState("");
  const [district, setDistrict] = useState("Colombo");
  const [province, setProvince] = useState("Western");
  const [principal, setPrincipal] = useState("");

  // Class modal state
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [className, setClassName] = useState("");
  const [gradeId, setGradeId] = useState("grd_12");
  const [classTeacher, setClassTeacher] = useState("Mr. Samantha Perera");

  // Subject modal state
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [subjectGradeId, setSubjectGradeId] = useState("grd_12");

  // User search
  const [userSearch, setUserSearch] = useState("");
  const [userRoleFilter, setUserRoleFilter] = useState<"all" | "student" | "teacher" | "admin">("all");

  // Settings toggles
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [enrollmentOpen, setEnrollmentOpen] = useState(true);
  const [defaultLocale, setDefaultLocale] = useState("en");

  // Mock platform user data for the directory
  const platformUsers = [
    { id: "usr_admin_01", name: "Dr. K. Rajasingham", email: "principal@school.lk", role: "admin", school: "St. Michael High School", status: "Active", lastLogin: "2026-10-01 08:15" },
    { id: "usr_teacher_01", name: "Mr. Samantha Perera", email: "samantha.p@school.lk", role: "teacher", school: "St. Michael High School", status: "Active", lastLogin: "2026-10-01 07:30" },
    { id: "usr_teacher_02", name: "Mrs. N. Gunasekara", email: "gunasekara.n@school.lk", role: "teacher", school: "St. Michael High School", status: "Active", lastLogin: "2026-09-30 15:20" },
    { id: "usr_teacher_03", name: "Mr. M. Faizal", email: "faizal.m@school.lk", role: "teacher", school: "St. Michael High School", status: "Active", lastLogin: "2026-09-29 09:00" },
    { id: "usr_student_01", name: "Sathurjan K.", email: "sathurjan@school.lk", role: "student", school: "St. Michael High School", status: "Active", lastLogin: "2026-10-01 06:50" },
    { id: "usr_student_02", name: "Kasun Bandara", email: "kasun.b@school.lk", role: "student", school: "St. Michael High School", status: "Active", lastLogin: "2026-09-30 18:05" },
    { id: "usr_student_03", name: "Anuki Silva", email: "anuki.s@school.lk", role: "student", school: "St. Michael High School", status: "Active", lastLogin: "2026-10-01 07:12" },
    { id: "usr_student_04", name: "Dineth Perera", email: "dineth.p@school.lk", role: "student", school: "St. Michael High School", status: "Active", lastLogin: "2026-09-28 16:30" },
    { id: "usr_student_05", name: "Tharushi Fernando", email: "tharushi.f@school.lk", role: "student", school: "Hillwood Central College", status: "Active", lastLogin: "2026-09-30 14:10" },
    { id: "usr_teacher_04", name: "Mrs. S. Ratnam", email: "ratnam.s@hcc.lk", role: "teacher", school: "Hillwood Central College", status: "Inactive", lastLogin: "2026-08-15 10:00" }
  ];

  const filteredUsers = platformUsers.filter((u) => {
    const matchesRole = userRoleFilter === "all" || u.role === userRoleFilter;
    const matchesSearch =
      !userSearch ||
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const totalStudents = classes.reduce((sum, c) => sum + c.studentCount, 0);
  const totalTeachers = schools.reduce((sum, s) => sum + s.teacherCount, 0);

  // Grade-level enrollment breakdown for chart
  const enrollmentByGrade = grades.map((g) => ({
    grade: g.name.replace("Grade ", "G"),
    students: classes
      .filter((c) => c.gradeId === g.id)
      .reduce((sum, c) => sum + c.studentCount, 0)
  }));

  // Role distribution for pie chart
  const roleDistribution = [
    { name: "Students", value: totalStudents, fill: "#0d5c4d" },
    { name: "Teachers", value: totalTeachers, fill: "#f3b738" },
    { name: "Admins", value: 2, fill: "#0d2b26" }
  ];

  const handleCreateSchoolSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schoolName) return;
    createSchool({
      name: schoolName,
      code: schoolCode,
      district,
      province,
      principal,
      studentCount: 850,
      teacherCount: 50
    });
    setIsSchoolModalOpen(false);
    setSchoolName("");
    setSchoolCode("");
    setPrincipal("");
  };

  const handleCreateClassSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!className) return;
    const g = grades.find((gr) => gr.id === gradeId);
    createClass({
      name: className,
      gradeId,
      gradeName: g?.name || "Grade 12"
    });
    setIsClassModalOpen(false);
    setClassName("");
  };

  const handleCreateSubjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectName) return;
    const g = grades.find((gr) => gr.id === subjectGradeId);
    createSubject({
      name: subjectName,
      code: subjectCode || "SUB-01",
      gradeId: subjectGradeId,
      gradeName: g?.name || "Grade 12 (A/L)"
    });
    setIsSubjectModalOpen(false);
    setSubjectName("");
    setSubjectCode("");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e6ece8]">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#f3b738]"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#b47a16]">
              Multi-School Administration
            </span>
          </div>
          <h1 className="text-2xl font-black text-[#0d2b26] mt-1">Administrator Control Center</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure schools, academic curricula, grade streams, faculty allocations, and system permissions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            onClick={() => setIsSchoolModalOpen(true)}
            variant="outline"
            className="border-[#c4e9e0] text-[#0d5c4d] hover:bg-[#ecf8f5] font-bold text-xs shadow-2xs"
          >
            <Building2 className="h-3.5 w-3.5 mr-1.5" /> Add School
          </Button>
          <Button
            onClick={() => setIsClassModalOpen(true)}
            variant="outline"
            className="border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs shadow-2xs"
          >
            <School className="h-3.5 w-3.5 mr-1.5" /> New Class
          </Button>
          <Button
            onClick={() => setIsSubjectModalOpen(true)}
            className="bg-[#0d5c4d] hover:bg-[#083e34] text-white font-bold gap-1.5 text-xs shadow-xs"
          >
            <Plus className="h-3.5 w-3.5" /> Add Subject
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-[#e6ece8] pb-1 overflow-x-auto">
        {[
          { id: "overview" as const, icon: LayoutDashboard, label: "Dashboard Overview" },
          { id: "schools" as const, icon: Building2, label: "Schools Setup" },
          { id: "classes" as const, icon: School, label: "Classes & Grades" },
          { id: "subjects" as const, icon: BookOpen, label: "Curriculum Subjects" },
          { id: "users" as const, icon: Users, label: "User Directory" },
          { id: "settings" as const, icon: Settings, label: "Platform Settings" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveAdminTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeAdminTab === tab.id
                ? "bg-[#0d5c4d] text-white shadow-xs"
                : "text-slate-600 hover:text-[#0d5c4d] hover:bg-white"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB: Dashboard Overview */}
      {activeAdminTab === "overview" && (
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-[#e6ece8] bg-white shadow-2xs">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-semibold">Registered Schools</p>
                  <p className="text-2xl font-black text-[#0d2b26] mt-1">{schools.length}</p>
                  <p className="text-[10px] text-[#0d5c4d] font-bold mt-0.5">Multi-campus network</p>
                </div>
                <div className="h-11 w-11 rounded-xl bg-[#ecf8f5] text-[#0d5c4d] flex items-center justify-center">
                  <Building2 className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#e6ece8] bg-white shadow-2xs">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-semibold">Active Classes</p>
                  <p className="text-2xl font-black text-[#0d5c4d] mt-1">{classes.length}</p>
                  <p className="text-[10px] text-slate-400 font-bold mt-0.5">Across {grades.length} grade levels</p>
                </div>
                <div className="h-11 w-11 rounded-xl bg-[#ecf8f5] text-[#0d5c4d] flex items-center justify-center">
                  <School className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#e6ece8] bg-white shadow-2xs">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-semibold">Total Students</p>
                  <p className="text-2xl font-black text-[#b47a16] mt-1">{totalStudents}</p>
                  <p className="text-[10px] text-[#b47a16] font-bold mt-0.5">Enrolled across all streams</p>
                </div>
                <div className="h-11 w-11 rounded-xl bg-[#fef7e6] text-[#b47a16] flex items-center justify-center">
                  <GraduationCap className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#e6ece8] bg-white shadow-2xs">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-semibold">Teaching Staff</p>
                  <p className="text-2xl font-black text-[#0d5c4d] mt-1">{totalTeachers}</p>
                  <p className="text-[10px] text-slate-400 font-bold mt-0.5">{subjects.length} subjects offered</p>
                </div>
                <div className="h-11 w-11 rounded-xl bg-[#ecf8f5] text-[#0d5c4d] flex items-center justify-center">
                  <UserCheck className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analytics Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Enrollment by Grade Chart */}
            <Card className="lg:col-span-7 border-[#e6ece8] bg-white shadow-2xs">
              <CardHeader className="p-6 pb-2">
                <CardTitle className="text-sm font-black text-[#0d2b26]">
                  Student Enrollment by Grade Stream
                </CardTitle>
                <p className="text-xs text-slate-500">
                  Active enrolment headcount per academic grade level.
                </p>
              </CardHeader>
              <CardContent className="p-6 pt-2">
                <div className="h-56 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={enrollmentByGrade}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f4f1" />
                      <XAxis dataKey="grade" stroke="#94a3b8" fontSize={11} />
                      <YAxis stroke="#94a3b8" fontSize={11} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0d2b26",
                          borderColor: "#0d2b26",
                          color: "#fff",
                          borderRadius: "12px",
                          fontSize: "12px"
                        }}
                      />
                      <Bar dataKey="students" radius={[6, 6, 0, 0]} fill="#0d5c4d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Platform Health Summary */}
            <Card className="lg:col-span-5 border-[#e6ece8] bg-white shadow-2xs">
              <CardHeader className="p-6 pb-2">
                <CardTitle className="text-sm font-black text-[#0d2b26]">
                  Platform Operational Status
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-3.5">
                <div className="p-3.5 rounded-xl bg-[#ecf8f5] border border-[#c4e9e0] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Activity className="h-4 w-4 text-[#0d5c4d]" />
                    <div>
                      <p className="text-xs font-bold text-[#0d5c4d]">System Uptime</p>
                      <p className="text-[10px] text-slate-500">SLA: 99.9% compliance</p>
                    </div>
                  </div>
                  <Badge variant="success">99.97%</Badge>
                </div>

                <div className="p-3.5 rounded-xl bg-[#f8faf9] border border-[#e6ece8] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Database className="h-4 w-4 text-slate-600" />
                    <div>
                      <p className="text-xs font-bold text-slate-700">Active Courses</p>
                      <p className="text-[10px] text-slate-500">Courses published across all schools</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="font-mono">{courses.length}</Badge>
                </div>

                <div className="p-3.5 rounded-xl bg-[#f8faf9] border border-[#e6ece8] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Bell className="h-4 w-4 text-[#b47a16]" />
                    <div>
                      <p className="text-xs font-bold text-slate-700">Pending Submissions</p>
                      <p className="text-[10px] text-slate-500">Student work awaiting grading</p>
                    </div>
                  </div>
                  <Badge variant="warning">
                    {submissions.filter((s) => s.status === "submitted").length}
                  </Badge>
                </div>

                <div className="p-3.5 rounded-xl bg-[#f8faf9] border border-[#e6ece8] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Calendar className="h-4 w-4 text-slate-600" />
                    <div>
                      <p className="text-xs font-bold text-slate-700">Upcoming Events</p>
                      <p className="text-[10px] text-slate-500">Events published for students</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="font-mono">
                    {events.filter((e) => e.status === "published").length}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Summary Tables Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recent Announcements */}
            <Card className="border-[#e6ece8] bg-white shadow-2xs">
              <CardHeader className="p-5 pb-3 border-b border-[#e6ece8]">
                <CardTitle className="text-sm font-black text-[#0d2b26] flex items-center gap-2">
                  <Bell className="h-4 w-4 text-[#0d5c4d]" />
                  Recent Announcements ({announcements.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {announcements.slice(0, 3).map((ann, i) => (
                  <div
                    key={ann.id}
                    className={`flex items-center justify-between p-4 text-xs ${
                      i < 2 ? "border-b border-[#e6ece8]" : ""
                    } hover:bg-[#f8faf9]`}
                  >
                    <div>
                      <p className="font-bold text-slate-900">{ann.title}</p>
                      <p className="text-slate-500 mt-0.5">{ann.publishedAt} — {ann.targetAudience}</p>
                    </div>
                    <Badge variant={ann.priority === "high" ? "warning" : "success"} className="text-[10px]">
                      {ann.priority === "high" ? "Urgent" : "Standard"}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Sports Teams Summary */}
            <Card className="border-[#e6ece8] bg-white shadow-2xs">
              <CardHeader className="p-5 pb-3 border-b border-[#e6ece8]">
                <CardTitle className="text-sm font-black text-[#0d2b26] flex items-center gap-2">
                  <Activity className="h-4 w-4 text-[#0d5c4d]" />
                  Active Sports Teams ({teams.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {teams.slice(0, 3).map((team, i) => (
                  <div
                    key={team.id}
                    className={`flex items-center justify-between p-4 text-xs ${
                      i < 2 ? "border-b border-[#e6ece8]" : ""
                    } hover:bg-[#f8faf9]`}
                  >
                    <div>
                      <p className="font-bold text-slate-900">{team.name}</p>
                      <p className="text-slate-500 mt-0.5">Coach: {team.coachName} · {team.playersCount} Players</p>
                    </div>
                    <Badge variant={team.status === "active" ? "success" : "default"} className="text-[10px]">
                      {team.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* TAB: Schools Setup */}
      {activeAdminTab === "schools" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-[#0d2b26] flex items-center gap-2">
                <Building2 className="h-5 w-5 text-[#0d5c4d]" />
                Registered School Campuses
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Multi-school institutions connected to the nawana platform.
              </p>
            </div>
            <Button
              onClick={() => setIsSchoolModalOpen(true)}
              className="bg-[#0d5c4d] hover:bg-[#083e34] text-white font-bold gap-2 text-xs shadow-xs"
            >
              <Plus className="h-3.5 w-3.5" /> Add School
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {schools.map((sch) => (
              <Card key={sch.id} className="border-[#e6ece8] bg-white shadow-2xs hover:shadow-xs transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="success" className="text-[10px] font-bold">{sch.code}</Badge>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Globe className="h-3 w-3" />
                      <span>{sch.district}, {sch.province} Province</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-[#0d2b26]">{sch.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Principal: {sch.principal}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#f0f4f1]">
                    <div className="text-center p-2 rounded-xl bg-[#ecf8f5]">
                      <p className="text-lg font-black text-[#0d5c4d]">{sch.studentCount}</p>
                      <p className="text-[10px] text-slate-500 font-semibold">Students</p>
                    </div>
                    <div className="text-center p-2 rounded-xl bg-[#fef7e6]">
                      <p className="text-lg font-black text-[#b47a16]">{sch.teacherCount}</p>
                      <p className="text-[10px] text-slate-500 font-semibold">Teachers</p>
                    </div>
                    <div className="text-center p-2 rounded-xl bg-[#f8faf9]">
                      <p className="text-lg font-black text-slate-700">
                        {classes.filter((c) => c.gradeName.includes("12")).length}
                      </p>
                      <p className="text-[10px] text-slate-500 font-semibold">Classes</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-2">
                    <Button variant="outline" className="text-xs font-bold border-[#c4e9e0] text-[#0d5c4d] hover:bg-[#ecf8f5] h-8">
                      <Eye className="h-3 w-3 mr-1" /> View Details
                    </Button>
                    <Button variant="outline" className="text-xs font-bold h-8">
                      <Edit className="h-3 w-3 mr-1" /> Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB: Classes & Grades */}
      {activeAdminTab === "classes" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-[#0d2b26] flex items-center gap-2">
                <School className="h-5 w-5 text-[#0d5c4d]" />
                Academic Streams & Classes
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Configure G.C.E O/L and A/L grade-level streams and allocate class teachers.
              </p>
            </div>
            <Button
              onClick={() => setIsClassModalOpen(true)}
              className="bg-[#0d5c4d] hover:bg-[#083e34] text-white font-bold gap-2 text-xs shadow-xs"
            >
              <Plus className="h-3.5 w-3.5" /> Create Class
            </Button>
          </div>

          {/* Grade Level Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {grades.map((g) => {
              const gradeClasses = classes.filter((c) => c.gradeId === g.id);
              const totalStudentsInGrade = gradeClasses.reduce((sum, c) => sum + c.studentCount, 0);

              return (
                <Card key={g.id} className="border-[#e6ece8] bg-white shadow-2xs">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="font-mono text-[#0d5c4d] bg-[#ecf8f5] border-[#c4e9e0] text-xs">
                        {g.code}
                      </Badge>
                      <span className="text-xs text-slate-400">{gradeClasses.length} classes</span>
                    </div>
                    <h3 className="text-sm font-black text-[#0d2b26] mt-2">{g.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">{totalStudentsInGrade} enrolled students</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Classes Table */}
          <Card className="border-[#e6ece8] bg-white shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#e6ece8] bg-[#f8faf9] text-slate-500 uppercase text-[10px] font-bold tracking-wider">
                    <th className="p-4">Class Name</th>
                    <th className="p-4">Grade Level</th>
                    <th className="p-4">Class Teacher</th>
                    <th className="p-4">Enrolled Students</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e6ece8] text-slate-700">
                  {classes.map((cls) => (
                    <tr key={cls.id} className="hover:bg-[#fbfcfb] transition-colors">
                      <td className="p-4 font-bold text-[#0d2b26]">{cls.name}</td>
                      <td className="p-4">
                        <Badge variant="outline" className="text-[10px] font-mono">{cls.gradeName}</Badge>
                      </td>
                      <td className="p-4 text-[#0d5c4d] font-bold">{cls.classTeacherName}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{cls.studentCount}</span>
                          <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#0d5c4d] rounded-full"
                              style={{ width: `${Math.min((cls.studentCount / 50) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="success" className="text-[10px]">Active</Badge>
                      </td>
                      <td className="p-4 text-right">
                        <Button variant="outline" size="sm" className="h-7 text-xs font-bold">
                          <Edit className="h-3 w-3 mr-1" /> Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* TAB: Curriculum Subjects */}
      {activeAdminTab === "subjects" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-[#0d2b26] flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-[#0d5c4d]" />
                Curriculum Subject Master
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                National syllabus subjects offered for each academic grade level.
              </p>
            </div>
            <Button
              onClick={() => setIsSubjectModalOpen(true)}
              className="bg-[#0d5c4d] hover:bg-[#083e34] text-white font-bold gap-2 text-xs shadow-xs"
            >
              <Plus className="h-3.5 w-3.5" /> Add Subject
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {subjects.map((sub) => (
              <Card key={sub.id} className="border-[#e6ece8] bg-white shadow-2xs hover:shadow-xs transition-shadow">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-[#0d5c4d] border-[#c4e9e0] bg-[#ecf8f5] text-[10px] font-bold">
                      {sub.code}
                    </Badge>
                    <Button variant="outline" size="sm" className="h-6 text-[10px] font-bold px-2">
                      <Edit className="h-2.5 w-2.5 mr-0.5" /> Edit
                    </Button>
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-[#0d2b26]">{sub.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">{sub.gradeName}</p>
                  </div>
                  <div className="pt-2 border-t border-[#f0f4f1]">
                    <p className="text-[10px] text-slate-400 font-bold">
                      {courses.filter((c) => c.subjectId === sub.id).length} active course(s)
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB: User Directory */}
      {activeAdminTab === "users" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-extrabold text-[#0d2b26] flex items-center gap-2">
                <Users className="h-5 w-5 text-[#0d5c4d]" />
                Platform User Directory
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage student, teacher, and administrator accounts across all connected schools.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="Search users..."
                  className="h-8 pl-8 pr-3 rounded-xl bg-white border border-[#e6ece8] text-xs text-slate-900 focus:outline-none focus:border-[#0d5c4d] w-48"
                />
              </div>

              {/* Role Filter */}
              <div className="flex items-center bg-white border border-[#e6ece8] rounded-xl p-0.5 shadow-2xs">
                {(["all", "student", "teacher", "admin"] as const).map((role) => (
                  <button
                    key={role}
                    onClick={() => setUserRoleFilter(role)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all capitalize ${
                      userRoleFilter === role
                        ? "bg-[#0d5c4d] text-white shadow-xs"
                        : "text-slate-600 hover:text-[#0d5c4d]"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Role Summary Cards */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="border-[#e6ece8] bg-white shadow-2xs">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-[#ecf8f5] text-[#0d5c4d] flex items-center justify-center">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xl font-black text-[#0d2b26]">
                    {platformUsers.filter((u) => u.role === "student").length}
                  </p>
                  <p className="text-[10px] text-slate-500 font-bold">Students Registered</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-[#e6ece8] bg-white shadow-2xs">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-[#fef7e6] text-[#b47a16] flex items-center justify-center">
                  <UserCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xl font-black text-[#0d2b26]">
                    {platformUsers.filter((u) => u.role === "teacher").length}
                  </p>
                  <p className="text-[10px] text-slate-500 font-bold">Teaching Faculty</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-[#e6ece8] bg-white shadow-2xs">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-[#f8faf9] text-slate-700 flex items-center justify-center">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xl font-black text-[#0d2b26]">
                    {platformUsers.filter((u) => u.role === "admin").length}
                  </p>
                  <p className="text-[10px] text-slate-500 font-bold">Administrators</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Users Table */}
          <Card className="border-[#e6ece8] bg-white shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#e6ece8] bg-[#f8faf9] text-slate-500 uppercase text-[10px] font-bold tracking-wider">
                    <th className="p-4">User</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">School</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Last Login</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e6ece8]">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-[#fbfcfb] transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-2.5">
                          <div className="h-8 w-8 rounded-full bg-[#ecf8f5] text-[#0d5c4d] flex items-center justify-center font-bold text-xs">
                            {user.name.charAt(0)}
                          </div>
                          <span className="font-bold text-slate-900">{user.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-slate-500 font-mono">{user.email}</td>
                      <td className="p-4">
                        <Badge
                          variant={
                            user.role === "admin"
                              ? "default"
                              : user.role === "teacher"
                              ? "warning"
                              : "success"
                          }
                          className="text-[10px] capitalize"
                        >
                          {user.role}
                        </Badge>
                      </td>
                      <td className="p-4 text-slate-600">{user.school}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold ${
                          user.status === "Active" ? "text-[#0d5c4d]" : "text-slate-400"
                        }`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${
                            user.status === "Active" ? "bg-[#0d5c4d]" : "bg-slate-300"
                          }`}></span>
                          {user.status}
                        </span>
                      </td>
                      <td className="p-4 text-slate-500 font-mono text-[10px]">{user.lastLogin}</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="outline" size="sm" className="h-7 text-[10px] font-bold px-2">
                            <Eye className="h-3 w-3 mr-0.5" /> View
                          </Button>
                          <Button variant="outline" size="sm" className="h-7 text-[10px] font-bold px-2">
                            <Edit className="h-3 w-3 mr-0.5" /> Edit
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* TAB: Platform Settings */}
      {activeAdminTab === "settings" && (
        <div className="space-y-6 max-w-3xl">
          <div>
            <h2 className="text-base font-extrabold text-[#0d2b26] flex items-center gap-2">
              <Settings className="h-5 w-5 text-[#0d5c4d]" />
              Platform Configuration & Settings
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              System-wide preferences, enrollment toggles, and localization defaults.
            </p>
          </div>

          {/* General Settings Card */}
          <Card className="border-[#e6ece8] bg-white shadow-2xs">
            <CardHeader className="p-6 pb-3 border-b border-[#e6ece8]">
              <CardTitle className="text-sm font-black text-[#0d2b26]">General Platform Settings</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              {/* Platform Name */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-700">Platform Name</p>
                  <p className="text-[10px] text-slate-500">The branded name visible across all portals</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-[#0d5c4d]">nawana</span>
                  <Badge variant="outline" className="text-[10px]">v1.0 MVP</Badge>
                </div>
              </div>

              <div className="h-px bg-[#e6ece8]"></div>

              {/* Default Language */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-700">Default Language</p>
                  <p className="text-[10px] text-slate-500">Primary interface language for new users</p>
                </div>
                <select
                  value={defaultLocale}
                  onChange={(e) => setDefaultLocale(e.target.value)}
                  className="h-8 px-3 rounded-xl bg-[#f8faf9] border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#0d5c4d]"
                >
                  <option value="en">English</option>
                  <option value="ta">தமிழ் (Tamil)</option>
                  <option value="si">සිංහල (Sinhala)</option>
                </select>
              </div>

              <div className="h-px bg-[#e6ece8]"></div>

              {/* Enrollment Status */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-700">Student Enrollment</p>
                  <p className="text-[10px] text-slate-500">Allow new student registrations to the platform</p>
                </div>
                <button
                  onClick={() => setEnrollmentOpen(!enrollmentOpen)}
                  className={`h-7 w-14 rounded-full p-1 transition-colors ${
                    enrollmentOpen ? "bg-[#0d5c4d]" : "bg-slate-300"
                  }`}
                >
                  <div className={`h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                    enrollmentOpen ? "translate-x-7" : "translate-x-0"
                  }`}></div>
                </button>
              </div>

              <div className="h-px bg-[#e6ece8]"></div>

              {/* Maintenance Mode */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-700">Maintenance Mode</p>
                  <p className="text-[10px] text-slate-500">Temporarily disable access for all non-admin users</p>
                </div>
                <button
                  onClick={() => setMaintenanceMode(!maintenanceMode)}
                  className={`h-7 w-14 rounded-full p-1 transition-colors ${
                    maintenanceMode ? "bg-red-500" : "bg-slate-300"
                  }`}
                >
                  <div className={`h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                    maintenanceMode ? "translate-x-7" : "translate-x-0"
                  }`}></div>
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Academic Calendar Card */}
          <Card className="border-[#e6ece8] bg-white shadow-2xs">
            <CardHeader className="p-6 pb-3 border-b border-[#e6ece8]">
              <CardTitle className="text-sm font-black text-[#0d2b26]">Academic Calendar</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#ecf8f5] border border-[#c4e9e0]">
                  <p className="text-xs text-[#0d5c4d] font-bold">Current Academic Year</p>
                  <p className="text-lg font-black text-[#0d2b26] mt-1">2026</p>
                </div>
                <div className="p-4 rounded-xl bg-[#fef7e6] border border-[#fde4af]">
                  <p className="text-xs text-[#b47a16] font-bold">Active Term</p>
                  <p className="text-lg font-black text-[#0d2b26] mt-1">Term 2</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#f8faf9] border border-[#e6ece8] space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-700 font-semibold">
                  <span>Term 1</span>
                  <span className="font-mono text-slate-500">Jan 6 – Apr 11, 2026</span>
                </div>
                <div className="flex items-center justify-between text-[#0d5c4d] font-bold">
                  <span>Term 2 (Active)</span>
                  <span className="font-mono">May 4 – Aug 14, 2026</span>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span>Term 3</span>
                  <span className="font-mono">Sep 7 – Nov 27, 2026</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data & Privacy Card */}
          <Card className="border-[#e6ece8] bg-white shadow-2xs">
            <CardHeader className="p-6 pb-3 border-b border-[#e6ece8]">
              <CardTitle className="text-sm font-black text-[#0d2b26]">Data & Privacy</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-700">Data Backup Schedule</p>
                  <p className="text-[10px] text-slate-500">Automated database backup frequency</p>
                </div>
                <Badge variant="success" className="text-[10px]">Daily at 02:00 AM</Badge>
              </div>

              <div className="h-px bg-[#e6ece8]"></div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-700">Data Retention Policy</p>
                  <p className="text-[10px] text-slate-500">Period for retaining student academic records</p>
                </div>
                <span className="text-xs font-bold text-slate-700">7 Years (Sri Lanka MOE Requirement)</span>
              </div>

              <div className="h-px bg-[#e6ece8]"></div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-700">GDPR / POPIA Compliance</p>
                  <p className="text-[10px] text-slate-500">Data processing and consent management</p>
                </div>
                <Badge variant="success" className="text-[10px]">Compliant</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal: Create School */}
      <Modal
        isOpen={isSchoolModalOpen}
        onClose={() => setIsSchoolModalOpen(false)}
        title="Register New School"
        description="Add a new educational institution to the multi-school nawana platform."
      >
        <form onSubmit={handleCreateSchoolSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              School Name
            </label>
            <input
              type="text"
              required
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              placeholder="e.g. Colombo Central College"
              className="w-full h-10 px-3.5 rounded-xl bg-[#f8faf9] border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#0d5c4d]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                School Code
              </label>
              <input
                type="text"
                required
                value={schoolCode}
                onChange={(e) => setSchoolCode(e.target.value)}
                placeholder="CCC-08"
                className="w-full h-10 px-3.5 rounded-xl bg-[#f8faf9] border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#0d5c4d]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                District
              </label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full h-10 px-3.5 rounded-xl bg-[#f8faf9] border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#0d5c4d]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Province
              </label>
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-[#f8faf9] border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-[#0d5c4d]"
              >
                <option value="Western">Western</option>
                <option value="Central">Central</option>
                <option value="Southern">Southern</option>
                <option value="Northern">Northern</option>
                <option value="Eastern">Eastern</option>
                <option value="North Western">North Western</option>
                <option value="North Central">North Central</option>
                <option value="Uva">Uva</option>
                <option value="Sabaragamuwa">Sabaragamuwa</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Principal Name
              </label>
              <input
                type="text"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                placeholder="Mr. / Mrs. / Dr."
                className="w-full h-10 px-3.5 rounded-xl bg-[#f8faf9] border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#0d5c4d]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <Button type="button" variant="outline" onClick={() => setIsSchoolModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#0d5c4d] hover:bg-[#083e34] text-white font-bold">
              Register School
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Create Class */}
      <Modal
        isOpen={isClassModalOpen}
        onClose={() => setIsClassModalOpen(false)}
        title="Create New Class"
        description="Add an academic class stream to a grade level."
      >
        <form onSubmit={handleCreateClassSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Class Name
            </label>
            <input
              type="text"
              required
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder="e.g. 12-Commerce"
              className="w-full h-10 px-3.5 rounded-xl bg-[#f8faf9] border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#0d5c4d]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Grade Level
              </label>
              <select
                value={gradeId}
                onChange={(e) => setGradeId(e.target.value)}
                className="w-full h-10 px-3.5 rounded-xl bg-[#f8faf9] border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#0d5c4d]"
              >
                {grades.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Class Teacher
              </label>
              <input
                type="text"
                value={classTeacher}
                onChange={(e) => setClassTeacher(e.target.value)}
                placeholder="Teacher name"
                className="w-full h-10 px-3.5 rounded-xl bg-[#f8faf9] border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#0d5c4d]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <Button type="button" variant="outline" onClick={() => setIsClassModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#0d5c4d] hover:bg-[#083e34] text-white font-bold">
              Save Class
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Create Subject */}
      <Modal
        isOpen={isSubjectModalOpen}
        onClose={() => setIsSubjectModalOpen(false)}
        title="Add Curriculum Subject"
        description="Introduce a new subject into the academic national syllabus."
      >
        <form onSubmit={handleCreateSubjectSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Subject Name
            </label>
            <input
              type="text"
              required
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              placeholder="e.g. Biology"
              className="w-full h-10 px-3.5 rounded-xl bg-[#f8faf9] border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#0d5c4d]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Subject Code
              </label>
              <input
                type="text"
                value={subjectCode}
                onChange={(e) => setSubjectCode(e.target.value)}
                placeholder="BIO-12"
                className="w-full h-10 px-3.5 rounded-xl bg-[#f8faf9] border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#0d5c4d]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Grade Level
              </label>
              <select
                value={subjectGradeId}
                onChange={(e) => setSubjectGradeId(e.target.value)}
                className="w-full h-10 px-3.5 rounded-xl bg-[#f8faf9] border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#0d5c4d]"
              >
                {grades.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <Button type="button" variant="outline" onClick={() => setIsSubjectModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#0d5c4d] hover:bg-[#083e34] text-white font-bold">
              Save Subject
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
