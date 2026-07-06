/**
 * @jest-environment node
 */
import { sign } from "jsonwebtoken";

jest.mock("../../utils/dbConnect", () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue(undefined),
}));

const mockCreate = jest.fn();
const mockFindById = jest.fn();
const mockFindByIdAndUpdate = jest.fn();
const mockDeleteOne = jest.fn();

const contactModel = {
  create: (...args) => mockCreate(...args),
  findById: (...args) => mockFindById(...args),
  findByIdAndUpdate: (...args) => mockFindByIdAndUpdate(...args),
  deleteOne: (...args) => mockDeleteOne(...args),
  schema: {
    paths: {
      _id: {},
      __v: {},
      type: {},
      "aboutQuestions.name": {},
      "aboutQuestions.email": {},
      message: {},
      archive: {},
      updatedAt: {},
      status: {},
      handledBy: {},
      handledAt: {},
      read: {},
      notes: {},
    },
  },
};

jest.mock("../../models/formModels", () => ({
  __esModule: true,
  default: {
    FormContactUsModel: contactModel,
    FormPetAdoptionModel: {},
    FormGiftAidModel: {},
    FormVolunteerModel: {},
  },
}));

const mockUserFindOne = jest.fn();

jest.mock("../../models/userModel", () => ({
  __esModule: true,
  default: { findOne: (...args) => mockUserFindOne(...args) },
}));

// eslint-disable-next-line import/first
import formsHandler from "../../pages/api/forms/index";
// eslint-disable-next-line import/first
import formHandler from "../../pages/api/forms/[id]";
// eslint-disable-next-line import/first
import { AUTH_COOKIE } from "../../utils/auth";

const OLD_ENV = process.env;

beforeAll(() => {
  process.env = { ...OLD_ENV, SECRET: "test-secret" };
});

afterAll(() => {
  process.env = OLD_ENV;
});

const requesterInDb = (user) => {
  mockUserFindOne.mockReturnValue({ lean: () => Promise.resolve(user) });
};

const storedFormHas = (fields) => {
  mockFindById.mockReturnValue({ lean: () => Promise.resolve(fields) });
};

beforeEach(() => {
  jest.clearAllMocks();
  mockCreate.mockResolvedValue({ _id: "1" });
  mockFindByIdAndUpdate.mockResolvedValue({ _id: "1" });
  mockDeleteOne.mockResolvedValue({ deletedCount: 1 });
  storedFormHas({ status: undefined });
  requesterInDb({ username: "jackie" });
});

const makeRes = () => {
  const res = {};
  res.status = jest.fn(() => res);
  res.json = jest.fn(() => res);
  res.setHeader = jest.fn();
  return res;
};

const cookieFor = (username) => ({
  [AUTH_COOKIE]: sign({ username }, "test-secret"),
});

const putForm = (body, username = "jackie") =>
  formHandler(
    {
      method: "PUT",
      query: { id: "1", type: "contactus" },
      cookies: cookieFor(username),
      body,
    },
    makeRes()
  );

describe("POST stamps tracking fields on every new submission", () => {
  it("creates with status new and read false", async () => {
    const res = makeRes();
    await formsHandler(
      {
        method: "POST",
        query: { type: "contactus" },
        cookies: {},
        body: { message: "hello", aboutQuestions: { name: "Visitor" } },
      },
      res
    );

    expect(res.status).toHaveBeenCalledWith(201);
    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({ status: "new", read: false, notes: [] })
    );
  });

  it("overrides tracking fields a visitor tries to inject", async () => {
    await formsHandler(
      {
        method: "POST",
        query: { type: "contactus" },
        cookies: {},
        body: {
          message: "hello",
          status: "handled",
          read: true,
          handledBy: "hacker",
          notes: [{ text: "fake note" }],
        },
      },
      makeRes()
    );

    const created = mockCreate.mock.calls[0][0];
    expect(created.status).toBe("new");
    expect(created.read).toBe(false);
    expect(created.notes).toEqual([]);
    expect(created.handledBy).toBeUndefined();
    expect(created.handledAt).toBeUndefined();
  });
});

