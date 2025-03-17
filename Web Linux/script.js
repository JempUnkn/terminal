document.addEventListener("DOMContentLoaded", () => {
    const commandInput = document.getElementById("command");
    const outputDiv = document.getElementById("output");
    const fileSystem = {}; // Simulação de sistema de arquivos

    commandInput.addEventListener("keydown", async (event) => {
        if (event.key === "Enter") {
            let command = commandInput.value.trim();
            commandInput.value = "";
            if (command) await processCommand(command);
        }
    });

    async function processCommand(command) {
        let args = command.split(" ");
        let cmd = args[0];
        let param = args.slice(1).join(" ");

        if (cmd === "clear") {
            outputDiv.innerHTML = ""; // Limpa o terminal
            return;
        }

        if (cmd === "mkdir") {
            if (!param) {
                outputDiv.innerHTML += `<div style="color:red;">mkdir: falta operando</div>`;
            } else if (fileSystem[param]) {
                outputDiv.innerHTML += `<div style="color:red;">mkdir: o diretório '${param}' já existe</div>`;
            } else {
                fileSystem[param] = {};
                outputDiv.innerHTML += `<div>Diretório '${param}' criado</div>`;
            }
            return;
        }

        if (cmd === "nano") {
            if (!param) {
                outputDiv.innerHTML += `<div style="color:red;">nano: falta operando</div>`;
            } else {
                let content = prompt(`Editando arquivo '${param}':`, fileSystem[param] || "");
                if (content !== null) {
                    fileSystem[param] = content;
                    outputDiv.innerHTML += `<div>Arquivo '${param}' salvo</div>`;
                }
            }
            return;
        }

        if (cmd === "ls") {
            let localItems = Object.keys(fileSystem);
            let localOutput = localItems.length ? localItems.join("  ") : " ";

            try {
                let response = await fetch("https://web-terminal-eight.vercel.app/run", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ command: "ls" })
                });

                let result = await response.json();
                let serverOutput = result.stdout ? result.stdout.trim().replace(/\n/g, "  ") : " ";

                outputDiv.innerHTML += `<div>${serverOutput}  ${localOutput}</div>`;
            } catch (error) {
                outputDiv.innerHTML += `<div style="color:red;">Erro ao obter arquivos do servidor.</div>`;
            }
            return;
        }

        let output = `<div><span class="prompt">cyberguild@linux:~$</span> ${command}</div>`;
        outputDiv.innerHTML += output;

        try {
            let response = await fetch("https://web-terminal-eight.vercel.app/run", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ command })
            });

            let result = await response.json();
            let stdout = result.stdout || "";
            let stderr = result.stderr ? `<span style="color:red;">${result.stderr}</span>` : "";
            outputDiv.innerHTML += `<div>${stdout}${stderr}</div>`;
        } catch (error) {
            outputDiv.innerHTML += `<div style="color:red;">Erro ao executar o comando.</div>`;
        }

        outputDiv.scrollTop = outputDiv.scrollHeight;
    }
});
