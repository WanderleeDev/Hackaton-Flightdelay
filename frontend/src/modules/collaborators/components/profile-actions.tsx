import { Github, ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";
import { ActionIcon } from "../../shared/components/action-icon";

interface ProfileActionsProps {
  username: string;
  email?: string | null;
}

export default function ProfileActions({
  username,
  email,
}: ProfileActionsProps) {
  return (
    <div className="flex items-center gap-2 pb-6">
      <Link
        href="/collaborators"
        className="h-10 px-4 rounded-xl bg-secondary/50 hover:bg-secondary border border-border flex items-center gap-2 text-xs font-bold text-foreground transition-all group/back"
      >
        <ArrowLeft
          size={16}
          className="group-hover/back:-translate-x-1 transition-transform"
        />
        <span>Back</span>
      </Link>

      <div className="w-px h-6 bg-border/50 mx-1" />

      <ActionIcon
        href={`https://github.com/${username}`}
        icon={Github}
        className="size-10 rounded-xl"
        iconClassName="size-5"
      />

      {email && (
        <ActionIcon
          href={`mailto:${email}`}
          icon={Mail}
          className="size-10 rounded-xl"
          iconClassName="size-5"
        />
      )}
    </div>
  );
}
