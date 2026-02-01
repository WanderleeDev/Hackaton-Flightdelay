import { getRepositoriesByTopic } from "@/src/modules/collaborators/services/getRepositoriesByTopic";
import { getUserGithubData } from "@/src/modules/collaborators/services/getUserGithubData";
import { getUserLanguages } from "@/src/modules/collaborators/services/getUserLanguages";
import ProfileHeader from "@/src/modules/collaborators/components/profile-header";
import ProfileActions from "@/src/modules/collaborators/components/profile-actions";
import ProfileBio from "@/src/modules/collaborators/components/profile-bio";
import ProfileTechStack from "@/src/modules/collaborators/components/profile-tech-stack";
import ProfileProjects from "@/src/modules/collaborators/components/profile-projects";

type Props = {
  params: Promise<{ username: string }>;
};

export default async function UserPage({ params }: Props) {
  const { username } = await params;
  const [user, { items, total_count }, languages] = await Promise.all([
    getUserGithubData(username),
    getRepositoriesByTopic(username),
    getUserLanguages(username),
  ]);

  return (
    <main className="min-h-screen text-foreground pb-20 overflow-x-hidden relative">
      <div className="max-w-6xl mx-auto px-6">
        <ProfileHeader user={user}>
          <ProfileActions username={username} email={user.email} />
        </ProfileHeader>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 motion-safe:animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
          <div className="lg:col-span-4 space-y-8">
            {user.bio && <ProfileBio bio={user.bio} />}
            <ProfileTechStack languages={languages} />
          </div>

          <div className="lg:col-span-8 space-y-8">
            <ProfileProjects items={items} total_count={total_count} />
          </div>
        </div>
      </div>
    </main>
  );
}
