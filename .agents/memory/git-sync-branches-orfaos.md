---
name: git-sync-branches-orfaos
description: "Branch local órfão pós-squash-merge — podado automaticamente no SessionStart (WO-CORE-024); alias `git sync` é o fallback manual."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: df99645f-547c-44df-bb6f-a1406febd624
---

Depois de um PR mesclar por **squash** na `main` (auto-merge com `--delete-branch`), o branch **remoto** some mas o **local** sobra "divergente" (o commit local nunca vira ancestral da main no squash). A sessão seguinte começava nesse branch morto → banner **"branch divergente — sincronize a mao"**. O fundador estava cansado de pedir limpeza manual a cada ciclo.

**Solução definitiva (jun/2026, WO-CORE-024 — VV-wide):** o 1º hook do `SessionStart` deixou de ser `git pull --ff-only` inline e passou a delegar pro **`vvcore/bin/hook-session-sync.sh`** (sibling-resolve `${D%/*}/vvcore/bin`). No início de **toda** sessão, em **qualquer** repo VV (vvcore/vvdomain/vvroadmap/vvleadhub), ele poda refs remotos, volta do branch `[gone]` pra `main`, atualiza e apaga os já mesclados. **Fail-open (D-2):** tree sujo não toca em branch; branch ativo (remoto vivo) intacto. O `new-repo.sh` gera o mesmo caller → repo novo já nasce com a poda. **Não precisa mais pedir nem rodar nada.**

**Fallback manual** — alias git **global** (na máquina, `~/.gitconfig`, não versionado), mesma lógica, sob demanda:
```
git config --global alias.sync "!git checkout main && git fetch --prune && git pull --ff-only && git branch -vv | grep ': gone]' | awk '{print \$1}' | xargs -r git branch -D"
```

**Why:** "gone" é sinal confiável de mergeado (D-21 auto-merge no verde + `--delete-branch`); `-D` em branch gone é seguro e recuperável via reflog (90 dias).

**How to apply:** normalmente **nada** — o hook resolve no SessionStart. Se um branch órfão escapar (ou numa máquina sem o vvcore linkado), `git sync` faz a faxina. Relacionado: [[pr-auto-merge-armar]] (worktree write-path agora no canon ARQUITETURA-IA §3).

**Gotcha — arquivo sujo perene rebloqueia a poda (jun/2026):** a poda só roda com **working tree limpo** ("tree sujo não toca em branch"). Se o branch órfão "voltar" toda sessão **mesmo com o WO-CORE-024 ativo**, procure qualquer diff local que ficou sem commit. Toda sessão o `hook-session-sync.sh` vê a árvore suja, aborta antes de podar, e o órfão sobra. **Fix:** resolver o diff em branch/PR apropriado ou descartá-lo manualmente com aval. O diagnóstico é `git status` no SessionStart: "pull pulou: alteracoes locais" = árvore suja = poda não rodou.
