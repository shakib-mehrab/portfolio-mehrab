import { useState } from "react";
import { Send, Paperclip, Github, Linkedin, Twitter, Instagram, Facebook, Palette, Mail, AlertTriangle } from "lucide-react";
import { profileData } from "../../data/profile";
import type { AppProps } from "../os/context";
import { Icon } from "../os/icons";

const c = profileData.contact;
const contacts = [
  { label: "LinkedIn", href: c.linkedin, Glyph: Linkedin, color: "#0a66c2" },
  { label: "GitHub", href: c.github, Glyph: Github, color: "#24292f" },
  { label: "X (Twitter)", href: c.twitter, Glyph: Twitter, color: "#1d9bf0" },
  { label: "Behance", href: c.behance, Glyph: Palette, color: "#1769ff" },
  { label: "Instagram", href: c.instagram, Glyph: Instagram, color: "#c13584" },
  { label: "Facebook", href: c.facebook, Glyph: Facebook, color: "#1877f2" },
  { label: c.email, href: `mailto:${c.email}`, Glyph: Mail, color: "#2a7fd4" },
];

type Status = "idle" | "sending" | "sent" | "error";

export function Contact(_: AppProps) {
  const [from, setFrom] = useState("");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [touched, setTouched] = useState(false);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(from);
  const valid = emailOk && body.trim().length > 0;

  const send = async () => {
    setTouched(true);
    if (!valid || status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch(c.formspreeEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email: from, subject: subject || "Hello from Mehrab 7", message: body }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent")
    return (
      <div className="w7-body w7-dialog-face items-center justify-center p-6">
        <div className="w-full max-w-[380px] rounded-[3px] border border-[#a0afc3] bg-white p-5 text-center shadow">
          <Icon name="mail" size={48} />
          <p className="mt-2 text-[15px] text-[#1e3287]">Your message has been sent.</p>
          <p className="mt-1 text-[#5a6779]">Mehrab usually replies within a day or two.</p>
          <button
            className="w7-button is-default mt-4"
            onClick={() => {
              setStatus("idle");
              setBody("");
              setSubject("");
              setTouched(false);
            }}
          >
            OK
          </button>
        </div>
      </div>
    );

  return (
    <div className="w7-body">
      <div className="w7-commandbar">
        <button className="w7-cmd" onClick={send} disabled={status === "sending"}>
          <Send size={14} /> {status === "sending" ? "Sending..." : "Send"}
        </button>
        <span className="w7-cmd-sep" />
        <button className="w7-cmd" disabled>
          <Paperclip size={14} /> Attach
        </button>
        <span className="flex-1" />
        <a className="w7-cmd" href="/resume.pdf" download="Mehrab_Hossain_Resume.pdf">
          Download résumé
        </a>
      </div>

      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <form
          className="flex min-h-0 flex-1 flex-col gap-1.5 p-3"
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
        >
          <Field label="To:">
            <input className="w7-input bg-[#f7f7f7]" readOnly value={`${profileData.name} <${c.email}>`} />
          </Field>
          <Field label="From:" htmlFor="m7-from">
            <input
              id="m7-from"
              className="w7-input"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              aria-invalid={touched && !emailOk}
              aria-describedby={touched && !emailOk ? "m7-from-err" : undefined}
            />
          </Field>
          {touched && !emailOk && (
            <p id="m7-from-err" className="ml-[76px] flex items-center gap-1 text-[#c0392b]">
              <AlertTriangle size={12} /> Enter an email address so Mehrab can reply.
            </p>
          )}
          <Field label="Name:" htmlFor="m7-name">
            <input id="m7-name" className="w7-input" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
          </Field>
          <Field label="Subject:" htmlFor="m7-subj">
            <input id="m7-subj" className="w7-input" placeholder="Project inquiry, job opportunity, or just hello" value={subject} onChange={(e) => setSubject(e.target.value)} />
          </Field>
          <label htmlFor="m7-body" className="sr-only">Message</label>
          <textarea
            id="m7-body"
            className="w7-textarea mt-1 min-h-[160px] flex-1 resize-none text-[13px] leading-relaxed"
            placeholder={`Hi ${profileData.name.split(" ")[0]},\n\n`}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            aria-invalid={touched && !body.trim()}
          />
          {touched && !body.trim() && <p className="text-[#c0392b]">The message is empty.</p>}
          {status === "error" && (
            <p className="flex items-center gap-1 text-[#c0392b]">
              <AlertTriangle size={12} /> The message couldn't be sent. Try again, or email {c.email} directly.
            </p>
          )}
          <div className="flex justify-end pt-1">
            <button type="submit" className="w7-button is-default" disabled={status === "sending"}>
              {status === "sending" ? "Sending..." : "Send"}
            </button>
          </div>
        </form>

        <aside className="shrink-0 border-t border-[#d6e1ee] bg-gradient-to-b from-[#f7fafd] to-[#e8f0f8] p-3 md:w-[220px] md:border-t-0 md:border-l">
          <div className="mb-2 text-[#1e3287]">Contacts</div>
          {contacts.map(({ label, href, Glyph, color }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" className="w7-hover flex items-center gap-2 rounded-[3px] border border-transparent px-1.5 py-1 text-black">
              <Glyph size={16} color={color} />
              <span className="truncate">{label}</span>
            </a>
          ))}
          <p className="mt-3 text-[#5a6779]">{c.location}</p>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, htmlFor, children }: { label: string; htmlFor?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor={htmlFor} className="w-[68px] shrink-0 text-right text-[#333]">
        {label}
      </label>
      {children}
    </div>
  );
}
