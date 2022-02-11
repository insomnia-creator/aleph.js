import { dirname, join } from "https://deno.land/std@0.125.0/path/mod.ts";
import { ensureDir } from "https://deno.land/std@0.125.0/fs/ensure_dir.ts";

/* check whether or not the given path exists as a directory. */
export async function existsDir(path: string): Promise<boolean> {
  try {
    const stat = await Deno.lstat(path);
    return stat.isDirectory;
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return false;
    }
    throw err;
  }
}

/* check whether or not the given path exists as regular file. */
export async function existsFile(path: string): Promise<boolean> {
  try {
    const stat = await Deno.lstat(path);
    return stat.isFile;
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return false;
    }
    throw err;
  }
}

/** ensure and write text file. */
export async function ensureTextFile(
  name: string,
  content: string,
): Promise<void> {
  const dir = dirname(name);
  await ensureDir(dir);
  await Deno.writeTextFile(name, content);
}

/** remove the file if it exists. */
export async function lazyRemove(
  name: string,
  options?: { recursive?: boolean },
): Promise<void | Error> {
  try {
    await Deno.remove(name, options);
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return;
    }
    return Promise.reject(err);
  }
}

export async function findFile(
  wd: string,
  filenames: string[],
): Promise<string | undefined> {
  for (const filename of filenames) {
    const fullPath = join(wd, filename);
    if (await existsFile(fullPath)) {
      return fullPath;
    }
  }
  return void 0;
}