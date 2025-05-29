import { Content } from "@prismicio/client";
import { IconType } from "react-icons";
import {
  LuCrown,
  LuDroplet,
  LuFlame,
  LuGem,
  LuTreePine,
  LuZap,
} from "react-icons/lu";

type AttributeData = {
  label: string;
  Icon: IconType;
};

const SCENT_PROFILES: Record<
  Content.FragranceDocumentData["scent_profile"],
  AttributeData
> = {
  spicy: { label: "Spicy & Somky", Icon: LuFlame },
  woody: { label: "Woody & Herbal", Icon: LuTreePine },
  fresh: { label: "Fresh & Aquatic", Icon: LuDroplet },
};

const MOODS: Record<Content.FragranceDocumentData["mood"], AttributeData> = {
  bold: { label: "Bold & Seductive", Icon: LuCrown },
  grounded: { label: "Grounded & Sophisticated", Icon: LuGem },
  refreshing: { label: "Refreshing & invigorating", Icon: LuZap },
};

type FragranceAttributeProps = {
  scentProfile: Content.FragranceDocumentData["scent_profile"];
  mood: Content.FragranceDocumentData["mood"];
  className?: string;
};

export function FragranceAttribute({
  mood: providedMood,
  scentProfile: providScentProfile,
  className,
}: FragranceAttributeProps) {
  const scentProfile = SCENT_PROFILES[providScentProfile];
  const mood = MOODS[providedMood];

  return (
    <div className={className}>
      <p className="mb-2 text-base font-semibold uppercase">Features</p>

      <div className="grid gap-2">
        <p className="flex items-center gap-2">
          <scentProfile.Icon className="size-6" />
          {scentProfile.label}
        </p>
        <p className="flex items-center gap-2">
          <mood.Icon className="size-6" />
          {mood.label}
        </p>
      </div>
    </div>
  );
}
