import { getEnv } from "../../shared/utils/getEnv";
import { GithubRepositories, Repository } from "../interfaces";

export async function getRepositoriesByTopic(
  nameUser: string,
  topic = "pinned",
): Promise<GithubRepositories> {
  const response = await fetch(
    `${getEnv("API_BASE_URL_GITHUB")}/search/repositories?q=topic:${topic}+fork:true+user:${nameUser}`,
  );

  if (!response.ok) throw new Error("Network response was not ok");

  const repositories = (await response.json()) as GithubRepositories;

  if (repositories?.items?.length > 0) return repositories;

  const forkRepositories = await fetch(
    `${getEnv("API_BASE_URL_GITHUB")}/users/${nameUser}/repos?sort=created&direction=desc&per_page=6`,
  );

  if (!forkRepositories.ok) throw new Error("Network response was not ok");

  return {
    incomplete_results: false,
    total_count: 6,
    items: (await forkRepositories.json()) as Repository[],
  };
}
