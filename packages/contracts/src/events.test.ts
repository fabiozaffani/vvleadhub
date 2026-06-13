import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { canonicalEventSchema, EVENT_NAMES } from "./events.js";
import { leadContractSchema, leadOutcomeSchema } from "./lead.js";

// Runner: node:test (built-in, zero dependência). vitest é bloqueado pelo firewall do
// Replit — e o Replit é o builder primário (D-16), então testes não dependem de download.

describe("schema canônico de evento (05 §4/§13)", () => {
  it("aceita o exemplo do doc, com click_ids (D-14)", () => {
    const ok = canonicalEventSchema.safeParse({
      event_id: "11111111-1111-4111-8111-111111111111",
      event_name: "scroll_depth",
      timestamp_client: "2026-06-10T14:03:11.221Z",
      anonymous_id: "anon-1",
      session_id: "sess-1",
      brand: "VVF",
      test: false,
      consent: { analytics: true, marketing: false },
      context: {
        url: "https://valeverdefestas.com.br/lp/retrofit",
        referrer: "",
        utm: { source: "meta", medium: "cpc", campaign: "retrofit", content: "v1" },
        xcode: "CP-1",
        click_ids: { fbc: "fb.1.x", fbp: "fb.1.y" },
        subjects: [{ ref: "acqua", type: "espaço" }],
        objective: "handoff_whatsapp",
      },
      params: { depth_pct: 75 },
    });
    assert.equal(ok.success, true);
  });

  it("rejeita event_name fora do catálogo", () => {
    const bad = canonicalEventSchema.safeParse({
      event_id: "11111111-1111-4111-8111-111111111111",
      event_name: "clique_aleatorio",
      timestamp_client: "2026-06-10T14:03:11.221Z",
      anonymous_id: "a",
      session_id: "s",
      consent: { analytics: true, marketing: false },
      context: { url: "https://x.com", utm: {} },
    });
    assert.equal(bad.success, false);
  });

  it("cobre os marcos de visita do funil M-04 (D-14)", () => {
    for (const name of ["visita_agendada", "visita_realizada", "no_show"] as const) {
      assert.ok(EVENT_NAMES.includes(name));
    }
  });
});

describe("contrato de lead → Kommo (04 §7)", () => {
  it("exige telefone E.164 (chave de dedup D-11)", () => {
    assert.equal(
      leadContractSchema.safeParse({
        phone: "19999999999",
        objective: "handoff_whatsapp",
        utm: {},
        timestamp: "2026-06-10T14:03:11.221Z",
      }).success,
      false,
    );
    assert.equal(
      leadContractSchema.safeParse({
        name: null,
        phone: "+5519999999999",
        email: null,
        origin_channel: "meta",
        utm: {},
        objective: "handoff_whatsapp",
        timestamp: "2026-06-10T14:03:11.221Z",
      }).success,
      true,
    );
  });

  it("desfecho do loop carrega valor por faixa (D-14)", () => {
    const ok = leadOutcomeSchema.safeParse({
      phone: "+5519999999999",
      outcome: "ganho",
      value: 110000,
      card_id: "card-1",
      timestamp: "2026-06-10T14:03:11.221Z",
    });
    assert.equal(ok.success, true);
  });
});
