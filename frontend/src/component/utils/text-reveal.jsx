"use client";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "./text-reveal-card";

export function TextReveal() {
  return (
    <div className="flex items-center justify-center bg-[#0E0E10] h-[40rem] rounded-2xl w-full">
      <TextRevealCard text="You create content" revealText="We organize">
        <TextRevealCardTitle>
          Content Cloud - Your extraordinary collaborative
        </TextRevealCardTitle>
        <TextRevealCardDescription>
          Welcome to Content Cloud , make your work more organized , minimized
          and collaborative .
        </TextRevealCardDescription>
      </TextRevealCard>
    </div>
  );
}
