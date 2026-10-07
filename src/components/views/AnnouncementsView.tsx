"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { CheckCircle2, ChevronDown, ChevronUp, Pencil, Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Announcement } from "@/types/lms";

export function AnnouncementsView() {
  const { announcements, t, currentRole, createAnnouncement, updateAnnouncement, deleteAnnouncement } = useApp();
  const isAdmin = currentRole === "admin";
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [announcementToDelete, setAnnouncementToDelete] = useState<Announcement | null>(null);
  const [draft, setDraft] = useState({
    title: "",
    message: "",
    targetAudience: "All Students",
    priority: "normal" as Announcement["priority"]
  });

  const openCreate = () => {
    setEditingAnnouncement(null);
    setDraft({ title: "", message: "", targetAudience: "All Students", priority: "normal" });
    setIsEditorOpen(true);
  };

  const openEdit = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setDraft({
      title: announcement.title,
      message: announcement.message,
      targetAudience: announcement.targetAudience,
      priority: announcement.priority
    });
    setIsEditorOpen(true);
  };

  const saveAnnouncement = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editingAnnouncement) {
      updateAnnouncement(editingAnnouncement.id, draft);
    } else {
      createAnnouncement(draft);
    }
    setIsEditorOpen(false);
  };

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

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

        <div className="flex flex-wrap items-center gap-3">
        {isAdmin && <Button onClick={openCreate} className="gap-2"><Plus className="h-4 w-4" /> Add Announcement</Button>}
        {/* Priority Filter */}
        <div className="flex items-center bg-white border border-[#e6ece8] rounded-xl p-1 shrink-0 shadow-2xs">
          <button
            onClick={() => setFilterPriority("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filterPriority === "all"
                ? "bg-[#0d5c4d] text-white shadow-xs"
                : "text-slate-600 hover:text-[#0d5c4d]"
            }`}
          >
            All Notices
          </button>
          <button
            onClick={() => setFilterPriority("high")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filterPriority === "high"
                ? "bg-[#f3b738] text-slate-950 shadow-xs"
                : "text-slate-600 hover:text-[#0d5c4d]"
            }`}
          >
            High Priority
          </button>
        </div>
        </div>
      </div>

      {/* Announcements Feed */}
      <div className="space-y-4 max-w-4xl">
        {filteredAnnouncements.map((ann) => {
          const isLong = ann.message.length > 200 || ann.message.includes("\n");
          const isExpanded = expandedIds[ann.id] ?? false;

          return (
            <Card key={ann.id} className="border-[#e6ece8] bg-white shadow-xs hover:border-[#b2e5d9] transition-all overflow-hidden">
              <CardHeader className="p-6 pb-3 border-b border-[#f0f4f1]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={ann.priority === "normal" ? "success" : "warning"}
                      className="text-[10px] uppercase font-bold"
                    >
                      {ann.priority === "urgent" ? "Urgent" : ann.priority === "high" ? "Important" : "Official Notice"}
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
                {isAdmin && (
                  <div className="mt-3 flex justify-end gap-2">
                    <Button type="button" variant="outline" size="sm" onClick={() => openEdit(ann)}>
                      <Pencil className="mr-1.5 h-3.5 w-3.5" /> Edit
                    </Button>
                    <Button type="button" variant="destructive" size="sm" onClick={() => setAnnouncementToDelete(ann)}>
                      <Trash2 className="mr-1.5 h-3.5 w-3.5" /> Remove
                    </Button>
                  </div>
                )}
              </CardHeader>

              <CardContent className="p-6 space-y-4">
                {/* Message Body with clean multi-paragraph support */}
                <div className="text-sm text-slate-700 leading-relaxed">
                  <div className={`whitespace-pre-line space-y-2 ${!isExpanded && isLong ? "line-clamp-3" : ""}`}>
                    {ann.message}
                  </div>

                  {isLong && (
                    <button
                      onClick={() => toggleExpand(ann.id)}
                      className="mt-2.5 inline-flex items-center gap-1 text-xs font-bold text-[#0d5c4d] hover:text-[#083e34] hover:underline cursor-pointer"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="h-3.5 w-3.5" /> Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-3.5 w-3.5" /> Read Full Circular / Details
                        </>
                      )}
                    </button>
                  )}
                </div>

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
          );
        })}
      </div>
      <Modal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        title={editingAnnouncement ? "Edit Announcement" : "Add Announcement"}
        description="Create an official notice for your school community."
      >
        <form onSubmit={saveAnnouncement} className="space-y-4">
          <label className="block text-sm font-semibold text-slate-700">
            Title
            <input required value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2" />
          </label>
          <label className="block text-sm font-semibold text-slate-700">
            Message
            <textarea required value={draft.message} onChange={(event) => setDraft({ ...draft, message: event.target.value })} className="mt-1 min-h-32 w-full rounded-xl border border-slate-200 px-3 py-2" />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-slate-700">
              Target audience
              <input required value={draft.targetAudience} onChange={(event) => setDraft({ ...draft, targetAudience: event.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2" />
            </label>
            <label className="block text-sm font-semibold text-slate-700">
              Priority
              <select value={draft.priority} onChange={(event) => setDraft({ ...draft, priority: event.target.value as Announcement["priority"] })} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2">
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </label>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsEditorOpen(false)}>Cancel</Button>
            <Button type="submit">{editingAnnouncement ? "Save Changes" : "Publish Announcement"}</Button>
          </div>
        </form>
      </Modal>
      <Modal
        isOpen={Boolean(announcementToDelete)}
        onClose={() => setAnnouncementToDelete(null)}
        title="Remove Announcement"
        description={`Are you sure you want to remove "${announcementToDelete?.title ?? ""}"? This cannot be undone.`}
        maxWidth="max-w-md"
      >
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => setAnnouncementToDelete(null)}>Cancel</Button>
          <Button type="button" variant="destructive" onClick={() => {
            if (announcementToDelete) deleteAnnouncement(announcementToDelete.id);
            setAnnouncementToDelete(null);
          }}>Remove Announcement</Button>
        </div>
      </Modal>
    </div>
  );
}
