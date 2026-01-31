import { getEnv } from "../../shared/utils/getEnv";
import { GithubRepositories } from "../interfaces";

export async function getRepositoriesByTopic(
  nameUser: string,
  topic = "pinned",
): Promise<GithubRepositories> {
  const response = await fetch(
    `${getEnv("API_BASE_URL_GITHUB")}/search/repositories?q=topic:${topic}+user:${nameUser}`,
  );

  if (!response.ok) throw new Error("Network response was not ok");

  return await response.json();
}
