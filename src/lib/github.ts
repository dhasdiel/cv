// Minimal GitHub Contents API client used by the MCP write tool.
// Runs server-side only; tokens come from env vars, never from the repo.
const GH_API = "https://api.github.com";
const OWNER = "dhasdiel";
const REPO = "cv";

async function gh<T>(
  path: string,
  token: string,
  init?: RequestInit,
): Promise<{ status: number; data: T }> {
  const res = await fetch(`${GH_API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  const data = (await res.json().catch(() => null)) as T;
  return { status: res.status, data };
}

// Commit a resume variant JSON file on branch mcp/variant-<variant>
// (created from main when missing). Returns the branch, commit sha and
// the Vercel preview URL where the variant renders at ?variant=<variant>.
export async function commitVariantFile(args: {
  token: string;
  variant: string;
  content: string;
  message: string;
}): Promise<{ branch: string; sha: string; previewUrl: string }> {
  const branch = `mcp/variant-${args.variant}`;
  const filePath = `src/data/variants/${args.variant}.json`;

  const ref = await gh<{ object?: { sha: string } }>(
    `/repos/${OWNER}/${REPO}/git/ref/heads/${branch}`,
    args.token,
  );
  if (ref.status === 404) {
    const main = await gh<{ object: { sha: string } }>(
      `/repos/${OWNER}/${REPO}/git/ref/heads/main`,
      args.token,
    );
    if (main.status !== 200 || !main.data.object?.sha) {
      throw new Error("could not read main branch");
    }
    const created = await gh(
      `/repos/${OWNER}/${REPO}/git/refs`,
      args.token,
      {
        method: "POST",
        body: JSON.stringify({
          ref: `refs/heads/${branch}`,
          sha: main.data.object.sha,
        }),
      },
    );
    if (created.status !== 201) {
      throw new Error(`could not create branch ${branch}`);
    }
  } else if (ref.status !== 200) {
    throw new Error(`could not check branch ${branch}`);
  }

  // Existing file sha, when updating a variant already on the branch.
  const existing = await gh<{ sha?: string }>(
    `/repos/${OWNER}/${REPO}/contents/${filePath}?ref=${encodeURIComponent(branch)}`,
    args.token,
  );
  const sha = existing.status === 200 ? existing.data.sha : undefined;

  const put = await gh<{ commit?: { sha: string } }>(
    `/repos/${OWNER}/${REPO}/contents/${filePath}`,
    args.token,
    {
      method: "PUT",
      body: JSON.stringify({
        message: args.message,
        content: Buffer.from(args.content, "utf8").toString("base64"),
        branch,
        ...(sha ? { sha } : {}),
      }),
    },
  );
  if (put.status !== 200 && put.status !== 201) {
    throw new Error(`GitHub commit failed (HTTP ${put.status})`);
  }
  const host = `dhasdiel-cv-git-${branch.replace(/[^a-zA-Z0-9]/g, "-")}-dhasdiels-projects.vercel.app`;
  return {
    branch,
    sha: put.data.commit?.sha ?? "",
    previewUrl: `https://${host}/?variant=${args.variant}`,
  };
}
