import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";

export default function DocumentsPage() {
  useEffect(() => {
    document.title = "Documents";
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Documents</h1>
      </div>
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-6 bg-white/60 dark:bg-slate-900/40">
        <p className="text-slate-600 dark:text-slate-300">Page des documents (bientôt).</p>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}
