export interface GalleryItem {
  id: string;
  title: string;
  category: "Workshops" | "Events" | "Lab Activities" | "Training" | "Meetings";
  hue: number; // for placeholder color
}
export const gallery: GalleryItem[] = Array.from({ length: 12 }).map((_, i) => {
  const cats: GalleryItem["category"][] = ["Workshops", "Events", "Lab Activities", "Training", "Meetings"];
  const c = cats[i % cats.length];
  return {
    id: `g${i + 1}`,
    title: `${c} #${i + 1}`,
    category: c,
    hue: (i * 47) % 360,
  };
});
