//Pure access-model helpers shared by the server (API routes, page gates) and
//the client (admin UI). Keep this file free of server-only imports — it is
//bundled into browser code.

export type PermissionKey = "animals" | "forms" | "donations";

export type AdminUser = {
  username: string;
  //Superusers can do everything, including managing the team itself.
  isSuperuser: boolean;
  //Effective permissions: already true across the board for superusers.
  permissions: Record<PermissionKey, boolean>;
};

//Maps a raw user document to its effective access. Accounts created before
//roles existed have no role field and keep the full access they always had.
export const toAdminUser = (record: {
  username: string;
  role?: string;
  permissions?: Partial<Record<PermissionKey, boolean>>;
}): AdminUser => {
  const isSuperuser = record.role !== "staff";
  return {
    username: record.username,
    isSuperuser,
    permissions: {
      animals: isSuperuser || record.permissions?.animals === true,
      forms: isSuperuser || record.permissions?.forms === true,
      donations: isSuperuser || record.permissions?.donations === true,
    },
  };
};
