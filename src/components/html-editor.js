import * as monaco from "monaco-editor";
import { getLanguageService } from "vscode-html-languageservice";

export default class HtmlEditor {
    /**
     * 
     * @param {string} content 
     * @param {HTMLElement} parentElement 
     */
    constructor(content, parentElement) {
        this.content = content;
        this.parentEl = parentElement;
        this.editor = null;
    }

    create() {
        const isDark = localStorage.getItem("isDark") != "true" ? false : true;

        if (this.editor) {
            this.editor.dispose();
        }

        this.parentEl.innerHTML = `<section class="h-full">
          <div class="grid grid-cols-2 h-full">
            <div class="h-full w-full htmlEditor"></div>
            <iframe class="h-full w-full htmlEditorOutput" sandbox="allow-same-origin allow-forms allow-scripts"></iframe>
          </div>
        </section>`;

        self.MonacoEnvironment = {
            getWorkerUrl: function (moduleId, label) {
                return URL.createObjectURL(new Blob([`
                    importScripts('${location.origin}/node_modules/monaco-editor/min/vs/base/worker/workerMain.js');
                    `], { type: 'text/javascript' }));
            }
        }
        this.editor = monaco.editor.create(this.parentEl.querySelector(".htmlEditor"), {
            value: localStorage.getItem("lastSave") ?? this.content,
            language: "html",
            theme: isDark ? "vs-dark" : "vs"
        });
        const htmlService = getLanguageService();
        monaco.languages.registerCompletionItemProvider("html", {
            triggerCharacters: ["<", " ", '"', "'"],
            provideCompletionItems: (model, position) => {
                const text = model.getValue();
                const offset = model.getOffsetAt(position);

                const document = {
                    uri: model.uri.toString(),
                    getText: () => text,
                    positionAt: (o) => model.getPositionAt(o),
                    offsetAt: (p) => model.getOffsetAt(p),
                    languageId: "html",
                };

                const htmlDoc = htmlService.parseHTMLDocument(document);
                const completionList = htmlService.doComplete(document, position, htmlDoc);

                const suggestions = completionList.items.map((item) => ({
                    label: item.label,
                    kind: monaco.languages.CompletionItemKind.Property,
                    insertText: item.insertText || item.label,
                    documentation: item.documentation,
                    range: undefined,
                }));

                return { suggestions };
            },
        });

        let timeout;
        const iframe = this.parentEl.querySelector(".htmlEditorOutput");
        iframe.srcdoc = this.editor.getValue();
        this.editor.onDidChangeModelContent(() => {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                iframe.srcdoc = this.editor.getValue();
                localStorage.setItem("lastSave", this.editor.getValue())
            }, 300);
        });
    }

    destroy() {
        if (this.editor) {
            this.editor.dispose();
            this.parentEl.innerHTML = "";
        }
    }
}