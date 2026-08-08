import type { LogEntry } from "../types";
import { FC } from "react";

interface ActivityLogProps {
  logs: LogEntry[];
}

const ActivityLog: FC<ActivityLogProps> = ({ logs }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <h3 className="mb-4 text-xl font-bold text-slate-800 dark:text-slate-100">Activity Log</h3>
      <div className="space-y-3">
        {logs.length > 0 ? (
          logs.map((log) => (
            <div key={log.id} className="flex items-start space-x-3">
              <div className="flex-shrink-0 h-2 w-2 mt-1.5 rounded-full bg-blue-500 dark:bg-blue-400"></div> {/* Timeline dot */}
              <p className="text-sm text-slate-700 dark:text-slate-300">
                {log.action}
                <span className="ml-2 inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                  {log.timestamp.toLocaleTimeString()}
                </span>
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-500 dark:text-slate-400">No activity recorded yet.</p>
        )}
      </div>
    </div>
  );
};

export default ActivityLog;