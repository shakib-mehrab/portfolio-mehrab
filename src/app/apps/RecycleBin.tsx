import { useState } from "react";
import { useOS, type AppProps } from "../os/context";
import { MessageBox } from "../os/MessageBox";
import { Icon, type IconName } from "../os/icons";
import { Explorer } from "./Explorer";

// Things a junior developer is glad to have thrown away
const deleted: { name: string; from: string; icon: IconName; size: string; type: string }[] = [
  { name: "my_first_website_FINAL_v3.html", from: "C:\\Users\\Mehrab\\Desktop", icon: "globe", size: "412 KB", type: "HTML Document" },
  { name: "jquery_spaghetti.js", from: "C:\\Users\\Mehrab\\Projects\\old", icon: "cmd", size: "1.2 MB", type: "JavaScript File" },
  { name: "sleep_schedule.txt", from: "C:\\Users\\Mehrab\\Documents", icon: "pdf", size: "0 KB", type: "Text Document" },
  { name: "fear_of_public_speaking.exe", from: "C:\\Program Files\\Self", icon: "cmd", size: "Huge", type: "Application" },
  { name: "Imposter Syndrome.lnk", from: "C:\\Users\\Mehrab\\Desktop", icon: "info", size: "2 KB", type: "Shortcut" },
  { name: "console.log('here').js", from: "C:\\Users\\Mehrab\\Projects\\debug", icon: "cmd", size: "∞", type: "JavaScript File" },
];

export function RecycleBin(_: AppProps) {
  const { binEmpty, emptyBin } = useOS();
  const [sel, setSel] = useState<number | null>(null);
  const [dialog, setDialog] = useState<null | "empty" | "restore">(null);
  const items = binEmpty ? [] : deleted;

  return (
    <Explorer
      current="bin"
      crumbs={["Recycle Bin"]}
      commands={
        <>
          <button className="w7-cmd" disabled={!items.length} onClick={() => setDialog("empty")}>Empty the Recycle Bin</button>
          <button className="w7-cmd" disabled={!items.length} onClick={() => setDialog("restore")}>Restore all items</button>
        </>
      }
      status={<>{items.length} items</>}
    >
      {items.length === 0 ? (
        <p className="p-6 text-center text-[#6d6d6d]">This folder is empty.</p>
      ) : (
        <table className="w-full min-w-[560px] border-collapse text-left">
          <thead className="sticky top-0 bg-white">
            <tr className="text-[#4c607a]">
              {["Name", "Original Location", "Size", "Item type"].map((h) => (
                <th key={h} className="border-r border-b border-[#e1e6ee] px-2 py-1 font-normal last:border-r-0">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((d, i) => (
              <tr key={d.name} className={`w7-hover cursor-default border border-transparent ${sel === i ? "w7-selected" : ""}`} onClick={() => setSel(i)}>
                <td className="px-2 py-1">
                  <span className="flex items-center gap-1.5">
                    <Icon name={d.icon} size={16} />
                    {d.name}
                  </span>
                </td>
                <td className="px-2 py-1 text-[#6d6d6d]">{d.from}</td>
                <td className="px-2 py-1 text-[#6d6d6d]">{d.size}</td>
                <td className="px-2 py-1 text-[#6d6d6d]">{d.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {dialog === "empty" && (
        <MessageBox
          title="Delete Multiple Items"
          icon="binFull"
          onClose={() => setDialog(null)}
          buttons={[
            { label: "Yes", primary: true, onClick: () => (emptyBin(), setDialog(null)) },
            { label: "No", onClick: () => setDialog(null) },
          ]}
        >
          Are you sure you want to permanently delete these {items.length} items?
        </MessageBox>
      )}
      {dialog === "restore" && (
        <MessageBox title="Restore Items" icon="info" onClose={() => setDialog(null)} buttons={[{ label: "OK", primary: true, onClick: () => setDialog(null) }]}>
          Some things are better left deleted. These items could not be restored.
        </MessageBox>
      )}
    </Explorer>
  );
}
