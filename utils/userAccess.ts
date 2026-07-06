//Validation shared by the create-user and update-user routes for the access
//fields a superuser may set on an account.

export type AccessFields = {
  role: "superuser" | "staff";
  permissions?: { animals: boolean; forms: boolean; donations: boolean };
};

//Returns the access fields to persist, or null when the role is invalid.
//An omitted role means "staff": a new account never gets full access unless
//the superuser explicitly grants it.
export const parseAccessFields = (
  body: Record<string, unknown> = {}
): AccessFields | null => {
  const role = body.role === undefined ? "staff" : body.role;
  if (role === "superuser") {
    return { role: "superuser" };
  }
  if (role !== "staff") {
    return null;
  }

  const requested = (body.permissions ?? {}) as Record<string, unknown>;
  return {
    role: "staff",
    permissions: {
      animals: requested.animals === true,
      forms: requested.forms === true,
      donations: requested.donations === true,
    },
  };
};
