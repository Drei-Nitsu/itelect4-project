import type { FC } from "react";
import type { LogEntry } from "../types/index.js";

interface ActivityLogProps {
  entry: LogEntry;
}

const ActivityLog: FC<ActivityLogProps> = ({ entry }) => {
  return (
    <div className="activity-log">
      <p>
        {entry.author} {entry.action} on{" "}
        {entry.timestamp.toLocaleString()}
      </p>
    </div>
  );
};

export default ActivityLog;