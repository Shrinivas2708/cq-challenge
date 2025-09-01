// src/components/studio/transform-panel.tsx

import { type SectionKey } from "@/components/studio/dock";
import { TransformationConfig } from "@/types";

import { AiMagicPanel } from "./ai-magic-panel";
import { ImageBasicsPanel } from "./image-basics-panel";

type TransformPanelProps = {
  activeSection: SectionKey;
  transforms: TransformationConfig;
  onTransformChange: (transforms: TransformationConfig) => void;
};

export function TransformPanel({
  activeSection,
  transforms,
  onTransformChange,
}: TransformPanelProps) {
  const getSectionTitle = (section: SectionKey) => {
    switch (section) {
      case "basics":
        return "Basic Adjustments";
      case "overlays":
        return "Overlays & Effects";
      case "enhancements":
        return "Enhancements";
      case "ai":
        return "AI Magic";
      case "audio":
        return "Audio";
      default:
        return "Transform";
    }
  };

  const renderPanelContent = () => {
    switch (activeSection) {
      case "basics":
        if (transforms.type === "IMAGE") {
          return (
            <ImageBasicsPanel
              transforms={transforms.basics || {}}
              onTransformChange={(b) =>
                onTransformChange({ ...transforms, basics: b })
              }
            />
          );
        } else if (transforms.type === "VIDEO") {
          return <>Video Basics</>;
        }
        break;
      case "ai":
        if (transforms.type === "IMAGE") {
          return (
            <AiMagicPanel
              transforms={transforms.ai || {}}
              onTransformChange={(aiTransforms) =>
                onTransformChange({ ...transforms, ai: aiTransforms })
              }
            />
          );
        }
        return <p>AI Magic is only available for images.</p>;
      case "overlays":
        return <p>Overlays & Effects</p>;
      case "enhancements":
        return <p>Enhancements</p>;
      case "audio":
        return <p>Audio</p>;
      default:
        return (
          <div className="p-4 text-center text-gray-500">
            Select a section to get started
          </div>
        );
    }
  };

  return (
    <div className="border flex h-full flex-col border-pink-300/30 dark:border-pink-200/15 max-md:min-h-32 md:w-1/4 rounded-xl p-6">
      <div className="flex items-center justify-between pb-4 border-gray-300/30 dark:border-white/10">
        <div className="flex items-center gap-2">
          <h3 className="flex items-center gap-2 text-xs text-foreground/60">
            {getSectionTitle(activeSection)}
          </h3>
        </div>
      </div>
      {/* This div is now the scrollable container */}
      <div className="flex-1 overflow-y-auto -mr-2 pr-2">
        {renderPanelContent()}
      </div>
    </div>
  );
}
