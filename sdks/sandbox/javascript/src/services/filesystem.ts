import type { SearchFilesResponse } from "../models/filesystem.js";
import type {
  ContentReplaceEntry,
  FileInfo,
  MoveEntry,
  SearchEntry,
  SetPermissionEntry,
  WriteEntry,
} from "../models/filesystem.js";

/**
 * High-level filesystem facade (JS-friendly).
 *
 * This interface provides a convenience layer over the underlying execd filesystem API:
 * it offers common operations (read/write/search/move/delete) and supports streaming I/O for large files.
 */
export interface SandboxFiles {
  getFileInfo(paths: string[]): Promise<Record<string, FileInfo>>;
  search(entry: SearchEntry): Promise<SearchFilesResponse>;

  createDirectories(entries: Array<Pick<WriteEntry, "path" | "mode" | "owner" | "group">>): Promise<void>;
  deleteDirectories(paths: string[]): Promise<void>;

  writeFiles(entries: WriteEntry[]): Promise<void>;
  readFile(path: string, opts?: { encoding?: string; range?: string }): Promise<string>;
  readBytes(path: string, opts?: { range?: string }): Promise<Uint8Array>;
  readBytesStream(path: string, opts?: { range?: string }): AsyncIterable<Uint8Array>;

  deleteFiles(paths: string[]): Promise<void>;
  moveFiles(entries: MoveEntry[]): Promise<void>;
  replaceContents(entries: ContentReplaceEntry[]): Promise<void>;
  setPermissions(entries: SetPermissionEntry[]): Promise<void>;
}

