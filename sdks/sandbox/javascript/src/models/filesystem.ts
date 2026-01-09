/**
 * Domain models for filesystem.
 *
 * IMPORTANT:
 * - These are NOT OpenAPI-generated types.
 * - They are intentionally stable and JS-friendly.
 */

export type FileInfo = {
  path: string;
  size?: number;
  /**
   * Last modification time.
   */
  modifiedAt?: Date;
  /**
   * Creation time.
   */
  createdAt?: Date;
  mode?: number;
  owner?: string;
  group?: string;
  [k: string]: unknown;
};

export type Permission = {
  mode: number;
  owner?: string;
  group?: string;
  [k: string]: unknown;
};

export type FileMetadata = {
  path: string;
  mode?: number;
  owner?: string;
  group?: string;
  [k: string]: unknown;
};

export type RenameFileItem = {
  src: string;
  dest: string;
} & Record<string, unknown>;

export type ReplaceFileContentItem = {
  old: string;
  new: string;
} & Record<string, unknown>;

export type FilesInfoResponse = Record<string, FileInfo>;

export type SearchFilesResponse = FileInfo[];

// High-level filesystem facade models used by `sandbox.files`.
export type WriteEntry = {
  path: string;
  /**
   * File data to upload.
   *
   * Supports:
   * - string / bytes / Blob (in-memory)
   * - AsyncIterable<Uint8Array> or ReadableStream<Uint8Array> (streaming upload for large files)
   */
  data?: string | Uint8Array | ArrayBuffer | Blob | AsyncIterable<Uint8Array> | ReadableStream<Uint8Array>;
  mode?: number;
  owner?: string;
  group?: string;
};

export type SearchEntry = {
  path: string;
  pattern?: string;
};

export type MoveEntry = {
  src: string;
  dest: string;
};

export type ContentReplaceEntry = {
  path: string;
  oldContent: string;
  newContent: string;
};

export type SetPermissionEntry = {
  path: string;
  mode: number;
  owner?: string;
  group?: string;
};

