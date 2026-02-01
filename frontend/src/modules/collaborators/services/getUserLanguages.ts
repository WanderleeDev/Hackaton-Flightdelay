import { getEnv } from "../../../utils/getEnv";
import { Repository } from "../interfaces";

export async function getUserLanguages(username: string): Promise<string[]> {
  try {
    const response = await fetch(
      `${getEnv("API_BASE_URL_GITHUB")}/users/${username}/repos?per_page=100&sort=updated`,
    );

    if (!response.ok) return [];

    const repos: Repository[] = await response.json();

    const languages = repos
      .map((repo) => repo.language)
      .filter((lang): lang is string => Boolean(lang));

    const languageCounts = languages.reduce(
      (acc, lang) => {
        acc[lang] = (acc[lang] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return Object.entries(languageCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([lang]) => lang);
  } catch {
    return [];
  }
}
