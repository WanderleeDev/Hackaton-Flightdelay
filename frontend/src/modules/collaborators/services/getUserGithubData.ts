import { getEnv } from "../../../utils/getEnv";
import { GitHubUser } from "../interfaces";

export async function getUserGithubData(nameUser: string): Promise<GitHubUser> {
  const response = await fetch(
    `${getEnv("API_BASE_URL_GITHUB")}/users/${nameUser}`,
  );

  if (!response.ok) throw new Error("Network response was not ok");

  return await response.json();
}
