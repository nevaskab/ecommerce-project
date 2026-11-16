import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUp, Bot, ChevronRight, MessageCircle, X } from "lucide-react";
import { Link } from "react-router-dom";
import LogoIcon from "../../assets/logo-icon";
import { useProducts } from "../../contexts/APIContext";
import { api } from "../../services/api";
import { formatPrice } from "../../utils/formatPrice";

type Message = { role: "assistant" | "user"; content: string };

const suggestions = [
  "Qual produto combina comigo?",
  "Como encontro meu carrinho?",
  "Quais smartphones estão disponíveis?",
];

function formatAssistantText(text: string) {
  return text.split(/(\/cart|\/wishlist|\/)/g).map((part, index) => {
    if (part === "/cart") {
      return <Link key={index} to="/cart" className="font-semibold underline underline-offset-2">carrinho</Link>;
    }
    if (part === "/wishlist") {
      return <Link key={index} to="/wishlist" className="font-semibold underline underline-offset-2">lista de desejos</Link>;
    }
    return <span key={index}>{part}</span>;
  });
}

export function AIAssistant() {
  const { products } = useProducts();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Oi! Posso ajudar você a escolher um produto ou encontrar uma página da Cybertech.",
    },
  ]);
  const endOfMessages = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessages.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

  async function sendMessage(event?: FormEvent, suggestedMessage?: string) {
    event?.preventDefault();
    const question = (suggestedMessage ?? input).trim();
    if (!question || isSending) return;

    const nextMessages = [...messages, { role: "user" as const, content: question }];
    setMessages(nextMessages);
    setInput("");
    setIsSending(true);

    try {
      const response = await api.post("/assistant/chat", {
        message: question,
        history: messages.slice(-8),
        products: products.slice(0, 36).map((product) => ({
          id: product.id,
          title: product.title,
          category: product.category,
          brand: product.brand,
          price: formatPrice(product.price),
          rating: product.rating,
          stock: product.stock,
          description: product.description,
        })),
      });
      setMessages((current) => [...current, { role: "assistant", content: response.data.answer }]);
    } catch {
      setMessages((current) => [
        ...current,
        { role: "assistant", content: "Não consegui responder agora. Você pode tentar novamente em instantes ou navegar pela loja usando o menu." },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-80 sm:bottom-7 sm:right-7">
      {isOpen && (
        <section
          aria-label="Assistente Cybertech"
          className="mb-4 flex h-[min(620px,calc(100vh-115px))] w-[min(390px,calc(100vw-32px))] flex-col overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-2xl shadow-slate-900/20"
        >
          <div className="flex items-center justify-between bg-(--ruge-black) px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 p-2.5">
                <LogoIcon className="h-full w-full" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold tracking-wide">Cybertech AI</p>
                <p className="text-xs text-white/60">Produtos e navegação</p>
              </div>
            </div>
            <button type="button" onClick={() => setIsOpen(false)} aria-label="Fechar assistente" className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-white/10">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50/80 p-4" aria-live="polite">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === "user" ? "rounded-br-md bg-(--ruge-black) text-white" : "rounded-bl-md border border-slate-200 bg-white text-slate-700"}`}>
                  {message.role === "assistant" ? formatAssistantText(message.content) : message.content}
                </div>
              </div>
            ))}
            {messages.length === 1 && !isSending && (
              <div className="space-y-2 pt-1">
                <p className="px-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Sugestões</p>
                {suggestions.map((suggestion) => (
                  <button key={suggestion} type="button" onClick={() => void sendMessage(undefined, suggestion)} className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-left text-xs text-slate-600 transition hover:-translate-y-0.5 hover:border-slate-400 hover:text-slate-950">
                    {suggestion}<ChevronRight size={15} />
                  </button>
                ))}
              </div>
            )}
            {isSending && <div className="flex items-center gap-2 px-2 text-xs text-slate-400"><Bot size={15} /><span className="animate-pulse">Pensando...</span></div>}
            <div ref={endOfMessages} />
          </div>

          <form onSubmit={sendMessage} className="flex gap-2 border-t border-slate-200 bg-white p-3">
            <label htmlFor="assistant-question" className="sr-only">Digite sua dúvida</label>
            <input id="assistant-question" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Pergunte sobre produtos ou o site" className="min-w-0 flex-1 rounded-xl bg-slate-100 px-3 text-sm outline-none ring-offset-2 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-slate-400" disabled={isSending} />
            <button type="submit" aria-label="Enviar pergunta" disabled={!input.trim() || isSending} className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-(--ruge-black) text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"><ArrowUp size={18} /></button>
          </form>
        </section>
      )}
      <button
        type="button"
        aria-label={isOpen ? "Fechar Cybertech AI" : "Abrir Cybertech AI"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        className="group relative ml-auto grid h-16 w-16 place-items-center rounded-full bg-(--ruge-black) text-white shadow-xl shadow-slate-900/25 ring-4 ring-white transition hover:-translate-y-1 hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-900"
      >
        {isOpen ? <X size={24} /> : <><LogoIcon className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" /><MessageCircle size={15} className="absolute -mb-9.5 -mr-9.5 rounded-full bg-white p-0.5 text-(--ruge-black)" aria-hidden="true" /></>}
      </button>
    </div>
  );
}

