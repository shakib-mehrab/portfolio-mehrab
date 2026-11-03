import { motion } from "motion/react";
import { CapGlyph, Icon, type IconName } from "./icons";

interface MessageBoxProps {
  title: string;
  icon?: IconName;
  children: React.ReactNode;
  buttons: { label: string; onClick: () => void; primary?: boolean }[];
  onClose: () => void;
}

/* A small modal dialog drawn over its parent window, with its own glass frame */
export function MessageBox({ title, icon = "info", children, buttons, onClose }: MessageBoxProps) {
  return (
    <div className="absolute inset-0 z-50 grid place-items-center bg-white/30" onClick={onClose}>
      <motion.div
        role="alertdialog"
        aria-label={title}
        className="w7-window w7-glass !relative w-[min(400px,92%)]"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.15 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w7-titlebar !pr-[56px]">
          <span className="w7-title">{title}</span>
          <div className="w7-caps">
            <button className="w7-cap is-close" aria-label="Close" onClick={onClose}>
              <CapGlyph kind="close" />
            </button>
          </div>
        </div>
        <div className="w7-body !flex-none">
          <div className="flex gap-3 bg-white p-4 text-[12.5px] leading-relaxed">
            <Icon name={icon} size={32} className="shrink-0" />
            <div>{children}</div>
          </div>
          <div className="flex justify-end gap-2 border-t border-[#dfdfdf] bg-[#f0f0f0] px-3 py-2.5">
            {buttons.map((b, i) => (
              <button key={b.label} autoFocus={i === 0} className={`w7-button ${b.primary ? "is-default" : ""}`} onClick={b.onClick}>
                {b.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
