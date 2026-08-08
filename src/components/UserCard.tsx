import type { User } from "../types";
import { FC } from "react";

interface UserCardProps {
  user: User;
}

const UserCard: FC<UserCardProps> = ({ user }) => {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="text-lg font-medium text-slate-900 dark:text-white">
        {user.name}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        {user.email}
      </p>
    </div>
  );
};

export default UserCard;