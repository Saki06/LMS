"use client";

import React, { useState, useMemo } from "react";
import { useApp } from "@/context/AppContext";
import { TeacherSubscriber } from "@/types/lms";
import { initialTeacherSubscribers } from "@/data/connectMockData";
import {
  Users,
  CreditCard,
  Receipt,
  CheckCircle2,
  Clock,
  Search,
  Video,
  ExternalLink,
  Copy,
  Send,
  AlertCircle,
  FileCheck,
  Calendar,
  Sparkles,
  ChevronRight,
  Filter,
  Eye,
  X,
  Building,
  GraduationCap
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";

type TeacherConnectTab = "subscribers" | "slips";

export function TeacherConnectView() {
  const { currentUser, t } = useApp();

  // Active tab inside Teacher Connect Hub
  const [activeTab, setActiveTab] = useState<TeacherConnectTab>("subscribers");

  // Subscribers state
  const [subscribers, setSubscribers] = useState<TeacherSubscriber[]>(initialTeacherSubscribers);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "pending_slip" | "expired">("all");

  // Selected slip for approval modal
  const [selectedSlipSub, setSelectedSlipSub] = useState<TeacherSubscriber | null>(null);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Copy meet link
  const handleCopyMeet = () => {
    navigator.clipboard?.writeText("https://meet.google.com/sam-math-live");
    showToast("Live Google Meet link copied to clipboard!");
  };

  // Broadcast link
  const handleBroadcastMeet = () => {
    showToast("Live Class broadcast alert sent to all 142 active subscribed students via SMS & Notification!");
  };

  // Approve bank slip
  const handleApproveSlip = (subId: string) => {
    setSubscribers((prev) =>
      prev.map((s) => (s.id === subId ? { ...s, status: "active", validUntil: "2026-11-05" } : s))
    );
    const sub = subscribers.find((s) => s.id === subId);
    setSelectedSlipSub(null);
    showToast(`Bank Deposit Slip Approved! ${sub?.studentName || "Student"} subscription is now ACTIVE.`);
  };

  // Filtered subscribers
  const filteredSubscribers = useMemo(() => {
    return subscribers.filter((s) => {
      const matchQuery =
        !searchQuery.trim() ||
        s.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.grade.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === "all" || s.status === statusFilter;
      return matchQuery && matchStatus;
    });
  }, [subscribers, searchQuery, statusFilter]);

  // Pending slips count
  const pendingSlips = subscribers.filter((s) => s.status === "pending_slip");
  const activeSubscribersCount = subscribers.filter((s) => s.status === "active").length;


  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-[#0d5c4d] text-white shadow-2xl flex items-center gap-3 border border-[#a5f3df] animate-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="h-5 w-5 text-[#a5f3df] shrink-0" />
          <div className="text-xs">
            <p className="font-extrabold text-sm">Success</p>
            <p className="text-slate-100">{toastMessage}</p>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="p-1 hover:bg-white/20 rounded-lg text-white/80 cursor-pointer ml-2"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Top Banner: Teacher Faculty Connect Studio */}
      <Card className="border-[#c4e9e0] bg-gradient-to-br from-[#f8fbf9] via-white to-[#ecf8f5] shadow-2xs overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-lg bg-[#0d5c4d] text-white text-[11px] font-bold uppercase tracking-wider">
                  Teaching Studio &bull; Connect Hub
                </span>
                <span className="text-xs text-slate-500 font-semibold">
                  A/L Combined Mathematics Tuition Masterclass
                </span>
              </div>
              <h1 className="text-2xl font-black text-[#0d2b26]">
                Subscribers &amp; Tuition Hub
              </h1>
              <p className="text-xs text-slate-600 max-w-xl">
                Manage all students enrolled in your live tuition masterclasses, review bank deposit payment slips, and broadcast live Google Meet lecture links.
              </p>
            </div>

            {/* Live Meet Action Box */}
            <div className="p-4 rounded-2xl bg-white border border-[#c4e9e0] shadow-xs space-y-3 shrink-0 lg:w-80">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Video className="h-3.5 w-3.5 text-[#0d5c4d]" /> Live Class Link
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-extrabold">
                  ACTIVE ROOM
                </span>
              </div>

              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 truncate">
                https://meet.google.com/sam-math-live
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="https://meet.google.com/sam-math-live"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-1.5 px-3 rounded-xl bg-[#0d5c4d] hover:bg-[#083e34] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> Start Lecture
                </a>
                <Button
                  onClick={handleCopyMeet}
                  variant="outline"
                  size="sm"
                  className="border-[#c4e9e0] text-[#0d5c4d] hover:bg-[#ecf8f5] text-xs font-bold"
                  title="Copy Google Meet Link"
                >
                  <Copy className="h-3.5 w-3.5" />
                </Button>
                <Button
                  onClick={handleBroadcastMeet}
                  variant="outline"
                  size="sm"
                  className="border-amber-300 text-amber-800 hover:bg-amber-50 text-xs font-bold"
                  title="Broadcast to All Students"
                >
                  <Send className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-[#e6ece8] bg-white shadow-2xs">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-semibold">Active Subscribers</p>
              <p className="text-2xl font-black text-[#0d2b26] mt-1">142 Students</p>
              <p className="text-[10px] text-emerald-600 font-bold mt-0.5">+14 new this month</p>
            </div>
            <div className="h-11 w-11 rounded-xl bg-[#ecf8f5] text-[#0d5c4d] flex items-center justify-center">
              <Users className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#e6ece8] bg-white shadow-2xs">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-semibold">Monthly Tuition Revenue</p>
              <p className="text-2xl font-black text-[#0d5c4d] mt-1">LKR 355,000</p>
              <p className="text-[10px] text-slate-400 font-semibold mt-0.5">LKR 2,500 / student</p>
            </div>
            <div className="h-11 w-11 rounded-xl bg-[#ecf8f5] text-[#0d5c4d] flex items-center justify-center">
              <CreditCard className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className={`border shadow-2xs ${pendingSlips.length > 0 ? "border-amber-200 bg-amber-50/40" : "border-[#e6ece8] bg-white"}`}>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-semibold">Pending Bank Slips</p>
              <p className="text-2xl font-black text-[#b47a16] mt-1">
                {pendingSlips.length} Slips
              </p>
              <button
                onClick={() => setActiveTab("slips")}
                className="text-[10px] text-[#b47a16] hover:underline font-bold mt-0.5 cursor-pointer block"
              >
                Review &amp; approve &rarr;
              </button>
            </div>
            <div className="h-11 w-11 rounded-xl bg-[#fef7e6] text-[#b47a16] flex items-center justify-center">
              <Receipt className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#e6ece8] bg-white shadow-2xs">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-semibold">Live Attendance Rate</p>
              <p className="text-2xl font-black text-[#0d2b26] mt-1">94.8%</p>
              <p className="text-[10px] text-emerald-600 font-bold mt-0.5">High engagement</p>
            </div>
            <div className="h-11 w-11 rounded-xl bg-[#ecf8f5] text-[#0d5c4d] flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Teacher Connect Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white/80 backdrop-blur-md border border-[#c4e9e0] shadow-xs">
        <button
          onClick={() => setActiveTab("subscribers")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "subscribers"
              ? "bg-[#0d5c4d] text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Users className="h-4 w-4" />
          <span>Subscribed Students</span>
          <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
            activeTab === "subscribers" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
          }`}>
            {filteredSubscribers.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("slips")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "slips"
              ? "bg-[#0d5c4d] text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Receipt className="h-4 w-4" />
          <span>Bank Slip Approvals</span>
          {pendingSlips.length > 0 && (
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#fef7e6] text-[#b47a16]">
              {pendingSlips.length} Pending
            </span>
          )}
        </button>


      </div>

      {/* =================================================================== */}
      {/* TAB 1: SUBSCRIBED STUDENTS LIST (The Core Teacher Connect Feature)  */}
      {/* =================================================================== */}
      {activeTab === "subscribers" && (
        <div className="space-y-4">
          {/* Search & Filter Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-[#e6ece8] shadow-2xs">
            <div className="relative flex-1 max-w-md">
              <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search students by name, school, or grade..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0d5c4d] focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-2.5">
              <span className="text-xs text-slate-500 font-bold flex items-center gap-1">
                <Filter className="h-3.5 w-3.5" /> Filter:
              </span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#0d5c4d]"
              >
                <option value="all">All Subscribers</option>
                <option value="active">Active (Subscribed)</option>
                <option value="pending_slip">Pending Bank Slip Approval</option>
                <option value="expired">Expired / Renewal Due</option>
              </select>
            </div>
          </div>

          {/* Subscribers Table Card */}
          <Card className="border-[#e6ece8] bg-white shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-[#f8faf9] border-b border-[#e6ece8] text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="p-4 pl-6">Student Name &amp; School</th>
                    <th className="p-4">Grade &amp; Stream</th>
                    <th className="p-4">Plan &amp; Monthly Fee</th>
                    <th className="p-4">Payment Method</th>
                    <th className="p-4">Valid Until</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 pr-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eef4f0]">
                  {filteredSubscribers.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-400 font-semibold">
                        No subscribers matching filter criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredSubscribers.map((sub) => (
                      <tr key={sub.id} className="hover:bg-[#fcfdfc] transition-colors">
                        {/* Student Name */}
                        <td className="p-4 pl-6">
                          <div className="flex items-center gap-3">
                            <div className={`h-9 w-9 rounded-xl ${sub.avatarColor} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs`}>
                              {sub.studentInitials}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900">{sub.studentName}</p>
                              <p className="text-[11px] text-slate-500 flex items-center gap-1">
                                <Building className="h-3 w-3 text-slate-400" />
                                {sub.school}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Grade */}
                        <td className="p-4 font-semibold text-slate-700">
                          <div>
                            <p>{sub.grade}</p>
                            <p className="text-[10px] text-slate-400 font-normal">{sub.stream}</p>
                          </div>
                        </td>

                        {/* Plan */}
                        <td className="p-4">
                          <p className="font-bold text-[#0d2b26]">{sub.currency} {sub.amount.toLocaleString()}</p>
                          <p className="text-[10px] text-slate-500 truncate max-w-[140px]">{sub.planName}</p>
                        </td>

                        {/* Payment Method */}
                        <td className="p-4">
                          <span className="font-medium text-slate-600">{sub.paymentMethod}</span>
                          {sub.slipReference && (
                            <p className="text-[10px] font-mono text-slate-400">Ref: {sub.slipReference}</p>
                          )}
                        </td>

                        {/* Valid Until */}
                        <td className="p-4 font-mono text-[11px] text-slate-600">
                          {sub.validUntil}
                        </td>

                        {/* Status */}
                        <td className="p-4">
                          {sub.status === "active" && (
                            <Badge className="bg-emerald-50 text-emerald-800 border-emerald-200 text-[10px] font-bold">
                              <CheckCircle2 className="h-3 w-3 mr-1" /> Active
                            </Badge>
                          )}
                          {sub.status === "pending_slip" && (
                            <Badge className="bg-amber-50 text-amber-800 border-amber-200 text-[10px] font-bold">
                              <Clock className="h-3 w-3 mr-1" /> Slip Pending
                            </Badge>
                          )}
                          {sub.status === "expired" && (
                            <Badge className="bg-slate-100 text-slate-600 border-slate-200 text-[10px] font-bold">
                              Expired
                            </Badge>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="p-4 pr-6 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {sub.status === "pending_slip" && (
                              <Button
                                size="sm"
                                onClick={() => setSelectedSlipSub(sub)}
                                className="bg-[#b47a16] hover:bg-[#8f6110] text-white text-[11px] font-bold h-7 px-2.5 shadow-2xs cursor-pointer"
                              >
                                Review Slip
                              </Button>
                            )}

                            {sub.status !== "pending_slip" && (
                              <span className="text-[11px] text-slate-500 font-semibold px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200">
                                Attendance {sub.attendanceRate}%
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 2: BANK SLIP APPROVALS                                          */}
      {/* =================================================================== */}
      {activeTab === "slips" && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-amber-900">
                Direct Bank Deposit Verification Desk
              </h4>
              <p className="text-xs text-amber-800 mt-0.5">
                Students who deposited fees directly into Bank of Ceylon (BOC) or Commercial Bank upload their deposit slip image or PDF. Review the transaction reference number and approve to instantly activate live class access.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingSlips.map((sub) => (
              <Card key={sub.id} className="border-[#c4e9e0] bg-white shadow-2xs">
                <CardHeader className="p-5 pb-3 border-b border-[#e6ece8]">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-bold uppercase tracking-wider">
                      Pending Approval
                    </span>
                    <span className="text-xs font-mono font-bold text-[#0d5c4d]">
                      {sub.currency} {sub.amount.toLocaleString()}
                    </span>
                  </div>
                  <CardTitle className="text-base font-black text-[#0d2b26] mt-2 flex items-center gap-2">
                    <div className={`h-8 w-8 rounded-lg ${sub.avatarColor} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                      {sub.studentInitials}
                    </div>
                    <div>
                      <p>{sub.studentName}</p>
                      <p className="text-xs text-slate-500 font-normal">{sub.school}</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 space-y-3.5">
                  <div className="space-y-2 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Bank / Channel:</span>
                      <span className="font-bold text-slate-800">{sub.paymentMethod}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Transaction Ref:</span>
                      <span className="font-mono font-bold text-[#0d5c4d]">{sub.slipReference || "BOC-TXN-994102"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Uploaded Slip Document:</span>
                      <span className="font-mono text-slate-700 underline flex items-center gap-1 cursor-pointer">
                        <FileCheck className="h-3 w-3 text-emerald-600" />
                        {sub.slipFileName || "Deposit_Slip.jpg"}
                      </span>
                    </div>
                  </div>

                  {/* Simulated Bank Slip Preview Card */}
                  <div className="p-3 rounded-xl border-2 border-dashed border-emerald-300 bg-[#ecf8f5]/40 text-center space-y-1">
                    <p className="text-[10px] font-bold text-emerald-900 uppercase tracking-wider">
                      Bank of Ceylon (BOC) Super Grade Branch Slip
                    </p>
                    <p className="text-xs text-slate-600 font-mono">
                      Acct: 70291048 &bull; Amount: LKR 2,500.00 &bull; Stamp Verified
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => showToast(`Deposit slip rejected for ${sub.studentName}. Notification sent to student.`)}
                      className="border-slate-300 text-slate-600 hover:bg-slate-50 text-xs font-bold cursor-pointer"
                    >
                      Decline
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleApproveSlip(sub.id)}
                      className="bg-[#0d5c4d] hover:bg-[#083e34] text-white text-xs font-bold cursor-pointer shadow-xs"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Approve &amp; Activate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}



      {/* Slip Modal Preview */}
      <Modal
        isOpen={!!selectedSlipSub}
        onClose={() => setSelectedSlipSub(null)}
        title="Review Bank Deposit Slip"
        description="Verify the bank transaction seal and activate the student's tuition subscription."
      >
        {selectedSlipSub && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-semibold">Student Name:</span>
                <span className="font-bold text-slate-900">{selectedSlipSub.studentName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-semibold">School &amp; Grade:</span>
                <span className="font-bold text-slate-700">{selectedSlipSub.school} ({selectedSlipSub.grade})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-semibold">Enrolled Plan:</span>
                <span className="font-bold text-[#0d5c4d]">{selectedSlipSub.planName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-semibold">Amount Paid:</span>
                <span className="font-mono font-bold text-slate-900">{selectedSlipSub.currency} {selectedSlipSub.amount.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-semibold">Bank Reference #:</span>
                <span className="font-mono font-bold text-emerald-800">{selectedSlipSub.slipReference || "BOC-TXN-994102"}</span>
              </div>
            </div>

            {/* Simulated Deposit Slip Mockup */}
            <div className="p-6 rounded-2xl border-2 border-dashed border-[#c4e9e0] bg-[#ecf8f5]/50 text-center space-y-2">
              <Receipt className="h-10 w-10 text-[#0d5c4d] mx-auto" />
              <p className="text-xs font-bold text-slate-800">Bank of Ceylon Official Deposit Receipt</p>
              <p className="text-[11px] text-slate-500 font-mono">
                Branch: Colombo Super Grade &bull; Terminal ID: 88102 &bull; Stamp: VERIFIED
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setSelectedSlipSub(null)}
                className="text-xs font-bold"
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleApproveSlip(selectedSlipSub.id)}
                className="bg-[#0d5c4d] hover:bg-[#083e34] text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Approve &amp; Activate
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