describe("PUT stamps who is handling a form, server-side", () => {
  it("marking handled records the requester and a timestamp", async () => {
    await putForm({ status: "handled", handledBy: "impostor" });

    const [, update] = mockFindByIdAndUpdate.mock.calls[0];
    expect(update.$set.status).toBe("handled");
    expect(update.$set.handledBy).toBe("jackie");
    expect(update.$set.handledAt).toBeInstanceOf(Date);
  });

  it("marking back as new clears who was handling it", async () => {
    storedFormHas({ status: "handled" });
    await putForm({ status: "new" });

    const [, update] = mockFindByIdAndUpdate.mock.calls[0];
    expect(update.$set.handledBy).toBeNull();
    expect(update.$set.handledAt).toBeNull();
  });

  it("echoing the current status back does not re-stamp the handler", async () => {
    //Archiving sends the whole (stale) form object, status included.
    storedFormHas({ status: "handled" });
    await putForm({ status: "handled", archive: "Yes" });

    const [, update] = mockFindByIdAndUpdate.mock.calls[0];
    expect(update.$set.handledBy).toBeUndefined();
    expect(update.$set.handledAt).toBeUndefined();
  });

  it("rejects a made-up status with 400", async () => {
    const res = makeRes();
    await formHandler(
      {
        method: "PUT",
        query: { id: "1", type: "contactus" },
        cookies: cookieFor("jackie"),
        body: { status: "sorted" },
      },
      res
    );

    expect(res.status).toHaveBeenCalledWith(400);
    expect(mockFindByIdAndUpdate).not.toHaveBeenCalled();
  });
});

describe("PUT keeps the submitted date honest", () => {
  it("a tracking-only update (read/status/note) never bumps updatedAt", async () => {
    await putForm({ read: true, addNote: "left a voicemail" });

    const [, update] = mockFindByIdAndUpdate.mock.calls[0];
    expect(update.$set.updatedAt).toBeUndefined();
  });

  it("archiving is filing, not editing — updatedAt survives", async () => {
    await putForm({ archive: "Yes" });

    const [, update] = mockFindByIdAndUpdate.mock.calls[0];
    expect(update.$set.archive).toBe("Yes");
    expect(update.$set.updatedAt).toBeUndefined();
  });

  it("a genuine content update still bumps updatedAt", async () => {
    await putForm({ message: "corrected message text" });

    const [, update] = mockFindByIdAndUpdate.mock.calls[0];
    expect(update.$set.updatedAt).toBeInstanceOf(Date);
  });
});

describe("PUT staff notes", () => {
  it("pushes a note stamped with the requester, ignoring client notes", async () => {
    await putForm({
      addNote: "  home check booked  ",
      notes: [{ text: "forged history", by: "impostor" }],
    });

    const [, update] = mockFindByIdAndUpdate.mock.calls[0];
    expect(update.$set.notes).toBeUndefined();
    expect(update.$push.notes.text).toBe("home check booked");
    expect(update.$push.notes.by).toBe("jackie");
    expect(update.$push.notes.date).toBeInstanceOf(Date);
  });

  it("clamps a runaway note to 2000 characters", async () => {
    await putForm({ addNote: "x".repeat(5000) });

    const [, update] = mockFindByIdAndUpdate.mock.calls[0];
    expect(update.$push.notes.text).toHaveLength(2000);
  });

  it("a blank note is not pushed at all", async () => {
    await putForm({ addNote: "   ", read: true });

    const [, update] = mockFindByIdAndUpdate.mock.calls[0];
    expect(update.$push).toBeUndefined();
  });
});

describe("DELETE stays superuser-only", () => {
  it("refuses staff even with the forms permission", async () => {
    requesterInDb({
      username: "jackie",
      role: "staff",
      permissions: { forms: true },
    });
    const res = makeRes();
    await formHandler(
      {
        method: "DELETE",
        query: { id: "1", type: "contactus" },
        cookies: cookieFor("jackie"),
      },
      res
    );

    expect(res.status).toHaveBeenCalledWith(403);
    expect(mockDeleteOne).not.toHaveBeenCalled();
  });
});
