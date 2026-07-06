import React from "react";
import { render } from "@testing-library/react";

const mockEvents = { on: jest.fn(), off: jest.fn(), emit: jest.fn() };

jest.mock("next/router", () => ({
  useRouter: () => ({ events: mockEvents }),
}));

// eslint-disable-next-line import/first
import UnsavedChangesGuard from "../../adminComponents/UnsavedChangesGuard";

//The guard protects half-filled admin forms from being lost to a stray tap
//on a sidebar link or a closed tab.
describe("UnsavedChangesGuard", () => {
  let confirmSpy;

  beforeEach(() => {
    jest.clearAllMocks();
    confirmSpy = jest.spyOn(window, "confirm");
  });

  afterEach(() => {
    confirmSpy.mockRestore();
  });

  const routeChangeHandler = () =>
    mockEvents.on.mock.calls.find(([event]) => event === "routeChangeStart")[1];

  it("blocks navigation when the user declines the confirm", () => {
    confirmSpy.mockReturnValue(false);
    render(<UnsavedChangesGuard when={true} />);

    expect(() => routeChangeHandler()()).toThrow();
    expect(mockEvents.emit).toHaveBeenCalledWith("routeChangeError");
  });

  it("allows navigation when the user confirms", () => {
    confirmSpy.mockReturnValue(true);
    render(<UnsavedChangesGuard when={true} />);

    expect(() => routeChangeHandler()()).not.toThrow();
    expect(mockEvents.emit).not.toHaveBeenCalled();
  });

  it("stays silent when there is nothing unsaved", () => {
    confirmSpy.mockReturnValue(false);
    render(<UnsavedChangesGuard when={false} />);

    expect(() => routeChangeHandler()()).not.toThrow();
    expect(confirmSpy).not.toHaveBeenCalled();
  });

  it("asks before the tab is closed only while unsaved", () => {
    render(<UnsavedChangesGuard when={true} />);
    const event = new Event("beforeunload", { cancelable: true });
    window.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
  });

  it("reacts to the `when` prop changing without re-subscribing", () => {
    confirmSpy.mockReturnValue(false);
    const { rerender } = render(<UnsavedChangesGuard when={true} />);
    rerender(<UnsavedChangesGuard when={false} />);

    //Saved successfully → navigation must be free again.
    expect(() => routeChangeHandler()()).not.toThrow();
  });

  it("unsubscribes on unmount", () => {
    const { unmount } = render(<UnsavedChangesGuard when={true} />);
    unmount();
    expect(mockEvents.off).toHaveBeenCalledWith(
      "routeChangeStart",
      expect.any(Function)
    );
  });
});
