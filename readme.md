# Knob & Switch Computer — versão em JavaScript

Simulador em HTML/JS do lendário **“Knob & Switch Computer”**.
Mantém a lógica de registradores, barramentos e ALU, mas **não implementa o chaveamento físico** (knobs / switches) do original — a entrada é 100 % via caixas de texto e menus. Em compensação, foram adicionadas **novas instruções, flags e utilidades de depuração**.

---

## 🚀 Como usar

1. Clone ou baixe o repositório e abra **`index.html`** em qualquer navegador moderno
   (ou sirva a pasta via `npx serve` / `python -m http.server` se preferir HTTP).
2. Preencha a memória (32 endereços) e registradores **R0 – R3** com números inteiros.
3. Use os controles:

   * **start / stop** – execução contínua.
   * **next** – passo-a-passo.
   * **reset** – zera o Program Counter sem limpar memória ou registradores.
   * **speed** – ajusta o clock (slow / normal / fast).

---

## 🖥️ Interface

| Elemento                       | Função                                                       |        |                                             |
| ------------------------------ | ------------------------------------------------------------ | ------ | ------------------------------------------- |
| **Endereços 0-31**             | Memória principal (caixas de texto)                          |        |                                             |
| **R0 – R3**                    | Registradores gerais                                         |        |                                             |
| **A, B, C buses**              | Barramentos de entrada/saída                                 |        |                                             |
| **ALU buffer**                 | Resultado temporário da ALU                                  |        |                                             |
| Dropdowns **A-Bus**, **B-Bus** | Escolhem qual registrador coloca dados nos barramentos A e B |        |                                             |
| Dropdown **ALU ops**           | Seleciona a operação da ALU (lista abaixo)                   |        |                                             |
| Dropdown **C-Bus**             | Define destino: registrador ou memória                       |        |                                             |
| **Flags Zero / Negative**      | Atualizados a cada operação ALU                              |        |                                             |
| Controles \`start              | stop                                                         | next\` | Execução, passo, reinício e ajuste de clock |

---

## 🛠️ Conjunto de Instruções

| Categoria              | Mnemônicos                                         | Observações                                            |
| ---------------------- | -------------------------------------------------- | ------------------------------------------------------ |
| **ALU**                | `ADD`, `SUB`, `DIV`, `MUL`, `AND`, `OR`, `NOT`     | `NOT` usa apenas A (inverte sinal).                    |
| **Movimento de dados** | `LOAD` (R ← MEM), `STORE` (MEM ← R), `MOV` (R ← R) | Formatos flexíveis (R ↔ MEM, R ↔ R).                   |
| **Controle de fluxo**  | `BRANCH`, `BZERO`, `BNEG`                          | Saltos absolutos; `BZERO` e `BNEG` dependem dos flags. |
| **Sistema**            | `HALT`, `NOP`                                      | `HALT` pára a CPU; `NOP` não faz nada.                 |

> **Novidades em relação ao K\&S original:** `DIV`, `MUL`, `OR`, `NOT`, `MOV`, `BZERO`, `BNEG`, além dos flags **Zero** e **Negative**.

---

## 📜 Sintaxe dos comandos

```
ADD   R1 R2 R3     ; R1 ← R2 + R3
LOAD  R2 15        ; R2 ← MEM[15]
STORE 22 R0        ; MEM[22] ← R0
BRANCH 4           ; PC ← 4
BZERO  10          ; PC ← 10 se flag Zero = true
```

O validador em `compiler.js` rejeita instruções fora desses formatos.

---

## 🔍 Recursos de depuração

* **Passo-a-passo (`next`)**: executa apenas o ciclo atual, exibindo barramentos e flags.
* **Velocidade ajustável**: 500 ms, 1 s ou 1,5 s por micro-etapa.
* **Reset de PC** sem apagar memória/registros.
* Campos vazios são auto-completados com **0** ao perder foco.

---

## 📂 Organização do código

```
js/
├── constantsAndVariables.js   # DOM hooks, estado global, timers
├── instructionsAndRegExp.js   # Tabela de instruções + regex de validação
├── compiler.js                # Parsing e dispatch das instruções
├── centralProcessingUnit.js   # ALU, MOV/LOAD/STORE, flags
├── controlUnit.js             # Loop de fetch-decode-execute, PC e branching
├── gerateAdressAndSetZeros.js # Geração dinâmica da memória + inicialização
css/style.css                  # Layout flex-box simples
index.html                     # Estrutura da UI
```

---

## 📝 Próximos passos

* Implementar interface de **knobs e chaves físicas virtuais**, como no simulador original.
* Adicionar instruções `XOR`, `SHL`, `SHR`.
* Salvar/carregar programas em JSON ou assembly simples.
* Theme switch (dark / light).
* Testes automatizados de instruções com Jest.

---

## 📄 Licença

Escolha livre — sugere-se [MIT](https://opensource.org/licenses/MIT) para facilitar forks.

---

> Projeto acadêmico — sinta-se à vontade para estudar, modificar e enviar *pull requests*!
