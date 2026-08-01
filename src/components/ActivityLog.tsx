import type { LogEntry } from "../types";
export interface ActivityLogProps {
  logs: LogEntry[];
}
const ActivityLog: React.FC<ActivityLogProps> = ({ logs }) => {
  return (
    <aside className="activity-log">
      <h3>Activity Log</h3>
      <ul>
        {logs.map((log) => (
          <li key={log.id}>{log.action}</li>
        ))}
      </ul>
    </aside>
  );
};
export default ActivityLog;