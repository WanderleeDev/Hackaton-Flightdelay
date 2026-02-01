import { Github, ArrowLeft, Mail, ArrowUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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
    <div className="flex items-center gap-3 pb-6">
      <Link
        href="/collaborators"
        className="h-14 px-6 rounded-2xl bg-secondary/50 hover:bg-secondary border border-border flex items-center gap-3 text-sm font-bold text-foreground transition-all hover:scale-105 active:scale-95 group/back"
      >
        <ArrowLeft
          size={20}
          className="group-hover/back:-translate-x-1 transition-transform"
        />
        <span>Back</span>
      </Link>
      <ActionIcon
        href="/collaborators"
        icon={ArrowLeft}
        className="size-14 rounded-2xl"
        iconClassName="size-7"
      />

      <Button size="icon-sm" className="rounded-xl cursor-pointer">
        <span className="sr-only">Scroll to top</span>
        <ArrowUp className="h-4 w-4" />
      </Button>
      <div className="w-px h-8 bg-border/50 mx-1" />
      <ActionIcon
        href={`https://github.com/${username}`}
        icon={Github}
        className="size-14 rounded-2xl"
        iconClassName="size-7"
      />
      {email && (
        <ActionIcon
          href={`mailto:${email}`}
          icon={Mail}
          className="size-14 rounded-2xl"
          iconClassName="size-7"
        />
      )}
    </div>
  );
}
