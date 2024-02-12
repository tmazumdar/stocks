import { render, screen } from "@testing-library/react";
import { BottomNav } from "./bottom-nav";

describe("TickerTracker", () => {
	it("renders BottomNav with first button active", () => {
		render(
			<BottomNav
				activePanelIndex={0}
				setActivePanelIndex={() => {}}
			></BottomNav>
		);
		const navButtons = screen.queryAllByRole("button");
		const firstButton = navButtons[0];

		expect(navButtons.length).toBe(3);
		expect(firstButton.classList.contains("active")).toBe(true);
	});
});
