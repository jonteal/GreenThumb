// import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { Team } from "../../src/pages/Team/Team";
import { Button } from "@/components/ui/button";

vi.mock("@/components/ui/button", () => {
  button: () => <div data-test="button"></div>;
});

describe("Team", () => {
  it("should render hello with the name when name is provided", () => {
    render(<Team />);
    screen.debug();
  });
});
