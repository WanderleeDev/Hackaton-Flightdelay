import { getEnv } from "../../shared/utils/getEnv";
import {
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";

export interface GithubRepositories {
  total_count: number;
  incomplete_results: boolean;
  repositories: Repository[];
}

interface Repository {
  id: number;
  name: string;
  full_name: string;
  created_at: string;
  updated_at: string;
  html_url: string;
  description: string;
  visibility: string;
  homepage?: string;
  language: string;
  topics: string[];
}

async function getRepositoriesByTopic(
  nameUser: string,
  topic = "pinned",
): Promise<GithubRepositories> {
  const response = await fetch(
    `${getEnv("API_BASE_URL_GITHUB")}search/repositories?q=topic:${topic}+user:${nameUser}`,
  );

  if (!response.ok) throw new Error("Network response was not ok");

  return response.json();
}

export const useUserTopicRepositories = (
  nameUser: string,
  topic = "pinned",
): UseSuspenseQueryResult<GithubRepositories, Error> => {
  return useSuspenseQuery({
    queryKey: ["repositories", nameUser, topic],
    queryFn: () => getRepositoriesByTopic(nameUser, topic),
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
};
